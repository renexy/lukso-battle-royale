import { parseUnits, createWalletClient, custom } from 'viem';
import { lukso } from 'viem/chains';
import { createClientUPProvider } from '@lukso/up-provider'

export const sendTransaction = async (recipientAddress: string, amount: number) => {
  const provider = createClientUPProvider();
  
  const client = createWalletClient({
    chain: lukso,
    transport: custom(provider)
  });

  try {
    const accounts = await client.getAddresses();
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found');
    }

    const tx = await client.sendTransaction({
      account: accounts[0],
      to: recipientAddress as `0x${string}`,
      value: parseUnits(amount.toString(), 18),
    });

    const receipt = await provider.request({
      method: 'eth_getTransactionReceipt',
      params: [tx]
    });
    return receipt;
  } catch (err) {
    console.error('Transaction failed:', err);
    throw err;
  }
};