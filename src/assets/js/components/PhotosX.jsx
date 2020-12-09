import React from 'react';
import { hot } from 'react-hot-loader';

import ButtonX from './ButtonX';
import PhotoX from './PhotoX'

function PhotosX(props) {
    const photos = props.photos;
    console.log(photos);
    return (
        <div>
            <h3>React Photos</h3>
            <ButtonX />
            <ul className="photos">
                {photos.map((photo) => (
                    <PhotoX key={photo.id} photo={photo}/>
                ))}
            </ul>
        </div>
     );
}

export default hot(module)(PhotosX);