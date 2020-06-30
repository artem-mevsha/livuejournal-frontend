# livuejournal

> Blogging platform build with Nuxt

#### [Demo](https://livuejournal.netlify.app/)

P.S. Backend is running on heroku free dyno. At the first page load, kindly, wait for a few seconds until service is starting.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

### Config

Create .env file in the root directory. 
Required properties are:
- BASE_URL (example, `BASE_URL=http://localhost:8000/api`)

### API

API endpoint: https://livuejournal.herokuapp.com/api

You can use Postman with `LivueJournal_API.postman_collection.json` file to test API
