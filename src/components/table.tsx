import React from 'react';
import FuelPricesStore from './../store/FuelPricesStore';
import { useObserver } from 'mobx-react-lite';
import { useObservable } from 'rxjs-hooks'
import './table.css';

export default function FuelPriceTable() {
  return useObserver(() => {
    const fuel = FuelPricesStore.typesByProviders;
    console.log(fuel);
    return (
      <table>
        <tr>
          <th>Premium Diesel</th>
          <th>Super 100+</th>
          <th>Premium</th>
          <th>Premium E10</th>
          <th>Diesel</th>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    )
  });
}
