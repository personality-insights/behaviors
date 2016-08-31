/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const _  = require('underscore'),
  union  = _.union,
  extend = _.extend,
  pick   = _.pick;

const log = console;
const formatText = require('./utilities/format-text');

const I18nData = require('./i18n');
const scoredScenarios = require('./scored-scenarios');

function buildData(scenarios, targets) {
  const data = {
    _scenarios  : [],
    _scenariosById : {},
    _industries : [],
    _personas   : [],
    _categories : []
  };
  scenarios.forEach((s) => {
	//Skip if hidden is true
    if(!s.hidden) {
	    data._categories = union(data._categories, s.categories);
    	data._industries = union(data._industries, s.industries);
	    data._personas   = union(data._personas, s.persona);
	    data._scenariosById[s.id] = s;
    }    
  });
  data._scenarios = [].concat(scenarios);
  data._targets = targets;
  return data;
}

const _data = buildData(require('./data/scenarios'), require('./data/targets'))


class PersonalityBehaviors {

  constructor(options) {
    this._options = extend(this.defaultOptions(), pick(options, 'locale', 'format'));
    this._i18n = new I18nData(this._options.locale);
    extend(this, _data)
  }

  defaultOptions() {
    return {
      locale: 'en',
      format: 'plain'
    };
  }

  behaviors(profile, filterOptions) {
    return scoredScenarios(profile, this._scenarios, this._targets)
      .map(s => extend(s, this._description('scenarios', s.id)))
      .reduce((res, s) => res.concat(this._asBehaviors(s)), []);
  }

  _asBehaviors(scenario) {
    const formatOptions = this._options;
    const behaviors = scenario.persona.map(p => {
      return {
        id: p.replace('persona.', 'behavior.'),
        name : this._description('personas', p).name,
        verb : scenario.verb,
        description : formatText(scenario.tooltip, formatOptions),
        score : scenario.score
      };
    });

    return behaviors;
  }

  categories() {
    return this._collection('categories');
  }

  industries() {
    return this._collection('industries');
  }

  _collection(type) {
    return this[`_${type}`].map(id => this._description(type, id));
  }

  _description(type, id) {
    return this._i18n.type(type).id(id);
  }

}


module.exports = PersonalityBehaviors;
