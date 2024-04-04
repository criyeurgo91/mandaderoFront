import apiUrl from './apiConfig';

export async function fetchData(endpoint) {
  const response = await fetch(`${apiUrl}/${endpoint}`);
  return response.json();
}