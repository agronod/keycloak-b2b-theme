import React from "react";
import { headInsert } from "keycloakify/lib/tools/headInsert";
import { pathJoin } from "keycloakify/bin/tools/pathJoin";
import { clsx } from "keycloakify/lib/tools/clsx";
import { KcContextBase, KcProps } from "keycloakify";

export const useExtraCss = (
  props: KcProps,
  url: KcContextBase.Common["url"]
) => {
  const [isExtraCssLoaded, setExtraCssLoaded] = React.useReducer(
    () => true,
    false
  );

  React.useEffect(() => {
    let isUnmounted = false;
    const cleanups: (() => void)[] = [];

    const toArr = (x: string | readonly string[] | undefined) =>
      typeof x === "string" ? x.split(" ") : x ?? [];

    Promise.all(
      [
        ...toArr(props.stylesCommon).map((relativePath) =>
          pathJoin(url.resourcesCommonPath, relativePath)
        ),
        ...toArr(props.styles).map((relativePath) =>
          pathJoin(url.resourcesPath, relativePath)
        ),
      ]
        .reverse()
        .map((href) =>
          headInsert({
            type: "css",
            href,
            position: "prepend",
          })
        )
    ).then(() => {
      if (isUnmounted) {
        return;
      }

      setExtraCssLoaded();
    });

    toArr(props.scripts).forEach((relativePath) =>
      headInsert({
        type: "javascript",
        src: pathJoin(url.resourcesPath, relativePath),
      })
    );

    if (props.kcHtmlClass !== undefined) {
      const htmlClassList = document.getElementsByTagName("html")[0].classList;

      const tokens = clsx(props.kcHtmlClass).split(" ");

      htmlClassList.add(...tokens);

      cleanups.push(() => htmlClassList.remove(...tokens));
    }

    return () => {
      isUnmounted = true;

      cleanups.forEach((f) => f());
    };
  }, []);

  return isExtraCssLoaded;
};
