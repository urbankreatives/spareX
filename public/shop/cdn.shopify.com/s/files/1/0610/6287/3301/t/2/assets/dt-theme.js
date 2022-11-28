(function(e) {
    e.fn.hoverIntent = function(i, f, t) {
        function r(y) {
            u = y.pageX, s = y.pageY
        }
        var u, s, l, d, a = {
                interval: 100,
                sensitivity: 6,
                timeout: 50
            },
            a = typeof i == "object" ? e.extend(a, i) : e.isFunction(f) ? e.extend(a, {
                over: i,
                out: f,
                selector: t
            }) : e.extend(a, {
                over: i,
                out: i,
                selector: f
            }),
            h = function(y, w) {
                if (w.hoverIntent_t = clearTimeout(w.hoverIntent_t), Math.sqrt((l - u) * (l - u) + (d - s) * (d - s)) < a.sensitivity) return e(w).off("mousemove.hoverIntent", r), w.hoverIntent_s = !0, a.over.apply(w, [y]);
                l = u, d = s, w.hoverIntent_t = setTimeout(function() {
                    h(y, w)
                }, a.interval)
            },
            f = function(y) {
                var w = e.extend({}, y),
                    b = this;
                b.hoverIntent_t && (b.hoverIntent_t = clearTimeout(b.hoverIntent_t)), y.type === "mouseenter" ? (l = w.pageX, d = w.pageY, e(b).on("mousemove.hoverIntent", r), b.hoverIntent_s || (b.hoverIntent_t = setTimeout(function() {
                    h(w, b)
                }, a.interval))) : (e(b).off("mousemove.hoverIntent", r), b.hoverIntent_s && (b.hoverIntent_t = setTimeout(function() {
                    var T, k;
                    T = w, (k = b).hoverIntent_t = clearTimeout(k.hoverIntent_t), k.hoverIntent_s = !1, a.out.apply(k, [T])
                }, a.timeout)))
            };
        return this.on({
            "mouseenter.hoverIntent": f,
            "mouseleave.hoverIntent": f
        }, a.selector)
    }
})(jQuery), Shopify.Image = {
        preload: function(e, i) {
            for (var o = 0; o < e.length; o++) {
                var t = e[o];
                this.loadImage(this.getSizedImageUrl(t, i))
            }
        },
        loadImage: function(e) {
            new Image().src = e
        },
        switchImage: function(e, i, o) {
            var t;
            e && i && (t = this.imageSize(i.src), t = this.getSizedImageUrl(e.src, t), o ? o(t, e, i) : i.src = t)
        },
        imageSize: function(e) {
            return e = e.match(/_(1024x1024|2048x2048|pico|icon|thumb|small|compact|medium|large|grande)\./), e != null ? e[1] : null
        },
        getSizedImageUrl: function(e, i) {
            if (i == null) return e;
            if (i == "master") return this.removeProtocol(e);
            var o = e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
            return o == null ? null : (e = e.split(o[0]), o = o[0], this.removeProtocol(e[0] + "_" + i + o))
        },
        removeProtocol: function(e) {
            return e.replace(/http(s)?:/, "")
        }
    },
    function(e, i) {
        typeof exports == "object" && typeof module != "undefined" ? module.exports = i() : typeof define == "function" && define.amd ? define(i) : ((e = e || self).Vimeo = e.Vimeo || {}, e.Vimeo.Player = i())
    }(this, function() {
        "use strict";

        function e(n, c) {
            for (var p = 0; p < c.length; p++) {
                var m = c[p];
                m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(n, m.key, m)
            }
        }
        var i = typeof global != "undefined" && {}.toString.call(global) === "[object global]";

        function o(n, c) {
            return n.indexOf(c.toLowerCase()) === 0 ? n : "".concat(c.toLowerCase()).concat(n.substr(0, 1).toUpperCase()).concat(n.substr(1))
        }

        function t(n) {
            return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(n)
        }

        function r(p) {
            var m = 0 < arguments.length && p !== void 0 ? p : {},
                c = m.id,
                p = m.url,
                m = c || p;
            if (!m) throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");
            if (p = m, !isNaN(parseFloat(p)) && isFinite(p) && Math.floor(p) == p) return "https://vimeo.com/".concat(m);
            if (t(m)) return m.replace("http:", "https:");
            throw c ? new TypeError("\u201C".concat(c, "\u201D is not a valid video id.")) : new TypeError("\u201C".concat(m, "\u201D is not a vimeo.com url."))
        }
        var u = Array.prototype.indexOf !== void 0,
            s = typeof window != "undefined" && window.postMessage !== void 0;
        if (!(i || u && s)) throw new Error("Sorry, the Vimeo Player API is not available in this browser.");
        var l, d, a = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};

        function h() {
            if (this === void 0) throw new TypeError("Constructor WeakMap requires 'new'");
            if (d(this, "_id", "_WeakMap_" + y() + "." + y()), 0 < arguments.length) throw new TypeError("WeakMap iterable is not supported")
        }

        function f(n, c) {
            if (!w(n) || !l.call(n, "_id")) throw new TypeError(c + " method called on incompatible receiver " + typeof n)
        }

        function y() {
            return Math.random().toString().substring(2)
        }

        function w(n) {
            return Object(n) === n
        }(b = typeof self != "undefined" ? self : typeof window != "undefined" ? window : a).WeakMap || (l = Object.prototype.hasOwnProperty, d = function(n, c, p) {
            Object.defineProperty ? Object.defineProperty(n, c, {
                configurable: !0,
                writable: !0,
                value: p
            }) : n[c] = p
        }, b.WeakMap = (d(h.prototype, "delete", function(n) {
            if (f(this, "delete"), !w(n)) return !1;
            var c = n[this._id];
            return !(!c || c[0] !== n || (delete n[this._id], 0))
        }), d(h.prototype, "get", function(n) {
            if (f(this, "get"), w(n)) {
                var c = n[this._id];
                return c && c[0] === n ? c[1] : void 0
            }
        }), d(h.prototype, "has", function(n) {
            if (f(this, "has"), !w(n)) return !1;
            var c = n[this._id];
            return !(!c || c[0] !== n)
        }), d(h.prototype, "set", function(n, c) {
            if (f(this, "set"), !w(n)) throw new TypeError("Invalid value used as weak map key");
            var p = n[this._id];
            return p && p[0] === n ? p[1] = c : d(n, this._id, [n, c]), this
        }), d(h, "_polyfill", !0), h));
        var b, T = (u = ie = {
                exports: {}
            }, s = function() {
                var n, c, p, m, C, Y, H = Object.prototype.toString,
                    Q = typeof setImmediate != "undefined" ? function(v) {
                        return setImmediate(v)
                    } : setTimeout;
                try {
                    Object.defineProperty({}, "x", {}), n = function(v, g, P, O) {
                        return Object.defineProperty(v, g, {
                            value: P,
                            writable: !0,
                            configurable: O !== !1
                        })
                    }
                } catch (v) {
                    n = function(g, P, O) {
                        return g[P] = O, g
                    }
                }

                function N(v, g) {
                    p.add(v, g), c = c || Q(p.drain)
                }

                function j(v) {
                    var g, P = typeof v;
                    return v == null || P != "object" && P != "function" || (g = v.then), typeof g == "function" && g
                }

                function x() {
                    for (var v = 0; v < this.chain.length; v++)(function(g, P, O) {
                        var V, L;
                        try {
                            P === !1 ? O.reject(g.msg) : (V = P === !0 ? g.msg : P.call(void 0, g.msg)) === O.promise ? O.reject(TypeError("Promise-chain cycle")) : (L = j(V)) ? L.call(V, O.resolve, O.reject) : O.resolve(V)
                        } catch (z) {
                            O.reject(z)
                        }
                    })(this, this.state === 1 ? this.chain[v].success : this.chain[v].failure, this.chain[v]);
                    this.chain.length = 0
                }

                function M(v) {
                    var g = this;
                    g.triggered || (g.triggered = !0, g.def && (g = g.def), g.msg = v, g.state = 2, 0 < g.chain.length && N(x, g))
                }

                function F(v, g, P, O) {
                    for (var V = 0; V < g.length; V++)(function(L) {
                        v.resolve(g[L]).then(function(z) {
                            P(L, z)
                        }, O)
                    })(V)
                }

                function R(v) {
                    this.def = v, this.triggered = !1
                }

                function K(v) {
                    this.promise = v, this.state = 0, this.triggered = !1, this.chain = [], this.msg = void 0
                }

                function q(v) {
                    if (typeof v != "function") throw TypeError("Not a function");
                    if (this.__NPO__ !== 0) throw TypeError("Not a promise");
                    this.__NPO__ = 1;
                    var g = new K(this);
                    this.then = function(P, O) {
                        var V = {
                            success: typeof P != "function" || P,
                            failure: typeof O == "function" && O
                        };
                        return V.promise = new this.constructor(function(L, z) {
                            if (typeof L != "function" || typeof z != "function") throw TypeError("Not a function");
                            V.resolve = L, V.reject = z
                        }), g.chain.push(V), g.state !== 0 && N(x, g), V.promise
                    }, this.catch = function(P) {
                        return this.then(void 0, P)
                    };
                    try {
                        v.call(void 0, function(P) {
                            (function O(V) {
                                var L, z = this;
                                if (!z.triggered) {
                                    z.triggered = !0, z.def && (z = z.def);
                                    try {
                                        (L = j(V)) ? N(function() {
                                            var Z = new R(z);
                                            try {
                                                L.call(V, function() {
                                                    O.apply(Z, arguments)
                                                }, function() {
                                                    M.apply(Z, arguments)
                                                })
                                            } catch (oe) {
                                                M.call(Z, oe)
                                            }
                                        }): (z.msg = V, z.state = 1, 0 < z.chain.length && N(x, z))
                                    } catch (Z) {
                                        M.call(new R(z), Z)
                                    }
                                }
                            }).call(g, P)
                        }, function(P) {
                            M.call(g, P)
                        })
                    } catch (P) {
                        M.call(g, P)
                    }
                }

                function G(v, g) {
                    this.fn = v, this.self = g, this.next = void 0
                }
                var X = n({}, "constructor", q, !(p = {
                    add: function(v, g) {
                        Y = new G(v, g), C ? C.next = Y : m = Y, C = Y, Y = void 0
                    },
                    drain: function() {
                        var v = m;
                        for (m = C = c = void 0; v;) v.fn.call(v.self), v = v.next
                    }
                }));
                return n(q.prototype = X, "__NPO__", 0, !1), n(q, "resolve", function(v) {
                    return v && typeof v == "object" && v.__NPO__ === 1 ? v : new this(function(g, P) {
                        if (typeof g != "function" || typeof P != "function") throw TypeError("Not a function");
                        g(v)
                    })
                }), n(q, "reject", function(v) {
                    return new this(function(g, P) {
                        if (typeof g != "function" || typeof P != "function") throw TypeError("Not a function");
                        P(v)
                    })
                }), n(q, "all", function(v) {
                    var g = this;
                    return H.call(v) != "[object Array]" ? g.reject(TypeError("Not an array")) : v.length === 0 ? g.resolve([]) : new g(function(P, O) {
                        if (typeof P != "function" || typeof O != "function") throw TypeError("Not a function");
                        var V = v.length,
                            L = Array(V),
                            z = 0;
                        F(g, v, function(Z, oe) {
                            L[Z] = oe, ++z === V && P(L)
                        }, O)
                    })
                }), n(q, "race", function(v) {
                    var g = this;
                    return H.call(v) != "[object Array]" ? g.reject(TypeError("Not an array")) : new g(function(P, O) {
                        if (typeof P != "function" || typeof O != "function") throw TypeError("Not a function");
                        F(g, v, function(V, L) {
                            P(L)
                        }, O)
                    })
                }), q
            }, (b = a)[a = "Promise"] = b[a] || s(), u.exports && (u.exports = b[a]), ie.exports),
            k = new WeakMap;

        function S(n, c, p) {
            var m = k.get(n.element) || {};
            c in m || (m[c] = []), m[c].push(p), k.set(n.element, m)
        }

        function D(n, c) {
            return (k.get(n.element) || {})[c] || []
        }

        function I(n, c, p) {
            var m = k.get(n.element) || {};
            return m[c] ? p ? (p = m[c].indexOf(p), p !== -1 && m[c].splice(p, 1), k.set(n.element, m), m[c] && m[c].length === 0) : (m[c] = [], k.set(n.element, m), 1) : 1
        }
        var E = ["autopause", "autoplay", "background", "byline", "color", "height", "id", "loop", "maxheight", "maxwidth", "muted", "playsinline", "portrait", "responsive", "speed", "title", "transparent", "url", "width"];

        function U(n, c) {
            return c = 1 < arguments.length && c !== void 0 ? c : {}, E.reduce(function(p, m) {
                var C = n.getAttribute("data-vimeo-".concat(m));
                return !C && C !== "" || (p[m] = C === "" ? 1 : C), p
            }, c)
        }

        function B(n, c) {
            var p = n.html;
            if (!c) throw new TypeError("An element must be provided");
            return c.getAttribute("data-vimeo-initialized") !== null ? c.querySelector("iframe") : (n = document.createElement("div"), n.innerHTML = p, c.appendChild(n.firstChild), c.setAttribute("data-vimeo-initialized", "true"), c.querySelector("iframe"))
        }

        function te(n, c, p) {
            var m = 1 < arguments.length && c !== void 0 ? c : {},
                C = 2 < arguments.length ? p : void 0;
            return new Promise(function(Y, H) {
                if (!t(n)) throw new TypeError("\u201C".concat(n, "\u201D is not a vimeo.com url."));
                var Q, N = "https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(n), "&domain=").concat(window.location.hostname);
                for (Q in m) m.hasOwnProperty(Q) && (N += "&".concat(Q, "=").concat(encodeURIComponent(m[Q])));
                var j = new("XDomainRequest" in window ? XDomainRequest : XMLHttpRequest);
                j.open("GET", N, !0), j.onload = function() {
                    if (j.status !== 404)
                        if (j.status !== 403) try {
                            var x = JSON.parse(j.responseText);
                            if (x.domain_status_code === 403) return B(x, C), void H(new Error("\u201C".concat(n, "\u201D is not embeddable.")));
                            Y(x)
                        } catch (M) {
                            H(M)
                        } else H(new Error("\u201C".concat(n, "\u201D is not embeddable.")));
                        else H(new Error("\u201C".concat(n, "\u201D was not found.")))
                }, j.onerror = function() {
                    var x = j.status ? " (".concat(j.status, ")") : "";
                    H(new Error("There was an error fetching the embed code from Vimeo".concat(x, ".")))
                }, j.send()
            })
        }

        function ee(n) {
            if (typeof n == "string") try {
                n = JSON.parse(n)
            } catch (c) {
                return console.warn(c), {}
            }
            return n
        }

        function W(n, c, p) {
            n.element.contentWindow && n.element.contentWindow.postMessage && (c = {
                method: c
            }, p !== void 0 && (c.value = p), 8 <= (p = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"))) && p < 10 && (c = JSON.stringify(c)), n.element.contentWindow.postMessage(c, n.origin))
        }
        var J = new WeakMap,
            A = new WeakMap,
            ie = (e(ne.prototype, [{
                key: "callMethod",
                value: function(n) {
                    var c = this,
                        p = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {};
                    return new T(function(m, C) {
                        return c.ready().then(function() {
                            S(c, n, {
                                resolve: m,
                                reject: C
                            }), W(c, n, p)
                        }).catch(C)
                    })
                }
            }, {
                key: "get",
                value: function(n) {
                    var c = this;
                    return new T(function(p, m) {
                        return n = o(n, "get"), c.ready().then(function() {
                            S(c, n, {
                                resolve: p,
                                reject: m
                            }), W(c, n)
                        }).catch(m)
                    })
                }
            }, {
                key: "set",
                value: function(n, c) {
                    var p = this;
                    return new T(function(m, C) {
                        if (n = o(n, "set"), c == null) throw new TypeError("There must be a value to set.");
                        return p.ready().then(function() {
                            S(p, n, {
                                resolve: m,
                                reject: C
                            }), W(p, n, c)
                        }).catch(C)
                    })
                }
            }, {
                key: "on",
                value: function(n, c) {
                    if (!n) throw new TypeError("You must pass an event name.");
                    if (!c) throw new TypeError("You must pass a callback function.");
                    if (typeof c != "function") throw new TypeError("The callback must be a function.");
                    D(this, "event:".concat(n)).length === 0 && this.callMethod("addEventListener", n).catch(function() {}), S(this, "event:".concat(n), c)
                }
            }, {
                key: "off",
                value: function(n, c) {
                    if (!n) throw new TypeError("You must pass an event name.");
                    if (c && typeof c != "function") throw new TypeError("The callback must be a function.");
                    I(this, "event:".concat(n), c) && this.callMethod("removeEventListener", n).catch(function(p) {})
                }
            }, {
                key: "loadVideo",
                value: function(n) {
                    return this.callMethod("loadVideo", n)
                }
            }, {
                key: "ready",
                value: function() {
                    var n = A.get(this) || new T(function(c, p) {
                        p(new Error("Unknown player. Probably unloaded."))
                    });
                    return T.resolve(n)
                }
            }, {
                key: "addCuePoint",
                value: function(n) {
                    var c = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {};
                    return this.callMethod("addCuePoint", {
                        time: n,
                        data: c
                    })
                }
            }, {
                key: "removeCuePoint",
                value: function(n) {
                    return this.callMethod("removeCuePoint", n)
                }
            }, {
                key: "enableTextTrack",
                value: function(n, c) {
                    if (!n) throw new TypeError("You must pass a language.");
                    return this.callMethod("enableTextTrack", {
                        language: n,
                        kind: c
                    })
                }
            }, {
                key: "disableTextTrack",
                value: function() {
                    return this.callMethod("disableTextTrack")
                }
            }, {
                key: "pause",
                value: function() {
                    return this.callMethod("pause")
                }
            }, {
                key: "play",
                value: function() {
                    return this.callMethod("play")
                }
            }, {
                key: "unload",
                value: function() {
                    return this.callMethod("unload")
                }
            }, {
                key: "destroy",
                value: function() {
                    var n = this;
                    return new T(function(c) {
                        A.delete(n), J.delete(n.element), n._originalElement && (J.delete(n._originalElement), n._originalElement.removeAttribute("data-vimeo-initialized")), n.element && n.element.nodeName === "IFRAME" && n.element.parentNode && n.element.parentNode.removeChild(n.element), c()
                    })
                }
            }, {
                key: "getAutopause",
                value: function() {
                    return this.get("autopause")
                }
            }, {
                key: "setAutopause",
                value: function(n) {
                    return this.set("autopause", n)
                }
            }, {
                key: "getBuffered",
                value: function() {
                    return this.get("buffered")
                }
            }, {
                key: "getColor",
                value: function() {
                    return this.get("color")
                }
            }, {
                key: "setColor",
                value: function(n) {
                    return this.set("color", n)
                }
            }, {
                key: "getCuePoints",
                value: function() {
                    return this.get("cuePoints")
                }
            }, {
                key: "getCurrentTime",
                value: function() {
                    return this.get("currentTime")
                }
            }, {
                key: "setCurrentTime",
                value: function(n) {
                    return this.set("currentTime", n)
                }
            }, {
                key: "getDuration",
                value: function() {
                    return this.get("duration")
                }
            }, {
                key: "getEnded",
                value: function() {
                    return this.get("ended")
                }
            }, {
                key: "getLoop",
                value: function() {
                    return this.get("loop")
                }
            }, {
                key: "setLoop",
                value: function(n) {
                    return this.set("loop", n)
                }
            }, {
                key: "getPaused",
                value: function() {
                    return this.get("paused")
                }
            }, {
                key: "getPlaybackRate",
                value: function() {
                    return this.get("playbackRate")
                }
            }, {
                key: "setPlaybackRate",
                value: function(n) {
                    return this.set("playbackRate", n)
                }
            }, {
                key: "getPlayed",
                value: function() {
                    return this.get("played")
                }
            }, {
                key: "getSeekable",
                value: function() {
                    return this.get("seekable")
                }
            }, {
                key: "getSeeking",
                value: function() {
                    return this.get("seeking")
                }
            }, {
                key: "getTextTracks",
                value: function() {
                    return this.get("textTracks")
                }
            }, {
                key: "getVideoEmbedCode",
                value: function() {
                    return this.get("videoEmbedCode")
                }
            }, {
                key: "getVideoId",
                value: function() {
                    return this.get("videoId")
                }
            }, {
                key: "getVideoTitle",
                value: function() {
                    return this.get("videoTitle")
                }
            }, {
                key: "getVideoWidth",
                value: function() {
                    return this.get("videoWidth")
                }
            }, {
                key: "getVideoHeight",
                value: function() {
                    return this.get("videoHeight")
                }
            }, {
                key: "getVideoUrl",
                value: function() {
                    return this.get("videoUrl")
                }
            }, {
                key: "getVolume",
                value: function() {
                    return this.get("volume")
                }
            }, {
                key: "setVolume",
                value: function(n) {
                    return this.set("volume", n)
                }
            }]), ne);

        function ne(n) {
            var c, p = this,
                m = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {};
            if (function(H) {
                    if (!(H instanceof ne)) throw new TypeError("Cannot call a class as a function")
                }(this), window.jQuery && n instanceof jQuery && (1 < n.length && window.console && console.warn && console.warn("A jQuery object with multiple elements was passed, using the first element."), n = n[0]), typeof document != "undefined" && typeof n == "string" && (n = document.getElementById(n)), c = n, !Boolean(c && c.nodeType === 1 && "nodeName" in c && c.ownerDocument && c.ownerDocument.defaultView)) throw new TypeError("You must pass either a valid element or a valid id.");
            var C = n.ownerDocument.defaultView;
            if (n.nodeName === "IFRAME" || (Y = n.querySelector("iframe")) && (n = Y), n.nodeName === "IFRAME" && !t(n.getAttribute("src") || "")) throw new Error("The player element passed isn\u2019t a Vimeo embed.");
            if (J.has(n)) return J.get(n);
            this.element = n, this.origin = "*";
            var Y = new T(function(H, Q) {
                var N = function(j) {
                    if (t(j.origin) && p.element.contentWindow === j.source) {
                        p.origin === "*" && (p.origin = j.origin);
                        var x = ee(j.data);
                        if (x && x.event === "error" && x.data && x.data.method === "ready") {
                            var M = new Error(x.data.message);
                            return M.name = x.data.name, void Q(M)
                        }
                        if (j = x && x.event === "ready", M = x && x.method === "ping", j || M) return p.element.setAttribute("data-ready", "true"), void H();
                        F = p, M = [], (R = ee(R = x)).event ? (R.event === "error" && D(F, R.data.method).forEach(function(q) {
                            var G = new Error(R.data.message);
                            G.name = R.data.name, q.reject(G), I(F, R.data.method, q)
                        }), M = D(F, "event:".concat(R.event)), K = R.data) : !R.method || (x = function(q, G) {
                            var X = D(q, G);
                            return X.length < 1 ? !1 : (X = X.shift(), I(q, G, X), X)
                        }(F, R.method)) && (M.push(x), K = R.value), M.forEach(function(q) {
                            try {
                                if (typeof q == "function") return void q.call(F, K);
                                q.resolve(K)
                            } catch (G) {}
                        })
                    }
                    var F, R, K
                };
                C.addEventListener ? C.addEventListener("message", N, !1) : C.attachEvent && C.attachEvent("onmessage", N), p.element.nodeName !== "IFRAME" && te(r(N = U(n, m)), N, n).then(function(j) {
                    var x, M, F = B(j, n);
                    return p.element = F, x = p._originalElement = n, M = F, F = k.get(x), k.set(M, F), k.delete(x), J.set(p.element, p), j
                }).catch(Q)
            });
            return A.set(this, Y), J.set(this.element, this), this.element.nodeName === "IFRAME" && W(this, "ping"), this
        }
        return i || (function(n) {
            function c(p) {
                "console" in window && console.error && console.error("There was an error creating an embed: ".concat(p))
            }
            n = 0 < arguments.length && n !== void 0 ? n : document, n = [].slice.call(n.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")), n.forEach(function(p) {
                try {
                    if (p.getAttribute("data-vimeo-defer") !== null) return;
                    var m = U(p);
                    te(r(m), m, p).then(function(C) {
                        return B(C, p)
                    }).catch(c)
                } catch (C) {
                    c(C)
                }
            })
        }(), function(n) {
            var c = 0 < arguments.length && n !== void 0 ? n : document;
            window.VimeoPlayerResizeEmbeds_ || (window.VimeoPlayerResizeEmbeds_ = !0, n = function(p) {
                if (t(p.origin) && p.data && p.data.event === "spacechange") {
                    for (var m = c.querySelectorAll("iframe"), C = 0; C < m.length; C++)
                        if (m[C].contentWindow === p.source) {
                            m[C].parentElement.style.paddingBottom = "".concat(p.data.data[0].bottom, "px");
                            break
                        }
                }
            }, window.addEventListener ? window.addEventListener("message", n, !1) : window.attachEvent && window.attachEvent("onmessage", n))
        }()), ie
    }), jQuery.cookie = function(e, i, h) {
        if (i === void 0) {
            var t = null;
            if (document.cookie && document.cookie != "")
                for (var r = document.cookie.split(";"), u = 0; u < r.length; u++) {
                    var s = jQuery.trim(r[u]);
                    if (s.substring(0, e.length + 1) == e + "=") {
                        t = decodeURIComponent(s.substring(e.length + 1));
                        break
                    }
                }
            return t
        }
        h = h || {}, i === null && (i = "", h.expires = -1);
        var l = "";
        h.expires && (typeof h.expires == "number" || h.expires.toUTCString) && (typeof h.expires == "number" ? (a = new Date).setTime(a.getTime() + 24 * h.expires * 60 * 60 * 1e3) : a = h.expires, l = "; expires=" + a.toUTCString());
        var d = h.path ? "; path=" + h.path : "",
            a = h.domain ? "; domain=" + h.domain : "",
            h = h.secure ? "; secure" : "";
        document.cookie = [e, "=", encodeURIComponent(i), l, d, a, h].join("")
    },
    function(e) {
        "use strict";
        typeof define == "function" && define.amd ? define(["jquery"], e) : typeof module != "undefined" && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function(e) {
        function i(d) {
            return parseFloat(d) || 0
        }

        function o(a) {
            var a = e(a),
                h = null,
                f = [];
            return a.each(function() {
                var y = e(this),
                    w = y.offset().top - i(y.css("margin-top")),
                    b = 0 < f.length ? f[f.length - 1] : null;
                b !== null && Math.floor(Math.abs(h - w)) <= 1 ? f[f.length - 1] = b.add(y) : f.push(y), h = w
            }), f
        }

        function t(d) {
            var a = {
                byRow: !0,
                property: "height",
                target: null,
                remove: !1
            };
            return typeof d == "object" ? e.extend(a, d) : (typeof d == "boolean" ? a.byRow = d : d === "remove" && (a.remove = !0), a)
        }
        var r = -1,
            u = -1,
            s = e.fn.matchHeight = function(d) {
                if (d = t(d), d.remove) {
                    var a = this;
                    return this.css(d.property, ""), e.each(s._groups, function(h, f) {
                        f.elements = f.elements.not(a)
                    }), this
                }
                return this.length <= 1 && !d.target || (s._groups.push({
                    elements: this,
                    options: d
                }), s._apply(this, d)), this
            };
        s.version = "master", s._groups = [], s._throttle = 80, s._maintainScroll = !0, s._beforeUpdate = null, s._afterUpdate = null, s._rows = o, s._parse = i, s._parseOptions = t, s._apply = function(T, b) {
            var h = t(b),
                f = e(T),
                y = [f],
                w = e(window).scrollTop(),
                b = e("html").outerHeight(!0),
                T = f.parents().filter(":hidden");
            return T.each(function() {
                var k = e(this);
                k.data("style-cache", k.attr("style"))
            }), T.css("display", "block"), h.byRow && !h.target && (f.each(function() {
                var k = e(this),
                    S = k.css("display");
                S !== "inline-block" && S !== "flex" && S !== "inline-flex" && (S = "block"), k.data("style-cache", k.attr("style")), k.css({
                    display: S,
                    "padding-top": "0",
                    "padding-bottom": "0",
                    "margin-top": "0",
                    "margin-bottom": "0",
                    "border-top-width": "0",
                    "border-bottom-width": "0",
                    height: "100px",
                    overflow: "hidden"
                })
            }), y = o(f), f.each(function() {
                var k = e(this);
                k.attr("style", k.data("style-cache") || "")
            })), e.each(y, function(k, D) {
                var D = e(D),
                    I = 0;
                if (h.target) I = h.target.outerHeight(!1);
                else {
                    if (h.byRow && D.length <= 1) return void D.css(h.property, "");
                    D.each(function() {
                        var E = e(this),
                            U = E.attr("style"),
                            B = E.css("display");
                        B !== "inline-block" && B !== "flex" && B !== "inline-flex" && (B = "block"), B = {
                            display: B
                        }, B[h.property] = "", E.css(B), E.outerHeight(!1) > I && (I = E.outerHeight(!1)), U ? E.attr("style", U) : E.css("display", "")
                    })
                }
                D.each(function() {
                    var E = e(this),
                        U = 0;
                    h.target && E.is(h.target) || (E.css("box-sizing") !== "border-box" && (U += i(E.css("border-top-width")) + i(E.css("border-bottom-width")), U += i(E.css("padding-top")) + i(E.css("padding-bottom"))), E.css(h.property, I - U + "px"))
                })
            }), T.each(function() {
                var k = e(this);
                k.attr("style", k.data("style-cache") || null)
            }), s._maintainScroll && e(window).scrollTop(w / b * e("html").outerHeight(!0)), this
        }, s._applyDataApi = function() {
            var d = {};
            e("[data-match-height], [data-mh]").each(function() {
                var a = e(this),
                    h = a.attr("data-mh") || a.attr("data-match-height");
                h in d ? d[h] = d[h].add(a) : d[h] = a
            }), e.each(d, function() {
                this.matchHeight(!0)
            })
        };

        function l(d) {
            s._beforeUpdate && s._beforeUpdate(d, s._groups), e.each(s._groups, function(a) {
                var h = this;
                h.elements.length && setTimeout(function() {
                    s._apply(h.elements, h.options)
                }, 500)
            }), s._afterUpdate && s._afterUpdate(d, s._groups)
        }
        s._update = function(d, a) {
            if (a && a.type === "resize") {
                var h = e(window).width();
                if (h === r) return;
                r = h
            }
            d ? u === -1 && (u = setTimeout(function() {
                l(a), u = -1
            }, s._throttle)) : l(a)
        }, e(s._applyDataApi), e(window).bind("load", function(d) {
            s._update(!1, d)
        }), e(window).bind("resize orientationchange", function(d) {
            s._update(!0, d)
        })
    }), typeof Object.create != "function" && (Object.create = function(e) {
        function i() {}
        return i.prototype = e, new i
    }),
    function(e, i, o) {
        YTPlayer = {
            player: null,
            defaults: {
                ratio: 16 / 9,
                videoId: "LSmgKRx5pBo",
                mute: !0,
                repeat: !0,
                width: e(i).width(),
                playButtonClass: "YTPlayer-play",
                pauseButtonClass: "YTPlayer-pause",
                muteButtonClass: "YTPlayer-mute",
                volumeUpClass: "YTPlayer-volume-up",
                volumeDownClass: "YTPlayer-volume-down",
                start: 0,
                pauseOnScroll: !1,
                fitToBackground: !0,
                playerVars: {
                    iv_load_policy: 3,
                    modestbranding: 1,
                    autoplay: 1,
                    controls: 0,
                    showinfo: 0,
                    wmode: "opaque",
                    branding: 0,
                    autohide: 0
                },
                events: null
            },
            init: function(t, r) {
                var u, s, l = this;
                return l.userOptions = r, l.$body = e("body"), l.$node = e(t), l.$window = e(i), l.defaults.events = {
                    onReady: function(d) {
                        l.onPlayerReady(d), l.options.pauseOnScroll && l.pauseOnScroll(), typeof l.options.callback == "function" && l.options.callback.call(this)
                    },
                    onStateChange: function(d) {
                        d.data === 1 ? (l.$node.find("img").fadeOut(400), l.$node.addClass("loaded")) : d.data === 0 && l.options.repeat && l.player.seekTo(l.options.start)
                    }
                }, l.options = e.extend(!0, {}, l.defaults, l.userOptions), l.options.height = Math.ceil(l.options.width / l.options.ratio), l.ID = new Date().getTime(), l.holderID = "YTPlayer-ID-" + l.ID, l.options.fitToBackground ? l.createBackgroundVideo() : l.createContainerVideo(), l.$window.on("resize.YTplayer" + l.ID, function() {
                    l.resize(l)
                }), u = l.onYouTubeIframeAPIReady.bind(l), (r = o.createElement("script")).id = "youtube-sdk", t = o.getElementsByTagName("head")[0], i.location.origin == "file://" ? r.src = "http://www.youtube.com/iframe_api" : r.src = "//www.youtube.com/iframe_api", t.appendChild(r), console.log(r), r = t = null, s = u, typeof YT == "undefined" && i.loadingPlayer === void 0 ? (i.loadingPlayer = !0, i.dfd = e.Deferred(), i.onYouTubeIframeAPIReady = function() {
                    i.onYouTubeIframeAPIReady = null, i.dfd.resolve("done"), s()
                }) : typeof YT == "object" ? s() : i.dfd.done(function(d) {
                    s()
                }), l.resize(l), l
            },
            pauseOnScroll: function() {
                var t = this;
                t.$window.on("scroll.YTplayer" + t.ID, function() {
                    t.player.getPlayerState() === 1 && t.player.pauseVideo()
                }), t.$window.scrollStopped(function() {
                    t.player.getPlayerState() === 2 && t.player.playVideo()
                })
            },
            createContainerVideo: function() {
                var t = e('<div id="ytplayer-container' + this.ID + '" >                                    <div id="' + this.holderID + '" class="ytplayer-player-inline"></div>                                     </div>                                     <div id="ytplayer-shield" class="ytplayer-shield"></div>');
                this.$node.append(t), this.$YTPlayerString = t
            },
            createBackgroundVideo: function() {
                var t = e('<div id="ytplayer-container' + this.ID + '" class="ytplayer-container background">                                    <div id="' + this.holderID + '" class="ytplayer-player"></div>                                    </div>                                    <div id="ytplayer-shield" class="ytplayer-shield"></div>');
                this.$node.append(t), this.$YTPlayerString = t
            },
            resize: function(t) {
                var r = e(i);
                t.options.fitToBackground || (r = t.$node);
                var u, s = r.width(),
                    l = r.height(),
                    d = e("#" + t.holderID);
                s / t.options.ratio < l ? (u = Math.ceil(l * t.options.ratio), d.width(u).height(l).css({
                    left: (s - u) / 2,
                    top: 0
                })) : (t = Math.ceil(s / t.options.ratio), d.width(s).height(t).css({
                    left: 0,
                    top: (l - t) / 2
                })), r = d = null
            },
            onYouTubeIframeAPIReady: function() {
                theme.ProductVideo.youtubeApiLoaded = !0, theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube), this.player = new i.YT.Player(this.holderID, this.options)
            },
            onPlayerReady: function(t) {
                this.options.mute && t.target.mute()
            },
            getPlayer: function() {
                return this.player
            },
            destroy: function() {
                var t = this;
                t.$node.removeData("yt-init").removeData("ytPlayer").removeClass("loaded"), t.$YTPlayerString.remove(), e(i).off("resize.YTplayer" + t.ID), e(i).off("scroll.YTplayer" + t.ID), t.$body = null, t.$node = null, t.$YTPlayerString = null, t.player.destroy(), t.player = null
            }
        }, e.fn.scrollStopped = function(t) {
            var r = e(this),
                u = this;
            r.scroll(function() {
                r.data("scrollTimeout") && clearTimeout(r.data("scrollTimeout")), r.data("scrollTimeout", setTimeout(t, 250, u))
            })
        }, e.fn.YTPlayer = function(t) {
            return this.each(function() {
                e(this).data("yt-init", !0);
                var r = Object.create(YTPlayer);
                r.init(this, t), e.data(this, "ytPlayer", r)
            })
        }
    }(jQuery, window, document);

function dT_Swiper(e) {
    var i = e.attr("data-section-id"),
        o = +e.attr("data-item-per-view"),
        t = +e.attr("data-item-row"),
        r = +e.attr("data-item-space"),
        u = +e.attr("data-auto-height") || !1,
        s = +e.attr("data-blocks-limit"),
        l = +e.attr("data-autoplay") * 1e3,
        d = l ? {
            delay: l
        } : !1,
        a = +e.attr("data-small-screen-items") || 1;
    return new Swiper("#swiper-" + i + "-slider", {
        direction: "horizontal",
        pagination: {
            el: "#swiper-" + i + "-pagination",
            clickable: !0
        },
        navigation: {
            nextEl: "#swiper-" + i + "-next",
            prevEl: "#swiper-" + i + "-prev"
        },
        loop: !1,
        slidesPerView: o,
        slidesPerGroup: 1,
        slidesPerColumn: t,
        spaceBetween: r,
        autoHeight: u,
        slidesPerColumnFill: "row",
        simulateTouch: !0,
        autoplay: d,
        breakpoints: {
            320: {
                slidesPerView: a,
                spaceBetween: 30
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1920: {
                slidesPerView: o,
                spaceBetween: 30
            }
        }
    })
}
window.theme = window.theme || {}, theme.Sections = function() {
    this.constructors = {}, this.instances = [], $(document).on("shopify:section:load", this._onSectionLoad.bind(this)).on("shopify:section:unload", this._onSectionUnload.bind(this)).on("shopify:section:select", this._onSelect.bind(this)).on("shopify:section:deselect", this._onDeselect.bind(this)).on("shopify:section:reorder", this._onReorder.bind(this)).on("shopify:block:select", this._onBlockSelect.bind(this)).on("shopify:block:deselect", this._onBlockDeselect.bind(this))
}, theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
    _createInstance: function(i, o) {
        var t = $(i),
            r = t.attr("data-section-id"),
            u = t.attr("data-section-type");
        if (o = o || this.constructors[u], !_.isUndefined(o)) {
            var s = _.assignIn(new o(i), {
                id: r,
                type: u,
                container: i
            });
            this.instances.push(s)
        }
    },
    _onSectionLoad: function(i) {
        var o = $("[data-section-id]", i.target)[0];
        o && this._createInstance(o)
    },
    _onSectionUnload: function(i) {
        this.instances = _.filter(this.instances, function(o) {
            var t = o.id === i.originalEvent.detail.sectionId;
            return t && _.isFunction(o.onUnload) && o.onUnload(i), !t
        })
    },
    _onSelect: function(i) {
        var o = _.find(this.instances, function(t) {
            return t.id === i.originalEvent.detail.sectionId
        });
        !_.isUndefined(o) && _.isFunction(o.onSelect) && o.onSelect(i)
    },
    _onDeselect: function(i) {
        var o = _.find(this.instances, function(t) {
            return t.id === i.originalEvent.detail.sectionId
        });
        !_.isUndefined(o) && _.isFunction(o.onDeselect) && o.onDeselect(i)
    },
    _onReorder: function(i) {
        var o = _.find(this.instances, function(t) {
            return t.id === i.originalEvent.detail.sectionId
        });
        !_.isUndefined(o) && _.isFunction(o.onReorder) && o.onReorder(i)
    },
    _onBlockSelect: function(i) {
        var o = _.find(this.instances, function(t) {
            return t.id === i.originalEvent.detail.sectionId
        });
        !_.isUndefined(o) && _.isFunction(o.onBlockSelect) && o.onBlockSelect(i)
    },
    _onBlockDeselect: function(i) {
        var o = _.find(this.instances, function(t) {
            return t.id === i.originalEvent.detail.sectionId
        });
        !_.isUndefined(o) && _.isFunction(o.onBlockDeselect) && o.onBlockDeselect(i)
    },
    register: function(i, o) {
        this.constructors[i] = o, $("[data-section-type=" + i + "]").each(function(t, r) {
            this._createInstance(r, o)
        }.bind(this))
    }
}), theme.LibraryLoader = function() {
    var e = {
            link: "link",
            script: "script"
        },
        i = {
            requested: "requested",
            loaded: "loaded"
        },
        o = "https://cdn.shopify.com/shopifycloud/",
        t = {
            youtubeSdk: {
                tagId: "youtube-sdk",
                src: "https://www.youtube.com/iframe_api",
                type: e.script
            },
            plyrShopifyStyles: {
                tagId: "plyr-shopify-styles",
                src: o + "shopify-plyr/v1.0/shopify-plyr.css",
                type: e.link
            },
            modelViewerUiStyles: {
                tagId: "shopify-model-viewer-ui-styles",
                src: o + "model-viewer-ui/assets/v1.0/model-viewer-ui.css",
                type: e.link
            }
        };

    function r(l, d) {
        var a = t[l];
        if (!!a && a.status !== i.requested) {
            if (d = d || function() {}, a.status === i.loaded) {
                d();
                return
            }
            a.status = i.requested;
            var h;
            switch (a.type) {
                case e.script:
                    h = u(a, d);
                    break;
                case e.link:
                    h = s(a, d);
                    break
            }
            h.id = a.tagId, a.element = h;
            var f = document.getElementsByTagName(a.type)[0];
            f.parentNode.insertBefore(h, f)
        }
    }

    function u(l, d) {
        var a = document.createElement("script");
        return a.src = l.src, a.addEventListener("load", function() {
            l.status = i.loaded, d()
        }), a
    }

    function s(l, d) {
        var a = document.createElement("link");
        return a.href = l.src, a.rel = "stylesheet", a.type = "text/css", a.addEventListener("load", function() {
            l.status = i.loaded, d()
        }), a
    }
    return {
        load: r
    }
}(), theme.ProductStatus = function() {
    function e(i) {
        this.container = i
    }
    return e.prototype = Object.assign({}, e.prototype, {
        updateContent: function(o) {}
    }), e
}();
var textToDownCase = function(i) {
        return i.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "")
    },
    UrlTrigger = !1,
    home_featured_product_media = !1;

function setUnitPrice(e) {
    var i = "";
    return e.unit_price_measurement && (e.unit_price_measurement.reference_value !== 1 && (i += e.unit_price_measurement.reference_value), i += e.unit_price_measurement.reference_unit), Shopify.formatMoney(e.unit_price, DT_THEME.moneyFormat) + "/" + i
}
theme.numberCounter = function() {
    function e(i) {
        var o = this.$container = $(i),
            t = o.attr("data-section-id");
        $(".inview-" + t + "-initialized").bind("inview", function(r, u) {
            u && $(".dt-sc-number-counter-value").each(function() {
                var s = $(this),
                    l = s.attr("data-value");
                $({
                    counter_value: s.text()
                }).animate({
                    counter_value: l
                }, {
                    step: function() {
                        s.text(Math.floor(this.counter_value))
                    },
                    duration: 1500,
                    easing: "swing",
                    complete: function() {
                        s.text(this.counter_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                    }
                })
            })
        })
    }
    return e
}(), theme.featuredCollection = function() {
    function e(i) {
        var o = this.$container = $(i);
        dT_Swiper(o)
    }
    return e
}(), theme.indexProductCarousel = function() {
    function e(i) {
        var o = this.$container = $(i),
            t = "home-product-carousel-section";
        dT_Swiper(o), dt_initQuickShop(t), dt_activateQuickShop()
    }
    return e
}(), theme.productBlockCarousel = function() {
    function e(i) {
        var o = this.$container = $(i),
            t = "home-blockCarousel-section";
        dT_Swiper(o), dt_initQuickShop(t), dt_activateQuickShop()
    }
    return e
}(), theme.searchPage = function() {
    function e(i) {
        var o = this.$container = $(i),
            t = "search-page";
        dt_initQuickShop(t), dt_activateQuickShop()
    }
    return e
}(), theme.tabGrid = function() {
    function e(i) {
        var o = this.$container = $(i),
            t = "home-tab-grid";
        dt_initQuickShop(t), dt_activateQuickShop()
    }
    return e
}(), theme.HomeSlideshow = function() {
    function e(i) {
        var o = this.$container = $(i),
            t = this.sectionId = o.attr("data-section-id"),
            r = this.sliderActive = $("#home-slider-" + t).length,
            u = o.attr("data-animation-speed"),
            s = o.attr("data-autoPlay");
        if (s == "true") var l = u > 0 ? {
            delay: +u
        } : !1;
        else l = "false";
        var d = $("#home-slider-" + t + " .swiper-slide").length;
        if (d > 1) var a = !0,
            h = !0;
        else var a = !1,
            h = !1;
        var f = this.dtSwiper = new Swiper("#home-slider-" + t, {
            navigation: {
                nextEl: "#swiper-button-next-" + t,
                prevEl: "#swiper-button-prev-" + t
            },
            direction: "horizontal",
            loop: a,
            simulateTouch: h,
            pagination: {
                el: "#swiper-pagination-" + t,
                clickable: !0
            },
            autoplay: l,
            autoHeight: !0
        })
    }
    return e
}(), theme.HomeSlideshow.prototype = _.assignIn({}, theme.HomeSlideshow.prototype, {
    onBlockSelect: function(i) {
        var o = this.sectionId,
            t = $(i.target).data("index"),
            r = this.dtSwiper,
            u = this.dtSwiperMobile;
        r.slideTo(t, 1500, !1), r.autoplay.stop()
    },
    onBlockDeselect: function() {
        var i = this.sectionId,
            o = this.dtSwiper,
            t = this.dtSwiperMobile;
        o.autoplay.start()
    }
}), theme.ProductPage = function() {
    var e = {
        sliderActive: !1,
        zoomEnabled: !1,
        imageSize: null,
        imageZoomSize: null,
        selectors: {
            addToCart: ".dT_AddToCart",
            addToCartText: ".dT_AddToCartText",
            optionSelector: "ProductSelect"
        }
    };

    function i(o) {
        var t = this.$container = $(o),
            r = t.attr("data-section-id");
        this.settings = $.extend({}, e, {
            sectionId: r,
            swiperObjects: {},
            selectors: {
                unitPrice: ".unitPrice-" + r,
                originalSelectorId: "ProductSelect-" + r,
                addToCart: ".dT_AddToCart",
                productPrice: "#ProductPrice-" + r + " span",
                comparePrice: "#ComparePrice-" + r + " span",
                addToCartText: ".dT_AddToCartText-" + r,
                notifyForm: "#notify-block-" + r,
                zoomEnabled: ".zoom-activate",
                variantSkuData: ".sku-table-" + r,
                variantSku: ".variant-sku-" + r,
                InventoryProduct: ".inventory-product-" + r,
                variantInventory: ".variant-inventory-" + r,
                inventoryAvailability: "[data-inventory-availability]"
            }
        }), dt_initQuickShop(r), dt_activateQuickShop();
        var u = t.find(".product-single__description.rte iframe").length || !1;
        u && t.find(".product-single__description.rte iframe").wrap("<div class='dT-video-wrapper'></div>"), dt_Quantity(r), $("#ProductJson-" + r).html() && (this.productSingleObject = JSON.parse(document.getElementById("ProductJson-" + r).innerHTML), this.init(), $.fn.matchHeight._update(), this.inventoryAvailability = o.querySelector(this.settings.selectors.inventoryAvailability), this.inventoryAvailability && this._initProductStatus())
    }
    return i.prototype = _.assignIn({}, i.prototype, {
        isProductStatus: function() {},
        _initProductStatus: function() {
            this.ProductStatus = new theme.ProductStatus(this.inventoryAvailability), this.ProductStatus && this.initProductVariant()
        },
        onSelect: function() {
            theme.ProductVideo.youtubeApiLoaded == !0 && theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube)
        },
        onUnload: function(t) {
            theme.ProductVideo.removeSectionVideos(this.settings.sectionId)
        },
        init: function() {
            this.dT_init_Swiper(), this.dT_Overrides(), this.dT_Zoom(), this.dT_Swatches()
        },
        dT_Overrides: function() {
            DT_THEME.productStrings = DT_THEME.productStrings || {}, $.extend(DT_THEME.strings, DT_THEME.productStrings)
        },
        dT_Zoom: function() {
            if (typeof $.zoom == "function" && this.settings.selectors.zoomEnabled.length) {
                if ($(window).width() > 767) {
                    var t = $("#slider");
                    if (t.length) {
                        var r = t.find(".zoom-img-wrap");
                        r.length && r.each(function() {
                            var u = $(this),
                                s = u.find("img.zoom-img").data("srczoom");
                            u.find(".zoom-img-container").zoom({
                                url: s,
                                touch: !1
                            })
                        })
                    }
                }
                $(window).resize(function() {
                    if ($(window).width() > 767) {
                        var u = $("#slider");
                        if (u.length) {
                            var s = u.find(".zoom-img-wrap");
                            s.length && s.each(function() {
                                var l = $(this),
                                    d = l.find("img.zoom-img").data("srczoom");
                                l.find(".zoom-img-container").zoom({
                                    url: d,
                                    touch: !1
                                })
                            })
                        }
                    } else {
                        var u = $("#slider");
                        if (u.length) {
                            var s = u.find(".zoom-img-wrap");
                            s.length && s.each(function() {
                                var a = $(this);
                                a.find(".zoom-img-container").trigger("zoom.destroy")
                            })
                        }
                    }
                })
            } else return !1
        },
        dT_Swatches: function() {
            this.$container.find(".swatch :radio").change(function() {
                var h = jQuery(this).closest(".swatch").attr("data-option-index"),
                    f = jQuery(this).val().replace(/\s{2,}/g, " ");
                jQuery(this).closest("form").find(".single-option-selector").eq(h).val(f).trigger("change")
            });
            for (var t = this.productSingleObject, r = 0, u = t.variants.length; r < u; r++) {
                var s = t.variants[r];
                if (s.available)
                    for (var l = 0, d = s.options.length; l < d; l++) {
                        var a = s.options[l];
                        a = textToDownCase(a), this.$container.find('.swatch[data-option-index="' + l + '"] .' + a).removeClass("soldout").addClass("available").find(":radio").removeAttr("disabled")
                    }
            }
        },
        dT_init_Swiper: function() {
            var t = function() {
                    $(window).trigger("resize")
                },
                r = this.$container,
                u = this.settings.sectionId;
            if (r.find("[data-product-media-type-video]").each(function() {
                    var a = $(this);
                    theme.ProductVideo.init(a, u)
                }), $(".swiper-main-" + this.settings.sectionId + " .swiper-wrapper .swiper-slide").length > 1) var s = !0;
            else var s = !1;
            this.settings.swiperObjects.mySwiper = new Swiper(".swiper-main-" + this.settings.sectionId, {
                direction: "horizontal",
                pagination: {
                    el: ".swiper-pagination-" + this.settings.sectionId,
                    clickable: !0
                },
                updateOnImagesReady: !0,
                spaceBetween: 0,
                slidesPerView: 1,
                roundLengths: !0,
                simulateTouch: !1,
                onImagesReady: t
            });
            var l = this.settings.swiperObjects.gallerySwiperThumbsVert = new Swiper("#swiper-gallery-thumbs-vert-" + this.settings.sectionId, {
                direction: "vertical",
                initialSlide: 2,
                spaceBetween: 10,
                slidesPerView: 5,
                loop: !1,
                loopedSlides: 5,
                freeMode: !0,
                centeredSlides: !0,
                slideToClickedSlide: !0,
                updateOnImagesReady: !1,
                onImagesReady: t,
                disableAutoResize: !0,
                resizeEvent: "auto"
            });
            this.settings.swiperObjects.gallerySwiperVert = new Swiper("#swiper-gallery-vert-" + this.settings.sectionId, {
                initialSlide: 2,
                spaceBetween: 10,
                slidesPerView: 1,
                loop: !1,
                roundLengths: !0,
                simulateTouch: !1
            }), typeof this.settings.swiperObjects.gallerySwiperVert.controller != "undefined" && (this.settings.swiperObjects.gallerySwiperVert.controller.control = this.settings.swiperObjects.gallerySwiperThumbsVert, this.settings.swiperObjects.gallerySwiperThumbsVert.controller.control = this.settings.swiperObjects.gallerySwiperVert);
            var d = this.settings.swiperObjects.gallerySwiperThumbs = new Swiper("#swiper-gallery-thumbs-" + this.settings.sectionId, {
                loop: !1,
                spaceBetween: 10,
                slidesPerView: 4,
                freeMode: !0,
                watchSlidesVisibility: !0,
                watchSlidesProgress: !0
            });
            this.settings.swiperObjects.gallerySwiper = new Swiper("#swiper-gallery-" + this.settings.sectionId, {
                loop: !1,
                spaceBetween: 10,
                thumbs: {
                    swiper: d
                }
            })
        },
        initProductVariant: function() {
            if (!!this.productSingleObject) {
                var t = this,
                    r = this.productSingleObject,
                    u = r.variants;
                $(".main-product-select-" + r.id + " .single-option-selector").on("change", function() {
                    for (var f = $(".main-product-select-" + r.id + " #SingleOptionSelector-0").val() || null, y = $(".main-product-select-" + r.id + " #SingleOptionSelector-1").val() || null, w = $(".main-product-select-" + r.id + " #SingleOptionSelector-2").val() || null, b = !0, T = 0, k = u.length; T < k; T++) {
                        var S = u[T];
                        if (S.option1 != null && (S.option1 = S.option1.replace(/\s{2,}/g, " ")), S.option2 != null && (S.option2 = S.option2.replace(/\s{2,}/g, " ")), S.option3 != null && (S.option3 = S.option3.replace(/\s{2,}/g, " ")), f == S.option1 && y == S.option2 && w == S.option3) {
                            b = !1, $("#ProductSelect-" + r.id).val(S.id), t.productVariantCallback(S, r.id);
                            break
                        }
                    }
                    b && t.productVariantCallback(null, r.id)
                });
                var s = $("#ProductSelect-" + r.id + " option[selected]").length,
                    l = $("#ProductSelect-" + r.id).length;
                (!s || l == 1) && t.productVariantCallback(r.variants[0], r.id), r.options.size == 1 && r.options[0] != "Title" && $(".selector-wrapper:eq(0)").prepend("<label>" + r.options[0] + "</label>"), r.variants.size == 1 && r.variants[0].title.indexOf("Default") + 1 && $(".selector-wrapper").hide();
                var d = window.location.href;
                if (d.indexOf("?variant=") + 1) $("#ProductTemplate-" + r.id).html() && (UrlTrigger = !0), $("#FeaturedProduct").html() && (home_featured_product_media = !0), $(".main-product-select-" + r.id + " .single-option-selector").first().trigger("change");
                else {
                    var a = !1;
                    for (variant in r.variants)
                        if (r.variants[variant].available && a == !1) {
                            a = !0;
                            for (option in r.options) {
                                var h = Object.keys(r.options).indexOf(option);
                                h >= 0 && $(".main-product-select-" + r.id + " .single-option-selector:eq(" + h + ")").val(r.variants[variant].options[h].replace(/\s{2,}/g, " ")).trigger("change")
                            }
                            $("#ProductTemplate-" + r.id).html() && (UrlTrigger = !0), $("#FeaturedProduct").html() && (home_featured_product_media = !0)
                        }
                }
                this.productVariantStyles()
            }
        },
        productVariantStyles: function() {
            $(".selector-wrapper").addClass("product-form__item"), $(".single-option-selector").addClass("product-form__input")
        },
        productVariantCallback: function(t, r) {
            if (t && this.ProductStatus.updateContent(t.id), t && UrlTrigger) {
                var u = window.location.protocol + "//" + window.location.host + window.location.pathname + "?variant=" + t.id;
                window.history.replaceState({
                    path: u
                }, "", u)
            }
            var s = $(this.settings.selectors.addToCart).closest("form").find(".shopify-payment-button");
            if (t) {
                var l = [];
                $(".main-product-select-" + r + " .single-option-selector option:selected").each(function() {
                    l.push($(this).index())
                });
                for (var d = jQuery("#ProductSelect-" + r).closest("form"), a = 0, h = t.options.length; a < h; a++) {
                    var f = l[a],
                        y = d.find('.swatch[data-option-index="' + a + '"] div.swatch-element')[f],
                        w = $(y).find(":radio");
                    w.size() && (w.get(0).checked = !0)
                }
            }
            if (t) {
                if (t.featured_image && (UrlTrigger || home_featured_product_media)) {
                    var b = t.featured_media.id;
                    typeof this.settings.swiperObjects.gallerySwiper.controller != "undefined" ? this.settings.swiperObjects.gallerySwiper.slideTo($("#" + b).index()) : typeof this.settings.swiperObjects.gallerySwiperVert.controller != "undefined" ? this.settings.swiperObjects.gallerySwiperVert.slideTo($("#" + b).index()) : this.settings.swiperObjects.mySwiper.slideTo($("#" + b).index())
                }
                if ($(this.settings.selectors.productPrice).html(Shopify.formatMoney(t.price, DT_THEME.moneyFormat)), t.unit_price ? $(this.settings.selectors.unitPrice).html(setUnitPrice(t)) : $(this.settings.selectors.unitPrice).html(""), t.compare_at_price > t.price ? ($(this.settings.selectors.comparePrice).html(Shopify.formatMoney(t.compare_at_price, DT_THEME.moneyFormat)).removeClass("hide"), $(this.settings.selectors.price).addClass(this.settings.selectors.saleClasses), $(this.settings.selectors.saleLabel).removeClass("hide"), $(this.settings.selectors.comparePrice).closest("li").removeClass("hide")) : ($(this.settings.selectors.comparePrice).addClass("hide"), $(this.settings.selectors.comparePrice).closest("li").addClass("hide"), $(this.settings.selectors.saleLabel).addClass("hide"), $(this.settings.selectors.price).removeClass(this.settings.selectors.saleClasses)), t.available ? ($(this.settings.selectors.notifyForm).hide(), $(this.settings.selectors.addToCart).prop("disabled", !1), $(this.settings.selectors.addToCartText).text(DT_THEME.strings.addToCart), s.show()) : ($(this.settings.selectors.notifyForm).show(), $(this.settings.selectors.addToCart).prop("disabled", !0), $(this.settings.selectors.addToCartText).text(DT_THEME.strings.soldOut), s.hide()), jQuery.type(t) !== "null") {
                    if (variantSkuData = $(this.settings.selectors.variantSkuData), variantSku = $(this.settings.selectors.variantSku), InventoryProduct = $(this.settings.selectors.InventoryProduct), variantInventory = $(this.settings.selectors.variantInventory), t.sku && variantSkuData ? (variantSkuData.addClass("attributes-visible").removeClass("attributes-hidden"), variantSku.html(t.sku), variantSkuData.is(":last-child") && variantSkuData.prev("li").removeAttr("style")) : (variantSkuData.addClass("attributes-hidden").removeClass("attributes-visible"), variantSku.html(""), variantSkuData.is(":last-child") && variantSkuData.prev("li").css("padding-bottom", "0")), InventoryProduct) {
                        InventoryProduct.addClass("attributes-visible").removeClass("attributes-hidden");
                        for (var T = $("#ProductSelect-" + r), k = T.find("option").length, a = 0; a <= k; a++) {
                            var S = T.find("option:nth-child(" + a + ")");
                            if (S.val() == t.id) {
                                var D = S.attr("data-inventory_management"),
                                    I = S.attr("data-inventory_policy"),
                                    E = S.attr("data-inventory_quantity");
                                break
                            } else var D = "",
                                I = "",
                                E = ""
                        }
                        D == "shopify" && I != "continue" ? E > 0 ? variantInventory.html("<span class=in-stock>In stock!</span>") : variantInventory.html("<span class=out-of-stock>Sorry!  Out of stock.</span>") : variantInventory.html("<span class=in-stock>In stock!</span>")
                    }
                }
                this.$container.find(".product-price").show(), $(this.settings.selectors.addToCart).show(), this.$container.find(".product_payments_btns").show(), t.available && $(this.settings.selectors.addToCart).prop("disabled", !1)
            } else this.$container.find(".product-price").show(), this.$container.find(".product_payments_btns").show(), $(this.settings.selectors.addToCart).prop("disabled", !0), $(this.settings.selectors.addToCartText).text(DT_THEME.strings.unavailable), $(this.settings.selectors.comparePrice).addClass("hide"), $(this.settings.selectors.comparePrice).closest("li").addClass("hide"), $(this.settings.selectors.saleLabel).addClass("hide"), $(this.settings.selectors.price).removeClass(this.settings.selectors.saleClasses), $(this.settings.selectors.productPrice).html("Unavailable"), s.hide(), $(this.settings.selectors.notifyForm).show(), InventoryProduct && variantInventory.html("<span class=out-of-stock>Sold Out</span>")
        }
    }), i
}();
var swiperArr = [],
    container = $("#container");
theme.CollectionPage = function() {
    function e(r) {
        var o = this.$container = $(r),
            t = this.sectionId = o.attr("data-section-id"),
            r = $("#container"),
            u = $.magnificPopup.instance,
            s, l;
        dt_initQuickShop(t), $(".variant-option-color").each(function() {
            $(this).children().length == 0 ? $(this).remove() : $(this).show()
        }), $(".variant-option-size").each(function() {
            $(this).children().length == 0 ? $(this).remove() : $(this).show()
        }), dt_activateQuickShop()
    }
    return e
}(), theme.CollectionPage.prototype = _.assignIn({}, theme.CollectionPage.prototype, {
    onSelect: function() {
        var i = $.magnificPopup.instance;
        typeof i != "undefined" && i.close()
    }
});

function dt_QuickCallback(e, i) {
    var o = $('div.quick-shop-modal[data-id="' + i + '"]');
    if (e && e.featured_image) {
        var t = e.featured_media.id,
            r = $("#" + t),
            u = r.index();
        swiperCarousel = new Swiper(".quick-swiper-container"), swiperCarousel.slideTo(u);
        var s = r.find("img"),
            l = s.attr("data-original")
    }
    if (e) {
        var d = [];
        $("[data-id='" + i + "'] .single-option-selector option:selected").each(function() {
            d.push($(this).index())
        });
        for (var a = jQuery("#dt-sc-quick-ProductSelect-" + i).closest("form"), h = 0, f = e.options.length; h < f; h++) {
            var y = d[h],
                w = a.find('.swatch[data-option-index="' + h + '"] div.swatch-element')[y],
                b = $(w).find(":radio");
            b.size() && (b.get(0).checked = !0)
        }
    }
    var T = o.find(".dT-AddtoCart"),
        k = T.find("span"),
        S = o.find(".product-price-current span"),
        D = o.find(".unitPrice"),
        I = o.find(".product-price-list span");
    e ? (e.available ? (T.removeClass("disabled").prop("disabled", !1).val("Add to Cart"), k.text("Add to Cart")) : (T.val("Sold Out").addClass("disabled").prop("disabled", !0), k.html("Sold Out")), e.unit_price ? D.html(setUnitPrice(e)) : D.html(""), S.length && S.html(Shopify.formatMoney(e.price, DT_THEME.moneyFormat)), I.length && (e.compare_at_price > e.price ? (I.html(Shopify.formatMoney(e.compare_at_price, DT_THEME.moneyFormat)).show(), I.closest("li").show()) : (I.html(""), I.closest("li").hide(), I.hide())), o.find(".product-price").show(), T.show(), o.find(".product_payments_btns").show(), e.available && T.prop("disabled", !1)) : (T.val("Unavailable").show().addClass("disabled").prop("disabled", !0), k.html("Sold Out"), I.html(""), I.closest("li").hide(), I.hide(), S.html("Unavailable"), o.find(".product-price").show(), o.find(".product_payments_btns").show())
}

function dt_initQuickShop(e) {
    var i = $("[data-section-id='" + e + "']");
    i.find(".quick-view-btn").on("click", function(o) {
        if ($(this).hasClass("quick-view-btn-opened")) $(this).removeClass("quick-view-btn-opened");
        else {
            var t = $(this).attr("data-product-id"),
                r = $(this).data("url"),
                u = $(this);
            $("#quick-shop-modal-inner-" + t).load(r, function(s) {
                dt_QuickShopWindow(u, t), dt_QuickShopWindowReady(t, e)
            })
        }
    })
}

function dt_activateQuickShop() {
    if (typeof $().magnificPopup == "function") {
        var e = $("a.quick-view-btn");
        e.length && e.each(function() {
            var i = $(this).data("product-id"),
                o = $(this).attr("data-product-id"),
                t = $(this).data("url"),
                r = $(this);
            $(this).magnificPopup({
                type: "ajax",
                closeOnContentClick: !1,
                mainClass: "mfp-move-from-top",
                removalDelay: 1e3,
                callbacks: {
                    elementParse: function(s) {
                        s.src = s.src.split("?")[0] + "?view=quickview"
                    },
                    ajaxContentAdded: function() {
                        var s = $.magnificPopup.instance,
                            l = s.st.el,
                            d = $(l).attr("href"),
                            a = $(".mfp-move-from-top").find(".SingleOptionSelector-0");
                        dt_QuickShopWindow(r, o), dt_QuickShopWindowReady(o, i), doProductSingleWishListPersistent(), a.length && a.trigger("change")
                    }
                }
            })
        })
    }
}

function dt_QuickShopWindowReady(e, i) {
    var o = $("#product-quick-shop-" + e);
    if (!!$("#dt_QuickViewJson-" + e).html()) {
        o.find(".swatch :radio").on("change", function() {
            var I = jQuery(this).closest(".swatch").attr("data-option-index"),
                E = jQuery(this).val().replace(/\s{2,}/g, " ");
            jQuery(this).closest("form").find(".single-option-selector").eq(I).val(E).trigger("change")
        });
        var t = JSON.parse(document.getElementById("dt_QuickViewJson-" + e).innerHTML);
        $(".quick-view-selector-" + t.id).on("change", function() {
            for (var I = $(this).closest("form"), E = t.variants, U = I.find(".SingleOptionSelector-0").val() || null, B = I.find(".SingleOptionSelector-1").val() || null, te = I.find(".SingleOptionSelector-2").val() || null, ee = !0, W = 0, J = E.length; W < J; W++) {
                var A = E[W];
                if (A.option1 != null && (A.option1 = A.option1.replace(/\s{2,}/g, " ")), A.option2 != null && (A.option2 = A.option2.replace(/\s{2,}/g, " ")), A.option3 != null && (A.option3 = A.option3.replace(/\s{2,}/g, " ")), U == A.option1 && B == A.option2 && te == A.option3) {
                    ee = !1, $("#dt-sc-quick-" + t.id).val(A.id), dt_QuickCallback(A, t.id);
                    break
                }
            }
            ee && dt_QuickCallback(null, t.id), I.find(".variant-push").val(A.id)
        }), t.variants.length && t.variants[0].title.indexOf("Default") >= 0 && o.find(".selector-wrapper").hide();
        for (var r = t, u = 0, s = r.variants.length; u < s; u++) {
            var l = r.variants[u];
            if (l.available)
                for (var d = 0, a = l.options.length; d < a; d++) {
                    var h = l.options[d];
                    h = textToDownCase(h), o.find('.swatch[data-option-index="' + d + '"] .' + h).removeClass("soldout").addClass("available").find(":radio").removeAttr("disabled")
                }
        }
        var f = [],
            y = t.variants;
        $("[data-id=" + t.id + "] .single-option-selector option:selected").each(function() {
            f.push($(this).index())
        });
        var w = jQuery("#dt-sc-quick-" + t.id).closest("form"),
            b = jQuery("#dt-sc-quick-" + t.id + " option:selected").index();
        if (b >= 0)
            for (var T = y[b], u = 0, s = T.options.length; u < s; u++) {
                var k = f[u],
                    S = w.find('.swatch[data-option-index="' + u + '"] div.swatch-element')[k],
                    D = $(S).find(":radio");
                D.size() && (D.get(0).checked = !0)
            }
        dt_Quantity(e)
    }
}

function dt_QuickShopWindow(e, i) {
    var o = function() {
        $(window).trigger("resize")
    };
    setTimeout(function() {
        var t = $("#quick-shop-modal-inner-" + i),
            r = i;
        t.find("[data-product-media-type-video]").each(function() {
            var u = $(this);
            theme.ProductVideo.init(u, r)
        }), theme.ProductVideo.youtubeApiLoaded && theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube), swiperCarousel = new Swiper(".quick-swiper-" + i, {
            direction: "horizontal",
            navigation: {
                nextEl: "#swiper-" + i + "-next",
                prevEl: "#swiper-" + i + "-prev"
            },
            simulateTouch: !1,
            updateOnImagesReady: !0,
            on: {
                transitionEnd: function() {
                    var s = this,
                        l = s.activeIndex,
                        d = s.previousIndex,
                        a = $(s.$el).find(".swiper-slide").eq(l).find("[data-product-single-media-wrapper]"),
                        h = $(".quick-swiper-container").find("[data-product-single-media-wrapper]");
                    if (h.trigger("mediaHidden").removeAttr("style"), a.css("visibility", "visible").trigger("mediaVisible"), theme.Helpers.isTouch()) return !1;
                    a.find("model-viewer").length ? a.find("model-viewer").focus() : a.find("[tabindex='0']").length ? a.find("[tabindex]").focus() : setTimeout(function() {
                        a.focus()
                    }, 100)
                }
            }
        })
    }, 500)
}

function dt_Quantity(e) {
    $(".btn-number-" + e).click(function(i) {
        i.preventDefault(), fieldName = $(this).attr("data-field"), type = $(this).attr("data-type");
        var o = $(this).closest(".product-form__item--quantity").find("input[name='quantity']"),
            t = parseInt(o.val());
        isNaN(t) ? o.val(0) : type == "minus" ? t > 0 && o.val(t - 1).change() : type == "plus" && o.val(t + 1).change()
    }), $(".input-number-" + e).focusin(function() {
        $(this).data("oldValue", $(this).val())
    }), $(".input-number-" + e).change(function() {
        minValue = 0, maxValue = 999, valueCurrent = parseInt($(this).val()), name = $(this).attr("name"), valueCurrent >= minValue ? $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr("disabled") : $(this).val($(this).data("oldValue")), valueCurrent <= maxValue ? $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr("disabled") : $(this).val($(this).data("oldValue"))
    })
}
theme.Helpers = function() {
    var e = !1;

    function i() {
        e = !0, $("body").addClass("body-touch-device")
    }

    function o() {
        return e
    }
    return {
        setTouch: i,
        isTouch: o
    }
}();

function onYouTubeIframeAPIReady() {
    theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube), theme.ProductVideo.youtubeApiLoaded = !0
}
theme.ProductVideo = function() {
    var e = {},
        i = {
            html5: "html5",
            youtube: "youtube"
        },
        o = {
            productMediaWrapper: "[data-product-single-media-wrapper]"
        },
        t = {
            enableVideoLooping: "enable-video-looping",
            videoId: "video-id"
        };

    function r(f, y) {
        if (!!f.length) {
            var w = f.find("iframe, video")[0],
                b = f.data("mediaId");
            if (!!w) {
                e[b] = {
                    mediaId: b,
                    sectionId: y,
                    host: l(w),
                    container: f,
                    element: w,
                    ready: function() {
                        s(this)
                    }
                };
                var T = e[b];
                switch (T.host) {
                    case i.html5:
                        window.Shopify.loadFeatures([{
                            name: "video-ui",
                            version: "1.0",
                            onLoad: u
                        }]), theme.LibraryLoader.load("plyrShopifyStyles");
                        break;
                    case i.youtube:
                        $("#youtube-sdk").length || theme.LibraryLoader.load("youtubeSdk");
                        break
                }
            }
        }
    }

    function u(f) {
        if (f) {
            a();
            return
        }
        d(i.html5)
    }

    function s(f) {
        if (!f.player) {
            var y = f.container.closest(o.productMediaWrapper),
                w = y.data(t.enableVideoLooping);
            switch (f.host) {
                case i.html5:
                    f.player = new Shopify.Plyr(f.element, {
                        loop: {
                            active: w
                        }
                    });
                    break;
                case i.youtube:
                    var b = y.data(t.videoId);
                    f.player = new YT.Player(f.element, {
                        videoId: b,
                        events: {
                            onStateChange: function(k) {
                                k.data === 0 && w && k.target.seekTo(0)
                            }
                        }
                    });
                    break
            }
            y.on("mediaHidden xrLaunch", function() {
                !f.player || (f.host === i.html5 && f.player.pause(), f.host === i.youtube && f.player.pauseVideo && f.player.pauseVideo())
            }), y.on("mediaVisible", function() {
                theme.Helpers.isTouch() || !f.player || (f.host === i.html5 && f.player.play(), f.host === i.youtube && f.player.playVideo && f.player.playVideo())
            })
        }
    }

    function l(f) {
        return f.tagName === "VIDEO" ? i.html5 : f.tagName === "IFRAME" && /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(f.src) ? i.youtube : null
    }

    function d(f) {
        for (var y in e)
            if (e.hasOwnProperty(y)) {
                var w = e[y];
                w.host === f && w.ready()
            }
    }

    function a() {
        for (var f in e)
            if (e.hasOwnProperty(f)) {
                var y = e[f];
                if (y.nativeVideo) continue;
                y.host === i.html5 && (y.element.setAttribute("controls", "controls"), y.nativeVideo = !0)
            }
    }

    function h(f) {
        for (var y in e)
            if (e.hasOwnProperty(y)) {
                var w = e[y];
                w.sectionId === f && (w.player && w.player.destroy(), delete e[y])
            }
    }
    return {
        init: r,
        hosts: i,
        loadVideos: d,
        removeSectionVideos: h
    }
}(), theme.faqBlocks = function() {
    $(document).on("click", ".dt-sc-accordion-btn", function() {
        if (!i) {
            i = !0;
            var o = $(this).index(".dt-sc-accordion-btn"),
                t = $(".dt-sc-accordion-content-inner").eq(o).outerHeight();
            $(".dt-sc-accordion-btn h5").removeClass("active"), $(this).find("h5").addClass("active"), $(".dt-sc-accordion-content").stop().animate({
                height: 0
            }, e), $(".dt-sc-accordion-content").eq(o).stop().animate({
                height: t
            }, e), setTimeout(function() {
                i = !1
            }, e)
        }
    });
    var e = 500,
        i = !1
}(), theme.notify = function() {
    $(document).on("click", "#notify-me", function() {
        return $("#notify-me-wrapper").fadeIn(), !1
    })
}(), $(document).ready(function() {
    var e = new theme.Sections;
    e.register("product-template", theme.ProductPage), e.register("slideshow-section", theme.HomeSlideshow), e.register("collection-template", theme.CollectionPage), e.register("store-availability", theme.ProductStatus), e.register("featured-collection-section", theme.featuredCollection), e.register("faq-block-section", theme.faqBlocks), e.register("home-product-carousel-section", theme.indexProductCarousel), e.register("home-blockCarousel-section", theme.productBlockCarousel), e.register("notify", theme.notify), e.register("search-page", theme.searchPage), e.register("home-tab-grid", theme.tabGrid), e.register("home-tab-sidebar-collection", theme.tabGrid), e.register("number-counter-section", theme.numberCounter), $(document).on("shopify:section:select", function(t) {
        var r = $(t.target),
            u = t.originalEvent.detail.sectionId,
            s = $("#shopify-section-handle-" + u),
            l = s.length ? s.attr("data-bg-type") : null;
        l && r.addClass(l)
    });
    var i = {
        image: "[data-image]",
        lazyloaded: ".lazyloaded"
    };

    function o() {
        var t = document.querySelectorAll(".lazyloaded");
        t.forEach(function(r) {
            removeImageLoadingAnimation(r)
        })
    }
    o()
});

function removeImageLoadingAnimation(e) {
    var i = e.hasAttribute("data-image-loading-animation") ? e : e.closest("[data-image-loading-animation]");
    i && i.removeAttribute("data-image-loading-animation")
}
$(document).one("touchstart", function() {
    theme.Helpers.setTouch()
}), $.cookie("announcementCookie") == "closed" && $(".announcement-bar").hide(), $(".announcement-bar a.close").bind("click", function() {
    $(".announcement-bar").css({
        height: "0",
        padding: "0",
        opacity: "0",
        "z-index": "-1"
    }), $.cookie("announcementCookie", "closed", {
        expires: 1,
        path: "/"
    })
}), $(document).ready(function(e) {
    e(".announcement-bar").each(function() {
        e(this).css({
            height: e(this).outerHeight() + "px"
        })
    })
});

function dt_sc_parallax() {
    var e = [],
        i = [],
        o = $(window),
        t = window.transY || document.documentElement.scrollTop;
    $('[data-style="parallax"]').each(function() {
        var r = $(this);
        r.__speed = r.data("speed") || 1, r.__pOff = r.offset().top, e.push(r)
    }), o.on("scroll resize", function() {
        t = window.transY || document.documentElement.scrollTop, i.forEach(function(r) {
            var u = r.__pOff - t / r.__speed;
            r.css("top", u)
        }), e.forEach(function(r) {
            var u = -((t - r.__pOff) / r.__speed);
            r.css({
                backgroundPosition: "50% " + u / 2 + "px"
            })
        })
    }), o.trigger("scroll")
}
if (dt_sc_parallax(), $(document).on("click", ".color-values", function() {
        $(this).hasClass("active") ? $(".color-values").removeClass("active") : ($(".color-values").removeClass("active"), $(this).addClass("active"))
    }), $("body").on("click", ".swatch-element.color", function() {
        $(this).next("label").find("i")
    }), $("body").on("click", ".swatch span", function() {
        if ($(this).data("image").indexOf("no-image") == -1 && $(this).parents(".products").find(".image_group .featured-image").attr("src", $(this).data("image")), $(this).parents(".swatch").hasClass("color")) {
            var e = $(this).data("id");
            $(this).parents(".shopify-product-form").find(".variant-push").val(e);
            var i = $(this).data("variant-item");
            $(this).parents(".shopify-product-form").find(".variant-option-size .size-values").removeClass("active"), $(this).parents(".shopify-product-form").find(".variant-option-size .swatch").each(function() {
                var o = $(this).find("span").data("variant-title");
                o = o.split("/"), o = $.map(o, $.trim), o = $.map(o, function(t) {
                    return t.toLowerCase()
                }), o = $.map(o, function(t) {
                    return t.replace(/ /g, "-")
                }), $.inArray(i, o) >= 0 && $(this).parent(".size-values").toggleClass("active")
            })
        }
        if ($(this).parents(".swatch").hasClass("size")) {
            var e = $(this).data("id");
            $(this).parents(".shopify-product-form").find(".variant-push").val(e)
        }
    }), window.theme = window.theme || {}, theme.init = function() {
        theme.drawersInit(), theme.cartPage()
    }, theme.drawersInit = function() {
        theme.RightDrawer = new theme.Drawers("CartDrawer", "right", {
            onDrawerOpen: ajaxCart.load
        })
    }, theme.cartPage = function() {
        $("body").on("click", ".cart__note-add", function() {
            $(this).addClass("is-hidden"), $(".cart__note").addClass("is-active")
        })
    }, theme.Drawers = function() {
        var e = function(o, t, r) {
            var u = {
                close: ".js-drawer-close",
                open: ".js-drawer-open-" + t,
                openClass: "js-drawer-open",
                dirOpenClass: "js-drawer-open-" + t
            };
            if (this.$nodes = {
                    parent: $("body, html"),
                    page: $("#container")
                }, this.config = $.extend(u, r), this.position = t, this.$drawer = $("#" + o), !this.$drawer.length) return !1;
            this.drawerIsOpen = !1, this.init()
        };
        return e.prototype.init = function() {
            $(this.config.open).on("click", $.proxy(this.open, this)), this.$drawer.on("click", this.config.close, $.proxy(this.close, this))
        }, e.prototype.open = function(i) {
            $("body").addClass("shifter-enabled");
            var o = !1;
            if (i ? i.preventDefault() : o = !0, i && i.stopPropagation && (i.stopPropagation(), this.$activeSource = $(i.currentTarget)), this.drawerIsOpen && !o) return this.close();
            this.$drawer.prepareTransition(), this.$nodes.parent.addClass(this.config.openClass + " " + this.config.dirOpenClass), this.drawerIsOpen = !0, this.trapFocus({
                $container: this.$drawer,
                $elementToFocus: this.$drawer.find(".drawer__close-button"),
                namespace: "drawer_focus"
            }), this.config.onDrawerOpen && typeof this.config.onDrawerOpen == "function" && (o || this.config.onDrawerOpen()), this.$activeSource && this.$activeSource.attr("aria-expanded") && this.$activeSource.attr("aria-expanded", "true"), this.$nodes.parent.on("keyup.drawer", $.proxy(function(t) {
                if (t.keyCode === 27) return this.close(), !1
            }, this)), this.$nodes.page.on("touchmove.drawer", function() {
                return !1
            }), this.$nodes.page.on("click.drawer", $.proxy(function() {
                return $("body").removeClass("shifter-enabled"), this.close(), !1
            }, this))
        }, e.prototype.close = function() {
            !this.drawerIsOpen || ($(document.activeElement).trigger("blur"), this.$drawer.prepareTransition(), this.$nodes.parent.removeClass(this.config.dirOpenClass + " " + this.config.openClass), this.drawerIsOpen = !1, this.removeTrapFocus({
                $container: this.$drawer,
                namespace: "drawer_focus"
            }), this.$nodes.page.off(".drawer"), this.$nodes.parent.off(".drawer"))
        }, e.prototype.trapFocus = function(i) {
            var o = i.eventNamespace ? "focusin." + eventNamespace : "focusin";
            i.$elementToFocus || (i.$elementToFocus = i.$container), i.$container.attr("tabindex", "-1"), i.$elementToFocus.focus(), $(document).on(o, function(t) {
                i.$container[0] !== t.target && !i.$container.has(t.target).length && i.$container.focus()
            })
        }, e.prototype.removeTrapFocus = function(i) {
            var o = i.namespace ? "focusin." + i.namespace : "focusin";
            i.$container && i.$container.length && i.$container.removeAttr("tabindex"), $(document).off(o)
        }, e
    }(), $(theme.init), $(window).load(function() {
        $(".se-pre-con").fadeOut("slow")
    }), $(document).ready(function() {
        $(".shopify-currency-form select").on("select2:select", function(i) {
            $("#currency_form").submit()
        });

        function e(i) {
            i.target.form.submit()
        }
        document.querySelectorAll(".shopify-currency-form select").forEach(function(i) {
            i.addEventListener("change", e)
        }), $("#accordian li").click(function() {
            var i = $(this),
                o = i.closest("ul"),
                t = o.find(".active"),
                r = i.closest("li"),
                u = r.hasClass("active"),
                s = 0;
            o.find("ul").slideUp(function() {
                ++s == o.find("ul").length && t.removeClass("active")
            }), u || (r.children("ul").slideDown(), r.addClass("active"))
        }), $("#to-top").on("click", function(i) {
            i.preventDefault();
            var o = this.hash,
                t = $(o);
            $("html, body").stop().animate({
                scrollTop: t.offset().top
            }, 900, "swing")
        })
    }), $(window).scroll(function() {
        var e = $(this).scrollTop();
        e > 800 ? $("#to-top").css("display", "block") : $("#to-top").css("display", "none")
    }), $(window).width() < 768 && $(window).on("resize", function() {
        $(".sidebar").removeAttr("id")
    }).resize(), $(window).width() < 1280 && $(".has-sidebar").length > 0) {
    var e = function() {
            $(".toggleIcon").on("click", function() {
                $(this).hasClass("clicked") ? ($(this).removeClass("clicked"), $(this).parents(".has-sidebar").removeClass("open")) : ($(this).addClass("clicked"), $(this).parents(".has-sidebar").addClass("open"))
            })
        },
        toggleFilter = e;
    $(document).ready(e), $(window).on("resize", e), $(".js-close-modal").click(function() {
        $(".has-sidebar").removeClass("open"), $(".toggleIcon").removeClass("clicked")
    })
}
//# sourceMappingURL=/s/files/1/0610/6287/3301/t/2/assets/dt-theme.js.map?v=174304030634182905941642410247