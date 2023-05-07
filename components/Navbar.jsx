import Link from 'next/link';
import {
  Menu, MenuButton, MenuList, MenuItem, IconButton, Button, Flex, Box, Spacer, useDisclosure, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody, ModalFooter
} from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout, FcContacts } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import ContactFormModal from './ContactFormModal';
import ContactForm from "./ContactForm";

const Navbar = () => {

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex p='2' borderBottom='1px' borderColor='gray.100'>
      <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
        <Link href='/' paddingLeft='2'>Flawless Bricks</Link>
      </Box>
      <Spacer />
      <Box>
        <Menu>
          <MenuButton as={IconButton} icon={<FcMenu />} variant='outline' color='red.400' />
          <MenuList>
            <Link href='/' passHref>
              <MenuItem icon={<FcHome />}>Home</MenuItem>
            </Link>
            <Link href='/search' passHref>
              <MenuItem icon={<BsSearch />}>Search</MenuItem>
            </Link>
            <Link href='/search?purpose=for-sale' passHref>
              <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
            </Link>
            <Link href='/search?purpose=for-rent' passHref>
              <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
            </Link>
            <Button width={"100%"} padding={"0px"} variant='outlined' onClick={onOpen}>
              <MenuItem icon={<FcContacts />}>Contact Us</MenuItem>
            </Button>
          </MenuList>
        </Menu>
      </Box>
      <>
        <Modal size="xl" isOpen={isOpen} onClose={onClose}>
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
    </Flex>
  );
}

export default Navbar;
