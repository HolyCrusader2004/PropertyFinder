import { useEffect, useState } from "react"
import classes from './HeaderDecoration.module.css'
import image1 from '../assets/image-carousel/image1.jpg'
import image2 from '../assets/image-carousel/image2.jpg'
import image3 from '../assets/image-carousel/image3.jpg'
import image4 from '../assets/image-carousel/image4.jpg'
import image5 from '../assets/image-carousel/image5.jpg'

const images = [{
    image: image1, alt: 'image_carousel'
}, {
    image: image2, alt: 'image_carousel'
}, {
    image: image3, alt: 'image_carousel'
}, {
    image: image4, alt: 'image_carousel'
}, {
    image: image5, alt: 'image_carousel'
}]

export default function HeaderDecoration() {
    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevIndex) =>
                prevIndex < images.length - 1 ? prevIndex + 1 : 0
            );
        }, 5000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return <div className={classes.slideshow}>
        {images.map((image, index) => (
            <img key={index} src={image.image} alt={image.alt} className={index === currentImage ? classes.active : undefined} />
        ))}
    </div>
}