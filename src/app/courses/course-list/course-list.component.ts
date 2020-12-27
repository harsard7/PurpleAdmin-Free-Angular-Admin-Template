import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/service/course.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { Course } from 'src/app/model/course';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  searchText;
  courses: Observable<Course[]>;
  isDataAvailable: boolean = false;
  currentUser: any = {};

  constructor(private userService: UserService, private router: Router,
    private courseService: CourseService,private notifyService : NotificationService ) { }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.courseService.findAll().subscribe(data => {
        this.courses = data;
        this.isDataAvailable = true;
      });
    });
  }

  hasSignedIn() {
    return !!this.userService.currentUser;
  }

  details(course_id: number) {
    this.courseService.findById(course_id).subscribe(
      data => this.router.navigate(['course/details/', data.id])
    );
  }

  update(course_id: number) {
    this.courseService.findById(course_id).subscribe(
      data => this.router.navigate(['course/update', data.id])
    );
  }

  timetable(course_id: number) {
    this.router.navigate(['timetable/course', course_id]);
  }

  delete(course_id: number) {
    this.courseService.delete(course_id).subscribe(() => {
      this.refresh();
      this.notifyService.showSuccess("Course deleted.", "Success");
    }, error => {  this.notifyService.showError("Failed ", "");});
  }

  createCourse() {
    this.router.navigate(['course/create']);
  }

  refresh(): void {
    window.location.reload();
  }
}
