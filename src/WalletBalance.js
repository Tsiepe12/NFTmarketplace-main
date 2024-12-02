import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';

const WalletBalance = () => {
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            if (publicKey) {
                try {
                    console.log('Fetching balance for:', publicKey.toString());
                    const connection = new Connection('https://api.mainnet-beta.solana.com');
                    const balance = await connection.getBalance(new PublicKey(publicKey.toString()));
                    console.log('Raw balance in lamports:', balance);
                    setBalance(balance / 1e9); // Convert lamports to SOL
                } catch (error) {
                    console.error('Error fetching balance:', error);
                }
            }
        };

        fetchBalance();
    }, [publicKey]);

    return (
        <div className="text-white">
            {publicKey && <p>Account: {publicKey.toString()}</p>}
            {balance !== null && <p>Balance: {balance} SOL</p>}
        </div>
    );
};

export default WalletBalance;
