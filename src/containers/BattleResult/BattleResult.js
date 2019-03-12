import React from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getBattleResult} from "../../actions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit * 3,
  },
  paper: {
    width: "100%",
    padding: theme.spacing.unit * 2,
    backgroundColor: "#eceff1"
  },
  button: {
    flex: 1,
  }
});

class BattleResult extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      iframeHeight: 0,
      gameInstance: null,
    }
  }

  componentDidMount() {
    const {battle_id} = this.props.match.params;
    if (battle_id !== undefined) {
      this.props.getBattleResult(battle_id);
    }
  }

  handleData = () => {
    if (this.state.gameInstance !== null && this.props.battleResult.detail !== undefined) {
      this.state.gameInstance.SendMessage("GameManager", "passGameInformation", this.props.battleResult.detail);
    }
  };

  render() {

    const {classes, battleResult} = this.props;

    return (
      <Grid container justify={"center"} alignItems={"center"} className={classes.root}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>{
            battleResult.game_id !== undefined
              ? (<iframe
                style={{width: "100%", height: this.state.iframeHeight, overflow: "visible", boxShadow: "1px"}}
                onLoad={() => {
                  const iframeDocument = this.iframe.contentWindow.document;
                  const gameContainer = iframeDocument.getElementsByClassName("webgl-content")[0];
                  this.setState({
                    iframeHeight: gameContainer.clientHeight + 'px',
                    gameInstance: this.iframe.contentWindow.gameInstance,
                  });
                }}
                title={"GameContext"}
                ref={(iframe) => this.iframe = iframe}
                src={`/static/game/${battleResult.game_id}/index.html`}
                frameBorder="0"
              />)
              : <div style={{width: "100%", height: "500px", backgroundColor: "grey"}}/>
          }
          </Paper>
          <Grid item container justify={"center"}>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleData}>
              {"传入对战过程数据，点击播放对战过程"}
            </Button>
          </Grid>
        </Grid>
        <ErrorMessage/>
      </Grid>
    );
  }
}

BattleResult.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  battleResult: PropTypes.shape({
    "attacker_id": PropTypes.number,
    "defender_id": PropTypes.number,
    "detail": PropTypes.string,
    "game_id": PropTypes.number,
    "penalty_score": PropTypes.number,
    "reward_score": PropTypes.number,
    "status": PropTypes.number,
    "winner_id": PropTypes.number,
  }).isRequired,
};

const initMapStateToProps = (state) => {
  const {battleResult} = state;
  return {
    isFetching: battleResult.isFetching,
    battleResult: battleResult.data,
  };
};

export default connect(initMapStateToProps, {
  getBattleResult,
})(withStyles(styles)(BattleResult));