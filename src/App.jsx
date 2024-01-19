// App.js
import React, { useState } from 'react';

import './App.css';
import {
    Bio,
    ConnectWalletButton,
    Header,
    WaveButton,
    WaveDisplay,
    WaveInput,
} from './components';
import {
    useConnectWallet,
    useFindAccount,
    useListenNewWave,
    useWave,
} from './hooks';
import { findMetaMaskAccount } from './utils/helpers';

const App = () => {
    const [message, setMessage] = useState('');
    const [currentAccount, setCurrentAccount] = useState('');
    const [loading, setLoading] = useState(false);

    useFindAccount({ findMetaMaskAccount, setCurrentAccount });
    const { waves } = useListenNewWave(currentAccount);
    const { wave } = useWave({ setLoading, setMessage });
    const { connectWallet } = useConnectWallet({ setCurrentAccount });

    return (
        <div className='mainContainer'>
            <div className='dataContainer'>
                <Header />

                <Bio />

                {currentAccount ? (
                    <>
                        <WaveInput message={message} setMessage={setMessage} />
                        <WaveButton
                            wave={() => wave(message)}
                            loading={loading}
                        />
                    </>
                ) : (
                    <ConnectWalletButton connectWallet={connectWallet} />
                )}

                <WaveDisplay allWaves={waves} />
            </div>
        </div>
    );
};

export default App;
