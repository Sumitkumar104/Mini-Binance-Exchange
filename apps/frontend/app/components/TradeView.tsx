import { useEffect, useRef } from "react";
import { ChartManager } from "../utils/ChartManager";
import { getKlines } from "../utils/httpClient";
import { KLine } from "../utils/types";

export function TradeView({market}:{ market: string;}) {

  const chartRef = useRef<HTMLDivElement>(null);    // at this place we can also used the getDocumentbyId method to point that div.
  const chartManagerRef = useRef<ChartManager>(null);

  const init = async () => {
    let klineData: KLine[] = [];
    try {

      // make the backend call to get the kline data for the market.
      klineData = await getKlines(market, "1h", Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 30) / 1000), Math.floor(new Date().getTime() / 1000)); 
    } catch (e) { 
      console.error("There is some error to show the Graph View-",e);
    }

    if (chartRef) {
      if (chartManagerRef.current) {
        chartManagerRef.current.destroy();
      }
      const chartManager = new ChartManager(
        chartRef.current,
        [
          ...klineData?.map((x) => ({
            close: parseFloat(x.close),
            high: parseFloat(x.high),
            low: parseFloat(x.low),
            open: parseFloat(x.open),
            timestamp: new Date(x.end), 
          })),
        ].sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)) || [],
        {
          background: "#0e0f14",
          color: "white",
        }
      );
      //@ts-ignore
      chartManagerRef.current = chartManager;
    }
  };

  // this useEffect will be called when the component is mounted(also when we do zoom in , out) and when the market changes.
  useEffect(() => {
      init();
  }, [market, chartRef]);

  return (
    <>
      <div ref={chartRef} style={{ height: "600px", width: "100%", marginTop: 4 }}></div>
    </>
  );
}
