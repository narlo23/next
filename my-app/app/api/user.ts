import axios from 'axios';

const API_END_POINT = 'https://koreanjson.com/';

/* 사용자 리스트 가져오기 */
export const getUsers = async () => {
    try {
        const res = await axios.get(API_END_POINT + 'users');
        return res.data;
    } catch (e: any) {
        return e.message;
    }
};

/* 사용자 생성 */
export const addUser = async () => {
    try {
        const data = {
            id: '',
            name: '',
            username: '',
            email: '',
            phone: '',
            website: '',
            province: '',
            city: '',
            district: '',
            street: '',
            zipcode: '',
            createdAt: '',
            updatedAt: '',
        };
        const res = await axios.post(API_END_POINT + 'users', data);
        return res.data;
    } catch (e: any) {
        return e.message;
    }
};

/* 특정 사용자 조회 */
export const getUserInfo = async (id: number) => {
    try {
        const res = await axios.get(API_END_POINT + `users/${id}`);
        return res.data;
    } catch (e: any) {
        return e.message;
    }
};

/* 사용자 수정 */
export const modifyUser = async (id: number) => {
    /* 수정할 정보 넘겨주기 */
    try {
        const res = await axios.put(API_END_POINT + `users/${id}`);
        return res.data;
    } catch (e: any) {
        return e.message;
    }
};

/* 사용자 삭제 */
export const deleteUser = async (id: number) => {
    try {
        const res = await axios.delete(API_END_POINT + `users/${id}`);
        return res.data;
    } catch (e: any) {
        return e.message;
    }
};

/* 웹사이트 meta data */
export const getMetaData = async (url: string) => {
    try {
        const params = {
            url: decodeURI(url),
            meta: true,
        };
        const res = await axios.get('https://api.microlink.io', { params: params });
        return res.data;
    } catch (e: any) {
        return e.message;
    }
};
