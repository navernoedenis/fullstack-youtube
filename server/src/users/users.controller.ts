import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuthUserGuard } from '@/auth/guards/auth-user.guard';
import {
  AuthUserRequest,
  AuthVisitorRequest,
} from '@/auth/interaces/auth-request.interface';
import { AuthVisitorGuard } from '@/auth/guards/auth-visitor.guard';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return updated user credentials' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: "Request doesn't have access-token" })
  @ApiNotFoundResponse({ description: 'User not found' })
  // swagger
  @Put(':id')
  @UseGuards(AuthUserGuard)
  async update(
    @Req() req: AuthUserRequest,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.findOne('id', userId, {
      me: req.user,
      notFoundException: true,
    });

    return this.usersService.update(userId, updateUserDto, req.user);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User deleted' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  // swagger
  @Delete(':id')
  @UseGuards(AuthUserGuard)
  async delete(@Req() req: AuthUserRequest, @Param('id') userId: string) {
    await this.usersService.findOne('id', userId, {
      me: req.user,
      notFoundException: true,
    });

    return this.usersService.delete(userId, req.user);
  }

  @ApiOperation({ summary: 'Subscibe/unsubscribe user' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Subscibed/unsubscribed' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  // swagger
  @Post(':id/subscribe')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthUserGuard)
  async subscribe(@Req() req: AuthUserRequest, @Param('id') userId: string) {
    await this.usersService.findOne('id', userId, {
      me: req.user,
      notFoundException: true,
    });

    return this.usersService.subscribe(userId, req.user);
  }

  @ApiOperation({ summary: 'Find user by username' })
  @ApiOkResponse({ description: 'Return user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  // swagger
  @Get('username/:username')
  @UseGuards(AuthVisitorGuard)
  async findOneById(
    @Req() req: AuthVisitorRequest,
    @Param('username') username: string,
  ) {
    return this.usersService.findOne('username', username, {
      me: req.user,
      notFoundException: true,
    });
  }

  @ApiOperation({ summary: 'Find user subscriptions' })
  @ApiOkResponse({ description: 'Return subscribtions' })
  @ApiNotFoundResponse({ description: 'User not found' })
  // swagger
  @UseGuards(AuthVisitorGuard)
  @Get('username/:username/subscriptions')
  async subscriptions(
    @Req() req: AuthVisitorRequest,
    @Param('username') username: string,
  ) {
    const user = await this.usersService.findOne('username', username, {
      notFoundException: true,
    });

    return this.usersService.subscriptions(user.id, req.user);
  }
}
