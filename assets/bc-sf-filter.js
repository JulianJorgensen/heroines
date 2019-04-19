// Override Settings
var bcSfFilterSettings = {
    general: {
        limit: bcSfFilterConfig.custom.products_per_page,
        /* Optional */
        loadProductFirst: false,
        activeScrollToTop: true,
        requestInstantly: true,
        showOutOfStockOption: true,
        sortingList: ['manual', 'price-ascending', 'price-descending', 'title-ascending', 'title-descending', 'created-descending', 'created-ascending', 'sale-descending']
    },
    // Optional, customize when customer need translate
    label: {
        sorting: {
            'manual' : bcSfFilterConfig.label.sorting_featured, 
            'title-ascending': bcSfFilterConfig.label.sorting_title_ascending,
            'title-descending': bcSfFilterConfig.label.sorting_title_descending,
            'price-ascending' : bcSfFilterConfig.label.sorting_price_ascending, 
            'price-descending' : bcSfFilterConfig.label.sorting_price_descending,
            'created-descending': bcSfFilterConfig.label.sorting_date_ascending, 
            'created-ascending': bcSfFilterConfig.label.sorting_date_descending,
            'sale-descending': '% Off',
        }
    },
   
};

// Declare Templates
var bcSfFilterTemplate = {
  
    // Grid Template
    'productGridItemHtml': '<div class="collection-grid-item" data-collection-grid-item>' +
                                '<article class="product-item product-item-style-' + bcSfFilterConfig.custom.product_style + ' {{itemAttrNoImage}}"  data-product-item="{{itemId}}" {{itemAttrQuickshop}}>' +
                                    
                                        '<figure class="product-item-image" data-product-item-image>' +
                                            '{{itemImages}}' +
                                            '{{itemLabels}}' +
                                        '</figure>' +
                                    
                                    '<h2 class="product-item-type">' +
                                        '<a href="{{itemUrl}}">{{itemTitle}}</a>' +
                                    '</h2>' +
                                    '<h2 class="product-item-title tk-sofia-pro"><a href="{{itemUrl}}">{{productVendor}}</a></h2>' +
                                    '<div class="product-price product-item-price">{{itemPrice}}</div>' +
								    '<script id="{{itemHandle}}" type="application/json" data-quickshop-markup></script>' + 
                                '</article>' +
                            '</div>',

  
    // Pagination Template
    'previousHtml': '<li class="pagination-prev"><a href="{{itemUrl}}">Forrige</a></li>',
    'nextHtml': '<li class="pagination-next"><a href="{{itemUrl}}">Næste</a></li>',
    'pageItemHtml': '<li><a href="{{itemUrl}}">{{itemTitle}}</a></li>',
    'pageItemSelectedHtml': '<li class="pagination-active"><a title>{{itemTitle}}</a></li>',
    'pageItemRemainHtml': '<li><span>{{itemTitle}}</span></li>',
    'paginateHtml': '<ul class="pagination-custom">{{previous}}{{pageItems}}{{next}}</ul>',
  
    // Sorting Template
    'sortingHtml': '<label>' + bcSfFilterConfig.label.sorting + '</label> <select>{{sortingItems}}</select>',
    'advHtml' : '<div class="collection-grid-item collection-grid-item-advertisement" {{blockAttributes}} style="{{background}}" data-collection-grid-item>' +
            '<p class="collection-grid-item-advertisement-text">{{advText}}</p>' +
            '<a class="collection-grid-item-advertisement-link" href="{{advLink}}">' +
              '<span class="collection-grid-item-advertisement-link-text">{{advLinkText}}</span>' +
              '<span class="collection-grid-item-advertisement-link-arrow"><img src="https://cdn.shopify.com/s/files/1/2137/0833/files/arrow-right-white.png?2176491824982670483" /></span>' +
            '</a>' +
            '</div>',
};

var counter = 1;

BCSfFilter.prototype.prepareProductData = function(data) {
    $(".bc-sf-filter-option-block-kategori, .bc-sf-filter-option-block-brand, .bc-sf-filter-option-block-strrelse, .bc-sf-filter-option-block-farve").mCustomScrollbar();
  	//jQ("html,body").stop().animate({
    //  scrollTop: 0
    //})
  	counter = 1;
    return data;
};

// Build Product Grid Item
BCSfFilter.prototype.buildProductGridItem = function(data) {
    // Prepare data
    data.price_min *= 100, data.price_max *= 100, data.compare_at_price_min *= 100, data.compare_at_price_max *= 100; // Displaying price policy of Shopify, have to multiple by 100
    var soldOut = !data.available; // Check a product is out of stock
    var productVendor = data.vendor;
    var onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
    var priceVaries = data.price_min != data.price_max; // Check a product has many prices

    // Hide all sold out products
    if (soldOut) return "";

    // Get Template
    var itemHtml = bcSfFilterTemplate.productGridItemHtml;

    // Add Images
    var images = Object.keys(data.images).map(function (key) { return data.images[key]; });
    var itemImagesHtml = '';
    if (images.length > 0) {
       
        itemImagesHtml += '<img class="hidden" alt="{{itemTitle}}" src="' + replaceImageExt(this.optimizeImage(images[0], '189x251')) + '" srcset="' + replaceImageExt(this.optimizeImage(images[0], '189x251')) + '" />'; // 512x.progressive
        itemImagesHtml += '<img class="show" src="' + this.optimizeImage(images[images.length - 1], '512x') + '" alt="{{itemTitle}}" />';
     
    } else {console.log('placeholder_svg_tag_' + counter);
        if (bcSfFilterConfig.custom.hasOwnProperty('placeholder_svg_tag_' + counter)) {
            itemImagesHtml += bcSfFilterConfig['custom']['placeholder_svg_tag_' + counter];
        }
    }
    itemHtml = itemHtml.replace(/{{itemImages}}/g, itemImagesHtml);

    // Add custom Attribute
    var itemAttrNoImage = images.length == 0 ? 'product-item-no-image' : '';
    itemHtml = itemHtml.replace(/{{itemAttrNoImage}}/g, itemAttrNoImage);
    var itemAttrQuickshop = bcSfFilterConfig.custom.use_quickshop ? 'data-use-quickshop' : '';
    itemHtml = itemHtml.replace(/{{itemAttrQuickshop}}/g, itemAttrQuickshop);
  
    
    // Add Labels
    var itemLabelsHtml = '';
    if (bcSfFilterConfig.custom.use_badges) {
        if (soldOut) {
            itemLabelsHtml += '<span class="product-item-badge">' + bcSfFilterConfig.label.out_of_stock + '</span>';
        } else if (onSale) {
            itemLabelsHtml += '<span class="product-item-badge">' + bcSfFilterConfig.label.sale + '</span>';
        }
    }
    itemHtml = itemHtml.replace(/{{itemLabels}}/g, itemLabelsHtml);

    // Add Price
  	
    var price = '<span class="money" data-variant-price>' + this.formatMoney(data.price_min, this.moneyFormat) + '</span>';
    var itemPriceHtml = '';
    if(onSale){
      itemPriceHtml += '<span class="money money-compare-at" data-variant-compare-at-price>' + this.formatMoney(data.compare_at_price_min, this.moneyFormat) + '</span>';
    }
    if (!bcSfFilterConfig.custom.use_badges) {
        if (soldOut) {
            itemPriceHtml += bcSfFilterConfig.label.out_of_stock;
        } else if (onSale && priceVaries) {
          	
            itemPriceHtml += bcSfFilterConfig.label.on_sale_range_html.replace(/{{ price }}/g, price);
        } else if (onSale) {
            itemPriceHtml += bcSfFilterConfig.label.on_sale_html.replace(/{{ price }}/g, price);
        } else if (priceVaries) {
            itemPriceHtml += bcSfFilterConfig.label.range_html.replace(/{{ price }}/g, price);
        } else {
            itemPriceHtml += price;
        }
    } else {
        if (priceVaries) {
            itemPriceHtml += bcSfFilterConfig.label.range_html.replace(/{{ price }}/g, price);
        } else {
            itemPriceHtml += price;
        }
    }
    itemHtml = itemHtml.replace(/{{itemPrice}}/g, itemPriceHtml);

    //Add Quick shop
    var quickHtml = '';
    var quickUrl = this.buildProductItemUrl(data, false) + '?view=quickview';

    jQ.ajax({url: quickUrl, success: function(result){
        jQ('#'+data.handle).text(result);       
    }});    

    // Add main attribute (Always put at the end of this function)
    itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
    itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
    itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
    itemHtml = itemHtml.replace(/{{productVendor}}/g, data.vendor);
    itemHtml = itemHtml.replace(/{{itemUrl}}/g, this.buildProductItemUrl(data, false));

    counter ++;

    return itemHtml;
};

function replaceImageExt(url) {
    return url;
}

// Build Pagination
BCSfFilter.prototype.buildPagination = function(totalProduct) {
    // Get page info
    var currentPage = parseInt(this.queryParams.page);
    var totalPage = Math.ceil(totalProduct / this.queryParams.limit);

    // If it has only one page, clear Pagination
    if (totalPage == 1) {
        jQ(this.selector.bottomPagination).html('');
        return false;
    }

    if (this.getSettingValue('general.paginationType') == 'default') {
        var paginationHtml = bcSfFilterTemplate.paginateHtml;

        // Build Previous
        var previousHtml = (currentPage > 1) ? bcSfFilterTemplate.previousHtml : '';
        previousHtml = previousHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, currentPage - 1));
        paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);

        // Build Next
        var nextHtml = (currentPage < totalPage) ? bcSfFilterTemplate.nextHtml : '';
        nextHtml = nextHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, currentPage + 1));
        paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);

        // Create page items array
        var beforeCurrentPageArr = [];
        for (var iBefore = currentPage - 1; iBefore > currentPage - 3 && iBefore > 0; iBefore--) {
            beforeCurrentPageArr.unshift(iBefore);
        }
        if (currentPage - 4 > 0) {
            beforeCurrentPageArr.unshift('...');
        }
        if (currentPage - 4 >= 0) {
            beforeCurrentPageArr.unshift(1);
        }
        beforeCurrentPageArr.push(currentPage);

        var afterCurrentPageArr = [];
        for (var iAfter = currentPage + 1; iAfter < currentPage + 3 && iAfter <= totalPage; iAfter++) {
            afterCurrentPageArr.push(iAfter);
        }
        if (currentPage + 3 < totalPage) {
            afterCurrentPageArr.push('...');
        }
        if (currentPage + 3 <= totalPage) {
            afterCurrentPageArr.push(totalPage);
        }

        // Build page items
        var pageItemsHtml = '';
        var pageArr = beforeCurrentPageArr.concat(afterCurrentPageArr);
        for (var iPage in pageArr) {
            if (pageArr[iPage] == '...') {
                pageItemsHtml += bcSfFilterTemplate.pageItemRemainHtml;
            } else {
                pageItemsHtml += (pageArr[iPage] == currentPage) ? bcSfFilterTemplate.pageItemSelectedHtml : bcSfFilterTemplate.pageItemHtml;
            }
            pageItemsHtml = pageItemsHtml.replace(/{{itemTitle}}/g, pageArr[iPage]);
            pageItemsHtml = pageItemsHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, pageArr[iPage]));
        }
        paginationHtml = paginationHtml.replace(/{{pageItems}}/g, pageItemsHtml);

        jQ(this.selector.bottomPagination).html(paginationHtml);
    }
};

BCSfFilter.prototype.catchError = function(a, b) {
    a.total_product <= 0 && ("page" == b && "default" != this.getSettingValue("general.paginationType") || (this.hasFilterOptionParam === !1 ? jQ(this.selector.filterWrapper).length > 0 && (jQ(this.selector.topNotification).length > 0 ? jQ(this.selector.topNotification).html("<p>Sorry, there are no products in this collection. Please select other collection or go back to homepage.</p>") : jQ(this.selector.filterWrapper).before('<div id="' + this.selector.topNotification + '"><p>Sorry, there are no products in this collection. Please select other collection or go back to homepage.</p></div>'), jQ(this.selector.filterWrapper).hide(), jQ(this.selector.filterTree).html(""), jQ(this.selector.filterTreeHorizontal).html(""), jQ(this.selector.filterTreeMobileButton).html(""), jQ(this.getSelector("products")).html("")) : jQ(this.getSelector("products")).html("<p>Sorry, no products matched your selection.</p>"), jQ(this.selector.bottomPagination).html(""), jQ(this.selector.topShowLimit).html(""), jQ(this.selector.topSorting).html("")))
    if(a.total_product <= 0 && $('.collection-menu-button.show-search-button.clicked').length > 0){
    	$('.collection-menu-button.show-search-button').click();
    }
}

// Build Sorting
BCSfFilter.prototype.buildFilterSorting = function() {
    if (bcSfFilterTemplate.hasOwnProperty('sortingHtml')) {
        jQ(this.selector.topSorting).html('');

        var sortingArr = this.getSortingList();
        if (sortingArr) {
            // Build content 
            var sortingItemsHtml = '';
            for (var k in sortingArr) {
                sortingItemsHtml += '<option value="' + k +'">' + sortingArr[k] + '</option>';
            }
            var html = bcSfFilterTemplate.sortingHtml.replace(/{{sortingItems}}/g, sortingItemsHtml);
            jQ(this.selector.topSorting).html(html);

            // Set current value
            jQ(this.selector.topSorting + ' select').val(this.queryParams.sort);
        }
      
    } 
};

BCSfFilter.prototype.buildSortingEvent = function() {
  
    var _this = this;
//     jQ(this.selector.topSorting + ' select').change(function(e) {
//         onInteractWithToolbar(e, 'sort', _this.queryParams.sort, jQ(this).val());
//     })
  	$('#bc-sf-filter-top-sorting select').chosen({disable_search_threshold: 10}).change(function(e) {
        var attr = $(this).val()
        onInteractWithToolbar(e, 'sort', _this.queryParams.sort, attr);
    });
  	
   
};

// Build additional attributes of product items
BCSfFilter.prototype.buildExtrasProductList = function(data) {
  
  setTimeout(function(){ 
    sections.register('static-collection', function (section) {
      return new StaticSection(section);
    });
  }, 1000);
  wrapGridImage();
  //menuSticky();
  
};

// Build additional elements
BCSfFilter.prototype.buildAdditionalElements = function(data) {
  
    // Load Masonry
//     var el = jQ('div#shopify-section-static-collection.shopify-section.section-collection');
//     StaticSectionHandler.imagesLoaded = new imagesloadedHandler(el[0], null);
//     StaticSectionHandler.imagesLoaded.on('progress', function () {
//       var $collectionGrid = jQ('[data-collection-grid]', el);
//       $collectionGrid.removeClass('collection-grid-uninit');
//       StaticSectionHandler._positionItems();
//     });
};
/*
BCSfFilter.prototype.getFilterData = function (eventType) {
    var _this = this;
    this.showLoading();
    // Prepare request params
    this.prepareRequestParams(eventType);
    this.queryParams['callback'] = 'BCSfFilterCallback';
    this.queryParams['event_type'] = eventType;
    var script = document.createElement("script");
    script.type = 'text/javascript';
    var timestamp = new Date().getTime();

  	jQ(".bc-sf-filter-block-content input.selected").each(function (e) {
        var paramType = decodeURIComponent(jQ(this).attr('data-id'));
        var paramValue = decodeURIComponent(jQ(this).attr('data-value'));
        
        if (_this.queryParams.hasOwnProperty(paramType)) {
            _this.queryParams[paramType].push(paramValue);
        } else {
            _this.queryParams[paramType] = _this.imutableFilterTree.indexOf(paramType) > -1 ? paramValue : [paramValue];
        }
    });
    script.src = bcSfFilterConfig.shop.apiUrl + '?t=' + timestamp + '&' + jQ.param(_this.queryParams);
    script.async = true;
    script.addEventListener('error', function (e) {
        this.remove();
        // Error handling here 
        _this.showError('Oops, we cannot fetch products at this moment. Please try again later.');
    });
    // Append the script element to the HEAD section.
    document.getElementsByTagName('head')[0].appendChild(script);
    script.onload = function () {
        this.remove();
    };
};*/

function menuSticky() {
  var wMain = $('.site-main').width();
  
  
  $('.bc-sf-filter-wrapper-main').removeClass('bc-sf-sticky');
  $('.bc-sf-filter-wrapper-main').css('width','100%');
  $('.bc-sf-filter-wrapper-main').css('top', '');
  
  if(wMain > 768) {
  	$('.bc-sf-filter-wrapper-main').removeClass('bc-sf-sticky');
    $('.bc-sf-filter-wrapper-main').css('width','100%');
    if(wMain <= 900) {
      $('.bc-sf-filter-wrapper-main').css('margin-top', '-129px');
    }
    else{
       $('.bc-sf-filter-wrapper-main').css('margin-top', '-91px');

    }
  }
  else {
  	$('.bc-sf-filter-wrapper-main').width('auto');
    $('.bc-sf-filter-wrapper-main').css('margin-top', 'auto');
    $('#shopify-section-static-collection').css('padding-top', 'inherit');
  }
  
}
// Bind to the resize event of the window object
$(window).on("resize", function () {
	menuSticky();
}).resize();


BCSfFilter.prototype.buildProductListData = function(data, eventType) {
  	
    if (this.getSettingValue('general.paginationType') == 'default' || (this.getSettingValue('general.paginationType') != 'default' && eventType != 'page')) {
      jQ(this.getSelector('products')).html('');
      jQ(window).unbind('scroll');
    }

    var itemsHtml = '';
    var totalProduct = data.length;
    for (var i = 0; i < totalProduct; i++) {
      var k = i+1;
      switch(this.queryParams.display) {
        case 'list': var itemHtml = this.buildProductListItem(data[i], i + 1, totalProduct); break;
        case 'collage': var itemHtml = this.buildProductCollageItem(data[i], i + 1, totalProduct); break;
        default: var itemHtml = this.buildProductGridItem(data[i], i + 1, totalProduct); break;
      }

      itemsHtml += this.buildProductItemAdvanced(data[i], itemHtml);
      if(bcSfFilterConfig.general.adv_size>=1){
        if(k == bcSfFilterConfig.general.adv_1.adv_index){
          var adv = bcSfFilterConfig.general.adv_1;
          if(k==adv.adv_index){
            var advHtml = bcSfFilterTemplate.advHtml;
            advHtml = advHtml.replace(/{{blockAttributes}}/g, adv.adv_attributes);
            advHtml = advHtml.replace(/{{advText}}/g, adv.adv_text);
            advHtml = advHtml.replace(/{{advLink}}/g, adv.adv_link);
            advHtml = advHtml.replace(/{{advLinkText}}/g, adv.adv_link_text);

            var background = '';
            if(adv.adv_image !== 'undefined'){
              background = 'background-image: url(' + adv.adv_image + ')';
            }            
            if(adv.adv_color!== 'undefined'){
              background = 'background-color: ' + adv.adv_color;                
            }
            advHtml = advHtml.replace(/{{background}}/g, background);
            itemsHtml+= advHtml;
          }
        }else{

          if(k == bcSfFilterConfig.general.adv_2.adv_index){
            var adv = bcSfFilterConfig.general.adv_2;
            if(k==adv.adv_index){
              var advHtml = bcSfFilterTemplate.advHtml;
              advHtml = advHtml.replace(/{{blockAttributes}}/g, adv.adv_attributes);
              advHtml = advHtml.replace(/{{advText}}/g, adv.adv_text);
              advHtml = advHtml.replace(/{{advLink}}/g, adv.adv_link);
              advHtml = advHtml.replace(/{{advLinkText}}/g, adv.adv_link_text);

              var background = '';
              if(adv.adv_image != ''){
                background = 'background-image: url(' + adv.adv_image + ')';
              }            
              if(adv.adv_color != ''){
                background = 'background-color: ' + adv.adv_color;              
              }
              advHtml = advHtml.replace(/{{background}}/g, background);
              itemsHtml+= advHtml;
            }
          }
        } 
      }

    }
    jQ(this.getSelector('products')).append(itemsHtml);
};

/*
BCSfFilter.prototype.getPriceLabel = function(a) {
    if (0 == a.indexOf(":")) return "Under " + this.formatMoney(100 * parseFloat(a.substr(1)), this.moneyFormat);
    if (a.indexOf(":") == a.length - 1) return "Over " + this.formatMoney(100 * parseFloat(a.slice(0, -1)), this.moneyFormat);
    if (2 == a.split(":").length) {
        var b = a.split(":");
        return this.formatMoney(100 * parseFloat(b[0]), this.moneyFormat) + " - " + this.formatMoney(100 * parseFloat(b[1]), this.moneyFormat)
    }
}

BCSfFilter.prototype.getPercentSaleLabel = function(a) {
    return 0 == a.indexOf(":") ? "Under " + a.substr(1) + "%" : a.indexOf(":") == a.length - 1 ? "Over " + a.slice(0, -1) + "%" : 2 == a.split(":").length ? a.replace(":", "% - %") : void 0
}*/

BCSfFilter.prototype.buildFilterOptionMultipleListData = function(a, b, c, d, e, f, g, h) {
    if (null !== f && f.hasOwnProperty("key") && (f.hasOwnProperty("doc_count") && f.doc_count > 0 || this.getSettingValue("general.showOutOfStockOption"))) {
        var i = f.key,
            j = f.key;
        "price" == a || "percent_sale" == a ? (j = j.replace(/\*/g, "").replace(/\-/g, ":"), !f.hasOwnProperty("from") && f.hasOwnProperty("to") ? i = "Under " + ("price" == a ? this.formatMoney(100 * f.to, this.moneyFormat) : f.to + "%") : f.hasOwnProperty("from") && !f.hasOwnProperty("to") ? i = "Over " + ("price" == a ? this.formatMoney(100 * f.from, this.moneyFormat) : f.from + "%") : f.hasOwnProperty("from") && f.hasOwnProperty("to") && (i = ("price" == a ? this.formatMoney(100 * f.from, this.moneyFormat) : f.from + "%") + " - " + ("price" == a ? this.formatMoney(100 * f.to, this.moneyFormat) : f.to + "%"))) : "stock" == a && (i = f.label, j = "in-stock" == f.key), i = this.buildFilterOptionLabel(i, f.doc_count, g);
        var k = this.getTemplate("filterOptionMultipleListItem").replace(/{{itemLabel}}/g, i).replace(/{{itemParentId}}/g, b).replace(/{{itemValue}}/g, encodeURIParamValue(j)).replace(/{{itemParentLabel}}/g, c);
        return k = this.getSettingValue("general.requestInstantly") ? k.replace(/{{itemFunc}}/g, "onInteractWithFilterOptionValue(event, this, '" + a + "', '" + d + "', '" + e + "')") : "vertical" == h ? k.replace(/{{itemFunc}}/g, "onInteractWithFilterOptionValue(event, this, '" + a + "', '" + d + "', '" + e + "')") : k.replace(/{{itemFunc}}/g, "onSelectFilterOptionItem(event, this)"), k = this.checkFilterOptionSelected(b, j, a) ? k.replace(/{{itemSelected}}/g, "selected") : k.replace(/{{itemSelected}}/g, "")
    }
    return ""
}