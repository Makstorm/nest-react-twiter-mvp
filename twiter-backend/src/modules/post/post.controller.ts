import { CreatePostDto, ItemFilter, PostServiceTag, Twit } from '@domain';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  @Inject(PostServiceTag) private readonly service: PostService;

  @ApiResponse({ type: Twit })
  @Post()
  public async create(
    @Body() dto: CreatePostDto,
    @Req() req: Request,
  ): Promise<Twit> {
    console.log(req.body);
    return await this.service.create(dto);
  }

  @ApiResponse({ type: [Twit] })
  @Get()
  public async getAll(): Promise<Twit[]> {
    return await this.service.getAll();
  }

  @ApiResponse({ type: [Twit] })
  @Get('item')
  public async getOnel(@Query() filter: ItemFilter): Promise<Twit> {
    return await this.service.getOne(filter.id);
  }
}
