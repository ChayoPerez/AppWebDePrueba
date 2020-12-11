import React from 'react';
import { hot } from 'react-hot-loader';

export default function ParamApp(props) {
    return (
        <div>{props.data.x}</div>
        );
    }

export default hot(module)(ParamApp);
