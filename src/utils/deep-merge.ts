/* eslint-disable no-restricted-syntax */
function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function deepMerge<T extends Record<string, any>>(target: T, ...sources: T[]): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (source && isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return deepMerge(target, ...sources);
}
