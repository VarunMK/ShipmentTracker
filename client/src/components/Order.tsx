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
    Prod_id: 'String';
    Partner_Id: 'String';
    fragile: 'Boolean';
    Reciever: 'String';
}

const Client = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState([]);
    const [client_id,setClient_id]=useState("");
    const [pass,setPassword]=useState("");
    const [props, setProps] = useState([]);
    const { register, handleSubmit } = useForm();
    const toast = useToast();

    const onSubmit = async (formData: IForm) => {
        try {
            await fetch('http://localhost:5000/update_order', {
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
                Add order(Confirm password again)
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
                        Prod ID
                    </FormLabel>
                    <ShadowInput type="input" name="name" ref={register} />
                </FormControl>
                <FormControl id="ph_num">
                    <FormLabel fontWeight="light" fontSize="md">
                        Partner_Id
                    </FormLabel>
                    <ShadowInput type="input" name="ph_num" ref={register} />
                </FormControl>
                <FormControl id="email">
                    <FormLabel fontWeight="light" fontSize="md">
                        Fragile?
                    </FormLabel>
                    <ShadowInput type="input" name="email" ref={register} />
                </FormControl>
                <FormControl id="addr">
                    <FormLabel fontWeight="light" fontSize="md">
                        Reciever
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
                        Place Order
                    </Submitbutton>
                    
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
