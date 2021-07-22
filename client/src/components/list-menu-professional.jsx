import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import DashboardIcon from '@material-ui/icons/Dashboard'
import People from '@material-ui/icons/Person'
import ExitToApp from '@material-ui/icons/ExitToApp'
import api from '../services/api'
import { getToken, logout } from '../services/auth'

export const mainListItems = (
  <div>
    <ListItem button component='a' href="/admin" >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component="a" href="/admin/users/professional" >
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="Dados de usuário" />
    </ListItem>
    
  </div>
)

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Opções</ListSubheader>
    <ListItem button onClick={confirmSair}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
    
  </div>
)

async function confirmSair(){
  if (window.confirm('Deseja realmente sair do sistema?')) {
    const response = await api.get('/api/users/destroytoken', {headers: {token: getToken()}})
    if(response.status===200){
      logout()
      window.location.href='/'
    }else{
      alert('Não foi possível fazer o logout!')
    }
  }
}