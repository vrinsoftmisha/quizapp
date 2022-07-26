import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category-model/category-model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly category: typeof Category,
  ) {}

  async getAllCategories(pageNo: number, pageSize = 5) {
    try {
      const response = await this.category.findAndCountAll({
        attributes: ['id', 'name', 'createdAt'],
        order: [['createdAt', 'desc']],
        limit: Number(pageSize),
        offset: Number(pageSize * pageNo - pageSize),
      });
      return response;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
