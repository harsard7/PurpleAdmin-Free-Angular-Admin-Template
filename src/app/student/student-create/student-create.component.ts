import {Component, OnInit} from '@angular/core';
import {UserResponseDTO} from "../../dto/response/userResponseDTO";
import {StudentResponseDTO} from "../../dto/response/studentResponseDTO";
import {Classroom} from "../../model/classroom";
import {Observable} from "rxjs";
import {UserService} from "../../service/user.service";
import {StudentService} from "../../service/student.service";
import {Router} from "@angular/router";
import {ClassroomService} from "../../service/classroom.service";
import {isAdmin} from "../../shared/roles";
import {NotificationService} from "../../service/notification.service";
import {ParentService} from "../../service/parent.service";
import {ParentDTO} from "../../dto/parentDTO";
import {UserType} from "../../enums/userType";
import {StudentStatus} from "../../enums/studentStatus";
import {EnumValues} from "enum-values";
import {ParentType} from "../../enums/parentType";
import {FileInfo} from "../../dto/FileInfo";
import {UploadFileServiceService} from "../../service/upload-file-service.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit {

  user = new UserResponseDTO();
  student = new StudentResponseDTO();
  currentUser: any = {};
  userSubmitted: boolean = true;
  isDataAvailable: boolean  = false;
  classrooms: Observable<Classroom[]>;
  selectedclassroom: Classroom;
  joinedclassroom: Classroom;
  selectedOptionGender: any = {};
  genders: string[] = ['MALE', 'FEMALE'];
  selectedparent: ParentDTO;
  parents: Observable<ParentDTO[]>;
  selectedParentType: any;
  parenttypes: any[];

  // img
  selectedFiles: FileList;
  currentFile: File;
  selectedFilesPdf: FileList;
  currentFilePdf: File;
  progress = 0;
  message = '';

  fileInfos: Observable<any>;
  savedFile: FileInfo;
  savedFileApplication: FileInfo;
  url: any;
  urlpdf: any;
  msg = "";
  saving=false;
  constructor(private userService: UserService, private router: Router,  private studentService: StudentService,
              private classroomService: ClassroomService,private notifyService : NotificationService,private parentService:ParentService,private  fileuploadservice:UploadFileServiceService) { }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.classroomService.findAll().subscribe(data => {
        this.classrooms = data;
        this.isDataAvailable = true;
        this.parenttypes = EnumValues.getNamesAndValues(ParentType);
      });
    });
    this.parentService.findAll().subscribe(data => {
      this.parents=data;
      this.isDataAvailable = true;
    });
  }
  selectFile(event: any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      this.notifyService.showWarning(null,this.msg);
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      this.notifyService.showWarning(null,this.msg);
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
      this.selectedFiles = event.target.files;

    }
  }
  selectFilePdf(event: any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an pdf';
      this.notifyService.showWarning(null,this.msg);
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType !== 'application/pdf') {
      this.msg = "Only pdf are supported";
      this.notifyService.showWarning(null,this.msg);
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.msg = "";
      this.urlpdf = reader.result;
      this.selectedFilesPdf = event.target.files;

    }
  }

  uploadPdf() {
    this.currentFilePdf = this.selectedFilesPdf.item(0);
    this.fileuploadservice.upload(this.currentFilePdf).subscribe(
      event => {
        // this.notifyService.showSuccess(null,event['message']);
        this.selectedFilesPdf = undefined;
        this.savedFileApplication=event;
        console.log(event);
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.notifyService.showSuccess(null,this.message);
          // this.fileInfos=this.fileuploadservice.findAll();
        }
      },
      err => {
        this.message = 'Could not upload the file!';
        this.notifyService.showError(null,this.message);
        this.currentFilePdf = undefined;
      });
    this.selectedFilesPdf = undefined;
  }

  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.fileuploadservice.upload(this.currentFile).subscribe(
      event => {
        this.savedFile=event;
        this.saveStudent();
        // this.notifyService.showSuccess(null,event['message']);
        this.selectedFiles = undefined;
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log(this.progress);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          console.log(this.message);
          this.notifyService.showSuccess(null,this.message);
          this.fileInfos=this.fileuploadservice.findAll();
          console.log(this.progress);
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.notifyService.showError(null,this.message);
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }

  onUserSubmit() {
    this.saving=true;
    if(this.validate()) {
      this.uploadPdf();
      this.upload();
    }
    this.saving=false;
  }
  saveStudent(){
    this.user.role = 'ROLE_STUDENT';
    this.user.username = this.student.firstName + this.student.lastName;
    this.user.password = 'changeme';
    this.user.userType = UserType.ACADAMIC;
    this.user.firstName = this.student.firstName;
    this.user.lastName = this.student.lastName;
    this.student.fkuser = this.user;
    this.student.parent = this.selectedparent;
    this.student.parentType = this.selectedParentType.name;
    this.student.status = StudentStatus.ADMISSION_PENDING;
    this.student.active = true;
    this.student.classroom = this.selectedclassroom;
    this.student.JoinClass = this.joinedclassroom;
    this.student.image=this.savedFile;
    this.student.application=this.savedFileApplication;
    console.log( this.student);
    this.userService.create(this.user).subscribe((data) => {
      this.student.fkuser = data;
      this.onStudentSubmit();
      // this.notifyService.showSuccess("Student Created !!", "Success");
      this.userSubmitted = true;
    }, error => {
      this.userSubmitted = false;
      if (error.error instanceof ErrorEvent) {
        this.notifyService.showError(error, "Client Side Error");
        console.log("Error 1:-> " + JSON.stringify(error));
      } else {
        this.notifyService.showError(error, "Server side Error");
      }
    });
  }
  validate(){
    var valid=true;
    if(!this.selectedparent){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Parent ");
    }
    if(!this.student.firstName){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Student First name");
    }
    if(!this.student.lastName){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Student Last Name");
    }else if(this.student.lastName.length<3){
      valid=false;
      this.notifyService.showWarning(null, "Student Lastname length should be minimum 3");
    }
    if(!this.student.guardianRelation){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Student Guardian Relation");
    }
    if(!this.selectedOptionGender){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Student Gender");
    } if(!this.selectedParentType){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Parent type");
    }
    if(!this.student.dateOfBirth){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Student DOB");
    }

    if(!this.student.mobileNo){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Student mobile no");
    }
    if(!this.selectedclassroom){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Join class room");
    }
    if(!this.selectedFiles || this.selectedFiles.length==0){
      valid=false;
      this.notifyService.showWarning(null, "Please Upload Profile Image");
    }
    if(!this.selectedFilesPdf || this.selectedFilesPdf.length==0){
      valid=false;
      this.notifyService.showWarning(null, "Please Upload Application");
    }
    return valid;
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
  onStudentSubmit() {
    this.student.gender = this.selectedOptionGender;
    this.studentService.create(this.student).subscribe(() => {
      this.notifyService.showSuccess("Student Details Created !!", "Success");
      this.refresh();
      this.goBack();
    }, error => {
      this.errorHandle(error);
      // this.refresh();
    });
  }

  refresh() {
    this.user = new UserResponseDTO();
    this.student = new StudentResponseDTO();
    this.userSubmitted = false;
    this.selectedclassroom = undefined;
    this.selectedParentType = undefined;
    this.selectedOptionGender = undefined;
    this.selectedparent = undefined;
  }

  goBack() {
    this.router.navigate(['student/all']);
  }

  createParent(){
    this.router.navigate(['parent/create']);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

  errorHandle(error){
    if (error.error instanceof ErrorEvent) {
      // client-side error
      var err = `Error Code 2: ${error.status}\nMessage: ${error.error.message}`;
      this.notifyService.showError(err);
      console.log("Error 1:-> "+JSON.stringify(error));
    } else {
      // server-side error
      // var err = `Error Code 2: ${error.status}\nMessage: ${error.message}`;
      var err = `Error Code 2: ${error.status}\nMessage: ${error.error.message}`;
      // this.errorMessage = `Connection Failed :\n Contact Admin`;
      console.log("Error:-> "+JSON.stringify(error.error));
      this.notifyService.showError(err);
    }
  }


}
