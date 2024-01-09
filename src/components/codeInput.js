import React, { useState } from 'react';

const CodeInput = ({ length, onChange }) => {
  const [codes, setCodes] = useState(Array(length).fill(''));

  const handleChange = (e, index) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && inputValue.length <= 1) {
      const newCodes = [...codes];
      newCodes[index] = inputValue;
      setCodes(newCodes);
      onChange(newCodes.join(''));
    }
  };

  const container = {
    margin: 'auto', // Center the container horizontally
    display: 'flex',
    alignItems: 'center', // Center the container vertically
  };

  const inputStyle = {
    width: '40px',
    marginRight: '5px',
  };

  return (
    <div style={container} className="d-flex mt-4 justify-content-center">
      {codes.map((code, index) => (
        <input
          key={index}
          type="text"
          className="form-control text-center"
          style={inputStyle}
          value={code}
          onChange={(e) => handleChange(e, index)}
        />
      ))}
    </div>
  );
};

export default CodeInput;
