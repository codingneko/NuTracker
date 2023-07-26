import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { constants } from '../../../constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const bearerToken = this.extractTokenFromHeader(request);
        const token = this.extractTokenFromCookie(request);

        if (!bearerToken && !token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(bearerToken ? bearerToken : token, {
                secret: constants.jwt_token,
            });

            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private extractTokenFromCookie(request: Request): string | undefined {
        return request.cookies.JSESSIONID;
    }
}
