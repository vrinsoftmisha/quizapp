import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllCategories(@Query() query): Promise<any> {
    return this.categoryService.getAllCategories(query.pageNo, query.pageSize);
  }
}
