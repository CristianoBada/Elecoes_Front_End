import React, { Component } from 'react'
import Select, { components } from 'react-select';
import EleicaoDataService from '../service/EleicaoDataService ';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class CandidatoComponent extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.refreshCandidatos = this.refreshCandidatos.bind(this)
        this.validate = this.validate.bind(this)
        this.getInicialStateCandidato = this.getInicialStateCandidato.bind(this)
        this.getOptions = this.getOptions.bind(this);
        this.alaterarItem = this.alaterarItem.bind(this);

        this.state = this.getInicialStateCandidato();

        EleicaoDataService.retornaTodosCargos()
            .then(
                response => {
                    this.setState({ cargos: response.data })
                    this.getOptions()
                }
            )

        this.refreshCandidatos();
    }

    getInicialStateCandidato() {
        return {
            candidatos: [],
            cargos: [],
            opcoes: [],
            message: null,
            id: -1,
            nome: '',
            imagem: '',
            votos: 0,
            cargo: { id: 1, nome: 'Programador C++', eleicao: { id: 2, nome: 'segunda', inicio: '2020-06-01', fim: '2020-03-01' } }
        }
    }

    onSubmit(values) {
        let candidato = {
            id: this.state.id,
            nome: values.nome,
            votos: this.state.votos,
            imagem: this.state.imagem,
            cargo: this.state.cargo
        }

        values.nome = ''

        EleicaoDataService.criarCandidato(candidato)
            .then(
                response => {
                    this.setState({ message: `Candidato salva com sucesso!` })
                    this.refreshCandidatos()
                }
            )

    }

    refreshCandidatos() {
        EleicaoDataService.retornaTodosCandidatos()
            .then(
                response => {
                    this.setState({ candidatos: response.data })
                }
            )
    }

    validate(values) {
        let errors = {}
        if (!values.nome) {
            errors.nome = 'Informe o nome do candidato'
        } else if (values.nome.length < 5) {
            errors.nome = 'O nome tem que conter no minimo 5 digitos'
        }

        return errors

    }

    getOptions() {

        this.state.cargos.forEach((object, index, array) => {
            this.state.cargo = { id: object.id, nome: object.nome, imagem: object.imagem, votos: object.votos, eleicao: object.eleicao };
            this.state.opcoes.push({ value: this.state.cargo, label: object.nome })
        });
    }

    alaterarItem = (e) => {
        console.log(e.value.nome)
        this.setState({ cargo: e.value.cargo })
    }

    render() {
        console.log('render')

        let { nome, id, imagem, votos } = this.state

        return (
            <div className="container">
                <h1>Cadastro de Eleições</h1>
                {this.state.nome && <div class="alert alert-success">{this.state.nome}</div>}
                <Formik
                    initialValues={{ id, nome, imagem, votos }}
                    onSubmit={this.onSubmit}
                >
                    {(props) => (
                        <Form>
                            <ErrorMessage name="nome" component="div"
                                className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Nome:</label>
                                <Field className="form-control" type="text" name="nome" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Cargos: </label>
                                <Select value={this.state.cargo} options={this.state.opcoes} onChange={this.alaterarItem}>

                                </Select>
                            </fieldset>
                            <button className="btn btn-success" type="submit">Salvar</button>
                        </Form>
                    )
                    }
                </Formik>

                <h3>Candidatos:</h3>


                <table className="table">
                    <tbody>
                        {
                            this.state.candidatos.map(
                                candidato =>
                                    <tr key={candidato.id}>
                                        <td>{candidato.id}</td>
                                        <td>{candidato.nome}</td>
                                        <td>{candidato.votos}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}


export default CandidatoComponent