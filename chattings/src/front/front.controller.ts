import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class FrontController {
    @Get()
    @Render('index')
    root() {
        return { message: 'Hello world!' };
    }
}
