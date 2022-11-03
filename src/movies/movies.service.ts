import { HttpStatus, Injectable } from '@nestjs/common';
import { GenresService } from 'src/genres/genres.service';
import { Response } from 'src/shared/interfaces/Response';
import { RawMovie } from './interfaces/RawMovie';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly genresService: GenresService,
  ) {}

  async getBasicMoviesByType(
    queryType: string,
    page: number,
  ): Promise<Response<RawMovie[]>> {
    try {
      const response = await this.moviesRepository.getMovies({
        queryType,
        page,
      });
      const moviesWithExtendedGenres = await this.extendMovieGenres(response);

      return {
        data: moviesWithExtendedGenres,
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new Error('Failed to get movies');
    }
  }

  async getExtendedMoviesByType(
    queryType: string,
    page: number,
  ): Promise<Response<RawMovie[]>> {
    try {
      const response = await this.moviesRepository.getMovies({
        queryType,
        page,
      });
      const extendedMovies = [];

      for (let i = 0; i < response.length; i++) {
        const images = await this.getMovieImages({ id: response[i].id });
        extendedMovies.push({
          ...response[i],
          images,
        });
      }

      return {
        data: extendedMovies,
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new Error('Failed to extend movies');
    }
  }

  async getMovieImages({ id }) {
    return this.moviesRepository.getMovieImages({
      movieId: id,
    });
  }

  async getMoviesByKeyword(
    keyword: string,
    page: number,
  ): Promise<Response<RawMovie[]>> {
    try {
      const response: any = await this.moviesRepository.getMoviesByKeyword({
        keyword,
        page,
      });
      const moviesWithExtendedGenres = await this.extendMovieGenres(response);

      return {
        data: moviesWithExtendedGenres,
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new Error('Failed to get movie by keyword');
    }
  }

  async getMoviesByParams(
    genres: number,
    page: number,
  ): Promise<Response<RawMovie[]>> {
    try {
      const response: any = await this.moviesRepository.getMoviesByParams({
        genres,
        page,
      });
      const moviesWithExtendedGenres = await this.extendMovieGenres(response);

      return {
        data: moviesWithExtendedGenres,
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new Error('Failed to get movie params');
    }
  }

  async getMovieById(movieId: number): Promise<Response<RawMovie>> {
    try {
      const response = await this.moviesRepository.getMovieById({
        movieId,
      });

      return {
        data: response,
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new Error('Failed to get movie by id');
    }
  }

  private async extendMovieGenres(response) {
    const { data: genres } = await this.genresService.getGenres();

    return response.reduce((acc, movie) => {
      const extendedGenres = movie.genre_ids.map((id) =>
        genres.find((genre) => genre.id === id),
      );
      acc.push({ ...movie, genres: extendedGenres });
      return acc;
    }, []);
  }
}
