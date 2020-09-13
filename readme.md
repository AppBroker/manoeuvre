# manoeuvre

> Simple Node wrapper for Manoeuvre's v1 API - Affiliate Tracking for Mobile Apps

## Getting started

Node wrapper that interfaces with Manoeuvre's affiliate tracking system. Developers can sign up for an account with Manoeuvre here. Once signed up, set up your apps and your affiliates in the system, make a note of your appId and your api key, you will need them to set up the tracking and start sharing revenue with your affiliates. Manoeuvre works by tracking each of your apps and the traffic passed through each by your affiliates through 3 different stages, landing & promo pages, downloads and payment.

---

# manoeuvre [![Build Status](https://travis-ci.com/AppBroker/manoeuvre.svg?branch=master)](https://travis-ci.com/AppBroker/manoeuvre)

<p align="center">
  <img width="320" src="https://repository-images.githubusercontent.com/292555327/2c9c1680-ef15-11ea-957c-54204829eae4">
</p>

> Manoeuvre wrapper for Manoeuvre's v1 API - Affiliate Tracking for Mobile Apps

## Install

```
$ npm install manoeuvre
```

## Usage with Progressive Web Applications

```js
// Inside the front end source of your progressive web application
import manoeuvre from 'manoeuvre'
// Set config, validFor - tracking for an individual will expire after validFor in seconds
const config = {
	validFor: 360
}

//Set up tracking
const tracker = new manoeuvre(config)
//Add to your application landing page, passing the referred affiliates ID, and your unique app ID, leave the rest to us.
tracker.add({ affiliateId: '12345', appId: '123456' })
//On succesful load of your app potentially your homepage call the following
tracker.update({ appId: '1234', status: 'downloaded' })
//On succesful payment/purchase of your app
tracker.update({ appId: '1234', status: 'paid' })
```

## API

Coming soon

