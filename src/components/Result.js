import React from 'react';
import staticData from '../utils/staticData';

export default function Result() {
    return (
        <>
            <h1>{staticData['main-section'].heading}</h1>
            <h3>{staticData['main-section'].description}</h3>
            <h3>Result</h3>

        </>
    )
}