import { KcContextBase, KcProps } from "keycloakify";
import { clsx } from "keycloakify/lib/tools/clsx";
import { useExtraCss } from "./useExtraCss";

const Template = ({
  props,
  url,
  children,
}: {
  props: KcProps;
  url: KcContextBase.Common["url"];
  children: React.ReactNode;
}) => {
  useExtraCss(props, url);

  return (
    <div className={clsx(props.kcLoginClass)}>
      <div id="kc-header" className={clsx(props.kcHeaderClass)}>
        <div
          id="kc-header-wrapper"
          className={clsx(props.kcHeaderWrapperClass)}
        >
          {/* {msg("loginTitleHtml", realm.displayNameHtml)} */}
        </div>
      </div>

      <div className={clsx(props.kcFormCardClass)}>{children}</div>
    </div>
  );
};

export default Template;
