var React = require('react');
var ReactDOM = require('react-dom');
var Weekly =  require('./weekly');
var Monthly =  require('./monthly');
var Yearly = require('./yearly');

var select_hash = [Weekly, Monthly, Yearly];
var FrequencyDropdown = React.createClass({
    render: function(){
       var selector = this.props.selected;
       if(selector === 0){
            return <Weekly submitDetails={(details) => this.props.submitDetails(details)} />
       }
       else if (selector === 1){
            return <Monthly submitDetails={(details) => this.props.submitDetails(details)}/>
       }
       else {
            return <Yearly submitDetails={(details) => this.props.submitDetails(details)}/>
       }
    }
})

module.exports = FrequencyDropdown;
