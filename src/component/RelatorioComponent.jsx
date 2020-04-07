import React, { Component } from 'react'
import EleicaoDataService from '../service/EleicaoDataService ';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import jsPDF from 'jspdf';

class RelatorioComponent extends Component {
    constructor(props) {
        super(props)

        this.criaRelatorioParcial = this.criaRelatorioParcial.bind(this);
        this.criaRelatorioFinal = this.criaRelatorioFinal.bind(this);
        this.geracaoDePDF = this.geracaoDePDF.bind(this);
        this.getInicialStateRelatorio = this.getInicialStateRelatorio.bind(this);

        this.state = this.getInicialStateRelatorio();
    }

    getInicialStateRelatorio() {
        return {
            nomeRelatorio: '',
            eleicoes: [],
            nomeArquivo: ''
        }
    }

    criaRelatorioParcial = () => {
        
            EleicaoDataService.retornaEleicoesEmAndamento()
                .then(
                    response => {
                        this.setState({ eleicoes: response.data })
                        this.setState({ nomeRelatorio: 'Relatório Parcial' })
                        this.setState({ nomeArquivo: "relatorio_parcial.pdf" })
                        this.geracaoDePDF()
                    }
                )
        }
    

    criaRelatorioFinal = () => {
        EleicaoDataService.retornaEleicoesFinalizadas()
            .then(
                response => {
                    this.setState({ eleicoes: response.data })
                    this.setState({ nomeRelatorio: 'Relatório Final' })
                    this.setState({ nomeArquivo: "relatorio_final.pdf" })
                    this.geracaoDePDF()
                }
            )
    }

    geracaoDePDF() {

        //novo documento em jspdf
        var doc = new jsPDF('p', 'pt');

        var linha = 40;

        doc.setFontSize(20);
        doc.text(20, linha, this.state.nomeRelatorio);
        linha = linha + 20;

        this.state.eleicoes.forEach((object, index, array) => {
            doc.setFontSize(14);
            doc.text(20, linha, 'Eleição: ' + object.nome);
            linha = linha + 20;
        });


        doc.save(this.state.nomeArquivo);

    }

    render() {

        return (
            <div className="container">
                <h1>Relatórios</h1>
                <button className="btn btn-success" onClick={this.criaRelatorioParcial}>Relatório Parcial</button>
                <br /> <br />
                <button className="btn btn-success" onClick={this.criaRelatorioFinal}>Relatório Final</button>
            </div>
        )
    }
}


export default RelatorioComponent