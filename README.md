# Behaviors for Personality Insights
![last-release](https://img.shields.io/github/tag/personality-insights/behaviors.svg)
[![npm-version](https://img.shields.io/npm/v/personality-behaviors.svg)](https://www.npmjs.com/package/personality-behaviors)
[![npm-license](https://img.shields.io/npm/l/personality-behaviors.svg)](https://www.npmjs.com/package/personality-behaviors)
[![Build Status](https://travis-ci.org/personality-insights/behaviors.svg?branch=master)](https://travis-ci.org/personality-insights/behaviors)
[![codecov.io](https://codecov.io/github/personality-insights/behaviors/coverage.svg?branch=master)](https://codecov.io/github/personality-insights/behaviors?branch=master)
[![npm-downloads](https://img.shields.io/npm/dm/personality-behaviors.svg)](https://www.npmjs.com/package/personality-behaviors)

Obtain behaviors from Personality Insights' profiles. Behaviors present in this component are based on scientific research.

## Getting Started

1. Require and instance `personality-behaviors` component

  ```JavaScript
  const PersonalityBehaviors = require('personality-behaviors');
  const personalityBehaviors = new PersonalityBehaviors({ locale: 'es' });
  ```

2. Get profile's behavior

  ```JavaScript
  const profile = require('./resources/profile');
  const behaviors = personalityBehaviors.behaviors(profile);
  ```
  
3. Render behaviors somewhere! Try rendering them as cards!

See the complete [example code][example_code] or [try it live][live_example]

## More Features

There are more features available such as:

- Including the component as a browser script. Component will be exported as the global variable `PersonalityBehaviors`.

- Filtering behaviors by category, industry or both!
```JavaScript
const financeBehaviors = personalityBehaviors.behaviors(profile, { category: ['finance'] });
const mediaBehaviors = personalityBehaviors.behaviors(profile, { industry: ['media'] });
```

- Get category and industry listings
```JavaScript
const industries = personalityBehaviors.industries();
const categories = personalityBehaviors.categories();
```

- Formatting descriptions in html or markdown optionally!
```JavaScript
const personalityBehaviors = new PersonalityBehaviors({ format:'html' });
const mediaBehaviors = personalityBehaviors.behaviors(profile, { industry: ['media'] });
```



## API Methods

The available methods are the following ones:
  - `constructor :: (Options) -> PersonalityBehaviors` - Obtain an instance of `PersonalityBehaviors`.
  - `behaviors  :: (Profile, FilterOptions) -> [Behavior]` - Calculate the list of behaviors that apply to the given Personality Insights `Profile`.
  - `categories :: [Category]` - List of categories available.
  - `industries :: [Industry]` - List of industries available.

Definitions:
 - `Profile` is a IBM Watson Personality Insights profile which is basically the service JSON output, parsed into a JavaScript `Object`.
 - `Options` are options for the behaviors component. Available options are:
   - `locale` - A `String` with the locale used to generate the labels.
   - `format` - A `String` with format. Available formats are `["plain", "html", "markdown"]`.
 - `FilterOptions` are filter options for the behaviors matching.
   - `category` - A `String` or `[String]` with the categories to include.
   - `industry` - A `String` or `[String]` with the industries to include.
 - `Category` and `Industry` are `String`s.

 [example_code]: https://github.com/personality-insights/behaviors/blob/master/examples/example.html
 [live_example]: https://rawgit.com/personality-insights/behaviors/master/examples/example.html
