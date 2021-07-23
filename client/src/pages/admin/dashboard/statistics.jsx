import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import MenuAdmin from '../../../components/menu-admin'
import Footer from '../../../components/footer-admin'
import { Paper } from '@material-ui/core'
import clsx from 'clsx'
import Title from '../../../components/Title'
import { Typography } from '@material-ui/core'

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
    logo: {
        height: "55vh",
        marginTop: "10vh",
        marginBottom: "10vh",
    }
}))

export default function Statistics() {
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <MenuAdmin nameMenu="ESTÁTISTICAS"></MenuAdmin>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                {/* <Chart /> */}
                                {/* <Bar /> */}
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                {/* <Deposits /> */}
                                <Title>Profissionais Cadastrados</Title>
                                <Typography component="p" variant="h4">

                                </Typography>
                                <Typography color="textSecondary" className={classes.depositContext}>
                                    on 15 March, 2019
                                </Typography>
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                {/* <Orders /> */}
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Footer />
                    </Box>
                </Container>

            </main >
        </div >
    )
}