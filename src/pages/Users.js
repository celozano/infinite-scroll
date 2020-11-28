import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';

import { getUsers } from '../api';
import InfiniteScroll from '../components/InfiniteScroll';

const queryCache = new QueryCache();

const entity = {
  entityName: 'users',
  fetchFunction: getUsers,
  headers: {
    id: 'ID',
    name: 'NAME',
    email: 'EMAIL',
    gender: 'GENDER',
    status: 'STATUS',
    created_at: 'CREATED',
    updated_at: 'UPDATED',
  },
  order: [
    'id',
    'name',
    'email',
    'gender',
    'status',
    'created_at',
    'updated_at',
  ],
};

const Users = () => {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState(false);
  const [state, setState] = useState({
    id: '',
    name: '',
    email: '',
    gender: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const clearFilters = () => {
    setState({
      id: '',
      name: '',
      email: '',
      gender: '',
      status: '',
    });
    setQuery({});
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    clearFilters();
  };

  const handleClearClick = () => {
    clearFilters();
  };

  const handleApplpyClick = () => {
    setQuery(state);
  };

  return (
    <Container>
      <Box mt={10}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h4">Users</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleExpandClick}
            >
              FILTER
            </Button>
          </Grid>
        </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom>Filters</Typography>
              <Grid container spacing={1}>
                <Grid item xs={1}>
                  <TextField
                    name="id"
                    label="ID"
                    variant="outlined"
                    size="small"
                    inputProps={{
                      maxLength: 5,
                    }}
                    value={state.id}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    size="small"
                    inputProps={{
                      maxLength: 30,
                    }}
                    fullWidth
                    value={state.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    inputProps={{
                      maxLength: 45,
                    }}
                    fullWidth
                    value={state.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    select
                    name="gender"
                    label="Gender"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={state.gender}
                    onChange={handleChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    select
                    name="status"
                    label="Status"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={state.status}
                    onChange={handleChange}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <Grid container justify="flex-end">
                <Box mt={2}>
                  <Button
                    variant="contained"
                    style={{ marginRight: 5, minWidth: 93 }}
                    onClick={handleClearClick}
                  >
                    CLEAR
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ minWidth: 93 }}
                    onClick={handleApplpyClick}
                  >
                    APPLY
                  </Button>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        </Collapse>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <Box mt={2}>
            <Paper variant="outlined">
              <InfiniteScroll entity={entity} query={query} />
            </Paper>
          </Box>
        </ReactQueryCacheProvider>
      </Box>
    </Container>
  );
};

export default Users;
