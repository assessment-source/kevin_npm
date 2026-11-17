import { useCallback, useSyncExternalStore } from 'react';
import { ethers } from 'ethers';

const listeners = new Set();
let snapshot = {
  walletAddress: '',
  balance: '',
  network: '',
  error: '',
};

function emit(partial) {
  snapshot = { ...snapshot, ...partial };
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

export function shortAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

async function readWallet(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const balanceWei = await provider.getBalance(address);
  const net = await provider.getNetwork();
  emit({
    walletAddress: address,
    balance: Number(ethers.utils.formatEther(balanceWei)).toFixed(4),
    network: String(net.chainId),
    error: '',
  });
}

if (typeof window !== 'undefined' && window.ethereum) {
  window.ethereum
    .request({ method: 'eth_accounts' })
    .then((accounts) => {
      if (accounts[0]) return readWallet(accounts[0]);
      return null;
    })
    .catch(() => {});

  window.ethereum.on?.('accountsChanged', (accounts) => {
    if (!accounts[0]) {
      emit({ walletAddress: '', balance: '', network: '', error: '' });
      return;
    }
    readWallet(accounts[0]);
  });
}

export function useWallet() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const connectWallet = useCallback(async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      emit({ error: 'Install a browser wallet such as MetaMask, then try again.' });
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await readWallet(accounts[0]);
    } catch (err) {
      emit({ error: err && err.message ? err.message : 'Wallet connection was cancelled.' });
    }
  }, []);

  return {
    ...state,
    connectWallet,
    shortAddress: shortAddress(state.walletAddress),
  };
}
