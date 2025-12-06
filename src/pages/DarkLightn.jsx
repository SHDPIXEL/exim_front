import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function DarkLightn() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.className = darkMode ? 'bg-light text-dark' : 'bg-dark text-light';
  };

  const [fontSize, setFontSize] = useState(16);  // Default font size

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 30));  // Max limit
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 12));  // Min limit
  };

  const resetFontSize = () => {
    setFontSize(16);  // Reset to default
  };

  return (
    <>
    <Container className="py-5">
      <h1>{darkMode ? 'Dark Mode' : 'Light Mode'}</h1>
      <Button variant={darkMode ? 'light' : 'dark'} onClick={toggleTheme}>
        Switch to {darkMode ? 'Light' : 'Dark'} Mode
      </Button>
    </Container>
     <Container className="py-5">
     <div style={{ fontSize: `${fontSize}px` }}>
       <h1>Adjustable Font Size</h1>
       <p>
         This is an example of how to adjust font size dynamically. Click the buttons below to change the text size.
       </p>
     </div>

     <div className="mt-3">
       <Button variant="secondary" onClick={decreaseFontSize} className="mx-2">
         A-
       </Button>
       <Button variant="secondary" onClick={resetFontSize} className="mx-2">
         A
       </Button>
       <Button variant="secondary" onClick={increaseFontSize} className="mx-2">
         A+
       </Button>
     </div>
   </Container>
   </>
  );
}

export default DarkLightn;
