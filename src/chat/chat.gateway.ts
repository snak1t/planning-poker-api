import {
  WebSocketGateway,
  OnGatewayConnection,
  SubscribeMessage,
} from '@nestjs/websockets';
@WebSocketGateway()
export class ChatGateway {
  @SubscribeMessage('send-message')
  handleChatSubscription(client, data) {
    client.broadcast.emit('message-received', data);
  }
}
