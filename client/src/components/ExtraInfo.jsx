import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import classes from '../pages/RegisterProperty.module.css'

export default function ExtraInfo({title, extraInfo, handleUpdateInfo}){
    const lowerCase = title.toLowerCase()

    return <div className={classes.basic}>
    <p>{title}</p>
    <div className={classes.basic_count}>
        <RemoveCircleOutline onClick={() => {extraInfo[lowerCase] > 1 && handleUpdateInfo(lowerCase, -1)}} sx={{fontSize:'25px', cursor:'pointer'}}/>
        <p>{extraInfo[lowerCase]}</p>
        <AddCircleOutline  onClick={() => {handleUpdateInfo(lowerCase, 1)}} sx={{fontSize:'25px', cursor:'pointer'}}/>
    </div>
    </div>
}