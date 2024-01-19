import React, { useEffect } from 'react';

const useFindAccount = ({ findMetaMaskAccount, setCurrentAccount }) => {
    useEffect(() => {
        const fetchData = async () => {
            const account = await findMetaMaskAccount();
            if (account !== null) {
                setCurrentAccount(account);
            }
        };
        fetchData();
    }, []);
};

export { useFindAccount };
