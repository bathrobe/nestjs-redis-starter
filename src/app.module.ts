import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose"
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    BooksModule,
    MongooseModule.forRoot("mongodb+srv://nestjstut:ZcxOkQHk4KgglMxp@cluster0.e9tf6.mongodb.net/test?retryWrites=true&w=majority"),
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
