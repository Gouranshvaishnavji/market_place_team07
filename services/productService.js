import { supabase } from './supabase';

export const fetchProducts = async () => {
  try {
    console.log('Fetching products from Supabase...');
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error.message);
      return [];
    }

    console.log('Successfully fetched products:', data);
    return data;
  } catch (err) {
    console.error('Unexpected error fetching products:', err);
    return [];
  }
};
