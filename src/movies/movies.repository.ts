import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { RawMovie } from './interfaces/RawMovie';

@Injectable()
export class MoviesRepository {
  constructor(private readonly httpService: HttpService) {}

  getMovies({ queryType, page }): Promise<RawMovie[]> {
    return lastValueFrom(
      this.httpService
        .get(`https://api.themoviedb.org/3/movie/${queryType}?page=${page}`, {
          headers: { Authorization: `Bearer ${process.env.MOVIES_API_TOKEN}` },
        })
        .pipe(map((response) => response.data.results)),
    );
  }

  getMovieImages({ movieId }): Promise<RawMovie[]> {
    return lastValueFrom(
      this.httpService
        .get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
          headers: { Authorization: `Bearer ${process.env.MOVIES_API_TOKEN}` },
        })
        .pipe(map((response) => response.data)),
    );
  }

  getMoviesByKeyword({ keyword, page }): Promise<RawMovie[]> {
    return lastValueFrom(
      this.httpService
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${keyword}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.MOVIES_API_TOKEN}`,
            },
          },
        )
        .pipe(map((response) => response.data.results)),
    );
  }

  getMoviesByParams({ genres, page }): Promise<RawMovie[]> {
    return lastValueFrom(
      this.httpService
        .get(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genres}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.MOVIES_API_TOKEN}`,
            },
          },
        )
        .pipe(map((response) => response.data.results)),
    );
  }
}
