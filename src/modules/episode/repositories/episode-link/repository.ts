import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EpisodeLink } from 'src/entities/episode-link.entity';
import { NotFoundException } from 'src/features/exceptions/not-found.exception';
import { SqlException } from 'src/features/exceptions/sql.exception';
import { DeleteResult } from 'src/interfaces/delete-result';
import { Repository } from 'typeorm';

@Injectable()
export class EpisodeLinkRepo {
  constructor(
    @InjectRepository(EpisodeLink) private readonly db: Repository<EpisodeLink>,
  ) {}

  async insert(link: EpisodeLink): Promise<EpisodeLink> {
    try {
      const insertResult = await this.db.insert(link);
      link.id = insertResult.identifiers[0].id;
      return link;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async update(link: EpisodeLink): Promise<EpisodeLink> {
    try {
      let linkToUpdate = await this.db.findOne(link.id);
      if (!linkToUpdate) throw new NotFoundException('Link');
      const currentId = linkToUpdate.id;
      linkToUpdate = link;
      linkToUpdate.id = currentId;
      const updateResult = await this.db.save(linkToUpdate);
      return updateResult;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      const episodeToDelete = await this.db.findOne(id);
      if (!episodeToDelete) throw new NotFoundException('Link');
      const deleteResult = await this.db.delete(id);
      if (!deleteResult.affected) return { deleted: false };
      return { deleted: true };
    } catch (e) {
      throw new SqlException(e);
    }
  }
}
