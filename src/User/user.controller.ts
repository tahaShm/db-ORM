import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import { UserServices } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersServices: UserServices) {}

  //'postUser()' will handle the creating of new User
  @Post('post')
  postUser(@Body() user: CreateUserDto) {
    return this.usersServices.insert(user);
  }
  
  @Get()
  getAll() {
    return this.usersServices.getAllUsers();
  }

  @Get('books')
  getBooks(@Body('userID', ParseIntPipe) userID: number) {
    return this.usersServices.getBooksOfUser(userID);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usersServices.remove(id)
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() genre: CreateUserDto) {
    return this.usersServices.update(id, genre)
  }
}
