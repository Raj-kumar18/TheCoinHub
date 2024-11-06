import { numberWithCommas } from '@/components/Banner'
import CoinInfo from '@/components/CoinInfo'
import { SingleCoin } from '@/config/api'
import { CryptoState } from '@/contexts'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner';

const Coins = () => {
  const params = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = CryptoState();

  const fetchSingleCoin = async () => {
    const { data } = await axios.get(SingleCoin(params.id));
    setCoin(data);
  };

  useEffect(() => {
    fetchSingleCoin();
  }, [currency, params.id]);

  if (!coin) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950">
        <TailSpin visible={true} height="80" width="80" color="orange" ariaLabel="tail-spin-loading" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      {/* Background grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] mask-image-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Main content container */}
      <div className="relative flex flex-col md:flex-row items-center md:items-start p-6 md:p-12">
        {/* Sidebar for coin info */}
        <div className="sidebar flex flex-col items-center md:items-start w-full md:w-1/3 border-b-2 md:border-b-0 md:border-r-2 border-slate-800 mb-6 md:mb-0">
          <img
            src={coin?.image.large}
            alt={coin?.name}
            className="w-40 h-40 md:w-52 md:h-52 object-contain mb-6"
          />
          <h3 className="text-3xl font-semibold mb-4 text-center md:text-left">{coin?.name}</h3>
          <p className="text-sm md:text-base text-gray-300 mb-4 text-center md:text-left">
            {coin?.description.en.split(". ")[0]}
          </p>
          <div className="marketData text-sm md:text-base text-white space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Rank:</span>
              <span>{coin?.market_cap_rank}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Current Price:</span>
              <span>
                {symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Market Cap:</span>
              <span>
                {symbol} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
              </span>
            </div>
          </div>
        </div>

        {/* CoinInfo component */}
        <div className="w-full md:w-2/3 mt-8 md:mt-0 md:pl-8">
          <CoinInfo coin={coin} />
        </div>
      </div>
    </div>
  );
};

export default Coins;
