import React from 'react';
import { BsLockFill } from 'react-icons/bs';

const AccessDenined: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-full flex-col">
            <div className="w-24 h-24 rounded-full border border-gray-500 flex justify-center items-center">
                <BsLockFill size={'2.4rem'} />
            </div>
            <p className="text-3xl mt-2 raleway-bold">Access Denied</p>
            <div className="w-1/3 text-center pt-2">
                <p>You don't have permissions to access this page.</p>
            </div>
        </div>
    );
};

export default AccessDenined;
