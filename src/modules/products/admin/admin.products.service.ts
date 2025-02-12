import { Injectable } from '@nestjs/common';

/* import service */
import { ResponseServerService } from 'src/utils/ResponseServer.utils';
import { CreateCommonProducts } from 'src/modules/products/logic/create.products';
import { StatusCode } from 'src/enums/StatusCode';
import {
  MessageDeleteProduct,
  MessageGetProduct,
  MessagePostProduct,
} from 'src/modules/products/enums/messageProducts.enums';
import { CreateProductBaseDto } from './dto/products.base.dto';
import { GetCommonProducts } from '../logic/get.products';
import { UpdateCommonProducts } from '../logic/update.products';
import { RemoveCommonProducts } from '../logic/remove.products';
import { ImageService } from 'src/utils/ImageService.utils';

@Injectable()
export class AdminProductService {
  constructor(
    private readonly responseService: ResponseServerService,
    private readonly createCommonProducts: CreateCommonProducts,
    private readonly getCommonProducts: GetCommonProducts,
    private readonly updateCommonProducts: UpdateCommonProducts,
    private readonly removeCommonProducts: RemoveCommonProducts,
    private readonly imageService: ImageService,
  ) {}

  /*
    GET products list

    @Param: offset 
  */
  async getProducts(offset: string) {
    const products = await this.getCommonProducts.getDocumentsProducts(offset);
    if (!products || products.length === 0)
      return this.responseService.error(
        StatusCode.NOT_FOUND,
        MessageGetProduct.productNotFound,
        [],
      );

    return this.responseService.success(
      StatusCode.OK,
      MessageGetProduct.getProduct,
      products,
    );
  }

  /*
    GET products by type product 

    @param: type: type products 
    @param: offset: page products to send
  */
  async getProductsByType(type: string, offset: string) {
    const products = await this.getCommonProducts.getDocumentsProductsByType(
      type,
      offset,
    );

    if (!products || products.length === 0)
      return this.responseService.error(
        StatusCode.NOT_FOUND,
        MessageGetProduct.productNotFound,
      );

    return this.responseService.success(
      StatusCode.OK,
      MessageGetProduct.getProduct,
      products,
    );
  }

  /*
    GET product by id

    @Param: id: id product to get
  */
  async getProductById(id: string) {
    const product = await this.getCommonProducts.getDocumentProductsById(id);
    if (!product)
      return this.responseService.error(
        StatusCode.NOT_FOUND,
        MessageGetProduct.productNotFound,
      );
    return this.responseService.success(
      StatusCode.OK,
      MessageGetProduct.getProduct,
      product,
    );
  }

  /*
    POST new product 

    @Param: body: info of product
  */
  async postNewProduct(data: CreateProductBaseDto, image: Express.Multer.File) {
    console.log('inicializando el servicio');
    const fileUploaded = await this.imageService.uploadFile(image);
    console.log('Url: ', fileUploaded);

    const newArrayProducts = [
      {
        image: fileUploaded,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        colors: data.colors,
        sizes: data.sizes,
        skin: data.skin,
        type: data.type,
      },
    ];

    console.log('new Product: ', newArrayProducts);

    await this.createCommonProducts.createDocumentsProducts(newArrayProducts);
    console.log('Product saved');

    return this.responseService.success(
      StatusCode.OK,
      MessagePostProduct.createProduct,
    );
  }

  /*
    PUT: update product by id

    @Param: id: id product
    @Param: body: info of product to update
    @Param: image: File containing product
  */
  async putProductsById(
    id: string,
    data: CreateProductBaseDto,
    image: Express.Multer.File,
  ) {
    const product = await this.getCommonProducts.getDocumentProductsById(id);
    if (!product)
      return this.responseService.error(
        StatusCode.NOT_FOUND,
        MessageGetProduct.productNotFound,
      );

    let urlImage = product.image;

    if (image) {
      await this.imageService.deleteFile(product.image);

      const fileUpdate = await this.imageService.uploadFile(image);
      urlImage = fileUpdate;
    }

    const updateProduct = {
      ...data,
      image: urlImage,
    };

    await this.updateCommonProducts.updateDocumentProductById(
      id,
      updateProduct,
    );
  }

  /*
    DELETE: delete product by id

    @Param: id: id product to delete 
  */
  async deleteProductById(id: string) {
    const product =
      await this.removeCommonProducts.removeDocumentProductById(id);
    if (!product)
      return this.responseService.error(
        StatusCode.NOT_FOUND,
        MessageGetProduct.productNotFound,
      );
    return this.responseService.success(
      StatusCode.OK,
      MessageDeleteProduct.deleteProduct,
    );
  }
}
