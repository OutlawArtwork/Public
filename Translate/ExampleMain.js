/**
 * Example of useTranslation usage
 */
import { View, Text } from "react-native";

// Hooks
import useTranslation from "./useTranslation";

function Main() {
  const { translate } = useTranslation();
  return (
    <View>
      <Text>{translate("test")}</Text>
    </View>
  );
}
export default Main;
