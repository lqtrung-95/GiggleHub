// WaveInput.js
import React from 'react';

const WaveInput = ({ message, setMessage }) => {
    return (
        <input
            className='input'
            placeholder='Spread joy with your words here 🫶🏻'
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
    );
};

export { WaveInput };
