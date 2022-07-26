import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Questions } from './questions-model/questions-model';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [SequelizeModule.forFeature([Questions])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
