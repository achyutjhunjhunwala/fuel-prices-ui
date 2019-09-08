import React, {useState} from 'react';
import FuelPricesStore from '../../store/FuelPricesStore';
import {useObserver} from 'mobx-react-lite';
import {useEventCallback, useObservable} from 'rxjs-hooks'
import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    MarkSeries,
    Hint, LineMarkSeries
} from 'react-vis';
import {map} from "rxjs/operators";

export default function LineChart() {
    const [value, setValue] = useState({x: {}, y: null});

    const [rememberValue] = useEventCallback((event$) =>
        event$.pipe(
            map((e: any) => setValue(e))
        ));

    const [forgetValue] = useEventCallback((event$) =>
        event$.pipe(
            map((e: any) => setValue({x: {}, y: null}))
        ));

    return useObserver(() => {
        return (
            <FlexibleWidthXYPlot height="600" margin={{left: 50, right: 50, top: 50, bottom: 50}}>
                <VerticalGridLines/>
                <HorizontalGridLines/>
                <XAxis/>
                <YAxis/>
                <LineMarkSeries
                    animation
                    data={FuelPricesStore.maxPricesByFuelType}
                    lineStyle={{stroke: "red"}}
                    markStyle={{stroke: "blue"}}
                />

                <MarkSeries
                    onValueMouseOver={rememberValue}
                    onValueMouseOut={forgetValue}
                    opacity={0}
                    data={FuelPricesStore.maxPricesByFuelType}
                />

                <LineMarkSeries
                    animation
                    data={FuelPricesStore.minPricesByFuelType}
                    lineStyle={{stroke: "red"}}
                    markStyle={{stroke: "blue"}}
                />

                <MarkSeries
                    onValueMouseOver={rememberValue}
                    onValueMouseOut={forgetValue}
                    opacity={0}
                    data={FuelPricesStore.minPricesByFuelType}
                />

                {/*{value ? <Hint value={value} /> : null}*/}
                {value ? <Hint value={value}>
                    <div style={{background: 'black'}}>
                        <p>{value.y}</p>
                        <p>{value.x.toLocaleString()}</p>

                    </div>
                </Hint> : null}
            </FlexibleWidthXYPlot>
        )
    });
}
