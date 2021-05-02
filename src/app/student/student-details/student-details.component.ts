import { Component, OnInit, OnDestroy } from '@angular/core';
import { Student } from 'src/app/model/student';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';
import { isTeacher, isAdmin, isIdMatches } from 'src/app/shared/roles';
import {StudentResponseDTO} from "../../dto/response/studentResponseDTO";
import {DomSanitizer} from "@angular/platform-browser";
import {UploadFileServiceService} from "../../service/upload-file-service.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  currentUser: any = {};
  id: number = 0;
  student = new StudentResponseDTO();
  isDataAvailable:boolean = false;
  isimageAvailable:boolean = false;
  searchText: any;
  // private base64Image='data:image/png;base64,';
  private base64Image='data:application/pdf;base64,';
  private pdfDocumentSrc: any;
  urlpdf:any;
  private pdfresourseurl='http://localhost:8081/api/files/pdf/';
  constructor(private userService: UserService, private route: ActivatedRoute,
    private studentService: StudentService, private router: Router,public _DomSanitizationService: DomSanitizer,private  fileuploadservice:UploadFileServiceService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.studentService.findById(this.id).subscribe(data => {
        this.student = data;
        this.fileuploadservice.findByFilename(this.student.image.id)
          .subscribe(data=>{this.base64Image+=data;this.isimageAvailable=true},
            err => this.handleImageRetrievalError(err));
       this.urlpdf=this.pdfresourseurl+this.student.application.id;
        this.isDataAvailable = true;
      });
    });
  }
  private handleImageRetrievalError(err: HttpErrorResponse) {
    console.log(err);
    this.base64Image +=err.error.text;
    this.isimageAvailable=true;
    // console.error(JSON.stringify(err,null,4));
    // this.createImage(err.error.text);
  }
  userRole(): boolean {
    if(isAdmin(this.currentUser, this.router) || isTeacher(this.currentUser, this.router) ||
    isIdMatches(this.currentUser, this.router, this.student.id, this.studentService)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }
  backToStudentList(){
    if(isAdmin(this.currentUser, this.router)){
      this.router.navigate(['student/all']);
    }else if(isTeacher(this.currentUser, this.router)){
      this.router.navigate(['student/classroom',this.student.classroom.id]);
    }

  }
  update(){
    this.router.navigate(['student/update', this.id]);
  }
  transform(){
    return this._DomSanitizationService.bypassSecurityTrustResourceUrl(this.base64Image);
  }

  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }
  showPdf(pdfFile: any, $event: any) {
    // this.pdfList.forEach(pdf => pdf.selected = false);
    pdfFile.selected = true;
    this.pdfDocumentSrc = pdfFile;
    $event.preventDefault();
  }

  viewPDF() {
    window.open(  this.pdfresourseurl+this.student.application.id,"_blank",'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=350');
  }
}
