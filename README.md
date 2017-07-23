# ember-cli-google

EmberJS add-on for a variety of Google services and products.

## Features

* Designed to support seamless integration into an EmberJS application.
* Proper binding of attributes to options for real-time, dynamic updates.
* Handle events as actions for interactive designs.
* Auto-loading and configuring of scripts that correspond with appropriate lifecycle events.

## Supported Products 

* [Google Charts](https://developers.google.com/chart/) (partial)
* [Google reCAPTCHA](https://www.google.com/recaptcha/intro/)

## Installation

    ember install ember-cli-google --save-dev
    
## Quick Example

Here is an example of creating 
[the following line chart](https://developers.google.com/chart/interactive/docs/gallery/linechart#curving-the-lines):

    {{g-linechart data=lineChartData title="Company Performance" curveType="function" legendPosition="bottom"}}
    
Each of the chart options above can bind to a variable. When the variable is updated, 
the chart is redrawn.

## Documentation

View the Wiki to learn more about using this add-on in your project.
