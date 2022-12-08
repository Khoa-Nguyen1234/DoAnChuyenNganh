import {React , useState, useRef} from 'react'
import '../index.css'

function ImageUpload() {
    const [picFile, setPicFile] = useState(null)
    const inputEl = useRef(null);

    const handleImageUpload = (e) => {
        setPicFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleClickInput = (e) => {
        inputEl.current.click();
    }

    const handleClickClose = () => {
        setPicFile(null);
    }

    return (
        <div className="upload-image-main">
            <div className="image-upload-container" onClick={handleClickInput}>
               <div className="upload-add-icon">
               <img className="" src={process.env.PUBLIC_URL + '/add.svg'}/>
                <p className="">Add photo</p>
               </div>
                <img className="product-upload-image" src={picFile} />
                
            </div>
            <img className="product-upload-close" src={process.env.PUBLIC_URL + '/close-1.svg'} onClick={handleClickClose}/>
            <input className="product-inputType-image" name="productImage" type="file" accept="image/*" onChange={handleImageUpload} ref={inputEl}/>
        </div>
    )
}

export default ImageUpload
