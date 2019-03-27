(function() {
    // IE isInteger polyfill
    Number.isInteger = Number.isInteger || function(value) {
      return typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value;
    };

    var topCountryCodes = {"US":{"name":"United States","code":"1"},"GB":{"name":"United Kingdom","code":"44"}};
    var bottomCountryCodes = {"AD":{"name":"Andorra","code":"376"},"AE":{"name":"United Arab Emirates","code":"971"},"AF":{"name":"Afghanistan","code":"93"},"AG":{"name":"Antigua and Barbuda","code":"1-268"},"AI":{"name":"Anguilla","code":"1-264"},"AL":{"name":"Albania","code":"355"},"AM":{"name":"Armenia","code":"374"},"AN":{"name":"Netherlands Antilles","code":"599"},"AO":{"name":"Angola","code":"244"},"AQ":{"name":"Antarctica","code":"672"},"AR":{"name":"Argentina","code":"54"},"AS":{"name":"American Samoa","code":"1-684"},"AT":{"name":"Austria","code":"43"},"AU":{"name":"Australia","code":"61"},"AW":{"name":"Aruba","code":"297"},"AX":{"name":"Aland Islands","code":"358-18"},"AZ":{"name":"Azerbaijan","code":"994"},"BA":{"name":"Bosnia and Herzegovina","code":"387"},"BB":{"name":"Barbados","code":"1-246"},"BD":{"name":"Bangladesh","code":"880"},"BE":{"name":"Belgium","code":"32"},"BF":{"name":"Burkina Faso","code":"226"},"BG":{"name":"Bulgaria","code":"359"},"BH":{"name":"Bahrain","code":"973"},"BI":{"name":"Burundi","code":"257"},"BJ":{"name":"Benin","code":"229"},"BM":{"name":"Bermuda","code":"1-441"},"BN":{"name":"Brunei","code":"673"},"BO":{"name":"Bolivia","code":"591"},"BR":{"name":"Brazil","code":"55"},"BS":{"name":"Bahamas","code":"1-242"},"BT":{"name":"Bhutan","code":"975"},"BW":{"name":"Botswana","code":"267"},"BY":{"name":"Belarus","code":"375"},"BZ":{"name":"Belize","code":"501"},"CA":{"name":"Canada","code":"1"},"CC":{"name":"Cocos (Keeling) Islands","code":"61"},"CD":{"name":"DR Congo","code":"243"},"CF":{"name":"Central Africa","code":"236"},"CG":{"name":"Congo","code":"242"},"CH":{"name":"Switzerland","code":"41"},"CI":{"name":"Ivory Coast","code":"225"},"CK":{"name":"Cook Islands","code":"682"},"CL":{"name":"Chile","code":"56"},"CM":{"name":"Cameroon","code":"237"},"CN":{"name":"China","code":"86"},"CO":{"name":"Colombia","code":"57"},"CR":{"name":"Costa Rica","code":"506"},"CU":{"name":"Cuba","code":"53"},"CV":{"name":"Cape Verde","code":"238"},"CX":{"name":"Christmas Island","code":"61"},"CY":{"name":"Cyprus","code":"357"},"CZ":{"name":"Czech Republic","code":"420"},"DE":{"name":"Germany","code":"49"},"DJ":{"name":"Djibouti","code":"253"},"DK":{"name":"Denmark","code":"45"},"DM":{"name":"Dominica","code":"1-767"},
    "DO":{"name":"Dominican Republic","code":"1-8"},
    "DR":{"name":"Algeria","code":"213"},"EC":{"name":"Ecuador","code":"593"},"EE":{"name":"Estonia","code":"372"},"EG":{"name":"Egypt","code":"20"},"EH":{"name":"Western Sahara","code":"212"},"ER":{"name":"Eritrea","code":"291"},"ES":{"name":"Spain","code":"34"},"ET":{"name":"Ethiopia","code":"251"},"FI":{"name":"Finland","code":"358"},"FJ":{"name":"Fiji","code":"679"},"FK":{"name":"Falkland Islands","code":"500"},"FM":{"name":"Micronesia","code":"691"},"FO":{"name":"Faroe Islands","code":"298"},"FR":{"name":"France","code":"33"},"GA":{"name":"Gabon","code":"241"},"GD":{"name":"Grenada","code":"1-473"},"GE":{"name":"Georgia","code":"995"},"GF":{"name":"French Guiana","code":"594"},"GG":{"name":"Guernsey","code":"44-1481"},"GH":{"name":"Ghana","code":"233"},"GI":{"name":"Gibraltar","code":"350"},"GL":{"name":"Greenland","code":"299"},"GM":{"name":"Gambia","code":"220"},"GN":{"name":"Guinea","code":"224"},"GP":{"name":"Guadeloupe","code":"590"},"GQ":{"name":"Equatorial Guinea","code":"240"},"GR":{"name":"Greece","code":"30"},"GT":{"name":"Guatemala","code":"502"},"GU":{"name":"Guam","code":"1-671"},"GW":{"name":"Guinea-Bissau","code":"245"},"GY":{"name":"Guyana","code":"592"},"HK":{"name":"Hong Kong","code":"852"},"HN":{"name":"Honduras","code":"504"},"HR":{"name":"Croatia","code":"385"},"HT":{"name":"Haiti","code":"509"},"HU":{"name":"Hungary","code":"36"},"ID":{"name":"Indonesia","code":"62"},"IE":{"name":"Ireland","code":"353"},"IL":{"name":"Israel","code":"972"},"IM":{"name":"Isle of Man","code":"44-1624"},"IN":{"name":"India","code":"91"},"IQ":{"name":"Iraq","code":"964"},"IR":{"name":"Iran","code":"98"},"IS":{"name":"Iceland","code":"354"},"IT":{"name":"Italy","code":"39"},"JE":{"name":"Jersey","code":"44-1534"},"JM":{"name":"Jamaica","code":"1-876"},"JO":{"name":"Jordan","code":"962"},"JP":{"name":"Japan","code":"81"},"KE":{"name":"Kenya","code":"254"},"KG":{"name":"Kyrgyzstan","code":"996"},"KH":{"name":"Cambodia","code":"855"},"KM":{"name":"Comoros","code":"269"},"KN":{"name":"St Kitts and Nevis","code":"1-869"},"KR":{"name":"Korea Republic of","code":"82"},"KW":{"name":"Kuwait","code":"965"},"KY":{"name":"Cayman Islands","code":"1-345"},"KZ":{"name":"Kazakhstan","code":"7"},"LA":{"name":"Laos PDR","code":"856"},"LB":{"name":"Lebanon","code":"961"},"LC":{"name":"St Lucia","code":"1-758"},"LI":{"name":"Liechtenstein","code":"423"},"LK":{"name":"Sri Lanka","code":"94"},"LR":{"name":"Liberia","code":"231"},"LS":{"name":"Lesotho","code":"266"},"LT":{"name":"Lithuania","code":"370"},"LU":{"name":"Luxembourg","code":"352"},"LV":{"name":"Latvia","code":"371"},"LY":{"name":"Libya","code":"218"},"MA":{"name":"Morocco","code":"212"},"MC":{"name":"Monaco","code":"377"},"MD":{"name":"Moldova","code":"373"},"ME":{"name":"Montenegro","code":"382"},"MG":{"name":"Madagascar","code":"261"},"MH":{"name":"Marshall Islands","code":"692"},"MK":{"name":"Macedonia","code":"389"},"ML":{"name":"Mali","code":"223"},"MM":{"name":"Myanmar","code":"95"},"MN":{"name":"Mongolia","code":"976"},"MO":{"name":"Macau","code":"853"},"MQ":{"name":"Martinique","code":"596"},"MR":{"name":"Mauritania","code":"222"},"MS":{"name":"Montserrat","code":"1-664"},"MT":{"name":"Malta","code":"356"},"MU":{"name":"Mauritius","code":"230"},"MV":{"name":"Maldives","code":"960"},"MW":{"name":"Malawi","code":"265"},"MX":{"name":"Mexico","code":"52"},"MY":{"name":"Malaysia","code":"60"},"MZ":{"name":"Mozambique","code":"258"},"NA":{"name":"Namibia","code":"264"},"NC":{"name":"New Caledonia","code":"687"},"NE":{"name":"Niger","code":"227"},"NF":{"name":"Norfolk Island","code":"672"},"NG":{"name":"Nigeria","code":"234"},"NI":{"name":"Nicaragua","code":"505"},"NL":{"name":"Netherlands","code":"31"},"NO":{"name":"Norway","code":"47"},"NP":{"name":"Nepal","code":"977"},"NU":{"name":"Niue","code":"683"},"NZ":{"name":"New Zealand","code":"64"},"OM":{"name":"Oman","code":"968"},"PA":{"name":"Panama","code":"507"},"PE":{"name":"Peru","code":"51"},"PF":{"name":"French Polynesia","code":"689"},"PG":{"name":"Papua New Guinea","code":"675"},"PH":{"name":"Philippines","code":"63"},"PK":{"name":"Pakistan","code":"92"},"PL":{"name":"Poland","code":"48"},"PM":{"name":"St Pierre and Miquelon","code":"508"},
    "PR1":{"name":"Puerto Rico","code":"1-787", "iso":"PR"},
    "PR2":{"name":"Puerto Rico","code":"1-939", "iso":"PR"},
    "PS":{"name":"Palestinian Territory","code":"970"},"PT":{"name":"Portugal","code":"351"},"PW":{"name":"Palau","code":"680"},"PY":{"name":"Paraguay","code":"595"},"QA":{"name":"Qatar","code":"974"},"RE":{"name":"Reunion\/Mayotte","code":"262"},"RO":{"name":"Romania","code":"40"},"RS":{"name":"Serbia","code":"381"},"RU":{"name":"Russia","code":"7"},"RW":{"name":"Rwanda","code":"250"},"SA":{"name":"Saudi Arabia","code":"966"},"SB":{"name":"Solomon Islands","code":"677"},"SC":{"name":"Seychelles","code":"248"},"SD":{"name":"Sudan","code":"249"},"SE":{"name":"Sweden","code":"46"},"SG":{"name":"Singapore","code":"65"},"SI":{"name":"Slovenia","code":"386"},"SJ":{"name":"Svalbard and Jan Mayen","code":"47"},"SK":{"name":"Slovakia","code":"421"},"SL":{"name":"Sierra Leone","code":"232"},"SM":{"name":"San Marino","code":"378"},"SN":{"name":"Senegal","code":"221"},"SO":{"name":"Somalia","code":"252"},"SR":{"name":"Suriname","code":"597"},"SS":{"name":"South Sudan","code":"211"},"ST":{"name":"Sao Tome and Principe","code":"239"},"SV":{"name":"El Salvador","code":"503"},"SY":{"name":"Syria","code":"963"},"SZ":{"name":"Swaziland","code":"268"},"TC":{"name":"Turks and Caicos Islands","code":"1-649"},"TD":{"name":"Chad","code":"235"},"TF":{"name":"French Southern Territories","code":"262"},"TG":{"name":"Togo","code":"228"},"TH":{"name":"Thailand","code":"66"},"TJ":{"name":"Tajikistan","code":"992"},"TL":{"name":"East Timor","code":"670"},"TM":{"name":"Turkmenistan","code":"993"},"TN":{"name":"Tunisia","code":"216"},"TO":{"name":"Tonga","code":"676"},"TR":{"name":"Turkey","code":"90"},"TT":{"name":"Trinidad and Tobago","code":"1-868"},"TV":{"name":"Tuvalu","code":"688"},"TW":{"name":"Taiwan","code":"886"},"TZ":{"name":"Tanzania","code":"255"},"UA":{"name":"Ukraine","code":"380"},"UG":{"name":"Uganda","code":"256"},"UY":{"name":"Uruguay","code":"598"},"UZ":{"name":"Uzbekistan","code":"998"},"VC":{"name":"St Vincent Grenadines","code":"1-784"},"VE":{"name":"Venezuela","code":"58"},"VG":{"name":"Virgin Islands, British","code":"1-284"},"VI":{"name":"Virgin Islands, U.S.","code":"1-340"},"VN":{"name":"Vietnam","code":"84"},"VU":{"name":"Vanuatu","code":"678"},"WS":{"name":"Samoa","code":"685"},"YE":{"name":"Yemen","code":"967"},"YT":{"name":"Mayotte","code":"262"},"ZA":{"name":"South Africa","code":"27"},"ZM":{"name":"Zambia","code":"260"},"ZW":{"name":"Zimbabwe","code":"263"}};
    var country;
    var productId;
    var responsiveWidth = 355;

    //var host = 'https://localhost:8112';
    var host = 'https://outofstock.eastsideco.io';

    var loadScript = function(url, callback){
        var script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState){
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function(){
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);

    };

    var oos = function($){

        if (window.hasOwnProperty('escOutOfStock_devTranslations')) {
            var translation = window.escOutOfStock_devTranslations;
        } else {
            var translation = JSON.parse('\x7B\x22id\x22\x3A630,\x22created_at\x22\x3A\x222017\x2D06\x2D29\x2018\x3A44\x3A35\x22,\x22updated_at\x22\x3A\x222017\x2D06\x2D29\x2018\x3A44\x3A35\x22,\x22shop_id\x22\x3A796,\x22title\x22\x3A\x22Item\x20out\x20of\x20stock\x20\x2D\x20notify\x20me\x21\x22,\x22sms_email_heading\x22\x3A\x22Enter\x20your\x20phone\x20number\x20or\x20email\x20address\x20below\x20to\x20be\x20notified\x20when\x20this\x20item\x20is\x20back\x20in\x20stock\x3A\x22,\x22email_only_heading\x22\x3A\x22Enter\x20your\x20email\x20address\x20below\x20to\x20be\x20notified\x20when\x20this\x20item\x20is\x20back\x20in\x20stock\x3A\x22,\x22country_heading\x22\x3A\x22Select\x20country\x3A\x22,\x22sms_btn\x22\x3A\x22Text\x20Me\x22,\x22sms_error\x22\x3A\x22Enter\x20valid\x20mobile\x20phone\x20number\x22,\x22sms_success\x22\x3A\x22Thank\x20you\x20\x2D\x20we\x27ll\x20send\x20you\x20an\x20SMS\x20when\x20your\x20item\x20becomes\x20available\x22,\x22email_placeholder\x22\x3A\x22you\x40example.com\x22,\x22email_btn\x22\x3A\x22Email\x20Me\x22,\x22email_error\x22\x3A\x22Enter\x20valid\x20email\x20address\x22,\x22email_already_tracked\x22\x3A\x22Whoops\x21\x20You\x27ve\x20already\x20signed\x20up\x20to\x20be\x20notified\x22,\x22sms_already_tracked\x22\x3A\x22Whoops\x21\x20You\x27ve\x20already\x20signed\x20up\x20to\x20be\x20notified\x22,\x22email_success\x22\x3A\x22Thank\x20you\x20\x2D\x20we\x27ll\x20send\x20you\x20an\x20email\x20when\x20your\x20item\x20becomes\x20available\x22,\x22email_unsubscribed\x22\x3A\x22Email\x20address\x20currently\x20unsubscribed\x22,\x22product_back_in_stock\x22\x3A\x22Product\x20now\x20back\x20in\x20stock\x21\x20Refresh\x20your\x20page\x22\x7D');
            console.log(translation);
        }

        $('head').append('<link rel="stylesheet" type="text/css" href="https://s3-eu-west-1.amazonaws.com/now-back-in-stock-tags/oos.css">');
        $('head').append('<link rel="stylesheet" href="https://s3-eu-west-1.amazonaws.com/now-back-in-stock-tags/intlTelInput.css">');


        var style = $('<style>#esc-out-of-stock-inputs .countrySelect { background-color:#'+ 'FF66CC'  +'}#esc-out-of-stock-inputs .esc-btn{background-color:#'+ 'FF66CC'  +'}</style>');
        $('head').append(style);

        var $escOosTag = $('[data-app="esc-out-of-stock"]');


        if ($escOosTag.length == 0) {
            return;
        }

        var $addToCart = $escOosTag.parent();

        var $escOosForm = $('#esc-oos-form');
        if ($escOosForm.length == 0 ) {
            $escOosForm = $('<div>').attr('id','esc-oos-form');
            $addToCart.before($escOosForm);
        }
        var $oos = $('#esc-oos-form');
        var width = $oos.width();
        if (width < responsiveWidth) {
            $oos.addClass('small');
        }

        var productVariants = $escOosTag.html();
        productVariants = JSON.parse(productVariants);

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

        function inputsChanged(){

            console.log('$allInputs2', $allInputs);
            setTimeout(function(){
                selectedVariantId = getVariantId();
                console.log('selectedVariantId', selectedVariantId);

                var variantInventoryManagement = getVariantInventoryManagement();
                var variantInventoryPolicy = getVariantInventoryPolicy();
                console.log('variantInventoryManagement', variantInventoryManagement);
                console.log('inventory policy', variantInventoryPolicy);
                console.log('invPolicyAllowOosEnabled', invPolicyAllowOosEnabled);

                if (variantInventoryManagement == 'shopify' && (variantInventoryPolicy == 'deny' || invPolicyAllowOosEnabled )) {
                    if (invPolicyAllowOosEnabled) {
                        console.log('invPolicyAllowOosEnabled', invPolicyAllowOosEnabled);
                    }
                    var quantity = variantStockCheck();
                    console.log('quantity', quantity);
                    if (Number.isInteger(quantity) && quantity <= 0) {
                        console.log('Call setupOosForm()');
                        setupOosForm();
                    } else {
                        $('#esc-oos-form').empty();
                    }
                } else {
                    console.log('NBIS not allowed');
                    $('#esc-oos-form').empty();
                    return;
                }


            }, 100);

        }


        function validateEmail(x) {
            var atpos = x.indexOf("@");
            var dotpos = x.lastIndexOf(".");
            if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
                return false;
            } else return true;

        }

        function getProductOutOfStock() {

            var outOfStock = true;
            productVariants.forEach(function(variant){
                var quantity = variant.inventory_quantity;
                console.log('variantId', variant.id);
                console.log('quantity', quantity);
                if (quantity > 0 ) {
                    return outOfStock = false;
                    ;
                }
            });

            return outOfStock;
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



        function onAlertClick() {

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
                insertOosProduct(destination, alertType, country);

            });

        }

        function setupOosForm() {

            insertAlertBtns();
            onAlertClick();

        }

        function variantStockCheck(){

            var quantity = null;
            var productVariantId = null;
            $.each(productVariants, function(key, productVariant){
                var productVariantId = productVariant.id
                if (selectedVariantId == productVariantId) {
                    quantity = productVariant.inventory_quantity;
                }
            });


            return quantity;

        }

        function getVariantInventoryManagement(){

            var variantInventoryManagement = null;
            var productVariantId = null;
            $.each(productVariants, function(key, productVariant){
                var productVariantId = productVariant.id
                if (selectedVariantId == productVariantId) {
                    console.log('selectedVariantId', selectedVariantId);
                    console.log('productVariantId', productVariantId);
                    variantInventoryManagement = productVariant.inventory_management;
                }
            });


            return variantInventoryManagement;

        }

        function getVariantInventoryPolicy(){

            var variantInventoryManagement = null;
            var productVariantId = null;
            $.each(productVariants, function(key, productVariant){
                var productVariantId = productVariant.id
                if (selectedVariantId == productVariantId) {
                    console.log('selectedVariantId', selectedVariantId);
                    console.log('productVariantId', productVariantId);
                    variantInventoryPolicy = productVariant.inventory_policy;
                }
            });


            return variantInventoryPolicy;

        }

        function getSmsContainer() {

            var sms = $('<div>',{
                class : 'esc-sms-container',
            });

            var selectCountryTitle = $('<div>',{
                html : translation.country_heading,
                class : 'esc-sms-select-country-title',
            });

            sms.append(selectCountryTitle);

            var $phone = $('<input class="esc-sms-input" id="phone">');
            sms.append($phone);
            $phone.intlTelInput({
                 utilsScript: host + "/assets/intel-tel-input/js/utils.js",
                 onlyCountries: ["AD","AE","AF","AG","AI","AL","AM","AN","AO","AR","AS","AT","AU","AW","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BM","BN","BO","BR","BS","BT","BW","BY","BZ","CA","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GT","GU","GW","GY","HK","HN","HR","HT","HU","ID","IE","IL","IN","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KM","KN","KR","KW","KY","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MG","MH","MK","ML","MM","MN","MO","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SI","SK","SL","SM","SN","SO","SR","SS","ST","SV","SY","SZ","TC","TD","TG","TH","TJ","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","US","UY","UZ","VC","VE","VG","VI","VN","VU","WS","YE","ZA","ZM","ZW"],
                 preferredCountries: ["US","GB"]
            });

            var code = topCountryCodes.GB.code;
            var smsInput = $('<input>',  {
                class : 'esc-sms-input',
                value : '+' + code
            });

            var smsBtn = $('<button>',  {
                class : 'esc-btn',
                'data-alert-type' : 'sms',
                html : translation.sms_btn
            });
            $(sms).append(smsBtn);

            var smsNotfication = $('<div>',{
                class : 'esc-notification esc-sms-notification'
            });

            $(sms).append(smsNotfication);

            return sms;

        }

        function insertAlertBtns(){

            console.log('insertAlertBtns()');

            var smsPlan = "";
            if (smsPlan == 1) {
                var oosSubTitleHtml = translation.sms_email_heading;
            } else {
                var oosSubTitleHtml = translation.email_only_heading;
            }

            var container = $('<div>').attr('id', 'esc-out-of-stock-inputs');

            var oosTitle = $('<div>', { class: 'esc-out-of-stock-title'})
                .html(translation.title);
            container.append(oosTitle);
            var oosSubTitle = $('<div>', { class: 'esc-out-of-stock-subtitle'})
                .html(oosSubTitleHtml);
            container.append(oosSubTitle);


            if (smsPlan == 1) {
                var sms = getSmsContainer();
                $(container).append(sms);
            }

            var email = $('<div>',{
                class : 'esc-email-container',
            });
            var emailInput = $('<input class="esc-email-input">').attr('placeholder', translation.email_placeholder);
            $(email).append(emailInput);
            var emailBtn = $('<button>',  {
                class : 'esc-btn',
                'data-alert-type' : 'email',
                html : translation.email_btn
            });
            $(email).append(emailBtn);

            var emailNotfication = $('<div>',{
                class : 'esc-notification esc-email-notification'
            });

            email.append(emailNotfication);

            $(container).append(email);

            $('#esc-oos-form').empty().append(container);

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

        function disableCodeEdit($input, code) {
            $input.on("keydown", function(event) {
                var enabled = disabledEdit(this, 0, event);
                if (enabled == false) return false;
                for (i = 0; i < code.length; i++){
                    if (disabledEdit(this, i+1, event) == false) return false;
                }
            });
        }


        function disabledEdit(element, index, event){
            if (
                (element.selectionStart == index &&
                    (
                        event.which < 35 ||
                        event.which > 40
                    )
                ) ||
                (element.selectionStart == index + 1 && event.which == 8)
            ) {
                return false;
            }

            if (event.ctrlKey || event.shiftKey || event.altKey) {
                return false;
            }

            if (event.which < 58
                || (event.which > 95 && event.which < 106)
                || (event.which > 95 && event.which < 106)){
                return true;
            }

            return false;

        };

        function insertOosProduct(destination, alertType, country) {

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


        $(window).resize(function() {
            $oos = $('#esc-oos-form');
            var width = $oos.width();
            if (width < responsiveWidth) {
                $oos.addClass('small');
            }  else {
                $oos.removeClass('small');
            }
        });

        window.esc_now_back_in_stock = window.esc_now_back_in_stock || {};
        window.esc_now_back_in_stock.triggerRefresh = inputsChanged;

    }

    if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 1.7)) {
        //console.log('jq is less than 1.7', parseFloat(jQuery.fn.jquery));
        loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function(){
            //loadScript('//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/9.2.4/js/intlTelInput.js', function(){
            loadScript('https://s3-eu-west-1.amazonaws.com/now-back-in-stock-tags/intlTelInput.js', function(){
                jQuery191 = jQuery.noConflict(true);
                jQuery191(function(){
                    oos(jQuery191);
                });
            });

        });
    } else {
            loadScript('https://s3-eu-west-1.amazonaws.com/now-back-in-stock-tags/intlTelInput.js', function(){
            jQuery(function(){
                oos(jQuery);
            });
        });
    }




})();










(function() {
    var preinstallOutOfStock = function() {
        var preinstallContainers = document.getElementsByClassName('esc-out-of-stock-preinstall');

        // Empty all containers
        for (var i = 0; i < preinstallContainers.length; i++) {
            preinstallContainers[i].innerHTML = '';
        }

        var container = location.search.split('esc-out-of-stock-preinstall-container=')[1];

        if (container) {
            var activeContainer = document.getElementById('preinstall-' + container);
            var node = activeContainer.parentNode;

            node.outerHTML = '<div style="width: 100%;">' +
                '<img src="https://outofstock.eastsideco.io/assets/img/out-of-stock-placeholder.png" style="width: 100%;">' +
                '</div>' +
                node.outerHTML;
        }
    };

    preinstallOutOfStock();
})();
