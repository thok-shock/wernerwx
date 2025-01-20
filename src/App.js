import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Blob from './Blob';
import BlobGenerator from './BlobGenerator';


function App() {


  return (
    <div className="App">
      <div className='lightbox'>
        <BlobGenerator />
      </div>
      <p>hello world</p>
    </div>
  );
}

export default App;
