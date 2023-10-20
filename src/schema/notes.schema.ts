import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { Users } from './users.schema';
import { Blocs } from './blocs.schema';

export type NotesDocument = HydratedDocument<Notes>;

@Schema()
export class Notes {
    @Prop( { required: true })
    title : string;

    @Prop()
    note : number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
    author : Users;

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    updated_at: Date;

    // Array of Blocs
    @Prop()
    blocs : [Blocs];
}

export const NotesSchema = SchemaFactory.createForClass(Notes);