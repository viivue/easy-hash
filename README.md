# Easy Hash

[![release](https://badgen.net/github/release/viivue/easy-hash/)](https://github.com/viivue/easy-hash/releases/latest)
[![Netlify Status](https://api.netlify.com/api/v1/badges/84c6ed49-b3f3-450b-857a-ec904db724b7/deploy-status)](https://app.netlify.com/sites/easy-hash/deploys)

> Demo: https://easy-hash.netlify.app

## Getting started

### CDN

```html

<script src="https://cdn.jsdelivr.net/gh/viivue/easy-hash@0.0.1/dist/easy-hash.min.js"></script>
```

## Initialize

We can use this library promptly after import it into your project

## Methods

| Usage                              | Description                                                                                            | 
|------------------------------------|--------------------------------------------------------------------------------------------------------|
| `EasyHash.add(hash)`               | Add new hash to the URL and replace the current one if any (containing "#" or not are both acceptable) |
| `EasyHash.remove()`                | Remove current hash value                                                                              |
| `EasyHash.getHash()`               | Get current hash                                                                                       |
| `EasyHash.on(eventName, callback)` | Assign events                                                                                          |

## Events

| Name       | Description         | 
|------------|---------------------|
| `"change"` | After value changed |

```js
EasyHash.on('change', () => {
    // do something
})
// the same as window.addEventListener('hashchange',()=>{})
```

## Deployment

```shell
# Run dev server
npm run dev

# Build dev site
npm run build

# Generate production files
npm run prod
```

## License

[MIT License](https://github.com/viivue/easy-hash/blob/main/LICENSE)

Copyright (c) 2023 ViiVue
