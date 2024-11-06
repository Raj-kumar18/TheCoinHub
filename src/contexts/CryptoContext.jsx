import React, { useState, useEffect } from 'react'
import { createContext, useContext } from 'react'

export const CryptoContext = createContext()

export const CryptoProvider = ({ children }) => {
  const [currency, Setcurrency] = useState("INR")
  const [symbol, Setsymbol] = useState("₹")

  useEffect(() => {

    if (currency === "INR") Setsymbol("₹");
    else if (currency === "USD") Setsymbol("$");
  }, [currency])

  return<CryptoContext.Provider value={{ currency, symbol, Setcurrency }}>{children}</CryptoContext.Provider>

}

export default CryptoContext

export const CryptoState = () => {
  return useContext(CryptoContext)
}