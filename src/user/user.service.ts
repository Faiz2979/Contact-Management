import { HttpException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.servise';
import { ValidationService } from '../common/validation.service';
import { RegisterUserRequest, UserResponse } from '../model/user.model';
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
}
