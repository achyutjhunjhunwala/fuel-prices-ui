import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { useEventCallback } from "rxjs-hooks";
import { map } from "rxjs/operators";
import FuelPricesStore from '../../store/FuelPricesStore';
import { Button } from 'react-bulma-components';

export default function FuelTypes() {

    const [ updateFuelType ] = useEventCallback((event$) =>
        event$.pipe(
            map((e: any) => FuelPricesStore.updateSelectedFuelType(e.currentTarget.innerText))
        ));

    return useObserver(() => (
        <nav className="navbar" role="navigation" aria-label="sub navigation">
            <p className="navbar-item title-text">
                Provided Fuels :
            </p>
            {
                FuelPricesStore.typesByProviders.map((type: any) => (
                    <p className="navbar-item">
                        <Button color={FuelPricesStore.selectedFuelType === type ? 'danger': 'primary'} onClick={updateFuelType}>{ type }</Button>
                    </p>
                ))
            }
        </nav>
    ))
}


