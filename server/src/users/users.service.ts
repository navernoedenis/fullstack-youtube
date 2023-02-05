import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, Profile, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '@/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserStatistic } from '@/users/interfaces/user-statistic.interface';
import { UserPayload } from '@/users/interfaces/user-payload.interface';

interface FindOneParams {
  me?: UserPayload | null;
  notFoundException?: boolean;
  withPassword?: boolean;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, avatar, cover, username, bio } = createUserDto;

    const isEmailTaken = await this.findOne('email', email);
    if (isEmailTaken) {
      const errorMessage = `Email: ${email}, is already taken!`;
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const isUsernameTaken = await this.findOne('username', username);
    if (isUsernameTaken) {
      const errorMessage = `Username: ${username}, is already taken!`;
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashPassword,
        profile: {
          create: {
            username,
            bio,
            avatar,
            cover,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    delete user.password;
    return user;
  }

  async findOne(
    key: keyof Pick<User, 'email' | 'id'> | keyof Pick<Profile, 'username'>,
    value: string,
    params: FindOneParams = {
      me: null,
      notFoundException: false,
      withPassword: false,
    },
  ) {
    const { me, notFoundException, withPassword } = params;

    let request = this.prisma.user.findFirst({
      where: {
        [key]: value,
      },
      include: {
        profile: true,
      },
    });

    if (key === 'username') {
      request = this.prisma.user.findFirst({
        where: {
          profile: {
            username: value,
          },
        },
        include: {
          profile: true,
        },
      });
    }

    const user = await request;

    if (!user && notFoundException) {
      const errorMessage = 'User not found';
      throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    }

    if (!user) {
      return null;
    }

    !withPassword && delete user.password;
    delete user.profile.userId;

    const statistic = await this.getUserStatistic(user.id, me);
    const userWithStatistic = Object.assign(user, { statistic });

    return userWithStatistic;
  }

  async update(userId: string, updateUserDto: UpdateUserDto, me: UserPayload) {
    const { email, password, newPassword, username, avatar, cover, bio } =
      updateUserDto;

    const isAdminOrRoot = this.checkIsAdminOrRoot(me.roles);

    if (!isAdminOrRoot && userId !== me.id) {
      const errorMessage = 'You can update only own profile';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    if (email && email !== me.email) {
      const isEmailTaken = await this.findOne('email', email);
      if (isEmailTaken) {
        const errorMessage = 'Email is already taken';
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      }
    }

    const user = await this.findOne('id', userId, {
      withPassword: true,
    });

    let hashPassword: string | undefined = undefined;
    if (password && newPassword) {
      const isPasswordsMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordsMatch) {
        const errorMessage = 'Wrong password';
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      }

      hashPassword = await bcrypt.hash(newPassword, 10);
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      include: {
        profile: true,
      },
      data: {
        email,
        password: hashPassword,
        profile: {
          update: {
            username,
            avatar,
            cover,
            bio,
          },
        },
      },
    });

    delete updated.password;
    return updated;
  }

  async delete(userId: string, me: UserPayload) {
    const isAdminOrRoot = this.checkIsAdminOrRoot(me.roles);

    if (!isAdminOrRoot && userId !== me.id) {
      const errorMessage = 'You can remove only your own account';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async subscribe(userId: string, me: UserPayload) {
    if (userId === me.id) {
      const errorMessage = "You can't subscribe on yourself";
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const isSubscribed = await this.prisma.subscription.findFirst({
      where: {
        subscriberId: me.id,
        subscribedToId: userId,
      },
    });

    if (isSubscribed) {
      await this.prisma.subscription.delete({
        where: {
          id: isSubscribed.id,
        },
      });
    } else {
      await this.prisma.subscription.create({
        data: {
          subscriber: {
            connect: {
              id: me.id,
            },
          },
          subscribedTo: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }
  }

  async subscriptions(userId: string, me: UserPayload | null) {
    const subscribedToIds = await this.prisma.subscription.findMany({
      where: {
        subscriberId: userId,
      },
      select: {
        subscribedToId: true,
      },
    });

    const users = await this.prisma.user.findMany({
      where: {
        id: {
          in: subscribedToIds.map((s) => s.subscribedToId),
        },
      },
      include: {
        profile: true,
      },
      orderBy: {
        profile: {
          username: 'asc',
        },
      },
    });

    const subscriptions = [];

    for (const user of users) {
      const statistic = await this.getUserStatistic(user.id, me);
      delete user.password;
      delete user.profile.userId;
      subscriptions.push(Object.assign(user, { statistic }));
    }

    return subscriptions;
  }

  public checkIsAdminOrRoot(roles: Role[]) {
    const isAdmin = roles.includes(Role.Admin);
    const isRoot = roles.includes(Role.Root);
    return isAdmin || isRoot;
  }

  private async getUserStatistic(
    userId: string,
    me: UserPayload | null = null,
  ) {
    const statistic = {} as UserStatistic;

    statistic.channelViews = 0;
    statistic.isSubscribed = false;
    statistic.subscribers = 0;

    if (me) {
      const channelVideoIds = await this.prisma.video.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
        },
      });

      const channelViews = await this.prisma.videoView.count({
        where: {
          videoId: {
            in: channelVideoIds.map((video) => video.id),
          },
        },
      });

      const isSubscribed = await this.prisma.subscription.findFirst({
        where: {
          subscriberId: me.id,
          subscribedToId: userId,
        },
      });

      statistic.channelViews = channelViews;
      statistic.isSubscribed = Boolean(isSubscribed);
    }

    statistic.subscribers = await this.prisma.subscription.count({
      where: {
        subscribedToId: userId,
      },
    });

    return statistic;
  }
}
