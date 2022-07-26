import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'debian-sys-maint',
      password: 'LXfGt22nEzY5aAnH',
      database: 'quiz-app',
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CategoryModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
