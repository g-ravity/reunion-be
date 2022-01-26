import pick from 'lodash/pick';
import omit from 'lodash/omit';

export const pickWrapper = (object: Record<string, any>, keys: string[]): Record<string, any> => pick(object, keys);
export const omitWrapper = (object: Record<string, any>, keys: string[]): Record<string, any> => omit(object, keys);

export const isNotEmptyObject = (obj: Record<string, any>): boolean => obj && Object.keys(obj).length > 0;
export const isNotEmptyArray = (arr: Array<any>): boolean => arr && arr.length > 0;
