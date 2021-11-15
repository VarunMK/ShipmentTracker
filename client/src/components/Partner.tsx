import React from 'react';
import {
    Box,
    FormControl,
    Text,
    FormLabel,
    Divider,
    Flex,
    useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ShadowInput } from './ShadowInput';
import Submitbutton from './SubmitButton';
import Viewbutton from './ViewButton';

interface IForm {
    partner_id:'String',
    products:'String'
}



const Partner = () => {
    const { register, handleSubmit } = useForm();
    const toast = useToast();
    const onSubmit = async (formData: IForm) => {
        try {
            await fetch('http://localhost:5000/addpartner',{
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
                Add Partner
            </Text>
            <br />
            <Divider />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="partner_id" isRequired>
                    <FormLabel fontWeight="light" fontSize="md">
                        Partner_ID
                    </FormLabel>
                    <ShadowInput type="input" name="partner_id" ref={register}/>
                </FormControl>
                <FormControl id="products" isRequired>
                    <FormLabel fontWeight="light" fontSize="md">
                        Products
                    </FormLabel>
                    <ShadowInput type="input" name="products" ref={register}/>
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

export default Partner;