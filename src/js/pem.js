(function(window, document, $, StringUtils) {

  "use strict";

  var $mblogPoster = null;
  var $mblogDate = null;
  var $btnDelete = null;
  var $mblogModal = null;
  var $mblogModalContent = null;
  var $mblogModalRowid = null;
  var $mblogPosts = null;

  $(document).ready(function() {

    // Initialise event handlers:
    $("#btn_new_mblog").click(function() {
      openModal();
    });

    $("#btn_submit_mblog").click(function() {
      if(document.forms["mblog_form"].mblog_content.value) {
        var url = null;
        var data = {
          content: document.forms["mblog_form"].mblog_content.value,
          rowid: document.forms["mblog_form"].mblog_rowid.value
        };
        if($.isNumeric(document.forms["mblog_form"].mblog_rowid.value)) {
          url = "/api/posts/edit";
        } else {
          url = "/api/posts/new";
        }
        $.post(url, data, function() {
          retrievePostsAndDisplay();
          closeModal();
        });
      } else {
        alert("Your thoughts can't be blank");
      }
    });

    $btnDelete = $("#btn_delete_mblog");
    $btnDelete.click(function() {
      var postId = document.forms["mblog_form"].mblog_rowid.value;
      deletePost(postId);
    });

    // Init post button click handlers:
    $mblogPosts = $("#mblog_posts");
    $mblogPosts.on("click", "button.mblog-update-btn", function() {
      openModal($(this).data().rowid);
    });
    $mblogPosts.on("click", "button.mblog-view-btn", function() {
      openModal($(this).data().rowid, true);
    });

    // Initialise some fields we'll use continuously later:
    initElementCache();

    // Display all posts here:
    retrievePostsAndDisplay();
  });

  // Reduce DOM traversal so we can make the page run faster:
  function initElementCache() {
    $mblogPoster = $("#mblog_poster");
    $mblogDate = $("#mblog_date");
    $mblogModal = $("#mblog_modal");
    $mblogModalContent = $("#mblog_content");
    $mblogModalRowid = $("#mblog_rowid");
  }

  function openModal(postId, viewMode) {

    // Modal inits:
    $mblogModalContent.val("");
    $mblogModalRowid.val("");
    $mblogPoster.html("");
    $mblogDate.html("");

    // Init buttons based on mode:
    if(viewMode) {
      $mblogModal.find("button").hide();
    } else {
      $mblogModal.find("button").show();
    }
    $btnDelete.hide();

    // Retrieve content if we have a post id:
    if($.isNumeric(postId)) {
      retrievePostsWithID(postId, function(res) {
        $mblogModalContent.val(res.content);
        $mblogModalRowid.val(res.rowid);

        $mblogPoster.html(res.poster);
        $mblogDate.html(formatToDateString(res.date));

        $mblogModalContent.attr("readonly", !!viewMode);
        if(!viewMode) {
          $btnDelete.show();
        }

        $mblogModal.modal("show");
      });
    } else {
      $mblogModal.modal("show");
    }

  }

  function closeModal() {
    $mblogModal.modal("hide");
  }

  function deletePost(id) {
    if($.isNumeric(id) && confirm("Are you sure you want to delete this post?")) {
      $.post("/api/posts/delete", {rowid: id}, function(res) {
        closeModal();
        retrievePostsAndDisplay();
      });
    }
  }

  function retrievePostsAndDisplay() {
    retrieveAllPosts(function(res) {

      res.sort(function(a, b) {
        return parseInt(b.date) - parseInt(a.date);
      });

      $mblogPosts.empty();

      for(var i = 0; i < res.length; i++) {

        var newText = [];

        newText.push("<div class='row mblog-post'><div class='col-sm-9'><div class=''>");
        newText.push("<span class='mblog-poster'>");
        newText.push(StringUtils.escapeHtml(res[i].poster));
        newText.push("</span>");
        newText.push(" : ")
        newText.push(StringUtils.escapeHtml(res[i].content));
        newText.push("</div>");
        newText.push("</div>")

        newText.push("<div class='col-sm-2'>");
        newText.push(formatToDateString(res[i].date));
        newText.push("</div>");

        newText.push("<div class='col-sm-1'>");
        newText.push("<button class='btn btn-secondary mblog-update-btn pull-right' data-toggle='tooltip' title='Edit'><i class='fa fa-pencil-square-o'></i></button>");
        newText.push("<button class='btn btn-secondary mblog-view-btn pull-right' data-toggle='tooltip' title='View'><i class='fa fa-newspaper-o'></i></button>");
        newText.push("</div>");

        newText.push("</div>");

        var $elem = $(newText.join(""));
        $elem.find(".mblog-update-btn, .mblog-view-btn").data({rowid: res[i].rowid});

        $mblogPosts.append($elem);
      }

      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  function retrieveAllPosts(callback) {
    $.get("/api/posts", callback);
  }

  function retrievePostsWithID(id, callback) {
    if($.isNumeric(parseInt(id))) {
      $.get("/api/posts/id/" + id, callback);
    }
  }

  function retrieveUserPosts(userId, callback) {
    if($.isNumeric(parseInt(userId))) {
      $.get("/api/posts/id/" + userId, callback);
    }
  }

  function formatToDateString(dateSeconds) {
    return new Date(parseInt(dateSeconds) * 1000).toLocaleString();
  }

})(window, window.document, window.jQuery, window.StringUtils);
