import { Input, Textarea } from '@chakra-ui/react';
import React, { forwardRef } from 'react';

interface ShadowInputProps {
    type: 'Input' | 'NumberInputField' | 'Textarea';
    rest: any;
}

export const ShadowInput: React.FC<any> = forwardRef<any,ShadowInputProps>(({type, ...rest},ref) => {
    if (type === 'Textarea') {
        return (
            <Textarea
                maxH="40vh"
                boxShadow={
                    'inset -3px -3px 2px #FFFFFF, inset 2px 2px 8px rgba(0, 0, 0, 0.08)'
                }
                background="#FAFAFA"
                borderRadius="8px"
                type="text"
                ref={ref}
                border='none'
                _focus={{
                    border: '#F55C47 solid 2px'
                }}
                {...rest}
            />
        );
    }
    return (
        <Input
            boxShadow={
                'inset -3px -3px 2px #FFFFFF, inset 2px 2px 8px rgba(0, 0, 0, 0.08)'
            }
            background="#FAFAFA"
            borderRadius="8px"
            type="text"
            border='none'
            ref={ref}
            _focus={{
                border: '#F55C47 solid 2px'
            }}
            {...rest}
        />
    );
});