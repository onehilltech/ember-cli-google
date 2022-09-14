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

### Universal Analytics (deprecated by Google)

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

### Sending custom events to Google Analytics

You can easily send custom events to Google Analytics by injecting the `gtag` service, and
calling the `event(name, params)` method. Here is an example of tracking the search term from an input
field.

```javascript
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

class SearchComponent extends Component {
  @service
  gtag;
  
  @action
  searching (ev) {
    const { target } = ev;
    
    this.gtag.event ('searching', { term: target.value } );
  }
}

```

Happy Coding!

