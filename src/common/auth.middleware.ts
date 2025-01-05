import { Injectable, NestMiddleware } from "@nestjs/common";
import { PrismaService } from "./prisma.servise";


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private prismaService: PrismaService) {}

    async use (request: any, response: any, next: (error?:any) => void) {
        const token = request.headers['authorization'] as string;
        if (token){
            const user =await this.prismaService.user.findFirst({
                where: {
                    token: token
                }
            });

            if (user) {
                request.user = user;
            }
        }

        next();
    }

}