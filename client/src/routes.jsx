import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'
// IMPORTS ADMIN
import Dashboard from './pages/admin/dashboard'
import Login from './pages/admin/login'
import ListUsers from './pages/admin/users'
import UpdateUsers from './pages/admin/users/users.update'
import CreateUsers from './pages/admin/users/users.create'
import ProfessionalUsers from './pages/admin/users/index-professional'
// IMPORT HOME
import PrivateRoute from './services/wAuth'
import Statistics from './pages/admin/dashboard/statistics'

export default function Routes() {
    return (
        <BrowserRouter >
            <Switch>
                {/* Rota admin */}
                <Route path='/' exact component={Login} />
                <PrivateRoute path='/admin' exact component={Dashboard} />
                <PrivateRoute path='/admin/statistics' exact component={Statistics} />
                <PrivateRoute path='/admin/users' exact component={ListUsers} />
                <PrivateRoute path='/admin/users/professional' exact component={ProfessionalUsers} />
                <Route path='/admin/users/create' exact component={CreateUsers} />
                <PrivateRoute path='/admin/users/update/:idUser' exact component={UpdateUsers} />
            </Switch>
        </BrowserRouter>
    )
}