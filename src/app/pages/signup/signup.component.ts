import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  validateForm!: FormGroup;
  isAuthorizing = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submitForm = (signupForm) => {
    this.register(signupForm.username, signupForm.password);
  }

  private register = (username: string, password: string) => {
    this.isAuthorizing = true;
    this.authService.signup(username, password)
      .subscribe(res => {
        this.isAuthorizing = false;
        if (res.success) {
          this.messageService.warning('您已注册成功，但没有任何转推组，请收到转推组邀请后登录。', {
            nzDuration: 8000
          });
          this.router.navigate(['login']);
        }else{
          this.messageService.error('注册失败!');
        }
      }, error => {
        this.isAuthorizing = false;
        this.messageService.error('注册失败: ' + error.message);
      });
  }

}
