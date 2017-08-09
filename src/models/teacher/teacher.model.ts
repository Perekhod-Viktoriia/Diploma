import { Model } from '../model';
import { Autowired } from '../../app/core/decorators/autowired.decorator';
import { User } from '../user/user.model';

export class Teacher extends Model {
  public user_id: number;
  public personnel_number: string;
  public academic_degree_id: number;

  @Autowired(User) public user: User;

  public get gender(): string {
    return this.user.genderT;
  }

  public get fio(): string {
    return this.user.fio;
  }
}
