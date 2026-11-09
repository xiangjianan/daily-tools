English | [简体中文](README.zh-CN.md)

# otpdeck

A fully client-side TOTP (time-based one-time password) generator. Paste an `otpauth://` migration link or a bare base32 secret, and it computes your current 6/8-digit 2FA code right in the browser — with a live 30-second countdown ring.

## Why

Authenticator apps with cloud sync ask you to hand your 2FA seeds to a third party. otpdeck takes the opposite stance: your secrets never leave the device. There are no network requests at all — open the page, paste, copy the code, done. It's the tool you reach for when your phone is in another room, or when you're setting up a new account and want to sanity-check the QR payload before committing it to an app.

## Usage

1. Open `index.html` (double-click works — no server needed).
2. Paste one account per line in the textarea:
   - `otpauth://totp/GitHub:me@example.com?secret=JBSWY3DPEHPK3PXP&issuer=GitHub` (the standard migration-link format every 2FA setup page shows you)
   - or a bare base32 secret: `JBSWY3DPEHPK3PXP`
3. Cards appear instantly with the current code, issuer/label, and a countdown ring that flips the code when the window rolls.
4. Click a card to copy its code. The built-in "load sample" button uses the official RFC 6238 Appendix B test key, so you can verify the math before trusting it with a real seed.

Malformed lines are reported per line number; a mix of good and bad lines still generates cards for the good ones.

## Technical notes

- Single HTML file, zero build, zero CDN, zero network requests.
- TOTP per RFC 6238 (HMAC-SHA1/SHA256/SHA512 via WebCrypto), dynamic truncation per RFC 4226, base32 decoding per RFC 4648 — all hand-written.
- Supports custom `digits` (6/8), `period`, and `algorithm` parameters from the otpauth URI.
- Verified against all 18 RFC 6238 Appendix B test vectors (SHA1/SHA256/SHA512 × 6 timestamps) in an automated oracle test.
- What it does NOT do: it is not a backup — nothing is stored, refreshing the page wipes everything. Keep your otpauth links in a password manager.

## License

MIT (see repository root).
