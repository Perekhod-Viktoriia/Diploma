import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { OrdersPageService } from './orders-page.service';
import { Order } from '../../models/order/order.model';
import { OrderFiltersInterface } from './order-filters.interface';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css'],
  providers: [OrdersPageService],
  encapsulation: ViewEncapsulation.None
})
export class OrdersPageComponent implements OnInit {

  public orders: Order[] = [];
  public pagination: any;
  public filters: OrderFiltersInterface;
  public selectedFilters: any = {};
  public filteringProgress: number = 0;

  constructor(private ordersPageService: OrdersPageService) {
  }

  /**
   * Loads more orders when users scrolled 75% of page
   */
  @HostListener('window:scroll', [])
  public onScroll(): void {
    const h = document.documentElement;
    const b = document.body;
    const st = 'scrollTop';
    const sh = 'scrollHeight';

    const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
    if (percent > 75) {
      this.loadMoreOrders();
    }
  }

  /**
   * Loads filters and first batch of orders
   */
  public ngOnInit(): void {
    this.getOrders();

    this.ordersPageService
      .getFilters()
      .subscribe((filters: any) => {
        this.filters = filters;
      });
  }

  public loadMoreOrders(): void {
    if (this.pagination.to < this.pagination.total && this.filteringProgress === 100) {
      this.filteringProgress = 0;
      this.selectedFilters.page = this.pagination.to / this.pagination.per_page + 1;
      this.getOrders(true);
    }
  }

  public getOrders(add: boolean = false): void {
    this.filteringProgress = 0;
    this.clearFilters();
    this.ordersPageService
      .getOrders(this.selectedFilters)
      .subscribe((orders: any) => {
        if (add) {
          for (const order of orders.data) {
            this.orders.push(order);
          }
        } else {
          this.orders = orders.data;
        }

        this.pagination = orders;
        this.filteringProgress = 100;
      });
  }

  /**
   * Clears filters not needed values
   */
  private clearFilters(): void {
    for (const filterName in this.selectedFilters) {
      if (this.selectedFilters.hasOwnProperty(filterName)
        && (0 === this.selectedFilters[filterName] || '' === this.selectedFilters[filterName])) {
        delete this.selectedFilters[filterName];
      }
    }

    if (this.selectedFilters.is_original !== null) {
      if (this.selectedFilters.is_original === true) {
        this.selectedFilters.is_original = 1;
      } else {
        delete this.selectedFilters.is_original;
      }
    }
  }
}
