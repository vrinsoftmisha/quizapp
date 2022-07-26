import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Sequelize from 'sequelize';
import { Questions } from './questions-model/questions-model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Questions) private readonly questions: typeof Questions,
  ) {}

  async addNewQuestion(questiondata) {
    const questionInfo = {
      name: questiondata.name,
      options: questiondata.options,
      categoryId: questiondata.categoryId,
      correctAnswer: questiondata.correctAnswer,
    };
    return await this.questions.create(questionInfo);
  }

  async getCategoryBasedQuestion(id: number) {
    const whereCondition = {
      categoryId: id,
    };
    const findOptions = {
      where: whereCondition,
      attributes: ['id', 'name', 'options', 'categoryId'],
      order: [Sequelize.fn('RAND')],
    };
    const question = this.questions.findOne(findOptions);
    return question;
  }

  async verifyanswer(verifyanswer) {
    const whereCondition = {
      id: verifyanswer.id,
    };
    const findOptions = {
      where: whereCondition,
    };
    const questionDetails = await this.questions.findOne(findOptions);
    if (questionDetails.correctAnswer === verifyanswer.answer) {
      return { message: 'correct answer' };
    }
    return { message: 'wrong answer' };
  }
}
