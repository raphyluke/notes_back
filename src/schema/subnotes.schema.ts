import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { Users } from './users.schema';
import { Blocs } from './blocs.schema';
import { Notes } from './notes.schema';

export type UsersDocument = HydratedDocument<Subnotes>;

@Schema()
export class Subnotes {
    @Prop({type : mongoose.Schema.Types.ObjectId, ref: 'Notes'})
    note : Notes;

    @Prop( { required: true })
    title : string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
    author : Users;

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    updated_at: Date;

    @Prop()
    blocs : [Blocs];
}

export const SubnotesSchema = SchemaFactory.createForClass(Subnotes);