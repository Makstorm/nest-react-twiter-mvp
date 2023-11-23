import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostServiceTag } from '@domain';

@Module({
  controllers: [PostController],
  providers: [{ provide: PostServiceTag, useClass: PostService }],
})
export class PostModule {}
