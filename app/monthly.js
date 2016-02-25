var React = require('react');
var ReactDOM = require('react-dom');
require('./css/monthly.css');
var weekly_data = [
    {index:0,day:'Monday',val:'MO'},
    {index:1,day:'Tuesday',val:'TU'},
    {index:2,day:'Wednesday',val:'WE'},
    {index:3,day:'Thursday',val:'TH'},
    {index:4,day:'Friday',val:'FR'},
    {index:5,day:'Saturday',val:'SA'},
    {index:6,day:'Sunday',val:'SU'},
];
var Monthly = React.createClass({
    monthDayActive: false,
    monthAbsoluteDayActive: false,
    getMonthDayNumber: function(ref){
        if(ref){
            this.monthDayNumber = $(ref.currentTarget).val();            
        }
    },
    getMonthSelectName: function(ref){
        if(ref){
            this.monthSelectName  = $(ref.currentTarget).val(); 
        }
    },
    getAbsoluteDay: function(ref){
        if(ref){
            this.monthAbsoluteDay = $(ref.currentTarget).val();    
        }
    },
    getInitialState: function(){
        this.state = {
            by_day: [],
            by_month_day: []
        }
        return this.state;
    },
    addDay: function(){
        if(this.monthDayActive === false){
            return;
        }
        if((this.monthDayNumber == 0) || (this.monthSelectName == undefined)){
            //show error
            console.log('Please Enter A Valid Choice');
        }
        else {
            //render element
            this.state.by_day.push(this.monthDayNumber+''+this.monthSelectName);
            $('#addDayNotify').text('Added '+ this.monthDayNumber +'' + this.monthSelectName+ ' to the mailing list');
            $('#addDayNotify').removeClass('hide');
            setTimeout(function(){
                $('#addDayNotify').text('');
                $('#addDayNotify').addClass('hide');
            },2000)
        }
    },
    addAbsoluteDay: function(){
        if(this.monthAbsoluteDayActive === false){
            return;
        }
        if(this.monthAbsoluteDay == undefined){
            console.log('Please select a valid choice');
        }
        else{
            this.state.by_month_day.push(this.monthAbsoluteDay);
            console.log("Pushed " + this.monthAbsoluteDay+ " to array");
            $('#addAbsoluteDayNotify').text('Added '+ this.monthAbsoluteDay + ' to the mailing list');
            $('#addAbsoluteDayNotify').removeClass('hide');
            setTimeout(function(){
                $('#addAbsoluteDayNotify').text('');
                $('#addAbsoluteDayNotify').addClass('hide');
            },2000)            
        }
    },
    toggleMonthday: function(e){
        var elem = e.currentTarget;
        if(elem.checked){
            $('.month_by_day_key').each(function(index,element){
                element.disabled = false;
            });
            $('.month_by_day_key_btn').removeClass('disabled');
            this.monthDayActive = true;
        }
        else{
            $('.month_by_day_key').each(function(index,element){
                element.disabled = true;
            });
            $('.month_by_day_key_btn').addClass('disabled');
            this.monthDayActive = false;
        }
    },
    toggleAbsoluteDay: function(e){
        var elem = e.currentTarget;
         if(elem.checked){
            $('.month_by_absolute_day_key').each(function(index,element){
                element.disabled = false;
            });
            $('.month_by_absolute_day_key_btn').removeClass('disabled');
            this.monthAbsoluteDayActive = true;
        }
        else{
            $('.month_by_absolute_day_key').each(function(index,element){
                element.disabled = true;
            });
            $('.month_by_absolute_day_key_btn').addClass('disabled');
            this.monthAbsoluteDayActive = false;
        }
    },
    handleDetailsSubmit: function(){
        var send_obj = {};
        send_obj['frequency'] = "MONTHLY";
        send_obj['data'] = {}
        if(this.monthDayActive){
            send_obj.data.by_day = true;
            send_obj.data.by_day_obj = this.state.by_day;
        }
        if(this.monthAbsoluteDayActive){
            send_obj.data.by_month_day = true;
            send_obj.data.by_month_day_obj = this.state.by_month_day;
        }
        if(!this.monthDayActive && !this.monthAbsoluteDayActive){
            send_obj.data.by_month_day = false;
            send_obj.data.by_day = false;
        }
        this.props.submitDetails(send_obj);
    },
    render: function(){
        var selectElements = weekly_data.map(function(elem, index){
            return(
                <option name={elem.day} key={elem.index} value={elem.val} > {elem.day} </option>
            )
        });
        return(
            <div className="box-wrapper">
                <div className="monthly-header-title box-title">
                    Please Select The Monthly Days To Be Scheduling The Mails
                </div>
                <div className="box-inner-container-wrapper">
                    <div className="box-inner-main-container">
                        <div className="checkbox monthly-checkbox-wrapper">
                            <div className="type-select-wrapper">
                                <input type="checkbox" name="by_day_select" index={0} onChange={this.toggleMonthday.bind(this)}/> 
                                <span className="type-select-title"> Select By Day - Count(Between +4 to -4 , 0 Not Allowed)</span>
                            </div>
                            <div className="checkbox-wrapper ">
                                <input type="number" className="month_by_day_key month-number-input" id="monthly_by_day" min="-4" max="4" onChange={this.getMonthDayNumber} disabled/>
                                <span className="month_by_day_key" disabled > Select By Day - Day </span>
                                <select onChange={this.getMonthSelectName} className="month_by_day_key dropdown-input" disabled>
                                    {selectElements}
                                </select>
                                <button className="btn month_by_day_key_btn disabled btn-add-custom" onClick={this.addDay.bind(this)}  >Add Day</button>
                                <span className="notify hide" id="addDayNotify" ></span>
                            </div>
                        </div>
                        <div className="checkbox monthly-checkbox-wrapper" >
                            <div className="type-select-wrapper">
                                <input type="checkbox" name="by_month_day_select" index={1} onChange={this.toggleAbsoluteDay}/> 
                                <span className="type-select-title"> Select By Month Day - Count(Between 0 to 30)</span>
                            </div>
                            <div className="checkbox-wrapper">
                                <input type="number" className="month_by_absolute_day_key month-number-input" id="monthly_by_month_day" min="0" max="30" onChange={this.getAbsoluteDay} disabled/>
                                <button className="btn month_by_absolute_day_key_btn disabled month-absolute-btn btn-add-custom" onClick={this.addAbsoluteDay.bind(this)}>Add Day</button>
                                <span className="notify hide" id="addAbsoluteDayNotify" ></span>
                            </div>
                            
                        </div>
                    </div>
                    <button className="btn btn-primary" id="weekly_select" className="btn-custom-flat" onClick={this.handleDetailsSubmit} > Submit </button>
                </div>
            </div> 
        )
    }
});

module.exports = Monthly;