var Iy = Object.defineProperty, xy = Object.defineProperties;
var By = Object.getOwnPropertyDescriptors;
var yi = Object.getOwnPropertySymbols;
var fh = Object.prototype.hasOwnProperty, oh = Object.prototype.propertyIsEnumerable;
var qf = (i, c, s) => c in i ? Iy(i, c, { enumerable: !0, configurable: !0, writable: !0, value: s }) : i[c] = s, Ll = (i, c) => {
  for (var s in c || (c = {}))
    fh.call(c, s) && qf(i, s, c[s]);
  if (yi)
    for (var s of yi(c))
      oh.call(c, s) && qf(i, s, c[s]);
  return i;
}, sh = (i, c) => xy(i, By(c));
var Vf = (i, c) => {
  var s = {};
  for (var o in i)
    fh.call(i, o) && c.indexOf(o) < 0 && (s[o] = i[o]);
  if (i != null && yi)
    for (var o of yi(i))
      c.indexOf(o) < 0 && oh.call(i, o) && (s[o] = i[o]);
  return s;
};
var vi = (i, c, s) => qf(i, typeof c != "symbol" ? c + "" : c, s);
var Qf = (i, c, s) => new Promise((o, d) => {
  var g = (y) => {
    try {
      v(s.next(y));
    } catch (h) {
      d(h);
    }
  }, C = (y) => {
    try {
      v(s.throw(y));
    } catch (h) {
      d(h);
    }
  }, v = (y) => y.done ? o(y.value) : Promise.resolve(y.value).then(g, C);
  v((s = s.apply(i, c)).next());
});
function Hy(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Xf = { exports: {} }, lt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rh;
function Gy() {
  if (rh) return lt;
  rh = 1;
  var i = Symbol.for("react.transitional.element"), c = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), g = Symbol.for("react.consumer"), C = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), M = Symbol.for("react.activity"), x = Symbol.iterator;
  function L(p) {
    return p === null || typeof p != "object" ? null : (p = x && p[x] || p["@@iterator"], typeof p == "function" ? p : null);
  }
  var U = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, j = Object.assign, W = {};
  function Q(p, _, G) {
    this.props = p, this.context = _, this.refs = W, this.updater = G || U;
  }
  Q.prototype.isReactComponent = {}, Q.prototype.setState = function(p, _) {
    if (typeof p != "object" && typeof p != "function" && p != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, p, _, "setState");
  }, Q.prototype.forceUpdate = function(p) {
    this.updater.enqueueForceUpdate(this, p, "forceUpdate");
  };
  function Y() {
  }
  Y.prototype = Q.prototype;
  function B(p, _, G) {
    this.props = p, this.context = _, this.refs = W, this.updater = G || U;
  }
  var F = B.prototype = new Y();
  F.constructor = B, j(F, Q.prototype), F.isPureReactComponent = !0;
  var St = Array.isArray;
  function gt() {
  }
  var k = { H: null, A: null, T: null, S: null }, ut = Object.prototype.hasOwnProperty;
  function Bt(p, _, G) {
    var w = G.ref;
    return {
      $$typeof: i,
      type: p,
      key: _,
      ref: w !== void 0 ? w : null,
      props: G
    };
  }
  function Vt(p, _) {
    return Bt(p.type, _, p.props);
  }
  function Gt(p) {
    return typeof p == "object" && p !== null && p.$$typeof === i;
  }
  function Nt(p) {
    var _ = { "=": "=0", ":": "=2" };
    return "$" + p.replace(/[=:]/g, function(G) {
      return _[G];
    });
  }
  var Qt = /\/+/g;
  function At(p, _) {
    return typeof p == "object" && p !== null && p.key != null ? Nt("" + p.key) : _.toString(36);
  }
  function Ut(p) {
    switch (p.status) {
      case "fulfilled":
        return p.value;
      case "rejected":
        throw p.reason;
      default:
        switch (typeof p.status == "string" ? p.then(gt, gt) : (p.status = "pending", p.then(
          function(_) {
            p.status === "pending" && (p.status = "fulfilled", p.value = _);
          },
          function(_) {
            p.status === "pending" && (p.status = "rejected", p.reason = _);
          }
        )), p.status) {
          case "fulfilled":
            return p.value;
          case "rejected":
            throw p.reason;
        }
    }
    throw p;
  }
  function N(p, _, G, w, $) {
    var Z = typeof p;
    (Z === "undefined" || Z === "boolean") && (p = null);
    var tt = !1;
    if (p === null) tt = !0;
    else
      switch (Z) {
        case "bigint":
        case "string":
        case "number":
          tt = !0;
          break;
        case "object":
          switch (p.$$typeof) {
            case i:
            case c:
              tt = !0;
              break;
            case O:
              return tt = p._init, N(
                tt(p._payload),
                _,
                G,
                w,
                $
              );
          }
      }
    if (tt)
      return $ = $(p), tt = w === "" ? "." + At(p, 0) : w, St($) ? (G = "", tt != null && (G = tt.replace(Qt, "$&/") + "/"), N($, _, G, "", function(Ft) {
        return Ft;
      })) : $ != null && (Gt($) && ($ = Vt(
        $,
        G + ($.key == null || p && p.key === $.key ? "" : ("" + $.key).replace(
          Qt,
          "$&/"
        ) + "/") + tt
      )), _.push($)), 1;
    tt = 0;
    var Ct = w === "" ? "." : w + ":";
    if (St(p))
      for (var et = 0; et < p.length; et++)
        w = p[et], Z = Ct + At(w, et), tt += N(
          w,
          _,
          G,
          Z,
          $
        );
    else if (et = L(p), typeof et == "function")
      for (p = et.call(p), et = 0; !(w = p.next()).done; )
        w = w.value, Z = Ct + At(w, et++), tt += N(
          w,
          _,
          G,
          Z,
          $
        );
    else if (Z === "object") {
      if (typeof p.then == "function")
        return N(
          Ut(p),
          _,
          G,
          w,
          $
        );
      throw _ = String(p), Error(
        "Objects are not valid as a React child (found: " + (_ === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : _) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return tt;
  }
  function H(p, _, G) {
    if (p == null) return p;
    var w = [], $ = 0;
    return N(p, w, "", "", function(Z) {
      return _.call(G, Z, $++);
    }), w;
  }
  function X(p) {
    if (p._status === -1) {
      var _ = p._result;
      _ = _(), _.then(
        function(G) {
          (p._status === 0 || p._status === -1) && (p._status = 1, p._result = G);
        },
        function(G) {
          (p._status === 0 || p._status === -1) && (p._status = 2, p._result = G);
        }
      ), p._status === -1 && (p._status = 0, p._result = _);
    }
    if (p._status === 1) return p._result.default;
    throw p._result;
  }
  var at = typeof reportError == "function" ? reportError : function(p) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var _ = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof p == "object" && p !== null && typeof p.message == "string" ? String(p.message) : String(p),
        error: p
      });
      if (!window.dispatchEvent(_)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", p);
      return;
    }
    console.error(p);
  }, it = {
    map: H,
    forEach: function(p, _, G) {
      H(
        p,
        function() {
          _.apply(this, arguments);
        },
        G
      );
    },
    count: function(p) {
      var _ = 0;
      return H(p, function() {
        _++;
      }), _;
    },
    toArray: function(p) {
      return H(p, function(_) {
        return _;
      }) || [];
    },
    only: function(p) {
      if (!Gt(p))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return p;
    }
  };
  return lt.Activity = M, lt.Children = it, lt.Component = Q, lt.Fragment = s, lt.Profiler = d, lt.PureComponent = B, lt.StrictMode = o, lt.Suspense = y, lt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = k, lt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(p) {
      return k.H.useMemoCache(p);
    }
  }, lt.cache = function(p) {
    return function() {
      return p.apply(null, arguments);
    };
  }, lt.cacheSignal = function() {
    return null;
  }, lt.cloneElement = function(p, _, G) {
    if (p == null)
      throw Error(
        "The argument must be a React element, but you passed " + p + "."
      );
    var w = j({}, p.props), $ = p.key;
    if (_ != null)
      for (Z in _.key !== void 0 && ($ = "" + _.key), _)
        !ut.call(_, Z) || Z === "key" || Z === "__self" || Z === "__source" || Z === "ref" && _.ref === void 0 || (w[Z] = _[Z]);
    var Z = arguments.length - 2;
    if (Z === 1) w.children = G;
    else if (1 < Z) {
      for (var tt = Array(Z), Ct = 0; Ct < Z; Ct++)
        tt[Ct] = arguments[Ct + 2];
      w.children = tt;
    }
    return Bt(p.type, $, w);
  }, lt.createContext = function(p) {
    return p = {
      $$typeof: C,
      _currentValue: p,
      _currentValue2: p,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, p.Provider = p, p.Consumer = {
      $$typeof: g,
      _context: p
    }, p;
  }, lt.createElement = function(p, _, G) {
    var w, $ = {}, Z = null;
    if (_ != null)
      for (w in _.key !== void 0 && (Z = "" + _.key), _)
        ut.call(_, w) && w !== "key" && w !== "__self" && w !== "__source" && ($[w] = _[w]);
    var tt = arguments.length - 2;
    if (tt === 1) $.children = G;
    else if (1 < tt) {
      for (var Ct = Array(tt), et = 0; et < tt; et++)
        Ct[et] = arguments[et + 2];
      $.children = Ct;
    }
    if (p && p.defaultProps)
      for (w in tt = p.defaultProps, tt)
        $[w] === void 0 && ($[w] = tt[w]);
    return Bt(p, Z, $);
  }, lt.createRef = function() {
    return { current: null };
  }, lt.forwardRef = function(p) {
    return { $$typeof: v, render: p };
  }, lt.isValidElement = Gt, lt.lazy = function(p) {
    return {
      $$typeof: O,
      _payload: { _status: -1, _result: p },
      _init: X
    };
  }, lt.memo = function(p, _) {
    return {
      $$typeof: h,
      type: p,
      compare: _ === void 0 ? null : _
    };
  }, lt.startTransition = function(p) {
    var _ = k.T, G = {};
    k.T = G;
    try {
      var w = p(), $ = k.S;
      $ !== null && $(G, w), typeof w == "object" && w !== null && typeof w.then == "function" && w.then(gt, at);
    } catch (Z) {
      at(Z);
    } finally {
      _ !== null && G.types !== null && (_.types = G.types), k.T = _;
    }
  }, lt.unstable_useCacheRefresh = function() {
    return k.H.useCacheRefresh();
  }, lt.use = function(p) {
    return k.H.use(p);
  }, lt.useActionState = function(p, _, G) {
    return k.H.useActionState(p, _, G);
  }, lt.useCallback = function(p, _) {
    return k.H.useCallback(p, _);
  }, lt.useContext = function(p) {
    return k.H.useContext(p);
  }, lt.useDebugValue = function() {
  }, lt.useDeferredValue = function(p, _) {
    return k.H.useDeferredValue(p, _);
  }, lt.useEffect = function(p, _) {
    return k.H.useEffect(p, _);
  }, lt.useEffectEvent = function(p) {
    return k.H.useEffectEvent(p);
  }, lt.useId = function() {
    return k.H.useId();
  }, lt.useImperativeHandle = function(p, _, G) {
    return k.H.useImperativeHandle(p, _, G);
  }, lt.useInsertionEffect = function(p, _) {
    return k.H.useInsertionEffect(p, _);
  }, lt.useLayoutEffect = function(p, _) {
    return k.H.useLayoutEffect(p, _);
  }, lt.useMemo = function(p, _) {
    return k.H.useMemo(p, _);
  }, lt.useOptimistic = function(p, _) {
    return k.H.useOptimistic(p, _);
  }, lt.useReducer = function(p, _, G) {
    return k.H.useReducer(p, _, G);
  }, lt.useRef = function(p) {
    return k.H.useRef(p);
  }, lt.useState = function(p) {
    return k.H.useState(p);
  }, lt.useSyncExternalStore = function(p, _, G) {
    return k.H.useSyncExternalStore(
      p,
      _,
      G
    );
  }, lt.useTransition = function() {
    return k.H.useTransition();
  }, lt.version = "19.2.0", lt;
}
var dh;
function no() {
  return dh || (dh = 1, Xf.exports = Gy()), Xf.exports;
}
var se = no();
const hh = /* @__PURE__ */ Hy(se);
var Kf = { exports: {} }, Xn = {}, kf = { exports: {} }, Jf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mh;
function Ly() {
  return mh || (mh = 1, (function(i) {
    function c(N, H) {
      var X = N.length;
      N.push(H);
      t: for (; 0 < X; ) {
        var at = X - 1 >>> 1, it = N[at];
        if (0 < d(it, H))
          N[at] = H, N[X] = it, X = at;
        else break t;
      }
    }
    function s(N) {
      return N.length === 0 ? null : N[0];
    }
    function o(N) {
      if (N.length === 0) return null;
      var H = N[0], X = N.pop();
      if (X !== H) {
        N[0] = X;
        t: for (var at = 0, it = N.length, p = it >>> 1; at < p; ) {
          var _ = 2 * (at + 1) - 1, G = N[_], w = _ + 1, $ = N[w];
          if (0 > d(G, X))
            w < it && 0 > d($, G) ? (N[at] = $, N[w] = X, at = w) : (N[at] = G, N[_] = X, at = _);
          else if (w < it && 0 > d($, X))
            N[at] = $, N[w] = X, at = w;
          else break t;
        }
      }
      return H;
    }
    function d(N, H) {
      var X = N.sortIndex - H.sortIndex;
      return X !== 0 ? X : N.id - H.id;
    }
    if (i.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var g = performance;
      i.unstable_now = function() {
        return g.now();
      };
    } else {
      var C = Date, v = C.now();
      i.unstable_now = function() {
        return C.now() - v;
      };
    }
    var y = [], h = [], O = 1, M = null, x = 3, L = !1, U = !1, j = !1, W = !1, Q = typeof setTimeout == "function" ? setTimeout : null, Y = typeof clearTimeout == "function" ? clearTimeout : null, B = typeof setImmediate != "undefined" ? setImmediate : null;
    function F(N) {
      for (var H = s(h); H !== null; ) {
        if (H.callback === null) o(h);
        else if (H.startTime <= N)
          o(h), H.sortIndex = H.expirationTime, c(y, H);
        else break;
        H = s(h);
      }
    }
    function St(N) {
      if (j = !1, F(N), !U)
        if (s(y) !== null)
          U = !0, gt || (gt = !0, Nt());
        else {
          var H = s(h);
          H !== null && Ut(St, H.startTime - N);
        }
    }
    var gt = !1, k = -1, ut = 5, Bt = -1;
    function Vt() {
      return W ? !0 : !(i.unstable_now() - Bt < ut);
    }
    function Gt() {
      if (W = !1, gt) {
        var N = i.unstable_now();
        Bt = N;
        var H = !0;
        try {
          t: {
            U = !1, j && (j = !1, Y(k), k = -1), L = !0;
            var X = x;
            try {
              e: {
                for (F(N), M = s(y); M !== null && !(M.expirationTime > N && Vt()); ) {
                  var at = M.callback;
                  if (typeof at == "function") {
                    M.callback = null, x = M.priorityLevel;
                    var it = at(
                      M.expirationTime <= N
                    );
                    if (N = i.unstable_now(), typeof it == "function") {
                      M.callback = it, F(N), H = !0;
                      break e;
                    }
                    M === s(y) && o(y), F(N);
                  } else o(y);
                  M = s(y);
                }
                if (M !== null) H = !0;
                else {
                  var p = s(h);
                  p !== null && Ut(
                    St,
                    p.startTime - N
                  ), H = !1;
                }
              }
              break t;
            } finally {
              M = null, x = X, L = !1;
            }
            H = void 0;
          }
        } finally {
          H ? Nt() : gt = !1;
        }
      }
    }
    var Nt;
    if (typeof B == "function")
      Nt = function() {
        B(Gt);
      };
    else if (typeof MessageChannel != "undefined") {
      var Qt = new MessageChannel(), At = Qt.port2;
      Qt.port1.onmessage = Gt, Nt = function() {
        At.postMessage(null);
      };
    } else
      Nt = function() {
        Q(Gt, 0);
      };
    function Ut(N, H) {
      k = Q(function() {
        N(i.unstable_now());
      }, H);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(N) {
      N.callback = null;
    }, i.unstable_forceFrameRate = function(N) {
      0 > N || 125 < N ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ut = 0 < N ? Math.floor(1e3 / N) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return x;
    }, i.unstable_next = function(N) {
      switch (x) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = x;
      }
      var X = x;
      x = H;
      try {
        return N();
      } finally {
        x = X;
      }
    }, i.unstable_requestPaint = function() {
      W = !0;
    }, i.unstable_runWithPriority = function(N, H) {
      switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          N = 3;
      }
      var X = x;
      x = N;
      try {
        return H();
      } finally {
        x = X;
      }
    }, i.unstable_scheduleCallback = function(N, H, X) {
      var at = i.unstable_now();
      switch (typeof X == "object" && X !== null ? (X = X.delay, X = typeof X == "number" && 0 < X ? at + X : at) : X = at, N) {
        case 1:
          var it = -1;
          break;
        case 2:
          it = 250;
          break;
        case 5:
          it = 1073741823;
          break;
        case 4:
          it = 1e4;
          break;
        default:
          it = 5e3;
      }
      return it = X + it, N = {
        id: O++,
        callback: H,
        priorityLevel: N,
        startTime: X,
        expirationTime: it,
        sortIndex: -1
      }, X > at ? (N.sortIndex = X, c(h, N), s(y) === null && N === s(h) && (j ? (Y(k), k = -1) : j = !0, Ut(St, X - at))) : (N.sortIndex = it, c(y, N), U || L || (U = !0, gt || (gt = !0, Nt()))), N;
    }, i.unstable_shouldYield = Vt, i.unstable_wrapCallback = function(N) {
      var H = x;
      return function() {
        var X = x;
        x = H;
        try {
          return N.apply(this, arguments);
        } finally {
          x = X;
        }
      };
    };
  })(Jf)), Jf;
}
var gh;
function Zy() {
  return gh || (gh = 1, kf.exports = Ly()), kf.exports;
}
var Ff = { exports: {} }, fe = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yh;
function Yy() {
  if (yh) return fe;
  yh = 1;
  var i = no();
  function c(y) {
    var h = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var O = 2; O < arguments.length; O++)
        h += "&args[]=" + encodeURIComponent(arguments[O]);
    }
    return "Minified React error #" + y + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s() {
  }
  var o = {
    d: {
      f: s,
      r: function() {
        throw Error(c(522));
      },
      D: s,
      C: s,
      L: s,
      m: s,
      X: s,
      S: s,
      M: s
    },
    p: 0,
    findDOMNode: null
  }, d = Symbol.for("react.portal");
  function g(y, h, O) {
    var M = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: M == null ? null : "" + M,
      children: y,
      containerInfo: h,
      implementation: O
    };
  }
  var C = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function v(y, h) {
    if (y === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return fe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, fe.createPortal = function(y, h) {
    var O = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(c(299));
    return g(y, h, null, O);
  }, fe.flushSync = function(y) {
    var h = C.T, O = o.p;
    try {
      if (C.T = null, o.p = 2, y) return y();
    } finally {
      C.T = h, o.p = O, o.d.f();
    }
  }, fe.preconnect = function(y, h) {
    typeof y == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, o.d.C(y, h));
  }, fe.prefetchDNS = function(y) {
    typeof y == "string" && o.d.D(y);
  }, fe.preinit = function(y, h) {
    if (typeof y == "string" && h && typeof h.as == "string") {
      var O = h.as, M = v(O, h.crossOrigin), x = typeof h.integrity == "string" ? h.integrity : void 0, L = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      O === "style" ? o.d.S(
        y,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: M,
          integrity: x,
          fetchPriority: L
        }
      ) : O === "script" && o.d.X(y, {
        crossOrigin: M,
        integrity: x,
        fetchPriority: L,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, fe.preinitModule = function(y, h) {
    if (typeof y == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var O = v(
            h.as,
            h.crossOrigin
          );
          o.d.M(y, {
            crossOrigin: O,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && o.d.M(y);
  }, fe.preload = function(y, h) {
    if (typeof y == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var O = h.as, M = v(O, h.crossOrigin);
      o.d.L(y, O, {
        crossOrigin: M,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, fe.preloadModule = function(y, h) {
    if (typeof y == "string")
      if (h) {
        var O = v(h.as, h.crossOrigin);
        o.d.m(y, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: O,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else o.d.m(y);
  }, fe.requestFormReset = function(y) {
    o.d.r(y);
  }, fe.unstable_batchedUpdates = function(y, h) {
    return y(h);
  }, fe.useFormState = function(y, h, O) {
    return C.H.useFormState(y, h, O);
  }, fe.useFormStatus = function() {
    return C.H.useHostTransitionStatus();
  }, fe.version = "19.2.0", fe;
}
var vh;
function wy() {
  if (vh) return Ff.exports;
  vh = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ == "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (c) {
        console.error(c);
      }
  }
  return i(), Ff.exports = Yy(), Ff.exports;
}
var ph;
function jy() {
  if (ph) return Xn;
  ph = 1;
  /**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var i = Zy(), c = no(), s = wy();
  function o(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function d(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function g(t) {
    var e = t, l = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do
        e = t, (e.flags & 4098) !== 0 && (l = e.return), t = e.return;
      while (t);
    }
    return e.tag === 3 ? l : null;
  }
  function C(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function v(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function y(t) {
    if (g(t) !== t)
      throw Error(o(188));
  }
  function h(t) {
    var e = t.alternate;
    if (!e) {
      if (e = g(t), e === null) throw Error(o(188));
      return e !== t ? null : t;
    }
    for (var l = t, a = e; ; ) {
      var n = l.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (a = n.return, a !== null) {
          l = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === l) return y(n), t;
          if (u === a) return y(n), e;
          u = u.sibling;
        }
        throw Error(o(188));
      }
      if (l.return !== a.return) l = n, a = u;
      else {
        for (var f = !1, r = n.child; r; ) {
          if (r === l) {
            f = !0, l = n, a = u;
            break;
          }
          if (r === a) {
            f = !0, a = n, l = u;
            break;
          }
          r = r.sibling;
        }
        if (!f) {
          for (r = u.child; r; ) {
            if (r === l) {
              f = !0, l = u, a = n;
              break;
            }
            if (r === a) {
              f = !0, a = u, l = n;
              break;
            }
            r = r.sibling;
          }
          if (!f) throw Error(o(189));
        }
      }
      if (l.alternate !== a) throw Error(o(190));
    }
    if (l.tag !== 3) throw Error(o(188));
    return l.stateNode.current === l ? t : e;
  }
  function O(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = O(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  var M = Object.assign, x = Symbol.for("react.element"), L = Symbol.for("react.transitional.element"), U = Symbol.for("react.portal"), j = Symbol.for("react.fragment"), W = Symbol.for("react.strict_mode"), Q = Symbol.for("react.profiler"), Y = Symbol.for("react.consumer"), B = Symbol.for("react.context"), F = Symbol.for("react.forward_ref"), St = Symbol.for("react.suspense"), gt = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), ut = Symbol.for("react.lazy"), Bt = Symbol.for("react.activity"), Vt = Symbol.for("react.memo_cache_sentinel"), Gt = Symbol.iterator;
  function Nt(t) {
    return t === null || typeof t != "object" ? null : (t = Gt && t[Gt] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Qt = Symbol.for("react.client.reference");
  function At(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Qt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case j:
        return "Fragment";
      case Q:
        return "Profiler";
      case W:
        return "StrictMode";
      case St:
        return "Suspense";
      case gt:
        return "SuspenseList";
      case Bt:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case U:
          return "Portal";
        case B:
          return t.displayName || "Context";
        case Y:
          return (t._context.displayName || "Context") + ".Consumer";
        case F:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case k:
          return e = t.displayName || null, e !== null ? e : At(t.type) || "Memo";
        case ut:
          e = t._payload, t = t._init;
          try {
            return At(t(e));
          } catch (l) {
          }
      }
    return null;
  }
  var Ut = Array.isArray, N = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, H = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, X = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, at = [], it = -1;
  function p(t) {
    return { current: t };
  }
  function _(t) {
    0 > it || (t.current = at[it], at[it] = null, it--);
  }
  function G(t, e) {
    it++, at[it] = t.current, t.current = e;
  }
  var w = p(null), $ = p(null), Z = p(null), tt = p(null);
  function Ct(t, e) {
    switch (G(Z, e), G($, t), G(w, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Rd(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = Rd(e), t = Ud(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    _(w), G(w, t);
  }
  function et() {
    _(w), _($), _(Z);
  }
  function Ft(t) {
    t.memoizedState !== null && G(tt, t);
    var e = w.current, l = Ud(e, t.type);
    e !== l && (G($, t), G(w, l));
  }
  function dt(t) {
    $.current === t && (_(w), _($)), tt.current === t && (_(tt), jn._currentValue = X);
  }
  var Pt, dl;
  function Lt(t) {
    if (Pt === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        Pt = e && e[1] || "", dl = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Pt + t + dl;
  }
  var Yl = !1;
  function Oi(t, e) {
    if (!t || Yl) return "";
    Yl = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var I = function() {
                throw Error();
              };
              if (Object.defineProperty(I.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(I, []);
                } catch (z) {
                  var E = z;
                }
                Reflect.construct(t, [], I);
              } else {
                try {
                  I.call();
                } catch (z) {
                  E = z;
                }
                t.call(I.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (z) {
                E = z;
              }
              (I = t()) && typeof I.catch == "function" && I.catch(function() {
              });
            }
          } catch (z) {
            if (z && E && typeof z.stack == "string")
              return [z.stack, E.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      n && n.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = a.DetermineComponentFrameRoot(), f = u[0], r = u[1];
      if (f && r) {
        var m = f.split(`
`), T = r.split(`
`);
        for (n = a = 0; a < m.length && !m[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < T.length && !T[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === m.length || n === T.length)
          for (a = m.length - 1, n = T.length - 1; 1 <= a && 0 <= n && m[a] !== T[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (m[a] !== T[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || m[a] !== T[n]) {
                  var D = `
` + m[a].replace(" at new ", " at ");
                  return t.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", t.displayName)), D;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      Yl = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? Lt(l) : "";
  }
  function sm(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Lt(t.type);
      case 16:
        return Lt("Lazy");
      case 13:
        return t.child !== e && e !== null ? Lt("Suspense Fallback") : Lt("Suspense");
      case 19:
        return Lt("SuspenseList");
      case 0:
      case 15:
        return Oi(t.type, !1);
      case 11:
        return Oi(t.type.render, !1);
      case 1:
        return Oi(t.type, !0);
      case 31:
        return Lt("Activity");
      default:
        return "";
    }
  }
  function co(t) {
    try {
      var e = "", l = null;
      do
        e += sm(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var zi = Object.prototype.hasOwnProperty, Ni = i.unstable_scheduleCallback, _i = i.unstable_cancelCallback, rm = i.unstable_shouldYield, dm = i.unstable_requestPaint, be = i.unstable_now, hm = i.unstable_getCurrentPriorityLevel, fo = i.unstable_ImmediatePriority, oo = i.unstable_UserBlockingPriority, Pn = i.unstable_NormalPriority, mm = i.unstable_LowPriority, so = i.unstable_IdlePriority, gm = i.log, ym = i.unstable_setDisableYieldValue, Pa = null, Ce = null;
  function hl(t) {
    if (typeof gm == "function" && ym(t), Ce && typeof Ce.setStrictMode == "function")
      try {
        Ce.setStrictMode(Pa, t);
      } catch (e) {
      }
  }
  var Ae = Math.clz32 ? Math.clz32 : Sm, vm = Math.log, pm = Math.LN2;
  function Sm(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (vm(t) / pm | 0) | 0;
  }
  var tu = 256, eu = 262144, lu = 4194304;
  function wl(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function au(t, e, l) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, f = t.pingedLanes;
    t = t.warmLanes;
    var r = a & 134217727;
    return r !== 0 ? (a = r & ~u, a !== 0 ? n = wl(a) : (f &= r, f !== 0 ? n = wl(f) : l || (l = r & ~t, l !== 0 && (n = wl(l))))) : (r = a & ~u, r !== 0 ? n = wl(r) : f !== 0 ? n = wl(f) : l || (l = a & ~t, l !== 0 && (n = wl(l)))), n === 0 ? 0 : e !== 0 && e !== n && (e & u) === 0 && (u = n & -n, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : n;
  }
  function tn(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function bm(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ro() {
    var t = lu;
    return lu <<= 1, (lu & 62914560) === 0 && (lu = 4194304), t;
  }
  function Di(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function en(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Cm(t, e, l, a, n, u) {
    var f = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var r = t.entanglements, m = t.expirationTimes, T = t.hiddenUpdates;
    for (l = f & ~l; 0 < l; ) {
      var D = 31 - Ae(l), I = 1 << D;
      r[D] = 0, m[D] = -1;
      var E = T[D];
      if (E !== null)
        for (T[D] = null, D = 0; D < E.length; D++) {
          var z = E[D];
          z !== null && (z.lane &= -536870913);
        }
      l &= ~I;
    }
    a !== 0 && ho(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(f & ~e));
  }
  function ho(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var a = 31 - Ae(e);
    t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | l & 261930;
  }
  function mo(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var a = 31 - Ae(l), n = 1 << a;
      n & e | t[a] & e && (t[a] |= e), l &= ~n;
    }
  }
  function go(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : Ri(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function Ri(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Ui(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function yo() {
    var t = H.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : eh(t.type));
  }
  function vo(t, e) {
    var l = H.p;
    try {
      return H.p = t, e();
    } finally {
      H.p = l;
    }
  }
  var ml = Math.random().toString(36).slice(2), ae = "__reactFiber$" + ml, he = "__reactProps$" + ml, ca = "__reactContainer$" + ml, Ii = "__reactEvents$" + ml, Am = "__reactListeners$" + ml, Tm = "__reactHandles$" + ml, po = "__reactResources$" + ml, ln = "__reactMarker$" + ml;
  function xi(t) {
    delete t[ae], delete t[he], delete t[Ii], delete t[Am], delete t[Tm];
  }
  function fa(t) {
    var e = t[ae];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[ca] || l[ae]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = Zd(t); t !== null; ) {
            if (l = t[ae]) return l;
            t = Zd(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function oa(t) {
    if (t = t[ae] || t[ca]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function an(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(o(33));
  }
  function sa(t) {
    var e = t[po];
    return e || (e = t[po] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function te(t) {
    t[ln] = !0;
  }
  var So = /* @__PURE__ */ new Set(), bo = {};
  function jl(t, e) {
    ra(t, e), ra(t + "Capture", e);
  }
  function ra(t, e) {
    for (bo[t] = e, t = 0; t < e.length; t++)
      So.add(e[t]);
  }
  var Mm = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Co = {}, Ao = {};
  function Em(t) {
    return zi.call(Ao, t) ? !0 : zi.call(Co, t) ? !1 : Mm.test(t) ? Ao[t] = !0 : (Co[t] = !0, !1);
  }
  function nu(t, e, l) {
    if (Em(e))
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var a = e.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + l);
      }
  }
  function uu(t, e, l) {
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + l);
    }
  }
  function ke(t, e, l, a) {
    if (a === null) t.removeAttribute(l);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(e, l, "" + a);
    }
  }
  function De(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function To(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function Om(t, e, l) {
    var a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof a != "undefined" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, u = a.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(f) {
          l = "" + f, u.call(this, f);
        }
      }), Object.defineProperty(t, e, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(f) {
          l = "" + f;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function Bi(t) {
    if (!t._valueTracker) {
      var e = To(t) ? "checked" : "value";
      t._valueTracker = Om(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Mo(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), a = "";
    return t && (a = To(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== l ? (e.setValue(t), !0) : !1;
  }
  function iu(t) {
    if (t = t || (typeof document != "undefined" ? document : void 0), typeof t == "undefined") return null;
    try {
      return t.activeElement || t.body;
    } catch (e) {
      return t.body;
    }
  }
  var zm = /[\n"\\]/g;
  function Re(t) {
    return t.replace(
      zm,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Hi(t, e, l, a, n, u, f, r) {
    t.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? t.type = f : t.removeAttribute("type"), e != null ? f === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + De(e)) : t.value !== "" + De(e) && (t.value = "" + De(e)) : f !== "submit" && f !== "reset" || t.removeAttribute("value"), e != null ? Gi(t, f, De(e)) : l != null ? Gi(t, f, De(l)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? t.name = "" + De(r) : t.removeAttribute("name");
  }
  function Eo(t, e, l, a, n, u, f, r) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        Bi(t);
        return;
      }
      l = l != null ? "" + De(l) : "", e = e != null ? "" + De(e) : l, r || e === t.value || (t.value = e), t.defaultValue = e;
    }
    a = a != null ? a : n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = r ? t.checked : !!a, t.defaultChecked = !!a, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (t.name = f), Bi(t);
  }
  function Gi(t, e, l) {
    e === "number" && iu(t.ownerDocument) === t || t.defaultValue === "" + l || (t.defaultValue = "" + l);
  }
  function da(t, e, l, a) {
    if (t = t.options, e) {
      e = {};
      for (var n = 0; n < l.length; n++)
        e["$" + l[n]] = !0;
      for (l = 0; l < t.length; l++)
        n = e.hasOwnProperty("$" + t[l].value), t[l].selected !== n && (t[l].selected = n), n && a && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + De(l), e = null, n = 0; n < t.length; n++) {
        if (t[n].value === l) {
          t[n].selected = !0, a && (t[n].defaultSelected = !0);
          return;
        }
        e !== null || t[n].disabled || (e = t[n]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Oo(t, e, l) {
    if (e != null && (e = "" + De(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + De(l) : "";
  }
  function zo(t, e, l, a) {
    if (e == null) {
      if (a != null) {
        if (l != null) throw Error(o(92));
        if (Ut(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), e = l;
    }
    l = De(e), t.defaultValue = l, a = t.textContent, a === l && a !== "" && a !== null && (t.value = a), Bi(t);
  }
  function ha(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var Nm = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function No(t, e, l) {
    var a = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : a ? t.setProperty(e, l) : typeof l != "number" || l === 0 || Nm.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function _o(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(o(62));
    if (t = t.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || e != null && e.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var n in e)
        a = e[n], e.hasOwnProperty(n) && l[n] !== a && No(t, n, a);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && No(t, u, e[u]);
  }
  function Li(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var _m = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Dm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function cu(t) {
    return Dm.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Je() {
  }
  var Zi = null;
  function Yi(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var ma = null, ga = null;
  function Do(t) {
    var e = oa(t);
    if (e && (t = e.stateNode)) {
      var l = t[he] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Hi(
            t,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), e = l.name, l.type === "radio" && e != null) {
            for (l = t; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + Re(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < l.length; e++) {
              var a = l[e];
              if (a !== t && a.form === t.form) {
                var n = a[he] || null;
                if (!n) throw Error(o(90));
                Hi(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (e = 0; e < l.length; e++)
              a = l[e], a.form === t.form && Mo(a);
          }
          break t;
        case "textarea":
          Oo(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && da(t, !!l.multiple, e, !1);
      }
    }
  }
  var wi = !1;
  function Ro(t, e, l) {
    if (wi) return t(e, l);
    wi = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (wi = !1, (ma !== null || ga !== null) && (ku(), ma && (e = ma, t = ga, ga = ma = null, Do(e), t)))
        for (e = 0; e < t.length; e++) Do(t[e]);
    }
  }
  function nn(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var a = l[he] || null;
    if (a === null) return null;
    l = a[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (t = t.type, a = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !a;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (l && typeof l != "function")
      throw Error(
        o(231, e, typeof l)
      );
    return l;
  }
  var Fe = !(typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined"), ji = !1;
  if (Fe)
    try {
      var un = {};
      Object.defineProperty(un, "passive", {
        get: function() {
          ji = !0;
        }
      }), window.addEventListener("test", un, un), window.removeEventListener("test", un, un);
    } catch (t) {
      ji = !1;
    }
  var gl = null, qi = null, fu = null;
  function Uo() {
    if (fu) return fu;
    var t, e = qi, l = e.length, a, n = "value" in gl ? gl.value : gl.textContent, u = n.length;
    for (t = 0; t < l && e[t] === n[t]; t++) ;
    var f = l - t;
    for (a = 1; a <= f && e[l - a] === n[u - a]; a++) ;
    return fu = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function ou(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function su() {
    return !0;
  }
  function Io() {
    return !1;
  }
  function me(t) {
    function e(l, a, n, u, f) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = f, this.currentTarget = null;
      for (var r in t)
        t.hasOwnProperty(r) && (l = t[r], this[r] = l ? l(u) : u[r]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? su : Io, this.isPropagationStopped = Io, this;
    }
    return M(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = su);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = su);
      },
      persist: function() {
      },
      isPersistent: su
    }), e;
  }
  var ql = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ru = me(ql), cn = M({}, ql, { view: 0, detail: 0 }), Rm = me(cn), Vi, Qi, fn, du = M({}, cn, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Ki,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== fn && (fn && t.type === "mousemove" ? (Vi = t.screenX - fn.screenX, Qi = t.screenY - fn.screenY) : Qi = Vi = 0, fn = t), Vi);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Qi;
    }
  }), xo = me(du), Um = M({}, du, { dataTransfer: 0 }), Im = me(Um), xm = M({}, cn, { relatedTarget: 0 }), Xi = me(xm), Bm = M({}, ql, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Hm = me(Bm), Gm = M({}, ql, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Lm = me(Gm), Zm = M({}, ql, { data: 0 }), Bo = me(Zm), Ym = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, wm = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, jm = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function qm(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = jm[t]) ? !!e[t] : !1;
  }
  function Ki() {
    return qm;
  }
  var Vm = M({}, cn, {
    key: function(t) {
      if (t.key) {
        var e = Ym[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = ou(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? wm[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ki,
    charCode: function(t) {
      return t.type === "keypress" ? ou(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? ou(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Qm = me(Vm), Xm = M({}, du, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Ho = me(Xm), Km = M({}, cn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ki
  }), km = me(Km), Jm = M({}, ql, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Fm = me(Jm), Wm = M({}, du, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), $m = me(Wm), Pm = M({}, ql, {
    newState: 0,
    oldState: 0
  }), tg = me(Pm), eg = [9, 13, 27, 32], ki = Fe && "CompositionEvent" in window, on = null;
  Fe && "documentMode" in document && (on = document.documentMode);
  var lg = Fe && "TextEvent" in window && !on, Go = Fe && (!ki || on && 8 < on && 11 >= on), Lo = " ", Zo = !1;
  function Yo(t, e) {
    switch (t) {
      case "keyup":
        return eg.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function wo(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var ya = !1;
  function ag(t, e) {
    switch (t) {
      case "compositionend":
        return wo(e);
      case "keypress":
        return e.which !== 32 ? null : (Zo = !0, Lo);
      case "textInput":
        return t = e.data, t === Lo && Zo ? null : t;
      default:
        return null;
    }
  }
  function ng(t, e) {
    if (ya)
      return t === "compositionend" || !ki && Yo(t, e) ? (t = Uo(), fu = qi = gl = null, ya = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return Go && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var ug = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function jo(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!ug[t.type] : e === "textarea";
  }
  function qo(t, e, l, a) {
    ma ? ga ? ga.push(a) : ga = [a] : ma = a, e = ei(e, "onChange"), 0 < e.length && (l = new ru(
      "onChange",
      "change",
      null,
      l,
      a
    ), t.push({ event: l, listeners: e }));
  }
  var sn = null, rn = null;
  function ig(t) {
    Ed(t, 0);
  }
  function hu(t) {
    var e = an(t);
    if (Mo(e)) return t;
  }
  function Vo(t, e) {
    if (t === "change") return e;
  }
  var Qo = !1;
  if (Fe) {
    var Ji;
    if (Fe) {
      var Fi = "oninput" in document;
      if (!Fi) {
        var Xo = document.createElement("div");
        Xo.setAttribute("oninput", "return;"), Fi = typeof Xo.oninput == "function";
      }
      Ji = Fi;
    } else Ji = !1;
    Qo = Ji && (!document.documentMode || 9 < document.documentMode);
  }
  function Ko() {
    sn && (sn.detachEvent("onpropertychange", ko), rn = sn = null);
  }
  function ko(t) {
    if (t.propertyName === "value" && hu(rn)) {
      var e = [];
      qo(
        e,
        rn,
        t,
        Yi(t)
      ), Ro(ig, e);
    }
  }
  function cg(t, e, l) {
    t === "focusin" ? (Ko(), sn = e, rn = l, sn.attachEvent("onpropertychange", ko)) : t === "focusout" && Ko();
  }
  function fg(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return hu(rn);
  }
  function og(t, e) {
    if (t === "click") return hu(e);
  }
  function sg(t, e) {
    if (t === "input" || t === "change")
      return hu(e);
  }
  function rg(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Te = typeof Object.is == "function" ? Object.is : rg;
  function dn(t, e) {
    if (Te(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), a = Object.keys(e);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!zi.call(e, n) || !Te(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  function Jo(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Fo(t, e) {
    var l = Jo(t);
    t = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (a = t + l.textContent.length, t <= e && a >= e)
          return { node: l, offset: e - t };
        t = a;
      }
      t: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break t;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Jo(l);
    }
  }
  function Wo(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Wo(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function $o(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = iu(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch (a) {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = iu(t.document);
    }
    return e;
  }
  function Wi(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var dg = Fe && "documentMode" in document && 11 >= document.documentMode, va = null, $i = null, hn = null, Pi = !1;
  function Po(t, e, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Pi || va == null || va !== iu(a) || (a = va, "selectionStart" in a && Wi(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), hn && dn(hn, a) || (hn = a, a = ei($i, "onSelect"), 0 < a.length && (e = new ru(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: a }), e.target = va)));
  }
  function Vl(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var pa = {
    animationend: Vl("Animation", "AnimationEnd"),
    animationiteration: Vl("Animation", "AnimationIteration"),
    animationstart: Vl("Animation", "AnimationStart"),
    transitionrun: Vl("Transition", "TransitionRun"),
    transitionstart: Vl("Transition", "TransitionStart"),
    transitioncancel: Vl("Transition", "TransitionCancel"),
    transitionend: Vl("Transition", "TransitionEnd")
  }, tc = {}, ts = {};
  Fe && (ts = document.createElement("div").style, "AnimationEvent" in window || (delete pa.animationend.animation, delete pa.animationiteration.animation, delete pa.animationstart.animation), "TransitionEvent" in window || delete pa.transitionend.transition);
  function Ql(t) {
    if (tc[t]) return tc[t];
    if (!pa[t]) return t;
    var e = pa[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in ts)
        return tc[t] = e[l];
    return t;
  }
  var es = Ql("animationend"), ls = Ql("animationiteration"), as = Ql("animationstart"), hg = Ql("transitionrun"), mg = Ql("transitionstart"), gg = Ql("transitioncancel"), ns = Ql("transitionend"), us = /* @__PURE__ */ new Map(), ec = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ec.push("scrollEnd");
  function Ye(t, e) {
    us.set(t, e), jl(e, [t]);
  }
  var mu = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Ue = [], Sa = 0, lc = 0;
  function gu() {
    for (var t = Sa, e = lc = Sa = 0; e < t; ) {
      var l = Ue[e];
      Ue[e++] = null;
      var a = Ue[e];
      Ue[e++] = null;
      var n = Ue[e];
      Ue[e++] = null;
      var u = Ue[e];
      if (Ue[e++] = null, a !== null && n !== null) {
        var f = a.pending;
        f === null ? n.next = n : (n.next = f.next, f.next = n), a.pending = n;
      }
      u !== 0 && is(l, n, u);
    }
  }
  function yu(t, e, l, a) {
    Ue[Sa++] = t, Ue[Sa++] = e, Ue[Sa++] = l, Ue[Sa++] = a, lc |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function ac(t, e, l, a) {
    return yu(t, e, l, a), vu(t);
  }
  function Xl(t, e) {
    return yu(t, null, null, e), vu(t);
  }
  function is(t, e, l) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && e !== null && (n = 31 - Ae(l), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [e] : a.push(e), e.lane = l | 536870912), u) : null;
  }
  function vu(t) {
    if (50 < Bn)
      throw Bn = 0, hf = null, Error(o(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var ba = {};
  function yg(t, e, l, a) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Me(t, e, l, a) {
    return new yg(t, e, l, a);
  }
  function nc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function We(t, e) {
    var l = t.alternate;
    return l === null ? (l = Me(
      t.tag,
      e,
      t.key,
      t.mode
    ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 65011712, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
  }
  function cs(t, e) {
    t.flags &= 65011714;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function pu(t, e, l, a, n, u) {
    var f = 0;
    if (a = t, typeof t == "function") nc(t) && (f = 1);
    else if (typeof t == "string")
      f = Cy(
        t,
        l,
        w.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case Bt:
          return t = Me(31, l, e, n), t.elementType = Bt, t.lanes = u, t;
        case j:
          return Kl(l.children, n, u, e);
        case W:
          f = 8, n |= 24;
          break;
        case Q:
          return t = Me(12, l, e, n | 2), t.elementType = Q, t.lanes = u, t;
        case St:
          return t = Me(13, l, e, n), t.elementType = St, t.lanes = u, t;
        case gt:
          return t = Me(19, l, e, n), t.elementType = gt, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case B:
                f = 10;
                break t;
              case Y:
                f = 9;
                break t;
              case F:
                f = 11;
                break t;
              case k:
                f = 14;
                break t;
              case ut:
                f = 16, a = null;
                break t;
            }
          f = 29, l = Error(
            o(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return e = Me(f, l, e, n), e.elementType = t, e.type = a, e.lanes = u, e;
  }
  function Kl(t, e, l, a) {
    return t = Me(7, t, a, e), t.lanes = l, t;
  }
  function uc(t, e, l) {
    return t = Me(6, t, null, e), t.lanes = l, t;
  }
  function fs(t) {
    var e = Me(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function ic(t, e, l) {
    return e = Me(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = l, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var os = /* @__PURE__ */ new WeakMap();
  function Ie(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = os.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: co(e)
      }, os.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: co(e)
    };
  }
  var Ca = [], Aa = 0, Su = null, mn = 0, xe = [], Be = 0, yl = null, Ve = 1, Qe = "";
  function $e(t, e) {
    Ca[Aa++] = mn, Ca[Aa++] = Su, Su = t, mn = e;
  }
  function ss(t, e, l) {
    xe[Be++] = Ve, xe[Be++] = Qe, xe[Be++] = yl, yl = t;
    var a = Ve;
    t = Qe;
    var n = 32 - Ae(a) - 1;
    a &= ~(1 << n), l += 1;
    var u = 32 - Ae(e) + n;
    if (30 < u) {
      var f = n - n % 5;
      u = (a & (1 << f) - 1).toString(32), a >>= f, n -= f, Ve = 1 << 32 - Ae(e) + n | l << n | a, Qe = u + t;
    } else
      Ve = 1 << u | l << n | a, Qe = t;
  }
  function cc(t) {
    t.return !== null && ($e(t, 1), ss(t, 1, 0));
  }
  function fc(t) {
    for (; t === Su; )
      Su = Ca[--Aa], Ca[Aa] = null, mn = Ca[--Aa], Ca[Aa] = null;
    for (; t === yl; )
      yl = xe[--Be], xe[Be] = null, Qe = xe[--Be], xe[Be] = null, Ve = xe[--Be], xe[Be] = null;
  }
  function rs(t, e) {
    xe[Be++] = Ve, xe[Be++] = Qe, xe[Be++] = yl, Ve = e.id, Qe = e.overflow, yl = t;
  }
  var ne = null, It = null, ht = !1, vl = null, He = !1, oc = Error(o(519));
  function pl(t) {
    var e = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw gn(Ie(e, t)), oc;
  }
  function ds(t) {
    var e = t.stateNode, l = t.type, a = t.memoizedProps;
    switch (e[ae] = t, e[he] = a, l) {
      case "dialog":
        ot("cancel", e), ot("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        ot("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Gn.length; l++)
          ot(Gn[l], e);
        break;
      case "source":
        ot("error", e);
        break;
      case "img":
      case "image":
      case "link":
        ot("error", e), ot("load", e);
        break;
      case "details":
        ot("toggle", e);
        break;
      case "input":
        ot("invalid", e), Eo(
          e,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        ot("invalid", e);
        break;
      case "textarea":
        ot("invalid", e), zo(e, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || a.suppressHydrationWarning === !0 || _d(e.textContent, l) ? (a.popover != null && (ot("beforetoggle", e), ot("toggle", e)), a.onScroll != null && ot("scroll", e), a.onScrollEnd != null && ot("scrollend", e), a.onClick != null && (e.onclick = Je), e = !0) : e = !1, e || pl(t, !0);
  }
  function hs(t) {
    for (ne = t.return; ne; )
      switch (ne.tag) {
        case 5:
        case 31:
        case 13:
          He = !1;
          return;
        case 27:
        case 3:
          He = !0;
          return;
        default:
          ne = ne.return;
      }
  }
  function Ta(t) {
    if (t !== ne) return !1;
    if (!ht) return hs(t), ht = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Nf(t.type, t.memoizedProps)), l = !l), l && It && pl(t), hs(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      It = Ld(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      It = Ld(t);
    } else
      e === 27 ? (e = It, Ul(t.type) ? (t = If, If = null, It = t) : It = e) : It = ne ? Le(t.stateNode.nextSibling) : null;
    return !0;
  }
  function kl() {
    It = ne = null, ht = !1;
  }
  function sc() {
    var t = vl;
    return t !== null && (pe === null ? pe = t : pe.push.apply(
      pe,
      t
    ), vl = null), t;
  }
  function gn(t) {
    vl === null ? vl = [t] : vl.push(t);
  }
  var rc = p(null), Jl = null, Pe = null;
  function Sl(t, e, l) {
    G(rc, e._currentValue), e._currentValue = l;
  }
  function tl(t) {
    t._currentValue = rc.current, _(rc);
  }
  function dc(t, e, l) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, a !== null && (a.childLanes |= e)) : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function hc(t, e, l, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var f = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var r = u;
          u = n;
          for (var m = 0; m < e.length; m++)
            if (r.context === e[m]) {
              u.lanes |= l, r = u.alternate, r !== null && (r.lanes |= l), dc(
                u.return,
                l,
                t
              ), a || (f = null);
              break t;
            }
          u = r.next;
        }
      } else if (n.tag === 18) {
        if (f = n.return, f === null) throw Error(o(341));
        f.lanes |= l, u = f.alternate, u !== null && (u.lanes |= l), dc(f, l, t), f = null;
      } else f = n.child;
      if (f !== null) f.return = n;
      else
        for (f = n; f !== null; ) {
          if (f === t) {
            f = null;
            break;
          }
          if (n = f.sibling, n !== null) {
            n.return = f.return, f = n;
            break;
          }
          f = f.return;
        }
      n = f;
    }
  }
  function Ma(t, e, l, a) {
    t = null;
    for (var n = e, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var f = n.alternate;
        if (f === null) throw Error(o(387));
        if (f = f.memoizedProps, f !== null) {
          var r = n.type;
          Te(n.pendingProps.value, f.value) || (t !== null ? t.push(r) : t = [r]);
        }
      } else if (n === tt.current) {
        if (f = n.alternate, f === null) throw Error(o(387));
        f.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(jn) : t = [jn]);
      }
      n = n.return;
    }
    t !== null && hc(
      e,
      t,
      l,
      a
    ), e.flags |= 262144;
  }
  function bu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Te(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Fl(t) {
    Jl = t, Pe = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ue(t) {
    return ms(Jl, t);
  }
  function Cu(t, e) {
    return Jl === null && Fl(t), ms(t, e);
  }
  function ms(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, Pe === null) {
      if (t === null) throw Error(o(308));
      Pe = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Pe = Pe.next = e;
    return l;
  }
  var vg = typeof AbortController != "undefined" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(l, a) {
        t.push(a);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(l) {
        return l();
      });
    };
  }, pg = i.unstable_scheduleCallback, Sg = i.unstable_NormalPriority, Xt = {
    $$typeof: B,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function mc() {
    return {
      controller: new vg(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function yn(t) {
    t.refCount--, t.refCount === 0 && pg(Sg, function() {
      t.controller.abort();
    });
  }
  var vn = null, gc = 0, Ea = 0, Oa = null;
  function bg(t, e) {
    if (vn === null) {
      var l = vn = [];
      gc = 0, Ea = Sf(), Oa = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return gc++, e.then(gs, gs), e;
  }
  function gs() {
    if (--gc === 0 && vn !== null) {
      Oa !== null && (Oa.status = "fulfilled");
      var t = vn;
      vn = null, Ea = 0, Oa = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Cg(t, e) {
    var l = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        l.push(n);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = e;
        for (var n = 0; n < l.length; n++) (0, l[n])(e);
      },
      function(n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)
          (0, l[n])(void 0);
      }
    ), a;
  }
  var ys = N.S;
  N.S = function(t, e) {
    Pr = be(), typeof e == "object" && e !== null && typeof e.then == "function" && bg(t, e), ys !== null && ys(t, e);
  };
  var Wl = p(null);
  function yc() {
    var t = Wl.current;
    return t !== null ? t : _t.pooledCache;
  }
  function Au(t, e) {
    e === null ? G(Wl, Wl.current) : G(Wl, e.pool);
  }
  function vs() {
    var t = yc();
    return t === null ? null : { parent: Xt._currentValue, pool: t };
  }
  var za = Error(o(460)), vc = Error(o(474)), Tu = Error(o(542)), Mu = { then: function() {
  } };
  function ps(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Ss(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(Je, Je), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Cs(t), t;
      default:
        if (typeof e.status == "string") e.then(Je, Je);
        else {
          if (t = _t, t !== null && 100 < t.shellSuspendCounter)
            throw Error(o(482));
          t = e, t.status = "pending", t.then(
            function(a) {
              if (e.status === "pending") {
                var n = e;
                n.status = "fulfilled", n.value = a;
              }
            },
            function(a) {
              if (e.status === "pending") {
                var n = e;
                n.status = "rejected", n.reason = a;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, Cs(t), t;
        }
        throw Pl = e, za;
    }
  }
  function $l(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Pl = l, za) : l;
    }
  }
  var Pl = null;
  function bs() {
    if (Pl === null) throw Error(o(459));
    var t = Pl;
    return Pl = null, t;
  }
  function Cs(t) {
    if (t === za || t === Tu)
      throw Error(o(483));
  }
  var Na = null, pn = 0;
  function Eu(t) {
    var e = pn;
    return pn += 1, Na === null && (Na = []), Ss(Na, t, e);
  }
  function Sn(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Ou(t, e) {
    throw e.$$typeof === x ? Error(o(525)) : (t = Object.prototype.toString.call(e), Error(
      o(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function As(t) {
    function e(b, S) {
      if (t) {
        var A = b.deletions;
        A === null ? (b.deletions = [S], b.flags |= 16) : A.push(S);
      }
    }
    function l(b, S) {
      if (!t) return null;
      for (; S !== null; )
        e(b, S), S = S.sibling;
      return null;
    }
    function a(b) {
      for (var S = /* @__PURE__ */ new Map(); b !== null; )
        b.key !== null ? S.set(b.key, b) : S.set(b.index, b), b = b.sibling;
      return S;
    }
    function n(b, S) {
      return b = We(b, S), b.index = 0, b.sibling = null, b;
    }
    function u(b, S, A) {
      return b.index = A, t ? (A = b.alternate, A !== null ? (A = A.index, A < S ? (b.flags |= 67108866, S) : A) : (b.flags |= 67108866, S)) : (b.flags |= 1048576, S);
    }
    function f(b) {
      return t && b.alternate === null && (b.flags |= 67108866), b;
    }
    function r(b, S, A, R) {
      return S === null || S.tag !== 6 ? (S = uc(A, b.mode, R), S.return = b, S) : (S = n(S, A), S.return = b, S);
    }
    function m(b, S, A, R) {
      var K = A.type;
      return K === j ? D(
        b,
        S,
        A.props.children,
        R,
        A.key
      ) : S !== null && (S.elementType === K || typeof K == "object" && K !== null && K.$$typeof === ut && $l(K) === S.type) ? (S = n(S, A.props), Sn(S, A), S.return = b, S) : (S = pu(
        A.type,
        A.key,
        A.props,
        null,
        b.mode,
        R
      ), Sn(S, A), S.return = b, S);
    }
    function T(b, S, A, R) {
      return S === null || S.tag !== 4 || S.stateNode.containerInfo !== A.containerInfo || S.stateNode.implementation !== A.implementation ? (S = ic(A, b.mode, R), S.return = b, S) : (S = n(S, A.children || []), S.return = b, S);
    }
    function D(b, S, A, R, K) {
      return S === null || S.tag !== 7 ? (S = Kl(
        A,
        b.mode,
        R,
        K
      ), S.return = b, S) : (S = n(S, A), S.return = b, S);
    }
    function I(b, S, A) {
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return S = uc(
          "" + S,
          b.mode,
          A
        ), S.return = b, S;
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case L:
            return A = pu(
              S.type,
              S.key,
              S.props,
              null,
              b.mode,
              A
            ), Sn(A, S), A.return = b, A;
          case U:
            return S = ic(
              S,
              b.mode,
              A
            ), S.return = b, S;
          case ut:
            return S = $l(S), I(b, S, A);
        }
        if (Ut(S) || Nt(S))
          return S = Kl(
            S,
            b.mode,
            A,
            null
          ), S.return = b, S;
        if (typeof S.then == "function")
          return I(b, Eu(S), A);
        if (S.$$typeof === B)
          return I(
            b,
            Cu(b, S),
            A
          );
        Ou(b, S);
      }
      return null;
    }
    function E(b, S, A, R) {
      var K = S !== null ? S.key : null;
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return K !== null ? null : r(b, S, "" + A, R);
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case L:
            return A.key === K ? m(b, S, A, R) : null;
          case U:
            return A.key === K ? T(b, S, A, R) : null;
          case ut:
            return A = $l(A), E(b, S, A, R);
        }
        if (Ut(A) || Nt(A))
          return K !== null ? null : D(b, S, A, R, null);
        if (typeof A.then == "function")
          return E(
            b,
            S,
            Eu(A),
            R
          );
        if (A.$$typeof === B)
          return E(
            b,
            S,
            Cu(b, A),
            R
          );
        Ou(b, A);
      }
      return null;
    }
    function z(b, S, A, R, K) {
      if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
        return b = b.get(A) || null, r(S, b, "" + R, K);
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case L:
            return b = b.get(
              R.key === null ? A : R.key
            ) || null, m(S, b, R, K);
          case U:
            return b = b.get(
              R.key === null ? A : R.key
            ) || null, T(S, b, R, K);
          case ut:
            return R = $l(R), z(
              b,
              S,
              A,
              R,
              K
            );
        }
        if (Ut(R) || Nt(R))
          return b = b.get(A) || null, D(S, b, R, K, null);
        if (typeof R.then == "function")
          return z(
            b,
            S,
            A,
            Eu(R),
            K
          );
        if (R.$$typeof === B)
          return z(
            b,
            S,
            A,
            Cu(S, R),
            K
          );
        Ou(S, R);
      }
      return null;
    }
    function q(b, S, A, R) {
      for (var K = null, yt = null, V = S, ct = S = 0, rt = null; V !== null && ct < A.length; ct++) {
        V.index > ct ? (rt = V, V = null) : rt = V.sibling;
        var vt = E(
          b,
          V,
          A[ct],
          R
        );
        if (vt === null) {
          V === null && (V = rt);
          break;
        }
        t && V && vt.alternate === null && e(b, V), S = u(vt, S, ct), yt === null ? K = vt : yt.sibling = vt, yt = vt, V = rt;
      }
      if (ct === A.length)
        return l(b, V), ht && $e(b, ct), K;
      if (V === null) {
        for (; ct < A.length; ct++)
          V = I(b, A[ct], R), V !== null && (S = u(
            V,
            S,
            ct
          ), yt === null ? K = V : yt.sibling = V, yt = V);
        return ht && $e(b, ct), K;
      }
      for (V = a(V); ct < A.length; ct++)
        rt = z(
          V,
          b,
          ct,
          A[ct],
          R
        ), rt !== null && (t && rt.alternate !== null && V.delete(
          rt.key === null ? ct : rt.key
        ), S = u(
          rt,
          S,
          ct
        ), yt === null ? K = rt : yt.sibling = rt, yt = rt);
      return t && V.forEach(function(Gl) {
        return e(b, Gl);
      }), ht && $e(b, ct), K;
    }
    function J(b, S, A, R) {
      if (A == null) throw Error(o(151));
      for (var K = null, yt = null, V = S, ct = S = 0, rt = null, vt = A.next(); V !== null && !vt.done; ct++, vt = A.next()) {
        V.index > ct ? (rt = V, V = null) : rt = V.sibling;
        var Gl = E(b, V, vt.value, R);
        if (Gl === null) {
          V === null && (V = rt);
          break;
        }
        t && V && Gl.alternate === null && e(b, V), S = u(Gl, S, ct), yt === null ? K = Gl : yt.sibling = Gl, yt = Gl, V = rt;
      }
      if (vt.done)
        return l(b, V), ht && $e(b, ct), K;
      if (V === null) {
        for (; !vt.done; ct++, vt = A.next())
          vt = I(b, vt.value, R), vt !== null && (S = u(vt, S, ct), yt === null ? K = vt : yt.sibling = vt, yt = vt);
        return ht && $e(b, ct), K;
      }
      for (V = a(V); !vt.done; ct++, vt = A.next())
        vt = z(V, b, ct, vt.value, R), vt !== null && (t && vt.alternate !== null && V.delete(vt.key === null ? ct : vt.key), S = u(vt, S, ct), yt === null ? K = vt : yt.sibling = vt, yt = vt);
      return t && V.forEach(function(Uy) {
        return e(b, Uy);
      }), ht && $e(b, ct), K;
    }
    function zt(b, S, A, R) {
      if (typeof A == "object" && A !== null && A.type === j && A.key === null && (A = A.props.children), typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case L:
            t: {
              for (var K = A.key; S !== null; ) {
                if (S.key === K) {
                  if (K = A.type, K === j) {
                    if (S.tag === 7) {
                      l(
                        b,
                        S.sibling
                      ), R = n(
                        S,
                        A.props.children
                      ), R.return = b, b = R;
                      break t;
                    }
                  } else if (S.elementType === K || typeof K == "object" && K !== null && K.$$typeof === ut && $l(K) === S.type) {
                    l(
                      b,
                      S.sibling
                    ), R = n(S, A.props), Sn(R, A), R.return = b, b = R;
                    break t;
                  }
                  l(b, S);
                  break;
                } else e(b, S);
                S = S.sibling;
              }
              A.type === j ? (R = Kl(
                A.props.children,
                b.mode,
                R,
                A.key
              ), R.return = b, b = R) : (R = pu(
                A.type,
                A.key,
                A.props,
                null,
                b.mode,
                R
              ), Sn(R, A), R.return = b, b = R);
            }
            return f(b);
          case U:
            t: {
              for (K = A.key; S !== null; ) {
                if (S.key === K)
                  if (S.tag === 4 && S.stateNode.containerInfo === A.containerInfo && S.stateNode.implementation === A.implementation) {
                    l(
                      b,
                      S.sibling
                    ), R = n(S, A.children || []), R.return = b, b = R;
                    break t;
                  } else {
                    l(b, S);
                    break;
                  }
                else e(b, S);
                S = S.sibling;
              }
              R = ic(A, b.mode, R), R.return = b, b = R;
            }
            return f(b);
          case ut:
            return A = $l(A), zt(
              b,
              S,
              A,
              R
            );
        }
        if (Ut(A))
          return q(
            b,
            S,
            A,
            R
          );
        if (Nt(A)) {
          if (K = Nt(A), typeof K != "function") throw Error(o(150));
          return A = K.call(A), J(
            b,
            S,
            A,
            R
          );
        }
        if (typeof A.then == "function")
          return zt(
            b,
            S,
            Eu(A),
            R
          );
        if (A.$$typeof === B)
          return zt(
            b,
            S,
            Cu(b, A),
            R
          );
        Ou(b, A);
      }
      return typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint" ? (A = "" + A, S !== null && S.tag === 6 ? (l(b, S.sibling), R = n(S, A), R.return = b, b = R) : (l(b, S), R = uc(A, b.mode, R), R.return = b, b = R), f(b)) : l(b, S);
    }
    return function(b, S, A, R) {
      try {
        pn = 0;
        var K = zt(
          b,
          S,
          A,
          R
        );
        return Na = null, K;
      } catch (V) {
        if (V === za || V === Tu) throw V;
        var yt = Me(29, V, null, b.mode);
        return yt.lanes = R, yt.return = b, yt;
      } finally {
      }
    };
  }
  var ta = As(!0), Ts = As(!1), bl = !1;
  function pc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Sc(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Cl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Al(t, e, l) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (bt & 2) !== 0) {
      var n = a.pending;
      return n === null ? e.next = e : (e.next = n.next, n.next = e), a.pending = e, e = vu(t), is(t, null, l), e;
    }
    return yu(t, a, e, l), vu(t);
  }
  function bn(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, mo(t, l);
    }
  }
  function bc(t, e) {
    var l = t.updateQueue, a = t.alternate;
    if (a !== null && (a = a.updateQueue, l === a)) {
      var n = null, u = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var f = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = f : u = u.next = f, l = l.next;
        } while (l !== null);
        u === null ? n = u = e : u = u.next = e;
      } else n = u = e;
      l = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, t.updateQueue = l;
      return;
    }
    t = l.lastBaseUpdate, t === null ? l.firstBaseUpdate = e : t.next = e, l.lastBaseUpdate = e;
  }
  var Cc = !1;
  function Cn() {
    if (Cc) {
      var t = Oa;
      if (t !== null) throw t;
    }
  }
  function An(t, e, l, a) {
    Cc = !1;
    var n = t.updateQueue;
    bl = !1;
    var u = n.firstBaseUpdate, f = n.lastBaseUpdate, r = n.shared.pending;
    if (r !== null) {
      n.shared.pending = null;
      var m = r, T = m.next;
      m.next = null, f === null ? u = T : f.next = T, f = m;
      var D = t.alternate;
      D !== null && (D = D.updateQueue, r = D.lastBaseUpdate, r !== f && (r === null ? D.firstBaseUpdate = T : r.next = T, D.lastBaseUpdate = m));
    }
    if (u !== null) {
      var I = n.baseState;
      f = 0, D = T = m = null, r = u;
      do {
        var E = r.lane & -536870913, z = E !== r.lane;
        if (z ? (st & E) === E : (a & E) === E) {
          E !== 0 && E === Ea && (Cc = !0), D !== null && (D = D.next = {
            lane: 0,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          });
          t: {
            var q = t, J = r;
            E = e;
            var zt = l;
            switch (J.tag) {
              case 1:
                if (q = J.payload, typeof q == "function") {
                  I = q.call(zt, I, E);
                  break t;
                }
                I = q;
                break t;
              case 3:
                q.flags = q.flags & -65537 | 128;
              case 0:
                if (q = J.payload, E = typeof q == "function" ? q.call(zt, I, E) : q, E == null) break t;
                I = M({}, I, E);
                break t;
              case 2:
                bl = !0;
            }
          }
          E = r.callback, E !== null && (t.flags |= 64, z && (t.flags |= 8192), z = n.callbacks, z === null ? n.callbacks = [E] : z.push(E));
        } else
          z = {
            lane: E,
            tag: r.tag,
            payload: r.payload,
            callback: r.callback,
            next: null
          }, D === null ? (T = D = z, m = I) : D = D.next = z, f |= E;
        if (r = r.next, r === null) {
          if (r = n.shared.pending, r === null)
            break;
          z = r, r = z.next, z.next = null, n.lastBaseUpdate = z, n.shared.pending = null;
        }
      } while (!0);
      D === null && (m = I), n.baseState = m, n.firstBaseUpdate = T, n.lastBaseUpdate = D, u === null && (n.shared.lanes = 0), zl |= f, t.lanes = f, t.memoizedState = I;
    }
  }
  function Ms(t, e) {
    if (typeof t != "function")
      throw Error(o(191, t));
    t.call(e);
  }
  function Es(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++)
        Ms(l[t], e);
  }
  var _a = p(null), zu = p(0);
  function Os(t, e) {
    t = ol, G(zu, t), G(_a, e), ol = t | e.baseLanes;
  }
  function Ac() {
    G(zu, ol), G(_a, _a.current);
  }
  function Tc() {
    ol = zu.current, _(_a), _(zu);
  }
  var Ee = p(null), Ge = null;
  function Tl(t) {
    var e = t.alternate;
    G(wt, wt.current & 1), G(Ee, t), Ge === null && (e === null || _a.current !== null || e.memoizedState !== null) && (Ge = t);
  }
  function Mc(t) {
    G(wt, wt.current), G(Ee, t), Ge === null && (Ge = t);
  }
  function zs(t) {
    t.tag === 22 ? (G(wt, wt.current), G(Ee, t), Ge === null && (Ge = t)) : Ml();
  }
  function Ml() {
    G(wt, wt.current), G(Ee, Ee.current);
  }
  function Oe(t) {
    _(Ee), Ge === t && (Ge = null), _(wt);
  }
  var wt = p(0);
  function Nu(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Rf(l) || Uf(l)))
          return e;
      } else if (e.tag === 19 && (e.memoizedProps.revealOrder === "forwards" || e.memoizedProps.revealOrder === "backwards" || e.memoizedProps.revealOrder === "unstable_legacy-backwards" || e.memoizedProps.revealOrder === "together")) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var el = 0, nt = null, Et = null, Kt = null, _u = !1, Da = !1, ea = !1, Du = 0, Tn = 0, Ra = null, Ag = 0;
  function Zt() {
    throw Error(o(321));
  }
  function Ec(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Te(t[l], e[l])) return !1;
    return !0;
  }
  function Oc(t, e, l, a, n, u) {
    return el = u, nt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, N.H = t === null || t.memoizedState === null ? sr : wc, ea = !1, u = l(a, n), ea = !1, Da && (u = _s(
      e,
      l,
      a,
      n
    )), Ns(t), u;
  }
  function Ns(t) {
    N.H = On;
    var e = Et !== null && Et.next !== null;
    if (el = 0, Kt = Et = nt = null, _u = !1, Tn = 0, Ra = null, e) throw Error(o(300));
    t === null || kt || (t = t.dependencies, t !== null && bu(t) && (kt = !0));
  }
  function _s(t, e, l, a) {
    nt = t;
    var n = 0;
    do {
      if (Da && (Ra = null), Tn = 0, Da = !1, 25 <= n) throw Error(o(301));
      if (n += 1, Kt = Et = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      N.H = rr, u = e(l, a);
    } while (Da);
    return u;
  }
  function Tg() {
    var t = N.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? Mn(e) : e, t = t.useState()[0], (Et !== null ? Et.memoizedState : null) !== t && (nt.flags |= 1024), e;
  }
  function zc() {
    var t = Du !== 0;
    return Du = 0, t;
  }
  function Nc(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function _c(t) {
    if (_u) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      _u = !1;
    }
    el = 0, Kt = Et = nt = null, Da = !1, Tn = Du = 0, Ra = null;
  }
  function oe() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Kt === null ? nt.memoizedState = Kt = t : Kt = Kt.next = t, Kt;
  }
  function jt() {
    if (Et === null) {
      var t = nt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Et.next;
    var e = Kt === null ? nt.memoizedState : Kt.next;
    if (e !== null)
      Kt = e, Et = t;
    else {
      if (t === null)
        throw nt.alternate === null ? Error(o(467)) : Error(o(310));
      Et = t, t = {
        memoizedState: Et.memoizedState,
        baseState: Et.baseState,
        baseQueue: Et.baseQueue,
        queue: Et.queue,
        next: null
      }, Kt === null ? nt.memoizedState = Kt = t : Kt = Kt.next = t;
    }
    return Kt;
  }
  function Ru() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Mn(t) {
    var e = Tn;
    return Tn += 1, Ra === null && (Ra = []), t = Ss(Ra, t, e), e = nt, (Kt === null ? e.memoizedState : Kt.next) === null && (e = e.alternate, N.H = e === null || e.memoizedState === null ? sr : wc), t;
  }
  function Uu(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Mn(t);
      if (t.$$typeof === B) return ue(t);
    }
    throw Error(o(438, String(t)));
  }
  function Dc(t) {
    var e = null, l = nt.updateQueue;
    if (l !== null && (e = l.memoCache), e == null) {
      var a = nt.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (e = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = Ru(), nt.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++)
        l[a] = Vt;
    return e.index++, l;
  }
  function ll(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Iu(t) {
    var e = jt();
    return Rc(e, Et, t);
  }
  function Rc(t, e, l) {
    var a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = l;
    var n = t.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var f = n.next;
        n.next = u.next, u.next = f;
      }
      e.baseQueue = n = u, a.pending = null;
    }
    if (u = t.baseState, n === null) t.memoizedState = u;
    else {
      e = n.next;
      var r = f = null, m = null, T = e, D = !1;
      do {
        var I = T.lane & -536870913;
        if (I !== T.lane ? (st & I) === I : (el & I) === I) {
          var E = T.revertLane;
          if (E === 0)
            m !== null && (m = m.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }), I === Ea && (D = !0);
          else if ((el & E) === E) {
            T = T.next, E === Ea && (D = !0);
            continue;
          } else
            I = {
              lane: 0,
              revertLane: T.revertLane,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }, m === null ? (r = m = I, f = u) : m = m.next = I, nt.lanes |= E, zl |= E;
          I = T.action, ea && l(u, I), u = T.hasEagerState ? T.eagerState : l(u, I);
        } else
          E = {
            lane: I,
            revertLane: T.revertLane,
            gesture: T.gesture,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          }, m === null ? (r = m = E, f = u) : m = m.next = E, nt.lanes |= I, zl |= I;
        T = T.next;
      } while (T !== null && T !== e);
      if (m === null ? f = u : m.next = r, !Te(u, t.memoizedState) && (kt = !0, D && (l = Oa, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = f, t.baseQueue = m, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function Uc(t) {
    var e = jt(), l = e.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = t;
    var a = l.dispatch, n = l.pending, u = e.memoizedState;
    if (n !== null) {
      l.pending = null;
      var f = n = n.next;
      do
        u = t(u, f.action), f = f.next;
      while (f !== n);
      Te(u, e.memoizedState) || (kt = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), l.lastRenderedState = u;
    }
    return [u, a];
  }
  function Ds(t, e, l) {
    var a = nt, n = jt(), u = ht;
    if (u) {
      if (l === void 0) throw Error(o(407));
      l = l();
    } else l = e();
    var f = !Te(
      (Et || n).memoizedState,
      l
    );
    if (f && (n.memoizedState = l, kt = !0), n = n.queue, Bc(Is.bind(null, a, n, t), [
      t
    ]), n.getSnapshot !== e || f || Kt !== null && Kt.memoizedState.tag & 1) {
      if (a.flags |= 2048, Ua(
        9,
        { destroy: void 0 },
        Us.bind(
          null,
          a,
          n,
          l,
          e
        ),
        null
      ), _t === null) throw Error(o(349));
      u || (el & 127) !== 0 || Rs(a, e, l);
    }
    return l;
  }
  function Rs(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = nt.updateQueue, e === null ? (e = Ru(), nt.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
  }
  function Us(t, e, l, a) {
    e.value = l, e.getSnapshot = a, xs(e) && Bs(t);
  }
  function Is(t, e, l) {
    return l(function() {
      xs(e) && Bs(t);
    });
  }
  function xs(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !Te(t, l);
    } catch (a) {
      return !0;
    }
  }
  function Bs(t) {
    var e = Xl(t, 2);
    e !== null && Se(e, t, 2);
  }
  function Ic(t) {
    var e = oe();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), ea) {
        hl(!0);
        try {
          l();
        } finally {
          hl(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ll,
      lastRenderedState: t
    }, e;
  }
  function Hs(t, e, l, a) {
    return t.baseState = l, Rc(
      t,
      Et,
      typeof a == "function" ? a : ll
    );
  }
  function Mg(t, e, l, a, n) {
    if (Hu(t)) throw Error(o(485));
    if (t = e.action, t !== null) {
      var u = {
        payload: n,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(f) {
          u.listeners.push(f);
        }
      };
      N.T !== null ? l(!0) : u.isTransition = !1, a(u), l = e.pending, l === null ? (u.next = e.pending = u, Gs(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function Gs(t, e) {
    var l = e.action, a = e.payload, n = t.state;
    if (e.isTransition) {
      var u = N.T, f = {};
      N.T = f;
      try {
        var r = l(n, a), m = N.S;
        m !== null && m(f, r), Ls(t, e, r);
      } catch (T) {
        xc(t, e, T);
      } finally {
        u !== null && f.types !== null && (u.types = f.types), N.T = u;
      }
    } else
      try {
        u = l(n, a), Ls(t, e, u);
      } catch (T) {
        xc(t, e, T);
      }
  }
  function Ls(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        Zs(t, e, a);
      },
      function(a) {
        return xc(t, e, a);
      }
    ) : Zs(t, e, l);
  }
  function Zs(t, e, l) {
    e.status = "fulfilled", e.value = l, Ys(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, Gs(t, l)));
  }
  function xc(t, e, l) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        e.status = "rejected", e.reason = l, Ys(e), e = e.next;
      while (e !== a);
    }
    t.action = null;
  }
  function Ys(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function ws(t, e) {
    return e;
  }
  function js(t, e) {
    if (ht) {
      var l = _t.formState;
      if (l !== null) {
        t: {
          var a = nt;
          if (ht) {
            if (It) {
              e: {
                for (var n = It, u = He; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break e;
                  }
                  if (n = Le(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break e;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                It = Le(
                  n.nextSibling
                ), a = n.data === "F!";
                break t;
              }
            }
            pl(a);
          }
          a = !1;
        }
        a && (e = l[0]);
      }
    }
    return l = oe(), l.memoizedState = l.baseState = e, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ws,
      lastRenderedState: e
    }, l.queue = a, l = cr.bind(
      null,
      nt,
      a
    ), a.dispatch = l, a = Ic(!1), u = Yc.bind(
      null,
      nt,
      !1,
      a.queue
    ), a = oe(), n = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, l = Mg.bind(
      null,
      nt,
      n,
      u,
      l
    ), n.dispatch = l, a.memoizedState = t, [e, l, !1];
  }
  function qs(t) {
    var e = jt();
    return Vs(e, Et, t);
  }
  function Vs(t, e, l) {
    if (e = Rc(
      t,
      e,
      ws
    )[0], t = Iu(ll)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var a = Mn(e);
      } catch (f) {
        throw f === za ? Tu : f;
      }
    else a = e;
    e = jt();
    var n = e.queue, u = n.dispatch;
    return l !== e.memoizedState && (nt.flags |= 2048, Ua(
      9,
      { destroy: void 0 },
      Eg.bind(null, n, l),
      null
    )), [a, u, t];
  }
  function Eg(t, e) {
    t.action = e;
  }
  function Qs(t) {
    var e = jt(), l = Et;
    if (l !== null)
      return Vs(e, l, t);
    jt(), e = e.memoizedState, l = jt();
    var a = l.queue.dispatch;
    return l.memoizedState = t, [e, a, !1];
  }
  function Ua(t, e, l, a) {
    return t = { tag: t, create: l, deps: a, inst: e, next: null }, e = nt.updateQueue, e === null && (e = Ru(), nt.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (a = l.next, l.next = t, t.next = a, e.lastEffect = t), t;
  }
  function Xs() {
    return jt().memoizedState;
  }
  function xu(t, e, l, a) {
    var n = oe();
    nt.flags |= t, n.memoizedState = Ua(
      1 | e,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function Bu(t, e, l, a) {
    var n = jt();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    Et !== null && a !== null && Ec(a, Et.memoizedState.deps) ? n.memoizedState = Ua(e, u, l, a) : (nt.flags |= t, n.memoizedState = Ua(
      1 | e,
      u,
      l,
      a
    ));
  }
  function Ks(t, e) {
    xu(8390656, 8, t, e);
  }
  function Bc(t, e) {
    Bu(2048, 8, t, e);
  }
  function Og(t) {
    nt.flags |= 4;
    var e = nt.updateQueue;
    if (e === null)
      e = Ru(), nt.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function ks(t) {
    var e = jt().memoizedState;
    return Og({ ref: e, nextImpl: t }), function() {
      if ((bt & 2) !== 0) throw Error(o(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function Js(t, e) {
    return Bu(4, 2, t, e);
  }
  function Fs(t, e) {
    return Bu(4, 4, t, e);
  }
  function Ws(t, e) {
    if (typeof e == "function") {
      t = t();
      var l = e(t);
      return function() {
        typeof l == "function" ? l() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function $s(t, e, l) {
    l = l != null ? l.concat([t]) : null, Bu(4, 4, Ws.bind(null, e, t), l);
  }
  function Hc() {
  }
  function Ps(t, e) {
    var l = jt();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && Ec(e, a[1]) ? a[0] : (l.memoizedState = [t, e], t);
  }
  function tr(t, e) {
    var l = jt();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && Ec(e, a[1]))
      return a[0];
    if (a = t(), ea) {
      hl(!0);
      try {
        t();
      } finally {
        hl(!1);
      }
    }
    return l.memoizedState = [a, e], a;
  }
  function Gc(t, e, l) {
    return l === void 0 || (el & 1073741824) !== 0 && (st & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = ed(), nt.lanes |= t, zl |= t, l);
  }
  function er(t, e, l, a) {
    return Te(l, e) ? l : _a.current !== null ? (t = Gc(t, l, a), Te(t, e) || (kt = !0), t) : (el & 42) === 0 || (el & 1073741824) !== 0 && (st & 261930) === 0 ? (kt = !0, t.memoizedState = l) : (t = ed(), nt.lanes |= t, zl |= t, e);
  }
  function lr(t, e, l, a, n) {
    var u = H.p;
    H.p = u !== 0 && 8 > u ? u : 8;
    var f = N.T, r = {};
    N.T = r, Yc(t, !1, e, l);
    try {
      var m = n(), T = N.S;
      if (T !== null && T(r, m), m !== null && typeof m == "object" && typeof m.then == "function") {
        var D = Cg(
          m,
          a
        );
        En(
          t,
          e,
          D,
          _e(t)
        );
      } else
        En(
          t,
          e,
          a,
          _e(t)
        );
    } catch (I) {
      En(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: I },
        _e()
      );
    } finally {
      H.p = u, f !== null && r.types !== null && (f.types = r.types), N.T = f;
    }
  }
  function zg() {
  }
  function Lc(t, e, l, a) {
    if (t.tag !== 5) throw Error(o(476));
    var n = ar(t).queue;
    lr(
      t,
      n,
      e,
      X,
      l === null ? zg : function() {
        return nr(t), l(a);
      }
    );
  }
  function ar(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: X,
      baseState: X,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ll,
        lastRenderedState: X
      },
      next: null
    };
    var l = {};
    return e.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ll,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function nr(t) {
    var e = ar(t);
    e.next === null && (e = t.alternate.memoizedState), En(
      t,
      e.next.queue,
      {},
      _e()
    );
  }
  function Zc() {
    return ue(jn);
  }
  function ur() {
    return jt().memoizedState;
  }
  function ir() {
    return jt().memoizedState;
  }
  function Ng(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = _e();
          t = Cl(l);
          var a = Al(e, t, l);
          a !== null && (Se(a, e, l), bn(a, e, l)), e = { cache: mc() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function _g(t, e, l) {
    var a = _e();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Hu(t) ? fr(e, l) : (l = ac(t, e, l, a), l !== null && (Se(l, t, a), or(l, e, a)));
  }
  function cr(t, e, l) {
    var a = _e();
    En(t, e, l, a);
  }
  function En(t, e, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Hu(t)) fr(e, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var f = e.lastRenderedState, r = u(f, l);
          if (n.hasEagerState = !0, n.eagerState = r, Te(r, f))
            return yu(t, e, n, 0), _t === null && gu(), !1;
        } catch (m) {
        } finally {
        }
      if (l = ac(t, e, n, a), l !== null)
        return Se(l, t, a), or(l, e, a), !0;
    }
    return !1;
  }
  function Yc(t, e, l, a) {
    if (a = {
      lane: 2,
      revertLane: Sf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Hu(t)) {
      if (e) throw Error(o(479));
    } else
      e = ac(
        t,
        l,
        a,
        2
      ), e !== null && Se(e, t, 2);
  }
  function Hu(t) {
    var e = t.alternate;
    return t === nt || e !== null && e === nt;
  }
  function fr(t, e) {
    Da = _u = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function or(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, mo(t, l);
    }
  }
  var On = {
    readContext: ue,
    use: Uu,
    useCallback: Zt,
    useContext: Zt,
    useEffect: Zt,
    useImperativeHandle: Zt,
    useLayoutEffect: Zt,
    useInsertionEffect: Zt,
    useMemo: Zt,
    useReducer: Zt,
    useRef: Zt,
    useState: Zt,
    useDebugValue: Zt,
    useDeferredValue: Zt,
    useTransition: Zt,
    useSyncExternalStore: Zt,
    useId: Zt,
    useHostTransitionStatus: Zt,
    useFormState: Zt,
    useActionState: Zt,
    useOptimistic: Zt,
    useMemoCache: Zt,
    useCacheRefresh: Zt
  };
  On.useEffectEvent = Zt;
  var sr = {
    readContext: ue,
    use: Uu,
    useCallback: function(t, e) {
      return oe().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: ue,
    useEffect: Ks,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, xu(
        4194308,
        4,
        Ws.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return xu(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      xu(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = oe();
      e = e === void 0 ? null : e;
      var a = t();
      if (ea) {
        hl(!0);
        try {
          t();
        } finally {
          hl(!1);
        }
      }
      return l.memoizedState = [a, e], a;
    },
    useReducer: function(t, e, l) {
      var a = oe();
      if (l !== void 0) {
        var n = l(e);
        if (ea) {
          hl(!0);
          try {
            l(e);
          } finally {
            hl(!1);
          }
        }
      } else n = e;
      return a.memoizedState = a.baseState = n, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: n
      }, a.queue = t, t = t.dispatch = _g.bind(
        null,
        nt,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var e = oe();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Ic(t);
      var e = t.queue, l = cr.bind(null, nt, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: Hc,
    useDeferredValue: function(t, e) {
      var l = oe();
      return Gc(l, t, e);
    },
    useTransition: function() {
      var t = Ic(!1);
      return t = lr.bind(
        null,
        nt,
        t.queue,
        !0,
        !1
      ), oe().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var a = nt, n = oe();
      if (ht) {
        if (l === void 0)
          throw Error(o(407));
        l = l();
      } else {
        if (l = e(), _t === null)
          throw Error(o(349));
        (st & 127) !== 0 || Rs(a, e, l);
      }
      n.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return n.queue = u, Ks(Is.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, Ua(
        9,
        { destroy: void 0 },
        Us.bind(
          null,
          a,
          u,
          l,
          e
        ),
        null
      ), l;
    },
    useId: function() {
      var t = oe(), e = _t.identifierPrefix;
      if (ht) {
        var l = Qe, a = Ve;
        l = (a & ~(1 << 32 - Ae(a) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = Du++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = Ag++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Zc,
    useFormState: js,
    useActionState: js,
    useOptimistic: function(t) {
      var e = oe();
      e.memoizedState = e.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = l, e = Yc.bind(
        null,
        nt,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: Dc,
    useCacheRefresh: function() {
      return oe().memoizedState = Ng.bind(
        null,
        nt
      );
    },
    useEffectEvent: function(t) {
      var e = oe(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((bt & 2) !== 0)
          throw Error(o(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, wc = {
    readContext: ue,
    use: Uu,
    useCallback: Ps,
    useContext: ue,
    useEffect: Bc,
    useImperativeHandle: $s,
    useInsertionEffect: Js,
    useLayoutEffect: Fs,
    useMemo: tr,
    useReducer: Iu,
    useRef: Xs,
    useState: function() {
      return Iu(ll);
    },
    useDebugValue: Hc,
    useDeferredValue: function(t, e) {
      var l = jt();
      return er(
        l,
        Et.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Iu(ll)[0], e = jt().memoizedState;
      return [
        typeof t == "boolean" ? t : Mn(t),
        e
      ];
    },
    useSyncExternalStore: Ds,
    useId: ur,
    useHostTransitionStatus: Zc,
    useFormState: qs,
    useActionState: qs,
    useOptimistic: function(t, e) {
      var l = jt();
      return Hs(l, Et, t, e);
    },
    useMemoCache: Dc,
    useCacheRefresh: ir
  };
  wc.useEffectEvent = ks;
  var rr = {
    readContext: ue,
    use: Uu,
    useCallback: Ps,
    useContext: ue,
    useEffect: Bc,
    useImperativeHandle: $s,
    useInsertionEffect: Js,
    useLayoutEffect: Fs,
    useMemo: tr,
    useReducer: Uc,
    useRef: Xs,
    useState: function() {
      return Uc(ll);
    },
    useDebugValue: Hc,
    useDeferredValue: function(t, e) {
      var l = jt();
      return Et === null ? Gc(l, t, e) : er(
        l,
        Et.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Uc(ll)[0], e = jt().memoizedState;
      return [
        typeof t == "boolean" ? t : Mn(t),
        e
      ];
    },
    useSyncExternalStore: Ds,
    useId: ur,
    useHostTransitionStatus: Zc,
    useFormState: Qs,
    useActionState: Qs,
    useOptimistic: function(t, e) {
      var l = jt();
      return Et !== null ? Hs(l, Et, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: Dc,
    useCacheRefresh: ir
  };
  rr.useEffectEvent = ks;
  function jc(t, e, l, a) {
    e = t.memoizedState, l = l(a, e), l = l == null ? e : M({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var qc = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var a = _e(), n = Cl(a);
      n.payload = e, l != null && (n.callback = l), e = Al(t, n, a), e !== null && (Se(e, t, a), bn(e, t, a));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var a = _e(), n = Cl(a);
      n.tag = 1, n.payload = e, l != null && (n.callback = l), e = Al(t, n, a), e !== null && (Se(e, t, a), bn(e, t, a));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = _e(), a = Cl(l);
      a.tag = 2, e != null && (a.callback = e), e = Al(t, a, l), e !== null && (Se(e, t, l), bn(e, t, l));
    }
  };
  function dr(t, e, l, a, n, u, f) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, f) : e.prototype && e.prototype.isPureReactComponent ? !dn(l, a) || !dn(n, u) : !0;
  }
  function hr(t, e, l, a) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, a), e.state !== t && qc.enqueueReplaceState(e, e.state, null);
  }
  function la(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var a in e)
        a !== "ref" && (l[a] = e[a]);
    }
    if (t = t.defaultProps) {
      l === e && (l = M({}, l));
      for (var n in t)
        l[n] === void 0 && (l[n] = t[n]);
    }
    return l;
  }
  function mr(t) {
    mu(t);
  }
  function gr(t) {
    console.error(t);
  }
  function yr(t) {
    mu(t);
  }
  function Gu(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function vr(t, e, l) {
    try {
      var a = t.onCaughtError;
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Vc(t, e, l) {
    return l = Cl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Gu(t, e);
    }, l;
  }
  function pr(t) {
    return t = Cl(t), t.tag = 3, t;
  }
  function Sr(t, e, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        vr(e, l, a);
      };
    }
    var f = l.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (t.callback = function() {
      vr(e, l, a), typeof n != "function" && (Nl === null ? Nl = /* @__PURE__ */ new Set([this]) : Nl.add(this));
      var r = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: r !== null ? r : ""
      });
    });
  }
  function Dg(t, e, l, a, n) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (e = l.alternate, e !== null && Ma(
        e,
        l,
        n,
        !0
      ), l = Ee.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Ge === null ? Ju() : l.alternate === null && Yt === 0 && (Yt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === Mu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), yf(t, a, n)), !1;
          case 22:
            return l.flags |= 65536, a === Mu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), yf(t, a, n)), !1;
        }
        throw Error(o(435, l.tag));
      }
      return yf(t, a, n), Ju(), !1;
    }
    if (ht)
      return e = Ee.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = n, a !== oc && (t = Error(o(422), { cause: a }), gn(Ie(t, l)))) : (a !== oc && (e = Error(o(423), {
        cause: a
      }), gn(
        Ie(e, l)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = Ie(a, l), n = Vc(
        t.stateNode,
        a,
        n
      ), bc(t, n), Yt !== 4 && (Yt = 2)), !1;
    var u = Error(o(520), { cause: a });
    if (u = Ie(u, l), xn === null ? xn = [u] : xn.push(u), Yt !== 4 && (Yt = 2), e === null) return !0;
    a = Ie(a, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = n & -n, l.lanes |= t, t = Vc(l.stateNode, a, t), bc(l, t), !1;
        case 1:
          if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Nl === null || !Nl.has(u))))
            return l.flags |= 65536, n &= -n, l.lanes |= n, n = pr(n), Sr(
              n,
              t,
              l,
              a
            ), bc(l, n), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Qc = Error(o(461)), kt = !1;
  function ie(t, e, l, a) {
    e.child = t === null ? Ts(e, null, l, a) : ta(
      e,
      t.child,
      l,
      a
    );
  }
  function br(t, e, l, a, n) {
    l = l.render;
    var u = e.ref;
    if ("ref" in a) {
      var f = {};
      for (var r in a)
        r !== "ref" && (f[r] = a[r]);
    } else f = a;
    return Fl(e), a = Oc(
      t,
      e,
      l,
      f,
      u,
      n
    ), r = zc(), t !== null && !kt ? (Nc(t, e, n), al(t, e, n)) : (ht && r && cc(e), e.flags |= 1, ie(t, e, a, n), e.child);
  }
  function Cr(t, e, l, a, n) {
    if (t === null) {
      var u = l.type;
      return typeof u == "function" && !nc(u) && u.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = u, Ar(
        t,
        e,
        u,
        a,
        n
      )) : (t = pu(
        l.type,
        null,
        a,
        e,
        e.mode,
        n
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !Pc(t, n)) {
      var f = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : dn, l(f, a) && t.ref === e.ref)
        return al(t, e, n);
    }
    return e.flags |= 1, t = We(u, a), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Ar(t, e, l, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (dn(u, a) && t.ref === e.ref)
        if (kt = !1, e.pendingProps = a = u, Pc(t, n))
          (t.flags & 131072) !== 0 && (kt = !0);
        else
          return e.lanes = t.lanes, al(t, e, n);
    }
    return Xc(
      t,
      e,
      l,
      a,
      n
    );
  }
  function Tr(t, e, l, a) {
    var n = a.children, u = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | l : l, t !== null) {
          for (a = e.child = t.child, n = 0; a !== null; )
            n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~u;
        } else a = 0, e.child = null;
        return Mr(
          t,
          e,
          u,
          l,
          a
        );
      }
      if ((l & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Au(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? Os(e, u) : Ac(), zs(e);
      else
        return a = e.lanes = 536870912, Mr(
          t,
          e,
          u !== null ? u.baseLanes | l : l,
          l,
          a
        );
    } else
      u !== null ? (Au(e, u.cachePool), Os(e, u), Ml(), e.memoizedState = null) : (t !== null && Au(e, null), Ac(), Ml());
    return ie(t, e, n, l), e.child;
  }
  function zn(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Mr(t, e, l, a, n) {
    var u = yc();
    return u = u === null ? null : { parent: Xt._currentValue, pool: u }, e.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, t !== null && Au(e, null), Ac(), zs(e), t !== null && Ma(t, e, a, !0), e.childLanes = n, null;
  }
  function Lu(t, e) {
    return e = Yu(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Er(t, e, l) {
    return ta(e, t.child, null, l), t = Lu(e, e.pendingProps), t.flags |= 2, Oe(e), e.memoizedState = null, t;
  }
  function Rg(t, e, l) {
    var a = e.pendingProps, n = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (ht) {
        if (a.mode === "hidden")
          return t = Lu(e, a), e.lanes = 536870912, zn(null, t);
        if (Mc(e), (t = It) ? (t = Gd(
          t,
          He
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: yl !== null ? { id: Ve, overflow: Qe } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = fs(t), l.return = e, e.child = l, ne = e, It = null)) : t = null, t === null) throw pl(e);
        return e.lanes = 536870912, null;
      }
      return Lu(e, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var f = u.dehydrated;
      if (Mc(e), n)
        if (e.flags & 256)
          e.flags &= -257, e = Er(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(o(558));
      else if (kt || Ma(t, e, l, !1), n = (l & t.childLanes) !== 0, kt || n) {
        if (a = _t, a !== null && (f = go(a, l), f !== 0 && f !== u.retryLane))
          throw u.retryLane = f, Xl(t, f), Se(a, t, f), Qc;
        Ju(), e = Er(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, It = Le(f.nextSibling), ne = e, ht = !0, vl = null, He = !1, t !== null && rs(e, t), e = Lu(e, a), e.flags |= 4096;
      return e;
    }
    return t = We(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Zu(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(o(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function Xc(t, e, l, a, n) {
    return Fl(e), l = Oc(
      t,
      e,
      l,
      a,
      void 0,
      n
    ), a = zc(), t !== null && !kt ? (Nc(t, e, n), al(t, e, n)) : (ht && a && cc(e), e.flags |= 1, ie(t, e, l, n), e.child);
  }
  function Or(t, e, l, a, n, u) {
    return Fl(e), e.updateQueue = null, l = _s(
      e,
      a,
      l,
      n
    ), Ns(t), a = zc(), t !== null && !kt ? (Nc(t, e, u), al(t, e, u)) : (ht && a && cc(e), e.flags |= 1, ie(t, e, l, u), e.child);
  }
  function zr(t, e, l, a, n) {
    if (Fl(e), e.stateNode === null) {
      var u = ba, f = l.contextType;
      typeof f == "object" && f !== null && (u = ue(f)), u = new l(a, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = qc, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = a, u.state = e.memoizedState, u.refs = {}, pc(e), f = l.contextType, u.context = typeof f == "object" && f !== null ? ue(f) : ba, u.state = e.memoizedState, f = l.getDerivedStateFromProps, typeof f == "function" && (jc(
        e,
        l,
        f,
        a
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (f = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), f !== u.state && qc.enqueueReplaceState(u, u.state, null), An(e, a, u, n), Cn(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = e.stateNode;
      var r = e.memoizedProps, m = la(l, r);
      u.props = m;
      var T = u.context, D = l.contextType;
      f = ba, typeof D == "object" && D !== null && (f = ue(D));
      var I = l.getDerivedStateFromProps;
      D = typeof I == "function" || typeof u.getSnapshotBeforeUpdate == "function", r = e.pendingProps !== r, D || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (r || T !== f) && hr(
        e,
        u,
        a,
        f
      ), bl = !1;
      var E = e.memoizedState;
      u.state = E, An(e, a, u, n), Cn(), T = e.memoizedState, r || E !== T || bl ? (typeof I == "function" && (jc(
        e,
        l,
        I,
        a
      ), T = e.memoizedState), (m = bl || dr(
        e,
        l,
        m,
        a,
        E,
        T,
        f
      )) ? (D || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = T), u.props = a, u.state = T, u.context = f, a = m) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      u = e.stateNode, Sc(t, e), f = e.memoizedProps, D = la(l, f), u.props = D, I = e.pendingProps, E = u.context, T = l.contextType, m = ba, typeof T == "object" && T !== null && (m = ue(T)), r = l.getDerivedStateFromProps, (T = typeof r == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f !== I || E !== m) && hr(
        e,
        u,
        a,
        m
      ), bl = !1, E = e.memoizedState, u.state = E, An(e, a, u, n), Cn();
      var z = e.memoizedState;
      f !== I || E !== z || bl || t !== null && t.dependencies !== null && bu(t.dependencies) ? (typeof r == "function" && (jc(
        e,
        l,
        r,
        a
      ), z = e.memoizedState), (D = bl || dr(
        e,
        l,
        D,
        a,
        E,
        z,
        m
      ) || t !== null && t.dependencies !== null && bu(t.dependencies)) ? (T || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, z, m), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        z,
        m
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || f === t.memoizedProps && E === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || f === t.memoizedProps && E === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = z), u.props = a, u.state = z, u.context = m, a = D) : (typeof u.componentDidUpdate != "function" || f === t.memoizedProps && E === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || f === t.memoizedProps && E === t.memoizedState || (e.flags |= 1024), a = !1);
    }
    return u = a, Zu(t, e), a = (e.flags & 128) !== 0, u || a ? (u = e.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && a ? (e.child = ta(
      e,
      t.child,
      null,
      n
    ), e.child = ta(
      e,
      null,
      l,
      n
    )) : ie(t, e, l, n), e.memoizedState = u.state, t = e.child) : t = al(
      t,
      e,
      n
    ), t;
  }
  function Nr(t, e, l, a) {
    return kl(), e.flags |= 256, ie(t, e, l, a), e.child;
  }
  var Kc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function kc(t) {
    return { baseLanes: t, cachePool: vs() };
  }
  function Jc(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= Ne), t;
  }
  function _r(t, e, l) {
    var a = e.pendingProps, n = !1, u = (e.flags & 128) !== 0, f;
    if ((f = u) || (f = t !== null && t.memoizedState === null ? !1 : (wt.current & 2) !== 0), f && (n = !0, e.flags &= -129), f = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (ht) {
        if (n ? Tl(e) : Ml(), (t = It) ? (t = Gd(
          t,
          He
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: yl !== null ? { id: Ve, overflow: Qe } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = fs(t), l.return = e, e.child = l, ne = e, It = null)) : t = null, t === null) throw pl(e);
        return Uf(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      var r = a.children;
      return a = a.fallback, n ? (Ml(), n = e.mode, r = Yu(
        { mode: "hidden", children: r },
        n
      ), a = Kl(
        a,
        n,
        l,
        null
      ), r.return = e, a.return = e, r.sibling = a, e.child = r, a = e.child, a.memoizedState = kc(l), a.childLanes = Jc(
        t,
        f,
        l
      ), e.memoizedState = Kc, zn(null, a)) : (Tl(e), Fc(e, r));
    }
    var m = t.memoizedState;
    if (m !== null && (r = m.dehydrated, r !== null)) {
      if (u)
        e.flags & 256 ? (Tl(e), e.flags &= -257, e = Wc(
          t,
          e,
          l
        )) : e.memoizedState !== null ? (Ml(), e.child = t.child, e.flags |= 128, e = null) : (Ml(), r = a.fallback, n = e.mode, a = Yu(
          { mode: "visible", children: a.children },
          n
        ), r = Kl(
          r,
          n,
          l,
          null
        ), r.flags |= 2, a.return = e, r.return = e, a.sibling = r, e.child = a, ta(
          e,
          t.child,
          null,
          l
        ), a = e.child, a.memoizedState = kc(l), a.childLanes = Jc(
          t,
          f,
          l
        ), e.memoizedState = Kc, e = zn(null, a));
      else if (Tl(e), Uf(r)) {
        if (f = r.nextSibling && r.nextSibling.dataset, f) var T = f.dgst;
        f = T, a = Error(o(419)), a.stack = "", a.digest = f, gn({ value: a, source: null, stack: null }), e = Wc(
          t,
          e,
          l
        );
      } else if (kt || Ma(t, e, l, !1), f = (l & t.childLanes) !== 0, kt || f) {
        if (f = _t, f !== null && (a = go(f, l), a !== 0 && a !== m.retryLane))
          throw m.retryLane = a, Xl(t, a), Se(f, t, a), Qc;
        Rf(r) || Ju(), e = Wc(
          t,
          e,
          l
        );
      } else
        Rf(r) ? (e.flags |= 192, e.child = t.child, e = null) : (t = m.treeContext, It = Le(
          r.nextSibling
        ), ne = e, ht = !0, vl = null, He = !1, t !== null && rs(e, t), e = Fc(
          e,
          a.children
        ), e.flags |= 4096);
      return e;
    }
    return n ? (Ml(), r = a.fallback, n = e.mode, m = t.child, T = m.sibling, a = We(m, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = m.subtreeFlags & 65011712, T !== null ? r = We(
      T,
      r
    ) : (r = Kl(
      r,
      n,
      l,
      null
    ), r.flags |= 2), r.return = e, a.return = e, a.sibling = r, e.child = a, zn(null, a), a = e.child, r = t.child.memoizedState, r === null ? r = kc(l) : (n = r.cachePool, n !== null ? (m = Xt._currentValue, n = n.parent !== m ? { parent: m, pool: m } : n) : n = vs(), r = {
      baseLanes: r.baseLanes | l,
      cachePool: n
    }), a.memoizedState = r, a.childLanes = Jc(
      t,
      f,
      l
    ), e.memoizedState = Kc, zn(t.child, a)) : (Tl(e), l = t.child, t = l.sibling, l = We(l, {
      mode: "visible",
      children: a.children
    }), l.return = e, l.sibling = null, t !== null && (f = e.deletions, f === null ? (e.deletions = [t], e.flags |= 16) : f.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function Fc(t, e) {
    return e = Yu(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Yu(t, e) {
    return t = Me(22, t, null, e), t.lanes = 0, t;
  }
  function Wc(t, e, l) {
    return ta(e, t.child, null, l), t = Fc(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Dr(t, e, l) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e), dc(t.return, e, l);
  }
  function $c(t, e, l, a, n, u) {
    var f = t.memoizedState;
    f === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: l,
      tailMode: n,
      treeForkCount: u
    } : (f.isBackwards = e, f.rendering = null, f.renderingStartTime = 0, f.last = a, f.tail = l, f.tailMode = n, f.treeForkCount = u);
  }
  function Rr(t, e, l) {
    var a = e.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var f = wt.current, r = (f & 2) !== 0;
    if (r ? (f = f & 1 | 2, e.flags |= 128) : f &= 1, G(wt, f), ie(t, e, a, l), a = ht ? mn : 0, !r && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Dr(t, l, e);
        else if (t.tag === 19)
          Dr(t, l, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (n) {
      case "forwards":
        for (l = e.child, n = null; l !== null; )
          t = l.alternate, t !== null && Nu(t) === null && (n = l), l = l.sibling;
        l = n, l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null), $c(
          e,
          !1,
          n,
          l,
          u,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, n = e.child, e.child = null; n !== null; ) {
          if (t = n.alternate, t !== null && Nu(t) === null) {
            e.child = n;
            break;
          }
          t = n.sibling, n.sibling = l, l = n, n = t;
        }
        $c(
          e,
          !0,
          l,
          null,
          u,
          a
        );
        break;
      case "together":
        $c(
          e,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function al(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), zl |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (Ma(
          t,
          e,
          l,
          !1
        ), (l & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(o(153));
    if (e.child !== null) {
      for (t = e.child, l = We(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = We(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function Pc(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && bu(t)));
  }
  function Ug(t, e, l) {
    switch (e.tag) {
      case 3:
        Ct(e, e.stateNode.containerInfo), Sl(e, Xt, t.memoizedState.cache), kl();
        break;
      case 27:
      case 5:
        Ft(e);
        break;
      case 4:
        Ct(e, e.stateNode.containerInfo);
        break;
      case 10:
        Sl(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, Mc(e), null;
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (Tl(e), e.flags |= 128, null) : (l & e.child.childLanes) !== 0 ? _r(t, e, l) : (Tl(e), t = al(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        Tl(e);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (a = (l & e.childLanes) !== 0, a || (Ma(
          t,
          e,
          l,
          !1
        ), a = (l & e.childLanes) !== 0), n) {
          if (a)
            return Rr(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (n = e.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), G(wt, wt.current), a) break;
        return null;
      case 22:
        return e.lanes = 0, Tr(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        Sl(e, Xt, t.memoizedState.cache);
    }
    return al(t, e, l);
  }
  function Ur(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        kt = !0;
      else {
        if (!Pc(t, l) && (e.flags & 128) === 0)
          return kt = !1, Ug(
            t,
            e,
            l
          );
        kt = (t.flags & 131072) !== 0;
      }
    else
      kt = !1, ht && (e.flags & 1048576) !== 0 && ss(e, mn, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (t = $l(e.elementType), e.type = t, typeof t == "function")
            nc(t) ? (a = la(t, a), e.tag = 1, e = zr(
              null,
              e,
              t,
              a,
              l
            )) : (e.tag = 0, e = Xc(
              null,
              e,
              t,
              a,
              l
            ));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === F) {
                e.tag = 11, e = br(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === k) {
                e.tag = 14, e = Cr(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              }
            }
            throw e = At(t) || t, Error(o(306, e, ""));
          }
        }
        return e;
      case 0:
        return Xc(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 1:
        return a = e.type, n = la(
          a,
          e.pendingProps
        ), zr(
          t,
          e,
          a,
          n,
          l
        );
      case 3:
        t: {
          if (Ct(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(o(387));
          a = e.pendingProps;
          var u = e.memoizedState;
          n = u.element, Sc(t, e), An(e, a, null, l);
          var f = e.memoizedState;
          if (a = f.cache, Sl(e, Xt, a), a !== u.cache && hc(
            e,
            [Xt],
            l,
            !0
          ), Cn(), a = f.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: f.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = Nr(
                t,
                e,
                a,
                l
              );
              break t;
            } else if (a !== n) {
              n = Ie(
                Error(o(424)),
                e
              ), gn(n), e = Nr(
                t,
                e,
                a,
                l
              );
              break t;
            } else {
              switch (t = e.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (It = Le(t.firstChild), ne = e, ht = !0, vl = null, He = !0, l = Ts(
                e,
                null,
                a,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
            }
          else {
            if (kl(), a === n) {
              e = al(
                t,
                e,
                l
              );
              break t;
            }
            ie(t, e, a, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return Zu(t, e), t === null ? (l = qd(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : ht || (l = e.type, t = e.pendingProps, a = li(
          Z.current
        ).createElement(l), a[ae] = e, a[he] = t, ce(a, l, t), te(a), e.stateNode = a) : e.memoizedState = qd(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Ft(e), t === null && ht && (a = e.stateNode = Yd(
          e.type,
          e.pendingProps,
          Z.current
        ), ne = e, He = !0, n = It, Ul(e.type) ? (If = n, It = Le(a.firstChild)) : It = n), ie(
          t,
          e,
          e.pendingProps.children,
          l
        ), Zu(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && ht && ((n = a = It) && (a = fy(
          a,
          e.type,
          e.pendingProps,
          He
        ), a !== null ? (e.stateNode = a, ne = e, It = Le(a.firstChild), He = !1, n = !0) : n = !1), n || pl(e)), Ft(e), n = e.type, u = e.pendingProps, f = t !== null ? t.memoizedProps : null, a = u.children, Nf(n, u) ? a = null : f !== null && Nf(n, f) && (e.flags |= 32), e.memoizedState !== null && (n = Oc(
          t,
          e,
          Tg,
          null,
          null,
          l
        ), jn._currentValue = n), Zu(t, e), ie(t, e, a, l), e.child;
      case 6:
        return t === null && ht && ((t = l = It) && (l = oy(
          l,
          e.pendingProps,
          He
        ), l !== null ? (e.stateNode = l, ne = e, It = null, t = !0) : t = !1), t || pl(e)), null;
      case 13:
        return _r(t, e, l);
      case 4:
        return Ct(
          e,
          e.stateNode.containerInfo
        ), a = e.pendingProps, t === null ? e.child = ta(
          e,
          null,
          a,
          l
        ) : ie(t, e, a, l), e.child;
      case 11:
        return br(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return ie(
          t,
          e,
          e.pendingProps,
          l
        ), e.child;
      case 8:
        return ie(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 12:
        return ie(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 10:
        return a = e.pendingProps, Sl(e, e.type, a.value), ie(t, e, a.children, l), e.child;
      case 9:
        return n = e.type._context, a = e.pendingProps.children, Fl(e), n = ue(n), a = a(n), e.flags |= 1, ie(t, e, a, l), e.child;
      case 14:
        return Cr(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 15:
        return Ar(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 19:
        return Rr(t, e, l);
      case 31:
        return Rg(t, e, l);
      case 22:
        return Tr(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return Fl(e), a = ue(Xt), t === null ? (n = yc(), n === null && (n = _t, u = mc(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), e.memoizedState = { parent: a, cache: n }, pc(e), Sl(e, Xt, n)) : ((t.lanes & l) !== 0 && (Sc(t, e), An(e, null, null, l), Cn()), n = t.memoizedState, u = e.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, e.memoizedState = n, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n), Sl(e, Xt, a)) : (a = u.cache, Sl(e, Xt, a), a !== n.cache && hc(
          e,
          [Xt],
          l,
          !0
        ))), ie(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(o(156, e.tag));
  }
  function nl(t) {
    t.flags |= 4;
  }
  function tf(t, e, l, a, n) {
    if ((e = (t.mode & 32) !== 0) && (e = !1), e) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (ud()) t.flags |= 8192;
        else
          throw Pl = Mu, vc;
    } else t.flags &= -16777217;
  }
  function Ir(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !kd(e))
      if (ud()) t.flags |= 8192;
      else
        throw Pl = Mu, vc;
  }
  function wu(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? ro() : 536870912, t.lanes |= e, Ha |= e);
  }
  function Nn(t, e) {
    if (!ht)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var l = null; e !== null; )
            e.alternate !== null && (l = e), e = e.sibling;
          l === null ? t.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = t.tail;
          for (var a = null; l !== null; )
            l.alternate !== null && (a = l), l = l.sibling;
          a === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
      }
  }
  function xt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, l = 0, a = 0;
    if (e)
      for (var n = t.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = t, n = n.sibling;
    else
      for (n = t.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = t, n = n.sibling;
    return t.subtreeFlags |= a, t.childLanes = l, e;
  }
  function Ig(t, e, l) {
    var a = e.pendingProps;
    switch (fc(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return xt(e), null;
      case 1:
        return xt(e), null;
      case 3:
        return l = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), tl(Xt), et(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (Ta(e) ? nl(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, sc())), xt(e), null;
      case 26:
        var n = e.type, u = e.memoizedState;
        return t === null ? (nl(e), u !== null ? (xt(e), Ir(e, u)) : (xt(e), tf(
          e,
          n,
          null,
          a,
          l
        ))) : u ? u !== t.memoizedState ? (nl(e), xt(e), Ir(e, u)) : (xt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && nl(e), xt(e), tf(
          e,
          n,
          t,
          a,
          l
        )), null;
      case 27:
        if (dt(e), l = Z.current, n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && nl(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(o(166));
            return xt(e), null;
          }
          t = w.current, Ta(e) ? ds(e) : (t = Yd(n, a, l), e.stateNode = t, nl(e));
        }
        return xt(e), null;
      case 5:
        if (dt(e), n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && nl(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(o(166));
            return xt(e), null;
          }
          if (u = w.current, Ta(e))
            ds(e);
          else {
            var f = li(
              Z.current
            );
            switch (u) {
              case 1:
                u = f.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                u = f.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    u = f.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    u = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    u = f.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? f.createElement("select", {
                      is: a.is
                    }) : f.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? f.createElement(n, { is: a.is }) : f.createElement(n);
                }
            }
            u[ae] = e, u[he] = a;
            t: for (f = e.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6)
                u.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                f.child.return = f, f = f.child;
                continue;
              }
              if (f === e) break t;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === e)
                  break t;
                f = f.return;
              }
              f.sibling.return = f.return, f = f.sibling;
            }
            e.stateNode = u;
            t: switch (ce(u, n, a), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break t;
              case "img":
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && nl(e);
          }
        }
        return xt(e), tf(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          l
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== a && nl(e);
        else {
          if (typeof a != "string" && e.stateNode === null)
            throw Error(o(166));
          if (t = Z.current, Ta(e)) {
            if (t = e.stateNode, l = e.memoizedProps, a = null, n = ne, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[ae] = e, t = !!(t.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || _d(t.nodeValue, l)), t || pl(e, !0);
          } else
            t = li(t).createTextNode(
              a
            ), t[ae] = e, e.stateNode = t;
        }
        return xt(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (a = Ta(e), l !== null) {
            if (t === null) {
              if (!a) throw Error(o(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(557));
              t[ae] = e;
            } else
              kl(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            xt(e), t = !1;
          } else
            l = sc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (Oe(e), e) : (Oe(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(o(558));
        }
        return xt(e), null;
      case 13:
        if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = Ta(e), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(o(318));
              if (n = e.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(o(317));
              n[ae] = e;
            } else
              kl(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            xt(e), n = !1;
          } else
            n = sc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return e.flags & 256 ? (Oe(e), e) : (Oe(e), null);
        }
        return Oe(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = a !== null, t = t !== null && t.memoizedState !== null, l && (a = e.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), wu(e, e.updateQueue), xt(e), null);
      case 4:
        return et(), t === null && Tf(e.stateNode.containerInfo), xt(e), null;
      case 10:
        return tl(e.type), xt(e), null;
      case 19:
        if (_(wt), a = e.memoizedState, a === null) return xt(e), null;
        if (n = (e.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) Nn(a, !1);
          else {
            if (Yt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = Nu(t), u !== null) {
                  for (e.flags |= 128, Nn(a, !1), t = u.updateQueue, e.updateQueue = t, wu(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    cs(l, t), l = l.sibling;
                  return G(
                    wt,
                    wt.current & 1 | 2
                  ), ht && $e(e, a.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            a.tail !== null && be() > Xu && (e.flags |= 128, n = !0, Nn(a, !1), e.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = Nu(u), t !== null) {
              if (e.flags |= 128, n = !0, t = t.updateQueue, e.updateQueue = t, wu(e, t), Nn(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !ht)
                return xt(e), null;
            } else
              2 * be() - a.renderingStartTime > Xu && l !== 536870912 && (e.flags |= 128, n = !0, Nn(a, !1), e.lanes = 4194304);
          a.isBackwards ? (u.sibling = e.child, e.child = u) : (t = a.last, t !== null ? t.sibling = u : e.child = u, a.last = u);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = be(), t.sibling = null, l = wt.current, G(
          wt,
          n ? l & 1 | 2 : l & 1
        ), ht && $e(e, a.treeForkCount), t) : (xt(e), null);
      case 22:
      case 23:
        return Oe(e), Tc(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (xt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : xt(e), l = e.updateQueue, l !== null && wu(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== l && (e.flags |= 2048), t !== null && _(Wl), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), tl(Xt), xt(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, e.tag));
  }
  function xg(t, e) {
    switch (fc(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return tl(Xt), et(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return dt(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (Oe(e), e.alternate === null)
            throw Error(o(340));
          kl();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (Oe(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(o(340));
          kl();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return _(wt), null;
      case 4:
        return et(), null;
      case 10:
        return tl(e.type), null;
      case 22:
      case 23:
        return Oe(e), Tc(), t !== null && _(Wl), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return tl(Xt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function xr(t, e) {
    switch (fc(e), e.tag) {
      case 3:
        tl(Xt), et();
        break;
      case 26:
      case 27:
      case 5:
        dt(e);
        break;
      case 4:
        et();
        break;
      case 31:
        e.memoizedState !== null && Oe(e);
        break;
      case 13:
        Oe(e);
        break;
      case 19:
        _(wt);
        break;
      case 10:
        tl(e.type);
        break;
      case 22:
      case 23:
        Oe(e), Tc(), t !== null && _(Wl);
        break;
      case 24:
        tl(Xt);
    }
  }
  function _n(t, e) {
    try {
      var l = e.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        l = n;
        do {
          if ((l.tag & t) === t) {
            a = void 0;
            var u = l.create, f = l.inst;
            a = u(), f.destroy = a;
          }
          l = l.next;
        } while (l !== n);
      }
    } catch (r) {
      Mt(e, e.return, r);
    }
  }
  function El(t, e, l) {
    try {
      var a = e.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            var f = a.inst, r = f.destroy;
            if (r !== void 0) {
              f.destroy = void 0, n = e;
              var m = l, T = r;
              try {
                T();
              } catch (D) {
                Mt(
                  n,
                  m,
                  D
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (D) {
      Mt(e, e.return, D);
    }
  }
  function Br(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Es(e, l);
      } catch (a) {
        Mt(t, t.return, a);
      }
    }
  }
  function Hr(t, e, l) {
    l.props = la(
      t.type,
      t.memoizedProps
    ), l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      Mt(t, e, a);
    }
  }
  function Dn(t, e) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof l == "function" ? t.refCleanup = l(a) : l.current = a;
      }
    } catch (n) {
      Mt(t, e, n);
    }
  }
  function Xe(t, e) {
    var l = t.ref, a = t.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          Mt(t, e, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (n) {
          Mt(t, e, n);
        }
      else l.current = null;
  }
  function Gr(t) {
    var e = t.type, l = t.memoizedProps, a = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && a.focus();
          break t;
        case "img":
          l.src ? a.src = l.src : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (n) {
      Mt(t, t.return, n);
    }
  }
  function ef(t, e, l) {
    try {
      var a = t.stateNode;
      ly(a, t.type, l, e), a[he] = e;
    } catch (n) {
      Mt(t, t.return, n);
    }
  }
  function Lr(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Ul(t.type) || t.tag === 4;
  }
  function lf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Lr(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Ul(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function af(t, e, l) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(t, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(t), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = Je));
    else if (a !== 4 && (a === 27 && Ul(t.type) && (l = t.stateNode, e = null), t = t.child, t !== null))
      for (af(t, e, l), t = t.sibling; t !== null; )
        af(t, e, l), t = t.sibling;
  }
  function ju(t, e, l) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, e ? l.insertBefore(t, e) : l.appendChild(t);
    else if (a !== 4 && (a === 27 && Ul(t.type) && (l = t.stateNode), t = t.child, t !== null))
      for (ju(t, e, l), t = t.sibling; t !== null; )
        ju(t, e, l), t = t.sibling;
  }
  function Zr(t) {
    var e = t.stateNode, l = t.memoizedProps;
    try {
      for (var a = t.type, n = e.attributes; n.length; )
        e.removeAttributeNode(n[0]);
      ce(e, a, l), e[ae] = t, e[he] = l;
    } catch (u) {
      Mt(t, t.return, u);
    }
  }
  var ul = !1, Jt = !1, nf = !1, Yr = typeof WeakSet == "function" ? WeakSet : Set, ee = null;
  function Bg(t, e) {
    if (t = t.containerInfo, Of = oi, t = $o(t), Wi(t)) {
      if ("selectionStart" in t)
        var l = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          l = (l = t.ownerDocument) && l.defaultView || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var n = a.anchorOffset, u = a.focusNode;
            a = a.focusOffset;
            try {
              l.nodeType, u.nodeType;
            } catch (J) {
              l = null;
              break t;
            }
            var f = 0, r = -1, m = -1, T = 0, D = 0, I = t, E = null;
            e: for (; ; ) {
              for (var z; I !== l || n !== 0 && I.nodeType !== 3 || (r = f + n), I !== u || a !== 0 && I.nodeType !== 3 || (m = f + a), I.nodeType === 3 && (f += I.nodeValue.length), (z = I.firstChild) !== null; )
                E = I, I = z;
              for (; ; ) {
                if (I === t) break e;
                if (E === l && ++T === n && (r = f), E === u && ++D === a && (m = f), (z = I.nextSibling) !== null) break;
                I = E, E = I.parentNode;
              }
              I = z;
            }
            l = r === -1 || m === -1 ? null : { start: r, end: m };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (zf = { focusedElem: t, selectionRange: l }, oi = !1, ee = e; ee !== null; )
      if (e = ee, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = e, ee = t;
      else
        for (; ee !== null; ) {
          switch (e = ee, u = e.alternate, t = e.flags, e.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = e.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (l = 0; l < t.length; l++)
                  n = t[l], n.ref.impl = n.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                t = void 0, l = e, n = u.memoizedProps, u = u.memoizedState, a = l.stateNode;
                try {
                  var q = la(
                    l.type,
                    n
                  );
                  t = a.getSnapshotBeforeUpdate(
                    q,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch (J) {
                  Mt(
                    l,
                    l.return,
                    J
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = e.stateNode.containerInfo, l = t.nodeType, l === 9)
                  Df(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Df(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(o(163));
          }
          if (t = e.sibling, t !== null) {
            t.return = e.return, ee = t;
            break;
          }
          ee = e.return;
        }
  }
  function wr(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        cl(t, l), a & 4 && _n(5, l);
        break;
      case 1:
        if (cl(t, l), a & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (f) {
              Mt(l, l.return, f);
            }
          else {
            var n = la(
              l.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                n,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (f) {
              Mt(
                l,
                l.return,
                f
              );
            }
          }
        a & 64 && Br(l), a & 512 && Dn(l, l.return);
        break;
      case 3:
        if (cl(t, l), a & 64 && (t = l.updateQueue, t !== null)) {
          if (e = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                e = l.child.stateNode;
                break;
              case 1:
                e = l.child.stateNode;
            }
          try {
            Es(t, e);
          } catch (f) {
            Mt(l, l.return, f);
          }
        }
        break;
      case 27:
        e === null && a & 4 && Zr(l);
      case 26:
      case 5:
        cl(t, l), e === null && a & 4 && Gr(l), a & 512 && Dn(l, l.return);
        break;
      case 12:
        cl(t, l);
        break;
      case 31:
        cl(t, l), a & 4 && Vr(t, l);
        break;
      case 13:
        cl(t, l), a & 4 && Qr(t, l), a & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = Vg.bind(
          null,
          l
        ), sy(t, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || ul, !a) {
          e = e !== null && e.memoizedState !== null || Jt, n = ul;
          var u = Jt;
          ul = a, (Jt = e) && !u ? fl(
            t,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : cl(t, l), ul = n, Jt = u;
        }
        break;
      case 30:
        break;
      default:
        cl(t, l);
    }
  }
  function jr(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, jr(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && xi(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Ht = null, ge = !1;
  function il(t, e, l) {
    for (l = l.child; l !== null; )
      qr(t, e, l), l = l.sibling;
  }
  function qr(t, e, l) {
    if (Ce && typeof Ce.onCommitFiberUnmount == "function")
      try {
        Ce.onCommitFiberUnmount(Pa, l);
      } catch (u) {
      }
    switch (l.tag) {
      case 26:
        Jt || Xe(l, e), il(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Jt || Xe(l, e);
        var a = Ht, n = ge;
        Ul(l.type) && (Ht = l.stateNode, ge = !1), il(
          t,
          e,
          l
        ), Zn(l.stateNode), Ht = a, ge = n;
        break;
      case 5:
        Jt || Xe(l, e);
      case 6:
        if (a = Ht, n = ge, Ht = null, il(
          t,
          e,
          l
        ), Ht = a, ge = n, Ht !== null)
          if (ge)
            try {
              (Ht.nodeType === 9 ? Ht.body : Ht.nodeName === "HTML" ? Ht.ownerDocument.body : Ht).removeChild(l.stateNode);
            } catch (u) {
              Mt(
                l,
                e,
                u
              );
            }
          else
            try {
              Ht.removeChild(l.stateNode);
            } catch (u) {
              Mt(
                l,
                e,
                u
              );
            }
        break;
      case 18:
        Ht !== null && (ge ? (t = Ht, Bd(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), Va(t)) : Bd(Ht, l.stateNode));
        break;
      case 4:
        a = Ht, n = ge, Ht = l.stateNode.containerInfo, ge = !0, il(
          t,
          e,
          l
        ), Ht = a, ge = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        El(2, l, e), Jt || El(4, l, e), il(
          t,
          e,
          l
        );
        break;
      case 1:
        Jt || (Xe(l, e), a = l.stateNode, typeof a.componentWillUnmount == "function" && Hr(
          l,
          e,
          a
        )), il(
          t,
          e,
          l
        );
        break;
      case 21:
        il(
          t,
          e,
          l
        );
        break;
      case 22:
        Jt = (a = Jt) || l.memoizedState !== null, il(
          t,
          e,
          l
        ), Jt = a;
        break;
      default:
        il(
          t,
          e,
          l
        );
    }
  }
  function Vr(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Va(t);
      } catch (l) {
        Mt(e, e.return, l);
      }
    }
  }
  function Qr(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Va(t);
      } catch (l) {
        Mt(e, e.return, l);
      }
  }
  function Hg(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new Yr()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Yr()), e;
      default:
        throw Error(o(435, t.tag));
    }
  }
  function qu(t, e) {
    var l = Hg(t);
    e.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var n = Qg.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function ye(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a], u = t, f = e, r = f;
        t: for (; r !== null; ) {
          switch (r.tag) {
            case 27:
              if (Ul(r.type)) {
                Ht = r.stateNode, ge = !1;
                break t;
              }
              break;
            case 5:
              Ht = r.stateNode, ge = !1;
              break t;
            case 3:
            case 4:
              Ht = r.stateNode.containerInfo, ge = !0;
              break t;
          }
          r = r.return;
        }
        if (Ht === null) throw Error(o(160));
        qr(u, f, n), Ht = null, ge = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        Xr(e, t), e = e.sibling;
  }
  var we = null;
  function Xr(t, e) {
    var l = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ye(e, t), ve(t), a & 4 && (El(3, t, t.return), _n(3, t), El(5, t, t.return));
        break;
      case 1:
        ye(e, t), ve(t), a & 512 && (Jt || l === null || Xe(l, l.return)), a & 64 && ul && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
        break;
      case 26:
        var n = we;
        if (ye(e, t), ve(t), a & 512 && (Jt || l === null || Xe(l, l.return)), a & 4) {
          var u = l !== null ? l.memoizedState : null;
          if (a = t.memoizedState, l === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, l = t.memoizedProps, n = n.ownerDocument || n;
                  e: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[ln] || u[ae] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), ce(u, a, l), u[ae] = t, te(u), a = u;
                      break t;
                    case "link":
                      var f = Xd(
                        "link",
                        "href",
                        n
                      ).get(a + (l.href || ""));
                      if (f) {
                        for (var r = 0; r < f.length; r++)
                          if (u = f[r], u.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && u.getAttribute("rel") === (l.rel == null ? null : l.rel) && u.getAttribute("title") === (l.title == null ? null : l.title) && u.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            f.splice(r, 1);
                            break e;
                          }
                      }
                      u = n.createElement(a), ce(u, a, l), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (f = Xd(
                        "meta",
                        "content",
                        n
                      ).get(a + (l.content || ""))) {
                        for (r = 0; r < f.length; r++)
                          if (u = f[r], u.getAttribute("content") === (l.content == null ? null : "" + l.content) && u.getAttribute("name") === (l.name == null ? null : l.name) && u.getAttribute("property") === (l.property == null ? null : l.property) && u.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && u.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            f.splice(r, 1);
                            break e;
                          }
                      }
                      u = n.createElement(a), ce(u, a, l), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(o(468, a));
                  }
                  u[ae] = t, te(u), a = u;
                }
                t.stateNode = a;
              } else
                Kd(
                  n,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Qd(
                n,
                a,
                t.memoizedProps
              );
          else
            u !== a ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, a === null ? Kd(
              n,
              t.type,
              t.stateNode
            ) : Qd(
              n,
              a,
              t.memoizedProps
            )) : a === null && t.stateNode !== null && ef(
              t,
              t.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        ye(e, t), ve(t), a & 512 && (Jt || l === null || Xe(l, l.return)), l !== null && a & 4 && ef(
          t,
          t.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (ye(e, t), ve(t), a & 512 && (Jt || l === null || Xe(l, l.return)), t.flags & 32) {
          n = t.stateNode;
          try {
            ha(n, "");
          } catch (q) {
            Mt(t, t.return, q);
          }
        }
        a & 4 && t.stateNode != null && (n = t.memoizedProps, ef(
          t,
          n,
          l !== null ? l.memoizedProps : n
        )), a & 1024 && (nf = !0);
        break;
      case 6:
        if (ye(e, t), ve(t), a & 4) {
          if (t.stateNode === null)
            throw Error(o(162));
          a = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = a;
          } catch (q) {
            Mt(t, t.return, q);
          }
        }
        break;
      case 3:
        if (ui = null, n = we, we = ai(e.containerInfo), ye(e, t), we = n, ve(t), a & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Va(e.containerInfo);
          } catch (q) {
            Mt(t, t.return, q);
          }
        nf && (nf = !1, Kr(t));
        break;
      case 4:
        a = we, we = ai(
          t.stateNode.containerInfo
        ), ye(e, t), ve(t), we = a;
        break;
      case 12:
        ye(e, t), ve(t);
        break;
      case 31:
        ye(e, t), ve(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, qu(t, a)));
        break;
      case 13:
        ye(e, t), ve(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Qu = be()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, qu(t, a)));
        break;
      case 22:
        n = t.memoizedState !== null;
        var m = l !== null && l.memoizedState !== null, T = ul, D = Jt;
        if (ul = T || n, Jt = D || m, ye(e, t), Jt = D, ul = T, ve(t), a & 8192)
          t: for (e = t.stateNode, e._visibility = n ? e._visibility & -2 : e._visibility | 1, n && (l === null || m || ul || Jt || aa(t)), l = null, e = t; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (l === null) {
                m = l = e;
                try {
                  if (u = m.stateNode, n)
                    f = u.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                  else {
                    r = m.stateNode;
                    var I = m.memoizedProps.style, E = I != null && I.hasOwnProperty("display") ? I.display : null;
                    r.style.display = E == null || typeof E == "boolean" ? "" : ("" + E).trim();
                  }
                } catch (q) {
                  Mt(m, m.return, q);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                m = e;
                try {
                  m.stateNode.nodeValue = n ? "" : m.memoizedProps;
                } catch (q) {
                  Mt(m, m.return, q);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                m = e;
                try {
                  var z = m.stateNode;
                  n ? Hd(z, !0) : Hd(m.stateNode, !1);
                } catch (q) {
                  Mt(m, m.return, q);
                }
              }
            } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === t) && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              l === e && (l = null), e = e.return;
            }
            l === e && (l = null), e.sibling.return = e.return, e = e.sibling;
          }
        a & 4 && (a = t.updateQueue, a !== null && (l = a.retryQueue, l !== null && (a.retryQueue = null, qu(t, l))));
        break;
      case 19:
        ye(e, t), ve(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, qu(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ye(e, t), ve(t);
    }
  }
  function ve(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, a = t.return; a !== null; ) {
          if (Lr(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(o(160));
        switch (l.tag) {
          case 27:
            var n = l.stateNode, u = lf(t);
            ju(t, u, n);
            break;
          case 5:
            var f = l.stateNode;
            l.flags & 32 && (ha(f, ""), l.flags &= -33);
            var r = lf(t);
            ju(t, r, f);
            break;
          case 3:
          case 4:
            var m = l.stateNode.containerInfo, T = lf(t);
            af(
              t,
              T,
              m
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (D) {
        Mt(t, t.return, D);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Kr(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Kr(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function cl(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        wr(t, e.alternate, e), e = e.sibling;
  }
  function aa(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          El(4, e, e.return), aa(e);
          break;
        case 1:
          Xe(e, e.return);
          var l = e.stateNode;
          typeof l.componentWillUnmount == "function" && Hr(
            e,
            e.return,
            l
          ), aa(e);
          break;
        case 27:
          Zn(e.stateNode);
        case 26:
        case 5:
          Xe(e, e.return), aa(e);
          break;
        case 22:
          e.memoizedState === null && aa(e);
          break;
        case 30:
          aa(e);
          break;
        default:
          aa(e);
      }
      t = t.sibling;
    }
  }
  function fl(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var a = e.alternate, n = t, u = e, f = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          fl(
            n,
            u,
            l
          ), _n(4, u);
          break;
        case 1:
          if (fl(
            n,
            u,
            l
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (T) {
              Mt(a, a.return, T);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var r = a.stateNode;
            try {
              var m = n.shared.hiddenCallbacks;
              if (m !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < m.length; n++)
                  Ms(m[n], r);
            } catch (T) {
              Mt(a, a.return, T);
            }
          }
          l && f & 64 && Br(u), Dn(u, u.return);
          break;
        case 27:
          Zr(u);
        case 26:
        case 5:
          fl(
            n,
            u,
            l
          ), l && a === null && f & 4 && Gr(u), Dn(u, u.return);
          break;
        case 12:
          fl(
            n,
            u,
            l
          );
          break;
        case 31:
          fl(
            n,
            u,
            l
          ), l && f & 4 && Vr(n, u);
          break;
        case 13:
          fl(
            n,
            u,
            l
          ), l && f & 4 && Qr(n, u);
          break;
        case 22:
          u.memoizedState === null && fl(
            n,
            u,
            l
          ), Dn(u, u.return);
          break;
        case 30:
          break;
        default:
          fl(
            n,
            u,
            l
          );
      }
      e = e.sibling;
    }
  }
  function uf(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && yn(l));
  }
  function cf(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && yn(t));
  }
  function je(t, e, l, a) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        kr(
          t,
          e,
          l,
          a
        ), e = e.sibling;
  }
  function kr(t, e, l, a) {
    var n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        je(
          t,
          e,
          l,
          a
        ), n & 2048 && _n(9, e);
        break;
      case 1:
        je(
          t,
          e,
          l,
          a
        );
        break;
      case 3:
        je(
          t,
          e,
          l,
          a
        ), n & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && yn(t)));
        break;
      case 12:
        if (n & 2048) {
          je(
            t,
            e,
            l,
            a
          ), t = e.stateNode;
          try {
            var u = e.memoizedProps, f = u.id, r = u.onPostCommit;
            typeof r == "function" && r(
              f,
              e.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (m) {
            Mt(e, e.return, m);
          }
        } else
          je(
            t,
            e,
            l,
            a
          );
        break;
      case 31:
        je(
          t,
          e,
          l,
          a
        );
        break;
      case 13:
        je(
          t,
          e,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = e.stateNode, f = e.alternate, e.memoizedState !== null ? u._visibility & 2 ? je(
          t,
          e,
          l,
          a
        ) : Rn(t, e) : u._visibility & 2 ? je(
          t,
          e,
          l,
          a
        ) : (u._visibility |= 2, Ia(
          t,
          e,
          l,
          a,
          (e.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && uf(f, e);
        break;
      case 24:
        je(
          t,
          e,
          l,
          a
        ), n & 2048 && cf(e.alternate, e);
        break;
      default:
        je(
          t,
          e,
          l,
          a
        );
    }
  }
  function Ia(t, e, l, a, n) {
    for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, f = e, r = l, m = a, T = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Ia(
            u,
            f,
            r,
            m,
            n
          ), _n(8, f);
          break;
        case 23:
          break;
        case 22:
          var D = f.stateNode;
          f.memoizedState !== null ? D._visibility & 2 ? Ia(
            u,
            f,
            r,
            m,
            n
          ) : Rn(
            u,
            f
          ) : (D._visibility |= 2, Ia(
            u,
            f,
            r,
            m,
            n
          )), n && T & 2048 && uf(
            f.alternate,
            f
          );
          break;
        case 24:
          Ia(
            u,
            f,
            r,
            m,
            n
          ), n && T & 2048 && cf(f.alternate, f);
          break;
        default:
          Ia(
            u,
            f,
            r,
            m,
            n
          );
      }
      e = e.sibling;
    }
  }
  function Rn(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, a = e, n = a.flags;
        switch (a.tag) {
          case 22:
            Rn(l, a), n & 2048 && uf(
              a.alternate,
              a
            );
            break;
          case 24:
            Rn(l, a), n & 2048 && cf(a.alternate, a);
            break;
          default:
            Rn(l, a);
        }
        e = e.sibling;
      }
  }
  var Un = 8192;
  function xa(t, e, l) {
    if (t.subtreeFlags & Un)
      for (t = t.child; t !== null; )
        Jr(
          t,
          e,
          l
        ), t = t.sibling;
  }
  function Jr(t, e, l) {
    switch (t.tag) {
      case 26:
        xa(
          t,
          e,
          l
        ), t.flags & Un && t.memoizedState !== null && Ay(
          l,
          we,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        xa(
          t,
          e,
          l
        );
        break;
      case 3:
      case 4:
        var a = we;
        we = ai(t.stateNode.containerInfo), xa(
          t,
          e,
          l
        ), we = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = Un, Un = 16777216, xa(
          t,
          e,
          l
        ), Un = a) : xa(
          t,
          e,
          l
        ));
        break;
      default:
        xa(
          t,
          e,
          l
        );
    }
  }
  function Fr(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function In(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          ee = a, $r(
            a,
            t
          );
        }
      Fr(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Wr(t), t = t.sibling;
  }
  function Wr(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        In(t), t.flags & 2048 && El(9, t, t.return);
        break;
      case 3:
        In(t);
        break;
      case 12:
        In(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, Vu(t)) : In(t);
        break;
      default:
        In(t);
    }
  }
  function Vu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          ee = a, $r(
            a,
            t
          );
        }
      Fr(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          El(8, e, e.return), Vu(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, Vu(e));
          break;
        default:
          Vu(e);
      }
      t = t.sibling;
    }
  }
  function $r(t, e) {
    for (; ee !== null; ) {
      var l = ee;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          El(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          yn(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, ee = a;
      else
        t: for (l = t; ee !== null; ) {
          a = ee;
          var n = a.sibling, u = a.return;
          if (jr(a), a === l) {
            ee = null;
            break t;
          }
          if (n !== null) {
            n.return = u, ee = n;
            break t;
          }
          ee = u;
        }
    }
  }
  var Gg = {
    getCacheForType: function(t) {
      var e = ue(Xt), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return ue(Xt).controller.signal;
    }
  }, Lg = typeof WeakMap == "function" ? WeakMap : Map, bt = 0, _t = null, ft = null, st = 0, Tt = 0, ze = null, Ol = !1, Ba = !1, ff = !1, ol = 0, Yt = 0, zl = 0, na = 0, of = 0, Ne = 0, Ha = 0, xn = null, pe = null, sf = !1, Qu = 0, Pr = 0, Xu = 1 / 0, Ku = null, Nl = null, Wt = 0, _l = null, Ga = null, sl = 0, rf = 0, df = null, td = null, Bn = 0, hf = null;
  function _e() {
    return (bt & 2) !== 0 && st !== 0 ? st & -st : N.T !== null ? Sf() : yo();
  }
  function ed() {
    if (Ne === 0)
      if ((st & 536870912) === 0 || ht) {
        var t = eu;
        eu <<= 1, (eu & 3932160) === 0 && (eu = 262144), Ne = t;
      } else Ne = 536870912;
    return t = Ee.current, t !== null && (t.flags |= 32), Ne;
  }
  function Se(t, e, l) {
    (t === _t && (Tt === 2 || Tt === 9) || t.cancelPendingCommit !== null) && (La(t, 0), Dl(
      t,
      st,
      Ne,
      !1
    )), en(t, l), ((bt & 2) === 0 || t !== _t) && (t === _t && ((bt & 2) === 0 && (na |= l), Yt === 4 && Dl(
      t,
      st,
      Ne,
      !1
    )), Ke(t));
  }
  function ld(t, e, l) {
    if ((bt & 6) !== 0) throw Error(o(327));
    var a = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || tn(t, e), n = a ? wg(t, e) : gf(t, e, !0), u = a;
    do {
      if (n === 0) {
        Ba && !a && Dl(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, u && !Zg(l)) {
          n = gf(t, e, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = e, t.errorRecoveryDisabledLanes & u)
            var f = 0;
          else
            f = t.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
          if (f !== 0) {
            e = f;
            t: {
              var r = t;
              n = xn;
              var m = r.current.memoizedState.isDehydrated;
              if (m && (La(r, f).flags |= 256), f = gf(
                r,
                f,
                !1
              ), f !== 2) {
                if (ff && !m) {
                  r.errorRecoveryDisabledLanes |= u, na |= u, n = 4;
                  break t;
                }
                u = pe, pe = n, u !== null && (pe === null ? pe = u : pe.push.apply(
                  pe,
                  u
                ));
              }
              n = f;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          La(t, 0), Dl(t, e, 0, !0);
          break;
        }
        t: {
          switch (a = t, u = n, u) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              Dl(
                a,
                e,
                Ne,
                !Ol
              );
              break t;
            case 2:
              pe = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((e & 62914560) === e && (n = Qu + 300 - be(), 10 < n)) {
            if (Dl(
              a,
              e,
              Ne,
              !Ol
            ), au(a, 0, !0) !== 0) break t;
            sl = e, a.timeoutHandle = Id(
              ad.bind(
                null,
                a,
                l,
                pe,
                Ku,
                sf,
                e,
                Ne,
                na,
                Ha,
                Ol,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break t;
          }
          ad(
            a,
            l,
            pe,
            Ku,
            sf,
            e,
            Ne,
            na,
            Ha,
            Ol,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ke(t);
  }
  function ad(t, e, l, a, n, u, f, r, m, T, D, I, E, z) {
    if (t.timeoutHandle = -1, I = e.subtreeFlags, I & 8192 || (I & 16785408) === 16785408) {
      I = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Je
      }, Jr(
        e,
        u,
        I
      );
      var q = (u & 62914560) === u ? Qu - be() : (u & 4194048) === u ? Pr - be() : 0;
      if (q = Ty(
        I,
        q
      ), q !== null) {
        sl = u, t.cancelPendingCommit = q(
          rd.bind(
            null,
            t,
            e,
            u,
            l,
            a,
            n,
            f,
            r,
            m,
            D,
            I,
            null,
            E,
            z
          )
        ), Dl(t, u, f, !T);
        return;
      }
    }
    rd(
      t,
      e,
      u,
      l,
      a,
      n,
      f,
      r,
      m
    );
  }
  function Zg(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var a = 0; a < l.length; a++) {
          var n = l[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!Te(u(), n)) return !1;
          } catch (f) {
            return !1;
          }
        }
      if (l = e.child, e.subtreeFlags & 16384 && l !== null)
        l.return = e, e = l;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function Dl(t, e, l, a) {
    e &= ~of, e &= ~na, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
    for (var n = e; 0 < n; ) {
      var u = 31 - Ae(n), f = 1 << u;
      a[u] = -1, n &= ~f;
    }
    l !== 0 && ho(t, l, e);
  }
  function ku() {
    return (bt & 6) === 0 ? (Hn(0), !1) : !0;
  }
  function mf() {
    if (ft !== null) {
      if (Tt === 0)
        var t = ft.return;
      else
        t = ft, Pe = Jl = null, _c(t), Na = null, pn = 0, t = ft;
      for (; t !== null; )
        xr(t.alternate, t), t = t.return;
      ft = null;
    }
  }
  function La(t, e) {
    var l = t.timeoutHandle;
    l !== -1 && (t.timeoutHandle = -1, uy(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), sl = 0, mf(), _t = t, ft = l = We(t.current, null), st = e, Tt = 0, ze = null, Ol = !1, Ba = tn(t, e), ff = !1, Ha = Ne = of = na = zl = Yt = 0, pe = xn = null, sf = !1, (e & 8) !== 0 && (e |= e & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= e; 0 < a; ) {
        var n = 31 - Ae(a), u = 1 << n;
        e |= t[n], a &= ~u;
      }
    return ol = e, gu(), l;
  }
  function nd(t, e) {
    nt = null, N.H = On, e === za || e === Tu ? (e = bs(), Tt = 3) : e === vc ? (e = bs(), Tt = 4) : Tt = e === Qc ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, ze = e, ft === null && (Yt = 1, Gu(
      t,
      Ie(e, t.current)
    ));
  }
  function ud() {
    var t = Ee.current;
    return t === null ? !0 : (st & 4194048) === st ? Ge === null : (st & 62914560) === st || (st & 536870912) !== 0 ? t === Ge : !1;
  }
  function id() {
    var t = N.H;
    return N.H = On, t === null ? On : t;
  }
  function cd() {
    var t = N.A;
    return N.A = Gg, t;
  }
  function Ju() {
    Yt = 4, Ol || (st & 4194048) !== st && Ee.current !== null || (Ba = !0), (zl & 134217727) === 0 && (na & 134217727) === 0 || _t === null || Dl(
      _t,
      st,
      Ne,
      !1
    );
  }
  function gf(t, e, l) {
    var a = bt;
    bt |= 2;
    var n = id(), u = cd();
    (_t !== t || st !== e) && (Ku = null, La(t, e)), e = !1;
    var f = Yt;
    t: do
      try {
        if (Tt !== 0 && ft !== null) {
          var r = ft, m = ze;
          switch (Tt) {
            case 8:
              mf(), f = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ee.current === null && (e = !0);
              var T = Tt;
              if (Tt = 0, ze = null, Za(t, r, m, T), l && Ba) {
                f = 0;
                break t;
              }
              break;
            default:
              T = Tt, Tt = 0, ze = null, Za(t, r, m, T);
          }
        }
        Yg(), f = Yt;
        break;
      } catch (D) {
        nd(t, D);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Pe = Jl = null, bt = a, N.H = n, N.A = u, ft === null && (_t = null, st = 0, gu()), f;
  }
  function Yg() {
    for (; ft !== null; ) fd(ft);
  }
  function wg(t, e) {
    var l = bt;
    bt |= 2;
    var a = id(), n = cd();
    _t !== t || st !== e ? (Ku = null, Xu = be() + 500, La(t, e)) : Ba = tn(
      t,
      e
    );
    t: do
      try {
        if (Tt !== 0 && ft !== null) {
          e = ft;
          var u = ze;
          e: switch (Tt) {
            case 1:
              Tt = 0, ze = null, Za(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (ps(u)) {
                Tt = 0, ze = null, od(e);
                break;
              }
              e = function() {
                Tt !== 2 && Tt !== 9 || _t !== t || (Tt = 7), Ke(t);
              }, u.then(e, e);
              break t;
            case 3:
              Tt = 7;
              break t;
            case 4:
              Tt = 5;
              break t;
            case 7:
              ps(u) ? (Tt = 0, ze = null, od(e)) : (Tt = 0, ze = null, Za(t, e, u, 7));
              break;
            case 5:
              var f = null;
              switch (ft.tag) {
                case 26:
                  f = ft.memoizedState;
                case 5:
                case 27:
                  var r = ft;
                  if (f ? kd(f) : r.stateNode.complete) {
                    Tt = 0, ze = null;
                    var m = r.sibling;
                    if (m !== null) ft = m;
                    else {
                      var T = r.return;
                      T !== null ? (ft = T, Fu(T)) : ft = null;
                    }
                    break e;
                  }
              }
              Tt = 0, ze = null, Za(t, e, u, 5);
              break;
            case 6:
              Tt = 0, ze = null, Za(t, e, u, 6);
              break;
            case 8:
              mf(), Yt = 6;
              break t;
            default:
              throw Error(o(462));
          }
        }
        jg();
        break;
      } catch (D) {
        nd(t, D);
      }
    while (!0);
    return Pe = Jl = null, N.H = a, N.A = n, bt = l, ft !== null ? 0 : (_t = null, st = 0, gu(), Yt);
  }
  function jg() {
    for (; ft !== null && !rm(); )
      fd(ft);
  }
  function fd(t) {
    var e = Ur(t.alternate, t, ol);
    t.memoizedProps = t.pendingProps, e === null ? Fu(t) : ft = e;
  }
  function od(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Or(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          st
        );
        break;
      case 11:
        e = Or(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          st
        );
        break;
      case 5:
        _c(e);
      default:
        xr(l, e), e = ft = cs(e, ol), e = Ur(l, e, ol);
    }
    t.memoizedProps = t.pendingProps, e === null ? Fu(t) : ft = e;
  }
  function Za(t, e, l, a) {
    Pe = Jl = null, _c(e), Na = null, pn = 0;
    var n = e.return;
    try {
      if (Dg(
        t,
        n,
        e,
        l,
        st
      )) {
        Yt = 1, Gu(
          t,
          Ie(l, t.current)
        ), ft = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw ft = n, u;
      Yt = 1, Gu(
        t,
        Ie(l, t.current)
      ), ft = null;
      return;
    }
    e.flags & 32768 ? (ht || a === 1 ? t = !0 : Ba || (st & 536870912) !== 0 ? t = !1 : (Ol = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Ee.current, a !== null && a.tag === 13 && (a.flags |= 16384))), sd(e, t)) : Fu(e);
  }
  function Fu(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        sd(
          e,
          Ol
        );
        return;
      }
      t = e.return;
      var l = Ig(
        e.alternate,
        e,
        ol
      );
      if (l !== null) {
        ft = l;
        return;
      }
      if (e = e.sibling, e !== null) {
        ft = e;
        return;
      }
      ft = e = t;
    } while (e !== null);
    Yt === 0 && (Yt = 5);
  }
  function sd(t, e) {
    do {
      var l = xg(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767, ft = l;
        return;
      }
      if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
        ft = t;
        return;
      }
      ft = t = l;
    } while (t !== null);
    Yt = 6, ft = null;
  }
  function rd(t, e, l, a, n, u, f, r, m) {
    t.cancelPendingCommit = null;
    do
      Wu();
    while (Wt !== 0);
    if ((bt & 6) !== 0) throw Error(o(327));
    if (e !== null) {
      if (e === t.current) throw Error(o(177));
      if (u = e.lanes | e.childLanes, u |= lc, Cm(
        t,
        l,
        u,
        f,
        r,
        m
      ), t === _t && (ft = _t = null, st = 0), Ga = e, _l = t, sl = l, rf = u, df = n, td = a, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Xg(Pn, function() {
        return yd(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
        a = N.T, N.T = null, n = H.p, H.p = 2, f = bt, bt |= 4;
        try {
          Bg(t, e, l);
        } finally {
          bt = f, H.p = n, N.T = a;
        }
      }
      Wt = 1, dd(), hd(), md();
    }
  }
  function dd() {
    if (Wt === 1) {
      Wt = 0;
      var t = _l, e = Ga, l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        l = N.T, N.T = null;
        var a = H.p;
        H.p = 2;
        var n = bt;
        bt |= 4;
        try {
          Xr(e, t);
          var u = zf, f = $o(t.containerInfo), r = u.focusedElem, m = u.selectionRange;
          if (f !== r && r && r.ownerDocument && Wo(
            r.ownerDocument.documentElement,
            r
          )) {
            if (m !== null && Wi(r)) {
              var T = m.start, D = m.end;
              if (D === void 0 && (D = T), "selectionStart" in r)
                r.selectionStart = T, r.selectionEnd = Math.min(
                  D,
                  r.value.length
                );
              else {
                var I = r.ownerDocument || document, E = I && I.defaultView || window;
                if (E.getSelection) {
                  var z = E.getSelection(), q = r.textContent.length, J = Math.min(m.start, q), zt = m.end === void 0 ? J : Math.min(m.end, q);
                  !z.extend && J > zt && (f = zt, zt = J, J = f);
                  var b = Fo(
                    r,
                    J
                  ), S = Fo(
                    r,
                    zt
                  );
                  if (b && S && (z.rangeCount !== 1 || z.anchorNode !== b.node || z.anchorOffset !== b.offset || z.focusNode !== S.node || z.focusOffset !== S.offset)) {
                    var A = I.createRange();
                    A.setStart(b.node, b.offset), z.removeAllRanges(), J > zt ? (z.addRange(A), z.extend(S.node, S.offset)) : (A.setEnd(S.node, S.offset), z.addRange(A));
                  }
                }
              }
            }
            for (I = [], z = r; z = z.parentNode; )
              z.nodeType === 1 && I.push({
                element: z,
                left: z.scrollLeft,
                top: z.scrollTop
              });
            for (typeof r.focus == "function" && r.focus(), r = 0; r < I.length; r++) {
              var R = I[r];
              R.element.scrollLeft = R.left, R.element.scrollTop = R.top;
            }
          }
          oi = !!Of, zf = Of = null;
        } finally {
          bt = n, H.p = a, N.T = l;
        }
      }
      t.current = e, Wt = 2;
    }
  }
  function hd() {
    if (Wt === 2) {
      Wt = 0;
      var t = _l, e = Ga, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = N.T, N.T = null;
        var a = H.p;
        H.p = 2;
        var n = bt;
        bt |= 4;
        try {
          wr(t, e.alternate, e);
        } finally {
          bt = n, H.p = a, N.T = l;
        }
      }
      Wt = 3;
    }
  }
  function md() {
    if (Wt === 4 || Wt === 3) {
      Wt = 0, dm();
      var t = _l, e = Ga, l = sl, a = td;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? Wt = 5 : (Wt = 0, Ga = _l = null, gd(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (n === 0 && (Nl = null), Ui(l), e = e.stateNode, Ce && typeof Ce.onCommitFiberRoot == "function")
        try {
          Ce.onCommitFiberRoot(
            Pa,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch (m) {
        }
      if (a !== null) {
        e = N.T, n = H.p, H.p = 2, N.T = null;
        try {
          for (var u = t.onRecoverableError, f = 0; f < a.length; f++) {
            var r = a[f];
            u(r.value, {
              componentStack: r.stack
            });
          }
        } finally {
          N.T = e, H.p = n;
        }
      }
      (sl & 3) !== 0 && Wu(), Ke(t), n = t.pendingLanes, (l & 261930) !== 0 && (n & 42) !== 0 ? t === hf ? Bn++ : (Bn = 0, hf = t) : Bn = 0, Hn(0);
    }
  }
  function gd(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, yn(e)));
  }
  function Wu() {
    return dd(), hd(), md(), yd();
  }
  function yd() {
    if (Wt !== 5) return !1;
    var t = _l, e = rf;
    rf = 0;
    var l = Ui(sl), a = N.T, n = H.p;
    try {
      H.p = 32 > l ? 32 : l, N.T = null, l = df, df = null;
      var u = _l, f = sl;
      if (Wt = 0, Ga = _l = null, sl = 0, (bt & 6) !== 0) throw Error(o(331));
      var r = bt;
      if (bt |= 4, Wr(u.current), kr(
        u,
        u.current,
        f,
        l
      ), bt = r, Hn(0, !1), Ce && typeof Ce.onPostCommitFiberRoot == "function")
        try {
          Ce.onPostCommitFiberRoot(Pa, u);
        } catch (m) {
        }
      return !0;
    } finally {
      H.p = n, N.T = a, gd(t, e);
    }
  }
  function vd(t, e, l) {
    e = Ie(l, e), e = Vc(t.stateNode, e, 2), t = Al(t, e, 2), t !== null && (en(t, 2), Ke(t));
  }
  function Mt(t, e, l) {
    if (t.tag === 3)
      vd(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          vd(
            e,
            t,
            l
          );
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Nl === null || !Nl.has(a))) {
            t = Ie(l, t), l = pr(2), a = Al(e, l, 2), a !== null && (Sr(
              l,
              a,
              e,
              t
            ), en(a, 2), Ke(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function yf(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new Lg();
      var n = /* @__PURE__ */ new Set();
      a.set(e, n);
    } else
      n = a.get(e), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(e, n));
    n.has(l) || (ff = !0, n.add(l), t = qg.bind(null, t, e, l), e.then(t, t));
  }
  function qg(t, e, l) {
    var a = t.pingCache;
    a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, _t === t && (st & l) === l && (Yt === 4 || Yt === 3 && (st & 62914560) === st && 300 > be() - Qu ? (bt & 2) === 0 && La(t, 0) : of |= l, Ha === st && (Ha = 0)), Ke(t);
  }
  function pd(t, e) {
    e === 0 && (e = ro()), t = Xl(t, e), t !== null && (en(t, e), Ke(t));
  }
  function Vg(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), pd(t, l);
  }
  function Qg(t, e) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode, n = t.memoizedState;
        n !== null && (l = n.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    a !== null && a.delete(e), pd(t, l);
  }
  function Xg(t, e) {
    return Ni(t, e);
  }
  var $u = null, Ya = null, vf = !1, Pu = !1, pf = !1, Rl = 0;
  function Ke(t) {
    t !== Ya && t.next === null && (Ya === null ? $u = Ya = t : Ya = Ya.next = t), Pu = !0, vf || (vf = !0, kg());
  }
  function Hn(t, e) {
    if (!pf && Pu) {
      pf = !0;
      do
        for (var l = !1, a = $u; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var f = a.suspendedLanes, r = a.pingedLanes;
              u = (1 << 31 - Ae(42 | t) + 1) - 1, u &= n & ~(f & ~r), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Ad(a, u));
          } else
            u = st, u = au(
              a,
              a === _t ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || tn(a, u) || (l = !0, Ad(a, u));
          a = a.next;
        }
      while (l);
      pf = !1;
    }
  }
  function Kg() {
    Sd();
  }
  function Sd() {
    Pu = vf = !1;
    var t = 0;
    Rl !== 0 && ny() && (t = Rl);
    for (var e = be(), l = null, a = $u; a !== null; ) {
      var n = a.next, u = bd(a, e);
      u === 0 ? (a.next = null, l === null ? $u = n : l.next = n, n === null && (Ya = l)) : (l = a, (t !== 0 || (u & 3) !== 0) && (Pu = !0)), a = n;
    }
    Wt !== 0 && Wt !== 5 || Hn(t), Rl !== 0 && (Rl = 0);
  }
  function bd(t, e) {
    for (var l = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var f = 31 - Ae(u), r = 1 << f, m = n[f];
      m === -1 ? ((r & l) === 0 || (r & a) !== 0) && (n[f] = bm(r, e)) : m <= e && (t.expiredLanes |= r), u &= ~r;
    }
    if (e = _t, l = st, l = au(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, l === 0 || t === e && (Tt === 2 || Tt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && _i(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || tn(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (a !== null && _i(a), Ui(l)) {
        case 2:
        case 8:
          l = oo;
          break;
        case 32:
          l = Pn;
          break;
        case 268435456:
          l = so;
          break;
        default:
          l = Pn;
      }
      return a = Cd.bind(null, t), l = Ni(l, a), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return a !== null && a !== null && _i(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Cd(t, e) {
    if (Wt !== 0 && Wt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (Wu() && t.callbackNode !== l)
      return null;
    var a = st;
    return a = au(
      t,
      t === _t ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (ld(t, a, e), bd(t, be()), t.callbackNode != null && t.callbackNode === l ? Cd.bind(null, t) : null);
  }
  function Ad(t, e) {
    if (Wu()) return null;
    ld(t, e, !0);
  }
  function kg() {
    iy(function() {
      (bt & 6) !== 0 ? Ni(
        fo,
        Kg
      ) : Sd();
    });
  }
  function Sf() {
    if (Rl === 0) {
      var t = Ea;
      t === 0 && (t = tu, tu <<= 1, (tu & 261888) === 0 && (tu = 256)), Rl = t;
    }
    return Rl;
  }
  function Td(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : cu("" + t);
  }
  function Md(t, e) {
    var l = e.ownerDocument.createElement("input");
    return l.name = e.name, l.value = e.value, t.id && l.setAttribute("form", t.id), e.parentNode.insertBefore(l, e), t = new FormData(t), l.parentNode.removeChild(l), t;
  }
  function Jg(t, e, l, a, n) {
    if (e === "submit" && l && l.stateNode === n) {
      var u = Td(
        (n[he] || null).action
      ), f = a.submitter;
      f && (e = (e = f[he] || null) ? Td(e.formAction) : f.getAttribute("formAction"), e !== null && (u = e, f = null));
      var r = new ru(
        "action",
        "action",
        null,
        a,
        n
      );
      t.push({
        event: r,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Rl !== 0) {
                  var m = f ? Md(n, f) : new FormData(n);
                  Lc(
                    l,
                    {
                      pending: !0,
                      data: m,
                      method: n.method,
                      action: u
                    },
                    null,
                    m
                  );
                }
              } else
                typeof u == "function" && (r.preventDefault(), m = f ? Md(n, f) : new FormData(n), Lc(
                  l,
                  {
                    pending: !0,
                    data: m,
                    method: n.method,
                    action: u
                  },
                  u,
                  m
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var bf = 0; bf < ec.length; bf++) {
    var Cf = ec[bf], Fg = Cf.toLowerCase(), Wg = Cf[0].toUpperCase() + Cf.slice(1);
    Ye(
      Fg,
      "on" + Wg
    );
  }
  Ye(es, "onAnimationEnd"), Ye(ls, "onAnimationIteration"), Ye(as, "onAnimationStart"), Ye("dblclick", "onDoubleClick"), Ye("focusin", "onFocus"), Ye("focusout", "onBlur"), Ye(hg, "onTransitionRun"), Ye(mg, "onTransitionStart"), Ye(gg, "onTransitionCancel"), Ye(ns, "onTransitionEnd"), ra("onMouseEnter", ["mouseout", "mouseover"]), ra("onMouseLeave", ["mouseout", "mouseover"]), ra("onPointerEnter", ["pointerout", "pointerover"]), ra("onPointerLeave", ["pointerout", "pointerover"]), jl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), jl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), jl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), jl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), jl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), jl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Gn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), $g = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Gn)
  );
  function Ed(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var a = t[l], n = a.event;
      a = a.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var f = a.length - 1; 0 <= f; f--) {
            var r = a[f], m = r.instance, T = r.currentTarget;
            if (r = r.listener, m !== u && n.isPropagationStopped())
              break t;
            u = r, n.currentTarget = T;
            try {
              u(n);
            } catch (D) {
              mu(D);
            }
            n.currentTarget = null, u = m;
          }
        else
          for (f = 0; f < a.length; f++) {
            if (r = a[f], m = r.instance, T = r.currentTarget, r = r.listener, m !== u && n.isPropagationStopped())
              break t;
            u = r, n.currentTarget = T;
            try {
              u(n);
            } catch (D) {
              mu(D);
            }
            n.currentTarget = null, u = m;
          }
      }
    }
  }
  function ot(t, e) {
    var l = e[Ii];
    l === void 0 && (l = e[Ii] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    l.has(a) || (Od(e, t, 2, !1), l.add(a));
  }
  function Af(t, e, l) {
    var a = 0;
    e && (a |= 4), Od(
      l,
      t,
      a,
      e
    );
  }
  var ti = "_reactListening" + Math.random().toString(36).slice(2);
  function Tf(t) {
    if (!t[ti]) {
      t[ti] = !0, So.forEach(function(l) {
        l !== "selectionchange" && ($g.has(l) || Af(l, !1, t), Af(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[ti] || (e[ti] = !0, Af("selectionchange", !1, e));
    }
  }
  function Od(t, e, l, a) {
    switch (eh(e)) {
      case 2:
        var n = Oy;
        break;
      case 8:
        n = zy;
        break;
      default:
        n = Lf;
    }
    l = n.bind(
      null,
      e,
      l,
      t
    ), n = void 0, !ji || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: n
    }) : t.addEventListener(e, l, !0) : n !== void 0 ? t.addEventListener(e, l, {
      passive: n
    }) : t.addEventListener(e, l, !1);
  }
  function Mf(t, e, l, a, n) {
    var u = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var f = a.tag;
        if (f === 3 || f === 4) {
          var r = a.stateNode.containerInfo;
          if (r === n) break;
          if (f === 4)
            for (f = a.return; f !== null; ) {
              var m = f.tag;
              if ((m === 3 || m === 4) && f.stateNode.containerInfo === n)
                return;
              f = f.return;
            }
          for (; r !== null; ) {
            if (f = fa(r), f === null) return;
            if (m = f.tag, m === 5 || m === 6 || m === 26 || m === 27) {
              a = u = f;
              continue t;
            }
            r = r.parentNode;
          }
        }
        a = a.return;
      }
    Ro(function() {
      var T = u, D = Yi(l), I = [];
      t: {
        var E = us.get(t);
        if (E !== void 0) {
          var z = ru, q = t;
          switch (t) {
            case "keypress":
              if (ou(l) === 0) break t;
            case "keydown":
            case "keyup":
              z = Qm;
              break;
            case "focusin":
              q = "focus", z = Xi;
              break;
            case "focusout":
              q = "blur", z = Xi;
              break;
            case "beforeblur":
            case "afterblur":
              z = Xi;
              break;
            case "click":
              if (l.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              z = xo;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              z = Im;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              z = km;
              break;
            case es:
            case ls:
            case as:
              z = Hm;
              break;
            case ns:
              z = Fm;
              break;
            case "scroll":
            case "scrollend":
              z = Rm;
              break;
            case "wheel":
              z = $m;
              break;
            case "copy":
            case "cut":
            case "paste":
              z = Lm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              z = Ho;
              break;
            case "toggle":
            case "beforetoggle":
              z = tg;
          }
          var J = (e & 4) !== 0, zt = !J && (t === "scroll" || t === "scrollend"), b = J ? E !== null ? E + "Capture" : null : E;
          J = [];
          for (var S = T, A; S !== null; ) {
            var R = S;
            if (A = R.stateNode, R = R.tag, R !== 5 && R !== 26 && R !== 27 || A === null || b === null || (R = nn(S, b), R != null && J.push(
              Ln(S, R, A)
            )), zt) break;
            S = S.return;
          }
          0 < J.length && (E = new z(
            E,
            q,
            null,
            l,
            D
          ), I.push({ event: E, listeners: J }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (E = t === "mouseover" || t === "pointerover", z = t === "mouseout" || t === "pointerout", E && l !== Zi && (q = l.relatedTarget || l.fromElement) && (fa(q) || q[ca]))
            break t;
          if ((z || E) && (E = D.window === D ? D : (E = D.ownerDocument) ? E.defaultView || E.parentWindow : window, z ? (q = l.relatedTarget || l.toElement, z = T, q = q ? fa(q) : null, q !== null && (zt = g(q), J = q.tag, q !== zt || J !== 5 && J !== 27 && J !== 6) && (q = null)) : (z = null, q = T), z !== q)) {
            if (J = xo, R = "onMouseLeave", b = "onMouseEnter", S = "mouse", (t === "pointerout" || t === "pointerover") && (J = Ho, R = "onPointerLeave", b = "onPointerEnter", S = "pointer"), zt = z == null ? E : an(z), A = q == null ? E : an(q), E = new J(
              R,
              S + "leave",
              z,
              l,
              D
            ), E.target = zt, E.relatedTarget = A, R = null, fa(D) === T && (J = new J(
              b,
              S + "enter",
              q,
              l,
              D
            ), J.target = A, J.relatedTarget = zt, R = J), zt = R, z && q)
              e: {
                for (J = Pg, b = z, S = q, A = 0, R = b; R; R = J(R))
                  A++;
                R = 0;
                for (var K = S; K; K = J(K))
                  R++;
                for (; 0 < A - R; )
                  b = J(b), A--;
                for (; 0 < R - A; )
                  S = J(S), R--;
                for (; A--; ) {
                  if (b === S || S !== null && b === S.alternate) {
                    J = b;
                    break e;
                  }
                  b = J(b), S = J(S);
                }
                J = null;
              }
            else J = null;
            z !== null && zd(
              I,
              E,
              z,
              J,
              !1
            ), q !== null && zt !== null && zd(
              I,
              zt,
              q,
              J,
              !0
            );
          }
        }
        t: {
          if (E = T ? an(T) : window, z = E.nodeName && E.nodeName.toLowerCase(), z === "select" || z === "input" && E.type === "file")
            var yt = Vo;
          else if (jo(E))
            if (Qo)
              yt = sg;
            else {
              yt = fg;
              var V = cg;
            }
          else
            z = E.nodeName, !z || z.toLowerCase() !== "input" || E.type !== "checkbox" && E.type !== "radio" ? T && Li(T.elementType) && (yt = Vo) : yt = og;
          if (yt && (yt = yt(t, T))) {
            qo(
              I,
              yt,
              l,
              D
            );
            break t;
          }
          V && V(t, E, T), t === "focusout" && T && E.type === "number" && T.memoizedProps.value != null && Gi(E, "number", E.value);
        }
        switch (V = T ? an(T) : window, t) {
          case "focusin":
            (jo(V) || V.contentEditable === "true") && (va = V, $i = T, hn = null);
            break;
          case "focusout":
            hn = $i = va = null;
            break;
          case "mousedown":
            Pi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Pi = !1, Po(I, l, D);
            break;
          case "selectionchange":
            if (dg) break;
          case "keydown":
          case "keyup":
            Po(I, l, D);
        }
        var ct;
        if (ki)
          t: {
            switch (t) {
              case "compositionstart":
                var rt = "onCompositionStart";
                break t;
              case "compositionend":
                rt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                rt = "onCompositionUpdate";
                break t;
            }
            rt = void 0;
          }
        else
          ya ? Yo(t, l) && (rt = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (rt = "onCompositionStart");
        rt && (Go && l.locale !== "ko" && (ya || rt !== "onCompositionStart" ? rt === "onCompositionEnd" && ya && (ct = Uo()) : (gl = D, qi = "value" in gl ? gl.value : gl.textContent, ya = !0)), V = ei(T, rt), 0 < V.length && (rt = new Bo(
          rt,
          t,
          null,
          l,
          D
        ), I.push({ event: rt, listeners: V }), ct ? rt.data = ct : (ct = wo(l), ct !== null && (rt.data = ct)))), (ct = lg ? ag(t, l) : ng(t, l)) && (rt = ei(T, "onBeforeInput"), 0 < rt.length && (V = new Bo(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          D
        ), I.push({
          event: V,
          listeners: rt
        }), V.data = ct)), Jg(
          I,
          t,
          T,
          l,
          D
        );
      }
      Ed(I, e);
    });
  }
  function Ln(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function ei(t, e) {
    for (var l = e + "Capture", a = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = nn(t, l), n != null && a.unshift(
        Ln(t, n, u)
      ), n = nn(t, e), n != null && a.push(
        Ln(t, n, u)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function Pg(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function zd(t, e, l, a, n) {
    for (var u = e._reactName, f = []; l !== null && l !== a; ) {
      var r = l, m = r.alternate, T = r.stateNode;
      if (r = r.tag, m !== null && m === a) break;
      r !== 5 && r !== 26 && r !== 27 || T === null || (m = T, n ? (T = nn(l, u), T != null && f.unshift(
        Ln(l, T, m)
      )) : n || (T = nn(l, u), T != null && f.push(
        Ln(l, T, m)
      ))), l = l.return;
    }
    f.length !== 0 && t.push({ event: e, listeners: f });
  }
  var ty = /\r\n?/g, ey = /\u0000|\uFFFD/g;
  function Nd(t) {
    return (typeof t == "string" ? t : "" + t).replace(ty, `
`).replace(ey, "");
  }
  function _d(t, e) {
    return e = Nd(e), Nd(t) === e;
  }
  function Ot(t, e, l, a, n, u) {
    switch (l) {
      case "children":
        typeof a == "string" ? e === "body" || e === "textarea" && a === "" || ha(t, a) : (typeof a == "number" || typeof a == "bigint") && e !== "body" && ha(t, "" + a);
        break;
      case "className":
        uu(t, "class", a);
        break;
      case "tabIndex":
        uu(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        uu(t, l, a);
        break;
      case "style":
        _o(t, a, u);
        break;
      case "data":
        if (e !== "object") {
          uu(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (e !== "a" || l !== "href")) {
          t.removeAttribute(l);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(l);
          break;
        }
        a = cu("" + a), t.setAttribute(l, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (l === "formAction" ? (e !== "input" && Ot(t, e, "name", n.name, n, null), Ot(
            t,
            e,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Ot(
            t,
            e,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Ot(
            t,
            e,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Ot(t, e, "encType", n.encType, n, null), Ot(t, e, "method", n.method, n, null), Ot(t, e, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(l);
          break;
        }
        a = cu("" + a), t.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (t.onclick = Je);
        break;
      case "onScroll":
        a != null && ot("scroll", t);
        break;
      case "onScrollEnd":
        a != null && ot("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (l = a.__html, l != null) {
            if (n.children != null) throw Error(o(60));
            t.innerHTML = l;
          }
        }
        break;
      case "multiple":
        t.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        t.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        l = cu("" + a), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, "" + a) : t.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, "") : t.removeAttribute(l);
        break;
      case "capture":
      case "download":
        a === !0 ? t.setAttribute(l, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, a) : t.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(l, a) : t.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(l) : t.setAttribute(l, a);
        break;
      case "popover":
        ot("beforetoggle", t), ot("toggle", t), nu(t, "popover", a);
        break;
      case "xlinkActuate":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        ke(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        ke(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        ke(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        nu(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = _m.get(l) || l, nu(t, l, a));
    }
  }
  function Ef(t, e, l, a, n, u) {
    switch (l) {
      case "style":
        _o(t, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (l = a.__html, l != null) {
            if (n.children != null) throw Error(o(60));
            t.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof a == "string" ? ha(t, a) : (typeof a == "number" || typeof a == "bigint") && ha(t, "" + a);
        break;
      case "onScroll":
        a != null && ot("scroll", t);
        break;
      case "onScrollEnd":
        a != null && ot("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = Je);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!bo.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), e = l.slice(2, n ? l.length - 7 : void 0), u = t[he] || null, u = u != null ? u[l] : null, typeof u == "function" && t.removeEventListener(e, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(e, a, n);
              break t;
            }
            l in t ? t[l] = a : a === !0 ? t.setAttribute(l, "") : nu(t, l, a);
          }
    }
  }
  function ce(t, e, l) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        ot("error", t), ot("load", t);
        var a = !1, n = !1, u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var f = l[u];
            if (f != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, e));
                default:
                  Ot(t, e, u, f, l, null);
              }
          }
        n && Ot(t, e, "srcSet", l.srcSet, l, null), a && Ot(t, e, "src", l.src, l, null);
        return;
      case "input":
        ot("invalid", t);
        var r = u = f = n = null, m = null, T = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var D = l[a];
            if (D != null)
              switch (a) {
                case "name":
                  n = D;
                  break;
                case "type":
                  f = D;
                  break;
                case "checked":
                  m = D;
                  break;
                case "defaultChecked":
                  T = D;
                  break;
                case "value":
                  u = D;
                  break;
                case "defaultValue":
                  r = D;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (D != null)
                    throw Error(o(137, e));
                  break;
                default:
                  Ot(t, e, a, D, l, null);
              }
          }
        Eo(
          t,
          u,
          r,
          m,
          T,
          f,
          n,
          !1
        );
        return;
      case "select":
        ot("invalid", t), a = f = u = null;
        for (n in l)
          if (l.hasOwnProperty(n) && (r = l[n], r != null))
            switch (n) {
              case "value":
                u = r;
                break;
              case "defaultValue":
                f = r;
                break;
              case "multiple":
                a = r;
              default:
                Ot(t, e, n, r, l, null);
            }
        e = u, l = f, t.multiple = !!a, e != null ? da(t, !!a, e, !1) : l != null && da(t, !!a, l, !0);
        return;
      case "textarea":
        ot("invalid", t), u = n = a = null;
        for (f in l)
          if (l.hasOwnProperty(f) && (r = l[f], r != null))
            switch (f) {
              case "value":
                a = r;
                break;
              case "defaultValue":
                n = r;
                break;
              case "children":
                u = r;
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(o(91));
                break;
              default:
                Ot(t, e, f, r, l, null);
            }
        zo(t, a, n, u);
        return;
      case "option":
        for (m in l)
          if (l.hasOwnProperty(m) && (a = l[m], a != null))
            switch (m) {
              case "selected":
                t.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                Ot(t, e, m, a, l, null);
            }
        return;
      case "dialog":
        ot("beforetoggle", t), ot("toggle", t), ot("cancel", t), ot("close", t);
        break;
      case "iframe":
      case "object":
        ot("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Gn.length; a++)
          ot(Gn[a], t);
        break;
      case "image":
        ot("error", t), ot("load", t);
        break;
      case "details":
        ot("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        ot("error", t), ot("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (T in l)
          if (l.hasOwnProperty(T) && (a = l[T], a != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, e));
              default:
                Ot(t, e, T, a, l, null);
            }
        return;
      default:
        if (Li(e)) {
          for (D in l)
            l.hasOwnProperty(D) && (a = l[D], a !== void 0 && Ef(
              t,
              e,
              D,
              a,
              l,
              void 0
            ));
          return;
        }
    }
    for (r in l)
      l.hasOwnProperty(r) && (a = l[r], a != null && Ot(t, e, r, a, l, null));
  }
  function ly(t, e, l, a) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var n = null, u = null, f = null, r = null, m = null, T = null, D = null;
        for (z in l) {
          var I = l[z];
          if (l.hasOwnProperty(z) && I != null)
            switch (z) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                m = I;
              default:
                a.hasOwnProperty(z) || Ot(t, e, z, null, a, I);
            }
        }
        for (var E in a) {
          var z = a[E];
          if (I = l[E], a.hasOwnProperty(E) && (z != null || I != null))
            switch (E) {
              case "type":
                u = z;
                break;
              case "name":
                n = z;
                break;
              case "checked":
                T = z;
                break;
              case "defaultChecked":
                D = z;
                break;
              case "value":
                f = z;
                break;
              case "defaultValue":
                r = z;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null)
                  throw Error(o(137, e));
                break;
              default:
                z !== I && Ot(
                  t,
                  e,
                  E,
                  z,
                  a,
                  I
                );
            }
        }
        Hi(
          t,
          f,
          r,
          m,
          T,
          D,
          u,
          n
        );
        return;
      case "select":
        z = f = r = E = null;
        for (u in l)
          if (m = l[u], l.hasOwnProperty(u) && m != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                z = m;
              default:
                a.hasOwnProperty(u) || Ot(
                  t,
                  e,
                  u,
                  null,
                  a,
                  m
                );
            }
        for (n in a)
          if (u = a[n], m = l[n], a.hasOwnProperty(n) && (u != null || m != null))
            switch (n) {
              case "value":
                E = u;
                break;
              case "defaultValue":
                r = u;
                break;
              case "multiple":
                f = u;
              default:
                u !== m && Ot(
                  t,
                  e,
                  n,
                  u,
                  a,
                  m
                );
            }
        e = r, l = f, a = z, E != null ? da(t, !!l, E, !1) : !!a != !!l && (e != null ? da(t, !!l, e, !0) : da(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        z = E = null;
        for (r in l)
          if (n = l[r], l.hasOwnProperty(r) && n != null && !a.hasOwnProperty(r))
            switch (r) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ot(t, e, r, null, a, n);
            }
        for (f in a)
          if (n = a[f], u = l[f], a.hasOwnProperty(f) && (n != null || u != null))
            switch (f) {
              case "value":
                E = n;
                break;
              case "defaultValue":
                z = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== u && Ot(t, e, f, n, a, u);
            }
        Oo(t, E, z);
        return;
      case "option":
        for (var q in l)
          if (E = l[q], l.hasOwnProperty(q) && E != null && !a.hasOwnProperty(q))
            switch (q) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Ot(
                  t,
                  e,
                  q,
                  null,
                  a,
                  E
                );
            }
        for (m in a)
          if (E = a[m], z = l[m], a.hasOwnProperty(m) && E !== z && (E != null || z != null))
            switch (m) {
              case "selected":
                t.selected = E && typeof E != "function" && typeof E != "symbol";
                break;
              default:
                Ot(
                  t,
                  e,
                  m,
                  E,
                  a,
                  z
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var J in l)
          E = l[J], l.hasOwnProperty(J) && E != null && !a.hasOwnProperty(J) && Ot(t, e, J, null, a, E);
        for (T in a)
          if (E = a[T], z = l[T], a.hasOwnProperty(T) && E !== z && (E != null || z != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (E != null)
                  throw Error(o(137, e));
                break;
              default:
                Ot(
                  t,
                  e,
                  T,
                  E,
                  a,
                  z
                );
            }
        return;
      default:
        if (Li(e)) {
          for (var zt in l)
            E = l[zt], l.hasOwnProperty(zt) && E !== void 0 && !a.hasOwnProperty(zt) && Ef(
              t,
              e,
              zt,
              void 0,
              a,
              E
            );
          for (D in a)
            E = a[D], z = l[D], !a.hasOwnProperty(D) || E === z || E === void 0 && z === void 0 || Ef(
              t,
              e,
              D,
              E,
              a,
              z
            );
          return;
        }
    }
    for (var b in l)
      E = l[b], l.hasOwnProperty(b) && E != null && !a.hasOwnProperty(b) && Ot(t, e, b, null, a, E);
    for (I in a)
      E = a[I], z = l[I], !a.hasOwnProperty(I) || E === z || E == null && z == null || Ot(t, e, I, E, a, z);
  }
  function Dd(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function ay() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var n = l[a], u = n.transferSize, f = n.initiatorType, r = n.duration;
        if (u && r && Dd(f)) {
          for (f = 0, r = n.responseEnd, a += 1; a < l.length; a++) {
            var m = l[a], T = m.startTime;
            if (T > r) break;
            var D = m.transferSize, I = m.initiatorType;
            D && Dd(I) && (m = m.responseEnd, f += D * (m < r ? 1 : (r - T) / (m - T)));
          }
          if (--a, e += 8 * (u + f) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Of = null, zf = null;
  function li(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Rd(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Ud(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function Nf(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var _f = null;
  function ny() {
    var t = window.event;
    return t && t.type === "popstate" ? t === _f ? !1 : (_f = t, !0) : (_f = null, !1);
  }
  var Id = typeof setTimeout == "function" ? setTimeout : void 0, uy = typeof clearTimeout == "function" ? clearTimeout : void 0, xd = typeof Promise == "function" ? Promise : void 0, iy = typeof queueMicrotask == "function" ? queueMicrotask : typeof xd != "undefined" ? function(t) {
    return xd.resolve(null).then(t).catch(cy);
  } : Id;
  function cy(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Ul(t) {
    return t === "head";
  }
  function Bd(t, e) {
    var l = e, a = 0;
    do {
      var n = l.nextSibling;
      if (t.removeChild(l), n && n.nodeType === 8)
        if (l = n.data, l === "/$" || l === "/&") {
          if (a === 0) {
            t.removeChild(n), Va(e);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          Zn(t.ownerDocument.documentElement);
        else if (l === "head") {
          l = t.ownerDocument.head, Zn(l);
          for (var u = l.firstChild; u; ) {
            var f = u.nextSibling, r = u.nodeName;
            u[ln] || r === "SCRIPT" || r === "STYLE" || r === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = f;
          }
        } else
          l === "body" && Zn(t.ownerDocument.body);
      l = n;
    } while (l);
    Va(e);
  }
  function Hd(t, e) {
    var l = t;
    t = 0;
    do {
      var a = l.nextSibling;
      if (l.nodeType === 1 ? e ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (e ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), a && a.nodeType === 8)
        if (l = a.data, l === "/$") {
          if (t === 0) break;
          t--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || t++;
      l = a;
    } while (l);
  }
  function Df(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Df(l), xi(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(l);
    }
  }
  function fy(t, e, l, a) {
    for (; t.nodeType === 1; ) {
      var n = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[ln])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== n.rel || t.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || t.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (n.src == null ? null : n.src) || t.getAttribute("type") !== (n.type == null ? null : n.type) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = Le(t.nextSibling), t === null) break;
    }
    return null;
  }
  function oy(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Le(t.nextSibling), t === null)) return null;
    return t;
  }
  function Gd(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Le(t.nextSibling), t === null)) return null;
    return t;
  }
  function Rf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Uf(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function sy(t, e) {
    var l = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || l.readyState !== "loading")
      e();
    else {
      var a = function() {
        e(), l.removeEventListener("DOMContentLoaded", a);
      };
      l.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
    }
  }
  function Le(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var If = null;
  function Ld(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (e === 0)
            return Le(t.nextSibling);
          e--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Zd(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (e === 0) return t;
          e--;
        } else l !== "/$" && l !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Yd(t, e, l) {
    switch (e = li(l), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(o(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(o(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(o(454));
        return t;
      default:
        throw Error(o(451));
    }
  }
  function Zn(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    xi(t);
  }
  var Ze = /* @__PURE__ */ new Map(), wd = /* @__PURE__ */ new Set();
  function ai(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var rl = H.d;
  H.d = {
    f: ry,
    r: dy,
    D: hy,
    C: my,
    L: gy,
    m: yy,
    X: py,
    S: vy,
    M: Sy
  };
  function ry() {
    var t = rl.f(), e = ku();
    return t || e;
  }
  function dy(t) {
    var e = oa(t);
    e !== null && e.tag === 5 && e.type === "form" ? nr(e) : rl.r(t);
  }
  var wa = typeof document == "undefined" ? null : document;
  function jd(t, e, l) {
    var a = wa;
    if (a && typeof e == "string" && e) {
      var n = Re(e);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), wd.has(n) || (wd.add(n), t = { rel: t, crossOrigin: l, href: e }, a.querySelector(n) === null && (e = a.createElement("link"), ce(e, "link", t), te(e), a.head.appendChild(e)));
    }
  }
  function hy(t) {
    rl.D(t), jd("dns-prefetch", t, null);
  }
  function my(t, e) {
    rl.C(t, e), jd("preconnect", t, e);
  }
  function gy(t, e, l) {
    rl.L(t, e, l);
    var a = wa;
    if (a && t && e) {
      var n = 'link[rel="preload"][as="' + Re(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + Re(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + Re(
        l.imageSizes
      ) + '"]')) : n += '[href="' + Re(t) + '"]';
      var u = n;
      switch (e) {
        case "style":
          u = ja(t);
          break;
        case "script":
          u = qa(t);
      }
      Ze.has(u) || (t = M(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), Ze.set(u, t), a.querySelector(n) !== null || e === "style" && a.querySelector(Yn(u)) || e === "script" && a.querySelector(wn(u)) || (e = a.createElement("link"), ce(e, "link", t), te(e), a.head.appendChild(e)));
    }
  }
  function yy(t, e) {
    rl.m(t, e);
    var l = wa;
    if (l && t) {
      var a = e && typeof e.as == "string" ? e.as : "script", n = 'link[rel="modulepreload"][as="' + Re(a) + '"][href="' + Re(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = qa(t);
      }
      if (!Ze.has(u) && (t = M({ rel: "modulepreload", href: t }, e), Ze.set(u, t), l.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(wn(u)))
              return;
        }
        a = l.createElement("link"), ce(a, "link", t), te(a), l.head.appendChild(a);
      }
    }
  }
  function vy(t, e, l) {
    rl.S(t, e, l);
    var a = wa;
    if (a && t) {
      var n = sa(a).hoistableStyles, u = ja(t);
      e = e || "default";
      var f = n.get(u);
      if (!f) {
        var r = { loading: 0, preload: null };
        if (f = a.querySelector(
          Yn(u)
        ))
          r.loading = 5;
        else {
          t = M(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = Ze.get(u)) && xf(t, l);
          var m = f = a.createElement("link");
          te(m), ce(m, "link", t), m._p = new Promise(function(T, D) {
            m.onload = T, m.onerror = D;
          }), m.addEventListener("load", function() {
            r.loading |= 1;
          }), m.addEventListener("error", function() {
            r.loading |= 2;
          }), r.loading |= 4, ni(f, e, a);
        }
        f = {
          type: "stylesheet",
          instance: f,
          count: 1,
          state: r
        }, n.set(u, f);
      }
    }
  }
  function py(t, e) {
    rl.X(t, e);
    var l = wa;
    if (l && t) {
      var a = sa(l).hoistableScripts, n = qa(t), u = a.get(n);
      u || (u = l.querySelector(wn(n)), u || (t = M({ src: t, async: !0 }, e), (e = Ze.get(n)) && Bf(t, e), u = l.createElement("script"), te(u), ce(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Sy(t, e) {
    rl.M(t, e);
    var l = wa;
    if (l && t) {
      var a = sa(l).hoistableScripts, n = qa(t), u = a.get(n);
      u || (u = l.querySelector(wn(n)), u || (t = M({ src: t, async: !0, type: "module" }, e), (e = Ze.get(n)) && Bf(t, e), u = l.createElement("script"), te(u), ce(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function qd(t, e, l, a) {
    var n = (n = Z.current) ? ai(n) : null;
    if (!n) throw Error(o(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (e = ja(l.href), l = sa(
          n
        ).hoistableStyles, a = l.get(e), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = ja(l.href);
          var u = sa(
            n
          ).hoistableStyles, f = u.get(t);
          if (f || (n = n.ownerDocument || n, f = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, f), (u = n.querySelector(
            Yn(t)
          )) && !u._p && (f.instance = u, f.state.loading = 5), Ze.has(t) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Ze.set(t, l), u || by(
            n,
            t,
            l,
            f.state
          ))), e && a === null)
            throw Error(o(528, ""));
          return f;
        }
        if (e && a !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = qa(l), l = sa(
          n
        ).hoistableScripts, a = l.get(e), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, t));
    }
  }
  function ja(t) {
    return 'href="' + Re(t) + '"';
  }
  function Yn(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Vd(t) {
    return M({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function by(t, e, l, a) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? a.loading = 1 : (e = t.createElement("link"), a.preload = e, e.addEventListener("load", function() {
      return a.loading |= 1;
    }), e.addEventListener("error", function() {
      return a.loading |= 2;
    }), ce(e, "link", l), te(e), t.head.appendChild(e));
  }
  function qa(t) {
    return '[src="' + Re(t) + '"]';
  }
  function wn(t) {
    return "script[async]" + t;
  }
  function Qd(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + Re(l.href) + '"]'
          );
          if (a)
            return e.instance = a, te(a), a;
          var n = M({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), te(a), ce(a, "style", n), ni(a, l.precedence, t), e.instance = a;
        case "stylesheet":
          n = ja(l.href);
          var u = t.querySelector(
            Yn(n)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, te(u), u;
          a = Vd(l), (n = Ze.get(n)) && xf(a, n), u = (t.ownerDocument || t).createElement("link"), te(u);
          var f = u;
          return f._p = new Promise(function(r, m) {
            f.onload = r, f.onerror = m;
          }), ce(u, "link", a), e.state.loading |= 4, ni(u, l.precedence, t), e.instance = u;
        case "script":
          return u = qa(l.src), (n = t.querySelector(
            wn(u)
          )) ? (e.instance = n, te(n), n) : (a = l, (n = Ze.get(u)) && (a = M({}, l), Bf(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), te(n), ce(n, "link", a), t.head.appendChild(n), e.instance = n);
        case "void":
          return null;
        default:
          throw Error(o(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (a = e.instance, e.state.loading |= 4, ni(a, l.precedence, t));
    return e.instance;
  }
  function ni(t, e, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, f = 0; f < a.length; f++) {
      var r = a[f];
      if (r.dataset.precedence === e) u = r;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function xf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Bf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var ui = null;
  function Xd(t, e, l) {
    if (ui === null) {
      var a = /* @__PURE__ */ new Map(), n = ui = /* @__PURE__ */ new Map();
      n.set(l, a);
    } else
      n = ui, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
    if (a.has(t)) return a;
    for (a.set(t, null), l = l.getElementsByTagName(t), n = 0; n < l.length; n++) {
      var u = l[n];
      if (!(u[ln] || u[ae] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = u.getAttribute(e) || "";
        f = t + f;
        var r = a.get(f);
        r ? r.push(u) : a.set(f, [u]);
      }
    }
    return a;
  }
  function Kd(t, e, l) {
    t = t.ownerDocument || t, t.head.insertBefore(
      l,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function Cy(t, e, l) {
    if (l === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        switch (e.rel) {
          case "stylesheet":
            return t = e.disabled, typeof e.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function kd(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Ay(t, e, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var n = ja(a.href), u = e.querySelector(
          Yn(n)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = ii.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, te(u);
          return;
        }
        u = e.ownerDocument || e, a = Vd(a), (n = Ze.get(n)) && xf(a, n), u = u.createElement("link"), te(u);
        var f = u;
        f._p = new Promise(function(r, m) {
          f.onload = r, f.onerror = m;
        }), ce(u, "link", a), l.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = ii.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var Hf = 0;
  function Ty(t, e) {
    return t.stylesheets && t.count === 0 && fi(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (t.stylesheets && fi(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && Hf === 0 && (Hf = 62500 * ay());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && fi(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > Hf ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function ii() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) fi(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var ci = null;
  function fi(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, ci = /* @__PURE__ */ new Map(), e.forEach(My, t), ci = null, ii.call(t));
  }
  function My(t, e) {
    if (!(e.state.loading & 4)) {
      var l = ci.get(t);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), ci.set(t, l);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var f = n[u];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (l.set(f.dataset.precedence, f), a = f);
        }
        a && l.set(null, a);
      }
      n = e.instance, f = n.getAttribute("data-precedence"), u = l.get(f) || a, u === a && l.set(null, n), l.set(f, n), this.count++, a = ii.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), e.state.loading |= 4;
    }
  }
  var jn = {
    $$typeof: B,
    Provider: null,
    Consumer: null,
    _currentValue: X,
    _currentValue2: X,
    _threadCount: 0
  };
  function Ey(t, e, l, a, n, u, f, r, m) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Di(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Di(0), this.hiddenUpdates = Di(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = m, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Jd(t, e, l, a, n, u, f, r, m, T, D, I) {
    return t = new Ey(
      t,
      e,
      l,
      f,
      m,
      T,
      D,
      I,
      r
    ), e = 1, u === !0 && (e |= 24), u = Me(3, null, null, e), t.current = u, u.stateNode = t, e = mc(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: e
    }, pc(u), t;
  }
  function Fd(t) {
    return t ? (t = ba, t) : ba;
  }
  function Wd(t, e, l, a, n, u) {
    n = Fd(n), a.context === null ? a.context = n : a.pendingContext = n, a = Cl(e), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = Al(t, a, e), l !== null && (Se(l, t, e), bn(l, t, e));
  }
  function $d(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function Gf(t, e) {
    $d(t, e), (t = t.alternate) && $d(t, e);
  }
  function Pd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Xl(t, 67108864);
      e !== null && Se(e, t, 67108864), Gf(t, 67108864);
    }
  }
  function th(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = _e();
      e = Ri(e);
      var l = Xl(t, e);
      l !== null && Se(l, t, e), Gf(t, e);
    }
  }
  var oi = !0;
  function Oy(t, e, l, a) {
    var n = N.T;
    N.T = null;
    var u = H.p;
    try {
      H.p = 2, Lf(t, e, l, a);
    } finally {
      H.p = u, N.T = n;
    }
  }
  function zy(t, e, l, a) {
    var n = N.T;
    N.T = null;
    var u = H.p;
    try {
      H.p = 8, Lf(t, e, l, a);
    } finally {
      H.p = u, N.T = n;
    }
  }
  function Lf(t, e, l, a) {
    if (oi) {
      var n = Zf(a);
      if (n === null)
        Mf(
          t,
          e,
          a,
          si,
          l
        ), lh(t, a);
      else if (_y(
        n,
        t,
        e,
        l,
        a
      ))
        a.stopPropagation();
      else if (lh(t, a), e & 4 && -1 < Ny.indexOf(t)) {
        for (; n !== null; ) {
          var u = oa(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var f = wl(u.pendingLanes);
                  if (f !== 0) {
                    var r = u;
                    for (r.pendingLanes |= 2, r.entangledLanes |= 2; f; ) {
                      var m = 1 << 31 - Ae(f);
                      r.entanglements[1] |= m, f &= ~m;
                    }
                    Ke(u), (bt & 6) === 0 && (Xu = be() + 500, Hn(0));
                  }
                }
                break;
              case 31:
              case 13:
                r = Xl(u, 2), r !== null && Se(r, u, 2), ku(), Gf(u, 2);
            }
          if (u = Zf(a), u === null && Mf(
            t,
            e,
            a,
            si,
            l
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        Mf(
          t,
          e,
          a,
          null,
          l
        );
    }
  }
  function Zf(t) {
    return t = Yi(t), Yf(t);
  }
  var si = null;
  function Yf(t) {
    if (si = null, t = fa(t), t !== null) {
      var e = g(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (t = C(e), t !== null) return t;
          t = null;
        } else if (l === 31) {
          if (t = v(e), t !== null) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return si = t, null;
  }
  function eh(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (hm()) {
          case fo:
            return 2;
          case oo:
            return 8;
          case Pn:
          case mm:
            return 32;
          case so:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var wf = !1, Il = null, xl = null, Bl = null, qn = /* @__PURE__ */ new Map(), Vn = /* @__PURE__ */ new Map(), Hl = [], Ny = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function lh(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        Il = null;
        break;
      case "dragenter":
      case "dragleave":
        xl = null;
        break;
      case "mouseover":
      case "mouseout":
        Bl = null;
        break;
      case "pointerover":
      case "pointerout":
        qn.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Vn.delete(e.pointerId);
    }
  }
  function Qn(t, e, l, a, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, e !== null && (e = oa(e), e !== null && Pd(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), t);
  }
  function _y(t, e, l, a, n) {
    switch (e) {
      case "focusin":
        return Il = Qn(
          Il,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "dragenter":
        return xl = Qn(
          xl,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "mouseover":
        return Bl = Qn(
          Bl,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return qn.set(
          u,
          Qn(
            qn.get(u) || null,
            t,
            e,
            l,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Vn.set(
          u,
          Qn(
            Vn.get(u) || null,
            t,
            e,
            l,
            a,
            n
          )
        ), !0;
    }
    return !1;
  }
  function ah(t) {
    var e = fa(t.target);
    if (e !== null) {
      var l = g(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = C(l), e !== null) {
            t.blockedOn = e, vo(t.priority, function() {
              th(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = v(l), e !== null) {
            t.blockedOn = e, vo(t.priority, function() {
              th(l);
            });
            return;
          }
        } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function ri(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = Zf(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        Zi = a, l.target.dispatchEvent(a), Zi = null;
      } else
        return e = oa(l), e !== null && Pd(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function nh(t, e, l) {
    ri(t) && l.delete(e);
  }
  function Dy() {
    wf = !1, Il !== null && ri(Il) && (Il = null), xl !== null && ri(xl) && (xl = null), Bl !== null && ri(Bl) && (Bl = null), qn.forEach(nh), Vn.forEach(nh);
  }
  function di(t, e) {
    t.blockedOn === e && (t.blockedOn = null, wf || (wf = !0, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      Dy
    )));
  }
  var hi = null;
  function uh(t) {
    hi !== t && (hi = t, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      function() {
        hi === t && (hi = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], a = t[e + 1], n = t[e + 2];
          if (typeof a != "function") {
            if (Yf(a || l) === null)
              continue;
            break;
          }
          var u = oa(l);
          u !== null && (t.splice(e, 3), e -= 3, Lc(
            u,
            {
              pending: !0,
              data: n,
              method: l.method,
              action: a
            },
            a,
            n
          ));
        }
      }
    ));
  }
  function Va(t) {
    function e(m) {
      return di(m, t);
    }
    Il !== null && di(Il, t), xl !== null && di(xl, t), Bl !== null && di(Bl, t), qn.forEach(e), Vn.forEach(e);
    for (var l = 0; l < Hl.length; l++) {
      var a = Hl[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < Hl.length && (l = Hl[0], l.blockedOn === null); )
      ah(l), l.blockedOn === null && Hl.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var n = l[a], u = l[a + 1], f = n[he] || null;
        if (typeof u == "function")
          f || uh(l);
        else if (f) {
          var r = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, f = u[he] || null)
              r = f.formAction;
            else if (Yf(n) !== null) continue;
          } else r = f.action;
          typeof r == "function" ? l[a + 1] = r : (l.splice(a, 3), a -= 3), uh(l);
        }
      }
  }
  function ih() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(f) {
            return n = f;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      n !== null && (n(), n = null), a || setTimeout(l, 20);
    }
    function l() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, n = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(l, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), n !== null && (n(), n = null);
      };
    }
  }
  function jf(t) {
    this._internalRoot = t;
  }
  mi.prototype.render = jf.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(o(409));
    var l = e.current, a = _e();
    Wd(l, a, t, e, null, null);
  }, mi.prototype.unmount = jf.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Wd(t.current, 2, null, t, null, null), ku(), e[ca] = null;
    }
  };
  function mi(t) {
    this._internalRoot = t;
  }
  mi.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = yo();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < Hl.length && e !== 0 && e < Hl[l].priority; l++) ;
      Hl.splice(l, 0, t), l === 0 && ah(t);
    }
  };
  var ch = c.version;
  if (ch !== "19.2.0")
    throw Error(
      o(
        527,
        ch,
        "19.2.0"
      )
    );
  H.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(o(188)) : (t = Object.keys(t).join(","), Error(o(268, t)));
    return t = h(e), t = t !== null ? O(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Ry = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: N,
    reconcilerVersion: "19.2.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined") {
    var gi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!gi.isDisabled && gi.supportsFiber)
      try {
        Pa = gi.inject(
          Ry
        ), Ce = gi;
      } catch (t) {
      }
  }
  return Xn.createRoot = function(t, e) {
    if (!d(t)) throw Error(o(299));
    var l = !1, a = "", n = mr, u = gr, f = yr;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (f = e.onRecoverableError)), e = Jd(
      t,
      1,
      !1,
      null,
      null,
      l,
      a,
      null,
      n,
      u,
      f,
      ih
    ), t[ca] = e.current, Tf(t), new jf(e);
  }, Xn.hydrateRoot = function(t, e, l) {
    if (!d(t)) throw Error(o(299));
    var a = !1, n = "", u = mr, f = gr, r = yr, m = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (f = l.onCaughtError), l.onRecoverableError !== void 0 && (r = l.onRecoverableError), l.formState !== void 0 && (m = l.formState)), e = Jd(
      t,
      1,
      !0,
      e,
      l != null ? l : null,
      a,
      n,
      m,
      u,
      f,
      r,
      ih
    ), e.context = Fd(null), l = e.current, a = _e(), a = Ri(a), n = Cl(a), n.callback = null, Al(l, n, a), l = a, e.current.lanes = l, en(e, l), Ke(e), t[ca] = e.current, Tf(t), new mi(e);
  }, Xn.version = "19.2.0", Xn;
}
var Sh;
function qy() {
  if (Sh) return Kf.exports;
  Sh = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ == "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (c) {
        console.error(c);
      }
  }
  return i(), Kf.exports = jy(), Kf.exports;
}
var Vy = qy(), Wf = { exports: {} }, Kn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bh;
function Qy() {
  if (bh) return Kn;
  bh = 1;
  var i = Symbol.for("react.transitional.element"), c = Symbol.for("react.fragment");
  function s(o, d, g) {
    var C = null;
    if (g !== void 0 && (C = "" + g), d.key !== void 0 && (C = "" + d.key), "key" in d) {
      g = {};
      for (var v in d)
        v !== "key" && (g[v] = d[v]);
    } else g = d;
    return d = g.ref, {
      $$typeof: i,
      type: o,
      key: C,
      ref: d !== void 0 ? d : null,
      props: g
    };
  }
  return Kn.Fragment = c, Kn.jsx = s, Kn.jsxs = s, Kn;
}
var Ch;
function Xy() {
  return Ch || (Ch = 1, Wf.exports = Qy()), Wf.exports;
}
var P = Xy();
/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ky = (i) => i.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ky = (i) => i.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (c, s, o) => o ? o.toUpperCase() : s.toLowerCase()
), Ah = (i) => {
  const c = ky(i);
  return c.charAt(0).toUpperCase() + c.slice(1);
}, Gh = (...i) => i.filter((c, s, o) => !!c && c.trim() !== "" && o.indexOf(c) === s).join(" ").trim(), Jy = (i) => {
  for (const c in i)
    if (c.startsWith("aria-") || c === "role" || c === "title")
      return !0;
};
/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Fy = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wy = se.forwardRef(
  (h, y) => {
    var O = h, {
      color: i = "currentColor",
      size: c = 24,
      strokeWidth: s = 2,
      absoluteStrokeWidth: o,
      className: d = "",
      children: g,
      iconNode: C
    } = O, v = Vf(O, [
      "color",
      "size",
      "strokeWidth",
      "absoluteStrokeWidth",
      "className",
      "children",
      "iconNode"
    ]);
    return se.createElement(
      "svg",
      Ll(Ll(sh(Ll({
        ref: y
      }, Fy), {
        width: c,
        height: c,
        stroke: i,
        strokeWidth: o ? Number(s) * 24 / Number(c) : s,
        className: Gh("lucide", d)
      }), !g && !Jy(v) && { "aria-hidden": "true" }), v),
      [
        ...C.map(([M, x]) => se.createElement(M, x)),
        ...Array.isArray(g) ? g : [g]
      ]
    );
  }
);
/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ia = (i, c) => {
  const s = se.forwardRef(
    (C, g) => {
      var v = C, { className: o } = v, d = Vf(v, ["className"]);
      return se.createElement(Wy, Ll({
        ref: g,
        iconNode: c,
        className: Gh(
          `lucide-${Ky(Ah(i))}`,
          `lucide-${i}`,
          o
        )
      }, d));
    }
  );
  return s.displayName = Ah(i), s;
};
/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $y = [
  ["path", { d: "M12 20v-9", key: "1qisl0" }],
  ["path", { d: "M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z", key: "uouzyp" }],
  ["path", { d: "M14.12 3.88 16 2", key: "qol33r" }],
  ["path", { d: "M21 21a4 4 0 0 0-3.81-4", key: "1b0z45" }],
  ["path", { d: "M21 5a4 4 0 0 1-3.55 3.97", key: "5cxbf6" }],
  ["path", { d: "M22 13h-4", key: "1jl80f" }],
  ["path", { d: "M3 21a4 4 0 0 1 3.81-4", key: "1fjd4g" }],
  ["path", { d: "M3 5a4 4 0 0 0 3.55 3.97", key: "1d7oge" }],
  ["path", { d: "M6 13H2", key: "82j7cp" }],
  ["path", { d: "m8 2 1.88 1.88", key: "fmnt4t" }],
  ["path", { d: "M9 7.13V6a3 3 0 1 1 6 0v1.13", key: "1vgav8" }]
], Py = ia("bug", $y);
/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tv = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
], ev = ia("heart", tv);
/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lv = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
], av = ia("lightbulb", lv);
/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nv = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], uv = ia("send", nv);
/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iv = [
  [
    "path",
    { d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196", key: "w8jjjt" }
  ],
  ["path", { d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2", key: "1xawa7" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], cv = ia("video-off", iv);
/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fv = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
], ov = ia("video", fv);
/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sv = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], rv = ia("x", sv);
var le;
(function(i) {
  i[i.Document = 0] = "Document", i[i.DocumentType = 1] = "DocumentType", i[i.Element = 2] = "Element", i[i.Text = 3] = "Text", i[i.CDATA = 4] = "CDATA", i[i.Comment = 5] = "Comment";
})(le || (le = {}));
function dv(i) {
  return i.nodeType === i.ELEMENT_NODE;
}
function kn(i) {
  var c = i == null ? void 0 : i.host;
  return (c == null ? void 0 : c.shadowRoot) === i;
}
function Jn(i) {
  return Object.prototype.toString.call(i) === "[object ShadowRoot]";
}
function hv(i) {
  return i.includes(" background-clip: text;") && !i.includes(" -webkit-background-clip: text;") && (i = i.replace(" background-clip: text;", " -webkit-background-clip: text; background-clip: text;")), i;
}
function eo(i) {
  try {
    var c = i.rules || i.cssRules;
    return c ? hv(Array.from(c).map(Lh).join("")) : null;
  } catch (s) {
    return null;
  }
}
function Lh(i) {
  var c = i.cssText;
  if (mv(i))
    try {
      c = eo(i.styleSheet) || c;
    } catch (s) {
    }
  return c;
}
function mv(i) {
  return "styleSheet" in i;
}
var Zh = (function() {
  function i() {
    this.idNodeMap = /* @__PURE__ */ new Map(), this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
  }
  return i.prototype.getId = function(c) {
    var s;
    if (!c)
      return -1;
    var o = (s = this.getMeta(c)) === null || s === void 0 ? void 0 : s.id;
    return o != null ? o : -1;
  }, i.prototype.getNode = function(c) {
    return this.idNodeMap.get(c) || null;
  }, i.prototype.getIds = function() {
    return Array.from(this.idNodeMap.keys());
  }, i.prototype.getMeta = function(c) {
    return this.nodeMetaMap.get(c) || null;
  }, i.prototype.removeNodeFromMap = function(c) {
    var s = this, o = this.getId(c);
    this.idNodeMap.delete(o), c.childNodes && c.childNodes.forEach(function(d) {
      return s.removeNodeFromMap(d);
    });
  }, i.prototype.has = function(c) {
    return this.idNodeMap.has(c);
  }, i.prototype.hasNode = function(c) {
    return this.nodeMetaMap.has(c);
  }, i.prototype.add = function(c, s) {
    var o = s.id;
    this.idNodeMap.set(o, c), this.nodeMetaMap.set(c, s);
  }, i.prototype.replace = function(c, s) {
    var o = this.getNode(c);
    if (o) {
      var d = this.nodeMetaMap.get(o);
      d && this.nodeMetaMap.set(s, d);
    }
    this.idNodeMap.set(c, s);
  }, i.prototype.reset = function() {
    this.idNodeMap = /* @__PURE__ */ new Map(), this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
  }, i;
})();
function gv() {
  return new Zh();
}
function uo(i) {
  var c = i.maskInputOptions, s = i.tagName, o = i.type, d = i.value, g = i.maskInputFn, C = d || "";
  return (c[s.toLowerCase()] || c[o]) && (g ? C = g(C) : C = "*".repeat(C.length)), C;
}
var Th = "__rrweb_original__";
function yv(i) {
  var c = i.getContext("2d");
  if (!c)
    return !0;
  for (var s = 50, o = 0; o < i.width; o += s)
    for (var d = 0; d < i.height; d += s) {
      var g = c.getImageData, C = Th in g ? g[Th] : g, v = new Uint32Array(C.call(c, o, d, Math.min(s, i.width - o), Math.min(s, i.height - d)).data.buffer);
      if (v.some(function(y) {
        return y !== 0;
      }))
        return !1;
    }
  return !0;
}
var vv = 1, pv = new RegExp("[^a-z0-9-_:]"), Fn = -2;
function Yh() {
  return vv++;
}
function Sv(i) {
  if (i instanceof HTMLFormElement)
    return "form";
  var c = i.tagName.toLowerCase().trim();
  return pv.test(c) ? "div" : c;
}
function bv(i) {
  return i.cssRules ? Array.from(i.cssRules).map(function(c) {
    return c.cssText || "";
  }).join("") : "";
}
function Cv(i) {
  var c = "";
  return i.indexOf("//") > -1 ? c = i.split("/").slice(0, 3).join("/") : c = i.split("/")[0], c = c.split("?")[0], c;
}
var Qa, Mh, Av = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm, Tv = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|#).*/, Mv = /^(data:)([^,]*),(.*)/i;
function Ci(i, c) {
  return (i || "").replace(Av, function(s, o, d, g, C, v) {
    var y = d || C || v, h = o || g || "";
    if (!y)
      return s;
    if (!Tv.test(y) || Mv.test(y))
      return "url(".concat(h).concat(y).concat(h, ")");
    if (y[0] === "/")
      return "url(".concat(h).concat(Cv(c) + y).concat(h, ")");
    var O = c.split("/"), M = y.split("/");
    O.pop();
    for (var x = 0, L = M; x < L.length; x++) {
      var U = L[x];
      U !== "." && (U === ".." ? O.pop() : O.push(U));
    }
    return "url(".concat(h).concat(O.join("/")).concat(h, ")");
  });
}
var Ev = /^[^ \t\n\r\u000c]+/, Ov = /^[, \t\n\r\u000c]+/;
function zv(i, c) {
  if (c.trim() === "")
    return c;
  var s = 0;
  function o(h) {
    var O, M = h.exec(c.substring(s));
    return M ? (O = M[0], s += O.length, O) : "";
  }
  for (var d = []; o(Ov), !(s >= c.length); ) {
    var g = o(Ev);
    if (g.slice(-1) === ",")
      g = Ka(i, g.substring(0, g.length - 1)), d.push(g);
    else {
      var C = "";
      g = Ka(i, g);
      for (var v = !1; ; ) {
        var y = c.charAt(s);
        if (y === "") {
          d.push((g + C).trim());
          break;
        } else if (v)
          y === ")" && (v = !1);
        else if (y === ",") {
          s += 1, d.push((g + C).trim());
          break;
        } else y === "(" && (v = !0);
        C += y, s += 1;
      }
    }
  }
  return d.join(", ");
}
function Ka(i, c) {
  if (!c || c.trim() === "")
    return c;
  var s = i.createElement("a");
  return s.href = c, s.href;
}
function Nv(i) {
  return !!(i.tagName === "svg" || i.ownerSVGElement);
}
function io() {
  var i = document.createElement("a");
  return i.href = "", i.href;
}
function wh(i, c, s, o) {
  return s === "src" || s === "href" && o && !(c === "use" && o[0] === "#") || s === "xlink:href" && o && o[0] !== "#" || s === "background" && o && (c === "table" || c === "td" || c === "th") ? Ka(i, o) : s === "srcset" && o ? zv(i, o) : s === "style" && o ? Ci(o, io()) : c === "object" && s === "data" && o ? Ka(i, o) : o;
}
function _v(i, c, s) {
  if (typeof c == "string") {
    if (i.classList.contains(c))
      return !0;
  } else
    for (var o = i.classList.length; o--; ) {
      var d = i.classList[o];
      if (c.test(d))
        return !0;
    }
  return s ? i.matches(s) : !1;
}
function Ai(i, c, s) {
  if (!i)
    return !1;
  if (i.nodeType !== i.ELEMENT_NODE)
    return s ? Ai(i.parentNode, c, s) : !1;
  for (var o = i.classList.length; o--; ) {
    var d = i.classList[o];
    if (c.test(d))
      return !0;
  }
  return s ? Ai(i.parentNode, c, s) : !1;
}
function jh(i, c, s) {
  var o = i.nodeType === i.ELEMENT_NODE ? i : i.parentElement;
  if (o === null)
    return !1;
  if (typeof c == "string") {
    if (o.classList.contains(c) || o.closest(".".concat(c)))
      return !0;
  } else if (Ai(o, c, !0))
    return !0;
  return !!(s && (o.matches(s) || o.closest(s)));
}
function Dv(i, c, s) {
  var o = i.contentWindow;
  if (o) {
    var d = !1, g;
    try {
      g = o.document.readyState;
    } catch (y) {
      return;
    }
    if (g !== "complete") {
      var C = setTimeout(function() {
        d || (c(), d = !0);
      }, s);
      i.addEventListener("load", function() {
        clearTimeout(C), d = !0, c();
      });
      return;
    }
    var v = "about:blank";
    if (o.location.href !== v || i.src === v || i.src === "")
      return setTimeout(c, 0), i.addEventListener("load", c);
    i.addEventListener("load", c);
  }
}
function Rv(i, c, s) {
  var o = !1, d;
  try {
    d = i.sheet;
  } catch (C) {
    return;
  }
  if (!d) {
    var g = setTimeout(function() {
      o || (c(), o = !0);
    }, s);
    i.addEventListener("load", function() {
      clearTimeout(g), o = !0, c();
    });
  }
}
function Uv(i, c) {
  var s = c.doc, o = c.mirror, d = c.blockClass, g = c.blockSelector, C = c.maskTextClass, v = c.maskTextSelector, y = c.inlineStylesheet, h = c.maskInputOptions, O = h === void 0 ? {} : h, M = c.maskTextFn, x = c.maskInputFn, L = c.dataURLOptions, U = L === void 0 ? {} : L, j = c.inlineImages, W = c.recordCanvas, Q = c.keepIframeSrcFn, Y = c.newlyAddedElement, B = Y === void 0 ? !1 : Y, F = Iv(s, o);
  switch (i.nodeType) {
    case i.DOCUMENT_NODE:
      return i.compatMode !== "CSS1Compat" ? {
        type: le.Document,
        childNodes: [],
        compatMode: i.compatMode
      } : {
        type: le.Document,
        childNodes: []
      };
    case i.DOCUMENT_TYPE_NODE:
      return {
        type: le.DocumentType,
        name: i.name,
        publicId: i.publicId,
        systemId: i.systemId,
        rootId: F
      };
    case i.ELEMENT_NODE:
      return Bv(i, {
        doc: s,
        blockClass: d,
        blockSelector: g,
        inlineStylesheet: y,
        maskInputOptions: O,
        maskInputFn: x,
        dataURLOptions: U,
        inlineImages: j,
        recordCanvas: W,
        keepIframeSrcFn: Q,
        newlyAddedElement: B,
        rootId: F
      });
    case i.TEXT_NODE:
      return xv(i, {
        maskTextClass: C,
        maskTextSelector: v,
        maskTextFn: M,
        rootId: F
      });
    case i.CDATA_SECTION_NODE:
      return {
        type: le.CDATA,
        textContent: "",
        rootId: F
      };
    case i.COMMENT_NODE:
      return {
        type: le.Comment,
        textContent: i.textContent || "",
        rootId: F
      };
    default:
      return !1;
  }
}
function Iv(i, c) {
  if (c.hasNode(i)) {
    var s = c.getId(i);
    return s === 1 ? void 0 : s;
  }
}
function xv(i, c) {
  var s, o = c.maskTextClass, d = c.maskTextSelector, g = c.maskTextFn, C = c.rootId, v = i.parentNode && i.parentNode.tagName, y = i.textContent, h = v === "STYLE" ? !0 : void 0, O = v === "SCRIPT" ? !0 : void 0;
  if (h && y) {
    try {
      i.nextSibling || i.previousSibling || !((s = i.parentNode.sheet) === null || s === void 0) && s.cssRules && (y = bv(i.parentNode.sheet));
    } catch (M) {
      console.warn("Cannot get CSS styles from text's parentNode. Error: ".concat(M), i);
    }
    y = Ci(y, io());
  }
  return O && (y = "SCRIPT_PLACEHOLDER"), !h && !O && y && jh(i, o, d) && (y = g ? g(y) : y.replace(/[\S]/g, "*")), {
    type: le.Text,
    textContent: y || "",
    isStyle: h,
    rootId: C
  };
}
function Bv(i, c) {
  for (var s = c.doc, o = c.blockClass, d = c.blockSelector, g = c.inlineStylesheet, C = c.maskInputOptions, v = C === void 0 ? {} : C, y = c.maskInputFn, h = c.dataURLOptions, O = h === void 0 ? {} : h, M = c.inlineImages, x = c.recordCanvas, L = c.keepIframeSrcFn, U = c.newlyAddedElement, j = U === void 0 ? !1 : U, W = c.rootId, Q = _v(i, o, d), Y = Sv(i), B = {}, F = i.attributes.length, St = 0; St < F; St++) {
    var gt = i.attributes[St];
    B[gt.name] = wh(s, Y, gt.name, gt.value);
  }
  if (Y === "link" && g) {
    var k = Array.from(s.styleSheets).find(function(it) {
      return it.href === i.href;
    }), ut = null;
    k && (ut = eo(k)), ut && (delete B.rel, delete B.href, B._cssText = Ci(ut, k.href));
  }
  if (Y === "style" && i.sheet && !(i.innerText || i.textContent || "").trim().length) {
    var ut = eo(i.sheet);
    ut && (B._cssText = Ci(ut, io()));
  }
  if (Y === "input" || Y === "textarea" || Y === "select") {
    var Bt = i.value, Vt = i.checked;
    B.type !== "radio" && B.type !== "checkbox" && B.type !== "submit" && B.type !== "button" && Bt ? B.value = uo({
      type: B.type,
      tagName: Y,
      value: Bt,
      maskInputOptions: v,
      maskInputFn: y
    }) : Vt && (B.checked = Vt);
  }
  if (Y === "option" && (i.selected && !v.select ? B.selected = !0 : delete B.selected), Y === "canvas" && x) {
    if (i.__context === "2d")
      yv(i) || (B.rr_dataURL = i.toDataURL(O.type, O.quality));
    else if (!("__context" in i)) {
      var Gt = i.toDataURL(O.type, O.quality), Nt = document.createElement("canvas");
      Nt.width = i.width, Nt.height = i.height;
      var Qt = Nt.toDataURL(O.type, O.quality);
      Gt !== Qt && (B.rr_dataURL = Gt);
    }
  }
  if (Y === "img" && M) {
    Qa || (Qa = s.createElement("canvas"), Mh = Qa.getContext("2d"));
    var At = i, Ut = At.crossOrigin;
    At.crossOrigin = "anonymous";
    var N = function() {
      try {
        Qa.width = At.naturalWidth, Qa.height = At.naturalHeight, Mh.drawImage(At, 0, 0), B.rr_dataURL = Qa.toDataURL(O.type, O.quality);
      } catch (it) {
        console.warn("Cannot inline img src=".concat(At.currentSrc, "! Error: ").concat(it));
      }
      Ut ? B.crossOrigin = Ut : At.removeAttribute("crossorigin");
    };
    At.complete && At.naturalWidth !== 0 ? N() : At.onload = N;
  }
  if ((Y === "audio" || Y === "video") && (B.rr_mediaState = i.paused ? "paused" : "played", B.rr_mediaCurrentTime = i.currentTime), j || (i.scrollLeft && (B.rr_scrollLeft = i.scrollLeft), i.scrollTop && (B.rr_scrollTop = i.scrollTop)), Q) {
    var H = i.getBoundingClientRect(), X = H.width, at = H.height;
    B = {
      class: B.class,
      rr_width: "".concat(X, "px"),
      rr_height: "".concat(at, "px")
    };
  }
  return Y === "iframe" && !L(B.src) && (i.contentDocument || (B.rr_src = B.src), delete B.src), {
    type: le.Element,
    tagName: Y,
    attributes: B,
    childNodes: [],
    isSVG: Nv(i) || void 0,
    needBlock: Q,
    rootId: W
  };
}
function Dt(i) {
  return i === void 0 ? "" : i.toLowerCase();
}
function Hv(i, c) {
  if (c.comment && i.type === le.Comment)
    return !0;
  if (i.type === le.Element) {
    if (c.script && (i.tagName === "script" || i.tagName === "link" && i.attributes.rel === "preload" && i.attributes.as === "script" || i.tagName === "link" && i.attributes.rel === "prefetch" && typeof i.attributes.href == "string" && i.attributes.href.endsWith(".js")))
      return !0;
    if (c.headFavicon && (i.tagName === "link" && i.attributes.rel === "shortcut icon" || i.tagName === "meta" && (Dt(i.attributes.name).match(/^msapplication-tile(image|color)$/) || Dt(i.attributes.name) === "application-name" || Dt(i.attributes.rel) === "icon" || Dt(i.attributes.rel) === "apple-touch-icon" || Dt(i.attributes.rel) === "shortcut icon")))
      return !0;
    if (i.tagName === "meta") {
      if (c.headMetaDescKeywords && Dt(i.attributes.name).match(/^description|keywords$/))
        return !0;
      if (c.headMetaSocial && (Dt(i.attributes.property).match(/^(og|twitter|fb):/) || Dt(i.attributes.name).match(/^(og|twitter):/) || Dt(i.attributes.name) === "pinterest"))
        return !0;
      if (c.headMetaRobots && (Dt(i.attributes.name) === "robots" || Dt(i.attributes.name) === "googlebot" || Dt(i.attributes.name) === "bingbot"))
        return !0;
      if (c.headMetaHttpEquiv && i.attributes["http-equiv"] !== void 0)
        return !0;
      if (c.headMetaAuthorship && (Dt(i.attributes.name) === "author" || Dt(i.attributes.name) === "generator" || Dt(i.attributes.name) === "framework" || Dt(i.attributes.name) === "publisher" || Dt(i.attributes.name) === "progid" || Dt(i.attributes.property).match(/^article:/) || Dt(i.attributes.property).match(/^product:/)))
        return !0;
      if (c.headMetaVerification && (Dt(i.attributes.name) === "google-site-verification" || Dt(i.attributes.name) === "yandex-verification" || Dt(i.attributes.name) === "csrf-token" || Dt(i.attributes.name) === "p:domain_verify" || Dt(i.attributes.name) === "verify-v1" || Dt(i.attributes.name) === "verification" || Dt(i.attributes.name) === "shopify-checkout-api-token"))
        return !0;
    }
  }
  return !1;
}
function ka(i, c) {
  var s = c.doc, o = c.mirror, d = c.blockClass, g = c.blockSelector, C = c.maskTextClass, v = c.maskTextSelector, y = c.skipChild, h = y === void 0 ? !1 : y, O = c.inlineStylesheet, M = O === void 0 ? !0 : O, x = c.maskInputOptions, L = x === void 0 ? {} : x, U = c.maskTextFn, j = c.maskInputFn, W = c.slimDOMOptions, Q = c.dataURLOptions, Y = Q === void 0 ? {} : Q, B = c.inlineImages, F = B === void 0 ? !1 : B, St = c.recordCanvas, gt = St === void 0 ? !1 : St, k = c.onSerialize, ut = c.onIframeLoad, Bt = c.iframeLoadTimeout, Vt = Bt === void 0 ? 5e3 : Bt, Gt = c.onStylesheetLoad, Nt = c.stylesheetLoadTimeout, Qt = Nt === void 0 ? 5e3 : Nt, At = c.keepIframeSrcFn, Ut = At === void 0 ? function() {
    return !1;
  } : At, N = c.newlyAddedElement, H = N === void 0 ? !1 : N, X = c.preserveWhiteSpace, at = X === void 0 ? !0 : X, it = Uv(i, {
    doc: s,
    mirror: o,
    blockClass: d,
    blockSelector: g,
    maskTextClass: C,
    maskTextSelector: v,
    inlineStylesheet: M,
    maskInputOptions: L,
    maskTextFn: U,
    maskInputFn: j,
    dataURLOptions: Y,
    inlineImages: F,
    recordCanvas: gt,
    keepIframeSrcFn: Ut,
    newlyAddedElement: H
  });
  if (!it)
    return console.warn(i, "not serialized"), null;
  var p;
  o.hasNode(i) ? p = o.getId(i) : Hv(it, W) || !at && it.type === le.Text && !it.isStyle && !it.textContent.replace(/^\s+|\s+$/gm, "").length ? p = Fn : p = Yh();
  var _ = Object.assign(it, { id: p });
  if (o.add(i, _), p === Fn)
    return null;
  k && k(i);
  var G = !h;
  if (_.type === le.Element) {
    G = G && !_.needBlock, delete _.needBlock;
    var w = i.shadowRoot;
    w && Jn(w) && (_.isShadowHost = !0);
  }
  if ((_.type === le.Document || _.type === le.Element) && G) {
    W.headWhitespace && _.type === le.Element && _.tagName === "head" && (at = !1);
    for (var $ = {
      doc: s,
      mirror: o,
      blockClass: d,
      blockSelector: g,
      maskTextClass: C,
      maskTextSelector: v,
      skipChild: h,
      inlineStylesheet: M,
      maskInputOptions: L,
      maskTextFn: U,
      maskInputFn: j,
      slimDOMOptions: W,
      dataURLOptions: Y,
      inlineImages: F,
      recordCanvas: gt,
      preserveWhiteSpace: at,
      onSerialize: k,
      onIframeLoad: ut,
      iframeLoadTimeout: Vt,
      onStylesheetLoad: Gt,
      stylesheetLoadTimeout: Qt,
      keepIframeSrcFn: Ut
    }, Z = 0, tt = Array.from(i.childNodes); Z < tt.length; Z++) {
      var Ct = tt[Z], et = ka(Ct, $);
      et && _.childNodes.push(et);
    }
    if (dv(i) && i.shadowRoot)
      for (var Ft = 0, dt = Array.from(i.shadowRoot.childNodes); Ft < dt.length; Ft++) {
        var Ct = dt[Ft], et = ka(Ct, $);
        et && (Jn(i.shadowRoot) && (et.isShadow = !0), _.childNodes.push(et));
      }
  }
  return i.parentNode && kn(i.parentNode) && Jn(i.parentNode) && (_.isShadow = !0), _.type === le.Element && _.tagName === "iframe" && Dv(i, function() {
    var Pt = i.contentDocument;
    if (Pt && ut) {
      var dl = ka(Pt, {
        doc: Pt,
        mirror: o,
        blockClass: d,
        blockSelector: g,
        maskTextClass: C,
        maskTextSelector: v,
        skipChild: !1,
        inlineStylesheet: M,
        maskInputOptions: L,
        maskTextFn: U,
        maskInputFn: j,
        slimDOMOptions: W,
        dataURLOptions: Y,
        inlineImages: F,
        recordCanvas: gt,
        preserveWhiteSpace: at,
        onSerialize: k,
        onIframeLoad: ut,
        iframeLoadTimeout: Vt,
        onStylesheetLoad: Gt,
        stylesheetLoadTimeout: Qt,
        keepIframeSrcFn: Ut
      });
      dl && ut(i, dl);
    }
  }, Vt), _.type === le.Element && _.tagName === "link" && _.attributes.rel === "stylesheet" && Rv(i, function() {
    if (Gt) {
      var Pt = ka(i, {
        doc: s,
        mirror: o,
        blockClass: d,
        blockSelector: g,
        maskTextClass: C,
        maskTextSelector: v,
        skipChild: !1,
        inlineStylesheet: M,
        maskInputOptions: L,
        maskTextFn: U,
        maskInputFn: j,
        slimDOMOptions: W,
        dataURLOptions: Y,
        inlineImages: F,
        recordCanvas: gt,
        preserveWhiteSpace: at,
        onSerialize: k,
        onIframeLoad: ut,
        iframeLoadTimeout: Vt,
        onStylesheetLoad: Gt,
        stylesheetLoadTimeout: Qt,
        keepIframeSrcFn: Ut
      });
      Pt && Gt(i, Pt);
    }
  }, Qt), _;
}
function Gv(i, c) {
  var s = c || {}, o = s.mirror, d = o === void 0 ? new Zh() : o, g = s.blockClass, C = g === void 0 ? "rr-block" : g, v = s.blockSelector, y = v === void 0 ? null : v, h = s.maskTextClass, O = h === void 0 ? "rr-mask" : h, M = s.maskTextSelector, x = M === void 0 ? null : M, L = s.inlineStylesheet, U = L === void 0 ? !0 : L, j = s.inlineImages, W = j === void 0 ? !1 : j, Q = s.recordCanvas, Y = Q === void 0 ? !1 : Q, B = s.maskAllInputs, F = B === void 0 ? !1 : B, St = s.maskTextFn, gt = s.maskInputFn, k = s.slimDOM, ut = k === void 0 ? !1 : k, Bt = s.dataURLOptions, Vt = s.preserveWhiteSpace, Gt = s.onSerialize, Nt = s.onIframeLoad, Qt = s.iframeLoadTimeout, At = s.onStylesheetLoad, Ut = s.stylesheetLoadTimeout, N = s.keepIframeSrcFn, H = N === void 0 ? function() {
    return !1;
  } : N, X = F === !0 ? {
    color: !0,
    date: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
    textarea: !0,
    select: !0,
    password: !0
  } : F === !1 ? {
    password: !0
  } : F, at = ut === !0 || ut === "all" ? {
    script: !0,
    comment: !0,
    headFavicon: !0,
    headWhitespace: !0,
    headMetaDescKeywords: ut === "all",
    headMetaSocial: !0,
    headMetaRobots: !0,
    headMetaHttpEquiv: !0,
    headMetaAuthorship: !0,
    headMetaVerification: !0
  } : ut === !1 ? {} : ut;
  return ka(i, {
    doc: i,
    mirror: d,
    blockClass: C,
    blockSelector: y,
    maskTextClass: O,
    maskTextSelector: x,
    skipChild: !1,
    inlineStylesheet: U,
    maskInputOptions: X,
    maskTextFn: St,
    maskInputFn: gt,
    slimDOMOptions: at,
    dataURLOptions: Bt,
    inlineImages: W,
    recordCanvas: Y,
    preserveWhiteSpace: Vt,
    onSerialize: Gt,
    onIframeLoad: Nt,
    iframeLoadTimeout: Qt,
    onStylesheetLoad: At,
    stylesheetLoadTimeout: Ut,
    keepIframeSrcFn: H,
    newlyAddedElement: !1
  });
}
function re(i, c, s = document) {
  const o = { capture: !0, passive: !0 };
  return s.addEventListener(i, c, o), () => s.removeEventListener(i, c, o);
}
const Xa = `Please stop import mirror directly. Instead of that,\r
now you can use replayer.getMirror() to access the mirror instance of a replayer,\r
or you can use record.mirror to access the mirror instance during recording.`;
let Eh = {
  map: {},
  getId() {
    return console.error(Xa), -1;
  },
  getNode() {
    return console.error(Xa), null;
  },
  removeNodeFromMap() {
    console.error(Xa);
  },
  has() {
    return console.error(Xa), !1;
  },
  reset() {
    console.error(Xa);
  }
};
typeof window != "undefined" && window.Proxy && window.Reflect && (Eh = new Proxy(Eh, {
  get(i, c, s) {
    return c === "map" && console.error(Xa), Reflect.get(i, c, s);
  }
}));
function Wn(i, c, s = {}) {
  let o = null, d = 0;
  return function(...g) {
    const C = Date.now();
    !d && s.leading === !1 && (d = C);
    const v = c - (C - d), y = this;
    v <= 0 || v > c ? (o && (clearTimeout(o), o = null), d = C, i.apply(y, g)) : !o && s.trailing !== !1 && (o = setTimeout(() => {
      d = s.leading === !1 ? 0 : Date.now(), o = null, i.apply(y, g);
    }, v));
  };
}
function Ei(i, c, s, o, d = window) {
  const g = d.Object.getOwnPropertyDescriptor(i, c);
  return d.Object.defineProperty(i, c, o ? s : {
    set(C) {
      setTimeout(() => {
        s.set.call(this, C);
      }, 0), g && g.set && g.set.call(this, C);
    }
  }), () => Ei(i, c, g || {}, !0);
}
function Fa(i, c, s) {
  try {
    if (!(c in i))
      return () => {
      };
    const o = i[c], d = s(o);
    return typeof d == "function" && (d.prototype = d.prototype || {}, Object.defineProperties(d, {
      __rrweb_original__: {
        enumerable: !1,
        value: o
      }
    })), i[c] = d, () => {
      i[c] = o;
    };
  } catch (o) {
    return () => {
    };
  }
}
function qh() {
  return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight;
}
function Vh() {
  return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth;
}
function de(i, c, s, o) {
  if (!i)
    return !1;
  const d = i.nodeType === i.ELEMENT_NODE ? i : i.parentElement;
  if (!d)
    return !1;
  if (typeof c == "string") {
    if (d.classList.contains(c) || o && d.closest("." + c) !== null)
      return !0;
  } else if (Ai(d, c, o))
    return !0;
  return !!(s && (i.matches(s) || o && d.closest(s) !== null));
}
function Lv(i, c) {
  return c.getId(i) !== -1;
}
function $f(i, c) {
  return c.getId(i) === Fn;
}
function Qh(i, c) {
  if (kn(i))
    return !1;
  const s = c.getId(i);
  return c.has(s) ? i.parentNode && i.parentNode.nodeType === i.DOCUMENT_NODE ? !1 : i.parentNode ? Qh(i.parentNode, c) : !0 : !0;
}
function Xh(i) {
  return !!i.changedTouches;
}
function Zv(i = window) {
  "NodeList" in i && !i.NodeList.prototype.forEach && (i.NodeList.prototype.forEach = Array.prototype.forEach), "DOMTokenList" in i && !i.DOMTokenList.prototype.forEach && (i.DOMTokenList.prototype.forEach = Array.prototype.forEach), Node.prototype.contains || (Node.prototype.contains = (...c) => {
    let s = c[0];
    if (!(0 in c))
      throw new TypeError("1 argument is required");
    do
      if (this === s)
        return !0;
    while (s = s && s.parentNode);
    return !1;
  });
}
function Kh(i, c) {
  return !!(i.nodeName === "IFRAME" && c.getMeta(i));
}
function kh(i, c) {
  return !!(i.nodeName === "LINK" && i.nodeType === i.ELEMENT_NODE && i.getAttribute && i.getAttribute("rel") === "stylesheet" && c.getMeta(i));
}
function Jh(i) {
  return !!(i != null && i.shadowRoot);
}
class Yv {
  constructor() {
    this.id = 1, this.styleIDMap = /* @__PURE__ */ new WeakMap(), this.idStyleMap = /* @__PURE__ */ new Map();
  }
  getId(c) {
    var s;
    return (s = this.styleIDMap.get(c)) !== null && s !== void 0 ? s : -1;
  }
  has(c) {
    return this.styleIDMap.has(c);
  }
  add(c, s) {
    if (this.has(c))
      return this.getId(c);
    let o;
    return s === void 0 ? o = this.id++ : o = s, this.styleIDMap.set(c, o), this.idStyleMap.set(o, c), o;
  }
  getStyle(c) {
    return this.idStyleMap.get(c) || null;
  }
  reset() {
    this.styleIDMap = /* @__PURE__ */ new WeakMap(), this.idStyleMap = /* @__PURE__ */ new Map(), this.id = 1;
  }
  generateId() {
    return this.id++;
  }
}
var pt = /* @__PURE__ */ ((i) => (i[i.DomContentLoaded = 0] = "DomContentLoaded", i[i.Load = 1] = "Load", i[i.FullSnapshot = 2] = "FullSnapshot", i[i.IncrementalSnapshot = 3] = "IncrementalSnapshot", i[i.Meta = 4] = "Meta", i[i.Custom = 5] = "Custom", i[i.Plugin = 6] = "Plugin", i))(pt || {}), mt = /* @__PURE__ */ ((i) => (i[i.Mutation = 0] = "Mutation", i[i.MouseMove = 1] = "MouseMove", i[i.MouseInteraction = 2] = "MouseInteraction", i[i.Scroll = 3] = "Scroll", i[i.ViewportResize = 4] = "ViewportResize", i[i.Input = 5] = "Input", i[i.TouchMove = 6] = "TouchMove", i[i.MediaInteraction = 7] = "MediaInteraction", i[i.StyleSheetRule = 8] = "StyleSheetRule", i[i.CanvasMutation = 9] = "CanvasMutation", i[i.Font = 10] = "Font", i[i.Log = 11] = "Log", i[i.Drag = 12] = "Drag", i[i.StyleDeclaration = 13] = "StyleDeclaration", i[i.Selection = 14] = "Selection", i[i.AdoptedStyleSheet = 15] = "AdoptedStyleSheet", i))(mt || {}), lo = /* @__PURE__ */ ((i) => (i[i.MouseUp = 0] = "MouseUp", i[i.MouseDown = 1] = "MouseDown", i[i.Click = 2] = "Click", i[i.ContextMenu = 3] = "ContextMenu", i[i.DblClick = 4] = "DblClick", i[i.Focus = 5] = "Focus", i[i.Blur = 6] = "Blur", i[i.TouchStart = 7] = "TouchStart", i[i.TouchMove_Departed = 8] = "TouchMove_Departed", i[i.TouchEnd = 9] = "TouchEnd", i[i.TouchCancel = 10] = "TouchCancel", i))(lo || {}), Wa = /* @__PURE__ */ ((i) => (i[i["2D"] = 0] = "2D", i[i.WebGL = 1] = "WebGL", i[i.WebGL2 = 2] = "WebGL2", i))(Wa || {});
function Oh(i) {
  return "__ln" in i;
}
class wv {
  constructor() {
    this.length = 0, this.head = null;
  }
  get(c) {
    if (c >= this.length)
      throw new Error("Position outside of list range");
    let s = this.head;
    for (let o = 0; o < c; o++)
      s = (s == null ? void 0 : s.next) || null;
    return s;
  }
  addNode(c) {
    const s = {
      value: c,
      previous: null,
      next: null
    };
    if (c.__ln = s, c.previousSibling && Oh(c.previousSibling)) {
      const o = c.previousSibling.__ln.next;
      s.next = o, s.previous = c.previousSibling.__ln, c.previousSibling.__ln.next = s, o && (o.previous = s);
    } else if (c.nextSibling && Oh(c.nextSibling) && c.nextSibling.__ln.previous) {
      const o = c.nextSibling.__ln.previous;
      s.previous = o, s.next = c.nextSibling.__ln, c.nextSibling.__ln.previous = s, o && (o.next = s);
    } else
      this.head && (this.head.previous = s), s.next = this.head, this.head = s;
    this.length++;
  }
  removeNode(c) {
    const s = c.__ln;
    this.head && (s.previous ? (s.previous.next = s.next, s.next && (s.next.previous = s.previous)) : (this.head = s.next, this.head && (this.head.previous = null)), c.__ln && delete c.__ln, this.length--);
  }
}
const zh = (i, c) => `${i}@${c}`;
class jv {
  constructor() {
    this.frozen = !1, this.locked = !1, this.texts = [], this.attributes = [], this.removes = [], this.mapRemoves = [], this.movedMap = {}, this.addedSet = /* @__PURE__ */ new Set(), this.movedSet = /* @__PURE__ */ new Set(), this.droppedSet = /* @__PURE__ */ new Set(), this.processMutations = (c) => {
      c.forEach(this.processMutation), this.emit();
    }, this.emit = () => {
      if (this.frozen || this.locked)
        return;
      const c = [], s = new wv(), o = (v) => {
        let y = v, h = Fn;
        for (; h === Fn; )
          y = y && y.nextSibling, h = y && this.mirror.getId(y);
        return h;
      }, d = (v) => {
        var y, h, O, M;
        let x = null;
        ((h = (y = v.getRootNode) === null || y === void 0 ? void 0 : y.call(v)) === null || h === void 0 ? void 0 : h.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && v.getRootNode().host && (x = v.getRootNode().host);
        let L = x;
        for (; ((M = (O = L == null ? void 0 : L.getRootNode) === null || O === void 0 ? void 0 : O.call(L)) === null || M === void 0 ? void 0 : M.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && L.getRootNode().host; )
          L = L.getRootNode().host;
        const U = !this.doc.contains(v) && (!L || !this.doc.contains(L));
        if (!v.parentNode || U)
          return;
        const j = kn(v.parentNode) ? this.mirror.getId(x) : this.mirror.getId(v.parentNode), W = o(v);
        if (j === -1 || W === -1)
          return s.addNode(v);
        const Q = ka(v, {
          doc: this.doc,
          mirror: this.mirror,
          blockClass: this.blockClass,
          blockSelector: this.blockSelector,
          maskTextClass: this.maskTextClass,
          maskTextSelector: this.maskTextSelector,
          skipChild: !0,
          newlyAddedElement: !0,
          inlineStylesheet: this.inlineStylesheet,
          maskInputOptions: this.maskInputOptions,
          maskTextFn: this.maskTextFn,
          maskInputFn: this.maskInputFn,
          slimDOMOptions: this.slimDOMOptions,
          dataURLOptions: this.dataURLOptions,
          recordCanvas: this.recordCanvas,
          inlineImages: this.inlineImages,
          onSerialize: (Y) => {
            Kh(Y, this.mirror) && this.iframeManager.addIframe(Y), kh(Y, this.mirror) && this.stylesheetManager.trackLinkElement(Y), Jh(v) && this.shadowDomManager.addShadowRoot(v.shadowRoot, this.doc);
          },
          onIframeLoad: (Y, B) => {
            this.iframeManager.attachIframe(Y, B), this.shadowDomManager.observeAttachShadow(Y);
          },
          onStylesheetLoad: (Y, B) => {
            this.stylesheetManager.attachLinkElement(Y, B);
          }
        });
        Q && c.push({
          parentId: j,
          nextId: W,
          node: Q
        });
      };
      for (; this.mapRemoves.length; )
        this.mirror.removeNodeFromMap(this.mapRemoves.shift());
      for (const v of Array.from(this.movedSet.values()))
        Nh(this.removes, v, this.mirror) && !this.movedSet.has(v.parentNode) || d(v);
      for (const v of Array.from(this.addedSet.values()))
        !_h(this.droppedSet, v) && !Nh(this.removes, v, this.mirror) || _h(this.movedSet, v) ? d(v) : this.droppedSet.add(v);
      let g = null;
      for (; s.length; ) {
        let v = null;
        if (g) {
          const y = this.mirror.getId(g.value.parentNode), h = o(g.value);
          y !== -1 && h !== -1 && (v = g);
        }
        if (!v)
          for (let y = s.length - 1; y >= 0; y--) {
            const h = s.get(y);
            if (h) {
              const O = this.mirror.getId(h.value.parentNode);
              if (o(h.value) === -1)
                continue;
              if (O !== -1) {
                v = h;
                break;
              } else {
                const x = h.value;
                if (x.parentNode && x.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                  const L = x.parentNode.host;
                  if (this.mirror.getId(L) !== -1) {
                    v = h;
                    break;
                  }
                }
              }
            }
          }
        if (!v) {
          for (; s.head; )
            s.removeNode(s.head.value);
          break;
        }
        g = v.previous, s.removeNode(v.value), d(v.value);
      }
      const C = {
        texts: this.texts.map((v) => ({
          id: this.mirror.getId(v.node),
          value: v.value
        })).filter((v) => this.mirror.has(v.id)),
        attributes: this.attributes.map((v) => ({
          id: this.mirror.getId(v.node),
          attributes: v.attributes
        })).filter((v) => this.mirror.has(v.id)),
        removes: this.removes,
        adds: c
      };
      !C.texts.length && !C.attributes.length && !C.removes.length && !C.adds.length || (this.texts = [], this.attributes = [], this.removes = [], this.addedSet = /* @__PURE__ */ new Set(), this.movedSet = /* @__PURE__ */ new Set(), this.droppedSet = /* @__PURE__ */ new Set(), this.movedMap = {}, this.mutationCb(C));
    }, this.processMutation = (c) => {
      if (!$f(c.target, this.mirror))
        switch (c.type) {
          case "characterData": {
            const s = c.target.textContent;
            !de(c.target, this.blockClass, this.blockSelector, !1) && s !== c.oldValue && this.texts.push({
              value: jh(c.target, this.maskTextClass, this.maskTextSelector) && s ? this.maskTextFn ? this.maskTextFn(s) : s.replace(/[\S]/g, "*") : s,
              node: c.target
            });
            break;
          }
          case "attributes": {
            const s = c.target;
            let o = c.target.getAttribute(c.attributeName);
            if (c.attributeName === "value" && (o = uo({
              maskInputOptions: this.maskInputOptions,
              tagName: c.target.tagName,
              type: c.target.getAttribute("type"),
              value: o,
              maskInputFn: this.maskInputFn
            })), de(c.target, this.blockClass, this.blockSelector, !1) || o === c.oldValue)
              return;
            let d = this.attributes.find((g) => g.node === c.target);
            if (s.tagName === "IFRAME" && c.attributeName === "src" && !this.keepIframeSrcFn(o))
              if (!s.contentDocument)
                c.attributeName = "rr_src";
              else
                return;
            if (d || (d = {
              node: c.target,
              attributes: {}
            }, this.attributes.push(d)), c.attributeName === "style") {
              const g = this.doc.createElement("span");
              c.oldValue && g.setAttribute("style", c.oldValue), (d.attributes.style === void 0 || d.attributes.style === null) && (d.attributes.style = {});
              const C = d.attributes.style;
              for (const v of Array.from(s.style)) {
                const y = s.style.getPropertyValue(v), h = s.style.getPropertyPriority(v);
                (y !== g.style.getPropertyValue(v) || h !== g.style.getPropertyPriority(v)) && (h === "" ? C[v] = y : C[v] = [y, h]);
              }
              for (const v of Array.from(g.style))
                s.style.getPropertyValue(v) === "" && (C[v] = !1);
            } else
              d.attributes[c.attributeName] = wh(this.doc, s.tagName, c.attributeName, o);
            break;
          }
          case "childList": {
            if (de(c.target, this.blockClass, this.blockSelector, !0))
              return;
            c.addedNodes.forEach((s) => this.genAdds(s, c.target)), c.removedNodes.forEach((s) => {
              const o = this.mirror.getId(s), d = kn(c.target) ? this.mirror.getId(c.target.host) : this.mirror.getId(c.target);
              de(c.target, this.blockClass, this.blockSelector, !1) || $f(s, this.mirror) || !Lv(s, this.mirror) || (this.addedSet.has(s) ? (ao(this.addedSet, s), this.droppedSet.add(s)) : this.addedSet.has(c.target) && o === -1 || Qh(c.target, this.mirror) || (this.movedSet.has(s) && this.movedMap[zh(o, d)] ? ao(this.movedSet, s) : this.removes.push({
                parentId: d,
                id: o,
                isShadow: kn(c.target) && Jn(c.target) ? !0 : void 0
              })), this.mapRemoves.push(s));
            });
            break;
          }
        }
    }, this.genAdds = (c, s) => {
      if (this.mirror.hasNode(c)) {
        if ($f(c, this.mirror))
          return;
        this.movedSet.add(c);
        let o = null;
        s && this.mirror.hasNode(s) && (o = this.mirror.getId(s)), o && o !== -1 && (this.movedMap[zh(this.mirror.getId(c), o)] = !0);
      } else
        this.addedSet.add(c), this.droppedSet.delete(c);
      de(c, this.blockClass, this.blockSelector, !1) || c.childNodes.forEach((o) => this.genAdds(o));
    };
  }
  init(c) {
    [
      "mutationCb",
      "blockClass",
      "blockSelector",
      "maskTextClass",
      "maskTextSelector",
      "inlineStylesheet",
      "maskInputOptions",
      "maskTextFn",
      "maskInputFn",
      "keepIframeSrcFn",
      "recordCanvas",
      "inlineImages",
      "slimDOMOptions",
      "dataURLOptions",
      "doc",
      "mirror",
      "iframeManager",
      "stylesheetManager",
      "shadowDomManager",
      "canvasManager"
    ].forEach((s) => {
      this[s] = c[s];
    });
  }
  freeze() {
    this.frozen = !0, this.canvasManager.freeze();
  }
  unfreeze() {
    this.frozen = !1, this.canvasManager.unfreeze(), this.emit();
  }
  isFrozen() {
    return this.frozen;
  }
  lock() {
    this.locked = !0, this.canvasManager.lock();
  }
  unlock() {
    this.locked = !1, this.canvasManager.unlock(), this.emit();
  }
  reset() {
    this.shadowDomManager.reset(), this.canvasManager.reset();
  }
}
function ao(i, c) {
  i.delete(c), c.childNodes.forEach((s) => ao(i, s));
}
function Nh(i, c, s) {
  return i.length === 0 ? !1 : Fh(i, c, s);
}
function Fh(i, c, s) {
  const { parentNode: o } = c;
  if (!o)
    return !1;
  const d = s.getId(o);
  return i.some((g) => g.id === d) ? !0 : Fh(i, o, s);
}
function _h(i, c) {
  return i.size === 0 ? !1 : Wh(i, c);
}
function Wh(i, c) {
  const { parentNode: s } = c;
  return s ? i.has(s) ? !0 : Wh(i, s) : !1;
}
const ua = [], $h = typeof CSSGroupingRule != "undefined", Ph = typeof CSSMediaRule != "undefined", tm = typeof CSSSupportsRule != "undefined", em = typeof CSSConditionRule != "undefined";
function $n(i) {
  try {
    if ("composedPath" in i) {
      const c = i.composedPath();
      if (c.length)
        return c[0];
    } else if ("path" in i && i.path.length)
      return i.path[0];
    return i.target;
  } catch (c) {
    return i.target;
  }
}
function lm(i, c) {
  var s, o;
  const d = new jv();
  ua.push(d), d.init(i);
  let g = window.MutationObserver || window.__rrMutationObserver;
  const C = (o = (s = window == null ? void 0 : window.Zone) === null || s === void 0 ? void 0 : s.__symbol__) === null || o === void 0 ? void 0 : o.call(s, "MutationObserver");
  C && window[C] && (g = window[C]);
  const v = new g(d.processMutations.bind(d));
  return v.observe(c, {
    attributes: !0,
    attributeOldValue: !0,
    characterData: !0,
    characterDataOldValue: !0,
    childList: !0,
    subtree: !0
  }), v;
}
function qv({ mousemoveCb: i, sampling: c, doc: s, mirror: o }) {
  if (c.mousemove === !1)
    return () => {
    };
  const d = typeof c.mousemove == "number" ? c.mousemove : 50, g = typeof c.mousemoveCallback == "number" ? c.mousemoveCallback : 500;
  let C = [], v;
  const y = Wn((M) => {
    const x = Date.now() - v;
    i(C.map((L) => (L.timeOffset -= x, L)), M), C = [], v = null;
  }, g), h = Wn((M) => {
    const x = $n(M), { clientX: L, clientY: U } = Xh(M) ? M.changedTouches[0] : M;
    v || (v = Date.now()), C.push({
      x: L,
      y: U,
      id: o.getId(x),
      timeOffset: Date.now() - v
    }), y(typeof DragEvent != "undefined" && M instanceof DragEvent ? mt.Drag : M instanceof MouseEvent ? mt.MouseMove : mt.TouchMove);
  }, d, {
    trailing: !1
  }), O = [
    re("mousemove", h, s),
    re("touchmove", h, s),
    re("drag", h, s)
  ];
  return () => {
    O.forEach((M) => M());
  };
}
function Vv({ mouseInteractionCb: i, doc: c, mirror: s, blockClass: o, blockSelector: d, sampling: g }) {
  if (g.mouseInteraction === !1)
    return () => {
    };
  const C = g.mouseInteraction === !0 || g.mouseInteraction === void 0 ? {} : g.mouseInteraction, v = [], y = (h) => (O) => {
    const M = $n(O);
    if (de(M, o, d, !0))
      return;
    const x = Xh(O) ? O.changedTouches[0] : O;
    if (!x)
      return;
    const L = s.getId(M), { clientX: U, clientY: j } = x;
    i({
      type: lo[h],
      id: L,
      x: U,
      y: j
    });
  };
  return Object.keys(lo).filter((h) => Number.isNaN(Number(h)) && !h.endsWith("_Departed") && C[h] !== !1).forEach((h) => {
    const O = h.toLowerCase(), M = y(h);
    v.push(re(O, M, c));
  }), () => {
    v.forEach((h) => h());
  };
}
function am({ scrollCb: i, doc: c, mirror: s, blockClass: o, blockSelector: d, sampling: g }) {
  const C = Wn((v) => {
    const y = $n(v);
    if (!y || de(y, o, d, !0))
      return;
    const h = s.getId(y);
    if (y === c) {
      const O = c.scrollingElement || c.documentElement;
      i({
        id: h,
        x: O.scrollLeft,
        y: O.scrollTop
      });
    } else
      i({
        id: h,
        x: y.scrollLeft,
        y: y.scrollTop
      });
  }, g.scroll || 100);
  return re("scroll", C, c);
}
function Qv({ viewportResizeCb: i }) {
  let c = -1, s = -1;
  const o = Wn(() => {
    const d = qh(), g = Vh();
    (c !== d || s !== g) && (i({
      width: Number(g),
      height: Number(d)
    }), c = d, s = g);
  }, 200);
  return re("resize", o, window);
}
function Dh(i, c) {
  const s = Object.assign({}, i);
  return c || delete s.userTriggered, s;
}
const Xv = ["INPUT", "TEXTAREA", "SELECT"], Rh = /* @__PURE__ */ new WeakMap();
function Kv({ inputCb: i, doc: c, mirror: s, blockClass: o, blockSelector: d, ignoreClass: g, maskInputOptions: C, maskInputFn: v, sampling: y, userTriggeredOnInput: h }) {
  function O(Q) {
    let Y = $n(Q);
    const B = Q.isTrusted;
    if (Y && Y.tagName === "OPTION" && (Y = Y.parentElement), !Y || !Y.tagName || Xv.indexOf(Y.tagName) < 0 || de(Y, o, d, !0))
      return;
    const F = Y.type;
    if (Y.classList.contains(g))
      return;
    let St = Y.value, gt = !1;
    F === "radio" || F === "checkbox" ? gt = Y.checked : (C[Y.tagName.toLowerCase()] || C[F]) && (St = uo({
      maskInputOptions: C,
      tagName: Y.tagName,
      type: F,
      value: St,
      maskInputFn: v
    })), M(Y, Dh({ text: St, isChecked: gt, userTriggered: B }, h));
    const k = Y.name;
    F === "radio" && k && gt && c.querySelectorAll(`input[type="radio"][name="${k}"]`).forEach((ut) => {
      ut !== Y && M(ut, Dh({
        text: ut.value,
        isChecked: !gt,
        userTriggered: !1
      }, h));
    });
  }
  function M(Q, Y) {
    const B = Rh.get(Q);
    if (!B || B.text !== Y.text || B.isChecked !== Y.isChecked) {
      Rh.set(Q, Y);
      const F = s.getId(Q);
      i(Object.assign(Object.assign({}, Y), { id: F }));
    }
  }
  const L = (y.input === "last" ? ["change"] : ["input", "change"]).map((Q) => re(Q, O, c)), U = c.defaultView;
  if (!U)
    return () => {
      L.forEach((Q) => Q());
    };
  const j = U.Object.getOwnPropertyDescriptor(U.HTMLInputElement.prototype, "value"), W = [
    [U.HTMLInputElement.prototype, "value"],
    [U.HTMLInputElement.prototype, "checked"],
    [U.HTMLSelectElement.prototype, "value"],
    [U.HTMLTextAreaElement.prototype, "value"],
    [U.HTMLSelectElement.prototype, "selectedIndex"],
    [U.HTMLOptionElement.prototype, "selected"]
  ];
  return j && j.set && L.push(...W.map((Q) => Ei(Q[0], Q[1], {
    set() {
      O({ target: this });
    }
  }, !1, U))), () => {
    L.forEach((Q) => Q());
  };
}
function Ti(i) {
  const c = [];
  function s(o, d) {
    if ($h && o.parentRule instanceof CSSGroupingRule || Ph && o.parentRule instanceof CSSMediaRule || tm && o.parentRule instanceof CSSSupportsRule || em && o.parentRule instanceof CSSConditionRule) {
      const C = Array.from(o.parentRule.cssRules).indexOf(o);
      d.unshift(C);
    } else if (o.parentStyleSheet) {
      const C = Array.from(o.parentStyleSheet.cssRules).indexOf(o);
      d.unshift(C);
    }
    return d;
  }
  return s(i, c);
}
function Zl(i, c, s) {
  let o, d;
  return i ? (i.ownerNode ? o = c.getId(i.ownerNode) : d = s.getId(i), {
    styleId: d,
    id: o
  }) : {};
}
function kv({ styleSheetRuleCb: i, mirror: c, stylesheetManager: s }, { win: o }) {
  const d = o.CSSStyleSheet.prototype.insertRule;
  o.CSSStyleSheet.prototype.insertRule = function(O, M) {
    const { id: x, styleId: L } = Zl(this, c, s.styleMirror);
    return (x && x !== -1 || L && L !== -1) && i({
      id: x,
      styleId: L,
      adds: [{ rule: O, index: M }]
    }), d.apply(this, [O, M]);
  };
  const g = o.CSSStyleSheet.prototype.deleteRule;
  o.CSSStyleSheet.prototype.deleteRule = function(O) {
    const { id: M, styleId: x } = Zl(this, c, s.styleMirror);
    return (M && M !== -1 || x && x !== -1) && i({
      id: M,
      styleId: x,
      removes: [{ index: O }]
    }), g.apply(this, [O]);
  };
  let C;
  o.CSSStyleSheet.prototype.replace && (C = o.CSSStyleSheet.prototype.replace, o.CSSStyleSheet.prototype.replace = function(O) {
    const { id: M, styleId: x } = Zl(this, c, s.styleMirror);
    return (M && M !== -1 || x && x !== -1) && i({
      id: M,
      styleId: x,
      replace: O
    }), C.apply(this, [O]);
  });
  let v;
  o.CSSStyleSheet.prototype.replaceSync && (v = o.CSSStyleSheet.prototype.replaceSync, o.CSSStyleSheet.prototype.replaceSync = function(O) {
    const { id: M, styleId: x } = Zl(this, c, s.styleMirror);
    return (M && M !== -1 || x && x !== -1) && i({
      id: M,
      styleId: x,
      replaceSync: O
    }), v.apply(this, [O]);
  });
  const y = {};
  $h ? y.CSSGroupingRule = o.CSSGroupingRule : (Ph && (y.CSSMediaRule = o.CSSMediaRule), em && (y.CSSConditionRule = o.CSSConditionRule), tm && (y.CSSSupportsRule = o.CSSSupportsRule));
  const h = {};
  return Object.entries(y).forEach(([O, M]) => {
    h[O] = {
      insertRule: M.prototype.insertRule,
      deleteRule: M.prototype.deleteRule
    }, M.prototype.insertRule = function(x, L) {
      const { id: U, styleId: j } = Zl(this.parentStyleSheet, c, s.styleMirror);
      return (U && U !== -1 || j && j !== -1) && i({
        id: U,
        styleId: j,
        adds: [
          {
            rule: x,
            index: [
              ...Ti(this),
              L || 0
            ]
          }
        ]
      }), h[O].insertRule.apply(this, [x, L]);
    }, M.prototype.deleteRule = function(x) {
      const { id: L, styleId: U } = Zl(this.parentStyleSheet, c, s.styleMirror);
      return (L && L !== -1 || U && U !== -1) && i({
        id: L,
        styleId: U,
        removes: [
          { index: [...Ti(this), x] }
        ]
      }), h[O].deleteRule.apply(this, [x]);
    };
  }), () => {
    o.CSSStyleSheet.prototype.insertRule = d, o.CSSStyleSheet.prototype.deleteRule = g, C && (o.CSSStyleSheet.prototype.replace = C), v && (o.CSSStyleSheet.prototype.replaceSync = v), Object.entries(y).forEach(([O, M]) => {
      M.prototype.insertRule = h[O].insertRule, M.prototype.deleteRule = h[O].deleteRule;
    });
  };
}
function nm({ mirror: i, stylesheetManager: c }, s) {
  var o, d, g;
  let C = null;
  s.nodeName === "#document" ? C = i.getId(s) : C = i.getId(s.host);
  const v = s.nodeName === "#document" ? (o = s.defaultView) === null || o === void 0 ? void 0 : o.Document : (g = (d = s.ownerDocument) === null || d === void 0 ? void 0 : d.defaultView) === null || g === void 0 ? void 0 : g.ShadowRoot, y = Object.getOwnPropertyDescriptor(v == null ? void 0 : v.prototype, "adoptedStyleSheets");
  return C === null || C === -1 || !v || !y ? () => {
  } : (Object.defineProperty(s, "adoptedStyleSheets", {
    configurable: y.configurable,
    enumerable: y.enumerable,
    get() {
      var h;
      return (h = y.get) === null || h === void 0 ? void 0 : h.call(this);
    },
    set(h) {
      var O;
      const M = (O = y.set) === null || O === void 0 ? void 0 : O.call(this, h);
      if (C !== null && C !== -1)
        try {
          c.adoptStyleSheets(h, C);
        } catch (x) {
        }
      return M;
    }
  }), () => {
    Object.defineProperty(s, "adoptedStyleSheets", {
      configurable: y.configurable,
      enumerable: y.enumerable,
      get: y.get,
      set: y.set
    });
  });
}
function Jv({ styleDeclarationCb: i, mirror: c, ignoreCSSAttributes: s, stylesheetManager: o }, { win: d }) {
  const g = d.CSSStyleDeclaration.prototype.setProperty;
  d.CSSStyleDeclaration.prototype.setProperty = function(v, y, h) {
    var O;
    if (s.has(v))
      return g.apply(this, [v, y, h]);
    const { id: M, styleId: x } = Zl((O = this.parentRule) === null || O === void 0 ? void 0 : O.parentStyleSheet, c, o.styleMirror);
    return (M && M !== -1 || x && x !== -1) && i({
      id: M,
      styleId: x,
      set: {
        property: v,
        value: y,
        priority: h
      },
      index: Ti(this.parentRule)
    }), g.apply(this, [v, y, h]);
  };
  const C = d.CSSStyleDeclaration.prototype.removeProperty;
  return d.CSSStyleDeclaration.prototype.removeProperty = function(v) {
    var y;
    if (s.has(v))
      return C.apply(this, [v]);
    const { id: h, styleId: O } = Zl((y = this.parentRule) === null || y === void 0 ? void 0 : y.parentStyleSheet, c, o.styleMirror);
    return (h && h !== -1 || O && O !== -1) && i({
      id: h,
      styleId: O,
      remove: {
        property: v
      },
      index: Ti(this.parentRule)
    }), C.apply(this, [v]);
  }, () => {
    d.CSSStyleDeclaration.prototype.setProperty = g, d.CSSStyleDeclaration.prototype.removeProperty = C;
  };
}
function Fv({ mediaInteractionCb: i, blockClass: c, blockSelector: s, mirror: o, sampling: d }) {
  const g = (v) => Wn((y) => {
    const h = $n(y);
    if (!h || de(h, c, s, !0))
      return;
    const { currentTime: O, volume: M, muted: x, playbackRate: L } = h;
    i({
      type: v,
      id: o.getId(h),
      currentTime: O,
      volume: M,
      muted: x,
      playbackRate: L
    });
  }, d.media || 500), C = [
    re("play", g(0)),
    re("pause", g(1)),
    re("seeked", g(2)),
    re("volumechange", g(3)),
    re("ratechange", g(4))
  ];
  return () => {
    C.forEach((v) => v());
  };
}
function Wv({ fontCb: i, doc: c }) {
  const s = c.defaultView;
  if (!s)
    return () => {
    };
  const o = [], d = /* @__PURE__ */ new WeakMap(), g = s.FontFace;
  s.FontFace = function(y, h, O) {
    const M = new g(y, h, O);
    return d.set(M, {
      family: y,
      buffer: typeof h != "string",
      descriptors: O,
      fontSource: typeof h == "string" ? h : JSON.stringify(Array.from(new Uint8Array(h)))
    }), M;
  };
  const C = Fa(c.fonts, "add", function(v) {
    return function(y) {
      return setTimeout(() => {
        const h = d.get(y);
        h && (i(h), d.delete(y));
      }, 0), v.apply(this, [y]);
    };
  });
  return o.push(() => {
    s.FontFace = g;
  }), o.push(C), () => {
    o.forEach((v) => v());
  };
}
function $v(i) {
  const { doc: c, mirror: s, blockClass: o, blockSelector: d, selectionCb: g } = i;
  let C = !0;
  const v = () => {
    const y = c.getSelection();
    if (!y || C && (y != null && y.isCollapsed))
      return;
    C = y.isCollapsed || !1;
    const h = [], O = y.rangeCount || 0;
    for (let M = 0; M < O; M++) {
      const x = y.getRangeAt(M), { startContainer: L, startOffset: U, endContainer: j, endOffset: W } = x;
      de(L, o, d, !0) || de(j, o, d, !0) || h.push({
        start: s.getId(L),
        startOffset: U,
        end: s.getId(j),
        endOffset: W
      });
    }
    g({ ranges: h });
  };
  return v(), re("selectionchange", v);
}
function Pv(i, c) {
  const { mutationCb: s, mousemoveCb: o, mouseInteractionCb: d, scrollCb: g, viewportResizeCb: C, inputCb: v, mediaInteractionCb: y, styleSheetRuleCb: h, styleDeclarationCb: O, canvasMutationCb: M, fontCb: x, selectionCb: L } = i;
  i.mutationCb = (...U) => {
    c.mutation && c.mutation(...U), s(...U);
  }, i.mousemoveCb = (...U) => {
    c.mousemove && c.mousemove(...U), o(...U);
  }, i.mouseInteractionCb = (...U) => {
    c.mouseInteraction && c.mouseInteraction(...U), d(...U);
  }, i.scrollCb = (...U) => {
    c.scroll && c.scroll(...U), g(...U);
  }, i.viewportResizeCb = (...U) => {
    c.viewportResize && c.viewportResize(...U), C(...U);
  }, i.inputCb = (...U) => {
    c.input && c.input(...U), v(...U);
  }, i.mediaInteractionCb = (...U) => {
    c.mediaInteaction && c.mediaInteaction(...U), y(...U);
  }, i.styleSheetRuleCb = (...U) => {
    c.styleSheetRule && c.styleSheetRule(...U), h(...U);
  }, i.styleDeclarationCb = (...U) => {
    c.styleDeclaration && c.styleDeclaration(...U), O(...U);
  }, i.canvasMutationCb = (...U) => {
    c.canvasMutation && c.canvasMutation(...U), M(...U);
  }, i.fontCb = (...U) => {
    c.font && c.font(...U), x(...U);
  }, i.selectionCb = (...U) => {
    c.selection && c.selection(...U), L(...U);
  };
}
function t0(i, c = {}) {
  const s = i.doc.defaultView;
  if (!s)
    return () => {
    };
  Pv(i, c);
  const o = lm(i, i.doc), d = qv(i), g = Vv(i), C = am(i), v = Qv(i), y = Kv(i), h = Fv(i), O = kv(i, { win: s }), M = nm(i, i.doc), x = Jv(i, {
    win: s
  }), L = i.collectFonts ? Wv(i) : () => {
  }, U = $v(i), j = [];
  for (const W of i.plugins)
    j.push(W.observer(W.callback, s, W.options));
  return () => {
    ua.forEach((W) => W.reset()), o.disconnect(), d(), g(), C(), v(), y(), h(), O(), M(), x(), L(), U(), j.forEach((W) => W());
  };
}
class Uh {
  constructor(c) {
    this.generateIdFn = c, this.iframeIdToRemoteIdMap = /* @__PURE__ */ new WeakMap(), this.iframeRemoteIdToIdMap = /* @__PURE__ */ new WeakMap();
  }
  getId(c, s, o, d) {
    const g = o || this.getIdToRemoteIdMap(c), C = d || this.getRemoteIdToIdMap(c);
    let v = g.get(s);
    return v || (v = this.generateIdFn(), g.set(s, v), C.set(v, s)), v;
  }
  getIds(c, s) {
    const o = this.getIdToRemoteIdMap(c), d = this.getRemoteIdToIdMap(c);
    return s.map((g) => this.getId(c, g, o, d));
  }
  getRemoteId(c, s, o) {
    const d = o || this.getRemoteIdToIdMap(c);
    if (typeof s != "number")
      return s;
    const g = d.get(s);
    return g || -1;
  }
  getRemoteIds(c, s) {
    const o = this.getRemoteIdToIdMap(c);
    return s.map((d) => this.getRemoteId(c, d, o));
  }
  reset(c) {
    if (!c) {
      this.iframeIdToRemoteIdMap = /* @__PURE__ */ new WeakMap(), this.iframeRemoteIdToIdMap = /* @__PURE__ */ new WeakMap();
      return;
    }
    this.iframeIdToRemoteIdMap.delete(c), this.iframeRemoteIdToIdMap.delete(c);
  }
  getIdToRemoteIdMap(c) {
    let s = this.iframeIdToRemoteIdMap.get(c);
    return s || (s = /* @__PURE__ */ new Map(), this.iframeIdToRemoteIdMap.set(c, s)), s;
  }
  getRemoteIdToIdMap(c) {
    let s = this.iframeRemoteIdToIdMap.get(c);
    return s || (s = /* @__PURE__ */ new Map(), this.iframeRemoteIdToIdMap.set(c, s)), s;
  }
}
class e0 {
  constructor(c) {
    this.iframes = /* @__PURE__ */ new WeakMap(), this.crossOriginIframeMap = /* @__PURE__ */ new WeakMap(), this.crossOriginIframeMirror = new Uh(Yh), this.mutationCb = c.mutationCb, this.wrappedEmit = c.wrappedEmit, this.stylesheetManager = c.stylesheetManager, this.recordCrossOriginIframes = c.recordCrossOriginIframes, this.crossOriginIframeStyleMirror = new Uh(this.stylesheetManager.styleMirror.generateId.bind(this.stylesheetManager.styleMirror)), this.mirror = c.mirror, this.recordCrossOriginIframes && window.addEventListener("message", this.handleMessage.bind(this));
  }
  addIframe(c) {
    this.iframes.set(c, !0), c.contentWindow && this.crossOriginIframeMap.set(c.contentWindow, c);
  }
  addLoadListener(c) {
    this.loadListener = c;
  }
  attachIframe(c, s) {
    var o;
    this.mutationCb({
      adds: [
        {
          parentId: this.mirror.getId(c),
          nextId: null,
          node: s
        }
      ],
      removes: [],
      texts: [],
      attributes: [],
      isAttachIframe: !0
    }), (o = this.loadListener) === null || o === void 0 || o.call(this, c), c.contentDocument && c.contentDocument.adoptedStyleSheets && c.contentDocument.adoptedStyleSheets.length > 0 && this.stylesheetManager.adoptStyleSheets(c.contentDocument.adoptedStyleSheets, this.mirror.getId(c.contentDocument));
  }
  handleMessage(c) {
    if (c.data.type === "rrweb") {
      if (!c.source)
        return;
      const o = this.crossOriginIframeMap.get(c.source);
      if (!o)
        return;
      const d = this.transformCrossOriginEvent(o, c.data.event);
      d && this.wrappedEmit(d, c.data.isCheckout);
    }
  }
  transformCrossOriginEvent(c, s) {
    var o;
    switch (s.type) {
      case pt.FullSnapshot:
        return this.crossOriginIframeMirror.reset(c), this.crossOriginIframeStyleMirror.reset(c), this.replaceIdOnNode(s.data.node, c), {
          timestamp: s.timestamp,
          type: pt.IncrementalSnapshot,
          data: {
            source: mt.Mutation,
            adds: [
              {
                parentId: this.mirror.getId(c),
                nextId: null,
                node: s.data.node
              }
            ],
            removes: [],
            texts: [],
            attributes: [],
            isAttachIframe: !0
          }
        };
      case pt.Meta:
      case pt.Load:
      case pt.DomContentLoaded:
        return !1;
      case pt.Plugin:
        return s;
      case pt.Custom:
        return this.replaceIds(s.data.payload, c, ["id", "parentId", "previousId", "nextId"]), s;
      case pt.IncrementalSnapshot:
        switch (s.data.source) {
          case mt.Mutation:
            return s.data.adds.forEach((d) => {
              this.replaceIds(d, c, [
                "parentId",
                "nextId",
                "previousId"
              ]), this.replaceIdOnNode(d.node, c);
            }), s.data.removes.forEach((d) => {
              this.replaceIds(d, c, ["parentId", "id"]);
            }), s.data.attributes.forEach((d) => {
              this.replaceIds(d, c, ["id"]);
            }), s.data.texts.forEach((d) => {
              this.replaceIds(d, c, ["id"]);
            }), s;
          case mt.Drag:
          case mt.TouchMove:
          case mt.MouseMove:
            return s.data.positions.forEach((d) => {
              this.replaceIds(d, c, ["id"]);
            }), s;
          case mt.ViewportResize:
            return !1;
          case mt.MediaInteraction:
          case mt.MouseInteraction:
          case mt.Scroll:
          case mt.CanvasMutation:
          case mt.Input:
            return this.replaceIds(s.data, c, ["id"]), s;
          case mt.StyleSheetRule:
          case mt.StyleDeclaration:
            return this.replaceIds(s.data, c, ["id"]), this.replaceStyleIds(s.data, c, ["styleId"]), s;
          case mt.Font:
            return s;
          case mt.Selection:
            return s.data.ranges.forEach((d) => {
              this.replaceIds(d, c, ["start", "end"]);
            }), s;
          case mt.AdoptedStyleSheet:
            return this.replaceIds(s.data, c, ["id"]), this.replaceStyleIds(s.data, c, ["styleIds"]), (o = s.data.styles) === null || o === void 0 || o.forEach((d) => {
              this.replaceStyleIds(d, c, ["styleId"]);
            }), s;
        }
    }
  }
  replace(c, s, o, d) {
    for (const g of d)
      !Array.isArray(s[g]) && typeof s[g] != "number" || (Array.isArray(s[g]) ? s[g] = c.getIds(o, s[g]) : s[g] = c.getId(o, s[g]));
    return s;
  }
  replaceIds(c, s, o) {
    return this.replace(this.crossOriginIframeMirror, c, s, o);
  }
  replaceStyleIds(c, s, o) {
    return this.replace(this.crossOriginIframeStyleMirror, c, s, o);
  }
  replaceIdOnNode(c, s) {
    this.replaceIds(c, s, ["id"]), "childNodes" in c && c.childNodes.forEach((o) => {
      this.replaceIdOnNode(o, s);
    });
  }
}
class l0 {
  constructor(c) {
    this.shadowDoms = /* @__PURE__ */ new WeakSet(), this.restorePatches = [], this.mutationCb = c.mutationCb, this.scrollCb = c.scrollCb, this.bypassOptions = c.bypassOptions, this.mirror = c.mirror;
    const s = this;
    this.restorePatches.push(Fa(Element.prototype, "attachShadow", function(o) {
      return function(d) {
        const g = o.call(this, d);
        return this.shadowRoot && s.addShadowRoot(this.shadowRoot, this.ownerDocument), g;
      };
    }));
  }
  addShadowRoot(c, s) {
    Jn(c) && (this.shadowDoms.has(c) || (this.shadowDoms.add(c), lm(Object.assign(Object.assign({}, this.bypassOptions), { doc: s, mutationCb: this.mutationCb, mirror: this.mirror, shadowDomManager: this }), c), am(Object.assign(Object.assign({}, this.bypassOptions), { scrollCb: this.scrollCb, doc: c, mirror: this.mirror })), setTimeout(() => {
      c.adoptedStyleSheets && c.adoptedStyleSheets.length > 0 && this.bypassOptions.stylesheetManager.adoptStyleSheets(c.adoptedStyleSheets, this.mirror.getId(c.host)), nm({
        mirror: this.mirror,
        stylesheetManager: this.bypassOptions.stylesheetManager
      }, c);
    }, 0)));
  }
  observeAttachShadow(c) {
    if (c.contentWindow) {
      const s = this;
      this.restorePatches.push(Fa(c.contentWindow.HTMLElement.prototype, "attachShadow", function(o) {
        return function(d) {
          const g = o.call(this, d);
          return this.shadowRoot && s.addShadowRoot(this.shadowRoot, c.contentDocument), g;
        };
      }));
    }
  }
  reset() {
    this.restorePatches.forEach((c) => c()), this.shadowDoms = /* @__PURE__ */ new WeakSet();
  }
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function a0(i, c) {
  var s = {};
  for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && c.indexOf(o) < 0 && (s[o] = i[o]);
  if (i != null && typeof Object.getOwnPropertySymbols == "function")
    for (var d = 0, o = Object.getOwnPropertySymbols(i); d < o.length; d++)
      c.indexOf(o[d]) < 0 && Object.prototype.propertyIsEnumerable.call(i, o[d]) && (s[o[d]] = i[o[d]]);
  return s;
}
function n0(i, c, s, o) {
  function d(g) {
    return g instanceof s ? g : new s(function(C) {
      C(g);
    });
  }
  return new (s || (s = Promise))(function(g, C) {
    function v(O) {
      try {
        h(o.next(O));
      } catch (M) {
        C(M);
      }
    }
    function y(O) {
      try {
        h(o.throw(O));
      } catch (M) {
        C(M);
      }
    }
    function h(O) {
      O.done ? g(O.value) : d(O.value).then(v, y);
    }
    h((o = o.apply(i, [])).next());
  });
}
var Ja = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u0 = typeof Uint8Array == "undefined" ? [] : new Uint8Array(256);
for (var pi = 0; pi < Ja.length; pi++)
  u0[Ja.charCodeAt(pi)] = pi;
var i0 = function(i) {
  var c = new Uint8Array(i), s, o = c.length, d = "";
  for (s = 0; s < o; s += 3)
    d += Ja[c[s] >> 2], d += Ja[(c[s] & 3) << 4 | c[s + 1] >> 4], d += Ja[(c[s + 1] & 15) << 2 | c[s + 2] >> 6], d += Ja[c[s + 2] & 63];
  return o % 3 === 2 ? d = d.substring(0, d.length - 1) + "=" : o % 3 === 1 && (d = d.substring(0, d.length - 2) + "=="), d;
};
const Ih = /* @__PURE__ */ new Map();
function c0(i, c) {
  let s = Ih.get(i);
  return s || (s = /* @__PURE__ */ new Map(), Ih.set(i, s)), s.has(c) || s.set(c, []), s.get(c);
}
const um = (i, c, s) => {
  if (!i || !(cm(i, c) || typeof i == "object"))
    return;
  const o = i.constructor.name, d = c0(s, o);
  let g = d.indexOf(i);
  return g === -1 && (g = d.length, d.push(i)), g;
};
function Si(i, c, s) {
  if (i instanceof Array)
    return i.map((o) => Si(o, c, s));
  if (i === null)
    return i;
  if (i instanceof Float32Array || i instanceof Float64Array || i instanceof Int32Array || i instanceof Uint32Array || i instanceof Uint8Array || i instanceof Uint16Array || i instanceof Int16Array || i instanceof Int8Array || i instanceof Uint8ClampedArray)
    return {
      rr_type: i.constructor.name,
      args: [Object.values(i)]
    };
  if (i instanceof ArrayBuffer) {
    const o = i.constructor.name, d = i0(i);
    return {
      rr_type: o,
      base64: d
    };
  } else {
    if (i instanceof DataView)
      return {
        rr_type: i.constructor.name,
        args: [
          Si(i.buffer, c, s),
          i.byteOffset,
          i.byteLength
        ]
      };
    if (i instanceof HTMLImageElement) {
      const o = i.constructor.name, { src: d } = i;
      return {
        rr_type: o,
        src: d
      };
    } else if (i instanceof HTMLCanvasElement) {
      const o = "HTMLImageElement", d = i.toDataURL();
      return {
        rr_type: o,
        src: d
      };
    } else {
      if (i instanceof ImageData)
        return {
          rr_type: i.constructor.name,
          args: [Si(i.data, c, s), i.width, i.height]
        };
      if (cm(i, c) || typeof i == "object") {
        const o = i.constructor.name, d = um(i, c, s);
        return {
          rr_type: o,
          index: d
        };
      }
    }
  }
  return i;
}
const im = (i, c, s) => [...i].map((o) => Si(o, c, s)), cm = (i, c) => !![
  "WebGLActiveInfo",
  "WebGLBuffer",
  "WebGLFramebuffer",
  "WebGLProgram",
  "WebGLRenderbuffer",
  "WebGLShader",
  "WebGLShaderPrecisionFormat",
  "WebGLTexture",
  "WebGLUniformLocation",
  "WebGLVertexArrayObject",
  "WebGLVertexArrayObjectOES"
].filter((d) => typeof c[d] == "function").find((d) => i instanceof c[d]);
function f0(i, c, s, o) {
  const d = [], g = Object.getOwnPropertyNames(c.CanvasRenderingContext2D.prototype);
  for (const C of g)
    try {
      if (typeof c.CanvasRenderingContext2D.prototype[C] != "function")
        continue;
      const v = Fa(c.CanvasRenderingContext2D.prototype, C, function(y) {
        return function(...h) {
          return de(this.canvas, s, o, !0) || setTimeout(() => {
            const O = im([...h], c, this);
            i(this.canvas, {
              type: Wa["2D"],
              property: C,
              args: O
            });
          }, 0), y.apply(this, h);
        };
      });
      d.push(v);
    } catch (v) {
      const y = Ei(c.CanvasRenderingContext2D.prototype, C, {
        set(h) {
          i(this.canvas, {
            type: Wa["2D"],
            property: C,
            args: [h],
            setter: !0
          });
        }
      });
      d.push(y);
    }
  return () => {
    d.forEach((C) => C());
  };
}
function xh(i, c, s) {
  const o = [];
  try {
    const d = Fa(i.HTMLCanvasElement.prototype, "getContext", function(g) {
      return function(C, ...v) {
        return de(this, c, s, !0) || "__context" in this || (this.__context = C), g.apply(this, [C, ...v]);
      };
    });
    o.push(d);
  } catch (d) {
    console.error("failed to patch HTMLCanvasElement.prototype.getContext");
  }
  return () => {
    o.forEach((d) => d());
  };
}
function Bh(i, c, s, o, d, g, C) {
  const v = [], y = Object.getOwnPropertyNames(i);
  for (const h of y)
    if (![
      "isContextLost",
      "canvas",
      "drawingBufferWidth",
      "drawingBufferHeight"
    ].includes(h))
      try {
        if (typeof i[h] != "function")
          continue;
        const O = Fa(i, h, function(M) {
          return function(...x) {
            const L = M.apply(this, x);
            if (um(L, C, this), !de(this.canvas, o, d, !0)) {
              const U = im([...x], C, this), j = {
                type: c,
                property: h,
                args: U
              };
              s(this.canvas, j);
            }
            return L;
          };
        });
        v.push(O);
      } catch (O) {
        const M = Ei(i, h, {
          set(x) {
            s(this.canvas, {
              type: c,
              property: h,
              args: [x],
              setter: !0
            });
          }
        });
        v.push(M);
      }
  return v;
}
function o0(i, c, s, o, d) {
  const g = [];
  return g.push(...Bh(c.WebGLRenderingContext.prototype, Wa.WebGL, i, s, o, d, c)), typeof c.WebGL2RenderingContext != "undefined" && g.push(...Bh(c.WebGL2RenderingContext.prototype, Wa.WebGL2, i, s, o, d, c)), () => {
    g.forEach((C) => C());
  };
}
var fm = null;
try {
  var s0 = typeof module != "undefined" && typeof module.require == "function" && module.require("worker_threads") || typeof __non_webpack_require__ == "function" && __non_webpack_require__("worker_threads") || typeof require == "function" && require("worker_threads");
  fm = s0.Worker;
} catch (i) {
}
function r0(i, c) {
  return Buffer.from(i, "base64").toString("utf8");
}
function d0(i, c, s) {
  var o = r0(i), d = o.indexOf(`
`, 10) + 1, g = o.substring(d) + "";
  return function(v) {
    return new fm(g, Object.assign({}, v, { eval: !0 }));
  };
}
function h0(i, c) {
  var s = atob(i);
  return s;
}
function m0(i, c, s) {
  var o = h0(i), d = o.indexOf(`
`, 10) + 1, g = o.substring(d) + "", C = new Blob([g], { type: "application/javascript" });
  return URL.createObjectURL(C);
}
function g0(i, c, s) {
  var o;
  return function(g) {
    return o = o || m0(i), new Worker(o, g);
  };
}
var y0 = Object.prototype.toString.call(typeof process != "undefined" ? process : 0) === "[object process]";
function v0() {
  return y0;
}
function p0(i, c, s) {
  return v0() ? d0(i) : g0(i);
}
var S0 = p0("Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICAgJ3VzZSBzdHJpY3QnOwoKICAgIC8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLg0KDQogICAgUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55DQogICAgcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLg0KDQogICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICJBUyBJUyIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEgNCiAgICBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkNCiAgICBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsDQogICAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NDQogICAgTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1INCiAgICBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SDQogICAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS4NCiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqLw0KDQogICAgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikgew0KICAgICAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH0NCiAgICAgICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7DQogICAgICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfQ0KICAgICAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpOw0KICAgICAgICB9KTsNCiAgICB9CgogICAgLyoKICAgICAqIGJhc2U2NC1hcnJheWJ1ZmZlciAxLjAuMSA8aHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3ZoL2Jhc2U2NC1hcnJheWJ1ZmZlcj4KICAgICAqIENvcHlyaWdodCAoYykgMjAyMSBOaWtsYXMgdm9uIEhlcnR6ZW4gPGh0dHBzOi8vaGVydHplbi5jb20+CiAgICAgKiBSZWxlYXNlZCB1bmRlciBNSVQgTGljZW5zZQogICAgICovCiAgICB2YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7CiAgICAvLyBVc2UgYSBsb29rdXAgdGFibGUgdG8gZmluZCB0aGUgaW5kZXguCiAgICB2YXIgbG9va3VwID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gW10gOiBuZXcgVWludDhBcnJheSgyNTYpOwogICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykgewogICAgICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7CiAgICB9CiAgICB2YXIgZW5jb2RlID0gZnVuY3Rpb24gKGFycmF5YnVmZmVyKSB7CiAgICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLCBpLCBsZW4gPSBieXRlcy5sZW5ndGgsIGJhc2U2NCA9ICcnOwogICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMykgewogICAgICAgICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07CiAgICAgICAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTsKICAgICAgICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaSArIDFdICYgMTUpIDw8IDIpIHwgKGJ5dGVzW2kgKyAyXSA+PiA2KV07CiAgICAgICAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpICsgMl0gJiA2M107CiAgICAgICAgfQogICAgICAgIGlmIChsZW4gJSAzID09PSAyKSB7CiAgICAgICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgJz0nOwogICAgICAgIH0KICAgICAgICBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7CiAgICAgICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgJz09JzsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIGJhc2U2NDsKICAgIH07CgogICAgY29uc3QgbGFzdEJsb2JNYXAgPSBuZXcgTWFwKCk7DQogICAgY29uc3QgdHJhbnNwYXJlbnRCbG9iTWFwID0gbmV3IE1hcCgpOw0KICAgIGZ1bmN0aW9uIGdldFRyYW5zcGFyZW50QmxvYkZvcih3aWR0aCwgaGVpZ2h0LCBkYXRhVVJMT3B0aW9ucykgew0KICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgew0KICAgICAgICAgICAgY29uc3QgaWQgPSBgJHt3aWR0aH0tJHtoZWlnaHR9YDsNCiAgICAgICAgICAgIGlmICgnT2Zmc2NyZWVuQ2FudmFzJyBpbiBnbG9iYWxUaGlzKSB7DQogICAgICAgICAgICAgICAgaWYgKHRyYW5zcGFyZW50QmxvYk1hcC5oYXMoaWQpKQ0KICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNwYXJlbnRCbG9iTWFwLmdldChpZCk7DQogICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2NyZWVuID0gbmV3IE9mZnNjcmVlbkNhbnZhcyh3aWR0aCwgaGVpZ2h0KTsNCiAgICAgICAgICAgICAgICBvZmZzY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTsNCiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0geWllbGQgb2Zmc2NyZWVuLmNvbnZlcnRUb0Jsb2IoZGF0YVVSTE9wdGlvbnMpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5QnVmZmVyID0geWllbGQgYmxvYi5hcnJheUJ1ZmZlcigpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGJhc2U2NCA9IGVuY29kZShhcnJheUJ1ZmZlcik7DQogICAgICAgICAgICAgICAgdHJhbnNwYXJlbnRCbG9iTWFwLnNldChpZCwgYmFzZTY0KTsNCiAgICAgICAgICAgICAgICByZXR1cm4gYmFzZTY0Ow0KICAgICAgICAgICAgfQ0KICAgICAgICAgICAgZWxzZSB7DQogICAgICAgICAgICAgICAgcmV0dXJuICcnOw0KICAgICAgICAgICAgfQ0KICAgICAgICB9KTsNCiAgICB9DQogICAgY29uc3Qgd29ya2VyID0gc2VsZjsNCiAgICB3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHsNCiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsNCiAgICAgICAgICAgIGlmICgnT2Zmc2NyZWVuQ2FudmFzJyBpbiBnbG9iYWxUaGlzKSB7DQogICAgICAgICAgICAgICAgY29uc3QgeyBpZCwgYml0bWFwLCB3aWR0aCwgaGVpZ2h0LCBkYXRhVVJMT3B0aW9ucyB9ID0gZS5kYXRhOw0KICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zcGFyZW50QmFzZTY0ID0gZ2V0VHJhbnNwYXJlbnRCbG9iRm9yKHdpZHRoLCBoZWlnaHQsIGRhdGFVUkxPcHRpb25zKTsNCiAgICAgICAgICAgICAgICBjb25zdCBvZmZzY3JlZW4gPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKHdpZHRoLCBoZWlnaHQpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGN0eCA9IG9mZnNjcmVlbi5nZXRDb250ZXh0KCcyZCcpOw0KICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYml0bWFwLCAwLCAwKTsNCiAgICAgICAgICAgICAgICBiaXRtYXAuY2xvc2UoKTsNCiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0geWllbGQgb2Zmc2NyZWVuLmNvbnZlcnRUb0Jsb2IoZGF0YVVSTE9wdGlvbnMpOw0KICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBibG9iLnR5cGU7DQogICAgICAgICAgICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSB5aWVsZCBibG9iLmFycmF5QnVmZmVyKCk7DQogICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0ID0gZW5jb2RlKGFycmF5QnVmZmVyKTsNCiAgICAgICAgICAgICAgICBpZiAoIWxhc3RCbG9iTWFwLmhhcyhpZCkgJiYgKHlpZWxkIHRyYW5zcGFyZW50QmFzZTY0KSA9PT0gYmFzZTY0KSB7DQogICAgICAgICAgICAgICAgICAgIGxhc3RCbG9iTWFwLnNldChpZCwgYmFzZTY0KTsNCiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdvcmtlci5wb3N0TWVzc2FnZSh7IGlkIH0pOw0KICAgICAgICAgICAgICAgIH0NCiAgICAgICAgICAgICAgICBpZiAobGFzdEJsb2JNYXAuZ2V0KGlkKSA9PT0gYmFzZTY0KQ0KICAgICAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQgfSk7DQogICAgICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsNCiAgICAgICAgICAgICAgICAgICAgaWQsDQogICAgICAgICAgICAgICAgICAgIHR5cGUsDQogICAgICAgICAgICAgICAgICAgIGJhc2U2NCwNCiAgICAgICAgICAgICAgICAgICAgd2lkdGgsDQogICAgICAgICAgICAgICAgICAgIGhlaWdodCwNCiAgICAgICAgICAgICAgICB9KTsNCiAgICAgICAgICAgICAgICBsYXN0QmxvYk1hcC5zZXQoaWQsIGJhc2U2NCk7DQogICAgICAgICAgICB9DQogICAgICAgICAgICBlbHNlIHsNCiAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQ6IGUuZGF0YS5pZCB9KTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgfSk7DQogICAgfTsKCn0pKCk7Cgo=");
class b0 {
  constructor(c) {
    this.pendingCanvasMutations = /* @__PURE__ */ new Map(), this.rafStamps = { latestId: 0, invokeId: null }, this.frozen = !1, this.locked = !1, this.processMutation = (y, h) => {
      (this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId || !this.rafStamps.invokeId) && (this.rafStamps.invokeId = this.rafStamps.latestId), this.pendingCanvasMutations.has(y) || this.pendingCanvasMutations.set(y, []), this.pendingCanvasMutations.get(y).push(h);
    };
    const { sampling: s = "all", win: o, blockClass: d, blockSelector: g, recordCanvas: C, dataURLOptions: v } = c;
    this.mutationCb = c.mutationCb, this.mirror = c.mirror, C && s === "all" && this.initCanvasMutationObserver(o, d, g), C && typeof s == "number" && this.initCanvasFPSObserver(s, o, d, g, {
      dataURLOptions: v
    });
  }
  reset() {
    this.pendingCanvasMutations.clear(), this.resetObservers && this.resetObservers();
  }
  freeze() {
    this.frozen = !0;
  }
  unfreeze() {
    this.frozen = !1;
  }
  lock() {
    this.locked = !0;
  }
  unlock() {
    this.locked = !1;
  }
  initCanvasFPSObserver(c, s, o, d, g) {
    const C = xh(s, o, d), v = /* @__PURE__ */ new Map(), y = new S0();
    y.onmessage = (U) => {
      const { id: j } = U.data;
      if (v.set(j, !1), !("base64" in U.data))
        return;
      const { base64: W, type: Q, width: Y, height: B } = U.data;
      this.mutationCb({
        id: j,
        type: Wa["2D"],
        commands: [
          {
            property: "clearRect",
            args: [0, 0, Y, B]
          },
          {
            property: "drawImage",
            args: [
              {
                rr_type: "ImageBitmap",
                args: [
                  {
                    rr_type: "Blob",
                    data: [{ rr_type: "ArrayBuffer", base64: W }],
                    type: Q
                  }
                ]
              },
              0,
              0
            ]
          }
        ]
      });
    };
    const h = 1e3 / c;
    let O = 0, M;
    const x = () => {
      const U = [];
      return s.document.querySelectorAll("canvas").forEach((j) => {
        de(j, o, d, !0) || U.push(j);
      }), U;
    }, L = (U) => {
      if (O && U - O < h) {
        M = requestAnimationFrame(L);
        return;
      }
      O = U, x().forEach((j) => n0(this, void 0, void 0, function* () {
        var W;
        const Q = this.mirror.getId(j);
        if (v.get(Q))
          return;
        if (v.set(Q, !0), ["webgl", "webgl2"].includes(j.__context)) {
          const B = j.getContext(j.__context);
          ((W = B == null ? void 0 : B.getContextAttributes()) === null || W === void 0 ? void 0 : W.preserveDrawingBuffer) === !1 && (B == null || B.clear(B.COLOR_BUFFER_BIT));
        }
        const Y = yield createImageBitmap(j);
        y.postMessage({
          id: Q,
          bitmap: Y,
          width: j.width,
          height: j.height,
          dataURLOptions: g.dataURLOptions
        }, [Y]);
      })), M = requestAnimationFrame(L);
    };
    M = requestAnimationFrame(L), this.resetObservers = () => {
      C(), cancelAnimationFrame(M);
    };
  }
  initCanvasMutationObserver(c, s, o) {
    this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
    const d = xh(c, s, o), g = f0(this.processMutation.bind(this), c, s, o), C = o0(this.processMutation.bind(this), c, s, o, this.mirror);
    this.resetObservers = () => {
      d(), g(), C();
    };
  }
  startPendingCanvasMutationFlusher() {
    requestAnimationFrame(() => this.flushPendingCanvasMutations());
  }
  startRAFTimestamping() {
    const c = (s) => {
      this.rafStamps.latestId = s, requestAnimationFrame(c);
    };
    requestAnimationFrame(c);
  }
  flushPendingCanvasMutations() {
    this.pendingCanvasMutations.forEach((c, s) => {
      const o = this.mirror.getId(s);
      this.flushPendingCanvasMutationFor(s, o);
    }), requestAnimationFrame(() => this.flushPendingCanvasMutations());
  }
  flushPendingCanvasMutationFor(c, s) {
    if (this.frozen || this.locked)
      return;
    const o = this.pendingCanvasMutations.get(c);
    if (!o || s === -1)
      return;
    const d = o.map((C) => a0(C, ["type"])), { type: g } = o[0];
    this.mutationCb({ id: s, type: g, commands: d }), this.pendingCanvasMutations.delete(c);
  }
}
class C0 {
  constructor(c) {
    this.trackedLinkElements = /* @__PURE__ */ new WeakSet(), this.styleMirror = new Yv(), this.mutationCb = c.mutationCb, this.adoptedStyleSheetCb = c.adoptedStyleSheetCb;
  }
  attachLinkElement(c, s) {
    "_cssText" in s.attributes && this.mutationCb({
      adds: [],
      removes: [],
      texts: [],
      attributes: [
        {
          id: s.id,
          attributes: s.attributes
        }
      ]
    }), this.trackLinkElement(c);
  }
  trackLinkElement(c) {
    this.trackedLinkElements.has(c) || (this.trackedLinkElements.add(c), this.trackStylesheetInLinkElement(c));
  }
  adoptStyleSheets(c, s) {
    if (c.length === 0)
      return;
    const o = {
      id: s,
      styleIds: []
    }, d = [];
    for (const g of c) {
      let C;
      if (this.styleMirror.has(g))
        C = this.styleMirror.getId(g);
      else {
        C = this.styleMirror.add(g);
        const v = Array.from(g.rules || CSSRule);
        d.push({
          styleId: C,
          rules: v.map((y, h) => ({
            rule: Lh(y),
            index: h
          }))
        });
      }
      o.styleIds.push(C);
    }
    d.length > 0 && (o.styles = d), this.adoptedStyleSheetCb(o);
  }
  reset() {
    this.styleMirror.reset(), this.trackedLinkElements = /* @__PURE__ */ new WeakSet();
  }
  trackStylesheetInLinkElement(c) {
  }
}
function $t(i) {
  return Object.assign(Object.assign({}, i), { timestamp: Date.now() });
}
let qt, bi, Pf, Mi = !1;
const qe = gv();
function $a(i = {}) {
  const { emit: c, checkoutEveryNms: s, checkoutEveryNth: o, blockClass: d = "rr-block", blockSelector: g = null, ignoreClass: C = "rr-ignore", maskTextClass: v = "rr-mask", maskTextSelector: y = null, inlineStylesheet: h = !0, maskAllInputs: O, maskInputOptions: M, slimDOMOptions: x, maskInputFn: L, maskTextFn: U, hooks: j, packFn: W, sampling: Q = {}, dataURLOptions: Y = {}, mousemoveWait: B, recordCanvas: F = !1, recordCrossOriginIframes: St = !1, userTriggeredOnInput: gt = !1, collectFonts: k = !1, inlineImages: ut = !1, plugins: Bt, keepIframeSrcFn: Vt = () => !1, ignoreCSSAttributes: Gt = /* @__PURE__ */ new Set([]) } = i, Nt = St ? window.parent === window : !0;
  let Qt = !1;
  if (!Nt)
    try {
      window.parent.document, Qt = !1;
    } catch (Z) {
      Qt = !0;
    }
  if (Nt && !c)
    throw new Error("emit function is required");
  B !== void 0 && Q.mousemove === void 0 && (Q.mousemove = B), qe.reset();
  const At = O === !0 ? {
    color: !0,
    date: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
    textarea: !0,
    select: !0,
    password: !0
  } : M !== void 0 ? M : { password: !0 }, Ut = x === !0 || x === "all" ? {
    script: !0,
    comment: !0,
    headFavicon: !0,
    headWhitespace: !0,
    headMetaSocial: !0,
    headMetaRobots: !0,
    headMetaHttpEquiv: !0,
    headMetaVerification: !0,
    headMetaAuthorship: x === "all",
    headMetaDescKeywords: x === "all"
  } : x || {};
  Zv();
  let N, H = 0;
  const X = (Z) => {
    for (const tt of Bt || [])
      tt.eventProcessor && (Z = tt.eventProcessor(Z));
    return W && (Z = W(Z)), Z;
  };
  qt = (Z, tt) => {
    var Ct;
    if (!((Ct = ua[0]) === null || Ct === void 0) && Ct.isFrozen() && Z.type !== pt.FullSnapshot && !(Z.type === pt.IncrementalSnapshot && Z.data.source === mt.Mutation) && ua.forEach((et) => et.unfreeze()), Nt)
      c == null || c(X(Z), tt);
    else if (Qt) {
      const et = {
        type: "rrweb",
        event: X(Z),
        isCheckout: tt
      };
      window.parent.postMessage(et, "*");
    }
    if (Z.type === pt.FullSnapshot)
      N = Z, H = 0;
    else if (Z.type === pt.IncrementalSnapshot) {
      if (Z.data.source === mt.Mutation && Z.data.isAttachIframe)
        return;
      H++;
      const et = o && H >= o, Ft = s && Z.timestamp - N.timestamp > s;
      (et || Ft) && bi(!0);
    }
  };
  const at = (Z) => {
    qt($t({
      type: pt.IncrementalSnapshot,
      data: Object.assign({ source: mt.Mutation }, Z)
    }));
  }, it = (Z) => qt($t({
    type: pt.IncrementalSnapshot,
    data: Object.assign({ source: mt.Scroll }, Z)
  })), p = (Z) => qt($t({
    type: pt.IncrementalSnapshot,
    data: Object.assign({ source: mt.CanvasMutation }, Z)
  })), _ = (Z) => qt($t({
    type: pt.IncrementalSnapshot,
    data: Object.assign({ source: mt.AdoptedStyleSheet }, Z)
  })), G = new C0({
    mutationCb: at,
    adoptedStyleSheetCb: _
  }), w = new e0({
    mirror: qe,
    mutationCb: at,
    stylesheetManager: G,
    recordCrossOriginIframes: St,
    wrappedEmit: qt
  });
  for (const Z of Bt || [])
    Z.getMirror && Z.getMirror({
      nodeMirror: qe,
      crossOriginIframeMirror: w.crossOriginIframeMirror,
      crossOriginIframeStyleMirror: w.crossOriginIframeStyleMirror
    });
  Pf = new b0({
    recordCanvas: F,
    mutationCb: p,
    win: window,
    blockClass: d,
    blockSelector: g,
    mirror: qe,
    sampling: Q.canvas,
    dataURLOptions: Y
  });
  const $ = new l0({
    mutationCb: at,
    scrollCb: it,
    bypassOptions: {
      blockClass: d,
      blockSelector: g,
      maskTextClass: v,
      maskTextSelector: y,
      inlineStylesheet: h,
      maskInputOptions: At,
      dataURLOptions: Y,
      maskTextFn: U,
      maskInputFn: L,
      recordCanvas: F,
      inlineImages: ut,
      sampling: Q,
      slimDOMOptions: Ut,
      iframeManager: w,
      stylesheetManager: G,
      canvasManager: Pf,
      keepIframeSrcFn: Vt
    },
    mirror: qe
  });
  bi = (Z = !1) => {
    var tt, Ct, et, Ft, dt, Pt;
    qt($t({
      type: pt.Meta,
      data: {
        href: window.location.href,
        width: Vh(),
        height: qh()
      }
    }), Z), G.reset(), ua.forEach((Lt) => Lt.lock());
    const dl = Gv(document, {
      mirror: qe,
      blockClass: d,
      blockSelector: g,
      maskTextClass: v,
      maskTextSelector: y,
      inlineStylesheet: h,
      maskAllInputs: At,
      maskTextFn: U,
      slimDOM: Ut,
      dataURLOptions: Y,
      recordCanvas: F,
      inlineImages: ut,
      onSerialize: (Lt) => {
        Kh(Lt, qe) && w.addIframe(Lt), kh(Lt, qe) && G.trackLinkElement(Lt), Jh(Lt) && $.addShadowRoot(Lt.shadowRoot, document);
      },
      onIframeLoad: (Lt, Yl) => {
        w.attachIframe(Lt, Yl), $.observeAttachShadow(Lt);
      },
      onStylesheetLoad: (Lt, Yl) => {
        G.attachLinkElement(Lt, Yl);
      },
      keepIframeSrcFn: Vt
    });
    if (!dl)
      return console.warn("Failed to snapshot the document");
    qt($t({
      type: pt.FullSnapshot,
      data: {
        node: dl,
        initialOffset: {
          left: window.pageXOffset !== void 0 ? window.pageXOffset : (document == null ? void 0 : document.documentElement.scrollLeft) || ((Ct = (tt = document == null ? void 0 : document.body) === null || tt === void 0 ? void 0 : tt.parentElement) === null || Ct === void 0 ? void 0 : Ct.scrollLeft) || ((et = document == null ? void 0 : document.body) === null || et === void 0 ? void 0 : et.scrollLeft) || 0,
          top: window.pageYOffset !== void 0 ? window.pageYOffset : (document == null ? void 0 : document.documentElement.scrollTop) || ((dt = (Ft = document == null ? void 0 : document.body) === null || Ft === void 0 ? void 0 : Ft.parentElement) === null || dt === void 0 ? void 0 : dt.scrollTop) || ((Pt = document == null ? void 0 : document.body) === null || Pt === void 0 ? void 0 : Pt.scrollTop) || 0
        }
      }
    })), ua.forEach((Lt) => Lt.unlock()), document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0 && G.adoptStyleSheets(document.adoptedStyleSheets, qe.getId(document));
  };
  try {
    const Z = [];
    Z.push(re("DOMContentLoaded", () => {
      qt($t({
        type: pt.DomContentLoaded,
        data: {}
      }));
    }));
    const tt = (et) => {
      var Ft;
      return t0({
        mutationCb: at,
        mousemoveCb: (dt, Pt) => qt($t({
          type: pt.IncrementalSnapshot,
          data: {
            source: Pt,
            positions: dt
          }
        })),
        mouseInteractionCb: (dt) => qt($t({
          type: pt.IncrementalSnapshot,
          data: Object.assign({ source: mt.MouseInteraction }, dt)
        })),
        scrollCb: it,
        viewportResizeCb: (dt) => qt($t({
          type: pt.IncrementalSnapshot,
          data: Object.assign({ source: mt.ViewportResize }, dt)
        })),
        inputCb: (dt) => qt($t({
          type: pt.IncrementalSnapshot,
          data: Object.assign({ source: mt.Input }, dt)
        })),
        mediaInteractionCb: (dt) => qt($t({
          type: pt.IncrementalSnapshot,
          data: Object.assign({ source: mt.MediaInteraction }, dt)
        })),
        styleSheetRuleCb: (dt) => qt($t({
          type: pt.IncrementalSnapshot,
          data: Object.assign({ source: mt.StyleSheetRule }, dt)
        })),
        styleDeclarationCb: (dt) => qt($t({
          type: pt.IncrementalSnapshot,
          data: Object.assign({ source: mt.StyleDeclaration }, dt)
        })),
        canvasMutationCb: p,
        fontCb: (dt) => qt($t({
          type: pt.IncrementalSnapshot,
          data: Object.assign({ source: mt.Font }, dt)
        })),
        selectionCb: (dt) => {
          qt($t({
            type: pt.IncrementalSnapshot,
            data: Object.assign({ source: mt.Selection }, dt)
          }));
        },
        blockClass: d,
        ignoreClass: C,
        maskTextClass: v,
        maskTextSelector: y,
        maskInputOptions: At,
        inlineStylesheet: h,
        sampling: Q,
        recordCanvas: F,
        inlineImages: ut,
        userTriggeredOnInput: gt,
        collectFonts: k,
        doc: et,
        maskInputFn: L,
        maskTextFn: U,
        keepIframeSrcFn: Vt,
        blockSelector: g,
        slimDOMOptions: Ut,
        dataURLOptions: Y,
        mirror: qe,
        iframeManager: w,
        stylesheetManager: G,
        shadowDomManager: $,
        canvasManager: Pf,
        ignoreCSSAttributes: Gt,
        plugins: ((Ft = Bt == null ? void 0 : Bt.filter((dt) => dt.observer)) === null || Ft === void 0 ? void 0 : Ft.map((dt) => ({
          observer: dt.observer,
          options: dt.options,
          callback: (Pt) => qt($t({
            type: pt.Plugin,
            data: {
              plugin: dt.name,
              payload: Pt
            }
          }))
        }))) || []
      }, j);
    };
    w.addLoadListener((et) => {
      Z.push(tt(et.contentDocument));
    });
    const Ct = () => {
      bi(), Z.push(tt(document)), Mi = !0;
    };
    return document.readyState === "interactive" || document.readyState === "complete" ? Ct() : Z.push(re("load", () => {
      qt($t({
        type: pt.Load,
        data: {}
      })), Ct();
    }, window)), () => {
      Z.forEach((et) => et()), Mi = !1;
    };
  } catch (Z) {
    console.warn(Z);
  }
}
$a.addCustomEvent = (i, c) => {
  if (!Mi)
    throw new Error("please add custom event after start recording");
  qt($t({
    type: pt.Custom,
    data: {
      tag: i,
      payload: c
    }
  }));
};
$a.freezePage = () => {
  ua.forEach((i) => i.freeze());
};
$a.takeFullSnapshot = (i) => {
  if (!Mi)
    throw new Error("please take full snapshot after start recording");
  bi(i);
};
$a.mirror = qe;
const Rt = {
  events: [],
  stopFn: null,
  isRecording: !1,
  hasInitialized: !1
}, A0 = () => Qf(null, null, function* () {
  try {
    console.log("🌍 Starting geo-location collection...");
    try {
      const i = yield fetch("https://ipapi.co/json/", {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });
      if (i.ok) {
        const c = yield i.json();
        console.log("✅ IP geolocation successful:", c);
        const s = Intl.DateTimeFormat().resolvedOptions().timeZone, o = navigator.language, d = {
          country: c.country_name || "Unknown",
          countryCode: c.country_code || "XX",
          region: c.region || "Unknown",
          regionCode: c.region_code || "XX",
          city: c.city || "Unknown",
          latitude: c.latitude || null,
          longitude: c.longitude || null,
          accuracy: null,
          timezone: c.timezone || s,
          locale: o,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          isp: c.org || "Unknown",
          org: c.org || "Unknown",
          ip: c.ip || "Unknown",
          postal: c.postal || null,
          continent: c.continent_code || null
        };
        return console.log("✅ Geo-location collected via IP API:", d), d;
      }
    } catch (i) {
      console.warn("⚠️ IP geolocation failed, falling back to browser API:", i);
    }
    if (navigator.geolocation)
      return new Promise((i) => {
        navigator.geolocation.getCurrentPosition(
          (c) => {
            console.log("✅ Browser geolocation successful:", c.coords);
            const s = Intl.DateTimeFormat().resolvedOptions().timeZone, o = navigator.language, d = s.split("/"), g = d.length > 1 ? d[0] : "Unknown", C = d.length > 1 ? d[d.length - 1].replace(/_/g, " ") : "Unknown", v = o.includes("-") ? o.split("-")[1].toUpperCase() : "XX", y = {
              country: to(s),
              countryCode: v,
              region: g,
              regionCode: "XX",
              city: C,
              latitude: c.coords.latitude,
              longitude: c.coords.longitude,
              accuracy: c.coords.accuracy,
              timezone: s,
              locale: o,
              timestamp: new Date(c.timestamp).toISOString(),
              isp: "Unknown",
              org: "Unknown",
              ip: "Unknown"
            };
            console.log("✅ Geo-location collected using browser API:", y), i(y);
          },
          (c) => {
            console.warn("⚠️ Browser geolocation failed:", c.message);
            try {
              const s = Intl.DateTimeFormat().resolvedOptions().timeZone, o = navigator.language, d = o.includes("-") ? o.split("-")[1].toUpperCase() : "XX", g = s.split("/"), C = g.length > 1 ? g[0] : "Unknown", v = g.length > 1 ? g[g.length - 1].replace(/_/g, " ") : "Unknown", y = {
                country: to(s),
                countryCode: d,
                region: C,
                regionCode: "XX",
                city: v,
                latitude: null,
                longitude: null,
                accuracy: null,
                timezone: s,
                locale: o,
                timestamp: (/* @__PURE__ */ new Date()).toISOString(),
                isp: "Unknown",
                org: "Unknown",
                ip: "Unknown",
                fallbackReason: "Geolocation permission denied or unavailable"
              };
              console.log("⚠️ Using timezone/locale fallback geo-location:", y), i(y);
            } catch (s) {
              console.warn("❌ Timezone fallback failed:", s), i(null);
            }
          },
          {
            enableHighAccuracy: !1,
            timeout: 1e4,
            maximumAge: 3e5
            // Cache for 5 minutes
          }
        );
      });
    console.warn("⚠️ Browser geolocation not supported");
    try {
      const i = Intl.DateTimeFormat().resolvedOptions().timeZone, c = navigator.language, s = c.includes("-") ? c.split("-")[1].toUpperCase() : "XX", o = i.split("/"), d = o.length > 1 ? o[0] : "Unknown", g = o.length > 1 ? o[o.length - 1].replace(/_/g, " ") : "Unknown", C = {
        country: to(i),
        countryCode: s,
        region: d,
        regionCode: "XX",
        city: g,
        latitude: null,
        longitude: null,
        accuracy: null,
        timezone: i,
        locale: c,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        isp: "Unknown",
        org: "Unknown",
        ip: "Unknown",
        fallbackReason: "Geolocation API not supported"
      };
      return console.log("⚠️ Using timezone/locale only geo-location:", C), C;
    } catch (i) {
      return console.warn("❌ All built-in geo-location methods failed:", i), null;
    }
  } catch (i) {
    return console.warn("❌ Geo-location collection failed:", i), null;
  }
}), to = (i) => ({
  "Asia/Kolkata": "India",
  "Asia/Calcutta": "India",
  "America/New_York": "United States",
  "America/Los_Angeles": "United States",
  "America/Chicago": "United States",
  "Europe/London": "United Kingdom",
  "Europe/Paris": "France",
  "Europe/Berlin": "Germany",
  "Asia/Tokyo": "Japan",
  "Asia/Shanghai": "China",
  "Asia/Dubai": "United Arab Emirates",
  "Asia/Singapore": "Singapore",
  "Australia/Sydney": "Australia",
  "Pacific/Auckland": "New Zealand"
})[i] || "Unknown", T0 = () => {
  const i = navigator;
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    connection: i.connection ? {
      effectiveType: i.connection.effectiveType,
      downlink: i.connection.downlink,
      rtt: i.connection.rtt
    } : "Not available",
    memory: i.deviceMemory ? `${i.deviceMemory} GB` : "Not available",
    cores: navigator.hardwareConcurrency || 0,
    url: window.location.href,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    referrer: document.referrer || void 0
  };
}, M0 = ({
  showRecordingControl: i = !1
} = {}) => {
  const [c, s] = se.useState(!1), [o, d] = se.useState(Rt.isRecording), [g, C] = se.useState(null), [v, y] = se.useState(""), [h, O] = se.useState(""), [M, x] = se.useState(!1), [L, U] = se.useState(!1);
  se.useEffect(() => {
    const B = () => {
      if (Rt.stopFn) {
        console.log("🎥 Recording already active");
        return;
      }
      console.log("🎥 Recording started - Mode:", i ? "Manual" : "Auto (from page load)"), Rt.isRecording = !0, d(!0), i && (Rt.events = []);
      const F = $a({
        emit(St) {
          Rt.events.push(St);
        },
        checkoutEveryNms: 10 * 1e3
      });
      Rt.stopFn = F || null, console.log("🎥 Recording initialized. Events will accumulate...");
    };
    !i && !Rt.hasInitialized && (Rt.hasInitialized = !0, B());
  }, [i]), se.useEffect(() => {
    d(Rt.isRecording);
  }, []);
  const j = () => {
    if (Rt.stopFn) {
      console.log("🎥 Recording already active");
      return;
    }
    console.log("🎥 Recording started - Mode:", i ? "Manual" : "Auto (from page load)"), Rt.isRecording = !0, d(!0), i && (Rt.events = []);
    const B = $a({
      emit(F) {
        Rt.events.push(F);
      },
      checkoutEveryNms: 10 * 1e3
    });
    Rt.stopFn = B || null, console.log("🎥 Recording initialized. Events will accumulate...");
  }, W = () => {
    Rt.stopFn && (Rt.stopFn(), Rt.stopFn = null, Rt.isRecording = !1, d(!1), console.log("🎥 Recording stopped. Total events captured:", Rt.events.length));
  }, Q = () => Qf(null, null, function* () {
    if (!v.trim()) {
      alert("Please provide a description");
      return;
    }
    x(!0), Rt.isRecording && W(), console.log("📊 Final event count:", Rt.events.length);
    const F = yield A0(), St = {
      type: g,
      description: v,
      email: h,
      systemInfo: T0(),
      geoLocation: F,
      sessionRecording: Rt.events,
      performanceMetrics: {
        loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
        domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
      }
    };
    typeof window != "undefined" && window.onTimeMachineFeedback && window.onTimeMachineFeedback(St), console.log("📤 Submitting feedback:", St), setTimeout(() => {
      x(!1), U(!0), setTimeout(() => {
        s(!1), U(!1), C(null), y(""), O(""), i ? Rt.events = [] : (Rt.events = [], j());
      }, 2e3);
    }, 1500);
  }), Y = [
    { id: "bug", label: "Report Issue", icon: Py, color: "bg-red-500", hoverColor: "hover:bg-red-600" },
    { id: "appreciation", label: "Appreciate", icon: ev, color: "bg-pink-500", hoverColor: "hover:bg-pink-600" },
    { id: "feature", label: "Suggest Feature", icon: av, color: "bg-blue-500", hoverColor: "hover:bg-blue-600" }
  ];
  return /* @__PURE__ */ P.jsxs("div", { className: "fixed bottom-6 right-6 z-50 font-sans", children: [
    c && /* @__PURE__ */ P.jsxs("div", { className: "mb-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden", children: [
      /* @__PURE__ */ P.jsx("div", { className: "bg-blue-600 p-4 text-white", children: /* @__PURE__ */ P.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ P.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ P.jsx("div", { className: "w-8 h-8 bg-white rounded-lg flex items-center justify-center", children: /* @__PURE__ */ P.jsx("span", { className: "text-xl", children: "🎯" }) }),
          /* @__PURE__ */ P.jsxs("div", { children: [
            /* @__PURE__ */ P.jsx("h3", { className: "font-bold text-lg", children: "TimeMachine" }),
            /* @__PURE__ */ P.jsx("p", { className: "text-xs opacity-90", children: "Help us improve" })
          ] })
        ] }),
        /* @__PURE__ */ P.jsx(
          "button",
          {
            onClick: () => s(!1),
            className: "rounded-lg p-1",
            children: /* @__PURE__ */ P.jsx(rv, { size: 20 })
          }
        )
      ] }) }),
      /* @__PURE__ */ P.jsx("div", { className: "p-6", children: L ? /* @__PURE__ */ P.jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ P.jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ P.jsx("span", { className: "text-3xl", children: "✓" }) }),
        /* @__PURE__ */ P.jsx("h4", { className: "text-xl font-bold text-gray-800 mb-2", children: "Thank you!" }),
        /* @__PURE__ */ P.jsx("p", { className: "text-gray-600", children: "Your feedback has been submitted successfully." })
      ] }) : g ? /* @__PURE__ */ P.jsxs("div", { className: "space-y-4", children: [
        o && /* @__PURE__ */ P.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2", children: [
          /* @__PURE__ */ P.jsx("div", { className: "w-2 h-2 bg-red-500 rounded-full animate-pulse" }),
          /* @__PURE__ */ P.jsx("span", { className: "text-sm text-red-700 font-medium", children: i ? "Session recording active" : `Recording entire session (${Rt.events.length} events)` })
        ] }),
        /* @__PURE__ */ P.jsxs("div", { children: [
          /* @__PURE__ */ P.jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
            g === "bug" && "Describe the issue",
            g === "appreciation" && "What did you love?",
            g === "feature" && "Describe your idea"
          ] }),
          /* @__PURE__ */ P.jsx(
            "textarea",
            {
              value: v,
              onChange: (B) => y(B.target.value),
              rows: 4,
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none",
              placeholder: "Tell us more..."
            }
          )
        ] }),
        /* @__PURE__ */ P.jsxs("div", { children: [
          /* @__PURE__ */ P.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Email (optional)" }),
          /* @__PURE__ */ P.jsx(
            "input",
            {
              type: "email",
              value: h,
              onChange: (B) => O(B.target.value),
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent",
              placeholder: "your@email.com"
            }
          )
        ] }),
        i && /* @__PURE__ */ P.jsxs(
          "button",
          {
            type: "button",
            onClick: () => o ? W() : j(),
            className: `w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors ${o ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
            children: [
              o ? /* @__PURE__ */ P.jsx(cv, { size: 16 }) : /* @__PURE__ */ P.jsx(ov, { size: 16 }),
              o ? "Stop Recording" : "Start Recording"
            ]
          }
        ),
        /* @__PURE__ */ P.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ P.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                C(null), i && (W(), Rt.events = []);
              },
              className: "flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors",
              children: "Back"
            }
          ),
          /* @__PURE__ */ P.jsx(
            "button",
            {
              type: "button",
              onClick: Q,
              disabled: M,
              className: "flex-1 px-4 py-2 bg-blue-600 border border-gray-300 text-gray-700 rounded-lg hover:bg-blue-700 font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2",
              children: M ? /* @__PURE__ */ P.jsxs(P.Fragment, { children: [
                /* @__PURE__ */ P.jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }),
                "Sending..."
              ] }) : /* @__PURE__ */ P.jsxs(P.Fragment, { children: [
                /* @__PURE__ */ P.jsx(uv, { size: 16 }),
                "Submit"
              ] })
            }
          )
        ] })
      ] }) : /* @__PURE__ */ P.jsxs("div", { children: [
        /* @__PURE__ */ P.jsx("p", { className: "text-gray-600 mb-4 text-sm", children: "Choose how you'd like to help us:" }),
        /* @__PURE__ */ P.jsx("div", { className: "space-y-3", children: Y.map((B) => {
          const F = B.icon;
          return /* @__PURE__ */ P.jsxs(
            "button",
            {
              onClick: () => {
                C(B.id), i && !o && j();
              },
              className: `w-full ${B.color} ${B.hoverColor} text-white p-4 rounded-xl flex items-center gap-3 transition-all hover:scale-105 shadow-md`,
              children: [
                /* @__PURE__ */ P.jsx(F, { size: 24 }),
                /* @__PURE__ */ P.jsx("span", { className: "font-semibold", children: B.label })
              ]
            },
            B.id
          );
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ P.jsx(
      "button",
      {
        onClick: () => s(!c),
        className: "w-14 h-14 bg-white-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group",
        children: /* @__PURE__ */ P.jsx("span", { className: "text-2xl", children: "🎯" })
      }
    )
  ] });
};
class om {
  constructor(c = {}) {
    vi(this, "config");
    vi(this, "container", null);
    vi(this, "root", null);
    this.config = Ll({
      autoStart: !0,
      showRecordingControl: !1,
      position: "bottom-right"
    }, c), this.init();
  }
  init() {
    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => this.render()) : this.render();
  }
  render() {
    this.container = document.createElement("div"), this.container.id = "smart-trace-widget", this.container.style.position = "fixed", this.container.style.zIndex = "999999", this.container.style.pointerEvents = "none", this.setPosition(), document.body.appendChild(this.container), this.config.onFeedback && (window.onTimeMachineFeedback = this.config.onFeedback), this.root = Vy.createRoot(this.container), this.root.render(
      hh.createElement("div", {
        style: { pointerEvents: "auto" }
      }, hh.createElement(M0, {
        showRecordingControl: this.config.showRecordingControl
      }))
    );
  }
  setPosition() {
    if (this.container)
      switch (this.container.style.top = "auto", this.container.style.bottom = "auto", this.container.style.left = "auto", this.container.style.right = "auto", this.config.position) {
        case "bottom-right":
          this.container.style.bottom = "24px", this.container.style.right = "24px";
          break;
        case "bottom-left":
          this.container.style.bottom = "24px", this.container.style.left = "24px";
          break;
        case "top-right":
          this.container.style.top = "24px", this.container.style.right = "24px";
          break;
        case "top-left":
          this.container.style.top = "24px", this.container.style.left = "24px";
          break;
      }
  }
  // Public methods
  updateConfig(c) {
    this.config = Ll(Ll({}, this.config), c), c.position && this.container && this.setPosition();
  }
  destroy() {
    this.root && this.root.unmount(), this.container && this.container.parentNode && this.container.parentNode.removeChild(this.container), this.container = null, this.root = null;
  }
}
function Hh(i) {
  return new om(i);
}
if (typeof window != "undefined") {
  window.SmartTrace = om, window.initSmartTrace = Hh;
  const i = window.SmartTraceConfig;
  i && Hh(i);
}
export {
  om as SmartTrace,
  Hh as initSmartTrace
};
