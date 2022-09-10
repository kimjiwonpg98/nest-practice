import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    WsResponse,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { EventsDto } from './dto/events.dto';

@WebSocketGateway(8080, { namespace: 'chat' })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    client: Record<string, any>;

    constructor() {
        this.client = {};
    }

    @WebSocketServer()
    server: Server;

    public handleConnection(client): void {
        client.leave(client.id);
        client.data.roomId = `room:lobby`;
        client.join('room:lobby');
    }

    public handleDisconnect(client): void {
        console.log('bye', client['nickname']);
        delete this.client[client['nickname']];
    }

    @SubscribeMessage('setInit')
    onInit(client: Socket, data: EventsDto) {
        console.log(client);
        if (client.data.isInit) {
            return;
        }

        client.data.nickname = data.nickname
            ? data.nickname
            : '낯선사람' + client.id;

        client.data.isInit = true;

        return {
            nickname: client.data.nickname,
            room: {
                roomId: 'room:lobby',
                roomName: 'room:lobby',
            },
        };
    }

    @SubscribeMessage('connect')
    connect(@MessageBody() data: EventsDto, @ConnectedSocket() client: Socket) {
        const [nickname, room] = [data.nickname, data.room];
        const message = `${nickname}이 ${room}에 입장하셨슴당`;
        this.server.emit('comeOn' + room, message);
    }

    @SubscribeMessage('events')
    onEvent(client: Socket, message: string) {
        client.broadcast.emit('room:lobby', message);
    }

    @SubscribeMessage('sendMessage')
    sendMessage(client: Socket, message: string): void {
        client.rooms.forEach((roomId) =>
            client.to(roomId).emit('getMessage', {
                id: client.id,
                nickname: client.data.nickname,
                message,
            }),
        );
    }

    @SubscribeMessage('getChatRoomList')
    getChatRoomList(client: Socket, chatRoom: string) {
        const chat = {
            'room:lobby': {
                roomId: 'room:lobby',
                roomName: 'room:lobby',
            },
        };
        client.emit('getChatRoomList', chat);
    }
}
