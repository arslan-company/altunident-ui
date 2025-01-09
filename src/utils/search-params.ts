import { ReadonlyURLSearchParams } from 'next/navigation';

export class SearchParamsUtils {
  private searchParams: URLSearchParams;

  constructor(searchParams?: ReadonlyURLSearchParams | URLSearchParams | string) {
    this.searchParams = new URLSearchParams(searchParams?.toString());
  }

  /**
   * Adds new values or updates existing ones in the current search params
   */
  set(params: Record<string, string | number | undefined | null>): this {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        this.searchParams.delete(key);
      } else {
        this.searchParams.set(key, String(value));
      }
    });
    return this;
  }

  /**
   * Deletes specified keys from search params
   */
  delete(keys: string | string[]): this {
    const keysToDelete = Array.isArray(keys) ? keys : [keys];
    keysToDelete.forEach((key) => this.searchParams.delete(key));
    return this;
  }

  /**
   * Clears all search params
   */
  clear(): this {
    Array.from(this.searchParams.keys()).forEach((key) => this.searchParams.delete(key));
    return this;
  }

  /**
   * Returns search params as a string
   */
  toString(): string {
    const params = this.searchParams.toString();
    return params ? `?${params}` : '';
  }

  /**
   * Returns search params as an object
   */
  toObject(): Record<string, string> {
    return Object.fromEntries(this.searchParams.entries());
  }
}

/**
 * Creates a SearchParamsUtils instance
 */
export function createSearchParams(
  searchParams?: ReadonlyURLSearchParams | URLSearchParams | string,
) {
  return new SearchParamsUtils(searchParams);
}
