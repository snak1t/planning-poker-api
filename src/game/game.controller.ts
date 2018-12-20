import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpCode,
  HttpStatus,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Game } from './game.entity';
import { CreateGameDto } from './create-game.dto';
import { GamesService } from './game.service';

@Controller('game')
export class GamesController {
  constructor(private readonly gameService: GamesService) {}

  @Get('user/:user')
  async findAll(@Param('user') user: string): Promise<{ games: Game[] }> {
    const games = await this.gameService.all(user);
    return {
      games,
    };
  }

  @Get(':id')
  async find(@Param('id') id) {
    return this.gameService.find(id, { relations: ['stories'] });
  }

  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    try {
      const game = await this.gameService.save(createGameDto);
      return { game };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async remove(@Query() queryObject: { gameId: string }) {
    const id = await this.gameService.remove(Number(queryObject.gameId));
    return { id };
  }
}
