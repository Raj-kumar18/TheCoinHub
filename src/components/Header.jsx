import React from 'react';
import { CryptoState } from '../contexts/CryptoContext';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Header = () => {
  const { currency, Setcurrency } = CryptoState();  // Assuming the function is `setCurrency` in camelCase

  const handleChange = (value) => {
    Setcurrency(value);
    console.log("Currency changed to:", value);
  };

  return (
    <div className="navbar bg-slate-900 w-full flex items-center justify-between p-3 px-6">
      <div className="logo">
        <h1 className='text-2xl text-orange-500 font-bold'>
          TheCoin<span className='text-3xl'>Hub</span>
        </h1>
      </div>
      <div className="selector text-white">
        <Select value={currency} onValueChange={handleChange}> {/* Use onValueChange for Select */}
          <SelectTrigger className="w-[80px] bg-slate-950">
            <SelectValue placeholder="Select a Coin" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="INR">INR</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Header;
