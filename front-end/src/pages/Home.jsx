import { useState } from 'react';
import { enviarDadosAoBackend, requestProducts } from '../services/requests';

function Home() {
  const [csvData, setCsvData] = useState(null);
  const [productInfoArray, setProductInfoArray] = useState([]);

  const handleFileChange = ({ target }) => {
    const file = target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = ({ target }) => {
        const content = target.result;
        setCsvData(content);
      };

      reader.readAsText(file);
    }
  };

  const convertCsvToJson = () => {
    if (csvData) {
      const rows = csvData.split('\n');
      const headers = rows[0].split(',');
      const jsonData = [];
  
      for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(',');
        const rowObject = {};
  
        for (let j = 0; j < headers.length; j++) {
          const key = headers[j].trim().replace(/"/g, '');
          const value = values[j].trim().replace(/"/g, '');
  
          rowObject[key] = value;
        }
  
        jsonData.push(rowObject);
        }
  
      return jsonData;
    }
  };
  

  const sendData = () => {
    const jsonData = convertCsvToJson()
    if (jsonData) {
      enviarDadosAoBackend(jsonData)
        .then((response) => {
          console.log('Resposta do servidor:', response.productUpdate);
        })
        .catch((error) => {
          console.error('Erro ao enviar os dados ao servidor:', error);
        });
    }
  };

  const fetchAllProducts = () => {
    const jsonData = convertCsvToJson()
    requestProducts(jsonData)
      .then((response) => {
        console.log('Produtos do banco de dados:', response);
        setProductInfoArray(response);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos no banco de dados:', error);
      });
  };

  return (
    <section>
      <div>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={sendData}>Atualizar</button>
        <button onClick={fetchAllProducts}>Validar</button>
        <div>
          <ul>
          {productInfoArray.map((productInfo, index) => (
            <li key={index}>
              
            </li>
          ))}
          </ul>
        </div>
      </div>
      <div>
        
      </div>
    </section>
  );
}

export default Home;
