import React from 'react';
import FuelPricesStore from './../store/FuelPricesStore';
import { useObserver } from 'mobx-react-lite';
import { useObservable } from 'rxjs-hooks'
import './table.css';

export default function FuelPriceTable() {
  return useObserver(() => {
    const fuel = FuelPricesStore.maxPricesByFuelType;
    console.log(fuel);
    return (
      <div></div>
    )
  });
}
