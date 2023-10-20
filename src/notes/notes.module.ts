import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesSchema } from 'src/schema/notes.schema';
import { UsersSchema } from 'src/schema/users.schema';
import { SubnotesSchema } from 'src/schema/subnotes.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Notes', schema: NotesSchema }, { name: 'Users', schema: UsersSchema }, { name: 'Subnotes', schema: SubnotesSchema }])],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
