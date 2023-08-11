import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Users } from './users.schema';
import { Projects } from './projects.schema';

export type UsersDocument = HydratedDocument<Tasks>;

@Schema()
export class Tasks {
    @Prop( { required: true })
    title : string;

    @Prop({ default: Date.now })
    begin_date : Date;

    @Prop({ default: Date.now })
    end_date : Date;

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    updated_at: Date;

    @Prop( { required: true })
    status : string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Projects'})
    project_id : Projects;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
    author : Users;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);