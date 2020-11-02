import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import classNames from "classnames";
import "./Cursor.css";

const isMobile = () => {
   const ua = navigator.userAgent;
   return /Android|Mobi/i.test(ua);
};

const Cursor = () => {
   const [position, setPosition] = useState({ x: 0, y: 0 });
   const [clicked, setClicked] = useState(true);
   const [linkHovered, setLinkHovered] = React.useState(false);
   const [hidden, setHidden] = useState(false);

   useEffect(() => {
      addEventListeners();
      handleLinkHoverEvents();
      return () => removeEventListeners();
   });

   const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
   };

   const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
   };

   const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
   };

   const onMouseDown = () => {
      setClicked(true);
   };

   const onMouseUp = () => {
      setClicked(false);
   };

   const onMouseLeave = () => {
      setHidden(true);
   };

   const onMouseEnter = () => {
      setHidden(false);
   };

   const handleLinkHoverEvents = () => {
      document.querySelectorAll("a").forEach((el) => {
         el.addEventListener("mouseover", () => setLinkHovered(true));
         el.addEventListener("mouseout", () => setLinkHovered(false));
      });
   };

   const cursorClasses = classNames("cursor", {
      "cursor--clicked": true,
      "cursor--hidden": hidden,
      "cursor--link-hovered": linkHovered,
   });

   if (typeof navigator !== "undefined" && isMobile()) return null;

   return (
      <div
         className={cursorClasses}
         style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
   );
};
export default Cursor;
