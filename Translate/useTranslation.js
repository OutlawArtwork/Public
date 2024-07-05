/**
 * Translation hook
 * @description This hook can be used to easily translate text using the Translate component
 * @author Wallace Krumrei
 */
import Translate from "./Translate";
function useTranslation() {
  // Translate text
  const translate = (text) => {
    return <Translate from={`@${text}@`} />;
  };

  return { translate };
}
export default useTranslation;
