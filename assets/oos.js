var host = 'https://outofstock.eastsideco.io';

if (window.hasOwnProperty('escOutOfStock_devTranslations')) {
  var translation = window.escOutOfStock_devTranslations;
  
} else {
  var translation = JSON.parse('\x7B\x22id\x22\x3A630,\x22created_at\x22\x3A\x222017\x2D06\x2D29\x2018\x3A44\x3A35\x22,\x22updated_at\x22\x3A\x222017\x2D06\x2D29\x2018\x3A44\x3A35\x22,\x22shop_id\x22\x3A796,\x22title\x22\x3A\x22Item\x20out\x20of\x20stock\x20\x2D\x20notify\x20me\x21\x22,\x22sms_email_heading\x22\x3A\x22Enter\x20your\x20phone\x20number\x20or\x20email\x20address\x20below\x20to\x20be\x20notified\x20when\x20this\x20item\x20is\x20back\x20in\x20stock\x3A\x22,\x22email_only_heading\x22\x3A\x22Enter\x20your\x20email\x20address\x20below\x20to\x20be\x20notified\x20when\x20this\x20item\x20is\x20back\x20in\x20stock\x3A\x22,\x22country_heading\x22\x3A\x22Select\x20country\x3A\x22,\x22sms_btn\x22\x3A\x22Text\x20Me\x22,\x22sms_error\x22\x3A\x22Enter\x20valid\x20mobile\x20phone\x20number\x22,\x22sms_success\x22\x3A\x22Thank\x20you\x20\x2D\x20we\x27ll\x20send\x20you\x20an\x20SMS\x20when\x20your\x20item\x20becomes\x20available\x22,\x22email_placeholder\x22\x3A\x22you\x40example.com\x22,\x22email_btn\x22\x3A\x22Email\x20Me\x22,\x22email_error\x22\x3A\x22Enter\x20valid\x20email\x20address\x22,\x22email_already_tracked\x22\x3A\x22Whoops\x21\x20You\x27ve\x20already\x20signed\x20up\x20to\x20be\x20notified\x22,\x22sms_already_tracked\x22\x3A\x22Whoops\x21\x20You\x27ve\x20already\x20signed\x20up\x20to\x20be\x20notified\x22,\x22email_success\x22\x3A\x22Thank\x20you\x20\x2D\x20we\x27ll\x20send\x20you\x20an\x20email\x20when\x20your\x20item\x20becomes\x20available\x22,\x22email_unsubscribed\x22\x3A\x22Email\x20address\x20currently\x20unsubscribed\x22,\x22product_back_in_stock\x22\x3A\x22Product\x20now\x20back\x20in\x20stock\x21\x20Refresh\x20your\x20page\x22\x7D');
  

}

var $escOosTag = $('[data-app="esc-out-of-stock"]');
/*
 var productVariants = $escOosTag.html();


productVariants = $.parseJSON(productVariants);
*/
var productId = $escOosTag.data('product-id');
var invPolicyAllowOosEnabled = $escOosTag.attr('inventory-policy-allow-oos-enabled');
var selectedVariantId = null;
if (productId) {
  var productAvailable = $escOosTag.data('product-available');
  if (productAvailable == false) insertAlertBtns();
  onAlertClick();
} else {
  // If selectedVariantId is false, Shopify has defaulted to the first in stock variant
  selectedVariantId = getVariantId();

  console.log('selectedVariantId', selectedVariantId);
  if (!selectedVariantId) {
    console.log('No variant id');
  } else {
    var variantInventoryManagement = getVariantInventoryManagement();
    console.log('inventory management', variantInventoryManagement);
    var variantInventoryPolicy = getVariantInventoryPolicy();
    console.log('inventory policy', variantInventoryPolicy);
    console.log('invPolicyAllowOosEnabled', invPolicyAllowOosEnabled);

    if (variantInventoryManagement == 'shopify' && (variantInventoryPolicy == 'deny' || invPolicyAllowOosEnabled )) {
      if (invPolicyAllowOosEnabled) {
        console.log('invPolicyAllowOosEnabled', invPolicyAllowOosEnabled);
      }
      var quantity = variantStockCheck();
      console.log('Stock quantity', quantity);
      if (Number.isInteger(quantity) && quantity <= 0) {
        console.log('Call setupOosForm()');
        setupOosForm();
      } else {
        $('#esc-oos-form').empty();
      }
    } else {
      $('#esc-oos-form').empty();
      console.log('NBIS not allowed');
    }

  }


  var $allInputs = $addToCart.find('select,input').filter(':not(.esc-sms-input)').filter(':not(.esc-email-input)');
  console.log('$allInputs1', $allInputs);
  $allInputs.change(inputsChanged);

}

function getVariantId() {

  var selectedVariantId = null;
  var search = window.location.search;
  if (search.length == 0) {
    // Check are all variants ?
    var productOutOfStock = getProductOutOfStock();
    console.log('productOutOfStock', productOutOfStock);
    if (productOutOfStock) {
      var variant = productVariants[0];
      selectedVariantId = variant.id;
      return selectedVariantId;
    } else {
      return false;
    }

  }


  search = search.split('?');

  if (search) {
    search = search[1].split('&');
  }

  $.each(search, function(k, e){
    var param = e.split('=');
    if (param[0] == 'variant') selectedVariantId = param[1];
  });

  return selectedVariantId;


}
function onAlertClick(productId) {

  console.log('onAlertClick()');
  console.log('esc-btn', $(".esc-btn" ));
  $(".esc-btn" ).on( "click", function() {

    console.log('onAlertClick clicked');
    $('.esc-notification').empty();
    var alertType = $(this).data('alert-type');

    if (alertType == 'email') {
      var destination = $('.esc-email-input').val();
      if (validateEmail(destination) == false) {
        $('.esc-email-notification').removeClass('esc-error')
        .addClass('esc-error')
        .html(translation.email_error);
        return;
      }
    }

    var country = $('.countrySelect').val();

    if (alertType == 'sms') {
      var country = $("#phone").intlTelInput("getSelectedCountryData").iso2.toUpperCase();
      var destination = $("#phone").intlTelInput("getNumber");
    }

    $(this).prop('disabled', 'disabled');
    insertOosProduct(destination, alertType, country, productId);

  });

}

function validateEmail(x) {
            var atpos = x.indexOf("@");
            var dotpos = x.lastIndexOf(".");
            if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
                return false;
            } else return true;

        }
function insertOosProduct(destination, alertType, country, productId) {

            var url = host + '/api/create-alert';
            var data = {
                product_id : productId,
                variant_id : selectedVariantId,
                destination : destination,
                alertType : alertType,
                domain: "heroinescom.myshopify.com",
                country : country
            };

            console.log('Create alert:', data);

            $.ajax({
                data : data,
                url : url,
                type : 'post',
                dataType: 'text',
                success : function(res) {
                    $('.esc-btn').removeAttr('disabled');
                    if (res == 1) {
                        $('.esc-email-notification')
                        .removeClass('esc-error')
                        .addClass('esc-success')
                        .html(translation.email_success);
                        $('.esc-email-input').hide();
                        $('.esc-email-container button').hide();
                    } else if (res == 2) {
                        $('.esc-sms-notification')
                        .removeClass('esc-error')
                        .addClass('esc-success')
                        .html(translation.sms_success);
                        $('.esc-sms-container .intl-tel-input').hide();
                        $('.esc-sms-select-country-title').hide();
                        $('.esc-sms-input').hide();
                        $('.esc-sms-container button').hide();
                    } else if (res == -1) {
                        $('.esc-sms-notification').removeClass('esc-error')
                        .addClass('esc-error')
                        .html(translation.sms_error);
                    } else if (res == -2) {
                        $('.esc-email-notification').removeClass('esc-error')
                        .addClass('esc-error')
                        .html(translation.email_error);
                    } else if (res == -3) {
                        $('.esc-email-notification').removeClass('esc-error')
                        .addClass('esc-error')
                        .html(translation.email_already_tracked);
                    } else if (res == -4) {
                        $('.esc-sms-notification').removeClass('esc-error')
                        .addClass('esc-error')
                        .html(translation.sms_already_tracked);
                    } else if (res == -5) {
                        $('.esc-email-notification').removeClass('esc-error')
                        .addClass('esc-error')
                        .html(translation.email_unsubscribed);
                    } else if (res == -6) {
                        $('.esc-email-notification').removeClass('esc-error')
                        .addClass('esc-error')
                        .html(translation.product_back_in_stock);
                    } else if (res == -7) {
                        $('.esc-email-notification').removeClass('esc-error')
                        .addClass('esc-error')
                        .html("There was an error creating alert");
                    } else if (res == -9) {
                        console.log('Now Back in Stock shop domain not recevied');
                    } else if (res == -10) {
                        console.log('Now Back in Stock shop does not exist');
                    }

                }
            });



        }
function setupOosForm(id) {
  setTimeout(function(){
    insertAlertBtns(id);
  	onAlertClick(id);
  },100);
  

}

function insertAlertBtns(id){

  console.log('insertAlertBtns()');

  var smsPlan = "";
  if (smsPlan == 1) {
    var oosSubTitleHtml = translation.sms_email_heading;
  } else {
    var oosSubTitleHtml = translation.email_only_heading;
  }

  var container = $('<div>').attr('id', 'esc-out-of-stock-inputs');

  var oosTitle = $('<div>', { class: 'esc-out-of-stock-title'})
  .html('Ikke på lager');
  container.append(oosTitle);
  var oosSubTitle = $('<div>', { class: 'esc-out-of-stock-subtitle'})
  .html('Indtast din e-mail adresse nedenfor for at blive underrettet, når dette produkt er tilbage på lager');
  container.append(oosSubTitle);


  if (smsPlan == 1) {
    var sms = getSmsContainer();
    $(container).append(sms);
  }

  var email = $('<div>',{
    class : 'esc-email-container',
  });
  var emailInput = $('<input class="esc-email-input">').attr('placeholder', 'hej@dinemail.com');
  $(email).append(emailInput);
  var emailBtn = $('<button>',  {
    class : 'esc-btn',
    'data-alert-type' : 'email',
    html : 'Send mig email'
  });
  $(email).append(emailBtn);

  var emailNotfication = $('<div>',{
    class : 'esc-notification esc-email-notification'
  });

  email.append(emailNotfication);

  $(container).append(email);

  $('#esc-oos-form-'+id).html('').append(container);

  $('.countrySelect').change(function(){
    var isoCountry = $(this).val();
    if(topCountryCodes.hasOwnProperty(isoCountry)){
      var code = topCountryCodes[isoCountry].code;
    } else {
      var code = bottomCountryCodes[isoCountry].code;
    }

    $smsInput = $('.esc-sms-input');
    $smsInput.val('+' + code);
    $smsInput.off("keydown");
    disableCodeEdit($smsInput, code);

  });
}
