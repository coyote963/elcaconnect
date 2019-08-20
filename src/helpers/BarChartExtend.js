import React from 'react'
import BarChart from './BarChart'
class BarChartExtend extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            period : 14
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({period : event.target.value})
    }
    render () {
        console.log(this.props.data)
        return (
            <div className="row">
                <div class="ml-3">
                    <BarChart 
                        data={this.props.data}
                        duration = {this.state.period}
                    />
                </div>
                <div class="form-group ml-5">
                    <label for="exampleSelect1">Select Time Period</label>
                    <select value={this.state.value} onChange={this.handleChange} class="form-control" id="selectorPeriod">
                        <option value={7}>Week</option>
                        <option value={14}>2 Weeks</option>
                        <option value={31}>Month</option>
                        <option value={183}>6 Month</option>
                        <option value={365}>Year</option>
                    </select>
                </div>
            </div>
        )
    }
}
export default BarChartExtend