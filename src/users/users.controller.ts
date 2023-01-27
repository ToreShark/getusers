import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  NotFoundException,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterDto } from './dto/filter-status.dto';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(FilterDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    return session.color;
  }
  
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(
      body.phone.replace(/[^0-9]/g, ''),
      body.password,
    );
  }

  @Post('/signin')
  signin(@Body() body: CreateUserDto) {
    return this.authService.signin(
      body.phone.replace(/[^0-9]/g, ''),
      body.password,
    );
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  @Get()
  findAllUsers(@Query('phone') phone: string) {
    console.log('phone', phone);
    return this.usersService.find(phone);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
