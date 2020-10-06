import { Injectable } from '@nestjs/common';
import { EpisodeLink } from 'src/entities/episode-link.entity';
import { Episode } from 'src/entities/episode.entity';
import { DeleteResult } from 'src/interfaces/delete-result';
import { EpisodeLinkRepo } from './repositories/episode-link/repository';
import { EpisodeRepo } from './repositories/episode/repository';

@Injectable()
export class EpisodeService {
  constructor(
    private readonly episodeRepo: EpisodeRepo,
    private readonly linkRepo: EpisodeLinkRepo,
  ) {}

  insert(episode: Episode): Promise<Episode> {
    return this.episodeRepo.insert(episode);
  }

  findAll(animeId: string): Promise<Episode[]> {
    return this.episodeRepo.findAll(animeId);
  }

  update(episode: Episode): Promise<Episode> {
    return this.episodeRepo.update(episode);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.episodeRepo.delete(id);
  }

  insertLink(link: EpisodeLink): Promise<EpisodeLink> {
    return this.linkRepo.insert(link);
  }

  updateLink(link: EpisodeLink): Promise<EpisodeLink> {
    return this.linkRepo.update(link);
  }

  deleteLink(id: string): Promise<DeleteResult> {
    return this.linkRepo.delete(id);
  }
}
