import { useContext } from 'react';
import { enviarDadosAoBackend, requestProducts } from '../services/requests';
import Context from '../context/Context';
import ProductCard from '../components/ProductCard';

function Home() {
  const { csvData, setCsvData } = useContext(Context);
  const { setDataCsv } = useContext(Context);
  const { productInfoArray, setProductInfoArray } = useContext(Context);

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
      setDataCsv(jsonData);
      return jsonData;
    }
  };
  

  const sendData = () => {
    const jsonData = convertCsvToJson()
    if (jsonData) {
      enviarDadosAoBackend(jsonData)
        .then((response) => {
          console.log('Resposta do servidor:', response.productUpdate);
          return response.productUpdate;
        })
        .catch((error) => {
          console.error('Erro ao enviar os dados ao servidor:', error);
        });
    }
  };

  const fetchAllProducts = () => {
    const jsonData = convertCsvToJson();
    console.log(jsonData);
    requestProducts(jsonData)
      .then((response) => {
        console.log('Produtos do banco de dados:', response);
        const extractedData = response.map((product) => product.product.data);
        setProductInfoArray(extractedData);
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
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Cost Price</th>
                <th>Sales Price</th>
                <th>New Price</th>
              </tr>
            </thead>
              {
                productInfoArray.map((product, index) => (
                  <ProductCard
                    key={ index }
                    product={ product }
                    i = {index + 1}
                  />
                ))
              }
          </table>
        </div>
      </div>
      <div>
        
      </div>
    </section>
  );
}

export default Home;
