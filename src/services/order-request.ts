import request from './request';

export function getOrderListRequest():Promise<any> {
  return request.get('/order/list');
}

export function deleteOrderRequest(id:number):Promise<any> {
  return request.delete('/order/delete', {
    params: {
      id,
    },
  });
}

export function searchOrderRequest(order_number:string):Promise<any> {
  return request.get('order/search', {
    params: {
      order_number,
    },
  });
}
