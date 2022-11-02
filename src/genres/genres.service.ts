import { HttpStatus, Injectable } from '@nestjs/common';
import { GenresRepository } from './genres.repository';
import { Response } from 'src/shared/interfaces/Response';
import { Genre } from './interfaces/Genre';

const COLORS = ['#1787A6', '#EBB237', '#ADB02C', '#DD6025'];

@Injectable()
export class GenresService {
  constructor(private readonly genresRepository: GenresRepository) {}

  async getGenres(): Promise<Response<Genre[]>> {
    try {
      const response: { genres: Genre[] } =
        await this.genresRepository.getGenres();

      const extended = response.genres.reduce((acc, val) => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        acc.push({ ...val, color });
        return acc;
      }, []);

      return {
        data: extended,
        code: HttpStatus.OK,
      };
    } catch (error) {
      return {
        data: error,
        code: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
