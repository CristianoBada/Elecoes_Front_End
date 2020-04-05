import React, { Component } from 'react';
import EleicaoComponent from './EleicaoComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class InstruturaApp extends Component {
    render() {
        return (
            <Router>
                <>       
                    <Switch>
                        <Route path="/" exact component={EleicaoComponent} />
                        <Route path="/eleicoes" exact component={EleicaoComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}
export default InstruturaApp