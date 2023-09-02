import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { Users } from './users.schema';
import { Notes } from './notes.schema';

export type UsersDocument = HydratedDocument<Blocs>;

@Schema()
export class Blocs {
    @Prop( { required: true })
    order : number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Notes'})
    note : Notes;

    @Prop( { required: true })
    type : string;

    @Prop( { required: true })
    url : string | null;

    @Prop( { required: true })
    content : string | null;

    @Prop( {default: false})
    checked : boolean;

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    updated_at: Date;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
    author : Users;

}

export const BlocsSchema = SchemaFactory.createForClass(Blocs);