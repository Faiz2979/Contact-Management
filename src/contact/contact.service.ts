import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { Contact, User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { WebResponse } from 'src/model/web.model';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { ContactResponse, CreateContactRequest, SearchContactRequest, UpdateContactRequest } from '../model/contact.model';
import { ContactValidation } from './contact.validation';

@Injectable()
export class ContactService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationService,
    ) {}
    
    async createContact(user: User, request: CreateContactRequest): Promise<ContactResponse> {
        this.logger.debug(`ContactService.create(${JSON.stringify(user)}, ${JSON.stringify(request)})`);
        const createRequest: CreateContactRequest = this.validationService.validate(
            ContactValidation.CREATE,
            request,
        );
    
        const contact = await this.prismaService.contact.create({
            data: {
                ...createRequest,
                ...{ username: user.username },
            },
        });
    
        return this.toContactResponse(contact);
    }
    
    toContactResponse(contact: Contact): ContactResponse {
        return {
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone,
            id: contact.id,
        };
    }

    async checkContactMustExists(username: string, contactId: number): Promise<Contact> {
        const contact = await this.prismaService.contact.findFirst({
        where: {
            username: username,
            id: contactId,
        },
        });
    
        if (!contact) {
            throw new HttpException('Contact is not found', 404);
        }
    
        return contact;
    }
    
    async getContacts(user: User, contactId: number): Promise<ContactResponse> {
        const contact = await this.checkContactMustExists(user.username, contactId);
        return this.toContactResponse(contact);
    }
    

    async updateContact(user: User, request: UpdateContactRequest): Promise<ContactResponse> {
        const updateRequest: UpdateContactRequest = this.validationService.validate(
            ContactValidation.UPDATE,
            request,
        );
        
        let contact = await this.checkContactMustExists(user.username, request.id);
        contact = await this.prismaService.contact.update({
            where: {
                id: contact.id,
                username: contact.username,
            },
            data: updateRequest,
        });

        return this.toContactResponse(contact);
    }

    async deleteContact(user: User, contactId: number): Promise<ContactResponse> {
        const contact = await this.checkContactMustExists(user.username, contactId);
        const result = await this.prismaService.contact.delete({
            where: {
                id: contact.id,
            },
        });
        return this.toContactResponse(result);
    }

    async searchContacts(user: User, request:SearchContactRequest): Promise<WebResponse<ContactResponse[]>> {
        const searchRequest: SearchContactRequest = this.validationService.validate(
            ContactValidation.SEARCH,
            request,
        )

        const filters = [];

        if(searchRequest.name){
            filters.push({ OR: [{ first_name: { contains: searchRequest.name } }, { last_name: { contains: searchRequest.name } }] });
        }
        if(searchRequest.email){
            filters.push({ email: { contains: searchRequest.email } });
        }
        if(searchRequest.phone){
            filters.push({ phone: { contains: searchRequest.phone } });
        }

        const contacts = await this.prismaService.contact.findMany({
            where: {
                AND: [
                    { username: user.username },
                    ...filters,
                ],
            },
            skip: (searchRequest.page - 1) * searchRequest.size,
            take: searchRequest.size,
        });

        const countContacts = await this.prismaService.contact.count({
            where: {
                AND: [
                    { username: user.username },
                    ...filters,
                ],
            },
        })

        return {
            data: contacts.map((contact) => this.toContactResponse(contact)),
            paging: {
                page: searchRequest.page,
                size: searchRequest.size,
                total_page: Math.ceil(countContacts / searchRequest.size),
            }
        }
    }
}

