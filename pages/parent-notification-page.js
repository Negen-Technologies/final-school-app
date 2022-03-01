import React from 'react'
import withAuth from '../utils/protectRoute'
import NotificationsPagination from "../Components/NotificationComponents/NotificationsPagination";
import { Button } from 'antd';
import router from 'next/router';


function ParentNotificationPage() {
    const notifications = [
        {
          name: "Administrator, Liya",
          src: "/images/sampleWoman.jpg",
          content:
            "Ex consectetur consequat voluptate consectetur cillum magnaconsectetur elit laborum pariatur labore voluptate. Sint    mollit deserunt ea enim voluptate commodo mollit elit mollit.",
        },
        {
          name: "Staff, Messi",
          src: "/images/sampleMan.jpg",
          content:
            "Ex consectetur consequat voluptate consectetur cillum magnaconsectetur elit laborum pariatur labore voluptate. Sint    mollit deserunt ea enim voluptate commodo mollit elit mollit.",
        },
        {
          name: "Staff, Shady",
          src: "/images/sampleMan.jpg",
          content:
            "Ex consectetur consequat voluptate consectetur cillum magnaconsectetur elit laborum pariatur labore voluptate. Sint    mollit deserunt ea enim voluptate commodo mollit elit mollit.",
        },
        {
          name: "Teacher, Kidst",
          src: "/images/sampleWoman.jpg",
          content:
            "Ex consectetur consequat voluptate consectetur cillum magnaconsectetur elit laborum pariatur labore voluptate. Sint    mollit deserunt ea enim voluptate commodo mollit elit mollit.",
        },
        {
          name: "Administrator, Henok",
          src: "/images/sampleMan.jpg",
          content:
            "Ex consectetur consequat voluptate consectetur cillum magnaconsectetur elit laborum pariatur labore voluptate. Sint    mollit deserunt ea enim voluptate commodo mollit elit mollit.",
        },
      ];

    return (
        <div style={{
            paddingLeft: "16px",
            paddingRight: "16px",
          }}>
            <NotificationsPagination
            notifications={notifications}
          ></NotificationsPagination>
            
        </div>
    )
}

export default withAuth(ParentNotificationPage)
