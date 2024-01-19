// utils/helpers.js
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../constants';

export const getEthereumObject = () => window.ethereum;

export const findMetaMaskAccount = async () => {
    try {
        const ethereum = getEthereumObject();

        if (!ethereum) {
            console.error('Make sure you have Metamask!');
            return null;
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log('Found an authorized account:', account);
            return account;
        } else {
            console.error('No authorized account found');
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getAllWaves = async () => {
    const ethereum = getEthereumObject();

    try {
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const wavePortalContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                CONTRACT_ABI,
                signer
            );
            const waves = await wavePortalContract.getAllWaves();

            const wavesCleaned = waves.map((wave) => {
                return {
                    address: wave.waver,
                    timestamp: new Date(wave.timestamp * 1000),
                    message: wave.message,
                };
            });

            return wavesCleaned;
        } else {
            console.log("Ethereum object doesn't exist!");
        }
    } catch (error) {
        console.log(error);
    }
};
