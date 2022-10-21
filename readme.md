# Tool Shop JS Observable


[![Tests](https://github.com/dobschal/tool-shop-js-observable/actions/workflows/unit-test.yml/badge.svg)](https://github.com/dobschal/tool-shop-js-observable/actions/workflows/unit-test.yml)
[![NPM](https://img.shields.io/npm/v/tool-shop-js-observable)](https://www.npmjs.com/package/tool-shop-js-observable)
[![Size](https://img.shields.io/bundlephobia/min/tool-shop-js-observable?style=plastic)](https://img.shields.io/bundlephobia/min/tool-shop-js-observable?style=plastic)

## Abstract

This implementation delivers an easy to use Observable wrapper for any JavaScript object or array.


## Get Started

### Installation

```bash
npm install --save tool-shop-js-observable
```

### Usage

```javascript

const data = Observable({
    message: "You are welcome!"
});

data.$on("message", () => {
    console.log("Message changed!");
});

data.message = "Thank you!";


```