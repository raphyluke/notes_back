import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Users } from './users.schema';

export type UsersDocument = HydratedDocument<Projects>;

@Schema()
export class Projects {
    @Prop( { required: true })
    title : string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
    author : Users;

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    updated_at: Date;
}

export const ProjectsSchema = SchemaFactory.createForClass(Projects);