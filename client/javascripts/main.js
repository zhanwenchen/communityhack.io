function hasClass(t, e) {
    return !!t && (t.classList ? t.classList.contains(e) : !!t.className.match(new RegExp("(\\s|^)" + e + "(\\s|$)")))
}

function addClass(t, e) {
    return !!t && (t.classList ? t.classList.add(e) : hasClass(t, e) || (t.className += " " + e), !0)
}

function removeClass(t, e) {
    if (!t) return !1;
    if (t.classList) t.classList.remove(e);
    else if (hasClass(t, e)) {
        var i = new RegExp("(\\s|^)" + e + "(\\s|$)");
        t.className = t.className.replace(i, " ")
    }
    return !1
}

function toggleClass(t, e) {
    return hasClass(t, e) ? removeClass(t, e) : addClass(t, e)
}

function getParentWithClass(t, e) {
    for (var i = t.parentElement; null != i && !i.classList.contains(e);) i = i.parentElement;
    return i
}

function getSiblingWithClass(t, e) {
    for (var i = t.nextElementSibling; null != i && !i.classList.contains(e);) i = i.nextElementSibling;
    return i
}

function getChildWithClass(t, e) {
    for (var i = t.childNodes, r = 0; r < i.length; r++)
        if (i[r].classList && i[r].classList.contains(e)) return i[r]
}

function setButtonListeners(t) {
    document.querySelector(t + " .register-button.student").addEventListener("click", function(t) {
        window.location = "https://nvite.com/HackTJ/hacktjstudents/tickets"
    }), document.querySelector(t + " .register-button.mentor").addEventListener("click", function(t) {
        window.location = "https://nvite.com/HackTJ/hacktjmentorvolunteers/tickets"
    })
}

function initializeMap() {
    var t = new google.maps.StyledMapType(window.hacktjMapStyles, {
            name: "HackTJ Website"
        }),
        e = new google.maps.Map(document.getElementById("map"), {
            zoom: 12,
            center: isMobile ? {
                lat: 41.6860,
                lng: -73.8973
            } : {
                lat: 41.6860,
                lng: -73.8973
            },
            scrollwheel: !1,
            navigationControl: !1,
            mapTypeControl: !1,
            scaleControl: !1,
            draggable: !1
        });
    e.mapTypes.set("hacktj", t), e.setMapTypeId("hacktj");
    new google.maps.Marker({
        position: {
            lat: 41.6860,
            lng: -73.8973
        },
        map: e
    })
}

function setImages(t) {
    var e = [];
    setTimeout(function() {
        var i = document.getElementsByClassName("nvite-card-name");
        Array.prototype.map.call(i, function(t) {
            if (e.indexOf(t.textContent) == -1) {
                var i = Array.prototype.filter.call(t.parentNode.childNodes, function(t) {
                    return "IMG" === t.nodeName
                })[0];
                i.setAttribute("src", sponsorSmallImages[t.textContent]), e.push(t.textContent)
            }
            return i
        });
        e.length < Object.keys(sponsorSmallImages).length && t < 10 && setImages(t + 1)
    }, 500)
}! function(t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.ScrollMagic = e()
}(this, function() {
    "use strict";
    var t = function() {};
    t.version = "2.0.5", window.addEventListener("mousewheel", function() {});
    var e = "data-scrollmagic-pin-spacer";
    t.Controller = function(r) {
        var n, a, o = "ScrollMagic.Controller",
            l = "FORWARD",
            h = "REVERSE",
            u = "PAUSED",
            c = i.defaults,
            f = this,
            p = s.extend({}, c, r),
            _ = [],
            d = !1,
            m = 0,
            g = u,
            v = !0,
            y = 0,
            T = !0,
            w = function() {
                for (var t in p) c.hasOwnProperty(t) || delete p[t];
                if (p.container = s.get.elements(p.container)[0], !p.container) throw o + " init failed.";
                v = p.container === window || p.container === document.body || !document.body.contains(p.container), v && (p.container = window), y = P(), p.container.addEventListener("resize", R), p.container.addEventListener("scroll", R), p.refreshInterval = parseInt(p.refreshInterval) || c.refreshInterval, x()
            },
            x = function() {
                p.refreshInterval > 0 && (a = window.setTimeout(O, p.refreshInterval))
            },
            b = function() {
                return p.vertical ? s.get.scrollTop(p.container) : s.get.scrollLeft(p.container)
            },
            P = function() {
                return p.vertical ? s.get.height(p.container) : s.get.width(p.container)
            },
            S = this._setScrollPos = function(t) {
                p.vertical ? v ? window.scrollTo(s.get.scrollLeft(), t) : p.container.scrollTop = t : v ? window.scrollTo(t, s.get.scrollTop()) : p.container.scrollLeft = t
            },
            C = function() {
                if (T && d) {
                    var t = s.type.Array(d) ? d : _.slice(0);
                    d = !1;
                    var e = m;
                    m = f.scrollPos();
                    var i = m - e;
                    0 !== i && (g = i > 0 ? l : h), g === h && t.reverse(), t.forEach(function(t) {
                        t.update(!0)
                    })
                }
            },
            k = function() {
                n = s.rAF(C)
            },
            R = function(t) {
                "resize" == t.type && (y = P(), g = u), d !== !0 && (d = !0, k())
            },
            O = function() {
                if (!v && y != P()) {
                    var t;
                    try {
                        t = new Event("resize", {
                            bubbles: !1,
                            cancelable: !1
                        })
                    } catch (e) {
                        t = document.createEvent("Event"), t.initEvent("resize", !1, !1)
                    }
                    p.container.dispatchEvent(t)
                }
                _.forEach(function(t) {
                    t.refresh()
                }), x()
            };
        this._options = p;
        var A = function(t) {
            if (t.length <= 1) return t;
            var e = t.slice(0);
            return e.sort(function(t, e) {
                return t.scrollOffset() > e.scrollOffset() ? 1 : -1
            }), e
        };
        return this.addScene = function(e) {
            if (s.type.Array(e)) e.forEach(function(t) {
                f.addScene(t)
            });
            else if (e instanceof t.Scene)
                if (e.controller() !== f) e.addTo(f);
                else if (_.indexOf(e) < 0) {
                _.push(e), _ = A(_), e.on("shift.controller_sort", function() {
                    _ = A(_)
                });
                for (var i in p.globalSceneOptions) e[i] && e[i].call(e, p.globalSceneOptions[i])
            }
            return f
        }, this.removeScene = function(t) {
            if (s.type.Array(t)) t.forEach(function(t) {
                f.removeScene(t)
            });
            else {
                var e = _.indexOf(t);
                e > -1 && (t.off("shift.controller_sort"), _.splice(e, 1), t.remove())
            }
            return f
        }, this.updateScene = function(e, i) {
            return s.type.Array(e) ? e.forEach(function(t) {
                f.updateScene(t, i)
            }) : i ? e.update(!0) : d !== !0 && e instanceof t.Scene && (d = d || [], -1 == d.indexOf(e) && d.push(e), d = A(d), k()), f
        }, this.update = function(t) {
            return R({
                type: "resize"
            }), t && C(), f
        }, this.scrollTo = function(i, r) {
            if (s.type.Number(i)) S.call(p.container, i, r);
            else if (i instanceof t.Scene) i.controller() === f && f.scrollTo(i.scrollOffset(), r);
            else if (s.type.Function(i)) S = i;
            else {
                var n = s.get.elements(i)[0];
                if (n) {
                    for (; n.parentNode.hasAttribute(e);) n = n.parentNode;
                    var a = p.vertical ? "top" : "left",
                        o = s.get.offset(p.container),
                        l = s.get.offset(n);
                    v || (o[a] -= f.scrollPos()), f.scrollTo(l[a] - o[a], r)
                }
            }
            return f
        }, this.scrollPos = function(t) {
            return arguments.length ? (s.type.Function(t) && (b = t), f) : b.call(f)
        }, this.info = function(t) {
            var e = {
                size: y,
                vertical: p.vertical,
                scrollPos: m,
                scrollDirection: g,
                container: p.container,
                isDocument: v
            };
            return arguments.length ? void 0 !== e[t] ? e[t] : void 0 : e
        }, this.loglevel = function() {
            return f
        }, this.enabled = function(t) {
            return arguments.length ? (T != t && (T = !!t, f.updateScene(_, !0)), f) : T
        }, this.destroy = function(t) {
            window.clearTimeout(a);
            for (var e = _.length; e--;) _[e].destroy(t);
            return p.container.removeEventListener("resize", R), p.container.removeEventListener("scroll", R), s.cAF(n), null
        }, w(), f
    };
    var i = {
        defaults: {
            container: window,
            vertical: !0,
            globalSceneOptions: {},
            loglevel: 2,
            refreshInterval: 100
        }
    };
    t.Controller.addOption = function(t, e) {
        i.defaults[t] = e
    }, t.Controller.extend = function(e) {
        var i = this;
        t.Controller = function() {
            return i.apply(this, arguments), this.$super = s.extend({}, this), e.apply(this, arguments) || this
        }, s.extend(t.Controller, i), t.Controller.prototype = i.prototype, t.Controller.prototype.constructor = t.Controller
    }, t.Scene = function(i) {
        var n, a, o = "BEFORE",
            l = "DURING",
            h = "AFTER",
            u = r.defaults,
            c = this,
            f = s.extend({}, u, i),
            p = o,
            _ = 0,
            d = {
                start: 0,
                end: 0
            },
            m = 0,
            g = !0,
            v = function() {
                for (var t in f) u.hasOwnProperty(t) || delete f[t];
                for (var e in u) k(e);
                S()
            },
            y = {};
        this.on = function(t, e) {
            return s.type.Function(e) && (t = t.trim().split(" "), t.forEach(function(t) {
                var i = t.split("."),
                    r = i[0],
                    s = i[1];
                "*" != r && (y[r] || (y[r] = []), y[r].push({
                    namespace: s || "",
                    callback: e
                }))
            })), c
        }, this.off = function(t, e) {
            return t ? (t = t.trim().split(" "), t.forEach(function(t) {
                var i = t.split("."),
                    r = i[0],
                    s = i[1] || "",
                    n = "*" === r ? Object.keys(y) : [r];
                n.forEach(function(t) {
                    for (var i = y[t] || [], r = i.length; r--;) {
                        var n = i[r];
                        !n || s !== n.namespace && "*" !== s || e && e != n.callback || i.splice(r, 1)
                    }
                    i.length || delete y[t]
                })
            }), c) : c
        }, this.trigger = function(e, i) {
            if (e) {
                var r = e.trim().split("."),
                    s = r[0],
                    n = r[1],
                    a = y[s];
                a && a.forEach(function(e) {
                    n && n !== e.namespace || e.callback.call(c, new t.Event(s, e.namespace, c, i))
                })
            }
            return c
        }, c.on("change.internal", function(t) {
            "loglevel" !== t.what && "tweenChanges" !== t.what && ("triggerElement" === t.what ? x() : "reverse" === t.what && c.update())
        }).on("shift.internal", function() {
            T(), c.update()
        }), this.addTo = function(e) {
            return e instanceof t.Controller && a != e && (a && a.removeScene(c), a = e, S(), w(!0), x(!0), T(), a.info("container").addEventListener("resize", b), e.addScene(c), c.trigger("add", {
                controller: a
            }), c.update()), c
        }, this.enabled = function(t) {
            return arguments.length ? (g != t && (g = !!t, c.update(!0)), c) : g
        }, this.remove = function() {
            if (a) {
                a.info("container").removeEventListener("resize", b);
                var t = a;
                a = void 0, t.removeScene(c), c.trigger("remove")
            }
            return c
        }, this.destroy = function(t) {
            return c.trigger("destroy", {
                reset: t
            }), c.remove(), c.off("*.*"), null
        }, this.update = function(t) {
            if (a)
                if (t)
                    if (a.enabled() && g) {
                        var e, i = a.info("scrollPos");
                        e = f.duration > 0 ? (i - d.start) / (d.end - d.start) : i >= d.start ? 1 : 0, c.trigger("update", {
                            startPos: d.start,
                            endPos: d.end,
                            scrollPos: i
                        }), c.progress(e)
                    } else R && p === l && A(!0);
            else a.updateScene(c, !1);
            return c
        }, this.refresh = function() {
            return w(), x(), c
        }, this.progress = function(t) {
            if (arguments.length) {
                var e = !1,
                    i = p,
                    r = a ? a.info("scrollDirection") : "PAUSED",
                    s = f.reverse || t >= _;
                if (0 === f.duration ? (e = _ != t, _ = 1 > t && s ? 0 : 1, p = 0 === _ ? o : l) : 0 > t && p !== o && s ? (_ = 0, p = o, e = !0) : t >= 0 && 1 > t && s ? (_ = t, p = l, e = !0) : t >= 1 && p !== h ? (_ = 1, p = h, e = !0) : p !== l || s || A(), e) {
                    var n = {
                            progress: _,
                            state: p,
                            scrollDirection: r
                        },
                        u = p != i,
                        d = function(t) {
                            c.trigger(t, n)
                        };
                    u && i !== l && (d("enter"), d(i === o ? "start" : "end")), d("progress"), u && p !== l && (d(p === o ? "start" : "end"), d("leave"))
                }
                return c
            }
            return _
        };
        var T = function() {
                d = {
                    start: m + f.offset
                }, a && f.triggerElement && (d.start -= a.info("size") * f.triggerHook), d.end = d.start + f.duration
            },
            w = function(t) {
                if (n) {
                    var e = "duration";
                    C(e, n.call(c)) && !t && (c.trigger("change", {
                        what: e,
                        newval: f[e]
                    }), c.trigger("shift", {
                        reason: e
                    }))
                }
            },
            x = function(t) {
                var i = 0,
                    r = f.triggerElement;
                if (a && r) {
                    for (var n = a.info(), o = s.get.offset(n.container), l = n.vertical ? "top" : "left"; r.parentNode.hasAttribute(e);) r = r.parentNode;
                    var h = s.get.offset(r);
                    n.isDocument || (o[l] -= a.scrollPos()), i = h[l] - o[l]
                }
                var u = i != m;
                m = i, u && !t && c.trigger("shift", {
                    reason: "triggerElementPosition"
                })
            },
            b = function() {
                f.triggerHook > 0 && c.trigger("shift", {
                    reason: "containerResize"
                })
            },
            P = s.extend(r.validate, {
                duration: function(t) {
                    if (s.type.String(t) && t.match(/^(\.|\d)*\d+%$/)) {
                        var e = parseFloat(t) / 100;
                        t = function() {
                            return a ? a.info("size") * e : 0
                        }
                    }
                    if (s.type.Function(t)) {
                        n = t;
                        try {
                            t = parseFloat(n())
                        } catch (i) {
                            t = -1
                        }
                    }
                    if (t = parseFloat(t), !s.type.Number(t) || 0 > t) throw n ? (n = void 0, 0) : 0;
                    return t
                }
            }),
            S = function(t) {
                t = arguments.length ? [t] : Object.keys(P), t.forEach(function(t) {
                    var e;
                    if (P[t]) try {
                        e = P[t](f[t])
                    } catch (i) {
                        e = u[t]
                    } finally {
                        f[t] = e
                    }
                })
            },
            C = function(t, e) {
                var i = !1,
                    r = f[t];
                return f[t] != e && (f[t] = e, S(t), i = r != f[t]), i
            },
            k = function(t) {
                c[t] || (c[t] = function(e) {
                    return arguments.length ? ("duration" === t && (n = void 0), C(t, e) && (c.trigger("change", {
                        what: t,
                        newval: f[t]
                    }), r.shifts.indexOf(t) > -1 && c.trigger("shift", {
                        reason: t
                    })), c) : f[t]
                })
            };
        this.controller = function() {
            return a
        }, this.state = function() {
            return p
        }, this.scrollOffset = function() {
            return d.start
        }, this.triggerPosition = function() {
            var t = f.offset;
            return a && (t += f.triggerElement ? m : a.info("size") * c.triggerHook()), t
        };
        var R, O;
        c.on("shift.internal", function(t) {
            var e = "duration" === t.reason;
            (p === h && e || p === l && 0 === f.duration) && A(), e && M()
        }).on("progress.internal", function() {
            A()
        }).on("add.internal", function() {
            M()
        }).on("destroy.internal", function(t) {
            c.removePin(t.reset)
        });
        var A = function(t) {
                if (R && a) {
                    var e = a.info(),
                        i = O.spacer.firstChild;
                    if (t || p !== l) {
                        var r = {
                                position: O.inFlow ? "relative" : "absolute",
                                top: 0,
                                left: 0
                            },
                            n = s.css(i, "position") != r.position;
                        O.pushFollowers ? f.duration > 0 && (p === h && 0 === parseFloat(s.css(O.spacer, "padding-top")) ? n = !0 : p === o && 0 === parseFloat(s.css(O.spacer, "padding-bottom")) && (n = !0)) : r[e.vertical ? "top" : "left"] = f.duration * _, s.css(i, r), n && M()
                    } else {
                        "fixed" != s.css(i, "position") && (s.css(i, {
                            position: "fixed"
                        }), M());
                        var u = s.get.offset(O.spacer, !0),
                            c = f.reverse || 0 === f.duration ? e.scrollPos - d.start : Math.round(_ * f.duration * 10) / 10;
                        u[e.vertical ? "top" : "left"] += c, s.css(O.spacer.firstChild, {
                            top: u.top,
                            left: u.left
                        })
                    }
                }
            },
            M = function() {
                if (R && a && O.inFlow) {
                    var t = p === l,
                        e = a.info("vertical"),
                        i = O.spacer.firstChild,
                        r = s.isMarginCollapseType(s.css(O.spacer, "display")),
                        n = {};
                    O.relSize.width || O.relSize.autoFullWidth ? t ? s.css(R, {
                        width: s.get.width(O.spacer)
                    }) : s.css(R, {
                        width: "100%"
                    }) : (n["min-width"] = s.get.width(e ? R : i, !0, !0), n.width = t ? n["min-width"] : "auto"), O.relSize.height ? t ? s.css(R, {
                        height: s.get.height(O.spacer) - (O.pushFollowers ? f.duration : 0)
                    }) : s.css(R, {
                        height: "100%"
                    }) : (n["min-height"] = s.get.height(e ? i : R, !0, !r), n.height = t ? n["min-height"] : "auto"), O.pushFollowers && (n["padding" + (e ? "Top" : "Left")] = f.duration * _, n["padding" + (e ? "Bottom" : "Right")] = f.duration * (1 - _)), s.css(O.spacer, n)
                }
            },
            D = function() {
                a && R && p === l && !a.info("isDocument") && A()
            },
            z = function() {
                a && R && p === l && ((O.relSize.width || O.relSize.autoFullWidth) && s.get.width(window) != s.get.width(O.spacer.parentNode) || O.relSize.height && s.get.height(window) != s.get.height(O.spacer.parentNode)) && M()
            },
            E = function(t) {
                a && R && p === l && !a.info("isDocument") && (t.preventDefault(), a._setScrollPos(a.info("scrollPos") - ((t.wheelDelta || t[a.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || 30 * -t.detail)))
            };
        this.setPin = function(t, i) {
            var r = {
                pushFollowers: !0,
                spacerClass: "scrollmagic-pin-spacer"
            };
            if (i = s.extend({}, r, i), t = s.get.elements(t)[0], !t) return c;
            if ("fixed" === s.css(t, "position")) return c;
            if (R) {
                if (R === t) return c;
                c.removePin()
            }
            R = t;
            var n = R.parentNode.style.display,
                a = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
            R.parentNode.style.display = "none";
            var o = "absolute" != s.css(R, "position"),
                l = s.css(R, a.concat(["display"])),
                h = s.css(R, ["width", "height"]);
            R.parentNode.style.display = n, !o && i.pushFollowers && (i.pushFollowers = !1);
            var u = R.parentNode.insertBefore(document.createElement("div"), R),
                f = s.extend(l, {
                    position: o ? "relative" : "absolute",
                    boxSizing: "content-box",
                    mozBoxSizing: "content-box",
                    webkitBoxSizing: "content-box"
                });
            if (o || s.extend(f, s.css(R, ["width", "height"])), s.css(u, f), u.setAttribute(e, ""), s.addClass(u, i.spacerClass), O = {
                    spacer: u,
                    relSize: {
                        width: "%" === h.width.slice(-1),
                        height: "%" === h.height.slice(-1),
                        autoFullWidth: "auto" === h.width && o && s.isMarginCollapseType(l.display)
                    },
                    pushFollowers: i.pushFollowers,
                    inFlow: o
                }, !R.___origStyle) {
                R.___origStyle = {};
                var p = R.style,
                    _ = a.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);
                _.forEach(function(t) {
                    R.___origStyle[t] = p[t] || ""
                })
            }
            return O.relSize.width && s.css(u, {
                width: h.width
            }), O.relSize.height && s.css(u, {
                height: h.height
            }), u.appendChild(R), s.css(R, {
                position: o ? "relative" : "absolute",
                margin: "auto",
                top: "auto",
                left: "auto",
                bottom: "auto",
                right: "auto"
            }), (O.relSize.width || O.relSize.autoFullWidth) && s.css(R, {
                boxSizing: "border-box",
                mozBoxSizing: "border-box",
                webkitBoxSizing: "border-box"
            }), window.addEventListener("scroll", D), window.addEventListener("resize", D), window.addEventListener("resize", z), R.addEventListener("mousewheel", E), R.addEventListener("DOMMouseScroll", E), A(), c
        }, this.removePin = function(t) {
            if (R) {
                if (p === l && A(!0), t || !a) {
                    var i = O.spacer.firstChild;
                    if (i.hasAttribute(e)) {
                        var r = O.spacer.style,
                            n = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
                        margins = {}, n.forEach(function(t) {
                            margins[t] = r[t] || ""
                        }), s.css(i, margins)
                    }
                    O.spacer.parentNode.insertBefore(i, O.spacer), O.spacer.parentNode.removeChild(O.spacer), R.parentNode.hasAttribute(e) || (s.css(R, R.___origStyle), delete R.___origStyle)
                }
                window.removeEventListener("scroll", D), window.removeEventListener("resize", D), window.removeEventListener("resize", z), R.removeEventListener("mousewheel", E), R.removeEventListener("DOMMouseScroll", E), R = void 0
            }
            return c
        };
        var L, F = [];
        return c.on("destroy.internal", function(t) {
            c.removeClassToggle(t.reset)
        }), this.setClassToggle = function(t, e) {
            var i = s.get.elements(t);
            return 0 !== i.length && s.type.String(e) ? (F.length > 0 && c.removeClassToggle(), L = e, F = i, c.on("enter.internal_class leave.internal_class", function(t) {
                var e = "enter" === t.type ? s.addClass : s.removeClass;
                F.forEach(function(t) {
                    e(t, L)
                })
            }), c) : c
        }, this.removeClassToggle = function(t) {
            return t && F.forEach(function(t) {
                s.removeClass(t, L)
            }), c.off("start.internal_class end.internal_class"), L = void 0, F = [], c
        }, v(), c
    };
    var r = {
        defaults: {
            duration: 0,
            offset: 0,
            triggerElement: void 0,
            triggerHook: .5,
            reverse: !0,
            loglevel: 2
        },
        validate: {
            offset: function(t) {
                if (t = parseFloat(t), !s.type.Number(t)) throw 0;
                return t
            },
            triggerElement: function(t) {
                if (t = t || void 0) {
                    var e = s.get.elements(t)[0];
                    if (!e) throw 0;
                    t = e
                }
                return t
            },
            triggerHook: function(t) {
                var e = {
                    onCenter: .5,
                    onEnter: 1,
                    onLeave: 0
                };
                if (s.type.Number(t)) t = Math.max(0, Math.min(parseFloat(t), 1));
                else {
                    if (!(t in e)) throw 0;
                    t = e[t]
                }
                return t
            },
            reverse: function(t) {
                return !!t
            }
        },
        shifts: ["duration", "offset", "triggerHook"]
    };
    t.Scene.addOption = function(t, e, i, s) {
        t in r.defaults || (r.defaults[t] = e, r.validate[t] = i, s && r.shifts.push(t))
    }, t.Scene.extend = function(e) {
        var i = this;
        t.Scene = function() {
            return i.apply(this, arguments), this.$super = s.extend({}, this), e.apply(this, arguments) || this
        }, s.extend(t.Scene, i), t.Scene.prototype = i.prototype, t.Scene.prototype.constructor = t.Scene
    }, t.Event = function(t, e, i, r) {
        r = r || {};
        for (var s in r) this[s] = r[s];
        return this.type = t, this.target = this.currentTarget = i, this.namespace = e || "", this.timeStamp = this.timestamp = Date.now(), this
    };
    var s = t._util = function(t) {
        var e, i = {},
            r = function(t) {
                return parseFloat(t) || 0
            },
            s = function(e) {
                return e.currentStyle ? e.currentStyle : t.getComputedStyle(e)
            },
            n = function(e, i, n, a) {
                if (i = i === document ? t : i, i === t) a = !1;
                else if (!c.DomElement(i)) return 0;
                e = e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
                var o = (n ? i["offset" + e] || i["outer" + e] : i["client" + e] || i["inner" + e]) || 0;
                if (n && a) {
                    var l = s(i);
                    o += "Height" === e ? r(l.marginTop) + r(l.marginBottom) : r(l.marginLeft) + r(l.marginRight)
                }
                return o
            },
            a = function(t) {
                return t.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function(t) {
                    return t[1].toUpperCase()
                })
            };
        i.extend = function(t) {
            for (t = t || {}, e = 1; e < arguments.length; e++)
                if (arguments[e])
                    for (var i in arguments[e]) arguments[e].hasOwnProperty(i) && (t[i] = arguments[e][i]);
            return t
        }, i.isMarginCollapseType = function(t) {
            return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(t) > -1
        };
        var o = 0,
            l = ["ms", "moz", "webkit", "o"],
            h = t.requestAnimationFrame,
            u = t.cancelAnimationFrame;
        for (e = 0; !h && e < l.length; ++e) h = t[l[e] + "RequestAnimationFrame"], u = t[l[e] + "CancelAnimationFrame"] || t[l[e] + "CancelRequestAnimationFrame"];
        h || (h = function(e) {
            var i = (new Date).getTime(),
                r = Math.max(0, 16 - (i - o)),
                s = t.setTimeout(function() {
                    e(i + r)
                }, r);
            return o = i + r, s
        }), u || (u = function(e) {
            t.clearTimeout(e)
        }), i.rAF = h.bind(t), i.cAF = u.bind(t);
        var c = i.type = function(t) {
            return Object.prototype.toString.call(t).replace(/^\[object (.+)\]$/, "$1").toLowerCase()
        };
        c.String = function(t) {
            return "string" === c(t)
        }, c.Function = function(t) {
            return "function" === c(t)
        }, c.Array = function(t) {
            return Array.isArray(t)
        }, c.Number = function(t) {
            return !c.Array(t) && t - parseFloat(t) + 1 >= 0
        }, c.DomElement = function(t) {
            return "object" == typeof HTMLElement ? t instanceof HTMLElement : t && "object" == typeof t && null !== t && 1 === t.nodeType && "string" == typeof t.nodeName
        };
        var f = i.get = {};
        return f.elements = function(e) {
            var i = [];
            if (c.String(e)) try {
                e = document.querySelectorAll(e)
            } catch (r) {
                return i
            }
            if ("nodelist" === c(e) || c.Array(e))
                for (var s = 0, n = i.length = e.length; n > s; s++) {
                    var a = e[s];
                    i[s] = c.DomElement(a) ? a : f.elements(a)
                } else(c.DomElement(e) || e === document || e === t) && (i = [e]);
            return i
        }, f.scrollTop = function(e) {
            return e && "number" == typeof e.scrollTop ? e.scrollTop : t.pageYOffset || 0
        }, f.scrollLeft = function(e) {
            return e && "number" == typeof e.scrollLeft ? e.scrollLeft : t.pageXOffset || 0
        }, f.width = function(t, e, i) {
            return n("width", t, e, i)
        }, f.height = function(t, e, i) {
            return n("height", t, e, i)
        }, f.offset = function(t, e) {
            var i = {
                top: 0,
                left: 0
            };
            if (t && t.getBoundingClientRect) {
                var r = t.getBoundingClientRect();
                i.top = r.top, i.left = r.left, e || (i.top += f.scrollTop(), i.left += f.scrollLeft())
            }
            return i
        }, i.addClass = function(t, e) {
            e && (t.classList ? t.classList.add(e) : t.className += " " + e)
        }, i.removeClass = function(t, e) {
            e && (t.classList ? t.classList.remove(e) : t.className = t.className.replace(RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " "))
        }, i.css = function(t, e) {
            if (c.String(e)) return s(t)[a(e)];
            if (c.Array(e)) {
                var i = {},
                    r = s(t);
                return e.forEach(function(t) {
                    i[t] = r[a(t)]
                }), i
            }
            for (var n in e) {
                var o = e[n];
                o == parseFloat(o) && (o += "px"), t.style[a(n)] = o
            }
        }, i
    }(window || {});
    return t
});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var r = function(t) {
                        var e, i = [],
                            r = t.length;
                        for (e = 0; e !== r; i.push(t[e++]));
                        return i
                    },
                    s = function(t, e, r) {
                        i.call(this, t, e, r), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = s.prototype.render
                    },
                    n = 1e-10,
                    a = i._internals,
                    o = a.isSelector,
                    l = a.isArray,
                    h = s.prototype = i.to({}, .1, {}),
                    u = [];
                s.version = "1.15.1", h.constructor = s, h.kill()._gc = !1, s.killTweensOf = s.killDelayedCallsTo = i.killTweensOf, s.getTweensOf = i.getTweensOf, s.lagSmoothing = i.lagSmoothing, s.ticker = i.ticker, s.render = i.render, h.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
                }, h.updateTo = function(t, e) {
                    var r, s = this.ratio,
                        n = this.vars.immediateRender || t.immediateRender;
                    e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (r in t) this.vars[r] = t[r];
                    if (this._initted || n)
                        if (e) this._initted = !1, n && this.render(0, !0, !0);
                        else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                        var a = this._time;
                        this.render(0, !0, !1), this._initted = !1, this.render(a, !0, !1)
                    } else if (this._time > 0 || n) {
                        this._initted = !1, this._init();
                        for (var o, l = 1 / (1 - s), h = this._firstPT; h;) o = h.s + h.c, h.c *= l, h.s = o - h.c, h = h._next
                    }
                    return this
                }, h.render = function(t, e, i) {
                    this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                    var r, s, o, l, h, c, f, p, _ = this._dirty ? this.totalDuration() : this._totalDuration,
                        d = this._time,
                        m = this._totalTime,
                        g = this._cycle,
                        v = this._duration,
                        y = this._rawPrevTime;
                    if (t >= _ ? (this._totalTime = _, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = v, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (r = !0, s = "onComplete"), 0 === v && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > y || y === n) && y !== t && (i = !0, y > n && (s = "onReverseComplete")), this._rawPrevTime = p = !e || t || y === t ? t : n)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== m || 0 === v && y > 0 && y !== n) && (s = "onReverseComplete", r = this._reversed), 0 > t && (this._active = !1, 0 === v && (this._initted || !this.vars.lazy || i) && (y >= 0 && (i = !0), this._rawPrevTime = p = !e || t || y === t ? t : n)), this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (l = v + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (this._time = v - this._time), this._time > v ? this._time = v : 0 > this._time && (this._time = 0)), this._easeType ? (h = this._time / v, c = this._easeType, f = this._easePower, (1 === c || 3 === c && h >= .5) && (h = 1 - h), 3 === c && (h *= 2), 1 === f ? h *= h : 2 === f ? h *= h * h : 3 === f ? h *= h * h * h : 4 === f && (h *= h * h * h * h), this.ratio = 1 === c ? 1 - h : 2 === c ? h : .5 > this._time / v ? h / 2 : 1 - h / 2) : this.ratio = this._ease.getRatio(this._time / v)), d === this._time && !i && g === this._cycle) return void(m !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || u)));
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = d, this._totalTime = m, this._rawPrevTime = y, this._cycle = g, a.lazyTweens.push(this), void(this._lazy = [t, e]);
                        this._time && !r ? this.ratio = this._ease.getRatio(this._time / v) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== d && t >= 0 && (this._active = !0), 0 === m && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : s || (s = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === v) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || u))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
                    this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._totalTime !== m || r) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || u)), this._cycle !== g && (e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || u)), s && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[s] && this.vars[s].apply(this.vars[s + "Scope"] || this, this.vars[s + "Params"] || u), 0 === v && this._rawPrevTime === n && p !== n && (this._rawPrevTime = 0))
                }, s.to = function(t, e, i) {
                    return new s(t, e, i)
                }, s.from = function(t, e, i) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new s(t, e, i)
                }, s.fromTo = function(t, e, i, r) {
                    return r.startAt = i, r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender, new s(t, e, r)
                }, s.staggerTo = s.allTo = function(t, e, n, a, h, c, f) {
                    a = a || 0;
                    var p, _, d, m, g = n.delay || 0,
                        v = [],
                        y = function() {
                            n.onComplete && n.onComplete.apply(n.onCompleteScope || this, arguments), h.apply(f || this, c || u)
                        };
                    for (l(t) || ("string" == typeof t && (t = i.selector(t) || t), o(t) && (t = r(t))), t = t || [], 0 > a && (t = r(t), t.reverse(), a *= -1), p = t.length - 1, d = 0; p >= d; d++) {
                        _ = {};
                        for (m in n) _[m] = n[m];
                        _.delay = g, d === p && h && (_.onComplete = y), v[d] = new s(t[d], e, _), g += a
                    }
                    return v
                }, s.staggerFrom = s.allFrom = function(t, e, i, r, n, a, o) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, s.staggerTo(t, e, i, r, n, a, o)
                }, s.staggerFromTo = s.allFromTo = function(t, e, i, r, n, a, o, l) {
                    return r.startAt = i, r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender, s.staggerTo(t, e, r, n, a, o, l)
                }, s.delayedCall = function(t, e, i, r, n) {
                    return new s(e, 0, {
                        delay: t,
                        onComplete: e,
                        onCompleteParams: i,
                        onCompleteScope: r,
                        onReverseComplete: e,
                        onReverseCompleteParams: i,
                        onReverseCompleteScope: r,
                        immediateRender: !1,
                        useFrames: n,
                        overwrite: 0
                    })
                }, s.set = function(t, e) {
                    return new s(t, 0, e)
                }, s.isTweening = function(t) {
                    return i.getTweensOf(t, !0).length > 0
                };
                var c = function(t, e) {
                        for (var r = [], s = 0, n = t._first; n;) n instanceof i ? r[s++] = n : (e && (r[s++] = n), r = r.concat(c(n, e)), s = r.length), n = n._next;
                        return r
                    },
                    f = s.getAllTweens = function(e) {
                        return c(t._rootTimeline, e).concat(c(t._rootFramesTimeline, e))
                    };
                s.killAll = function(t, i, r, s) {
                    null == i && (i = !0), null == r && (r = !0);
                    var n, a, o, l = f(0 != s),
                        h = l.length,
                        u = i && r && s;
                    for (o = 0; h > o; o++) a = l[o], (u || a instanceof e || (n = a.target === a.vars.onComplete) && r || i && !n) && (t ? a.totalTime(a._reversed ? 0 : a.totalDuration()) : a._enabled(!1, !1))
                }, s.killChildTweensOf = function(t, e) {
                    if (null != t) {
                        var n, h, u, c, f, p = a.tweenLookup;
                        if ("string" == typeof t && (t = i.selector(t) || t), o(t) && (t = r(t)), l(t))
                            for (c = t.length; --c > -1;) s.killChildTweensOf(t[c], e);
                        else {
                            n = [];
                            for (u in p)
                                for (h = p[u].target.parentNode; h;) h === t && (n = n.concat(p[u].tweens)), h = h.parentNode;
                            for (f = n.length, c = 0; f > c; c++) e && n[c].totalTime(n[c].totalDuration()), n[c]._enabled(!1, !1)
                        }
                    }
                };
                var p = function(t, i, r, s) {
                    i = i !== !1, r = r !== !1, s = s !== !1;
                    for (var n, a, o = f(s), l = i && r && s, h = o.length; --h > -1;) a = o[h], (l || a instanceof e || (n = a.target === a.vars.onComplete) && r || i && !n) && a.paused(t)
                };
                return s.pauseAll = function(t, e, i) {
                    p(!0, t, e, i)
                }, s.resumeAll = function(t, e, i) {
                    p(!1, t, e, i)
                }, s.globalTimeScale = function(e) {
                    var r = t._rootTimeline,
                        s = i.ticker.time;
                    return arguments.length ? (e = e || n, r._startTime = s - (s - r._startTime) * r._timeScale / e, r = t._rootFramesTimeline, s = i.ticker.frame, r._startTime = s - (s - r._startTime) * r._timeScale / e, r._timeScale = t._rootTimeline._timeScale = e, e) : r._timeScale
                }, h.progress = function(t) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
                }, h.totalProgress = function(t) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
                }, h.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, h.duration = function(e) {
                    return arguments.length ? t.prototype.duration.call(this, e) : this._duration
                }, h.totalDuration = function(t) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                }, h.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, h.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, h.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, s
            }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var r = function(t) {
                        e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        var i, r, s = this.vars;
                        for (r in s) i = s[r], l(i) && -1 !== i.join("").indexOf("{self}") && (s[r] = this._swapSelfInParams(i));
                        l(s.tweens) && this.add(s.tweens, 0, s.align, s.stagger)
                    },
                    s = 1e-10,
                    n = i._internals,
                    a = r._internals = {},
                    o = n.isSelector,
                    l = n.isArray,
                    h = n.lazyTweens,
                    u = n.lazyRender,
                    c = [],
                    f = _gsScope._gsDefine.globals,
                    p = function(t) {
                        var e, i = {};
                        for (e in t) i[e] = t[e];
                        return i
                    },
                    _ = a.pauseCallback = function(t, e, i, r) {
                        var s = t._timeline,
                            n = s._totalTime;
                        !e && this._forcingPlayhead || s._rawPrevTime === t._startTime || (s.pause(t._startTime), e && e.apply(r || s, i || c), this._forcingPlayhead && s.seek(n))
                    },
                    d = function(t) {
                        var e, i = [],
                            r = t.length;
                        for (e = 0; e !== r; i.push(t[e++]));
                        return i
                    },
                    m = r.prototype = new e;
                return r.version = "1.15.1", m.constructor = r, m.kill()._gc = m._forcingPlayhead = !1, m.to = function(t, e, r, s) {
                    var n = r.repeat && f.TweenMax || i;
                    return e ? this.add(new n(t, e, r), s) : this.set(t, r, s)
                }, m.from = function(t, e, r, s) {
                    return this.add((r.repeat && f.TweenMax || i).from(t, e, r), s)
                }, m.fromTo = function(t, e, r, s, n) {
                    var a = s.repeat && f.TweenMax || i;
                    return e ? this.add(a.fromTo(t, e, r, s), n) : this.set(t, s, n)
                }, m.staggerTo = function(t, e, s, n, a, l, h, u) {
                    var c, f = new r({
                        onComplete: l,
                        onCompleteParams: h,
                        onCompleteScope: u,
                        smoothChildTiming: this.smoothChildTiming
                    });
                    for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], o(t) && (t = d(t)), n = n || 0, 0 > n && (t = d(t), t.reverse(), n *= -1), c = 0; t.length > c; c++) s.startAt && (s.startAt = p(s.startAt)), f.to(t[c], e, p(s), c * n);
                    return this.add(f, a)
                }, m.staggerFrom = function(t, e, i, r, s, n, a, o) {
                    return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, r, s, n, a, o)
                }, m.staggerFromTo = function(t, e, i, r, s, n, a, o, l) {
                    return r.startAt = i, r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, r, s, n, a, o, l)
                }, m.call = function(t, e, r, s) {
                    return this.add(i.delayedCall(0, t, e, r), s)
                }, m.set = function(t, e, r) {
                    return r = this._parseTimeOrLabel(r, 0, !0), null == e.immediateRender && (e.immediateRender = r === this._time && !this._paused), this.add(new i(t, 0, e), r)
                }, r.exportRoot = function(t, e) {
                    t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                    var s, n, a = new r(t),
                        o = a._timeline;
                    for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, s = o._first; s;) n = s._next, e && s instanceof i && s.target === s.vars.onComplete || a.add(s, s._startTime - s._delay), s = n;
                    return o.add(a, 0), a
                }, m.add = function(s, n, a, o) {
                    var h, u, c, f, p, _;
                    if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, s)), !(s instanceof t)) {
                        if (s instanceof Array || s && s.push && l(s)) {
                            for (a = a || "normal", o = o || 0, h = n, u = s.length, c = 0; u > c; c++) l(f = s[c]) && (f = new r({
                                tweens: f
                            })), this.add(f, h), "string" != typeof f && "function" != typeof f && ("sequence" === a ? h = f._startTime + f.totalDuration() / f._timeScale : "start" === a && (f._startTime -= f.delay())), h += o;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof s) return this.addLabel(s, n);
                        if ("function" != typeof s) throw "Cannot add " + s + " into the timeline; it is not a tween, timeline, function, or string.";
                        s = i.delayedCall(0, s)
                    }
                    if (e.prototype.add.call(this, s, n), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                        for (p = this, _ = p.rawTime() > s._startTime; p._timeline;) _ && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1), p = p._timeline;
                    return this
                }, m.remove = function(e) {
                    if (e instanceof t) return this._remove(e, !1);
                    if (e instanceof Array || e && e.push && l(e)) {
                        for (var i = e.length; --i > -1;) this.remove(e[i]);
                        return this
                    }
                    return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
                }, m._remove = function(t, i) {
                    e.prototype._remove.call(this, t, i);
                    var r = this._last;
                    return r ? this._time > r._startTime + r._totalDuration / r._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                }, m.append = function(t, e) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
                }, m.insert = m.insertMultiple = function(t, e, i, r) {
                    return this.add(t, e || 0, i, r)
                }, m.appendMultiple = function(t, e, i, r) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, r)
                }, m.addLabel = function(t, e) {
                    return this._labels[t] = this._parseTimeOrLabel(e), this
                }, m.addPause = function(t, e, r, s) {
                    var n = i.delayedCall(0, _, ["{self}", e, r, s], this);
                    return n.data = "isPause", this.add(n, t)
                }, m.removeLabel = function(t) {
                    return delete this._labels[t], this
                }, m.getLabelTime = function(t) {
                    return null != this._labels[t] ? this._labels[t] : -1
                }, m._parseTimeOrLabel = function(e, i, r, s) {
                    var n;
                    if (s instanceof t && s.timeline === this) this.remove(s);
                    else if (s && (s instanceof Array || s.push && l(s)))
                        for (n = s.length; --n > -1;) s[n] instanceof t && s[n].timeline === this && this.remove(s[n]);
                    if ("string" == typeof i) return this._parseTimeOrLabel(i, r && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, r);
                    if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
                    else {
                        if (n = e.indexOf("="), -1 === n) return null == this._labels[e] ? r ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                        i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, r) : this.duration()
                    }
                    return Number(e) + i
                }, m.seek = function(t, e) {
                    return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
                }, m.stop = function() {
                    return this.paused(!0)
                }, m.gotoAndPlay = function(t, e) {
                    return this.play(t, e)
                }, m.gotoAndStop = function(t, e) {
                    return this.pause(t, e)
                }, m.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var r, n, a, o, l, f = this._dirty ? this.totalDuration() : this._totalDuration,
                        p = this._time,
                        _ = this._startTime,
                        d = this._timeScale,
                        m = this._paused;
                    if (t >= f ? (this._totalTime = this._time = f, this._reversed || this._hasPausedChild() || (n = !0, o = "onComplete", 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === s) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > s && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : s, t = f + 1e-4) : 1e-7 > t ? (this._totalTime = this._time = 0, (0 !== p || 0 === this._duration && this._rawPrevTime !== s && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (o = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t) : (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : s, t = 0, this._initted || (l = !0))) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== p && this._first || i || l) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== p && t > 0 && (this._active = !0), 0 === p && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || c)), this._time >= p)
                            for (r = this._first; r && (a = r._next, !this._paused || m);)(r._active || r._startTime <= this._time && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = a;
                        else
                            for (r = this._last; r && (a = r._prev, !this._paused || m);)(r._active || p >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = a;
                        this._onUpdate && (e || (h.length && u(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || c))), o && (this._gc || (_ === this._startTime || d !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (n && (h.length && u(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this.vars[o].apply(this.vars[o + "Scope"] || this, this.vars[o + "Params"] || c)))
                    }
                }, m._hasPausedChild = function() {
                    for (var t = this._first; t;) {
                        if (t._paused || t instanceof r && t._hasPausedChild()) return !0;
                        t = t._next
                    }
                    return !1
                }, m.getChildren = function(t, e, r, s) {
                    s = s || -9999999999;
                    for (var n = [], a = this._first, o = 0; a;) s > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (r !== !1 && (n[o++] = a), t !== !1 && (n = n.concat(a.getChildren(!0, e, r)), o = n.length))), a = a._next;
                    return n
                }, m.getTweensOf = function(t, e) {
                    var r, s, n = this._gc,
                        a = [],
                        o = 0;
                    for (n && this._enabled(!0, !0), r = i.getTweensOf(t), s = r.length; --s > -1;)(r[s].timeline === this || e && this._contains(r[s])) && (a[o++] = r[s]);
                    return n && this._enabled(!1, !0), a
                }, m.recent = function() {
                    return this._recent
                }, m._contains = function(t) {
                    for (var e = t.timeline; e;) {
                        if (e === this) return !0;
                        e = e.timeline
                    }
                    return !1
                }, m.shiftChildren = function(t, e, i) {
                    i = i || 0;
                    for (var r, s = this._first, n = this._labels; s;) s._startTime >= i && (s._startTime += t), s = s._next;
                    if (e)
                        for (r in n) n[r] >= i && (n[r] += t);
                    return this._uncache(!0)
                }, m._kill = function(t, e) {
                    if (!t && !e) return this._enabled(!1, !1);
                    for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), r = i.length, s = !1; --r > -1;) i[r]._kill(t, e) && (s = !0);
                    return s
                }, m.clear = function(t) {
                    var e = this.getChildren(!1, !0, !0),
                        i = e.length;
                    for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                    return t !== !1 && (this._labels = {}), this._uncache(!0)
                }, m.invalidate = function() {
                    for (var e = this._first; e;) e.invalidate(), e = e._next;
                    return t.prototype.invalidate.call(this)
                }, m._enabled = function(t, i) {
                    if (t === this._gc)
                        for (var r = this._first; r;) r._enabled(t, !0), r = r._next;
                    return e.prototype._enabled.call(this, t, i)
                }, m.totalTime = function() {
                    this._forcingPlayhead = !0;
                    var e = t.prototype.totalTime.apply(this, arguments);
                    return this._forcingPlayhead = !1, e
                }, m.duration = function(t) {
                    return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
                }, m.totalDuration = function(t) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var e, i, r = 0, s = this._last, n = 999999999999; s;) e = s._prev, s._dirty && s.totalDuration(), s._startTime > n && this._sortChildren && !s._paused ? this.add(s, s._startTime - s._delay) : n = s._startTime, 0 > s._startTime && !s._paused && (r -= s._startTime, this._timeline.smoothChildTiming && (this._startTime += s._startTime / this._timeScale), this.shiftChildren(-s._startTime, !1, -9999999999), n = 0), i = s._startTime + s._totalDuration / s._timeScale, i > r && (r = i), s = e;
                            this._duration = this._totalDuration = r, this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
                }, m.usesFrames = function() {
                    for (var e = this._timeline; e._timeline;) e = e._timeline;
                    return e === t._rootFramesTimeline
                }, m.rawTime = function() {
                    return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                }, r
            }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
                var r = function(e) {
                        t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                    },
                    s = 1e-10,
                    n = [],
                    a = e._internals,
                    o = a.lazyTweens,
                    l = a.lazyRender,
                    h = new i(null, null, 1, 0),
                    u = r.prototype = new t;
                return u.constructor = r, u.kill()._gc = !1, r.version = "1.15.1", u.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
                }, u.addCallback = function(t, i, r, s) {
                    return this.add(e.delayedCall(0, t, r, s), i)
                }, u.removeCallback = function(t, e) {
                    if (t)
                        if (null == e) this._kill(null, t);
                        else
                            for (var i = this.getTweensOf(t, !1), r = i.length, s = this._parseTimeOrLabel(e); --r > -1;) i[r]._startTime === s && i[r]._enabled(!1, !1);
                    return this
                }, u.removePause = function(e) {
                    return this.removeCallback(t._internals.pauseCallback, e)
                }, u.tweenTo = function(t, i) {
                    i = i || {};
                    var r, s, a, o = {
                        ease: h,
                        useFrames: this.usesFrames(),
                        immediateRender: !1
                    };
                    for (s in i) o[s] = i[s];
                    return o.time = this._parseTimeOrLabel(t), r = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, a = new e(this, r, o), o.onStart = function() {
                        a.target.paused(!0), a.vars.time !== a.target.time() && r === a.duration() && a.duration(Math.abs(a.vars.time - a.target.time()) / a.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || a, i.onStartParams || n)
                    }, a
                }, u.tweenFromTo = function(t, e, i) {
                    i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                        onComplete: this.seek,
                        onCompleteParams: [t],
                        onCompleteScope: this
                    }, i.immediateRender = i.immediateRender !== !1;
                    var r = this.tweenTo(e, i);
                    return r.duration(Math.abs(r.vars.time - t) / this._timeScale || .001)
                }, u.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var r, a, h, u, c, f, p = this._dirty ? this.totalDuration() : this._totalDuration,
                        _ = this._duration,
                        d = this._time,
                        m = this._totalTime,
                        g = this._startTime,
                        v = this._timeScale,
                        y = this._rawPrevTime,
                        T = this._paused,
                        w = this._cycle;
                    if (t >= p ? (this._locked || (this._totalTime = p, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (a = !0, u = "onComplete", 0 === this._duration && (0 === t || 0 > y || y === s) && y !== t && this._first && (c = !0, y > s && (u = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : s, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = _, t = _ + 1e-4)) : 1e-7 > t ? (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== d || 0 === _ && y !== s && (y > 0 || 0 > t && y >= 0) && !this._locked) && (u = "onReverseComplete", a = this._reversed), 0 > t ? (this._active = !1, y >= 0 && this._first && (c = !0), this._rawPrevTime = t) : (this._rawPrevTime = _ || !e || t || this._rawPrevTime === t ? t : s, t = 0, this._initted || (c = !0))) : (0 === _ && 0 > y && (c = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (f = _ + this._repeatDelay, this._cycle = this._totalTime / f >> 0, 0 !== this._cycle && this._cycle === this._totalTime / f && this._cycle--, this._time = this._totalTime - this._cycle * f, this._yoyo && 0 !== (1 & this._cycle) && (this._time = _ - this._time), this._time > _ ? (this._time = _, t = _ + 1e-4) : 0 > this._time ? this._time = t = 0 : t = this._time))), this._cycle !== w && !this._locked) {
                        var x = this._yoyo && 0 !== (1 & w),
                            b = x === (this._yoyo && 0 !== (1 & this._cycle)),
                            P = this._totalTime,
                            S = this._cycle,
                            C = this._rawPrevTime,
                            k = this._time;
                        if (this._totalTime = w * _, w > this._cycle ? x = !x : this._totalTime += _, this._time = d, this._rawPrevTime = 0 === _ ? y - 1e-4 : y, this._cycle = w, this._locked = !0, d = x ? 0 : _, this.render(d, e, 0 === _), e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || n), b && (d = x ? _ + 1e-4 : -1e-4, this.render(d, !0, !1)), this._locked = !1, this._paused && !T) return;
                        this._time = k, this._totalTime = P, this._cycle = S, this._rawPrevTime = C
                    }
                    if (!(this._time !== d && this._first || i || c)) return void(m !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || n)));
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== m && t > 0 && (this._active = !0), 0 === m && this.vars.onStart && 0 !== this._totalTime && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || n)), this._time >= d)
                        for (r = this._first; r && (h = r._next, !this._paused || T);)(r._active || r._startTime <= this._time && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = h;
                    else
                        for (r = this._last; r && (h = r._prev, !this._paused || T);)(r._active || d >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = h;
                    this._onUpdate && (e || (o.length && l(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || n))), u && (this._locked || this._gc || (g === this._startTime || v !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (a && (o.length && l(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[u] && this.vars[u].apply(this.vars[u + "Scope"] || this, this.vars[u + "Params"] || n)))
                }, u.getActive = function(t, e, i) {
                    null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                    var r, s, n = [],
                        a = this.getChildren(t, e, i),
                        o = 0,
                        l = a.length;
                    for (r = 0; l > r; r++) s = a[r], s.isActive() && (n[o++] = s);
                    return n
                }, u.getLabelAfter = function(t) {
                    t || 0 !== t && (t = this._time);
                    var e, i = this.getLabelsArray(),
                        r = i.length;
                    for (e = 0; r > e; e++)
                        if (i[e].time > t) return i[e].name;
                    return null
                }, u.getLabelBefore = function(t) {
                    null == t && (t = this._time);
                    for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                        if (t > e[i].time) return e[i].name;
                    return null
                }, u.getLabelsArray = function() {
                    var t, e = [],
                        i = 0;
                    for (t in this._labels) e[i++] = {
                        time: this._labels[t],
                        name: t
                    };
                    return e.sort(function(t, e) {
                        return t.time - e.time
                    }), e
                }, u.progress = function(t, e) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
                }, u.totalProgress = function(t, e) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
                }, u.totalDuration = function(e) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                }, u.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, u.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, u.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, u.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, u.currentLabel = function(t) {
                    return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
                }, r
            }, !0),
            function() {
                var t = 180 / Math.PI,
                    e = [],
                    i = [],
                    r = [],
                    s = {},
                    n = _gsScope._gsDefine.globals,
                    a = function(t, e, i, r) {
                        this.a = t, this.b = e, this.c = i, this.d = r, this.da = r - t, this.ca = i - t, this.ba = e - t
                    },
                    o = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                    l = function(t, e, i, r) {
                        var s = {
                                a: t
                            },
                            n = {},
                            a = {},
                            o = {
                                c: r
                            },
                            l = (t + e) / 2,
                            h = (e + i) / 2,
                            u = (i + r) / 2,
                            c = (l + h) / 2,
                            f = (h + u) / 2,
                            p = (f - c) / 8;
                        return s.b = l + (t - l) / 4, n.b = c + p, s.c = n.a = (s.b + n.b) / 2, n.c = a.a = (c + f) / 2, a.b = f - p, o.b = u + (r - u) / 4, a.c = o.a = (a.b + o.b) / 2, [s, n, a, o]
                    },
                    h = function(t, s, n, a, o) {
                        var h, u, c, f, p, _, d, m, g, v, y, T, w, x = t.length - 1,
                            b = 0,
                            P = t[0].a;
                        for (h = 0; x > h; h++) p = t[b], u = p.a, c = p.d, f = t[b + 1].d, o ? (y = e[h], T = i[h], w = .25 * (T + y) * s / (a ? .5 : r[h] || .5), _ = c - (c - u) * (a ? .5 * s : 0 !== y ? w / y : 0), d = c + (f - c) * (a ? .5 * s : 0 !== T ? w / T : 0), m = c - (_ + ((d - _) * (3 * y / (y + T) + .5) / 4 || 0))) : (_ = c - .5 * (c - u) * s, d = c + .5 * (f - c) * s, m = c - (_ + d) / 2), _ += m, d += m, p.c = g = _, p.b = 0 !== h ? P : P = p.a + .6 * (p.c - p.a), p.da = c - u, p.ca = g - u, p.ba = P - u, n ? (v = l(u, P, g, c), t.splice(b, 1, v[0], v[1], v[2], v[3]), b += 4) : b++, P = d;
                        p = t[b], p.b = P, p.c = P + .4 * (p.d - P), p.da = p.d - p.a, p.ca = p.c - p.a, p.ba = P - p.a, n && (v = l(p.a, P, p.c, p.d), t.splice(b, 1, v[0], v[1], v[2], v[3]))
                    },
                    u = function(t, r, s, n) {
                        var o, l, h, u, c, f, p = [];
                        if (n)
                            for (t = [n].concat(t), l = t.length; --l > -1;) "string" == typeof(f = t[l][r]) && "=" === f.charAt(1) && (t[l][r] = n[r] + Number(f.charAt(0) + f.substr(2)));
                        if (o = t.length - 2, 0 > o) return p[0] = new a(t[0][r], 0, 0, t[-1 > o ? 0 : 1][r]), p;
                        for (l = 0; o > l; l++) h = t[l][r], u = t[l + 1][r], p[l] = new a(h, 0, 0, u), s && (c = t[l + 2][r], e[l] = (e[l] || 0) + (u - h) * (u - h), i[l] = (i[l] || 0) + (c - u) * (c - u));
                        return p[l] = new a(t[l][r], 0, 0, t[l + 1][r]), p
                    },
                    c = function(t, n, a, l, c, f) {
                        var p, _, d, m, g, v, y, T, w = {},
                            x = [],
                            b = f || t[0];
                        c = "string" == typeof c ? "," + c + "," : o, null == n && (n = 1);
                        for (_ in t[0]) x.push(_);
                        if (t.length > 1) {
                            for (T = t[t.length - 1], y = !0, p = x.length; --p > -1;)
                                if (_ = x[p], Math.abs(b[_] - T[_]) > .05) {
                                    y = !1;
                                    break
                                }
                            y && (t = t.concat(), f && t.unshift(f), t.push(t[1]), f = t[t.length - 3])
                        }
                        for (e.length = i.length = r.length = 0, p = x.length; --p > -1;) _ = x[p], s[_] = -1 !== c.indexOf("," + _ + ","), w[_] = u(t, _, s[_], f);
                        for (p = e.length; --p > -1;) e[p] = Math.sqrt(e[p]), i[p] = Math.sqrt(i[p]);
                        if (!l) {
                            for (p = x.length; --p > -1;)
                                if (s[_])
                                    for (d = w[x[p]], v = d.length - 1, m = 0; v > m; m++) g = d[m + 1].da / i[m] + d[m].da / e[m], r[m] = (r[m] || 0) + g * g;
                            for (p = r.length; --p > -1;) r[p] = Math.sqrt(r[p])
                        }
                        for (p = x.length, m = a ? 4 : 1; --p > -1;) _ = x[p], d = w[_], h(d, n, a, l, s[_]), y && (d.splice(0, m), d.splice(d.length - m, m));
                        return w
                    },
                    f = function(t, e, i) {
                        e = e || "soft";
                        var r, s, n, o, l, h, u, c, f, p, _, d = {},
                            m = "cubic" === e ? 3 : 2,
                            g = "soft" === e,
                            v = [];
                        if (g && i && (t = [i].concat(t)), null == t || m + 1 > t.length) throw "invalid Bezier data";
                        for (f in t[0]) v.push(f);
                        for (h = v.length; --h > -1;) {
                            for (f = v[h], d[f] = l = [], p = 0, c = t.length, u = 0; c > u; u++) r = null == i ? t[u][f] : "string" == typeof(_ = t[u][f]) && "=" === _.charAt(1) ? i[f] + Number(_.charAt(0) + _.substr(2)) : Number(_), g && u > 1 && c - 1 > u && (l[p++] = (r + l[p - 2]) / 2), l[p++] = r;
                            for (c = p - m + 1, p = 0, u = 0; c > u; u += m) r = l[u], s = l[u + 1], n = l[u + 2], o = 2 === m ? 0 : l[u + 3], l[p++] = _ = 3 === m ? new a(r, s, n, o) : new a(r, (2 * s + r) / 3, (2 * s + n) / 3, n);
                            l.length = p
                        }
                        return d
                    },
                    p = function(t, e, i) {
                        for (var r, s, n, a, o, l, h, u, c, f, p, _ = 1 / i, d = t.length; --d > -1;)
                            for (f = t[d], n = f.a, a = f.d - n, o = f.c - n, l = f.b - n, r = s = 0, u = 1; i >= u; u++) h = _ * u, c = 1 - h, r = s - (s = (h * h * a + 3 * c * (h * o + c * l)) * h), p = d * i + u - 1, e[p] = (e[p] || 0) + r * r
                    },
                    _ = function(t, e) {
                        e = e >> 0 || 6;
                        var i, r, s, n, a = [],
                            o = [],
                            l = 0,
                            h = 0,
                            u = e - 1,
                            c = [],
                            f = [];
                        for (i in t) p(t[i], a, e);
                        for (s = a.length, r = 0; s > r; r++) l += Math.sqrt(a[r]), n = r % e, f[n] = l, n === u && (h += l, n = r / e >> 0, c[n] = f, o[n] = h, l = 0, f = []);
                        return {
                            length: h,
                            lengths: o,
                            segments: c
                        }
                    },
                    d = _gsScope._gsDefine.plugin({
                        propName: "bezier",
                        priority: -1,
                        version: "1.3.4",
                        API: 2,
                        global: !0,
                        init: function(t, e, i) {
                            this._target = t, e instanceof Array && (e = {
                                values: e
                            }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                            var r, s, n, a, o, l = e.values || [],
                                h = {},
                                u = l[0],
                                p = e.autoRotate || i.vars.orientToBezier;
                            this._autoRotate = p ? p instanceof Array ? p : [
                                ["x", "y", "rotation", p === !0 ? 0 : Number(p) || 0]
                            ] : null;
                            for (r in u) this._props.push(r);
                            for (n = this._props.length; --n > -1;) r = this._props[n], this._overwriteProps.push(r), s = this._func[r] = "function" == typeof t[r], h[r] = s ? t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(t[r]), o || h[r] !== l[0][r] && (o = h);
                            if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? c(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, o) : f(l, e.type, h), this._segCount = this._beziers[r].length, this._timeRes) {
                                var d = _(this._beziers, this._timeRes);
                                this._length = d.length, this._lengths = d.lengths, this._segments = d.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                            }
                            if (p = this._autoRotate)
                                for (this._initialRotations = [], p[0] instanceof Array || (this._autoRotate = p = [p]), n = p.length; --n > -1;) {
                                    for (a = 0; 3 > a; a++) r = p[n][a], this._func[r] = "function" == typeof t[r] && t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)];
                                    r = p[n][2], this._initialRotations[n] = this._func[r] ? this._func[r].call(this._target) : this._target[r]
                                }
                            return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
                        },
                        set: function(e) {
                            var i, r, s, n, a, o, l, h, u, c, f = this._segCount,
                                p = this._func,
                                _ = this._target,
                                d = e !== this._startRatio;
                            if (this._timeRes) {
                                if (u = this._lengths, c = this._curSeg, e *= this._length, s = this._li, e > this._l2 && f - 1 > s) {
                                    for (h = f - 1; h > s && e >= (this._l2 = u[++s]););
                                    this._l1 = u[s - 1], this._li = s, this._curSeg = c = this._segments[s], this._s2 = c[this._s1 = this._si = 0]
                                } else if (this._l1 > e && s > 0) {
                                    for (; s > 0 && (this._l1 = u[--s]) >= e;);
                                    0 === s && this._l1 > e ? this._l1 = 0 : s++, this._l2 = u[s], this._li = s, this._curSeg = c = this._segments[s], this._s1 = c[(this._si = c.length - 1) - 1] || 0, this._s2 = c[this._si]
                                }
                                if (i = s, e -= this._l1, s = this._si, e > this._s2 && c.length - 1 > s) {
                                    for (h = c.length - 1; h > s && e >= (this._s2 = c[++s]););
                                    this._s1 = c[s - 1], this._si = s
                                } else if (this._s1 > e && s > 0) {
                                    for (; s > 0 && (this._s1 = c[--s]) >= e;);
                                    0 === s && this._s1 > e ? this._s1 = 0 : s++, this._s2 = c[s], this._si = s
                                }
                                o = (s + (e - this._s1) / (this._s2 - this._s1)) * this._prec
                            } else i = 0 > e ? 0 : e >= 1 ? f - 1 : f * e >> 0, o = (e - i * (1 / f)) * f;
                            for (r = 1 - o, s = this._props.length; --s > -1;) n = this._props[s], a = this._beziers[n][i], l = (o * o * a.da + 3 * r * (o * a.ca + r * a.ba)) * o + a.a, this._round[n] && (l = Math.round(l)), p[n] ? _[n](l) : _[n] = l;
                            if (this._autoRotate) {
                                var m, g, v, y, T, w, x, b = this._autoRotate;
                                for (s = b.length; --s > -1;) n = b[s][2], w = b[s][3] || 0, x = b[s][4] === !0 ? 1 : t, a = this._beziers[b[s][0]], m = this._beziers[b[s][1]], a && m && (a = a[i], m = m[i], g = a.a + (a.b - a.a) * o, y = a.b + (a.c - a.b) * o, g += (y - g) * o, y += (a.c + (a.d - a.c) * o - y) * o, v = m.a + (m.b - m.a) * o, T = m.b + (m.c - m.b) * o, v += (T - v) * o, T += (m.c + (m.d - m.c) * o - T) * o, l = d ? Math.atan2(T - v, y - g) * x + w : this._initialRotations[s], p[n] ? _[n](l) : _[n] = l)
                            }
                        }
                    }),
                    m = d.prototype;
                d.bezierThrough = c, d.cubicToQuadratic = l, d._autoCSS = !0, d.quadraticToCubic = function(t, e, i) {
                    return new a(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
                }, d._cssRegister = function() {
                    var t = n.CSSPlugin;
                    if (t) {
                        var e = t._internals,
                            i = e._parseToProxy,
                            r = e._setPluginRatio,
                            s = e.CSSPropTween;
                        e._registerComplexSpecialProp("bezier", {
                            parser: function(t, e, n, a, o, l) {
                                e instanceof Array && (e = {
                                    values: e
                                }), l = new d;
                                var h, u, c, f = e.values,
                                    p = f.length - 1,
                                    _ = [],
                                    m = {};
                                if (0 > p) return o;
                                for (h = 0; p >= h; h++) c = i(t, f[h], a, o, l, p !== h), _[h] = c.end;
                                for (u in e) m[u] = e[u];
                                return m.values = _, o = new s(t, "bezier", 0, 0, c.pt, 2), o.data = c, o.plugin = l, o.setRatio = r, 0 === m.autoRotate && (m.autoRotate = !0), !m.autoRotate || m.autoRotate instanceof Array || (h = m.autoRotate === !0 ? 0 : Number(m.autoRotate), m.autoRotate = null != c.end.left ? [
                                    ["left", "top", "rotation", h, !1]
                                ] : null != c.end.x && [
                                    ["x", "y", "rotation", h, !1]
                                ]), m.autoRotate && (a._transform || a._enableTransforms(!1), c.autoRotate = a._target._gsTransform), l._onInitTween(c.proxy, m, a._tween), o
                            }
                        })
                    }
                }, m._roundProps = function(t, e) {
                    for (var i = this._overwriteProps, r = i.length; --r > -1;)(t[i[r]] || t.bezier || t.bezierThrough) && (this._round[i[r]] = e)
                }, m._kill = function(t) {
                    var e, i, r = this._props;
                    for (e in this._beziers)
                        if (e in t)
                            for (delete this._beziers[e], delete this._func[e], i = r.length; --i > -1;) r[i] === e && r.splice(i, 1);
                    return this._super._kill.call(this, t)
                }
            }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
                var i, r, s, n, a = function() {
                        t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio
                    },
                    o = _gsScope._gsDefine.globals,
                    l = {},
                    h = a.prototype = new t("css");
                h.constructor = a, a.version = "1.15.1", a.API = 2, a.defaultTransformPerspective = 0, a.defaultSkewType = "compensated", h = "px", a.suffixMap = {
                    top: h,
                    right: h,
                    bottom: h,
                    left: h,
                    width: h,
                    height: h,
                    fontSize: h,
                    padding: h,
                    margin: h,
                    perspective: h,
                    lineHeight: ""
                };
                var u, c, f, p, _, d, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                    g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    y = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                    T = /(?:\d|\-|\+|=|#|\.)*/g,
                    w = /opacity *= *([^)]*)/i,
                    x = /opacity:([^;]*)/i,
                    b = /alpha\(opacity *=.+?\)/i,
                    P = /^(rgb|hsl)/,
                    S = /([A-Z])/g,
                    C = /-([a-z])/gi,
                    k = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    R = function(t, e) {
                        return e.toUpperCase()
                    },
                    O = /(?:Left|Right|Width)/i,
                    A = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    M = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    D = /,(?=[^\)]*(?:\(|$))/gi,
                    z = Math.PI / 180,
                    E = 180 / Math.PI,
                    L = {},
                    F = document,
                    N = function(t) {
                        return F.createElementNS ? F.createElementNS("http://www.w3.org/1999/xhtml", t) : F.createElement(t)
                    },
                    I = N("div"),
                    X = N("img"),
                    B = a._internals = {
                        _specialProps: l
                    },
                    Y = navigator.userAgent,
                    j = function() {
                        var t = Y.indexOf("Android"),
                            e = N("a");
                        return f = -1 !== Y.indexOf("Safari") && -1 === Y.indexOf("Chrome") && (-1 === t || Number(Y.substr(t + 8, 1)) > 3), _ = f && 6 > Number(Y.substr(Y.indexOf("Version/") + 8, 1)), p = -1 !== Y.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Y) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(Y)) && (d = parseFloat(RegExp.$1)), !!e && (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity))
                    }(),
                    U = function(t) {
                        return w.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    },
                    q = function(t) {
                        window.console && console.log(t)
                    },
                    W = "",
                    H = "",
                    V = function(t, e) {
                        e = e || I;
                        var i, r, s = e.style;
                        if (void 0 !== s[t]) return t;
                        for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === s[i[r] + t];);
                        return r >= 0 ? (H = 3 === r ? "ms" : i[r], W = "-" + H.toLowerCase() + "-", H + t) : null
                    },
                    $ = F.defaultView ? F.defaultView.getComputedStyle : function() {},
                    Z = a.getStyle = function(t, e, i, r, s) {
                        var n;
                        return j || "opacity" !== e ? (!r && t.style[e] ? n = t.style[e] : (i = i || $(t)) ? n = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(S, "-$1").toLowerCase()) : t.currentStyle && (n = t.currentStyle[e]), null == s || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : s) : U(t)
                    },
                    G = B.convertToPixels = function(t, i, r, s, n) {
                        if ("px" === s || !s) return r;
                        if ("auto" === s || !r) return 0;
                        var o, l, h, u = O.test(i),
                            c = t,
                            f = I.style,
                            p = 0 > r;
                        if (p && (r = -r), "%" === s && -1 !== i.indexOf("border")) o = r / 100 * (u ? t.clientWidth : t.clientHeight);
                        else {
                            if (f.cssText = "border:0 solid red;position:" + Z(t, "position") + ";line-height:0;", "%" !== s && c.appendChild) f[u ? "borderLeftWidth" : "borderTopWidth"] = r + s;
                            else {
                                if (c = t.parentNode || F.body, l = c._gsCache, h = e.ticker.frame, l && u && l.time === h) return l.width * r / 100;
                                f[u ? "width" : "height"] = r + s
                            }
                            c.appendChild(I), o = parseFloat(I[u ? "offsetWidth" : "offsetHeight"]), c.removeChild(I), u && "%" === s && a.cacheWidths !== !1 && (l = c._gsCache = c._gsCache || {}, l.time = h, l.width = 100 * (o / r)), 0 !== o || n || (o = G(t, i, r, s, !0))
                        }
                        return p ? -o : o
                    },
                    Q = B.calculateOffset = function(t, e, i) {
                        if ("absolute" !== Z(t, "position", i)) return 0;
                        var r = "left" === e ? "Left" : "Top",
                            s = Z(t, "margin" + r, i);
                        return t["offset" + r] - (G(t, e, parseFloat(s), s.replace(T, "")) || 0)
                    },
                    J = function(t, e) {
                        var i, r, s = {};
                        if (e = e || $(t, null))
                            for (i in e)(-1 === i.indexOf("Transform") || xt === i) && (s[i] = e[i]);
                        else if (e = t.currentStyle || t.style)
                            for (i in e) "string" == typeof i && void 0 === s[i] && (s[i.replace(C, R)] = e[i]);
                        return j || (s.opacity = U(t)), r = Dt(t, e, !1), s.rotation = r.rotation, s.skewX = r.skewX, s.scaleX = r.scaleX, s.scaleY = r.scaleY, s.x = r.x, s.y = r.y, St && (s.z = r.z, s.rotationX = r.rotationX, s.rotationY = r.rotationY, s.scaleZ = r.scaleZ), s.filters && delete s.filters, s
                    },
                    K = function(t, e, i, r, s) {
                        var n, a, o, l = {},
                            h = t.style;
                        for (a in i) "cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = i[a]) || s && s[a]) && -1 === a.indexOf("Origin") && ("number" == typeof n || "string" == typeof n) && (l[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(y, "") ? n : 0 : Q(t, a), void 0 !== h[a] && (o = new pt(h, a, h[a], o)));
                        if (r)
                            for (a in r) "className" !== a && (l[a] = r[a]);
                        return {
                            difs: l,
                            firstMPT: o
                        }
                    },
                    tt = {
                        width: ["Left", "Right"],
                        height: ["Top", "Bottom"]
                    },
                    et = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    it = function(t, e, i) {
                        var r = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                            s = tt[e],
                            n = s.length;
                        for (i = i || $(t, null); --n > -1;) r -= parseFloat(Z(t, "padding" + s[n], i, !0)) || 0, r -= parseFloat(Z(t, "border" + s[n] + "Width", i, !0)) || 0;
                        return r
                    },
                    rt = function(t, e) {
                        (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
                        var i = t.split(" "),
                            r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
                            s = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
                        return null == s ? s = "center" === r ? "50%" : "0" : "center" === s && (s = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), e && (e.oxp = -1 !== r.indexOf("%"), e.oyp = -1 !== s.indexOf("%"), e.oxr = "=" === r.charAt(1), e.oyr = "=" === s.charAt(1), e.ox = parseFloat(r.replace(y, "")), e.oy = parseFloat(s.replace(y, ""))), r + " " + s + (i.length > 2 ? " " + i[2] : "")
                    },
                    st = function(t, e) {
                        return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
                    },
                    nt = function(t, e) {
                        return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t)
                    },
                    at = function(t, e, i, r) {
                        var s, n, a, o, l, h = 1e-6;
                        return null == t ? o = e : "number" == typeof t ? o = t : (s = 360, n = t.split("_"), l = "=" === t.charAt(1), a = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(n[0].substr(2)) : parseFloat(n[0])) * (-1 === t.indexOf("rad") ? 1 : E) - (l ? 0 : e), n.length && (r && (r[i] = e + a), -1 !== t.indexOf("short") && (a %= s, a !== a % (s / 2) && (a = 0 > a ? a + s : a - s)), -1 !== t.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * s) % s - (0 | a / s) * s : -1 !== t.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * s) % s - (0 | a / s) * s)), o = e + a), h > o && o > -h && (o = 0), o
                    },
                    ot = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0]
                    },
                    lt = function(t, e, i) {
                        return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5
                    },
                    ht = a.parseColor = function(t) {
                        var e, i, r, s, n, a;
                        return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ot[t] ? ot[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), r = t.charAt(3), t = "#" + e + e + i + i + r + r), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(m), s = Number(t[0]) % 360 / 360, n = Number(t[1]) / 100, a = Number(t[2]) / 100, i = .5 >= a ? a * (n + 1) : a + n - a * n, e = 2 * a - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = lt(s + 1 / 3, e, i), t[1] = lt(s, e, i), t[2] = lt(s - 1 / 3, e, i), t) : (t = t.match(m) || ot.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : ot.black
                    },
                    ut = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
                for (h in ot) ut += "|" + h + "\\b";
                ut = RegExp(ut + ")", "gi");
                var ct = function(t, e, i, r) {
                        if (null == t) return function(t) {
                            return t
                        };
                        var s, n = e ? (t.match(ut) || [""])[0] : "",
                            a = t.split(n).join("").match(v) || [],
                            o = t.substr(0, t.indexOf(a[0])),
                            l = ")" === t.charAt(t.length - 1) ? ")" : "",
                            h = -1 !== t.indexOf(" ") ? " " : ",",
                            u = a.length,
                            c = u > 0 ? a[0].replace(m, "") : "";
                        return u ? s = e ? function(t) {
                            var e, f, p, _;
                            if ("number" == typeof t) t += c;
                            else if (r && D.test(t)) {
                                for (_ = t.replace(D, "|").split("|"), p = 0; _.length > p; p++) _[p] = s(_[p]);
                                return _.join(",")
                            }
                            if (e = (t.match(ut) || [n])[0], f = t.split(e).join("").match(v) || [], p = f.length, u > p--)
                                for (; u > ++p;) f[p] = i ? f[0 | (p - 1) / 2] : a[p];
                            return o + f.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
                        } : function(t) {
                            var e, n, f;
                            if ("number" == typeof t) t += c;
                            else if (r && D.test(t)) {
                                for (n = t.replace(D, "|").split("|"), f = 0; n.length > f; f++) n[f] = s(n[f]);
                                return n.join(",")
                            }
                            if (e = t.match(v) || [], f = e.length, u > f--)
                                for (; u > ++f;) e[f] = i ? e[0 | (f - 1) / 2] : a[f];
                            return o + e.join(h) + l
                        } : function(t) {
                            return t
                        }
                    },
                    ft = function(t) {
                        return t = t.split(","),
                            function(e, i, r, s, n, a, o) {
                                var l, h = (i + "").split(" ");
                                for (o = {}, l = 0; 4 > l; l++) o[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
                                return s.parse(e, o, n, a)
                            }
                    },
                    pt = (B._setPluginRatio = function(t) {
                        this.plugin.setRatio(t);
                        for (var e, i, r, s, n = this.data, a = n.proxy, o = n.firstMPT, l = 1e-6; o;) e = a[o.v], o.r ? e = Math.round(e) : l > e && e > -l && (e = 0), o.t[o.p] = e, o = o._next;
                        if (n.autoRotate && (n.autoRotate.rotation = a.rotation), 1 === t)
                            for (o = n.firstMPT; o;) {
                                if (i = o.t, i.type) {
                                    if (1 === i.type) {
                                        for (s = i.xs0 + i.s + i.xs1, r = 1; i.l > r; r++) s += i["xn" + r] + i["xs" + (r + 1)];
                                        i.e = s
                                    }
                                } else i.e = i.s + i.xs0;
                                o = o._next
                            }
                    }, function(t, e, i, r, s) {
                        this.t = t, this.p = e, this.v = i, this.r = s, r && (r._prev = this, this._next = r)
                    }),
                    _t = (B._parseToProxy = function(t, e, i, r, s, n) {
                        var a, o, l, h, u, c = r,
                            f = {},
                            p = {},
                            _ = i._transform,
                            d = L;
                        for (i._transform = null, L = e, r = u = i.parse(t, e, r, s), L = d, n && (i._transform = _, c && (c._prev = null, c._prev && (c._prev._next = null))); r && r !== c;) {
                            if (1 >= r.type && (o = r.p, p[o] = r.s + r.c, f[o] = r.s, n || (h = new pt(r, "s", o, h, r.r), r.c = 0), 1 === r.type))
                                for (a = r.l; --a > 0;) l = "xn" + a, o = r.p + "_" + l, p[o] = r.data[l], f[o] = r[l], n || (h = new pt(r, l, o, h, r.rxp[l]));
                            r = r._next
                        }
                        return {
                            proxy: f,
                            end: p,
                            firstMPT: h,
                            pt: u
                        }
                    }, B.CSSPropTween = function(t, e, r, s, a, o, l, h, u, c, f) {
                        this.t = t, this.p = e, this.s = r, this.c = s, this.n = l || e, t instanceof _t || n.push(this.n), this.r = h, this.type = o || 0, u && (this.pr = u, i = !0), this.b = void 0 === c ? r : c, this.e = void 0 === f ? r + s : f, a && (this._next = a, a._prev = this)
                    }),
                    dt = a.parseComplex = function(t, e, i, r, s, n, a, o, l, h) {
                        i = i || n || "", a = new _t(t, e, 0, 0, a, h ? 2 : 1, null, (!1), o, i, r), r += "";
                        var c, f, p, _, d, v, y, T, w, x, b, S, C = i.split(", ").join(",").split(" "),
                            k = r.split(", ").join(",").split(" "),
                            R = C.length,
                            O = u !== !1;
                        for ((-1 !== r.indexOf(",") || -1 !== i.indexOf(",")) && (C = C.join(" ").replace(D, ", ").split(" "), k = k.join(" ").replace(D, ", ").split(" "), R = C.length), R !== k.length && (C = (n || "").split(" "), R = C.length), a.plugin = l, a.setRatio = h, c = 0; R > c; c++)
                            if (_ = C[c], d = k[c], T = parseFloat(_), T || 0 === T) a.appendXtra("", T, st(d, T), d.replace(g, ""), O && -1 !== d.indexOf("px"), !0);
                            else if (s && ("#" === _.charAt(0) || ot[_] || P.test(_))) S = "," === d.charAt(d.length - 1) ? ")," : ")", _ = ht(_), d = ht(d), w = _.length + d.length > 6, w && !j && 0 === d[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(k[c]).join("transparent")) : (j || (w = !1), a.appendXtra(w ? "rgba(" : "rgb(", _[0], d[0] - _[0], ",", !0, !0).appendXtra("", _[1], d[1] - _[1], ",", !0).appendXtra("", _[2], d[2] - _[2], w ? "," : S, !0),
                            w && (_ = 4 > _.length ? 1 : _[3], a.appendXtra("", _, (4 > d.length ? 1 : d[3]) - _, S, !1)));
                        else if (v = _.match(m)) {
                            if (y = d.match(g), !y || y.length !== v.length) return a;
                            for (p = 0, f = 0; v.length > f; f++) b = v[f], x = _.indexOf(b, p), a.appendXtra(_.substr(p, x - p), Number(b), st(y[f], b), "", O && "px" === _.substr(x + b.length, 2), 0 === f), p = x + b.length;
                            a["xs" + a.l] += _.substr(p)
                        } else a["xs" + a.l] += a.l ? " " + _ : _;
                        if (-1 !== r.indexOf("=") && a.data) {
                            for (S = a.xs0 + a.data.s, c = 1; a.l > c; c++) S += a["xs" + c] + a.data["xn" + c];
                            a.e = S + a["xs" + c]
                        }
                        return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
                    },
                    mt = 9;
                for (h = _t.prototype, h.l = h.pr = 0; --mt > 0;) h["xn" + mt] = 0, h["xs" + mt] = "";
                h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, h.appendXtra = function(t, e, i, r, s, n) {
                    var a = this,
                        o = a.l;
                    return a["xs" + o] += n && o ? " " + t : t || "", i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = r || "", o > 0 ? (a.data["xn" + o] = e + i, a.rxp["xn" + o] = s, a["xn" + o] = e, a.plugin || (a.xfirst = new _t(a, "xn" + o, e, i, a.xfirst || a, 0, a.n, s, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {
                        s: e + i
                    }, a.rxp = {}, a.s = e, a.c = i, a.r = s, a)) : (a["xs" + o] += e + (r || ""), a)
                };
                var gt = function(t, e) {
                        e = e || {}, this.p = e.prefix ? V(t) || t : t, l[t] = l[this.p] = this, this.format = e.formatter || ct(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                    },
                    vt = B._registerComplexSpecialProp = function(t, e, i) {
                        "object" != typeof e && (e = {
                            parser: i
                        });
                        var r, s, n = t.split(","),
                            a = e.defaultValue;
                        for (i = i || [a], r = 0; n.length > r; r++) e.prefix = 0 === r && e.prefix, e.defaultValue = i[r] || a, s = new gt(n[r], e)
                    },
                    yt = function(t) {
                        if (!l[t]) {
                            var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                            vt(t, {
                                parser: function(t, i, r, s, n, a, h) {
                                    var u = o.com.greensock.plugins[e];
                                    return u ? (u._cssRegister(), l[r].parse(t, i, r, s, n, a, h)) : (q("Error: " + e + " js file not loaded."), n)
                                }
                            })
                        }
                    };
                h = gt.prototype, h.parseComplex = function(t, e, i, r, s, n) {
                    var a, o, l, h, u, c, f = this.keyword;
                    if (this.multi && (D.test(i) || D.test(e) ? (o = e.replace(D, "|").split("|"), l = i.replace(D, "|").split("|")) : f && (o = [e], l = [i])), l) {
                        for (h = l.length > o.length ? l.length : o.length, a = 0; h > a; a++) e = o[a] = o[a] || this.dflt, i = l[a] = l[a] || this.dflt, f && (u = e.indexOf(f), c = i.indexOf(f), u !== c && (i = -1 === c ? l : o, i[a] += " " + f));
                        e = o.join(", "), i = l.join(", ")
                    }
                    return dt(t, this.p, e, i, this.clrs, this.dflt, r, this.pr, s, n)
                }, h.parse = function(t, e, i, r, n, a) {
                    return this.parseComplex(t.style, this.format(Z(t, this.p, s, !1, this.dflt)), this.format(e), n, a)
                }, a.registerSpecialProp = function(t, e, i) {
                    vt(t, {
                        parser: function(t, r, s, n, a, o) {
                            var l = new _t(t, s, 0, 0, a, 2, s, (!1), i);
                            return l.plugin = o, l.setRatio = e(t, r, n._tween, s), l
                        },
                        priority: i
                    })
                };
                var Tt, wt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                    xt = V("transform"),
                    bt = W + "transform",
                    Pt = V("transformOrigin"),
                    St = null !== V("perspective"),
                    Ct = B.Transform = function() {
                        this.perspective = parseFloat(a.defaultTransformPerspective) || 0, this.force3D = !(a.defaultForce3D === !1 || !St) && (a.defaultForce3D || "auto")
                    },
                    kt = window.SVGElement,
                    Rt = function(t, e, i) {
                        var r, s = F.createElementNS("http://www.w3.org/2000/svg", t),
                            n = /([a-z])([A-Z])/g;
                        for (r in i) s.setAttributeNS(null, r.replace(n, "$1-$2").toLowerCase(), i[r]);
                        return e.appendChild(s), s
                    },
                    Ot = document.documentElement,
                    At = function() {
                        var t, e, i, r = d || /Android/i.test(Y) && !window.chrome;
                        return F.createElementNS && !r && (t = Rt("svg", Ot), e = Rt("rect", t, {
                            width: 100,
                            height: 50,
                            x: 100
                        }), i = e.getBoundingClientRect().width, e.style[Pt] = "50% 50%", e.style[xt] = "scaleX(0.5)", r = i === e.getBoundingClientRect().width && !(p && St), Ot.removeChild(t)), r
                    }(),
                    Mt = function(t, e, i) {
                        var r = t.getBBox();
                        e = rt(e).split(" "), i.xOrigin = (-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * r.width : parseFloat(e[0])) + r.x, i.yOrigin = (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * r.height : parseFloat(e[1])) + r.y
                    },
                    Dt = B.getTransform = function(t, e, i, r) {
                        if (t._gsTransform && i && !r) return t._gsTransform;
                        var n, o, l, h, u, c, f, p, _, d, m = i ? t._gsTransform || new Ct : new Ct,
                            g = 0 > m.scaleX,
                            v = 2e-5,
                            y = 1e5,
                            T = St ? parseFloat(Z(t, Pt, e, !1, "0 0 0").split(" ")[2]) || m.zOrigin || 0 : 0,
                            w = parseFloat(a.defaultTransformPerspective) || 0;
                        if (xt ? o = Z(t, bt, e, !0) : t.currentStyle && (o = t.currentStyle.filter.match(A), o = o && 4 === o.length ? [o[0].substr(4), Number(o[2].substr(4)), Number(o[1].substr(4)), o[3].substr(4), m.x || 0, m.y || 0].join(",") : ""), n = !o || "none" === o || "matrix(1, 0, 0, 1, 0, 0)" === o, m.svg = !!(kt && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM)), m.svg && (Mt(t, Z(t, Pt, s, !1, "50% 50%") + "", m), Tt = a.useSVGTransformAttr || At, l = t.getAttribute("transform"), n && l && -1 !== l.indexOf("matrix") && (o = l, n = 0)), !n) {
                            for (l = (o || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], h = l.length; --h > -1;) u = Number(l[h]), l[h] = (c = u - (u |= 0)) ? (0 | c * y + (0 > c ? -.5 : .5)) / y + u : u;
                            if (16 === l.length) {
                                var x, b, P, S, C, k = l[0],
                                    R = l[1],
                                    O = l[2],
                                    M = l[3],
                                    D = l[4],
                                    z = l[5],
                                    L = l[6],
                                    F = l[7],
                                    N = l[8],
                                    I = l[9],
                                    X = l[10],
                                    B = l[12],
                                    Y = l[13],
                                    j = l[14],
                                    U = l[11],
                                    q = Math.atan2(L, X);
                                m.zOrigin && (j = -m.zOrigin, B = N * j - l[12], Y = I * j - l[13], j = X * j + m.zOrigin - l[14]), m.rotationX = q * E, q && (S = Math.cos(-q), C = Math.sin(-q), x = D * S + N * C, b = z * S + I * C, P = L * S + X * C, N = D * -C + N * S, I = z * -C + I * S, X = L * -C + X * S, U = F * -C + U * S, D = x, z = b, L = P), q = Math.atan2(N, X), m.rotationY = q * E, q && (S = Math.cos(-q), C = Math.sin(-q), x = k * S - N * C, b = R * S - I * C, P = O * S - X * C, I = R * C + I * S, X = O * C + X * S, U = M * C + U * S, k = x, R = b, O = P), q = Math.atan2(R, k), m.rotation = q * E, q && (S = Math.cos(-q), C = Math.sin(-q), k = k * S + D * C, b = R * S + z * C, z = R * -C + z * S, L = O * -C + L * S, R = b), m.rotationX && Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 && (m.rotationX = m.rotation = 0, m.rotationY += 180), m.scaleX = (0 | Math.sqrt(k * k + R * R) * y + .5) / y, m.scaleY = (0 | Math.sqrt(z * z + I * I) * y + .5) / y, m.scaleZ = (0 | Math.sqrt(L * L + X * X) * y + .5) / y, m.skewX = 0, m.perspective = U ? 1 / (0 > U ? -U : U) : 0, m.x = B, m.y = Y, m.z = j
                            } else if (!(St && !r && l.length && m.x === l[4] && m.y === l[5] && (m.rotationX || m.rotationY) || void 0 !== m.x && "none" === Z(t, "display", e))) {
                                var W = l.length >= 6,
                                    H = W ? l[0] : 1,
                                    V = l[1] || 0,
                                    $ = l[2] || 0,
                                    G = W ? l[3] : 1;
                                m.x = l[4] || 0, m.y = l[5] || 0, f = Math.sqrt(H * H + V * V), p = Math.sqrt(G * G + $ * $), _ = H || V ? Math.atan2(V, H) * E : m.rotation || 0, d = $ || G ? Math.atan2($, G) * E + _ : m.skewX || 0, Math.abs(d) > 90 && 270 > Math.abs(d) && (g ? (f *= -1, d += 0 >= _ ? 180 : -180, _ += 0 >= _ ? 180 : -180) : (p *= -1, d += 0 >= d ? 180 : -180)), m.scaleX = f, m.scaleY = p, m.rotation = _, m.skewX = d, St && (m.rotationX = m.rotationY = m.z = 0, m.perspective = w, m.scaleZ = 1)
                            }
                            m.zOrigin = T;
                            for (h in m) v > m[h] && m[h] > -v && (m[h] = 0)
                        }
                        return i && (t._gsTransform = m), m
                    },
                    zt = function(t) {
                        var e, i, r = this.data,
                            s = -r.rotation * z,
                            n = s + r.skewX * z,
                            a = 1e5,
                            o = (0 | Math.cos(s) * r.scaleX * a) / a,
                            l = (0 | Math.sin(s) * r.scaleX * a) / a,
                            h = (0 | Math.sin(n) * -r.scaleY * a) / a,
                            u = (0 | Math.cos(n) * r.scaleY * a) / a,
                            c = this.t.style,
                            f = this.t.currentStyle;
                        if (f) {
                            i = l, l = -h, h = -i, e = f.filter, c.filter = "";
                            var p, _, m = this.t.offsetWidth,
                                g = this.t.offsetHeight,
                                v = "absolute" !== f.position,
                                y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + l + ", M21=" + h + ", M22=" + u,
                                x = r.x + m * r.xPercent / 100,
                                b = r.y + g * r.yPercent / 100;
                            if (null != r.ox && (p = (r.oxp ? .01 * m * r.ox : r.ox) - m / 2, _ = (r.oyp ? .01 * g * r.oy : r.oy) - g / 2, x += p - (p * o + _ * l), b += _ - (p * h + _ * u)), v ? (p = m / 2, _ = g / 2, y += ", Dx=" + (p - (p * o + _ * l) + x) + ", Dy=" + (_ - (p * h + _ * u) + b) + ")") : y += ", sizingMethod='auto expand')", c.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(M, y) : y + " " + e, (0 === t || 1 === t) && 1 === o && 0 === l && 0 === h && 1 === u && (v && -1 === y.indexOf("Dx=0, Dy=0") || w.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && c.removeAttribute("filter")), !v) {
                                var P, S, C, k = 8 > d ? 1 : -1;
                                for (p = r.ieOffsetX || 0, _ = r.ieOffsetY || 0, r.ieOffsetX = Math.round((m - ((0 > o ? -o : o) * m + (0 > l ? -l : l) * g)) / 2 + x), r.ieOffsetY = Math.round((g - ((0 > u ? -u : u) * g + (0 > h ? -h : h) * m)) / 2 + b), mt = 0; 4 > mt; mt++) S = et[mt], P = f[S], i = -1 !== P.indexOf("px") ? parseFloat(P) : G(this.t, S, parseFloat(P), P.replace(T, "")) || 0, C = i !== r[S] ? 2 > mt ? -r.ieOffsetX : -r.ieOffsetY : 2 > mt ? p - r.ieOffsetX : _ - r.ieOffsetY, c[S] = (r[S] = Math.round(i - C * (0 === mt || 2 === mt ? 1 : k))) + "px"
                            }
                        }
                    },
                    Et = B.set3DTransformRatio = function(t) {
                        var e, i, r, s, n, a, o, l, h, u, c, f, _, d, m, g, v, y, T, w, x, b = this.data,
                            P = this.t.style,
                            S = b.rotation * z,
                            C = b.scaleX,
                            k = b.scaleY,
                            R = b.scaleZ,
                            O = b.x,
                            A = b.y,
                            M = b.z,
                            D = b.perspective;
                        if (!(1 !== t && 0 !== t && b.force3D || b.force3D === !0 || b.rotationY || b.rotationX || 1 !== R || D || M)) return void Lt.call(this, t);
                        if (p && (d = 1e-4, d > C && C > -d && (C = R = 2e-5), d > k && k > -d && (k = R = 2e-5), !D || b.z || b.rotationX || b.rotationY || (D = 0)), S || b.skewX) m = e = Math.cos(S), g = s = Math.sin(S), b.skewX && (S -= b.skewX * z, m = Math.cos(S), g = Math.sin(S), "simple" === b.skewType && (v = Math.tan(b.skewX * z), v = Math.sqrt(1 + v * v), m *= v, g *= v)), i = -g, n = m;
                        else {
                            if (!(b.rotationY || b.rotationX || 1 !== R || D || b.svg)) return void(P[xt] = (b.xPercent || b.yPercent ? "translate(" + b.xPercent + "%," + b.yPercent + "%) translate3d(" : "translate3d(") + O + "px," + A + "px," + M + "px)" + (1 !== C || 1 !== k ? " scale(" + C + "," + k + ")" : ""));
                            e = n = 1, i = s = 0
                        }
                        h = 1, r = a = o = l = u = c = 0, f = D ? -1 / D : 0, _ = b.zOrigin, d = 1e-6, w = ",", x = "0", S = b.rotationY * z, S && (m = Math.cos(S), g = Math.sin(S), o = -g, u = f * -g, r = e * g, a = s * g, h = m, f *= m, e *= m, s *= m), S = b.rotationX * z, S && (m = Math.cos(S), g = Math.sin(S), v = i * m + r * g, y = n * m + a * g, l = h * g, c = f * g, r = i * -g + r * m, a = n * -g + a * m, h *= m, f *= m, i = v, n = y), 1 !== R && (r *= R, a *= R, h *= R, f *= R), 1 !== k && (i *= k, n *= k, l *= k, c *= k), 1 !== C && (e *= C, s *= C, o *= C, u *= C), (_ || b.svg) && (_ && (O += r * -_, A += a * -_, M += h * -_ + _), b.svg && (O += b.xOrigin - (b.xOrigin * e + b.yOrigin * i), A += b.yOrigin - (b.xOrigin * s + b.yOrigin * n)), d > O && O > -d && (O = x), d > A && A > -d && (A = x), d > M && M > -d && (M = 0)), T = b.xPercent || b.yPercent ? "translate(" + b.xPercent + "%," + b.yPercent + "%) matrix3d(" : "matrix3d(", T += (d > e && e > -d ? x : e) + w + (d > s && s > -d ? x : s) + w + (d > o && o > -d ? x : o), T += w + (d > u && u > -d ? x : u) + w + (d > i && i > -d ? x : i) + w + (d > n && n > -d ? x : n), b.rotationX || b.rotationY ? (T += w + (d > l && l > -d ? x : l) + w + (d > c && c > -d ? x : c) + w + (d > r && r > -d ? x : r), T += w + (d > a && a > -d ? x : a) + w + (d > h && h > -d ? x : h) + w + (d > f && f > -d ? x : f) + w) : T += ",0,0,0,0,1,0,", T += O + w + A + w + M + w + (D ? 1 + -M / D : 1) + ")", P[xt] = T
                    },
                    Lt = B.set2DTransformRatio = function(t) {
                        var e, i, r, s, n, a, o, l, h, u, c, f = this.data,
                            p = this.t,
                            _ = p.style,
                            d = f.x,
                            m = f.y;
                        return !(f.rotationX || f.rotationY || f.z || f.force3D === !0 || "auto" === f.force3D && 1 !== t && 0 !== t) || f.svg && Tt || !St ? (s = f.scaleX, n = f.scaleY, void(f.rotation || f.skewX || f.svg ? (e = f.rotation * z, i = e - f.skewX * z, r = 1e5, a = Math.cos(e) * s, o = Math.sin(e) * s, l = Math.sin(i) * -n, h = Math.cos(i) * n, f.svg && (d += f.xOrigin - (f.xOrigin * a + f.yOrigin * l), m += f.yOrigin - (f.xOrigin * o + f.yOrigin * h), c = 1e-6, c > d && d > -c && (d = 0), c > m && m > -c && (m = 0)), u = (0 | a * r) / r + "," + (0 | o * r) / r + "," + (0 | l * r) / r + "," + (0 | h * r) / r + "," + d + "," + m + ")", f.svg && Tt ? p.setAttribute("transform", "matrix(" + u) : _[xt] = (f.xPercent || f.yPercent ? "translate(" + f.xPercent + "%," + f.yPercent + "%) matrix(" : "matrix(") + u) : _[xt] = (f.xPercent || f.yPercent ? "translate(" + f.xPercent + "%," + f.yPercent + "%) matrix(" : "matrix(") + s + ",0,0," + n + "," + d + "," + m + ")")) : (this.setRatio = Et, void Et.call(this, t))
                    };
                h = Ct.prototype, h.x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = 0, h.scaleX = h.scaleY = h.scaleZ = 1, vt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent", {
                    parser: function(t, e, i, r, n, o, l) {
                        if (r._lastParsedTransform === l) return n;
                        r._lastParsedTransform = l;
                        var h, u, c, f, p, _, d, m = r._transform = Dt(t, s, !0, l.parseTransform),
                            g = t.style,
                            v = 1e-6,
                            y = wt.length,
                            T = l,
                            w = {};
                        if ("string" == typeof T.transform && xt) c = I.style, c[xt] = T.transform, c.display = "block", c.position = "absolute", F.body.appendChild(I), h = Dt(I, null, !1), F.body.removeChild(I);
                        else if ("object" == typeof T) {
                            if (h = {
                                    scaleX: nt(null != T.scaleX ? T.scaleX : T.scale, m.scaleX),
                                    scaleY: nt(null != T.scaleY ? T.scaleY : T.scale, m.scaleY),
                                    scaleZ: nt(T.scaleZ, m.scaleZ),
                                    x: nt(T.x, m.x),
                                    y: nt(T.y, m.y),
                                    z: nt(T.z, m.z),
                                    xPercent: nt(T.xPercent, m.xPercent),
                                    yPercent: nt(T.yPercent, m.yPercent),
                                    perspective: nt(T.transformPerspective, m.perspective)
                                }, d = T.directionalRotation, null != d)
                                if ("object" == typeof d)
                                    for (c in d) T[c] = d[c];
                                else T.rotation = d;
                            "string" == typeof T.x && -1 !== T.x.indexOf("%") && (h.x = 0, h.xPercent = nt(T.x, m.xPercent)), "string" == typeof T.y && -1 !== T.y.indexOf("%") && (h.y = 0, h.yPercent = nt(T.y, m.yPercent)), h.rotation = at("rotation" in T ? T.rotation : "shortRotation" in T ? T.shortRotation + "_short" : "rotationZ" in T ? T.rotationZ : m.rotation, m.rotation, "rotation", w), St && (h.rotationX = at("rotationX" in T ? T.rotationX : "shortRotationX" in T ? T.shortRotationX + "_short" : m.rotationX || 0, m.rotationX, "rotationX", w), h.rotationY = at("rotationY" in T ? T.rotationY : "shortRotationY" in T ? T.shortRotationY + "_short" : m.rotationY || 0, m.rotationY, "rotationY", w)), h.skewX = null == T.skewX ? m.skewX : at(T.skewX, m.skewX), h.skewY = null == T.skewY ? m.skewY : at(T.skewY, m.skewY), (u = h.skewY - m.skewY) && (h.skewX += u, h.rotation += u)
                        }
                        for (St && null != T.force3D && (m.force3D = T.force3D, _ = !0), m.skewType = T.skewType || m.skewType || a.defaultSkewType, p = m.force3D || m.z || m.rotationX || m.rotationY || h.z || h.rotationX || h.rotationY || h.perspective, p || null == T.scale || (h.scaleZ = 1); --y > -1;) i = wt[y], f = h[i] - m[i], (f > v || -v > f || null != T[i] || null != L[i]) && (_ = !0, n = new _t(m, i, m[i], f, n), i in w && (n.e = w[i]), n.xs0 = 0, n.plugin = o, r._overwriteProps.push(n.n));
                        return f = T.transformOrigin, f && m.svg && (Mt(t, rt(f), h), n = new _t(m, "xOrigin", m.xOrigin, h.xOrigin - m.xOrigin, n, (-1), "transformOrigin"), n.b = m.xOrigin, n.e = n.xs0 = h.xOrigin, n = new _t(m, "yOrigin", m.yOrigin, h.yOrigin - m.yOrigin, n, (-1), "transformOrigin"), n.b = m.yOrigin, n.e = n.xs0 = h.yOrigin, f = "0px 0px"), (f || St && p && m.zOrigin) && (xt ? (_ = !0, i = Pt, f = (f || Z(t, i, s, !1, "50% 50%")) + "", n = new _t(g, i, 0, 0, n, (-1), "transformOrigin"), n.b = g[i], n.plugin = o, St ? (c = m.zOrigin, f = f.split(" "), m.zOrigin = (f.length > 2 && (0 === c || "0px" !== f[2]) ? parseFloat(f[2]) : c) || 0, n.xs0 = n.e = f[0] + " " + (f[1] || "50%") + " 0px", n = new _t(m, "zOrigin", 0, 0, n, (-1), n.n), n.b = c, n.xs0 = n.e = m.zOrigin) : n.xs0 = n.e = f) : rt(f + "", m)), _ && (r._transformType = m.svg && Tt || !p && 3 !== this._transformType ? 2 : 3), n
                    },
                    prefix: !0
                }), vt("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }), vt("borderRadius", {
                    defaultValue: "0px",
                    parser: function(t, e, i, n, a) {
                        e = this.format(e);
                        var o, l, h, u, c, f, p, _, d, m, g, v, y, T, w, x, b = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            P = t.style;
                        for (d = parseFloat(t.offsetWidth), m = parseFloat(t.offsetHeight), o = e.split(" "), l = 0; b.length > l; l++) this.p.indexOf("border") && (b[l] = V(b[l])), c = u = Z(t, b[l], s, !1, "0px"), -1 !== c.indexOf(" ") && (u = c.split(" "), c = u[0], u = u[1]), f = h = o[l], p = parseFloat(c), v = c.substr((p + "").length), y = "=" === f.charAt(1), y ? (_ = parseInt(f.charAt(0) + "1", 10), f = f.substr(2), _ *= parseFloat(f), g = f.substr((_ + "").length - (0 > _ ? 1 : 0)) || "") : (_ = parseFloat(f), g = f.substr((_ + "").length)), "" === g && (g = r[i] || v), g !== v && (T = G(t, "borderLeft", p, v), w = G(t, "borderTop", p, v), "%" === g ? (c = 100 * (T / d) + "%", u = 100 * (w / m) + "%") : "em" === g ? (x = G(t, "borderLeft", 1, "em"), c = T / x + "em", u = w / x + "em") : (c = T + "px", u = w + "px"), y && (f = parseFloat(c) + _ + g, h = parseFloat(u) + _ + g)), a = dt(P, b[l], c + " " + u, f + " " + h, !1, "0px", a);
                        return a
                    },
                    prefix: !0,
                    formatter: ct("0px 0px 0px 0px", !1, !0)
                }), vt("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function(t, e, i, r, n, a) {
                        var o, l, h, u, c, f, p = "background-position",
                            _ = s || $(t, null),
                            m = this.format((_ ? d ? _.getPropertyValue(p + "-x") + " " + _.getPropertyValue(p + "-y") : _.getPropertyValue(p) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                            g = this.format(e);
                        if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && (f = Z(t, "backgroundImage").replace(k, ""), f && "none" !== f)) {
                            for (o = m.split(" "), l = g.split(" "), X.setAttribute("src", f), h = 2; --h > -1;) m = o[h], u = -1 !== m.indexOf("%"), u !== (-1 !== l[h].indexOf("%")) && (c = 0 === h ? t.offsetWidth - X.width : t.offsetHeight - X.height, o[h] = u ? parseFloat(m) / 100 * c + "px" : 100 * (parseFloat(m) / c) + "%");
                            m = o.join(" ")
                        }
                        return this.parseComplex(t.style, m, g, n, a)
                    },
                    formatter: rt
                }), vt("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: rt
                }), vt("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }), vt("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }), vt("transformStyle", {
                    prefix: !0
                }), vt("backfaceVisibility", {
                    prefix: !0
                }), vt("userSelect", {
                    prefix: !0
                }), vt("margin", {
                    parser: ft("marginTop,marginRight,marginBottom,marginLeft")
                }), vt("padding", {
                    parser: ft("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }), vt("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function(t, e, i, r, n, a) {
                        var o, l, h;
                        return 9 > d ? (l = t.currentStyle, h = 8 > d ? " " : ",", o = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", e = this.format(e).split(",").join(h)) : (o = this.format(Z(t, this.p, s, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, n, a)
                    }
                }), vt("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }), vt("autoRound,strictUnits", {
                    parser: function(t, e, i, r, s) {
                        return s
                    }
                }), vt("border", {
                    defaultValue: "0px solid #000",
                    parser: function(t, e, i, r, n, a) {
                        return this.parseComplex(t.style, this.format(Z(t, "borderTopWidth", s, !1, "0px") + " " + Z(t, "borderTopStyle", s, !1, "solid") + " " + Z(t, "borderTopColor", s, !1, "#000")), this.format(e), n, a)
                    },
                    color: !0,
                    formatter: function(t) {
                        var e = t.split(" ");
                        return e[0] + " " + (e[1] || "solid") + " " + (t.match(ut) || ["#000"])[0]
                    }
                }), vt("borderWidth", {
                    parser: ft("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                }), vt("float,cssFloat,styleFloat", {
                    parser: function(t, e, i, r, s) {
                        var n = t.style,
                            a = "cssFloat" in n ? "cssFloat" : "styleFloat";
                        return new _t(n, a, 0, 0, s, (-1), i, (!1), 0, n[a], e)
                    }
                });
                var Ft = function(t) {
                    var e, i = this.t,
                        r = i.filter || Z(this.data, "filter") || "",
                        s = 0 | this.s + this.c * t;
                    100 === s && (-1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") && -1 === r.indexOf("oader(") ? (i.removeAttribute("filter"), e = !Z(this.data, "filter")) : (i.filter = r.replace(b, ""), e = !0)), e || (this.xn1 && (i.filter = r = r || "alpha(opacity=" + s + ")"), -1 === r.indexOf("pacity") ? 0 === s && this.xn1 || (i.filter = r + " alpha(opacity=" + s + ")") : i.filter = r.replace(w, "opacity=" + s))
                };
                vt("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function(t, e, i, r, n, a) {
                        var o = parseFloat(Z(t, "opacity", s, !1, "1")),
                            l = t.style,
                            h = "autoAlpha" === i;
                        return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o), h && 1 === o && "hidden" === Z(t, "visibility", s) && 0 !== e && (o = 0), j ? n = new _t(l, "opacity", o, e - o, n) : (n = new _t(l, "opacity", 100 * o, 100 * (e - o), n), n.xn1 = h ? 1 : 0, l.zoom = 1, n.type = 2, n.b = "alpha(opacity=" + n.s + ")", n.e = "alpha(opacity=" + (n.s + n.c) + ")", n.data = t, n.plugin = a, n.setRatio = Ft), h && (n = new _t(l, "visibility", 0, 0, n, (-1), null, (!1), 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), n.xs0 = "inherit", r._overwriteProps.push(n.n), r._overwriteProps.push(i)), n
                    }
                });
                var Nt = function(t, e) {
                        e && (t.removeProperty ? ("ms" === e.substr(0, 2) && (e = "M" + e.substr(1)), t.removeProperty(e.replace(S, "-$1").toLowerCase())) : t.removeAttribute(e))
                    },
                    It = function(t) {
                        if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                            this.t.setAttribute("class", 0 === t ? this.b : this.e);
                            for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Nt(i, e.p), e = e._next;
                            1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                        } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                    };
                vt("className", {
                    parser: function(t, e, r, n, a, o, l) {
                        var h, u, c, f, p, _ = t.getAttribute("class") || "",
                            d = t.style.cssText;
                        if (a = n._classNamePT = new _t(t, r, 0, 0, a, 2), a.setRatio = It, a.pr = -11, i = !0, a.b = _, u = J(t, s), c = t._gsClassPT) {
                            for (f = {}, p = c.data; p;) f[p.p] = 1, p = p._next;
                            c.setRatio(1)
                        }
                        return t._gsClassPT = a, a.e = "=" !== e.charAt(1) ? e : _.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), n._tween._duration && (t.setAttribute("class", a.e), h = K(t, u, J(t), l, f), t.setAttribute("class", _), a.data = h.firstMPT, t.style.cssText = d, a = a.xfirst = n.parse(t, h.difs, a, o)), a
                    }
                });
                var Xt = function(t) {
                    if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                        var e, i, r, s, n = this.t.style,
                            a = l.transform.parse;
                        if ("all" === this.e) n.cssText = "", s = !0;
                        else
                            for (e = this.e.split(" ").join("").split(","), r = e.length; --r > -1;) i = e[r], l[i] && (l[i].parse === a ? s = !0 : i = "transformOrigin" === i ? Pt : l[i].p), Nt(n, i);
                        s && (Nt(n, xt), this.t._gsTransform && delete this.t._gsTransform)
                    }
                };
                for (vt("clearProps", {
                        parser: function(t, e, r, s, n) {
                            return n = new _t(t, r, 0, 0, n, 2), n.setRatio = Xt, n.e = e, n.pr = -10, n.data = s._tween, i = !0, n
                        }
                    }), h = "bezier,throwProps,physicsProps,physics2D".split(","), mt = h.length; mt--;) yt(h[mt]);
                h = a.prototype, h._firstPT = h._lastParsedTransform = h._transform = null, h._onInitTween = function(t, e, o) {
                    if (!t.nodeType) return !1;
                    this._target = t, this._tween = o, this._vars = e, u = e.autoRound, i = !1, r = e.suffixMap || a.suffixMap, s = $(t, ""), n = this._overwriteProps;
                    var l, h, p, d, m, g, v, y, T, w = t.style;
                    if (c && "" === w.zIndex && (l = Z(t, "zIndex", s), ("auto" === l || "" === l) && this._addLazySet(w, "zIndex", 0)), "string" == typeof e && (d = w.cssText, l = J(t, s), w.cssText = d + ";" + e, l = K(t, l, J(t)).difs, !j && x.test(e) && (l.opacity = parseFloat(RegExp.$1)), e = l, w.cssText = d), this._firstPT = h = this.parse(t, e, null), this._transformType) {
                        for (T = 3 === this._transformType, xt ? f && (c = !0, "" === w.zIndex && (v = Z(t, "zIndex", s), ("auto" === v || "" === v) && this._addLazySet(w, "zIndex", 0)), _ && this._addLazySet(w, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (T ? "visible" : "hidden"))) : w.zoom = 1, p = h; p && p._next;) p = p._next;
                        y = new _t(t, "transform", 0, 0, null, 2), this._linkCSSP(y, null, p), y.setRatio = T && St ? Et : xt ? Lt : zt, y.data = this._transform || Dt(t, s, !0), n.pop()
                    }
                    if (i) {
                        for (; h;) {
                            for (g = h._next, p = d; p && p.pr > h.pr;) p = p._next;
                            (h._prev = p ? p._prev : m) ? h._prev._next = h: d = h, (h._next = p) ? p._prev = h : m = h, h = g
                        }
                        this._firstPT = d
                    }
                    return !0
                }, h.parse = function(t, e, i, n) {
                    var a, o, h, c, f, p, _, d, m, g, v = t.style;
                    for (a in e) p = e[a], o = l[a], o ? i = o.parse(t, p, a, this, i, n, e) : (f = Z(t, a, s) + "", m = "string" == typeof p, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || m && P.test(p) ? (m || (p = ht(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), i = dt(v, a, f, p, !0, "transparent", i, 0, n)) : !m || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (h = parseFloat(f), _ = h || 0 === h ? f.substr((h + "").length) : "", ("" === f || "auto" === f) && ("width" === a || "height" === a ? (h = it(t, a, s), _ = "px") : "left" === a || "top" === a ? (h = Q(t, a, s), _ = "px") : (h = "opacity" !== a ? 0 : 1, _ = "")), g = m && "=" === p.charAt(1), g ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), d = p.replace(T, "")) : (c = parseFloat(p), d = m ? p.replace(T, "") : ""), "" === d && (d = a in r ? r[a] : _), p = c || 0 === c ? (g ? c + h : c) + d : e[a], _ !== d && "" !== d && (c || 0 === c) && h && (h = G(t, a, h, _), "%" === d ? (h /= G(t, a, 100, "%") / 100, e.strictUnits !== !0 && (f = h + "%")) : "em" === d ? h /= G(t, a, 1, "em") : "px" !== d && (c = G(t, a, c, d), d = "px"), g && (c || 0 === c) && (p = c + h + d)), g && (c += h), !h && 0 !== h || !c && 0 !== c ? void 0 !== v[a] && (p || "NaN" != p + "" && null != p) ? (i = new _t(v, a, c || h || 0, 0, i, (-1), a, (!1), 0, f, p), i.xs0 = "none" !== p || "display" !== a && -1 === a.indexOf("Style") ? p : f) : q("invalid " + a + " tween value: " + e[a]) : (i = new _t(v, a, h, c - h, i, 0, a, u !== !1 && ("px" === d || "zIndex" === a), 0, f, p), i.xs0 = d)) : i = dt(v, a, f, p, !0, null, i, 0, n)), n && i && !i.plugin && (i.plugin = n);
                    return i
                }, h.setRatio = function(t) {
                    var e, i, r, s = this._firstPT,
                        n = 1e-6;
                    if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                            for (; s;) {
                                if (e = s.c * t + s.s, s.r ? e = Math.round(e) : n > e && e > -n && (e = 0), s.type)
                                    if (1 === s.type)
                                        if (r = s.l, 2 === r) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2;
                                        else if (3 === r) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3;
                                else if (4 === r) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4;
                                else if (5 === r) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4 + s.xn4 + s.xs5;
                                else {
                                    for (i = s.xs0 + e + s.xs1, r = 1; s.l > r; r++) i += s["xn" + r] + s["xs" + (r + 1)];
                                    s.t[s.p] = i
                                } else -1 === s.type ? s.t[s.p] = s.xs0 : s.setRatio && s.setRatio(t);
                                else s.t[s.p] = e + s.xs0;
                                s = s._next
                            } else
                                for (; s;) 2 !== s.type ? s.t[s.p] = s.b : s.setRatio(t), s = s._next;
                        else
                            for (; s;) 2 !== s.type ? s.t[s.p] = s.e : s.setRatio(t), s = s._next
                }, h._enableTransforms = function(t) {
                    this._transform = this._transform || Dt(this._target, s, !0), this._transformType = this._transform.svg && Tt || !t && 3 !== this._transformType ? 2 : 3
                };
                var Bt = function() {
                    this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                };
                h._addLazySet = function(t, e, i) {
                    var r = this._firstPT = new _t(t, e, 0, 0, this._firstPT, 2);
                    r.e = i, r.setRatio = Bt, r.data = this
                }, h._linkCSSP = function(t, e, i, r) {
                    return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, r = !0), i ? i._next = t : r || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
                }, h._kill = function(e) {
                    var i, r, s, n = e;
                    if (e.autoAlpha || e.alpha) {
                        n = {};
                        for (r in e) n[r] = e[r];
                        n.opacity = 1, n.autoAlpha && (n.visibility = 1)
                    }
                    return e.className && (i = this._classNamePT) && (s = i.xfirst, s && s._prev ? this._linkCSSP(s._prev, i._next, s._prev._prev) : s === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, s._prev), this._classNamePT = null), t.prototype._kill.call(this, n)
                };
                var Yt = function(t, e, i) {
                    var r, s, n, a;
                    if (t.slice)
                        for (s = t.length; --s > -1;) Yt(t[s], e, i);
                    else
                        for (r = t.childNodes, s = r.length; --s > -1;) n = r[s], a = n.type, n.style && (e.push(J(n)), i && i.push(n)), 1 !== a && 9 !== a && 11 !== a || !n.childNodes.length || Yt(n, e, i)
                };
                return a.cascadeTo = function(t, i, r) {
                    var s, n, a, o = e.to(t, i, r),
                        l = [o],
                        h = [],
                        u = [],
                        c = [],
                        f = e._internals.reservedProps;
                    for (t = o._targets || o.target, Yt(t, h, c), o.render(i, !0), Yt(t, u), o.render(0, !0), o._enabled(!0), s = c.length; --s > -1;)
                        if (n = K(c[s], h[s], u[s]), n.firstMPT) {
                            n = n.difs;
                            for (a in r) f[a] && (n[a] = r[a]);
                            l.push(e.to(c[s], i, n))
                        }
                    return l
                }, t.activate([a]), a
            }, !0),
            function() {
                var t = _gsScope._gsDefine.plugin({
                        propName: "roundProps",
                        priority: -1,
                        API: 2,
                        init: function(t, e, i) {
                            return this._tween = i, !0
                        }
                    }),
                    e = t.prototype;
                e._onInitAllProps = function() {
                    for (var t, e, i, r = this._tween, s = r.vars.roundProps instanceof Array ? r.vars.roundProps : r.vars.roundProps.split(","), n = s.length, a = {}, o = r._propLookup.roundProps; --n > -1;) a[s[n]] = 1;
                    for (n = s.length; --n > -1;)
                        for (t = s[n], e = r._firstPT; e;) i = e._next, e.pg ? e.t._roundProps(a, !0) : e.n === t && (this._add(e.t, t, e.s, e.c), i && (i._prev = e._prev), e._prev ? e._prev._next = i : r._firstPT === e && (r._firstPT = i), e._next = e._prev = null, r._propLookup[t] = o), e = i;
                    return !1
                }, e._add = function(t, e, i, r) {
                    this._addTween(t, e, i, i + r, e, !0), this._overwriteProps.push(e)
                }
            }(), _gsScope._gsDefine.plugin({
                propName: "attr",
                API: 2,
                version: "0.3.3",
                init: function(t, e) {
                    var i, r, s;
                    if ("function" != typeof t.setAttribute) return !1;
                    this._target = t, this._proxy = {}, this._start = {}, this._end = {};
                    for (i in e) this._start[i] = this._proxy[i] = r = t.getAttribute(i), s = this._addTween(this._proxy, i, parseFloat(r), e[i], i), this._end[i] = s ? s.s + s.c : e[i], this._overwriteProps.push(i);
                    return !0
                },
                set: function(t) {
                    this._super.setRatio.call(this, t);
                    for (var e, i = this._overwriteProps, r = i.length, s = 1 === t ? this._end : t ? this._proxy : this._start; --r > -1;) e = i[r], this._target.setAttribute(e, s[e] + "")
                }
            }), _gsScope._gsDefine.plugin({
                propName: "directionalRotation",
                version: "0.2.1",
                API: 2,
                init: function(t, e) {
                    "object" != typeof e && (e = {
                        rotation: e
                    }), this.finals = {};
                    var i, r, s, n, a, o, l = e.useRadians === !0 ? 2 * Math.PI : 360,
                        h = 1e-6;
                    for (i in e) "useRadians" !== i && (o = (e[i] + "").split("_"), r = o[0], s = parseFloat("function" != typeof t[i] ? t[i] : t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]()), n = this.finals[i] = "string" == typeof r && "=" === r.charAt(1) ? s + parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2)) : Number(r) || 0, a = n - s, o.length && (r = o.join("_"), -1 !== r.indexOf("short") && (a %= l, a !== a % (l / 2) && (a = 0 > a ? a + l : a - l)), -1 !== r.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * l) % l - (0 | a / l) * l : -1 !== r.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * l) % l - (0 | a / l) * l)), (a > h || -h > a) && (this._addTween(t, i, s, s + a, i), this._overwriteProps.push(i)));
                    return !0
                },
                set: function(t) {
                    var e;
                    if (1 !== t) this._super.setRatio.call(this, t);
                    else
                        for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
                }
            })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
                var e, i, r, s = _gsScope.GreenSockGlobals || _gsScope,
                    n = s.com.greensock,
                    a = 2 * Math.PI,
                    o = Math.PI / 2,
                    l = n._class,
                    h = function(e, i) {
                        var r = l("easing." + e, function() {}, !0),
                            s = r.prototype = new t;
                        return s.constructor = r, s.getRatio = i, r
                    },
                    u = t.register || function() {},
                    c = function(t, e, i, r) {
                        var s = l("easing." + t, {
                            easeOut: new e,
                            easeIn: new i,
                            easeInOut: new r
                        }, !0);
                        return u(s, t), s
                    },
                    f = function(t, e, i) {
                        this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
                    },
                    p = function(e, i) {
                        var r = l("easing." + e, function(t) {
                                this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                            }, !0),
                            s = r.prototype = new t;
                        return s.constructor = r, s.getRatio = i, s.config = function(t) {
                            return new r(t)
                        }, r
                    },
                    _ = c("Back", p("BackOut", function(t) {
                        return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                    }), p("BackIn", function(t) {
                        return t * t * ((this._p1 + 1) * t - this._p1)
                    }), p("BackInOut", function(t) {
                        return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                    })),
                    d = l("easing.SlowMo", function(t, e, i) {
                        e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
                    }, !0),
                    m = d.prototype = new t;
                return m.constructor = d, m.getRatio = function(t) {
                    var e = t + (.5 - t) * this._p;
                    return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
                }, d.ease = new d(.7, .7), m.config = d.config = function(t, e, i) {
                    return new d(t, e, i)
                }, e = l("easing.SteppedEase", function(t) {
                    t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
                }, !0), m = e.prototype = new t, m.constructor = e, m.getRatio = function(t) {
                    return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
                }, m.config = e.config = function(t) {
                    return new e(t)
                }, i = l("easing.RoughEase", function(e) {
                    e = e || {};
                    for (var i, r, s, n, a, o, l = e.taper || "none", h = [], u = 0, c = 0 | (e.points || 20), p = c, _ = e.randomize !== !1, d = e.clamp === !0, m = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --p > -1;) i = _ ? Math.random() : 1 / c * p, r = m ? m.getRatio(i) : i, "none" === l ? s = g : "out" === l ? (n = 1 - i, s = n * n * g) : "in" === l ? s = i * i * g : .5 > i ? (n = 2 * i, s = .5 * n * n * g) : (n = 2 * (1 - i), s = .5 * n * n * g), _ ? r += Math.random() * s - .5 * s : p % 2 ? r += .5 * s : r -= .5 * s, d && (r > 1 ? r = 1 : 0 > r && (r = 0)), h[u++] = {
                        x: i,
                        y: r
                    };
                    for (h.sort(function(t, e) {
                            return t.x - e.x
                        }), o = new f(1, 1, null), p = c; --p > -1;) a = h[p], o = new f(a.x, a.y, o);
                    this._prev = new f(0, 0, 0 !== o.t ? o : o.next)
                }, !0), m = i.prototype = new t, m.constructor = i, m.getRatio = function(t) {
                    var e = this._prev;
                    if (t > e.t) {
                        for (; e.next && t >= e.t;) e = e.next;
                        e = e.prev
                    } else
                        for (; e.prev && e.t >= t;) e = e.prev;
                    return this._prev = e, e.v + (t - e.t) / e.gap * e.c
                }, m.config = function(t) {
                    return new i(t)
                }, i.ease = new i, c("Bounce", h("BounceOut", function(t) {
                    return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                }), h("BounceIn", function(t) {
                    return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                }), h("BounceInOut", function(t) {
                    var e = .5 > t;
                    return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
                })), c("Circ", h("CircOut", function(t) {
                    return Math.sqrt(1 - (t -= 1) * t)
                }), h("CircIn", function(t) {
                    return -(Math.sqrt(1 - t * t) - 1)
                }), h("CircInOut", function(t) {
                    return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                })), r = function(e, i, r) {
                    var s = l("easing." + e, function(t, e) {
                            this._p1 = t || 1, this._p2 = e || r, this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0)
                        }, !0),
                        n = s.prototype = new t;
                    return n.constructor = s, n.getRatio = i, n.config = function(t, e) {
                        return new s(t, e)
                    }, s
                }, c("Elastic", r("ElasticOut", function(t) {
                    return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * a / this._p2) + 1
                }, .3), r("ElasticIn", function(t) {
                    return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2))
                }, .3), r("ElasticInOut", function(t) {
                    return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) + 1
                }, .45)), c("Expo", h("ExpoOut", function(t) {
                    return 1 - Math.pow(2, -10 * t)
                }), h("ExpoIn", function(t) {
                    return Math.pow(2, 10 * (t - 1)) - .001
                }), h("ExpoInOut", function(t) {
                    return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
                })), c("Sine", h("SineOut", function(t) {
                    return Math.sin(t * o)
                }), h("SineIn", function(t) {
                    return -Math.cos(t * o) + 1
                }), h("SineInOut", function(t) {
                    return -.5 * (Math.cos(Math.PI * t) - 1)
                })), l("easing.EaseLookup", {
                    find: function(e) {
                        return t.map[e]
                    }
                }, !0), u(s.SlowMo, "SlowMo", "ease,"), u(i, "RoughEase", "ease,"), u(e, "SteppedEase", "ease,"), _
            }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t, e) {
        "use strict";
        var i = t.GreenSockGlobals = t.GreenSockGlobals || t;
        if (!i.TweenLite) {
            var r, s, n, a, o, l = function(t) {
                    var e, r = t.split("."),
                        s = i;
                    for (e = 0; r.length > e; e++) s[r[e]] = s = s[r[e]] || {};
                    return s
                },
                h = l("com.greensock"),
                u = 1e-10,
                c = function(t) {
                    var e, i = [],
                        r = t.length;
                    for (e = 0; e !== r; i.push(t[e++]));
                    return i
                },
                f = function() {},
                p = function() {
                    var t = Object.prototype.toString,
                        e = t.call([]);
                    return function(i) {
                        return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
                    }
                }(),
                _ = {},
                d = function(r, s, n, a) {
                    this.sc = _[r] ? _[r].sc : [], _[r] = this, this.gsClass = null, this.func = n;
                    var o = [];
                    this.check = function(h) {
                        for (var u, c, f, p, m = s.length, g = m; --m > -1;)(u = _[s[m]] || new d(s[m], [])).gsClass ? (o[m] = u.gsClass, g--) : h && u.sc.push(this);
                        if (0 === g && n)
                            for (c = ("com.greensock." + r).split("."), f = c.pop(), p = l(c.join("."))[f] = this.gsClass = n.apply(n, o), a && (i[f] = p, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + r.split(".").pop(), [], function() {
                                    return p
                                }) : r === e && "undefined" != typeof module && module.exports && (module.exports = p)), m = 0; this.sc.length > m; m++) this.sc[m].check()
                    }, this.check(!0)
                },
                m = t._gsDefine = function(t, e, i, r) {
                    return new d(t, e, i, r)
                },
                g = h._class = function(t, e, i) {
                    return e = e || function() {}, m(t, [], function() {
                        return e
                    }, i), e
                };
            m.globals = i;
            var v = [0, 0, 1, 1],
                y = [],
                T = g("easing.Ease", function(t, e, i, r) {
                    this._func = t, this._type = i || 0, this._power = r || 0, this._params = e ? v.concat(e) : v
                }, !0),
                w = T.map = {},
                x = T.register = function(t, e, i, r) {
                    for (var s, n, a, o, l = e.split(","), u = l.length, c = (i || "easeIn,easeOut,easeInOut").split(","); --u > -1;)
                        for (n = l[u], s = r ? g("easing." + n, null, !0) : h.easing[n] || {}, a = c.length; --a > -1;) o = c[a], w[n + "." + o] = w[o + n] = s[o] = t.getRatio ? t : t[o] || new t
                };
            for (n = T.prototype, n._calcEnd = !1, n.getRatio = function(t) {
                    if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                    var e = this._type,
                        i = this._power,
                        r = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
                    return 1 === i ? r *= r : 2 === i ? r *= r * r : 3 === i ? r *= r * r * r : 4 === i && (r *= r * r * r * r), 1 === e ? 1 - r : 2 === e ? r : .5 > t ? r / 2 : 1 - r / 2
                }, r = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], s = r.length; --s > -1;) n = r[s] + ",Power" + s, x(new T(null, null, 1, s), n, "easeOut", !0), x(new T(null, null, 2, s), n, "easeIn" + (0 === s ? ",easeNone" : "")), x(new T(null, null, 3, s), n, "easeInOut");
            w.linear = h.easing.Linear.easeIn, w.swing = h.easing.Quad.easeInOut;
            var b = g("events.EventDispatcher", function(t) {
                this._listeners = {}, this._eventTarget = t || this
            });
            n = b.prototype, n.addEventListener = function(t, e, i, r, s) {
                s = s || 0;
                var n, l, h = this._listeners[t],
                    u = 0;
                for (null == h && (this._listeners[t] = h = []), l = h.length; --l > -1;) n = h[l], n.c === e && n.s === i ? h.splice(l, 1) : 0 === u && s > n.pr && (u = l + 1);
                h.splice(u, 0, {
                    c: e,
                    s: i,
                    up: r,
                    pr: s
                }), this !== a || o || a.wake()
            }, n.removeEventListener = function(t, e) {
                var i, r = this._listeners[t];
                if (r)
                    for (i = r.length; --i > -1;)
                        if (r[i].c === e) return void r.splice(i, 1)
            }, n.dispatchEvent = function(t) {
                var e, i, r, s = this._listeners[t];
                if (s)
                    for (e = s.length, i = this._eventTarget; --e > -1;) r = s[e], r && (r.up ? r.c.call(r.s || i, {
                        type: t,
                        target: i
                    }) : r.c.call(r.s || i))
            };
            var P = t.requestAnimationFrame,
                S = t.cancelAnimationFrame,
                C = Date.now || function() {
                    return (new Date).getTime()
                },
                k = C();
            for (r = ["ms", "moz", "webkit", "o"], s = r.length; --s > -1 && !P;) P = t[r[s] + "RequestAnimationFrame"], S = t[r[s] + "CancelAnimationFrame"] || t[r[s] + "CancelRequestAnimationFrame"];
            g("Ticker", function(t, e) {
                var i, r, s, n, l, h = this,
                    c = C(),
                    p = e !== !1 && P,
                    _ = 500,
                    d = 33,
                    m = "tick",
                    g = function(t) {
                        var e, a, o = C() - k;
                        o > _ && (c += o - d), k += o, h.time = (k - c) / 1e3, e = h.time - l, (!i || e > 0 || t === !0) && (h.frame++, l += e + (e >= n ? .004 : n - e), a = !0), t !== !0 && (s = r(g)), a && h.dispatchEvent(m)
                    };
                b.call(h), h.time = h.frame = 0, h.tick = function() {
                    g(!0)
                }, h.lagSmoothing = function(t, e) {
                    _ = t || 1 / u, d = Math.min(e, _, 0)
                }, h.sleep = function() {
                    null != s && (p && S ? S(s) : clearTimeout(s), r = f, s = null, h === a && (o = !1))
                }, h.wake = function() {
                    null !== s ? h.sleep() : h.frame > 10 && (k = C() - _ + 5), r = 0 === i ? f : p && P ? P : function(t) {
                        return setTimeout(t, 0 | 1e3 * (l - h.time) + 1)
                    }, h === a && (o = !0), g(2)
                }, h.fps = function(t) {
                    return arguments.length ? (i = t, n = 1 / (i || 60), l = this.time + n, void h.wake()) : i
                }, h.useRAF = function(t) {
                    return arguments.length ? (h.sleep(), p = t, void h.fps(i)) : p
                }, h.fps(t), setTimeout(function() {
                    p && (!s || 5 > h.frame) && h.useRAF(!1)
                }, 1500)
            }), n = h.Ticker.prototype = new h.events.EventDispatcher, n.constructor = h.Ticker;
            var R = g("core.Animation", function(t, e) {
                if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, U) {
                    o || a.wake();
                    var i = this.vars.useFrames ? j : U;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            a = R.ticker = new h.Ticker, n = R.prototype, n._dirty = n._gc = n._initted = n._paused = !1, n._totalTime = n._time = 0, n._rawPrevTime = -1, n._next = n._last = n._onUpdate = n._timeline = n.timeline = null, n._paused = !1;
            var O = function() {
                o && C() - k > 2e3 && a.wake(), setTimeout(O, 2e3)
            };
            O(), n.play = function(t, e) {
                return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
            }, n.pause = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!0)
            }, n.resume = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!1)
            }, n.seek = function(t, e) {
                return this.totalTime(Number(t), e !== !1)
            }, n.restart = function(t, e) {
                return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
            }, n.reverse = function(t, e) {
                return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
            }, n.render = function() {}, n.invalidate = function() {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
            }, n.isActive = function() {
                var t, e = this._timeline,
                    i = this._startTime;
                return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t
            }, n._enabled = function(t, e) {
                return o || a.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
            }, n._kill = function() {
                return this._enabled(!1, !1)
            }, n.kill = function(t, e) {
                return this._kill(t, e), this
            }, n._uncache = function(t) {
                for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                return this
            }, n._swapSelfInParams = function(t) {
                for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
                return i
            }, n.eventCallback = function(t, e, i, r) {
                if ("on" === (t || "").substr(0, 2)) {
                    var s = this.vars;
                    if (1 === arguments.length) return s[t];
                    null == e ? delete s[t] : (s[t] = e, s[t + "Params"] = p(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, s[t + "Scope"] = r), "onUpdate" === t && (this._onUpdate = e)
                }
                return this
            }, n.delay = function(t) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
            }, n.duration = function(t) {
                return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, n.totalDuration = function(t) {
                return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
            }, n.time = function(t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
            }, n.totalTime = function(t, e, i) {
                if (o || a.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var r = this._totalDuration,
                            s = this._timeline;
                        if (t > r && !i && (t = r), this._startTime = (this._paused ? this._pauseTime : s._time) - (this._reversed ? r - t : t) / this._timeScale, s._dirty || this._uncache(!1), s._timeline)
                            for (; s._timeline;) s._timeline._time !== (s._startTime + s._totalTime) / s._timeScale && s.totalTime(s._totalTime, !0), s = s._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), E.length && q())
                }
                return this
            }, n.progress = n.totalProgress = function(t, e) {
                return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
            }, n.startTime = function(t) {
                return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
            }, n.endTime = function(t) {
                return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
            }, n.timeScale = function(t) {
                if (!arguments.length) return this._timeScale;
                if (t = t || u, this._timeline && this._timeline.smoothChildTiming) {
                    var e = this._pauseTime,
                        i = e || 0 === e ? e : this._timeline.totalTime();
                    this._startTime = i - (i - this._startTime) * this._timeScale / t
                }
                return this._timeScale = t, this._uncache(!1)
            }, n.reversed = function(t) {
                return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, n.paused = function(t) {
                if (!arguments.length) return this._paused;
                if (t != this._paused && this._timeline) {
                    o || t || a.wake();
                    var e = this._timeline,
                        i = e.rawTime(),
                        r = i - this._pauseTime;
                    !t && e.smoothChildTiming && (this._startTime += r, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = this.isActive(), !t && 0 !== r && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0)
                }
                return this._gc && !t && this._enabled(!0, !1), this
            };
            var A = g("core.SimpleTimeline", function(t) {
                R.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            n = A.prototype = new R, n.constructor = A, n.kill()._gc = !1, n._first = n._last = n._recent = null, n._sortChildren = !1, n.add = n.insert = function(t, e) {
                var i, r;
                if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)
                    for (r = t._startTime; i && i._startTime > r;) i = i._prev;
                return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._recent = t, this._timeline && this._uncache(!0), this
            }, n._remove = function(t, e) {
                return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, n.render = function(t, e, i) {
                var r, s = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = t; s;) r = s._next, (s._active || t >= s._startTime && !s._paused) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = r
            }, n.rawTime = function() {
                return o || a.wake(), this._totalTime
            };
            var M = g("TweenLite", function(e, i, r) {
                    if (R.call(this, i, r), this.render = M.prototype.render, null == e) throw "Cannot tween a null target.";
                    this.target = e = "string" != typeof e ? e : M.selector(e) || e;
                    var s, n, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? Y[M.defaultOverwrite] : "number" == typeof l ? l >> 0 : Y[l], (o || e instanceof Array || e.push && p(e)) && "number" != typeof e[0])
                        for (this._targets = a = c(e), this._propLookup = [], this._siblings = [], s = 0; a.length > s; s++) n = a[s], n ? "string" != typeof n ? n.length && n !== t && n[0] && (n[0] === t || n[0].nodeType && n[0].style && !n.nodeType) ? (a.splice(s--, 1), this._targets = a = a.concat(c(n))) : (this._siblings[s] = W(n, this, !1), 1 === l && this._siblings[s].length > 1 && V(n, this, null, 1, this._siblings[s])) : (n = a[s--] = M.selector(n), "string" == typeof n && a.splice(s + 1, 1)) : a.splice(s--, 1);
                    else this._propLookup = {}, this._siblings = W(e, this, !1), 1 === l && this._siblings.length > 1 && V(e, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -u, this.render(-this._delay))
                }, !0),
                D = function(e) {
                    return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                },
                z = function(t, e) {
                    var i, r = {};
                    for (i in t) B[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!N[i] || N[i] && N[i]._autoCSS) || (r[i] = t[i], delete t[i]);
                    t.css = r
                };
            n = M.prototype = new R, n.constructor = M, n.kill()._gc = !1, n.ratio = 0, n._firstPT = n._targets = n._overwrittenProps = n._startAt = null, n._notifyPluginsOfEnabled = n._lazy = !1, M.version = "1.15.1", M.defaultEase = n._ease = new T(null, null, 1, 1), M.defaultOverwrite = "auto", M.ticker = a, M.autoSleep = !0, M.lagSmoothing = function(t, e) {
                a.lagSmoothing(t, e)
            }, M.selector = t.$ || t.jQuery || function(e) {
                var i = t.$ || t.jQuery;
                return i ? (M.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
            };
            var E = [],
                L = {},
                F = M._internals = {
                    isArray: p,
                    isSelector: D,
                    lazyTweens: E
                },
                N = M._plugins = {},
                I = F.tweenLookup = {},
                X = 0,
                B = F.reservedProps = {
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
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1
                },
                Y = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    "true": 1,
                    "false": 0
                },
                j = R._rootFramesTimeline = new A,
                U = R._rootTimeline = new A,
                q = F.lazyRender = function() {
                    var t, e = E.length;
                    for (L = {}; --e > -1;) t = E[e], t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                    E.length = 0
                };
            U._startTime = a.time, j._startTime = a.frame, U._active = j._active = !0, setTimeout(q, 1), R._updateRoot = M.render = function() {
                var t, e, i;
                if (E.length && q(), U.render((a.time - U._startTime) * U._timeScale, !1, !1), j.render((a.frame - j._startTime) * j._timeScale, !1, !1), E.length && q(), !(a.frame % 120)) {
                    for (i in I) {
                        for (e = I[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                        0 === e.length && delete I[i]
                    }
                    if (i = U._first, (!i || i._paused) && M.autoSleep && !j._first && 1 === a._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || a.sleep()
                    }
                }
            }, a.addEventListener("tick", R._updateRoot);
            var W = function(t, e, i) {
                    var r, s, n = t._gsTweenID;
                    if (I[n || (t._gsTweenID = n = "t" + X++)] || (I[n] = {
                            target: t,
                            tweens: []
                        }), e && (r = I[n].tweens, r[s = r.length] = e, i))
                        for (; --s > -1;) r[s] === e && r.splice(s, 1);
                    return I[n].tweens
                },
                H = function(t, e, i, r) {
                    var s, n, a = t.vars.onOverwrite;
                    return a && (s = a(t, e, i, r)), a = M.onOverwrite, a && (n = a(t, e, i, r)), s !== !1 && n !== !1
                },
                V = function(t, e, i, r, s) {
                    var n, a, o, l;
                    if (1 === r || r >= 4) {
                        for (l = s.length, n = 0; l > n; n++)
                            if ((o = s[n]) !== e) o._gc || H(o, e) && o._enabled(!1, !1) && (a = !0);
                            else if (5 === r) break;
                        return a
                    }
                    var h, c = e._startTime + u,
                        f = [],
                        p = 0,
                        _ = 0 === e._duration;
                    for (n = s.length; --n > -1;)(o = s[n]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (h = h || $(e, 0, _), 0 === $(o, h, _) && (f[p++] = o)) : c >= o._startTime && o._startTime + o.totalDuration() / o._timeScale > c && ((_ || !o._initted) && 2e-10 >= c - o._startTime || (f[p++] = o)));
                    for (n = p; --n > -1;)
                        if (o = f[n], 2 === r && o._kill(i, t, e) && (a = !0), 2 !== r || !o._firstPT && o._initted) {
                            if (2 !== r && !H(o, e)) continue;
                            o._enabled(!1, !1) && (a = !0)
                        }
                    return a
                },
                $ = function(t, e, i) {
                    for (var r = t._timeline, s = r._timeScale, n = t._startTime; r._timeline;) {
                        if (n += r._startTime, s *= r._timeScale, r._paused) return -100;
                        r = r._timeline
                    }
                    return n /= s, n > e ? n - e : i && n === e || !t._initted && 2 * u > n - e ? u : (n += t.totalDuration() / t._timeScale / s) > e + u ? 0 : n - e - u
                };
            n._init = function() {
                var t, e, i, r, s, n = this.vars,
                    a = this._overwrittenProps,
                    o = this._duration,
                    l = !!n.immediateRender,
                    h = n.ease;
                if (n.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), s = {};
                    for (r in n.startAt) s[r] = n.startAt[r];
                    if (s.overwrite = !1, s.immediateRender = !0, s.lazy = l && n.lazy !== !1, s.startAt = s.delay = null, this._startAt = M.to(this.target, 0, s), l)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== o) return
                } else if (n.runBackwards && 0 !== o)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (l = !1), i = {};
                        for (r in n) B[r] && "autoCSS" !== r || (i[r] = n[r]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = l && n.lazy !== !1, i.immediateRender = l, this._startAt = M.to(this.target, 0, i), l) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = h = h ? h instanceof T ? h : "function" == typeof h ? new T(h, n.easeParams) : w[h] || M.defaultEase : M.defaultEase, n.easeParams instanceof Array && h.config && (this._ease = h.config.apply(h, n.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null) && (e = !0);
                else e = this._initProps(this.target, this._propLookup, this._siblings, a);
                if (e && M._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), n.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = n.onUpdate, this._initted = !0
            }, n._initProps = function(e, i, r, s) {
                var n, a, o, l, h, u;
                if (null == e) return !1;
                L[e._gsTweenID] && q(), this.vars.css || e.style && e !== t && e.nodeType && N.css && this.vars.autoCSS !== !1 && z(this.vars, e);
                for (n in this.vars) {
                    if (u = this.vars[n], B[n]) u && (u instanceof Array || u.push && p(u)) && -1 !== u.join("").indexOf("{self}") && (this.vars[n] = u = this._swapSelfInParams(u, this));
                    else if (N[n] && (l = new N[n])._onInitTween(e, this.vars[n], this)) {
                        for (this._firstPT = h = {
                                _next: this._firstPT,
                                t: l,
                                p: "setRatio",
                                s: 0,
                                c: 1,
                                f: !0,
                                n: n,
                                pg: !0,
                                pr: l._priority
                            }, a = l._overwriteProps.length; --a > -1;) i[l._overwriteProps[a]] = this._firstPT;
                        (l._priority || l._onInitAllProps) && (o = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0)
                    } else this._firstPT = i[n] = h = {
                        _next: this._firstPT,
                        t: e,
                        p: n,
                        f: "function" == typeof e[n],
                        n: n,
                        pg: !1,
                        pr: 0
                    }, h.s = h.f ? e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(e[n]), h.c = "string" == typeof u && "=" === u.charAt(1) ? parseInt(u.charAt(0) + "1", 10) * Number(u.substr(2)) : Number(u) - h.s || 0;
                    h && h._next && (h._next._prev = h)
                }
                return s && this._kill(s, e) ? this._initProps(e, i, r, s) : this._overwrite > 1 && this._firstPT && r.length > 1 && V(e, this, i, this._overwrite, r) ? (this._kill(i, e), this._initProps(e, i, r, s)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (L[e._gsTweenID] = !0), o)
            }, n.render = function(t, e, i) {
                var r, s, n, a, o = this._time,
                    l = this._duration,
                    h = this._rawPrevTime;
                if (t >= l) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (r = !0, s = "onComplete"), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > h || h === u && "isPause" !== this.data) && h !== t && (i = !0, h > u && (s = "onReverseComplete")), this._rawPrevTime = a = !e || t || h === t ? t : u);
                else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === l && h > 0 && h !== u) && (s = "onReverseComplete", r = this._reversed), 0 > t && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (h !== u || "isPause" !== this.data) && (i = !0), this._rawPrevTime = a = !e || t || h === t ? t : u)), this._initted || (i = !0);
                else if (this._totalTime = this._time = t, this._easeType) {
                    var c = t / l,
                        f = this._easeType,
                        p = this._easePower;
                    (1 === f || 3 === f && c >= .5) && (c = 1 - c), 3 === f && (c *= 2), 1 === p ? c *= c : 2 === p ? c *= c * c : 3 === p ? c *= c * c * c : 4 === p && (c *= c * c * c * c), this.ratio = 1 === f ? 1 - c : 2 === f ? c : .5 > t / l ? c / 2 : 1 - c / 2
                } else this.ratio = this._ease.getRatio(t / l);
                if (this._time !== o || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = o, this._rawPrevTime = h, E.push(this), void(this._lazy = [t, e]);
                        this._time && !r ? this.ratio = this._ease.getRatio(this._time / l) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : s || (s = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || y))), n = this._firstPT; n;) n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s, n = n._next;
                    this._onUpdate && (0 > t && this._startAt && t !== -1e-4 && this._startAt.render(t, e, i), e || (this._time !== o || r) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || y)), s && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, e, i), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[s] && this.vars[s].apply(this.vars[s + "Scope"] || this, this.vars[s + "Params"] || y), 0 === l && this._rawPrevTime === u && a !== u && (this._rawPrevTime = 0))
                }
            }, n._kill = function(t, e, i) {
                if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                e = "string" != typeof e ? e || this._targets || this.target : M.selector(e) || e;
                var r, s, n, a, o, l, h, u, c;
                if ((p(e) || D(e)) && "number" != typeof e[0])
                    for (r = e.length; --r > -1;) this._kill(t, e[r]) && (l = !0);
                else {
                    if (this._targets) {
                        for (r = this._targets.length; --r > -1;)
                            if (e === this._targets[r]) {
                                o = this._propLookup[r] || {}, this._overwrittenProps = this._overwrittenProps || [], s = this._overwrittenProps[r] = t ? this._overwrittenProps[r] || {} : "all";
                                break
                            }
                    } else {
                        if (e !== this.target) return !1;
                        o = this._propLookup, s = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                    }
                    if (o) {
                        if (h = t || o, u = t !== s && "all" !== s && t !== o && ("object" != typeof t || !t._tempKill), i && (M.onOverwrite || this.vars.onOverwrite)) {
                            for (n in h) o[n] && (c || (c = []), c.push(n));
                            if (!H(this, i, e, c)) return !1
                        }
                        for (n in h)(a = o[n]) && (a.pg && a.t._kill(h) && (l = !0), a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next), a._next && (a._next._prev = a._prev), a._next = a._prev = null), delete o[n]), u && (s[n] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return l
            }, n.invalidate = function() {
                return this._notifyPluginsOfEnabled && M._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], R.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -u, this.render(-this._delay)), this
            }, n._enabled = function(t, e) {
                if (o || a.wake(), t && this._gc) {
                    var i, r = this._targets;
                    if (r)
                        for (i = r.length; --i > -1;) this._siblings[i] = W(r[i], this, !0);
                    else this._siblings = W(this.target, this, !0)
                }
                return R.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && M._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
            }, M.to = function(t, e, i) {
                return new M(t, e, i)
            }, M.from = function(t, e, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new M(t, e, i)
            }, M.fromTo = function(t, e, i, r) {
                return r.startAt = i, r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender, new M(t, e, r)
            }, M.delayedCall = function(t, e, i, r, s) {
                return new M(e, 0, {
                    delay: t,
                    onComplete: e,
                    onCompleteParams: i,
                    onCompleteScope: r,
                    onReverseComplete: e,
                    onReverseCompleteParams: i,
                    onReverseCompleteScope: r,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: s,
                    overwrite: 0
                })
            }, M.set = function(t, e) {
                return new M(t, 0, e)
            }, M.getTweensOf = function(t, e) {
                if (null == t) return [];
                t = "string" != typeof t ? t : M.selector(t) || t;
                var i, r, s, n;
                if ((p(t) || D(t)) && "number" != typeof t[0]) {
                    for (i = t.length, r = []; --i > -1;) r = r.concat(M.getTweensOf(t[i], e));
                    for (i = r.length; --i > -1;)
                        for (n = r[i], s = i; --s > -1;) n === r[s] && r.splice(i, 1)
                } else
                    for (r = W(t).concat(), i = r.length; --i > -1;)(r[i]._gc || e && !r[i].isActive()) && r.splice(i, 1);
                return r
            }, M.killTweensOf = M.killDelayedCallsTo = function(t, e, i) {
                "object" == typeof e && (i = e, e = !1);
                for (var r = M.getTweensOf(t, e), s = r.length; --s > -1;) r[s]._kill(i, t)
            };
            var Z = g("plugins.TweenPlugin", function(t, e) {
                this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = Z.prototype
            }, !0);
            if (n = Z.prototype, Z.version = "1.10.1", Z.API = 2, n._firstPT = null, n._addTween = function(t, e, i, r, s, n) {
                    var a, o;
                    return null != r && (a = "number" == typeof r || "=" !== r.charAt(1) ? Number(r) - i : parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2))) ? (this._firstPT = o = {
                        _next: this._firstPT,
                        t: t,
                        p: e,
                        s: i,
                        c: a,
                        f: "function" == typeof t[e],
                        n: s || e,
                        r: n
                    }, o._next && (o._next._prev = o), o) : void 0
                }, n.setRatio = function(t) {
                    for (var e, i = this._firstPT, r = 1e-6; i;) e = i.c * t + i.s, i.r ? e = Math.round(e) : r > e && e > -r && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
                }, n._kill = function(t) {
                    var e, i = this._overwriteProps,
                        r = this._firstPT;
                    if (null != t[this._propName]) this._overwriteProps = [];
                    else
                        for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                    for (; r;) null != t[r.n] && (r._next && (r._next._prev = r._prev), r._prev ? (r._prev._next = r._next, r._prev = null) : this._firstPT === r && (this._firstPT = r._next)), r = r._next;
                    return !1
                }, n._roundProps = function(t, e) {
                    for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
                }, M._onPluginEvent = function(t, e) {
                    var i, r, s, n, a, o = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; o;) {
                            for (a = o._next, r = s; r && r.pr > o.pr;) r = r._next;
                            (o._prev = r ? r._prev : n) ? o._prev._next = o: s = o, (o._next = r) ? r._prev = o : n = o, o = a
                        }
                        o = e._firstPT = s
                    }
                    for (; o;) o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
                    return i
                }, Z.activate = function(t) {
                    for (var e = t.length; --e > -1;) t[e].API === Z.API && (N[(new t[e])._propName] = t[e]);
                    return !0
                }, m.plugin = function(t) {
                    if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                    var e, i = t.propName,
                        r = t.priority || 0,
                        s = t.overwriteProps,
                        n = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_roundProps",
                            initAll: "_onInitAllProps"
                        },
                        a = g("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                            Z.call(this, i, r), this._overwriteProps = s || []
                        }, t.global === !0),
                        o = a.prototype = new Z(i);
                    o.constructor = a, a.API = t.API;
                    for (e in n) "function" == typeof t[e] && (o[n[e]] = t[e]);
                    return a.version = t.version, Z.activate([a]), a
                }, r = t._gsQueue) {
                for (s = 0; r.length > s; s++) r[s]();
                for (n in _) _[n].func || t.console.log("GSAP encountered missing dependency: com.greensock." + n)
            }
            o = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax"), window.hacktjMapStyles = [{
        featureType: "all",
        elementType: "geometry",
        stylers: [{
            color: "#d66790"
        }, {
            lightness: "42"
        }]
    }, {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{
            gamma: .01
        }, {
            lightness: 20
        }]
    }, {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [{
            saturation: -31
        }, {
            lightness: -33
        }, {
            weight: 2
        }, {
            gamma: .8
        }]
    }, {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "administrative.locality",
        elementType: "labels.text",
        stylers: [{
            visibility: "on"
        }, {
            hue: "#ff0000"
        }, {
            saturation: "-11"
        }, {
            lightness: "4"
        }, {
            gamma: "1.01"
        }, {
            weight: "0.01"
        }]
    }, {
        featureType: "administrative.neighborhood",
        elementType: "labels.text",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{
            lightness: 30
        }, {
            saturation: 30
        }]
    }, {
        featureType: "poi",
        elementType: "all",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{
            saturation: 20
        }]
    }, {
        featureType: "poi.park",
        elementType: "all",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{
            lightness: 20
        }, {
            saturation: -20
        }]
    }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [{
            lightness: "27"
        }, {
            saturation: "0"
        }, {
            hue: "#0067ff"
        }, {
            gamma: "4.62"
        }, {
            weight: "1.02"
        }]
    }, {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{
            saturation: 25
        }, {
            lightness: 25
        }, {
            color: "#ffffff"
        }]
    }, {
        featureType: "road",
        elementType: "labels",
        stylers: [{
            weight: "3.28"
        }, {
            visibility: "simplified"
        }]
    }, {
        featureType: "road.highway",
        elementType: "all",
        stylers: [{
            weight: "1.02"
        }, {
            saturation: "1"
        }, {
            hue: "#0067ff"
        }, {
            gamma: "0.41"
        }]
    }, {
        featureType: "road.highway",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }, {
            hue: "#ff0000"
        }]
    }, {
        featureType: "road.arterial",
        elementType: "all",
        stylers: [{
            lightness: "0"
        }, {
            gamma: "1.77"
        }, {
            visibility: "simplified"
        }]
    }, {
        featureType: "road.arterial",
        elementType: "labels",
        stylers: [{
            visibility: "on"
        }, {
            hue: "#ff0000"
        }, {
            weight: "0.01"
        }, {
            lightness: "0"
        }]
    }, {
        featureType: "road.local",
        elementType: "all",
        stylers: [{
            visibility: "off"
        }, {
            saturation: "0"
        }, {
            lightness: "76"
        }]
    }, {
        featureType: "water",
        elementType: "all",
        stylers: [{
            lightness: "48"
        }, {
            visibility: "simplified"
        }]
    }, {
        featureType: "water",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }], ! function(t, e) {
        "function" == typeof define && define.amd ? define(["ScrollMagic", "TweenMax", "TimelineMax"], e) : "object" == typeof exports ? (require("gsap"), e(require("scrollmagic"), TweenMax, TimelineMax)) : e(t.ScrollMagic || t.jQuery && t.jQuery.ScrollMagic, t.TweenMax || t.TweenLite, t.TimelineMax || t.TimelineLite)
    }(this, function(t, e, i) {
        "use strict";
        t.Scene.addOption("tweenChanges", !1, function(t) {
            return !!t
        }), t.Scene.extend(function() {
            var t, r = this;
            r.on("progress.plugin_gsap", function() {
                s()
            }), r.on("destroy.plugin_gsap", function(t) {
                r.removeTween(t.reset)
            });
            var s = function() {
                if (t) {
                    var e = r.progress(),
                        i = r.state();
                    t.repeat && -1 === t.repeat() ? "DURING" === i && t.paused() ? t.play() : "DURING" === i || t.paused() || t.pause() : e != t.progress() && (0 === r.duration() ? e > 0 ? t.play() : t.reverse() : r.tweenChanges() && t.tweenTo ? t.tweenTo(e * t.duration()) : t.progress(e).pause())
                }
            };
            r.setTween = function(n, a, o) {
                var l;
                arguments.length > 1 && (arguments.length < 3 && (o = a, a = 1), n = e.to(n, a, o));
                try {
                    l = i ? new i({
                        smoothChildTiming: !0
                    }).add(n) : n, l.pause()
                } catch (h) {
                    return r
                }
                return t && r.removeTween(), t = l, n.repeat && -1 === n.repeat() && (t.repeat(-1), t.yoyo(n.yoyo())), s(), r
            }, r.removeTween = function(e) {
                return t && (e && t.progress(0).pause(), t.kill(), t = void 0), r
            }
        })
    }), navigator.userAgent.toLowerCase().indexOf("firefox") > -1 && (setButtonListeners(".register-button-block.top"), setButtonListeners(".register-button-block.bottom"));
for (var isMobile = window.innerWidth < 640, openQuestion = function(t, e, i, r) {
        return function(e) {
            var r = toggleClass(t, "is-open"),
                s = {};
            r ? (s.height = i.getAttribute("data-height"), s.ease = Power2.easeOut) : (s.height = 0, s.ease = Power2.easeOut), console.log("tween", TweenMax.to), TweenMax.to(i, .5, s)
        }
    }, questions = document.querySelectorAll(".question-group .question"), i = 0; i < questions.length; i++) {
    var group = getParentWithClass(questions[i], "question-group"),
        answer = getSiblingWithClass(questions[i], "answer");
    answer.setAttribute("data-height", answer.clientHeight), answer.style.height = "0", group.addEventListener("click", openQuestion(group, questions[i], answer))
}
if (google.maps.event.addDomListener(window, "load", initializeMap), !isMobile) {
    var scrollController = new ScrollMagic.Controller,
        segments = document.querySelectorAll(".animation-container"),
        scrollDistance = 0,
        animations = [];
    for (i = 0; i < segments.length; ++i) hasClass(segments[i], "vertical") ? scrollDistance += segments[i].clientHeight : hasClass(segments[i], "horizontal") && (scrollDistance += segments[i].clientWidth), animations.push(segments[i]);
    var totalHeight = (void 0 !== document.height ? document.height : document.body.offsetHeight) - window.innerHeight,
        scrollFactor = totalHeight / scrollDistance,
        y = window.innerHeight / 2.5;
    animations.forEach(function(t) {
        if (t.childNodes[0] && !hasClass(t, "line-schedule")) {
            var e = (t.childNodes[0], 0),
                i = {
                    ease: Linear.easeNone
                };
            hasClass(t, "vertical") && (i.height = "100%", e = 1.3 * t.clientHeight), hasClass(t, "horizontal") && (i.width = "100%", e = t.clientWidth / 2), e *= scrollFactor;
            new ScrollMagic.Scene({
                offset: y,
                duration: e
            }).setTween(t.childNodes[0], i).addTo(scrollController);
            y += e
        } else if (hasClass(t, "line-schedule")) {
            new ScrollMagic.Scene({
                triggerElement: t,
                offset: -t.clientWidth / 2,
                duration: t.clientWidth
            }).setTween(t.childNodes[0], {
                width: "100%"
            }).addTo(scrollController)
        }
    });
    var scene = new ScrollMagic.Scene({
        offset: y,
        duration: totalHeight - y
    }).setTween("#map-info", {
        transform: "scale(1)"
    }).addTo(scrollController).on("end", function() {
        scrollController.destroy()
    })
}
var sponsorSmallImages = {
    "Ntrepid Corporation": "img/sponsor-logos-small/ntrepid.png",
    "Universal Consulting Services": "img/sponsor-logos-small/ucs.png",
    Pebble: "img/sponsor-logos-small/pebble.png",
    "Coding Lady Colonials": "img/sponsor-logos-small/clc.png",
    "Major League Hacking": "img/sponsor-logos-small/mlh.png",
    Yext: "img/sponsor-logos-small/yext.png",
    "Capital One": "img/sponsor-logos-small/capone.png",
    "KPCB Fellows Program": "img/sponsor-logos-small/kpcb.png",
    MongoDB: "img/sponsor-logos-small/mongodb.png",
    RazorX2: "img/sponsor-logos-small/razorx2.png",
    "Real Thread": "img/sponsor-logos-small/realthread.png",
    Filestack: "img/sponsor-logos-small/filestack.png",
    "L'Oréal USA": "img/sponsor-logos-small/loreal.png",
    Palantir: "img/sponsor-logos-small/palantir.png",
    OpsClick: "img/sponsor-logos-small/opsclick.png",
    BigParser: "img/sponsor-logos-small/bigparser.png",
    "TIC Camp": "img/sponsor-logos-small/tic.png",
    "MIT Launch": "img/sponsor-logos-small/mitlaunch.png",
    Phone2Action: "img/sponsor-logos-small/phone2action.png"
};
setImages(0);
