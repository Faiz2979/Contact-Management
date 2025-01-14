import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { User } from '@prisma/client';
import { Auth } from '../common/auth.decorator';
import { ContactResponse, CreateContactRequest, UpdateContactRequest } from '../model/contact.model';
import { WebResponse } from '../model/web.model';
import { ContactService } from './contact.service';

@Controller('/api/contacts')
export class ContactController {
    constructor (private contactService: ContactService) {};

    @Post('/')
    @HttpCode(200)
    async createContact(@Body() request:CreateContactRequest, @Auth() user: User): Promise<WebResponse<ContactResponse>> {
        const result = await this.contactService.createContact(user,request);
        return {
            data: result,
        }
    }

    @Get('/:contactId')
    @HttpCode(200)
    async get(@Auth() user: User, @Param('contactId', ParseIntPipe) contactId: number,): Promise<WebResponse<ContactResponse>> {
        const result = await this.contactService.getContacts(user, contactId);
        return {
            data: result,
        };
        }


    @Put('/:contactId')
    @HttpCode(200)
    async updateContact(@Auth() user: User, @Param('contactId', ParseIntPipe) contactId: number, @Body() request: UpdateContactRequest): Promise<WebResponse<ContactResponse>> {
        request.id = contactId;
        const result = await this.contactService.updateContact(user, request);
        return {
            data: result,
        };
        }

    @Delete('/:contactId')
    @HttpCode(200)
    async deleteContact(@Auth() user: User, @Param('contactId', ParseIntPipe) contactId: number): Promise<WebResponse<Boolean>> {
        const result = await this.contactService.deleteContact(user, contactId);
        return {
            data: true,
        };
    }
    
}
