import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormYPageService } from './form-y401-page.service';

@Component({
  selector: 'app-form-y-page',
  templateUrl: './form-y401-page.component.html',
  styleUrls: ['./form-y401-page.component.css'],
  providers: [FormYPageService]
})
export class FormYPageComponent implements OnInit {

  public selectedFilters: any = {};
  public filters: any = {};
  public plan: any = {};
  public allFiltersSelected: boolean = false;
  public planLoaded: boolean = false;

  constructor(private service: FormYPageService) {
  }

  public ngOnInit(): void {
    this.getFilters();
  }

  private getFilters(): void {
    this.service.getFilters().subscribe(f => {
      this.filters = f;
    });
  }

  public getPlan(): void {
    if (
      this.selectedFilters.semester
      && this.selectedFilters.specialty_id
      && this.selectedFilters.course
      && this.selectedFilters.discipline_id
    ) {
      this.allFiltersSelected = true;
    } else {
      this.allFiltersSelected = false;
    }
    this.planLoaded = false;

    if (this.allFiltersSelected) {
      this.service.getPlan(this.selectedFilters)
        .subscribe(r => {
          if (r.length === 0) {
            r = {};
          }

          this.plan = r;
          this.planLoaded = true;
        });
    }
  }

  public saveForm(): void {
    const data = this.plan;
    data.discipline_id = this.selectedFilters.discipline_id;
    data.specialty_id = this.selectedFilters.specialty_id;
    data.year = 2017;
    data.semester = this.selectedFilters.semester;
    data.course = this.selectedFilters.course;

    this.service.savePlan(data);
  }
}
