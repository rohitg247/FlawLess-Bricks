import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    IconButton,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsFacebook, BsGoogle, BsInstagram } from 'react-icons/bs';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { apiUrl, signUp } from '../utils/fetchApi';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { getErrorMsg, loginUser } from 'api-helper/model/controller/login-controller';
// import SignUp from 'api-helper/model/signUpData';

export default function SignUpCard() {
    const [showPassword, setShowPassword] = useState(false);

    const [validationErrors, setValidationErrors] = useState([]);
    const [submitError, setSubmitError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    const [data, setData] = useState({ firstname: "", lastname: "", email: "", password: "", access: "user" })
    const handleChange = (e) => {
        const name = e?.target?.name;
        const value = e?.target?.value;
        setData({ ...data, [name]: value })

    }

    const validateData = () => {
        const err = []

        if (data.firstname?.length < 2) {
            err.push({ firstname: "First name must be atleast 2 characters long" })
        }
        else if (data.firstname?.length > 10) {
            err.push({ firstname: "Full name should be less than 10 characters" })
        }
        if (data.lastname?.length < 2) {
            err.push({ lastname: "Last name must be atleast 2 characters long" })
        }
        else if (data.firstname?.length > 10) {
            err.push({ lastname: "Last name should be less than 10 characters" })
        }
        else if (data.password?.length < 6) {
            err.push({ password: "Password should be atleast 6 characters long" })
        }
        // else if (data.password !== data.confirmPassword) {
        //     err.push({ confirmPassword: "Passwords don't match" })
        // }

        setValidationErrors(err)

        if (err.length > 0) {
            return false
        }
        else {
            return true
        }
    }


    const callbackUrl = (router.query?.callbackUrl) ?? "/";


    const handleSumbit = async () => {

        const isVaild = validateData()

        if (isVaild) {
            //sign up

            try {
                setLoading(true)
                const apiRes = await axios.post((`${apiUrl}/auth/signup`), data)

                if (apiRes?.data?.success) {
                    // save data in session using next auth

                    const LoginRes = await loginUser({
                        email: data.email,
                        password: data.password,
                        first: data.firstname
                        // redirect: false
                    })

                    if (LoginRes && !LoginRes.ok) {
                        setSubmitError(LoginRes.error || "")
                    }
                    else {
                        router.push(callbackUrl)
                    }
                }
            } catch (error) {
                if (typeof error === 'object' && error !== null && error.response) {
                    const errorMsg = error.response?.data?.error;
                    if (errorMsg) {
                        setSubmitError(errorMsg);
                    }
                } else {
                    setSubmitError("An error occurred while submitting the form.");
                }

            }



            setLoading(false)
        }

        const signupdata = await signUp(
            {
                "firstname": data.firstname,
                "lastname": data.lastname,
                "email": data.email,
                "password": data.password,
                "access": "user",
            }
        )
            .then(() => alert("Success")).catch(err => alert(err))
        console.log(signupdata)
        router.push(callbackUrl);
    }

    return (
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

                <Stack
                    spacing={{ base: 4 }}
                    direction={{ base: 'column' }}>
                    <Stack
                        align="center"
                        justify="center"
                        spacing={16}
                        direction={{ base: 'row' }}>

                        <Link href="#">
                            <IconButton
                                aria-label="google"
                                variant="ghost"
                                size="lg"
                                fontSize="3xl"
                                icon={<BsGoogle />}
                                _hover={{
                                    bg: 'blue.500',
                                    color: useColorModeValue('white', 'gray.700'),
                                }}
                                isRound
                            />
                        </Link>

                        <Link href="https://www.instagram.com/">
                            <IconButton
                                aria-label="instagram"
                                variant="ghost"
                                size="lg"
                                icon={<BsInstagram size="28px" />}
                                _hover={{
                                    bg: 'blue.500',
                                    color: useColorModeValue('white', 'gray.700'),
                                }}
                                isRound
                            />
                        </Link>

                        <Link href="https://www.facebook.com/">
                            <IconButton
                                aria-label="facebook"
                                variant="ghost"
                                size="lg"
                                icon={<BsFacebook size="28px" />}
                                _hover={{
                                    bg: 'blue.500',
                                    color: useColorModeValue('white', 'gray.700'),
                                }}
                                isRound
                            />
                        </Link>
                    </Stack>
                </Stack>

                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type="text" name="firstname" onChange={handleChange} placeholder="First Name"
                                        error={getErrorMsg("firstname", validationErrors)} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName">
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type="text" name="lastname" onChange={handleChange} placeholder="Last Name"
                                        error={getErrorMsg("lastname", validationErrors)} />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" name="email" onChange={handleChange} placeholder="Create Email" />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} name="password" onChange={handleChange} placeholder="Create Password"
                                    error={getErrorMsg("password", validationErrors)} />
                                <InputRightElement h={'full'}>
                                    <Button padding={0}
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button onClick={handleSumbit}
                                disabled={loading}
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                {/* <Link href={`/login?callbackUrl=${"/"}`}>
                                    <a> */}
                                Sign up
                                {/* </a>
                                </Link> */}
                            </Button>
                            {
                                submitError &&
                                <div style={{
                                    fontSize: "0.8rem",
                                    color: "#fa4343",
                                    margin: "0.5rem 0",
                                }}>
                                    {submitError}
                                </div>

                            }
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link href="/" passHref color={'blue.400'}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}


// export const ErrorText = styled.p`

// `

               // if (error instanceof AxiosError) {
                //     const errorMsg = error.response?.data?.error;
                //     if (errorMsg) {
                //         setSubmitError(errorMsg);
                //     } else {
                //         setSubmitError("An error occurred while submitting the form.");
                //     }
                // } else {
                //     setSubmitError("An unexpected error occurred.");
                // }