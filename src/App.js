import React, { useEffect, useState } from "react";
import "./styles.css";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

export default function App() {
  const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });
  const classes = useStyles();
  const [user, setUser] = useState([]);
  const [switched, setSwitched] = useState(false);
  const [switchedUser, setSwitchedUser] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then((userResults) => setUser(userResults));
  }, []);

  const upClickHandler = (id) => {
    let arr = user;
    let obj = user[id];
    arr[id] = arr[id - 1];
    arr[id - 1] = obj;
    id !== 0 && setSwitchedUser([...arr]);
    setSwitched(true);
  };

  const downClickHandler = (id) => {
    let arr = user;
    let obj = user[id];
    arr[id] = arr[id + 1];
    arr[id + 1] = obj;
    id !== switchedUser.length - 1 && setSwitchedUser([...arr]);
    setSwitched(true);
  };

  return (
    <div className="App">
      <h1>App Stone Interview</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ color: "white" }}>
            <TableRow style={{ background: "teal", fontWeight: "700" }}>
              <TableCell align="left">Up</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">E-mail</TableCell>
              <TableCell align="left">Down</TableCell>
            </TableRow>
          </TableHead>
          {switched ? (
            <TableBody>
              {switchedUser?.map((row, id) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <ArrowUpwardIcon onClick={() => upClickHandler(id)} />
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">
                    <ArrowDownwardIcon onClick={() => downClickHandler(id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {user?.map((row, id) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <ArrowUpwardIcon onClick={() => upClickHandler(id)} />
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">
                    <ArrowDownwardIcon onClick={() => downClickHandler(id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}
