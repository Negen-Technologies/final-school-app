import { combineReducers } from "redux";
import { messageReducer } from "./Messages/messagesReducers";
import { resetPass } from "./ResetPassword/resetPasswordReducer";
import {
  requestStudents,
  requestStudentsByFilter,
} from "./StudentFilter/StudentFilterReducer";
import {
  createClassReducer,
  assignClassReducer,
  getTeachersReducer,
  assignTeacherReducer,
  assignStudentReducer,
  changeHomeRoomReducer,
} from "./AssignClass/AssignClassReducer";
import { loadingReducer } from "./Loading/loadingReducers";
import reducer from "./Authentication/authreducer";
import forgotreducer from "./ForgotPassword/forgetreducer";
import { changeProfile } from "./ChangeProfile/changeProfileReducer";
import singleStudentAttendanceReducer from "./SingleStudentAttendance/singleStudentAttendanceReducer";
import singleStudentInfoReducer from "./singleStudentInfo/singleStudentInfoReducer";
import { changeProfileReducer } from "./ChangeProfile/changeProfileReducer";

import {
  getClassListReducer,
  getAClassReducer,
} from "./ClassList/ClassListReducer";
import { requestTeachers } from "./TeacherFilter/TeacherFilterReducer";
import adminReducer from "./UserManagement/admin/allAdminReducer";
import parentReducer from "./UserManagement/parents/allParentsReducer";
import teacherReducer from "./UserManagement/teachers/allTeachersReducer";
import allUsersReducer from "./UserManagement/users/allUsersReducer";
import { createUserReducer } from "./CreateUser/CreateUserReducer";
import { createChildReducer } from "./CreateChild/CreateChildReducer";
import { createTeacherReducer } from "./CreateTeacher/CreateTeacherReducer";
import { getAllCoursesReducer } from "./Course/CourseReducer";
import { parentOverview } from "./ParentOverview/parentOverviewReducer";
import { adminAttendanceReducer } from "./AdminAttendance/AdminAttendanceReducer";
import { attendDataReducer } from "./AdminAttendance/AdminAttendanceReducer";
import { createAssessmentReducer } from "./CreateAssessment/createAssessmentReducer";
import {
  notificationReducer,
  myNotificationReducer,
  addNotificationReducer,
} from "./Notification/NotificationReducer";

import { gradeChangereducer } from "./GradeChange/gradeChangeReducer";
import { getAssessmentReducer } from "./GradeChange/gradeChangeReducer";
import { dashboardReducer } from "./Dashboard/dashboardReducer";
import { getAllStudentsReducer } from "./StudentFilter/StudentFilterReducer";
import { createAttendanceReducer } from "./CreateAttendance/createAttendanceReducer";
import { parentGetMeReducer } from "./ParentGetMe/parentGetMeReducer";
import { changeLogsReducer } from "./ChangeLogs/changeLogsReducer";
import { classRankReducer } from "./ClassRank/classRankReducer";
import { teacherGetMeReducer } from "./TeacherGetMe/teacherGetMeReducer";
import {
  createReportCardReducer,
  getReportCardReducer,
} from "./ReportCard/reportCardReducer";

import { AttendanceReducer } from "./Attendance/AttendanceReducer";

const rootReducer = combineReducers({
  auth: reducer,
  requestStudents: requestStudents,
  teachers: requestTeachers,
  assignClass: assignClassReducer,
  createClass: createClassReducer,
  getTeachers: getTeachersReducer,
  assignTeacher: assignTeacherReducer,
  assignStudent: assignStudentReducer,
  createUser: createUserReducer,
  createChild: createChildReducer,
  createTeacher: createTeacherReducer,
  adminAttendanceReducer: adminAttendanceReducer,
  loading: loadingReducer,
  message: messageReducer,
  forgotpassword: forgotreducer,
  resetPassword: resetPass,
  changeProfile: changeProfileReducer,
  singleStudentAttendance: singleStudentAttendanceReducer,
  singleStudentInfo: singleStudentInfoReducer,
  classList: getClassListReducer,
  admins: adminReducer,
  parents: parentReducer,
  teacher: teacherReducer,
  allusers: allUsersReducer,
  requestStudentsByFilter: requestStudentsByFilter,
  courseList: getAllCoursesReducer,
  parentOverview: parentOverview,
  attendData: attendDataReducer,
  notification: notificationReducer,
  myNotification: myNotificationReducer,
  addNotification: addNotificationReducer,
  gradeChange: gradeChangereducer,
  getAssessment: getAssessmentReducer,
  dashboard: dashboardReducer,
  getAllStudents: getAllStudentsReducer,
  createAttendance: createAttendanceReducer,
  createAssessment: createAssessmentReducer,
  parentGetMe: parentGetMeReducer,
  changeLogs: changeLogsReducer,
  classRank: classRankReducer,
  teacherGetMe: teacherGetMeReducer,
  singleClass: getAClassReducer,
  createReportCard: createReportCardReducer,
  getReportCard: getReportCardReducer,
  attendanceData: AttendanceReducer,
  changeHomeRoomReducer: changeHomeRoomReducer,
});

export default rootReducer;
