export enum RoutesShoppingClient {
  getShoppingsFromCart = 'get/cart',
  getShoppingsHistory = 'get/history',
  getFilterShoppings = 'get/filter/:filter/shoppings',
  postNewShopping = 'post/new/shopping/cart',
  postCompleteShopping = 'post/complete/:id/shopping',
  postCancelShopping = 'post/cancel/:id/shopping',
  deleteShoppingCart = 'delete/shopping/:id/cart',
}

export enum RoutesShoppingAdmin {
  getShoppings = 'get/shoppings',
  getDetailsShoppings = 'get/:id/shopping',
  getFilterShoppings = 'get/filter/:filter/shoppings',
}
