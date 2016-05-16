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

const PersonalityBehaviors = require('../');

describe('behaviors', () => {

  it('test categories', () => {
    const personalityBehaviors = new PersonalityBehaviors();
    const categories = personalityBehaviors.categories();
    assert.equal(categories[0].name, 'Shopping', 'Got expected category');
    assert.equal(categories[8].name, 'Ad Targeting', 'Got expected category');
  });

  it('test industries', () => {
    const personalityBehaviors = new PersonalityBehaviors();
    const industries = personalityBehaviors.industries();
    assert.equal(industries[0].name, 'Retail', 'Got expected industry');
    assert.equal(industries[8].name, 'Travel', 'Got expected industry');
  });

  it('test behavior', () => {
    const personalityBehaviors = new PersonalityBehaviors();
    const behaviors = personalityBehaviors.behaviors(require('./resources/profile'), { industry: 'no_industry', category: ['risk'] });
    assert.equal(behaviors[0].name, 'Green Lover', 'Got expected behavior name');
    assert.equal(behaviors[0].score, 0.42935318921548377, 'Got expected behavior score');

    assert.equal(behaviors[8].name, 'Risk Taker', 'Got expected behavior name');
    assert.equal(behaviors[8].score, 0.34521581362525805, 'Got expected behavior score');
  });

});
