import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Episode } from './episode.entity';

@Entity()
export class EpisodeLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'longtext' })
  source: string;

  @Column({ default: '?' })
  server: string;

  @Column({ default: '?' })
  quality: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(
    type => Episode,
    episode => episode.links,
    { nullable: false },
  )
  episode: Episode;
}
