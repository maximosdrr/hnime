import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EpisodeLink } from 'src/entities/episode-link.entity';
import { Episode } from 'src/entities/episode.entity';
import { DeleteResult } from 'src/interfaces/delete-result';
import { EpisodeService } from './episode.service';

@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Post('insert')
  insert(@Body() episode: Episode): Promise<Episode> {
    return this.episodeService.insert(episode);
  }

  @Get('find')
  findAll(@Query('anime') animeId: string): Promise<Episode[]> {
    return this.episodeService.findAll(animeId);
  }

  @Put('update')
  update(@Body() episode: Episode): Promise<Episode> {
    return this.episodeService.update(episode);
  }

  @Delete('delete')
  delete(@Query('id') id: string): Promise<DeleteResult> {
    return this.episodeService.delete(id);
  }

  @Post('link/insert')
  insertLink(@Body() link: EpisodeLink): Promise<EpisodeLink> {
    return this.episodeService.insertLink(link);
  }

  @Put('link/update')
  updateLink(@Body() link: EpisodeLink): Promise<EpisodeLink> {
    return this.episodeService.updateLink(link);
  }

  @Delete('link/delete')
  deleteLink(@Query('id') id: string): Promise<DeleteResult> {
    return this.episodeService.deleteLink(id);
  }
}
