import React, { Component } from 'react'
import Select, { components } from 'react-select';
import EleicaoDataService from '../service/EleicaoDataService ';
import { Formik, Form, Field, ErrorMessage } from 'formik';


class CargoComponent extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.refreshCargos = this.refreshCargos.bind(this)
        this.validate = this.validate.bind(this)
        this.getInicialStateCago = this.getInicialStateCago.bind(this)
        this.getOptions = this.getOptions.bind(this);
        this.alaterarItem = this.alaterarItem.bind(this);

        this.state = this.getInicialStateCago();

        EleicaoDataService.retornaTodasEleicoes()
            .then(
                response => {
                    this.setState({ eleicoes: response.data })
                    this.getOptions()
                }
            )

        this.refreshCargos();
    }

    getInicialStateCago() {
        return {
            cargos: [],
            eleicoes: [],
            opcoes: [],
            message: null,
            id: -1,
            nome: '',
            eleicao: { id: -1, nome: '', fim: '', inicio: '' }, //Variavel para manter o select selecionado
            eleicao2: { id: -1, nome: '', fim: '', inicio: '' } //Gabiarra para salvar a eleicão no banco
        };
    }

    onSubmit(values) {
        let cargo = {
            id: this.state.id,
            nome: values.nome,
            eleicao: this.state.eleicao2
        }

        values.nome = ''
        this.setState({ eleicao: { id: -1, nome: '', fim: '', inicio: '' }, })
        this.setState({ eleicao2: { id: -1, nome: '', fim: '', inicio: '' }, })

        EleicaoDataService.criarCargo(cargo)
            .then(
                response => {
                    this.setState({ message: `Cargo salvo com sucesso!` })
                    this.refreshCargos()
                }
            )

    }

    refreshCargos() {
        EleicaoDataService.retornaTodosCargos()
            .then(
                response => {
                    this.setState({ cargos: response.data })
                }
            )
    }

    validate(values) {
        let errors = {}
        if (!values.nome) {
            errors.nome = 'Informe um nome para o cargo'
        } else if (values.nome.length < 5) {
            errors.nome = 'O nome tem que conter no minimo 5 digitos'
        }

        return errors

    }

    getOptions() {
      
        this.state.eleicoes.forEach((object, index, array) => {
            this.state.eleicao = { id: object.id, nome: object.nome, fim: object.fim, inicio: object.inicio };
            this.state.opcoes.push({ value: this.state.eleicao, label: object.nome })
        });
    }

    alaterarItem = (e) => {
        console.log(e.value.nome)
        this.setState({ eleicao2: { id: e.value.id, nome: e.value.nome, fim: e.value.fim, inicio: e.value.inicio } })
        this.setState({ eleicao: e.value.eleicao })
    }

    render() {
        let { nome, id, eleicao} = this.state

        return (
            <div className="container">
                <h1>Cadastro de Cargos</h1>
                {this.state.nome && <div class="alert alert-success">{this.state.nome}</div>}
                <Formik
                    initialValues={{ id, nome, eleicao }}
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
                                <label>Eleição: </label>
                                <Select value={this.state.eleicao} options={this.state.opcoes} onChange={this.alaterarItem}>
                                   
                                </Select>
                            </fieldset>
					        
                            <button className="btn btn-success" type="submit">Salvar</button>
                        </Form>
                    )
                    }
                </Formik>

                <h3>Cargos:</h3>


                <table className="table">
                    <tbody>
                        {
                            this.state.cargos.map(
                                cargo =>
                                    <tr key={cargo.id}>
                                        <td>{cargo.id}</td>
                                        <td>{cargo.nome}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CargoComponent