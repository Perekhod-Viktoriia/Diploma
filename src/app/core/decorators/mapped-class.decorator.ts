import { Model } from '../../../models/model';

const MAPPED_CLASS_METADATA_KEY: string = 'MappedClass_';

const reflect: any = (<any>window).Reflect;

/**
 * Decorator MappedClass
 *
 * @param clazz
 *
 * @return {(target:any, key:string)=>void}
 *
 * @constructor
 */
export function MappedClass(clazz: { new (data?: any): Model; }): (target: any, targetKey?: string) => void {
  'use strict';

  return (target: any, key: string): void => {
    reflect.defineMetadata(MAPPED_CLASS_METADATA_KEY + key, clazz, target, key);
  };
}

/**
 * Get MappedClass
 *
 * @param target
 *
 * @param propertyKey
 *
 * @return {any}
 */
export function getMappedClass(target: any, propertyKey: string): any {
  'use strict';

  return reflect.getMetadata(MAPPED_CLASS_METADATA_KEY + propertyKey, target, propertyKey);
}
