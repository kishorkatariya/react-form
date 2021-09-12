import React from 'react';
import ReactDOM from 'react-dom';
import './scss/app.scss'
import App from './routes/Routes';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './Reducer/empreducer';


ReactDOM.render(
  
  <React.StrictMode>
      <StateProvider initialState={initialState}
        reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  
 document.getElementById('root')

);