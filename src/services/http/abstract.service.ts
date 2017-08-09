import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { AuthService } from '../auth/auth.service';
import * as _ from 'lodash';

@Injectable()
export class AbstractService {
  protected url: string;
  protected baseUrl: string = 'http://vikab/';

  public constructor(protected http: Http, protected authService: AuthService) {
  }

  /**
   * @param {string} url
   * @param {RequestOptionsArgs} options
   * @param filters
   * @param {boolean} parse
   *
   * @return {Observable<Response>}
   */
  public get(
    url: string,
    options: RequestOptionsArgs = {},
    filters: any = {},
    parse: boolean = true
  ): Observable<Response> {
    const filtersString: string = this.collectFilters(filters);

    let fullUrl: string = this.collectUrl(url);

    if (filtersString.length > 0) {
      fullUrl += '?' + filtersString;
    }

    this.appendAuthorizationHeaders(options);

    if (parse) {
      return this.http.get(fullUrl, options).map(this.extractData);
    }

    return this.http.get(fullUrl, options);
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {RequestOptionsArgs} options
   *
   * @return {Observable<Response>}
   */
  public create(url: string, data: any, options: RequestOptionsArgs = {}): Observable<Response> {
    const fullUrl: string = this.collectUrl(url);
    this.appendAuthorizationHeaders(options);

    return this.http.post(fullUrl, data, options)
      .map(this.extractData);
  };

  /**
   * @param {string} url
   * @param {any} data
   * @param {RequestOptionsArgs} options
   *
   * @return {Observable<Response>}
   */
  public update(url: string, data: any, options: RequestOptionsArgs = {}): Observable<Response> {
    const fullUrl: string = this.collectUrl(url);
    this.appendAuthorizationHeaders(options);

    console.log(fullUrl, data);
    return this.http.put(fullUrl, data, options).map(this.extractData);
  }

  /**
   * @param {string} url
   * @param {RequestOptionsArgs} options
   *
   * @return{Observable<Response>}
   */
  public remove(url: string, options: RequestOptionsArgs = {}): Observable<Response> {
    const fullUrl: string = this.collectUrl(url);
    this.appendAuthorizationHeaders(options);

    return this.http.delete(fullUrl, options).map(this.extractData);
  }

  /**
   * @param response
   * @return {boolean}
   */
  public isUnexpectedResponse(response: any): boolean {
    return !_.isNil(response.unexpected_action);
  }

  /**
   * @param {string} url
   */
  protected collectUrl(url: string): string {
    return this.baseUrl + this.url + url;
  }

  protected collectFilters(filters: any = {}): string {
    let filtersString: string = '';

    for (const filterName in filters) {
      if (filters.hasOwnProperty(filterName)) {
        if (filtersString.length > 0) {
          filtersString += '&';
        }
        filtersString += `${filterName}=${filters[filterName]}`;
      }
    }

    return filtersString;
  }

  /**
   * @param res
   *
   * @return {any}
   */
  private extractData(res: Response): any {
    return res.json();
  }

  /**
   * @param {RequestOptionsArgs} options
   */
  private appendAuthorizationHeaders(options: RequestOptionsArgs): void {
    if (this.authService.userIsAuthed()) {
      if (_.isNil(options.headers)) {
        options.headers = new Headers();
      }

      const token: string = this.authService.getToken();
      const tokenId: string = String(this.authService.getTokenID());
      options.headers.append('X-Auth-Token', token);
      options.headers.append('X-Auth-Token-Id', tokenId);
    }
  }
}
