import * as React from 'react';
import { IconProps } from './IconProps';
export function Avatar({ className, size = 24, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><rect width="48" height="48" fill="black" fillOpacity="0"></rect><path d="M46 24C46 36.1503 36.1503 46 24 46C11.8497 46 2 36.1503 2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24Z" fill="white" stroke="white" fillOpacity="0.1" strokeWidth="4"></path><path d="M13.6054 30C15.6802 33.5868 19.5583 36 24 36C28.4417 36 32.3198 33.5868 34.3946 30H13.6054Z" fill="white" fillRule="evenodd" clipRule="evenodd"></path><path d="M33 25.5C34.6569 25.5 36 24.1569 36 22.5C36 20.8431 34.6569 19.5 33 19.5C31.3431 19.5 30 20.8431 30 22.5C30 24.1569 31.3431 25.5 33 25.5Z" fill="white" fillRule="evenodd" clipRule="evenodd"></path><path d="M15 25.5C16.6569 25.5 18 24.1569 18 22.5C18 20.8431 16.6569 19.5 15 19.5C13.3431 19.5 12 20.8431 12 22.5C12 24.1569 13.3431 25.5 15 25.5Z" fill="white" fillRule="evenodd" clipRule="evenodd"></path></svg>
    );
}
