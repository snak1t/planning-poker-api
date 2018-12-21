import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './story.entity';
import { Repository } from 'typeorm';
import { CreateStoryDto } from './create-story.dto';
import { UpdateGameDto } from '../game/update-game.dto';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
  ) {}

  async all(): Promise<Story[]> {
    return this.storyRepository.find();
  }

  async create(createStoryDto: CreateStoryDto) {
    const { gameId, stories } = createStoryDto;
    const mappedStories = this.storyRepository
      .create(stories)
      .map(story => this.setRelation(story, gameId));
    return await this.storyRepository.save(mappedStories);
  }

  async removeStory(id: number): Promise<{ id: number }> {
    await this.storyRepository.delete(id);
    return { id };
  }

  async updateStory(updateStoryDto: UpdateGameDto) {
    return await this.storyRepository.save(updateStoryDto);
  }

  setRelation(story: Story, id: number): Story {
    story.game = { id } as any;
    return story;
  }
}
