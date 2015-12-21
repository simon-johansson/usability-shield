
var $downloadBtn = $('button.download');

$downloadBtn.on('click', function() {
  event.preventDefault();

  var blob = new Blob([simplemde.value()], {type: "text/markdown;charset=utf-8"});
  saveAs(blob, "usability.md");
});
