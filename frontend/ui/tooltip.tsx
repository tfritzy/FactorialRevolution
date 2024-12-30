import React from "react";
import { useState } from "react";

type Props = {
  children: JSX.Element;
  tooltip: JSX.Element | string;
};

export function Tooltip(props: Props) {
  const [shown, setShown] = useState<boolean>(false);

  const show = React.useCallback(() => setShown(true), []);
  const hide = React.useCallback(() => setShown(false), []);

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {props.children}
      {shown && (
        <div className="absolute text-sm pointer-events-none -right-1 bottom-1 translate-x-full z-50 bg-dark-purple p-1 border border-blue">
          {props.tooltip}
        </div>
      )}
    </div>
  );
}