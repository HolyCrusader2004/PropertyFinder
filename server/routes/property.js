const router = require('express').Router()
const multer = require('multer')

const Property = require('../models/property')
const User = require('../models/user')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/propertyPictures/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

router.post('/create', upload.array('propertyImages'), async (req, res) => {
    //console.log(req.body)
    try{
        const {userEmail, category, type, streetAddress, typeOfPlace, city,
             province, country, rooms, guests, bathrooms, beds, amenities, 
             title, description, highlight, highlightDesc, price} = req.body

        const propertyImages = req.files
        console.log(propertyImages)
        if(!propertyImages){
            return res.status(400).json({message:"No file uploaded"})
        }
        const imagePaths = propertyImages.map((image) => image.path)

        if(userEmail.length < 1 || category.length < 1 || type.length < 1 || streetAddress.length < 1 || typeOfPlace.length < 1 || city.length < 1 
            || province.length < 1 || country.length < 1 || rooms < 1 || guests < 1 || bathrooms < 1 || beds < 1 || !amenities || title.length < 1
            || description.length < 1 || highlight.length < 1 || highlightDesc.length < 1 || price === 0 ){
            return res.status(400).json({message: 'Invalid information provided, check all the fields again'})
        }

        const newProperty = new Property({
            userEmail,
            category,
            type,
            streetAddress,
            typeOfPlace,
            city,
            province,
            country,
            rooms,
            guests,
            bathrooms,
            beds,
            amenities,
            imagePaths: imagePaths,
            title,
            description,
            highlight,
            highlightDesc,
            price
        }) 
        const user = await User.findOne({email: userEmail})
        user.propertyList.push({propertyId: newProperty._id})

        await user.save()
        await newProperty.save()
        console.log('success')
        res.status(200).json({message: 'Property saved successfully', property: newProperty})
    }catch(err){
        console.log(err.message)
        res.status(400).json({message:'property registration failed', error: err.message})
    }
})

router.get('/getProperties', async (req, res) => {
    const categories = req.query.categories; 
    //console.log(categories);

    const categoryList = categories ? categories.split(',') : []; 
    //console.log(categoryList); 

    try {
        let properties = [];
        if (!categoryList.includes('All')) {
            properties = await Property.find({ category: { $in: categoryList } });
        } else {
            properties = await Property.find();
        }
        res.status(200).json({ message: 'Properties retrieved successfully', properties: properties });
    } catch (err) {
        res.status(400).json({ message: 'Properties acquisition failed', error: err.message });
    }
});

router.get('/:propertyId', async (req, res) => {
    const propertyId = req.params.propertyId
    //console.log(propertyId)
    try {
        const property = await Property.findById(propertyId)
        res.status(200).json({ message: 'Details retrieved successfully', property: property });
    } catch (err) {
        res.status(400).json({ message: 'Property acquisition failed', error: err.message });
    }    
})

router.get('/propertyList/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail

    try{
        let properties = []
        properties = await Property.find({userEmail:userEmail})
        res.status(200).json({ message: 'User properties retrieved successfully', properties: properties });
    } catch (err) {
        res.status(400).json({ message: 'User properties acquisition failed', error: err.message });
    }
})

router.get('/search/:searchParam', async (req, res) => {
    const searchParam = req.params.searchParam
    try {
        let properties = []
        properties = await Property.find({
            $or:[{
                category: {$regex: searchParam, $options: 'i'}
            },
            {
                title: {$regex: searchParam, $options: 'i'}
            },
            {
                type: {$regex: searchParam, $options: 'i'}
            },
            {
                description: {$regex: searchParam, $options: 'i'}
            },
            {
                city: {$regex: searchParam, $options: 'i'}
            }]
        })
        res.status(200).json({ message: 'Properties retrieved successfully', properties: properties });
    } catch (err) {
        res.status(400).json({ message: 'Properties acquisition failed', error: err.message });
    }   
})

router.delete('/deleteProperty/:propertyId', async (req, res) => {
    const propertyId = req.params.propertyId
    try {
        await User.updateMany({
            $or:[
                {"propertyList.propertyId": propertyId},
                { "wishList.propertyId": propertyId },
                { "reservationList.propertyId": propertyId },
                { "tripList.propertyId": propertyId }
            ]
        },{
            $pull:{
                propertyList: { propertyId: propertyId },
                wishList: { propertyId: propertyId },
                reservationList: { propertyId: propertyId },
                tripList: { propertyId: propertyId }
            }
        })
        await Property.deleteOne({_id: propertyId})
        res.status(200).json({ message: 'Property deleted successfully' })
    } catch (err) {
        res.status(400).json({ message: 'Property deletion failed', error: err.message })
    }
})

router.patch('/edit/:propertyId', upload.array('propertyImages'), async (req, res) => {
    
    try{
        const { category, type, streetAddress, typeOfPlace, city,
             province, country, rooms, guests, bathrooms, beds, amenities, 
             title, description, highlight, highlightDesc, price, prevImagesURLS} = req.body
        const propertyId = req.params.propertyId

        const propertyImages = req.files
      
        if(!propertyImages){
            return res.status(400).json({message:"No file uploaded"})
        }
        const imagePaths = propertyImages.map((image) => image.path)

        if(category.length < 1 || type.length < 1 || streetAddress.length < 1 || typeOfPlace.length < 1 || city.length < 1 
            || province.length < 1 || country.length < 1 || rooms < 1 || guests < 1 || bathrooms < 1 || beds < 1 || !amenities || title.length < 1
            || description.length < 1 || highlight.length < 1 || highlightDesc.length < 1 || price === 0 ){
            return res.status(400).json({message: 'Invalid information provided, check all the fields again'})
        }
        const property = await Property.findById(propertyId)
        
        property.category = category;
        property.type = type;
        property.streetAddress = streetAddress;
        property.typeOfPlace = typeOfPlace;
        property.city = city;
        property.province = province;
        property.country = country;
        property.rooms = rooms;
        property.guests = guests;
        property.bathrooms = bathrooms;
        property.beds = beds;
        property.amenities = amenities;
        property.title = title;
        property.description = description;
        property.highlight = highlight;
        property.highlightDesc = highlightDesc;
        property.price = price;
        property.imagePaths = [...imagePaths, ...prevImagesURLS.split(',')];

        await property.save()
        console.log('success')
        res.status(200).json({message: 'Property edited successfully'})
    }catch(err){
        console.log(err.message)
        res.status(400).json({message:'property registration failed', error: err.message})
    }
})


module.exports = router