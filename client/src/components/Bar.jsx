import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const data = []

export default class Bar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.props.info.forEach(element => {
            data.push(element)
        });
    }

    render() {

        return (
            <Paper>
                <Chart
                    data={data}
                >
                    <ArgumentAxis />
                    <ValueAxis max={30} />

                    <BarSeries
                        valueField="population"
                        argumentField="profession"
                    />
                    <Title text="Profissionais por profissão" />
                    <Animation />
                </Chart>
            </Paper>
        );
    }
}
