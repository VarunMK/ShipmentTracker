import React, { useState } from 'react';
import {
    Box,
    FormControl,
    Input,
    Button,
    Text,
    FormLabel,
    Heading,
    Divider,
    Flex,
    useToast,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { ShadowInput } from './ShadowInput';
import Submitbutton from './SubmitButton';
import Viewbutton from './ViewButton';
import history from '../history';

interface IForm {
    client_id:'String',
    name:'String',
    ph_num:'String',
    email:'String',
    addr:'String'
}



const Client = () => {
    const { register, handleSubmit } = useForm();
    const toast = useToast();
    const onSubmit = async (formData: IForm) => {
        try {
            await fetch('http://localhost:5000/createclient',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(formData)
            }).then((data)=>{
                toast({
                    duration:2000,
                    description:"Successfully Added!",
                    status:"success",
                    isClosable:true,
                })
            });
        } catch (error) {
            console.log("Hi");
        }
    };
    return (
        <Box
            py="46px"
            px="30px"
            bgColor="#FAFAFA"
            border="5px"
            boxShadow="lg"
            borderRadius="20px"
            w="40%"
            my="50"
            mx="auto"
        >
            <Text
                fontSize="3xl"
                fontWeight="bold"
                style={{ textAlign: 'center' }}
            >
                Add Client
            </Text>
            <br />
            <Divider />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="client_id" isRequired>
                    <FormLabel fontWeight="light" fontSize="md">
                        Client_ID
                    </FormLabel>
                    <ShadowInput type="input" name="client_id" ref={register}/>
                </FormControl>
                <FormControl id="name" isRequired>
                    <FormLabel fontWeight="light" fontSize="md">
                        Name
                    </FormLabel>
                    <ShadowInput type="input" name="name" ref={register}/>
                </FormControl>
                <FormControl id="ph_num" isRequired>
                    <FormLabel fontWeight="light" fontSize="md">
                        Phone Number
                    </FormLabel>
                    <ShadowInput type="input" name="ph_num" ref={register}/>
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel fontWeight="light" fontSize="md">
                        Email
                    </FormLabel>
                    <ShadowInput type="input" name="email" ref={register}/>
                </FormControl>
                <FormControl id="addr" isRequired>
                    <FormLabel fontWeight="light" fontSize="md">
                        Address
                    </FormLabel>
                    <ShadowInput type="input" name="addr" ref={register} />
                </FormControl>
                <br />
                <Flex dir="row" justify="space-around">
                    <Submitbutton
                        type="submit"
                        borderRadius="lg"
                        style={{ textAlign: 'center' }}
                        size="lg"
                        width="25%"
                    >
                        Submit
                    </Submitbutton>
                    <Viewbutton
                        borderRadius="lg"
                        style={{ textAlign: 'center' }}
                        size="lg"
                        width="25%"
                    >
                        View Data
                    </Viewbutton>
                </Flex>
            </form>
        </Box>
    );
};

export default Client;
