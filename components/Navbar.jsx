import { ReactNode } from 'react';
import React, { useState } from 'react'

import Link from 'next/link';
import Nextlink from 'next/link';
import {
  Avatar, Center, MenuDivider,
  Menu, MenuButton, MenuList, MenuItem, IconButton, Button, Flex, Box, Spacer, useDisclosure, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody, ModalFooter,
  useColorMode, useColorModeValue, Stack, HStack
} from '@chakra-ui/react';
import { AiFillHeart, AiOutlineSetting } from 'react-icons/ai';
import { FcMenu, FcHome, FcAbout, FcContacts } from 'react-icons/fc';
import { BsSearch, BsMoonStarsFill, BsSun } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import { TbLogout } from 'react-icons/tb';
import { FaTimes, FaBars } from 'react-icons/fa';
import ContactForm from "./ContactForm";

// const Links = ['Dashboard', 'Projects', 'Team'];
const Links = [
  {
    name: "Search",
    route: "/search",
    icon: BsSearch
  },
  {
    name: "Buy Property",
    route: "/search?purpose=for-sale",
    icon: FcAbout
  },
  {
    name: "Sell Property",
    route: "/search?purpose=for-rent",
    icon: FiKey
  }
];

const NavLink = ({ children, route }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={route}>
    {children}
  </Link>
);

const Navbar = () => {

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [modal, setModal] = useState(false)

  const { colorMode, toggleColorMode } = useColorMode();

  const [click, setClick] = useState(false);
  const handleModalOpen = () => {
    setModal(true)
  }
  const handleModalClose = () => {
    setModal(false)
  }
  const handleClick = () => setClick(!click);


  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} p='2' borderBottom='1px' borderColor='gray.100'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <FaTimes /> : <FaBars />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
              <Link href='/' paddingLeft='2'>Flawless Bricks</Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.name} route={link.route}>
                  <a>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <link.icon style={{ marginRight: '8px' }} /> {link.name}
                    </div>
                  </a>
                </NavLink>
              ))}
              <Button
                padding={"0px"}
                variant='ghost'
                onClick={handleModalOpen}
                as="a"
                aria-label="Contact-Us"
                my={5}
              >
                <FcContacts mr={2} />Contact Us
              </Button>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={'https://avatars.dicebear.com/api/male/username.svg'}
                />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Center>
                  <Avatar
                    size={'2xl'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </Center>
                <br />
                <Center>
                  <p>Username</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem icon={<AiFillHeart />}>Your Wishlist</MenuItem>
                <MenuItem icon={<AiOutlineSetting />}>Account Settings</MenuItem>
                <MenuItem icon={<TbLogout />}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }} >
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} route={link.route}><Center style={{
                  cursor: "pointer",
                  display: "flex",
                }}>
                  <a>
                    <div>
                      <link.icon style={{ marginRight: '8px' }} /> {link.name}
                    </div>
                  </a>
                </Center></NavLink>
              ))}
              <Button
                padding={"0px"}
                variant='ghost'
                onClick={handleModalOpen}
                as="a"
                style={{
                  cursor: "pointer"
                }}
                aria-label="Contact-Us"
                my={5}
              >
                <FcContacts mr={2} />Contact Us
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box >
      <>
        <Modal size="xl" isOpen={modal} onClose={handleModalClose}>
          <ModalOverlay />
          <ModalContent maxW={"800px"}>
            <ModalHeader>
              <ModalCloseButton />
            </ModalHeader>

            <ModalBody>
              <ContactForm />
            </ModalBody>

            <ModalFooter />
          </ModalContent>
        </Modal>
      </>

    </>
  );
}

export default Navbar;