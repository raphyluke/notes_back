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

    /**
     * Create a new note for a given email.
     * @param email The email of the user creating the note.
     * @param res The response object.
     * @returns An object containing the status code, message, and created note.
     * @throws HttpException if there was an error creating the note.
     */
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

    /**
     * Get all notes for a given email.
     * @param email The email of the user whose notes are being retrieved.
     * @returns An array of notes.
     * @throws HttpException if there was an error retrieving the notes.
     */
    @Get('/get/:email')
    async getNotes(@Param('email') email: string): Promise<Note[]> {
        try {
            const notes = await this.notesService.findAll(email);
            return notes;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update an existing note.
     * @param oldnote The note to be updated.
     * @returns The updated note.
     * @throws HttpException if there was an error updating the note.
     */
    @Put('/update')
    async updateNotes(@Body() oldnote: Note): Promise<Note> {
        try {
            const note = await this.notesService.update(oldnote);
<<<<<<< HEAD
=======
            console.log(note);
>>>>>>> 6c97740b9b763a2de814ba81746bad90a775efbf
            return note;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete an existing note.
     * @param id The id of the note to be deleted.
     * @param email The email of the user who owns the note.
     * @param res The response object.
     * @returns An object containing the status code and message.
     * @throws HttpException if there was an error deleting the note.
     */
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
