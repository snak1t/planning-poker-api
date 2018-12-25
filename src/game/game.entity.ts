import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Story } from '../stories/story.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  user: string;
  @Column({
    unique: true,
  })
  title: string;
  @Column('text')
  description: string;

  @OneToMany(type => Story, story => story.game)
  stories: Story[];

  public isCompleted: boolean;
}
