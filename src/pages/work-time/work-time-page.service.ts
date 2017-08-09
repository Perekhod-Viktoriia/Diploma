import { AbstractService } from '../../services/http/abstract.service';
import { Observable } from 'rxjs/Observable';
import { WorkTimeTable } from '../../models/work-time/work-time-table.model';
import { WorkTime } from '../../models/user/work-time.model';
import { User } from '../../models/user/user.model';
import { Response } from '@angular/http';

export class WorkTimePageService extends AbstractService {
  protected url: string = 'page/work-time';

  /**
   * @param {number} month
   * @param {number} year
   * @param {Array<number>} workersIds
   *
   * @return {Observable<WorkTimeTable>}
   */
  public getWorkTime(month: number, year: number, workersIds: number[] = []): Observable<WorkTimeTable> {
    return this.get('', {}, {month: month, year: year, usersIds: workersIds})
      .map((result: any) => {
        return new WorkTimeTable(result);
      });
  }

  /**
   * @param {WorkTime[]} workTime
   * @return {Observable<Response>}
   */
  public saveUserWorkTime(workTime: WorkTime[]): Observable<Response> {
    return this.update('', workTime);
  }

  /**
   * @return {Observable<User[]>}
   */
  public getWorkersList(): Observable<User[]> {
    return this.get('/users')
      .map((result: any) => {
        return result.map(userData => new User(userData));
      });
  }

  /**
   * Opens link in new tab with downloading excel file
   *
   * @param {number} month
   * @param {number} year
   * @param {number[]} workersIds
   */
  public exportToExcel(month: number, year: number, workersIds: number[] = []): void {
    const token: string = this.authService.getToken();
    const tokenId: string = String(this.authService.getTokenID());

    window.open(this.collectUrl('/excel?') + this.collectFilters(
        {
          month: month,
          year: year,
          usersIds: workersIds,
          'X-Auth-Token': token,
          'X-Auth-Token-Id': tokenId
        }
      ));
  }
}
