import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import getChineseTimeGreeting from './utils/ChineseTimeGreeting';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  isCollapsed = true;
  isWholePageLinkActive = false;
  wholePageLink = ['/login', '/404'];
  username = '用户';
  timeGreeting = getChineseTimeGreeting();

  routerSub: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private messageService: NzMessageService,
    private changeDetectRef: ChangeDetectorRef
  ) {
  }

  private subRouteChange = () => {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isWholePageLinkActive =
          (this.wholePageLink.indexOf(event.url) !== -1) ||
          (this.wholePageLink.indexOf(event.urlAfterRedirects)) !== -1;
        this.isCollapsed = this.isWholePageLinkActive;
      }
      this.changeDetectRef.detectChanges();
    });
  }

  private getUserInfo = () => {
    if (localStorage.getItem('token') === null) {
      this.messageService.error('未登录, 请登录');
      this.router.navigate(['login']);
      return;
    }
    this.userService.getCurrentUserDetail()
      .subscribe(res => {
        this.username = res.response.user.username;
      }, error => {
        this.messageService.error('获取登陆状态错误, 请登录');
        if (error.status === 401 || error.status === 403){
          this.router.navigate(['login']);
        }
      });
  }

  onLogout = () => {
    localStorage.clear();
    this.router.navigate(['auth', 'login']);
  }

  ngOnInit(): void {
    this.subRouteChange();
    this.getUserInfo();
    this.isCollapsed = true;
  }

  ngOnDestroy(): void {
    this.isWholePageLinkActive = false;
    this.routerSub.unsubscribe();
  }
}
