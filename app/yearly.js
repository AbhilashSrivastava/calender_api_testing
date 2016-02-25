var React = require('react');
var ReactDOM = require('react-dom');

var Yearly = React.createClass({
    yearDayActive: false,
    yearWeekActive: false,
    getYearDay: function(ref){
        this.yearDay = $(ref.currentTarget).val();
    },
    getYearWeek: function(ref){
        this.yearWeek = $(ref.currentTarget).val();
    },
    getInitialState: function(){
        this.state ={
            year_day: [],
            year_week: []
        }
        return this.state;
    },
    toggleYearDay: function(e){
        var elem = e.currentTarget;
         if(elem.checked){
            $('.by_year_day_select').each(function(index,element){
                element.disabled = false;
            });
            $('.by_year_day_select_btn').removeClass('disabled');
            this.yearDayActive = true;
        }
        else{
            $('.by_year_day_select').each(function(index,element){
                element.disabled = true;
            });
            $('.by_year_day_select_btn').addClass('disabled');
            this.yearDayActive = false;
        }
    },
    toggleYearWeek: function(e){
        var elem = e.currentTarget;
         if(elem.checked){
            $('.by_year_week_select').each(function(index,element){
                element.disabled = false;
            });
            $('.by_year_week_select_btn').removeClass('disabled');
            this.yearWeekActive = true;
        }
        else{
            $('.by_year_week_select').each(function(index,element){
                element.disabled = true;
            });
            $('.by_year_week_select_btn').addClass('disabled');
            this.yearWeekActive = false;
        }
    },
    addYearDay: function(){
        if(this.yearDayActive == false){
            return;
        }
        if(this.yearDay == undefined){
            console.log('Please Enter A Valid Number ');
        }
        else{
            this.state.year_day.push(this.yearDay);
            $('#addYearDayNotify').text('Added '+ this.yearDay + ' to the mailing list');
            $('#addYearDayNotify').removeClass('hide');
            setTimeout(function(){
                $('#addYearDayNotify').text('');
                $('#addYearDayNotify').addClass('hide');
            },2000)        
        }
    },
    addYearWeek: function(){
        if(this.yearWeekActive == false){
            return;
        }
        if(this.yearWeek == undefined){
            console.log('Please Enter A Valid Number ');
        }
        else{
            this.state.year_week.push(this.yearWeek);
            $('#addYearWeekNotify').text('Added '+ this.yearWeek + ' to the mailing list');
            $('#addYearWeekNotify').removeClass('hide');
            setTimeout(function(){
                $('#addYearWeekNotify').text('');
                $('#addYearWeekNotify').addClass('hide');
            },2000)
        }
    },
    handleDetailsSubmit: function(){
        var send_obj = {frequency:'YEARLY', data:{}};
        if(this.yearDayActive){
            send_obj.data.by_day = true;
            send_obj.data.by_day_obj = this.state.year_day;
        }
        if(this.yearWeekActive){
            send_obj.data.by_week = true;
            send_obj.data.by_week_obj = this.state.year_week;
        }
        if(!this.yearDayActive && !this.yearWeekActive){
            send_obj.data.by_day = false;
            send_obj.data.by_week = false;
        }
        this.props.submitDetails(send_obj);
    },
    render: function(){
        return(
            <div className="box-wrapper">
                <div className="box-title">
                    Please Select The Yearly Days or/and Weeks To Be Scheduling The Mails
                </div>
                <div className="box-inner-container-wrapper">
                    <div className="box-inner-main-container">
                        <div className="checkbox monthly-checkbox-wrapper">
                            <div className="type-select-wrapper">
                                <input type="checkbox" name="by_year_day_select" index={1} onChange={this.toggleYearDay.bind(this)} /> 
                                <span className="by_year_day_select type-select-title" disabled> Select By Year Day - Count(Between -365 to +365)</span>
                            </div>
                            <div className="checkbox-wrapper">
                                <input type="number" className="by_year_day_select month-number-input" id="monthly_by_month_day" min="-365" max="365" onChange={this.getYearDay} disabled />
                                <button className="by_year_day_select_btn disabled month-absolute-btn btn-add-custom btn" onClick={this.addYearDay.bind(this)} > Add Day </button>
                            </div>
                            <span className="notify hide" id="addYearDayNotify" ></span>
                        </div>
                        <div className="checkbox monthly-checkbox-wrapper">
                            <div className="type-select-wrapper">
                                <input type="checkbox" name="by_year_week_select" index={1} onChange={this.toggleYearWeek.bind(this)} /> 
                                <span className="by_year_week_select type-select-title" disabled> Select By Year Week - Count(Between 0 to 52)</span>
                            </div>
                            <div className="checkbox-wrapper">
                                <input type="number" className="by_year_week_select month-number-input" id="monthly_by_month_day" min="0" max="52" onChange={this.getYearWeek} disabled/>
                                <button className="by_year_week_select_btn disabled month-absolute-btn btn-add-custom btn" onClick={this.addYearWeek.bind(this)} > Add Week </button>
                            </div>
                            <span className="notify hide" id="addYearWeekNotify" ></span>

                        </div>
                    </div>
                    <button className="btn btn-primary btn-custom-flat" id="weekly_select" onClick={this.handleDetailsSubmit}> Submit </button>
                </div>
            </div> 
        )
    }
});

module.exports = Yearly;