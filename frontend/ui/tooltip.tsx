import React from "react";
import { useState } from "react";

type Props = {
  children: JSX.Element;
  text: string;
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
        <div className="absolute text-sm pointer-events-none right-0 top-0 translate-x-full bg-black border border-blue p-2 z-50">
          {props.text}
        </div>
      )}
    </div>
  );
}
