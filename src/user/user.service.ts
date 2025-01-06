import { HttpException, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../common/prisma.servise';
import { ValidationService } from '../common/validation.service';
import { LoginUserRequest, RegisterUserRequest, UpdateUserRequest, UserResponse } from '../model/user.model';
import { UserValidation } from './user.validation';

@Injectable()
export class UserService {

    constructor(
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger,
        private prismaService: PrismaService,
    ) { }

    getHello(): string {
        return 'Hello World!';
    }

    async registerUser(request: RegisterUserRequest): Promise<UserResponse> {
        this.logger.info(`Registering user, ${JSON.stringify(request)}`);
        const registerRequest:RegisterUserRequest = this.validationService.validate(
            UserValidation.REGISTER, 
            request
        );
        
        const User_With_Same_Username= await this.prismaService.user.count({
            where:{
                username: registerRequest.username
            }
        })
        if(User_With_Same_Username>0){
            throw new HttpException("Username already exists",400)
        }

        registerRequest.password= await bcrypt.hash(registerRequest.password,10)

        const user = await this.prismaService.user.create({
            data: registerRequest
        })
        return {
            username: user.username,
            name: user.name
        };
    }

    async loginUser(request:LoginUserRequest): Promise<UserResponse>{
        this.logger.info(`Logging in user, ${JSON.stringify(request)}`);
        const loginRequest:LoginUserRequest = this.validationService.validate(
            UserValidation.LOGIN,
            request
        );

        let user = await this.prismaService.user.findUnique({
            where:{
                username: loginRequest.username
            }
        })

        if(!user){
            throw new HttpException("Invalid username or password",401)
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password,user.password)

        if(!isPasswordValid){
            throw new HttpException("Invalid username or password",401)
        }

        user = await this.prismaService.user.update({
            where:{
                username: loginRequest.username
            },
            data:{
                token: uuid()
            }
        })
        return {
            username: user.username,
            name: user.name,
            token : user.token
        }
    }

    async getUser(User: User): Promise<UserResponse> {
        this.logger.info(`Getting user, ${User.username}`);
        const user = await this.prismaService.user.findUnique({
            where: {
            username: User.username
            }
        });

        if (!user) {
            throw new HttpException('User not found', 404);
        }

        return {
            username: user.username,
            name: user.name
        };
    }

    async updateUser(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        this.logger.debug(
        `UserService.update( ${JSON.stringify(user)} , ${JSON.stringify(request)} )`,
        );
    
        const updateRequest: UpdateUserRequest = this.validationService.validate(
        UserValidation.UPDATE,
        request,
        );
    
        if (updateRequest.name) {
        user.name = updateRequest.name;
        }
    
        if (updateRequest.password) {
        user.password = await bcrypt.hash(updateRequest.password, 10);
        }
    
        const result = await this.prismaService.user.update({
        where: {
            username: user.username,
        },
        data: user,
        });
        
        return {
        name: result.name,
        username: result.username,
        };
    }


    async logoutUser(user: User): Promise<UserResponse> {
        const result = await this.prismaService.user.update({
            where: {
                username: user.username
            },
            data: {
                token: null
            }
        });
        return {
            username: result.username,
            name: result.name
        };
    }
}
