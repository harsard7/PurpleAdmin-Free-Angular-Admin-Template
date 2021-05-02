import { Component, OnInit } from '@angular/core';
import { Remark } from 'src/app/model/remark';
import { RemarkResponseDTO } from 'src/app/dto/response/RemarkResponseDTO';
import { RemarkService } from 'src/app/service/remark.service';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { isStudent, isTeacher, isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-remark-update',
  templateUrl: './remark-update.component.html',
  styleUrls: ['./remark-update.component.scss']
})
export class RemarkUpdateComponent implements OnInit {

  currentUser: any = {};
  isDataAvailable: boolean = false;
  remark_id: number;
  remark = new Remark();
  response = new RemarkResponseDTO();

  constructor(private userService: UserService, private notifyService : NotificationService,
    private router: Router, private route: ActivatedRoute, private remarkService: RemarkService) { }

  ngOnInit() {
    this.remark_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.remarkService.findById(this.remark_id).subscribe(data => {
        this.remark = data;
        this.isDataAvailable = true;
      });
    });
  }



  isDataChanged() {
    if(!this.response.text) return true;
    return false;
  }

  onSubmit() {
    if(this.isDataChanged) {
      if(!this.response.text) this.response.text = this.remark.text;
      this.remarkService.update(this.remark_id, this.response).subscribe(() => {
         this.notifyService.showSuccess('Remark updated', 'Ok');
        this.refresh();
      });
    }
  }

  refresh() {
    this.response = new RemarkResponseDTO();
  }

  goBack() {
    this.router.navigate(['remark/remark', this.remark.student.id]);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router) || isTeacher(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }
}
