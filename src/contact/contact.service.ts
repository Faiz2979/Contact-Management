import { Inject, Injectable, Logger } from '@nestjs/common';
import { Contact, User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.servise';
import { ValidationService } from '../common/validation.service';
import { ContactResponse, CreateContactRequest } from '../model/contact.model';
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
    
}
