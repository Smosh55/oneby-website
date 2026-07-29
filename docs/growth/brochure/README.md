# Free-year brochure kit

Files:
- `brochure-free-year.html`: print-ready source (edit this, then re-render)
- `brochure-free-year.pdf`: rendered output, ready to print
- `qr-free-year.svg`: the QR (points to oneby.ai/free-year?utm_source=brochure)

Printing: US Letter, double-sided, **flip on short edge**, fold in half.
Page 1 is the outside (back cover left, front cover right); page 2 is the
inside spread. Test the QR scan on the first print before running a stack.

## Claim codes (the 5 write-in boxes next to the QR)

Every physical brochure gets its own hand-written 5-digit code before it is
handed out:

- **First 2 digits = rep.** Assign each seller a number (Moshe = 10, next
  rep = 11, and so on). Keep the assignment list wherever sales notes live.
- **Last 3 digits = brochure serial.** Number your stack before you go out:
  10001, 10002, 10003...

The /free-year claim form requires the code. It arrives in the lead email as
`Claim code: 10037 (rep 10, brochure 037)`, so every signup attributes to a
rep automatically, and if the same code shows up twice, the second one is a
shared link or a double-use, visible at a glance.

Today the check is detection (the code lands in the lead email; duplicates
are obvious at pilot volume). Hard server-side rejection of used codes needs
platform storage: on Eli's list once the pilot proves out, not before.

Re-render the PDF after edits (Chrome cannot write into OneDrive; render to
the scratchpad or another local folder, then copy the PDF back here).
