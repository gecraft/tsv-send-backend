# tsv-send-backend

This is the server side of the component responsible for sending data to the git.door43.org.

This component works together with [tsv-frontend](https://github.com/texttree/tsv-frontend).

[Deploy to Heroku](./Heroku.md)

[Configure .env](./Dotenv.md)

[Local install](./Local.md)

After configuration, you will be presented with a page for checking the server's health.
You can send a request from it and make sure that everything works as it should.

After you make sure that everything works correctly, it is better to hide this code in production.

In the `.env` file, set `HIDE_TEST_PAGE=TRUE`.

---
The server has only one entry point. POST request for `/send`.
The input takes an object `{resource, bookId, reference, type, fields}`.
 - `resource` - the name of the resource. The created or edited file will be placed in a specific directory.
  - `type` - file type, 2 or 3 letters, for example, tn, tq, twl, err.
 - `bookId` - is a three-letter book identifier.
 - `reference` - a link in the format `chapter:verse`
 - `fields` - an object consisting of fields, like the column names in the file.

The TSV file will be located at `/<resource>/<BOOKID>_<type>.tsv`, for example `/ult/GEN_err.tsv`

The server only validates the `fields` field.

If the file does not exist, then it will be created, if the variable `CREATE_FILES=TRUE` is set to `.env`.

According to the specification, the first three columns will be reserved names `Reference | ID | Tags`. The following will be created with names from object keys.

For example, if there is such an object `{Quote: 'test', Note: 'some text'}` in the `fields`, then as a result we will get the following file:

Reference | ID   | Tags | Quote | Note
--------- | --   | ---- | ----- | ----
1:1       | Wer4 |      | test  | some text

**Please note that the keys in the object must have exactly the same name as the columns in the table (`Note`, not `note` or `NOTE`).**
