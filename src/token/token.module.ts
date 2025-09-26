import { Global, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JWTConfigModule } from '../config/jwt-config.module';
@Global()
@Module({
  imports: [JWTConfigModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
