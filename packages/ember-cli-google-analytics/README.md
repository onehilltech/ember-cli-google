# ember-cli-google-analytics

EmberJS add-on for Google Analytics

    ember install @onehilltech/ember-cli-google-analytics

## Compatibility

* Ember.js v4.8 or above
* Ember CLI v4.8 or above
* Node.js v18 or above

## Configuration

After you install this add-on, you only need to add your Google analytics settings
to the `config/environment.js` file for basic usage.

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

## Initialization

Ember 5.x deprecated implicit injections from its initializers. This means you have
to manually initialize Google Analytics in your application. The easiest way to initialize
the add-on is to inject the `gtag` service in the `ApplicationRoute`, and override the
`activate()` method to call `gtag.configure()` as shown below.

> Use the following command to generate the application route: `ember g route application`

```javascript
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service
  gtag;

  async activate () {
    // Pass control to the base class.
    await super.activate (...arguments);
    
    // Configure Google Analytics for our application.
    await this.gtag.configure ();
  }
}
```

The `gtag.configure()` method optionally accepts an `options` object with the following properties:

| Property | Type | Desciption |
| --- | --- | --- |
| `measurementId` | `string` | When set, overrides the `measurementId` defined in your app's `config/environment` file. |
| `forceEnable` | `boolean` | If `true`, allows `gtag.configure()` to run in the `development` and `test` environments. (By default, `gtag.configure()` doesn't work unless the environment is `production`.) |

Example using both properties:
```javascript
await this.gtag.configure({
  measurementId: 'G-XXXXXXXXXX',
  forceEnable: true,
});
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
  // Inject the Google Tag Manager service into our component.
  @service
  gtag;
  
  @action
  searching (ev) {
    const { target } = ev;
    
    // Send an event to Google Analytics.
    this.gtag.event ('searching', { term: target.value } );
  }
}
```

Happy Coding!


