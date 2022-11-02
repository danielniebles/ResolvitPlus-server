import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Genre } from './interfaces/Genre';

@Injectable()
export class GenresRepository {
  constructor(private readonly httpService: HttpService) {}

  getGenres(): Promise<{ genres: Genre[] }> {
    return lastValueFrom(
      this.httpService
        .get(`https://api.themoviedb.org/3/genre/movie/list`, {
          headers: { Authorization: `Bearer ${process.env.IMG_API_TOKEN}` },
        })
        .pipe(map((response) => response.data)),
    );
  }
}
