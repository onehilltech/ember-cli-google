ember-cli-google-maps
==============================================================================

A simple Ember add-on from Google Maps API


Features
------------------------------------------------------------------------------


* Simplistic design for integrating Google Maps
* Intelligent configuration based on component utilized
* No extra steps to configure Google Maps beyond adding API key
* Extensible component-based design to maximize customization


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

    ember install ember-cli-google-maps


Getting Started
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
will not work. The `{{g-map}}` component has a corresponding attribute for each 
[`google.maps.MapOptions`](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)
property.

> The `{{g-map}}` component has the `.g-map` class name, which can be used to 
> style it (_e.g._, setting its height and width).

## Map Entities

Map entities are added as a child component of the corresponding `{{g-map}}` block component.
All map entities have a `show` attribute, which can be use to show/hide the entity.

### Adding a marker

The `{{g-marker}}` component is used to add a marker to a map. Just added the `{{g-marker}}` as
a child of the `{{g-map}}` block component. Use the `position` attribute to set the marker's
location.

```handlebars
{{#g-map center=(hash lat=mapLat lng=mapLng)}}
  {{g-marker position=(hash lat=markerLat lng=markerLng)}}
{{/g-map}}
```

## Map Layers

Map layers are added as a child component of the corresponding `{{g-map}}` block component.
All map layers have a `show` attribute, which can be use to show/hide the layer.

### Heatmap Layer

The `{{g-heatmap-layer}}` is used to add a heatmap layer to the corresponding map. The `data` 
attribute, which is an array of `{lat, lng [, weight]}`, adds data to the heatmap. 

```handlebars
{{#g-map center=(hash lat=mapLat lng=mapLng)}}
  {{g-heatmap-layer data=heatmapData}}
{{/g-map}}
```

Unlike with the Google Maps API, you can have a single array where some of the data points 
have a weight and some of the data points do not have a weight. The `{{g-heatmap-layer}}` 
component is intelligent enough to discern between the two cases, and populate the map accordingly.
