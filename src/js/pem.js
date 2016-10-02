(function(window, document, $) {

  "use strict";

  $(document).ready(function() {
    // Perform initializations here:

    retrieveAllPosts(function(res) {
      var $MBLOG = $("#mblog_content");
      var newText = [];
      for(var i = 0; i < res.length; i++) {
        console.info(res[i]);
        newText.push("<div class='row mblog-post'><div class='col-sm-12'>[");
        newText.push(new Date(parseInt(res[i].date) * 1000));
        newText.push("] : ");
        newText.push(res[i].content);
        newText.push("</div></div>");
      }

      $MBLOG.html(newText.join(""));
    });
  });

  function retrieveAllPosts(callback) {
    $.get("/api/posts", callback);
  }

  function retrievePostsFrom(id, callback) {
    if(!isNaN(parseInt(id))) {
      $.get("/api/posts/id/" + id, callback)
    }
  }

})(window, window.document, window.jQuery);
