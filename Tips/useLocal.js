/**
 * Helper hook for accessing the local storage
 * @author Wallace Krumrei
 */
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useLocal(key, clearKey = false) {
  const [keyValue] = useState(key);
  const [value, setValue] = useState(null);
  const get = async () => {
    if (!keyValue) return;
    const value = await AsyncStorage.getItem(keyValue);
    if (value) setValue(value);
  };

  const set = async (newValue) => {
    await AsyncStorage.setItem(keyValue, newValue);
    setValue(newValue);
  };

  const clear = async () => {
    await AsyncStorage.removeItem(keyValue);
  };

  useEffect(() => {
    if (clearKey) {
      clear();
    } else {
      get();
    }
  }, []);

  return { set, value, clear, keyValue };
}
export default useLocal;
