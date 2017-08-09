import { Router } from '@angular/router';

import { UnexpectedResponse } from '../services/http/unexpected.response';

export class AbstractPage {

  public constructor(protected router: Router) {}

  /**
   * @param {UnexpectedResponse} response
   */
  public checkResponse(response: UnexpectedResponse): void {
    this.checkRedirectResponse(response);
  }

  /**
   * @param {UnexpectedResponse} response
   */
  private checkRedirectResponse(response: UnexpectedResponse): void {
    if (response.isRedirect()) {
      this.redirectFromResponse(response);
    }
  }

  /**
   * @param {UnexpectedResponse} response
   */
  private redirectFromResponse(response: UnexpectedResponse): void {
    this.router.navigate([response.to, response.id]);
  }
}
