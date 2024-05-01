import axios from 'axios';

export const nativeApi = axios.create({
  baseURL: 'https://nest-postgres-dogs.onrender.com/',
});

export const setToken = (token) => {
  nativeApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearToken = () => {
  nativeApi.defaults.headers.common['Authorization'] = '';
};

export async function register(body) {
  setToken(data.token); 
  const { data } = await nativeApi.post('/user', body);
  return data;
}

export async function login(body) {
  
  const { data } = await nativeApi.post('/auth/login',body);
  setToken(data.token); 
  return data;
}

export async function logout() {
  const { data } = await nativeApi.post('/logout');
  clearToken();
  return data;
}

export async function refresh(token) {
  setToken(token);
  const {
    data: { user },
  } = await nativeApi('/auth/profile');
  return user;
}
export async function avatar(file) {
  const { data } = await nativeApi.patch("/auth/avatar", file,{
  headers: {
    'Content-Type': 'multipart/form-data',
  }},);
  return data
}