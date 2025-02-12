import { useEffect } from 'react';
import useProductStore from '../stores/useProductStore';

const usePersistProduct = () => {
  const items = useProductStore((state) => state.items);
  const syncProduct = useProductStore((state) => state.syncProduct);

  // Load Product from localStorage on mount
  useEffect(() => {
    const savedProduct = localStorage.getItem('product');
    if (savedProduct) {
      syncProduct(JSON.parse(savedProduct));
    }
  }, [syncProduct]);

  // Save Product to localStorage on update
  useEffect(() => {
    localStorage.setItem('product', JSON.stringify(items));
  }, [items]);
};

export default usePersistProduct;