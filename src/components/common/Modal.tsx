import { Modal } from 'antd';
import React from 'react';
import { IoMdClose } from 'react-icons/io';

type Props = {
    title: React.ReactNode;
    open: boolean;
    setOpen: (f: boolean) => void;
    children: React.ReactNode;
    width?: string;
    leftSection?: React.ReactNode;
    className?: string;
    maskClosable?: boolean;
    bodyStyle?: any;
    footer?: any;
};

const PModal: React.FC<Props> = ({ title, open, setOpen, children, width, leftSection, className, maskClosable, bodyStyle, footer }) => {
    const onClickClose = () => {
        setOpen(false);
    };
    const onClickOpen = () => {
        setOpen(true);
    };

    return (
        <Modal
            title={
                <div className="flex justify-between pr-4">
                    <p>{title}</p>
                    {leftSection}
                </div>
            }
            footer={footer}
            open={open}
            onCancel={onClickClose}
            onOk={onClickOpen}
            width={width}
            centered
            closeIcon={<IoMdClose size={'1.2rem'} />}
            maskClosable={maskClosable || false}
            className={className}
            bodyStyle={bodyStyle}
        >
            {children}
        </Modal>
    );
};

export default PModal;
