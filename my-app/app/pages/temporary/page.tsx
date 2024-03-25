'use client';

import UserApplyModal from '@/app/components/users/userApplyModal';
import React from 'react';

const Temp = () => {
    const onClose = () => {
        console.log('close');
    };

    return (
        <div>
            <UserApplyModal open={true} onClose={onClose} />
        </div>
    );
};
export default Temp;
