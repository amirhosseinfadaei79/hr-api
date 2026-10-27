import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    } as any);
  }

  async validate(payload: any) {
    // payload.sub is userId
    const user = await this.authService.findUserById(payload.sub);
    // میتونید اضافه چک‌ها انجام بدید (مثل active flag)
    if(user)
    return { id: user.id, role: user.role };
  }
}
