import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import { Config } from './entities/config.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Config])
  ],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {

  constructor(service: ConfigService) {
    service.populate();
  }

}
