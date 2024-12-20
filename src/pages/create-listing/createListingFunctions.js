import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { auth, db, storage } from '../../firebase.config';


export const storeImage = async (image) => {
  return new Promise((resolve, reject) => {
    const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
    const storageRef = ref(storage, 'images/' + fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export const submitListingData = async (values) => {
  try {
    const formData = { ...values, userRef: auth.currentUser.uid, postedOn: serverTimestamp() };

    const imgUrls = await Promise.all([...formData.images].map((image) => storeImage(image))).catch(
      (error) => {
        toast.error(error.message);
        return;
      }
    );

    delete formData.images;

    const listingDocRef = await addDoc(collection(db, 'listings'), { ...formData, imgUrls });
    toast.success('Listing created successfully');

    return listingDocRef.id;
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteSelectedImage = (imageThumbs, path, setFieldValue, setImageThumbs) => {
  const newImageThumbs = imageThumbs.filter((image) => image.path !== path);
  setImageThumbs(newImageThumbs);
  setFieldValue('images', newImageThumbs);
};
