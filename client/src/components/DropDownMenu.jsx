import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../redux/userSlice";
import classes from './MainNavigation.module.css'
import {motion} from 'framer-motion'
export default function DropDownMenu({user}){
    const dispatch = useDispatch()

    return <motion.div className={classes.accountmenu} initial={{opacity:0, y:0}} animate={{opacity:1, y:20}} exit={{opacity:0, y:0}}>
        {!user && <Link to={'/login'}>Login</Link>}
        {!user && <Link to={'/register'}>Register</Link>}
        {user && <Link to={`/tripList/${user._id}`}>Trip List</Link>}
        {user && <Link to={`/wishList/${user.email}`}>Wish List</Link>}
        {user && <Link to={`/propertyList/${user.email}`}>Property List</Link>}
        {user && <Link to={`/reservationList/${user._id}`}>Reservation List</Link>}
        {user && <Link to={'/create-property'}>Become a host</Link>}
        {user && <Link to={'/login'} onClick={()=>{
                dispatch(setLogout())
        }}>Log Out</Link>}

    </motion.div>
}