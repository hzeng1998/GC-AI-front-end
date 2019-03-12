import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from "@material-ui/core/Grid/Grid";
import {Link} from "react-router-dom";
import {
  AccountBox,
  ExitToApp,
  Games,
  Mail,
  Notifications,
  Receipt,
} from "@material-ui/icons"
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import {connect} from "react-redux";
import {logout} from "../../actions";

const styles = {
  list: {
    width: 250,
  },
};

class TemporaryDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "Fu Zhengzhe",
    }
  }

  render() {
    const {classes, open, handleDrawerClose, logout} = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <Grid container justify="center" alignItems="center">
            <Avatar/>
          </Grid>
          <Grid container justify="center" alignItems="center">
            <Typography variant={"subtitle1"}> {this.state.name} </Typography>
          </Grid>
          <Divider/>
          {[['Profile', <AccountBox/>, "/profile"],
            ['Code Storage', <Receipt/>, "/code_storage"],
            ['My Battles', <Games/>, "/my_games"],
            ['System Messages', <Mail/>, "/messages"],
            ['Notifications', <Notifications/>, "/notifications"]].map((item) => (
            <Link key={item[0]} to={{pathname: item[2]}}>
              <ListItem button>
                <ListItemIcon>{item[1]}</ListItemIcon>
                <ListItemText primary={item[0]}/>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider/>
        <List>
          {[['Log out', <ExitToApp/>]].map((item) => (
            <ListItem button key={item[0]} onClick={logout}>
              <ListItemIcon>{item[1]}</ListItemIcon>
              <ListItemText primary={item[0]}/>
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div>
        <Drawer open={open} onClose={handleDrawerClose}>
          <div
            tabIndex={0}
            role="button"
            onClick={handleDrawerClose}
            onKeyDown={handleDrawerClose}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};


const initMapStateToProps = () => ({

});

export default connect(initMapStateToProps, {logout})(withStyles(styles)(TemporaryDrawer));
