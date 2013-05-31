$(document).ready(function(){
  var dollar = $("#dollar");
  var cmd    = $("#cmd");
  var resbox = $("#resbox");

  // set the cmds focus on
  cmd.focus();

  // give the cmd a proper width
  cmd.width(cmd.width() - dollar.width() * 2 + 3);
  // give the results box proper width
  resbox.width(resbox.width() - 80);
  // and centrally align it
  resbox.css("margin-left", 20);

  // handle the Enter keydown
  cmd.keypress(function(e){
    if (e.which == 13){
      handle_input(cmd.val());
      // clear out the input
      cmd.val("");
    }
  });
});

function handle_input(input)
{
  var dollar = $("#dollar");
  var cmd    = $("#cmd");
  var resbox = $("#resbox");

  if (input == "ls"){
    resbox.html(".<br>..");
  }
  else if (input == "clear"){
    resbox.html("");
  }
  else {
    resbox.html("command not found");
  }

  resbox.css("padding", 20);
  resbox.animate({
    height: '100%'
  }, {
    duration: 100,
    specialEasing: {
      height: 'easeOutBounce'
    }
  });
}
