import { Component, Input } from '@angular/core';
import { Order } from '../../../models/order/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  @Input() public order: Order;

  constructor() {
  }
}
