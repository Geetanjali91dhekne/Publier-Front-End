import { Input } from 'antd';
import React from 'react';
import { commaSeperator } from '../../utils/Validation';

type Props = {
    title?: string | any;
    placeholder?: string;
    value: string | number | Date | null | undefined;
    type?: string;
    name: string;
    disabled?: boolean;
    onChange: (data: { name: string; value: string | number | undefined }) => void;
    suffix?: React.ReactNode;
    prefix?: React.ReactNode;
    isRequired?: boolean;
    error?: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    bordered?: boolean;
    className?: string;
    style?: React.CSSProperties;
    min?: number | string;
    max?: number | string;
};

const PNormalInput: React.FC<Props> = ({ title, value, type, name, disabled, onChange, suffix, prefix, isRequired, error, onKeyDown, onKeyPress, bordered, placeholder, className, style, min, max, onBlur }) => {
    const onFormFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
        const newValue = String(event.target.value);

        onChange({
            name,
            value: newValue,
        });
    };
    const displayedValue = type === 'number' ? commaSeperator(String(value || '')) : value ? String(value) : '';
    return (
        <div className="common_normalInput">
            {title && (
                <label className="ml-1">
                    {title}
                    <span className="text-red-500">{isRequired ? '*' : ''}</span>
                </label>
            )}
            <Input
                className={`appearance-none rounded-xl w-full py-3 px-3 text-gray-700 leading-tight mt-1 ${error ? 'border-red-500' : ''} ${className || ''}`}
                placeholder={isRequired ? (placeholder ? `${placeholder}*` : '') : placeholder}
                value={displayedValue}
                disabled={disabled}
                type={type}
                onChange={onFormFieldChange}
                suffix={suffix}
                prefix={prefix}
                bordered={bordered}
                min={min}
                onKeyDown={(e) => {
                    if (onKeyDown) {
                        onKeyDown(e);
                    }
                }}
                onKeyPress={(e) => {
                    if (onKeyPress) {
                        onKeyPress(e);
                    }
                }}
                style={style}
                max={max}
                onBlur={onBlur}
            />
        </div>
    );
};

export default PNormalInput;
