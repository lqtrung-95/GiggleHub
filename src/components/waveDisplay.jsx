// WaveDisplay.js
import React from 'react';

const WaveDisplay = ({ allWaves }) => {
    return (
        <div className='messageListContainer'>
            <div>
                {allWaves.map((wave, index) => (
                    <div key={index} className='messageItem'>
                        <div className='address'>👤 {wave.address}</div>
                        <div className='timestamp'>
                            🕒 {wave.timestamp.toString()}
                        </div>
                        <div className='messageContent'>💬 {wave.message}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { WaveDisplay };
