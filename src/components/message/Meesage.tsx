import React, { useEffect } from 'react';
import { BsCheck2Circle } from 'react-icons/bs';
import { MdErrorOutline } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/RootReducer';
import actions from './redux/actions';

const Message: React.FC = () => {
    const dispatch = useDispatch();
    const messageObj = useSelector((state: RootState) => state.message);
    const { message, show } = messageObj;

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                dispatch(actions.hideMessage());
            }, 3000);
        }
    }, [show, dispatch]);

    if (!show) return null;

    return (
        <div className="flex justify-center">
            <div className={`w-11/12 md:w-1/3 lg:w-1/4 p-4 fixed top-24 shadow-md rounded-lg z-[99999] ${message.error ? 'bg-red-400' : 'bg-green-600'}`}>
                <div className="flex items-center">
                    <div>{message.error ? <MdErrorOutline className="text-white text-3xl" /> : <BsCheck2Circle className="text-3xl text-white" />}</div>
                    <p className="text-white text-base SourceSansPro font-bold ml-3">{message.text}</p>
                </div>
            </div>
        </div>
    );
};

export default Message;
