import React from 'react'
import { getTypeUser } from '../../../services/auth'
import DashAdministrator from './administrator'
import DashProfessional from './professional'

function getDashboard() {
  if (getTypeUser() == 1) {
    return <DashAdministrator />
  } else {
    return <DashProfessional />
  }
}
export default function Dashboard() {
  return (
    getDashboard()
  )
}