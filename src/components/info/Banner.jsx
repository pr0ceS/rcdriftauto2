import React, { useState } from "react";

const QuestionContext = React.createContext();
export default function Banner({ children, ...restProps }) {
  return (
    <div {...restProps}>
      <div>{children}</div>
    </div>
  );
}
Banner.Entity = function BannerEntity({ children, ...restProps }) {
  const [open, setOpen] = useState(false);
  return (
    <QuestionContext.Provider value={{ open, setOpen }}>
      <div {...restProps}> {children}</div>
    </QuestionContext.Provider>
  );
};
Banner.Question = function BannerHeader({ children, ...restProps }) {
  const { open, setOpen } = React.useContext(QuestionContext);

  return (
    <div className="vraag" onClick={() => setOpen((open) => !open)} {...restProps}>
      <h3>{children}</h3>
      {open ? <h3>^</h3> : <h3>+</h3>}
    </div>
  );
};
Banner.Text = function BannerText({ children, ...restProps }) {
  const { open } = React.useContext(QuestionContext);
  return open ? <p className="antwoord" {...restProps}>{children}</p> : null;
};