# ember-cli-google-analytics

EmberJS add-on for Google Analytics

    ember install @onehilltech/ember-cli-google-analytics
    
## Configuration

After you install this add-on, you only need to add your Google analytics settings
to the `config/environment.js` file for basic usage.

### Version 4 (via Tag Manager)

```javascript

// config/environment.js

let ENV = {
  'ember-cli-google': {
    analytics: {
      version: 'v4',
      measurementId: 'G-XXXXXXXXXX'
    }
  }
}
```

### Universal Analytics

```javascript

// config/environment.js

let ENV = {
  'ember-cli-google': {
    analytics: {
      trackerId: 'UA-XXXXX-Y',        // tracker id
      trackerName: '',                // [optional] tracker name
      cookieDomain: '',               // [optional] cookie domain; default = 'auto'
    }
  }
}
```

Happy Coding!

