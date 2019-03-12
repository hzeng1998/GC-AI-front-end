import React from "react";
import Table from "../../components/Table/Table";
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";
import connect from "react-redux/es/connect/connect";
import {getBattles} from "../../actions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  placement: {
    padding: theme.spacing.unit * 3,
  }
});

let counter = 0;

function createData(battle_id ,game_id, attacker_id, defender_id, watch) {
  counter += 1;
  return {id: counter, battle_id, game_id, attacker_id, defender_id, watch};
}

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: ["BattleID", "GameID", "Attacker_ID", "Defender_ID", "Watch"],
    };
  }

  componentDidMount() {
    if (this.props.isFetching === false)
      this.props.getBattles();
  }

  render() {

    const {classes} = this.props;
    const rows = this.props.data.map((value) => (
        createData(value.battle_id, value.game_id, value.attacker_id, value.defender_id, "观战")
      ));

    return (
      <Grid container justify={"space-around"} alignItems={"flex-start"} direction={"row"} className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Table title={this.state.title} rows={rows} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.placement}>
            Recent Messages:
          </Paper>
        </Grid>
        <ErrorMessage/>
      </Grid>
    );
  }
}

Home.propTypes = {
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
})(withStyles(styles)(Home));