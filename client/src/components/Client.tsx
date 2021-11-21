import React, { useState } from 'react';
import {
    Box,
    FormControl,
    Text,
    FormLabel,
    Divider,
    Flex,
    useToast,
    Modal,
    useDisclosure,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    Table,
    Td,
    Th,
    Thead,
    Tr,
    Tbody,
    Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ShadowInput } from './ShadowInput';
import Submitbutton from './SubmitButton';
import Viewbutton from './ViewButton';

interface IForm {
    client_id: 'String';
    name: 'String';
    ph_num: 'String';
    email: 'String';
    addr: 'String';
}

const Client = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState([]);
    const [client_id,setClient_id]=useState("");
    const [pass,setPassword]=useState("");
    const [props, setProps] = useState([]);
    const { register, handleSubmit } = useForm();
    const toast = useToast();

    const showHistData = async (c_id:String,password:String) => {
        try {
            const resp2 = await fetch('http://localhost:5000/getcolname', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({table_name:'orderhistory'}),
            });
            const resp = await fetch('http://localhost:5000/gethisdata', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({table_name:'orderhistory',client_id:c_id,pass:password}),
            });
            const jsonData = await resp.json();
            const jsonData2=await resp2.json();
            setData(jsonData);
            setProps(jsonData2);
            console.log(jsonData2)
        } catch (err) {
            console.log(err);
        }
    };
    const showDetails = async (c_id:String,password:String) => {
        try {
            const resp2 = await fetch('http://localhost:5000/getcolname', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({table_name:'order_details'}),
            });
            const resp = await fetch('http://localhost:5000/getdetails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({table_name:'order_details',client_id:c_id,pass:password}),
            });
            const jsonData = await resp.json();
            const jsonData2=await resp2.json();
            setData(jsonData);
            setProps(jsonData2);
            console.log(jsonData2)
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = async (formData: IForm) => {
        try {
            await fetch('http://localhost:5000/update_data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            }).then((data) => {
                console.log(data.status);
                if (data.status === 201) {
                    toast({
                        duration: 2000,
                        description: 'Error Updating Data!',
                        status: 'error',
                        isClosable: true,
                    });
                } else if (data.status === 200) {
                    toast({
                        duration: 2000,
                        description: 'Successfully Updated!',
                        status: 'success',
                        isClosable: true,
                    });
                } else {
                    toast({
                        duration: 2000,
                        description: 'An Error has occured!',
                        status: 'error',
                        isClosable: true,
                    });
                }
            });
        } catch (error) {
            console.log(error);
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
                Edit Client
            </Text>
            <br />
            <Divider />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="client_id" isRequired>
                    <FormLabel fontWeight="light" fontSize="md">
                        Client_ID
                    </FormLabel>
                    <ShadowInput type="input" name="client_id" ref={register} onChange={(e: { target: { value: React.SetStateAction<string>; }; })=>{setClient_id(e.target.value)}} />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel fontWeight="light" fontSize="md">
                        Password
                    </FormLabel>
                    <ShadowInput type="input" name="password" ref={register} onChange={(e: { target: { value: React.SetStateAction<string>; }; })=>{setPassword(e.target.value)}} />
                </FormControl>
                <FormControl id="name">
                    <FormLabel fontWeight="light" fontSize="md">
                        Name
                    </FormLabel>
                    <ShadowInput type="input" name="name" ref={register} />
                </FormControl>
                <FormControl id="ph_num">
                    <FormLabel fontWeight="light" fontSize="md">
                        Phone Number
                    </FormLabel>
                    <ShadowInput type="input" name="ph_num" ref={register} />
                </FormControl>
                <FormControl id="email">
                    <FormLabel fontWeight="light" fontSize="md">
                        Email
                    </FormLabel>
                    <ShadowInput type="input" name="email" ref={register} />
                </FormControl>
                <FormControl id="addr">
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
                        Update
                    </Submitbutton>
                    <Viewbutton
                        borderRadius="lg"
                        style={{ textAlign: 'center' }}
                        size="lg"
                        width="25%"
                        onClick={()=>{showHistData(client_id,pass);onOpen();}}
                    >
                        History
                    </Viewbutton>
                    <Viewbutton
                        borderRadius="lg"
                        style={{ textAlign: 'center' }}
                        size="lg"
                        width="25%"
                        onClick={()=>{showDetails(client_id,pass);onOpen();}}
                    >
                        View Details
                    </Viewbutton>
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                        size="7xl"
                        isCentered
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Client Data</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Table mb="5">
                                    <Thead>
                                        <Tr>
                                            {props.map((p) => (
                                                <Th>{p['column_name']}</Th>
                                            ))}
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {data.map((d) => (
                                            <Tr key={d['client_id']}>
                                                {props.map((p) => (
                                                    <Td>
                                                        {d[p['column_name']]}
                                                    </Td>
                                                ))}
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                                <Button onClick={onClose} mb="2">
                                    Close
                                </Button>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Flex>
            </form>
        </Box>
    );
};

export default Client;
