import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import getChineseTimeGreeting from './utils/ChineseTimeGreeting';
import {SlimRtgroupsEntity, UserResponse} from './models/UserResponse';
import localStorageKey from './const/localStorageConst';
import {GlobalMessageBusService} from './services/global-message-bus.service';
import {ServiceWorkerService} from './services/service-worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  isCollapsed = true;
  isWholePageLinkActive = false;
  wholePageLink = ['/login', '/404'];
  userInfo: UserResponse;
  timeGreeting = getChineseTimeGreeting();
  username = '';
  selectedServer = localStorage.getItem(localStorageKey.PREFER_SERVER);

  rtgroupSelectModalOpts = {
    isVisible: false,
  };

  serverSelectModalOpts = {
    isVisible: false,
  };
  currentGroup: string = localStorage.getItem(localStorageKey.CURRENT_GROUP);
  selectedGroup: string = this.currentGroup;
  isCurrentGroupManager = false;

  availableServer = [{
    val: 'DEFAULT',
    name: '默认'
  }, {
    val: 'CHINA',
    name: '大陆加速'
  }];

  routerSub: Subscription;

  isLoading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private messageService: NzMessageService,
    private changeDetectRef: ChangeDetectorRef,
    private globalMessageBusService: GlobalMessageBusService,
    private sws: ServiceWorkerService
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
    if (localStorage.getItem(localStorageKey.TOKEN) === null) {
      this.messageService.error('未登录, 请登录');
      this.router.navigate(['login']);
      return;
    }
    this.isLoading = true;
    this.userService.getCurrentUserDetail()
      .subscribe(res => {
        if (res.response.rtgroups.length === 0) {
          this.messageService.warning('因为您不属于任何转推组,您将被登出.', { nzDuration: 8000 });
          this.onLogout();
          return;
        }
        this.userInfo = res.response;
        this.username = res.response.user.username;
        if (this.currentGroup === null) {
          this.currentGroup = res.response.rtgroups[0]._id;
          this.isCurrentGroupManager = res.response.rtgroups[0].isManager;
          localStorage.setItem(localStorageKey.CURRENT_GROUP, this.currentGroup);
          this.globalMessageBusService.changeRTGroup(this.currentGroup);
        }
        this.onChangeRTGroupOK();
        this.isLoading = false;
      }, error => {
        this.messageService.error('获取登陆状态错误, 请登录');
        this.router.navigate(['login']);
        this.isLoading = false;
      });
  }

  getCurrentRTGroup = (): SlimRtgroupsEntity => {
    if (this.userInfo === undefined) {
      return;
    }
    const groupIdx = this.userInfo.rtgroups.map(e => e._id).indexOf(this.currentGroup);
    if (groupIdx === -1) {
      this.messageService.error('选择的转推组不存在！');
      return;
    }
    return this.userInfo.rtgroups[groupIdx];
  }

  onLogout = () => {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  onChangeRTGroupOK = () => {
    localStorage.setItem(localStorageKey.CURRENT_GROUP, this.selectedGroup);
    this.currentGroup = this.selectedGroup;
    this.isCurrentGroupManager = this.getCurrentRTGroup().isManager;
    this.globalMessageBusService.changeRTGroup(this.currentGroup);
    this.rtgroupSelectModalOpts.isVisible = false;
  }

  onChangeServerOK = () => {
    localStorage.setItem(localStorageKey.PREFER_SERVER, this.selectedServer);
    this.rtgroupSelectModalOpts.isVisible = false;
    window.location.reload();
  }

  private setupApiServerPreference = () => {
    const serverOption = localStorage.getItem(localStorageKey.PREFER_SERVER);
    if (serverOption === null){
      localStorage.setItem(localStorageKey.PREFER_SERVER, 'DEFAULT');
      window.location.reload();
    }
  }

  ngOnInit(): void {
    this.setupApiServerPreference();
    this.subRouteChange();
    this.getUserInfo();
    this.isCollapsed = true;
  }

  ngOnDestroy(): void {
    this.isWholePageLinkActive = false;
    this.routerSub.unsubscribe();
  }
}
