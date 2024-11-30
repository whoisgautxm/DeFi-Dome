import React from 'react'
import { Link } from 'react-router-dom'
import { FaChartLine, FaHandshake, FaTrophy } from 'react-icons/fa'

const features = [
  {
    icon: <FaChartLine className="h-6 w-6" />,
    title: 'Price Predictions',
    description: 'Bet on cryptocurrency price movements within specified timeframes.',
  },
  {
    icon: <FaHandshake className="h-6 w-6" />,
    title: '1v1 Trading',
    description: 'Challenge other traders directly in price prediction battles.',
  },
  {
    icon: <FaTrophy className="h-6 w-6" />,
    title: 'Win Rewards',
    description: 'Earn rewards for successful predictions and climbing the leaderboard.',
  },
]

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Decentralized Crypto Price Prediction Platform
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Challenge other traders in 1v1 price prediction battles and win rewards
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/trade" className="btn-primary">
            Start Trading
          </Link>
          <Link to="/dashboard" className="btn-secondary">
            View Dashboard
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="flex justify-center mb-4 text-blue-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white rounded-xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
        <p className="mb-8 text-lg">
          Connect your wallet and start making predictions today
        </p>
        <Link to="/trade" className="bg-white text-blue-600 btn-primary">
          Launch App
        </Link>
      </section>
    </div>
  )
}

export default Home