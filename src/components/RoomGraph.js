import React, { PureComponent } from 'react';
import { AreaChart, Area, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CircularProgress from '@material-ui/core/CircularProgress';
import { genDaysArray, getDayIndex } from '../utils';

class RoomGraph extends PureComponent {
    
    state = {
        data: [],
        loaded: false
    }

    componentDidMount() {
        setTimeout(() => {
            this.calculateData();
        }, 500)
    }

    calculateData = () => {
        const {data} = this.props;
        if (data.length <= 0)
            return this.setState({data: [], loaded: true})
        let result = genDaysArray();
        data.forEach(entry => {
            const day = entry[2];
            const time = entry[5];
            const i = getDayIndex(day.split(',')[0]);
            console.log(day.split(','), result, i)
            console.log(i)
            result[i].sum += time;
            result[i].count++;
        });
        for (let i = 0; i < result.length; i++) {
            if (result[i].count === 0) {
                result[i].avg = 0;
                continue;
            }
            result[i].avg = Math.ceil(result[i].sum / result[i].count);
        }
        this.setState({data: result, loaded: true})
    }
    
    render() {
        const {data, loaded} = this.state;
        return (
        <div className="center all graph">
            {(loaded && data.length > 1) && <ResponsiveContainer><AreaChart
                data={data}
                margin={{
                    top: 10,
                    bottom: 20,
                    right: 30,
                    left: 30
            }}>
                
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                stroke="#fcb4e8"
                fill="#fcb4e8"
                unit="minutes"
                name="Average Time Spent"
                type="monotone" 
                dataKey="avg" 
                activeDot={{r: 6}} />
            </AreaChart></ResponsiveContainer>}
            {(data.length <= 1 && loaded) && <p>Not enough data to populate charts.</p>}
            {!loaded && <CircularProgress size={70} thickness={5} className="progress"/>}
        </div>
        )
    }
}

export default RoomGraph
