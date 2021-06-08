require('dotenv').config();
const axios = require('axios');
const helper = require('./app/helper');
const express = require('express');
const cors = require('cors');
const { customAlphabet } = require('nanoid');

const app = express();

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  4
);
const response = {
  success: false,
  code: 999,
  message: 'Undefined error',
  errors: {}
};
app.use(express.json());
app.use(
  cors({ origin: process.env.FRONTEND_URL.split(' '), credentials: true })
);

if (process.env.HIDE_TEST_PAGE === 'FALSE') {
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/test.html');
  });
}

app.post('/send', function (req, appResponse) {
  const { resource, bookId, reference, type, fields } = req.body;
  if (
    !resource ||
    !bookId ||
    !reference ||
    !type ||
    !fields ||
    Object.keys(fields).length === 0
  ) {
    appResponse.send({
      ...response,
      code: 105,
      message: 'Some of fields not set',
    });
  }
  const url =
    'https://git.door43.org/api/v1/repos/' +
    process.env.OWNER +
    '/' +
    process.env.REPO +
    '/contents/' +
    resource +
    '/' +
    String(type).toLowerCase() +
    '_' +
    String(bookId).toUpperCase() +
    '.tsv?access_token=' +
    process.env.TOKEN;
  axios
    .get(url)
    .then((res) => {
      if (res.status != 200) {
        appResponse.send({
          ...response,
          code: 101,
          message: 'Status ' + res.status,
        });
      }
      const buff = Buffer.from(res.data.content, 'base64');
      // get 1st line, parse columns, check fields
      const columns = buff.toString('utf8').split('\n')[0].split('\t').slice(3);
      for (const el of columns) {
        if (!fields[el]) {
          appResponse.send({
            ...response,
            code: 102,
            message: 'Fields not contain ' + el,
          });
          return false;
        }
      }
      const sha = res.data.sha;
      let text = buff.toString('utf8') + reference + '\t' + nanoid() + '\t';
      columns.forEach((element) => {
        text += '\t' + helper.nl2br(fields[element]);
      });

      axios
        .put(url, {
          content: Buffer.from(text + '\n', 'utf8').toString('base64'),
          sha: sha,
        })
        .then((res) => {
          appResponse.send({
            ...response,
            success: true,
            code: 200,
            message: 'Success',
          });
        })
        .catch((error) => {
          appResponse.send({
            ...response,
            code: 103,
            message: 'Error when save data',
            errors: error,
          });
        });
    })
    .catch((error) => {
      if (
        process.env.CREATE_FILES === 'TRUE' &&
        error?.response?.data?.message == 'GetContentsOrList'
      ) {
        // сгенерируем первую строку, какие колонки там будут
        // после этого по аналогии дописать дальше поля с колонок
        // а можно первую и вторую строки создавать одновременно
        let text =
          'Reference\tID\tTags\t' +
          Object.keys(fields).join('\t') +
          '\n' +
          req.body.reference +
          '\t' +
          nanoid() +
          '\t';
        Object.keys(fields).forEach((element) => {
          text += '\t' + helper.nl2br(fields[element]);
        });
        axios
          .post(url, {
            content: Buffer.from(text + '\n', 'utf8').toString('base64'),
          })
          .then((res) => {
            appResponse.send({
              ...response,
              success: true,
              code: 200,
              message: 'Success',
            });
          })
          .catch((error) => {
            appResponse.send({ status: false, error: error });
          });
      } else {
        //console.log(appResponse.getHeaders(), error);
        //return false;
        appResponse.send({
          ...response,
          code: 104,
          message: 'Error when get data',
          errors: error?.response,
        });
      }
    });
});

// разбить файл на более мелкие части

app.listen(process.env.PORT || 4000);
