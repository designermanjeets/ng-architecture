import { InjectionToken } from '@angular/core';
import { PortalInjector } from '@angular/cdk/portal';

export const MS_PORTAL_DATA = new InjectionToken<{}>('MS_PORTAL_DATA');
export const injectorTokens = new WeakMap();

export class TabInjClass { // If you need to use Portal
    portal: any;
    public get tabsData() {
        return this.portal;
    }
}

export function tabInjector(data, injector): PortalInjector {
  injectorTokens.set(MS_PORTAL_DATA, data);
  TabInjClass.prototype.portal = injectorTokens;
  return new PortalInjector(injector, injectorTokens);
}
