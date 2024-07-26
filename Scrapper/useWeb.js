/**
 * Web scrapper hook
 * @description Hook used to call and retieve information from the web scrapper
 * @author Wallace Krumrei
 */
import { useState } from "react";

// Web scrapper
import { run } from "./scapper";

function useWeb() {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);

  // Run the web scrapper
  const set = async (country, city, address) => {
    setLoading(true);
    setValue(await run(country, city, address));
    setLoading(false);
  };

  // Clear results (usually called as useEffect unmount)
  const clear = () => {
    setValue(null);
  };

  return { value, set, loading, clear };
}
export default useWeb;
