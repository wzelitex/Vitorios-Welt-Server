export enum RoutesProductsAdmin {
  postNewProduct = 'post/new/product',
  putProduct = 'put/:id/product',
  deleteProduct = 'delete/:id/product',
  getProducts = 'get/products',
  getProductById = 'get/:id/product',
  getProductsByType = 'get/type/:type/products',
}

export enum RotuesProductsClient {
  getProducts = 'get',
  getDetailsProducts = 'get/product/:id/details',
  getTypeProducts = 'get/type/:type/products ',
  getProductsRandom = 'get/products/random',
  getProductsSearcher = '/get/products/searcher',
}
