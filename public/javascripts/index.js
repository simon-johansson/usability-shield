
var $downloadBtn = $('button.download');
var $shields = $('img.shield');
var $repoInput = $('input.repo');
var user = "";
var repo = "";
var shield = "";

$downloadBtn.on('click', function(ev) {
  ev.preventDefault();
  var blob = new Blob([simplemde.value()], {type: "text/markdown;charset=utf-8"});
  saveAs(blob, "usability.md");
});

$shields.on('click', function(ev) {
  ev.preventDefault();
  var $this = $(this);
  shield = $this.attr('src');
  setReadmeText();
});

$repoInput.on('change', onRepoChange);
$repoInput.on('keyup', onRepoChange);

function onRepoChange() {
  var $this = $(this);
  var val = $this.val();
  var arr = val.split('https://github.com/')[1].split('/');
  arr = arr.filter(function(n){ return n != false });
  console.log(arr);
  if (arr.length === 2) {
    repo = arr.pop();
    user = arr.pop();
    $this.css('color', '#23C35D');
  } else {
    $this.css('color', 'black');
    repo = "";
    user = "";
  }
  setReadmeText();
}

function setReadmeText() {
  if (shield && user && repo) {
    $('pre.readme').text("[![UX status][ux-image]][ux-url]\n\n[ux-image]: " + shield + "\n[ux-url]: http://l:3000/repo/" + user + '/' + repo);
  } else {
    $('pre.readme').text("");
  }
}
