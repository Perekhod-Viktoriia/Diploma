import { Model } from '../model';
import { Autowired } from '../../app/core/decorators/autowired.decorator';
import { View } from './view.model';

export class SubView extends Model {
  public id: number;
  public name: string;
  public parent_id: number;

  @Autowired(View) public view: View;
}
