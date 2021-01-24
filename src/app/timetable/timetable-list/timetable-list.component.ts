import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { SubjectService } from 'src/app/service/subject.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TimeTableEntity } from 'src/app/model/timeTableEntity';
import { Subject } from 'src/app/model/subject';
import { TimetableService} from "../../service/timetable.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-timetable-list',
  templateUrl: './timetable-list.component.html',
  styleUrls: ['./timetable-list.component.scss']
})
export class TimetableListComponent implements OnInit {
  searchText;
  subject_id: number;
  currentUser: any = {};
  subject = new Subject();
  isDataAvailable: boolean = false;
  timeTable: Observable<TimeTableEntity[]>;

  constructor(private userService: UserService, private subjectService: SubjectService, private notifyService : NotificationService,
    private router: Router, private route: ActivatedRoute, private timeTableService: TimetableService) { }

  ngOnInit() {
    this.subject_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.subjectService.findById(this.subject_id).subscribe(data => {
        this.subject = data;
        this.timeTableService.getTimeTableEntitiesBySubject(this.subject_id).subscribe(data => {
          this.timeTable = data;
          this.isDataAvailable = true;
        });
      });
    });
  }



  create() {
    this.subjectService.findById(this.subject_id).subscribe(data =>
      this.router.navigate(['timetable/create', data.id])
    );
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

  update(entity_id: number) {
    this.router.navigate(['timetable/update', entity_id]);
  }

  delete(entity_id: number) {
    this.timeTableService.delete(entity_id).subscribe(() => {
      this.refresh();
       this.notifyService.showSuccess('Time table entity deleted', 'Ok');
    });
  }

  refresh(): void {
    window.location.reload();
  }
}
