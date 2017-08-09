import { Model } from '../model';
import { Autowired } from '../../app/core/decorators/autowired.decorator';
import { Subdivision } from './subdivision.model';
import { SubView } from './subview.model';

export class Order extends Model {
  public id: number;
  public form_number: number;
  public registration_number: number;
  public address: string;
  public content: string;
  public note: string;
  public safe_term: string;
  public validity: string;
  public created_at: string;
  public is_original: boolean;
  public sub_view_id: number;
  public sub_division_id: number;

  @Autowired(Subdivision) public subdivision: Subdivision;
  @Autowired(SubView) public subview: SubView;
}
