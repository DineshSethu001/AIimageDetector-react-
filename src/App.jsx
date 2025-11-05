import React, { useEffect, useRef, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

function App() {
  const [image, setImage] = useState(
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"
  );
  const [objects, setObjects] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const imgRef = useRef();
  const modelRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      modelRef.current = await cocoSsd.load();
      detectObjects();
    };
    loadModel();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setObjects([]);
    setTimeout(() => detectObjects(), 500);
  };

  const detectObjects = async () => {
    if (!modelRef.current) return;
    setIsDetecting(true);
    const predictions = await modelRef.current.detect(imgRef.current);
    setObjects(predictions);
    setIsDetecting(false);
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">🧠 AI Image Object Detector</h1>

      {/* input box */}


<div className="border-2 border-[#63A361] px-4 py-2 flex flex-col sm:flex-row sm:w-1/2 items-center justify-center gap-3 rounded-lg mx-auto">
  <button
    onClick={() => document.getElementById("imageInput").click()}
    className="bg-[#658C58] px-4 py-2 rounded-lg hover:bg-[#31694E] text-[#F5E5E1] font-bold hover:text-[#BBC863] cursor-pointer transition-all duration-300 w-full "
  >
    Upload Image
  </button>
</div>


      {/* img */}
      <div className="mt-6 flex gap-3 justify-center">

        <img
          ref={imgRef}
          src={image}
          alt="Uploaded or Default"
          className="w-80 rounded shadow-lg"
          onLoad={detectObjects}
        />



        <div className="mt-4 text-left px-4 py-5 border border-blue-400 rounded-lg bg-blue-50 shadow-md w-80">
          {isDetecting ? (
            <p className="text-gray-500 text-center">Detecting objects...</p>
          ) : objects.length > 0 ? (
            <ul className="text-left w-full sm:96 space-y-3">
              {objects.map((obj, index) => (
                <li key={index} className="">
                   <div className="flex justify-between items-center mb-1">
        <strong className="text-[#31694E] capitalize">{obj.class}</strong>
        <span className="text-sm text-gray-600 font-medium">
          {(obj.score * 100).toFixed(2)}%
        </span>
      </div>

      {/* Progress bar */}
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
            <p className="text-gray-500 text-center">Upload an Image to Detect an image</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
