import { useState } from 'react';
import propertyModel from 'api-helper/model/propertyModel';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Checkbox,
    Button,
    VStack,
    ChakraProvider,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import axios from 'axios';
export default function PropertyForm() {
    const [propertyData, setPropertyData] = useState({
        price: '',
        rentFrequency: '',
        rooms: '',
        title: '',
        baths: '',
        area: '',
        agency: '',
        isVerified: false,
        description: '',
        type: '',
        purpose: '',
        furnishingStatus: '',
        amenities: [],
        photos: [],
    });

    const rentFrequencyOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
    const roomsOptions = Array.from({ length: 10 }, (_, i) => i + 1);
    const bathsOptions = Array.from({ length: 5 }, (_, i) => i + 1);

    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setPropertyData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setPropertyData((prevData) => ({
            ...prevData,
            photos: files,
        }));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setPropertyData((prevData) => ({
            ...prevData,
            photos: files,
        }));
    };

    const removePhoto = (index) => {
        setPropertyData((prevData) => {
            const updatedPhotos = [...prevData.photos];
            updatedPhotos.splice(index, 1);
            return {
                ...prevData,
                photos: updatedPhotos,
            };
        });
    };

    const handleRentFrequencyChange = (e) => {
        setPropertyData((prevData) => ({
            ...prevData,
            rentFrequency: e.target.value,
        }));
    };

    const handleRoomsChange = (e) => {
        setPropertyData((prevData) => ({
            ...prevData,
            rooms: e.target.value,
        }));
    };

    const handleBathsChange = (e) => {
        setPropertyData((prevData) => ({
            ...prevData,
            baths: e.target.value,
        }));
    };

    const openImageModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/property', propertyData)
            if (res.data.message) {
                setPropertyData({
                    price: '',
                    rentFrequency: '',
                    rooms: '',
                    title: '',
                    baths: '',
                    area: '',
                    agency: '',
                    isVerified: false,
                    description: '',
                    type: '',
                    purpose: '',
                    furnishingStatus: '',
                    amenities: [],
                    photos: [],
                });
            }
            else {
                alert("cannot register")
            }
            // const res

            // Clear the form fields


            // Display a success message or redirect to another page
            console.log(propertyData);
        } catch (error) {
            // Handle any error that occurs during the save operation
            console.error('Error saving property:', error);
        }
    };

    return (
        <ChakraProvider>
            <Box p={4}>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="start">
                        <FormControl id="price">
                            <FormLabel>Price</FormLabel>
                            <Input
                                name="price"
                                value={propertyData.price}
                                onChange={handleChange}
                                type="number"
                                placeholder="Enter price"
                            />
                        </FormControl>
                        <FormControl id="rentFrequency">
                            <FormLabel>Rent Frequency</FormLabel>
                            <Select value={propertyData.rentFrequency} onChange={handleRentFrequencyChange}>
                                <option value="">Select Rent Frequency</option>
                                {rentFrequencyOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl id="rooms">
                            <FormLabel>Rooms</FormLabel>
                            <Select value={propertyData.rooms} onChange={handleRoomsChange}>
                                <option value="">Select Number of Rooms</option>
                                {roomsOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl id="title">
                            <FormLabel>Title</FormLabel>
                            <Input
                                name="title"
                                value={propertyData.title}
                                onChange={handleChange}
                                placeholder="Enter title"
                            />
                        </FormControl>
                        <FormControl id="baths">
                            <FormLabel>Baths</FormLabel>
                            <Select value={propertyData.baths} onChange={handleBathsChange}>
                                <option value="">Select Number of Baths</option>
                                {bathsOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl id="area">
                            <FormLabel>Area</FormLabel>
                            <Input
                                name="area"
                                value={propertyData.area}
                                onChange={handleChange}
                                placeholder="Enter area"
                            />
                        </FormControl>
                        <FormControl id="agency">
                            <FormLabel>Agency</FormLabel>
                            <Input
                                name="agency"
                                value={propertyData.agency}
                                onChange={handleChange}
                                placeholder="Enter agency"
                            />
                        </FormControl>
                        <FormControl id="isVerified">
                            <Checkbox
                                name="isVerified"
                                isChecked={propertyData.isVerified}
                                onChange={handleChange}
                            >
                                Verified
                            </Checkbox>
                        </FormControl>
                        <FormControl id="description">
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                name="description"
                                value={propertyData.description}
                                onChange={handleChange}
                                placeholder="Enter description"
                            />
                        </FormControl>
                        <FormControl id="type">
                            <FormLabel>Type</FormLabel>
                            <Select
                                name="type"
                                value={propertyData.type}
                                onChange={handleChange}
                            >
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="villa">Villa</option>
                            </Select>
                        </FormControl>
                        <FormControl id="purpose">
                            <FormLabel>Purpose</FormLabel>
                            <Select
                                name="purpose"
                                value={propertyData.purpose}
                                onChange={handleChange}
                            >
                                <option value="rent">Rent</option>
                                <option value="sale">Sale</option>
                            </Select>
                        </FormControl>
                        <FormControl id="furnishingStatus">
                            <FormLabel>Furnishing Status</FormLabel>
                            <Select
                                name="furnishingStatus"
                                value={propertyData.furnishingStatus}
                                onChange={handleChange}
                            >
                                <option value="furnished">Furnished</option>
                                <option value="semi-furnished">Semi-furnished</option>
                                <option value="unfurnished">Unfurnished</option>
                            </Select>
                        </FormControl>
                        <FormControl id="amenities">
                            <FormLabel>Amenities</FormLabel>
                            <Input
                                name="amenities"
                                value={propertyData.amenities}
                                onChange={handleChange}
                                placeholder="Enter amenities"
                            />
                        </FormControl>
                        <FormControl id="photos">
                            <FormLabel>Photos</FormLabel>
                            <Box
                                p={2}
                                borderWidth={2}
                                borderStyle="dashed"
                                borderRadius="md"
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <Input
                                    name="photos"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    display="none"
                                    onChange={handleFileChange}
                                />
                                <Button as="label" htmlFor="photos" colorScheme="blue" mb={2}>
                                    Upload Photos
                                </Button>
                                <Box>
                                    {propertyData.photos.map((file, index) => (
                                        <Box
                                            key={index}
                                            p={2}
                                            borderWidth={1}
                                            borderRadius="md"
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            onClick={() => openImageModal(URL.createObjectURL(file))}
                                            cursor="pointer"
                                        >
                                            <span>{file.name}</span>
                                            <Button
                                                size="sm"
                                                colorScheme="red"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removePhoto(index);
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </FormControl>
                        <Button type="submit" colorScheme="blue">
                            Submit
                        </Button>
                    </VStack>
                </form>
                {selectedImage && (
                    <Modal isOpen={isModalOpen} onClose={closeImageModal} size="xl">
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Selected Image</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Image src={selectedImage} alt="Selected Image" />
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                )}
            </Box>
        </ChakraProvider>
    );
}