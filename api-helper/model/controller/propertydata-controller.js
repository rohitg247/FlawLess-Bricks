import Property from '../propertyModel';

// Example route handler
async function createProperty(req, res) {
    try {
        const propertyData = req.body; // Assuming form data is sent in the request body
        const property = new Property({ ...propertyData });
        await property.save();
        res.status(201).json({ message: 'Property created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default createProperty;
