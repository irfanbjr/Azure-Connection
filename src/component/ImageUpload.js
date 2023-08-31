 import React  from 'react';
function ImageUpload(props) {
     return (
      <div style={{ color: 'blue', overflowY: 'auto' }} className='mainImage-div' >
        <img className='image-profile' src={props.imageURL} alt="" />
      </div>
    )
}

export default ImageUpload;
