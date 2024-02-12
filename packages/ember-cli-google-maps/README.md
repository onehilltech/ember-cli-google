# ember-cli-google-maps

A simple Ember add-on from Google Maps API


Features
------------------------------------------------------------------------------


* Simplistic design for integrating Google Maps
* Intelligent configuration based on component utilized
* No extra steps to configure Google Maps beyond adding API key
* Extensible component-based design to maximize customization


## Compatibility

* Ember.js v4.8 or above
* Ember CLI v4.8 or above
* Node.js v18 or above


## Installation

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

Use the `<GMap />` component to insert a map onto the page.

```handlebars
<GMap @center={{hash lat=lat lng=lng}} />
```

The `<GMap />` component must have a `@center` property, or the Google Maps component
will not work. The `<GMap />` component has a corresponding attribute for each 
[`google.maps.MapOptions`](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)
property.

> The `<GMap />` component has the `.g-map` class name, which can be used to 
> style it (_e.g._, setting its height and width).

## Map Entities

Map entities are added as a child component of the corresponding `<GMap />` block component.
All map entities have a `@show` attribute, which can be use to show/hide the entity.

### Adding a marker

Add the `<GMarker />` as a child of the `<GMap />` block component to add a marker to a map. 
The `@position` attribute to set the marker's location.

```handlebars
<GMap @center={{hash lat=mapLat lng=mapLng}}>
  <GMarker @position={{hash lat=lat lng=lng}} />
</GMap>
```

## Map Layers

Map layers are added as a child component of the corresponding `<GMap />` block component.
All map layers have a `@show` attribute, which can be used to show/hide the layer.

### Heatmap Layer

The `<GHeatmapLayer />` is used to add a heatmap layer to the corresponding map. The `@data` 
attribute, which is an array of `{lat, lng [, weight]}`, adds data to the heatmap. 

```handlebars
<GMap @center={{hash lat=mapLat lng=mapLng}}>
    <GHeatmapLayer @data=heatmapData />
</GMap>
```

Unlike with the Google Maps API, you can have a single array where some of the data points 
have a weight and some of the data points do not have a weight. The `<GHeatmapLayer />` 
component is intelligent enough to discern between the two cases, and populate the map accordingly.
