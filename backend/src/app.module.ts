import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/user.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { constants } from './constants';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'nutracker',
            password: 'eqGh)_T/M4ayogwz',
            database: 'nutracker',
            synchronize: true,
            entities: [User],
        }),
        JwtModule.register({
            global: true,
            secret: constants.jwt_token,
            signOptions: { expiresIn: '60s' },
        }),
        AuthModule,
        UserModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
