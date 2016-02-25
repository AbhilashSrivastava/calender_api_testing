var React = require('react');
var ReactDOM = require('react-dom');
var FrequencyDropdown = require('./frequency_dropdown');
require('./css/home.css');
var frequency = [{
    name: "Weekly",
    id: "weeklyFreq",
    index: 0
}, {
    name: "Monthly",
    id: "monthlyFreq",
    index: 1
}, {
    name: "Yearly",
    id: "yearlyFreq",
    index:2
}];

var FrequencySelector = React.createClass({
    getInitialState: function(){
        this.state = {}
        this.state.selected_frequency = 0;
        return this.state;
    },
    freqChange: function(e){
        var elem = $(e.currentTarget);
        var prev_freq = this.state.selected_frequency;
        this.setState({
            selected_frequency: parseInt(elem.val())
        });
    },
    componentDidMount: function(){
        var id =frequency[this.state.selected_frequency].id;
        document.getElementById(id).checked = true;
    },
    render: function(){
        return(
            <div className="main-head-container">
                <div className="form-group" >
                    <div className="frequency-selector main-details-div">
                        <label id="title">Select The Frequency For Your Email Scheduling</label>
                        
                        <div className="frequency-option">
                            <label for="weeklyFreq"> Weekly </label>
                            <input type="radio" className="frequency-option-switch" id="weeklyFreq" name="frequency" value={0} onChange={this.freqChange.bind(this)} /> 
                        </div>
                        
                        <div className="frequency-option">
                            <label for="monthlyFreq"> Monthly </label>
                            <input type="radio" className="frequency-option-switch" id="monthlyFreq" name="frequency" value={1} onChange={this.freqChange.bind(this)} /> 
                        </div>
                        
                        <div className="frequency-option">
                            <label for="yearlyFreq"> Yearly </label>
                            <input type="radio"  className="frequency-option-switch" id="yearlyFreq" name="frequency" value={2} onChange={this.freqChange.bind(this)} />
                        </div>
                    </div>
                    
                    <FrequencyDropdown selected={this.state.selected_frequency} submitDetails={(details) => this.props.submitDetails(details)} />
                </div>
            </div>
        )
    }
});

module.exports = FrequencySelector;