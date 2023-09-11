import axios from 'axios';

const BASE_URL = 'http://localhost:3002';

export const enviarDadosAoBackend = (jsonData) => {
  for (const item of jsonData) {
    const url = `${BASE_URL}/products/${item.product_code}`;
    console.log(jsonData);
    return axios.patch(url, item, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const requestProducts = async (jsonData) => {
  console.log(jsonData);
  const requests = jsonData.map((item) => {
    const url = `${BASE_URL}/products/${item.product_code}`;
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  const responses = await axios.all(requests);
    return responses.map((response) => response.data);
}

