#!/usr/bin/env node

import { mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { WORDMARK, DOMAIN } from './brand-glyphs.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BRAND = join(ROOT, 'brand')
const PUBLIC = join(ROOT, 'public')

const SPIRAL_PATH =
  'M 34.2,61.3 ' +
  'A 2.4,2.4,0,0,1 31.8,58.9 ' +
  'A 3.8,3.8,0,0,1 35.6,55.1 ' +
  'A 6.3,6.3,0,0,1 41.9,61.4 ' +
  'A 10.1,10.1,0,0,1 31.8,71.5 ' +
  'A 16.4,16.4,0,0,1 15.4,55.1 ' +
  'A 26.5,26.5,0,0,1 41.9,28.6 ' +
  'A 42.8,42.8,0,0,1 84.7,71.4'

const STROKE = 11
const INK = { x1: 15.4, y1: 28.6, x2: 84.7, y2: 71.5 }

const COLORS = {
  ink: '#0B0F1A',
  paper: '#E5E4DF',
  white: '#FFFFFF',
  blue: '#2563EB',
  grey: '#9CA3AF',
}

function markBox(pad = 0) {
  const h = STROKE / 2 + pad
  return {
    x: INK.x1 - h,
    y: INK.y1 - h,
    w: INK.x2 - INK.x1 + h * 2,
    h: INK.y2 - INK.y1 + h * 2,
  }
}

function spiralPath(color) {
  return (
    `<path d="${SPIRAL_PATH}" fill="none" stroke="${color}" ` +
    `stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round"/>`
  )
}

function textPath(set, color, indent = '    ') {
  return set.glyphs
    .map(g => `${indent}<path transform="translate(${g.x} 0)" d="${g.d}" fill="${color}"/>`)
    .join('\n')
}

function svg(width, height, body, extra = '') {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${round(width)}" height="${round(height)}" ` +
    `viewBox="0 0 ${round(width)} ${round(height)}"${extra}>\n${body}\n</svg>\n`
  )
}

const round = n => Number(n.toFixed(3))

function buildMark(color) {
  const b = markBox(2)
  const body = `  <g transform="translate(${round(-b.x)} ${round(-b.y)})">${spiralPath(color)}</g>`
  return svg(b.w, b.h, body)
}

function buildIcon({ ground, mark, radius = 0.22, inset = 0.16, size = 512 }) {
  const b = markBox(0)
  const target = size * (1 - inset * 2)
  const scale = target / b.w
  const tx = (size - b.w * scale) / 2 - b.x * scale
  const ty = (size - b.h * scale) / 2 - b.y * scale
  const bg = ground
    ? `  <rect width="${size}" height="${size}" rx="${round(size * radius)}" fill="${ground}"/>\n`
    : ''
  const body =
    bg +
    `  <g transform="translate(${round(tx)} ${round(ty)}) scale(${round(scale)})">` +
    `${spiralPath(mark)}</g>`
  return svg(size, size, body)
}

function buildLockup({ ground, mark, text, sub, withDomain = true }) {
  const badge = 120
  const gap = 32
  const wmSize = 34
  const domSize = 15
  const wmScale = wmSize / 100
  const domScale = domSize / 100
  const wmW = WORDMARK.advance * wmScale
  const domW = DOMAIN.advance * domScale
  const textW = withDomain ? Math.max(wmW, domW) : wmW
  const W = badge + gap + textW
  const H = badge

  const wmCap = WORDMARK.capHeight * wmScale
  const domCap = DOMAIN.capHeight * domScale
  const stackGap = withDomain ? 10 : 0
  const stackH = wmCap + stackGap + (withDomain ? domCap : 0)
  const top = (H - stackH) / 2

  const b = markBox(0)
  const inset = 0.16
  const target = badge * (1 - inset * 2)
  const scale = target / b.w
  const tx = (badge - b.w * scale) / 2 - b.x * scale
  const ty = (badge - b.h * scale) / 2 - b.y * scale

  let body =
    `  <rect width="${badge}" height="${badge}" rx="${round(badge * 0.22)}" fill="${ground}"/>\n` +
    `  <g transform="translate(${round(tx)} ${round(ty)}) scale(${round(scale)})">` +
    `${spiralPath(mark)}</g>\n` +
    `  <g transform="translate(${round(badge + gap)} ${round(top + wmCap)}) scale(${round(wmScale)})">\n` +
    `${textPath(WORDMARK, text)}\n` +
    `  </g>`

  if (withDomain) {
    const y = top + wmCap + stackGap + domCap
    body +=
      `\n  <g transform="translate(${round(badge + gap)} ${round(y)}) scale(${round(domScale)})">\n` +
      `${textPath(DOMAIN, sub)}\n` +
      `  </g>`
  }

  return svg(W, H, body)
}

function buildBanner({ W, H, ground, mark, badgeGround, text, sub, scale = 1 }) {
  const lock = buildLockup({ ground: badgeGround, mark, text, sub })
  const [, lw, lh] = lock.match(/width="([\d.]+)" height="([\d.]+)"/).map(Number)
  const inner = lock.replace(/^<svg[^>]*>\n/, '').replace(/<\/svg>\n?$/, '')
  const s = ((W * 0.55) / lw) * scale
  const tx = (W - lw * s) / 2
  const ty = (H - lh * s) / 2
  return svg(
    W,
    H,
    `  <rect width="${W}" height="${H}" fill="${ground}"/>\n` +
      `  <g transform="translate(${round(tx)} ${round(ty)}) scale(${round(s)})">\n${inner}\n  </g>`,
  )
}

let rsvg = true
try {
  execFileSync('rsvg-convert', ['--version'], { stdio: 'ignore' })
} catch {
  rsvg = false
  console.warn('! rsvg-convert not found — writing SVGs only (brew install librsvg)')
}

function png(svgPath, outPath, w, h = w) {
  if (!rsvg) return
  execFileSync('rsvg-convert', ['-w', String(w), '-h', String(h), svgPath, '-o', outPath])
}

function ico(pngPaths, outPath) {
  const images = pngPaths.map(p => readFileSync(p))
  const count = images.length
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(count, 4)

  const dir = Buffer.alloc(16 * count)
  let offset = 6 + 16 * count
  images.forEach((img, i) => {
    const size = img.readUInt32BE(16)
    const at = i * 16
    dir[at] = size >= 256 ? 0 : size
    dir[at + 1] = size >= 256 ? 0 : size
    dir[at + 2] = 0
    dir[at + 3] = 0
    dir.writeUInt16LE(1, at + 4)
    dir.writeUInt16LE(32, at + 6)
    dir.writeUInt32LE(img.length, at + 8)
    dir.writeUInt32LE(offset, at + 12)
    offset += img.length
  })

  writeFileSync(outPath, Buffer.concat([header, dir, ...images]))
}

rmSync(BRAND, { recursive: true, force: true })
for (const d of ['svg', 'png', 'social']) mkdirSync(join(BRAND, d), { recursive: true })
mkdirSync(PUBLIC, { recursive: true })

const write = (rel, contents) => {
  const p = join(BRAND, rel)
  writeFileSync(p, contents)
  return p
}

const svgs = {
  'mark-white': buildMark(COLORS.white),
  'mark-ink': buildMark(COLORS.ink),
  'mark-blue': buildMark(COLORS.blue),
  'mark-paper': buildMark(COLORS.paper),

  'icon-ink': buildIcon({ ground: COLORS.ink, mark: COLORS.white }),
  'icon-paper': buildIcon({ ground: COLORS.paper, mark: COLORS.ink }),
  'icon-blue': buildIcon({ ground: COLORS.blue, mark: COLORS.white }),
  'icon-white': buildIcon({ ground: COLORS.white, mark: COLORS.ink }),
  'icon-transparent-white': buildIcon({ ground: null, mark: COLORS.white }),
  'icon-transparent-ink': buildIcon({ ground: null, mark: COLORS.ink }),

  'lockup-on-light': buildLockup({
    ground: COLORS.ink,
    mark: COLORS.white,
    text: COLORS.ink,
    sub: COLORS.grey,
  }),
  'lockup-on-dark': buildLockup({
    ground: COLORS.white,
    mark: COLORS.ink,
    text: COLORS.white,
    sub: COLORS.grey,
  }),
  'lockup-on-light-blue': buildLockup({
    ground: COLORS.blue,
    mark: COLORS.white,
    text: COLORS.ink,
    sub: COLORS.grey,
  }),
}

const svgPaths = {}
for (const [name, contents] of Object.entries(svgs)) {
  svgPaths[name] = write(`svg/spirales-${name}.svg`, contents)
}

const socialSvgs = {
  'og-1200x630': buildBanner({
    W: 1200,
    H: 630,
    ground: COLORS.paper,
    badgeGround: COLORS.ink,
    mark: COLORS.white,
    text: COLORS.ink,
    sub: COLORS.grey,
  }),
  'linkedin-banner-1128x191': buildBanner({
    W: 1128,
    H: 191,
    ground: COLORS.ink,
    badgeGround: COLORS.blue,
    mark: COLORS.white,
    text: COLORS.white,
    sub: COLORS.grey,
    scale: 0.62,
  }),
  'linkedin-banner-1584x396': buildBanner({
    W: 1584,
    H: 396,
    ground: COLORS.ink,
    badgeGround: COLORS.blue,
    mark: COLORS.white,
    text: COLORS.white,
    sub: COLORS.grey,
  }),
}
for (const [name, contents] of Object.entries(socialSvgs)) {
  svgPaths[name] = write(`social/spirales-${name}.svg`, contents)
}

const ICON_SIZES = [16, 32, 48, 64, 128, 180, 192, 256, 512, 1024]
const faviconPngs = []
for (const size of ICON_SIZES) {
  const out = join(BRAND, 'png', `icon-ink-${size}.png`)
  png(svgPaths['icon-ink'], out, size)
  if ([16, 32, 48].includes(size)) faviconPngs.push(out)
  png(svgPaths['icon-paper'], join(BRAND, 'png', `icon-paper-${size}.png`), size)
  png(svgPaths['icon-blue'], join(BRAND, 'png', `icon-blue-${size}.png`), size)
  png(
    svgPaths['icon-transparent-white'],
    join(BRAND, 'png', `icon-transparent-white-${size}.png`),
    size,
  )
  png(svgPaths['icon-transparent-ink'], join(BRAND, 'png', `icon-transparent-ink-${size}.png`), size)
}

for (const variant of ['mark-white', 'mark-ink', 'mark-blue', 'mark-paper']) {
  for (const w of [512, 1024, 2048]) {
    const src = readFileSync(svgPaths[variant], 'utf8')
    const [, sw, sh] = src.match(/width="([\d.]+)" height="([\d.]+)"/).map(Number)
    png(svgPaths[variant], join(BRAND, 'png', `${variant}-${w}.png`), w, Math.round((w * sh) / sw))
  }
}

for (const variant of ['lockup-on-light', 'lockup-on-dark', 'lockup-on-light-blue']) {
  for (const w of [600, 1200, 2400]) {
    const src = readFileSync(svgPaths[variant], 'utf8')
    const [, sw, sh] = src.match(/width="([\d.]+)" height="([\d.]+)"/).map(Number)
    png(svgPaths[variant], join(BRAND, 'png', `${variant}-${w}.png`), w, Math.round((w * sh) / sw))
  }
}

for (const size of [400, 800]) {
  png(svgPaths['icon-ink'], join(BRAND, 'social', `avatar-ink-${size}.png`), size)
  png(svgPaths['icon-blue'], join(BRAND, 'social', `avatar-blue-${size}.png`), size)
  png(svgPaths['icon-paper'], join(BRAND, 'social', `avatar-paper-${size}.png`), size)
}

png(svgPaths['og-1200x630'], join(BRAND, 'social', 'og-1200x630.png'), 1200, 630)
png(svgPaths['linkedin-banner-1128x191'], join(BRAND, 'social', 'linkedin-banner-1128x191.png'), 1128, 191)
png(svgPaths['linkedin-banner-1584x396'], join(BRAND, 'social', 'linkedin-banner-1584x396.png'), 1584, 396)

if (rsvg) ico(faviconPngs, join(BRAND, 'favicon.ico'))

const publish = [
  ['favicon.ico', join(BRAND, 'favicon.ico')],
  ['favicon.svg', svgPaths['icon-ink']],
  ['apple-touch-icon.png', join(BRAND, 'png', 'icon-ink-180.png')],
  ['icon-192.png', join(BRAND, 'png', 'icon-ink-192.png')],
  ['icon-512.png', join(BRAND, 'png', 'icon-ink-512.png')],
  ['og-image.png', join(BRAND, 'social', 'og-1200x630.png')],
]
for (const [name, src] of publish) {
  try {
    writeFileSync(join(PUBLIC, name), readFileSync(src))
  } catch {
    console.warn(`! skipped public/${name} (missing ${src})`)
  }
}

console.log(`✓ brand assets written to brand/ and published to public/`)
