import {ApplicationRef, Injectable} from '@angular/core';
import {SwUpdate, UpdateActivatedEvent, UpdateAvailableEvent} from '@angular/service-worker';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {first} from 'rxjs/operators';
import {concat, interval} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerService {

  constructor(
    updates: SwUpdate,
    appRef: ApplicationRef,
    private notificationService: NzNotificationService
  ) {
    if (environment.production) {
      updates.available.subscribe(this.subscribeUpdate);
      updates.activated.subscribe(this.subscribeUpgrade);
      this.pollingUpdate(appRef, updates);
    } else {
      console.log('Service Worker Service not enabling because is not in production mode.');
    }
  }

  private subscribeUpdate = (event: UpdateAvailableEvent) => {
    this.notificationService.info(
      '有新版本',
      `有新版本, 正在更新.... (版本Hash: ${event.available.hash.slice(0, 8)})`);
    setTimeout(() => {
      document.location.reload();
    }, 5000);
  }

  private subscribeUpgrade = (event: UpdateActivatedEvent) => {
    this.notificationService.success('升级成功', `当前版本Hash: ${event.current.hash.slice(0, 8)}`);
  }

  private pollingUpdate = (appRef: ApplicationRef, updates: SwUpdate) => {
    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(() => updates.checkForUpdate());
  }
}
