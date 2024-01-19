// ConnectWalletButton.js
import React from 'react';

const ConnectWalletButton = ({ connectWallet }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'lightslategray', marginBottom: '16px' }}>
                Please connect a wallet to spread your joys 🪄
            </div>
            <button className='waveButton' onClick={connectWallet}>
                Connect Wallet
            </button>
        </div>
    );
};

export { ConnectWalletButton };
