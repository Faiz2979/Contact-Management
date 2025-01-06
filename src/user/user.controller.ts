import { Body, Controller, Delete, Get, HttpCode, Patch, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { Auth } from '../common/auth.decorator';
import { LoginUserRequest, RegisterUserRequest, UpdateUserRequest, UserResponse } from '../model/user.model';
import { WebResponse } from '../model/web.model';
import { UserService } from './user.service';


@Controller('api/user')
export class UserController {
    constructor (private userService: UserService){};


    @Get('/hello')
    getHello() {
        return this.userService.getHello();
    }

    @Post('')
    @HttpCode(200)
    async registerUser(@Body() request:RegisterUserRequest): Promise<WebResponse<UserResponse>> {
        const result = await this.userService.registerUser(request);
        return {
            data: result
            
        };
    }

    @Post('/login')
    @HttpCode(200)
    async loginUser(@Body() request:LoginUserRequest): Promise<WebResponse<UserResponse>> {
        const result = await this.userService.loginUser(request);
        return {
            data: result
            
        };
    }
    
    @Get('/current')
    @HttpCode(200)
    async getUser(@Auth() user:User): Promise<WebResponse<UserResponse>> {
        const result = await this.userService.getUser(user);
        return {
            data: result
            
        };
    }

    @Patch('/current')
    @HttpCode(200)
    async updateUser(
        @Auth() user:User,
        @Body() request: UpdateUserRequest
        ): Promise<WebResponse<UserResponse>> {
        const result = await this.userService.updateUser(user, request);
        return {
            data: result
        };
    }
    
    @Delete('/current')
    @HttpCode(200)
    async logoutUser(@Auth() user:User): Promise<WebResponse<boolean>> {
        const result = await this.userService.logoutUser(user);
        return {
            data: true
        };
    }
}
