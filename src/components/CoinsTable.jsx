import { CoinList } from '@/config/api'
import { CryptoState } from '@/contexts'
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { TailSpin } from 'react-loader-spinner';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter, 
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { numberWithCommas } from './Banner';


const CoinsTable = () => {
    const [coin, setCoin] = useState([])
    const [loader, setLoader] = useState(false)
    const [search, setSearch] = useState("")
    const { currency, symbol } = CryptoState()
    const [page, setPage] = useState(1)
    console.log(page)
    const navigate = useNavigate();


    const fetchCoinList = async () => {
        setLoader(true)
        const { data } = await axios.get(CoinList(currency))
        setCoin(data)
        setLoader(false)
    }
    useEffect(() => {
        fetchCoinList()
    }, [currency])


    const handleSearch = () => {
        return coin.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)

        )
    }

    const pageHandleClick=(selectedPage)=>{
        if(
            selectedPage >=1 &&
            selectedPage <= handleSearch().length &&
            selectedPage != page
        )
        setPage(selectedPage)
    }
    return (
        <>
            <div className="relative h-[300vh] w-full bg-slate-950"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <div className="coinTable text-white p-4 absolute flex items-center justify-center flex-col w-full">
                    <h1 className='text-center text-4xl'>Cryptocurrency Prices by Market Cap</h1>
                    <Input type="email" placeholder="Search For a Crypto Currency..."
                        className="bg-transparent text-lg my-4 w-[50%]"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {loader ? (
                        <TailSpin
                            visible={true}
                            height="80"
                            width="80"
                            color="orange"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    ) : (
                        <Table className="w-[100%]">
                            <TableCaption>A list of Coins</TableCaption>
                            <TableHeader className="bg-orange-500 text-black">
                                <TableRow>
                                    <TableHead className="w-[100px] text-black font-bold">Coin</TableHead>
                                    <TableHead className="text-black font-bold">Price</TableHead>
                                    <TableHead className="text-black font-bold">24 Chnage</TableHead>
                                    <TableHead className="text-right text-black font-bold">Market Cap</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {handleSearch()
                                    // .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                    .slice(page * 10 - 10, page * 10)
                                    .map((row) => {
                                        const profit = row.price_change_percentage_24h >= 0;
                                        return (
                                            <TableRow onClick={() => navigate(`/coins/${row.id}`)} key={row.name}>
                                                <TableCell className="font-medium">
                                                    <img src={row?.image} alt={row?.name} height="40" />
                                                    <div className='flex items-center justify-center flex-col'>
                                                        <span className='text-xl uppercase'>{row.symbol}</span>
                                                        <span className=' text-slate-400'>{row.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="align-right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell className="align-right">

                                                    <span className={`text-sm ${profit ? "text-green-500" : "text-red-500"}`}>
                                                        {profit && "+"}{coin.price_change_percentage_24h?.toFixed(2)}%
                                                    </span>
                                                    <span className="text-md font-medium text-white">
                                                        {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(
                                                        row.market_cap.toString().slice(0, -6)
                                                    )}

                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>

                        </Table>
                    )}
                   <div className="pagination flex items-center space-x-2 mt-4">
    <span
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300"
       onClick={()=>pageHandleClick(page-1)}
    >
        Prev
    </span>
    {
        [...Array(Math.ceil(handleSearch().length / 10))].map((_, i) => (
            <span
                key={i}
                onClick={() => pageHandleClick(i + 1)}
                className={`px-3 py-1 rounded cursor-pointer ${
                    page === i + 1
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
                {i + 1}
            </span>
        ))
    }
    <span
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300"
        onClick={()=>pageHandleClick(page+1)}
    >
        Next
    </span>
</div>

                </div>

            </div>
    

        </>
    )
}

export default CoinsTable