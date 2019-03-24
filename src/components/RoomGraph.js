import React, { PureComponent } from 'react';
import { AreaChart, Area, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        let result = [];
        let tempDay = data[0][2];
        let avg = 0;
        let count = 0;
        data.forEach(entry => {
            const curDay = entry[2]
            const time = entry[5]
            console.log(curDay, tempDay, typeof time);
            if (curDay === tempDay && typeof time === "number") {
                avg += time;
                count++;
            } else if (curDay !== tempDay  && typeof time === "number") {
                const obj = {
                    name: tempDay,
                    avg: (avg / count)
                }
                result.push(obj)
                tempDay = curDay;
                avg = time;
                count = 1;
            }
        });
        const obj = {
            name: tempDay,
            avg: (avg / count)
        }
        result.push(obj)
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
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                stroke="#a18cd1"
                fill="#a18cd1"
                name="Average Time Spent (minutes)"
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
