function floatToString(t, e) {
    var o = t.toFixed(e).toString();
    return o.match(/^\.\d+/) ? "0" + o : o
}
"undefined" == typeof window.Shopify && (window.Shopify = {}), Shopify.money_format = "${{amount}}", Shopify.onError = function(t) {
    t.message ? console && console.log(t.message + "(" + t.status + "): " + t.description) : console && console.log("Error: " + Shopify.fullMessagesFromErrors(t).join("; ") + ".")
}, Shopify.fullMessagesFromErrors = function(t) {
    var o = [];
    return console && console.log(t), $H(t).each(function(e) {
        e[1].each(function(t) {
            o.push(e[0] + " " + t)
        })
    }), o
}, Shopify.onCartUpdate = function(t) {
    console && console.log("There are now " + t.item_count + " items in the cart.")
}, Shopify.onCartShippingRatesUpdate = function(t, e) {
    var o = "";
    e.zip && (o += e.zip + ", "), e.province && (o += e.province + ", "), o += e.country, console && console.log("There are " + t.length + " shipping rates available for " + o + ", starting at " + Shopify.formatMoney(t[0].price) + ".")
}, Shopify.onItemAdded = function(t) {
    console && console.log(t.title + " Was added to your shopping cart")
}, Shopify.onProduct = function(t) {
    console && console.log("Received everything we ever wanted to know about " + t.title)
}, Shopify.formatMoney = function(t, e) {
    function i(t, e) {
        return void 0 === t ? e : t
    }

    function o(t, e, o, a) {
        if (e = i(e, 2), o = i(o, ","), a = i(a, "."), isNaN(t) || null == t) return 0;
        var n = (t = (t / 100).toFixed(e)).split(".");
        return n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + o) + (n[1] ? a + n[1] : "")
    }
    "string" == typeof t && (t = t.replace(".", ""));
    var a = "",
        n = /\{\{\s*(\w+)\s*\}\}/,
        r = e || this.money_format;
    switch (r.match(n)[1]) {
        case "amount":
            a = o(t, 2);
            break;
        case "amount_no_decimals":
            a = o(t, 0);
            break;
        case "amount_with_comma_separator":
            a = o(t, 2, ".", ",");
            break;
        case "amount_with_space_separator":
            a = o(t, 2, " ", ",");
            break;
        case "amount_with_period_and_space_separator":
            a = o(t, 2, " ", ".");
            break;
        case "amount_no_decimals_with_comma_separator":
            a = o(t, 0, ".", ",");
            break;
        case "amount_no_decimals_with_space_separator":
            a = o(t, 0, ".", "");
            break;
        case "amount_with_space_separator":
            a = o(t, 2, ",", "");
            break;
        case "amount_with_apostrophe_separator":
            a = o(t, 2, "'", ".")
    }
    return r.replace(n, a)
}, Shopify.resizeImage = function(t, e) {
    try {
        if ("original" == e) return t;
        var o = t.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);
        return o[1] + "_" + e + "." + o[2]
    } catch (a) {
        return t
    }
}, Shopify.addItem = function(t, e, o) {
    e = e || 1;
    new Ajax.Request("/cart/add.js", this.params("post", "quantity=" + e + "&id=" + t, o || this.onItemAdded.bind(this)))
}, Shopify.addItemFromForm = function(t, e) {
    new Ajax.Request("/cart/add.js", this.params("post", Form.serialize(t), e || this.onItemAdded.bind(this)))
}, Shopify.getCart = function(t) {
    new Ajax.Request("/cart.js", this.params("get", null, t || this.onCartUpdate.bind(this)))
}, Shopify.pollForCartShippingRatesForDestination = function(o, a, e) {
    var n = function() {
        var t = Shopify.params("get", {}, null);
        t.onSuccess = function(t) {
            if (200 === t.status) {
                var e = $(eval("(" + t.responseText + ")"));
                a(e.shipping_rates, o)
            } else setTimeout(n, 500)
        }, t.onFailure = e || t.onFailure, new Ajax.Request("/cart/async_shipping_rates.json", t)
    };
    return n
}, Shopify.getCartShippingRatesForDestination = function(t, e, o) {
    e = "function" == typeof e ? e : Shopify.onCartShippingRatesUpdate;
    var a = {};
    $H(t).each(function(t) {
        a["shipping_address[" + t[0] + "]"] = t[1]
    });
    var n = Shopify.params("post", a, e);
    n.onSuccess = Shopify.pollForCartShippingRatesForDestination(t, e, o), n.onFailure = o || n.onFailure, new Ajax.Request("/cart/prepare_shipping_rates.json", n)
}, Shopify.getProduct = function(t, e) {
    new Ajax.Request("/products/" + t + ".js", this.params("get", null, e || this.onProduct.bind(this)))
}, Shopify.changeItem = function(t, e) {
    new Ajax.Request("/cart/change.js", this.params("post", "quantity=" + e + "&id=" + t, this.onCartUpdate.bind(this)))
}, Shopify.removeItem = function(t) {
    new Ajax.Request("/cart/change.js", this.params("post", "quantity=0&id=" + t, this.onCartUpdate.bind(this)))
}, Shopify.clear = function() {
    new Ajax.Request("/cart/clear.js", this.params("post", "", this.onCartUpdate.bind(this)))
}, Shopify.updateCart = function(t, e) {
    var o = "";
    if (t.type == Array) $A(array).flatten().each(function(t) {
        o += "updates[]=" + t.toString() + "&"
    });
    else {
        if (t.type != Object) throw "updates parameter must be array of quantities or a hash of {item_ids: quantities}";
        $H(array).flatten().each(function(t, e) {
            o += "updates[" + t.toString() + "]=" + e.toString() + "&"
        })
    }
    new Ajax.Request("/cart/update.js", this.params("post", o, e || this.onCartUpdate.bind(this)))
}, Shopify.updateCartFromForm = function(t, e) {
    new Ajax.Request("/cart/update.js", this.params("post", Form.serialize(t), e || this.onCartUpdate.bind(this)))
}, Shopify.params = function(t, e, o) {
    var a = {
        method: t || "post",
        parameters: e || "",
        evalScripts: !1,
        asynchronous: !0,
        requestHeaders: {
            "If-Modified-Since": "Sat, 1 Jan 2000 00:00:00 GMT"
        }
    };
    return a.onSuccess = function(t) {
        try {
            o($(eval("(" + t.responseText + ")")))
        } catch (e) {
            console && console.log("API Error: " + e + "\n\n" + t.responseText)
        }
    }.bind(this), a.onFailure = function(t) {
        try {
            this.onError($(eval("(" + t.responseText + ")")))
        } catch (e) {
            console && console.log("API Error: " + e + "\n\n" + t.responseText)
        }
    }.bind(this), a
};