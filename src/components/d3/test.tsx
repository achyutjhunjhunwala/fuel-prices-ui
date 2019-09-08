import React from 'react';

import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    MarkSeries,
    Hint, LineMarkSeries
} from 'react-vis';

const data = [
    {x: 0, y: 8},
    {x: 1, y: 5},
    {x: 2, y: 4},
    {x: 3, y: 9},
    {x: 4, y: 1},
    {x: 5, y: 7},
    {x: 6, y: 6},
    {x: 7, y: 3},
    {x: 8, y: 2},
    {x: 9, y: 0}
];

export default class LineChart extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            value: null
        };
        this._rememberValue = this._rememberValue.bind(this);
        this._forgetValue = this._forgetValue.bind(this);
    }

    _forgetValue(value: any) {
        this.setState({
            value: null
        });
    }

    _rememberValue(value: any) {
        this.setState({value});
    }

    render() {
        const {value} : any = this.state;
        return (
            <FlexibleWidthXYPlot height="300" margin={{left: 50, right: 50, top: 50, bottom: 50}}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <LineMarkSeries
                    animation
                    data={data}
                    lineStyle={{stroke:"red"}}
                    markStyle={{stroke:"blue"}}
                />

                <MarkSeries
                    onValueMouseOver={this._rememberValue}
                    onValueMouseOut={this._forgetValue}
                    opacity={0}
                    data={data}
                />

                {value ? <Hint value={value} /> : null}
            </FlexibleWidthXYPlot>
        );
    }
}
