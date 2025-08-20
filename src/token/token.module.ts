import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JWTConfigModule } from 'src/config/jwt-config.module';

@Module({
  imports: [JWTConfigModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
