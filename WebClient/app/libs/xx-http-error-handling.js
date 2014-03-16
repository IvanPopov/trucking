/**
 * @ngdoc overview
 * @name xx-http-error-handling
 * @description
 *
 * Module that provides global http error handling for apps.
 *
 * Usage:
 * Hook the file in to your index.html: <script src="lib/xx/xx-http-error-handling.js"></script>
 * Add <div class="messagesList" app-messages></div> to the index.html at the position you want to
 * display the error messages.
 */
(function () {
    'use strict';
    angular.module('xx-http-error-handling', [])
      .config(function ($provide, $httpProvider, $compileProvider) {
        var elementsList = $();
        var messageTimeOut = 6 * 1000;
        var errorTimeOut = 10 * 60 * 1000;

          // this message will appear for a defined amount of time and then vanish again
          var showMessage = function (content, cl, time) {
              content = JSON.stringify(content, null, '   ');
              console.log(content);
              $('<div style="position: absolute;"/>')
                .addClass(cl)
                .hide()
                .fadeIn('fast')
                .delay(time)
                .fadeOut('fast', function () { $(this).remove(); })
                .appendTo(elementsList)
                .text(content)
                .append('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>');
          };

          // push function to the responseInterceptors which will intercept 
          // the http responses of the whole application
          $httpProvider.responseInterceptors.push(function ($timeout, $q) {
              return function (promise) {
                  return promise.then(function (successResponse) {
                      // if there is a successful response on POST, UPDATE or DELETE we display
                      // a success message with green background
                      if (successResponse.config.method.toUpperCase() != 'GET') {
                          showMessage('Success', 'alert alert-success alert-dismissable', 5000);
                      }
                      return successResponse;
                  },
                  // if the message returns unsuccessful we display the error 
                  function (errorResponse) {
                      switch (errorResponse.status) {
                          case 400: // if the status is 400 we return the error
                              showMessage(errorResponse.data, 'alert alert-danger alert-dismissable', errorTimeOut);
                              break;
                          case 401: // if the status is 401 we return access denied
                              showMessage('Wrong email address or password!',
                                'alert alert-danger alert-dismissable', errorTimeOut);
                              break;
                          case 403: // if the status is 403 we tell the user that authorization was denied
                              showMessage('You have insufficient privileges to do what you want to do!',
                                'alert alert-danger alert-dismissable', errorTimeOut);
                              break;
                          case 500: // if the status is 500 we return an internal server error message
                              showMessage('Internal server error: ' + errorResponse.data,
                                'alert alert-danger alert-dismissable', errorTimeOut);
                              break;
                          default: // for all other errors we display a default error message
                              showMessage('Error ' + errorResponse.status + ': ' + errorResponse.data,
                                'alert alert-danger alert-dismissable', errorTimeOut);
                      }
                      return $q.reject(errorResponse);
                  });
              };
          });

          // this will display the message if there was a http return status
          $compileProvider.directive('httpErrorMessages', function () {
              return {
                  link: function (scope, element, attrs) {
                      elementsList.push($(element));
                  }
              };
          });
      });
})();