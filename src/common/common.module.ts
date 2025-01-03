import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { PrismaService } from './prisma.servise';
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
    providers: [PrismaService,ValidationService],
    exports: [PrismaService,ValidationService],
})
export class CommonModule {}
