!(function ($) {
  var MOBILE_SCREEN_WIDTH = 600;

  function loadPDF() {
    var pdfContainer = $("[data-pdf]");
    if (!pdfContainer.length) return;

    var url = pdfContainer.attr("data-pdf");

    // Loaded via <script> tag, create shortcut to access PDF.js exports.
    var pdfjsLib = window["pdfjs-dist/build/pdf"];

    // The workerSrc property shall be specified.
    pdfjsLib.GlobalWorkerOptions.workerSrc = $("#pdf-worker").attr("src");

    // Asynchronous download of PDF
    var loadingTask = pdfjsLib.getDocument(url);

    loadingTask.promise.then(
      function (pdf) {
        console.log("PDF loaded");

        // Fetch the first page
        var pageNumber = 1;
        pdf.getPage(pageNumber).then(function (page) {
          console.log("Page loaded");

          var scale = 1.5;
          var viewport = page.getViewport({ scale: scale });

          // Prepare canvas using PDF page dimensions
          var canvas = document.getElementById("pdf-canvas");
          var context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          var renderTask = page.render(renderContext);
          renderTask.promise.then(function () {
            console.log("Page rendered");
          });
        });
      },
      function (reason) {
        // PDF loading error
        console.error(reason);
      }
    );
  }

  $(function () {
    $(".nav__toggle").on("click", function () {
      $(this).toggleClass("open");
      $(this).closest(".nav__main").toggleClass("open");
    });

    loadPDF();
  });
})(jQuery);
