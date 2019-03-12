import React from 'react';
import Table from "../../components/Table/Table";
import Grid from "@material-ui/core/Grid/Grid";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {getCodes, getRank, setErrorMessage, startBattle} from "../../actions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

let counter = 0;

function createData(rank, user_id, score, last_update) {
  counter += 1;
  return {id: counter, rank, user_id, score, last_update, challenge: "点击挑战"};
}

class Rank extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: ["Rank", "User ID", "Sore", "Last Update", "Challenge"],
    };
  }

  componentDidMount() {
    if (this.props.isFetching === false && this.props.match.params.game_id) {
      this.props.getRank(this.props.match.params.game_id);
      this.props.getCodes();
    }
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    const {battle_id} = nextProps.status;
    if (battle_id !== undefined && this.props.status.battle_id !== battle_id) {
      this.props.setErrorMessage("Start A Battle Succeed, Battle ID is " + battle_id);
      console.log(battle_id);
    }
  }

  handleChallenge = (user_id) => () => {
    const {game_id} = this.props.match.params;
    if (game_id !== undefined) {
      const attackCode = this.props.allCodes.filter((code) => (code.game_id === Number(game_id) && code.code_type === 1));
      if (attackCode.length === 0)
        this.props.setErrorMessage("未上传当前游戏的挑战代码");
      else {
        this.props.startBattle({
          "user_id": Number(user_id),
          "game_id": Number(game_id),
        });
      }
    }
  };

  render() {

    const {classes} = this.props;
    const rows = this.props.data.sort((a, b) => a.score - b.score).map((value, index) => (
      createData(index, value.user_id, value.score, value.last_update)
    ));

    return (
      <React.Fragment>
        <Grid container justify={"center"} direction={"row"} className={classes.root}>
          <Grid item xs={12} sm={8}>
            <Table title={this.state.title} rows={rows} handleSpecify={this.handleChallenge}/>
          </Grid>
        </Grid>
        <ErrorMessage/>
      </React.Fragment>
    );
  }
}

Rank.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  getRank: PropTypes.func.isRequired,
  getCodes: PropTypes.func.isRequired,
  startBattle: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  allCodes: PropTypes.arrayOf(
    PropTypes.shape({
      "code_type": PropTypes.number,
      "game_id": PropTypes.number,
      "language": PropTypes.string,
      "source_code": PropTypes.string,
      "user_id": PropTypes.number,
    })
  ),
  status: PropTypes.object.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

const initMapStateToProps = (state) => {
  const {gameRank, allCodes, challenge} = state;
  return {
    data: gameRank.data,
    isFetching: gameRank.isFetching,
    allCodes: allCodes.data,
    status: challenge.data,
  }
};

export default connect(initMapStateToProps, {
  getRank,
  getCodes,
  startBattle,
  setErrorMessage,
})(withStyles(styles)(Rank));