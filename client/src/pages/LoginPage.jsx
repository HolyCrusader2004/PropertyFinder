import { Form, Link, useNavigate } from "react-router-dom";
import classes from './RegisterPage.module.css'
import {motion} from 'framer-motion'
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../util/mutations";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/userSlice";

export default function LoginPage(){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { mutate, isError, isPending, error} = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            dispatch(
                setLogin({
                    user: data.user,
                    token: data.token
                })
            )
            navigate('..')
        }
    })

    function handleSubmit(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        mutate({ email, password });
    }    

    return(
        <div className={classes.register}>
        <motion.div className={classes.content} initial={{opacity:0, y: 20}} animate={{opacity:1, y: 0}} transition={{duration: 0.5}}>
            <Form onSubmit={handleSubmit}>
                <input placeholder="Email" name="email" required type="email"/>
                <input placeholder="Password" name="password" required type="password"/>
                <motion.button whileHover={{scale:1.05}} transition={{type:'tween'}} disabled={isPending}>Login</motion.button>
                {isError ? <p className={classes.error_message}>{`*${error.info?.message}*`}</p>: undefined}
            </Form>
            <Link to={'/register'}>Don't have an account? Click here</Link>
        </motion.div>
    </div>);
}