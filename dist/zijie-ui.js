function Gt(e, t) {
  const n = /* @__PURE__ */ Object.create(null), o = e.split(",");
  for (let r = 0; r < o.length; r++)
    n[o[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
function Pe(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], r = C(o) ? Xt(o) : Pe(o);
      if (r)
        for (const s in r)
          t[s] = r[s];
    }
    return t;
  } else {
    if (C(e))
      return e;
    if (V(e))
      return e;
  }
}
const Lt = /;(?![^(]*\))/g, Yt = /:([^]+)/, Qt = /\/\*.*?\*\//gs;
function Xt(e) {
  const t = {};
  return e.replace(Qt, "").split(Lt).forEach((n) => {
    if (n) {
      const o = n.split(Yt);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function Me(e) {
  let t = "";
  if (C(e))
    t = e;
  else if (h(e))
    for (let n = 0; n < e.length; n++) {
      const o = Me(e[n]);
      o && (t += o + " ");
    }
  else if (V(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const P = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Zt = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], ut = () => {
}, kt = /^on[^a-z]/, en = (e) => kt.test(e), v = Object.assign, tn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, nn = Object.prototype.hasOwnProperty, g = (e, t) => nn.call(e, t), h = Array.isArray, Y = (e) => we(e) === "[object Map]", rn = (e) => we(e) === "[object Set]", O = (e) => typeof e == "function", C = (e) => typeof e == "string", Fe = (e) => typeof e == "symbol", V = (e) => e !== null && typeof e == "object", on = (e) => V(e) && O(e.then) && O(e.catch), sn = Object.prototype.toString, we = (e) => sn.call(e), at = (e) => we(e).slice(8, -1), cn = (e) => we(e) === "[object Object]", Ae = (e) => C(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ln = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, un = ln((e) => e.charAt(0).toUpperCase() + e.slice(1)), he = (e, t) => !Object.is(e, t), an = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let Ye;
const fn = () => Ye || (Ye = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Qe(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let ft;
function pn(e, t = ft) {
  t && t.active && t.effects.push(e);
}
function dn() {
  return ft;
}
const xe = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, pt = (e) => (e.w & z) > 0, dt = (e) => (e.n & z) > 0, hn = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= z;
}, _n = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let o = 0; o < t.length; o++) {
      const r = t[o];
      pt(r) && !dt(r) ? r.delete(e) : t[n++] = r, r.w &= ~z, r.n &= ~z;
    }
    t.length = n;
  }
}, ye = /* @__PURE__ */ new WeakMap();
let Z = 0, z = 1;
const De = 30;
let b;
const W = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Ie = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class gn {
  constructor(t, n = null, o) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, pn(this, o);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = b, n = U;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = b, b = this, U = !0, z = 1 << ++Z, Z <= De ? hn(this) : Xe(this), this.fn();
    } finally {
      Z <= De && _n(this), z = 1 << --Z, b = this.parent, U = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    b === this ? this.deferStop = !0 : this.active && (Xe(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Xe(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let U = !0;
const ht = [];
function _t() {
  ht.push(U), U = !1;
}
function gt() {
  const e = ht.pop();
  U = e === void 0 ? !0 : e;
}
function y(e, t, n) {
  if (U && b) {
    let o = ye.get(e);
    o || ye.set(e, o = /* @__PURE__ */ new Map());
    let r = o.get(n);
    r || o.set(n, r = xe());
    const s = process.env.NODE_ENV !== "production" ? { effect: b, target: e, type: t, key: n } : void 0;
    mn(r, s);
  }
}
function mn(e, t) {
  let n = !1;
  Z <= De ? dt(e) || (e.n |= z, n = !pt(e)) : n = !e.has(b), n && (e.add(b), b.deps.push(e), process.env.NODE_ENV !== "production" && b.onTrack && b.onTrack(Object.assign({ effect: b }, t)));
}
function K(e, t, n, o, r, s) {
  const i = ye.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && h(e)) {
    const f = Number(o);
    i.forEach((d, l) => {
      (l === "length" || l >= f) && c.push(d);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        h(e) ? Ae(n) && c.push(i.get("length")) : (c.push(i.get(W)), Y(e) && c.push(i.get(Ie)));
        break;
      case "delete":
        h(e) || (c.push(i.get(W)), Y(e) && c.push(i.get(Ie)));
        break;
      case "set":
        Y(e) && c.push(i.get(W));
        break;
    }
  const u = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: o, oldValue: r, oldTarget: s } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? re(c[0], u) : re(c[0]));
  else {
    const f = [];
    for (const d of c)
      d && f.push(...d);
    process.env.NODE_ENV !== "production" ? re(xe(f), u) : re(xe(f));
  }
}
function re(e, t) {
  const n = h(e) ? e : [...e];
  for (const o of n)
    o.computed && Ze(o, t);
  for (const o of n)
    o.computed || Ze(o, t);
}
function Ze(e, t) {
  (e !== b || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(v({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const En = /* @__PURE__ */ Gt("__proto__,__v_isRef,__isVue"), mt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Fe)
), wn = /* @__PURE__ */ je(), Nn = /* @__PURE__ */ je(!0), On = /* @__PURE__ */ je(!0, !0), ke = /* @__PURE__ */ bn();
function bn() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const o = p(this);
      for (let s = 0, i = this.length; s < i; s++)
        y(o, "get", s + "");
      const r = o[t](...n);
      return r === -1 || r === !1 ? o[t](...n.map(p)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      _t();
      const o = p(this)[t].apply(this, n);
      return gt(), o;
    };
  }), e;
}
function Sn(e) {
  const t = p(this);
  return y(t, "has", e), t.hasOwnProperty(e);
}
function je(e = !1, t = !1) {
  return function(o, r, s) {
    if (r === "__v_isReactive")
      return !e;
    if (r === "__v_isReadonly")
      return e;
    if (r === "__v_isShallow")
      return t;
    if (r === "__v_raw" && s === (e ? t ? bt : Ot : t ? zn : Nt).get(o))
      return o;
    const i = h(o);
    if (!e) {
      if (i && g(ke, r))
        return Reflect.get(ke, r, s);
      if (r === "hasOwnProperty")
        return Sn;
    }
    const c = Reflect.get(o, r, s);
    return (Fe(r) ? mt.has(r) : En(r)) || (e || y(o, "get", r), t) ? c : S(c) ? i && Ae(r) ? c : c.value : V(c) ? e ? Vt(c) : St(c) : c;
  };
}
const Vn = /* @__PURE__ */ xn();
function xn(e = !1) {
  return function(n, o, r, s) {
    let i = n[o];
    if (G(i) && S(i) && !S(r))
      return !1;
    if (!e && (!Re(r) && !G(r) && (i = p(i), r = p(r)), !h(n) && S(i) && !S(r)))
      return i.value = r, !0;
    const c = h(n) && Ae(o) ? Number(o) < n.length : g(n, o), u = Reflect.set(n, o, r, s);
    return n === p(s) && (c ? he(r, i) && K(n, "set", o, r, i) : K(n, "add", o, r)), u;
  };
}
function yn(e, t) {
  const n = g(e, t), o = e[t], r = Reflect.deleteProperty(e, t);
  return r && n && K(e, "delete", t, void 0, o), r;
}
function Dn(e, t) {
  const n = Reflect.has(e, t);
  return (!Fe(t) || !mt.has(t)) && y(e, "has", t), n;
}
function In(e) {
  return y(e, "iterate", h(e) ? "length" : W), Reflect.ownKeys(e);
}
const Rn = {
  get: wn,
  set: Vn,
  deleteProperty: yn,
  has: Dn,
  ownKeys: In
}, Et = {
  get: Nn,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && Qe(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && Qe(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, $n = /* @__PURE__ */ v({}, Et, {
  get: On
}), ze = (e) => e, Ne = (e) => Reflect.getPrototypeOf(e);
function oe(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const r = p(e), s = p(t);
  n || (t !== s && y(r, "get", t), y(r, "get", s));
  const { has: i } = Ne(r), c = o ? ze : n ? Ue : We;
  if (i.call(r, t))
    return c(e.get(t));
  if (i.call(r, s))
    return c(e.get(s));
  e !== r && e.get(t);
}
function se(e, t = !1) {
  const n = this.__v_raw, o = p(n), r = p(e);
  return t || (e !== r && y(o, "has", e), y(o, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function ie(e, t = !1) {
  return e = e.__v_raw, !t && y(p(e), "iterate", W), Reflect.get(e, "size", e);
}
function et(e) {
  e = p(e);
  const t = p(this);
  return Ne(t).has.call(t, e) || (t.add(e), K(t, "add", e, e)), this;
}
function tt(e, t) {
  t = p(t);
  const n = p(this), { has: o, get: r } = Ne(n);
  let s = o.call(n, e);
  s ? process.env.NODE_ENV !== "production" && wt(n, o, e) : (e = p(e), s = o.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), s ? he(t, i) && K(n, "set", e, t, i) : K(n, "add", e, t), this;
}
function nt(e) {
  const t = p(this), { has: n, get: o } = Ne(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== "production" && wt(t, n, e) : (e = p(e), r = n.call(t, e));
  const s = o ? o.call(t, e) : void 0, i = t.delete(e);
  return r && K(t, "delete", e, void 0, s), i;
}
function rt() {
  const e = p(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? Y(e) ? new Map(e) : new Set(e) : void 0, o = e.clear();
  return t && K(e, "clear", void 0, void 0, n), o;
}
function ce(e, t) {
  return function(o, r) {
    const s = this, i = s.__v_raw, c = p(i), u = t ? ze : e ? Ue : We;
    return !e && y(c, "iterate", W), i.forEach((f, d) => o.call(r, u(f), u(d), s));
  };
}
function le(e, t, n) {
  return function(...o) {
    const r = this.__v_raw, s = p(r), i = Y(s), c = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, f = r[e](...o), d = n ? ze : t ? Ue : We;
    return !t && y(s, "iterate", u ? Ie : W), {
      // iterator protocol
      next() {
        const { value: l, done: a } = f.next();
        return a ? { value: l, done: a } : {
          value: c ? [d(l[0]), d(l[1])] : d(l),
          done: a
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function F(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${un(e)} operation ${n}failed: target is readonly.`, p(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function vn() {
  const e = {
    get(s) {
      return oe(this, s);
    },
    get size() {
      return ie(this);
    },
    has: se,
    add: et,
    set: tt,
    delete: nt,
    clear: rt,
    forEach: ce(!1, !1)
  }, t = {
    get(s) {
      return oe(this, s, !1, !0);
    },
    get size() {
      return ie(this);
    },
    has: se,
    add: et,
    set: tt,
    delete: nt,
    clear: rt,
    forEach: ce(!1, !0)
  }, n = {
    get(s) {
      return oe(this, s, !0);
    },
    get size() {
      return ie(this, !0);
    },
    has(s) {
      return se.call(this, s, !0);
    },
    add: F(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: F(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: F(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: F(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: ce(!0, !1)
  }, o = {
    get(s) {
      return oe(this, s, !0, !0);
    },
    get size() {
      return ie(this, !0);
    },
    has(s) {
      return se.call(this, s, !0);
    },
    add: F(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: F(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: F(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: F(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: ce(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    e[s] = le(s, !1, !1), n[s] = le(s, !0, !1), t[s] = le(s, !1, !0), o[s] = le(s, !0, !0);
  }), [
    e,
    n,
    t,
    o
  ];
}
const [Cn, Tn, Pn, Mn] = /* @__PURE__ */ vn();
function Ke(e, t) {
  const n = t ? e ? Mn : Pn : e ? Tn : Cn;
  return (o, r, s) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? o : Reflect.get(g(n, r) && r in o ? n : o, r, s);
}
const Fn = {
  get: /* @__PURE__ */ Ke(!1, !1)
}, An = {
  get: /* @__PURE__ */ Ke(!0, !1)
}, jn = {
  get: /* @__PURE__ */ Ke(!0, !0)
};
function wt(e, t, n) {
  const o = p(n);
  if (o !== n && t.call(e, o)) {
    const r = at(e);
    console.warn(`Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const Nt = /* @__PURE__ */ new WeakMap(), zn = /* @__PURE__ */ new WeakMap(), Ot = /* @__PURE__ */ new WeakMap(), bt = /* @__PURE__ */ new WeakMap();
function Kn(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Hn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Kn(at(e));
}
function St(e) {
  return G(e) ? e : He(e, !1, Rn, Fn, Nt);
}
function Vt(e) {
  return He(e, !0, Et, An, Ot);
}
function ue(e) {
  return He(e, !0, $n, jn, bt);
}
function He(e, t, n, o, r) {
  if (!V(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = r.get(e);
  if (s)
    return s;
  const i = Hn(e);
  if (i === 0)
    return e;
  const c = new Proxy(e, i === 2 ? o : n);
  return r.set(e, c), c;
}
function B(e) {
  return G(e) ? B(e.__v_raw) : !!(e && e.__v_isReactive);
}
function G(e) {
  return !!(e && e.__v_isReadonly);
}
function Re(e) {
  return !!(e && e.__v_isShallow);
}
function $e(e) {
  return B(e) || G(e);
}
function p(e) {
  const t = e && e.__v_raw;
  return t ? p(t) : e;
}
function Wn(e) {
  return an(e, "__v_skip", !0), e;
}
const We = (e) => V(e) ? St(e) : e, Ue = (e) => V(e) ? Vt(e) : e;
function S(e) {
  return !!(e && e.__v_isRef === !0);
}
function Un(e) {
  return S(e) ? e.value : e;
}
const Bn = {
  get: (e, t, n) => Un(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t];
    return S(r) && !S(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function Jn(e) {
  return B(e) ? e : new Proxy(e, Bn);
}
const J = [];
function qn(e) {
  J.push(e);
}
function Gn() {
  J.pop();
}
function w(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  _t();
  const n = J.length ? J[J.length - 1].component : null, o = n && n.appContext.config.warnHandler, r = Ln();
  if (o)
    q(o, n, 11, [
      e + t.join(""),
      n && n.proxy,
      r.map(({ vnode: s }) => `at <${Ut(n, s.type)}>`).join(`
`),
      r
    ]);
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    r.length && s.push(`
`, ...Yn(r)), console.warn(...s);
  }
  gt();
}
function Ln() {
  let e = J[J.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const o = e.component && e.component.parent;
    e = o && o.vnode;
  }
  return t;
}
function Yn(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...Qn(n));
  }), t;
}
function Qn({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, r = ` at <${Ut(e.component, e.type, o)}`, s = ">" + n;
  return e.props ? [r, ...Xn(e.props), s] : [r + s];
}
function Xn(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...xt(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function xt(e, t, n) {
  return C(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : S(t) ? (t = xt(e, p(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : O(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = p(t), n ? t : [`${e}=`, t]);
}
const yt = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function q(e, t, n, o) {
  let r;
  try {
    r = o ? e(...o) : e();
  } catch (s) {
    Dt(s, t, n);
  }
  return r;
}
function ve(e, t, n, o) {
  if (O(e)) {
    const s = q(e, t, n, o);
    return s && on(s) && s.catch((i) => {
      Dt(i, t, n);
    }), s;
  }
  const r = [];
  for (let s = 0; s < e.length; s++)
    r.push(ve(e[s], t, n, o));
  return r;
}
function Dt(e, t, n, o = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? yt[n] : n;
    for (; s; ) {
      const f = s.ec;
      if (f) {
        for (let d = 0; d < f.length; d++)
          if (f[d](e, i, c) === !1)
            return;
      }
      s = s.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      q(u, null, 10, [e, i, c]);
      return;
    }
  }
  Zn(e, n, r, o);
}
function Zn(e, t, n, o = !0) {
  if (process.env.NODE_ENV !== "production") {
    const r = yt[t];
    if (n && qn(n), w(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Gn(), o)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let _e = !1, Ce = !1;
const R = [];
let j = 0;
const Q = [];
let T = null, A = 0;
const It = /* @__PURE__ */ Promise.resolve();
let Be = null;
const kn = 100;
function er(e) {
  const t = Be || It;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function tr(e) {
  let t = j + 1, n = R.length;
  for (; t < n; ) {
    const o = t + n >>> 1;
    te(R[o]) < e ? t = o + 1 : n = o;
  }
  return t;
}
function Je(e) {
  (!R.length || !R.includes(e, _e && e.allowRecurse ? j + 1 : j)) && (e.id == null ? R.push(e) : R.splice(tr(e.id), 0, e), Rt());
}
function Rt() {
  !_e && !Ce && (Ce = !0, Be = It.then(vt));
}
function $t(e) {
  h(e) ? Q.push(...e) : (!T || !T.includes(e, e.allowRecurse ? A + 1 : A)) && Q.push(e), Rt();
}
function nr(e) {
  if (Q.length) {
    const t = [...new Set(Q)];
    if (Q.length = 0, T) {
      T.push(...t);
      return;
    }
    for (T = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), T.sort((n, o) => te(n) - te(o)), A = 0; A < T.length; A++)
      process.env.NODE_ENV !== "production" && Ct(e, T[A]) || T[A]();
    T = null, A = 0;
  }
}
const te = (e) => e.id == null ? 1 / 0 : e.id, rr = (e, t) => {
  const n = te(e) - te(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function vt(e) {
  Ce = !1, _e = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), R.sort(rr);
  const t = process.env.NODE_ENV !== "production" ? (n) => Ct(e, n) : ut;
  try {
    for (j = 0; j < R.length; j++) {
      const n = R[j];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        q(
          n,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    j = 0, R.length = 0, nr(e), _e = !1, Be = null, (R.length || Q.length) && vt(e);
  }
}
function Ct(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > kn) {
      const o = t.ownerInstance, r = o && Wt(o.type);
      return w(`Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
const X = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (fn().__VUE_HMR_RUNTIME__ = {
  createRecord: be(or),
  rerender: be(sr),
  reload: be(ir)
});
const ge = /* @__PURE__ */ new Map();
function or(e, t) {
  return ge.has(e) ? !1 : (ge.set(e, {
    initialDef: k(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function k(e) {
  return Bt(e) ? e.__vccOpts : e;
}
function sr(e, t) {
  const n = ge.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, k(o.type).render = t), o.renderCache = [], o.update();
  }));
}
function ir(e, t) {
  const n = ge.get(e);
  if (!n)
    return;
  t = k(t), ot(n.initialDef, t);
  const o = [...n.instances];
  for (const r of o) {
    const s = k(r.type);
    X.has(s) || (s !== n.initialDef && ot(s, t), X.add(s)), r.appContext.optionsCache.delete(r.type), r.ceReload ? (X.add(s), r.ceReload(t.styles), X.delete(s)) : r.parent ? Je(r.parent.update) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  $t(() => {
    for (const r of o)
      X.delete(k(r.type));
  });
}
function ot(e, t) {
  v(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function be(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let I = null, cr = null;
const lr = (e) => e.__isSuspense;
function ur(e, t) {
  t && t.pendingBranch ? h(e) ? t.effects.push(...e) : t.effects.push(e) : $t(e);
}
const ae = {};
function ar(e, t, { immediate: n, deep: o, flush: r, onTrack: s, onTrigger: i } = P) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && w('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), o !== void 0 && w('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const c = (_) => {
    w("Invalid watch source: ", _, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, u = dn() === (M == null ? void 0 : M.scope) ? M : null;
  let f, d = !1, l = !1;
  if (S(e) ? (f = () => e.value, d = Re(e)) : B(e) ? (f = () => e, o = !0) : h(e) ? (l = !0, d = e.some((_) => B(_) || Re(_)), f = () => e.map((_) => {
    if (S(_))
      return _.value;
    if (B(_))
      return L(_);
    if (O(_))
      return q(
        _,
        u,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    process.env.NODE_ENV !== "production" && c(_);
  })) : O(e) ? t ? f = () => q(
    e,
    u,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : f = () => {
    if (!(u && u.isUnmounted))
      return a && a(), ve(e, u, 3, [m]);
  } : (f = ut, process.env.NODE_ENV !== "production" && c(e)), t && o) {
    const _ = f;
    f = () => L(_());
  }
  let a, m = (_) => {
    a = D.onStop = () => {
      q(
        _,
        u,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, E = l ? new Array(e.length).fill(ae) : ae;
  const x = () => {
    if (D.active)
      if (t) {
        const _ = D.run();
        (o || d || (l ? _.some((Jt, qt) => he(Jt, E[qt])) : he(_, E))) && (a && a(), ve(t, u, 3, [
          _,
          // pass undefined as the old value when it's changed for the first time
          E === ae ? void 0 : l && E[0] === ae ? [] : E,
          m
        ]), E = _);
      } else
        D.run();
  };
  x.allowRecurse = !!t;
  let ne;
  r === "sync" ? ne = x : r === "post" ? ne = () => ct(x, u && u.suspense) : (x.pre = !0, u && (x.id = u.uid), ne = () => Je(x));
  const D = new gn(f, ne);
  return process.env.NODE_ENV !== "production" && (D.onTrack = s, D.onTrigger = i), t ? n ? x() : E = D.run() : r === "post" ? ct(D.run.bind(D), u && u.suspense) : D.run(), () => {
    D.stop(), u && u.scope && tn(u.scope.effects, D);
  };
}
function fr(e, t, n) {
  const o = this.proxy, r = C(e) ? e.includes(".") ? pr(o, e) : () => o[e] : e.bind(o, o);
  let s;
  O(t) ? s = t : (s = t.handler, n = t);
  const i = M;
  lt(this);
  const c = ar(r, s.bind(o), n);
  return i ? lt(i) : vr(), c;
}
function pr(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let r = 0; r < n.length && o; r++)
      o = o[n[r]];
    return o;
  };
}
function L(e, t) {
  if (!V(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), S(e))
    L(e.value, t);
  else if (h(e))
    for (let n = 0; n < e.length; n++)
      L(e[n], t);
  else if (rn(e) || Y(e))
    e.forEach((n) => {
      L(n, t);
    });
  else if (cn(e))
    for (const n in e)
      L(e[n], t);
  return e;
}
const dr = (e) => !!e.type.__asyncLoader, hr = Symbol();
function _r(e, t, n = {}, o, r) {
  if (I.isCE || I.parent && dr(I.parent) && I.parent.isCE)
    return t !== "default" && (n.name = t), Ge("slot", n, o && o());
  let s = e[t];
  process.env.NODE_ENV !== "production" && s && s.length > 1 && (w("SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."), s = () => []), s && s._c && (s._d = !1), Mt();
  const i = s && Tt(s(n)), c = yr(
    Oe,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`
    },
    i || (o ? o() : []),
    i && e._ === 1 ? 64 : -2
    /* PatchFlags.BAIL */
  );
  return !r && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), s && s._c && (s._d = !0), c;
}
function Tt(e) {
  return e.some((t) => At(t) ? !(t.type === Pt || t.type === Oe && !Tt(t.children)) : !0) ? e : null;
}
const Te = (e) => e ? Cr(e) ? Tr(e) || e.proxy : Te(e.parent) : null, ee = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ v(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? ue(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? ue(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? ue(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? ue(e.refs) : e.refs,
    $parent: (e) => Te(e.parent),
    $root: (e) => Te(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Er(e),
    $forceUpdate: (e) => e.f || (e.f = () => Je(e.update)),
    $nextTick: (e) => e.n || (e.n = er.bind(e.proxy)),
    $watch: (e) => fr.bind(e)
  })
), gr = (e) => e === "_" || e === "$", Se = (e, t) => e !== P && !e.__isScriptSetup && g(e, t), mr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: o, data: r, props: s, accessCache: i, type: c, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let f;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return o[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (Se(o, t))
          return i[t] = 1, o[t];
        if (r !== P && g(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && g(f, t)
        )
          return i[t] = 3, s[t];
        if (n !== P && g(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = ee[t];
    let l, a;
    if (d)
      return t === "$attrs" && (y(e, "get", t), process.env.NODE_ENV !== "production" && void 0), d(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== P && g(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      a = u.config.globalProperties, g(a, t)
    )
      return a[t];
    process.env.NODE_ENV !== "production" && I && (!C(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== P && gr(t[0]) && g(r, t) ? w(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === I && w(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: r, ctx: s } = e;
    return Se(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && g(r, t) ? (w(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== P && g(o, t) ? (o[t] = n, !0) : g(e.props, t) ? (process.env.NODE_ENV !== "production" && w(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && w(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(s, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: r, propsOptions: s } }, i) {
    let c;
    return !!n[i] || e !== P && g(e, i) || Se(t, i) || (c = s[0]) && g(c, i) || g(o, i) || g(ee, i) || g(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : g(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (mr.ownKeys = (e) => (w("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function Er(e) {
  const t = e.type, { mixins: n, extends: o } = t, { mixins: r, optionsCache: s, config: { optionMergeStrategies: i } } = e.appContext, c = s.get(t);
  let u;
  return c ? u = c : !r.length && !n && !o ? u = t : (u = {}, r.length && r.forEach((f) => me(u, f, i, !0)), me(u, t, i)), V(t) && s.set(t, u), u;
}
function me(e, t, n, o = !1) {
  const { mixins: r, extends: s } = t;
  s && me(e, s, n, !0), r && r.forEach((i) => me(e, i, n, !0));
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && w('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const c = wr[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const wr = {
  data: st,
  props: H,
  emits: H,
  // objects
  methods: H,
  computed: H,
  // lifecycle
  beforeCreate: N,
  created: N,
  beforeMount: N,
  mounted: N,
  beforeUpdate: N,
  updated: N,
  beforeDestroy: N,
  beforeUnmount: N,
  destroyed: N,
  unmounted: N,
  activated: N,
  deactivated: N,
  errorCaptured: N,
  serverPrefetch: N,
  // assets
  components: H,
  directives: H,
  // watch
  watch: Or,
  // provide / inject
  provide: st,
  inject: Nr
};
function st(e, t) {
  return t ? e ? function() {
    return v(O(e) ? e.call(this, this) : e, O(t) ? t.call(this, this) : t);
  } : t : e;
}
function Nr(e, t) {
  return H(it(e), it(t));
}
function it(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function N(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function H(e, t) {
  return e ? v(v(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function Or(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = v(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = N(e[o], t[o]);
  return n;
}
const ct = ur, br = (e) => e.__isTeleport, Oe = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), Sr = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), Pt = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
const fe = [];
let $ = null;
function Mt(e = !1) {
  fe.push($ = e ? null : []);
}
function Vr() {
  fe.pop(), $ = fe[fe.length - 1] || null;
}
function Ft(e) {
  return e.dynamicChildren = $ || Zt, Vr(), $ && $.push(e), e;
}
function xr(e, t, n, o, r, s) {
  return Ft(qe(
    e,
    t,
    n,
    o,
    r,
    s,
    !0
    /* isBlock */
  ));
}
function yr(e, t, n, o, r) {
  return Ft(Ge(
    e,
    t,
    n,
    o,
    r,
    !0
    /* isBlock: prevent a block from tracking itself */
  ));
}
function At(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Dr = (...e) => Kt(...e), jt = "__vInternal", zt = ({ key: e }) => e ?? null, pe = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? C(e) || S(e) || O(e) ? { i: I, r: e, k: t, f: !!n } : e : null;
function qe(e, t = null, n = null, o = 0, r = null, s = e === Oe ? 0 : 1, i = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && zt(t),
    ref: t && pe(t),
    scopeId: cr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: o,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: I
  };
  return c ? (Le(u, n), s & 128 && e.normalize(u)) : n && (u.shapeFlag |= C(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && w("VNode created with invalid key (NaN). VNode type:", u.type), // avoid a block node from tracking itself
  !i && // has current parent block
  $ && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && $.push(u), u;
}
const Ge = process.env.NODE_ENV !== "production" ? Dr : Kt;
function Kt(e, t = null, n = null, o = 0, r = null, s = !1) {
  if ((!e || e === hr) && (process.env.NODE_ENV !== "production" && !e && w(`Invalid vnode type when creating vnode: ${e}.`), e = Pt), At(e)) {
    const c = Ee(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Le(c, n), !s && $ && (c.shapeFlag & 6 ? $[$.indexOf(e)] = c : $.push(c)), c.patchFlag |= -2, c;
  }
  if (Bt(e) && (e = e.__vccOpts), t) {
    t = Ir(t);
    let { class: c, style: u } = t;
    c && !C(c) && (t.class = Me(c)), V(u) && ($e(u) && !h(u) && (u = v({}, u)), t.style = Pe(u));
  }
  const i = C(e) ? 1 : lr(e) ? 128 : br(e) ? 64 : V(e) ? 4 : O(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && $e(e) && (e = p(e), w("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), qe(e, t, n, o, r, i, s, !0);
}
function Ir(e) {
  return e ? $e(e) || jt in e ? v({}, e) : e : null;
}
function Ee(e, t, n = !1) {
  const { props: o, ref: r, patchFlag: s, children: i } = e, c = t ? $r(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && zt(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? h(r) ? r.concat(pe(t)) : [r, pe(t)] : pe(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && h(i) ? i.map(Ht) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Oe ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ee(e.ssContent),
    ssFallback: e.ssFallback && Ee(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Ht(e) {
  const t = Ee(e);
  return h(e.children) && (t.children = e.children.map(Ht)), t;
}
function Rr(e = " ", t = 0) {
  return Ge(Sr, null, e, t);
}
function Le(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (h(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Le(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(jt in t) ? t._ctx = I : r === 3 && I && (I.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    O(t) ? (t = { default: t, _ctx: I }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [Rr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function $r(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const r in o)
      if (r === "class")
        t.class !== o.class && (t.class = Me([t.class, o.class]));
      else if (r === "style")
        t.style = Pe([t.style, o.style]);
      else if (en(r)) {
        const s = t[r], i = o[r];
        i && s !== i && !(h(s) && s.includes(i)) && (t[r] = s ? [].concat(s, i) : i);
      } else
        r !== "" && (t[r] = o[r]);
  }
  return t;
}
let M = null;
const lt = (e) => {
  M = e, e.scope.on();
}, vr = () => {
  M && M.scope.off(), M = null;
};
function Cr(e) {
  return e.vnode.shapeFlag & 4;
}
function Tr(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Jn(Wn(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in ee)
          return ee[n](e);
      },
      has(t, n) {
        return n in t || n in ee;
      }
    }));
}
const Pr = /(?:^|[-_])(\w)/g, Mr = (e) => e.replace(Pr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Wt(e, t = !0) {
  return O(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Ut(e, t, n = !1) {
  let o = Wt(t);
  if (!o && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (o = r[1]);
  }
  if (!o && e && e.parent) {
    const r = (s) => {
      for (const i in s)
        if (s[i] === t)
          return i;
    };
    o = r(e.components || e.parent.type.components) || r(e.appContext.components);
  }
  return o ? Mr(o) : n ? "App" : "Anonymous";
}
function Bt(e) {
  return O(e) && "__vccOpts" in e;
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function Ve(e) {
  return !!(e && e.__v_isShallow);
}
function Fr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, o = { style: "color:#9d288c" }, r = {
    header(l) {
      return V(l) ? l.__isVue ? ["div", e, "VueInstance"] : S(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        c(l.value),
        ">"
      ] : B(l) ? [
        "div",
        {},
        ["span", e, Ve(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${G(l) ? " (readonly)" : ""}`
      ] : G(l) ? [
        "div",
        {},
        ["span", e, Ve(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...s(l.$)
        ];
    }
  };
  function s(l) {
    const a = [];
    l.type.props && l.props && a.push(i("props", p(l.props))), l.setupState !== P && a.push(i("setup", l.setupState)), l.data !== P && a.push(i("data", p(l.data)));
    const m = u(l, "computed");
    m && a.push(i("computed", m));
    const E = u(l, "inject");
    return E && a.push(i("injected", E)), a.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), a;
  }
  function i(l, a) {
    return a = v({}, a), Object.keys(a).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(a).map((m) => [
          "div",
          {},
          ["span", o, m + ": "],
          c(a[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, a = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", o, l] : V(l) ? ["object", { object: a ? p(l) : l }] : ["span", n, String(l)];
  }
  function u(l, a) {
    const m = l.type;
    if (O(m))
      return;
    const E = {};
    for (const x in l.ctx)
      f(m, x, a) && (E[x] = l.ctx[x]);
    return E;
  }
  function f(l, a, m) {
    const E = l[m];
    if (h(E) && E.includes(a) || V(E) && a in E || l.extends && f(l.extends, a, m) || l.mixins && l.mixins.some((x) => f(x, a, m)))
      return !0;
  }
  function d(l) {
    return Ve(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
function Ar() {
  Fr();
}
process.env.NODE_ENV !== "production" && Ar();
const jr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, zr = {
  name: "tButton"
};
function Kr(e, t, n, o, r, s) {
  return Mt(), xr("div", null, [
    qe("button", null, [
      _r(e.$slots, "default")
    ])
  ]);
}
const de = /* @__PURE__ */ jr(zr, [["render", Kr]]);
de.install = (e) => {
  e.component(de.name, de);
};
const Hr = (e) => {
  e.use(de);
}, Ur = {
  install: Hr
};
export {
  Ur as default,
  de as tButton
};
