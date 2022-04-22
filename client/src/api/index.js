import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:12345',
});

export const runRfcPredict = payload => api.post(`/rfc-predict-another`, payload)

const apis = {
  runRfcPredict
};

export default apis