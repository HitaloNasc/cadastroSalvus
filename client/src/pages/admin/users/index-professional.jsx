import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router'
import MenuAdmin from '../../../components/menu-professional'
import ImgAdmin from '../../../assets/img/salvus.svg'
import InputMask from 'react-input-mask'
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, makeStyles, Box, Container, Grid, Paper } from '@material-ui/core'
import Footer from '../../../components/footer-admin'
import api from '../../../services/api'
import { getIdUser } from '../../../services/auth'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    fontFamily: 'Arial'
  },
  table: {
    minWidth: 650,
    whiteSpace: 'nowrap'
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
  admin: {
    backgroundColor: theme.palette.success.dark
  },
  professional: {
    backgroundColor: theme.palette.secondary.dark
  },
  buttonUpdate: {
    borderColor: theme.palette.success.dark
  },
  buttonDelete: {
    borderColor: theme.palette.secondary.dark
  },
  titleH2: {
    color: theme.palette.success.dark,
    fontWeight: 600
  }
}))

export default function ListUser() {
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
  const [range, setRange] = useState('')
  const [primaryOccupation, setPrimaryOccupation] = useState('')
  const [secondaryOccupation, setSecondaryOccupation] = useState('')
  const [birth, setBirth] = useState('')
  const idUser = getIdUser()

  useEffect(() => {
    async function getUser() {
      var response = await api.get(`/api/users.details/${idUser}`)
      setName(response.data.username)
      setEmail(response.data.email)
      setUserType(response.data.userType)
      setPassword(response.data.password)
      setTel(response.data.tel)
      setGender(response.data.gender)
      setCpf(response.data.cpf)
      setAddress(response.data.address)
      setCep(response.data.cep)
      setProfession(response.data.profession)
      setRegistration(response.data.registration)
      setRange(response.data.range)
      setPrimaryOccupation(response.data.primaryOccupation)
      setSecondaryOccupation(response.data.secondaryOccupation)
      setBirth(response.data.birth)
    }

    getUser()
  }, [])

  async function handleSubmit() {

    const data = {
      _id: idUser,
      username,
      email,
      userType: 2,
      password,
      tel,
      gender,
      cpf,
      address,
      cep,
      profession,
      registration,
      range,
      primaryOccupation,
      secondaryOccupation,
      birth
    }

    if (username !== ''
      && email !== ''
      && userType !== ''
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
      const response = await api.put('/api/users', data)

      if (response.status === 200) {
        window.location.href = '/admin'
      } else {
        alert('Erro ao atualizar o usuário')
      }
    } else {
      alert('Por favor, preencha todos os dados obrigatórios.')
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin nameMenu="DADOS DE USUÁRIO" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <main className={classes.content}>
                  <div className={classes.appBarSpacer} />
                  <Container maxWidth="lg" className={classes.container}>
                    <Grid item sm={12}>
                      <Paper className={classes.paper}>
                        <Grid container spacing='medium'>
                          <Grid item align="center" xs={12} sm={12}>
                            <img className={classes.logo} src={ImgAdmin} alt="logo-salvus" />
                            <h2 className={classes.titleH2}>Atualização de Usuário</h2>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                              <h3>Dados de Login</h3>
                            </Grid>
                            <Grid item xs={12} sm={6}>
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
                              <TextField
                                fullWidth
                                required
                                margin="normal"
                                id="date"
                                label="Data de nascimento"
                                type="date"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={birth}
                                onChange={e => setBirth(e.target.value)}
                              />
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
                                fullWidth
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
                            <Grid item xs={12} sm={4}>
                              <FormControl
                                fullWidth
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
                            <Grid item xs={12} sm={4}>
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
                            <Grid item xs={12} sm={4}>
                              <FormControl
                                fullWidth
                                margin="normal"
                                required
                                className={classes.formControl}>
                                <InputLabel>Ráio de atuação</InputLabel>
                                <Select
                                  value={range}
                                  onChange={e => setRange(e.target.value)}
                                >
                                  <MenuItem disabled>Selecione</MenuItem>
                                  <MenuItem value={10}>10km</MenuItem>
                                  <MenuItem value={15}>15km</MenuItem>
                                  <MenuItem value={20}>20km</MenuItem>
                                  <MenuItem value={25}>25km</MenuItem>
                                  <MenuItem value={30}>30km</MenuItem>
                                  <MenuItem value={35}>35km</MenuItem>
                                  <MenuItem value={40}>40km</MenuItem>
                                  <MenuItem value={45}>45km</MenuItem>
                                </Select>
                              </FormControl>
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
                        </Grid>
                        <hr />
                        <Grid item xs={12} sm={12}>
                          <Button onClick={handleSubmit} color="primary" variant="contained" className={classes.button}>
                            Salvar
                          </Button>
                          {/* <Button onClick={handleBack} variant="contained" color="secondary" className={classes.buttonBack}>
                  Voltar
                </Button> */}
                        </Grid>
                      </Paper>
                    </Grid>
                  </Container>
                </main>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  )
}