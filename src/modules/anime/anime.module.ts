import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anime } from 'src/entities/anime.entity';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';
import { AnimeRepo } from './repositories/anime/anime.repository';

@Module({
  controllers: [AnimeController],
  providers: [AnimeService, AnimeRepo],
  imports: [TypeOrmModule.forFeature([Anime])],
})
export class AnimeModule {}
