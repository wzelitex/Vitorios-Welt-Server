import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RoutesCategories } from './enums/routes.categories';
import { CreateCategoryDto } from './dto/create-categories-dto';
import { FileInterceptor } from '@nestjs/platform-express';

/*
    import services
*/
import { AdminCategoriesService } from './categories.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(
    private readonly adminCategoriesService: AdminCategoriesService,
  ) {}

  @Get(RoutesCategories.getCategories)
  getCategories() {
    return this.adminCategoriesService.getCategories();
  }

  @Post(RoutesCategories.postCategories)
  @UseInterceptors(FileInterceptor('imagen'))
  postCategory(
    @Body() data: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.adminCategoriesService.postCategory(data, file);
  }

  @Patch(RoutesCategories.putCategories)
  putCategories(@Param('id') id: string, @Body() data: CreateCategoryDto) {
    return this.adminCategoriesService.putCategory(id, data);
  }

  @Delete(RoutesCategories.deleteCategories)
  deleteCategories(@Param('id') id: string) {
    return this.adminCategoriesService.deleteCategory(id);
  }
}
