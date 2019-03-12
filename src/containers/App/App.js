import React, {Component} from 'react';
import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {blue, purple} from "@material-ui/core/colors";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import PropTypes from "prop-types";
import AppBar from "../../components/AppBar/AppBar";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Home from "../Home/Home";
import Game from "../Game/Game";
import Contest from "../Contest/Contest";
import BattleResult from "../BattleResult/BattleResult";
import DevTools from "../DevTools/DevTools";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import Storage from "../Storage/Storage";
import Rank from "../Rank/Rank";
import PersonalContest from "../PersonalContest/PersonalContest";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: purple,
  },
  typography: {useNextVariants: true},
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sideOpen: false,
    };

  }

  render() {

    const {store} = this.props;

    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Switch>
              <Route path={"/register"} component={Register}/>
              <Route path={"/login"} component={Login}/>
              <PrivateRoute exact path={"/"} component={AppBar}/>
              <Route path={"/"} render={() =>
                <React.Fragment>
                  <AppBar/>
                  <PrivateRoute path={"/home"} component={Home}/>
                  <PrivateRoute path={"/game"} component={Game}/>
                  <PrivateRoute path={"/contest"} component={Contest}/>
                  <PrivateRoute path={"/battle_result/:battle_id"} component={BattleResult}/>
                  <PrivateRoute path={"/code_storage"} component={Storage}/>
                  <PrivateRoute path={"/rank/:game_id"} component={Rank}/>
                  <PrivateRoute path={"/my_games"} component={PersonalContest}/>
                </React.Fragment>
              }/>
            </Switch>
          </MuiThemeProvider>
        </Router>
        <DevTools/>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
