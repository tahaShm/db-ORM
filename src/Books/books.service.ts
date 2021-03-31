import { Injectable } from '@nestjs/common';
import BookEntity from 'src/db/book.entity';
import UserEntity from 'src/db/user.entity';
import CreateBookDto from '../User/dto/create-book.dto';
import GenreEntity from '../db/genre.entity';

@Injectable()
export default class BooksService {
  async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
    const { name, userID, genreIDs } = bookDetails;
    const book = new BookEntity();
    book.name = name;
    book.user = await UserEntity.findOne(userID);
    book.genres = [];
    for (let i = 0; i < genreIDs.length; i++) {
      const genre = await GenreEntity.findOne(genreIDs[i]);
      book.genres.push(genre);
    }
    await book.save();
    return book;
  }

  async getAllBooks(): Promise<BookEntity[]> {
    return BookEntity.find();
  }
  async remove(id: number): Promise<any> {
    return await BookEntity.delete({ id });
  }

  async update(id: number, bookDetails: CreateBookDto): Promise<any> {
    const { name, userID } = bookDetails;
    let newBook: any = {};
    newBook.name = name;
    newBook.user = await UserEntity.findOne(userID);
    return BookEntity.update({id},newBook);
  }
}
