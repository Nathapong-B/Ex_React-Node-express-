import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function UploadtoCloudinary() {
    const [file, setFile] = useState();

    const config = {
        apiPath: 'http://localhost:3001',
    }

    const handleSelectFile = (pic) => {
        setFile(pic.target.files)
    }

    const handleUpload = async () => {
        try {
            const formData = new FormData();

            for (const el of file) {
                formData.append('images', el)
            };

            const res = await axios.post(config.apiPath + '/uploadtocloudinary/upload-images', formData);

            if (res.data) {
                alert('upload success');
                console.log(res.data.result)
                display(res.data.result);
            };
        } catch (err) {
            console.log(err)
        };
    };

    const display = (files) => {
        const showEl = document.getElementById('display');
        showEl.innerHTML = ''

        if (showEl) {
            for (let e of files) {
                showEl.innerHTML += `<img src=${e.url} alt="ตัวอย่างรูปภาพ" style="height: 250px"  class="my-2 me-2 border" />`
            }
        }
    }

    const debug = () => {
        console.log(file)
    }
    return (
        <div className='container shadow p-4 w-50'>
            {/* <button className="btn btn-info" onClick={debug}>debug</button> */}
            <div>
                <Link to={'/'}><span className='text-secondary'>HOME</span></Link>
            </div>
            <h3 className='text-center mb-4'>Ex. Upload Images to Cloudinary</h3>

            <div className='text-center'>
                <input className='form-control form-control-sm mb-2' type="file" onChange={(e) => { handleSelectFile(e) }} multiple></input>
                <button className='btn btn-sm btn-info w-100' onClick={handleUpload}>upload</button>
            </div>

            <hr></hr>

            <div id='display' className='text-center'>
            </div>
        </div>
    )
}