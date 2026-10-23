# Local interface fonts

These files are served by the app itself; Chinese, Arabic and Latin text do not depend on a third-party font request or an installed system font. All four families use the SIL Open Font License 1.1. The adjacent `*-OFL.txt` files retain their copyright and license notices.

- DM Sans and Manrope: Latin WOFF2, weights used by the interface, from Google Fonts.
- Noto Sans Arabic: WOFF2, weights 400/600/700, including Arabic shaping and Latin glyphs, from Google Fonts.
- Noto Sans SC: variable WOFF2, subset of the OFL Noto Sans SC variable font (Adobe / Google). Covers common Han U+4E00–U+9FFF, Latin, CJK punctuation and full-width punctuation. OpenType layout and variation tables are retained.

The subset keeps all common Chinese characters, rather than only the characters appearing in a particular demo. Update `SHA256SUMS` if font files change.
