import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UsersService } from '@/users/users.service';
import { VideosService } from './videos.service';

import { AuthUserGuard } from '@/auth/guards/auth-user.guard';
import { AuthVisitorGuard } from '@/auth/guards/auth-visitor.guard';

import {
  AuthUserRequest,
  AuthVisitorRequest,
} from '@/auth/interaces/auth-request.interface';

import { CreateVideoDto } from './dto/create-video.dto';
import { VideoCommentDto } from './dto/video-comment.dto';

@ApiTags('videos')
@Controller('/api/videos')
export class VideosController {
  constructor(
    private readonly usersService: UsersService,
    private readonly videosService: VideosService,
  ) {}

  @ApiOperation({ summary: 'Add new video' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Return created video' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Invalid access-token' })
  @ApiForbiddenResponse({ description: "Request doesn't have access-token" })
  // swagger
  @Post()
  @UseGuards(AuthUserGuard)
  async create(
    @Req() req: AuthUserRequest,
    @Body() createVideoDto: CreateVideoDto,
  ) {
    return this.videosService.create(createVideoDto, req.user);
  }

  @ApiOperation({ summary: 'Find last 20 videos' })
  @ApiOkResponse({ description: 'Return last 20 videos' })
  // swagger
  @Get('/last')
  @UseGuards(AuthVisitorGuard)
  async findLast(@Req() req: AuthVisitorRequest) {
    return this.videosService.findAll({ me: req.user, take: 20 });
  }

  @ApiOperation({ summary: 'Find all videos' })
  @ApiOkResponse({ description: 'Return last 20 new videos' })
  // swagger
  @Get('/all')
  @UseGuards(AuthVisitorGuard)
  async findAll(@Req() req: AuthVisitorRequest) {
    return this.videosService.findAll({ me: req.user });
  }

  @ApiOperation({ summary: 'Find all user videos' })
  @ApiOkResponse({ description: 'Return all user videos' })
  @ApiNotFoundResponse({ description: 'User not found' })
  // swagger
  @Get('/all/:username')
  @UseGuards(AuthVisitorGuard)
  async findAllByUsername(
    @Req() req: AuthVisitorRequest,
    @Param('username') username: string,
  ) {
    const user = await this.usersService.findOne('username', username, {
      me: req.user,
      notFoundException: true,
    });

    return this.videosService.findAll({ userId: user.id, me: req.user });
  }

  @ApiOperation({ summary: 'Get my recomendation videos' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return recomendation videos' })
  @ApiForbiddenResponse({ description: "Request doesn't have access-token" })
  // swagger
  @Get('/recommendations')
  @UseGuards(AuthUserGuard)
  async myRecommendations(@Req() req: AuthUserRequest) {
    return this.videosService.myRecommendations(req.user);
  }

  @ApiOperation({ summary: 'Get my subscriptions videos' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return subscription videos' })
  @ApiForbiddenResponse({ description: "Request doesn't have access-token" })
  // swagger
  @Get('/subscriptions')
  @UseGuards(AuthUserGuard)
  async mySubscriptions(@Req() req: AuthUserRequest) {
    return this.videosService.mySubscriptions(req.user);
  }

  @ApiOperation({ summary: 'Find liked videos' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return all liked videos' })
  @ApiForbiddenResponse({ description: "Request doesn't have access-token" })
  // swagger
  @Get('/likes')
  @UseGuards(AuthUserGuard)
  async likes(@Req() req: AuthUserRequest) {
    return this.videosService.myLikes(req.user);
  }

  @ApiOperation({ summary: 'Find videos by query' })
  @ApiQuery({ name: 'query' })
  @ApiOkResponse({ description: 'Return videos' })
  // swagger
  @Get('/search')
  @UseGuards(AuthVisitorGuard)
  async search(@Req() req: AuthVisitorRequest, @Query('query') query: string) {
    return this.videosService.search(query, req.user);
  }

  @ApiOperation({ summary: 'Find video by id' })
  @ApiOkResponse({ description: 'Return video' })
  @ApiNotFoundResponse({ description: 'Video not found' })
  // swagger
  @Get(':id')
  @UseGuards(AuthVisitorGuard)
  async findOne(@Req() req: AuthVisitorRequest, @Param('id') videoId: string) {
    return this.videosService.findOne(videoId, req.user);
  }

  @ApiOperation({ summary: 'Delete video' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Video deleted' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiForbiddenResponse({ description: "Request doesn't have access-token" })
  @ApiNotFoundResponse({ description: 'Video not found' })
  // swagger
  @Delete(':id')
  @UseGuards(AuthUserGuard)
  async delete(@Req() req: AuthUserRequest, @Param('id') videoId: string) {
    const video = await this.videosService.findOne(videoId);
    const isMyVideo = video.user.id === req.user.id;
    const isAdminOrRoot = this.usersService.checkIsAdminOrRoot(req.user.roles);

    return this.videosService.delete(videoId, isMyVideo || isAdminOrRoot);
  }

  @ApiOperation({ summary: 'Add view to video' })
  @ApiOkResponse({ description: 'View added to video' })
  @ApiNotFoundResponse({ description: 'Video not found' })
  // swagger
  @Post(':id/view')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthVisitorGuard)
  async addView(@Req() req: AuthVisitorRequest, @Param('id') videoId: string) {
    await this.videosService.findOne(videoId);
    return this.videosService.addView(videoId, req.user);
  }

  @ApiOperation({ summary: 'Add like to video' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Like added to video' })
  @ApiForbiddenResponse({ description: "Request doesn't have access-token" })
  @ApiNotFoundResponse({ description: 'Video not found' })
  // swagger
  @Post(':id/like')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthUserGuard)
  async addLike(@Req() req: AuthUserRequest, @Param('id') videoId: string) {
    await this.videosService.findOne(videoId);
    return this.videosService.addLike(videoId, req.user);
  }

  @ApiOperation({ summary: 'Add dislike to video' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Dislike added to video' })
  @ApiForbiddenResponse({ description: "Request doesn't have access-token" })
  @ApiNotFoundResponse({ description: 'Video not found' })
  // swagger
  @Post(':id/dislike')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthUserGuard)
  async addDislike(@Req() req: AuthUserRequest, @Param('id') videoId: string) {
    await this.videosService.findOne(videoId);
    return this.videosService.addDislike(videoId, req.user);
  }

  @ApiOperation({ summary: 'Add comment to video' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Return comment' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiForbiddenResponse({ description: "Request doesn't have access-token" })
  @ApiNotFoundResponse({ description: 'Video not found' })
  // swagger
  @Post(':id/comments')
  @UseGuards(AuthUserGuard)
  async createComment(
    @Req() req: AuthUserRequest,
    @Param('id') videoId: string,
    @Body() videoCommentDto: VideoCommentDto,
  ) {
    await this.videosService.findOne(videoId);
    return this.videosService.addComment(videoId, videoCommentDto, req.user);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Comment deleted' })
  @ApiBadRequestResponse({ description: 'You are not author of this comment' })
  @ApiForbiddenResponse({ description: "Request doesn't have access-token" })
  @ApiNotFoundResponse({ description: 'Video comment not found' })
  // swagger
  @Delete(':id/comments/:commentId')
  @UseGuards(AuthUserGuard)
  async deleteComment(
    @Req() req: AuthUserRequest,
    @Param('commentId') commentId: string,
  ) {
    const comment = await this.videosService.findComment(commentId);
    const isMyComment = comment.user.id === req.user.id;
    const isAdminOrRoot = this.usersService.checkIsAdminOrRoot(req.user.roles);

    return this.videosService.deleteComment(
      commentId,
      isMyComment || isAdminOrRoot,
    );
  }

  @ApiOperation({ summary: 'Add like to video comment' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Added like to video comment' })
  @ApiForbiddenResponse({ description: "Request doesn't have access-token" })
  @ApiNotFoundResponse({ description: 'Video comment not found' })
  // swagger
  @Post(':id/comments/:commentId/like')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthUserGuard)
  async addCommentLike(
    @Req() req: AuthUserRequest,
    @Param('commentId') commentId: string,
  ) {
    await this.videosService.findComment(commentId);
    return this.videosService.addCommentLike(commentId, req.user);
  }

  @ApiOperation({ summary: 'Delete like to video comment' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Added dislike to video comment' })
  @ApiForbiddenResponse({ description: "Request doesn't have access-token" })
  @ApiNotFoundResponse({ description: 'Video comment not found' })
  // swagger
  @Post(':id/comments/:commentId/dislike')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthUserGuard)
  async addDislikeComment(
    @Req() req: AuthUserRequest,
    @Param('commentId') commentId: string,
  ) {
    await this.videosService.findComment(commentId);
    return this.videosService.addCommentDislike(commentId, req.user);
  }
}
