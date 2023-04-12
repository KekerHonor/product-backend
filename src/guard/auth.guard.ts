import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

const jwtConstants = {
  secret: 'secret',
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log(token);
    console.log(type);
    return type === 'Bearer' ? token : undefined;
  }
}

// import {
//   ExecutionContext,
//   HttpException,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { verify } from 'jsonwebtoken';

// // import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class AuthGuard {
//   async canActivate(context: ExecutionContext) {
//     try {
//       let req: any = context.switchToHttp().getRequest();
//       const headers = context.switchToHttp().getRequest().headers;
//       if (!headers.authorization) throw 'Header error';

//       const [prefix, token] = headers.authorization.split(' ');
//       if (prefix !== 'Bearer') throw 'Header error';
//       const decode = verify(token, 'sadfsdf') as any;
//       if (!decode) throw 'Token undefiened';

//       req.user = {
//         id: decode.userId,
//       };
//       return true;
//     } catch (e) {
//       console.log(e);
//       throw new HttpException('UNAUTHORIZED_ERROR', 401);
//     }
//   }
// }
