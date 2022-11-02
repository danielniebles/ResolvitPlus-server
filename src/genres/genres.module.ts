import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenresRepository } from './genres.repository';
import { GenresService } from './genres.service';

@Module({
  imports: [HttpModule],
  controllers: [GenresController],
  providers: [GenresService, GenresRepository],
  exports: [GenresService],
})
export class GenresModule {}
