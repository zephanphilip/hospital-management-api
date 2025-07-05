import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://123:123@cluster0.ebfqvzu.mongodb.net/')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
