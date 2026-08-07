#!/usr/bin/env node

import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
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

const { render } = await import(join(SSR_OUT, 'entry-server.js'))
const html = render()

const indexPath = join(DIST, 'index.html')
let index = readFileSync(indexPath, 'utf8')

const chunk = index.match(/assets\/(index-[\w-]+\.js)/)?.[1]

const scriptTag = /\s*<script[^>]*type="module"[^>]*><\/script>/
if (!scriptTag.test(index)) throw new Error('no module script found in dist/index.html')
index = index.replace(scriptTag, '')

const root = /<div id="root"><\/div>/
if (!root.test(index)) throw new Error('no empty #root found in dist/index.html')
index = index.replace(root, `<div id="root">${html}</div>`)

writeFileSync(indexPath, index)

for (const stale of ['.vite', chunk].filter(Boolean)) {
  const p = join(DIST, 'assets', stale)
  if (existsSync(p)) rmSync(p, { recursive: true, force: true })
}
rmSync(SSR_OUT, { recursive: true, force: true })

const bytes = Buffer.byteLength(index)
console.log(`✓ prerendered — dist/index.html ${(bytes / 1024).toFixed(1)} kB, no runtime JS`)
