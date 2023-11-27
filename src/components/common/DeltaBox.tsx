import React from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

type Props = {
    row: any;
    width?: string;
};
const DeltaBox: React.FC<Props> = ({ row, width }) => {
    return (
        <div>
            <div
                className={`flex items-center justify-center topCard_per ml-2 ${width ? width : 'w-24'}`}
                style={{
                    color: Number(row) === 0 ? 'grey' : row > 0 ? '#69A284' : '#D40505',
                }}
            >
                {Number(row) === 0 ? '0%' : row > 0 ? `+${parseFloat(String(row)).toFixed(2)}%` : `${parseFloat(String(row)).toFixed(2)}%`}
                {Number(row) === 0 ? '' : row > 0 ? <AiOutlineArrowUp className="ml-1" size={'0.9rem'} color={'#69a284'} /> : <AiOutlineArrowDown className="ml-1" size={'0.9rem'} color={'#D40505'} />}
            </div>
        </div>
    );
};

export default DeltaBox;
