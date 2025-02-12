import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsBaseSchema } from '../schema/product.base.schema';
import { IFunctionCreateProduct } from '../interface/interfaceLogicProducts';

@Injectable()
export class GetCommonProducts {
  constructor(
    @InjectModel('Products')
    private readonly productModel: Model<ProductsBaseSchema>,
  ) {}

  private normalizeText(text: string) {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  private readonly limitDocumentByRequest = 10;

  async getProductByRelated(text: string) {
    const newText = this.normalizeText(text);

    return await this.productModel
      .find(
        {
          $or: [{ name: { $regex: newText, $options: 'i' } }],
        },
        {
          _id: 1,
          image: 1,
          name: 1,
          price: 1,
          description: 1,
        },
      )
      .collation({ locale: 'es', strength: 1 });
  }

  async getProductsRandom() {
    return await this.productModel
      .aggregate([
        {
          $sample: { size: 10 },
        },
        {
          $project: {
            _id: 1,
            image: 1,
            name: 1,
            price: 1,
          },
        },
      ])
      .limit(this.limitDocumentByRequest);
  }

  async getDocumentsProducts(
    offset: string,
  ): Promise<IFunctionCreateProduct[]> {
    return await this.productModel
      .find(
        {},
        {
          image: 1,
          name: 1,
          price: 1,
          quantity: 1,
          description: 1,
          _id: 1,
        },
      )
      .limit(this.limitDocumentByRequest)
      .skip(parseInt(offset));
  }

  async getDocumentsProductsByType(
    type: string,
    offset: string,
  ): Promise<IFunctionCreateProduct[]> {
    return this.productModel
      .find(
        { type: type },
        {
          name: 1,
          price: 1,
          quantity: 1,
          description: 1,
          _id: 1,
        },
      )
      .skip(parseInt(offset))
      .limit(this.limitDocumentByRequest)
      .lean();
  }

  async getDocumentProductsById(id: string): Promise<IFunctionCreateProduct> {
    return this.productModel.findById(id).lean();
  }
}

@Injectable()
export class GetSpecificPropsProducts {
  constructor(
    @InjectModel('Products')
    private readonly productModel: Model<ProductsBaseSchema>,
  ) {}

  async getProductForCreateShoppingdById(id: string) {
    return await this.productModel.findById(id, {
      price: 1,
      color: 1,
      skin: 1,
    });
  }

  async getProductDataForCreateNewOrder(id: string) {
    return await this.productModel.findById(id, {
      _id: 0,
      name: 1,
      price: 1,
    });
  }
}
