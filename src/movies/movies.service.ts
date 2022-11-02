import { HttpStatus, Injectable } from '@nestjs/common';
import { GenresService } from 'src/genres/genres.service';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly genresService: GenresService,
  ) {}

  async getMoviesByType(queryType: string): Promise<any> {
    const response: any = await this.moviesRepository.getMovies({ queryType });
    const { data: genres } = await this.genresService.getGenres();

    const moviesWithExtendedGenres = response.results.reduce((acc, movie) => {
      const extendedGenres = movie.genre_ids.map((id) =>
        genres.find((genre) => genre.id === id),
      );
      acc.push({ ...movie, genres: extendedGenres });
      return acc;
    }, []);

    return {
      data: moviesWithExtendedGenres,
      code: HttpStatus.OK,
    };
  }
}
