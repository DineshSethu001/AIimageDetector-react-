// Importing React hooks
import React, { useEffect, useRef, useState } from "react";

// Importing the COCO-SSD pre-trained object detection model
import * as cocoSsd from "@tensorflow-models/coco-ssd";

// Import TensorFlow.js to run the model in the browser
import "@tensorflow/tfjs";

function App() {
  // Store the selected or default image
  const [image, setImage] = useState(
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"
  );

  // Store detected objects returned by the model
  const [objects, setObjects] = useState([]);

  // Track whether the model is currently detecting
  const [isDetecting, setIsDetecting] = useState(false);

  // Reference to the <img> element (to detect objects on it)
  const imgRef = useRef();

  // Store the loaded model globally to avoid reloading every time
  const modelRef = useRef(null);

  // Load the model once when the app starts
  useEffect(() => {
    const loadModel = async () => {
      modelRef.current = await cocoSsd.load(); // Load pre-trained model
      detectObjects(); // Run detection on default image
    };
    loadModel();
  }, []);

  // Handle file upload from user
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return; // Stop if no file is selected

    const imageUrl = URL.createObjectURL(file); // Create a temporary URL
    setImage(imageUrl); // Set new image to preview
    setObjects([]); // Clear previous detections

    // Give a small delay for the image to load before detection
    setTimeout(() => detectObjects(), 500);
  };

  // Run object detection using the loaded model
  const detectObjects = async () => {
    if (!modelRef.current) return; // Wait until model is loaded
    setIsDetecting(true); // Show loading state
    const predictions = await modelRef.current.detect(imgRef.current); // Detect objects
    setObjects(predictions); // Save detection results
    setIsDetecting(false); // Stop loading state
  };

  return (
    <div className="p-8 text-center">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">🧠 AI Image Object Detector</h1>

      {/* Upload Section */}
      <div className="border-2 border-[#63A361] px-4 py-2 flex flex-col sm:flex-row sm:w-1/2 items-center justify-center gap-3 rounded-lg mx-auto">
        <button
          // Trigger hidden file input when button is clicked
          onClick={() => document.getElementById("imageInput").click()}
          className="bg-[#658C58] px-4 py-2 rounded-lg hover:bg-[#31694E] text-[#F5E5E1] font-bold hover:text-[#BBC863] cursor-pointer transition-all duration-300 w-full"
        >
          Upload Image
        </button>

        {/* Hidden input field to actually upload the image */}
        <input
          type="file"
          accept="image/*"
          id="imageInput"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Image Preview + Detection Results */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        {/* Uploaded or Default Image */}
        <img
          ref={imgRef}
          src={image}
          alt="Uploaded or Default"
          className="w-80 rounded shadow-lg"
          onLoad={detectObjects} // Auto-detect when image loads
        />

        {/* Object Detection Result Box */}
        <div className="mt-4 text-left px-4 py-5 border border-blue-400 rounded-lg bg-blue-50 shadow-md w-80">
          {/* If model is detecting */}
          {isDetecting ? (
            <p className="text-gray-500 text-center">Detecting objects...</p>
          ) : objects.length > 0 ? (
            // If detections found
            <ul className="text-left w-full sm:96 space-y-3">
              {objects.map((obj, index) => (
                <li key={index}>
                  {/* Object label + confidence score */}
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-[#31694E] capitalize">{obj.class}</strong>
                    <span className="text-sm text-gray-600 font-medium">
                      {(obj.score * 100).toFixed(2)}%
                    </span>
                  </div>

                  {/* Confidence Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-[#63A361] h-3 rounded-full transition-all duration-500"
                      style={{ width: `${obj.score * 100}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            // If no objects yet
            <p className="text-gray-500 text-center">
              Upload an Image to Detect Objects
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
