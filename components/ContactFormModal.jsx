import {
    ChakraProvider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    ModalFooter,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import * as React from "react";
import ContactForm from "./ContactForm";

function ContactFormModal(isOpen, onClose) {

    return (
        <>
            {/* <Button onClick={onOpen}>Open</Button> */}
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
    );
}

export default ContactFormModal