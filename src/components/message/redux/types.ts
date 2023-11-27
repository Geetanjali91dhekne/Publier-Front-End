const messageTypes = {
    SHOW_MESSAGE: 'SHOW_MESSAGE',
    HIDE_MESSAGE: 'HIDE_MESSAGE',
};

export default messageTypes;

export interface Message {
    text: string;
    error: boolean;
}

export interface CommonAction {
    type: string;
    payload: any;
}

export interface MessageState {
    message: Message;
    show: boolean;
}
