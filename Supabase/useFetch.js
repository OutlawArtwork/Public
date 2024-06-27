/**
 * Supabase Fetch Hook
 * @description Hook for fetching data from the database and caching it in React Query
 * Uses '@tanstack/react-query'
 * @example
 * const {get: getData, set: setData, data} = useFetch("fetchData", fetchFunction);
 *
 * @author Wallace Krumrei
 */
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Fetch
 * @param {String} id // Used to store the result in React Query
 * @param {function} func // async Fetch call
 * @param {*} params // Initial call params
 * @param {boolean} enabled // Call on load
 * @param {boolean} clear // Invalidate results on unmount
 * @returns
 */
function useFetch(id, func, params = "", enabled = false, clear = true) {
  const [searchParams, setSearchParams] = useState(params || "null");
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      if (clear) queryClient.removeQueries(id);
    };
  }, []);

  const { isLoading, error, data, isFetching, refetch } = useQuery({
    queryKey: [id],
    queryFn: () => func(searchParams),
    refetchOnWindowFocus: false,
    enabled: enabled,
  });

  /**
   * Performs the fetch
   * @param {*} clear
   * @param {*} params
   * @returns
   */
  const get = (clear = false) => {
    if (!searchParams && !params) return;
    if (clear) invalidate();
    refetch();
  };

  /**
   * Set the data params used to fetch
   * @param {*} params
   */
  const set = (params) => {
    setSearchParams(params);
  };

  /**
   * Update data param object
   * @param {*} value
   */
  const update = (value) => {
    setSearchParams({ ...searchParams, ...value });
  };

  /**
   * Clear the query
   */
  const invalidate = () => {
    queryClient.removeQueries(id);
  };

  /**
   * get() - (function) Makes call to retrive data
   * set() - (function) Sets the searchParams
   * data - [object / null] Results of the fetch
   * error - [object / null] Error of the fetch
   * update() - (function) Update searchParams - this can be partially updated by sending an object {key:value}
   * isLoading - {boolean} If currently loading
   * isFetching - (boolean) Is currently fetching data
   * searchParams() - The currently set searchParams
   */
  return {
    get,
    set,
    data,
    error,
    update,
    invalidate,
    isLoading,
    isFetching,
    searchParams,
  };
}
export default useFetch;
