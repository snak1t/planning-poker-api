import {
  WebSocketGateway,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';

interface DataPayload {
  gameId: string;
}

interface Player {
  info: {
    login: string;
    picture: string;
  };
  id: string;
  score: string | number | null;
}

@WebSocketGateway()
export class PlayRoomGateway implements OnGatewayDisconnect {
  @SubscribeMessage('enter-room')
  joinRoom(client, data: DataPayload & { newPlayer: Player }) {
    data.newPlayer.id = client.id;
    const event = 'append-user';
    client.join(data.gameId.toString());
    client.broadcast.emit(event, data);
    client.emit('self-append-user', data);
  }

  broadcastUserDisconnected(client) {
    client.broadcast.emit('user-left', { userId: client.id });
  }

  @SubscribeMessage('leave-room')
  leaveRoom(client, data: DataPayload) {
    client.leave(data.gameId);
    this.broadcastUserDisconnected(client);
  }
  handleDisconnect(client: any) {
    this.broadcastUserDisconnected(client);
  }

  @SubscribeMessage('emit-play-room-patch')
  sendAppliedPatch(client, data: DataPayload) {
    const event = 'apply-play-room-patch';
    return client.broadcast.emit(event, data);
  }

  @SubscribeMessage('emit-add-story')
  sendAddStory(client, data: DataPayload) {
    const event = 'add-story';
    return client.broadcast.emit(event, data);
  }

  @SubscribeMessage('emit-update-story')
  sendUpdateStory(client, data: DataPayload) {
    const event = 'update-story';
    return client.broadcast.emit(event, data);
  }
  @SubscribeMessage('emit-remove-story')
  sendRemoveStory(client, data: DataPayload) {
    const event = 'remove-story';
    return client.broadcast.emit(event, data);
  }
}
