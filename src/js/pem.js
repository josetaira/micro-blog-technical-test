(function(window, document, $, StringUtils) {

  "use strict";

  $(document).ready(function() {
    // Perform initializations here:
    $("#btn_new_mblog").click(function() {
      openModal();
    });

    $("#btn_submit_mblog").click(function() {
      if(document.forms["mblog_form"].mblog_content.value) {
        $.post("/api/posts/new", {content: document.forms["mblog_form"].mblog_content.value}, function() {
          retrievePostsAndDisplay();
          closeModal();
        });
      } else {
        alert("Your thoughts are blank");
      }
    });

    // Display all posts here:
    retrievePostsAndDisplay();
  });

  function openModal(data) {
    if(data) {

    }
    $("#mblog_modal").modal("show");
  }

  function closeModal() {
    $("#mblog_modal").modal("hide");
  }

  function retrievePostsAndDisplay() {
    retrieveAllPosts(function(res) {
      var $MBLOG = $("#mblog_content");
      var newText = [];
      res.sort(function(a, b) {
        return parseInt(b.date) - parseInt(a.date);
      });
      for(var i = 0; i < res.length; i++) {
        newText.push("<div class='row mblog-post'><div class='col-sm-10'><div class=''>");
        newText.push("<span class='mblog-poster'>");
        newText.push(StringUtils.escapeHtml(res[i].poster));
        newText.push("</span>");
        newText.push(" : ")
        newText.push(StringUtils.escapeHtml(res[i].content));
        newText.push("</div></div>")
        newText.push("<div class='col-sm-2 pull-right'>");
        newText.push(new Date(parseInt(res[i].date) * 1000).toLocaleString());
        newText.push("</div>");
        newText.push("</div>");
      }

      $MBLOG.html(newText.join(""));
    });
  }

  function retrieveAllPosts(callback) {
    $.get("/api/posts", callback);
  }

  function retrievePostsWithID(id, callback) {
    if(!isNaN(parseInt(id))) {
      $.get("/api/posts/id/" + id, callback);
    }
  }

  function retrieveUserPosts(userId, callback) {
    if(!isNaN(parseInt(userId))) {
      $.get("/api/posts/id/" + userId, callback);
    }
  }

})(window, window.document, window.jQuery, window.StringUtils);
