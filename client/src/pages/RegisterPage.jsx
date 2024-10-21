import { Form, Link, useNavigate } from "react-router-dom";
import image from '../assets/addImage.png';
import classes from './RegisterPage.module.css'
import {motion} from 'framer-motion'
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../util/mutations";

export default function RegisterPage(){
    const navigate = useNavigate()
    const [selectedImage, setSelectedImage] = useState(null)
    
    function handleChange(event){
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file)
        setSelectedImage(imageUrl)
    }

    const {mutate, isError, isPending, error} = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            navigate('/login')
        }
    })

    function handleSubmit(event){
        event.preventDefault()
        const fd = new FormData(event.target)
        mutate(fd)
    }

    return(
        <div className={classes.register}>
        <motion.div className={classes.content} initial={{opacity:0, y: 20}} animate={{opacity:1, y: 0}} transition={{duration: 0.5}}>
            <Form onSubmit={handleSubmit}>
                <input placeholder="First Name" name="firstName" required type="text"/>
                <input placeholder="Last Name" name="lastName" required type="text"/>
                <input placeholder="Email" name="email" required type="email"/>
                <input placeholder="Password" name="password" required type="password"/>
                <input placeholder="Confirm password" name="confirmPassword" required type="password"/>
                <input id="image" type="file" name="profileImage" accept="image/*" className={classes.hiddenfileinput} required onChange={handleChange}/>
                <label htmlFor="image">
                    <img src={selectedImage ? selectedImage : image} alt="add-image" />
                    <p>Upload image</p>
                </label>
                <motion.button whileHover={{scale:1.05}} transition={{type:'tween'}} disabled={isPending}>Register</motion.button>
                {isError ? <p className={classes.error_message}>{`*${error.info?.message}*`}</p>: undefined}
            </Form>
            <Link to={'/login'}>Already have an account? Click here</Link>
        </motion.div>
    </div>);
}