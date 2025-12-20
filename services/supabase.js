import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://cexnavsbfejuerlevwvn.supabase.co';
const supabaseAnonKey = 'sb_publishable_DsdL9RJ_DDe3-AXvP0V7Ug_i8DUaspU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
