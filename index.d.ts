/* eslint-disable node/no-missing-import */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable no-shadow */

/**
 * resolveEmailProvider options.
 * @export
 * @interface ResolveEmailProviderOptions
 */
export interface ResolveEmailProviderOptions {
  /** Specifieth resolve email provider options.
   * @type {string}
   * @memberof ResolveEmailProviderOptions
  */
  providerDomain: string;
}

/**
 * resolveEmailProvider
 * @export
 * @summary Verify a provider domain has an available configuration
 * @param {ResolveEmailProviderOptions} options
 * @returns {Promise<boolean>} True if the provider configuration exists, falso otherwise
*/
export function resolveEmailProvider(options: ResolveEmailProviderOptions): Promise<boolean>;
