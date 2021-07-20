import React, { useState } from 'react'
import ImgAdmin from '../../../assets/img/salvus.svg'
import InputMask from 'react-input-mask'
import DateFnsUtils from '@date-io/date-fns'
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, makeStyles, Box, Container, Grid, Paper } from '@material-ui/core'
import Footer from '../../../components/footer-admin'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import api from '../../../services/api'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.success.main,
    paddingRight: 24, // keep right padding when drawer closed
  },
  root: {
    display: 'flex',
    fontFamily: 'Arial'
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
    padding: theme.spacing(5),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: {
    width: '100%'
  },
  button: {
    backgroundColor: theme.palette.success.dark,
  },
  buttonBack: {
    marginLeft: 15,
    backgroundColor: theme.palette.secondary.dark
  },
  headBar: {
    // backgroundColor: theme.palette.success.main,
    padding: 15,
    margin: 0,
    color: "black",
    height: "10vh",
    width: "80vw"
  },
  logo: {
    height: "10vh",
  },
  titleH2: {
    color: theme.palette.success.dark,
    fontWeight: 600
  }
}))

export default function CreateUser() {
  const classes = useStyles()

  // Delcaraçãs das variáveis do formulário
  const [username, setName] = useState('')
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState('')
  const [password, setPassword] = useState('')
  const [tel, setTel] = useState('')
  const [gender, setGender] = useState('')
  const [cpf, setCpf] = useState('')
  const [address, setAddress] = useState('')
  const [cep, setCep] = useState('')
  const [profession, setProfession] = useState('')
  const [registration, setRegistration] = useState('')
  const [primaryOccupation, setPrimaryOccupation] = useState('')
  const [secondaryOccupation, setSecondaryOccupation] = useState('')
  const [birth, setBirth] = React.useState(new Date())

  const handleDateChange = (date) => {
    setBirth(date)
  }

  function handleBack() {
    return window.location.href = '/'
  }

  async function handleSubmit() {

    const data = {
      username,
      email,
      userType,
      password,
      tel,
      gender,
      cpf,
      address,
      cep,
      profession,
      registration,
      primaryOccupation,
      secondaryOccupation,
      birth
    }

    if (username !== ''
      && email !== ''
      && password !== ''
      && birth !== ''
      && cpf !== ''
      && address !== ''
      && cep !== ''
      && tel !== ''
      && gender !== ''
      && profession !== ''
      && primaryOccupation !== ''
    ) {
      const response = await api.post('/api/users', data)
      if (response.status === 200) {
        console.log(data)
        window.location.href = '/'
      } else {
        alert('Erro ao cadastrar o usuário')
      }
    } else {
      alert('Por favor, preencha todos os dados obrigatórios.')
    }
  }

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid item sm={12}>
            <Paper className={classes.paper}>
              <Grid container spacing='medium'>
                <Grid item align="center" xs={12} sm={12}>
                  <img className={classes.logo} src={ImgAdmin} alt="logo-salvus" />
                  <h2 className={classes.titleH2}>Bem vindo a plataforma Salvus!</h2>
                </Grid>
                <Grid item align="center" xs={12} sm={12}>
                  <h3 className={classes.spacegArea}>CRIE SUA CONTA</h3>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <h3>Dados de Login</h3>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Nome completo"
                    fullWidth
                    autoComplete="name"
                    value={username}
                    onChange={e => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="email"
                    name="emal"
                    label="E-mail"
                    fullWidth
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="password"
                    required
                    id="password"
                    name="password"
                    label="Senha"
                    fullWidth
                    autoComplete="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <h3>Dados Pessoais</h3>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      fullWidth
                      required
                      helperText={'Formato inválido'}
                      error={''}
                      format="dd/MM/yyyy"
                      margin="normal"
                      label="Data de nascimento"
                      value={birth}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputMask
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                  >
                    {() => <TextField
                      required
                      fullWidth
                      label="CPF"
                      margin="normal"
                      type="text"
                    />}

                  </InputMask>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    margin="normal"
                    type="text"
                    label="Endereço"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputMask
                    mask="99.999-999"
                    value={cep}
                    onChange={e => setCep(e.target.value)}
                  >
                    {() => <TextField
                      fullWidth
                      margin="normal"
                      required
                      type="text"
                      label="CEP"
                    />}
                  </InputMask>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputMask
                    mask="(99) 99999-9999"
                    value={tel}
                    onChange={e => setTel(e.target.value)}
                  >
                    {() => <TextField
                      required
                      fullWidth
                      label="Telefone"
                      margin="normal"
                      type="text"
                    />}

                  </InputMask>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    margin="normal"
                    required
                    className={classes.formControl}>
                    <InputLabel>Gênero</InputLabel>
                    <Select
                      value={gender}
                      onChange={e => setGender(e.target.value)}
                    >
                      <MenuItem disabled>Selecione</MenuItem>
                      <MenuItem value={"Masculino"}>Masculino</MenuItem>
                      <MenuItem value={"Feminino"}>Feminino</MenuItem>
                      <MenuItem value={"Prefiro não dizer"}>Prefiro não dizer</MenuItem>
                      <MenuItem value={"Outro"}>Outro</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <h3>Dado Proficionais</h3>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    margin="normal"
                    required
                    className={classes.formControl}>
                    <InputLabel>Profissão</InputLabel>
                    <Select
                      value={profession}
                      onChange={e => setProfession(e.target.value)}
                    >
                      <MenuItem disabled>Selecione</MenuItem>
                      <MenuItem value={"Biomédico(a)"}>Biomédico(a)</MenuItem>
                      <MenuItem value={"Dentista"}>Dentista</MenuItem>
                      <MenuItem value={"Educador(a) Físico"}>Educador(a) Físico</MenuItem>
                      <MenuItem value={"Enfermeiro(a)"}>Enfermeiro(a)</MenuItem>
                      <MenuItem value={"Fisioterapeuta"}>Fisioterapeuta</MenuItem>
                      <MenuItem value={"Nutricionista"}>Nutricionista</MenuItem>
                      <MenuItem value={"Psicólogo(a)"}>Psicólogo(a)</MenuItem>
                      <MenuItem value={"Radiologista"}>Radiologista</MenuItem>
                      <MenuItem value={"Ourto"}>Ourto</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    type="text"
                    id="registration"
                    name="registration"
                    label="Regisro"
                    fullWidth
                    autoComplete="registration"
                    value={registration}
                    onChange={e => setRegistration(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    type="text"
                    id="primaryOccupation"
                    name="primaryOccupation"
                    label="Ocupação primária"
                    fullWidth
                    autoComplete="primaryOccupation"
                    value={primaryOccupation}
                    onChange={e => setPrimaryOccupation(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="secondaryOccupation"
                    id="secondaryOccupation"
                    name="secondaryOccupation"
                    label="Ocupação segundária"
                    fullWidth
                    autoComplete="secondaryOccupation"
                    value={secondaryOccupation}
                    onChange={e => setSecondaryOccupation(e.target.value)}
                  />
                </Grid>
              </Grid>
              <hr />
              <Grid item xs={12} sm={12}>
                <Button onClick={handleSubmit} color="primary" variant="contained" className={classes.button}>
                  Salvar
                </Button>
                <Button onClick={handleBack} variant="contained" color="secondary" className={classes.buttonBack}>
                  Voltar
                </Button>
              </Grid>
            </Paper>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  )
}