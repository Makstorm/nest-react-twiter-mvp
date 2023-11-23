import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ type: String, description: 'Post creator', example: 'User1' })
  public username: string;

  @ApiProperty({ type: String, description: 'Post text', example: 'Hi there' })
  public text: string;

  @ApiProperty({ type: String, description: 'Replied post id', example: 1 })
  public postId?: number;
}
