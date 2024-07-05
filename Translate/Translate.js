/**
 * Translate compoenent
 * @description Component for translating text
 * @example
 * @author Wallace Krumrei
 */
import React, { useContext } from "react";

import { LanguageContext } from "../context/context";

function Translate({ from, children }) {
  const language = useContext(LanguageContext);

  const translate = (text) => {
    return text
      ? text.toLowerCase().replace(/@([\w]+)@/g, (_, token) => language[token])
      : text;
  };

  // Translate any text sent to it containing '@text@'
  if (from) {
    return translate(from);
  }

  // Will translate children that contain the tokens '@text@'
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          children: translate(child.props.children),
        });
      })}
    </div>
  );
}
export default Translate;
