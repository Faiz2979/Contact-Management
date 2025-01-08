import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { Auth } from '../common/auth.decorator';
import { ContactResponse, CreateContactRequest } from '../model/contact.model';
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

}
