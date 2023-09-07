import axios from 'axios';
import requestCSVFile from '../utils/requestCSVFile';

const products = requestCSVFile();

axios.get('/products/multiple', { products })
  .then(function (response) {
    const products = response.data.products;
    console.log(products);
  })
