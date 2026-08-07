#!/usr/bin/env node

import { readFileSync, writeFileSync, rmSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SSR_OUT = join(ROOT, '.ssr-tmp')

await build({
  root: ROOT,
  logLevel: 'warn',
  build: {
    ssr: join(ROOT, 'src', 'entry-server.tsx'),
    outDir: SSR_OUT,
    emptyOutDir: true,
  },
})

const { render, pages } = await import(join(SSR_OUT, 'entry-server.js'))

const indexPath = join(DIST, 'index.html')
const template = readFileSync(indexPath, 'utf8')

const scriptTag = /\s*<script[^>]*type="module"[^>]*><\/script>/
if (!scriptTag.test(template)) throw new Error('no module script found in dist/index.html')
const root = /<div id="root"><\/div>/
if (!root.test(template)) throw new Error('no empty #root found in dist/index.html')
const chunk = template.match(/assets\/(index-[\w-]+\.js)/)?.[1]
const cssLink = template.match(/<link rel="stylesheet"[^>]*href="\/assets\/(style-[\w-]+\.css)"[^>]*>/)
if (!cssLink) throw new Error('no stylesheet link found in dist/index.html')
const css = readFileSync(join(DIST, 'assets', cssLink[1]), 'utf8')

const en = pages().find(p => p.lang === 'en')
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const must = (html, from, to) => {
  if (!html.includes(from)) throw new Error(`prerender: expected "${from.slice(0, 60)}" in template`)
  return html.split(from).join(to)
}

for (const page of pages()) {
  let html = template.replace(scriptTag, '').replace(cssLink[0], `<style>${css}</style>`).replace(root, `<div id="root">${render(page.lang)}</div>`)
  if (page.lang !== 'en') {
    const url = `https://spirales.tech${page.path}`
    html = must(html, '<html lang="en">', `<html lang="${page.lang}">`)
    html = must(html, `<title>${esc(en.meta.title)}</title>`, `<title>${esc(page.meta.title)}</title>`)
    html = must(html, `content="${esc(en.meta.title)}"`, `content="${esc(page.meta.title)}"`)
    html = must(html, `content="${esc(en.meta.description)}"`, `content="${esc(page.meta.description)}"`)
    html = must(html, `content="${esc(en.meta.share)}"`, `content="${esc(page.meta.share)}"`)
    html = must(html, `"description": ${JSON.stringify(en.meta.description)}`, `"description": ${JSON.stringify(page.meta.description)}`)
    html = must(html, '<link rel="canonical" href="https://spirales.tech/" />', `<link rel="canonical" href="${url}" />`)
    html = must(html, '<meta property="og:url" content="https://spirales.tech/" />', `<meta property="og:url" content="${url}" />`)
    html = must(html, '<meta property="og:locale" content="en_US" />', `<meta property="og:locale" content="${page.locale}" />\n    <meta property="og:locale:alternate" content="en_US" />`)
    html = html.replace(/\s*<script data-locale-redirect>[\s\S]*?<\/script>/, '')
    const preloadLatin = '<link rel="preload" href="/fonts/dm-sans-300-500-latin.woff2" as="font" type="font/woff2" crossorigin />'
    if (!html.includes(preloadLatin)) throw new Error('prerender: expected latin preload in template')
    html = html.replace(preloadLatin, preloadLatin + '\n    <link rel="preload" href="/fonts/dm-sans-300-500-latin-ext.woff2" as="font" type="font/woff2" crossorigin />\n    <link rel="preload" href="/fonts/unbounded-400-700-latin-ext.woff2" as="font" type="font/woff2" crossorigin />')
    if (html.includes('data-locale-redirect')) throw new Error('prerender: locale redirect survived on non-en page')
  }
  const dir = join(DIST, page.path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
  console.log(`✓ ${page.path} — ${(Buffer.byteLength(html) / 1024).toFixed(1)} kB`)
}

const sitemapPath = join(DIST, 'sitemap.xml')
const sitemap = readFileSync(sitemapPath, 'utf8')
if (!sitemap.includes('__LASTMOD__')) throw new Error('no __LASTMOD__ placeholder in sitemap.xml')
writeFileSync(sitemapPath, sitemap.split('__LASTMOD__').join(new Date().toISOString().slice(0, 10)))

for (const stale of ['.vite', chunk, cssLink[1]].filter(Boolean)) {
  const p = join(DIST, 'assets', stale)
  if (existsSync(p)) rmSync(p, { recursive: true, force: true })
}
rmSync(SSR_OUT, { recursive: true, force: true })

console.log('✓ prerendered — no runtime JS')
