import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalMessageBusService{

  private rtGroupChangedSubject = new Subject<string>();
  rtgroupChange$ = this.rtGroupChangedSubject.asObservable();

  changeRTGroup = (id: string): void => {
    this.rtGroupChangedSubject.next(id);
  }
}
