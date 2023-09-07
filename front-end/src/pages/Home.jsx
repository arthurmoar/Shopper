import { useEffect, useState } from "react";
import { requestProducts } from "../services/requests";
import requestCSVFile from "../utils/requestCSVFile";

export default function Home () {
  const { products, setProducts } = useState([]);

  const handleFileChange = async ({ target })  => {
    if (target.files) {
      requestCSVFile();
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await requestProducts('/products');
      setProducts(data)
    };

    fetchData()
  }, [setProducts])

  return (
    <section>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </section>
  );
}
