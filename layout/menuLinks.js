import {
  AuditOutlined,
  EditOutlined,
  HomeOutlined,
  IdcardOutlined,
  NotificationOutlined,
  SecurityScanOutlined,
  SolutionOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

export const parentmenu = [
  {
    name: "Home",
    link: "/parent-overview-page",
    icon: <HomeOutlined style={{ fontSize: "26px" }} />,
  },

  {
    name: "Notifications",
    link: "/parent-notification-page",
    icon: <NotificationOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Attendance",
    link: "/parentAttendancePage",
    icon: <UsergroupAddOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Report Card",
    link: "/parentReportCard",
    icon: <SolutionOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: <UserOutlined style={{ fontSize: "26px" }} />,
  },
];

export const adminmenu = [
  {
    name: "Home",
    link: "/HomePage",
    icon: <HomeOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Students",
    link: "/students",
    icon: <SolutionOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "User Management",
    link: "/UserManagment",
    icon: <TeamOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Manage Classes",
    link: "/assignClass",
    icon: <AuditOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Notifications",
    link: "/notifications",
    icon: <NotificationOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Attendance",
    link: "/adminAttendancePage",
    icon: <UsergroupAddOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Transcript",
    link: "/transcripts",
    icon: <SolutionOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Report Cards",
    link: "/report-cards",
    icon: <IdcardOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Grade Change",
    link: "/gradeChange",
    icon: <EditOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "All Mark Changes",
    link: "/gradeChangeLogs",
    icon: <UnorderedListOutlined style={{ fontSize: "26px" }} />,
  },
  // {
  //   name: "Profile",
  //   link: "/profile",
  //   icon: <UserOutlined style={{ fontSize: "26px" }} />,
  // },
];

export const teachermenu = [
  {
    name: "Home",
    link: "/teacherHomePage",
    icon: <HomeOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Students",
    link: "/students",
    icon: <SolutionOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Notifications",
    link: "/notifications",
    icon: <NotificationOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Grade Change",
    link: "/gradeChange",
    icon: <EditOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Attendance",
    link: "/adminAttendancePage",
    icon: <UsergroupAddOutlined style={{ fontSize: "26px" }} />,
  },
];
