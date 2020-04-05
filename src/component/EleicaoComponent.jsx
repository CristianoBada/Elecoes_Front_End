import React, { Component } from 'react'
import EleicaoDataService from '../service/EleicaoDataService ';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class EleicaoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eleicoes: [],
            message: null,
            id: -1,
            nome: '',
            inicio: '',
            fim: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.refreshEleicoes = this.refreshEleicoes.bind(this)
        this.validate = this.validate.bind(this)

        this.refreshEleicoes();
    }

    eleicaotDidMount() {
        this.refreshEleicoes();
    }

    onSubmit(values) {
        let eleicao = {
            id: this.state.id,
            nome: values.nome,
            inicio: values.inicio,
            fim: values.fim
        }

        values.nome = ''
        values.inicio = ''
        values.fim = ''

        EleicaoDataService.createEleicoes(eleicao)
            .then(
                response => {
                    this.setState({ message: `Eleição salva com sucesso!` })
                    this.refreshEleicoes()
                }
        )

    }

    refreshEleicoes() {
        EleicaoDataService.retrieveAllEleicoes()
            .then(
                response => {
                    this.setState({ eleicoes: response.data })
                }
            )
    }

    validate(values) {
        let errors = {}
        if (!values.nome) {
            errors.nome = 'Informe um nome para a Eleição'
        } else if (values.description.length < 5) {
            errors.nome = 'O nome tem que conter no minimo 5 digitos'
        }

        return errors

    }

    render() {
        console.log('render')

        let { nome, inicio, fim, id } = this.state

        return (
            <div className="container">
                <h1>Cadastro de Eleições</h1>
                {this.state.nome && <div class="alert alert-success">{this.state.nome}</div>}
                <Formik
                    initialValues={{ id, nome, inicio, fim }}
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
                                <label>Data de Inicio:</label>
                                <Field className="form-control" type="date" name="inicio" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Data de Témino:</label>
                                <Field className="form-control" type="date" name="fim" />
                            </fieldset>
                            <button className="btn btn-success" type="submit">Salvar</button>
                        </Form>
                    )
                    }
                </Formik>

                <h3>Eleições:</h3>


                <table className="table">
                    <tbody>
                        {
                            this.state.eleicoes.map(
                                eleicao =>
                                    <tr key={eleicao.id}>
                                        <td>{eleicao.id}</td>
                                        <td>{eleicao.nome}</td>
                                        <td>{eleicao.inicio}</td>
                                        <td>{eleicao.fim}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}


export default EleicaoComponent