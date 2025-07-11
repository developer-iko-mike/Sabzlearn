import React from 'react';
import ReactDOM from 'react-dom/client';
import './Components/reset.css'
import './Components/MyBootsrap.css';
// import './Components/fontBootstarp.css';
import './Components/index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './Pages/App.jsx';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// cd f/B-VSCode/project/Sabzlearn/frontEnd
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
