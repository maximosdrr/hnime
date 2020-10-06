import { Module } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { EpisodeRepo } from './repositories/episode/repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from 'src/entities/episode.entity';
import { EpisodeLink } from 'src/entities/episode-link.entity';
import { EpisodeLinkRepo } from './repositories/episode-link/repository';

@Module({
  providers: [EpisodeService, EpisodeRepo, EpisodeLinkRepo],
  controllers: [EpisodeController],
  imports: [TypeOrmModule.forFeature([Episode, EpisodeLink])],
})
export class EpisodeModule {}
