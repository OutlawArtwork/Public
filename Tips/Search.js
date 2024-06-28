/**
 * Small tooltip example
 */
import { useState } from "react";
import { View } from "react-native";

// Components
import Label from "../components/ui/Label";
import Tip from "../components/Tip";

function TooltipExample() {
  const [tips, setTips] = useState(1);

  // Tips example
  return (
    <>
      <Tip
        id="toolTip1"
        text="This is tooltip 1 select screen to move to the next one"
        show={tips == 1}
        location="bottom"
        nextTip={() => setTips(2)}
      >
        <View className="flex flex-row mt-1">
          <Label style="text-sm ml-1 mt-2">
            The tooltip should be pointed at this text
          </Label>
        </View>
      </Tip>
      <Tip
        id="toolTip2"
        text="This is tooltip 2, this will end the sequence"
        show={tips == 2}
        location="bottom"
      >
        <View className="flex flex-row mt-1">
          <Label style="text-sm ml-1 mt-2">
            The tooltip should be pointed at this text next
          </Label>
        </View>
      </Tip>
    </>
  );
}
export default TooltipExample;
