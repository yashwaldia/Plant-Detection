import React, { useState, useRef } from 'react';
import axios from 'axios';
import './ImageUploadForm.css'; // Import your CSS file

const ImageUploadForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showResultMessage, setShowResultMessage] = useState(false); // Initialize the variable

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Display the selected image
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setSelectedImage(null);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('images', file);

    try {
      const response = await axios.post(
        'https://plant.id/api/v3/identification',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Api-Key': 'Ej9rB5BJyXeS1uwTdvu9MfJZ9ulm4xv4U3NDcn3zNAtixeIJTX',
          },
        }
      );

      setResult(response.data);

      // Log the entire API response to the console
      console.log(response.data);

      // Determine whether to show the result message
      setShowResultMessage(response.data.result.is_plant.probability < 0.5);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleClickFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="image-upload-form">
      <h2>Plant Identification</h2>
      <div className="input-container">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <label
          className="custom-file-input-label"
          onClick={handleClickFileInput}
        >
          Choose File
        </label>
      </div>
      {selectedImage && (
        <div className="selected-image-container">
          <img
            src={selectedImage}
            alt="Selected"
            className="selected-image"
          />
        </div>
      )}
      <button onClick={handleUpload}>Send Request</button>

      {showResultMessage && (
        <div className="result-container">
          <h3>Identification Result:</h3>
          <p>The Given Image is not a plant</p>
        </div>
      )}

      {result && result.result && result.result.is_plant && result.result.is_plant.probability >= 0.5 && (
        <div className="result-container">
          <h3>Identification Result:</h3>
          <p>Is Plant: Yes</p>
          <p>Species Name 1: {result.result.classification.suggestions[0].name}</p>
          <p>Probability 1: {result.result.classification.suggestions[0].probability}</p>
          <p>Species Name 2: {result.result.classification.suggestions[1].name}</p>
          <p>Probability 2: {result.result.classification.suggestions[1].probability}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
