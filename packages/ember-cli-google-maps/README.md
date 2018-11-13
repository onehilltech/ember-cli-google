ember-cli-google-maps
==============================================================================

A simple Ember add-on from Google Maps API

# Features

* Simplistic design for integrating Google Maps
* Intelligent configuration based on component utilized
* No extra steps to configure Google Maps beyond adding API key
* Extensible component-based design to maximize customization

Installation
------------------------------------------------------------------------------


    ember install ember-cli-google-maps


Usage
------------------------------------------------------------------------------

### Configuring API Key

Before you can use this add-on, you must first configure our API key. Add 
your Google Maps API key to `config/environment.js`.

```javascript
 let ENV = {
    // ...

    'ember-cli-google': {
      maps: {
        apiKey: 'ADD API KEY HERE'
      }
    }
  };
```

### Inserting a map

Use the `{{g-map}}` component to insert a map onto the page.

```handlebars
{{g-map center=(hash lat=lat lng=lng)}}
```

The `{{g-map}}` component must have a `center` property, or the Google Maps component
will not work.

> The `{{g-map}}` component has the `.g-map` class name, which can be used to 
> style it (_e.g._, setting its height and width).

The `{{g-map}}` component has a corresponding attribute for each 
[`google.maps.MapOptions`](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)
property.
