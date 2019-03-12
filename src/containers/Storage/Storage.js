import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import MenuList from "@material-ui/core/MenuList/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {Add, Edit, OutlinedFlag, Send} from "@material-ui/icons";
import Fab from "@material-ui/core/Fab/Fab";
import {getCodes, setErrorMessage, uploadCodes} from "../../actions";

const currencies = [
  {
    value: 'cpp',
    label: 'C/C++',
  },
  {
    value: 'c#',
    label: 'C#',
  },
  {
    value: 'javascript',
    label: 'JavaScript',
  },
  {
    value: 'java',
    label: 'Java',
  },
  {
    value: 'go',
    label: 'Go',
  },
];

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  storage: {
    padding: theme.spacing.unit * 3,
    width: "100%",

  },
  textField: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  fab: {
    float: "left",
    position: "relative",
    top: "-28px",
    left: "calc(50% - 28px)",
  },
  codeList: {
    padding: theme.spacing.unit * 3,
  }
});

class Storage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      language: "cpp",
      code_type: '',
      game_id: '',
      source_code: '',
    };
  }

  componentDidMount() {
    if (this.props.isFetching === false) {
      this.props.getCodes();
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleShow = (index) => () => {
    this.setState({
      ...this.props.data[index],
    });
  };

  handleAdd = () => {
    this.setState({
      language: "cpp",
      code_type: '',
      game_id: '',
      source_code: '',
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.code_type && this.state.language && this.state.game_id && this.state.source_code) {

      let {code_type, language, game_id, source_code} = this.state;
      let data = {code_type: Number(code_type), language, game_id: Number(game_id), source_code};
      console.log(data);
      this.props.uploadCodes(data);
      if (this.props.isFetching === false) {
        this.props.getCodes();
      }
    }
    else {
      console.log(this.state);
      this.props.setErrorMessage("Please Complete All of the Required Information");
    }
  };

  render() {

    const {classes, data} = this.props;

    return (
      <React.Fragment>
        <Grid container justify={"space-around"} direction={"row"} className={classes.root}>
          <Grid item xs={12} sm={4}>
            <Paper>
              <Typography variant={"h4"} className={classes.codeList}>{"我的代码"} </Typography>
              <MenuList>{
                data.map((element, index) => (
                  <MenuItem onClick={this.handleShow(index)} className={classes.menuItem}
                            key={"" + element.code_type + element.game_id + index}>
                    <ListItemIcon className={classes.icon}>
                      {element.code_type === 1 ? <Send/> : element.code_type === 2 ? <OutlinedFlag/> : <Edit/>}
                    </ListItemIcon>
                    <ListItemText classes={{primary: classes.primary}} inset
                                  primary={`游戏ID:${element.game_id} 攻防类型:${element.code_type}`}/>
                  </MenuItem>
                ))
              }</MenuList>
              <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.handleAdd}>
                <Add/>
              </Fab>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} container>
            <Paper className={classes.storage}>
              <Typography variant={"h4"}>{"游戏代码"} </Typography>
              <form onSubmit={this.handleSubmit}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    id="game_id"
                    label="游戏 ID"
                    placeholder="0"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                    value={this.state.game_id}
                    onChange={this.handleChange("game_id")}
                    helperText="注:(游戏只能保存用作攻防代码各一份，更新后将重置该游戏的积分排名)"
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    id="code_type"
                    label="攻防代码"
                    placeholder="1"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                    value={this.state.code_type}
                    onChange={this.handleChange("code_type")}
                    helperText="用数字表示，1(攻)/0(防)"
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    id="language"
                    select
                    label="select language"
                    className={classes.textField}
                    value={this.state.language}
                    onChange={this.handleChange('language')}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    helperText="请选择上传代码的语言"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  >
                    {currencies.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={11}>
                  <TextField
                    id="source_code"
                    label="source code"
                    multiline
                    rows="15"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={this.state.source_code}
                    onChange={this.handleChange('source_code')}
                    fullWidth
                  />
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {"上传"}
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
        <ErrorMessage/>
      </React.Fragment>
    );
  }
}

Storage.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      "code_type": PropTypes.number,
      "game_id": PropTypes.number,
      "language": PropTypes.string,
      "source_code": PropTypes.string,
      "user_id": PropTypes.number,
    })
  ),
  getCodes: PropTypes.func.isRequired,
  uploadCodes: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

const initMapStateToProps = (state) => {
  const {allCodes: {data, isFetching}} = state;
  return {
    data,
    isFetching,
  }
};

export default connect(initMapStateToProps, {
  getCodes,
  uploadCodes,
  setErrorMessage,
})(withStyles(styles)(Storage));