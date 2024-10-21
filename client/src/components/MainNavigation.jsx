import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import logo from '../assets/logo.jpg'
import {IconButton} from '@mui/material'
import {Menu, Person, Search} from '@mui/icons-material'
import { grey, common } from '@mui/material/colors'
import { useSelector } from 'react-redux'
import classes from './MainNavigation.module.css'
import {AnimatePresence, motion} from 'framer-motion'
import { useState } from 'react'
import DropDownMenu from './DropDownMenu'

export default function MainNavigation(){
    const {user} = useSelector((state) => state.user)
    const [showMenu, setShowMenu] = useState(false)
    const location = useLocation() 
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    function handleChange(event){
        setSearch(event.target.value)
    }

    return <>
    <div className={classes.navbar}>
        <Link to={'/'}>
            <motion.img src={logo} alt='logo' whileHover={{scale:1.05}} />
        </Link>
        {!location.pathname.includes('create-property') && <div className={classes.search}>
            <motion.input type='text' placeholder='Search...' whileFocus={{scale:1.05}} onChange={handleChange}/>
            <IconButton className={classes.searchButton} onClick={()=>{
                if(search){
                    navigate(`properties/search/${search}`)
                }}}>
                <Search sx={{color: common.black }} ></Search>
            </IconButton>
        </div>}
        <div className={classes.options}>
            {location.pathname.includes('create-property') || location.pathname.includes('edit') ? <Link to={'/'}>Back</Link> : 
            (user ? <Link to={'/create-property'}>Share property</Link> : <Link to={'/login'}>Become a host</Link>) }
            <motion.button className={classes.dropdown_menu} whileHover={{scale: 1.05}} onClick={() => {setShowMenu((prevState) => !prevState)}}>
                <Menu sx={{color: grey[800]}} />
               { user ? <img src={`http://localhost:3010/${user.profileImage.replace('public', '')}`} alt='profile-photo' style={{objectFit: 'cover', borderRadius:'50%'}} /> : <Person sx={{color: grey[800]}} />}
            </motion.button>
            <AnimatePresence>
            {showMenu && <DropDownMenu user={user} />}
            </AnimatePresence>
        </div>
    </div>
    <Outlet />
    </>
}