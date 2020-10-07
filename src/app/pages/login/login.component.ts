import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  isAuthorizing = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    this.checkCurrentUserDetail();
  }

  private checkCurrentUserDetail = () => {
    if (localStorage.getItem('token') === null) {
      return;
    }
    this.isAuthorizing = true;
    this.userService.getCurrentUserDetail()
      .subscribe(res => {
        this.isAuthorizing = false;
        if (res.success) {
          this.messageService.info('您已经登录');
          this.router.navigate(['welcome']);
        }
      }, error => {
        this.isAuthorizing = false;
        this.messageService.error('Session错误: ' + error.message);
        return;
      });
  }

  submitForm = (loginForm) => {
    this.getAuthToken(loginForm.username, loginForm.password);
  }

  private getAuthToken = (username: string, password: string) => {
    this.isAuthorizing = true;
    this.authService.login(username, password)
      .subscribe(res => {
        this.isAuthorizing = false;
        if (res.response.token) {
          localStorage.setItem('token', res.response.token);
          this.router.navigate(['']);
        }
      }, error => {
        this.isAuthorizing = false;
        if (error.status === 403 || error.status === 401) {
          this.messageService.error('登录错误,请检查用户名和密码');
        }else{
          this.messageService.error('未知登录错误');
        }
      });
  }

}
