import React, { Component } from 'react';
import EleicaoComponent from './EleicaoComponent';
import CargoComponent from './CargoComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class InstruturaApp extends Component {
    render() {
        return (
            <Router>
                <>       
                    <Switch>
                        <Route path="/" exact component={EleicaoComponent} />
                        <Route path="/eleicoes" exact component={EleicaoComponent} />
                        <Route path="/cargos" exact component={CargoComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}
export default InstruturaApp