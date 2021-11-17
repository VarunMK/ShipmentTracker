import React, {  useState } from 'react';
import {
    Box,
    FormControl,
    Text,
    FormLabel,
    Divider,
    Flex,
    useToast,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ShadowInput } from './ShadowInput';
import Submitbutton from './SubmitButton';
import Viewbutton from './ViewButton';

interface IForm {
    table_name: String;
    values: String;
}

const DBA = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [props,setProps]=useState([]);
    const [data, setData] = useState([]);
    const { register, handleSubmit } = useForm();
    const toast = useToast();
    const onSubmit = async (formData: IForm) => {
        if (formData.values.length !==0) {
            try {
                await fetch('http://localhost:5000/add_data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                }).then((data) => {
                    if (data.status === 201) {
                        toast({
                            duration: 2000,
                            description: 'ID already exists!',
                            status: 'error',
                            isClosable: true,
                        });
                    } else if (data.status === 200) {
                        toast({
                            duration: 2000,
                            description: 'Successfully Added!',
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
            } catch (err) {
                console.log('Error');
            }
        } else {
            try {
                const resp2=await fetch('http://localhost:5000/getcolname',{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(formData),
                });
                const resp=await fetch('http://localhost:5000/getdata', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                console.log(resp);
                const jsonData=await resp.json()
                const jsonData2=await resp2.json()
                setProps(jsonData2)
                setData(jsonData)
                onOpen();
            } catch (err) {
                console.log('Error');
            }
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
                Add Details
            </Text>
            <br />
            <Divider />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="table_name" isRequired>
                    <FormLabel fontWeight="light" fontSize="md">
                        Table
                    </FormLabel>
                    <ShadowInput
                        type="input"
                        name="table_name"
                        ref={register}
                    />
                </FormControl>
                <FormControl id="Values">
                    <FormLabel fontWeight="light" fontSize="md">
                        Values
                    </FormLabel>
                    <ShadowInput type="input" name="values" ref={register} />
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
                        type="submit"
                        borderRadius="lg"
                        style={{ textAlign: 'center' }}
                        size="lg"
                        width="25%"
                    >
                        View Data
                    </Viewbutton>
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                        size="2xl"
                        isCentered
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Client Data</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Table>
                                    <Thead>
                                        <Tr>
                                        {props.map((p)=>(
                                            <Th>{p['column_name']}</Th>
                                        ))}
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {data.map((d) => (
                                            <Tr key={d['client_id']}>
                                            {props.map((p)=>(
                                                    <Td>{d[p['column_name']]}</Td>
                                            ))}
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Flex>
            </form>
        </Box>
    );
};

export default DBA;
