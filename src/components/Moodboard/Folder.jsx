import React, { useState, useCallback, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import S3FileUpload from 'react-s3';
import { uploadFile } from 'react-s3';
import AWS from 'aws-sdk';
import ReactDOM from 'react-dom';
// import getCroppedImg from './cropImage';
import Draggable, { DraggableCore } from 'react-draggable';
import Crop from './Crop';
import ResizableBox from './ResizableBox';
import Interactable from "./Interactable";
import reactable from 'reactablejs';
import { Rnd } from "react-rnd";
import { db } from '../../firebase';
import { parseSync } from '@babel/core';


const config = {
    bucketName: 'images-moodboard',
    // dirName: 'images', /* optional */
    region: 'ap-south-1',
    accessKeyId: 'AKIA6Q4XXQ6G3P27CUTZ',
    secretAccessKey: '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',
}


const S3_BUCKET = 'images-moodboard';
const REGION = 'ap-south-1';

// AWS.config.update({
//     accessKeyId: 'AKIA6Q4XXQ6GTXSAEM5P',
//     secretAccessKey: '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'
// })

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

let tempImage, tempEditImage;

const resizableOptions = {
    onmove: event => {
        const target = event.target;
        let x = (parseFloat(target.getAttribute("data-x")) || 0);
        let y = (parseFloat(target.getAttribute("data-y")) || 0);

        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        x += event.deltaRect.left;
        y += event.deltaRect.right;

        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
        target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
    }
}


const draggableOptions = {
    onmove: event => {
        const target = event.target;
        // keep the dragged position in the data-x/data-y attributes
        const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform = target.style.transform =
            "translate(" + x + "px, " + y + "px)";

        // update the posiion attributes
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
    }
};

function Folder() {

    // const tempImage = document.getElementById('image');

    const [active, setActive] = useState('folder');
    const [state, setState] = useState("Draggable");
    const [imageData, setImageData] = useState({
        width: '',
        height: '',
        X: '',
        Y: '',
        location: ''
    });
    const [imageLocation, setImageLocation] = useState(undefined);
    const [imagesUrl, setImagesUrl] = useState([]);
    const history = useHistory();

    useEffect(() => {
        db.collection('imagePosition').get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                setImagesUrl((prev) => {
                    return [...prev, doc.data()]
                })
            })
        })
    }, []);

    

    const imageFormat = (event) => {
        tempImage = document.getElementById(event.target.id);
        // console.log(tempImage.src);
        // setImageData({ width: event.currentTarget.offsetWidth, height: event.currentTarget.offsetHeight, X: event.clientX, Y: event.clientY, location: imageLocation });

        imageData.width = event.currentTarget.offsetWidth ;
        imageData.height = event.currentTarget.offsetHeight;
        imageData.X =   event.clientX;
        imageData.Y = event.clientY;
        imageData.location = imageLocation;
        console.log(imageData);

        if (imageData === undefined) {
            console.log(`do nothing`);
        } else {
            db.collection("imagePosition").add(imageData).then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                window.location.reload();
            })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
    }


    const imageEdit = (event) => {
        tempEditImage = document.getElementById(event.target.id);

        console.log(event.currentTarget.offsetWidth);
        console.log(event.currentTarget.offsetHeight);
        console.log(event.clientX);
        console.log(event.clientY);
        console.log(event.target.id);

        imageData.width = event.currentTarget.offsetWidth ;
        imageData.height = event.currentTarget.offsetHeight;
        imageData.X =   event.clientX;
        imageData.Y = event.clientY;
        imageData.location = event.target.id;
        console.log(imageData);

        db.collection('imagePosition').where('location','==',tempEditImage.id).limit(1).get().then((query)=>{
            const thing = query.docs[0];
            let temp = thing.data();
            temp.X = imageData.X;
            temp.Y = imageData.Y;
            temp.width = imageData.width;
            temp.height = imageData.height;
            console.log(`yes,i am changing`);
            thing.ref.update(temp);
        })
    }

    const changeState = () => {
        setState('Resizable')
    }

    const style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "solid 1px #ddd",
        background: "#f0f0f0",
        position:'absolute'
    };

    const resizeImage = () => {
        setActive('resize');
    }

    const [searchVisibility, setSearchVisibility] = useState('hidden');

    const searchImage = () => {
        if (searchVisibility === 'hidden') {
            setSearchVisibility('visible');
        } else {
            setSearchVisibility('hidden');
        }
    }
    // w6J8K7DlBe2Sx9MmUWXLayjubTG01BY0XqNz9r74
    // AKIA6Q4XXQ6G5O7XKGHV id

    const [image, setImage] = useState([]);
    const [progress, setProgress] = useState(undefined);

    const uploadImage = (event) => {
        let file = event.target.files[0];

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })

        console.log('Uploading');
        uploadFile(file, config)
            .then(data => {
                setImageLocation(data.location);
                console.log(data);
                if (event.target.files && event.target.files[0]) {
                    setImage((prev) => {
                        return [...prev, URL.createObjectURL(event.target.files[0])]
                    });
                }
            }
            )
            .catch(err => console.error(err))
    }

    return (
        <div>
            {active === 'folder' &&
                <div className="canvas">
                    <div className="moodboard-title"></div>
                    <div className="sidepanel">
                        <input type="file" onChange={uploadImage} className="file-upload-input" />
                        <svg width="24" height="402" viewBox="0 0 24 402" fill="none" xmlns="http://www.w3.org/2000/svg" >
                            <g>
                                <path d="M18 10.5C17.174 10.4986 16.3635 10.7249 15.6577 11.1542C14.952 11.5835 14.3782 12.199 13.9996 12.9331C13.6209 13.6673 13.452 14.4916 13.5114 15.3155C13.5708 16.1394 13.8562 16.931 14.3363 17.6033L10.5 21.4395L11.5605 22.5L15.3967 18.6638C15.9738 19.0739 16.6394 19.342 17.3396 19.4464C18.0398 19.5507 18.7548 19.4883 19.4263 19.2642C20.0978 19.0401 20.707 18.6607 21.2042 18.1568C21.7014 17.6528 22.0726 17.0387 22.2877 16.3642C22.5028 15.6897 22.5556 14.974 22.4419 14.2753C22.3282 13.5766 22.0511 12.9145 21.6333 12.3431C21.2155 11.7716 20.6686 11.3068 20.0373 10.9866C19.406 10.6663 18.7079 10.4996 18 10.5ZM18 18C17.4067 18 16.8266 17.8241 16.3333 17.4944C15.8399 17.1648 15.4554 16.6962 15.2284 16.1481C15.0013 15.5999 14.9419 14.9967 15.0576 14.4147C15.1734 13.8328 15.4591 13.2982 15.8787 12.8787C16.2982 12.4591 16.8328 12.1734 17.4147 12.0577C17.9967 11.9419 18.5999 12.0013 19.1481 12.2284C19.6962 12.4554 20.1648 12.8399 20.4944 13.3333C20.8241 13.8266 21 14.4067 21 15C20.999 15.7954 20.6826 16.5578 20.1202 17.1202C19.5578 17.6826 18.7953 17.999 18 18Z" fill="#5A5A5A" />

                                <path d="M12.75 9C13.195 9 13.63 8.86804 14 8.62081C14.37 8.37357 14.6584 8.02217 14.8287 7.61104C14.999 7.1999 15.0436 6.74751 14.9568 6.31105C14.8699 5.87459 14.6557 5.47368 14.341 5.15901C14.0263 4.84434 13.6254 4.63005 13.189 4.54323C12.7525 4.45642 12.3001 4.50097 11.889 4.67127C11.4778 4.84157 11.1264 5.12996 10.8792 5.49997C10.632 5.86998 10.5 6.30499 10.5 6.75C10.5006 7.34656 10.7378 7.91851 11.1597 8.34033C11.5815 8.76216 12.1534 8.99941 12.75 9ZM12.75 6C12.8983 6 13.0433 6.04399 13.1667 6.1264C13.29 6.20881 13.3861 6.32594 13.4429 6.46299C13.4997 6.60003 13.5145 6.75083 13.4856 6.89632C13.4566 7.0418 13.3852 7.17544 13.2803 7.28033C13.1754 7.38522 13.0418 7.45665 12.8963 7.48559C12.7508 7.51453 12.6 7.49968 12.463 7.44291C12.3259 7.38615 12.2088 7.29002 12.1264 7.16668C12.044 7.04334 12 6.89834 12 6.75C12 6.55109 12.079 6.36032 12.2197 6.21967C12.3603 6.07902 12.5511 6 12.75 6Z" fill="#5A5A5A" />
                                <a href="#" onClick={searchImage}>
                                    <path id='imageFinder' d="M9 18H3V13.4977L6.75 9.75L10.9395 13.9395L12 12.876L7.8105 8.68725C7.52921 8.40604 7.14775 8.24807 6.75 8.24807C6.35225 8.24807 5.97079 8.40604 5.6895 8.68725L3 11.376V3H18V7.5H19.5V3C19.4996 2.6023 19.3414 2.221 19.0602 1.93978C18.779 1.65856 18.3977 1.5004 18 1.5H3C2.6023 1.5004 2.221 1.65856 1.93978 1.93978C1.65856 2.221 1.5004 2.6023 1.5 3V18C1.5004 18.3977 1.65856 18.779 1.93978 19.0602C2.221 19.3414 2.6023 19.4996 3 19.5H9V18Z" fill="#5A5A5A" /></a>

                                <path d="M9.375 61.4458H11.107V69.3747C11.107 69.4778 11.1914 69.5622 11.2945 69.5622H12.7008C12.8039 69.5622 12.8883 69.4778 12.8883 69.3747V61.4458H14.625C14.782 61.4458 14.8687 61.2653 14.7727 61.1434L12.1477 57.82C12.1301 57.7976 12.1077 57.7795 12.0821 57.767C12.0565 57.7545 12.0285 57.748 12 57.748C11.9715 57.748 11.9435 57.7545 11.9179 57.767C11.8923 57.7795 11.8699 57.7976 11.8523 57.82L9.22734 61.1411C9.13125 61.2653 9.21797 61.4458 9.375 61.4458ZM20.5781 68.6716H19.1719C19.0688 68.6716 18.9844 68.7559 18.9844 68.8591V72.4684H5.01562V68.8591C5.01562 68.7559 4.93125 68.6716 4.82812 68.6716H3.42188C3.31875 68.6716 3.23438 68.7559 3.23438 68.8591V73.4997C3.23438 73.9145 3.56953 74.2497 3.98438 74.2497H20.0156C20.4305 74.2497 20.7656 73.9145 20.7656 73.4997V68.8591C20.7656 68.7559 20.6812 68.6716 20.5781 68.6716Z" fill="#5A5A5A" />
                                <path d="M12.75 119.25H2.25V129.75H12.75V119.25Z" stroke="#5A5A5A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <a href="#" onClick={resizeImage}>
                                    <path d="M2.25 113.25V110.25H5.25" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9.75 110.25H16.5" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 6" />
                                    <path d="M18.75 110.25H21.75V113.25" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M21.75 117.75V124.5" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 6" />
                                    <path d="M21.75 126.75V129.75H18.75" stroke="#5A5A5A" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.25 123C5.66421 123 6 122.664 6 122.25C6 121.836 5.66421 121.5 5.25 121.5C4.83579 121.5 4.5 121.836 4.5 122.25C4.5 122.664 4.83579 123 5.25 123Z" stroke="#5A5A5A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.25 127.5L7.5 124.5L10.5 126.75L12.75 125.25" stroke="#5A5A5A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15 113.25H18.75V117" stroke="#5A5A5A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.25 117.75L18.75 113.25" stroke="#5A5A5A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </a>
                                <g clip-path="url(#clip0_810:14712)">
                                    <a href="#" >
                                        <path d="M23.95 181.95H21.55V166.75C21.55 166.308 21.1922 165.95 20.75 165.95H5.55V163.55C5.55 163.108 5.1918 162.75 4.75 162.75C4.3082 162.75 3.95 163.108 3.95 163.55V165.95H1.55C1.1082 165.95 0.75 166.308 0.75 166.75C0.75 167.192 1.1082 167.55 1.55 167.55H3.95V182.75C3.95 183.192 4.3082 183.55 4.75 183.55H19.95V185.95C19.95 186.392 20.3078 186.75 20.75 186.75C21.1922 186.75 21.55 186.392 21.55 185.95V183.55H23.95C24.3922 183.55 24.75 183.192 24.75 182.75C24.75 182.308 24.3922 181.95 23.95 181.95ZM5.55 181.95V167.55H19.95V181.95H5.55Z" fill="#5A5A5A" />
                                    </a>
                                </g>
                                <path d="M3 220.5V223.5H9V237H12V223.5H18V220.5H3Z" fill="#5A5A5A" />
                                <path d="M22.5 219V217.5H18V219H19.5V237H18V238.5H22.5V237H21V219H22.5Z" fill="#5A5A5A" />
                                <path d="M17 273H7C4.79086 273 3 274.791 3 277V287C3 289.209 4.79086 291 7 291H17C19.2091 291 21 289.209 21 287V277C21 274.791 19.2091 273 17 273Z" stroke="#5A5A5A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11.25 330L17.25 336" stroke="#5A5A5A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12.75 331.501L17.25 327.001C18.075 326.176 19.425 326.176 20.25 327.001C21.075 327.826 21.075 329.176 20.25 330.001L15.75 334.501" stroke="#5A5A5A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12.525 331.726L4.275 339.976C3.825 340.426 3.675 340.951 3.675 341.551C3.3 341.776 3 342.226 3 342.751C3 343.576 3.675 344.251 4.5 344.251C5.025 344.251 5.475 343.951 5.775 343.576C6.3 343.576 6.9 343.351 7.35 342.976L15.6 334.726" stroke="#5A5A5A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M21.75 401.25H2.25C2.05109 401.25 1.86032 401.171 1.71967 401.03C1.57902 400.89 1.5 400.699 1.5 400.5V379.5C1.5 379.301 1.57902 379.11 1.71967 378.97C1.86032 378.829 2.05109 378.75 2.25 378.75H17.25C17.3487 378.749 17.4466 378.768 17.5379 378.806C17.6293 378.843 17.7124 378.898 17.7825 378.968L22.2825 383.468C22.352 383.538 22.407 383.621 22.4443 383.712C22.4817 383.803 22.5006 383.901 22.5 384V400.5C22.5 400.699 22.421 400.89 22.2803 401.03C22.1397 401.171 21.9489 401.25 21.75 401.25ZM3 399.75H21V384.308L16.9425 380.25H3V399.75Z" fill="#5A5A5A" />
                                <path d="M15 384.75H7.5C7.30109 384.75 7.11032 384.671 6.96967 384.53C6.82902 384.39 6.75 384.199 6.75 384V379.5C6.75 379.301 6.82902 379.11 6.96967 378.97C7.11032 378.829 7.30109 378.75 7.5 378.75H15C15.1989 378.75 15.3897 378.829 15.5303 378.97C15.671 379.11 15.75 379.301 15.75 379.5V384C15.75 384.199 15.671 384.39 15.5303 384.53C15.3897 384.671 15.1989 384.75 15 384.75ZM8.25 383.25H14.25V380.25H8.25V383.25Z" fill="#5A5A5A" />
                                <path d="M17.25 396.75H6.75C6.55109 396.75 6.36032 396.671 6.21967 396.53C6.07902 396.39 6 396.199 6 396V388.5C6 388.301 6.07902 388.11 6.21967 387.97C6.36032 387.829 6.55109 387.75 6.75 387.75H17.25C17.4489 387.75 17.6397 387.829 17.7803 387.97C17.921 388.11 18 388.301 18 388.5V396C18 396.199 17.921 396.39 17.7803 396.53C17.6397 396.671 17.4489 396.75 17.25 396.75ZM7.5 395.25H16.5V389.25H7.5V395.25Z" fill="#5A5A5A" />
                                <defs>
                                    <clipPath id="clip0_810:14712">
                                        <rect width="24" height="24" fill="white" transform="translate(0 162)" />
                                    </clipPath>
                                </defs>
                            </g>
                        </svg>
                    </div>
                    {/* search container */}
                    <div className="image-search-container" style={{ visibility: searchVisibility }}>
                        <input className="image-search-box form-control" /><span className="fa fa-search image-search-icon"></span>
                    </div>
                    {image.map((doc, index) => {
                        return (

                            <Rnd
                                style={style}
                                default={{
                                    x: 0,
                                    y: 0,
                                    width: 200,
                                    height: 200
                                }}
                            >
                                <img src={doc} alt="" id={index} style={{ width: '100%', height: '100%' }} onClick={imageFormat} />
                            </Rnd>


                        )
                    })
                    }

                    <section>
                        {imagesUrl.map((doc) => {
                            return (
                                <Rnd
                                    style={style}
                                    default={{
                                        x: doc.X,
                                        y: doc.Y,
                                        width: doc.width,
                                        height: doc.height
                                    }}
                                >
                                    <img src={doc.location} id={doc.location} style={{ width: '100%', height: '100%' }} alt="" onClick={imageEdit} />
                                </Rnd>
                            )
                        })}
                    </section>

                </div>
            }

        </div>
    )
}

export default Folder;