import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { LoginUserRequest, RegisterUserRequest, UserResponse } from '../model/user.model';
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
    
}
