/**
 * Using the fetch hook, getting some example review information from supabase
 * @description
 * In example (routing is not needed for the useFetch hook to work)
 * Using 'react-router-native' - created a route with stubs '/review/:table/:id'
 *
 * @author Wallace Krumrei
 */
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useParams } from "react-router-native";

// Hooks
import useFetch from "../../hooks/useFetch";

// Data
import { getUserReview, likeReview } from "../../data/reviews";

// Put this here to slim out the example (this would normally be it's own imported component)
const ReviewItem = (item, onClick) => {
  return (
    <View className="flex-[2]">
      <TouchableOpacity onPress={() => onClick()}>
        <Text className="text-white font-bold border-neutral-800 p-2 min-h-[80px]">
          {item.message}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

function Review() {
  const { table, id } = useParams();

  // Fetch the user review from Supabase and cached with react query
  const {
    data: reviewData,
    isLoading,
    isFetching,
  } = useFetch("userReview", getUserReview, { table: table, id: id }, true);

  // Fetch the like data from Supabase and cached with react query
  const { get: incrementLikes } = useFetch("likeReview", likeReview, {
    table: table,
    id: id,
  });

  // Send an update to Supabase to increment the likes
  const onLikeReview = async () => {
    incrementLikes();
  };

  // Example Usage the useFetch hook
  return (
    <>
      <ScrollView>
        {isLoading || isFetching ? (
          <ActivityIndicator size="large" className="mt-12" />
        ) : (
          <ReviewItem item={reviewData} onClick={onLikeReview}></ReviewItem>
        )}
      </ScrollView>
    </>
  );
}
export default Review;
