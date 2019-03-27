$(document).ready(function(){
  $('#tabs div').hide();
  $('#tabs div:first').show();
  $('#tabs ul li:first').addClass('active');

  $('#tabs ul li a').click(function(){
    $('#tabs ul li').removeClass('active');
    $(this).parent().addClass('active');
    var currentTab = $(this).attr('href');
    $('#tabs div').hide();
    $(currentTab).show();
    return false;
  });
  
  
  
  
});


function scrollUp(){
  	var constant = 30;
	var move = $('figure.product-quickshop-image-thumbnail').height();
  	var move_container = $('.product-quickshop-image-thumbnails-slide .move-container');
  	var current_pos = parseInt(move_container.css('top'));
  	var bottom_corner = move_container.offset().top + move_container.height();
  	var parent_bottom_corner = move_container.parent().offset().top + move_container.parent().height();
  	var upper_corner = move_container.offset().top;
   	var parent_upper_corner = move_container.parent().offset().top;
  	
    if(upper_corner < parent_upper_corner || bottom_corner < parent_bottom_corner){
      move_container.css('top', current_pos + parseInt(move + constant) + 'px');
    }
}
function scrollDown(){
  	var constant = 30;
	var move = $('figure.product-quickshop-image-thumbnail').height();
  	var move_container = $('.product-quickshop-image-thumbnails-slide .move-container');
  	var current_pos = parseInt(move_container.css('top'));
  	var bottom_corner = move_container.offset().top + move_container.height();
  	var parent_bottom_corner = move_container.parent().offset().top + move_container.parent().height();
    if(bottom_corner > parent_bottom_corner){
  		move_container.css('top', current_pos - parseInt(move + constant) + 'px');
    }
}
