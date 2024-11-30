import React, { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetProps {
  symbol?: string;
  theme?: 'light' | 'dark';
}

function TradingViewWidget({ symbol = 'BITSTAMP:BTCUSD', theme = 'dark' }: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: "1",
      timezone: "Etc/UTC",
      theme: theme,
      style: "2",
      locale: "en",
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      details: true,
      hotlist: true,
      calendar: false,
      studies: [
        "STD;EMA"
      ],
      support_host: "https://www.tradingview.com"
    });

    if (container.current) {
      container.current.appendChild(script);
    }

    return () => {
      if (container.current) {
        const scripts = container.current.getElementsByTagName('script');
        if (scripts.length > 0) {
          container.current.removeChild(scripts[0]);
        }
      }
    };
  }, [symbol, theme]);

  return (
    <div className="tradingview-widget-container h-full w-full" ref={container}>
      <div className="tradingview-widget-container__widget h-[calc(100%-32px)] w-full"></div>
      <div className="tradingview-widget-copyright">
        <a 
          href="https://www.tradingview.com/" 
          rel="noopener noreferrer" 
          target="_blank"
          className="text-blue-500 hover:text-blue-600"
        >
          Track all markets on TradingView
        </a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);