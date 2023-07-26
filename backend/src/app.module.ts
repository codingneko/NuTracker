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
            username: constants.db_user,
            password: constants.db_password,
            database: constants.db_name,
            synchronize: true,
            entities: [User],
        }),
        JwtModule.register({
            global: true,
            secret: constants.jwt_token,
            signOptions: { expiresIn: '60s' },
        }),
        AuthModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
