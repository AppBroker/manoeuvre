# manoeuvre

> Simple Node wrapper for Manoeuvre's v1 API - Affiliate Tracking for Mobile Apps

This is what I use for [my own modules](https://www.npmjs.com/~sindresorhus).

Also check out [`node-cli-boilerplate`](https://github.com/sindresorhus/node-cli-boilerplate).

## Getting started

**Click the "Use this template" button.**

Alternatively, create a new directory and then run:

```
$ curl -fsSL https://github.com/sindresorhus/node-module-boilerplate/archive/master.tar.gz | tar -xz --strip-components=1
```

There's also a [Yeoman generator](https://github.com/sindresorhus/generator-nm).

---

**Remove everything from here and above**

---

# manoeuvre [![Build Status](https://travis-ci.com/AppBroker/manoeuvre.svg?branch=master)](https://travis-ci.com/AppBroker/manoeuvre)

> My awesome module

## Install

```
$ npm install manoeuvre
```

## Usage

```js
const manoeuvre = require('manoeuvre');

manoeuvre('unicorns');
//=> 'unicorns & rainbows'
```

## API

### API with Token

You will want to use OAuth `access_token`s on behalf of specific users once
your app is in production. Using an `access_token` specific to a validated user
allows for detailed athlete information, as well as the option for additional
`PUT`/`POST`/`DELETE` privileges.

Use app-specific logic to retrieve the `access\_token` for a particular user, then create a Manoeuvre client for that user, with their token:

```js
import manouevre from 'manoeuvre';

// ... get access_token from somewhere
manoeuvreClient = new manouevre.clientConfig(access_token);

const payload = await manoeuvreClient.api.add({...args})
```

### manoeuvre(input, options?)

#### input

Type: `string`

Lorem ipsum.

#### options

Type: `object`

##### postfix

Type: `string`\
Default: `rainbows`

Lorem ipsum.
