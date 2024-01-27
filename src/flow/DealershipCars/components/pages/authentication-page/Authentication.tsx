import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react'
import React, {useState} from 'react'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {Customer} from "../../Service/dto/Interfaces";
import {ApiPostRegisterCustomer} from "../../Service/api-requests/ApiRequests";
import {successfulNotification, warningNotification} from "../../Service/toastify-notification/ToastifyNotification";
import {ToastContainer} from "react-toastify";
import {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";

const Authentication: React.FC = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [customerInfo, setCustomerInfo] = useState<Customer>({
        fullName: "",
        userName: "",
        emailAddress: "",
        pwd: "",
        phoneNumber: ""
    });

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerInfo(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const cleanFields = (): void => {
        setCustomerInfo(() => ({
            fullName: "",
            userName: "",
            emailAddress: "",
            pwd: "",
            phoneNumber: ""
        }))
    }

    const saveCustomerInfo = () => {
        ApiPostRegisterCustomer(customerInfo)
            .then((res: AxiosResponse<any, any>) => {
                if (res.status === 201) {
                    successfulNotification("Sign up successfully");
                    cleanFields();
                }
            })
            .catch(err => warningNotification((err.status === 409) ?
                "Please use another email, user already in the database"
                : "Something went wrong while trying to sign up"));
    }

    return (
        <>
            <ToastContainer/>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool features ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={9}>
                        <Stack spacing={4}>
                            <Box>
                                <FormControl id="fullName" isRequired>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input type="text"
                                           name={"fullName"}
                                           onChange={handleOnChange}
                                           value={customerInfo.fullName}/>
                                </FormControl>
                            </Box>

                            <FormControl id="emailAddress" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email"
                                       name={"emailAddress"}
                                       onChange={handleOnChange}
                                       value={customerInfo.emailAddress}/>
                            </FormControl>

                            <FormControl id="userName" isRequired>
                                <FormLabel>User Name</FormLabel>
                                <Input type="text"
                                       name={"userName"}
                                       onChange={handleOnChange}
                                       value={customerInfo.userName}/>
                            </FormControl>

                            <FormControl id="phoneNumber" isRequired>
                                <FormLabel>Phone Number</FormLabel>
                                <Input type="number"
                                       name={"phoneNumber"}
                                       onChange={handleOnChange}
                                       value={customerInfo.phoneNumber}/>
                            </FormControl>

                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'}
                                           name={"pwd"}
                                           onChange={handleOnChange} value={customerInfo.pwd}/>
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    onClick={saveCustomerInfo}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link color={'blue.400'}>Login</Link>
                                </Text>

                                <Text align={'center'} onClick={() => navigate("/")}>
                                    <Link color={'blue.400'}> Go to main page</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    )
}

export default Authentication;