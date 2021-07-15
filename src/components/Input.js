import React from "react";
import TextInput from "./TextInput";
import ImageInput from "./ImageInput";
import { Helper } from "./scripts/paramInit";

function Input() {
  // get all relevant URL parameters and pass them down
  const helper = new Helper();
  const type = helper.initializeParam("type", "text");
  const sampleText = helper.initializeParam(
    "sampleText",
    "I absolutely loved the product! All of the new features are amazing!"
  );
  const sampleImage = helper.initializeParam(
    "sampleImage",
    "https://upload.wikimedia.org/wikipedia/commons/2/27/Finnish_Spitz_600.jpg"
  );

  // conditional rendering depending on type
  if (type === "img") {
    return (
      <>
        <ImageInput sampleImage={sampleImage}></ImageInput>
      </>
    );
  } else {
    return (
      <>
        <TextInput sampleText={sampleText}></TextInput>
      </>
    );
  }
}

export default Input;
