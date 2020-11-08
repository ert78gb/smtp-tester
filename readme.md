A simple node smtp script to check the connectivity to the MTA

Support DKIM.

Require Node 15+

**How to use**
- copy the `.env-sample` as `.env` => `$ cp .env-sample .enc`
- fill the environment variables. Concatenate the DKIM private key to 1 line string with `\n`
- run the script => `$ node index.js`

**Tip**
If you sent the email to the `check-auth@verifier.port25.com` you will get back very powerful report.
