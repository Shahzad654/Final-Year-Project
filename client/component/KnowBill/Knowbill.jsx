import React, { useState } from "react";
import "./knowbill.css";
import { getBase64 } from "./Imagehelper";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "antd";

const Knowbill = () => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyC7wutVlGWr46lNH4mssMNQDDKJMpMoBis"
  );

  const [image, setImage] = useState("");
  const [imageInlineData, setImageInlineData] = useState("");
  const [aiResponse, setResponse] = useState("");
  const [loading, setLoading] = useState("");

  const handleSpeak = () => {
    speakResponse(aiResponse);
  };

  const speakResponse = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  async function aiImageRun() {
    setLoading(true);
    setResponse("");
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([
      "what's the due date and the correct payable within due date amount in photo?",
      imageInlineData,
    ]);

    const response = await result.response;
    const text = response.text();
    setResponse(text);
    setLoading(false);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        setImage(result);
      })
      .catch((e) => console.log(e));

    fileToGenerativePart(file).then((image) => {
      setImageInlineData(image);
    });
  };

  async function fileToGenerativePart(file) {
    const base64EncodeDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });

    return {
      inlineData: { data: await base64EncodeDataPromise, mimeType: file.type },
    };
  }

  const handleImageClick = () => {
    aiImageRun();
  };

  return (
    <>
      <div>
        <div>
          <input type="file" onChange={(e) => handleImageChange(e)} />
          <Button
            type="dashed"
            style={{ marginLeft: "20px" }}
            onClick={() => handleImageClick()}
          >
            Search
          </Button>

          <Button
            type="primary"
            style={{ marginLeft: "20px" }}
            onClick={() => handleSpeak()}
            // disabled={!aiResponse}
          >
            Speak
          </Button>
        </div>
        <img src={image} alt="" style={{ width: "30%" }} />
        {loading == true && aiResponse == "" ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p>{aiResponse}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Knowbill;
