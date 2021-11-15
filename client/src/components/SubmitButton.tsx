import { Button } from '@chakra-ui/react';
import React from 'react';

const Submitbutton: React.FC<any> = ({ children, ...rest }) => (
    // @ts-ignore
    <Button
        backgroundColor="#FAFAFA"
        fontWeight="700"
        boxShadow="4px 4px 24px rgba(0, 0, 0, 0.08);"
        border="3px solid #F55C47;"
        _active={{
            bg: '#F55C47',
            color: 'white',
        }}
        _hover={{
            bg: '#F55C47',
            color: 'white',
        }}
        borderRadius="8px"
        {...rest}
    >
        {children}
    </Button>
);

export default Submitbutton;