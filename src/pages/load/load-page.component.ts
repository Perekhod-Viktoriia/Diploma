import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoadPageService } from './load-page.service';
import { User } from '../../models/user/user.model';

@Component({
  selector: 'app-load-page',
  templateUrl: './load-page.component.html',
  styleUrls: ['./load-page.component.css'],
  providers: [LoadPageService]
})
export class LoadPageComponent implements OnInit {

  public selectedFilters: any = {};
  public filters: any = {};
  public allFiltersSelected: boolean = false;
  public loadLoaded: boolean = true;
  public load: any = {};

  constructor(private service: LoadPageService) {
  }

  public ngOnInit(): void {
    this.getFilters();
  }

  public getLoad(): void {
    if (
      this.selectedFilters.semester
      && this.selectedFilters.teacher_id
      && this.selectedFilters.loadType
      && this.selectedFilters.specialty_id
      && this.selectedFilters.discipline_id
    ) {
      this.allFiltersSelected = true;
    } else {
      this.allFiltersSelected = false;
    }
    this.loadLoaded = false;

    if (this.allFiltersSelected) {
      this.loadLoaded = true;

      this.service.getLoad(this.selectedFilters)
        .subscribe(r => {
          if (r.length === 0) {
            r = {};
          }

          this.load = r;
          this.loadLoaded = true;
        });
    }
  }

  protected getFilters(): void {
    this.service.getFilters().subscribe((filters) => this.filters = filters);
  }
}
