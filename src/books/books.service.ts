import {Injectable, NotFoundException } from "@nestjs/common"
import {Book} from "./books.model"
import {InjectModel} from '@nestjs/mongoose'
import { Model } from "mongoose"
@Injectable()
export class BooksService {
    private books: Book[] = [];
    constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}
    async insertBook(title: string, author:string, published:number)
    {
        const newBook = new this.bookModel({title, author, published});
       //Mongoose saves to database with this easy method:
        const res = await newBook.save();
        return res.id as string
    }

    async getBooks(){
        const books = await this.bookModel.find().exec()
        return books.map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            published: book.published,
          }));
    }
    async getSingleBook(bookId:string){

        const book = await this.findBook(bookId)
        return {
            id: book.id,
            title: book.title,
            author: book.author,
            published: book.published,
        
        };
    }

    async updateBook(bookId:string, title:string, author:string, published:number){
        const updatedBook = await this.findBook(bookId);
        if(title) {
            updatedBook.title = title;
        }
        if(author) {
            updatedBook.author = author;
        }
        if(published) {
            updatedBook.published = published;
        }
        updatedBook.save();
        }
        async deleteBook(bookId:string){
         const result= await this.bookModel.deleteOne({_id:bookId}).exec(); 
            if(result.n === 0){
                throw new NotFoundException("Could not find book.")
            }
        }
        private async findBook(id:string): Promise<Book> {
            let book;
            try{ book = await (await this.bookModel.findById(id));
            }catch(err){
                throw new NotFoundException('Could not find book');
            }
            if(!book){
                throw new NotFoundException('Could not find book');
            }
            return book;
    }
}