$(function () {

    var filters = {},
        products = [],
        checkboxes = $('.all-products input[type=checkbox]');


    $.getJSON("product.json", function (data) {
        products = data;
        init();
        generateAllProductHTML(data);
        // Manually trigger hashchange to start the app for now
        $(window).trigger('hashchange');
    });

    $(window).on('hashchange', function () {
        render(window.location.hash);
    });

    function init () {
        checkboxes.click(function () {

            var that = $(this),
                specName = that.attr('name');

            // When a checkbox is checked we need to write that in the filters object;
            if (that.is(":checked")) {
                // If the filter for this specification isn't created yet - do it.
                if (!(filters[specName] && filters[specName].length)) {
                    filters[specName] = [];
                }
                //  Push values into the chosen filter array
                filters[specName].push(that.val());
                // Change the url hash;
                createQueryHash(filters);
            }

            // When a checkbox is unchecked we need to remove its value from the filters object.
            if (!that.is(":checked")) {
                if (filters[specName] && filters[specName].length && (filters[specName].indexOf(that.val()) != -1)) {
                    // Find the checkbox value in the corresponding array inside the filters object.
                    var index = filters[specName].indexOf(that.val());
                    // Remove it.
                    filters[specName].splice(index, 1);
                    // If it was the last remaining value for this specification,
                    // delete the whole array.
                    if (!filters[specName].length) {
                        delete filters[specName];
                    }
                }
                // Change the url hash;
                createQueryHash(filters);
            }
        });

        // When the "Clear all filters" button is pressed change the hash to '#' (go to the home page)
        $('.filters button').click(function (e) {
            e.preventDefault();
            window.location.hash = '#';
        });
    };

    // RENDER PAGE BY SECTION DEFINED IN URL
    function render (url) {
        $('.main-content .page').removeClass('visible');
        var section = url.split('/')[0],
            mapping = {
                '': function () {
                    filters = {};
                    checkboxes.prop('checked',false);
                    renderProductsPage(products);
                },
                '#product': function () {
                    var index = url.split('#product/')[1].trim();

                    renderSingleProductPage(index, products);
                },
                '#filters': function () {
                    try {
                        filters = JSON.parse(url.split('#filters/')[1]);
                    }
                    catch (err) {
                        window.location.hash = "#";
                        return;
                    }
                    renderFilterResults(filters, products);
                }
            };
        if (mapping[section]) {
            mapping[section]();
        } else {
            renderError();
        }
    };

    // RENDER SINGLE PRODUCT PAGE
    function renderSingleProductPage (index, data) {
        var page = $('.single-product'),
            c = $('.single-product .preview-large');

        data.forEach(function (item) {
            if (parseInt(index, 10) === parseInt(item.id, 10)) {
                c.find('h3').text(item.title);
                c.find('img').attr('src', 'http://farm7.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_z.jpg');
            }
        });
        page.addClass('visible');
    };

    // RENDER ALL PRODUCTS
    function renderProductsPage (data) {
        var page = $('.all-products'),
            allProducts = $('.all-products .products-list > li');

        allProducts.addClass('hidden');
        allProducts.each(function () {
            var t = $(this);

            data.forEach(function (item) {
                if (item.id == t.data('index')) {
                    t.removeClass('hidden');
                }
            });
        });
        page.addClass('visible');
    };

    // RENDER FILTERED RESULTS
        function renderFilterResults (filters, products) {
        var results = [];

        // Uncheck all the checkboxes.
        // We will be checking them again one by one.
        checkboxes.prop('checked', false);
        $.each(filters, function(key, filter) {
            products.forEach(function (product) {
                if (product[key] && filter.indexOf(product[key]) !== -1) {
                    $('input[name=' + key + '][value=' + product[key] + ']').prop('checked', true);
                    results.push(product);
                }
            });
        });
        renderProductsPage(results);
    };

    // RENDER ERROR PAGE
    function renderError () {
        var page = $('.error');

        page.addClass('visible');
    };

    // CONSTRUCT ALL PRODUCT HTML
    // USED ONLY FIRST TIME
    function generateAllProductHTML (data) {
        var list = $('.all-products .products-list'),
            template = Handlebars.compile($('#products-template').html());

        list.append(template(data));

        list.delegate("li", "click", function (e) {
            e.preventDefault();

            var index = $(this).data('index');
            window.location.hash = "product/" + index;
        });

        $('body').delegate(".close", "click", function (e) {
            e.preventDefault();

            createQueryHash(filters);
        });
    };

    // CREATE QUERY HASH
    function createQueryHash (filters) {
        if (!$.isEmptyObject(filters)) {
            window.location.hash = "#filters/" + JSON.stringify(filters);
        } else {
            window.location.hash = "#";
        }
    }

});