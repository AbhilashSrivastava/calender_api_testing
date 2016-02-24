var React = require('react');
var Home = require('../home');
var Index = require('../index');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;


module.exports = (
    < Route path="/" component={Index}>
        <IndexRoute component={Home} />
    </ Route >
)