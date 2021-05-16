import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from './entities/config.entity';

@Injectable()
export class ConfigService {

  constructor(
    @InjectRepository(Config) private configRepository: Repository<Config>
  ) {}

  async populate() {
    const config = await this.getConfig();
    if (!config) {
      const defaultConfig = this.configRepository.create();
      this.configRepository.save(defaultConfig);
    }
  }

  async getConfig() {
    return await this.configRepository.findOne({});
  }

}
