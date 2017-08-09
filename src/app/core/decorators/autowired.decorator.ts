import { Model } from '../../../models/model';

const AUTOWIRED_METADATA_KEY: string = 'AUTOWIRED_';

const reflect: any = (<any>window).Reflect;

/**
 * Decorator Autowired will support auto init instance of dependency class
 *
 * @param clazz
 *
 * @return {(target:any, key:string)=>void}
 *
 * @constructor
 */
export function Autowired(clazz: { new (data?: any): Model; }): (target: any, targetKey?: string) => void {
  'use strict';

  return (target: any, key: string): void => {
    reflect.defineMetadata(AUTOWIRED_METADATA_KEY + key, clazz, target, key);
  };
}

/**
 * Get Autowired
 *
 * @param target
 *
 * @param propertyKey
 *
 * @return {any}
 */
export function getAutowired(target: any, propertyKey: string): any {
  'use strict';

  return reflect.getMetadata(AUTOWIRED_METADATA_KEY + propertyKey, target, propertyKey);
}
