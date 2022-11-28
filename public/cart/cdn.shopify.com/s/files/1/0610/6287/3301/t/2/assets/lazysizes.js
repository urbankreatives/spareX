/*! lazysizes - v4.1.8 */
(function(s, g) {
    var a = function(y) {
        g(s.lazySizes, y), s.removeEventListener("lazyunveilread", a, !0)
    };
    g = g.bind(null, s, s.document), typeof module == "object" && module.exports ? g(require("lazysizes")) : s.lazySizes ? a() : s.addEventListener("lazyunveilread", a, !0)
})(window, function(s, g, a, y) {
    "use strict";

    function R(i) {
        var f = getComputedStyle(i, null) || {},
            m = f.fontFamily || "",
            L = m.match(n) || "",
            r = L && m.match(p) || "";
        return r && (r = r[1]), {
            fit: L && L[1] || "",
            position: M[r] || r || "center"
        }
    }

    function U(i, f) {
        var m, L, r = a.cfg,
            c = i.cloneNode(!1),
            _ = c.style,
            T = function() {
                var l = i.currentSrc || i.src;
                l && L !== l && (L = l, _.backgroundImage = "url(" + (w.test(l) ? JSON.stringify(l) : l) + ")", m || (m = !0, a.rC(c, r.loadingClass), a.aC(c, r.loadedClass)))
            },
            t = function() {
                a.rAF(T)
            };
        i._lazysizesParentFit = f.fit, i.addEventListener("lazyloaded", t, !0), i.addEventListener("load", t, !0), c.addEventListener("load", function() {
            var l = c.currentSrc || c.src;
            l && l != S && (c.src = S, c.srcset = "")
        }), a.rAF(function() {
            var l = i,
                v = i.parentNode;
            v.nodeName.toUpperCase() == "PICTURE" && (l = v, v = v.parentNode), a.rC(c, r.loadedClass), a.rC(c, r.lazyClass), a.aC(c, r.loadingClass), a.aC(c, r.objectFitClass || "lazysizes-display-clone"), c.getAttribute(r.srcsetAttr) && c.setAttribute(r.srcsetAttr, ""), c.getAttribute(r.srcAttr) && c.setAttribute(r.srcAttr, ""), c.src = S, c.srcset = "", _.backgroundRepeat = "no-repeat", _.backgroundPosition = f.position, _.backgroundSize = f.fit, l.style.display = "none", i.setAttribute("data-parent-fit", f.fit), i.setAttribute("data-parent-container", "prev"), v.insertBefore(c, l), i._lazysizesParentFit && delete i._lazysizesParentFit, i.complete && T()
        })
    }
    var X = g.createElement("a").style,
        $ = "objectFit" in X,
        C = $ && "objectPosition" in X,
        n = /object-fit["']*\s*:\s*["']*(contain|cover)/,
        p = /object-position["']*\s*:\s*["']*(.+?)(?=($|,|'|"|;))/,
        S = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
        w = /\(|\)|'/,
        M = {
            center: "center",
            "50% 50%": "center"
        };
    if (!$ || !C) {
        var o = function(i) {
            if (i.detail.instance == a) {
                var f = i.target,
                    m = R(f);
                !m.fit || $ && m.position == "center" || U(f, m)
            }
        };
        s.addEventListener("lazyunveilread", o, !0), y && y.detail && o(y)
    }
}); /*! lazysizes - v4.1.8 */
(function(s, g) {
    var a = function() {
        g(s.lazySizes), s.removeEventListener("lazyunveilread", a, !0)
    };
    g = g.bind(null, s, s.document), typeof module == "object" && module.exports ? g(require("lazysizes")) : s.lazySizes ? a() : s.addEventListener("lazyunveilread", a, !0)
})(window, function(s, g, a) {
    "use strict";

    function y(t, l) {
        var v, N, x, b, A = s.getComputedStyle(t);
        N = t.parentNode, b = {
            isPicture: !(!N || !w.test(N.nodeName || ""))
        }, x = function(h, E) {
            var e = t.getAttribute("data-" + h);
            if (!e) {
                var u = A.getPropertyValue("--ls-" + h);
                u && (e = u.trim())
            }
            if (e) {
                if (e == "true") e = !0;
                else if (e == "false") e = !1;
                else if (S.test(e)) e = parseFloat(e);
                else if (typeof n[h] == "function") e = n[h](t, e);
                else if (f.test(e)) try {
                    e = JSON.parse(e)
                } catch (z) {}
                b[h] = e
            } else h in n && typeof n[h] != "function" ? b[h] = n[h] : E && typeof n[h] == "function" && (b[h] = n[h](t, e))
        };
        for (v in n) x(v);
        return l.replace(i, function(h, E) {
            E in b || x(E, !0)
        }), b
    }

    function R(t, l) {
        var v = [],
            N = function(x, b) {
                return p[typeof l[b]] ? l[b] : x
            };
        return v.srcset = [], l.absUrl && (L.setAttribute("href", t), t = L.href), t = ((l.prefix || "") + t + (l.postfix || "")).replace(i, N), l.widths.forEach(function(x) {
            var b = l.widthmap[x] || x,
                A = l.aspectratio || l.ratio,
                h = !l.aspectratio && n.traditionalRatio,
                E = {
                    u: t.replace(M, b).replace(o, A ? Math.round(h ? x * A : x / A) : ""),
                    w: x
                };
            v.push(E), v.srcset.push(E.c = E.u + " " + x + "w")
        }), v
    }

    function U(t, l, v) {
        var N = 0,
            x = 0,
            b = v;
        if (t) {
            if (l.ratio === "container") {
                for (N = b.scrollWidth, x = b.scrollHeight; !(N && x || b === g);) b = b.parentNode, N = b.scrollWidth, x = b.scrollHeight;
                N && x && (l.ratio = x / N)
            }
            t = R(t, l), t.isPicture = l.isPicture, c && v.nodeName.toUpperCase() == "IMG" ? v.removeAttribute(C.srcsetAttr) : v.setAttribute(C.srcsetAttr, t.srcset.join(", ")), Object.defineProperty(v, "_lazyrias", {
                value: t,
                writable: !0
            })
        }
    }

    function X(t, l) {
        var v = y(t, l);
        return n.modifyOptions.call(t, {
            target: t,
            details: v,
            detail: v
        }), a.fire(t, "lazyriasmodifyoptions", v), v
    }

    function $(t) {
        return t.getAttribute(t.getAttribute("data-srcattr") || n.srcAttr) || t.getAttribute(C.srcsetAttr) || t.getAttribute(C.srcAttr) || t.getAttribute("data-pfsrcset") || ""
    }
    var C, n, p = {
            string: 1,
            number: 1
        },
        S = /^\-*\+*\d+\.*\d*$/,
        w = /^picture$/i,
        M = /\s*\{\s*width\s*\}\s*/i,
        o = /\s*\{\s*height\s*\}\s*/i,
        i = /\s*\{\s*([a-z0-9]+)\s*\}\s*/gi,
        f = /^\[.*\]|\{.*\}$/,
        m = /^(?:auto|\d+(px)?)$/,
        L = g.createElement("a"),
        r = g.createElement("img"),
        c = "srcset" in r && !("sizes" in r),
        _ = !!s.HTMLPictureElement && !c;
    (function() {
        var t, l = function() {},
            v = {
                prefix: "",
                postfix: "",
                srcAttr: "data-src",
                absUrl: !1,
                modifyOptions: l,
                widthmap: {},
                ratio: !1,
                traditionalRatio: !1,
                aspectratio: !1
            };
        C = a && a.cfg || s.lazySizesConfig, C || (C = {}, s.lazySizesConfig = C), C.supportsType || (C.supportsType = function(N) {
            return !N
        }), C.rias || (C.rias = {}), "widths" in (n = C.rias) || (n.widths = [], function(N) {
            for (var x, b = 0; !x || x < 3e3;) b += 5, b > 30 && (b += 1), x = 36 * b, N.push(x)
        }(n.widths));
        for (t in v) t in n || (n[t] = v[t])
    })(), addEventListener("lazybeforesizes", function(t) {
        if (t.detail.instance == a) {
            var l, v, N, x, b, A, h, E, e, u, z, F, W;
            if (l = t.target, t.detail.dataAttr && !t.defaultPrevented && !n.disabled && (e = l.getAttribute(C.sizesAttr) || l.getAttribute("sizes")) && m.test(e)) {
                if (v = $(l), N = X(l, v), z = M.test(N.prefix) || M.test(N.postfix), N.isPicture && (x = l.parentNode))
                    for (b = x.getElementsByTagName("source"), A = 0, h = b.length; A < h; A++)(z || M.test(E = $(b[A]))) && (U(E, N, b[A]), F = !0);
                z || M.test(v) ? (U(v, N, l), F = !0) : F && (W = [], W.srcset = [], W.isPicture = !0, Object.defineProperty(l, "_lazyrias", {
                    value: W,
                    writable: !0
                })), F && (_ ? l.removeAttribute(C.srcAttr) : e != "auto" && (u = {
                    width: parseInt(e, 10)
                }, T({
                    target: l,
                    detail: u
                })))
            }
        }
    }, !0);
    var T = function() {
        var t = function(A, h) {
                return A.w - h.w
            },
            l = function(A) {
                var h, E, e = A.length,
                    u = A[e - 1],
                    z = 0;
                for (z; z < e; z++)
                    if (u = A[z], u.d = u.w / A.w, u.d >= A.d) {
                        !u.cached && (h = A[z - 1]) && h.d > A.d - .13 * Math.pow(A.d, 2.2) && (E = Math.pow(h.d - .6, 1.6), h.cached && (h.d += .15 * E), h.d + (u.d - A.d) * E > A.d && (u = h));
                        break
                    }
                return u
            },
            v = function(A, h) {
                var E;
                return !A._lazyrias && a.pWS && (E = a.pWS(A.getAttribute(C.srcsetAttr || ""))).length && (Object.defineProperty(A, "_lazyrias", {
                    value: E,
                    writable: !0
                }), h && A.parentNode && (E.isPicture = A.parentNode.nodeName.toUpperCase() == "PICTURE")), A._lazyrias
            },
            N = function(A) {
                var h = s.devicePixelRatio || 1,
                    E = a.getX && a.getX(A);
                return Math.min(E || h, 2.4, h)
            },
            x = function(A, h) {
                var E, e, u, z, F, W;
                if (F = A._lazyrias, F.isPicture && s.matchMedia) {
                    for (e = 0, E = A.parentNode.getElementsByTagName("source"), u = E.length; e < u; e++)
                        if (v(E[e]) && !E[e].getAttribute("type") && (!(z = E[e].getAttribute("media")) || (matchMedia(z) || {}).matches)) {
                            F = E[e]._lazyrias;
                            break
                        }
                }
                return (!F.w || F.w < h) && (F.w = h, F.d = N(A), W = l(F.sort(t))), W
            },
            b = function(A) {
                if (A.detail.instance == a) {
                    var h, E = A.target;
                    if (!c && (s.respimage || s.picturefill || lazySizesConfig.pf)) return void g.removeEventListener("lazybeforesizes", b);
                    ("_lazyrias" in E || A.detail.dataAttr && v(E, !0)) && (h = x(E, A.detail.width)) && h.u && E._lazyrias.cur != h.u && (E._lazyrias.cur = h.u, h.cached = !0, a.rAF(function() {
                        E.setAttribute(C.srcAttr, h.u), E.setAttribute("src", h.u)
                    }))
                }
            };
        return _ ? b = function() {} : addEventListener("lazybeforesizes", b), b
    }()
}); /*! lazysizes - v4.1.8 */
(function(s, g) {
    var a = g(s, s.document);
    s.lazySizes = a, typeof module == "object" && module.exports && (module.exports = a)
})(window, function(s, g) {
    "use strict";
    if (g.getElementsByClassName) {
        var a, y, R = g.documentElement,
            U = s.Date,
            X = s.HTMLPictureElement,
            $ = "addEventListener",
            C = "getAttribute",
            n = s[$],
            p = s.setTimeout,
            S = s.requestAnimationFrame || p,
            w = s.requestIdleCallback,
            M = /^picture$/i,
            o = ["load", "error", "lazyincluded", "_lazyloaded"],
            i = {},
            f = Array.prototype.forEach,
            m = function(e, u) {
                return i[u] || (i[u] = new RegExp("(\\s|^)" + u + "(\\s|$)")), i[u].test(e[C]("class") || "") && i[u]
            },
            L = function(e, u) {
                m(e, u) || e.setAttribute("class", (e[C]("class") || "").trim() + " " + u)
            },
            r = function(e, u) {
                var z;
                (z = m(e, u)) && e.setAttribute("class", (e[C]("class") || "").replace(z, " "))
            },
            c = function(e, u, z) {
                var F = z ? $ : "removeEventListener";
                z && c(e, u), o.forEach(function(W) {
                    e[F](W, u)
                })
            },
            _ = function(e, u, z, F, W) {
                var j = g.createEvent("Event");
                return z || (z = {}), z.instance = a, j.initEvent(u, !F, !W), j.detail = z, e.dispatchEvent(j), j
            },
            T = function(e, u) {
                var z;
                !X && (z = s.picturefill || y.pf) ? (u && u.src && !e[C]("srcset") && e.setAttribute("srcset", u.src), z({
                    reevaluate: !0,
                    elements: [e]
                })) : u && u.src && (e.src = u.src)
            },
            t = function(e, u) {
                return (getComputedStyle(e, null) || {})[u]
            },
            l = function(e, u, z) {
                for (z = z || e.offsetWidth; z < y.minSize && u && !e._lazysizesWidth;) z = u.offsetWidth, u = u.parentNode;
                return z
            },
            v = function() {
                var e, u, z = [],
                    F = [],
                    W = z,
                    j = function() {
                        var O = W;
                        for (W = z.length ? F : z, e = !0, u = !1; O.length;) O.shift()();
                        e = !1
                    },
                    k = function(O, B) {
                        e && !B ? O.apply(this, arguments) : (W.push(O), u || (u = !0, (g.hidden ? p : S)(j)))
                    };
                return k._lsFlush = j, k
            }(),
            N = function(e, u) {
                return u ? function() {
                    v(e)
                } : function() {
                    var z = this,
                        F = arguments;
                    v(function() {
                        e.apply(z, F)
                    })
                }
            },
            x = function(e) {
                var u, z = 0,
                    F = y.throttleDelay,
                    W = y.ricTimeout,
                    j = function() {
                        u = !1, z = U.now(), e()
                    },
                    k = w && W > 49 ? function() {
                        w(j, {
                            timeout: W
                        }), W !== y.ricTimeout && (W = y.ricTimeout)
                    } : N(function() {
                        p(j)
                    }, !0);
                return function(O) {
                    var B;
                    (O = O === !0) && (W = 33), u || (u = !0, B = F - (U.now() - z), B < 0 && (B = 0), O || B < 9 ? k() : p(k, B))
                }
            },
            b = function(e) {
                var u, z, F = 99,
                    W = function() {
                        u = null, e()
                    },
                    j = function() {
                        var k = U.now() - z;
                        k < F ? p(j, F - k) : (w || W)(W)
                    };
                return function() {
                    z = U.now(), u || (u = p(j, F))
                }
            };
        (function() {
            var e, u = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.5,
                hFac: .8,
                loadMode: 2,
                loadHidden: !0,
                ricTimeout: 0,
                throttleDelay: 125
            };
            y = s.lazySizesConfig || s.lazysizesConfig || {};
            for (e in u) e in y || (y[e] = u[e]);
            s.lazySizesConfig = y, p(function() {
                y.init && E()
            })
        })();
        var A = function() {
                var e, u, z, F, W, j, k, O, B, J, K, it, pt = /^img$/i,
                    zt = /^iframe$/i,
                    mt = "onscroll" in s && !/(gle|ing)bot/.test(navigator.userAgent),
                    vt = 0,
                    at = 0,
                    G = 0,
                    nt = -1,
                    ut = function(d) {
                        G--, (!d || G < 0 || !d.target) && (G = 0)
                    },
                    ct = function(d) {
                        return it == null && (it = t(g.body, "visibility") == "hidden"), it || t(d.parentNode, "visibility") != "hidden" && t(d, "visibility") != "hidden"
                    },
                    ht = function(d, P) {
                        var I, H = d,
                            q = ct(d);
                        for (O -= P, K += P, B -= P, J += P; q && (H = H.offsetParent) && H != g.body && H != R;)(q = (t(H, "opacity") || 1) > 0) && t(H, "overflow") != "visible" && (I = H.getBoundingClientRect(), q = J > I.left && B < I.right && K > I.top - 1 && O < I.bottom + 1);
                        return q
                    },
                    dt = function() {
                        var d, P, I, H, q, D, Y, Z, et, tt, rt, st, V = a.elements;
                        if ((F = y.loadMode) && G < 8 && (d = V.length)) {
                            for (P = 0, nt++; P < d; P++)
                                if (V[P] && !V[P]._lazyRace)
                                    if (!mt || a.prematureUnveil && a.prematureUnveil(V[P])) ot(V[P]);
                                    else if ((Z = V[P][C]("data-expand")) && (D = 1 * Z) || (D = at), tt || (tt = !y.expand || y.expand < 1 ? R.clientHeight > 500 && R.clientWidth > 500 ? 500 : 370 : y.expand, a._defEx = tt, rt = tt * y.expFactor, st = y.hFac, it = null, at < rt && G < 1 && nt > 2 && F > 2 && !g.hidden ? (at = rt, nt = 0) : at = F > 1 && nt > 1 && G < 6 ? tt : vt), et !== D && (j = innerWidth + D * st, k = innerHeight + D, Y = -1 * D, et = D), I = V[P].getBoundingClientRect(), (K = I.bottom) >= Y && (O = I.top) <= k && (J = I.right) >= Y * st && (B = I.left) <= j && (K || J || B || O) && (y.loadHidden || ct(V[P])) && (u && G < 3 && !Z && (F < 3 || nt < 4) || ht(V[P], D))) {
                                if (ot(V[P]), q = !0, G > 9) break
                            } else !q && u && !H && G < 4 && nt < 4 && F > 2 && (e[0] || y.preloadAfterLoad) && (e[0] || !Z && (K || J || B || O || V[P][C](y.sizesAttr) != "auto")) && (H = e[0] || V[P]);
                            H && !q && ot(H)
                        }
                    },
                    Q = x(dt),
                    ft = function(d) {
                        var P = d.target;
                        if (P._lazyCache) return void delete P._lazyCache;
                        ut(d), L(P, y.loadedClass), r(P, y.loadingClass), c(P, gt), _(P, "lazyloaded")
                    },
                    At = N(ft),
                    gt = function(d) {
                        At({
                            target: d.target
                        })
                    },
                    Ct = function(d, P) {
                        try {
                            d.contentWindow.location.replace(P)
                        } catch (I) {
                            d.src = P
                        }
                    },
                    Et = function(d) {
                        var P, I = d[C](y.srcsetAttr);
                        (P = y.customMedia[d[C]("data-media") || d[C]("media")]) && d.setAttribute("media", P), I && d.setAttribute("srcset", I)
                    },
                    wt = N(function(d, P, I, H, q) {
                        var D, Y, Z, et, tt, rt;
                        (tt = _(d, "lazybeforeunveil", P)).defaultPrevented || (H && (I ? L(d, y.autosizesClass) : d.setAttribute("sizes", H)), Y = d[C](y.srcsetAttr), D = d[C](y.srcAttr), q && (Z = d.parentNode, et = Z && M.test(Z.nodeName || "")), rt = P.firesLoad || "src" in d && (Y || D || et), tt = {
                            target: d
                        }, L(d, y.loadingClass), rt && (clearTimeout(z), z = p(ut, 2500), c(d, gt, !0)), et && f.call(Z.getElementsByTagName("source"), Et), Y ? d.setAttribute("srcset", Y) : D && !et && (zt.test(d.nodeName) ? Ct(d, D) : d.src = D), q && (Y || et) && T(d, {
                            src: D
                        })), d._lazyRace && delete d._lazyRace, r(d, y.lazyClass), v(function() {
                            var st = d.complete && d.naturalWidth > 1;
                            rt && !st || (st && L(d, "ls-is-cached"), ft(tt), d._lazyCache = !0, p(function() {
                                "_lazyCache" in d && delete d._lazyCache
                            }, 9)), d.loading == "lazy" && G--
                        }, !0)
                    }),
                    ot = function(d) {
                        if (!d._lazyRace) {
                            var P, I = pt.test(d.nodeName),
                                H = I && (d[C](y.sizesAttr) || d[C]("sizes")),
                                q = H == "auto";
                            (!q && u || !I || !d[C]("src") && !d.srcset || d.complete || m(d, y.errorClass) || !m(d, y.lazyClass)) && (P = _(d, "lazyunveilread").detail, q && h.updateElem(d, !0, d.offsetWidth), d._lazyRace = !0, G++, wt(d, P, q, H, I))
                        }
                    },
                    _t = b(function() {
                        y.loadMode = 3, Q()
                    }),
                    yt = function() {
                        y.loadMode == 3 && (y.loadMode = 2), _t()
                    },
                    lt = function() {
                        if (!u) {
                            if (U.now() - W < 999) return void p(lt, 999);
                            u = !0, y.loadMode = 3, Q(), n("scroll", yt, !0)
                        }
                    };
                return {
                    _: function() {
                        W = U.now(), a.elements = g.getElementsByClassName(y.lazyClass), e = g.getElementsByClassName(y.lazyClass + " " + y.preloadClass), n("scroll", Q, !0), n("resize", Q, !0), s.MutationObserver ? new MutationObserver(Q).observe(R, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0
                        }) : (R[$]("DOMNodeInserted", Q, !0), R[$]("DOMAttrModified", Q, !0), setInterval(Q, 999)), n("hashchange", Q, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function(d) {
                            g[$](d, Q, !0)
                        }), /d$|^c/.test(g.readyState) ? lt() : (n("load", lt), g[$]("DOMContentLoaded", Q), p(lt, 2e4)), a.elements.length ? (dt(), v._lsFlush()) : Q()
                    },
                    checkElems: Q,
                    unveil: ot,
                    _aLSL: yt
                }
            }(),
            h = function() {
                var e, u = N(function(j, k, O, B) {
                        var J, K, it;
                        if (j._lazysizesWidth = B, B += "px", j.setAttribute("sizes", B), M.test(k.nodeName || ""))
                            for (J = k.getElementsByTagName("source"), K = 0, it = J.length; K < it; K++) J[K].setAttribute("sizes", B);
                        O.detail.dataAttr || T(j, O.detail)
                    }),
                    z = function(j, k, O) {
                        var B, J = j.parentNode;
                        J && (O = l(j, J, O), B = _(j, "lazybeforesizes", {
                            width: O,
                            dataAttr: !!k
                        }), B.defaultPrevented || (O = B.detail.width) && O !== j._lazysizesWidth && u(j, J, B, O))
                    },
                    F = function() {
                        var j, k = e.length;
                        if (k)
                            for (j = 0; j < k; j++) z(e[j])
                    },
                    W = b(F);
                return {
                    _: function() {
                        e = g.getElementsByClassName(y.autosizesClass), n("resize", W)
                    },
                    checkElems: W,
                    updateElem: z
                }
            }(),
            E = function() {
                E.i || (E.i = !0, h._(), A._())
            };
        return a = {
            cfg: y,
            autoSizer: h,
            loader: A,
            init: E,
            uP: T,
            aC: L,
            rC: r,
            hC: m,
            fire: _,
            gW: l,
            rAF: v
        }
    }
}); /*! lazysizes - v4.1.8 */
(function(s, g) {
    var a = function() {
        g(s.lazySizes), s.removeEventListener("lazyunveilread", a, !0)
    };
    g = g.bind(null, s, s.document), typeof module == "object" && module.exports ? g(require("lazysizes")) : s.lazySizes ? a() : s.addEventListener("lazyunveilread", a, !0)
})(window, function(s, g, a) {
    "use strict";
    if (s.addEventListener) {
        var y = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
            R = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/,
            U = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/,
            X = /^picture$/i,
            $ = function(n) {
                return getComputedStyle(n, null) || {}
            },
            C = {
                getParent: function(n, p) {
                    var S = n,
                        w = n.parentNode;
                    return p && p != "prev" || !w || !X.test(w.nodeName || "") || (w = w.parentNode), p != "self" && (S = p == "prev" ? n.previousElementSibling : p && (w.closest || s.jQuery) && (w.closest ? w.closest(p) : jQuery(w).closest(p)[0]) || w), S
                },
                getFit: function(n) {
                    var p, S, w = $(n),
                        M = w.content || w.fontFamily,
                        o = {
                            fit: n._lazysizesParentFit || n.getAttribute("data-parent-fit")
                        };
                    return !o.fit && M && (p = M.match(R)) && (o.fit = p[1]), o.fit ? (S = n._lazysizesParentContainer || n.getAttribute("data-parent-container"), !S && M && (p = M.match(U)) && (S = p[1]), o.parent = C.getParent(n, S)) : o.fit = w.objectFit, o
                },
                getImageRatio: function(n) {
                    var p, S, w, M, o, i, f, m = n.parentNode,
                        L = m && X.test(m.nodeName || "") ? m.querySelectorAll("source, img") : [n];
                    for (p = 0; p < L.length; p++)
                        if (n = L[p], S = n.getAttribute(lazySizesConfig.srcsetAttr) || n.getAttribute("srcset") || n.getAttribute("data-pfsrcset") || n.getAttribute("data-risrcset") || "", w = n._lsMedia || n.getAttribute("media"), w = lazySizesConfig.customMedia[n.getAttribute("data-media") || w] || w, S && (!w || (s.matchMedia && matchMedia(w) || {}).matches)) {
                            M = parseFloat(n.getAttribute("data-aspectratio")), M || (o = S.match(y), o ? o[2] == "w" ? (i = o[1], f = o[3]) : (i = o[3], f = o[1]) : (i = n.getAttribute("width"), f = n.getAttribute("height")), M = i / f);
                            break
                        }
                    return M
                },
                calculateSize: function(n, p) {
                    var S, w, M, o, i = this.getFit(n),
                        f = i.fit,
                        m = i.parent;
                    return f == "width" || (f == "contain" || f == "cover") && (M = this.getImageRatio(n)) ? (m ? p = m.clientWidth : m = n, o = p, f == "width" ? o = p : (w = m.clientHeight) > 40 && (S = p / w) && (f == "cover" && S < M || f == "contain" && S > M) && (o = p * (M / S)), o) : p
                }
            };
        a.parentFit = C, g.addEventListener("lazybeforesizes", function(n) {
            if (!n.defaultPrevented && n.detail.instance == a) {
                var p = n.target;
                n.detail.width = C.calculateSize(p, n.detail.width)
            }
        })
    }
}); /*! lazysizes - v4.1.8 */
(function(s, g) {
    var a = function() {
        g(s.lazySizes), s.removeEventListener("lazyunveilread", a, !0)
    };
    g = g.bind(null, s, s.document), typeof module == "object" && module.exports ? g(require("lazysizes")) : s.lazySizes ? a() : s.addEventListener("lazyunveilread", a, !0)
})(window, function(s, g, a) {
    "use strict";
    var y, R = a && a.cfg,
        U = g.createElement("img"),
        X = "sizes" in U && "srcset" in U,
        $ = /\s+\d+h/g,
        C = function() {
            var n = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
                p = Array.prototype.forEach;
            return function() {
                var S = g.createElement("img"),
                    w = function(i) {
                        var f, m, L = i.getAttribute(lazySizesConfig.srcsetAttr);
                        L && (m = L.match(n)) && (f = m[2] == "w" ? m[1] / m[3] : m[3] / m[1], f && i.setAttribute("data-aspectratio", f), i.setAttribute(lazySizesConfig.srcsetAttr, L.replace($, "")))
                    },
                    M = function(i) {
                        if (i.detail.instance == a) {
                            var f = i.target.parentNode;
                            f && f.nodeName == "PICTURE" && p.call(f.getElementsByTagName("source"), w), w(i.target)
                        }
                    },
                    o = function() {
                        S.currentSrc && g.removeEventListener("lazybeforeunveil", M)
                    };
                g.addEventListener("lazybeforeunveil", M), S.onload = o, S.onerror = o, S.srcset = "data:,a 1w 1h", S.complete && o()
            }
        }();
    if (R.supportsType || (R.supportsType = function(n) {
            return !n
        }), s.HTMLPictureElement && X) return void(!a.hasHDescriptorFix && g.msElementsFromPoint && (a.hasHDescriptorFix = !0, C()));
    s.picturefill || R.pf || (R.pf = function(n) {
        var p, S;
        if (!s.picturefill)
            for (p = 0, S = n.elements.length; p < S; p++) y(n.elements[p])
    }, y = function() {
        var n = function(r, c) {
                return r.w - c.w
            },
            p = /^\s*\d+\.*\d*px\s*$/,
            S = function(r) {
                var c, _, T = r.length,
                    t = r[T - 1],
                    l = 0;
                for (l; l < T; l++)
                    if (t = r[l], t.d = t.w / r.w, t.d >= r.d) {
                        !t.cached && (c = r[l - 1]) && c.d > r.d - .13 * Math.pow(r.d, 2.2) && (_ = Math.pow(c.d - .6, 1.6), c.cached && (c.d += .15 * _), c.d + (t.d - r.d) * _ > r.d && (t = c));
                        break
                    }
                return t
            },
            w = function() {
                var r, c = /(([^,\s].[^\s]+)\s+(\d+)w)/g,
                    _ = /\s/,
                    T = function(t, l, v, N) {
                        r.push({
                            c: l,
                            u: v,
                            w: 1 * N
                        })
                    };
                return function(t) {
                    return r = [], t = t.trim(), t.replace($, "").replace(c, T), r.length || !t || _.test(t) || r.push({
                        c: t,
                        u: t,
                        w: 99
                    }), r
                }
            }(),
            M = function() {
                M.init || (M.init = !0, addEventListener("resize", function() {
                    var r, c = g.getElementsByClassName("lazymatchmedia"),
                        _ = function() {
                            var T, t;
                            for (T = 0, t = c.length; T < t; T++) y(c[T])
                        };
                    return function() {
                        clearTimeout(r), r = setTimeout(_, 66)
                    }
                }()))
            },
            o = function(r, c) {
                var _, T = r.getAttribute("srcset") || r.getAttribute(R.srcsetAttr);
                !T && c && (T = r._lazypolyfill ? r._lazypolyfill._set : r.getAttribute(R.srcAttr) || r.getAttribute("src")), r._lazypolyfill && r._lazypolyfill._set == T || (_ = w(T || ""), c && r.parentNode && (_.isPicture = r.parentNode.nodeName.toUpperCase() == "PICTURE", _.isPicture && s.matchMedia && (a.aC(r, "lazymatchmedia"), M())), _._set = T, Object.defineProperty(r, "_lazypolyfill", {
                    value: _,
                    writable: !0
                }))
            },
            i = function(r) {
                var c = s.devicePixelRatio || 1,
                    _ = a.getX && a.getX(r);
                return Math.min(_ || c, 2.5, c)
            },
            f = function(r) {
                return s.matchMedia ? (f = function(c) {
                    return !c || (matchMedia(c) || {}).matches
                })(r) : !r
            },
            m = function(r) {
                var c, _, T, t, l, v, N;
                if (t = r, o(t, !0), l = t._lazypolyfill, l.isPicture) {
                    for (_ = 0, c = r.parentNode.getElementsByTagName("source"), T = c.length; _ < T; _++)
                        if (R.supportsType(c[_].getAttribute("type"), r) && f(c[_].getAttribute("media"))) {
                            t = c[_], o(t), l = t._lazypolyfill;
                            break
                        }
                }
                return l.length > 1 ? (N = t.getAttribute("sizes") || "", N = p.test(N) && parseInt(N, 10) || a.gW(r, r.parentNode), l.d = i(r), !l.src || !l.w || l.w < N ? (l.w = N, v = S(l.sort(n)), l.src = v) : v = l.src) : v = l[0], v
            },
            L = function(r) {
                if (!X || !r.parentNode || r.parentNode.nodeName.toUpperCase() == "PICTURE") {
                    var c = m(r);
                    c && c.u && r._lazypolyfill.cur != c.u && (r._lazypolyfill.cur = c.u, c.cached = !0, r.setAttribute(R.srcAttr, c.u), r.setAttribute("src", c.u))
                }
            };
        return L.parse = w, L
    }(), R.loadedClass && R.loadingClass && function() {
        var n = [];
        ['img[sizes$="px"][srcset].', "picture > img:not([srcset])."].forEach(function(p) {
            n.push(p + R.loadedClass), n.push(p + R.loadingClass)
        }), R.pf({
            elements: g.querySelectorAll(n.join(", "))
        })
    }())
}); /*! lazysizes - v4.1.8 */
(function(s, g) {
    var a = function() {
        g(s.lazySizes), s.removeEventListener("lazyunveilread", a, !0)
    };
    g = g.bind(null, s, s.document), typeof module == "object" && module.exports ? g(require("lazysizes")) : s.lazySizes ? a() : s.addEventListener("lazyunveilread", a, !0)
})(window, function(s, g, a) {
    "use strict";
    if (s.addEventListener) {
        var y = /\s+/g,
            R = /\s*\|\s+|\s+\|\s*/g,
            U = /^(.+?)(?:\s+\[\s*(.+?)\s*\])(?:\s+\[\s*(.+?)\s*\])?$/,
            X = /^\s*\(*\s*type\s*:\s*(.+?)\s*\)*\s*$/,
            $ = /\(|\)|'/,
            C = {
                contain: 1,
                cover: 1
            },
            n = function(o) {
                var i = a.gW(o, o.parentNode);
                return (!o._lazysizesWidth || i > o._lazysizesWidth) && (o._lazysizesWidth = i), o._lazysizesWidth
            },
            p = function(o) {
                var i;
                return i = (getComputedStyle(o) || {
                    getPropertyValue: function() {}
                }).getPropertyValue("background-size"), !C[i] && C[o.style.backgroundSize] && (i = o.style.backgroundSize), i
            },
            S = function(o, i) {
                if (i) {
                    var f = i.match(X);
                    f && f[1] ? o.setAttribute("type", f[1]) : o.setAttribute("media", lazySizesConfig.customMedia[i] || i)
                }
            },
            w = function(o, i, f) {
                var m = g.createElement("picture"),
                    L = i.getAttribute(lazySizesConfig.sizesAttr),
                    r = i.getAttribute("data-ratio"),
                    c = i.getAttribute("data-optimumx");
                i._lazybgset && i._lazybgset.parentNode == i && i.removeChild(i._lazybgset), Object.defineProperty(f, "_lazybgset", {
                    value: i,
                    writable: !0
                }), Object.defineProperty(i, "_lazybgset", {
                    value: m,
                    writable: !0
                }), o = o.replace(y, " ").split(R), m.style.display = "none", f.className = lazySizesConfig.lazyClass, o.length != 1 || L || (L = "auto"), o.forEach(function(_) {
                    var T, t = g.createElement("source");
                    L && L != "auto" && t.setAttribute("sizes", L), (T = _.match(U)) ? (t.setAttribute(lazySizesConfig.srcsetAttr, T[1]), S(t, T[2]), S(t, T[3])) : t.setAttribute(lazySizesConfig.srcsetAttr, _), m.appendChild(t)
                }), L && (f.setAttribute(lazySizesConfig.sizesAttr, L), i.removeAttribute(lazySizesConfig.sizesAttr), i.removeAttribute("sizes")), c && f.setAttribute("data-optimumx", c), r && f.setAttribute("data-ratio", r), m.appendChild(f), i.appendChild(m)
            },
            M = function(o) {
                if (o.target._lazybgset) {
                    var i = o.target,
                        f = i._lazybgset,
                        m = i.currentSrc || i.src;
                    if (m) {
                        var L = a.fire(f, "bgsetproxy", {
                            src: m,
                            useSrc: $.test(m) ? JSON.stringify(m) : m
                        });
                        L.defaultPrevented || (f.style.backgroundImage = "url(" + L.detail.useSrc + ")")
                    }
                    i._lazybgsetLoading && (a.fire(f, "_lazyloaded", {}, !1, !0), delete i._lazybgsetLoading)
                }
            };
        addEventListener("lazybeforeunveil", function(o) {
            var i, f, m;
            !o.defaultPrevented && (i = o.target.getAttribute("data-bgset")) && (m = o.target, f = g.createElement("img"), f.alt = "", f._lazybgsetLoading = !0, o.detail.firesLoad = !0, w(i, m, f), setTimeout(function() {
                a.loader.unveil(f), a.rAF(function() {
                    a.fire(f, "_lazyloaded", {}, !0, !0), f.complete && M({
                        target: f
                    })
                })
            }))
        }), g.addEventListener("load", M, !0), s.addEventListener("lazybeforesizes", function(o) {
            if (o.detail.instance == a && o.target._lazybgset && o.detail.dataAttr) {
                var i = o.target._lazybgset,
                    f = p(i);
                C[f] && (o.target._lazysizesParentFit = f, a.rAF(function() {
                    o.target.setAttribute("data-parent-fit", f), o.target._lazysizesParentFit && delete o.target._lazysizesParentFit
                }))
            }
        }, !0), g.documentElement.addEventListener("lazybeforesizes", function(o) {
            !o.defaultPrevented && o.target._lazybgset && o.detail.instance == a && (o.detail.width = n(o.target._lazybgset))
        })
    }
});
//# sourceMappingURL=/s/files/1/0610/6287/3301/t/2/assets/lazysizes.js.map?v=180904610732387730431637322525