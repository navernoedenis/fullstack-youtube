import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';

import { CreateVideoDto } from './dto/create-video.dto';
import { VideoCommentDto } from './dto/video-comment.dto';

import { UserPayload } from '@/users/interfaces/user-payload.interface';
import { UserStatistic } from '@/users/interfaces/user-statistic.interface';
import { VideoCommentStatistic } from './interfaces/comment-statistic.interface';
import { VideoStatistic } from './interfaces/video-statistic.interface';

interface FindAllParams {
  me?: UserPayload | null;
  take?: number;
  userId?: string;
}

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  async create(createVideoDto: CreateVideoDto, me: UserPayload) {
    const { title, description, url, thumbnail } = createVideoDto;

    const video = await this.prisma.video.create({
      data: {
        title,
        description,
        url,
        thumbnail,
        user: {
          connect: {
            id: me.id,
          },
        },
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        comments: true,
      },
    });

    const videoStatistic = await this.getVideoStatistic(video.id, me);

    delete video.userId;
    delete video.user.password;

    return Object.assign(video, {
      statistic: videoStatistic,
    });
  }

  async findAll(params: FindAllParams = {}) {
    const { me, take, userId } = params;

    const videos = await this.prisma.video.findMany({
      where: { ...(userId ? { userId } : {}) },
      select: {
        id: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...(take ? { take } : {}),
    });

    return this.getVideosByIds(
      videos.map((video) => video.id),
      me,
    );
  }

  async findOne(videoId: string, me: UserPayload | null = null) {
    const video = await this.prisma.video.findFirst({
      where: {
        id: videoId,
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        comments: {
          include: {
            user: {
              include: {
                profile: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!video) {
      const errorMessage = 'Video not found';
      throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    }

    const userStatistic = await this.getUserStatistic(video.userId, me);
    const userWithStatistic = Object.assign(video.user, {
      statistic: userStatistic,
    });

    const videoStatistic = await this.getVideoStatistic(videoId, me);
    delete video.userId;
    delete video.user.password;
    delete video.user.profile.userId;

    const commentsWithStatistic = [];
    for (const comment of video.comments) {
      const statistic = await this.getCommentStatistic(comment.id, me);
      delete comment.userId;
      delete comment.user.password;
      delete comment.user.profile.userId;
      commentsWithStatistic.push(Object.assign(comment, { statistic }));
    }

    return Object.assign(video, {
      user: userWithStatistic,
      statistic: videoStatistic,
      comments: commentsWithStatistic,
    });
  }

  async delete(videoId: string, isMyVideo: boolean) {
    if (!isMyVideo) {
      const errorMessage = 'You are not author of this video';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    await this.prisma.video.delete({
      where: {
        id: videoId,
      },
    });
  }

  async addView(videoId: string, me: UserPayload | null = null) {
    await this.prisma.videoView.create({
      data: {
        videoId,
        userId: me?.id,
      },
    });
  }

  async addLike(videoId: string, me: UserPayload) {
    const isLiked = await this.prisma.videoLike.findFirst({
      where: {
        userId: me.id,
        videoId,
        value: 1,
      },
    });

    const isDisliked = await this.prisma.videoLike.findFirst({
      where: {
        userId: me.id,
        videoId,
        value: -1,
      },
    });

    if (isLiked) {
      await this.prisma.videoLike.delete({
        where: {
          id: isLiked.id,
        },
      });
    } else if (isDisliked) {
      await this.prisma.videoLike.update({
        where: {
          id: isDisliked.id,
        },
        data: {
          value: 1,
        },
      });
    } else {
      await this.prisma.videoLike.create({
        data: {
          userId: me.id,
          videoId,
          value: 1,
        },
      });
    }
  }

  async addDislike(videoId: string, me: UserPayload) {
    const isLiked = await this.prisma.videoLike.findFirst({
      where: {
        userId: me.id,
        videoId,
        value: 1,
      },
    });

    const isDisliked = await this.prisma.videoLike.findFirst({
      where: {
        userId: me.id,
        videoId,
        value: -1,
      },
    });

    if (isLiked) {
      await this.prisma.videoLike.update({
        where: {
          id: isLiked.id,
        },
        data: {
          value: -1,
        },
      });
    } else if (isDisliked) {
      await this.prisma.videoLike.delete({
        where: {
          id: isDisliked.id,
        },
      });
    } else {
      await this.prisma.videoLike.create({
        data: {
          userId: me.id,
          videoId,
          value: -1,
        },
      });
    }
  }

  async addComment(
    videoId: string,
    videoCommentDto: VideoCommentDto,
    me: UserPayload,
  ) {
    const comment = await this.prisma.videoComment.create({
      data: {
        message: videoCommentDto.message,
        user: {
          connect: {
            id: me.id,
          },
        },
        video: {
          connect: {
            id: videoId,
          },
        },
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    const statistic = await this.getCommentStatistic(comment.id, me);

    delete comment.userId;
    return Object.assign(comment, { statistic });
  }

  async deleteComment(commentId: string, isMyComment: boolean) {
    if (!isMyComment) {
      const errorMessage = 'You are not author of this comment';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    await this.prisma.videoComment.delete({
      where: {
        id: commentId,
      },
    });
  }

  async addCommentLike(commentId: string, me: UserPayload) {
    const isLiked = await this.prisma.videoCommentLike.findFirst({
      where: {
        userId: me.id,
        commentId,
        value: 1,
      },
    });

    const isDisliked = await this.prisma.videoCommentLike.findFirst({
      where: {
        userId: me.id,
        commentId,
        value: -1,
      },
    });

    if (isLiked) {
      await this.prisma.videoCommentLike.delete({
        where: {
          id: isLiked.id,
        },
      });
    } else if (isDisliked) {
      await this.prisma.videoCommentLike.update({
        where: {
          id: isDisliked.id,
        },
        data: {
          value: 1,
        },
      });
    } else {
      await this.prisma.videoCommentLike.create({
        data: {
          userId: me.id,
          commentId,
          value: 1,
        },
      });
    }
  }

  async addCommentDislike(commentId: string, me: UserPayload) {
    const isLiked = await this.prisma.videoCommentLike.findFirst({
      where: {
        userId: me.id,
        commentId,
        value: 1,
      },
    });

    const isDisliked = await this.prisma.videoCommentLike.findFirst({
      where: {
        userId: me.id,
        commentId,
        value: -1,
      },
    });

    if (isLiked) {
      await this.prisma.videoCommentLike.update({
        where: {
          id: isLiked.id,
        },
        data: {
          value: -1,
        },
      });
    } else if (isDisliked) {
      await this.prisma.videoCommentLike.delete({
        where: {
          id: isDisliked.id,
        },
      });
    } else {
      await this.prisma.videoCommentLike.create({
        data: {
          userId: me.id,
          commentId,
          value: -1,
        },
      });
    }
  }

  async myLikes(me: UserPayload) {
    const videoLikes = await this.prisma.videoLike.findMany({
      where: {
        userId: me.id,
      },
      select: {
        videoId: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return this.getVideosByIds(
      videoLikes.map((like) => like.videoId),
      me,
    );
  }

  async myRecommendations(me: UserPayload) {
    const subscriptions = await this.prisma.subscription.findMany({
      where: {
        subscriberId: me.id,
      },
      select: {
        subscribedToId: true,
      },
    });

    const videos = await this.prisma.video.findMany({
      where: {
        user: {
          id: {
            notIn: subscriptions.map((s) => s.subscribedToId),
          },
        },
      },
      select: {
        id: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const views = await this.prisma.videoView.findMany({
      where: {
        userId: me.id,
      },
      select: {
        videoId: true,
      },
    });

    const watchedVideoIds = [...new Set(views.map((view) => view.videoId))];

    const recommendedVideoIds = videos
      .filter((v) => !watchedVideoIds.includes(v.id))
      .map((video) => video.id);

    return this.getVideosByIds(recommendedVideoIds, me);
  }

  async mySubscriptions(me: UserPayload) {
    const subscriptions = await this.prisma.subscription.findMany({
      where: {
        subscriberId: me.id,
      },
      select: {
        subscribedToId: true,
      },
    });

    if (!subscriptions.length) {
      return [];
    }

    const videos = await this.prisma.video.findMany({
      where: {
        userId: {
          in: subscriptions.map((s) => s.subscribedToId),
        },
      },
      select: {
        id: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!videos.length) {
      return [];
    }

    return this.getVideosByIds(
      videos.map((video) => video.id),
      me,
    );
  }

  async search(query: string, me: UserPayload | null = null) {
    if (!query) {
      return [];
    }

    const videos = await this.prisma.video.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
      },
    });

    if (!videos.length) {
      return [];
    }

    return this.getVideosByIds(
      videos.map((video) => video.id),
      me,
    );
  }

  async findComment(commentId: string) {
    const comment = await this.prisma.videoComment.findFirst({
      where: {
        id: commentId,
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!comment) {
      const errorMessage = 'Comment not found';
      throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    }

    return comment;
  }

  private async getVideosByIds(ids: string[], me: UserPayload | null = null) {
    const videos = [];

    for (const id of ids) {
      const video = await this.findOne(id, me);
      videos.push(video);
    }

    return videos;
  }

  private async getVideoStatistic(
    videoId: string,
    me: UserPayload | null = null,
  ) {
    const statistic = {} as VideoStatistic;

    statistic.isMyVideo = false;
    statistic.isViewed = false;
    statistic.isLiked = false;
    statistic.isDisliked = false;

    if (me) {
      const myVideo = await this.prisma.video.findFirst({
        where: {
          id: videoId,
          userId: me.id,
        },
      });

      const myView = await this.prisma.videoView.findFirst({
        where: {
          videoId,
          userId: me.id,
        },
      });

      const myLike = await this.prisma.videoLike.findFirst({
        where: {
          videoId,
          userId: me.id,
          value: 1,
        },
      });

      const myDislike = await this.prisma.videoLike.findFirst({
        where: {
          videoId,
          userId: me.id,
          value: -1,
        },
      });

      statistic.isMyVideo = Boolean(myVideo);
      statistic.isViewed = Boolean(myView);
      statistic.isLiked = Boolean(myLike);
      statistic.isDisliked = Boolean(myDislike);
    }

    statistic.comments = await this.prisma.videoComment.count({
      where: {
        videoId,
      },
    });

    statistic.views = await this.prisma.videoView.count({
      where: {
        videoId,
      },
    });

    statistic.likes = await this.prisma.videoLike.count({
      where: {
        videoId,
        value: 1,
      },
    });

    statistic.disLikes = await this.prisma.videoLike.count({
      where: {
        videoId,
        value: -1,
      },
    });

    return statistic;
  }

  private async getCommentStatistic(
    commentId: string,
    me: UserPayload | null = null,
  ) {
    const statistic = {} as VideoCommentStatistic;

    statistic.isLiked = false;
    statistic.isDisliked = false;

    if (me) {
      const isLiked = await this.prisma.videoCommentLike.findFirst({
        where: {
          commentId,
          userId: me.id,
          value: 1,
        },
      });

      const isDisliked = await this.prisma.videoCommentLike.findFirst({
        where: {
          commentId,
          userId: me.id,
          value: -1,
        },
      });

      statistic.isLiked = Boolean(isLiked);
      statistic.isDisliked = Boolean(isDisliked);
    }

    statistic.likes = await this.prisma.videoCommentLike.count({
      where: {
        commentId,
        value: 1,
      },
    });

    statistic.disLikes = await this.prisma.videoCommentLike.count({
      where: {
        commentId,
        value: -1,
      },
    });

    return statistic;
  }

  private async getUserStatistic(
    userId: string,
    me: UserPayload | null = null,
  ) {
    const statistic = {} as UserStatistic;

    statistic.isSubscribed = false;
    statistic.subscribers = 0;

    if (me) {
      const isSubscribed = await this.prisma.subscription.findFirst({
        where: {
          subscriberId: me.id,
          subscribedToId: userId,
        },
      });

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
