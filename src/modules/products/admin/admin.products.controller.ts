import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  UseGuards,
  Req,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateProductBaseDto } from './dto/products.base.dto';
import { RoutesProductsAdmin } from '../enums/routes.products.enums';
import { AuthGuard } from '@nestjs/passport';

/*
    import services
*/
import { AdminProductService } from './admin.products.service';
import { Request } from 'express';
import { ResponseServerService } from 'src/utils/ResponseServer.utils';
import { StatusCode } from 'src/enums/StatusCode';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard('jwt'))
@Controller('api/admin/products')
export class AdminProductsControllerProtected {
  constructor(
    private readonly productService: AdminProductService,
    private readonly responseService: ResponseServerService,
  ) {}

  @Get(RoutesProductsAdmin.getProducts)
  getProducts(@Query('offset') offset: string, @Req() req: Request) {
    const user = req.user;
    if (user.rol === 'client')
      return this.responseService.error(StatusCode.UNAUTHORIZED, '');

    return this.productService.getProducts(offset);
  }

  @Get(RoutesProductsAdmin.getProductsByType)
  getProductsByType(
    @Param('type') type: string,
    @Query('offset') offset: string,
  ) {
    return this.productService.getProductsByType(type, offset);
  }

  @Get(RoutesProductsAdmin.getProductById)
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Post(RoutesProductsAdmin.postNewProduct)
  @UseInterceptors(FileInterceptor('image'))
  postNewProduct(
    @UploadedFile() image: Express.Multer.File,
    @Body() data: CreateProductBaseDto,
    @Req() req: Request,
  ) {
    if (req.user.rol === 'client')
      return this.responseService.error(StatusCode.UNAUTHORIZED, '');

    return this.productService.postNewProduct(data, image);
  }

  @Patch(RoutesProductsAdmin.putProduct)
  @UseInterceptors(FileInterceptor('image'))
  putProductById(
    @Param('id') id: string,
    @Body() data: CreateProductBaseDto,
    @UploadedFile() image: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (req.user.rol === 'client')
      return this.responseService.error(StatusCode.UNAUTHORIZED, '');

    return this.productService.putProductsById(id, data, image);
  }

  @Delete(RoutesProductsAdmin.deleteProduct)
  deleteProductById(@Param('id') id: string) {
    return this.productService.deleteProductById(id);
  }
}
