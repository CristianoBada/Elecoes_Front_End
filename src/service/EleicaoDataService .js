import axios from 'axios'

const VERSAO = 'v1'
const API_URL = 'http://localhost:8080'
const INSTRUTOR_API_URL = `${API_URL}/${VERSAO}`

class EleicaoDataService {
    retornaTodasEleicoes() {
        return axios.get(`${INSTRUTOR_API_URL}/eleicoes`);
    }

    criarEleicoes(eleicao) {
        return axios.post(`${INSTRUTOR_API_URL}/eleicoes`, eleicao);
    }

    retornaTodosCargos() {
        return axios.get(`${INSTRUTOR_API_URL}/cargos`);
    }

    criarCargo(cargo) {
        return axios.post(`${INSTRUTOR_API_URL}/cargos`, cargo);
    }

    retornaTodosCandidatos() {
        return axios.get(`${INSTRUTOR_API_URL}/candidatos`);
    }

    criarCandidato(candidato) {
        return axios.post(`${INSTRUTOR_API_URL}/candidatos`, candidato);
    }

    retornaEleicoesFinalizadas() {
        return axios.get(`${INSTRUTOR_API_URL}/relatorioFinal`);
    }

    retornaEleicoesEmAndamento() {
        return axios.get(`${INSTRUTOR_API_URL}/relatorioParcial`);
    }

    retornaCargosPorEleicao(id) {
        return axios.get(`${INSTRUTOR_API_URL}/cargos/eleicoes`, id);
    }
}

export default new EleicaoDataService();