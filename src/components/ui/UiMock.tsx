import type { CSSProperties } from "react";

interface Props {
  url?: string;
  src: string;
  alt: string;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  barStyle?: CSSProperties;
}

export default function UiMock({
  url = "app.talentportal.io/dashboard",
  src,
  alt,
  style,
  imgStyle,
  barStyle,
}: Props) {
  return (
    <div className="ui-mock" style={style}>
      <div className="ui-mock-bar" style={barStyle}>
        <span className="ui-mock-dot" style={{ background: "#ff5f57" }} />
        <span className="ui-mock-dot" style={{ background: "#ffbd2e" }} />
        <span className="ui-mock-dot" style={{ background: "#28c941" }} />
        <span className="ui-mock-url">{url}</span>
      </div>
      <img className="ui-mock-img" src={src} alt={alt} style={imgStyle} />
    </div>
  );
}
