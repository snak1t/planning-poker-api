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
  Put,
} from '@nestjs/common';
import { Game } from './game.entity';
import { CreateGameDto } from './create-game.dto';
import { GamesService, GameOverview } from './game.service';
import { UpdateGameDto } from 'dist/src/game/update-game.dto';

@Controller('game')
export class GamesController {
  constructor(private readonly gameService: GamesService) {}

  @Get('user/:user')
  async findAll(
    @Param('user') user: string,
  ): Promise<{ games: GameOverview[] }> {
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

  @Put()
  async updateGame(@Body() updateGameDto: UpdateGameDto) {
    try {
      const game = await this.gameService.update(updateGameDto);
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
