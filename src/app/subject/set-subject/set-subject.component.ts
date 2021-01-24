import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/model/subject';
import { UserService } from 'src/app/service/user.service';
import { SubjectService } from 'src/app/service/subject.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-set-subject',
  templateUrl: './set-subject.component.html',
  styleUrls: ['./set-subject.component.scss']
})
export class SetSubjectComponent implements OnInit {
  searchText;
  student_id: number;
  currentUser: any = {};
  selectedOption: any = {};
  isDataAvailable: boolean = false;
  unset: boolean = false;
  subjects: Observable<Subject[]>;

  constructor(private userService: UserService, private subjectService: SubjectService,
    private router: Router, private route: ActivatedRoute,private notifyService : NotificationService) { }

  ngOnInit() {
    this.student_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.subjectService.findAll().subscribe(data => {
        this.subjects = data;
        this.isDataAvailable = true;
      });
    });
  }

  onSubmit() {
    if(this.unset == false) {
      this.subjectService.setSubject(this.student_id, this.selectedOption.id).subscribe(() => {
        this.refresh();
        this.notifyService.showSuccess("Subject set to student.", "Success");
      }, error => { this.notifyService.showError(error)});
    } else {
      this.subjectService.unsetSubject(this.student_id, this.selectedOption.id).subscribe(() => {
        this.refresh();
        this.notifyService.showSuccess("Subject unset from student", "Success");
      }, error => { this.notifyService.showError(error)});
    }
  }


  refresh() {
    this.unset = false;
    this.selectedOption = {};
  }

  goBack() {
    this.router.navigate(['user/all']);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

}
