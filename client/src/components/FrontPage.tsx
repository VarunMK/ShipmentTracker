import React from 'react';
import { Box, Text, Divider, Flex } from '@chakra-ui/react';
import { Link as L } from 'react-router-dom';
import Viewbutton from './ViewButton';

const FrontPage = () => {
    return (
        <Box
            py="46px"
            px="30px"
            bgColor="#FAFAFA"
            border="5px"
            boxShadow="lg"
            borderRadius="20px"
            w="50%"
            my="250"
            mx="auto"
        >
            <Text
                fontSize="3xl"
                fontWeight="bold"
                style={{ textAlign: 'center' }}
            >
                Shipment Tracker
            </Text>
            <br />
            <Divider />
            <br />
            <Flex flexDir="row" justify="space-around">
                    <Viewbutton
                        borderRadius="lg"
                        style={{ textAlign: 'center' }}
                        size="lg"
                        width="25%"
                        as={L}
                        to="/client"
                    >
                        Client
                    </Viewbutton>
                    <Viewbutton
                        borderRadius="lg"
                        style={{ textAlign: 'center' }}
                        size="lg"
                        width="25%"
                        as={L}
                        to="/orders"
                        border="3px solid #4fc3f7;"
                        _active={{
                            bg: '#4fc3f7',
                            color: 'white',
                        }}
                        _hover={{
                            bg: '#4fc3f7',
                            color: 'white',
                        }}
                    >
                        Orders
                    </Viewbutton>
                    <Viewbutton
                        borderRadius="lg"
                        style={{ textAlign: 'center' }}
                        size="lg"
                        width="25%"
                        as={L}
                        to="/DBA"
                        border="3px solid orange;"
                        _active={{
                            bg: 'orange',
                            color: 'white',
                        }}
                        _hover={{
                            bg: 'orange',
                            color: 'white',
                        }}

                    >
                        DBA
                    </Viewbutton>
            </Flex>
        </Box>
    );
};

export default FrontPage;
