import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

const Profile = () => {
  const [filename, setFileName] = useState(null);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    fetchImage();
    
  });

  async function fetchImage() {
    try {
      
      const fullName = localStorage.getItem('ImageName');
      if (fullName) {
        const response = await fetch(`http://mobile.backend.alphasconsulting.com/image/${fullName}`);
        if (response.ok) {
          setImageURL(response.url);
        } else {
          console.error('Error fetching image:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  const upload = async () => {
    try {
      if (filename) {
        const formData = new FormData();
        formData.append('file', filename);
        const fullName = `${filename.name}`;
        localStorage.setItem("ImageName", fullName);

        const uploadResponse = await fetch('http://mobile.backend.alphasconsulting.com/image', {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          console.log("Image saved successfully");
          await fetchImage();
        } else {
          console.error('Upload failed:', uploadResponse.statusText);
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className='profile'>
      <h1>Name: {JSON.parse(localStorage.getItem("user")).name}</h1>
      <h1>Email: {JSON.parse(localStorage.getItem("user")).email}</h1>
      <div className='profile-dev'>
        <img className='image-profileSmall'  src={imageURL} alt="" />
        <input type="file" onChange={(e) => setFileName(e.target.files[0])}/>
        <button className='btn-imag' type="button" onClick={upload}>Upload</button>
      </div>
      <ImageUpload imageURL={imageURL}/>
    </div>
    
  );
};

export default Profile;
