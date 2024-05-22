import {
  Typography,
  Button,
  Paper,
  Container,
  ContainerProps,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const StyledContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  marginTop: theme.spacing(5),
  maxWidth: "lg",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  textAlign: "center",
  elevation: 3,
}));

const Home = () => {
  return (
    <StyledContainer component="main">
      <StyledPaper>
        <Typography variant="h3" gutterBottom>
          Welcome to Application
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Create, share and track online training for your employees, partners,
          and customers.
        </Typography>
        <Button variant="outlined" color="primary" component={Link} to="/login">
          Login
        </Button>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Home;
