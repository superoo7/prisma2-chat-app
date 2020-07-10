import React from "react";
import { TabName } from "../";

// Turn enum into array
function ToArray(enumme: any) {
  const StringIsNumber = (value: any) => isNaN(Number(value)) === false;

  return Object.keys(enumme)
    .filter(StringIsNumber)
    .map((key) => enumme[key]);
}

export const Tabs: React.FC<{ tab: TabName; setTab: (t: TabName) => void }> = ({
  tab,
  setTab,
}) => {
  return (
    <ul className="nav nav-tabs">
      {ToArray(TabName).map((t, key) => {
        const isActive = key === tab;
        return (
          <li className="nav-item" key={key}>
            <a
              onClick={() => setTab(key)}
              className={`nav-link${isActive ? " active" : ""}`}
              href={`#${t}`}
            >
              {t}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
