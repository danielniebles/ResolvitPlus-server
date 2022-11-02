import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get(':type')
  getMovies(@Param() params): any {
    return this.moviesService.getMoviesByType(params.type);
  }
}
