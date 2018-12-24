import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './game/game.module';
import { StoryModule } from './stories/story.module';
import { ChatModule } from './chat/chat.module';
import { PlayRoomModule } from './play-room/play-room.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GamesModule,
    StoryModule,
    ChatModule,
    PlayRoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
