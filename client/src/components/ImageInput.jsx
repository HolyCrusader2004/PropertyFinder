import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import image from '../assets/addImage.png';

export default function ImageInput({ imageURLS, handleUpload, handleDelete }) {
    return (
        <>
            <h3>Add some photos</h3>
            <div className="photos">
                <input id={'images'} type="file" multiple accept="image/*" onChange={handleUpload} style={{display: 'none'}}/>
                <label htmlFor="images" style={{cursor:'pointer', display:'flex', alignItems:'center'}}>
                    <img src={image} alt="Upload" />
                    <p style={{color: 'black'}}>Choose files</p>
                </label>
                {imageURLS.map((imageSrc) => (
                    <div key={imageSrc} style={{ position: 'relative', display: 'inline-block', margin:'10px' }}>
                        <img src={imageSrc} alt="inserted-images" style={{width:'250px', objectFit:'cover', height:'150px'}} />
                        <RemoveCircleIcon onClick={() => handleDelete(imageSrc)}
                            sx={{ cursor: 'pointer', fontSize: '25px', position: 'absolute', top: 0, right: 0 }}/>
                    </div>
                ))}
            </div>
        </>
    );
}
