import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {consoleTestResultHandler} from "tslint/lib/test";
import { CookieService } from 'ngx-cookie-service';
import {CurrentUser} from "../../model/CurrentUser";
import {SchoolDTO} from "../../dto/schoolDTO";
import {SchoolService} from "../../service/school.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  public isDataAvailable = false;
  school = new SchoolDTO();
  user: any;

  constructor(private sessionservice:SchoolService, config: NgbDropdownConfig, private authService: AuthService, private router: Router, private userService: UserService, private cookieService: CookieService) {
    config.placement = 'bottom-right';
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.user = data;
      this.isDataAvailable = true;
      this.sessionservice.findactive().subscribe(data=>{
        this.school=data;
      })
    });
  }

  ngOnInit() {
  }


  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }

  // toggle right sidebar
  // toggleRightSidebar() {
  //   document.querySelector('#right-sidebar').classList.toggle('open');
  // }

  logout(){
    this.authService.logout();
    this.cookieService.deleteAll('/', 'http://localhost:4200');
    this.router.navigate(['user-pages/login']);
  }
  login() {
    this.router.navigate(['user-pages/login']);
  }

  hasSignedIn() {
    return !!this.userService.currentUser;
  }

  userName(): string {
    if(this.user){
      return this.user.username;
    }
    return '';
  }
}
