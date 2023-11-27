import { Button } from 'antd';
import React from 'react';
//common button

type Props = {
    title: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    loading?: boolean;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    light?: boolean;
};

const PButton: React.FC<Props> = ({ title, loading, light, onClick, className, style, icon, disabled }) => {
    const classText = light ? 'common_light_btn' : 'common_primany_btn';

    return (
        <Button disabled={disabled} icon={icon} loading={loading} className={`rounded-lg px-9 text-base flex justify-center items-center py-2 ${classText} ${className} `} onClick={onClick} style={style}>
            {title}
        </Button>
    );
};
export default PButton;

export const RoundButton: React.FC<Props> = ({ title, loading, light, onClick, className, style, icon, disabled }) => {
    const classText = light ? 'common_light_btn' : 'common_primany_btn';

    return (
        <Button disabled={disabled} icon={icon} loading={loading} className={`px-9 text-base flex justify-center items-center py-2 rounded-full ${classText} ${className} `} onClick={onClick} style={style}>
            {title}
        </Button>
    );
};


