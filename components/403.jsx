import { Box, Flex, Heading, Text, Button, Link } from "@chakra-ui/react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Custom403 = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    console.log(session)

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/")
        }
    }, [session, status])

    return (
        <Flex height="100vh" align="center" justify="center">
            <Box p={8} maxW="md" borderWidth={1} borderRadius="lg" boxShadow="lg">
                <Heading as="h1" size="2xl" color="red.500" textAlign="center" mt={8}>
                    403 - Unauthorized
                </Heading>
                <Text fontSize="xl" textAlign="center" my={6}>
                    Oops! You do not have permission to access this page.
                </Text>
                <Flex justify="center">
                    <Button
                        colorScheme="blue"
                        as={Link}
                        href="/"
                        size="lg"
                        fontWeight="bold"
                        _hover={{ textDecoration: "none" }}
                    >
                        Go to Login
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
};

export default Custom403;
