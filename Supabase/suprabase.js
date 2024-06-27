import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
const options = {
  db: {
    schema: "public",
  },
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { application: "[application name]" },
  },
};

// Supabase connection information
const Suprabase = createClient(
  "[Your own Supabase]",
  "[Info in here]",
  options
);
export default Suprabase;
