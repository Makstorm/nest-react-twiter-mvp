import { Module } from '@nestjs/common';
import { PostModule } from './modules';

@Module({
  imports: [PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
