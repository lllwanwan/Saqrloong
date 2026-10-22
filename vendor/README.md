# Browser dependencies

These browser bundles are checked in so the static application works without a build step or CDN dependency.

| Package | Version | Purpose |
| --- | --- | --- |
| marked | 18.1.1 | GitHub-flavored Markdown rendering |
| DOMPurify | 3.4.17 | Sanitize generated Markdown HTML |
| Mammoth | 1.13.0 | Extract text from Word DOCX files |
| PDF.js | 6.4.299 | Extract text from PDF files |

Each dependency's license is included in this directory. PDF.js runs its worker locally. Scanned PDF OCR and legacy `.doc` files are not supported; the upload panel accepts text PDF, `.docx`, `.txt`, `.md`, and `.json` files up to 10 MB.
