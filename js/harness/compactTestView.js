/*
Copyright 2014 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
'use strict';

var compactTestView = (function() {

function CompactTestView(mainPage, fields, style) {
  var self = this;
  this.divId = 'testview';
  this.testCount = 0;

  this.initialize = function() {
    this.testList = createCompactTestList(style);

    this.addSwitch('Loop: ', 'loop');
    this.addSwitch('Stop on failure: ', 'stoponfailure');
    this.addSwitch('Log: ', 'logging');
    this.addSwitch('WebM/VP9 (2015/tip only): ', 'enablewebm');

    this.addCommand('Run All', 'run-selected', 'Run all tests in order.',
        function(e) {
      if (self.onrunselected)
        self.onrunselected.call(self, e);
    });

    this.addLink('Links', 'links.html');
    this.addLink('Instructions', 'instructions.html');
    this.addLink('Changelog', 'main.html');
    this.addLink('Download', 'download.tar.gz');

    for (var testType in testTypes) {
      if (testType !== currentTestType && testTypes[testType].public) {
        this.addLink(testTypes[testType].name,
                     mainPage + '?test_type=' + testType);
      }
    }
  };

  this.addTest = function(desc) {
    return this.testList.addTest(desc);
  };

  this.generate = function(mseSpec) {
    CompactTestView.prototype.generate.call(this, mseSpec);
    document.getElementById('run-selected').focus();

    var USAGE = 'Use &uarr;&darr;&rarr;&larr; to move around, ' +
        'use ENTER to select.';
    document.getElementById('usage').innerHTML = USAGE;
    document.getElementById('run-selected').focus();
  };

  this.getTest = function(index) {
    return this.testList.getTest(index);
  };

  this.finishedOneTest = function() {
    ++this.testCount;
    document.getElementById('finish-count').innerHTML =
        this.testCount === 1 ? this.testCount + ' test finished' :
                               this.testCount + ' tests finished';
  };

  this.anySelected = function() {
    return this.testList.anySelected();
  };

  this.initialize();
};

CompactTestView.prototype = TestView.create();
CompactTestView.prototype.constructor = CompactTestView;

return {
  create: function(mainPage, fields, style) {
    return new CompactTestView(mainPage, fields, style);
  }
};

})();
