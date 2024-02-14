import React, { useState } from 'react';
import xml2js from 'xml2js';

const XmlToJsonConverter = () => {
  const [xmlData, setXmlData] = useState('');
  const [jsonData, setJsonData] = useState(null);

  const handleXmlInputChange = (event) => {
    setXmlData(event.target.value);
  };

  const handleConvertClick = () => {
    // Parse XML to JSON
    xml2js.parseString(xmlData, { explicitArray: false }, (error, result) => {
      if (error) {
        console.error('Error parsing XML:', error);
      } else {
        // Update the state with the resulting JSON
        setJsonData(result);
      }
    });
  };

  return (
    <div>
      <h2>XML to JSON Converter</h2>
      <div style={{ display: 'flex' }}>
        {/* Input XML */}
        <div style={{ flex: 1, marginRight: '20px' }}>
          <strong>Input XML:</strong>
          <textarea
            value={xmlData}
            onChange={handleXmlInputChange}
            rows={10}
            cols={40}
            style={{ width: '100%' }}
          />
          <button onClick={handleConvertClick}>Convert</button>
        </div>

        {/* Display JSON */}
        <div style={{ flex: 1 }}>
          <strong>Converted JSON:</strong>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default XmlToJsonConverter;
