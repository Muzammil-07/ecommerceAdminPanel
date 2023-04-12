import React, { useState, useRef } from 'react'
import Select from 'react-select'
import styles from "../../styles/Home.module.css"
import Image from 'next/image';
import loader from "./images/loading.png";
import { storage } from '../Services/Firebase';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db } from "../Services/Firebase";
import { addDoc, collection, setDoc, getDoc, getDocs } from "firebase/firestore";
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import uuid from 'react-uuid';
function AddItem() {
    const router = useRouter();
    const fabricOptions = [{ value: "cotton", label: "cotton" }, { value: "lawn", label: "lawn" }];
    const itemOptions = [{ value: "kurta", label: "kurta" }, { value: "pant", label: "pant" }];
    const catogary = [{ value: "newIn", label: "newIn" }, { value: "casual", label: "casual" }, { value: "formal", label: "formal" }];
    const a = [1, 2, 3, 4];
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [des, setDes] = useState("")
    const [fabric, setFabric] = useState("");
    const [item, setItem] = useState("");
    const [catogari, setcatogari] = useState('');
    const [image1, setImage1] = useState(loader)
    const [image2, setImage2] = useState(loader)
    const [image3, setImage3] = useState(loader)
    const [image4, setImage4] = useState(loader)
    const [showimage1, setShowImage1] = useState(false)
    const [showimage2, setShowImage2] = useState(false)
    const [showimage3, setShowImage3] = useState(false)
    const [showimage4, setShowImage4] = useState(false)
    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();
    const [check1, setcheck1] = useState();
    const [check2, setCheck2] = useState();
    const [check3, setCheck3] = useState();
    const [check4, setCheck4] = useState();
    var id= uuid();
    const handleClick1 = () => {
        // 👇️ open file input box on click of other element
        inputRef1.current.click();
    };
    var arr = [];
    const handleFileChange1 = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        console.log('fileObj is', fileObj);
        event.target.value = null;
        setcheck1(fileObj)
        const imageUrl = URL.createObjectURL(fileObj)
        setImage1(imageUrl)

        setShowImage1(true)

    };
    const handleClick2 = () => {
        // 👇️ open file input box on click of other element
        inputRef2.current.click();
    };

    const handleFileChange2 = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        console.log('fileObj is', fileObj);
        event.target.value = null;
        setCheck2(fileObj)
        const imageUrl = URL.createObjectURL(fileObj)
        setImage2(imageUrl)

        setShowImage2(true)

    };
    const handleClick3 = () => {
        // 👇️ open file input box on click of other element
        inputRef3.current.click();
    };

    const handleFileChange3 = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        console.log('fileObj is', fileObj);
        event.target.value = null;
        setCheck3(fileObj)
        const imageUrl = URL.createObjectURL(fileObj)
        setImage3(imageUrl)

        setShowImage3(true)

    };
    const handleClick4 = () => {
        // 👇️ open file input box on click of other element
        inputRef4.current.click();
    };

    const handleFileChange4 = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        console.log('fileObj is', fileObj);
        event.target.value = null;
        setCheck4(fileObj)
        const imageUrl = URL.createObjectURL(fileObj)
        setImage4(imageUrl)

        setShowImage4(true)

    };
    var check = [check1, check2, check3, check4]
    const addItem = async () => {
        const metadata = {
            contentType: 'image/jpeg'
        };
        if (image1 != loader && image2 != loader && image3 != loader && image4 != loader && fabric != "" && productName != "" && productPrice != "") {
            a.forEach((doc) => {
                console.log(doc)
                const storageRef = ref(storage, `images/${check[doc - 1].name}`);
                const uploadTask = uploadBytesResumable(storageRef, check[doc], metadata);

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;
                            case 'storage/canceled':
                                // User canceled the upload
                                break;

                            // ...

                            case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                        }
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            arr.push(downloadURL)
                            addStation();

                        })
                    }
                );
            })

            const addStation = async () => {
                if (arr.length >= 4) {

                    setDoc(doc(db, catogari, productName), {
                        productName,
                        productPrice,
                        item,
                        fabric,
                        images: arr,
                        Description:des,
                        catogari,
                        id,

                    }).then((res) => {
                        alert("Successfully upload");
                        arr = [];
                        router.reload('AddItem');

                    }).catch((err) => {
                        console.log(err.messsage)
                    })


                };
            }



        } else {
            alert("Please Pick all Images")
        }


    }


    return (

        <div className='container mt-4 '>
            <h1 >Add Item</h1>
            <div className='row '>
                <div className='col-12 col-lg-7 p-5 fs-4'>
                    <div className='d-flex justify-content-between m-2'>
                        <label htmlFor="inputEmail4" className="form-label ">
                            Enter Product Name
                        </label>
                        <input
                            type="text"
                            className="form-control  w-50 h-100"
                            placeholder="Enter Product Name"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => { setProductName(e.target.value) }}
                        />
                    </div>
                    <div className='d-flex justify-content-between m-2 '>
                        <label htmlFor="inputEmail4" className="form-label ">
                            Enter Product Price
                        </label>
                        <input
                            type="number"
                            className="form-control  w-50 h-100"
                            placeholder="Enter Product Price"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => { setProductPrice(e.target.value) }}
                        />
                    </div>

                    <div className='d-flex justify-content-between m-2 '>
                        <label htmlFor="inputEmail4" className="form-label ">
                            Select Fabric
                        </label>
                        <div className='w-50'>
                            <Select
                                options={fabricOptions}

                                id="long-value-select2"
                                instanceId="long-value-select2"
                                onChange={(e) => { setFabric(e.value) }}
                            />
                        </div>

                    </div>
                    <div className='d-flex justify-content-between m-2 '>
                        <label htmlFor="inputEmail4" className="form-label ">
                            Select Item
                        </label>
                        <div className='w-50'>
                            <Select
                                options={itemOptions}

                                id="long-value-select2"
                                instanceId="long-value-select2"
                                onChange={(e) => { setItem(e.value) }}
                            />
                        </div>

                    </div>
                    <div className='d-flex justify-content-between m-2 '>
                        <label htmlFor="inputEmail4" className="form-label ">
                            Select Catogary
                        </label>
                        <div className='w-50'>
                            <Select
                                options={catogary}

                                id="long-value-select2"
                                instanceId="long-value-select2"
                                onChange={(e) => { setcatogari(e.value) }}
                            />
                        </div>


                    </div>
                    <div className='d-flex justify-content-between m-2'>
                        <label htmlFor="inputEmail4" className="form-label ">
                            Enter Product Description
                        </label>
                        <textarea className="form-control" placeholder="Enter Product description" id="floatingTextarea2" style={{ height: "100px" }} onChange={(e)=>{setDes(e.target.value)}}></textarea>
                    </div>
                    <button className='btn btn-primary w-100 mt-2' onClick={addItem}> Add Item</button>
                </div>
                <div className='col-12 col-lg-5'>

                    <div className='d-flex justify-content-evenly flex-wrap' >
                        <input
                            style={{ display: 'none' }}
                            ref={inputRef1}
                            type="file"
                            onChange={handleFileChange1}
                        />
                        <input
                            style={{ display: 'none' }}
                            ref={inputRef2}
                            type="file"
                            onChange={handleFileChange2}
                        />
                        <input
                            style={{ display: 'none' }}
                            ref={inputRef3}
                            type="file"
                            onChange={handleFileChange3}
                        />
                        <input
                            style={{ display: 'none' }}
                            ref={inputRef4}
                            type="file"
                            onChange={handleFileChange4}
                        />
                        <div className={styles.avt}>
                            <div className={showimage1 ? `d-inline` : `d-none`}>

                                <Image src={image1} alt="image1" width={200} height={200} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="26  " height="26  " fill="currentColor" className="bi bi-backspace-reverse" viewBox="0 0 16 16" onClick={() => { setShowImage1(false); setImage1(loader) }}>
                                    <path d="M9.854 5.146a.5.5 0 0 1 0 .708L7.707 8l2.147 2.146a.5.5 0 0 1-.708.708L7 8.707l-2.146 2.147a.5.5 0 0 1-.708-.708L6.293 8 4.146 5.854a.5.5 0 1 1 .708-.708L7 7.293l2.146-2.147a.5.5 0 0 1 .708 0z" />
                                    <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7.08a2 2 0 0 0 1.519-.698l4.843-5.651a1 1 0 0 0 0-1.302L10.6 1.7A2 2 0 0 0 9.08 1H2zm7.08 1a1 1 0 0 1 .76.35L14.682 8l-4.844 5.65a1 1 0 0 1-.759.35H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7.08z" />
                                </svg>


                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" fill="currentColor" onClick={handleClick1} className={showimage1 ? `d-none` : `bi bi-plus-circle m-4 border border-2 p-4`} viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </div>
                        <div className={styles.avt}>
                            <div className={showimage2 ? `d-inline` : `d-none`}>

                                <Image src={image2} alt="image2" width={200} height={200} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="26  " height="26  " fill="currentColor" className="bi bi-backspace-reverse" viewBox="0 0 16 16" onClick={() => { setShowImage2(false); setImage2(loader) }}>
                                    <path d="M9.854 5.146a.5.5 0 0 1 0 .708L7.707 8l2.147 2.146a.5.5 0 0 1-.708.708L7 8.707l-2.146 2.147a.5.5 0 0 1-.708-.708L6.293 8 4.146 5.854a.5.5 0 1 1 .708-.708L7 7.293l2.146-2.147a.5.5 0 0 1 .708 0z" />
                                    <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7.08a2 2 0 0 0 1.519-.698l4.843-5.651a1 1 0 0 0 0-1.302L10.6 1.7A2 2 0 0 0 9.08 1H2zm7.08 1a1 1 0 0 1 .76.35L14.682 8l-4.844 5.65a1 1 0 0 1-.759.35H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7.08z" />
                                </svg>


                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" fill="currentColor" onClick={handleClick2} className={showimage2 ? `d-none` : `bi bi-plus-circle m-4 border border-2 p-4`} viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </div>
                        <div className={styles.avt}>
                            <div className={showimage3 ? `d-inline` : `d-none`}>

                                <Image src={image3} alt="image3" width={200} height={200} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="26  " height="26  " fill="currentColor" className="bi bi-backspace-reverse" viewBox="0 0 16 16" onClick={() => { setShowImage3(false); setImage3(loader) }}>
                                    <path d="M9.854 5.146a.5.5 0 0 1 0 .708L7.707 8l2.147 2.146a.5.5 0 0 1-.708.708L7 8.707l-2.146 2.147a.5.5 0 0 1-.708-.708L6.293 8 4.146 5.854a.5.5 0 1 1 .708-.708L7 7.293l2.146-2.147a.5.5 0 0 1 .708 0z" />
                                    <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7.08a2 2 0 0 0 1.519-.698l4.843-5.651a1 1 0 0 0 0-1.302L10.6 1.7A2 2 0 0 0 9.08 1H2zm7.08 1a1 1 0 0 1 .76.35L14.682 8l-4.844 5.65a1 1 0 0 1-.759.35H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7.08z" />
                                </svg>


                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" fill="currentColor" onClick={handleClick3} className={showimage3 ? `d-none` : `bi bi-plus-circle m-4 border border-2 p-4`} viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </div>
                        <div className={styles.avt}>
                            <div className={showimage4 ? `d-inline` : `d-none`}>

                                <Image src={image4} alt="image4" width={200} height={200} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="26  " height="26  " fill="currentColor" className="bi bi-backspace-reverse" viewBox="0 0 16 16" onClick={() => { setShowImage4(false); setImage4(loader) }}>
                                    <path d="M9.854 5.146a.5.5 0 0 1 0 .708L7.707 8l2.147 2.146a.5.5 0 0 1-.708.708L7 8.707l-2.146 2.147a.5.5 0 0 1-.708-.708L6.293 8 4.146 5.854a.5.5 0 1 1 .708-.708L7 7.293l2.146-2.147a.5.5 0 0 1 .708 0z" />
                                    <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7.08a2 2 0 0 0 1.519-.698l4.843-5.651a1 1 0 0 0 0-1.302L10.6 1.7A2 2 0 0 0 9.08 1H2zm7.08 1a1 1 0 0 1 .76.35L14.682 8l-4.844 5.65a1 1 0 0 1-.759.35H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7.08z" />
                                </svg>


                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" fill="currentColor" onClick={handleClick4} className={showimage4 ? `d-none` : `bi bi-plus-circle m-4 border border-2 p-4`} viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItem