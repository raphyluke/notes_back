import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
    // required
    @Prop( { required: true })
    first_name: string;

    @Prop( { required: true })
    last_name: string;

    @Prop( { required: true })
    email: string;

    @Prop( { required: true })
    username: string;

    @Prop( { required: false })
    password: string;

    @Prop()
    oauth_accounts : "google" | null;

    @Prop()
    picture : string;

    // default
    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    updated_at: Date;

}

export const UsersSchema = SchemaFactory.createForClass(Users);