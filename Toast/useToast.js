/**
 * Toast Hook
 * @description Hook for displaying a toast messages on screen works for both IOS and Android.
 * Uses 'react-native-reanimated' for Animations
 * Uses 'nativewind' and 'tailwindcss for styling
 *
 * @example
 * const {toast, set: openToast} = useToast()
 *
 * const invokeToast = (message) => {
 *  openToast(message, 3000);
 * }
 *
 * <View>{toast}</View>
 *
 * @author Wallace Krumrei
 */
import { useState } from "react";
import { View } from "react-native";
import Animated, {
  SlideInDown,
  SlideOutDown,
  Easing,
} from "react-native-reanimated";

// Components
import Label from "../screens/components/ui/Label"; // Custom component (Use Text instead if you want to use React Native component)

function useToast() {
  const [toastMessage, setToastMessage] = useState(null);

  /**
   * Display the message
   * @param {String} message // Display message
   * @param {Number} timeout // Timeout value in ms
   */
  const set = (message, timeout = 3000) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, timeout);
  };

  /**
   * Toast component that is displayed on screen
   */
  const toast = toastMessage ? (
    <View
      style={{
        display: "flex",
        position: "absolute",
        bottom: 0,
        width: "100%",
        marginTop: -60,
        zIndex: 1,
      }}
    >
      {toastMessage && (
        <Animated.View
          entering={SlideInDown.duration(500).easing(Easing.ease)}
          exiting={SlideOutDown.duration(500).easing(Easing.ease)}
        >
          <View
            style={{
              backgroundColor: "rgba(180, 93, 0, 1)",
              padding: 10,
              borderRadius: 5,
              textAlign: "center",
              alignContent: "center",
            }}
          >
            <Label style="text-center text-lg">{toastMessage}</Label>
          </View>
        </Animated.View>
      )}
    </View>
  ) : null;

  return { toast, set };
}
export default useToast;
