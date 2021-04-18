import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Subject} from "../../model/subject";
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectService} from "../../service/subject.service";
import {NotificationService} from "../../service/notification.service";
import {SubjectdetailService} from "../../service/subjectdetail.service";
import {SubjectDetailDTO} from "../../dto/subjectDetailsDTO";
import {isAdminUser} from "../../shared/roles";

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})
export class ViewallComponent implements OnInit {
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
  subjectsDetails: Observable<SubjectDetailDTO[]>;
  private classroom_id: number;
  constructor(private userService: UserService, private router: Router,private route: ActivatedRoute,
              private  subjecteDetailservice:SubjectdetailService,private subjectService: SubjectService,private notifyService : NotificationService ) { }

  ngOnInit() {
    this.classroom_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.subjecteDetailservice.findByClassId(this.classroom_id).subscribe(data => {
        this.collection.data=this.subjectsDetails = data;
        console.log( this.subjectsDetails);
        this.isDataAvailable = true;
        this.loadData();
        // this.loadSubjectDetails();
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
  loadSubjectDetails(){
    this.subjecteDetailservice.findAll().subscribe(data=>{
      this.subjectsDetails=data;
    })
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
    console.log(subject_id);
    this.router.navigate(['timetable/subject', subject_id]);
  }

  delete(subject_id: number) {
    this.subjectService.delete(subject_id).subscribe(() => {
      this.refresh();
      this.notifyService.showSuccess("Subject deleted.", "Success");
    }, error => {  this.notifyService.showError(error)});
  }

  classroom() {
    this.router.navigate(['classroom/all']);
  }
  goSubjectMapping() {
    this.router.navigate(['subjectdetail/create']);
  }

  refresh(): void {
    window.location.reload();
  }
  adminuser(){
    if(isAdminUser(this.currentUser)){
      return true
    }
    return false;
  }
}

