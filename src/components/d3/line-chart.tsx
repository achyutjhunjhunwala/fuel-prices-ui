import React, {useState} from 'react';
import FuelPricesStore from '../../store/FuelPricesStore';
import {useObserver} from 'mobx-react-lite';
import {useEventCallback} from 'rxjs-hooks'
import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    MarkSeries,
    Hint, LineMarkSeries,
    VerticalBarSeries,
    ChartLabel
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
        // const dates = FuelPricesStore.weekendDates;
        // const prices = FuelPricesStore.minPricesByFuelType;
        // console.log('prices', prices);
        // console.log('date', dates);
        let counter = 0;
        return (
            <div>
                <FlexibleWidthXYPlot height={600} margin={{left: 50, right: 50, top: 50, bottom: 50}}>
                    <VerticalGridLines/>
                    <HorizontalGridLines/>
                    <XAxis title='Time'
                           tickFormat={function tickFormat(d: any) {
                               counter ++;
                               if (counter === 3) {
                                   const date = new Date(d);
                                   counter = 0;
                                   return date.toLocaleString()
                               }
                           }}
                    />
                    <YAxis title='Price'/>
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
                    <ChartLabel
                        xPercent={0.45}
                        yPercent={0.85}
                        text={"Date"}
                    />

                    {/*{value ? <Hint value={value} /> : null}*/}
                    {value ? <Hint value={value}>
                        <div style={{background: 'black'}}>
                            <p>{value.y}</p>
                            <p>{value.x.toLocaleString()}</p>
                        </div>
                    </Hint> : null}
                </FlexibleWidthXYPlot>
                <FlexibleWidthXYPlot height={600} margin={{left: 50, right: 50, top: 50, bottom: 50}}>
                    <VerticalGridLines/>
                    <HorizontalGridLines/>
                    <XAxis title='Time'
                           tickFormat={function tickFormat(d: any) {
                               counter ++;
                               if (counter === 3) {
                                   const date = new Date(d);
                                   counter = 0;
                                   return date.toLocaleString()
                               }
                           }}
                    />
                    <YAxis title='Price'/>
                    <VerticalBarSeries
                        data={FuelPricesStore.weekendDates}
                        onValueMouseOver={rememberValue}
                        onValueMouseOut={forgetValue}
                        color="green"
                        strokeWidth="30"
                    />
                    {value ? <Hint value={value}>
                        <div style={{background: 'black'}}>
                            <p>{value.y}</p>
                            <p>{value.x.toLocaleString()}</p>
                        </div>
                    </Hint> : null}
                </FlexibleWidthXYPlot>
            </div>
        )
    });
}
