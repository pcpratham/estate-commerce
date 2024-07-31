import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {useRef} from 'react';
import {getStorage,ref, uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import {app} from "../firebase";

function Profile() {
  const {currentUser} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file,setfile] = useState(undefined);
  const [filePer,setFilePer] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);
  console.log(filePer);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);
  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl font-bold text-center my-7'>Profile</h1>

      <form className='flex flex-col gap-4 '>
        <input onChange={(e)=>{setfile(e.target.files[0])}} type='file' ref={fileRef} hidden accept='image/*' />
        <img onClick={()=>fileRef.current.click()} src={currentUser.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 ' />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePer > 0 && filePer < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePer}%`}</span>
          ) : filePer === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input type='text' placeholder='username' id='username' className='border p-3 rounded-lg  ' />
        <input type='text' placeholder='email' id='email' className='border p-3 rounded-lg  ' />
        <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg  '/>
        <button className='bg-slate-700 rounded-lg text-white uppercase p-3 hover:opacity-95 '>Update Details</button>

      </form>
      <div className='flex justify-between mt-5 '>
        <span className='text-red-700 cursor-pointer hover:font-bold transition-all'>Delete Account</span>
        <span className='text-red-700 hover:font-bold transition-all cursor-pointer'>Sign out</span>

      </div>
    </div>
  )
}

export default Profile