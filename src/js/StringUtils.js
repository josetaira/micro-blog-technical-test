(function(window, $) {

  "use strict";

  var StringUtils = {};

  StringUtils.escapeHtml = function(string) {
    return $("<div>").text(string).html();
  };

  window.StringUtils = StringUtils;

})(window, window.jQuery);