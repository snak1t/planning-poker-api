import {
  Controller,
  Get,
  All,
  Post,
  Body,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './create-story.dto';
import { UpdateGameDto } from '../game/update-game.dto';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}
  @Get()
  all() {
    return this.storyService.all();
  }

  @Post()
  create(@Body() createStoryDto: CreateStoryDto) {
    return this.storyService.create(createStoryDto);
  }

  @Put()
  update(@Body() updateGameDto: UpdateGameDto) {
    return this.storyService.updateStory(updateGameDto);
  }

  @Delete()
  removeStory(@Query() queryObject: { storyId: string }) {
    return this.storyService.removeStory(Number(queryObject.storyId));
  }
}
