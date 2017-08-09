import { Model } from '../model';
import { Autowired } from '../../app/core/decorators/autowired.decorator';
import { User } from './user.model';

export class WorkTime extends Model {
  public id: number;
  public date: string;
  public type_of_day: string;
  public user_id: number;
  public work_hours: string;

  @Autowired(User) public user: User;
}
