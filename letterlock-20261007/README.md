English | [简体中文](README.zh-CN.md)

# LETTERLOCK · Sealed-Letter Capsule

Type a secret note, set a password, and mint a **single self-decrypting HTML file** — the capsule. Send that one file to anyone: they open it in any browser, type the password, and read the letter. No app to install, no account, no network call. The file *is* the app.

**Live demo:** https://xiangjianan.github.io/daily-tools/letterlock-20261007/

## The problem

Sharing something sensitive (a password, a confession, a recovery phrase) over chat means it lives forever in the chat history, in backups, and on someone else's server. Full disk encryption or PGP solves this but demands tooling most people don't have — the recipient especially.

LETTERLOCK collapses the whole flow into one artifact: an HTML file with the ciphertext embedded and a tiny decryptor attached. The recipient only needs a browser.

## How to use

1. **Mint**: write the note, set a password (an optional plaintext hint can be attached), press *铸造胶囊*. Download the produced `letterlock-capsule.html` — or copy the raw ciphertext string instead.
2. **Open**: the recipient opens the capsule, types the password, reads the message — fully offline. Wrong password? AES-GCM authentication fails and it says so; there is no "close guess".
3. **Verify in place**: on the tool page, the *在本页试开* button round-trips the freshly minted capsule so you can test before sending. You can also drag a capsule file back into the *开胶囊* pane — the ciphertext is extracted and decrypted locally.

## Technical notes

- Key derivation: PBKDF2-HMAC-SHA256, 310,000 iterations, 16-byte random salt → AES-256-GCM with a 12-byte random IV per capsule. Implemented with the browser's native WebCrypto; nothing home-rolled.
- Payload format: `LKLK1.` + base64(JSON `{v, it, s, iv, c, h?}`), embedded verbatim in the generated capsule. GCM's auth tag makes tampering and wrong passwords indistinguishable — both simply fail.
- The password strength meter is an honest entropy lower bound (character-class × length), not a marketing score.
- 100% client-side: a single HTML file, zero dependencies, zero build step, works from `file://`. The minted capsule is itself a single HTML file with no external references — drop it on a USB stick, it still works in 2036.

## Caveats (honest ones)

- The optional password hint is stored **in plaintext** inside the capsule. Don't write the password there.
- This tool proves knowledge of a password; it cannot stop a recipient from sharing the unlocked text, or a brute-forcer from trying forever. Choose a long password (the meter tells you how long).
- No verification of who minted a capsule — authenticity of the *sender* is out of scope; secrecy of the *contents* is the goal.

## License

MIT — same as the repository root.
