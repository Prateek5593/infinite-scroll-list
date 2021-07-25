import * as React from "react";
import { Home } from "@material-ui/icons";
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useAuth } from "../providers/AuthProvider";

interface IHeaderProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header: React.FC<IHeaderProps> = (props) => {
  const classes = useStyles();
  const {
    dispatch,
  } = useAuth()

    const logout = () => {
      dispatch({
        type: 'LOGOUT',
      })
    }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <Home />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          INFINITE SCROLL
        </Typography>
        <Button onClick={logout} color="inherit">Log Out</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
