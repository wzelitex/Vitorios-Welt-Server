export enum RoutesOrdersAdmin {
  getOrders = 'get/orders',
  getDetailsOrders = 'get/:id/order',
  getFilterOrders = 'get/filter/:filter/orders',
  postComplete = 'post/complete/:id/order',
}

export enum RotuesOrdersClient {
  getOrders = 'get/orders',
  getFilterOrders = 'get/filter/:filter/order',
  postOrder = 'post/new/order',
  postOrderFromCart = 'post/orders/from-cart',
  postCancel = 'post/cancel/:id/order',
}
