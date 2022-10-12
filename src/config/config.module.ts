import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { ConfigModule as LoadEnvModule } from '@nestjs/config';
import { join } from 'path';
import { WinstonConfigService } from '@config/winston-config/winston-config.service';

@Global()
@Module({
  imports: [
    /**
     * default cache store is in-memory cache
     * if you want using other cache store, please read docs https://docs.nestjs.com/techniques/caching#different-stores
     */
    LoadEnvModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(
          __dirname,
          '..',
          `../.env`,
        ),
      ],
    }),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
  ],
  providers: [WinstonConfigService],
  exports: [WinstonConfigService],
})
export class ConfigModule {}
