import Suprabase from "./suprabase";
import { queryClient } from "@tanstack/react-query";

// Clear queries
export const clear = (id) => {
  queryClient.removeQueries(id);
};

// Get a user review
export const getUserReview = async (params) => {
  const { data: reviewData, error: reviewError } = await Suprabase.from(
    params.table
  )
    .select()
    .eq("id", params.id)
    .single();

  return reviewError ? null : reviewData;
};

// Like a review
export const likeReview = async (params) => {
  const { error: reviewError } = await Suprabase.rpc("increment", {
    table_name: params.table,
    field_name: "likes",
    x: 1,
    row_id: Number(params.id),
  });

  return reviewError ? false : true;
};
