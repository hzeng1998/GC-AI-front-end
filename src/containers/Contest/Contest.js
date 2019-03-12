import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid/Grid";
import Table from "../../components/Table/Table";
import connect from "react-redux/es/connect/connect";
import {getBattles} from "../../actions";
import Paper from "@material-ui/core/Paper/Paper";

function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

let counter = 0;

function createData(rank, user_id, score, last_update) {
  counter += 1;
  return {id: counter, rank, user_id, score, last_update};
}


class Contest extends React.Component {
  state = {
    value: 'one',
    title: ["Rank", "User ID", "Score", "Last Update"],
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    const {classes} = this.props;
    const {value} = this.state;

    const rows = this.props.data.map((value) => (
      createData(value.rank, value.user_id, value.score, value.last_update)
    ));

    return (
      <Grid container justify={"center"} className={classes.root}>
        <Grid item xs={12} sm={9}>
          <Paper>
            <Tabs value={value} onChange={this.handleChange} centered>
              <Tab value="one" label="比赛介绍"/>
              <Tab value="two" label="赛题及样例"/>
              <Tab value="three" label="报名"/>
              <Tab value="four" label="结果"/>
            </Tabs>
            {value === 'one' && <TabContainer>Item One</TabContainer>}
            {value === 'two' && <TabContainer>Item Two</TabContainer>}
            {value === 'three' && <TabContainer>Item Three</TabContainer>}
            {value === 'four' && <Table title={this.state.title} rows={rows}/>}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}


Contest.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  getBattles: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const initMapStateToProps = (state) => {
  const {battles: {data, isFetching}} = state;
  return {
    data,
    isFetching
  }
};

export default connect(initMapStateToProps, {
  getBattles
})(withStyles(styles)(Contest));