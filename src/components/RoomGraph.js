import React, { PureComponent } from 'react';
import { AreaChart, Area, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CircularProgress from '@material-ui/core/CircularProgress';
import { genDaysArray, getDayIndex, genChartDataAdmin, genChartDataUser} from '../utils';

class RoomGraph extends PureComponent {
    
    state = {
        data: [],
        loaded: false
    }

    componentDidMount() {
        const user = (!!this.props.user, 'user');
        setTimeout(() => {
            if (user) {
                this.calculateDataUser();
            } else {
                this.calculateDataAdmin();
            }
        }, 500)
    }

    calculateDataAdmin = () => {
        const {data} = this.props;
        if (data.length <= 0)
            return this.setState({data: [], loaded: true})
        const result = genChartDataAdmin(data);
        console.log(result);
        this.setState({data: result, loaded: true})
    }

    calculateDataUser = () => {
        const {data} = this.props;
        if (data.length <= 0)
            return this.setState({data: [], loaded: true})
        const result = genChartDataUser(data);
        console.log(result);
        this.setState({data: result, loaded: true})
    }
    
    render() {
        const {data, loaded} = this.state;
        return (
        <div className="center all graph">
            {(loaded && data.length > 0) && <ResponsiveContainer><AreaChart
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
            {(data.length <= 0 && loaded) && <p>Not enough data to populate charts.</p>}
            {!loaded && <CircularProgress size={70} thickness={5} className="progress"/>}
        </div>
        )
    }
}

export default RoomGraph
