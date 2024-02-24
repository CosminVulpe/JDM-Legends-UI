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
import React, {useEffect, useState} from 'react'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {Customer, ReviewInterface} from "../../Service/dto/Interfaces";
import {
    ApiPostCustomerValidateEmail,
    ApiPostRegisterCustomer,
} from "../../Service/api-requests/ApiRequests";
import {successfulNotification, warningNotification} from "../../Service/toastify-notification/ToastifyNotification";
import {ToastContainer} from "react-toastify";
import {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";
import {REGEX_VALID_EMAIL_ADDRESS} from "../../PopUp/PopUp";
import AlertNotification from "../../AlertNotification/AlerNotification";
import {useFormik} from "formik";


const domains = [
    ".com",
    ".org",
    ".net",
    ".edu",
    ".gov",
    ".mil",
    ".info",
    ".biz",
    ".co.uk",
    ".ca",
    ".de"
];

const Authentication: React.FC = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [isEmailAlreadyExisting, setIsEmailAlreadyExisting] = useState(false);

    const formik = useFormik<Customer>({
        initialValues: {
            fullName: "",
            userName: "",
            emailAddress: "",
            pwd: "",
            phoneNumber: ""
        },
        onSubmit: () => undefined
    })

    useEffect(() => {
        if (formik.values.emailAddress !== "" &&
            domains.some(domain => formik.values.emailAddress.endsWith(domain))) {

            ApiPostCustomerValidateEmail(formik.values.emailAddress)
                .then((res: any) => setIsEmailAlreadyExisting(res.data))
                .catch((err) => console.error(err))
        }
    }, [formik.values.emailAddress]);

    const cleanFields = (): void => {
        formik.resetForm();
        formik.setTouched({});
    }

    const saveCustomerInfo = () => {
        ApiPostRegisterCustomer(formik.values)
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

    const computeErrorEmail = () => {
        if (isEmailAlreadyExisting) {
            return <AlertNotification
                alertType={"error"}
                textAlert={"Email Address already exists"}
            />
        }

        if ((formik.values.emailAddress !== "") && domains.some(domain => formik.values.emailAddress.endsWith(domain))) {
            if (!REGEX_VALID_EMAIL_ADDRESS.test(formik.values.emailAddress)) {
                return <AlertNotification
                    alertType={"error"}
                    textAlert={"Email Address not valid"}
                />
            }
        }
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
                        {/*<Form onSubmit={formik.handleSubmit}>*/}
                        <Stack spacing={4}>

                            <Box>
                                <FormControl id="fullName" isRequired>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input type="text"
                                           name={"fullName"}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}
                                           value={formik.values.fullName}/>
                                </FormControl>
                            </Box>

                            <FormControl id="emailAddress" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email"
                                       name={"emailAddress"}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.emailAddress}/>
                                {formik.touched.emailAddress && computeErrorEmail()}
                            </FormControl>

                            <FormControl id="userName" isRequired>
                                <FormLabel>User Name</FormLabel>
                                <Input type="text"
                                       name={"userName"}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.userName}/>
                            </FormControl>

                            <FormControl id="phoneNumber" isRequired>
                                <FormLabel>Phone Number</FormLabel>
                                <Input type="number"
                                       name={"phoneNumber"}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.phoneNumber}/>
                            </FormControl>

                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'}
                                           name={"pwd"}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}
                                           value={formik.values.pwd}/>
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
                                <Text align={'center'} onClick={() => navigate("/sign")}>
                                    Already a user? <Link color={'blue.400'}>Login</Link>
                                </Text>

                                <Text align={'center'} onClick={() => navigate("/")}>
                                    <Link color={'blue.400'}> Go to main page</Link>
                                </Text>
                            </Stack>
                        </Stack>
                        {/*</Form>*/}
                    </Box>
                </Stack>
            </Flex>
        </>
    )
}

export default Authentication;