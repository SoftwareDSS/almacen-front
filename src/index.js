import React    from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/tailwind.css';
import App             from './Components/App/App';

const root = ReactDOM.createRoot( document.getElementById( 'root' ));

root.render(

    <React.StrictMode>
        <App />
    </React.StrictMode>

);