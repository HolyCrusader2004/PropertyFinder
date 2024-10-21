import MainNavigation from "../components/MainNavigation";

export default function ErrorPage(){
    return <>
        <MainNavigation />
        <h3 style={{display:'flex', flexDirection:'column', alignItems:'center', alignContent:'center', borderWidth:'10px', marginTop:'150px', color:'red'}}><strong>An error has occurred, return to the main menu</strong></h3>
    </>
}