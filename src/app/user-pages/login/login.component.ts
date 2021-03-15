import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Message } from '../../shared/message';
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {UserService} from "../../service/user.service";
import {takeUntil} from "rxjs/operators";
import {NotificationService} from "../../service/notification.service";

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
              private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,private notifyService : NotificationService) { }

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
    // this.notification.msgBody ='Enter the Username';

    // this.submitted = true;
    this.authService.login(this.form.value).subscribe(data => {
          this.userService.getMyInfo().subscribe();
        console.log( this.notification);
          this.router.navigate(['dashboard']);
        },
        error => {
          this.notifyService.showError(error);
          this.submitted = false;
        });
    // this.notification = {msgType: 'error', msgBody: 'Incorrect username or password.'};
  }

  errorHandle(error){
    if (error.error instanceof ErrorEvent) {
      // client-side error
      this.notification = {msgType: 'error', msgBody: 'Incorrect username or password.'};
      var err = `Error Code 2: ${error.status}\nMessage: ${error.error.message}`;
      this.notifyService.showError(error, "Client Side Error");
      // console.log("Error 1:-> "+JSON.stringify(error));
    } else {
      // server-side error
      // var err = `Error Code 2: ${error.status}\nMessage: ${error.message}`;
      var err = `Error Code 2: ${error.status}\nMessage: ${error.error.message}`;
      if(error.error.message===undefined){
        err='Server Not working :Please contact Admin'
      }
      // this.errorMessage = `Connection Failed :\n Contact Admin`;
      // console.log("Error:-> "+JSON.stringify(error.error));
      this.notifyService.showError(error, "Server side Error");
    }
  }

}
