import { Model } from '../../models/model';

export class UnexpectedResponse extends Model {
  public unexpected_action: number;
  public to: string;
  public id: string;

  public isRedirect(): boolean {
    return this.unexpected_action === UnexpectedActionType.redirect;
  }
}

enum UnexpectedActionType {
  redirect = 1
}
