import React, { useState } from 'react';

export default function TextForm(props) { 
  const [text, setText] = useState("");
  const [previousText, setPreviousText] = useState("");

  const handleUpClick = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted to uppercase!", "success");
  };

  const handleLowClick = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted to lowercase!", "success");
  };

  const handleToClear = () => {
    setPreviousText(text);
    setText('');
    props.showAlert("Text cleared!", "warning");
  };

  const handleUndoClear = () => {
    setText(previousText);
    props.showAlert("Undo successful!", "info");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text copied to clipboard!", "success");
  };

  const handleRemoveExtraSpaces = () => {
    setText(text.split(/[ ]+/).join(" "));
    props.showAlert("Extra spaces removed!", "success");
  };

  return (
    <>
      <div className="container" 
        style={{
          color: props.mode === 'dark' ? 'white' : 'black', 
          backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', 
          padding: "20px", 
          borderRadius: "5px"
        }}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <label htmlFor="myBox" className="form-label">Example textarea</label>
          <textarea className="form-control" 
            style={{ backgroundColor: props.mode === 'dark' ? 'black' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} 
            value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
        </div>

        {/* Button Container with Fixed Widths to Prevent Layout Shift */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <button className="btn btn-primary" style={{ minWidth: "180px" }} onClick={handleUpClick}>Convert to Uppercase</button>
          <button className="btn btn-primary" style={{ minWidth: "180px" }} onClick={handleLowClick}>Convert to Lowercase</button>
          <button className="btn btn-primary" style={{ minWidth: "180px" }} onClick={handleToClear}>Clear the text</button>
          <button 
            className="btn btn-primary" 
            style={{ minWidth: "180px", opacity: previousText ? "1" : "0.5", pointerEvents: previousText ? "auto" : "none" }} 
            onClick={handleUndoClear}
          >
            Undo Clear
          </button>
          <button className="btn btn-primary" style={{ minWidth: "180px" }} onClick={handleCopy}>Copy the Text</button>
          <button className="btn btn-primary" style={{ minWidth: "180px" }} onClick={handleRemoveExtraSpaces}>Remove Extra Spaces</button>
        </div>
      </div>

      <div className="container my-2" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
        <h2>Your text summary</h2>
        <p>{text.split(/\s+/).filter(word => word.length !== 0).length} words and {text.length} characters</p>
        <p>{0.008 * text.split(/\s+/).filter(word => word.length !== 0).length} Minutes read</p>
        <h2>Preview</h2>
        <p>{text}</p>
      </div>
    </>
  );
}
