import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Anime } from './anime.entity';
import { MovieLink } from './movie-link.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ default: '?' })
  duration: string;

  @Column({ default: false })
  subtitled: boolean;

  @Column({ default: false })
  dubbed: boolean;

  @Column({ nullable: false })
  initialLetter: string;

  @Column({ default: 'Autor não informado' })
  author: string;

  @Column({ default: 'Estudio não informado' })
  studio: string;

  @Column({ default: 'Descrição não informada' })
  description: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  deslikes: number;

  @Column({ default: 0 })
  favorites: number;

  @OneToMany(
    type => MovieLink,
    links => links.movie,
  )
  links: MovieLink[];

  @ManyToOne(
    type => Anime,
    anime => anime.movies,
  )
  anime: Anime;
}
