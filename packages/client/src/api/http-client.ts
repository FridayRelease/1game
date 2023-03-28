import ky, { Options, ResponsePromise } from 'ky';
import queryString from 'query-string';

type SearchParams = Record<string | number, unknown>;

type AllowedBody = FormData | string | object | null;

export class HttpClient {
  private ky: typeof ky;

  constructor(private prefixUrl?: string, options: Options = {}) {
    this.ky = ky.extend({
      prefixUrl,
      ...options,

      mode: 'cors', // same-origin, no-cors, cors
      credentials: 'include', // omit, include, same-origin
    });
  }

  extend(options: Options) {
    this.ky = ky.extend({
      ...options,
    });
  }

  get(
    url: string,
    params?: SearchParams,
    signal?: AbortSignal | null
  ): ResponsePromise {
    return this.ky.get(this.stripSlashes(url), {
      searchParams: qs(params),
      signal,
    });
  }

  post(
    url: string,
    body?: AllowedBody,
    params?: SearchParams,
    signal?: AbortSignal | null
  ): ResponsePromise {
    const options = kyOptions(params, body);
    return this.ky.post(this.stripSlashes(url), { ...options, signal });
  }

  put(url: string, body?: AllowedBody, params?: SearchParams): ResponsePromise {
    const options = kyOptions(params, body);
    return this.ky.put(this.stripSlashes(url), options);
  }

  patch(
    url: string,
    body?: AllowedBody,
    params?: SearchParams
  ): ResponsePromise {
    const options = kyOptions(params, body);
    return this.ky.patch(this.stripSlashes(url), options);
  }

  delete(url: string, params?: SearchParams): ResponsePromise {
    return this.ky.delete(this.stripSlashes(url), {
      searchParams: qs(params),
    });
  }

  createUrl(url: string, params?: SearchParams): string {
    const queryString = params ? `?${qs(params)}` : '';
    return this.prefixUrl + this.stripSlashes(url) + queryString;
  }

  private stripSlashes(url: string) {
    if (this.prefixUrl) {
      return url.replace(/^\//g, '');
    }

    return url;
  }
}

function kyOptions(params?: SearchParams, body?: AllowedBody): Options {
  const options: Options = { searchParams: qs(params) };
  if (!isNotObject(body) || Array.isArray(body)) {
    options.json = body;
  } else {
    options.body = body;
  }

  return options;
}

function isNotObject(value: unknown): value is FormData | string {
  return !(
    value !== void 0 &&
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object
  );
}

function qs(params: SearchParams = {}): string {
  return queryString.stringify(params);
}
