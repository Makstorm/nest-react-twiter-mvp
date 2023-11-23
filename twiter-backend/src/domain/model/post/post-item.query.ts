import { ApiProperty } from '@nestjs/swagger';

export class ItemFilter {
  @ApiProperty({ type: String, example: 1 })
  public id: number;
}
