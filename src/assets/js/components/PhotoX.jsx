import React from 'react';
import { hot } from 'react-hot-loader';

function PhotoX(props) {
    const {photo} = props;
    return (
        <li className="photo">
            <h4>{photo.title}</h4>
            <img src={photo.thumbnailUrl} />
        </li>
    );
}

export default hot(module)(PhotoX);