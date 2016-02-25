var React = require('react');
var ReactDOM = require('react-dom');
require('./css/home.css');

var Index = React.createClass({
    render: function(){
        return(
            <div className="main-container">
                <nav className="navbar navbar-default" role="navigation">
                    <div className="col-sm7 col-sm-offset-2" style={{marginTop:15}}>
                        Please Proceed With The Scheduling Of the Mails.
                    </div>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

module.exports = Index;