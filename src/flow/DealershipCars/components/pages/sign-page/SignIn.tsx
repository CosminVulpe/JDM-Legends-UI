import React, {useState} from "react";

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import {Customer} from "../../Service/dto/Interfaces";
import {ApiGetSignedCustomerName, ApiPostSignCustomer} from "../../Service/api-requests/ApiRequests";
import {successfulNotification, warningNotification} from "../../Service/toastify-notification/ToastifyNotification";

const SignIn: React.FC = () => {
    const [customerInfo, setCustomerInfo] = useState<Customer>({
        emailAddress: "",
        pwd: "",
    });

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerInfo(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    };

    const signIn = () => {
        ApiGetSignedCustomerName(customerInfo)
            .then((res:any) => {
                successfulNotification("Sign in successful");
            })
            .catch(() => warningNotification("Bad credentials"));
    }

    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email"
                                       name={"emailAddress"}
                                       onChange={handleOnChange}
                                       value={customerInfo.emailAddress}/>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password"
                                       name={"pwd"}
                                       onChange={handleOnChange}
                                       value={customerInfo.pwd}/>
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{base: 'column', sm: 'row'}}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Text color={'blue.400'}>Forgot password?</Text>
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={signIn}
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    )

}
export default SignIn;