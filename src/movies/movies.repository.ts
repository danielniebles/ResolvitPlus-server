import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Movie } from './movies.model';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MoviesRepository {
  constructor(private readonly httpService: HttpService) {}

  getMovies({ queryType }): Promise<Movie[]> {
    return lastValueFrom(
      this.httpService
        .get(`https://api.themoviedb.org/3/movie/${queryType}`, {
          headers: { Authorization: `Bearer ${process.env.IMG_API_TOKEN}` },
        })
        .pipe(map((response) => response.data)),
    );
  }
}
