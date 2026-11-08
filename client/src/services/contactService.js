import api from './api'

export async function sendMessage(data) {
  const response = await api.post('/contact', data)
  return response.data
}