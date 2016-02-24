var React = require('react');
var ReactDOM = require('react-dom');
var DatePicker = require('react-datepicker');
var Moment = require('moment');
var FrequencySelector = require('./frequency_selector');
require('react-datepicker/dist/react-datepicker.css');


var Home = React.createClass({
    api:'http://104.236.230.241:8000/main.php?',
    getInitialState: function(){
        return{
            startDate: Moment(),
            endDate: Moment().add(1,'days'),
            untilDate: Moment().add(1,'days'),
            details: null,
            mail_count: null
        }
    },
    handleStartDateChange: function(date){
        this.setState({
            startDate: date
        });
        if(date > this.state.endDate){
            this.setState({
                endDate: date.add(1,'days'),
                untilDate: date.add(1,'days')
            })
        }
    },
    handleEndDateChange: function(date){
        this.setState({
            endDate: date
        });
        if(date < this.state.startDate){
            this.state.startDate = date;
        }
    },
    handleUntilDateChange: function(date){
        this.setState({
            untilDate: date
        })
    },
    updateText: function(e){
        if(e.currentTarget){
            this.setState({
                details: e.currentTarget.value
            });            
        }
    },
    updateMailCount: function(e){
        if(e.currentTarget){
            this.setState({
                mail_count: e.currentTarget.value
            });
        }
    },
    handleWeeklyAPICall: function(send_obj){
        var req_obj = {rec:{}};
        req_obj.rec['FREQ'] = 'WEEKLY';
        req_obj.rec['BYDAY'] = send_obj.toString();
        req_obj.rec['DTSTART'] = this.state.startDate.toJSON();
        req_obj.rec['DTSTART'] = this.state.startDate.toJSON();
        req_obj.rec['DTEND'] = this.state.endDate.toJSON();
        if(this.state.mail_count){
            req_obj.rec['COUNT'] = this.state.mail_count;
        }
        else{
            req_obj.rec['UNTIL'] = this.state.untilDate;
        }
        var url_component = $.param(req_obj);
        var final_url = this.api + url_component;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", final_url, true);
        xhr.onreadystatechange = function() {
          debugger;
          if (xhr.readyState == 4) {
            console.log('response succesfull');
            alert('Its a success');
          }
        }
        xhr.send();
    },
    handleMonthlyAPICall: function(send_obj){
        var req_obj = {rec:{}};
        req_obj.rec['FREQ'] = 'MONTHLY';
        req_obj.rec['DTSTART'] = this.state.startDate.toJSON();
        req_obj.rec['DTSTART'] = this.state.startDate.toJSON();
        req_obj.rec['DTEND'] = this.state.endDate.toJSON();
        if(this.state.mail_count){
            req_obj.rec['COUNT'] = this.state.mail_count;
        }
        else{
            req_obj.rec['UNTIL'] = this.state.untilDate;
        }
        if(send_obj.by_day){
            req_obj.rec['BYDAY'] = send_obj.by_day_obj.toString();
        }
        if(send_obj.by_month_day){
            req_obj.rec['BYMONTHDAY'] = send_obj.by_month_day_obj.toString();
        }
        var url_component = $.param(req_obj);
        var final_url = this.api + url_component;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", final_url, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            console.log('response succesfull');
            alert('Its a success');
          }
        }
        xhr.send();        
        console.log('month call');
    },
    handleYearlyAPICall: function(send_obj){
        var req_obj = {rec:{}};
        req_obj.rec['FREQ'] = 'YEARLY';
        req_obj.rec['DTSTART'] = this.state.startDate.toJSON();
        req_obj.rec['DTSTART'] = this.state.startDate.toJSON();
        req_obj.rec['DTEND'] = this.state.endDate.toJSON();
        if(this.state.mail_count){
            req_obj.rec['COUNT'] = this.state.mail_count;
        }
        else{
            req_obj.rec['UNTIL'] = this.state.untilDate;
        }
        if(send_obj.by_day){
            req_obj.rec['BYYEARDAY'] = send_obj.by_day_obj.toString();
        }
        if(send_obj.by_week_day){
            req_obj.rec['BYWEEKNO'] = send_obj.by_week_obj.toString();
        }
        var url_component = $.param(req_obj);
        var final_url = this.api + url_component;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", final_url, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            console.log('response succesfull');
            alert('Its a success');
          }
        }
        xhr.send();        
        console.log('month call');
    },    
    submitDetails: function(details){
        if(details.frequency === 'WEEKLY'){
            this.handleWeeklyAPICall(details.data);
        }
        else if(details.frequency === 'MONTHLY'){
            this.handleMonthlyAPICall(details.data);
        }
        else if(details.frequency === 'YEARLY'){
            this.handleYearlyAPICall(details.data);
        }
    },
    render: function(){
        return(
            <div className="main-parent-container">
                <div className="form-group" >
                    
                    <label for="title">Title For Email Schedule</label>
                    <input type="text" name="title" placeholder="Give a title to the event" id="title" className="form-control" required onChange={this.updateText}/>
                    
                    <label for="startDateInput">Start Date</label>
                    <DatePicker minDate={Moment()} className="date_input start_date_input" name="startDateInput" id="startDateInput" selected={this.state.startDate} onChange={this.handleStartDateChange} required />
                    
                    <label for="endDateInput">End Date</label>
                    <DatePicker minDate={Moment().add(1,'days')} className="date_input end_date_input" name="endDateInput" id="endDateInput" selected={this.state.endDate} onChange={this.handleEndDateChange} required />
                    
                    <label for="untilDateInput">Until Date</label>
                    <DatePicker minDate={Moment().add(1,'days')} className="date_input until_date_input" name="untilDateInput" id="untilDateInput" selected={this.state.untilDate} onChange={this.handleUntilDateChange} />

                    <label for="countNumber"> Mail Count </label>
                    <input type='number' className="count_number" id="countNumber" required onChange={this.updateMailCount} />
                    <span className="error-msg hide">This is a compulsory field. Please fill it and submit the form again ! </span>
                </div>
                <FrequencySelector submitDetails={(details) => this.submitDetails(details)}/>
            </div>
        )
    }
});

module.exports = Home;