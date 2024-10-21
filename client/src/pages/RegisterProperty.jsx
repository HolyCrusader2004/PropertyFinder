import { facilities } from "../assets/data"
import { useState } from "react"
import CategoryAndTypes from "../components/CategoryAndTypes"
import ExtraInfo from "../components/ExtraInfo"
import ImageInput from "../components/ImageInput"
import classes from './RegisterProperty.module.css'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom"
import { insertProperty } from "../util/mutations"
import { queryClient } from "../util/queries"

export default function RegisterPage() {
    const [images, setImages] = useState([]);
    const [imageURLS, setImageURLs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [amenities, setAmenities] = useState([])
    const [extraInfo, setExtraInfo] = useState({
        beds: 0,
        rooms: 0,
        bathrooms: 0,
        guests: 0
    })
    const userEmail = useSelector((state) => state.user.user?.email)
    const navigate = useNavigate()

    function handleUpload(event) {
        const files = Array.from(event.target.files);
        setImages((prevState) => [...prevState, ...files]);
        const newImageUrls = files.map((file) => URL.createObjectURL(file));
        setImageURLs((prevState) => [...prevState, ...newImageUrls]);
    }

    function handleDeleteURLS(deleteURL) {
        setImageURLs((prevState) => prevState.filter((url) => url !== deleteURL));
        setImages((prevState) => prevState.filter((image) => URL.createObjectURL(image) !== deleteURL));
    }

    function handleUpdateAmenities(amenity) {
        if (amenities.includes(amenity)) {
            setAmenities((prevState) => prevState.filter((object) => object !== amenity))
        } else {
            setAmenities((prevState) => [...prevState, amenity])
        }
    }
    function handleSelectCat(category) {
        setSelectedCategory(category)
    }

    function handleSelectType(type) {
        setSelectedType(type)
    }

    function handleUpdateInfo(field, value) {
        setExtraInfo({
            ...extraInfo,
            [field]: extraInfo[field] + value
        })
    }

    const { mutate, isError, error, isPending } = useMutation({
        mutationFn: insertProperty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['properties'] })
            navigate('..')
        }
    })

    function handleSubmit(event) {
        event.preventDefault()
        const fd = new FormData(event.target)
        const formData = Object.fromEntries(fd.entries())
        const propertyData = {
            ...formData,
            ...extraInfo,
            userEmail: userEmail,
            category: selectedCategory,
            type: selectedType,
            amenities: amenities,
            propertyImages: images,
        };
        mutate(propertyData)
        //console.log(propertyData)
    }

    return <>
        <div className={classes.container}>
            <h1>Register your property</h1>
            <form onSubmit={handleSubmit}>
                <div className={classes.container_step1}>
                    <h2>I - Fill information about your property</h2>
                    <hr />

                    <CategoryAndTypes selectedCategory={selectedCategory} selectedType={selectedType} handleSelectCat={handleSelectCat} handleSelectType={handleSelectType} />

                    <h3>Choose the property's location</h3>
                    <div className={classes.full}>
                        <div className={classes.location}>
                            <p>Street Address</p>
                            <input type="text" placeholder="Street Address" name="streetAddress" required />
                        </div>
                    </div>
                    <div className={classes.half}>
                        <div className={classes.location}>
                            <p>Apartment, House, etc. (If applicable)</p>
                            <input type="text" placeholder="Apartment, House, etc. (If applicable)" name="typeOfPlace" />
                        </div>
                        <div className={classes.location}>
                            <p>City</p>
                            <input type="text" placeholder="City" name="city" required />
                        </div>
                        <div className={classes.location}>
                            <p>Province</p>
                            <input type="text" placeholder="Province" name="province" required />
                        </div>
                        <div className={classes.location}>
                            <p>Country</p>
                            <input type="text" placeholder="Country" name="country" required />
                        </div>
                    </div>
                    <h3>Set basic information</h3>

                    <div className={classes.basics}>
                        <ExtraInfo title={'Guests'} handleUpdateInfo={handleUpdateInfo} extraInfo={extraInfo} />
                        <ExtraInfo title={'Rooms'} handleUpdateInfo={handleUpdateInfo} extraInfo={extraInfo} />
                        <ExtraInfo title={'Bathrooms'} handleUpdateInfo={handleUpdateInfo} extraInfo={extraInfo} />
                        <ExtraInfo title={'Beds'} handleUpdateInfo={handleUpdateInfo} extraInfo={extraInfo} />
                    </div>

                    <h2>II - Additional information</h2>
                    <hr />
                    <h3>Select additional facilities</h3>
                    <ul className={classes.facilities}>
                        {facilities.map((facility) => (
                            <li key={facility.name} className={amenities.includes(facility.name) ? classes.facility_selected : classes.facility} onClick={() => handleUpdateAmenities(facility.name)}>
                                <div className="facility_icon">{facility.icon}</div>
                                <p>{facility.name}</p>
                            </li>
                        ))}
                    </ul>

                    <ImageInput images={images} imageURLS={imageURLS} handleUpload={handleUpload} handleDelete={handleDeleteURLS} />

                    <h3>What makes your place stand out?</h3>
                    <div className={classes.description}>
                        <p>Title</p>
                        <input type="text" placeholder="Title" name="title" required />
                        <p>Description</p>
                        <textarea type="text" placeholder="Description" name="description" required />
                        <p>Highlight</p>
                        <input type="text" placeholder="Highlight" name="highlight" required />
                        <p>Highlight details</p>
                        <textarea type="text" placeholder="Highlight Details" name="highlightDesc" required />
                        <p>Set your price per night</p>
                        <span className={classes.description.price}>$</span>
                        <input type="number" placeholder="100" name="price" required />
                    </div>
                </div>
                {isError ? <p className={classes.error_message}>{`*${error.info?.message}*`}</p> : undefined}
                <motion.button whileHover={{ scale: 1.05 }} disabled={isPending}>{isPending ? "Submitting..." : 'Submit'}</motion.button>
            </form>
        </div>
    </>
}