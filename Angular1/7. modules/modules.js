var modulesModule = angular.module("modulesModule", ['helloModule', 'ngTagsInput'])

modulesModule.controller('TagsController', function() {
  this.tags = [
    { text: 'bhargava' },
    { text: 'siri' },
    { text: 'xxx' }
  ];
});