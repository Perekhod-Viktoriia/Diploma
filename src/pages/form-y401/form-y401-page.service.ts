import { AbstractService } from '../../services/http/abstract.service';

import { Observable } from 'rxjs/Observable';

export class FormYPageService extends AbstractService {
  protected url: string = 'page/form-y';

  public getFilters(): Observable<any> {
    return this.get('/filters');
  }

  public savePlan(data: any) {
    console.log(data);
    return this.create('', data).subscribe();
  }

  public getPlan(filters): Observable<any> {
    return this.get('/plan', {}, filters);
  }
}
