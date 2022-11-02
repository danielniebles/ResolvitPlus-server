import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [MoviesModule, ConfigModule.forRoot(), GenresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
