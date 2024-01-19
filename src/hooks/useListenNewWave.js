import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import abi from '../utils/WavePortal.json';
import { CONTRACT_ADDRESS } from '../constants';
import { getAllWaves } from '../utils/helpers';

export const useListenNewWave = (currentAccount) => {
    const contractAddress = CONTRACT_ADDRESS;

    /*
     * Create a variable here that references the abi content!
     */
    const contractABI = abi.abi;
    const [waves, setAllWaves] = useState([]);

    useEffect(() => {
        if (currentAccount) {
            const fetchAllWaves = async () => {
                const waves = await getAllWaves();
                setAllWaves(waves);
            };
            fetchAllWaves();
        }
    }, [currentAccount]);

    /**
     * Listen in for emitter events!
     */
    useEffect(() => {
        let wavePortalContract;

        const onNewWave = (from, timestamp, message) => {
            console.log('NewWave', from, timestamp, message);
            setAllWaves((prevState) => [
                ...prevState,
                {
                    address: from,
                    timestamp: new Date(timestamp * 1000),
                    message: message,
                },
            ]);
        };

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            wavePortalContract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            wavePortalContract.on('NewWave', onNewWave);
        }

        return () => {
            if (wavePortalContract) {
                wavePortalContract.off('NewWave', onNewWave);
            }
        };
    }, []);

    return { waves };
};
