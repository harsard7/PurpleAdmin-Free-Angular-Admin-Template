import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Message } from '../../shared/message';
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {UserService} from "../../service/user.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  title = "Login";
  form: FormGroup;
  notification: Message;

  submitted = false;

  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService, private userService: UserService,
              private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.activatedRoute.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params: Message) => {
        this.notification = params;
      });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(16)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(64)])]
    });
  }
  //
  ngOnDestroy() {

    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit() {
    this.notification = undefined;
    this.submitted = true;
console.log(JSON.stringify(this.form.value));
    this.authService.login(this.form.value)
      .subscribe(data => {
          console.log(JSON.stringify(data));
          this.userService.getMyInfo().subscribe();
          console.log("this.login ts "+JSON.stringify(this.userService.currentUser));
          this.router.navigate(['dashboard']);
        },
        error => {
          this.submitted = false;
          console.log("error");
          this.notification = {msgType: 'error', msgBody: 'Incorrect username or password.'};
        });
  }

}
