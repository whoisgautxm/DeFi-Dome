import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAccount } from 'wagmi'

interface CreateTradeFormProps {
  onSubmit: (data: TradeFormData) => void
  onAssetChange?: (asset: string) => void
}

export interface TradeFormData {
  asset: string
  amount: number
  direction: 'up' | 'down'
  duration: number
}

const SUPPORTED_ASSETS = [
  { id: 'BTC', name: 'Bitcoin' },
  { id: 'ETH', name: 'Ethereum' },
  { id: 'MATIC', name: 'Polygon' },
]

const DURATIONS = [
  { value: 5, label: '5 minutes' },
  { value: 15, label: '15 minutes' },
  { value: 60, label: '1 hour' },
]

const CreateTradeForm: React.FC<CreateTradeFormProps> = ({ onSubmit, onAssetChange }) => {
  const { isConnected } = useAccount()
  const [formData, setFormData] = useState<TradeFormData>({
    asset: 'BTC',
    amount: 100,
    direction: 'up',
    duration: 5,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    if (formData.amount <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    onSubmit(formData)
  }

  const handleAssetChange = (asset: string) => {
    setFormData({ ...formData, asset })
    onAssetChange?.(asset)
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Select Asset</label>
        <select
          className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700"
          value={formData.asset}
          onChange={(e) => handleAssetChange(e.target.value)}
        >
          {SUPPORTED_ASSETS.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {asset.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Amount (USDC)</label>
        <input
          type="number"
          min="0"
          step="1"
          className="w-full p-2 border rounded-lg"
          value={formData.amount}
          onChange={(e) => {
            const value = e.target.value === '' ? 0 : parseInt(e.target.value)
            setFormData({ ...formData, amount: value })
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Prediction</label>
        <div className="flex gap-4">
          <button
            type="button"
            className={`flex-1 p-2 rounded-lg border ${
              formData.direction === 'up'
                ? 'bg-green-500 text-white'
                : 'bg-white dark:bg-gray-700'
            }`}
            onClick={() => setFormData({ ...formData, direction: 'up' })}
          >
            Price Up
          </button>
          <button
            type="button"
            className={`flex-1 p-2 rounded-lg border ${
              formData.direction === 'down'
                ? 'bg-red-500 text-white'
                : 'bg-white dark:bg-gray-700'
            }`}
            onClick={() => setFormData({ ...formData, direction: 'down' })}
          >
            Price Down
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Duration</label>
        <select
          className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
        >
          {DURATIONS.map((duration) => (
            <option key={duration.value} value={duration.value}>
              {duration.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full btn-primary"
        disabled={!isConnected}
      >
        Create Trade
      </button>
    </form>
  )
}

export default CreateTradeForm