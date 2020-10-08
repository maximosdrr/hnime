import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Episode } from './episode.entity';
import { Movie } from './movie.entity';

@Entity()
export class Anime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ default: 'Esse anime ainda não possui descrição' })
  description: string;

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

  // @Column({ default: 'Estudio não informado' })
  // studio: string;

  // @Column({ default: 0 })
  // likes: number;

  // @Column({ default: 0 })
  // deslikes: number;

  // @Column({ default: 0 })
  // favorites: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    type => Episode,
    episode => episode.anime,
  )
  episodes: Episode[];

  @OneToMany(
    type => Movie,
    movies => movies.anime,
  )
  movies: Movie[];

  @ManyToMany(type => Category)
  @JoinTable()
  categories: Category[];
}
