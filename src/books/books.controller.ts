import { Controller, Post, Body, Get, Delete, Param, Patch } from '@nestjs/common';
import { BooksService } from "./books.service"


@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService)
     {}
     @Get()
    async getAllBooks(){
        const books = await this.booksService.getBooks();
        return books
    }
    @Get(':id')
    getBook(@Param('id') bookId:string){

        return this.booksService.getSingleBook(bookId);
    }
    @Post()
    async addBook(
        @Body('title') bookTitle:string, 
        @Body('author') bookAuthor: string, 
        @Body('published') bookPublished: number
        ) {
        //store the product
        const generatedId = await this.booksService
        .insertBook(bookTitle,bookAuthor, bookPublished);
        //send back valid JSON
        return {id: generatedId }
    }
        //patch is better for updates, put for replacing
        @Patch(':id')
        async updateBook(
            @Param('id') bookId:string, 
            @Body('title') bookTitle: string, 
            @Body('author') bookAuthor:string, 
            @Body('published') bookPublished:number
            ) {
            await this.booksService.updateBook(bookId, bookTitle, bookAuthor, bookPublished)
            return null;
    
        }
    @Delete(":id")
        async removeBook(@Param('id') bookId: string,){
            await this.booksService.deleteBook(bookId);
            return null;
        }
}
