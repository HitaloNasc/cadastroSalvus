import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import api from '../../../services/api';
import { Button, ButtonGroup } from '@material-ui/core';
import { Chip } from '@material-ui/core';
// import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// // const rows = [
// //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// //   createData('Eclair', 262, 16.0, 24, 6.0),
// //   createData('Cupcake', 305, 3.7, 67, 4.3),
// //   createData('Gingerbread', 356, 16.0, 49, 3.9),
// // ];


export default function ListUser() {
  const classes = useStyles();
  const [users, setUsers] = useState([])
  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/api/users')
      setUsers(response.data)
    }
    loadUsers()
  }, [])

  function typeUser(params) {
    if (params === 1) {
      return <Chip label="Administrador" color="primary" />
    } else {
      return <Chip label="Funcionário" color="secondary" />
    }
  }

  async function handleDelete(id){
    if(window.confirm("Deseja realmente excluir este usuário?")){
      var result = await api.delete('api/users/' + id)
      if (result.status===200) {
        window.location.href='/admin/users'
      }else{
        alert('Ocorreu um erro, tente novamente.')
      }
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin nameMenu="USUÁRIOS" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Listagem de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>

                    <TableContainer component={Paper}>
                      <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="center">E-mail</TableCell>
                            <TableCell align="center">Tipo</TableCell>
                            <TableCell align="center">Data de Cadastro</TableCell>
                            <TableCell align="center">Opções</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {users.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell component="th" scope="row">
                                {row.username}
                              </TableCell>
                              <TableCell align='center'>{row.email}</TableCell>
                              <TableCell align='center'>{typeUser(row.userType)}</TableCell>
                              <TableCell align='center'>{new Date(row.createdAt).toLocaleDateString('pt-br')}</TableCell>
                              <TableCell align="center">
                                <ButtonGroup aria-label="outlined primary button group">
                                  <Button color="primary" href={'/admin/users/update/' + row._id}>Editar</Button>
                                  <Button color="secondary" onClick={() => handleDelete(row._id)}>Excluir</Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}