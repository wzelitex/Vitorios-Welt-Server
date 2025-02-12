import { Injectable } from '@nestjs/common';
import { ResponseServerService } from 'src/utils/ResponseServer.utils';

/*
    import services
*/
import { CreateCommonCategories } from './logic/create.categories';
import { UpdateCommonCategories } from './logic/update.categories';
import { DeleteCommonCategories } from './logic/delete.categories';
import { GetCommonCategories } from './logic/get.categories';
import { StatusCode } from 'src/enums/StatusCode';
import { MessageCategories } from './enums/message.categories';
import { CreateCategoryDto } from './dto/create-categories-dto';
import { UpdateCategoryDto } from './dto/update-categories-dto';
import { ImageService } from 'src/utils/ImageService.utils';

@Injectable()
export class AdminCategoriesService {
  constructor(
    private readonly responseService: ResponseServerService,
    private readonly createCommonCategories: CreateCommonCategories,
    private readonly updateCommonCategories: UpdateCommonCategories,
    private readonly deleteCommonCategories: DeleteCommonCategories,
    private readonly getCommonCategories: GetCommonCategories,
    private readonly imageService: ImageService,
  ) {}

  /*
    GET categories list
  */
  async getCategories() {
    const categories = await this.getCommonCategories.getAllCategories();
    if (!categories || categories.length === 0)
      return this.responseService.error(
        StatusCode.NOT_FOUND,
        MessageCategories.noFoundCategories,
      );
    return this.responseService.success(
      StatusCode.OK,
      MessageCategories.foundCategories,
      categories,
    );
  }

  /*
  POST create new category
  */
  async postCategory(data: CreateCategoryDto, file: Express.Multer.File) {
    const image = await this.imageService.uploadFile(file);
    await this.createCommonCategories.createDocumentCategory(data, image);

    return this.responseService.success(
      StatusCode.CREATED,
      MessageCategories.createdCategory,
    );
  }

  /*
    PUT update category
  */
  async putCategory(id: string, data: UpdateCategoryDto) {
    const response = await this.updateCommonCategories.updateDocumentCategory(
      id,
      data,
    );
    if (!response)
      return this.responseService.error(
        StatusCode.NOT_FOUND,
        MessageCategories.noFoundCategories,
      );
    return this.responseService.success(
      StatusCode.OK,
      MessageCategories.updatedCategory,
    );
  }

  /*
    DELETE delete category
  */
  async deleteCategory(id: string) {
    const response = await this.deleteCommonCategories.deleteCategory(id);
    if (!response)
      return this.responseService.error(
        StatusCode.NOT_FOUND,
        MessageCategories.noFoundCategories,
      );
    return this.responseService.success(
      StatusCode.OK,
      MessageCategories.deletedCategory,
    );
  }
}
