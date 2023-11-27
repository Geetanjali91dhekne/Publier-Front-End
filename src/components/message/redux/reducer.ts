/* user reducer */
import messageTypes, { CommonAction, MessageState } from './types';

const messageInitialState: MessageState = {
    show: false,
    message: {
        text: '',
        error: false,
    },
};
const MessageReducer = (state = messageInitialState, action: CommonAction): MessageState => {
    switch (action.type) {
        case messageTypes.SHOW_MESSAGE:
            return {
                ...state,
                show: true,
                message: action.payload,
            };
        case messageTypes.HIDE_MESSAGE:
            return {
                ...state,
                show: false,
            };
        default:
            return state;
    }
};

export default MessageReducer;
