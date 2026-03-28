/* Add your custom JavaScript code */

    $(document).scroll(function() {
	  var y = $(this).scrollTop();
	  if (y > 800) {
	    $('.gototop-button').fadeIn();
	  } else {
	    $('.gototop-button').fadeOut();
	  }
	});
