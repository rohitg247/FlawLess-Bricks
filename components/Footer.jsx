import { Box, Flex, Text, Link, Icon, useColorMode } from '@chakra-ui/react';
import { RiFacebookFill, RiTwitterFill, RiInstagramFill } from 'react-icons/ri';
import { BiBuilding } from 'react-icons/bi';

const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const footerBgColor = {
    light: 'gray.200',
    dark: 'gray.800',
  };

  const footerTextColor = {
    light: 'gray.800',
    dark: 'white',
  };

  const footerLinkColor = {
    light: 'blue.500',
    dark: 'blue.200',
  };

  return (
    <Box
      textAlign='center'
      p={5}
      borderTop='1px'
      borderColor='gray.100'
      bg={footerBgColor[colorMode]}
      color={footerTextColor[colorMode]}
    >
      <Flex justify="space-between" alignItems="center">
        <Text fontSize="lg" fontWeight="bold">
          <Icon as={BiBuilding} boxSize={6} mr={2} />
          FlawLess Bricks, Inc.
        </Text>
        <Flex>
          <Link href="#" mr={4}>
            <Icon as={RiFacebookFill} boxSize={6} />
          </Link>
          <Link href="#" mr={4}>
            <Icon as={RiTwitterFill} boxSize={6} />
          </Link>
          <Link href="#" mr={4}>
            <Icon as={RiInstagramFill} boxSize={6} />
          </Link>
        </Flex>
      </Flex>
      <Text fontSize="sm" mt={2}>
        &copy; 2023 Flawless Bricks. All rights reserved.
      </Text>
      <Flex justify="center" align="center" mt={2}>
        <Link
          href="/privacy-policy"
          fontSize="sm"
          color={footerLinkColor[colorMode]}
          _hover={{ color: footerLinkColor[colorMode] }}
          mx={2}
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms-of-service"
          fontSize="sm"
          color={footerLinkColor[colorMode]}
          _hover={{ color: footerLinkColor[colorMode] }}
          mx={2}
        >
          Terms of Service
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;
