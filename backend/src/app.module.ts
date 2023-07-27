import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/user.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { constants } from './constants';
import { Nut } from './typeorm/nut.entity';
import { NutModule } from './nut/nut.module';

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
            entities: [User, Nut],
        }),
        JwtModule.register({
            global: true,
            secret: constants.jwt_token,
            signOptions: { expiresIn: '60s' },
        }),
        AuthModule,
        UserModule,
        NutModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
