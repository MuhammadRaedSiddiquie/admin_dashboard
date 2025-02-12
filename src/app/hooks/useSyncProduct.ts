// src/hooks/useSyncProduct.ts
import { useEffect } from 'react';
import useProductStore from '../stores/useProductStore';
import axios from 'axios';

const useSyncProduct = () => {
  const syncProduct = useProductStore((state) => state.syncProduct);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('/api/product');
        if (response.status === 200) {
          // Ensure the response data is an array
         console.log(response.data,'response')
          const items = Array.isArray(response.data) ? response.data : [];
          syncProduct(items);
        }
      } catch (error) {
        console.error('Error fetching Product:', error);
      }
    };

   
      fetchProduct();
    
  }, [ syncProduct]);
};

export default useSyncProduct;