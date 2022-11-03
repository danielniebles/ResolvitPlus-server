import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Movie } from './movies.model';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MoviesRepository {
  constructor(private readonly httpService: HttpService) {}

  getMovies({ queryType, page }): Promise<Movie[]> {
    return lastValueFrom(
      this.httpService
        .get(`https://api.themoviedb.org/3/movie/${queryType}?page=${page}`, {
          headers: { Authorization: `Bearer ${process.env.IMG_API_TOKEN}` },
        })
        .pipe(map((response) => response.data)),
    );
  }

  getMovieImages({ movieId }): Promise<Movie[]> {
    return lastValueFrom(
      this.httpService
        .get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
          headers: { Authorization: `Bearer ${process.env.IMG_API_TOKEN}` },
        })
        .pipe(map((response) => response.data)),
    );
  }

  getMoviesByKeyword({ keyword, page }) {
    return lastValueFrom(
      this.httpService
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${keyword}&page=${page}`,
          {
            headers: { Authorization: `Bearer ${process.env.IMG_API_TOKEN}` },
          },
        )
        .pipe(map((response) => response.data)),
    );
  }

  getMoviesByParams({ genres, page }) {
    return lastValueFrom(
      this.httpService
        .get(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genres}&page=${page}`,
          {
            headers: { Authorization: `Bearer ${process.env.IMG_API_TOKEN}` },
          },
        )
        .pipe(map((response) => response.data)),
    );
  }
}
