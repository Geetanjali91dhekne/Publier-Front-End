import React from 'react';
import PreBidUpload from './PreBidUpload';

const PrebidUploadDashboard: React.FC = () => {
    return (
        <div className="dashboard ">
            <div className="relative pb-10 flex flex-wrap justify-between items-center gap-5">
                <PreBidUpload />
            </div>
        </div>
    );
};

export default PrebidUploadDashboard;
