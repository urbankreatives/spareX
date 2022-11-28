(function() {
    var a, r = function(o, t) {
        return function() {
            return o.apply(t, arguments)
        }
    };
    a = function() {
        function o() {}
        return o.prototype.extend = function(t, e) {
            var n, i;
            for (n in t) i = t[n], i != null && (e[n] = i);
            return e
        }, o.prototype.isMobile = function(t) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
        }, o
    }(), this.WOW = function() {
        o.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0
        };

        function o(t) {
            t == null && (t = {}), this.scrollCallback = r(this.scrollCallback, this), this.scrollHandler = r(this.scrollHandler, this), this.start = r(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults)
        }
        return o.prototype.init = function() {
            var t;
            return this.element = window.document.documentElement, (t = document.readyState) === "interactive" || t === "complete" ? this.start() : document.addEventListener("DOMContentLoaded", this.start)
        }, o.prototype.start = function() {
            var t, e, n, i;
            if (this.boxes = this.element.getElementsByClassName(this.config.boxClass), this.boxes.length) {
                if (this.disabled()) return this.resetStyle();
                for (i = this.boxes, e = 0, n = i.length; e < n; e++) t = i[e], this.applyStyle(t, !0);
                return window.addEventListener("scroll", this.scrollHandler, !1), window.addEventListener("resize", this.scrollHandler, !1), this.interval = setInterval(this.scrollCallback, 50)
            }
        }, o.prototype.stop = function() {
            if (window.removeEventListener("scroll", this.scrollHandler, !1), window.removeEventListener("resize", this.scrollHandler, !1), this.interval != null) return clearInterval(this.interval)
        }, o.prototype.show = function(t) {
            return this.applyStyle(t), t.className = "" + t.className + " " + this.config.animateClass
        }, o.prototype.applyStyle = function(t, e) {
            var n, i, s;
            return i = t.getAttribute("data-wow-duration"), n = t.getAttribute("data-wow-delay"), s = t.getAttribute("data-wow-iteration"), t.setAttribute("style", this.customStyle(e, i, n, s))
        }, o.prototype.resetStyle = function() {
            var t, e, n, i, s;
            for (i = this.boxes, s = [], e = 0, n = i.length; e < n; e++) t = i[e], s.push(t.setAttribute("style", "visibility: visible;"));
            return s
        }, o.prototype.customStyle = function(t, e, n, i) {
            var s;
            return s = t ? "visibility: hidden; -webkit-animation-name: none; -moz-animation-name: none; animation-name: none;" : "visibility: visible;", e && (s += "-webkit-animation-duration: " + e + "; -moz-animation-duration: " + e + "; animation-duration: " + e + ";"), n && (s += "-webkit-animation-delay: " + n + "; -moz-animation-delay: " + n + "; animation-delay: " + n + ";"), i && (s += "-webkit-animation-iteration-count: " + i + "; -moz-animation-iteration-count: " + i + "; animation-iteration-count: " + i + ";"), s
        }, o.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }, o.prototype.scrollCallback = function() {
            var t;
            if (this.scrolled && (this.scrolled = !1, this.boxes = function() {
                    var e, n, i, s;
                    for (i = this.boxes, s = [], e = 0, n = i.length; e < n; e++)
                        if (t = i[e], !!t) {
                            if (this.isVisible(t)) {
                                this.show(t);
                                continue
                            }
                            s.push(t)
                        }
                    return s
                }.call(this), !this.boxes.length)) return this.stop()
        }, o.prototype.offsetTop = function(t) {
            var e;
            for (e = t.offsetTop; t = t.offsetParent;) e += t.offsetTop;
            return e
        }, o.prototype.isVisible = function(t) {
            var e, n, i, s, l;
            return n = t.getAttribute("data-wow-offset") || this.config.offset, l = window.pageYOffset, s = l + this.element.clientHeight - n, i = this.offsetTop(t), e = i + t.clientHeight, i <= s && e >= l
        }, o.prototype.util = function() {
            return this._util || (this._util = new a)
        }, o.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, o
    }()
}).call(this), wow = new WOW({
    animateClass: "animated",
    offset: 100
}), wow.init();
//# sourceMappingURL=/s/files/1/0610/6287/3301/t/2/assets/wow.js.map?v=86079650418477997931638881386