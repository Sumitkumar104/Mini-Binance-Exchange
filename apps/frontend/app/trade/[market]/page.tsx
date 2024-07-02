"use client";
import { MarketBar } from "@/app/components/MarketBar";
import { SwapUI } from "@/app/components/SwapUI";
import { TradeView } from "@/app/components/TradeView";
import { Depth } from "@/app/components/depth/Depth";
import { useParams } from "next/navigation";


// this is the main page for trading, it contains the market bar, trade view, depth chart and buy and sell corner
// take the Market as input from the URL or as a prop
export default function Page() {
    const { market } = useParams();     // tell the trade type from the URL i.e /trade/ETH-USDT , sol-btc

    return <div className="flex flex-row flex-1">
        
        {/* Market bar, chart view and trade, ask and bid list*/}
        <div className="flex flex-col flex-1">

            <MarketBar market={market as string} />
                
                {/* Trade view and depth chart */}
            <div className="flex flex-row h-[620px] border-y border-slate-800">
                <div className="flex flex-col flex-1">
                    <TradeView market={market as string} />
                </div>
                <div className="w-[1px] flex-col border-slate-800 border-l"></div>
                <div className="flex flex-col w-[250px] overflow-hidden">
                    <Depth market={market as string} />
                </div>
            </div>

        </div>

        <div className="w-[1px] flex-col border-slate-800 border-l"></div>
        
        {/* Buy and sell corner */}
        <div>
            <div className="flex flex-col w-[250px]">
                <SwapUI market={market as string} />
            </div>
        </div>

    </div>
}