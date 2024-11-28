! function() {
    var e = {
            1628: function(e) {
                const t = {
                    de: "Erledigt!",
                    en: "Success",
                    es: "Operación satisfactoria",
                    fr: "Opération réussie",
                    it: "Operazione riuscita",
                    sv: "Lyckades"
                };

                function n(e) {
                    return !e || !Number.isInteger(e) || e < 1e3 || e > 6e4 ? 5e3 : e
                }
                e.exports = {
                    addAlert: function(e, t, i) {
                        const o = new Date;
                        try {
                            window.sessionStorage.setItem(`saveAlert_${e}`, JSON.stringify({
                                exp: o.setMilliseconds(o.getMilliseconds() + n(i)),
                                html: t
                            }))
                        } catch (e) {}
                    },
                    init: function(e) {
                        const n = window.sessionStorage.getItem(`saveAlert_${e}`);
                        if (n) try {
                            const i = JSON.parse(n);
                            if (new Date < i.exp) {
                                const e = `<div class="alert" role="alert"><h4 class="alertTitle">${function(){if(ui.lang&&ui.lang.length>1)return t[ui.lang.substring(0,2)];return t.en}()}</h4><div class="alertBody">${i.html}</div></div>`;
                                ui.alert(e, {
                                    closable: !0,
                                    display: "notification",
                                    duration: 1e4,
                                    open: !0,
                                    type: "success"
                                })
                            }
                            window.sessionStorage.removeItem(`saveAlert_${e}`)
                        } catch (e) {}
                    }
                }
            },
            5719: function(e) {
                const t = {
                    domainThreshold: 4,
                    topLevelThreshold: 3,
                    defaultDomains: "yahoo.com google.com hotmail.com gmail.com me.com aol.com mac.com live.com comcast.net googlemail.com msn.com hotmail.co.uk yahoo.co.uk facebook.com verizon.net sbcglobal.net att.net gmx.com mail.com outlook.com icloud.com".split(" "),
                    defaultTopLevelDomains: "co.jp co.uk com net org info edu gov mil ca".split(" "),
                    run: function(e) {
                        e.domains = e.domains || t.defaultDomains, e.topLevelDomains = e.topLevelDomains || t.defaultTopLevelDomains, e.distanceFunction = e.distanceFunction || t.sift3Distance;
                        var n = function(e) {
                                return e
                            },
                            i = e.suggested || n;
                        n = e.empty || n;
                        return (e = t.suggest(t.encodeEmail(e.email), e.domains, e.topLevelDomains, e.distanceFunction)) ? i(e) : n()
                    },
                    suggest: function(e, t, n, i) {
                        if (e = e.toLowerCase(), e = this.splitEmail(e), t = this.findClosestDomain(e.domain, t, i, this.domainThreshold)) {
                            if (t != e.domain) return {
                                address: e.address,
                                domain: t,
                                full: e.address + "@" + t
                            }
                        } else if (n = this.findClosestDomain(e.topLevelDomain, n, i, this.topLevelThreshold), e.domain && n && n != e.topLevelDomain) return t = (i = e.domain).substring(0, i.lastIndexOf(e.topLevelDomain)) + n, {
                            address: e.address,
                            domain: t,
                            full: e.address + "@" + t
                        };
                        return !1
                    },
                    findClosestDomain: function(e, t, n, i) {
                        i = i || this.topLevelThreshold;
                        var o, a = 99,
                            l = null;
                        if (!e || !t) return !1;
                        n || (n = this.sift3Distance);
                        for (var s = 0; s < t.length; s++) {
                            if (e === t[s]) return e;
                            (o = n(e, t[s])) < a && (a = o, l = t[s])
                        }
                        return a <= i && null !== l && l
                    },
                    sift3Distance: function(e, t) {
                        if (null == e || 0 === e.length) return null == t || 0 === t.length ? 0 : t.length;
                        if (null == t || 0 === t.length) return e.length;
                        for (var n = 0, i = 0, o = 0, a = 0; n + i < e.length && n + o < t.length;) {
                            if (e.charAt(n + i) == t.charAt(n + o)) a++;
                            else
                                for (var l = o = i = 0; 5 > l; l++) {
                                    if (n + l < e.length && e.charAt(n + l) == t.charAt(n)) {
                                        i = l;
                                        break
                                    }
                                    if (n + l < t.length && e.charAt(n) == t.charAt(n + l)) {
                                        o = l;
                                        break
                                    }
                                }
                            n++
                        }
                        return (e.length + t.length) / 2 - a
                    },
                    splitEmail: function(e) {
                        if (2 > (e = e.trim().split("@")).length) return !1;
                        for (var t = 0; t < e.length; t++)
                            if ("" === e[t]) return !1;
                        var n = e.pop(),
                            i = n.split("."),
                            o = "";
                        if (0 == i.length) return !1;
                        if (1 == i.length) o = i[0];
                        else {
                            for (t = 1; t < i.length; t++) o += i[t] + ".";
                            2 <= i.length && (o = o.substring(0, o.length - 1))
                        }
                        return {
                            topLevelDomain: o,
                            domain: n,
                            address: e.join("@")
                        }
                    },
                    encodeEmail: function(e) {
                        return (e = encodeURI(e)).replace("%20", " ").replace("%25", "%").replace("%5E", "^").replace("%60", "`").replace("%7B", "{").replace("%7C", "|").replace("%7D", "}")
                    }
                };
                e.exports && (e.exports = t), "undefined" != typeof window && window.jQuery && (jQuery.fn.mailcheck = function(e) {
                    var n = this;
                    if (e.suggested) {
                        var i = e.suggested;
                        e.suggested = function(e) {
                            i(n, e)
                        }
                    }
                    if (e.empty) {
                        var o = e.empty;
                        e.empty = function() {
                            o.call(null, n)
                        }
                    }
                    e.email = this.val(), t.run(e)
                })
            }
        },
        t = {};

    function n(i) {
        var o = t[i];
        if (void 0 !== o) return o.exports;
        var a = t[i] = {
            exports: {}
        };
        return e[i](a, a.exports, n), a.exports
    }! function() {
        const e = n(5719),
            t = n(1628),
            i = ["aim", "aol", "att", "bellsouth", "btinternet", "charter", "comcast", "cox", "earthlink", "embarqmail", "facebook", "frontier", "gmail", "gmx", "google", "googlemail", "hotmail", "icloud", "juno", "live", "mac", "mail", "me", "msn", "optonline", "optusnet", "outlook", "qq", "roadrunner", "rocketmail", "rogers", "sbcglobal", "shaw", "sky", "sympatico", "telus", "verizon", "web", "windstream", "xtra", "yahoo", "ymail"];
        let o = "";
        const a = document.getElementById("verifyEmailLink"),
            l = document.getElementById("newEmailWrp"),
            s = document.getElementById("email"),
            c = document.getElementById("emailVerifiedToken"),
            r = document.getElementById("submitBtn"),
            d = document.getElementById("cancelBtn"),
            m = document.getElementById("emailSuggestion"),
            u = document.getElementById("emailVerificationWrp"),
            g = document.getElementById("emailVerificationCodeResendBtn"),
            f = document.getElementById("emailVerificationEmail"),
            p = document.getElementById("emailVerificationCode"),
            h = document.getElementById("emailVerificationToken"),
            v = document.getElementById("emailVerificationFormBtn"),
            b = document.getElementById("emailVerificationFormCancelBtn"),
            y = document.getElementById("emailVerificationForm"),
            E = document.getElementById("bouncedEmailModal");
        d.addEventListener("click", (() => {
            V("AccountSettingsUI_ObjectClicked", {
                clickType: "email",
                clickSubType: "cancel",
                clickLocation: "yourAccount",
                objectProperty: "accountInformation"
            })
        })), a?.addEventListener("click", (() => {
            a.classList.add("disabled", "loading"), a.disabled = !0
        }));
        const k = ui.alert("#emailExistsErrorAlert", {
                closable: !0,
                open: !1,
                type: "error"
            }),
            L = ui.alert("#emailSuggestionAlert", {
                open: !1
            }),
            I = ui.alert("#invalidEmailErrorAlert", {
                closable: !0,
                open: !1,
                type: "error"
            }),
            w = ui.alert("#unknownErrorAlert", {
                closable: !0,
                open: !1,
                type: "error"
            }),
            A = ui.alert("#emailVerification_codeResentSuccessAlert", {
                closable: !0,
                open: !1,
                type: "success"
            }),
            T = ui.alert("#emailVerification_invalidCodeAlert", {
                closable: !0,
                open: !1,
                type: "error"
            }),
            S = ui.alert("#emailVerification_serverErrorAlert", {
                closable: !0,
                open: !1,
                type: "error"
            });
        E && ui.modal(E, {
            closeOnBkgClick: !1,
            hideCloseBtn: !0,
            onOpen: () => {
                document.getElementById("bouncedEmailYesBtn").addEventListener("click", (() => {
                    ui.modal.close(), fetch("/account/identity/api/clear-bounced-email-flag", {
                        headers: {
                            "csrf-token": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
                        },
                        method: "POST"
                    })
                })), document.getElementById("bouncedEmailNoBtn").addEventListener("click", (() => {
                    ui.modal.close()
                }))
            },
            open: !0
        }), s.addEventListener("change", (() => {
            s.setAttribute("data-mailchecked", "false")
        })), s.addEventListener("focus", (() => {
            k && k.close(), I && I.close(), w && w.close()
        }));
        const B = stepUp.authenticator({
            onClose: () => {
                r.classList.remove("loading", "disabled"), r.disabled = !1
            },
            onError: () => {
                w.open(), B.close()
            },
            onSuccess: () => {
                r.classList.add("loading", "disabled"), r.disabled = !0, V("AccountSettingsUI_ObjectClicked", {
                    clickType: "email",
                    clickSubType: "updateEmail",
                    clickLocation: "yourAccount",
                    objectProperty: "accountInformation"
                }), C()
            }
        });

        function D() {
            A?.close(), T?.close(), S?.close(), g.classList.add("noDisplay"), p.value = "", v.classList.remove("disabled", "loading"), v.disabled = !1, window.emailVerificationResendTimeoutId && clearTimeout(window.emailVerificationResendTimeoutId), l.classList.remove("noDisplay"), u.classList.add("noDisplay")
        }

        function C() {
            const e = {
                email: s.value
            };
            c.value && (e.emailVerifiedToken = c.value), fetch("/account/identity/api/update-email", {
                body: JSON.stringify(e),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "csrf-token": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
                },
                method: "POST"
            }).then((e => {
                if (200 !== e.status) throw new Error("Unknown status");
                e.json().then((e => {
                    switch (e.status) {
                        case "INVALID_EMAIL":
                        case "EMAIL_DOMAIN_BLACKLISTED":
                            s.blur(), I.open();
                            break;
                        case "EMAIL_EXISTS":
                            s.blur(), k.open();
                            break;
                        case "EXPIRED_UAUTH_SECURE":
                        case "INVALID_UAUTH_SECURE":
                            B.open();
                            break;
                        case "SUCCESS":
                            return t.addAlert("account-ui", r.getAttribute("data-success-message"), 1e4), void(window.location.href = d.getAttribute("href"));
                        case "VERIFY_EMAIL":
                            if (f.innerHTML = s.value, h.value = e.emailVerificationToken, e.otc) {
                                document.getElementById("ancestry-test-otc")?.remove();
                                const t = document.createElement("div");
                                t.id = "ancestry-test-otc", t.innerText = e.otc, p.parentNode.appendChild(t)
                            }
                            k?.close(), I?.close(), w?.close(), window.emailVerificationResendTimeoutId = setTimeout((() => {
                                u.classList.contains("noDisplay") || (window.emailVerificationResendTimeoutId = void 0)
                            }), 3e4), u.classList.remove("noDisplay"), l.classList.add("noDisplay"), p.focus();
                            break;
                        default:
                            throw new Error("Unknown status")
                    }
                    r.classList.remove("loading", "disabled"), r.disabled = !1
                }))
            })).catch((() => {
                w.open(), r.classList.remove("loading", "disabled"), r.disabled = !1
            }))
        }

        function V(e, t) {
            window.ancestryTracking?.trackEvent && window.ancestryTracking.trackEvent(e, t)
        }
        ui.validator(document.getElementById("emailForm"), {
            fields: {
                email: {
                    required: !0,
                    pattern: "email",
                    when: "submit"
                }
            },
            onSubmit: t => {
                if (t.valid) {
                    if ("true" !== s.getAttribute("data-mailchecked")) return s.setAttribute("data-mailchecked", "true"), e.run({
                        email: s.value,
                        secondLevelDomains: i,
                        suggested: e => {
                            o = e.full;
                            const t = m.getAttribute("data-template"),
                                n = `<button class="emailSuggestion link">${o}</button>`,
                                i = t.replace("{suggestedEmailAddress}", n);
                            m.innerHTML = i, L.open()
                        },
                        empty: () => {
                            L.close(), r.classList.add("loading", "disabled"), r.disabled = !0, B.open()
                        }
                    }), !1;
                    r.classList.add("loading", "disabled"), r.disabled = !0, B.open()
                }
                return !1
            }
        }), ui.validator(y, {
            fields: {
                emailVerificationCode: {
                    required: !0,
                    when: "submit"
                }
            },
            onSubmit: ({
                valid: e
            }) => (e && (v.classList.add("disabled", "loading"), v.disabled = !0, fetch("/account/identity/api/verify-new-email", {
                body: JSON.stringify({
                    code: p.value,
                    token: h.value
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "csrf-token": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
                },
                method: "POST"
            }).then((e => {
                switch (e.status) {
                    case 200:
                        e.json().then((e => {
                            c.value = e.emailVerifiedToken, D(), r.classList.add("loading", "disabled"), r.disabled = !0, C()
                        }));
                        break;
                    case 400:
                        T.open();
                        break;
                    default:
                        throw new Error("Unknown status")
                }
            })).catch((() => {
                S.open()
            })).finally((() => {
                v.classList.remove("disabled", "loading"), v.disabled = !1
            }))), !1)
        }), b.addEventListener("click", (() => {
            D()
        })), m.addEventListener("click", (e => {
            e.target.matches(".emailSuggestion") && (s.value = o, L.close())
        })), s.focus()
    }()
}();
//# sourceMappingURL=email.js.map
