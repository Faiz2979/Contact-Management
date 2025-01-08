import { Injectable } from "@nestjs/common";
import { Contact } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "../src/common/prisma.service";

@Injectable()
export class TestService{
    constructor(private prisma: PrismaService){}

    async deleteAll() {
        await this.deleteContact();
        await this.deleteUser();
      }

    async deleteUser(){
        await this.prisma.user.deleteMany(
            {
                where: {
                    username: {
                        contains: 'test'
                    }
                }
            }
        );
    }

    async registerUser(){
        await this.prisma.user.create({
            data: {
                username: 'test',
                password: bcrypt.hashSync('test', 10),
                name: 'test',
                token: 'test'
            }
        });
    }

    async deleteContact(){
        await this.prisma.contact.deleteMany(
            {
                where: {
                    first_name: {
                        contains: 'test'
                    }
                }
            }
        );
    }

    async createContact() {
        await this.prisma.contact.create({
            data: {
            first_name: 'test',
            last_name: 'test',
            email: 'test@example.com',
            phone: '9999',
            username: 'test',
            },
        });
    }

    async getContact(): Promise<Contact> {
        return this.prisma.contact.findFirst({
            where: {
            username: 'test',
            },
        });
    }
}