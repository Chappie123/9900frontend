import { AuditOutlined } from '@ant-design/icons';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { DesktopOutlined } from '@ant-design/icons';
import { DisconnectOutlined } from '@ant-design/icons';

export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'Welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/hotdeskbooking',
    name: 'Hot Desk Booking',
    icon: 'DesktopOutlined',
    component: './Hotdeskbooking/Hotdeskbooking',
  },
  {
    path: '/meetingroom',
    name: 'Meeting Room Booking',
    icon: 'UsergroupAddOutlined',
    component: './Meetingroombooking/MeetingRoom',
  },

  

  {
    path: '/admin',
    name: 'Admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
