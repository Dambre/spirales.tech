import { renderToStaticMarkup } from "react-dom/server";
import App from "./app/App";

export function render() {
  return renderToStaticMarkup(<App />);
}
