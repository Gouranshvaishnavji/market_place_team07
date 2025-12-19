import { supabase } from './supabase';

export const fetchProducts = async () => {
  try {
    console.log('Fetching products from Supabase...');
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      // If error is RLS related, it might return empty data instead of throwing, 
      // but if it throws, we log it here.
      return [];
    }

    if (!data || data.length === 0) {
      console.log('No products returned. This could be due to empty table OR RLS policies blocking access.');
    } else {
      console.log(`Successfully fetched ${data.length} products`);
    }
    
    return data;
  } catch (err) {
    console.error('Unexpected error fetching products:', err);
    return [];
  }
};
