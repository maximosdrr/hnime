import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieLink } from 'src/entities/movie-link.entity';
import { Movie } from 'src/entities/movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieLinkRepo } from './repositories/movie-link/repository';
import { MovieRepo } from './repositories/movie/repository';

@Module({
  controllers: [MovieController],
  providers: [MovieService, MovieRepo, MovieLinkRepo],
  imports: [TypeOrmModule.forFeature([Movie, MovieLink])],
})
export class MovieModule {}
