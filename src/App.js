import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/textform';
import Alert from './components/Alert';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    const [mode, setMode] = useState('light');
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({ msg: message, type: type });
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    };

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = '#042743';
            showAlert("Dark mode has been enabled", "success");
        } else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
            showAlert("Light mode has been enabled", "success");
        }
    };

    return (
        <Router>
            <Navbar title="TextUtils" aboutText="About TextUtils" mode={mode} toggleMode={toggleMode} />
            <div className="fixed-alert-container">
                <Alert alert={alert} />
            </div>
            <div className="container my-3">
                <Routes>
                    <Route path="/about" element={<About mode={mode} />} />
                    <Route path="/" element={<TextForm showAlert={showAlert} heading="Enter the text to analyze below" mode={mode} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
