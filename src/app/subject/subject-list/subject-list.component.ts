import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/service/subject.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { Subject } from 'src/app/model/subject';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {

  searchText;
  subjects: Observable<Subject[]>;
  isDataAvailable: boolean = false;
  currentUser: any = {};

  config: any;
  collection = { count: 0, data: [] };
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '<',
    nextLabel: '>',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

  constructor(private userService: UserService, private router: Router,
    private subjectService: SubjectService,private notifyService : NotificationService ) { }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.subjectService.findAll().subscribe(data => {
        this.collection.data=this.subjects = data;
        console.log( this.subjects);
        this.isDataAvailable = true;
        this.loadData();
      });
    });
  }
  loadData() {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }
  onPageChange(event){
    // console.log(event);
    this.config.currentPage = event;
  }
  hasSignedIn() {
    return !!this.userService.currentUser;
  }

  details(subject_id: number) {
    this.subjectService.findById(subject_id).subscribe(
      data => this.router.navigate(['subject/details/', data.id])
    );
  }

  update(subject_id: number) {
    this.subjectService.findById(subject_id).subscribe(
      data => this.router.navigate(['subject/update', data.id])
    );
  }

  timetable(subject_id: number) {
    this.router.navigate(['timetable/subject', subject_id]);
  }

  delete(subject_id: number) {
    this.subjectService.delete(subject_id).subscribe(() => {
      this.refresh();
      this.notifyService.showSuccess("Subject deleted.", "Success");
    }, error => {  this.notifyService.showError(error)});
  }

  createSubject() {
    this.router.navigate(['subject/create']);
  }
  goSubjectMapping() {
    this.router.navigate(['subjectdetail/create']);
  }

  refresh(): void {
    window.location.reload();
  }
}
