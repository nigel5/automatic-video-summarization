import React from 'react';
import { Fragment } from 'react';
import uploadImage from '../media/upload.png'
// Style the Button component
const FileUploader = props => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {
    const fileUploaded = event.target.files[0].name;
    props.handleFile(fileUploaded);
  };
  return (
    <Fragment>
      <div onClick={handleClick} className="gs-drop">
        <img src={uploadImage}/>
        Upload a file to get started!
      </div >
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{display: 'none'}} 
      />
      </Fragment>
  )
}
export default FileUploader;