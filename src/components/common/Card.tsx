import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
};

const PCard: React.FC<Props> = ({ children, className, style, onClick }) => {
    return (
        <div onClick={onClick} style={style} className={`common_card rounded-lg ${className}`}>
            {children}
        </div>
    );
};

export default PCard;
