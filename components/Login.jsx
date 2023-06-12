import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    IconButton,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsFacebook, BsGoogle, BsInstagram } from 'react-icons/bs';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { getSession, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import { route } from 'next/dist/server/router';
import { toast } from 'react-toastify';



export default function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [submitError, setSubmitError] = useState("")

    const router = useRouter();
    const { data: newsession } = useSession()

    const [data, setData] = useState({ email: "", password: "" })
    const handleChange = (e) => {
        const name = e?.target?.name;
        const value = e?.target?.value;
        setData({ ...data, [name]: value })

    }

    const callbackUrl = (router.query?.callbackUrl) ?? "/home";

    const handleSumbit = async (event) => {

        event.preventDefault()


        // try {
        //     setLoading(true)

        //     const loginRes = await loginUser({ email, password })

        //     if (loginRes && !loginRes.ok) {
        //         setSubmitError(loginRes.error || "")
        //     }
        //     else {
        //         router.push(callbackUrl)
        //     }
        // } catch (error) {
        //     if (error.response) {
        //         const errorMsg = error.response.data?.error;
        //         setSubmitError(errorMsg);
        //     }
        // }

        // setLoading(false)
        const signindata = await signIn(
            "credentials", {
            email: data.email,
            password: data.password,
            callbackUrl: callbackUrl ?? "/",
            redirect: false,
        }
        )
        console.log(signindata)
        if (signindata.error) {
            toast.error("Something went wrong")

        }
        else {
            toast.success("You're Logged In")
            router.push("/home")

        }
        // .then(() => router.push(callbackUrl), alert("Success")).catch(err => alert(err))
    }

    useEffect(() => {
        const keyDownHandler = event => {
            console.log('User pressed: ', event.key);

            if (event.key === 'Enter') {
                event?.preventDefault();

                // 👇️ call submit function here
                handleSumbit(event);
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);


    console.log(newsession)
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        To Access all our <Link color={'blue.400'}>Content</Link> ✌️
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

                        <Link href="https://accounts.google.com/v3/signin/identifier?dsh=S-1811757469%3A1686557780393990&elo=1&ffgf=1&ifkv=Af_xneG98UMbUw-LreCVzI_qY2hI7GtCLJDJjEJjqUf0qh1oCO2LzMya0WHA5O7iD6S4MUnmO7lmyQ&flowName=GlifWebSignIn&flowEntry=ServiceLogin">
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


                {/* <p className="text-gray-400 my-3">or use your email account</p> */}

                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input name="email" onChange={handleChange} type="email" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input name="password" onChange={handleChange} type={showPassword ? 'text' : 'password'} />
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
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                                onClick={(e) => handleSumbit(e)}
                                disabled={loading}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
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
                                Not yet Registered? <Link href="/signup" passHref color={'blue.400'}>SignUp</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
