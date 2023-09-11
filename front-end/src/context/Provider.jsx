import { useMemo, useState } from 'react';
import Context from './Context';
import PropTypes from 'prop-types';

function Provider({ children }) {
  const [productInfoArray, setProductInfoArray] = useState([]);
  const [csvData, setCsvData] = useState(null);
  const [dataCsv, setDataCsv] = useState({});

  const contextValue = useMemo(() => ({
    productInfoArray,
    setProductInfoArray,
    csvData,
    setCsvData,
    dataCsv,
    setDataCsv,
  }), [productInfoArray, setProductInfoArray, csvData, setCsvData, dataCsv, setDataCsv]);

  return (
    <Context.Provider value={ contextValue } >
      { children }
    </Context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};