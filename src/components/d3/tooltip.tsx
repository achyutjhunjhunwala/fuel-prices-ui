import React, { Component } from 'react';
import {XYPlot, LineSeries, MarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, Hint} from 'react-vis';

// @ts-ignore
const lineData = [...Array(3).keys()].map(() =>
    // @ts-ignore
    [...Array(10).keys()].map(x => ({x, y: Math.random() * 10}))
);

const allData = lineData.reduce((prev, curr, i) => {
    return [...prev, ...curr.map(d => ({...d, seriesNb: i}))];
}, []);

const defaultProps = {
    width: 400,
    height: 200,
    margin: {top: 5, left: 5, right: 5, bottom: 5}
};

export class LineChartMouseOverXY extends Component {
    constructor() {
        super(defaultProps);
        this.state = { highlightedSeries: null, pointUsed: null, highlightTip: null };
    }
    render() {
        const { pointUsed, highlightedSeries, highlightTip }: any = this.state;
        const data = allData.map((d, i) => ({
            ...d,
            color: i === pointUsed ? 'rgba(0,0,0,0.2)' : 'transparent'
        }));

        return (
            <XYPlot
                {...defaultProps}

                onMouseLeave={() =>
                    this.setState({
                        highlightedSeries: null,
                        pointUsed: null,
                        highlightTip: null
                    })
                }
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                {lineData.map((d, i) => (
                    <LineSeries
                        data={d}
                        key={`${i}`}
                        stroke={i === highlightedSeries ? 'orange' : undefined}
                        markStyle={{stroke:"blue"}}
                    />
                ))}
                {
                    highlightTip && <Hint
                      value={{y: highlightTip.y, x: 10}}
                      align={{horizontal: 'right'}}>
                        {`${highlightTip.name} ${highlightTip.y}`}
                    </Hint>
                }
                <MarkSeries
                    data={data}
                    colorType="literal"
                    size={10}
                    onNearestXY={({seriesNb}: any, {index}: any) => {
                        this.setState({
                            highlightedSeries: seriesNb,
                            pointUsed: index
                        })
                        console.log(index);
                    }

                    }
                />
            </XYPlot>
        );
    }
}

export default LineChartMouseOverXY;
