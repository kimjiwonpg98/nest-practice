import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080)
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('events')
    onEvent(client: Socket, data: string): Observable<WsResponse<number>> {
        return from([1, 2, 3, 4]).pipe(
            map((item) => ({ event: 'events', data: item })),
        );
    }
}
