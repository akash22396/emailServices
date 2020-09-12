import React from 'react';
/************* Stylesheet ****************/
import './styles/index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
/**************** Components**************** */
import SendEmail from './pages/SendEmail';

function App() {
  return (
    <>
      <SendEmail />
    </>
  );
}

export default App;
