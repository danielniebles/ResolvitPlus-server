import { HttpStatus, Injectable } from '@nestjs/common';
import { GenresService } from 'src/genres/genres.service';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly genresService: GenresService,
  ) {}

  async getBasicMoviesByType(queryType: string, page: number): Promise<any> {
    const response: any = await this.moviesRepository.getMovies({
      queryType,
      page,
    });
    const moviesWithExtendedGenres = await this.extendMovieGenres(response);

    return {
      data: moviesWithExtendedGenres,
      code: HttpStatus.OK,
    };
  }

  async getExtendedMoviesByType(queryType: string, page: number): Promise<any> {
    const response: any = await this.moviesRepository.getMovies({
      queryType,
      page,
    });
    const extendedMovies = [];

    for (let i = 0; i < response.results.length; i++) {
      const images = await this.getMovieImages({ id: response.results[i].id });
      extendedMovies.push({
        ...response.results[i],
        images,
      });
    }

    return {
      data: extendedMovies,
      code: HttpStatus.OK,
    };
  }

  async getMovieImages({ id }) {
    return this.moviesRepository.getMovieImages({
      movieId: id,
    });
  }

  async getMoviesByKeyword(keyword: string, page: number) {
    const response: any = await this.moviesRepository.getMoviesByKeyword({
      keyword,
      page,
    });
    const moviesWithExtendedGenres = await this.extendMovieGenres(response);

    return {
      data: moviesWithExtendedGenres,
      code: HttpStatus.OK,
    };
  }

  async getMoviesByParams(genres: number, page: number) {
    const response: any = await this.moviesRepository.getMoviesByParams({
      genres,
      page,
    });
    const moviesWithExtendedGenres = await this.extendMovieGenres(response);

    return {
      data: moviesWithExtendedGenres,
      code: HttpStatus.OK,
    };
  }

  private async extendMovieGenres(response) {
    const { data: genres } = await this.genresService.getGenres();

    return response.results.reduce((acc, movie) => {
      const extendedGenres = movie.genre_ids.map((id) =>
        genres.find((genre) => genre.id === id),
      );
      acc.push({ ...movie, genres: extendedGenres });
      return acc;
    }, []);
  }
}
