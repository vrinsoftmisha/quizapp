import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questions: QuestionsService) {}

  @Post()
  async addNewQuestion(@Body() questionData): Promise<any> {
    try {
      return this.questions.addNewQuestion(questionData);
    } catch (error) {}
  }

  @Get(':id')
  async getCategoryBasedQuestion(@Param() params): Promise<any> {
    try {
      return await this.questions.getCategoryBasedQuestion(params.id);
    } catch (error) {}
  }

  @Post('/verify')
  async verifyAnswer(@Body() answerData): Promise<any> {
    try {
      return await this.questions.verifyanswer(answerData);
    } catch (error) {}
  }
}
