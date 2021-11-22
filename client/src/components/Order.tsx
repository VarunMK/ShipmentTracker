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

interface IForm {
    client_id: String,
    password:String,
    sender:String,
    fragile: Boolean,
    reciever: String,
    rec_add:String,
}

const Client = () => {
    //const { isOpen, onOpen, onClose } = useDisclosure();
    // const [data, setData] = useState([]);
    // const [client_id,setClient_id]=useState("");
    // const [pass,setPassword]=useState("");
    //const [props, setProps] = useState([]);
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
                        description: 'Error Placing Order!',
                        status: 'error',
                        isClosable: true,
                    });
                } else if (data.status === 200) {
                    toast({
                        duration: 2000,
                        description: 'Successfully Placed Order!',
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
                Place Orders
            </Text>
            <br />
            <Divider />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="client_id" isRequired>
                    <FormLabel fontWeight="light" fontSize="md">
                        Client_ID
                    </FormLabel>
                    <ShadowInput type="input" name="client_id" ref={register} />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel fontWeight="light" fontSize="md">
                        Password
                    </FormLabel>
                    <ShadowInput type="input" name="password" ref={register}/>
                </FormControl>
                {/* <FormControl id="prod_id">
                    <FormLabel fontWeight="light" fontSize="md">
                        Prod ID
                    </FormLabel>
                    <ShadowInput type="input" name="prod_id" ref={register} />
                </FormControl> */}
                <FormControl id="sender">
                    <FormLabel fontWeight="light" fontSize="md">
                        Sender
                    </FormLabel>
                    <ShadowInput type="input" name="sender" ref={register} />
                </FormControl>
                <FormControl id="fragile">
                    <FormLabel fontWeight="light" fontSize="md">
                        Fragile?
                    </FormLabel>
                    <ShadowInput type="input" name="fragile" ref={register} />
                </FormControl>
                <FormControl id="reciever">
                    <FormLabel fontWeight="light" fontSize="md">
                        Reciever
                    </FormLabel>
                    <ShadowInput type="input" name="reciever" ref={register} />
                </FormControl>
                <FormControl id="rec_add">
                    <FormLabel fontWeight="light" fontSize="md">
                        Reciever Address
                    </FormLabel>
                    <ShadowInput type="input" name="rec_add" ref={register} />
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
{/*                     
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
                    </Modal> */}
                </Flex>
            </form>
        </Box>
    );
};

export default Client;
