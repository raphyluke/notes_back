import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
    constructor(@InjectModel('Notes') private readonly notesModel: Model<any>, @InjectModel('Users') private readonly usersModel: Model<any> ) {}

    // Create, read all, read one, update, delete

    async create(body: any): Promise<any> {
        try {
          // Find the user from the email
          const user = await this.usersModel.findOne({ email: body.email });
      
          if (!user) {
            throw new Error("User not found");
          }
      
          // Create a new note
          const newNote = new this.notesModel({
            title: 'New Note',
            author: user._id,
            blocs: []
          });
      
          const note = await newNote.save();
      
          // Add a new bloc to the note
          const newBloc = {
            order: 0,
            note: note._id,
            type: "text",
            url: "https://via.placeholder.com/150",
            content: "",
            author: user._id
          };
      
          note.blocs.push(newBloc);
          await note.save();
      
          return note;
        } catch (err) {
          console.error(err);
          throw new Error("Error while creating note");
        }
      }

    async findAll(email): Promise<any> {
      try {
        // find user from email
        const user = await this.usersModel.find({ email: email });
        if (user.length === 0) {
          throw new Error('User not found');
        }
    
        // find all notes from user
        const notes = await this.notesModel.find({ author: user[0]._id });
        return notes;
      } catch (err) {
        console.log(err);
        throw new Error('An error occurred while fetching the notes');
      }
    }

    async findOne(id: string): Promise<any> {
        return await this.notesModel.findById(id).exec();
    }

    async update(note: any): Promise<any> {
      const updated = await this.notesModel.findByIdAndUpdate(note._id, note);
      return updated;
    }

    async delete(id: any): Promise<any> {
        return await this.notesModel.findByIdAndRemove(id);
    }
}
