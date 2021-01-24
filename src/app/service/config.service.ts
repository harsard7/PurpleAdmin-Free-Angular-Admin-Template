import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {


  private baseUrl = '/api';

  private refreshTokenUrl = this.baseUrl + '/refresh';
  private loginUrl = this.baseUrl + '/login';
  private logoutUrl = this.baseUrl + '/logout';
  private changePasswordUrl = this.baseUrl + '/changePassword';

  get getRefreshTokenUrl(): string {
    return this.refreshTokenUrl;
  }

  get getLoginUrl(): string {
    return this.loginUrl;
  }

  get getLogoutUrl(): string {
    return this.logoutUrl;
  }

  get getChangePasswordUrl(): string {
    return this.changePasswordUrl;
  }

  private userUrl = this.baseUrl + '/user';
  private whoamiUrl = this.userUrl + '/whoami';
  private allUsersUrl = this.userUrl + '/all';
  private createUrl = this.userUrl + '/create';
  private deleteUrl = this.userUrl;
  private getUserByIdUrl = this.userUrl;
  private isUsernameUniqueUrl = this.userUrl + '/username';
  private updateUserUrl = this.userUrl + '/update';

  get getWhoami(): string {
    return this.whoamiUrl;
  }

  get getAllUsersUrl(): string {
    return this.allUsersUrl;
  }

  get getCreateUrl(): string {
    return this.createUrl;
  }

  get getDeleteUrl(): string {
    return this.deleteUrl;
  }

  get getGetUserByIdUrl(): string {
    return this.getUserByIdUrl;
  }

  get getIsUsernameUniqueUrl(): string {
    return this.isUsernameUniqueUrl;
  }

  get getUpdateUserUrl(): string {
    return this.updateUserUrl;
  }

  private studentUrl = this.baseUrl + '/students';
  private studentAllUrl = this.studentUrl + '/all';
  private studentByIdUrl = this.studentUrl;
  private studentByUserIdUrl = this.studentUrl + '/user';
  private createStudentUrl =  this.studentUrl + '/create';
  private updateStudentUrl = this.studentUrl + '/update';
  private deleteStudentUrl = this.studentUrl;
  private summaryStudentUrl = this.studentUrl + '/summary';

  get getStudentAllUrl(): string {
    return this.studentAllUrl;
  }

  get getStudentByUserIdUrl(): string {
    return this.studentByUserIdUrl;
  }

  get getCreateStudentUrl(): string {
    return this.createStudentUrl;
  }

  get getStudentUrl(): string {
    return this.studentByIdUrl;
  }

  get getUpdateStudentUrl(): string {
    return this.updateStudentUrl;
  }

  get getDeleteStudentUrl(): string {
    return this.deleteStudentUrl;
  }

  get getSummaryStudentUrl(): string {
    return this.summaryStudentUrl;
  }

  private attendanceUrl = this.baseUrl + '/attendances';
  private makeAttendanceFormToClassroomUrl = this.attendanceUrl;
  private createAttendanceUrl = this.attendanceUrl + '/create';
  private verifyAttendanceUrl = this.attendanceUrl + '/verify';
  private getAllAttendancesByClassroomUrl = this.attendanceUrl + '/classroom';
  private allAttendanceByStudentUrl = this.attendanceUrl + '/all';
  private deleteAttendaceUrl = this.attendanceUrl;

  get getMakeAttendanceFormToClassroomUrl(): string {
    return this.makeAttendanceFormToClassroomUrl;
  }

  get getCreateAttendanceUrl(): string {
    return this.createAttendanceUrl;
  }

  get getVerifyAttendanceUrl(): string {
    return this.verifyAttendanceUrl;
  }

  get getGetAllAttendancesByClassroomUrl(): string {
    return this.getAllAttendancesByClassroomUrl;
  }

  get getAllAttendanceByStudentUrl(): string {
    return this.allAttendanceByStudentUrl;
  }

  get getDeleteAttendaceUrl(): string {
    return this.deleteAttendaceUrl;
  }

  private classroomUrl = this.baseUrl + '/classrooms';
  private allClassroomUrl = this.classroomUrl + '/all';
  private findByHeadteacherIdUrl = this.classroomUrl + '/headteacher';
  private createClassroomUrl = this.classroomUrl + '/create';
  private updateClassroomUrl = this.classroomUrl + '/update';
  private deleteClassroomUrl = this.classroomUrl;
  private getStudentsFromClassroomUrl = this.classroomUrl + '/students';
  private setSubjectUrl = this.classroomUrl + '/setSubject';
  private unsetSubjectUrl = this.classroomUrl + '/unsetSubject';
  private getClassroomByIdUrl = this.classroomUrl;

  get getAllClassroomUrl(): string {
    return this.allClassroomUrl;
  }

  get getFindByHeadteacherIdUrl(): string {
    return this.findByHeadteacherIdUrl;
  }

  get getCreateClassroomUrl(): string {
    return this.createClassroomUrl;
  }

  get getUpdateClassroomUrl(): string {
    return this.updateClassroomUrl;
  }

  get getDeleteClassroomUrl(): string {
    return this.deleteClassroomUrl;
  }

  get getGetStudentsFromClassroomUrl(): string {
    return this.getStudentsFromClassroomUrl;
  }

  get getSetSubjectUrl(): string {
    return this.setSubjectUrl;
  }

  get getGetClassroomByIdUrl(): string {
    return this.getClassroomByIdUrl;
  }

  get getUnsetSubjectUrl(): string {
    return this.setSubjectUrl;
  }

  private subjectUrl = this.baseUrl + '/subjects';
  private getSubjectsByTeacherIdUrl = this.subjectUrl + '/teacher';
  private createSubjectUrl = this.subjectUrl + '/create';
  private updateSubjectUrl = this.subjectUrl + '/update';
  private setSubjectToStudentUrl = this.subjectUrl + '/setSubject';
  private deleteSubjectUrl = this.subjectUrl;
  private getSubjectByIdUrl = this.subjectUrl;
  private getAllSubjectsUrl = this.subjectUrl + '/all';
  private unsetSubjectToStudentUrl = this.subjectUrl + '/unsetSubject';

  get getCreateSubjectUrl(): string {
    return this.createSubjectUrl;
  }

  get getGetSubjectsByTeacherIdUrl(): string {
    return this.getSubjectsByTeacherIdUrl;
  }

  get getUpdateSubjectUrl(): string {
    return this.updateSubjectUrl;
  }

  get getSetSubjectToStudentUrl(): string {
    return this.setSubjectToStudentUrl;
  }

  get getDeleteSubjectUrl(): string {
    return this.deleteSubjectUrl;
  }

  get getGetSubjectByIdUrl(): string {
    return this.getSubjectByIdUrl;
  }

  get getGetAllSubjectsUrl(): string {
    return this.getAllSubjectsUrl;
  }

  get getUnsetSubjectToStudentUrl(): string {
    return this.unsetSubjectToStudentUrl;
  }

  private examUrl = this.baseUrl + '/exams';
  private findExamByIdUrl = this.examUrl;
  private examfindAllByStudentUrl = this.examUrl + '/student';
  private createExamUrl = this.examUrl + '/create';
  private updateExamUrl = this.examUrl + '/update';
  private deleteExamUrl = this.examUrl;
  private createExamsFromFormUrl = this.examUrl + '/form/create';
  private makeExamsFormToClassroomUrl = this.examUrl + '/form';
  private getAllExamTypeUrl = this.examUrl + '/type/all';

  get getExamfindAllByStudentUrl(): string {
    return this.examfindAllByStudentUrl;
  }

  get getFindExamByIdUrl(): string {
    return this.findExamByIdUrl;
  }

  get getCreateExamUrl(): string {
    return this.createExamUrl;
  }

  get getUpdateExamUrl(): string {
    return this.updateExamUrl;
  }

  get getDeleteExamUrl(): string {
    return this.deleteExamUrl;
  }

  get getCreateExamsFromFormUrl(): string {
    return this.createExamsFromFormUrl;
  }

  get getMakeExamsFormToClassroomUrl(): string {
    return this.makeExamsFormToClassroomUrl;
  }

  get getGetAllExamTypeUrl(): string {
    return this.getAllExamTypeUrl;
  }

  private reportUrl = this.baseUrl + '/reports';
  private getSemesterResultByStudentUrl = this.reportUrl;
  private findReportByIdUrl = this.reportUrl;
  private createrReportUrl = this.reportUrl + '/create';
  private updateReportUrl = this.reportUrl + '/update';
  private deletereportUrl = this.reportUrl;
  private makeReportFormToClassroomUrl = this.reportUrl + '/form';
  private createReportsToClassroomUrl = this.reportUrl + '/form/create';

  get getGetSemesterResultByStudentUrl(): string {
    return this.getSemesterResultByStudentUrl;
  }

  get getFindReportByIdUrl(): string {
    return this.findReportByIdUrl;
  }

  get getCreateReportUrl(): string {
    return this.createrReportUrl;
  }

  get getUpdateReportUrl(): string {
    return this.updateReportUrl;
  }

  get getDeleteReportUrl(): string {
    return this.deletereportUrl;
  }

  get getMakeReportFormToClassroomUrl(): string {
    return this.makeReportFormToClassroomUrl;
  }

  get getCreateReportsToClassroomUrl(): string {
    return this.createReportsToClassroomUrl;
  }

  private teacherUrl = this.baseUrl + '/teachers';
  private findAllTeacherUrl = this.teacherUrl + '/all';
  private findTeacherById = this.teacherUrl;
  private findTeacherByUserId = this.teacherUrl + '/user';
  private createTeacherUrl = this.teacherUrl + '/create';
  private updateTeacherUrl = this.teacherUrl + '/update';
  private setSubjectToTeacherUrl = this.teacherUrl + '/setSubject';
  private deleteTeacherUrl = this.teacherUrl;
  private setTeacherPreferencesUrl = this.teacherUrl + '/preferences';
  private getAllTeacherPreferencesUrl = this.teacherUrl + '/preferences';

  get getFindAllTeacherUrl(): string {
    return this.findAllTeacherUrl;
  }

  get getFindTeacherById(): string {
    return this.findTeacherById;
  }

  get getFindTeacherByUserId(): string {
    return this.findTeacherByUserId;
  }

  get getCreateTeacherUrl(): string {
    return this.createTeacherUrl;
  }

  get getUpdateTeacherUrl(): string {
    return this.updateTeacherUrl;
  }

  get getSetSubjectToTeacherUrl(): string {
    return this.setSubjectToTeacherUrl;
  }

  get getDeleteTeacherUrl(): string {
    return this.deleteTeacherUrl;
  }

  get getSetTeacherPreferencesUrl(): string {
    return this.setTeacherPreferencesUrl;
  }

  get getGetAllTeacherPreferencesUrl(): string {
    return this.getAllTeacherPreferencesUrl;
  }

  private timetableUrl = this.baseUrl + '/timetables';
  private createTimeTableUrl = this.timetableUrl + '/create';
  private updateTimeTableUrl = this.timetableUrl + '/update';
  private deleteTimeTableUrl = this.timetableUrl;
  private findByIdTimeTableUrl = this.timetableUrl;
  private getTimeTableByStudentUrl = this.timetableUrl + '/student';
  private getTimeTableByTeacherUrl = this.timetableUrl + '/teacher';
  private getTimeTableEntitiesBySubjectUrl = this.timetableUrl + '/subject';

  get getFindByIdTimeTableUrl(): string {
    return this.findByIdTimeTableUrl;
  }

  get getCreateTimeTableUrl(): string {
    return this.createTimeTableUrl;
  }

  get getUpdateTimeTableUrl(): string {
    return this.updateTimeTableUrl;
  }

  get getDeleteTimeTableUrl(): string {
    return this.deleteTimeTableUrl;
  }

  get getGetTimeTableByStudentUrl(): string {
    return this.getTimeTableByStudentUrl;
  }

  get getGetTimeTableByTeacherUrl(): string {
    return this.getTimeTableByTeacherUrl;
  }

  get getGetTimeTableEntitiesBySubjectUrl(): string {
    return this.getTimeTableEntitiesBySubjectUrl;
  }

  private adminUrl = this.baseUrl + '/admin';
  private newYearUrl = this.adminUrl + '/newYear';
  private createArchiveUrl = this.adminUrl + '/createArchive';
  private getArchiveUrl = this.adminUrl + '/archives';
  private finishedUrl = this.adminUrl + '/finished';
  private getArchiveByIdUrl = this.adminUrl + '/archive';

  get getNewYearUrl(): string {
    return this.newYearUrl;
  }

  get getCreateArchiveUrl(): string {
    return this.createArchiveUrl;
  }

  get getGetArchiveUrl(): string {
    return this.getArchiveUrl;
  }

  get getFinishedUrl(): string {
    return this.finishedUrl;
  }

  get getGetArchiveByIdUrl(): string {
    return this.getArchiveByIdUrl;
  }

  private headteacherUrl = this.baseUrl + '/headteacher';
  private findFailedStudentsInClassUrl = this.headteacherUrl + '/find-failed';
  private showResultBySubjectUrl = this.headteacherUrl + '/show-result';

  get getFindFailedStudentsInClassUrl(): string {
    return this.findFailedStudentsInClassUrl;
  }

  get getShowResultBySubjectUrl(): string {
    return this.showResultBySubjectUrl;
  }

  private messageUrl = this.baseUrl + '/messages';
  private findByMessageIdUrl = this.messageUrl;
  private findAllMessagesUrl = this.messageUrl + '/all';
  private createMessageUrl = this.messageUrl + '/create';
  private updateMessageUrl = this.messageUrl + '/update';
  private deleteMessageUrl = this.messageUrl;

  get getFindAllMessagesUrl(): string {
    return this.findAllMessagesUrl;
  }

  get getFindByMessageIdUrl(): string {
    return this.findByMessageIdUrl;
  }

  get getCreateMessageUrl(): string {
    return this.createMessageUrl;
  }

  get getUpdateMessageUrl(): string {
    return this.updateMessageUrl;
  }

  get getDeleteMessageUrl(): string {
    return this.deleteMessageUrl;
  }

  private remarkUrl = this.baseUrl + '/remarks';
  private findByRemarkIdUrl = this.remarkUrl;
  private findAllRemarksUrl = this.remarkUrl + '/student';
  private createRemarkUrl = this.remarkUrl + '/create';
  private updateRemarkUrl = this.remarkUrl + '/update';
  private deleteRemarkUrl = this.remarkUrl;

  get getFindAllRemarksUrl(): string {
    return this.findAllRemarksUrl;
  }

  get getFindByRemarkIdUrl(): string {
    return this.findByRemarkIdUrl;
  }

  get getCreateRemarkUrl(): string {
    return this.createRemarkUrl;
  }

  get getUpdateRemarkUrl(): string {
    return this.updateRemarkUrl;
  }

  get getDeleteRemarkUrl(): string {
    return this.deleteRemarkUrl;
  }

  private roomUrl = this.baseUrl + '/rooms';
  private findAllRoomsUrl = this.roomUrl + '/all';
  private findByRoomUrl = this.roomUrl;
  private createRoomUrl = this.roomUrl + '/create';
  private deleteRoomUrl = this.roomUrl;

  get getFindAllRoomsUrl(): string {
    return this.findAllRoomsUrl;
  }

  get getFindByRoomUrl(): string {
    return this.findByRoomUrl;
  }

  get getCreateRoomUrl(): string {
    return this.createRoomUrl;
  }

  get getDeleteRoomUrl(): string {
    return this.deleteRoomUrl;
  }

  private _schoolUrl = this.baseUrl + '/school';
  private findAllSchoolUrl = this._schoolUrl + '/all';
  private _findBySchoolUrl = this._schoolUrl;
  private createSchoolUrl = this._schoolUrl + '/create';
  private _deleteSchoolUrl = this._schoolUrl;
  private _activeSchoolUrl = this._schoolUrl + '/active';



  get findBySchoolUrl(): string {
    return this._findBySchoolUrl;
  }

  get deleteSchoolUrl(): string {
    return this._deleteSchoolUrl;
  }

  get getFindAllSesionUrl(): string {
    return this.findAllSchoolUrl;
  }

  get getCreateSessionUrl(): string {
    return this.createSchoolUrl;
  }
  get activeSchoolUrl(): string {
    return this._activeSchoolUrl;
  }

  private employeeUrl = this.baseUrl + '/employees';
  private employeeAllUrl = this.employeeUrl + '/all';
  private employeeByIdUrl = this.employeeUrl;
  private employeeByUserIdUrl = this.employeeUrl + '/user';
  private createEmployeeUrl =  this.employeeUrl + '/create';
  private updateEmployeeUrl = this.employeeUrl + '/update';
  private deleteEmployeeUrl = this.employeeUrl;

  get getEmployeeAllUrl(): string {
    return this.employeeAllUrl;
  }

  get getEmployeeByUserIdUrl(): string {
    return this.employeeByUserIdUrl;
  }

  get getCreateEmployeeUrl(): string {
    return this.createEmployeeUrl;
  }

  get getEmployeeUrl(): string {
    return this.employeeByIdUrl;
  }

  get getUpdateEmployeeUrl(): string {
    return this.updateEmployeeUrl;
  }

  get getDeleteEmployeeUrl(): string {
    return this.deleteEmployeeUrl;
  }

}
