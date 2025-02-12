import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesSchemaFactory } from './schema/categories.scheme';

/*
    import controllers
*/
import { CategoriesController } from './categories.controller';

/*
    import providers
*/
import { AdminCategoriesService } from './categories.service';

/*
    import utils
*/
import { ResponseServerService } from 'src/utils/ResponseServer.utils';
import { CreateCommonCategories } from './logic/create.categories';
import { GetCommonCategories } from './logic/get.categories';
import { UpdateCommonCategories } from './logic/update.categories';
import { DeleteCommonCategories } from './logic/delete.categories';
import { SanitizeService } from 'src/utils/SanitizeService.utils';
import { ImageService } from 'src/utils/ImageService.utils';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Categories',
        schema: CategoriesSchemaFactory,
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [
    ResponseServerService,
    AdminCategoriesService,
    CreateCommonCategories,
    GetCommonCategories,
    UpdateCommonCategories,
    DeleteCommonCategories,
    SanitizeService,
    ImageService,
  ],
})
export class CategoriesModule {}
