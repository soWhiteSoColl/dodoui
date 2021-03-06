import * as React from 'react';
interface Porps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    label?: any;
    message?: string;
    width?: number;
    fullWidth?: boolean;
    classname?: string;
}
export default class Input extends React.Component<Porps> {
    state: {
        focus: boolean;
        dirty: boolean;
        hasValue: boolean;
    };
    $input: any;
    handleFocus: (e: any) => void;
    handleBlur: (e: any) => void;
    handleChange: (e: any) => void;
    setFocus: () => void;
    render(): JSX.Element;
}
export {};
