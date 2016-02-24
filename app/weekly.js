var React = require('react');
var ReactDOM = require('react-dom');
var weekly_data = [
    {index:0,day:'Monday',val:'MO'},
    {index:1,day:'Tuesday',val:'TU'},
    {index:2,day:'Wednesday',val:'WE'},
    {index:3,day:'Thursday',val:'TH'},
    {index:4,day:'Friday',val:'FR'},
    {index:5,day:'Saturday',val:'SA'},
    {index:6,day:'Sunday',val:'SU'},
]
var Weekly = React.createClass({
    getInitialState: function(){
        this.state = {
            days_selected: []
        }
        return this.state;
    },
    changeState: function(action, elem){
        if(action === 'add'){
            this.state.days_selected.push(elem);
            console.log(elem.day + 'Added From State');
        }
        else if(action === 'remove'){
            var rem_pos = this.state.days_selected.indexOf(elem);
            if(rem_pos != -1){
                this.state.days_selected.splice(rem_pos,1);
                console.log(elem.day+ 'Removed From State');
            }
        }
    },
    handleChange: function(e){
        var elem = $(e.currentTarget);
        if(elem.attr('checked')){
            elem.attr('checked',false);
            this.changeState('remove', weekly_data[elem.data('id')]);
        }
        else{
            elem.attr('checked',true);
            this.changeState('add',weekly_data[elem.data('id')]);
        }
    },
    handleDetailsSubmit: function(){
        var week_array = [];
        var send_obj = {};

        this.state.days_selected.forEach(function(elem){
            week_array.push(elem.val);
        });
        send_obj['frequency'] = "WEEKLY";
        send_obj['data'] =  week_array;
        this.props.submitDetails(send_obj);
    },
    render: function(){
        var checkboxElements = weekly_data.map(function(elem, index){
            return(
                <div className="checkbox" key={elem.index}>
                    <span className=""> {elem.day} </span>
                    <input type="checkbox" name={elem.day} align="left" data-id={elem.index} onChange={this.handleChange}/> 
                </div>
            )
        }.bind(this));
        return(
            <div className="box-wrapper">
                <div> 
                    Frequency Selected To Be Weekly 
                </div>
                <div>
                    Please Select The Weekly Days To Be Scheduling The Mails
                </div>
                <div className="main-container">
                    {checkboxElements}
                </div>
                <button className="btn btn-primary" id="weekly_select" onClick={this.handleDetailsSubmit}> Submit </button>
            </div>           
        )
    }
});

module.exports = Weekly;