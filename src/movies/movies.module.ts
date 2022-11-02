import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GenresModule } from 'src/genres/genres.module';
import { GenresRepository } from 'src/genres/genres.repository';
import { GenresService } from 'src/genres/genres.service';
import { MoviesController } from './movies.controller';
import { MoviesRepository } from './movies.repository';
import { MoviesService } from './movies.service';

@Module({
  imports: [HttpModule, GenresModule],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository, GenresService, GenresRepository],
})
export class MoviesModule {}
