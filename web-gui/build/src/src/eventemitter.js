"use strict";
/**
 * Minified by jsDelivr using Terser v5.14.1.
 * Original file: /npm/eventemitter2@6.4.9/lib/eventemitter2.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
!function (e) { var t = Object.hasOwnProperty, r = Array.isArray ? Array.isArray : function (e) { return "[object Array]" === Object.prototype.toString.call(e); }, n = "object" == typeof process && "function" == typeof process.nextTick, i = "function" == typeof Symbol, s = "object" == typeof Reflect, o = "function" == typeof setImmediate ? setImmediate : setTimeout, l = i ? s && "function" == typeof Reflect.ownKeys ? Reflect.ownKeys : function (e) { var t = Object.getOwnPropertyNames(e); return t.push.apply(t, Object.getOwnPropertySymbols(e)), t; } : Object.keys; function a() { this._events = {}, this._conf && f.call(this, this._conf); } function f(t) { t && (this._conf = t, t.delimiter && (this.delimiter = t.delimiter), t.maxListeners !== e && (this._maxListeners = t.maxListeners), t.wildcard && (this.wildcard = t.wildcard), t.newListener && (this._newListener = t.newListener), t.removeListener && (this._removeListener = t.removeListener), t.verboseMemoryLeak && (this.verboseMemoryLeak = t.verboseMemoryLeak), t.ignoreErrors && (this.ignoreErrors = t.ignoreErrors), this.wildcard && (this.listenerTree = {})); } function h(e, t) { var r = "(node) warning: possible EventEmitter memory leak detected. " + e + " listeners added. Use emitter.setMaxListeners() to increase limit."; if (this.verboseMemoryLeak && (r += " Event name: " + t + "."), "undefined" != typeof process && process.emitWarning) {
    var n = new Error(r);
    n.name = "MaxListenersExceededWarning", n.emitter = this, n.count = e, process.emitWarning(n);
}
else
    console.error(r), console.trace && console.trace(); } var c = function (e, t, r) { var n = arguments.length; switch (n) {
    case 0: return [];
    case 1: return [e];
    case 2: return [e, t];
    case 3: return [e, t, r];
    default:
        for (var i = new Array(n); n--;)
            i[n] = arguments[n];
        return i;
} }; function u(t, r) { for (var n = {}, i = t.length, s = r ? r.length : 0, o = 0; o < i; o++)
    n[t[o]] = o < s ? r[o] : e; return n; } function p(e, t, r) { var n, i; if (this._emitter = e, this._target = t, this._listeners = {}, this._listenersCount = 0, (r.on || r.off) && (n = r.on, i = r.off), t.addEventListener ? (n = t.addEventListener, i = t.removeEventListener) : t.addListener ? (n = t.addListener, i = t.removeListener) : t.on && (n = t.on, i = t.off), !n && !i)
    throw Error("target does not implement any known event API"); if ("function" != typeof n)
    throw TypeError("on method must be a function"); if ("function" != typeof i)
    throw TypeError("off method must be a function"); this._on = n, this._off = i; var s = e._observers; s ? s.push(this) : e._observers = [this]; } function v(r, n, i, s) { var o = Object.assign({}, n); if (!r)
    return o; if ("object" != typeof r)
    throw TypeError("options must be an object"); var l, a, f, h = Object.keys(r), c = h.length; function u(e) { throw Error('Invalid "' + l + '" option value' + (e ? ". Reason: " + e : "")); } for (var p = 0; p < c; p++) {
    if (l = h[p], !s && !t.call(n, l))
        throw Error('Unknown "' + l + '" option');
    (a = r[l]) !== e && (f = i[l], o[l] = f ? f(a, u) : a);
} return o; } function y(e, t) { return "function" == typeof e && e.hasOwnProperty("prototype") || t("value must be a constructor"), e; } function _(e) { var t = "value must be type of " + e.join("|"), r = e.length, n = e[0], i = e[1]; return 1 === r ? function (e, r) { if (typeof e === n)
    return e; r(t); } : 2 === r ? function (e, r) { var s = typeof e; if (s === n || s === i)
    return e; r(t); } : function (n, i) { for (var s = typeof n, o = r; o-- > 0;)
    if (s === e[o])
        return n; i(t); }; } Object.assign(p.prototype, { subscribe: function (e, t, r) { var n = this, i = this._target, s = this._emitter, o = this._listeners, l = function () { var n = c.apply(null, arguments), o = { data: n, name: t, original: e }; if (r) {
        var l = r.call(i, o);
        !1 !== l && s.emit.apply(s, [o.name].concat(n));
    }
    else
        s.emit.apply(s, [t].concat(n)); }; if (o[e])
        throw Error("Event '" + e + "' is already listening"); this._listenersCount++, s._newListener && s._removeListener && !n._onNewListener ? (this._onNewListener = function (r) { r === t && null === o[e] && (o[e] = l, n._on.call(i, e, l)); }, s.on("newListener", this._onNewListener), this._onRemoveListener = function (r) { r === t && !s.hasListeners(r) && o[e] && (o[e] = null, n._off.call(i, e, l)); }, o[e] = null, s.on("removeListener", this._onRemoveListener)) : (o[e] = l, n._on.call(i, e, l)); }, unsubscribe: function (e) { var t, r, n, i = this, s = this._listeners, o = this._emitter, a = this._off, f = this._target; if (e && "string" != typeof e)
        throw TypeError("event must be a string"); function h() { i._onNewListener && (o.off("newListener", i._onNewListener), o.off("removeListener", i._onRemoveListener), i._onNewListener = null, i._onRemoveListener = null); var e = w.call(o, i); o._observers.splice(e, 1); } if (e) {
        if (!(t = s[e]))
            return;
        a.call(f, e, t), delete s[e], --this._listenersCount || h();
    }
    else {
        for (n = (r = l(s)).length; n-- > 0;)
            e = r[n], a.call(f, e, s[e]);
        this._listeners = {}, this._listenersCount = 0, h();
    } } }); var m = _(["function"]), d = _(["object", "function"]); function b(e, t, r) { var n, i, s, o = 0, l = new e((function (a, f, h) { function c() { i && (i = null), o && (clearTimeout(o), o = 0); } r = v(r, { timeout: 0, overload: !1 }, { timeout: function (e, t) { return ("number" != typeof (e *= 1) || e < 0 || !Number.isFinite(e)) && t("timeout must be a positive number"), e; } }), n = !r.overload && "function" == typeof e.prototype.cancel && "function" == typeof h; var u = function (e) { c(), a(e); }, p = function (e) { c(), f(e); }; n ? t(u, p, h) : (i = [function (e) { p(e || Error("canceled")); }], t(u, p, (function (e) { if (s)
    throw Error("Unable to subscribe on cancel event asynchronously"); if ("function" != typeof e)
    throw TypeError("onCancel callback must be a function"); i.push(e); })), s = !0), r.timeout > 0 && (o = setTimeout((function () { var e = Error("timeout"); e.code = "ETIMEDOUT", o = 0, l.cancel(e), f(e); }), r.timeout)); })); return n || (l.cancel = function (e) { if (i) {
    for (var t = i.length, r = 1; r < t; r++)
        i[r](e);
    i[0](e), i = null;
} }), l; } function w(e) { var t = this._observers; if (!t)
    return -1; for (var r = t.length, n = 0; n < r; n++)
    if (t[n]._target === e)
        return n; return -1; } function g(e, t, r, n, i) { if (!r)
    return null; if (0 === n) {
    var s = typeof t;
    if ("string" === s) {
        var o, a, f = 0, h = 0, c = this.delimiter, u = c.length;
        if (-1 !== (a = t.indexOf(c))) {
            o = new Array(5);
            do {
                o[f++] = t.slice(h, a), h = a + u;
            } while (-1 !== (a = t.indexOf(c, h)));
            o[f++] = t.slice(h), t = o, i = f;
        }
        else
            t = [t], i = 1;
    }
    else
        "object" === s ? i = t.length : (t = [t], i = 1);
} var p, v, y, _, m, d, b, w = null, L = t[n], E = t[n + 1]; if (n === i)
    r._listeners && ("function" == typeof r._listeners ? (e && e.push(r._listeners), w = [r]) : (e && e.push.apply(e, r._listeners), w = [r]));
else {
    if ("*" === L) {
        for (a = (d = l(r)).length; a-- > 0;)
            "_listeners" !== (p = d[a]) && (b = g(e, t, r[p], n + 1, i)) && (w ? w.push.apply(w, b) : w = b);
        return w;
    }
    if ("**" === L) {
        for ((m = n + 1 === i || n + 2 === i && "*" === E) && r._listeners && (w = g(e, t, r, i, i)), a = (d = l(r)).length; a-- > 0;)
            "_listeners" !== (p = d[a]) && ("*" === p || "**" === p ? (r[p]._listeners && !m && (b = g(e, t, r[p], i, i)) && (w ? w.push.apply(w, b) : w = b), b = g(e, t, r[p], n, i)) : b = g(e, t, r[p], p === E ? n + 2 : n, i), b && (w ? w.push.apply(w, b) : w = b));
        return w;
    }
    r[L] && (w = g(e, t, r[L], n + 1, i));
} if ((v = r["*"]) && g(e, t, v, n + 1, i), y = r["**"])
    if (n < i)
        for (y._listeners && g(e, t, y, i, i), a = (d = l(y)).length; a-- > 0;)
            "_listeners" !== (p = d[a]) && (p === E ? g(e, t, y[p], n + 2, i) : p === L ? g(e, t, y[p], n + 1, i) : ((_ = {})[p] = y[p], g(e, t, { "**": _ }, n + 1, i)));
    else
        y._listeners ? g(e, t, y, i, i) : y["*"] && y["*"]._listeners && g(e, t, y["*"], i, i); return w; } function L(e, t, r) { var n, i, s = 0, o = 0, l = this.delimiter, a = l.length; if ("string" == typeof e)
    if (-1 !== (n = e.indexOf(l))) {
        i = new Array(5);
        do {
            i[s++] = e.slice(o, n), o = n + a;
        } while (-1 !== (n = e.indexOf(l, o)));
        i[s++] = e.slice(o);
    }
    else
        i = [e], s = 1;
else
    i = e, s = e.length; if (s > 1)
    for (n = 0; n + 1 < s; n++)
        if ("**" === i[n] && "**" === i[n + 1])
            return; var f, c = this.listenerTree; for (n = 0; n < s; n++)
    if (c = c[f = i[n]] || (c[f] = {}), n === s - 1)
        return c._listeners ? ("function" == typeof c._listeners && (c._listeners = [c._listeners]), r ? c._listeners.unshift(t) : c._listeners.push(t), !c._listeners.warned && this._maxListeners > 0 && c._listeners.length > this._maxListeners && (c._listeners.warned = !0, h.call(this, c._listeners.length, f))) : c._listeners = t, !0; return !0; } function E(e, t, r, n) { for (var i, s, o, a, f = l(e), h = f.length, c = e._listeners; h-- > 0;)
    i = e[s = f[h]], o = "_listeners" === s ? r : r ? r.concat(s) : [s], a = n || "symbol" == typeof s, c && t.push(a ? o : o.join(this.delimiter)), "object" == typeof i && E.call(this, i, t, o, a); return t; } function k(e) { for (var t, r, n, i = l(e), s = i.length; s-- > 0;)
    (t = e[r = i[s]]) && (n = !0, "_listeners" === r || k(t) || delete e[r]); return n; } function j(e, t, r) { this.emitter = e, this.event = t, this.listener = r; } function T(t, r, i) { if (!0 === i)
    l = !0;
else if (!1 === i)
    s = !0;
else {
    if (!i || "object" != typeof i)
        throw TypeError("options should be an object or true");
    var s = i.async, l = i.promisify, a = i.nextTick, f = i.objectify;
} if (s || a || l) {
    var h = r, c = r._origin || r;
    if (a && !n)
        throw Error("process.nextTick is not supported");
    l === e && (l = "AsyncFunction" === r.constructor.name), r = function () { var e = arguments, t = this, r = this.event; return l ? a ? Promise.resolve() : new Promise((function (e) { o(e); })).then((function () { return t.event = r, h.apply(t, e); })) : (a ? process.nextTick : o)((function () { t.event = r, h.apply(t, e); })); }, r._async = !0, r._origin = c;
} return [r, f ? new j(this, t, r) : this]; } function x(e) { this._events = {}, this._newListener = !1, this._removeListener = !1, this.verboseMemoryLeak = !1, f.call(this, e); } j.prototype.off = function () { return this.emitter.off(this.event, this.listener), this; }, x.EventEmitter2 = x, x.prototype.listenTo = function (t, n, i) { if ("object" != typeof t)
    throw TypeError("target musts be an object"); var s = this; function o(e) { if ("object" != typeof e)
    throw TypeError("events must be an object"); var r, n = i.reducers, o = w.call(s, t); r = -1 === o ? new p(s, t, i) : s._observers[o]; for (var a, f = l(e), h = f.length, c = "function" == typeof n, u = 0; u < h; u++)
    a = f[u], r.subscribe(a, e[a] || a, c ? n : n && n[a]); } return i = v(i, { on: e, off: e, reducers: e }, { on: m, off: m, reducers: d }), r(n) ? o(u(n)) : o("string" == typeof n ? u(n.split(/\s+/)) : n), this; }, x.prototype.stopListeningTo = function (e, t) { var r = this._observers; if (!r)
    return !1; var n, i = r.length, s = !1; if (e && "object" != typeof e)
    throw TypeError("target should be an object"); for (; i-- > 0;)
    n = r[i], e && n._target !== e || (n.unsubscribe(t), s = !0); return s; }, x.prototype.delimiter = ".", x.prototype.setMaxListeners = function (t) { t !== e && (this._maxListeners = t, this._conf || (this._conf = {}), this._conf.maxListeners = t); }, x.prototype.getMaxListeners = function () { return this._maxListeners; }, x.prototype.event = "", x.prototype.once = function (e, t, r) { return this._once(e, t, !1, r); }, x.prototype.prependOnceListener = function (e, t, r) { return this._once(e, t, !0, r); }, x.prototype._once = function (e, t, r, n) { return this._many(e, 1, t, r, n); }, x.prototype.many = function (e, t, r, n) { return this._many(e, t, r, !1, n); }, x.prototype.prependMany = function (e, t, r, n) { return this._many(e, t, r, !0, n); }, x.prototype._many = function (e, t, r, n, i) { var s = this; if ("function" != typeof r)
    throw new Error("many only accepts instances of Function"); function o() { return 0 == --t && s.off(e, o), r.apply(this, arguments); } return o._origin = r, this._on(e, o, n, i); }, x.prototype.emit = function () { if (!this._events && !this._all)
    return !1; this._events || a.call(this); var e, t, r, n, s, o, l = arguments[0], f = this.wildcard; if ("newListener" === l && !this._newListener && !this._events.newListener)
    return !1; if (f && (e = l, "newListener" !== l && "removeListener" !== l && "object" == typeof l)) {
    if (r = l.length, i)
        for (n = 0; n < r; n++)
            if ("symbol" == typeof l[n]) {
                o = !0;
                break;
            }
    o || (l = l.join(this.delimiter));
} var h, c = arguments.length; if (this._all && this._all.length)
    for (n = 0, r = (h = this._all.slice()).length; n < r; n++)
        switch (this.event = l, c) {
            case 1:
                h[n].call(this, l);
                break;
            case 2:
                h[n].call(this, l, arguments[1]);
                break;
            case 3:
                h[n].call(this, l, arguments[1], arguments[2]);
                break;
            default: h[n].apply(this, arguments);
        } if (f)
    h = [], g.call(this, h, e, this.listenerTree, 0, r);
else {
    if ("function" == typeof (h = this._events[l])) {
        switch (this.event = l, c) {
            case 1:
                h.call(this);
                break;
            case 2:
                h.call(this, arguments[1]);
                break;
            case 3:
                h.call(this, arguments[1], arguments[2]);
                break;
            default:
                for (t = new Array(c - 1), s = 1; s < c; s++)
                    t[s - 1] = arguments[s];
                h.apply(this, t);
        }
        return !0;
    }
    h && (h = h.slice());
} if (h && h.length) {
    if (c > 3)
        for (t = new Array(c - 1), s = 1; s < c; s++)
            t[s - 1] = arguments[s];
    for (n = 0, r = h.length; n < r; n++)
        switch (this.event = l, c) {
            case 1:
                h[n].call(this);
                break;
            case 2:
                h[n].call(this, arguments[1]);
                break;
            case 3:
                h[n].call(this, arguments[1], arguments[2]);
                break;
            default: h[n].apply(this, t);
        }
    return !0;
} if (!this.ignoreErrors && !this._all && "error" === l)
    throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event."); return !!this._all; }, x.prototype.emitAsync = function () { if (!this._events && !this._all)
    return !1; this._events || a.call(this); var e, t, r, n, s, o, l = arguments[0], f = this.wildcard; if ("newListener" === l && !this._newListener && !this._events.newListener)
    return Promise.resolve([!1]); if (f && (e = l, "newListener" !== l && "removeListener" !== l && "object" == typeof l)) {
    if (n = l.length, i)
        for (s = 0; s < n; s++)
            if ("symbol" == typeof l[s]) {
                t = !0;
                break;
            }
    t || (l = l.join(this.delimiter));
} var h, c = [], u = arguments.length; if (this._all)
    for (s = 0, n = this._all.length; s < n; s++)
        switch (this.event = l, u) {
            case 1:
                c.push(this._all[s].call(this, l));
                break;
            case 2:
                c.push(this._all[s].call(this, l, arguments[1]));
                break;
            case 3:
                c.push(this._all[s].call(this, l, arguments[1], arguments[2]));
                break;
            default: c.push(this._all[s].apply(this, arguments));
        } if (f ? (h = [], g.call(this, h, e, this.listenerTree, 0)) : h = this._events[l], "function" == typeof h)
    switch (this.event = l, u) {
        case 1:
            c.push(h.call(this));
            break;
        case 2:
            c.push(h.call(this, arguments[1]));
            break;
        case 3:
            c.push(h.call(this, arguments[1], arguments[2]));
            break;
        default:
            for (r = new Array(u - 1), o = 1; o < u; o++)
                r[o - 1] = arguments[o];
            c.push(h.apply(this, r));
    }
else if (h && h.length) {
    if (h = h.slice(), u > 3)
        for (r = new Array(u - 1), o = 1; o < u; o++)
            r[o - 1] = arguments[o];
    for (s = 0, n = h.length; s < n; s++)
        switch (this.event = l, u) {
            case 1:
                c.push(h[s].call(this));
                break;
            case 2:
                c.push(h[s].call(this, arguments[1]));
                break;
            case 3:
                c.push(h[s].call(this, arguments[1], arguments[2]));
                break;
            default: c.push(h[s].apply(this, r));
        }
}
else if (!this.ignoreErrors && !this._all && "error" === l)
    return arguments[1] instanceof Error ? Promise.reject(arguments[1]) : Promise.reject("Uncaught, unspecified 'error' event."); return Promise.all(c); }, x.prototype.on = function (e, t, r) { return this._on(e, t, !1, r); }, x.prototype.prependListener = function (e, t, r) { return this._on(e, t, !0, r); }, x.prototype.onAny = function (e) { return this._onAny(e, !1); }, x.prototype.prependAny = function (e) { return this._onAny(e, !0); }, x.prototype.addListener = x.prototype.on, x.prototype._onAny = function (e, t) { if ("function" != typeof e)
    throw new Error("onAny only accepts instances of Function"); return this._all || (this._all = []), t ? this._all.unshift(e) : this._all.push(e), this; }, x.prototype._on = function (t, r, n, i) { if ("function" == typeof t)
    return this._onAny(t, r), this; if ("function" != typeof r)
    throw new Error("on only accepts instances of Function"); this._events || a.call(this); var s, o = this; return i !== e && (r = (s = T.call(this, t, r, i))[0], o = s[1]), this._newListener && this.emit("newListener", t, r), this.wildcard ? (L.call(this, t, r, n), o) : (this._events[t] ? ("function" == typeof this._events[t] && (this._events[t] = [this._events[t]]), n ? this._events[t].unshift(r) : this._events[t].push(r), !this._events[t].warned && this._maxListeners > 0 && this._events[t].length > this._maxListeners && (this._events[t].warned = !0, h.call(this, this._events[t].length, t))) : this._events[t] = r, o); }, x.prototype.off = function (e, t) { if ("function" != typeof t)
    throw new Error("removeListener only takes instances of Function"); var n, i = []; if (this.wildcard) {
    var s = "string" == typeof e ? e.split(this.delimiter) : e.slice();
    if (!(i = g.call(this, null, s, this.listenerTree, 0)))
        return this;
}
else {
    if (!this._events[e])
        return this;
    n = this._events[e], i.push({ _listeners: n });
} for (var o = 0; o < i.length; o++) {
    var l = i[o];
    if (n = l._listeners, r(n)) {
        for (var a = -1, f = 0, h = n.length; f < h; f++)
            if (n[f] === t || n[f].listener && n[f].listener === t || n[f]._origin && n[f]._origin === t) {
                a = f;
                break;
            }
        if (a < 0)
            continue;
        return this.wildcard ? l._listeners.splice(a, 1) : this._events[e].splice(a, 1), 0 === n.length && (this.wildcard ? delete l._listeners : delete this._events[e]), this._removeListener && this.emit("removeListener", e, t), this;
    }
    (n === t || n.listener && n.listener === t || n._origin && n._origin === t) && (this.wildcard ? delete l._listeners : delete this._events[e], this._removeListener && this.emit("removeListener", e, t));
} return this.listenerTree && k(this.listenerTree), this; }, x.prototype.offAny = function (e) { var t, r = 0, n = 0; if (e && this._all && this._all.length > 0) {
    for (r = 0, n = (t = this._all).length; r < n; r++)
        if (e === t[r])
            return t.splice(r, 1), this._removeListener && this.emit("removeListenerAny", e), this;
}
else {
    if (t = this._all, this._removeListener)
        for (r = 0, n = t.length; r < n; r++)
            this.emit("removeListenerAny", t[r]);
    this._all = [];
} return this; }, x.prototype.removeListener = x.prototype.off, x.prototype.removeAllListeners = function (t) { if (t === e)
    return !this._events || a.call(this), this; if (this.wildcard) {
    var r, n = g.call(this, null, t, this.listenerTree, 0);
    if (!n)
        return this;
    for (r = 0; r < n.length; r++)
        n[r]._listeners = null;
    this.listenerTree && k(this.listenerTree);
}
else
    this._events && (this._events[t] = null); return this; }, x.prototype.listeners = function (t) { var r, n, i, s, o, a = this._events; if (t === e) {
    if (this.wildcard)
        throw Error("event name required for wildcard emitter");
    if (!a)
        return [];
    for (s = (r = l(a)).length, i = []; s-- > 0;)
        "function" == typeof (n = a[r[s]]) ? i.push(n) : i.push.apply(i, n);
    return i;
} if (this.wildcard) {
    if (!(o = this.listenerTree))
        return [];
    var f = [], h = "string" == typeof t ? t.split(this.delimiter) : t.slice();
    return g.call(this, f, h, o, 0), f;
} return a && (n = a[t]) ? "function" == typeof n ? [n] : n : []; }, x.prototype.eventNames = function (e) { var t = this._events; return this.wildcard ? E.call(this, this.listenerTree, [], null, e) : t ? l(t) : []; }, x.prototype.listenerCount = function (e) { return this.listeners(e).length; }, x.prototype.hasListeners = function (t) { if (this.wildcard) {
    var r = [], n = "string" == typeof t ? t.split(this.delimiter) : t.slice();
    return g.call(this, r, n, this.listenerTree, 0), r.length > 0;
} var i = this._events, s = this._all; return !!(s && s.length || i && (t === e ? l(i).length : i[t])); }, x.prototype.listenersAny = function () { return this._all ? this._all : []; }, x.prototype.waitFor = function (t, r) { var n = this, i = typeof r; return "number" === i ? r = { timeout: r } : "function" === i && (r = { filter: r }), b((r = v(r, { timeout: 0, filter: e, handleError: !1, Promise: Promise, overload: !1 }, { filter: m, Promise: y })).Promise, (function (e, i, s) { function o() { var s = r.filter; if (!s || s.apply(n, arguments))
    if (n.off(t, o), r.handleError) {
        var l = arguments[0];
        l ? i(l) : e(c.apply(null, arguments).slice(1));
    }
    else
        e(c.apply(null, arguments)); } s((function () { n.off(t, o); })), n._on(t, o, !1); }), { timeout: r.timeout, overload: r.overload }); }; var A = x.prototype; if (Object.defineProperties(x, { defaultMaxListeners: { get: function () { return A._maxListeners; }, set: function (e) { if ("number" != typeof e || e < 0 || Number.isNaN(e))
            throw TypeError("n must be a non-negative number"); A._maxListeners = e; }, enumerable: !0 }, once: { value: function (e, t, r) { return b((r = v(r, { Promise: Promise, timeout: 0, overload: !1 }, { Promise: y })).Promise, (function (r, n, i) { var s; if ("function" == typeof e.addEventListener)
            return s = function () { r(c.apply(null, arguments)); }, i((function () { e.removeEventListener(t, s); })), void e.addEventListener(t, s, { once: !0 }); var o, l = function () { o && e.removeListener("error", o), r(c.apply(null, arguments)); }; "error" !== t && (o = function (r) { e.removeListener(t, l), n(r); }, e.once("error", o)), i((function () { o && e.removeListener("error", o), e.removeListener(t, l); })), e.once(t, l); }), { timeout: r.timeout, overload: r.overload }); }, writable: !0, configurable: !0 } }), Object.defineProperties(A, { _maxListeners: { value: 10, writable: !0, configurable: !0 }, _observers: { value: null, writable: !0, configurable: !0 } }), "function" == typeof define && define.amd)
    define((function () { return x; }));
else if ("object" == typeof exports)
    module.exports = x;
else {
    new Function("", "return this")().EventEmitter2 = x;
} }();
//# sourceMappingURL=/sm/0a29ecf7805528b46d860c3ffd2ff316653b5484108533681029c47926ff35a8.map
