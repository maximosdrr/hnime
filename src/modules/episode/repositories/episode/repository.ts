import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from 'src/entities/episode.entity';
import { NotFoundException } from 'src/features/exceptions/not-found.exception';
import { SqlException } from 'src/features/exceptions/sql.exception';
import { DeleteResult } from 'src/interfaces/delete-result';
import { Repository } from 'typeorm';

@Injectable()
export class EpisodeRepo {
  constructor(
    @InjectRepository(Episode) private readonly db: Repository<Episode>,
  ) {}

  async insert(episode: Episode): Promise<Episode> {
    try {
      const insertResult = await this.db.insert(episode);
      episode.id = insertResult.identifiers[0].id;
      return episode;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async findAll(animeId: string): Promise<Episode[]> {
    try {
      const episodes = await this.db.find({
        where: {
          anime: animeId,
        },
        join: {
          alias: 'e',
          leftJoinAndSelect: {
            links: 'e.links',
          },
        },
      });
      return episodes;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async update(episode: Episode): Promise<Episode> {
    try {
      let episodeToUpdate = await this.db.findOne(episode.id);
      if (!episodeToUpdate) throw new NotFoundException('Episodio');
      const currentId = episodeToUpdate.id;
      episodeToUpdate = episode;
      episodeToUpdate.id = currentId;
      const updateResult = await this.db.save(episodeToUpdate);
      return updateResult;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      const episodeToDelete = await this.db.findOne(id);
      if (!episodeToDelete) throw new NotFoundException('Episodio');
      const deleteResult = await this.db.delete(id);
      if (!deleteResult.affected) return { deleted: false };
      return { deleted: true };
    } catch (e) {
      throw new SqlException(e);
    }
  }
}
