import { AbstractService } from '../../services/http/abstract.service';
import { Order } from '../../models/order/order.model';
import { Observable } from 'rxjs/Observable';
export class OrdersPageService extends AbstractService {
  protected url: string = 'page/orders';

  public getOrders(filters: any): Observable<Order> {
    return this.get('', {}, filters)
      .map((response: any) => {
        const orders: Array<Order> = [];

        for (const order of response.data) {
          orders.push(new Order(order));
        }

        response.data = orders;

        return response;
      });
  }

  public getFilters(): Observable<any> {
    return this.get('/filters')
      .map((response: any) => {
        return response;
      });
  }
}
