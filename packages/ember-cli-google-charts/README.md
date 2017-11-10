# ember-cli-google-charts

EmberJS add-on for using Google Charts

[![npm version](https://img.shields.io/npm/v/ember-cli-google-recaptcha.svg?maxAge=2592000)](https://www.npmjs.com/package/ember-cli-google-recaptcha)
[![Dependencies](https://david-dm.org/onehilltech/ember-cli-google-recaptcha.svg)](https://david-dm.org/onehilltech/ember-cli-google-recaptcha)
[![devDependencies Status](https://david-dm.org/onehilltech/ember-cli-google-recaptcha/dev-status.svg)](https://david-dm.org/onehilltech/ember-cli-google-recaptcha?type=dev)

## Features

* Designed to support seamless integration into an EmberJS application.
* Proper binding of attributes to options for real-time, dynamic updates.
* Handle events as actions for interactive designs.
* Auto-loading and configuring of scripts that correspond with appropriate lifecycle events.

## Installation

    ember install ember-cli-google-charts
    
## Quick Example

Here is an example of creating 
[the following line chart](https://developers.google.com/chart/interactive/docs/gallery/linechart#curving-the-lines):

    {{g-linechart data=lineChartData title="Company Performance" curveType="function" legendPosition="bottom"}}
    
Each of the chart options above can bind to a variable. When the variable is updated, 
the chart is redrawn.

