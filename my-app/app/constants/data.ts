export const MenuItem = [
    {
        'id' : 'dashboard',
        'name' : '대시보드',
        'detail' : []
    },
    {
        'id' : 'group',
        'name' : '조직',
        'detail' : [
            {
                'id' : 'user',
                'name' : '사용자',
                'link' : '/pages/users',
                'detail' : []
            },
            {
                'id' : 'organization_chart',
                'name' : '조직도',
                'link' : '',
                'detail' : []
            },
            {
                'id' : 'position',
                'name' : '직위/직책',
                'link' : '',
                'detail' : []
            }
        ]
    },
    {
        'id' : 'operate',
        'name' : '운영',
        'detail' : [
            {
                'id' : 'admin',
                'name' : '관리자',
                'link' : '',
                'detail' : []
            },
            {
                'id' : 'activity_history',
                'name' : '활동 이력',
                'link' : '',
                'detail' : []
            }
        ]
    },
    {
        'id' : 'service',
        'name' : '서비스',
        'detail' : [
            {
                'id' : 'subscribe_info',
                'name' : '구독 정보',
                'link' : '',
                'detail' : []
            },
            {
                'id' : 'purchase_change',
                'name' : '구매/변경',
                'link' : '',
                'detail' : []
            },
            {
                'id' : 'payment_history',
                'name' : '결제 내역',
                'link' : '',
                'detail' : []
            }
        ]
    }
]

export const ServiceMenuItem = [
    {
        'id' : 'office_wave',
        'icon': '',
        'name' : '오피스웨이브',
        'link' : 'https://admin.officewave.co.kr/login'
    },
    {
        'id' : 'office_note',
        'icon' : '',
        'name' : '오피스노트',
        'link' : 'https://www.officenote.co.kr/dashboard'
    }
]
