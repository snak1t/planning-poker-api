import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Game } from '../game/game.entity';
import { ScoreTransformer } from './score.transformer';

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
  })
  title: string;
  @Column('text')
  description: string;

  @Column({ type: String, transformer: new ScoreTransformer() })
  score: string | number;

  @ManyToOne(type => Game, game => game.stories)
  @JoinColumn({ name: 'gameId' })
  game: Game;
}
