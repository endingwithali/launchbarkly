import React, {useState} from 'react';

function ImageHandle(){
    const [file, setFile] = useState(null);

    const handleSubmit = (event) => {
        setFile(URL.createObjectURL(event.target.files[0]))
    }

    return(
        <>
            <input type="file" onChange={handleSubmit}/>
            <img src={file}/>
        </>
    )
}
export default ImageHandle