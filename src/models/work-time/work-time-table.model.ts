import { Model } from '../model';
import { MappedClass } from '../../app/core/decorators/mapped-class.decorator';
import { User } from '../user/user.model';

export class WorkTimeTable extends Model {
  @MappedClass(User) public users: User[];

  /**
   * Deletes users from table
   *
   * @param {User} workerToDelete
   */
  public deleteWorker(workerToDelete: User): void {
    this.users = this.users.filter(u => u.id !== workerToDelete.id);
  }

  /**
   * Merges new users with the current
   *
   * @param {Array<User>} users
   */
  public addWorkers(users: User[]): void {
    for (const user of users) {
      this.users.push(user);
    }
  }
}
