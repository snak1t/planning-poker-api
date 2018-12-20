import { Story } from './story.entity';

export class CreateStoryDto {
  gameId: number;
  stories: Array<Partial<Story>>;
}
