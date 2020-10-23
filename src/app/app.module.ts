import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { TweetDetailComponent } from './pages/tweet-detail/tweet-detail.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {HttpconfigInterceptor} from './interceptor/httpconfig.interceptor';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMessageServiceModule} from 'ng-zorro-antd/message';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzSelectModule} from 'ng-zorro-antd/select';
import { TrackerSelectComponent } from './components/tracker-select/tracker-select.component';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzBackTopModule} from 'ng-zorro-antd/back-top';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import { TweetCardComponent } from './components/tweet-card/tweet-card.component';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { TweetImageListComponent } from './components/tweet-image-list/tweet-image-list.component';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import { RouterModule } from '@angular/router';
import {NzNotificationServiceModule} from 'ng-zorro-antd/notification';
import {ServiceWorkerService} from './services/service-worker.service';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzTagModule} from 'ng-zorro-antd/tag';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TweetDetailComponent,
    NotFoundComponent,
    TrackerSelectComponent,
    TweetCardComponent,
    VideoPlayerComponent,
    TweetImageListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzMessageServiceModule,
    ReactiveFormsModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSpinModule,
    NzResultModule,
    NzTypographyModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    NzModalModule,
    NzSelectModule,
    NzEmptyModule,
    NzBackTopModule,
    NzRadioModule,
    NzDividerModule,
    NzPageHeaderModule,
    InfiniteScrollModule,
    NzAvatarModule,
    NzSpaceModule,
    NzNotificationServiceModule,
    RouterModule,
    NzTagModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: HTTP_INTERCEPTORS, useClass: HttpconfigInterceptor, multi: true},
    ServiceWorkerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
