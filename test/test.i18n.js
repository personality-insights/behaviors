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

const assert = require('chai').assert;
const log = require('winston');

const I18nData = require('../lib/i18n');

describe('i18n', () => {

  it('get data types', () => {
    const data = new I18nData('en');
    assert.equal(data.type('scenarios')._type, 'scenarios', 'Got type data for scenarios');
    assert.equal(data.type('industries')._type, 'industries', 'Got type data for categories');
    assert.equal(data.type('categories')._type, 'categories', 'Got type data for industries');
  });

  it('get description for scenario', () => {
    const data = new I18nData('en');
    const scenarioData = data.type('scenarios').id('scenario.healthy_food');
    assert.equal(scenarioData.name, 'Healthy Food', 'Got expected scenario data');
  });

  it('get description for industry', () => {
    const data = new I18nData('en');
    const industryData = data.type('industries').id('industry.media');
    assert.equal(industryData.name, 'Media', 'Got expected industry data');
  });

  it('get description for category', () => {
    const data = new I18nData('en');
    const categoryData = data.type('categories').id('category.risk');
    assert.equal(categoryData.name, 'Risk', 'Got expected category data');
  });


});
