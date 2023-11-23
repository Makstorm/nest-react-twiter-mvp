import { CreatePostDto, Twit } from '@domain';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  public async create(dto: CreatePostDto): Promise<Twit> {
    let post = null;

    if (dto.postId) {
      post = Twit.getById(dto.postId);
      console.log('post', post);

      if (!post) {
        throw new BadRequestException('Пост з таким id не існує');
      }
    }

    const newTwit = Twit.create(dto.username, dto.text, post);

    return newTwit;
  }

  public async getAll(): Promise<Twit[]> {
    return Twit.getList();
  }

  public async getOne(id: number): Promise<Twit> {
    return Twit.getById(id);
  }
}
