import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';
import { User } from '../../models/user/user.model';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthService {
  protected token: string;
  protected tokenId: number;

  public constructor(private cookieService: CookieService) {
  }

  /**
   * @param {user} user
   */
  public rememberUser(user: User): void {
    this.cookieService.put('tokenId', String(user.tokenId));
    this.cookieService.put('token', user.token);
  }

  /**
   * @return {boolean}
   */
  public userIsAuthed(): boolean {
    this.checkCookies();

    return !_.isNil(this.token) && !_.isNil(this.tokenId);
  }

  /**
   * @return {string}
   */
  public getToken(): string {
    return this.token;
  }

  /**
   * @return {number}
   */
  public getTokenID(): number {
    return this.tokenId;
  }

  /**
   * Gets token from cookies and saves locally
   */
  private checkCookies(): void {
    if (_.isNil(this.token)) {
      this.tokenId = Number(this.cookieService.get('tokenId'));
      this.token = this.cookieService.get('token');
    }
  }
}
