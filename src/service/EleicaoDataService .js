import axios from 'axios'

const VERSAO = 'v1'
const COMMENT_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${COMMENT_API_URL}/${VERSAO}`

class EleicaoDataService {
    retrieveAllEleicoes() {
        return axios.get(`${INSTRUCTOR_API_URL}/eleicoes`);
    }

    createEleicoes(eleicao) {
        return axios.post(`${INSTRUCTOR_API_URL}/eleicoes`, eleicao);
    }
}

export default new EleicaoDataService();