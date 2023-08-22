import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { NotesModule } from './notes/notes.module';
import { NotesController } from './notes/notes.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb://notes_database/nest'), UsersModule, JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1d' },
  }), NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(NotesController);
  }
}
