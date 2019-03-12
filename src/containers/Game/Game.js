import React from 'react';
import Table from "../../components/Table/Table";
import Grid from "@material-ui/core/Grid/Grid";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {getGames} from "../../actions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

let counter = 0;

function createData(game_id, name, introduction, rank) {
  counter += 1;
  return {id: counter, game_id, name, introduction, rank};
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: ["GameID", "Name", "Introduction", "Rank"],
    };
  }

  componentDidMount() {
    if (this.props.isFetching === false)
      this.props.getGames();
  }

  render() {

    const {classes} = this.props;
    const rows = this.props.data.map((value) => (
      createData(value.id, value.name, value.introduction, "查看排名")
    ));

    return (
      <React.Fragment>
        <Grid container justify={"center"} direction={"row"} className={classes.root}>
          <Grid item xs={12} sm={8}>
            <Table title={this.state.title} rows={rows}/>
          </Grid>
        </Grid>
        <ErrorMessage/>
      </React.Fragment>
    );
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  getGames: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const initMapStateToProps = (state) => {
  const {games} = state;
  return {
    data: games.data,
    isFetching: games.isFetching,
  }
};

export default connect(initMapStateToProps, {
  getGames
})(withStyles(styles)(Game));