import { renderToStaticMarkup } from "react-dom/server";
import App from "./app/App";
import { languages, type Lang } from "./app/content";

export function render(lang: Lang) {
  return renderToStaticMarkup(<App lang={lang} />);
}

export function pages() {
  return Object.values(languages).map(c => ({ lang: c.lang, path: c.path, locale: c.locale, meta: c.meta }));
}
