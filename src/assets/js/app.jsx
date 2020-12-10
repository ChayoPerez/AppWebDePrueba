import React from 'react';
import ReactDOM from 'react-dom';
// Componente custom
import App from './components/App';
import PhotosX from './components/PhotosX';
import ParamReact from './components/ParamReact';


const reactAppContainer = document.getElementById('react-app');

if (reactAppContainer) {
  ReactDOM.render(<App />, reactAppContainer);
}


const INITIAL_STATE = [
  {
      albumId: 1,
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952",
  },
  {
      albumId: 1,
      id: 2,
      title: "reprehenderit est deserunt velit ipsam",
      url: "https://via.placeholder.com/600/771796",
      thumbnailUrl: "https://via.placeholder.com/150/771796",
  },
  {
      albumId: 1,
      id: 3,
      title: "officia porro iure quia iusto qui ipsa ut modi",
      url: "https://via.placeholder.com/600/24f355",
      thumbnailUrl: "https://via.placeholder.com/150/24f355",
  },
  ];

 
const reactAppPhotoContainer = document.getElementById('react-photos');

if (reactAppPhotoContainer) {
  ReactDOM.render(<PhotosX photos={INITIAL_STATE} />, reactAppPhotoContainer);
}


const reactAppParamContainer = document.getElementById('react-param');

if (reactAppParamContainer) {
  ReactDOM.render(<ParamReact />, reactAppParamContainer);
}

