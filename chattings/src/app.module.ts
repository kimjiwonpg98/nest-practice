import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { FrontEndModule } from './front/front.module';

@Module({
    imports: [EventsModule, FrontEndModule],
})
export class AppModule {}
