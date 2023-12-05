var h = {}, ee = 28, te = 1, N = 1e6, K = 1e6, ne = -29, re = 29, ie = !1, q = "[big.js] ", T = q + "Invalid ", C = T + "decimal places", oe = T + "rounding mode", $ = q + "Division by zero", v = void 0, se = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
function X() {
  function e(t) {
    var n = this;
    if (!(n instanceof e))
      return t === v ? X() : new e(t);
    if (t instanceof e)
      n.s = t.s, n.e = t.e, n.c = t.c.slice(), ue(n);
    else {
      if (typeof t != "string") {
        if (e.strict === !0)
          throw TypeError(T + "number");
        t = t === 0 && 1 / t < 0 ? "-0" : String(t);
      }
      ce(n, t);
    }
    n.constructor = e;
  }
  return e.prototype = h, e.DP = ee, e.RM = te, e.NE = ne, e.PE = re, e.strict = ie, e;
}
function ue(e) {
  if (e.c.length > 1 && !e.c[0]) {
    let t = e.c.findIndex((n) => n);
    e.c = e.c.slice(t), e.e = e.e - t;
  }
}
function ce(e, t) {
  var n, r, i;
  if (!se.test(t))
    throw Error(T + "number");
  for (e.s = t.charAt(0) == "-" ? (t = t.slice(1), -1) : 1, (n = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (r = t.search(/e/i)) > 0 ? (n < 0 && (n = r), n += +t.slice(r + 1), t = t.substring(0, r)) : n < 0 && (n = t.length), i = t.length, r = 0; r < n && r < i && t.charAt(r) == "0"; )
    ++r;
  if (r == i)
    e.c = [e.e = 0];
  else
    for (e.e = n - r - 1, e.c = [], n = 0; r < i; )
      e.c[n++] = +t.charAt(r++);
  return e = O(e, B.DP + 1, B.RM), e;
}
function O(e, t, n, r) {
  var i = e.c;
  if (n === v && (n = B.RM), n !== 0 && n !== 1 && n !== 2 && n !== 3)
    throw Error(oe);
  if (t < 1)
    r = n === 3 && (r || !!i[0]) || t === 0 && (n === 1 && i[0] >= 5 || n === 2 && (i[0] > 5 || i[0] === 5 && (r || i[1] !== v))), i.length = 1, r ? (e.e = e.e - t + 1, i[0] = 1) : i[0] = e.e = 0;
  else if (t < i.length) {
    const o = i.findIndex((s, f) => f >= t && s > 0) < 0;
    if (r = n === 1 && i[t] >= 5 || n === 2 && (i[t] > 5 || i[t] === 5 && (r || i[t + 1] !== v || i[t - 1] & 1)) || n === 3 && (r || !o), i.length = t--, r)
      for (; ++i[t] > 9; )
        i[t] = 0, t-- || (++e.e, i.unshift(1));
    for (t = i.length; !i[--t]; )
      i.pop();
  }
  return e;
}
function D(e, t, n) {
  var r = e.e, i = e.c.join(""), o = i.length;
  if (t)
    i = i.charAt(0) + (o > 1 ? "." + i.slice(1) : "") + (r < 0 ? "e" : "e+") + r;
  else if (r < 0) {
    for (; ++r; )
      i = "0" + i;
    i = "0." + i;
  } else if (r > 0)
    if (++r > o)
      for (r -= o; r--; )
        i += "0";
    else
      r < o && (i = i.slice(0, r) + "." + i.slice(r));
  else
    o > 1 && (i = i.charAt(0) + "." + i.slice(1));
  return e.s < 0 && n ? "-" + i : i;
}
h.abs = function() {
  var e = new this.constructor(this);
  return e.s = 1, e;
};
h.cmp = function(i) {
  var t, n = this.constructor, r = new n(this), i = new n(i), o = r.c, s = i.c, f = r.s, u = i.s, l = r.e, c = i.e;
  if (!o[0] || !s[0])
    return o[0] ? f : s[0] ? -u : 0;
  if (f != u)
    return f;
  if (t = f < 0, l != c)
    return l > c ^ t ? 1 : -1;
  for (u = Math.max(o.length, s.length), f = 0; f < u; f++)
    if (l = f < o.length ? o[f] : 0, c = f < s.length ? s[f] : 0, l != c)
      return l > c ^ t ? 1 : -1;
  return 0;
};
h.div = function(r) {
  var t = this.constructor, n = new t(this), r = new t(r), i = n.c, o = r.c, s = n.s == r.s ? 1 : -1, f = t.DP;
  if (f !== ~~f || f < 0 || f > N)
    throw Error(C);
  if (!o[0])
    throw Error($);
  if (!i[0])
    return r.s = s, r.c = [r.e = 0], r;
  var u, l, c, E, p, A = o.slice(), I = u = o.length, x = i.length, w = i.slice(0, u), y = w.length, R = r, _ = R.c = [], U = 0, S = f + (R.e = n.e - r.e) + 1;
  for (R.s = s, s = S < 0 ? 0 : S, A.unshift(0); y++ < u; )
    w.push(0);
  do {
    for (c = 0; c < 10; c++) {
      if (u != (y = w.length))
        E = u > y ? 1 : -1;
      else
        for (p = -1, E = 0; ++p < u; )
          if (o[p] != w[p]) {
            E = o[p] > w[p] ? 1 : -1;
            break;
          }
      if (E < 0) {
        for (l = y == u ? o : A; y; ) {
          if (w[--y] < l[y]) {
            for (p = y; p && !w[--p]; )
              w[p] = 9;
            --w[p], w[y] += 10;
          }
          w[y] -= l[y];
        }
        for (; !w[0]; )
          w.shift();
      } else
        break;
    }
    _[U++] = E ? c : ++c, w[0] && E ? w[y] = i[I] || 0 : w = [i[I]];
  } while ((I++ < x || w[0] !== v) && s--);
  return !_[0] && U != 1 && (_.shift(), R.e--, S--), U > S && O(R, S, t.RM, w[0] !== v), R;
};
h.eq = function(e) {
  return this.cmp(e) === 0;
};
h.gt = function(e) {
  return this.cmp(e) > 0;
};
h.gte = function(e) {
  return this.cmp(e) > -1;
};
h.lt = function(e) {
  return this.cmp(e) < 0;
};
h.lte = function(e) {
  return this.cmp(e) < 1;
};
h.minus = h.sub = function(f) {
  var t, n, r, i, o = this.constructor, s = new o(this), f = new o(f), u = s.s, l = f.s;
  if (u != l)
    return f.s = -l, s.plus(f);
  var c = s.c.slice(), E = s.e, p = f.c, A = f.e;
  if (!c[0] || !p[0])
    return p[0] ? f.s = -l : c[0] ? f = new o(s) : f.s = 1, f;
  if (u = E - A) {
    for ((i = u < 0) ? (u = -u, r = c) : (A = E, r = p), r.reverse(), l = u; l--; )
      r.push(0);
    r.reverse();
  } else
    for (n = ((i = c.length < p.length) ? c : p).length, u = l = 0; l < n; l++)
      if (c[l] != p[l]) {
        i = c[l] < p[l];
        break;
      }
  if (i && (r = c, c = p, p = r, f.s = -f.s), (l = (n = p.length) - (t = c.length)) > 0)
    for (; l--; )
      c[t++] = 0;
  for (l = t; n > u; ) {
    if (c[--n] < p[n]) {
      for (t = n; t && !c[--t]; )
        c[t] = 9;
      --c[t], c[n] += 10;
    }
    c[n] -= p[n];
  }
  for (; c[--l] === 0; )
    c.pop();
  for (; c[0] === 0; )
    c.shift(), --A;
  return c[0] || (f.s = 1, c = [A = 0]), f.c = c, f.e = A, f;
};
h.mod = function(i) {
  var t, n = this.constructor, r = new n(this), i = new n(i), o = r.s, s = i.s;
  if (!i.c[0])
    throw Error($);
  return r.s = i.s = 1, t = i.cmp(r) == 1, r.s = o, i.s = s, t ? new n(r) : (o = n.DP, s = n.RM, n.DP = n.RM = 0, r = r.div(i), n.DP = o, n.RM = s, this.minus(r.times(i)));
};
h.plus = h.add = function(s) {
  var t, n, r, i = this.constructor, o = new i(this), s = new i(s);
  if (o.s != s.s)
    return s.s = -s.s, o.minus(s);
  var f = o.e, u = o.c, l = s.e, c = s.c;
  if (!u[0] || !c[0])
    return c[0] || (u[0] ? s = new i(o) : s.s = o.s), s;
  if (u = u.slice(), t = f - l) {
    for (t > 0 ? (l = f, r = c) : (t = -t, r = u), r.reverse(); t--; )
      r.push(0);
    r.reverse();
  }
  for (u.length - c.length < 0 && (r = c, c = u, u = r), t = c.length, n = 0; t; u[t] %= 10)
    n = (u[--t] = u[t] + c[t] + n) / 10 | 0;
  for (n && (u.unshift(n), ++l), t = u.length; u[--t] === 0; )
    u.pop();
  return s.c = u, s.e = l, s;
};
h.pow = function(e) {
  var t = this.constructor, n = new t(this), r = new t("1"), i = new t("1"), o = e < 0;
  if (e !== ~~e || e < -K || e > K)
    throw Error(T + "exponent");
  for (o && (e = -e); e & 1 && (r = r.times(n)), e >>= 1, !!e; )
    n = n.times(n);
  return o ? i.div(r) : r;
};
h.prec = function(e, t) {
  if (e !== ~~e || e < 1 || e > N)
    throw Error(T + "precision");
  return O(new this.constructor(this), e, t);
};
h.round = function(e, t) {
  if (e === v)
    e = 0;
  else if (e !== ~~e || e < -N || e > N)
    throw Error(C);
  return O(new this.constructor(this), e + this.e + 1, t);
};
h.sqrt = function() {
  var e, t, n, r = this.constructor, i = new r(this), o = i.s, s = i.e, f = new r("0.5");
  if (!i.c[0])
    return new r(i);
  if (o < 0)
    throw Error(q + "No square root");
  o = Math.sqrt(i + ""), o === 0 || o === 1 / 0 ? (t = i.c.join(""), t.length + s & 1 || (t += "0"), o = Math.sqrt(t), s = ((s + 1) / 2 | 0) - (s < 0 || s & 1), e = new r((o == 1 / 0 ? "5e" : (o = o.toExponential()).slice(0, o.indexOf("e") + 1)) + s)) : e = new r(o + ""), s = e.e + (r.DP += 4);
  do
    n = e, e = f.times(n.plus(i.div(n)));
  while (n.c.slice(0, s).join("") !== e.c.slice(0, s).join(""));
  return O(e, (r.DP -= 4) + e.e + 1, r.RM);
};
h.times = h.mul = function(i) {
  var t, n = this.constructor, r = new n(this), i = new n(i), o = r.c, s = i.c, f = o.length, u = s.length, l = r.e, c = i.e;
  if (i.s = r.s == i.s ? 1 : -1, !o[0] || !s[0])
    return i.c = [i.e = 0], i;
  for (i.e = l + c, f < u && (t = o, o = s, s = t, c = f, f = u, u = c), t = new Array(c = f + u); c--; )
    t[c] = 0;
  for (l = u; l--; ) {
    for (u = 0, c = f + l; c > l; )
      u = t[c] + s[l] * o[c - l - 1] + u, t[c--] = u % 10, u = u / 10 | 0;
    t[c] = u;
  }
  for (u ? ++i.e : t.shift(), l = t.length; !t[--l]; )
    t.pop();
  return i.c = t, i;
};
h.toExponential = function(e, t) {
  var n = this, r = n.c[0];
  if (e !== v) {
    if (e !== ~~e || e < 0 || e > N)
      throw Error(C);
    for (n = O(new n.constructor(n), ++e, t); n.c.length < e; )
      n.c.push(0);
  }
  return D(n, !0, !!r);
};
h.toFixed = function(e, t) {
  var n = this, r = n.c[0];
  if (e !== v) {
    if (e !== ~~e || e < 0 || e > N)
      throw Error(C);
    for (n = O(new n.constructor(n), e + n.e + 1, t), e = e + n.e + 1; n.c.length < e; )
      n.c.push(0);
  }
  return D(n, !1, !!r);
};
h.toJSON = h.toString = function() {
  var e = this, t = e.constructor;
  return D(e, e.e <= t.NE || e.e >= t.PE, !!e.c[0]);
};
h.toNumber = function() {
  var e = Number(D(this, !0, !0));
  if (this.constructor.strict === !0 && !this.eq(e.toString()))
    throw Error(q + "Imprecise conversion");
  return e;
};
h.toPrecision = function(e, t) {
  var n = this, r = n.constructor, i = n.c[0];
  if (e !== v) {
    if (e !== ~~e || e < 1 || e > N)
      throw Error(T + "precision");
    for (n = O(new r(n), e, t); n.c.length < e; )
      n.c.push(0);
  }
  return D(n, e <= n.e || n.e <= r.NE || n.e >= r.PE, !!i);
};
h.valueOf = function() {
  var e = this, t = e.constructor;
  if (t.strict === !0)
    throw Error(q + "valueOf disallowed");
  return D(e, e.e <= t.NE || e.e >= t.PE, !0);
};
var B = X();
const a = B, fe = Symbol("numeric");
function M(e) {
  return Array.isArray(e) || ArrayBuffer.isView(e);
}
function le(e) {
  return e != null && typeof e.CompareTo == "function";
}
function ae(e) {
  return e != null && typeof e.Equals == "function";
}
function he(e) {
  return e != null && typeof e.GetHashCode == "function";
}
function Z(e, t) {
  var n, r;
  return ((n = Object.getPrototypeOf(e)) == null ? void 0 : n.constructor) === ((r = Object.getPrototypeOf(t)) == null ? void 0 : r.constructor);
}
function W(e) {
  const t = e;
  return typeof t.offset == "number" ? t.offset : e.kind === 1 ? 0 : e.getTimezoneOffset() * -6e4;
}
class P {
  static id(t) {
    return P.idMap.has(t) || P.idMap.set(t, ++P.count), P.idMap.get(t);
  }
}
P.idMap = /* @__PURE__ */ new WeakMap();
P.count = 0;
function Q(e) {
  let t = 0, n = 5381;
  const r = e.length;
  for (; t < r; )
    n = n * 33 ^ e.charCodeAt(t++);
  return n;
}
function J(e) {
  return e * 2654435761 | 0;
}
function pe(e) {
  return Q(e.toString(32));
}
function k(e) {
  let t = 0;
  const n = e.length;
  for (let r = 0; r < n; r++) {
    const i = e[r];
    t = (t << 5) + t ^ i;
  }
  return t;
}
function ge(e) {
  return e.getTime();
}
function we(e) {
  const t = e.length, n = new Array(t);
  for (let r = 0; r < t; r++)
    n[r] = F(e[r]);
  return k(n);
}
function F(e) {
  var t;
  if (e == null)
    return 0;
  switch (typeof e) {
    case "boolean":
      return e ? 1 : 0;
    case "number":
      return J(e);
    case "bigint":
      return pe(e);
    case "string":
      return Q(e);
    default: {
      if (he(e))
        return e.GetHashCode();
      if (M(e))
        return we(e);
      if (e instanceof Date)
        return ge(e);
      if (((t = Object.getPrototypeOf(e)) == null ? void 0 : t.constructor) === Object) {
        const n = Object.values(e).map((r) => F(r));
        return k(n);
      } else
        return J(P.id(e));
    }
  }
}
function me(e, t, n) {
  if (e == null)
    return t == null;
  if (t == null || e.length !== t.length)
    return !1;
  for (let r = 0; r < e.length; r++)
    if (!n(e[r], t[r]))
      return !1;
  return !0;
}
function be(e, t) {
  return me(e, t, G);
}
function ye(e, t) {
  const n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  n.sort(), r.sort();
  for (let i = 0; i < n.length; i++)
    if (n[i] !== r[i] || !G(e[n[i]], t[r[i]]))
      return !1;
  return !0;
}
function G(e, t) {
  var n;
  return e === t ? !0 : e == null ? t == null : t == null ? !1 : ae(e) ? e.Equals(t) : M(e) ? M(t) && be(e, t) : typeof e != "object" ? !1 : e instanceof Date ? t instanceof Date && Y(e, t) === 0 : ((n = Object.getPrototypeOf(e)) == null ? void 0 : n.constructor) === Object && ye(e, t);
}
function Y(e, t) {
  let n, r;
  return "offset" in e && "offset" in t ? (n = e.getTime(), r = t.getTime()) : (n = e.getTime() + W(e), r = t.getTime() + W(t)), n === r ? 0 : n < r ? -1 : 1;
}
function de(e, t, n) {
  if (e == null)
    return t == null ? 0 : 1;
  if (t == null)
    return -1;
  if (e.length !== t.length)
    return e.length < t.length ? -1 : 1;
  for (let r = 0, i = 0; r < e.length; r++)
    if (i = n(e[r], t[r]), i !== 0)
      return i;
  return 0;
}
function ve(e, t) {
  return de(e, t, V);
}
function Ee(e, t) {
  const n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return n.length < r.length ? -1 : 1;
  n.sort(), r.sort();
  for (let i = 0, o = 0; i < n.length; i++) {
    const s = n[i];
    if (s !== r[i])
      return s < r[i] ? -1 : 1;
    if (o = V(e[s], t[s]), o !== 0)
      return o;
  }
  return 0;
}
function V(e, t) {
  var n;
  return e === t ? 0 : e == null ? t == null ? 0 : -1 : t == null ? 1 : le(e) ? e.CompareTo(t) : M(e) ? M(t) ? ve(e, t) : -1 : typeof e != "object" ? e < t ? -1 : 1 : e instanceof Date ? t instanceof Date ? Y(e, t) : -1 : ((n = Object.getPrototypeOf(e)) == null ? void 0 : n.constructor) === Object ? Ee(e, t) : -1;
}
function Ae(e) {
  let t = 0, n = "[";
  for (const r of e) {
    if (t === 0)
      n += L(r);
    else if (t === 100) {
      n += "; ...";
      break;
    } else
      n += "; " + L(r);
    t++;
  }
  return n + "]";
}
function L(e, t = 0) {
  var n;
  if (e != null && typeof e == "object") {
    if (typeof e.toString == "function")
      return e.toString();
    if (Symbol.iterator in e)
      return Ae(e);
    {
      const r = (n = Object.getPrototypeOf(e)) == null ? void 0 : n.constructor;
      return r === Object && t < 10 ? "{ " + Object.entries(e).map(([i, o]) => i + " = " + L(o, t + 1)).join(`
  `) + " }" : (r == null ? void 0 : r.name) ?? "";
    }
  }
  return String(e);
}
function Pe(e) {
  const t = {}, n = Object.keys(e);
  for (let r = 0; r < n.length; r++)
    t[n[r]] = e[n[r]];
  return t;
}
function Oe(e) {
  return "{ " + Object.entries(e).map(([t, n]) => t + " = " + L(n)).join(`
  `) + " }";
}
function je(e) {
  const t = Object.values(e).map((n) => F(n));
  return k(t);
}
function Ne(e, t) {
  if (e === t)
    return !0;
  if (Z(e, t)) {
    const n = Object.keys(e);
    for (let r = 0; r < n.length; r++)
      if (!G(e[n[r]], t[n[r]]))
        return !1;
    return !0;
  } else
    return !1;
}
function Te(e, t) {
  if (e === t)
    return 0;
  if (Z(e, t)) {
    const n = Object.keys(e);
    for (let r = 0; r < n.length; r++) {
      const i = V(e[n[r]], t[n[r]]);
      if (i !== 0)
        return i;
    }
    return 0;
  } else
    return -1;
}
class H {
  toJSON() {
    return Pe(this);
  }
  toString() {
    return Oe(this);
  }
  GetHashCode() {
    return je(this);
  }
  Equals(t) {
    return Ne(this, t);
  }
  CompareTo(t) {
    return Te(this, t);
  }
}
a.prototype.GetHashCode = function() {
  return k([this.s, this.e].concat(this.c));
};
a.prototype.Equals = function(e) {
  return !this.cmp(e);
};
a.prototype.CompareTo = function(e) {
  return this.cmp(e);
};
a.prototype[fe] = function() {
  const e = this;
  return {
    multiply: (t) => e.mul(t),
    toPrecision: (t) => e.toPrecision(t),
    toExponential: (t) => e.toExponential(t),
    toFixed: (t) => e.toFixed(t),
    toHex: () => (Number(e) >>> 0).toString(16)
  };
};
new a(0);
new a(1);
new a(-1);
new a("79228162514264337593543950335");
new a("-79228162514264337593543950335");
function b(e, t) {
  return e.cmp(t);
}
function Re(e, t) {
  return !e.cmp(t);
}
function j(e, t) {
  return e.add(t);
}
function m(e, t) {
  return e.sub(t);
}
function d(e, t) {
  return e.mul(t);
}
function De(e, t) {
  return e.div(t);
}
function Se(e) {
  return +e;
}
function Me(e, t) {
  const n = new Uint8Array(t * 301 / 1e3 + 1 | 0);
  let r = 1;
  for (let i = e.length - 1; i >= 0; i--) {
    let o = e[i];
    for (let s = 0; s < r; s++) {
      const f = n[s] * 16 + o | 0;
      n[s] = f % 10 | 0, o = f / 10 | 0;
    }
    for (; o > 0; )
      n[r++] = o % 10 | 0, o = o / 10 | 0;
  }
  return n.slice(0, r);
}
function z(e, t, n) {
  for (let r = 0; r < 8; r++)
    e[n + r] = t >> r * 4 & 15;
}
function g(e, t, n, r, i) {
  const s = new Uint8Array(24);
  z(s, e, 0), z(s, t, 8), z(s, n, 16);
  const f = Me(s, 96);
  i = i & 127;
  const u = new a(0);
  return u.c = Array.from(f.reverse()), u.e = f.length - i - 1, u.s = r ? -1 : 1, new a(u);
}
class qe extends H {
  constructor(t, n, r, i, o, s, f, u, l, c) {
    super(), this.LEL = t, this.PersonalAllowance = n, this.BasicRateTaxLimit = r, this.HigherRateTaxLimit = i, this.AdditionalRate = o, this.PrimaryThreshold = s, this.UpperAccrualPoint = f, this.NIRate = u, this.HigherNIRate = l, this.AdditionalNIRate = c;
  }
}
class Be extends H {
  constructor(t, n) {
    super(), this.LowerLimit = t, this.UpperLimit = n;
  }
}
class Le extends H {
  constructor(t, n) {
    super(), this.Salary = t, this.Dividends = n;
  }
}
class Ce extends H {
  constructor(t, n) {
    super(), this.Applicant1Income = t, this.Applicant2Income = n;
  }
}
function ke(e, t, n) {
  return b(n, t.UpperLimit) > 0 ? g(0, 0, 0, !1, 0) : b(n, t.LowerLimit) > 0 ? m(n, d(m(n, t.LowerLimit), g(5, 0, 0, !1, 1))) : b(n, e) > 0 ? e : n;
}
function He(e, t, n) {
  return b(n, e) > 0 ? d(m(e, t), g(3, 0, 0, !1, 2)) : b(n, t) > 0 ? d(m(n, t), g(3, 0, 0, !1, 2)) : g(0, 0, 0, !1, 0);
}
function Ie(e, t, n) {
  return m(m(e, t), n);
}
function _e(e, t, n, r) {
  return b(n, e) > 0 ? d(m(e, t), g(2, 0, 0, !1, 1)) : b(n, t) > 0 ? d(r, g(2, 0, 0, !1, 1)) : g(0, 0, 0, !1, 0);
}
function Ue(e, t, n, r, i) {
  return b(r, t) > 0 ? d(j(m(t, e), n), g(4, 0, 0, !1, 1)) : b(r, e) > 0 ? d(j(m(i, e), n), g(4, 0, 0, !1, 1)) : g(0, 0, 0, !1, 0);
}
function ze(e, t, n) {
  return b(n, e) > 0 ? d(m(n, e), t) : g(0, 0, 0, !1, 0);
}
function Fe(e, t, n) {
  return j(j(e, t), n);
}
function Ge(e, t) {
  const n = j(e.NIRate, e.AdditionalNIRate);
  if (b(t, e.PrimaryThreshold) <= 0)
    return g(0, 0, 0, !1, 0);
  if (b(t, e.UpperAccrualPoint) <= 0)
    return d(m(t, e.PrimaryThreshold), n);
  {
    const r = m(e.UpperAccrualPoint, e.PrimaryThreshold), i = m(t, e.UpperAccrualPoint), o = j(e.HigherNIRate, e.AdditionalNIRate);
    return j(d(r, n), d(i, o));
  }
}
function Ve(e, t, n, r) {
  return m(m(m(t, n), e), r);
}
function Ke(e, t, n, r, i) {
  const o = ke(t.PersonalAllowance, e, i), s = He(t.BasicRateTaxLimit, t.LEL, i), f = Ie(i, o, s), u = Fe(_e(t.BasicRateTaxLimit, t.PersonalAllowance, i, f), Ue(t.BasicRateTaxLimit, t.HigherRateTaxLimit, t.PersonalAllowance, i, f), ze(t.HigherRateTaxLimit, t.AdditionalRate, i)), l = Ve(Ge(t, i), i, u, s);
  return b(n.Salary, g(0, 0, 0, !1, 0)) > 0 || b(r.Applicant1Income, g(0, 0, 0, !1, 0)) > 0 || Re(i, g(0, 0, 0, !1, 0)) ? g(0, 0, 0, !1, 0) : De(l, g(12, 0, 0, !1, 0));
}
function We(e) {
  return new qe(new a(e.lel), new a(e.personalAllowance), new a(e.basicRateTaxLimit), new a(e.higherRateTaxLimit), new a(e.additionalRate), new a(e.primaryThreshold), new a(e.upperAccrualPoint), new a(e.niRate), new a(e.higherNiRate), new a(e.additionalNiRate));
}
function Je(e) {
  return new Be(new a(e.lowerLimit), new a(e.upperLimit));
}
function $e(e) {
  return new Le(new a(e.salary), new a(e.dividends));
}
function Xe(e) {
  return new Ce(new a(e.applicant1Income), new a(e.applicant2Income));
}
const Ze = {
  estimatedEmployedNetIncome(e, t, n, r, i) {
    return Se(Ke(Je(e), We(t), $e(n), Xe(r), new a(i)));
  }
};
export {
  Ze as affordabilityCalculator
};
