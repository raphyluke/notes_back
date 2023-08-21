import { Body, Controller, Delete, Get, Post, Put, Query, Res } from '@nestjs/common';
import { NotesService } from './notes.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Post("/create")
    async createNote(@Body() body : any) {
        return await this.notesService.create(body);
    }

    @Get("/get")
    async getNotes(@Query('email') email: any) {
        try {
            return await this.notesService.findAll(email);
        } catch (err) {
            // Handle error, for example, return a specific status code and message
            throw new HttpException('An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put("/update")
    async updateNotes(@Body() body : any) {
        console.log(body);
        return await this.notesService.update(body);
    }

    @Delete("/delete")
    async deleteNotes(@Body() body: any) {
        await this.notesService.delete(body.id);
        const notes = await this.notesService.findAll(body.email);
        // with status code, for example, return a specific status code and message
        return { statusCode: 200, message: 'Note deleted' };
    }

}
