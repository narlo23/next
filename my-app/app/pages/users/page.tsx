'use client'

import React, { useState } from "react";
import MainHeader from "@/app/src/components/mainheader";
import Navbar from "@/app/src/components/navbar";
import { useEffect } from "react";
import { deleteUser, getUsers } from "@/app/src/api/user";
import { Button } from "@mui/material";

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
    const [allChecked, setAllChecked] = useState(false)
    const [checked, setChecked] = useState<boolean[]>([])

    useEffect(() => {
        const fetchUserList = async () => {
            const usersData = await getUsers()
            setUsers(usersData)
            setChecked(Array(usersData.length).fill(false))
        }
        fetchUserList()
    }, [])

    const ChangeCheckVal = (e:React.ChangeEvent<HTMLInputElement>) => {
        const idx = Number(e.target.dataset.idx)
        if (idx !== undefined) {
            let newArr = [...checked]
            newArr[idx] = !newArr[idx]
            setChecked(newArr)
            if (!newArr.includes(false)) {
                setAllChecked(true)
            } else {
                setAllChecked(false)
            }
        }
    }

    const AllChangeCheckVal = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (allChecked) {
            setAllChecked(false)
            setChecked(Array(checked.length).fill(false))
        } else {
            setAllChecked(true)
            setChecked(Array(checked.length).fill(true))
        }
    }

    const DeleteUser = () => {
        checked.map((c, i) => {
            if (c) {
                deleteUser(i+1)
            }
        })
    }

    return (
        <div className="h-screen w-screen bg-gray-50 flex flex-col">
            <MainHeader />
            <div className="w-full h-full flex">
                <Navbar />
                <div className="w-full text-main-navy text-xs flex flex-col justify-center p-5">
                    <div>
                    <table className="text-center w-full h-[500px]">
                        <thead>
                            <tr>
                                <th><input type="checkbox" checked={allChecked} onChange={AllChangeCheckVal}/></th>
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
                            users && users.length > 0 && users.map((user, i) => {
                                return (
                                    <tr key={i}>
                                        <td><input data-idx={i} type="checkbox" checked={checked[i]} onChange={ChangeCheckVal}/></td>
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
                    <div>
                        <Button variant="contained" className="text-main-navy hover:text-white" onClick={DeleteUser}>삭제</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}