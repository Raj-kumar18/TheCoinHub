import { HistoricalChart } from '@/config/api'
import { CryptoState } from '@/contexts'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
// import { Line } from 'react-chartjs-2'
import { TailSpin } from 'react-loader-spinner'
import Chart from 'chart.js/auto'
import { chartDays } from '@/config/data'
import SelectButton from './SelectButton'

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState(null)
  const [days, setDays] = useState(1)
  const { currency,symbol } = CryptoState()
  const chartRef = useRef(null) // Ref to store the chart instance
  const canvasRef = useRef(null) // Ref to the canvas element

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
    setHistoricData(data.prices)
  }

  useEffect(() => {
    fetchHistoricData()
  }, [currency, days])

  useEffect(() => {
    // Destroy previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    // Create new chart instance on the canvas
    if (historicData) {
      chartRef.current = new Chart(canvasRef.current, {
        type: 'line',
        data: {
          labels: historicData.map((entry) => {
            const date = new Date(entry[0])
            const time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`

            return days === 1 ? time : date.toLocaleDateString()
          }),
          datasets: [
            {
              data: historicData.map((entry) => entry[1]),
              label: `Price ( Past ${days} Days) in ${currency}`,
              borderColor: '#FFA500',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          elements: {
            point: {
              radius: 0,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: '#FFF',
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: '#FFF',
              },
            },
            y: {
              ticks: {
                color: '#FFF',
                callback: (value) => `${symbol}${value}`,
              },
            },
          },
        },
      })
    }

    // Cleanup function to destroy the chart instance on component unmount or re-render
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [historicData, days]) // Re-run effect if historicData or days change

  console.log(chartDays)
  return (
    <>
    <div className="chartInfo p-4 md:p-6 bg-slate-900 rounded-lg">
      {!historicData ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <TailSpin visible={true} height="100" width="100" color="orange" ariaLabel="tail-spin-loading" />
        </div>
      ) : (
        <canvas ref={canvasRef} /> // Use the canvas reference
      )}
    </div>

    <div className="DayButtons flex flex-wrap justify-center p-4 space-x-2 space-y-2">
  {chartDays.map((day) => (
    <SelectButton
      key={day.value}
      onClick={() => setDays(day.value)}
      selected={days === day.value}
    >
      {day.label}
    </SelectButton>
  ))}
</div>

    </>
  )
}

export default CoinInfo
