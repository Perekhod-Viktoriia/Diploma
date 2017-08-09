import { AbstractService } from '../../services/http/abstract.service';

import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user/user.model';

export class LoadPageService extends AbstractService {
  protected url: string = 'page/load';

  /**
   * @return {Observable<User[]>}
   */
  public getFilters(): Observable<User[]> {
    return this.get('/filters')
      .map((response: any) => {
        response.teachers = response.teachers.map(userData => new User(userData));

        return response;
      });
  }

  public getLoad(filters): Observable<any> {
    return this.get('/load', {}, filters);
  }
}
