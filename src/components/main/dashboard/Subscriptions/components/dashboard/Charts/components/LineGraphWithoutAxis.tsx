import React from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
const data = [
    {
        name: 'Page A',
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        pv: 4300,
        amt: 2100,
    },
];
const LineGraphWithoutAxis: React.FC = () => {
    return (
        <div>
            <ResponsiveContainer width="100%" height={170}>
                <LineChart data={data}>
                    <Line type="linear" dot={false} dataKey="pv" stroke="#14532d" strokeWidth={4} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineGraphWithoutAxis;
