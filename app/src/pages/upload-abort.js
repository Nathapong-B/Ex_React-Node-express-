import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function UploadAbort() {
    const [fileSelect, setFileSelect] = useState();
    const [progress, setProgress] = useState(0);
    const [signal, setSignal] = useState();

    const config = {
        apiPath: 'http://localhost:3001',
    }

    const uploadProgress = document.getElementById('upload_progress');

    const upload = async () => {
        const payload = fileSelect;

        const formData = new FormData();

        for (let i = 0; i < payload.length; i++) {
            formData.append('myFile', payload[i]);
        }

        // abortController ต้องประการศในฟังก์ชั่นเดียวกันกับการเรียกใช้ api
        const abortController = new AbortController();
        // นำตัวแปรมารับเพื่อกำหนดค่า .abort() ได้ในฟังก์ชั่นอื่นๆได้
        setSignal(abortController);

        try {
            const res = await axios.post(config.apiPath + '/uploads-abort/', formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: function (e) {
                        console.log(e);
                        const progressPercent = (e.progress) * 100;
                        uploadProgress.style.width = progressPercent + '%';
                        // uploadProgress.value = progressPercent;
                        setProgress(progressPercent);
                        // uploadProgress.value = ((e.loaded * 100) / e.total);
                    },
                    // cancelToken: source.token,
                    signal: abortController.signal,
                })

            console.log(res)
        } catch (e) {
            console.log(e)
            if (e.name === 'CanceledError') { // handle abort()
                setTimeout(() => {
                    alert("Aborted! upload");
                    resetProgressbar();
                }, 500);
            }
        }
    }

    const resetProgressbar = () => {
        const uploadProgress = document.getElementById('upload_progress');
        // uploadProgress.value = 0;
        uploadProgress.style.width = '0'
        setProgress(0);
    }

    const cancelupload = () => {
        if (signal) {
            signal.abort()

            return true;
        }

        resetProgressbar();
    }

    const handleSelectFiles = (input) => {
        if (!input.target.value) return true;

        const files = input.target.files;
        setFileSelect(files)
        display(files)
        resetProgressbar();
    }

    const display = (files) => {
        const showEl = document.getElementById('show');
        showEl.innerHTML = ''

        if (showEl) {
            for (let e of files) {
                showEl.innerHTML += `<img src=${URL.createObjectURL(e)} alt="ตัวอย่างรูปภาพ" style="height: 50px"  class="my-2 me-2 border" />`
                // <span>${e.name}</span> </br>`
            }
        }
    }

    const browseFile = () => {
        const inputFile = document.getElementById('input_browse_file');
        inputFile.click();
    }

    const handleClear = () => {
        const inputFile = document.getElementById('input_browse_file');
        const showEl = document.getElementById('show');
        showEl.innerHTML = ''
        inputFile.value = ''
        uploadProgress.style.width = 0;
    }

    const debug = async () => {
        // console.log(fileSelect)

        const payload = {
            key1: "test key1",
            key2: "test key2",
            key3: "test key3",
            key4: "test key4",
        };

        const formData = new FormData();

        formData.append('data', JSON.stringify(payload));

        const res = await axios.post(config.apiPath + '/uploads-abort/', formData);

        console.log(res)
    }

    return (
        <div className='container shadow p-4 w-50'>
            <div>
                <button className='btn btn-info' onClick={debug}>debug</button>
                <Link to={'/'}><span className='text-secondary'>HOME</span></Link>
            </div>
            <h3 className='text-center'>Ex. Upload - Abort</h3>
            <p className='text-center'>ตัวอย่างการอัพโหลดไฟล์ และการยกเลิกการอัพโหลด</p>
            <p className='text-center'>ในตัวอย่างนี้ใช้งาน tag input type 'file' แบบ multiple ซึ่งทำให้สามารถเลือกไฟล์ได้หลายไฟล์ และจากหน้าจอนี้จะเห็นว่ามีปุ่ม Browse file ซึ่งทำงานด้วยการเรียกใช้ tage input อีกที</p>
            <p className='text-center'>การอัพโหลดไฟล์ จะเรียกใช้ฟังก์ชัน upload ภายในฟังก์ชันนั้นจะมีการประกาศตัวแปรเพื่อเรียกใช้เมธอด AbortController เพื่อใช้ในการยกเลิกการอัพโหล และผูกกับตัวแปรที่ประกาศไว้ภายนอกฟังก์ชัน upload เพื่อเชื่อมโยงตัวแปรกับภายนอกฟังก์ชันได้</p>
            <p className='text-center'>ในการยกเลิกการอัพโหลด จะไปกำหนดค่าให้เป็น AbortController.abort() </p>
            <hr className='w-50 mx-auto'></hr>

            <div className='text-center mb-2'>
                <input id='input_browse_file' type='file' className='form-control d-none' onChange={e => handleSelectFiles(e)} multiple></input>

                <span style={{ cursor: 'pointer' }} className='me-2' onClick={browseFile}>Browse files...</span>
            </div>

            <div className='text-center mb-4'>
                <span style={{ cursor: 'pointer' }} className='me-4' onClick={() => upload()}>Upload</span>
                <span style={{ cursor: 'pointer' }} className='' onClick={handleClear}>Clear files</span>
            </div>

            <div className='d-flex align-items-center mb-2' style={{ height: '10px' }}>
                <div className='progress col-10 h-100'>
                    <div id='upload_progress' className='progress-bar bg-primary progress-bar-striped progress-bar-animated' role="progressbar" style={{ width: '0%' }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">{Math.floor(progress)}%</div>
                    {/* <progress id='upload_progress' max='100' value='0' className='d-block w-100 progress-bar' role="progressbar"></progress> */}
                </div>
                <button className='btn col-2' onClick={cancelupload}>Cancel</button>
            </div>

            <div id='show' className='pt-4 text-center'>
            </div>
            {/* <span>{Math.floor(progress)}%</span> */}
        </div>
    )
}