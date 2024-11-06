import React, { useEffect } from 'react'
import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { CryptoState } from '@/contexts'
import axios from 'axios'
import { TrendingCoins } from '@/config/api'
import { Link } from 'react-router-dom'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Banner = () => {
  const [trending,setTrending] = useState([])
  const {currency,symbol} = CryptoState()

  const fetchTrendingCoin = async()=>{
    const {data} = await axios.get(TrendingCoins(currency))
    setTrending(data)
  }
  useEffect(()=>{
    fetchTrendingCoin()
  },[currency])

  return (
    <div className="banner bg-[url('/banner2.jpg')] h-[55vh] w-full bg-center bg-no-repeat bg-cover flex items-center justify-center flex-col bg-fixed relative">
    {/* Centered Banner Text */}
    <div className="absolute top-1/4 text-white w-full text-center py-15">
      <h1 className="text-4xl md:text-5xl font-extrabold p-2">TheCoinHub</h1>
      <p className="text-slate-300 py-2 text-sm md:text-lg">
        Get all the Info regarding your favorite Crypto Currency
      </p>
    </div>
  
    {/* Carousel with Adjusted Height */}
    <Carousel
      className="w-full max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto mt-[25vh]"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="flex justify-center gap-4">
        {trending.map((coin, index) => {
          const profit = coin.price_change_percentage_24h >= 0;
          return (
            <CarouselItem
              key={coin.id || index}
              className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 max-w-[180px] p-2"
            >
              <Card className="bg-transparent shadow-none border-none">
                <CardContent className="flex flex-col items-center text-center p-3">
                  <Link to={`/coins/${coin.id}`} className="flex flex-col items-center">
                    {/* Larger Image */}
                    <img src={coin.image} alt={coin.name} className="w-16 h-16 mb-2" />
                    <span className="text-sm sm:text-lg font-semibold text-white">
                      {coin.symbol.toUpperCase()}
                      &nbsp;
                      <span className={`text-xs sm:text-sm ${profit ? "text-green-500" : "text-red-500"}`}>
                        {profit && "+"}
                        {coin.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </span>
                    <span className="text-sm sm:text-md font-medium text-white">
                      {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                    </span>
                  </Link>
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  </div>
  
  )
}

export default Banner