import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../constants';
import { getEthereumObject } from '../utils/helpers';
import { ethers } from 'ethers';

export const useWave = ({ setLoading, setMessage }) => {
    const wave = async (message) => {
        console.log('test wave');
        try {
            setLoading(true);

            const ethereum = getEthereumObject();

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    CONTRACT_ABI,
                    signer
                );

                let count = await wavePortalContract.getTotalWaves();
                console.log('Retrieved total wave count...', count.toNumber());

                const waveTxn = await wavePortalContract.wave(message, {
                    gasLimit: 300000,
                });
                console.log('Mining...', waveTxn.hash);

                await waveTxn.wait();
                console.log('Mined -- ', waveTxn.hash);

                count = await wavePortalContract.getTotalWaves();
                console.log('Retrieved total wave count...', count.toNumber());
                setMessage('');
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return { wave };
};
