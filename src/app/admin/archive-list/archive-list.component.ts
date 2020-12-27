import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Archive} from "../../model/archive";
import {UserService} from "../../service/user.service";
import {AdminService} from "../../service/admin.service";
import {Router} from "@angular/router";
import {isAdmin} from "../../shared/roles";

@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.scss']
})
export class ArchiveListComponent implements OnInit {

  searchText;
  archives: Observable<Archive[]>;
  isDataAvailable:boolean = false;
  currentUser: any = {};

  constructor(private userService: UserService, private adminService: AdminService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.adminService.getArchive().subscribe(data => {
        this.archives = data;
        this.isDataAvailable = true;
      });
    });
  }

  details(archive_id: number) {
    this.router.navigate(['archive', archive_id]);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }
}
