typeof Countries == "object" && (Countries.updateProvinceLabel = function(e, t) {
    if (typeof e == "string" && Countries[e] && Countries[e].provinces) {
        if (typeof t != "object" && (t = document.getElementById("address_province_label"), t === null)) return;
        t.innerHTML = Countries[e].label;
        var n = jQuery(t).parent();
        n.find("select"), n.find(".custom-style-select-box-inner").html(Countries[e].provinces[0])
    }
}), typeof Shopify.Cart == "undefined" && (Shopify.Cart = {}), Shopify.Cart.ShippingCalculator = function() {
    var _config = {
            submitButton: "Calculate shipping",
            submitButtonDisabled: "Calculating...",
            templateId: "shipping-calculator-response-template",
            wrapperId: "wrapper-response",
            customerIsLoggedIn: !1,
            moneyFormat: "${{amount}}"
        },
        _render = function(e) {
            var t = jQuery("#" + _config.templateId),
                n = jQuery("#" + _config.wrapperId);
            if (t.length && n.length) {
                var r = {
                        evaluate: /<%([\s\S]+?)%>/g,
                        interpolate: /<%=([\s\S]+?)%>/g,
                        escape: /<%-([\s\S]+?)%>/g
                    },
                    i = Handlebars.compile(jQuery.trim(t.text())),
                    s = i(e);
                if (jQuery(s).appendTo(n), typeof Currency != "undefined" && typeof Currency.convertAll == "function") {
                    var a = "";
                    jQuery("[name=currencies]").size() ? a = jQuery("[name=currencies]").val() : jQuery("#currencies span.selected").size() && (a = jQuery("#currencies span.selected").attr("data-currency")), a !== "" && Currency.convertAll(shopCurrency, a, "#wrapper-response span.money, #estimated-shipping span.money")
                }
            }
        },
        _enableButtons = function() {
            jQuery(".get-rates").removeAttr("disabled").removeClass("disabled").val(_config.submitButton)
        },
        _disableButtons = function() {
            jQuery(".get-rates").val(_config.submitButtonDisabled).attr("disabled", "disabled").addClass("disabled")
        },
        _getCartShippingRatesForDestination = function(e) {
            var t = {
                type: "POST",
                url: "/cart/prepare_shipping_rates",
                data: jQuery.param({
                    shipping_address: e
                }),
                success: _pollForCartShippingRatesForDestination(e),
                error: _onError
            };
            jQuery.ajax(t)
        },
        _pollForCartShippingRatesForDestination = function(e) {
            var t = function() {
                jQuery.ajax("/cart/async_shipping_rates", {
                    dataType: "json",
                    success: function(n, r, i) {
                        i.status === 200 ? _onCartShippingRatesUpdate(n.shipping_rates, e) : setTimeout(t, 500)
                    },
                    error: _onError
                })
            };
            return t
        },
        _fullMessagesFromErrors = function(e) {
            var t = [];
            return jQuery.each(e, function(n, r) {
                jQuery.each(r, function(i, s) {
                    t.push(n + " " + s)
                })
            }), t
        },
        _onError = function(XMLHttpRequest, textStatus) {
            jQuery("#estimated-shipping").hide(), jQuery("#estimated-shipping em").empty(), _enableButtons();
            var feedback = "",
                data = eval("(" + XMLHttpRequest.responseText + ")");
            feedback = data.message ? data.message + "(" + data.status + "): " + data.description : "Error : " + _fullMessagesFromErrors(data).join("; ") + ".", feedback === "Error : country is not supported." && (feedback = "We do not ship to this destination."), _render({
                rates: [],
                errorFeedback: feedback,
                success: !1
            }), jQuery("#" + _config.wrapperId).show()
        },
        _onCartShippingRatesUpdate = function(e, t) {
            _enableButtons();
            var n = "";
            if (t.zip && (n += t.zip + ", "), t.province && (n += t.province + ", "), n += t.country, e.length) {
                e[0].price == "0.00" ? jQuery("#estimated-shipping em").html("FREE") : jQuery("#estimated-shipping em").html(_formatRate(e[0].price));
                for (var r = 0; r < e.length; r++) e[r].price = _formatRate(e[r].price)
            }
            _render({
                rates: e,
                address: n,
                success: !0
            }), jQuery("#" + _config.wrapperId + ", #estimated-shipping").fadeIn()
        },
        _formatRate = function(e) {
            function t(a, o) {
                return typeof a == "undefined" ? o : a
            }

            function n(a, o, u, p) {
                if (o = t(o, 2), u = t(u, ","), p = t(p, "."), isNaN(a) || a == null) return 0;
                a = (a / 100).toFixed(o);
                var c = a.split("."),
                    d = c[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + u),
                    l = c[1] ? p + c[1] : "";
                return d + l
            }
            if (typeof Shopify.formatMoney == "function") return Shopify.formatMoney(e, _config.moneyFormat);
            typeof e == "string" && (e = e.replace(".", ""));
            var r = "",
                i = /\{\{\s*(\w+)\s*\}\}/,
                s = _config.moneyFormat;
            switch (s.match(i)[1]) {
                case "amount":
                    r = n(e, 2);
                    break;
                case "amount_no_decimals":
                    r = n(e, 0);
                    break;
                case "amount_with_comma_separator":
                    r = n(e, 2, ".", ",");
                    break;
                case "amount_no_decimals_with_comma_separator":
                    r = n(e, 0, ".", ",")
            }
            return s.replace(i, r)
        };
    return _init = function() {
        new Shopify.CountryProvinceSelector("address_country", "address_province", {
            hideElement: "address_province_container"
        });
        var e = jQuery("#address_country"),
            t = jQuery("#address_province_label").get(0);
        typeof Countries != "undefined" && (Countries.updateProvinceLabel(e.val(), t), e.change(function() {
            Countries.updateProvinceLabel(e.val(), t)
        })), jQuery(".get-rates").click(function() {
            _disableButtons(), jQuery("#" + _config.wrapperId).empty().hide();
            var n = {};
            n.zip = jQuery("#address_zip").val() || "", n.country = jQuery("#address_country").val() || "", n.province = jQuery("#address_province").val() || "", _getCartShippingRatesForDestination(n)
        }), _config.customerIsLoggedIn && jQuery(".get-rates:eq(0)").trigger("click")
    }, {
        show: function(e) {
            e = e || {}, jQuery.extend(_config, e), jQuery(function() {
                _init()
            })
        },
        getConfig: function() {
            return _config
        },
        formatRate: function(e) {
            return _formatRate(e)
        }
    }
}(), Shopify.Cart.ShippingCalculator.show({
    submitButton: theme.strings.shippingCalcSubmitButton,
    submitButtonDisabled: theme.strings.shippingCalcSubmitButtonDisabled,
    customerIsLoggedIn: theme.strings.shippingCalcCustomerIsLoggedIn,
    moneyFormat: theme.strings.shippingCalcMoneyFormat
}), $(".qtyplus1").on("click", function(e) {
    e.preventDefault();
    var t = parseInt($(this).parent().find('input[name="updates[]"]').val());
    isNaN(t) ? $(this).parent().find('input[name="updates[]"]').val(1) : $(this).parent().find('input[name="updates[]"]').val(t + 1), $("input[name='update']").trigger("click")
}), $(".qtyminus1").on("click", function(e) {
    e.preventDefault();
    var t = parseInt($(this).parent().find('input[name="updates[]"]').val());
    !isNaN(t) && t > 0 ? $(this).parent().find('input[name="updates[]"]').val(t - 1) : $(this).parent().find('input[name="updates[]"]').val(1), $("input[name='update']").trigger("click")
});

function shippingCall() {
    var e = document.getElementById("shipping-calculator-block");
    e.style.display === "none" ? e.style.display = "block" : e.style.display = "none"
}
$(".cart_heading").on("click", function() {
    jQuery(this).hasClass("clicked") ? $(this).removeClass("clicked") : $(this).addClass("clicked")
});
//# sourceMappingURL=/s/files/1/0610/6287/3301/t/2/assets/dT_shipping-cart.js.map?v=86530881418980104451637322518