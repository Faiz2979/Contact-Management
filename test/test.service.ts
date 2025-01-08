import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "../src/common/prisma.servise";

@Injectable()
export class TestService{
    constructor(private prisma: PrismaService){}

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

    async login(){
        await this.prisma.user.create({
            data: {
                username: 'test',
                password: bcrypt.hashSync('test', 10),
                name: 'test',
                token: 'test'
            }
        });
    }
}