/**
 * Tool tips that can be chanined together to guide a user through an app
 * @example
 * Uses
 * 'react-native-walkthrough-tooltip
 * 'nativewind' and 'tailwindcss'
 *
 * @author Wallace Krumrei
 */
import { useState, useEffect } from "react";
import { View } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";

// Components
import Label from "./ui/Label";
import useLocal from "../../hooks/useLocal";

/**
 *
 * @param {String} id - Unique name for the tooltip
 * @param {String} text - Text used as the message
 * @param {*} children
 * @param {String} location - position of the tooltip - top/bottom/left/right
 * @param {Number} padding - padding of the inset
 * @param {Number} horizontal - horizontal margin
 * @param {boolean} show - If the tooltip should be displayed
 * @param {*} nextTip - callback function for invoking the next tooltip (attached to a state)
 * @returns
 */
function Tip({
  id,
  text,
  children,
  location = "bottom",
  padding = 24,
  horizontal = 0,
  show = true,
  nextTip,
}) {
  const [showTip, setShowTip] = useState(false);
  const { value: tipValue, set: setTipValue } = useLocal(id);

  // Close a tip
  const onHandleClose = () => {
    if (nextTip) nextTip();
    setTipValue("done");
    setShowTip(false);
  };

  // Show a tip
  useEffect(() => {
    if (!tipValue) {
      setTimeout(() => {
        setShowTip(show);
      }, 200);
    }
  }, [tipValue, show]);

  return (
    <>
      {!tipValue && showTip ? (
        <Tooltip
          arrowSize={{ width: 20, height: 12 }}
          disableShadow={true}
          showChildInTooltip={false}
          contentStyle={{ backgroundColor: "rgba(161,98,7,0.9)" }}
          isVisible={show}
          content={
            <View className="flex bg-yellow-700/90 w-full h-full rounded-lg">
              <Label style="text-[16px] text-white p-1">{text}</Label>
            </View>
          }
          displayInsets={{
            top: padding,
            left: padding,
            right: padding,
            bottom: padding,
          }}
          horizontalAdjustment={horizontal}
          placement={location}
          onClose={() => onHandleClose()}
        >
          {children}
        </Tooltip>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
export default Tip;
