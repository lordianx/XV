! function() {
    var e = {
            9571: function(e) {
                e.exports = class {
                    constructor({
                        onClose: e,
                        onError: t,
                        onOpen: o,
                        onSuccess: s
                    }) {
                        this.closeHandler = () => {}, this.errorHandler = () => {}, this.openHandler = () => {}, this.successHandler = () => {}, e && e instanceof Function && (this.closeHandler = e), t && t instanceof Function && (this.errorHandler = t), o && o instanceof Function && (this.openHandler = o), s && s instanceof Function && (this.successHandler = s)
                    }
                    close() {
                        ui.modal.isOpen() ? ui.modal.close() : this.closeHandler(), document.body.stepUpAuthenticator = void 0
                    }
                    open() {
                        fetch("/account/security/step-up/api/status", {
                            headers: {
                                Accept: "application/json"
                            },
                            method: "GET"
                        }).then((e => {
                            if (200 !== e.status) throw new Error("Unknown status");
                            e.json().then((e => {
                                switch (e.status) {
                                    case "NONE":
                                        return void this.errorHandler({
                                            error: "NOT_LOGGED_IN"
                                        });
                                    case "SECURE":
                                        return void this.successHandler({
                                            expiresIn: e.expiresIn
                                        });
                                    case "ERROR":
                                        throw new Error("Server error");
                                    default:
                                        document.body.stepUpModal ? (document.body.stepUpAuthenticator = this, document.body.stepUpModal.open()) : this.errorHandler({
                                            error: "No modal"
                                        })
                                }
                            }))
                        })).catch((() => {
                            this.errorHandler({
                                error: "UNKNOWN"
                            })
                        }))
                    }
                }
            }
        },
        t = {};

    function o(s) {
        var a = t[s];
        if (void 0 !== a) return a.exports;
        var c = t[s] = {
            exports: {}
        };
        return e[s](c, c.exports, o), c.exports
    }! function() {
        const e = o(9571);
        let t, s, a, c, n, r, i, l, d, p, u, m, h, b, y, w, S, k, U;
        window.stepUp = {
            authenticator: ({
                onClose: t,
                onError: o,
                onOpen: s,
                onSuccess: a
            }) => new e({
                onClose: t,
                onError: o,
                onOpen: s,
                onSuccess: a
            })
        };
        const f = document.createElement("div");
        f.id = "stepUpAuth", f.classList.add("modal"), document.body.appendChild(f);
        const E = ui.modal("#stepUpAuth", {
            closeOnBkgClick: !1,
            onClose: () => {
                document.body.stepUpAuthenticator?.closeHandler()
            },
            onOpen: () => {
                document.body.stepUpAuthenticator?.openHandler(), A()
            },
            useCustomPadding: !0,
            width: 500
        });

        function A() {
            k?.close(), t.setAttribute("data-current-view", "methodSelect")
        }

        function g(e, t) {
            window.ancestryTracking?.trackEvent && window.ancestryTracking.trackEvent(e, t)
        }
        document.body.stepUpModal = E, fetch("/account/security/step-up/api/content", {
            headers: {
                Accept: "application/json"
            },
            method: "GET"
        }).then((e => e.json())).then((e => {
            switch (e.status) {
                case "SUCCESS":
                    E.element.innerHTML = e.html, E.element.setAttribute("data-csrf-token", e.csrfToken), t = E.element.querySelector(".viewWrp"), s = E.element.querySelector(".methodSelectView .emailBtn"), a = E.element.querySelector(".methodSelectView .passwordBtn"), c = E.element.querySelector(".methodSelectView .cancelBtn"), s?.addEventListener("click", (() => {
                        g("AccountSettingsUI_ObjectClicked", {
                            clickLocation: "stepUpPopup",
                            clickSubType: "email",
                            clickType: "selectMethod",
                            feature: "step up authentication",
                            objectProperty: "accountSecurity",
                            schemaVersion: 10
                        }), g("AccountSettingsUI_ObjectClicked", {
                            clickLocation: "stepUpPopup",
                            clickSubType: "email",
                            clickType: "sendCode",
                            feature: "step up authentication",
                            objectProperty: "accountSecurity",
                            schemaVersion: 10
                        }), s.classList.add("loading", "disabled"), s.disabled = !0, fetch("/account/security/step-up/api/send-email-code", {
                            headers: {
                                Accept: "application/json",
                                "csrf-token": E.element.getAttribute("data-csrf-token")
                            },
                            method: "POST"
                        }).then((e => {
                            200 === e.status ? e.json().then((e => {
                                if ("SUCCESS" === e.status) {
                                    if (e.otc) {
                                        E.element.querySelector(".ancestry-test-otc")?.remove();
                                        const t = document.createElement("div");
                                        t.classList.add("ancestry-test-otc"), t.innerText = e.otc, E.element.querySelector(".emailView #stepUpEmailCodeWrp").appendChild(t)
                                    }
                                    return d?.updateValidationMessage("stepUpEmailCode", null, ""), r.value = "", t.setAttribute("data-current-view", "email"), void r.focus()
                                }
                                k?.open()
                            })) : k?.open(), s.classList.remove("loading", "disabled"), s.disabled = !1
                        }))
                    })), a?.addEventListener("click", (() => {
                        g("AccountSettingsUI_ObjectClicked", {
                            clickLocation: "stepUpPopup",
                            clickSubType: "currentPassword",
                            clickType: "selectMethod",
                            feature: "step up authentication",
                            objectProperty: "accountSecurity",
                            schemaVersion: 10
                        }), w?.updateValidationMessage("stepUpPassword", null, ""), u.value = "", t.setAttribute("data-current-view", "password"), u.focus()
                    })), c?.addEventListener("click", (() => {
                        g("AccountSettingsUI_ObjectClicked", {
                            clickLocation: "stepUpPopup",
                            clickSubType: "cancel",
                            clickType: "selectMethod",
                            feature: "step up authentication",
                            objectProperty: "accountSecurity",
                            schemaVersion: 10
                        }), E.close()
                    })), n = E.element.querySelector(".emailView form"), r = E.element.querySelector(".emailView #stepUpEmailCode"), i = E.element.querySelector(".emailView .submitBtn"), l = E.element.querySelector(".emailView .cancelBtn"), l?.addEventListener("click", (() => {
                        g("AccountSettingsUI_ObjectClicked", {
                            clickLocation: "stepUpPopup",
                            clickSubType: "cancel",
                            clickType: "submitCode",
                            feature: "step up authentication",
                            objectProperty: "accountSecurity",
                            schemaVersion: 10
                        }), E.close()
                    })), d = ui.validator(n, {
                        allowMultipleSubmissions: !0,
                        fields: {
                            stepUpEmailCode: {
                                minLength: 5,
                                required: !0,
                                when: "submit"
                            }
                        },
                        onSubmit: ({
                            valid: e
                        }) => e ? (i.classList.add("loading", "disabled"), i.disabled = !0, fetch("/account/security/step-up/api/verify-code", {
                            body: JSON.stringify({
                                code: r.value
                            }),
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                "csrf-token": E.element.getAttribute("data-csrf-token")
                            },
                            method: "POST"
                        }).then((e => {
                            if (200 !== e.status) throw new Error("Unknown status");
                            e.json().then((e => {
                                switch (e.status) {
                                    case "SUCCESS":
                                        E?.close(), document.body.stepUpAuthenticator?.successHandler();
                                        break;
                                    case "INVALID_INPUT":
                                    case "INVALID_CODE":
                                        d.updateValidationMessage("stepUpEmailCode", !1, d.fields.stepUpEmailCode.label.getAttribute("data-error-invalid")), r.focus();
                                        break;
                                    case "NOT_LOGGED_IN":
                                        document.body.stepUpAuthenticator?.errorHandler({
                                            error: "NOT_LOGGED_IN"
                                        });
                                        break;
                                    case "LIMIT_EXCEEDED":
                                        d.updateValidationMessage("stepUpEmailCode", !1, d.fields.stepUpEmailCode.label.getAttribute("data-error-locked"));
                                        break;
                                    default:
                                        throw new Error("Unknown status")
                                }
                            }))
                        })).catch((() => {
                            k?.open()
                        })).finally((() => {
                            i.classList.remove("disabled", "loading"), i.disabled = !1
                        })), g("AccountSettingsUI_ObjectClicked", {
                            clickLocation: "stepUpPopup",
                            clickSubType: "continue",
                            clickType: "submitCode",
                            feature: "step up authentication",
                            objectProperty: "accountSecurity",
                            schemaVersion: 10
                        }), !1) : (r?.value?.length > 0 ? d.updateValidationMessage("stepUpEmailCode", !1, d.fields.stepUpEmailCode.label.getAttribute("data-error-short")) : d.updateValidationMessage("stepUpEmailCode", !1, d.fields.stepUpEmailCode.label.getAttribute("data-error")), !1),
                        submitButton: i
                    }), p = E.element.querySelector(".passwordView form"), u = E.element.querySelector(".passwordView #stepUpPassword"), m = E.element.querySelector(".passwordView #stepUpPasswordHideBtn"), h = E.element.querySelector(".passwordView #stepUpPasswordShowBtn"), b = E.element.querySelector(".passwordView .submitBtn"), y = E.element.querySelector(".passwordView .cancelBtn"), m?.addEventListener("click", (() => {
                        m.classList.add("noDisplay"), h.classList.remove("noDisplay"), u.setAttribute("type", "password")
                    })), h?.addEventListener("click", (() => {
                        h.classList.add("noDisplay"), m.classList.remove("noDisplay"), u.setAttribute("type", "text")
                    })), y?.addEventListener("click", (() => {
                        g("AccountSettingsUI_ObjectClicked", {
                            clickLocation: "stepUpPopup",
                            clickSubType: "cancel",
                            clickType: "password",
                            feature: "step up authentication",
                            objectProperty: "accountSecurity",
                            schemaVersion: 10
                        }), E.close()
                    })), w = ui.validator(p, {
                        allowMultipleSubmissions: !0,
                        fields: {
                            stepUpPassword: {
                                minLength: 5,
                                required: !0,
                                when: "submit"
                            }
                        },
                        onSubmit: ({
                            valid: e
                        }) => {
                            if (!e) return u?.value?.length > 0 ? w.updateValidationMessage("stepUpPassword", !1, w.fields.stepUpPassword.label.getAttribute("data-error-short")) : w.updateValidationMessage("stepUpPassword", !1, w.fields.stepUpPassword.label.getAttribute("data-error")), !1;
                            b.classList.add("loading", "disabled"), b.disabled = !0, fetch("/account/password/verify", {
                                body: JSON.stringify({
                                    password: u.value
                                }),
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                    "csrf-token": E.element.getAttribute("data-csrf-token")
                                },
                                method: "POST"
                            }).then((e => {
                                if (200 !== e.status) throw new Error("Unknown status");
                                e.json().then((e => {
                                    switch (e.status) {
                                        case "VALID_PASSWORD":
                                            E?.close(), document.body.stepUpAuthenticator?.successHandler();
                                            break;
                                        case "NOT_LOGGED_IN":
                                            document.body.stepUpAuthenticator?.errorHandler({
                                                error: "NOT_LOGGED_IN"
                                            });
                                            break;
                                        case "ACCOUNT_LOCKED":
                                            w.updateValidationMessage("stepUpPassword", !1, w.fields.stepUpPassword.label.getAttribute("data-error-locked"));
                                            break;
                                        case "INVALID_PASSWORD":
                                            w.updateValidationMessage("stepUpPassword", !1, w.fields.stepUpPassword.label.getAttribute("data-error-invalid")), u.focus();
                                            break;
                                        default:
                                            throw new Error("Unknown status")
                                    }
                                }))
                            })).catch((() => {
                                k?.open()
                            })).finally((() => {
                                b.classList.remove("disabled", "loading"), b.disabled = !1
                            })), g("AccountSettingsUI_ObjectClicked", {
                                clickLocation: "stepUpPopup",
                                clickSubType: "continue",
                                clickType: "password",
                                feature: "step up authentication",
                                objectProperty: "accountSecurity",
                                schemaVersion: 10
                            })
                        },
                        submitButton: b
                    }), S = E.element.querySelector("#stepUpServerErrorAlert"), U = E.element.querySelector(".tryAnotherMethodBtn"), k = ui.alert(S, {
                        animation: !1,
                        closable: !0,
                        display: "notification",
                        location: "bottomRight",
                        open: !1,
                        type: "error"
                    }), S.addEventListener("blur", (() => {
                        k?.close()
                    })), U?.addEventListener("click", (() => {
                        const e = t.getAttribute("data-current-view");
                        let o = "";
                        o = "email" === e ? "sendCode" : e, g("AccountSettingsUI_ObjectClicked", {
                            clickLocation: "stepUpPopup",
                            clickSubType: "tryAnotherMethod",
                            clickType: o,
                            feature: "step up authentication",
                            objectProperty: "accountSecurity",
                            schemaVersion: 10
                        }), A()
                    }));
                    break;
                case "SECURE":
                    document.body.stepUpAuthenticator?.successHandler();
                    break;
                case "NOT_LOGGED_IN":
                    document.body.stepUpAuthenticator?.errorHandler({
                        error: "NOT_LOGGED_IN"
                    });
                    break;
                default:
                    throw new Error("Unknown status")
            }
        })).catch((() => {
            document.body.stepUpAuthenticator?.errorHandler({
                error: "SERVER_ERROR"
            })
        }))
    }()
}();
//# sourceMappingURL=client.js.map
