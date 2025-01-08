import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AuthMiddleware } from './auth.middleware';
import { ErrorFilter } from './error.filter';
import { PrismaService } from './prisma.service';
import { ValidationService } from './validation.service';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        WinstonModule.forRoot({
        // options
        format: winston.format.json(),
        transports: [
            new winston.transports.Console(),
        ],
        
        }),
    ],
    providers: [PrismaService, ValidationService,{
        provide: APP_FILTER,
        useValue: ErrorFilter
    }],
    exports: [PrismaService,ValidationService],
})
export class CommonModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('api/*');
    }
}
