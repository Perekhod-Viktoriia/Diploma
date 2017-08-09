import * as _ from 'lodash';
import { getAutowired } from '../app/core/decorators/autowired.decorator';
import { getMappedClass } from '../app/core/decorators/mapped-class.decorator';

export class Model {

  /**
   * @param {any} params?
   */
  public constructor(params?: any) {
    //noinspection TsLint
    _.forEach(params, (value: any, key: string) => {
      if (!_.isArray(value)) {
        const autowiredClass: new (data: any) => Model = getAutowired(this, key);

        if (!_.isUndefined(autowiredClass)) {
          (<any>this)[key] = new autowiredClass(value);

          return;
        }

        (<any>this)[key] = value;

        return;
      }

      const mappedClass: any = getMappedClass(this, key);

      if (!_.isUndefined(mappedClass)) {
        (<any>this)[key] = _.map(value, (param: any) => new mappedClass(param));
        return;
      }
    });
  }

  /**
   * Get class name
   *
   * @return {string}
   */
  public getClassName(): string {
    return this.constructor.toString().match(/\w+/g)[1];
  }
}
