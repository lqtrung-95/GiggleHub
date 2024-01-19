// WaveButton.js
import React from 'react';

const WaveButton = ({ wave, loading }) => {
    return (
        <button
            className='waveButton centerButton'
            onClick={wave}
            disabled={loading}
        >
            {loading ? 'Mining...' : 'Give Me a Giggleeee'}
        </button>
    );
};
export { WaveButton };
