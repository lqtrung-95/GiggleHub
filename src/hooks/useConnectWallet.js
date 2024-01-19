import { getEthereumObject } from '../utils/helpers';

export const useConnectWallet = ({ setCurrentAccount }) => {
    const connectWallet = async () => {
        try {
            const ethereum = getEthereumObject();
            if (!ethereum) {
                alert('Get MetaMask!');
                return;
            }

            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });

            console.log('Connected', accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error(error);
        }
    };

    return { connectWallet };
};
