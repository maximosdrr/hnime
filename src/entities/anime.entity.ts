import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Anime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;
}
