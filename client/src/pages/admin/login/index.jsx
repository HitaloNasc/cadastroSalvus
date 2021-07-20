import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from '../../../components/footer-admin'
import { useState } from 'react';
import api from '../../../services/api';
import { login, setIdUser, setNameUser } from '../../../services/auth'


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: theme.palette.success.dark,
        // backgroundColor: theme.palette.primary.main,
        margin: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        backgroundColor: theme.palette.success.dark,
        margin: theme.spacing(3, 0, 2),
    },
    submitCreate: {
        backgroundColor: theme.palette.secondary.dark
    }
}));

export default function SignIn() {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit() {
        await api.post('/api/users/login', { email, password })
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 1) {
                        // token:token, id_client:user._id, user_name:user.username
                        login(res.data.token)
                        setIdUser(res.data.id_client)
                        setNameUser(res.data.user_name)

                        window.location.href = '/Admin'
                    } else if (res.data.status === 2) {
                        alert('Atenção:' + res.data.error)
                    }
                } else {
                    alert('Erro no servidor.')
                }
            })

    }

    function handleSubmitCreate() {
        return window.location.href = '/admin/users/create'
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    SALVUS.ME
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Digite seu e-mail..."
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Digite sua senha..."
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    Entrar
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submitCreate}
                    onClick={handleSubmitCreate}
                >
                    Criar usuário
                </Button>
            </div>
            <Box mt={8}>
                <Footer />
            </Box>
        </Container>
    );
}