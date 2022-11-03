import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('basic/:type/')
  getBasicMovies(@Param() params, @Query('page') page): any {
    return this.moviesService.getBasicMoviesByType(params.type, page);
  }

  @Get('extended/:type/')
  getExtendedMovies(@Param() params, @Query('page') page): any {
    return this.moviesService.getExtendedMoviesByType(params.type, page);
  }

  @Get()
  getMoviesByKeyword(@Query('search') search, @Query('page') page) {
    return this.moviesService.getMoviesByKeyword(search, page);
  }

  @Get('advanced')
  getMoviesByParams(@Query('withGenres') search, @Query('page') page) {
    return this.moviesService.getMoviesByKeyword(search, page);
  }
}
