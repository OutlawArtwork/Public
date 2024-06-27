/**
 * Reusable Label / Button component
 * @description This component is used to build consistant text components
 * Uses 'nativewind' and 'tailwindcss' for styling
 *
 * @example
 *
 * Regular label
 * <Label>This is a label</Label>
 *
 * Button
 * <Label onClick={() => someFunction()}>Click button</Label>
 *
 * Styling
 * <Label style="text-lg">Styled</Label>
 *
 * @author Wallace Krumrei
 */
import { View, Text } from "react-native";

function Label({ children, style, onClick }) {
  return (
    <>
      {onClick ? (
        <View className={`bg-amber-800 p-3 rounded-lg`}>
          <Text
            onPress={onClick}
            className={`text-[16px] text-white/90 ${style}`}
          >
            {children}
          </Text>
        </View>
      ) : (
        <Text className={`text-[16px] text-white/90 ${style}`}>{children}</Text>
      )}
    </>
  );
}
export default Label;
