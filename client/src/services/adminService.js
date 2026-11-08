import api from './api'

export async function fetchMessages(adminKey) {
  const response = await api.get('/contact', {
    headers: { 'x-admin-key': adminKey },
  })
  return response.data
}