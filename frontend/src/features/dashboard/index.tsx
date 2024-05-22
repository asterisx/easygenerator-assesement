import {
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2.5),
}));

const Dashboard = () => (
  <StyledGridContainer container spacing={3}>
    <Grid item xs={12} md={6}>
      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          Recent Activities
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Signed in" secondary="Today, 10:00 AM" />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Updated profile"
              secondary="Yesterday, 3:45 PM"
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Checked notifications"
              secondary="Yesterday, 1:12 PM"
            />
          </ListItem>
        </List>
      </StyledPaper>
    </Grid>
    <Grid item xs={12} md={6}>
      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          Quick Stats
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="New messages"
              secondary="15 unread messages"
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Pending tasks"
              secondary="5 tasks to complete"
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Upcoming events"
              secondary="2 events this week"
            />
          </ListItem>
        </List>
      </StyledPaper>
    </Grid>
  </StyledGridContainer>
);

export default Dashboard;
