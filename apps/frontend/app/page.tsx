import Image from "next/image";
import Link from 'next/link';
import { SuccessButton } from "./components/core/Button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Link href="/trade/SOL_USDC">
        <SuccessButton > Solana (SOL_USDC)</SuccessButton>
      </Link>
      <br />
      <br />
      <Link href="/trade/BTC_USDC">
        <SuccessButton >Bitcoin (BTC_USDC)</SuccessButton>
      </Link>
      <br />
      <br />
      <Link href="/trade/ETH_USDC">
        <SuccessButton >Ethereum (ETH_USDC)</SuccessButton>
      </Link>
      <br />
      <br />
      <Link href="/trade/UNI_USDC">
        <SuccessButton >Uniswap (UNI_USDC)</SuccessButton>
      </Link>
      <br />
      <br />
      <Link href="/trade/MATIC_USDC">
        <SuccessButton >polygon (MATIC_USDC)</SuccessButton>
      </Link>
    </main>
  );
}
