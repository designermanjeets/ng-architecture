import { InjectionToken } from '@angular/core';
import { PortalInjector } from '@angular/cdk/portal';

export const MS_PORTAL_DATA = new InjectionToken<{}>('MS_PORTAL_DATA');
const injectorTokens = new WeakMap();


export function tabInjector(data, injector): PortalInjector {
  injectorTokens.set(MS_PORTAL_DATA, data);
  return new PortalInjector(injector, injectorTokens);
}
