import { Module } from '@nestjs/common';
import { SubnotesController } from './subnotes.controller';
import { SubnotesService } from './subnotes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubnotesSchema } from 'src/schema/subnotes.schema';
import { UsersSchema } from 'src/schema/users.schema';
import { NotesSchema } from 'src/schema/notes.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Subnotes', schema: SubnotesSchema }, 
    { name: 'Notes', schema: NotesSchema }, 
    { name: 'Users', schema: UsersSchema }
  ])],
  controllers: [SubnotesController],
  providers: [SubnotesService]
})
export class SubnotesModule {}
