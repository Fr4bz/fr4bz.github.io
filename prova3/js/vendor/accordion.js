/*!
 * jQuery UI Accordion 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/accordion/
 */
! function(a) {
	"use strict";
	"function" == typeof define && define.amd ? define(["jquery", "./core", "./widget"], a) : a(jQuery)
}(function(a) {
	"use strict";
	return a.widget("ui.accordion", {
		version: "1.11.4",
		options: {
			active: 0,
			animate: {},
			collapsible: !1,
			event: "click",
			header: "> li > :first-child,> :not(li):even",
			heightStyle: "auto",
			icons: {
				activeHeader: "ui-icon-triangle-1-s",
				header: "ui-icon-triangle-1-e"
			},
			activate: null,
			beforeActivate: null
		},
		hideProps: {
			borderTopWidth: "hide",
			borderBottomWidth: "hide",
			paddingTop: "hide",
			paddingBottom: "hide",
			height: "hide"
		},
		showProps: {
			borderTopWidth: "show",
			borderBottomWidth: "show",
			paddingTop: "show",
			paddingBottom: "show",
			height: "show"
		},
		_create: function() {
			"use strict";
			var b = this.options;
			this.prevShow = this.prevHide = a(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), b.collapsible || b.active !== !1 && null != b.active || (b.active = 0), this._processPanels(), b.active < 0 && (b.active += this.headers.length), this._refresh()
		},
		_getCreateEventData: function() {
			"use strict";
			return {
				header: this.active,
				panel: this.active.length ? this.active.next() : a()
			}
		},
		_createIcons: function() {
			"use strict";
			var b = this.options.icons;
			b && (a("<span>").addClass("ui-accordion-header-icon ui-icon " + b.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(b.header).addClass(b.activeHeader), this.headers.addClass("ui-accordion-icons"))
		},
		_destroyIcons: function() {
			"use strict";
			this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
		},
		_destroy: function() {
			"use strict";
			var a;
			this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(), this._destroyIcons(), a = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && a.css("height", "")
		},
		_setOption: function(a, b) {
			"use strict";
			return "active" === a ? void this._activate(b) : ("event" === a && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(b)), this._super(a, b), "collapsible" !== a || b || this.options.active !== !1 || this._activate(0), "icons" === a && (this._destroyIcons(), b && this._createIcons()), void("disabled" === a && (this.element.toggleClass("ui-state-disabled", !!b).attr("aria-disabled", b), this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!b))))
		},
		_keydown: function(b) {
			"use strict";
			if (!b.altKey && !b.ctrlKey) {
				var c = a.ui.keyCode,
					d = this.headers.length,
					e = this.headers.index(b.target),
					f = !1;
				switch (b.keyCode) {
					case c.RIGHT:
					case c.DOWN:
						f = this.headers[(e + 1) % d];
						break;
					case c.LEFT:
					case c.UP:
						f = this.headers[(e - 1 + d) % d];
						break;
					case c.SPACE:
					case c.ENTER:
						this._eventHandler(b);
						break;
					case c.HOME:
						f = this.headers[0];
						break;
					case c.END:
						f = this.headers[d - 1]
				}
				f && (a(b.target).attr("tabIndex", -1), a(f).attr("tabIndex", 0), f.focus(), b.preventDefault())
			}
		},
		_panelKeyDown: function(b) {
			"use strict";
			b.keyCode === a.ui.keyCode.UP && b.ctrlKey && a(b.currentTarget).prev().focus()
		},
		refresh: function() {
			"use strict";
			var b = this.options;
			this._processPanels(), b.active === !1 && b.collapsible === !0 || !this.headers.length ? (b.active = !1, this.active = a()) : b.active === !1 ? this._activate(0) : this.active.length && !a.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (b.active = !1, this.active = a()) : this._activate(Math.max(0, b.active - 1)) : b.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
		},
		_processPanels: function() {
			"use strict";
			var a = this.headers,
				b = this.panels;
			this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"), this.panels = this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(), b && (this._off(a.not(this.headers)), this._off(b.not(this.panels)))
		},
		_refresh: function() {
			"use strict";
			var b, c = this.options,
				d = c.heightStyle,
				e = this.element.parent();
			this.active = this._findActive(c.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function() {
				var b = a(this),
					c = b.uniqueId().attr("id"),
					d = b.next(),
					e = d.uniqueId().attr("id");
				b.attr("aria-controls", e), d.attr("aria-labelledby", c)
			}).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
				"aria-selected": "false",
				"aria-expanded": "false",
				tabIndex: -1
			}).next().attr({
				"aria-hidden": "true"
			}).hide(), this.active.length ? this.active.attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			}).next().attr({
				"aria-hidden": "false"
			}) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(c.event), "fill" === d ? (b = e.height(), this.element.siblings(":visible").each(function() {
				var c = a(this),
					d = c.css("position");
				"absolute" !== d && "fixed" !== d && (b -= c.outerHeight(!0))
			}), this.headers.each(function() {
				"use strict";
				b -= a(this).outerHeight(!0)
			}), this.headers.next().each(function() {
				"use strict";
				a(this).height(Math.max(0, b - a(this).innerHeight() + a(this).height()))
			}).css("overflow", "auto")) : "auto" === d && (b = 0, this.headers.next().each(function() {
				"use strict";
				b = Math.max(b, a(this).css("height", "").height())
			}).height(b))
		},
		_activate: function(b) {
			"use strict";
			var c = this._findActive(b)[0];
			c !== this.active[0] && (c = c || this.active[0], this._eventHandler({
				target: c,
				currentTarget: c,
				preventDefault: a.noop
			}))
		},
		_findActive: function(b) {
			"use strict";
			return "number" == typeof b ? this.headers.eq(b) : a()
		},
		_setupEvents: function(b) {
			"use strict";
			var c = {
				keydown: "_keydown"
			};
			b && a.each(b.split(" "), function(a, b) {
				"use strict";
				c[b] = "_eventHandler"
			}), this._off(this.headers.add(this.headers.next())), this._on(this.headers, c), this._on(this.headers.next(), {
				keydown: "_panelKeyDown"
			}), this._hoverable(this.headers), this._focusable(this.headers)
		},
		_eventHandler: function(b) {
			"use strict";
			var c = this.options,
				d = this.active,
				e = a(b.currentTarget),
				f = e[0] === d[0],
				g = f && c.collapsible,
				h = g ? a() : e.next(),
				i = d.next(),
				j = {
					oldHeader: d,
					oldPanel: i,
					newHeader: g ? a() : e,
					newPanel: h
				};
			b.preventDefault(), f && !c.collapsible || this._trigger("beforeActivate", b, j) === !1 || (c.active = !g && this.headers.index(e), this.active = f ? a() : e, this._toggle(j), d.removeClass("ui-accordion-header-active ui-state-active"), c.icons && d.children(".ui-accordion-header-icon").removeClass(c.icons.activeHeader).addClass(c.icons.header), f || (e.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), c.icons && e.children(".ui-accordion-header-icon").removeClass(c.icons.header).addClass(c.icons.activeHeader), e.next().addClass("ui-accordion-content-active")))
		},
		_toggle: function(b) {
			"use strict";
			var c = b.newPanel,
				d = this.prevShow.length ? this.prevShow : b.oldPanel;
			this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = c, this.prevHide = d, this.options.animate ? this._animate(c, d, b) : (d.hide(), c.show(), this._toggleComplete(b)), d.attr({
				"aria-hidden": "true"
			}), d.prev().attr({
				"aria-selected": "false",
				"aria-expanded": "false"
			}), c.length && d.length ? d.prev().attr({
				tabIndex: -1,
				"aria-expanded": "false"
			}) : c.length && this.headers.filter(function() {
				"use strict";
				return 0 === parseInt(a(this).attr("tabIndex"), 10)
			}).attr("tabIndex", -1), c.attr("aria-hidden", "false").prev().attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			})
		},
		_animate: function(a, b, c) {
			"use strict";
			var d, e, f, g = this,
				h = 0,
				i = a.css("box-sizing"),
				j = a.length && (!b.length || a.index() < b.index()),
				k = this.options.animate || {},
				l = j && k.down || k,
				m = function() {
					g._toggleComplete(c)
				};
			return "number" == typeof l && (f = l), "string" == typeof l && (e = l), e = e || l.easing || k.easing, f = f || l.duration || k.duration, b.length ? a.length ? (d = a.show().outerHeight(), b.animate(this.hideProps, {
				duration: f,
				easing: e,
				step: function(a, b) {
					b.now = Math.round(a)
				}
			}), void a.hide().animate(this.showProps, {
				duration: f,
				easing: e,
				complete: m,
				step: function(a, c) {
					c.now = Math.round(a), "height" !== c.prop ? "content-box" === i && (h += c.now) : "content" !== g.options.heightStyle && (c.now = Math.round(d - b.outerHeight() - h), h = 0)
				}
			})) : b.animate(this.hideProps, f, e, m) : a.animate(this.showProps, f, e, m)
		},
		_toggleComplete: function(a) {
			"use strict";
			var b = a.oldPanel;
			b.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), b.length && (b.parent()[0].className = b.parent()[0].className), this._trigger("activate", null, a)
		}
	})
});