import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Episode } from './episode.entity';

@Entity()
export class Anime {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ default: 'Esse anime ainda não possui descrição' })
  description?: string;

  @Column({ nullable: false })
  initialLetter: string;

  @Column({ default: 0 })
  numberOfEps: number;

  @Column({ default: 0 })
  numberOfMovies: number;

  @Column({ default: '?' })
  status: string;

  @Column({ default: false })
  subtitled: boolean;

  @Column({ default: false })
  dubbed: boolean;

  @Column({ default: 'Autor não informado' })
  author: string;

  @Column({ default: 'Estudio não informado' })
  studio: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  deslikes: number;

  @Column({ default: 0 })
  favorites: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    type => Episode,
    episode => episode.anime,
  )
  episodes: Episode[];
}
