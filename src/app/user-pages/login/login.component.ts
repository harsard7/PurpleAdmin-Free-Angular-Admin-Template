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
  returnUrl: string;
  registerForm: FormGroup;
  submitted = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService, private userService: UserService,
              private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,private notifyService : NotificationService) { }

  ngOnInit() {

    this.activatedRoute.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params: Message) => {
        this.notification = params;
        console.log(this.notification);
      });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

    this.registerForm = this.formBuilder.group({
      // title: ['', Validators.required],
      // firstName: ['', Validators.required],
      username: ['', [Validators.required,Validators.minLength(5)]],
      // email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      // confirmPassword: ['', Validators.required],
      // acceptTerms: [false, Validators.requiredTrue]
      });

    // this.form = this.formBuilder.group({
    //   username: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(16)])],
    //   password: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(64)])]
    // });
  }
  //
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.login(this.registerForm.value).subscribe(data => {
        this.userService.getMyInfo().subscribe(data=>{
          if(this.userService.currentUser){
            this.router.navigate(['dashboard'])
          }
        });
      },
      error => {
         // console.log(JSON.stringify(error,null,4));
        this.notifyService.showError(null,'Invalid Username or Password');
        this.submitted = false;
      });
  }

  onReset() {
    this.notifyService.showWarning(null,'reseted');
    this.submitted = false;
    this.registerForm.reset();
  }
}
