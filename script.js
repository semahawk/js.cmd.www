/* abstract file system */
var FS = {
  current: 0,

};

/* the input history object */
var History = {
  position: 0,
  count: 0,
  stack: [],
  add: function(line){
    this.stack[this.count++] = line;
    this.position = 0;
  },
  prev: function(){
    if (this.position < this.stack.length)
      this.position++;

    return this.stack[this.stack.length - this.position];
  },
  next: function(){
    if (this.position >= 2)
      this.position--;
    else {
      this.position = 0;
      return "";
    }

    return this.stack[this.stack.length - this.position];
  }
};

$(document).ready(function(){
  var prmpt = $("#prmpt");
  var cmd    = $("#cmd");
  var resbox = $("#resbox");

  // set the cmds focus on
  cmd.focus();

  // give the cmd a proper width
  cmd.width(cmd.width() - prmpt.width() * 2 + 3);
  // give the results box proper width
  resbox.width(resbox.width() - 80);
  // and a proper maximum height
  resbox.css("max-height", $(window).height() - cmd.height() - 90);
  // and centrally align it
  resbox.css("margin-left", 20);

  // handle the key pressing
  cmd.keydown(function(e){
    // Enter
    if (e.which == 13){
      /* do anything only if there is something in the input */
      if (cmd.val() != ""){
        History.add(cmd.val());
        handle_input(cmd.val());
        // clear out the input
        cmd.val("");
      }
    }
    // Up arrow
    else if (e.keyCode == 38){
      cmd.val(History.prev());
    }
    // Down arrow
    else if (e.keyCode == 40){
      cmd.val(History.next());
    }
    // Pg up
    else if (e.keyCode == 33){
      resbox.scrollTo('-=288px', 500, { easing: 'easeOutBounce' });
    }
    // Pg down
    else if (e.keyCode == 34){
      resbox.scrollTo('+=288px', 500, { easing: 'easeOutBounce' });
    }
  });
});

function handle_input(input)
{
  var prmpt = $("#prmpt");
  var args   = input.split(" ");
  var cmd    = args[0];

  switch (cmd){
    case "history":
      var output = "";
      for (entry in History.stack){
        output += entry + " - " + History.stack[entry] + "<br>";
      }
      out(output);
      break;
    case "echo":
      out(args.slice(1).join(" "));
      break;
    case "clear":
      out();
      break;
    case "uname":
      switch (args[1]){
        case "-a":
          out("Linux little-big-horn 3.5.7-gentoo #7 SMP Wed Apr 3 21:48:46 UTC 2013 x86_64 Intel(R) Core(TM)2 Duo CPU T6570 @ 2.10GHz GenuineIntel GNU/Linux");
          break;
        case "-n":
          out("little-big-horn");
          break;
        case "-r":
          out("3.5.7-gentoo");
          break;
        case "-s":
          /* fall through */
        case undefined:
          out("Linux");
          break;
        case "-v":
          out("#7 SMP Wed Apr 3 21:48:46 UTC 2013");
          break;
        case "-m":
          out("x86_64");
          break;
        case "-p":
          out("Intel(R) Core(TM)2 Duo CPU T6570 @ 2.10GHz");
          break;
        case "-i":
          out("GenuineIntel");
          break;
        case "-o":
          out("GNU/Linux");
          break;
        case "--help":
          /* there is GOT to be better way to do this */
          out("Usage: uname [OPTION]...<br>Print certain system information.  With no OPTION, same as -s.<br><br><br>  -a, --all                print all information, in the following order,<br>                             except omit -p and -i if unknown:<br>  -s, --kernel-name        print the kernel name<br>  -n, --nodename           print the network node hostname<br>  -r, --kernel-release     print the kernel release<br>  -v, --kernel-version     print the kernel version<br>  -m, --machine            print the machine hardware name<br>  -p, --processor          print the processor type or \"unknown\"<br>  -i, --hardware-platform  print the hardware platform or \"unknown\"<br>  -o, --operating-system   print the operating system<br>      --help     display this help and exit<br>      --version  output version information and exit<br><br>Report uname bugs to bug-coreutils@gnu.org<br>GNU coreutils home page: <http://www.gnu.org/software/coreutils/><br>General help using GNU software: <http://www.gnu.org/gethelp/><br>For complete documentation, run: info coreutils 'uname invocation'");
          break;
        default:
          out("uname: invalid option -- '" + args[1] + "'<br>Try 'uname --help' for more information.");
          break;
      }
      break;
    case "cat":
      if (args[1] == undefined){
        out("<input style='width: 868px; font-size: 24px;' type='text' id='cat-input'>");
        $("#cat-input").val("").focus();
        // handle the key pressing
        $("#cat-input").keydown(function(e){
          // Enter
          if (e.which == 13){
            out($("#cat-input").val());
            $("#cmd").focus();
          }
        });
      } else {
        if (args[1] === "/dev/urandom"){
          out("sending an e-mail to Chuck Norris asking about the contents of /dev/urandom...");
          setTimeout(function(){ out("OH NOEZ"); }, 1000);
          setTimeout(function(){ out("stack overflow!"); }, 1000);
          setTimeout(function(){ out("call the ambulance!"); }, 1000);
          setTimeout(function(){ out("oh, no, wait.. here it is!"); }, 1000);
          setTimeout(function(){ out("/* some crap */"); }, 1000);
        } else {
          outfile(args[1]);
        }
      }
      break;
    case "su":
      if (args[1] == undefined){
        prmpt.html("#");
        out();
      } else {
        if (args[1] === "szymon"){
          prmpt.html("»");
          out();
        } else {
          out("Unknown id: " + args[1]);
        }
      }
      break;
    case "ls":
      out(".<br>..<br>hello<br>copyright");
      break;
    default:
      out(cmd + ": command not found");
      break;
  }
}

function out(output)
{
  var resbox = $("#resbox");

  //resbox.animate({
    //height: '0',
    //padding: '0'
  //}, {
    //duration: 50,
    //easing: 'easeOutBounce'
  //});

  if (output == null){
    resbox.html("");
    resbox.css("padding", 0);
    resbox.css("height", 0);
  }
  else {
    resbox.html(output);
    resbox.animate({
      height: '100%',
      padding: '20'
    }, {
      duration: 500,
      easing: 'easeOutBounce'
    });
  }
}

function outfile(fname)
{
  var resbox = $("#resbox");
  var content = "";
  /* create a dummy div */
  //jQuery('<div/>', { id: 'dummy', style: 'display: none' }).appendTo("html");
  jQuery('<div/>', { id: 'dummy' }).load(fname, function(response, status, xhr){
    if (xhr.status == "404"){
      out(fname + ": file not found");
    } else {
      out(response);
    }
  });
}
