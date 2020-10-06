import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
export class MovieLink {
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
    type => Movie,
    movie => movie.links,
    { nullable: false },
  )
  movie: Movie;
}
