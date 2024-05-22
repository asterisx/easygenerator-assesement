import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import { useIsUserAuthenticated, useLogoutUser } from "./helpers";

const drawerWidth = 240;

const StyledMain = styled("main")(({ theme }) => ({
  marginLeft: drawerWidth,
  padding: theme.spacing(3),
  marginTop: theme.spacing(8),
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
}));

const Header = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const navigate = useNavigate();
  const logoutUser = useLogoutUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EasyGenerator
        </Typography>
        {isAuthenticated ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

function App() {
  const isAuthenticated = useIsUserAuthenticated();
  return (
    <div className="App">
      <Header isAuthenticated={isAuthenticated} />
      <StyledDrawer variant="permanent">
        <Toolbar />
        <List>
          <ListItem component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
      </StyledDrawer>
      <StyledMain>
        <Outlet />
      </StyledMain>
    </div>
  );
}

export default App;
