English | [简体中文](README.zh-CN.md)

# IPATLAS

Paste an IPv4 address or CIDR block — instantly see it as a map: how big the block is, where its boundaries are, and where it sits inside the entire IPv4 universe.

**Live:** https://xiangjianan.github.io/daily-tools/ipatlas-20260916//

## Why

CIDR math is invisible. Is `10.0.0.0/8` bigger than `172.16.0.0/12`? Where does your office `/24` actually live inside 4.3 billion addresses? Textbook answers are tables of numbers; IPATLAS turns them into pixels you can point at.

## What you get

- **Block map** — the address space rendered as a pixel grid (1 px = 1 address for small blocks, auto-merged for big ones). Network, broadcast and first/last usable hosts are color-coded. Hover any pixel for an exact address probe.
- **IPv4 universe minimap** — all 4.3 billion addresses as a 256×256 map (1 px = one /16). Your block is highlighted in cyan; special ranges (RFC 1918 private, loopback, CGNAT, multicast, …) are tinted so you see the neighborhood at a glance.
- **Facts panel** — network, mask, wildcard, broadcast, first/last host, usable count, block size and its share of the whole IPv4 space.
- **Binary view** — the address and mask as 32 bits, with network bits and host bits in different colors.
- **Type badges** — private / loopback / CGNAT / multicast / TEST-NET / public, with the RFC that defines them.
- **Copy report** as text, or copy a shareable `?q=` link. Input is remembered in the URL.

## Usage

Type or paste anything like `192.168.1.0/24`, `10.10.4.7/16`, or a bare `8.8.8.8` (treated as /32). Results update live as you type. Invalid or out-of-range input gets a friendly inline message; addresses with host bits set are auto-masked with a notice.

## Privacy & tech

Single `index.html`, zero dependencies, zero build step, zero network requests. Everything — parsing, bit math, rendering — happens in your browser via canvas. Works offline; double-click the file and it runs.

## License

MIT
