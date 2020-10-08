import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Anime } from './anime.entity';
import { EpisodeLink } from './episode-link.entity';

@Entity()
export class Episode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: '?' })
  duration: string;

  @Column({default: 'https://fatosdesconhecidos.com.br/wp-content/uploads/2019/11/naruto-4.jpg'})
  image: string;

  @OneToMany(
    type => EpisodeLink,
    links => links.episode,
  )
  links: EpisodeLink[];

  @ManyToOne(
    type => Anime,
    anime => anime.episodes,
    { nullable: false },
  )
  anime: Anime;
}
