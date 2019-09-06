import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { useEventCallback } from "rxjs-hooks";
import { map } from "rxjs/operators";
import FuelPricesStore from '../store/FuelPricesStore';
import { Button } from 'react-bulma-components';

export default function FuelProviders() {

    const [ updateProvider ] = useEventCallback((event$) =>
        event$.pipe(
            map((e: any) => FuelPricesStore.updateSelectedProvider(e.currentTarget.innerText))
        ));

    return useObserver(() => (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            {
                FuelPricesStore.providers.map((provider: any) => (
                  <p className="navbar-item">
                      <Button color="primary" onClick={updateProvider}>{ provider }</Button>
                  </p>
                ))
            }
        </nav>
    ))
}


