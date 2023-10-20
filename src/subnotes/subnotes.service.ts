import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subnotes } from 'src/schema/subnotes.schema';
import { Users } from 'src/schema/users.schema';
import { Notes } from 'src/schema/notes.schema';

@Injectable()
export class SubnotesService {
    constructor(
        @InjectModel('Notes') private readonly notesModel: Model<Notes>,
        @InjectModel('Subnotes') private readonly subnotesModel: Model<Subnotes>,
        @InjectModel('Users') private readonly usersModel: Model<Users>
    ) {}

    async create(body: { email: string, noteId: string }): Promise<Subnotes> {
        try {
            // Find the user from the email
            const user = await this.usersModel.findOne({ email: body.email });
      
            if (!user) {
              throw new Error('User not found');
            }
            console.log("noteId : " + body.noteId)
            // Find the note from the noteId
            const noteFromId = await this.notesModel.findById(body.noteId);
      
            if (!noteFromId) {
              throw new Error('Note not found');
            }

            // Create a new note
            const newNote = new this.subnotesModel({
              note: noteFromId._id,
              title: 'New Note',
              author: user._id,
              blocs: [],
              test : "Coucou"
            });
            
      
            const note = await newNote.save();
      
            // Add a new bloc to the note
            const newBloc : any = {
              order: 0,
              note: note._id,
              type: 'text',
              url: 'https://via.placeholder.com/150',
              content: '',
              author: user._id
            };
      
            note.blocs.push(newBloc);
            await note.save();
      
            return note;
          } catch (err) {
            console.error(err);
            throw new Error('Error while creating note');
          }
    }
    async findAll(email: string): Promise<any> {
        try {
            // find user from email
            const user = await this.usersModel.find({ email: email });
            if (user.length === 0) {
              throw new Error('User not found');
            }
      
            // find all notes from user
            const notes = await this.subnotesModel.find({ author: user[0]._id });
            return notes;
          } catch (err) {
            console.log(err);
            throw new Error('An error occurred while fetching the notes');
          }
    }    
    async update(subnotes : any): Promise<any> {
        try {
            const subnote = await this.subnotesModel.findByIdAndUpdate(subnotes._id, subnotes);
            return subnote;
        } catch (err) {
            console.error(err);
            throw new Error('Error while updating subnote');
        }
    }
    async delete(id): Promise<any> {
        try {
            const subnote = await this.subnotesModel.findByIdAndDelete(id);
            return subnote;
        } catch (err) {
            console.error(err);
            throw new Error('Error while deleting subnote');
        }
    }
}
