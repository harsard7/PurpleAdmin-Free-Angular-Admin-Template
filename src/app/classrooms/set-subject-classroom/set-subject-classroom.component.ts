import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/model/subject';
import { UserService } from 'src/app/service/user.service';
import { SubjectService } from 'src/app/service/subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from 'src/app/service/classroom.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-set-subject-classroom',
  templateUrl: './set-subject-classroom.component.html',
  styleUrls: ['./set-subject-classroom.component.scss']
})
export class SetSubjectClassroomComponent implements OnInit {

  currentUser: any = {};
  selectedOption: any = {};
  classroom_id: number;
  isDataAvailable: boolean = false;
  unset: boolean = false;
  subjects: Observable<Subject[]>;

  constructor(private userService: UserService, private subjectService: SubjectService, private route: ActivatedRoute,
              private notifyService : NotificationService,private router: Router, private classroomService: ClassroomService, ) { }

  ngOnInit() {
    this.classroom_id = this.route.snapshot.params['id'];
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
      this.classroomService.setSubject(this.classroom_id, this.selectedOption.id).subscribe(() => {
        this.refresh();
        this.notifyService.showSuccess("Subject set to class.", "Success");
      }, error => { this.notifyService.showError(error)});
    } else {
      this.classroomService.unsetSubject(this.classroom_id, this.selectedOption.id).subscribe(() => {
        this.refresh();
        this.notifyService.showSuccess("Subject unset from class.", "Success");
      }, error => { this.notifyService.showError(error)});
    }
  }

  refresh() {
    this.selectedOption = {};
  }

  goBack() {
    this.router.navigate(['classroom/all']);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }
}
