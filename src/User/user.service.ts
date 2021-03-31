import { Injectable } from '@nestjs/common';
import UserEntity from '../db/user.entity';
import CreateUserDto from './dto/create-user.dto';
import BookEntity from '../db/book.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class UserServices {
  async insert(userDetails: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create();
    const { name } = userDetails;
    userEntity.name = name;
    await UserEntity.save(userEntity);
    return userEntity;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }

  async getBooksOfUser(userID: number): Promise<BookEntity[]> {
    console.log(typeof userID);
    const user: UserEntity = await UserEntity.findOne({
      where: { id: userID },
      relations: ['books'],
    });
    return user.books;
  }

  async remove(id: number): Promise<any> {
    return await UserEntity.delete({id});
  }

  async update(id: number, userDetails: CreateUserDto): Promise<any> {
    const userEntity: any = {};
    userEntity.name = userDetails.name;
    return await UserEntity.update({id}, userEntity);
  }
}
