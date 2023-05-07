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
import { signUp } from '../utils/fetchApi';

export default function SignUpCard() {
    const [showPassword, setShowPassword] = useState(false);

    const [data, setData] = useState({ firstname: "", lastname: "", email: "", password: "", access: "user" })
    const handleChange = (e) => {
        const name = e?.target?.name;
        const value = e?.target?.value;
        setData({ ...data, [name]: value })

    }

    const handleSumbit = async () => {
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
                                    <Input type="text" name="firstname" onChange={handleChange} placeholder="First Name" />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName">
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type="text" name="lastname" onChange={handleChange} placeholder="Last Name" />
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
                                <Input type={showPassword ? 'text' : 'password'} name="password" onChange={handleChange} placeholder="Create Password" />
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
                                loadingText="Submitting"
                                size="lg"
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
                                Already a user? <Link href="/login" passHref color={'blue.400'}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}