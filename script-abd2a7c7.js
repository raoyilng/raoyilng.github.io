!function (t, e, i, n) {
    "use strict";
    t.images = [], t.options = t.options || {};
    var s, o, r, a, l = t.options, h = (l.testConn || !0, l.minKbpsForHighBandwidth || 300), c = l.speedTestUri || "http://foresightjs.appspot.com/speed-test/50K", d = l.speedTestKB || 50, u = l.speedTestExpireMinutes || 30, _ = l.hiResClassname || "fs-high-resolution", f = l.lowResClassname || "fs-standard-resolution", g = "devicePixelRatio", p = "devicePixelRatioRounded", m = "bandwidth", v = "connType", w = "connTestResult", y = "connKbps", T = "requestChange", M = "defaultSrc", S = "highResolutionSrc", b = "browserWidth", k = "browserHeight", P = "requestWidth", C = "requestHeight", E = "width", x = "height", L = "widthUnits", J = "heightUnits", A = "aspectRatio", I = "appliedImageSetItem", N = "scale", B = "scaleRounded", O = "uriTemplate", D = "uriFind", R = "uriReplace", H = "srcModification", V = "loading", U = "complete", Q = "fsjs", j = "auto", q = "percent", z = "pixel", K = "display", X = "auto", W = !0, Y = !1, F = /url\((?:([a-zA-Z-_0-9{}\?=&\\/.:\s]+)|([a-zA-Z-_0-9{}\?=&\\/.:\s]+)\|([a-zA-Z-_0-9{}\?=&\\/.:\s]+))\)/g, G = /[^\d]+/, $ = function () {
        s || (s = V, te(), s = U, se())
    }, Z = function (t, e) {
        if (i.createEvent) {
            var n = i.createEvent("Event");
            n.initEvent("foresight-" + t, W, W), e.dispatchEvent(n)
        }
    }, te = function () {
        var e, n;
        for (e = 0; e < i.images.length; e++)if (n = i.images[e], !n.ignore) {
            if (!n.initalized) {
                n.initalized = W, Z("imageInitStart", n), n[M] = ne(n, "src"), n[L] = ne(n, E, W), n[J] = ne(n, x, W);
                var s = ne(n, "aspect-ratio", Y);
                if (n[A] = s === j ? s : isNaN(s) || null === s ? 0 : parseFloat(s), !(n[M] && (n[L] && n[J] || n[A]))) {
                    n.ignore = W;
                    continue
                }
                n[S] = ne(n, "high-resolution-src"), n.orgClassName = n.className ? n.className : "", n.onerror = pe, Z("imageInitEnd", n), t.images.push(n)
            }
            n.imageSetText = de(n, "font-family", "fontFamily"), n.imageSet = [], n.imageSetText.length > 1 && ee(n, n.imageSetText.split("image-set(")[1])
        }
    }, ee = function (t, e) {
        var i, n, s, o = void 0 !== e && null !== e ? e.split(",") : [];
        for (i = 0; i < o.length; i++) {
            for (n = {
                text: o[i],
                weight: 0
            }, n.text.indexOf(" 1.5x") > -1 ? (n.weight++, n[N] = 1.5) : n.text.indexOf(" 2x") > -1 ? n[N] = 2 : n.text.indexOf(" 1x") > -1 && (n[N] = 1), n.text.indexOf(" high-bandwidth") > -1 ? n[m] = "high" : n.text.indexOf(" low-bandwidth") > -1 && (n[m] = "low"); s = F.exec(n.text);)null != s[1] && "" !== s[1] ? (n[O] = s[1], n.weight++) : null != s[2] && "" !== s[2] && (n[D] = s[2], n[R] = s[3], n.weight++);
            n[N] && n[m] ? n.weight += 2 : (n[N] || n[m]) && n.weight++, t.imageSet.push(n)
        }
        t.imageSet.sort(ie)
    }, ie = function (t, e) {
        return t.weight < e.weight ? 1 : t.weight > e.weight ? -1 : 0
    }, ne = function (t, e, i, n) {
        return n = t.getAttribute("data-" + e), i && null !== n ? isNaN(n) ? 0 : parseInt(n, 10) : n
    }, se = function () {
        if (o === U && s === U) {
            var e, i, n, r, a = t.images.length, l = [];
            for (e = 0; a > e; e++)i = t.images[e], le(i) && (Z("imageRebuildStart", i), n = i.orgClassName.split(" "), he(i), i.unitType == z && (r = "fs-" + i[b] + "x" + i[k], n.push(r), void 0 == l[r] && (l[r] = W, l.push("." + r + "{width:" + i[b] + "px;height:" + i[k] + "px}"))), "inline" !== i.style.display && (i.style.display = "inline"), ae(i), oe(i), t.hiResEnabled && i.src !== i[M] ? n.push(_) : n.push(f), n.push("fs-" + i[H]), i.className = n.join(" "), Z("imageRebuildEnd", i));
            l.length && ue(l), t.updateComplete && t.updateComplete(), ye = Me()
        }
    }, oe = function (e) {
        var i, n;
        e[I][N] > 1 && "high" === e[I][m] ? (i = void 0 === e[b] ? X : Math.round(e[b] * e[I][N]), n = void 0 === e[k] ? X : Math.round(e[k] * e[I][N]), t.hiResEnabled = W) : (i = void 0 === e[b] ? X : e[b], n = void 0 === e[k] ? X : e[k], t.hiResEnabled = Y), !e[P] || i > e[P] || e.activeImageSetText !== e.imageSetText ? (e[P] = i, e[C] = n, e[S] && t.hiResEnabled ? (e.src = e[S], e[H] = "src-hi-res") : e.src = re(e), e[T] = W, e.activeImageSetText = e.imageSetText) : e[T] = Y
    }, re = function (t) {
        return t[I][O] ? (t[H] = "src-uri-template", _e(t)) : t[I][D] && t[I][R] ? (t[H] = "src-find-replace", ge(t)) : (t[H] = "src-default", t[M])
    }, ae = function (e) {
        var i, n, s = {};
        for (i = 0; i < e.imageSet.length; i++)if (n = e.imageSet[i], n[N] && n[m]) {
            if (t[g] == n[N] && t[m] === n[m]) {
                s = n;
                break
            }
            if (Math.round(t[g]) == n[N] && t[m] === n[m]) {
                s = n;
                break
            }
        } else if (n[N]) {
            if (t[g] == n[N]) {
                s = n;
                break
            }
            if (Math.round(t[g]) == n[N]) {
                s = n;
                break
            }
        } else if (n[m]) {
            if (t[m] === n[m]) {
                s = n;
                break
            }
        } else s = n;
        s[N] || (s[N] = t[g]), s[m] || (s[m] = t[m]), s[B] = Math.round(s[N]), e[I] = s
    }, le = function (t, e) {
        return e = t.parentNode, e.clientWidth ? W : "inline" === de(e, "display") ? le(e) : Y
    }, he = function (t, e) {
        if (!t.unitType) {
            var i = t.style[K];
            t.style[K] = "none", e = de(t, E), t.style[K] = i, t[A] && "auto" === e || e.indexOf("%") > 0 ? t.unitType = q : (t.unitType = z, t[A] && t[A] !== j ? t[J] ? (t[b] = Math.round(t[HEIGHT_UNTIS] / t[A]), t[k] = t[J]) : (t[b] = t[L] || e.replace(G, ""), t[k] = Math.round(t[b] / t[A])) : (t[b] = t[L], t[k] = t[J]))
        }
        (t.unitType === q || t[A]) && (t.computedWidth = ce(t), t[b] = t.computedWidth, t[A] != j ? t[k] = Math.round(t[b] / t[A]) : t[J] && (t[k] = Math.round(t[J] * (t.computedWidth / t[L]))), t[k] && n.appVersion.indexOf("MSIE") > -1 && (t.style.height = t[k] + "px"))
    }, ce = function (t) {
        if (0 !== t.offsetWidth)return t.offsetWidth;
        var e, i, n = {}, s = {position: "absolute", visibility: "hidden", display: "block"};
        for (i in s)n[i] = t.style[i], t.style[i] = s[i];
        e = t.offsetWidth;
        for (i in s)t.style[i] = n[i];
        return e
    }, de = function (t, e, n) {
        return n || (n = e), t.currentStyle ? t.currentStyle[n] : i.defaultView.getComputedStyle(t, null).getPropertyValue(e)
    }, ue = function (t, e) {
        r || (r = i.createElement("style"), r.setAttribute("type", "text/css")), e = t.join("");
        try {
            r.innerHTML = e
        } catch (n) {
            r.styleSheet.cssText = e
        }
        null == r.parentElement && i.getElementsByTagName("head")[0].appendChild(r)
    }, _e = function (t) {
        var e, i = ["src", "protocol", "host", "port", "directory", "file", "filename", "ext", "query", P, C, N, B], n = t[I][O];
        for (t.uri = fe(t[M]), t.uri.src = t[M], t.uri[P] = t[P], t.uri[C] = t[C], t.uri[N] = t[I][N], t.uri[B] = t[I][B], e = 0; e < i.length; e++)n = n.replace("{" + i[e] + "}", t.uri[i[e]]);
        return n
    }, fe = function (t) {
        for (var e = {
            key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
            q: {name: "queryKey", parser: /(?:^|&)([^&=]*)=?([^&]*)/g},
            parser: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }, i = e.parser.exec(t), n = {}, s = 14; s--;)n[e.key[s]] = i[s] || "";
        n[e.q.name] = {}, n[e.key[12]].replace(e.q.parser, function (t, i, s) {
            i && (n[e.q.name][i] = s)
        });
        var o = n.file.split(".");
        return n.filename = o[0], n.ext = o.length > 1 ? o[o.length - 1] : "", n
    }, ge = function (t) {
        var e, i = t[I][D].replace("{browserWidth}", t[L]).replace("{browserHeight}", t[J]), n = t[M].replace(i, t[I][R]), s = [P, C, N, B];
        for (e = 0; e < s.length; e++)n = n.replace("{" + s[e] + "}", t[s[e]]);
        return n
    }, pe = function (t) {
        t = this, t.className = t.className.replace(_, f), t[H] = "response-error", t.hasError || t.src === t[M] || (t.hasError = W, t.src = t[M])
    }, me = function () {
        if (!o) {
            if (l.forcedBandwidth)return t[m] = l.forcedBandwidth, t[w] = "forced", o = U, void 0;
            if (1 === t[g])return t[w] = "skip", o = U, void 0;
            var e = n.connection || {type: "unknown"}, s = 3 == e.type || 4 == e.type || /^[23]g$/.test(e.type);
            if (t[v] = e.type, s)return t[w] = "connTypeSlow", o = U, void 0;
            try {
                var r = JSON.parse(localStorage.getItem(Q));
                if (null !== r && (new Date).getTime() < r.exp)return t[m] = r.bw, t[y] = r.kbps, t[w] = "localStorage", o = U, void 0
            } catch (a) {
            }
            var u, _, f, p = i.createElement("img");
            p.onload = function () {
                u = (new Date).getTime();
                var e = (u - _) / 1e3;
                e = e > 1 ? e : 1, t[y] = 8 * 1024 * d / e / 1024, t[m] = t[y] >= h ? "high" : "low", ve("networkSuccess")
            }, p.onerror = function () {
                ve("networkError", 5)
            }, p.onabort = function () {
                ve("networkAbort", 5)
            }, _ = (new Date).getTime(), o = V, "https:" === i.location.protocol && (c = c.replace("http:", "https:")), p.src = c + "?r=" + Math.random(), f = 1e3 * (8 * d / h) + 350, setTimeout(function () {
                ve("networkSlow")
            }, f)
        }
    }, ve = function (e, i) {
        if (o !== U) {
            o = U, t[w] = e;
            try {
                i || (i = u);
                var n = {kbps: t[y], bw: t[m], exp: (new Date).getTime() + 6e4 * i};
                localStorage.setItem(Q, JSON.stringify(n))
            } catch (s) {
            }
            se()
        }
    }, we = function () {
        e.addEventListener ? e.addEventListener("resize", Te, Y) : e.attachEvent && e.attachEvent("onresize", Te)
    }, ye = 0, Te = function () {
        ye !== Me() && t.reload()
    }, Me = function () {
        return i.documentElement.clientWidth || i.body && i.body.clientWidth || 1024
    }, Se = function () {
        s === U && o === U && (te(), se())
    };
    t.resolve = function (t, e) {
        e.imageSet = [], ee(e, t), ae(e), oe(e), e.src = re(e)
    }, t.reload = function () {
        e.clearTimeout(a), a = e.setTimeout(Se, 250)
    }, t.ready = function () {
        return i.body ? ($(), void 0) : e.setTimeout(t.ready, 1)
    }, i.readyState === U ? setTimeout(t.ready, 1) : i.addEventListener ? (i.addEventListener("DOMContentLoaded", t.ready, Y), e.addEventListener("load", t.ready, Y)) : i.attachEvent && (i.attachEvent("onreadystatechange", t.ready), e.attachEvent("onload", t.ready)), t[g] = e[g] ? e[g] : 1, l.forcedPixelRatio && (t[g] = l.forcedPixelRatio), t[p] = Math.round(t[g]), me(), we()
}(this.foresight = this.foresight || {}, this, document, navigator), /*!
 * VERSION: beta 1.10.3
 * DATE: 2013-09-02
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
    function (t) {
        "use strict";
        var e, i, n, s, o, r = t.GreenSockGlobals || t, a = function (t) {
            var e, i = t.split("."), n = r;
            for (e = 0; i.length > e; e++)n[i[e]] = n = n[i[e]] || {};
            return n
        }, l = a("com.greensock"), h = [].slice, c = function () {
        }, d = {}, u = function (e, i, n, s) {
            this.sc = d[e] ? d[e].sc : [], d[e] = this, this.gsClass = null, this.func = n;
            var o = [];
            this.check = function (l) {
                for (var h, c, _, f, g = i.length, p = g; --g > -1;)(h = d[i[g]] || new u(i[g], [])).gsClass ? (o[g] = h.gsClass, p--) : l && h.sc.push(this);
                if (0 === p && n)for (c = ("com.greensock." + e).split("."), _ = c.pop(), f = a(c.join("."))[_] = this.gsClass = n.apply(n, o), s && (r[_] = f, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + e.split(".").join("/"), [], function () {
                    return f
                }) : "undefined" != typeof module && module.exports && (module.exports = f)), g = 0; this.sc.length > g; g++)this.sc[g].check()
            }, this.check(!0)
        }, _ = t._gsDefine = function (t, e, i, n) {
            return new u(t, e, i, n)
        }, f = l._class = function (t, e, i) {
            return e = e || function () {
                }, _(t, [], function () {
                return e
            }, i), e
        };
        _.globals = r;
        var g = [0, 0, 1, 1], p = [], m = f("easing.Ease", function (t, e, i, n) {
            this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? g.concat(e) : g
        }, !0), v = m.map = {}, w = m.register = function (t, e, i, n) {
            for (var s, o, r, a, h = e.split(","), c = h.length, d = (i || "easeIn,easeOut,easeInOut").split(","); --c > -1;)for (o = h[c], s = n ? f("easing." + o, null, !0) : l.easing[o] || {}, r = d.length; --r > -1;)a = d[r], v[o + "." + a] = v[a + o] = s[a] = t.getRatio ? t : t[a] || new t
        };
        for (n = m.prototype, n._calcEnd = !1, n.getRatio = function (t) {
            if (this._func)return this._params[0] = t, this._func.apply(null, this._params);
            var e = this._type, i = this._power, n = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
            return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : .5 > t ? n / 2 : 1 - n / 2
        }, e = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], i = e.length; --i > -1;)n = e[i] + ",Power" + i, w(new m(null, null, 1, i), n, "easeOut", !0), w(new m(null, null, 2, i), n, "easeIn" + (0 === i ? ",easeNone" : "")), w(new m(null, null, 3, i), n, "easeInOut");
        v.linear = l.easing.Linear.easeIn, v.swing = l.easing.Quad.easeInOut;
        var y = f("events.EventDispatcher", function (t) {
            this._listeners = {}, this._eventTarget = t || this
        });
        n = y.prototype, n.addEventListener = function (t, e, i, n, r) {
            r = r || 0;
            var a, l, h = this._listeners[t], c = 0;
            for (null == h && (this._listeners[t] = h = []), l = h.length; --l > -1;)a = h[l], a.c === e && a.s === i ? h.splice(l, 1) : 0 === c && r > a.pr && (c = l + 1);
            h.splice(c, 0, {c: e, s: i, up: n, pr: r}), this !== s || o || s.wake()
        }, n.removeEventListener = function (t, e) {
            var i, n = this._listeners[t];
            if (n)for (i = n.length; --i > -1;)if (n[i].c === e)return n.splice(i, 1), void 0
        }, n.dispatchEvent = function (t) {
            var e, i, n, s = this._listeners[t];
            if (s)for (e = s.length, i = this._eventTarget; --e > -1;)n = s[e], n.up ? n.c.call(n.s || i, {
                type: t,
                target: i
            }) : n.c.call(n.s || i)
        };
        var T = t.requestAnimationFrame, M = t.cancelAnimationFrame, S = Date.now || function () {
                return (new Date).getTime()
            }, b = S();
        for (e = ["ms", "moz", "webkit", "o"], i = e.length; --i > -1 && !T;)T = t[e[i] + "RequestAnimationFrame"], M = t[e[i] + "CancelAnimationFrame"] || t[e[i] + "CancelRequestAnimationFrame"];
        f("Ticker", function (t, e) {
            var i, n, r, a, l, h = this, d = S(), u = e !== !1 && T, _ = function (t) {
                b = S(), h.time = (b - d) / 1e3;
                var e, s = h.time - l;
                (!i || s > 0 || t === !0) && (h.frame++, l += s + (s >= a ? .004 : a - s), e = !0), t !== !0 && (r = n(_)), e && h.dispatchEvent("tick")
            };
            y.call(h), h.time = h.frame = 0, h.tick = function () {
                _(!0)
            }, h.sleep = function () {
                null != r && (u && M ? M(r) : clearTimeout(r), n = c, r = null, h === s && (o = !1))
            }, h.wake = function () {
                null !== r && h.sleep(), n = 0 === i ? c : u && T ? T : function (t) {
                    return setTimeout(t, 0 | 1e3 * (l - h.time) + 1)
                }, h === s && (o = !0), _(2)
            }, h.fps = function (t) {
                return arguments.length ? (i = t, a = 1 / (i || 60), l = this.time + a, h.wake(), void 0) : i
            }, h.useRAF = function (t) {
                return arguments.length ? (h.sleep(), u = t, h.fps(i), void 0) : u
            }, h.fps(t), setTimeout(function () {
                u && (!r || 5 > h.frame) && h.useRAF(!1)
            }, 1500)
        }), n = l.Ticker.prototype = new l.events.EventDispatcher, n.constructor = l.Ticker;
        var k = f("core.Animation", function (t, e) {
            if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, R) {
                o || s.wake();
                var i = this.vars.useFrames ? D : R;
                i.add(this, i._time), this.vars.paused && this.paused(!0)
            }
        });
        s = k.ticker = new l.Ticker, n = k.prototype, n._dirty = n._gc = n._initted = n._paused = !1, n._totalTime = n._time = 0, n._rawPrevTime = -1, n._next = n._last = n._onUpdate = n._timeline = n.timeline = null, n._paused = !1;
        var P = function () {
            S() - b > 2e3 && s.wake(), setTimeout(P, 2e3)
        };
        P(), n.play = function (t, e) {
            return arguments.length && this.seek(t, e), this.reversed(!1).paused(!1)
        }, n.pause = function (t, e) {
            return arguments.length && this.seek(t, e), this.paused(!0)
        }, n.resume = function (t, e) {
            return arguments.length && this.seek(t, e), this.paused(!1)
        }, n.seek = function (t, e) {
            return this.totalTime(Number(t), e !== !1)
        }, n.restart = function (t, e) {
            return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
        }, n.reverse = function (t, e) {
            return arguments.length && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
        }, n.render = function () {
        }, n.invalidate = function () {
            return this
        }, n._enabled = function (t, e) {
            return o || s.wake(), this._gc = !t, this._active = t && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration, e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
        }, n._kill = function () {
            return this._enabled(!1, !1)
        }, n.kill = function (t, e) {
            return this._kill(t, e), this
        }, n._uncache = function (t) {
            for (var e = t ? this : this.timeline; e;)e._dirty = !0, e = e.timeline;
            return this
        }, n._swapSelfInParams = function (t) {
            for (var e = t.length, i = t.concat(); --e > -1;)"{self}" === t[e] && (i[e] = this);
            return i
        }, n.eventCallback = function (t, e, i, n) {
            if ("on" === (t || "").substr(0, 2)) {
                var s = this.vars;
                if (1 === arguments.length)return s[t];
                null == e ? delete s[t] : (s[t] = e, s[t + "Params"] = i instanceof Array && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, s[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e)
            }
            return this
        }, n.delay = function (t) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
        }, n.duration = function (t) {
            return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
        }, n.totalDuration = function (t) {
            return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
        }, n.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
        }, n.totalTime = function (t, e, i) {
            if (o || s.wake(), !arguments.length)return this._totalTime;
            if (this._timeline) {
                if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var n = this._totalDuration, r = this._timeline;
                    if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)for (; r._timeline;)r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                }
                this._gc && this._enabled(!0, !1), this._totalTime !== t && this.render(t, e, !1)
            }
            return this
        }, n.startTime = function (t) {
            return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
        }, n.timeScale = function (t) {
            if (!arguments.length)return this._timeScale;
            if (t = t || 1e-6, this._timeline && this._timeline.smoothChildTiming) {
                var e = this._pauseTime, i = e || 0 === e ? e : this._timeline.totalTime();
                this._startTime = i - (i - this._startTime) * this._timeScale / t
            }
            return this._timeScale = t, this._uncache(!1)
        }, n.reversed = function (t) {
            return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._totalTime, !0)), this) : this._reversed
        }, n.paused = function (t) {
            if (!arguments.length)return this._paused;
            if (t != this._paused && this._timeline) {
                o || t || s.wake();
                var e = this._timeline, i = e.rawTime(), n = i - this._pauseTime;
                !t && e.smoothChildTiming && (this._startTime += n, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = !t && this._totalTime > 0 && this._totalTime < this._totalDuration, t || 0 === n || 0 === this._duration || this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0)
            }
            return this._gc && !t && this._enabled(!0, !1), this
        };
        var C = f("core.SimpleTimeline", function (t) {
            k.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        n = C.prototype = new k, n.constructor = C, n.kill()._gc = !1, n._first = n._last = null, n._sortChildren = !1, n.add = n.insert = function (t, e) {
            var i, n;
            if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)for (n = t._startTime; i && i._startTime > n;)i = i._prev;
            return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._timeline && this._uncache(!0), this
        }, n._remove = function (t, e) {
            return t.timeline === this && (e || t._enabled(!1, !0), t.timeline = null, t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), this._timeline && this._uncache(!0)), this
        }, n.render = function (t, e, i) {
            var n, s = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = t; s;)n = s._next, (s._active || t >= s._startTime && !s._paused) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = n
        }, n.rawTime = function () {
            return o || s.wake(), this._totalTime
        };
        var E = f("TweenLite", function (e, i, n) {
            if (k.call(this, i, n), this.render = E.prototype.render, null == e)throw"Cannot tween a null target.";
            this.target = e = "string" != typeof e ? e : E.selector(e) || e;
            var s, o, r, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType), l = this.vars.overwrite;
            if (this._overwrite = l = null == l ? O[E.defaultOverwrite] : "number" == typeof l ? l >> 0 : O[l], (a || e instanceof Array) && "number" != typeof e[0])for (this._targets = r = h.call(e, 0), this._propLookup = [], this._siblings = [], s = 0; r.length > s; s++)o = r[s], o ? "string" != typeof o ? o.length && o !== t && o[0] && (o[0] === t || o[0].nodeType && o[0].style && !o.nodeType) ? (r.splice(s--, 1), this._targets = r = r.concat(h.call(o, 0))) : (this._siblings[s] = H(o, this, !1), 1 === l && this._siblings[s].length > 1 && V(o, this, null, 1, this._siblings[s])) : (o = r[s--] = E.selector(o), "string" == typeof o && r.splice(s + 1, 1)) : r.splice(s--, 1); else this._propLookup = {}, this._siblings = H(e, this, !1), 1 === l && this._siblings.length > 1 && V(e, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && this.render(-this._delay, !1, !0)
        }, !0), x = function (e) {
            return e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
        }, L = function (t, e) {
            var i, n = {};
            for (i in t)B[i] || i in e && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!A[i] || A[i] && A[i]._autoCSS) || (n[i] = t[i], delete t[i]);
            t.css = n
        };
        n = E.prototype = new k, n.constructor = E, n.kill()._gc = !1, n.ratio = 0, n._firstPT = n._targets = n._overwrittenProps = n._startAt = null, n._notifyPluginsOfEnabled = !1, E.version = "1.10.3", E.defaultEase = n._ease = new m(null, null, 1, 1), E.defaultOverwrite = "auto", E.ticker = s, E.autoSleep = !0, E.selector = t.$ || t.jQuery || function (e) {
                return t.$ ? (E.selector = t.$, t.$(e)) : t.document ? t.document.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e
            };
        var J = E._internals = {}, A = E._plugins = {}, I = E._tweenLookup = {}, N = 0, B = J.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1
        }, O = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        }, D = k._rootFramesTimeline = new C, R = k._rootTimeline = new C;
        R._startTime = s.time, D._startTime = s.frame, R._active = D._active = !0, k._updateRoot = function () {
            if (R.render((s.time - R._startTime) * R._timeScale, !1, !1), D.render((s.frame - D._startTime) * D._timeScale, !1, !1), !(s.frame % 120)) {
                var t, e, i;
                for (i in I) {
                    for (e = I[i].tweens, t = e.length; --t > -1;)e[t]._gc && e.splice(t, 1);
                    0 === e.length && delete I[i]
                }
                if (i = R._first, (!i || i._paused) && E.autoSleep && !D._first && 1 === s._listeners.tick.length) {
                    for (; i && i._paused;)i = i._next;
                    i || s.sleep()
                }
            }
        }, s.addEventListener("tick", k._updateRoot);
        var H = function (t, e, i) {
            var n, s, o = t._gsTweenID;
            if (I[o || (t._gsTweenID = o = "t" + N++)] || (I[o] = {
                    target: t,
                    tweens: []
                }), e && (n = I[o].tweens, n[s = n.length] = e, i))for (; --s > -1;)n[s] === e && n.splice(s, 1);
            return I[o].tweens
        }, V = function (t, e, i, n, s) {
            var o, r, a, l;
            if (1 === n || n >= 4) {
                for (l = s.length, o = 0; l > o; o++)if ((a = s[o]) !== e)a._gc || a._enabled(!1, !1) && (r = !0); else if (5 === n)break;
                return r
            }
            var h, c = e._startTime + 1e-10, d = [], u = 0, _ = 0 === e._duration;
            for (o = s.length; --o > -1;)(a = s[o]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (h = h || U(e, 0, _), 0 === U(a, h, _) && (d[u++] = a)) : c >= a._startTime && a._startTime + a.totalDuration() / a._timeScale + 1e-10 > c && ((_ || !a._initted) && 2e-10 >= c - a._startTime || (d[u++] = a)));
            for (o = u; --o > -1;)a = d[o], 2 === n && a._kill(i, t) && (r = !0), (2 !== n || !a._firstPT && a._initted) && a._enabled(!1, !1) && (r = !0);
            return r
        }, U = function (t, e, i) {
            for (var n = t._timeline, s = n._timeScale, o = t._startTime, r = 1e-10; n._timeline;) {
                if (o += n._startTime, s *= n._timeScale, n._paused)return -100;
                n = n._timeline
            }
            return o /= s, o > e ? o - e : i && o === e || !t._initted && 2 * r > o - e ? r : (o += t.totalDuration() / t._timeScale / s) > e + r ? 0 : o - e - r
        };
        n._init = function () {
            var t, e, i, n, s = this.vars, o = this._overwrittenProps, r = this._duration, a = s.immediateRender, l = s.ease;
            if (s.startAt) {
                if (this._startAt && this._startAt.render(-1, !0), s.startAt.overwrite = 0, s.startAt.immediateRender = !0, this._startAt = E.to(this.target, 0, s.startAt), a)if (this._time > 0)this._startAt = null; else if (0 !== r)return
            } else if (s.runBackwards && s.immediateRender && 0 !== r)if (this._startAt)this._startAt.render(-1, !0), this._startAt = null; else if (0 === this._time) {
                i = {};
                for (n in s)B[n] && "autoCSS" !== n || (i[n] = s[n]);
                return i.overwrite = 0, this._startAt = E.to(this.target, 0, i), void 0
            }
            if (this._ease = l ? l instanceof m ? s.easeParams instanceof Array ? l.config.apply(l, s.easeParams) : l : "function" == typeof l ? new m(l, s.easeParams) : v[l] || E.defaultEase : E.defaultEase, this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)for (t = this._targets.length; --t > -1;)this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], o ? o[t] : null) && (e = !0); else e = this._initProps(this.target, this._propLookup, this._siblings, o);
            if (e && E._onPluginEvent("_onInitAllProps", this), o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), s.runBackwards)for (i = this._firstPT; i;)i.s += i.c, i.c = -i.c, i = i._next;
            this._onUpdate = s.onUpdate, this._initted = !0
        }, n._initProps = function (e, i, n, s) {
            var o, r, a, l, h, c;
            if (null == e)return !1;
            this.vars.css || e.style && e !== t && e.nodeType && A.css && this.vars.autoCSS !== !1 && L(this.vars, e);
            for (o in this.vars) {
                if (c = this.vars[o], B[o])c instanceof Array && -1 !== c.join("").indexOf("{self}") && (this.vars[o] = c = this._swapSelfInParams(c, this)); else if (A[o] && (l = new A[o])._onInitTween(e, this.vars[o], this)) {
                    for (this._firstPT = h = {
                        _next: this._firstPT,
                        t: l,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: !0,
                        n: o,
                        pg: !0,
                        pr: l._priority
                    }, r = l._overwriteProps.length; --r > -1;)i[l._overwriteProps[r]] = this._firstPT;
                    (l._priority || l._onInitAllProps) && (a = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0)
                } else this._firstPT = i[o] = h = {
                    _next: this._firstPT,
                    t: e,
                    p: o,
                    f: "function" == typeof e[o],
                    n: o,
                    pg: !1,
                    pr: 0
                }, h.s = h.f ? e[o.indexOf("set") || "function" != typeof e["get" + o.substr(3)] ? o : "get" + o.substr(3)]() : parseFloat(e[o]), h.c = "string" == typeof c && "=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * Number(c.substr(2)) : Number(c) - h.s || 0;
                h && h._next && (h._next._prev = h)
            }
            return s && this._kill(s, e) ? this._initProps(e, i, n, s) : this._overwrite > 1 && this._firstPT && n.length > 1 && V(e, this, i, this._overwrite, n) ? (this._kill(i, e), this._initProps(e, i, n, s)) : a
        }, n.render = function (t, e, i) {
            var n, s, o, r = this._time;
            if (t >= this._duration)this._totalTime = this._time = this._duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, s = "onComplete"), 0 === this._duration && ((0 === t || 0 > this._rawPrevTime) && this._rawPrevTime !== t && (i = !0, this._rawPrevTime > 0 && (s = "onReverseComplete", e && (t = -1))), this._rawPrevTime = t); else if (1e-7 > t)this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== r || 0 === this._duration && this._rawPrevTime > 0) && (s = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, 0 === this._duration && (this._rawPrevTime >= 0 && (i = !0), this._rawPrevTime = t)) : this._initted || (i = !0); else if (this._totalTime = this._time = t, this._easeType) {
                var a = t / this._duration, l = this._easeType, h = this._easePower;
                (1 === l || 3 === l && a >= .5) && (a = 1 - a), 3 === l && (a *= 2), 1 === h ? a *= a : 2 === h ? a *= a * a : 3 === h ? a *= a * a * a : 4 === h && (a *= a * a * a * a), this.ratio = 1 === l ? 1 - a : 2 === l ? a : .5 > t / this._duration ? a / 2 : 1 - a / 2
            } else this.ratio = this._ease.getRatio(t / this._duration);
            if (this._time !== r || i) {
                if (!this._initted) {
                    if (this._init(), !this._initted)return;
                    this._time && !n ? this.ratio = this._ease.getRatio(this._time / this._duration) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._active || !this._paused && this._time !== r && t >= 0 && (this._active = !0), 0 === r && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : s || (s = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === this._duration) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || p))), o = this._firstPT; o;)o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
                this._onUpdate && (0 > t && this._startAt && this._startAt.render(t, e, i), e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || p)), s && (this._gc || (0 > t && this._startAt && !this._onUpdate && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[s] && this.vars[s].apply(this.vars[s + "Scope"] || this, this.vars[s + "Params"] || p)))
            }
        }, n._kill = function (t, e) {
            if ("all" === t && (t = null), null == t && (null == e || e === this.target))return this._enabled(!1, !1);
            e = "string" != typeof e ? e || this._targets || this.target : E.selector(e) || e;
            var i, n, s, o, r, a, l, h;
            if ((e instanceof Array || x(e)) && "number" != typeof e[0])for (i = e.length; --i > -1;)this._kill(t, e[i]) && (a = !0); else {
                if (this._targets) {
                    for (i = this._targets.length; --i > -1;)if (e === this._targets[i]) {
                        r = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], n = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all";
                        break
                    }
                } else {
                    if (e !== this.target)return !1;
                    r = this._propLookup, n = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                }
                if (r) {
                    l = t || r, h = t !== n && "all" !== n && t !== r && (null == t || t._tempKill !== !0);
                    for (s in l)(o = r[s]) && (o.pg && o.t._kill(l) && (a = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete r[s]), h && (n[s] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return a
        }, n.invalidate = function () {
            return this._notifyPluginsOfEnabled && E._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = !1, this._propLookup = this._targets ? {} : [], this
        }, n._enabled = function (t, e) {
            if (o || s.wake(), t && this._gc) {
                var i, n = this._targets;
                if (n)for (i = n.length; --i > -1;)this._siblings[i] = H(n[i], this, !0); else this._siblings = H(this.target, this, !0)
            }
            return k.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? E._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
        }, E.to = function (t, e, i) {
            return new E(t, e, i)
        }, E.from = function (t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new E(t, e, i)
        }, E.fromTo = function (t, e, i, n) {
            return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new E(t, e, n)
        }, E.delayedCall = function (t, e, i, n, s) {
            return new E(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                onCompleteScope: n,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                onReverseCompleteScope: n,
                immediateRender: !1,
                useFrames: s,
                overwrite: 0
            })
        }, E.set = function (t, e) {
            return new E(t, 0, e)
        }, E.killTweensOf = E.killDelayedCallsTo = function (t, e) {
            for (var i = E.getTweensOf(t), n = i.length; --n > -1;)i[n]._kill(e, t)
        }, E.getTweensOf = function (t) {
            if (null == t)return [];
            t = "string" != typeof t ? t : E.selector(t) || t;
            var e, i, n, s;
            if ((t instanceof Array || x(t)) && "number" != typeof t[0]) {
                for (e = t.length, i = []; --e > -1;)i = i.concat(E.getTweensOf(t[e]));
                for (e = i.length; --e > -1;)for (s = i[e], n = e; --n > -1;)s === i[n] && i.splice(e, 1)
            } else for (i = H(t).concat(), e = i.length; --e > -1;)i[e]._gc && i.splice(e, 1);
            return i
        };
        var Q = f("plugins.TweenPlugin", function (t, e) {
            this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = Q.prototype
        }, !0);
        if (n = Q.prototype, Q.version = "1.10.1", Q.API = 2, n._firstPT = null, n._addTween = function (t, e, i, n, s, o) {
                var r, a;
                return null != n && (r = "number" == typeof n || "=" !== n.charAt(1) ? Number(n) - i : parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2))) ? (this._firstPT = a = {
                    _next: this._firstPT,
                    t: t,
                    p: e,
                    s: i,
                    c: r,
                    f: "function" == typeof t[e],
                    n: s || e,
                    r: o
                }, a._next && (a._next._prev = a), a) : void 0
            }, n.setRatio = function (t) {
                for (var e, i = this._firstPT, n = 1e-6; i;)e = i.c * t + i.s, i.r ? e = 0 | e + (e > 0 ? .5 : -.5) : n > e && e > -n && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
            }, n._kill = function (t) {
                var e, i = this._overwriteProps, n = this._firstPT;
                if (null != t[this._propName])this._overwriteProps = []; else for (e = i.length; --e > -1;)null != t[i[e]] && i.splice(e, 1);
                for (; n;)null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                return !1
            }, n._roundProps = function (t, e) {
                for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
            }, E._onPluginEvent = function (t, e) {
                var i, n, s, o, r, a = e._firstPT;
                if ("_onInitAllProps" === t) {
                    for (; a;) {
                        for (r = a._next, n = s; n && n.pr > a.pr;)n = n._next;
                        (a._prev = n ? n._prev : o) ? a._prev._next = a : s = a, (a._next = n) ? n._prev = a : o = a, a = r
                    }
                    a = e._firstPT = s
                }
                for (; a;)a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), a = a._next;
                return i
            }, Q.activate = function (t) {
                for (var e = t.length; --e > -1;)t[e].API === Q.API && (A[(new t[e])._propName] = t[e]);
                return !0
            }, _.plugin = function (t) {
                if (!(t && t.propName && t.init && t.API))throw"illegal plugin definition.";
                var e, i = t.propName, n = t.priority || 0, s = t.overwriteProps, o = {
                    init: "_onInitTween",
                    set: "setRatio",
                    kill: "_kill",
                    round: "_roundProps",
                    initAll: "_onInitAllProps"
                }, r = f("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
                    Q.call(this, i, n), this._overwriteProps = s || []
                }, t.global === !0), a = r.prototype = new Q(i);
                a.constructor = r, r.API = t.API;
                for (e in o)"function" == typeof t[e] && (a[o[e]] = t[e]);
                return r.version = t.version, Q.activate([r]), r
            }, e = t._gsQueue) {
            for (i = 0; e.length > i; i++)e[i]();
            for (n in d)d[n].func || t.console.log("GSAP encountered missing dependency: com.greensock." + n)
        }
        o = !1
    }(window), /*!
 * VERSION: beta 1.9.3
 * DATE: 2013-04-02
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
    (window._gsQueue || (window._gsQueue = [])).push(function () {
        "use strict";
        window._gsDefine("easing.Back", ["easing.Ease"], function (t) {
            var e, i, n, s = window.GreenSockGlobals || window, o = s.com.greensock, r = 2 * Math.PI, a = Math.PI / 2, l = o._class, h = function (e, i) {
                var n = l("easing." + e, function () {
                }, !0), s = n.prototype = new t;
                return s.constructor = n, s.getRatio = i, n
            }, c = t.register || function () {
                }, d = function (t, e, i, n) {
                var s = l("easing." + t, {easeOut: new e, easeIn: new i, easeInOut: new n}, !0);
                return c(s, t), s
            }, u = function (t, e, i) {
                this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
            }, _ = function (e, i) {
                var n = l("easing." + e, function (t) {
                    this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                }, !0), s = n.prototype = new t;
                return s.constructor = n, s.getRatio = i, s.config = function (t) {
                    return new n(t)
                }, n
            }, f = d("Back", _("BackOut", function (t) {
                return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
            }), _("BackIn", function (t) {
                return t * t * ((this._p1 + 1) * t - this._p1)
            }), _("BackInOut", function (t) {
                return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
            })), g = l("easing.SlowMo", function (t, e, i) {
                e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
            }, !0), p = g.prototype = new t;
            return p.constructor = g, p.getRatio = function (t) {
                var e = t + (.5 - t) * this._p;
                return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
            }, g.ease = new g(.7, .7), p.config = g.config = function (t, e, i) {
                return new g(t, e, i)
            }, e = l("easing.SteppedEase", function (t) {
                t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
            }, !0), p = e.prototype = new t, p.constructor = e, p.getRatio = function (t) {
                return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
            }, p.config = e.config = function (t) {
                return new e(t)
            }, i = l("easing.RoughEase", function (e) {
                e = e || {};
                for (var i, n, s, o, r, a, l = e.taper || "none", h = [], c = 0, d = 0 | (e.points || 20), _ = d, f = e.randomize !== !1, g = e.clamp === !0, p = e.template instanceof t ? e.template : null, m = "number" == typeof e.strength ? .4 * e.strength : .4; --_ > -1;)i = f ? Math.random() : 1 / d * _, n = p ? p.getRatio(i) : i, "none" === l ? s = m : "out" === l ? (o = 1 - i, s = o * o * m) : "in" === l ? s = i * i * m : .5 > i ? (o = 2 * i, s = .5 * o * o * m) : (o = 2 * (1 - i), s = .5 * o * o * m), f ? n += Math.random() * s - .5 * s : _ % 2 ? n += .5 * s : n -= .5 * s, g && (n > 1 ? n = 1 : 0 > n && (n = 0)), h[c++] = {
                    x: i,
                    y: n
                };
                for (h.sort(function (t, e) {
                    return t.x - e.x
                }), a = new u(1, 1, null), _ = d; --_ > -1;)r = h[_], a = new u(r.x, r.y, a);
                this._prev = new u(0, 0, 0 !== a.t ? a : a.next)
            }, !0), p = i.prototype = new t, p.constructor = i, p.getRatio = function (t) {
                var e = this._prev;
                if (t > e.t) {
                    for (; e.next && t >= e.t;)e = e.next;
                    e = e.prev
                } else for (; e.prev && e.t >= t;)e = e.prev;
                return this._prev = e, e.v + (t - e.t) / e.gap * e.c
            }, p.config = function (t) {
                return new i(t)
            }, i.ease = new i, d("Bounce", h("BounceOut", function (t) {
                return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            }), h("BounceIn", function (t) {
                return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
            }), h("BounceInOut", function (t) {
                var e = .5 > t;
                return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
            })), d("Circ", h("CircOut", function (t) {
                return Math.sqrt(1 - (t -= 1) * t)
            }), h("CircIn", function (t) {
                return -(Math.sqrt(1 - t * t) - 1)
            }), h("CircInOut", function (t) {
                return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            })), n = function (e, i, n) {
                var s = l("easing." + e, function (t, e) {
                    this._p1 = t || 1, this._p2 = e || n, this._p3 = this._p2 / r * (Math.asin(1 / this._p1) || 0)
                }, !0), o = s.prototype = new t;
                return o.constructor = s, o.getRatio = i, o.config = function (t, e) {
                    return new s(t, e)
                }, s
            }, d("Elastic", n("ElasticOut", function (t) {
                return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * r / this._p2) + 1
            }, .3), n("ElasticIn", function (t) {
                return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * r / this._p2))
            }, .3), n("ElasticInOut", function (t) {
                return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * r / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * r / this._p2) + 1
            }, .45)), d("Expo", h("ExpoOut", function (t) {
                return 1 - Math.pow(2, -10 * t)
            }), h("ExpoIn", function (t) {
                return Math.pow(2, 10 * (t - 1)) - .001
            }), h("ExpoInOut", function (t) {
                return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
            })), d("Sine", h("SineOut", function (t) {
                return Math.sin(t * a)
            }), h("SineIn", function (t) {
                return -Math.cos(t * a) + 1
            }), h("SineInOut", function (t) {
                return -.5 * (Math.cos(Math.PI * t) - 1)
            })), l("easing.EaseLookup", {
                find: function (e) {
                    return t.map[e]
                }
            }, !0), c(s.SlowMo, "SlowMo", "ease,"), c(i, "RoughEase", "ease,"), c(e, "SteppedEase", "ease,"), f
        }, !0)
    }), window._gsDefine && window._gsQueue.pop()(), /*!
 * VERSION: beta 1.7.0
 * DATE: 2013-02-27
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
    (window._gsQueue || (window._gsQueue = [])).push(function () {
        "use strict";
        var t = document.documentElement, e = window, i = function (i, n) {
            var s = "x" === n ? "Width" : "Height", o = "scroll" + s, r = "client" + s, a = document.body;
            return i === e || i === t || i === a ? Math.max(t[o], a[o]) - Math.max(t[r], a[r]) : i[o] - i["offset" + s]
        }, n = window._gsDefine.plugin({
            propName: "scrollTo", API: 2, init: function (t, n, s) {
                return this._wdw = t === e, this._target = t, this._tween = s, "object" != typeof n && (n = {y: n}), this._autoKill = n.autoKill !== !1, this.x = this.xPrev = this.getX(), this.y = this.yPrev = this.getY(), null != n.x ? this._addTween(this, "x", this.x, "max" === n.x ? i(t, "x") : n.x, "scrollTo_x", !0) : this.skipX = !0, null != n.y ? this._addTween(this, "y", this.y, "max" === n.y ? i(t, "y") : n.y, "scrollTo_y", !0) : this.skipY = !0, !0
            }, set: function (t) {
                this._super.setRatio.call(this, t);
                var i = this._wdw || !this.skipX ? this.getX() : this.xPrev, n = this._wdw || !this.skipY ? this.getY() : this.yPrev;
                n - this.yPrev, i - this.xPrev, this._wdw ? e.scrollTo(this.skipX ? i : this.x, this.skipY ? n : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)), this.xPrev = this.x, this.yPrev = this.y
            }
        }), s = n.prototype;
        n.max = i, s.getX = function () {
            return this._wdw ? null != e.pageXOffset ? e.pageXOffset : null != t.scrollLeft ? t.scrollLeft : document.body.scrollLeft : this._target.scrollLeft
        }, s.getY = function () {
            return this._wdw ? null != e.pageYOffset ? e.pageYOffset : null != t.scrollTop ? t.scrollTop : document.body.scrollTop : this._target.scrollTop
        }, s._kill = function (t) {
            return console.log("KILL"), t.scrollTo_x && (this.skipX = !0), t.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, t)
        }
    }), window._gsDefine && window._gsQueue.pop()(), function (t) {
    var e = t.document;
    if (!location.hash && t.addEventListener) {
        t.scrollTo(0, 1);
        var i = 1, n = function () {
            return t.pageYOffset || "CSS1Compat" === e.compatMode && e.documentElement.scrollTop || e.body.scrollTop || 0
        }, s = setInterval(function () {
            e.body && (clearInterval(s), i = n(), t.scrollTo(0, 1 === i ? 0 : 1))
        }, 15);
        t.addEventListener("load", function () {
            setTimeout(function () {
                n() < 20 && t.scrollTo(0, 1 === i ? 0 : 1)
            }, 0)
        }, !1)
    }
}(this), function (t) {
    function e(t, e, i, n, s) {
        this._listener = e, this._isOnce = i, this.context = n, this._signal = t, this._priority = s || 0
    }

    function i(t, e) {
        if ("function" != typeof t)throw Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}", e))
    }

    function n() {
        this._bindings = [], this._prevParams = null;
        var t = this;
        this.dispatch = function () {
            n.prototype.dispatch.apply(t, arguments)
        }
    }

    e.prototype = {
        active: !0, params: null, execute: function (t) {
            var e;
            return this.active && this._listener && (t = this.params ? this.params.concat(t) : t, e = this._listener.apply(this.context, t), this._isOnce && this.detach()), e
        }, detach: function () {
            return this.isBound() ? this._signal.remove(this._listener, this.context) : null
        }, isBound: function () {
            return !!this._signal && !!this._listener
        }, isOnce: function () {
            return this._isOnce
        }, getListener: function () {
            return this._listener
        }, getSignal: function () {
            return this._signal
        }, _destroy: function () {
            delete this._signal, delete this._listener, delete this.context
        }, toString: function () {
            return "[SignalBinding isOnce:" + this._isOnce + ", isBound:" + this.isBound() + ", active:" + this.active + "]"
        }
    }, n.prototype = {
        VERSION: "1.0.0",
        memorize: !1,
        _shouldPropagate: !0,
        active: !0,
        _registerListener: function (t, i, n, s) {
            var o = this._indexOfListener(t, n);
            if (-1 !== o) {
                if (t = this._bindings[o], t.isOnce() !== i)throw Error("You cannot add" + (i ? "" : "Once") + "() then add" + (i ? "Once" : "") + "() the same listener without removing the relationship first.")
            } else t = new e(this, t, i, n, s), this._addBinding(t);
            return this.memorize && this._prevParams && t.execute(this._prevParams), t
        },
        _addBinding: function (t) {
            var e = this._bindings.length;
            do--e; while (this._bindings[e] && t._priority <= this._bindings[e]._priority);
            this._bindings.splice(e + 1, 0, t)
        },
        _indexOfListener: function (t, e) {
            for (var i, n = this._bindings.length; n--;)if (i = this._bindings[n], i._listener === t && i.context === e)return n;
            return -1
        },
        has: function (t, e) {
            return -1 !== this._indexOfListener(t, e)
        },
        add: function (t, e, n) {
            return i(t, "add"), this._registerListener(t, !1, e, n)
        },
        addOnce: function (t, e, n) {
            return i(t, "addOnce"), this._registerListener(t, !0, e, n)
        },
        remove: function (t, e) {
            i(t, "remove");
            var n = this._indexOfListener(t, e);
            return -1 !== n && (this._bindings[n]._destroy(), this._bindings.splice(n, 1)), t
        },
        removeAll: function () {
            for (var t = this._bindings.length; t--;)this._bindings[t]._destroy();
            this._bindings.length = 0
        },
        getNumListeners: function () {
            return this._bindings.length
        },
        halt: function () {
            this._shouldPropagate = !1
        },
        dispatch: function () {
            if (this.active) {
                var t, e = Array.prototype.slice.call(arguments), i = this._bindings.length;
                if (this.memorize && (this._prevParams = e), i) {
                    t = this._bindings.slice(), this._shouldPropagate = !0;
                    do i--; while (t[i] && this._shouldPropagate && t[i].execute(e) !== !1)
                }
            }
        },
        forget: function () {
            this._prevParams = null
        },
        dispose: function () {
            this.removeAll(), delete this._bindings, delete this._prevParams
        },
        toString: function () {
            return "[Signal active:" + this.active + " numListeners:" + this.getNumListeners() + "]"
        }
    };
    var s = n;
    s.Signal = n, "function" == typeof define && define.amd ? define(function () {
        return s
    }) : "undefined" != typeof module && module.exports ? module.exports = s : t.signals = s
}(this), function () {
    function t(t) {
        if (this._element = t, t.className != this.classCache) {
            this._classCache = t.className;
            var e, i = this._classCache.split(" ");
            for (e = 0; e < i.length; e++)o.call(this, i[e])
        }
    }

    function e(t, e) {
        t.className = e.join(" ")
    }

    function i(t, e, i) {
        Object.defineProperty ? Object.defineProperty(t, e, {get: i}) : t.__defineGetter__(e, i)
    }

    if (!("undefined" == typeof Element || "classList" in document.documentElement)) {
        var n = [].indexOf, s = [].slice, o = [].push, r = [].splice, a = [].join;
        t.prototype = {
            add: function (t) {
                o.call(this, t), e(this._element, s.call(this, 0))
            }, contains: function (t) {
                return -1 !== n.call(this, t)
            }, item: function (t) {
                return this[t] || null
            }, remove: function (t) {
                var i = n.call(this, t);
                -1 !== i && (r.call(this, i, 1), e(this._element, s.call(this, 0)))
            }, toString: function () {
                return a.call(this, " ")
            }, toggle: function (t) {
                -1 === n.call(this, t) ? this.add(t) : this.remove(t)
            }
        }, window.DOMTokenList = t, i(Element.prototype, "classList", function () {
            return new t(this)
        })
    }
}(), window.UTILS = {
    closest: function (t, e) {
        for (var i = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector; t;) {
            if (t == window.document)return !1;
            if (i.bind(t)(e))return t;
            t = t.parentNode
        }
        return !1
    }, findPos: function (t) {
        var e = 0;
        if (t.offsetParent) {
            do e += t.offsetTop; while (t = t.offsetParent);
            return e
        }
        return t.offsetTop
    }, getNodePosition: function (t) {
        for (var e = left = 0; t;)if (t.tagName)e += t.offsetTop, left += t.offsetLeft, t = t.offsetParent; else {
            if (1 !== t.parentNode.nodeType)break;
            t = t.parentNode
        }
        return [e, left]
    }, getAllElementsWithAttributeValue: function (t, e, i, n) {
        for (var s = [], o = t.getElementsByClassName(e), r = 0; r < o.length; r++)o[r].getAttribute(i) === n && s.push(o[r]);
        return s
    }, getInternetExplorerVersion: function () {
        var t = -1;
        if ("Microsoft Internet Explorer" == navigator.appName) {
            var e = navigator.userAgent, i = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
            null != i.exec(e) && (t = parseFloat(RegExp.$1))
        }
        return t
    }, getScrollMaxY: function () {
        var t;
        return t = window.innerHeight ? window.innerHeight : document.body.clientHeight, yWithScroll = window.innerHeight && window.scrollMaxY ? window.innerHeight + window.scrollMaxY : document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight, yWithScroll - t
    }, getScrollTop: function () {
        var t = document.documentElement, e = document.body;
        return window.scrollY || t && t.scrollTop || e && e.scrollTop || 0
    }
};
var JJ = JJ || {};
!function (t, e) {
    "use strict";
    var i = function (t) {
        this.init(t)
    }, n = i.prototype, s = i;
    n.init = function (t) {
        t && (this._config = t), this.initModel(), this.initView()
    }, n.initView = function () {
        this._view = new e.views.View({model: this._model})
    }, n.initModel = function () {
        this._model = new e.models.Model({config: this._config})
    }, e.App = s
}(window, JJ);
var JJ = JJ || {};
JJ.models = JJ.models || {}, function (t, e) {
    "use strict";
    var i = function () {
        this.init()
    }, n = i.prototype, s = i;
    n.init = function () {
        this._inPresentationMode = !1, this._activeSlide = null, this._slides = document.getElementsByClassName("js-slide"), this._slideCount = this._slides.length, this._curSlideIndex = 0, this._events = {slideChanged: new signals.Signal}
    }, n.gotoSlide = function (t) {
        this._curSlideIndex = this.getSlideIndexByValue(t), this._events.slideChanged.dispatch(this._slides[this._curSlideIndex])
    }, n.nextSlide = function () {
        var t = null;
        this._inPresentationMode ? this._curSlideIndex + 1 < this._slideCount && (t = this._curSlideIndex + 1) : (this.enablePresentationMode(), t = this.getNextSlideIndex()), null !== t && t !== this._curSlideIndex && (this._curSlideIndex = t, this._events.slideChanged.dispatch(this._slides[this._curSlideIndex]))
    }, n.prevSlide = function () {
        var t = null;
        this._inPresentationMode ? this._curSlideIndex - 1 >= 0 && (t = this._curSlideIndex - 1) : (this.enablePresentationMode(), t = this.getPrevSlideIndex()), null !== t && t !== this._curSlideIndex && (this._curSlideIndex = t, this._events.slideChanged.dispatch(this._slides[this._curSlideIndex]))
    }, n.getNextSlideIndex = function () {
        for (var t = this.getDocumentCenterPoint(), e = 0; e < this._slideCount && !(this.getSlidePosition(this._slides[e]) > t); e++);
        return e
    }, n.getPrevSlideIndex = function () {
        for (var t = this.getDocumentCenterPoint(), e = this._slideCount - 1; e >= 0 && !(this.getSlidePosition(this._slides[e]) + 1 < t); e--);
        return e
    }, n.getDocumentCenterPoint = function () {
        return t.UTILS.getScrollTop() + .5 * t.innerHeight
    }, n.getSlidePosition = function (e) {
        return t.UTILS.findPos(e) + .5 * e.clientHeight
    }, n.getSlideOnScreen = function () {
    }, n.getSlideIndexByValue = function (t) {
        for (var e = 0; e < this._slides.length; e++)if (this._slides[e] === t)return e
    }, n.disablePresentationMode = function () {
        this._inPresentationMode = !1
    }, n.enablePresentationMode = function () {
        this._inPresentationMode = !0
    }, n.inPresentationMode = function () {
        return this._inPresentationMode
    }, n.getEvents = function () {
        return this._events
    }, e.models.PresentationModel = s
}(window, JJ);
var JJ = JJ || {};
JJ.models = JJ.models || {}, function (t, e) {
    "use strict";
    var i = function () {
        this.init()
    }, n = i.prototype, s = i;
    n.init = function () {
        this._curActiveBlockId = 0, this._prevActiveBlockId = 0, this._events = {
            activeBlockChanged: new signals.Signal,
            scrollToBlock: new signals.Signal
        }
    }, n.setActiveBlockId = function (t) {
        t !== this._curActiveBlockId && (this._prevActiveBlockId = this._curActiveBlockId, this._curActiveBlockId = t, this._events.activeBlockChanged.dispatch(t))
    }, n.scrollToBlock = function (t, e) {
        this._events.scrollToBlock.dispatch(t, e)
    }, n.scrollToElement = function () {
    }, n.getCurActiveBlockId = function () {
        return this._curActiveBlockId
    }, n.getPrevActiveBlockId = function () {
        return this._prevActiveBlockId
    }, n.getEvents = function () {
        return this._events
    }, e.models.BlocksModel = s
}(window, JJ);
var JJ = JJ || {};
JJ.models = JJ.models || {}, function (t, e) {
    "use strict";
    var i = function () {
        this.init()
    }, n = i.prototype, s = i;
    n.STATE_EXPANDED = "STATE_EXPANDED", n.STATE_COLLAPSED = "STATE_COLLAPSED", n.init = function () {
        this._state = n.STATE_COLLAPSED, this._events = {stateChanged: new signals.Signal}
    }, n.expand = function () {
        this.setState(n.STATE_EXPANDED)
    }, n.collapse = function () {
        this.setState(n.STATE_COLLAPSED)
    }, n.toggle = function () {
        this._state === n.STATE_COLLAPSED ? this.setState(n.STATE_EXPANDED) : this.setState(n.STATE_COLLAPSED)
    }, n.setState = function (t) {
        this._state !== t && (this._state = t, this._events.stateChanged.dispatch(t))
    }, n.getState = function () {
        return this._state
    }, n.getEvents = function () {
        return this._events
    }, e.models.NavModel = s
}(window, JJ);
var JJ = JJ || {};
JJ.models = JJ.models || {}, function (t, e) {
    "use strict";
    var i = function () {
        this.init()
    }, n = i.prototype, s = i;
    n.init = function () {
        this.prevMQ = null, this.curMQ = this.getCurMQ(), this._events = {mqChanged: new signals.Signal}, this.addEventListeners()
    }, n.addEventListeners = function () {
        t.addEventListener("resize", this.resize.bind(this), !1)
    }, n.resize = function () {
        var t = this.getCurMQ();
        t !== this._curMQ && (this._prevMQ = this._curMQ, this._curMQ = t, this._events.mqChanged.dispatch(this._curMQ, this._prevMQ))
    }, n.getPrevMQ = function () {
        return this._prevMQ
    }, n.getCurMQ = function () {
        var e = t.getComputedStyle(document.body, ":after").getPropertyValue("content");
        return e.split('"').length > 2 && (e = e.substring(1, e.length - 1)), e
    }, n.getEvents = function () {
        return this._events
    }, e.models.MQModel = s
}(window, JJ);
var JJ = JJ || {};
JJ.models = JJ.models || {}, function (t, e) {
    "use strict";
    var i = function () {
        this.init()
    }, n = i.prototype, s = i;
    s.CAT = {
        INBOUND_LINKS: "INBOUND_LINKS",
        OUTBOUND_LINKS: "OUTBOUND_LINKS",
        BLOCKS: "BLOCKS"
    }, s.ACTIONS = {CLICK: "click", VIEWING: "viewing"}, n.init = function () {
        this._trackedLabels = [], this._timeout = null, this.initLinkTracking()
    }, n.initLinkTracking = function () {
        for (var i = document.getElementsByTagName("a"), n = this, s = 0, o = i.length; o > s; s++)i[s].addEventListener("click", function (i) {
            var s = i.target, o = s.href, r = !1;
            o || (s = t.UTILS.closest(i.target, "a"), o = s.href), (i.metaKey || i.ctrlKey || "_blank" === s.target) && (r = !0), n.trackEvent(e.models.TrackingModel.CAT.OUTBOUND_LINKS, e.models.TrackingModel.ACTIONS.CLICK, o), r || (i.preventDefault(), document.location.href = o)
        })
    }, n.isLabelTracked = function (t) {
        return this._trackedLabels.indexOf(t)
    }, n.trackEventWithDelay = function (t, e, i, n) {
        var s = this;
        null !== this._timeout && clearTimeout(this._timeout), this._timeout = setTimeout(function () {
            s._timeout = null, s.trackEventOnce(t, e, i)
        }, n)
    }, n.trackEventOnce = function (t, i, n) {
        if (t === e.models.TrackingModel.CAT.BLOCKS) {
            if (this.isLabelTracked(n) > -1)return;
            this._trackedLabels.push(n)
        }
        this.trackEvent(t, i, n)
    }, n.trackEvent = function (t, e, i) {
        ga("send", "event", t, e, i)
    }, e.models.TrackingModel = s
}(window, JJ);
var JJ = JJ || {};
JJ.models = JJ.models || {}, function (t, e) {
    "use strict";
    var i = function (t) {
        this.init(t)
    }, n = i.prototype, s = i;
    n.init = function (t) {
        t && (this._config = t.config), this._device = this._config.device, this._events = {ready: new signals.Signal}, this.initSubModels(), this._events.ready.dispatch()
    }, n.initSubModels = function () {
        this.initNavModel(), this.initMQModel(), this.initBlocksModel(), this.initTrackingModel(), this.initPresentationModel()
    }, n.initBlocksModel = function () {
        var t = this;
        this._blocksModel = new e.models.BlocksModel, this._blocksModel.getEvents().activeBlockChanged.add(function (i) {
            var n = document.getElementById("block--" + i), s = Math.max(.7 * n.clientHeight, 1500);
            t._trackingModel.trackEventWithDelay(e.models.TrackingModel.CAT.BLOCKS, e.models.TrackingModel.ACTIONS.VIEWING, i, void 0, void 0, s)
        })
    }, n.initNavModel = function () {
        this._navModel = new e.models.NavModel
    }, n.initMQModel = function () {
        this._mqModel = new e.models.MQModel
    }, n.initTrackingModel = function () {
        this._trackingModel = new e.models.TrackingModel
    }, n.initPresentationModel = function () {
        this._presentationModel = new e.models.PresentationModel
    }, n.toggleDebugMode = function () {
        document.getElementsByTagName("body")[0].classList.toggle("debug-mode")
    }, n.getNavModel = function () {
        return this._navModel
    }, n.getMQModel = function () {
        return this._mqModel
    }, n.getBlocksModel = function () {
        return this._blocksModel
    }, n.getTrackingModel = function () {
        return this._trackingModel
    }, n.getPresentationModel = function () {
        return this._presentationModel
    }, n.getConfig = function () {
        return this._config
    }, n.getDevice = function () {
        return this._device
    }, n.isTouch = function () {
        return this._device.touch
    }, n.getEvents = function () {
        return this._events
    }, e.models.Model = s
}(window, JJ);
var JJ = JJ || {};
JJ.views = JJ.views || {}, function (t, e) {
    "use strict";
    var i = function (t) {
        this.init(t)
    }, n = i.prototype, s = i;
    n.init = function () {
    }, n.resize = function () {
    }, n.mqChanged = function () {
    }, e.views.AView = s
}(window, JJ);
var JJ = JJ || {};
JJ.views = JJ.views || {}, function (t, e) {
    "use strict";
    var i = function () {
    }, n = i.prototype = new e.views.AView, s = i;
    n.init = function (t) {
        t && (this._model = t.model, this._scrollManager = t.scrollManager, this._elClassName = t.elClassName, this._elContentClassName = t.elContentClassName, this._elPlaceholderClassName = t.elPlaceholderClassName), this._el = document.getElementsByClassName(this._elClassName)[0], this._elContent = document.getElementsByClassName(this._elContentClassName)[0], this._elPlaceholder = document.getElementsByClassName(this._elPlaceholderClassName)[0], this.scrollUpdatedBinded = this.scrollUpdated.bind(this), this._running = !1, this.addListeners(), this.updateHeight()
    }, n.addListeners = function () {
        this.addParallaxListeners()
    }, n.addParallaxListeners = function () {
        "SCROLLMODE_PARALAX" === this._scrollManager.getScrollMode() && this._scrollManager.getEvents().scrollPositionChanged.add(this.scrollUpdatedBinded)
    }, n.removeListeners = function () {
        this._scrollManager.getEvents().scrollPositionChanged.remove(this.scrollUpdatedBinded)
    }, n.updateHeight = function () {
        "extra-small" !== this._model.getMQModel().getCurMQ() && (this._windowInnerHeight = t.innerHeight)
    }, n.reset = function () {
        this.removeListeners(), this._el.style.webkitTransform = "", this._el.style.msTransform = "", this._el.style.transform = ""
    }, n.scrollUpdated = function () {
    }, n.mqChanged = function (t, e) {
        switch (e) {
            case"extra-small":
                this.addListeners()
        }
        switch (t) {
            case"extra-small":
                this.reset()
        }
    }, n.resize = function () {
        this.updateHeight()
    }, e.views.AParallaxView = s
}(window, JJ);
var JJ = JJ || {};
JJ.views = JJ.views || {}, function (t, e) {
    "use strict";
    var i = function (t) {
        this.init(t)
    }, n = i.prototype, s = i;
    n.init = function (t) {
        t && (this._model = t.model), this._events = {changeSlide: new signals.Signal}, this._body = document.getElementsByTagName("body")[0], this.addListeners()
    }, n.addListeners = function () {
        this._body.addEventListener("keydown", this.onKeyPress.bind(this))
    }, n.onKeyPress = function (t) {
        switch (t.keyCode) {
            case 68:
                this._model.getConfig().debugMode && this._model.toggleDebugMode();
                break;
            case 38:
                t.preventDefault(), this._model.getPresentationModel().prevSlide();
                break;
            case 40:
                t.preventDefault(), this._model.getPresentationModel().nextSlide()
        }
    }, n.resize = function () {
    }, n.getEvents = function () {
        return this._events
    }, e.views.KeyManager = s
}(window, JJ);
var JJ = JJ || {};
JJ.views = JJ.views || {}, function (t, e) {
    "use strict";
    var i = function (t) {
        this.init(t)
    }, n = i.prototype, s = i;
    n.SCROLLMODE_DEFAULT = "SCROLLMODE_DEFAULT", n.SCROLLMODE_PARALAX = "SCROLLMODE_PARALAX", n.init = function (t) {
        t && (this._model = t.model), this._presentationModel = this._model.getPresentationModel(), this._document = document.documentElement, this._body = document.body, this._events = {
            scrollPositionChanged: new signals.Signal,
            scrollInterval: new signals.Signal,
            scrollModeChanged: new signals.Signal
        }, this._body = document.getElementsByTagName("body")[0], this.setScrollMode(!1), this.addListeners()
    }, n.setScrollMode = function (t) {
        var e = this._model.getMQModel().getCurMQ(), i = this._scrollMode;
        "extra-small" === e || this._model.getDevice().touch || !this._model.getDevice().cssTransforms3d ? (this._body.classList.remove("parallax-enabled"), this._scrollMode = this.SCROLLMODE_DEFAULT) : (this._body.classList.add("parallax-enabled"), this._scrollMode = this.SCROLLMODE_PARALAX), t && i !== this._scrollMode && this._events.scrollModeChanged.dispatch(this._scrollMode)
    }, n.addListeners = function () {
        this._didScroll = !1, t.addEventListener("scroll", this.onScroll.bind(this)), this.scrollInterval = setInterval(this.onScrollInterval.bind(this), 250)
    }, n.scrollToPosition = function (e, i, n) {
        console.log("ScrollManager - scrollToPosition", e, i, n);
        var s = this.getMaxScrollTop();
        if (e > s && (e = s), void 0 === n && (n = 1), this._scrollingToPosition = !0, i) {
            var o = this;
            TweenLite.to(t, n, {
                scrollTo: {y: e}, ease: Expo.easeInOut, overwrite: !0, onComplete: function () {
                    o._scrollingToPosition = !1
                }
            })
        } else t.scrollY = e
    }, n.onScroll = function () {
        this._scrollTop = t.scrollY || this._document && this._document.scrollTop || this._body && this._body.scrollTop || 0, this._events.scrollPositionChanged.dispatch(this._scrollTop), this._didScroll = !0
    }, n.onScrollInterval = function () {
        this._didScroll && (this._scrollingToPosition || this._presentationModel.disablePresentationMode(), this._didScroll = !1, this._events.scrollInterval.dispatch(this._scrollTop))
    }, n.resize = function () {
        this.onScroll()
    }, n.mqChanged = function () {
        this.setScrollMode(!0)
    }, n.getMaxScrollTop = function () {
        var e = t.UTILS.getScrollMaxY();
        return "extra-small" === this._model.getMQModel().getCurMQ() && (e -= document.getElementsByClassName("nav")[0].clientHeight - document.getElementsByClassName("nav-toggle")[0].clientHeight), e
    }, n.getScrollMode = function () {
        return this._scrollMode
    }, n.getEvents = function () {
        return this._events
    }, e.views.ScrollManager = s
}(window, JJ);
var JJ = JJ || {};
JJ.views = JJ.views || {}, function (t, e) {
    "use strict";
    var i = function (t) {
        this.init(t)
    }, n = i.prototype = new e.views.AView, s = i;
    n.init = function (t) {
        t && (this._model = t.model, this._scrollManager = t.scrollManager), this._nav = document.getElementsByClassName("nav")[0], this._updateRunning = !1, this._projectList = document.getElementsByClassName("project-list")[0], this.onScrollModeChanged(this._scrollManager.getScrollMode()), this.addListeners(), this.mqChanged(this._model.getMQModel().getCurMQ())
    }, n.addListeners = function () {
        this._model.getBlocksModel().getEvents().scrollToBlock.add(this.scrollToBlock.bind(this)), this._scrollManager.getEvents().scrollInterval.add(this.updateActiveBlock.bind(this)), this._scrollManager.getEvents().scrollModeChanged.add(this.onScrollModeChanged.bind(this))
    }, n.onScrollModeChanged = function (t) {
        this._blocks = t === e.views.ScrollManager.prototype.SCROLLMODE_DEFAULT ? document.getElementsByClassName("js-block") : document.querySelectorAll(".js-block-parallax, .projects-content > .js-block")
    }, n.scrollToBlock = function (t, e) {
        var i = this.getBlockTopPosition(t.toString());
        this._scrollManager.scrollToPosition(i, e)
    }, n.getBlockTopPosition = function (e) {
        var i = 0, n = this.getBlock(e);
        return "extra-small" === this._model.getMQModel().getCurMQ() && (i -= this._projectList.clientHeight), i += t.UTILS.findPos(n)
    }, n.getBlock = function (t) {
        for (var e = null, i = 0, n = this._blocks.length; n > i; i++)if (this._blocks[i].getAttribute("data-block-id") === t) {
            e = this._blocks[i];
            break
        }
        if (null === e)throw Error("BlocksView - Block is null");
        return this._blocks[i]
    }, n.updateActiveBlock = function (e) {
        if (!this._updateRunning) {
            this._updateRunning = !0;
            for (var i = .2 * t.innerHeight, n = this, s = 0, o = 0, r = this._blocks.length; r > o; o++) {
                var a = this._blocks[o], l = a.clientHeight, h = t.UTILS.findPos(a);
                "extra-small" === this._model.getMQModel().getCurMQ() && (h -= this._nav.clientHeight), s = h + a.clientHeight - i, e + i > h && h + l > e + i && n._model.getBlocksModel().setActiveBlockId(a.getAttribute("data-block-id"))
            }
            this._updateRunning = !1
        }
    }, e.views.BlocksView = s
}(window, JJ);
var JJ = JJ || {};
JJ.views = JJ.views || {}, function (t, e) {
    "use strict";
    var i = function () {
    }, n = i.prototype = new e.views.AParallaxView, s = i;
    n.addListeners = function () {
        this.addParallaxListeners();
        var t = this;
        this._scrollIndicator = document.getElementsByClassName("scroll-indicator")[0], this._scrollIndicator.addEventListener("click", function () {
            var e = document.getElementsByClassName("project")[0];
            t._model.getBlocksModel().scrollToBlock(e.getAttribute("data-block-id"), !0)
        })
    }, n.updateHeight = function () {
        "extra-small" !== this._model.getMQModel().getCurMQ() && (this._windowInnerHeight = t.innerHeight, this._threshold = .25 * this._windowInnerHeight)
    }, n.scrollUpdated = function (t) {
        if (!this._running) {
            this._running = !0;
            var e, i = this._elContent.classList.contains("is-hidden"), n = this._scrollIndicator.classList.contains("is-hidden");
            t > 10 && !n ? this._scrollIndicator.classList.add("is-hidden") : 10 > t && n && this._scrollIndicator.classList.remove("is-hidden"), t > this._threshold && !i ? this._elContent.classList.add("is-hidden") : t < this._threshold && i && this._elContent.classList.remove("is-hidden"), e = "translate3d(0px," + .25 * -t + "px, 0px)", this._el.style.webkitTransform = e, this._el.style.msTransform = e, this._el.style.transform = e, this._running = !1
        }
    }, e.views.HomeView = s
}(window, JJ);
var JJ = JJ || {};
JJ.views = JJ.views || {}, function (t, e) {
    "use strict";
    var i = function () {
    }, n = i.prototype = new e.views.AParallaxView, s = i;
    n.scrollUpdated = function (t) {
        if (!this._running) {
            this._running = !0;
            var e, i = this._elContent.classList.contains("is-hidden"), n = this._elPlaceholder.offsetTop - .3 * this._windowInnerHeight;
            t > n && i ? this._elContent.classList.remove("is-hidden") : n > t && !i && this._elContent.classList.add("is-hidden"), e = "translate3d(0px," + .25 * (this._elPlaceholder.offsetTop - t) + "px, 0px)", this._el.style.webkitTransform = e, this._el.style.msTransform = e, this._el.style.transform = e, this._running = !1
        }
    }, e.views.ContactView = s
}(window, JJ);
var JJ = JJ || {};
JJ.views = JJ.views || {}, function (t, e) {


    "use strict";

    var i = function (t) {
        this.init(t)
    }, n = i.prototype = new e.views.AView, s = i;
    console.log(n);
    n.init = function (t) {
        t && (this._model = t.model), this.startX = 0, this.startY = 0, this.touchHasMoved = !1, this._navModel = this._model.getNavModel(), this._blocksModel = this._model.getBlocksModel(), this._mqModel = this._model.getMQModel(), this._body = document.getElementsByTagName("body")[0], this._nav = document.getElementsByClassName("nav")[0], this._projectListHolder = document.getElementsByClassName("project-list-holder")[0], this._projectList = document.getElementsByClassName("project-list")[0], this._toggle = document.getElementsByClassName("nav-toggle")[0], this._inputEventClick = this._model.getDevice().touch ? "touchstart" : "click", this.bodyClickHandler = this.onBodyClick.bind(this), this._timer = null, this._nav.classList.add("is-disabled"), this.update(), this.addListeners()
    }, n.addListeners = function () {
        this._model.getDevice().touch ? (this._projectList.addEventListener("touchstart", this.onTouchStart.bind(this), !1), this._projectList.addEventListener("touchmove", this.onTouchMove.bind(this), !1), this._projectList.addEventListener("touchend", this.onTouchEnd.bind(this), !1)) : this._projectList.addEventListener(this._inputEventClick, this.onItemClick.bind(this), !1), this._toggle.addEventListener(this._inputEventClick, this.onToggleClick.bind(this), !1), this._navModel.getEvents().stateChanged.add(this.onStateChanged.bind(this)), this._blocksModel.getEvents().activeBlockChanged.add(this.onActiveBlockChanged.bind(this))
    }, n.onToggleClick = function (t) {
        console.log("onToggleClick"), t.preventDefault();
        console.log(this._navModel.getState());
        console.log(e.models.NavModel.prototype.STATE_EXPANDED);
        var i = this._navModel.getState() === e.models.NavModel.prototype.STATE_EXPANDED ? "close-nav" : "open-nav";
        console.log(i);
        this._model.getTrackingModel().trackEvent(e.models.TrackingModel.CAT.INBOUND_LINKS, e.models.TrackingModel.ACTIONS.CLICK, i), this._navModel.toggle()
    },n.onBodyClick = function (e) {
        e.preventDefault(), t.UTILS.closest(e.target, ".nav") || this._navModel.collapse()
    }, n.onTouchStart = function (t) {
        t.stopPropagation(), this.startX = t.touches[0].clientX, this.startY = t.touches[0].clientY, this.touchHasMoved = !1
    }, n.onTouchMove = function (t) {
        (Math.abs(t.touches[0].clientX - this.startX) > 10 || Math.abs(t.touches[0].clientY - this.startY) > 10) && (this.touchHasMoved = !0)
    }, n.onTouchEnd = function (t) {
        t.preventDefault(), this.touchHasMoved || "touchend" === t.type && this.onItemClick(t)
    }, n.onItemClick = function (t) {
        t.preventDefault();
        var i = t.target;
        i.classList.contains("project-list__item__title") && (i = i.parentNode);
        var n = i.getAttribute("data-block-id");
        this.blockExists(n) && (this._model.getTrackingModel().trackEvent(e.models.TrackingModel.CAT.INBOUND_LINKS, e.models.TrackingModel.ACTIONS.CLICK, "nav-item--" + n), this._navModel.toggle(), this._blocksModel.scrollToBlock(n, !0), this._model.getPresentationModel().disablePresentationMode())
    }, n.blockExists = function (t) {
        return null !== document.getElementById("block--" + t)
    }, n.onStateChanged = function (t) {
        if (t === e.models.NavModel.prototype.STATE_EXPANDED)this._nav.classList.remove("is-disabled"), clearTimeout(this._timer); else {
            var i = this;
            this._timer = setTimeout(function () {
                console.log("hit timer!"), i._nav.classList.add("is-disabled")
            }, 600)
        }
        this._body.classList.toggle("nav-expanded"), this._nav.classList.toggle("is-active"), this.update(), this.updateNavHeight(t)
    }, n.onActiveBlockChanged = function (t) {
        var e = this._projectList.getElementsByClassName("is-active");
        e.length && e[0].classList.toggle("is-active");
        var i = document.getElementById("project-list__item--" + t);
        i && i.classList.add("is-active")
    }, n.updateNavHeight = function (t) {
        if ("extra-small" === this._mqModel.getCurMQ()) {
            var i;
            i = t === e.models.NavModel.prototype.STATE_EXPANDED ? this._projectListHolderHeight + "px" : this._toggleHeight + "px", this._nav.style.height = i
        }
    }, n.updateProjectListHolder = function () {
        "extra-small" !== this._mqModel.getCurMQ() ? (this._projectListHolder.style.height = 2 * t.innerHeight + "px", this._projectListHolder.style.marginTop = -(t.innerHeight / 2) + "px") : (this._projectListHolder.style.height = "", this._projectListHolder.style.marginTop = ""), this._projectListHolderHeight = this._projectListHolder.clientHeight
    }, n.updateToggleHeight = function () {
        this._toggleHeight = this._toggle.clientHeight - 1
    }, n.update = function () {
        this.updateToggleHeight(), this.updateProjectListHolder()
    }, n.mqChanged = function (t, e) {
        switch (e) {
            case"extra-small":
                this.update(), this._nav.style.height = ""
        }
        switch (t) {
            case"extra-small":
                this.update(), this.updateNavHeight(this._navModel.getState())
        }
    }, n.resize = function () {
        this.updateProjectListHolder()
    }, e.views.NavView = s



}(window, JJ);
var JJ = JJ || {};
JJ.views = JJ.views || {}, function (t, e) {
    "use strict";
    var i = function (t) {
        this.init(t)
    }, n = i.prototype, s = i;
    n.init = function (t) {
        console.log(t.container), this._container = t.container, this._iframe = this._container.getElementsByTagName("iframe")[0], this._oriWidth = this._iframe.getAttribute("width"), this._oriHeight = this._iframe.getAttribute("height"), this.resize()
    }, n.resize = function () {
        var t = this._container.clientWidth / this._oriWidth * this._oriHeight;
        this._iframe.setAttribute("width", this._container.clientWidth), this._iframe.setAttribute("height", t)
    }, n.mqChanged = function () {
    }, e.views.VimeoPlayerView = s
}(window, JJ);
var JJ = JJ || {};
JJ.views = JJ.views || {}, function (t, e) {
    "use strict";
    var i = function (t) {
        this.init(t)
    }, n = i.prototype = new e.views.AView, s = i;
    n.init = function (t) {
        t && (this._model = t.model), this._presentationModel = this._model.getPresentationModel(), this._subViews = [], this._managers = [], this.initManagers(), this.initSubViews(), this.addListeners(), this.onResize()
    }, n.initManagers = function () {
        this.initKeyManager(), this.initScrollManager(), this.presentationManager(), this.initVimeoPlayers()
    }, n.initSubViews = function () {
        this._navView = this.initSubView("NavView", {model: this._model}), this._blocksView = this.initSubView("BlocksView", {
            model: this._model,
            scrollManager: this._scrollManager
        }), this._homeView = this.initSubView("HomeView", {}), this._homeView.init({
            model: this._model,
            scrollManager: this._scrollManager,
            elClassName: "home",
            elContentClassName: "home-content",
            elPlaceholderClassName: "home-placeholder"
        }), this._contactView = this.initSubView("ContactView", {}), this._contactView.init({
            model: this._model,
            scrollManager: this._scrollManager,
            elClassName: "contact",
            elContentClassName: "contact-inner",
            elPlaceholderClassName: "contact-placeholder"
        })
    }, n.initSubView = function (t, i) {
        var n = new e.views[t](i);
        return this._subViews.push(n), n
    }, n.initScrollManager = function () {
        this._scrollManager = new e.views.ScrollManager({model: this._model}), this._managers.push(this._scrollManager)
    }, n.initVimeoPlayers = function () {
        for (var t = document.getElementsByClassName("vimeo-container"), e = 0; e < t.length; e++)this.initSubView("VimeoPlayerView", {container: t[e]})
    }, n.presentationManager = function () {
        var e = document.getElementsByTagName("body")[0], i = this;
        this._model.getPresentationModel().getEvents().slideChanged.add(this.onSlideChanged.bind(this)), e.addEventListener("click", function (e) {
            var n = e.target, s = t.UTILS.closest(n, ".js-slide");
            n.classList.contains("project__img") && void 0 !== n && s && i._model.getPresentationModel().gotoSlide(s)
        }, !1)
    }, n.onSlideChanged = function (t) {
        this._scrollManager.scrollToPosition(this.getCenteredPosition(t), !0, .8)
    }, n.getCenteredPosition = function (e) {
        return t.UTILS.findPos(e) + .5 * e.clientHeight - .5 * t.innerHeight
    }, n.initKeyManager = function () {
        this._keyManager = new e.views.KeyManager({model: this._model}), this._managers.push(this._keyManager)
    }, n.addListeners = function () {
        t.addEventListener("resize", this.onResize.bind(this), !1), this._model.getMQModel().getEvents().mqChanged.add(this.onMQChanged.bind(this))
    }, n.onResize = function () {
        for (var e = t.innerWidth, i = t.innerHeight, n = 0, s = this._managers.length; s > n; n++)this._managers[n].resize(e, i);
        for (var o = 0, r = this._subViews.length; r > o; o++)this._subViews[o].resize(e, i);
        this._presentationModel.disablePresentationMode()
    }, n.onMQChanged = function (t, e) {
        for (var i = 0, n = this._managers.length; n > i; i++)this._managers[i].resize(t, e);
        for (var s = 0, o = this._subViews.length; o > s; s++)this._subViews[s].mqChanged(t, e)
    }, e.views.View = s
}(window, JJ), function () {
    "use strict";
    new JJ.App({
        debugMode: !0,
        device: {touch: Modernizr.touch, cssTransforms3d: Modernizr.csstransforms3d},
        system: {ie: window.UTILS.getInternetExplorerVersion()}
    })
}();