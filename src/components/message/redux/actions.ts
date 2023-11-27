import messageTypes, { CommonAction, Message } from './types';

function showMessage(message: Message): CommonAction {
    return {
        type: messageTypes.SHOW_MESSAGE,
        payload: message,
    };
}
function hideMessage(): CommonAction {
    return {
        type: messageTypes.HIDE_MESSAGE,
        payload: undefined,
    };
}

const MessageActions = {
    showMessage,
    hideMessage,
};

export default MessageActions;
