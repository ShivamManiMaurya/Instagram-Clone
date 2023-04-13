import React, {useState} from 'react'
import Button from '@mui/material/Button';
import {db, storage} from '../firebase';
import firebase from 'firebase/compat/app';
import './styles/ImageUpload.css';

function ImageUpload({username}) {

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);   
        }
    };

    const handleUpload = () => {
        console.log("clicked")
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on('state_changed', (snapshot) => {
                // progress function...it gives the value between 0 to 100 i.e. how much its uploaded the image
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
                console.log("clicked in progress");
            }, 
            (error) => {
                // error function
                console.log("clicked in start of error");
                console.log(error);
                alert(error.message);
                console.log("clicked in error");
            }, 
            () => {
                // complete funciton...it's like downloading the image
                console.log("clicked in complete");
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then (url => {
                        console.log("clicked in promise");
                        // post image inside db...
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imgUrl: url,
                            username: username
                        });

                        setProgress(0);
                        setCaption('');
                        setImage(null);
                        console.log("clicked in end");
                    });
            }
        );
    };

    // const handleUpload = () => {
    //     const uploadTask = storage.ref(`images/${image.name}`).put(image);
    //     uploadTask.on(
    //       "state_changed",
    //       (snapshot) => {
    //         const progress = Math.round(
    //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //         );
    //         setProgress(progress);
    //       },
    //       (error) => {
    //         console.log(error);
    //         alert(error.message);
    //       },
    //       () => {
    //         storage
    //           .ref("images")
    //           .child(image.name)
    //           .getDownloadURL()
    //           .then((url) => {
    //             db.collection("posts").add({
    //               timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //               caption: caption,
    //               imageUrl: url,
    //               username: username,
    //             });
    
    //             setProgress(0);
    //             setCaption("");
    //             setImage(null);
    //           });
    //       }
    //     );
    //   };


    return (
        <div className='imageUpload'>
            <h3 className='username'>{username}</h3>
            <progress className='imageUpload__progress' value={progress} max='100' />
            <input  type="text" placeholder='Enter a caption...' onChange={(e) => setCaption(e.target.value)} value={caption}/>
            <input className='imageUplod__file' type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload