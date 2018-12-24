import { Module } from '@nestjs/common';
import { PlayRoomGateway } from './play-room.gateway';

@Module({
  providers: [PlayRoomGateway],
})
export class PlayRoomModule {}
