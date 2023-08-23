import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { NotesService } from './notes.service';

interface Note {
    id: string;
    email: string;
    content: string;
}

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Post('/create')
    async createNote(
        @Body() { email }: Note,
        @Res() res: any,
    ): Promise<{ statusCode: number; message: string; note: Note }> {
        try {
            const note = await this.notesService.create({ email });
            return res.status(HttpStatus.CREATED).send({
                statusCode: HttpStatus.CREATED,
                message: 'Note created',
                note,
            });
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/get/:email')
    async getNotes(@Param('email') email: string): Promise<Note[]> {
        try {
            const notes = await this.notesService.findAll(email);
            return notes;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/update')
    async updateNotes(@Body() oldnote: Note): Promise<Note> {
        try {
            const note = await this.notesService.update(oldnote);
            console.log(note);
            return note;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/delete')
    async deleteNotes(
        @Body() { id, email }: { id: string; email: string },
        @Res() res: any,
    ): Promise<{ statusCode: number; message: string }> {
        try {
            await this.notesService.delete(id);
            return res.status(HttpStatus.OK).send({
                statusCode: HttpStatus.OK,
                message: 'Note deleted',
            });
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
