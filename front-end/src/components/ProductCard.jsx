import PropTypes from 'prop-types';
import { useContext } from 'react';
import Context from '../context/Context';

function ProductCard({ product, i }) {
  const {dataCsv} = useContext(Context);

  const dataNewPrice = () => {
      const extractedData = dataCsv.map((item) => item.new_price);
      return extractedData;
    };
      
    const dataNew = dataNewPrice();

  return (
    <tbody>
      <tr>
        <td>{product.code}</td>
        <td>{product.name}</td>
        <td>R$ {product.costPrice}</td>
        <td>R$ {product.salesPrice}</td>
        <td>R$ {dataNew[i-1]}</td>
      </tr>
    </tbody>
  );
}

ProductCard.propTypes = {
  code: PropTypes.number,
  name: PropTypes.string,
  costPrice: PropTypes.number,
  salesPrice: PropTypes.number,
}.isRequired;

export default ProductCard;