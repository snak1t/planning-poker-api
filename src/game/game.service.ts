import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Game } from './game.entity';
import { CreateGameDto } from './create-game.dto';

export type GameOverview = Pick<Game, Exclude<keyof Game, 'stories'>> & {
  storiesCount: number;
};

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
  ) {}

  async all(user: string): Promise<GameOverview[]> {
    const games = await this.gameRepository.find({
      relations: ['stories'],
      where: {
        user,
      },
    });
    return games.map(game => {
      const { stories, ...otherFields } = game;
      const myGame = {
        ...otherFields,
        isCompleted: stories.every(story => story.score !== 0),
        storiesCount: stories.length,
      };
      return myGame;
    });
  }

  async find(id: string, options: FindOneOptions<Game>) {
    return await this.gameRepository.findOne(id, options);
  }

  async save(createGameDto: CreateGameDto) {
    try {
      return await this.gameRepository.save(createGameDto);
    } catch (error) {
      throw new Error('Duplicate entry');
    }
  }

  async remove(id: number): Promise<number> {
    await this.gameRepository.delete(id);
    return id;
  }
}
