import React, { useState } from 'react'
import CreateTradeForm, { TradeFormData } from '../components/CreateTradeForm'
import TradingViewWidget from '../components/TradingViewWidget'
import { useAccount } from 'wagmi'

const Trade: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState('BTC')
  const { isConnected } = useAccount()

  const handleCreateTrade = (formData: TradeFormData) => {
    console.log('Creating trade with data:', formData)
    // TODO: Implement contract interaction
  }

  const getSymbolForAsset = (asset: string): string => {
    const symbols: Record<string, string> = {
      'BTC': 'BITSTAMP:BTCUSD',
      'ETH': 'BITSTAMP:ETHUSD',
      'MATIC': 'BINANCE:MATICUSDT'
    }
    return symbols[asset] || symbols['BTC']
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Create New Trade</h2>
        <CreateTradeForm 
          onSubmit={handleCreateTrade}
          onAssetChange={(asset) => setSelectedAsset(asset)}
        />
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Price Chart</h2>
        <div className="card h-[600px] p-0 overflow-hidden">
          <TradingViewWidget 
            symbol={getSymbolForAsset(selectedAsset)}
            theme="dark"
          />
        </div>
      </div>
    </div>
  )
}

export default Trade