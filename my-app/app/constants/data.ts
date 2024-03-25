export const MenuItem = [
    {
        id: 'dashboard',
        icon: '/assets/nav/dashboard.svg',
        name: '대시보드',
        link: '/pages/dashboard',
        detail: [],
    },
    {
        id: 'group',
        icon: '/assets/nav/group.svg',
        name: '조직',
        detail: [
            {
                id: 'user',
                name: '사용자',
                link: '/pages/users',
                detail: [],
            },
            {
                id: 'organization_chart',
                name: '조직도',
                link: '',
                detail: [],
            },
            {
                id: 'position',
                name: '직위/직책',
                link: '',
                detail: [],
            },
        ],
    },
    {
        id: 'operate',
        icon: '/assets/nav/operate.svg',
        name: '운영',
        detail: [
            {
                id: 'admin',
                name: '관리자',
                link: '',
                detail: [],
            },
            {
                id: 'activity_history',
                name: '활동 이력',
                link: '',
                detail: [],
            },
        ],
    },
    {
        id: 'service',
        icon: '/assets/nav/service.svg',
        name: '서비스',
        detail: [
            {
                id: 'subscribe_info',
                name: '구독 정보',
                link: '',
                detail: [],
            },
            {
                id: 'purchase_change',
                name: '구매/변경',
                link: '',
                detail: [],
            },
            {
                id: 'payment_history',
                name: '결제 내역',
                link: '',
                detail: [],
            },
        ],
    },
];

export const ServiceMenuItem = [
    {
        id: 'office_wave',
        icon: 'https://dev-org.officenext.net/_next/image?url=https%3A%2F%2Fdev-api.jmember.co.kr%2Fapi%2Fimages%2F417c3f64-4b22-41ee-a852-b4a7767c3277&w=96&q=75',
        name: '오피스웨이브',
        link: 'https://admin.officewave.co.kr/login',
    },
    {
        id: 'office_note',
        icon: 'https://dev-org.officenext.net/_next/image?url=https%3A%2F%2Fdev-api.jmember.co.kr%2Fapi%2Fimages%2Ffa4038bc-54b8-4502-91df-dd8d5d57e757&w=96&q=75',
        name: '오피스노트',
        link: 'https://www.officenote.co.kr/dashboard',
    },
];

export const UserMenuItem = [
    {
        id: 'user-management',
        name: '사용자 관리',
    },
    {
        id: 'retirees-list',
        name: '퇴직자 목록',
    },
];

export const UserColumns = [
    {
        field: 'id',
        name: '아이디',
        required: false,
        disabled: true,
        duplicateCheck: false,
    },
    {
        field: 'name',
        name: '이름',
        required: true,
        disabled: false,
        duplicateCheck: false,
    },
    {
        field: 'username',
        name: '유저명',
        required: true,
        disabled: false,
        duplicateCheck: true,
    },
    {
        field: 'phone',
        name: '전화번호',
        required: true,
        disabled: false,
        duplicateCheck: false,
    },
    {
        field: 'email',
        name: '이메일',
        required: true,
        disabled: false,
        duplicateCheck: true,
    },
    {
        field: 'address',
        name: '주소',
        required: true,
        disabled: false,
        duplicateCheck: false,
    },
];
