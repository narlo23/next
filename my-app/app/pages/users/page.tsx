'use client'

import React, { useState } from "react";
import MainHeader from "@/app/components/mainheader";
import Navbar from "@/app/components/navbar";
import { useEffect } from "react";
import { getUsers } from "@/app/apis/data";

export default function User() {
    const [users, setUsers] = useState([{
        'id': '',
        'name' : '',
        'username' : '',
        'email' : '',
        'phone' : '',
        'city' : '',
        'district' : '',
        'street' : '',
        'province' : '',
        'zipcode' : '',
        'website' : '',
        'createdAt' : '',
        'updatedAt' : ''
    }])

    useEffect(() => {
        const fetchUserList = async () => {
            const usersData = await getUsers()
            setUsers(usersData)
        }
        fetchUserList()
    }, [])

    return (
        <div className="h-screen w-screen bg-gray-50 flex flex-col">
            <MainHeader />
            <div className="w-full h-full flex">
                <Navbar />
                <div className="w-full text-main-navy text-xs flex justify-center p-5">
                    <table className="text-center w-full h-[500px]">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>이름</th>
                                <th>사용자명</th>
                                <th>이메일</th>
                                <th>전화번호</th>
                                <th>주소</th>
                                <th>우편번호</th>
                                <th>웹사이트</th>
                                <th>생성날짜</th>
                                <th>수정날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            users.map((user, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.city + " " + user.district + " " + user.street}</td>
                                        <td>{user.zipcode}</td>
                                        <td>{user.website}</td>
                                        <td>{user.createdAt}</td>
                                        <td>{user.updatedAt}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}