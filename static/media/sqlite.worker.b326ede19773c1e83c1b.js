!(function (e, t) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    var r = t();
    for (var n in r) ("object" == typeof exports ? exports : e)[n] = r[n];
  }
})(this, function () {
  return (() => {
    var __webpack_modules__ = {
        870: (e, t, r) => {
          "use strict";
          r.r(t),
            r.d(t, {
              createEndpoint: () => o,
              expose: () => l,
              proxy: () => g,
              proxyMarker: () => n,
              releaseProxy: () => i,
              transfer: () => _,
              transferHandlers: () => u,
              windowEndpoint: () => v,
              wrap: () => f,
            });
          const n = Symbol("Comlink.proxy"),
            o = Symbol("Comlink.endpoint"),
            i = Symbol("Comlink.releaseProxy"),
            s = Symbol("Comlink.thrown"),
            a = (e) =>
              ("object" == typeof e && null !== e) || "function" == typeof e,
            u = new Map([
              [
                "proxy",
                {
                  canHandle: (e) => a(e) && e[n],
                  serialize(e) {
                    const { port1: t, port2: r } = new MessageChannel();
                    return l(e, t), [r, [r]];
                  },
                  deserialize: (e) => (e.start(), f(e)),
                },
              ],
              [
                "throw",
                {
                  canHandle: (e) => a(e) && s in e,
                  serialize({ value: e }) {
                    let t;
                    return (
                      (t =
                        e instanceof Error
                          ? {
                              isError: !0,
                              value: {
                                message: e.message,
                                name: e.name,
                                stack: e.stack,
                              },
                            }
                          : { isError: !1, value: e }),
                      [t, []]
                    );
                  },
                  deserialize(e) {
                    if (e.isError)
                      throw Object.assign(new Error(e.value.message), e.value);
                    throw e.value;
                  },
                },
              ],
            ]);
          function l(e, t = self) {
            t.addEventListener("message", function r(n) {
              if (!n || !n.data) return;
              const {
                  id: o,
                  type: i,
                  path: a,
                } = Object.assign({ path: [] }, n.data),
                u = (n.data.argumentList || []).map(b);
              let f;
              try {
                const t = a.slice(0, -1).reduce((e, t) => e[t], e),
                  r = a.reduce((e, t) => e[t], e);
                switch (i) {
                  case 0:
                    f = r;
                    break;
                  case 1:
                    (t[a.slice(-1)[0]] = b(n.data.value)), (f = !0);
                    break;
                  case 2:
                    f = r.apply(t, u);
                    break;
                  case 3:
                    f = g(new r(...u));
                    break;
                  case 4:
                    {
                      const { port1: t, port2: r } = new MessageChannel();
                      l(e, r), (f = _(t, [t]));
                    }
                    break;
                  case 5:
                    f = void 0;
                }
              } catch (e) {
                f = { value: e, [s]: 0 };
              }
              Promise.resolve(f)
                .catch((e) => ({ value: e, [s]: 0 }))
                .then((e) => {
                  const [n, s] = y(e);
                  t.postMessage(
                    Object.assign(Object.assign({}, n), { id: o }),
                    s
                  ),
                    5 === i && (t.removeEventListener("message", r), c(t));
                });
            }),
              t.start && t.start();
          }
          function c(e) {
            (function (e) {
              return "MessagePort" === e.constructor.name;
            })(e) && e.close();
          }
          function f(e, t) {
            return h(e, [], t);
          }
          function d(e) {
            if (e)
              throw new Error("Proxy has been released and is not useable");
          }
          function h(e, t = [], r = function () {}) {
            let n = !1;
            const s = new Proxy(r, {
              get(r, o) {
                if ((d(n), o === i))
                  return () =>
                    w(e, { type: 5, path: t.map((e) => e.toString()) }).then(
                      () => {
                        c(e), (n = !0);
                      }
                    );
                if ("then" === o) {
                  if (0 === t.length) return { then: () => s };
                  const r = w(e, {
                    type: 0,
                    path: t.map((e) => e.toString()),
                  }).then(b);
                  return r.then.bind(r);
                }
                return h(e, [...t, o]);
              },
              set(r, o, i) {
                d(n);
                const [s, a] = y(i);
                return w(
                  e,
                  {
                    type: 1,
                    path: [...t, o].map((e) => e.toString()),
                    value: s,
                  },
                  a
                ).then(b);
              },
              apply(r, i, s) {
                d(n);
                const a = t[t.length - 1];
                if (a === o) return w(e, { type: 4 }).then(b);
                if ("bind" === a) return h(e, t.slice(0, -1));
                const [u, l] = p(s);
                return w(
                  e,
                  {
                    type: 2,
                    path: t.map((e) => e.toString()),
                    argumentList: u,
                  },
                  l
                ).then(b);
              },
              construct(r, o) {
                d(n);
                const [i, s] = p(o);
                return w(
                  e,
                  {
                    type: 3,
                    path: t.map((e) => e.toString()),
                    argumentList: i,
                  },
                  s
                ).then(b);
              },
            });
            return s;
          }
          function p(e) {
            const t = e.map(y);
            return [
              t.map((e) => e[0]),
              ((r = t.map((e) => e[1])), Array.prototype.concat.apply([], r)),
            ];
            var r;
          }
          const m = new WeakMap();
          function _(e, t) {
            return m.set(e, t), e;
          }
          function g(e) {
            return Object.assign(e, { [n]: !0 });
          }
          function v(e, t = self, r = "*") {
            return {
              postMessage: (t, n) => e.postMessage(t, r, n),
              addEventListener: t.addEventListener.bind(t),
              removeEventListener: t.removeEventListener.bind(t),
            };
          }
          function y(e) {
            for (const [t, r] of u)
              if (r.canHandle(e)) {
                const [n, o] = r.serialize(e);
                return [{ type: 3, name: t, value: n }, o];
              }
            return [{ type: 0, value: e }, m.get(e) || []];
          }
          function b(e) {
            switch (e.type) {
              case 3:
                return u.get(e.name).deserialize(e.value);
              case 0:
                return e.value;
            }
          }
          function w(e, t, r) {
            return new Promise((n) => {
              const o = new Array(4)
                .fill(0)
                .map(() =>
                  Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(
                    16
                  )
                )
                .join("-");
              e.addEventListener("message", function t(r) {
                r.data &&
                  r.data.id &&
                  r.data.id === o &&
                  (e.removeEventListener("message", t), n(r.data));
              }),
                e.start && e.start(),
                e.postMessage(Object.assign({ id: o }, t), r);
            });
          }
        },
        794: (e, t) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.createLazyFile = t.LazyUint8Array = void 0);
          class r {
            constructor(e) {
              (this.serverChecked = !1),
                (this.chunks = []),
                (this.totalFetchedBytes = 0),
                (this.totalRequests = 0),
                (this.readPages = []),
                (this.readHeads = []),
                (this.lastGet = -1),
                (this._chunkSize = e.requestChunkSize),
                (this.maxSpeed = Math.round(
                  (e.maxReadSpeed || 5242880) / this._chunkSize
                )),
                (this.maxReadHeads = e.maxReadHeads ?? 3),
                (this.rangeMapper = e.rangeMapper),
                (this.logPageReads = e.logPageReads ?? !1),
                e.fileLength && (this._length = e.fileLength);
            }
            copyInto(e, t, r, n) {
              if (n >= this.length) return 0;
              const o = n + (r = Math.min(this.length - n, r));
              let i = 0;
              for (; i < r; ) {
                const r = n + i,
                  s = r % this.chunkSize,
                  a = (r / this.chunkSize) | 0,
                  u = Math.min(this.chunkSize, o - r);
                let l = this.getChunk(a);
                (0 === s && u === this.chunkSize) || (l = l.subarray(s, s + u)),
                  e.set(l, t + i),
                  (i += l.length);
              }
              return r;
            }
            moveReadHead(e) {
              for (const [t, r] of this.readHeads.entries()) {
                const n = r.startChunk + r.speed,
                  o = Math.min(this.maxSpeed, 2 * r.speed);
                if (e >= n && e < n + o)
                  return (
                    (r.speed = o),
                    (r.startChunk = n),
                    0 !== t &&
                      (this.readHeads.splice(t, 1), this.readHeads.unshift(r)),
                    r
                  );
              }
              const t = { startChunk: e, speed: 1 };
              for (
                this.readHeads.unshift(t);
                this.readHeads.length > this.maxReadHeads;

              )
                this.readHeads.pop();
              return t;
            }
            getChunk(e) {
              let t = !0;
              if (void 0 === this.chunks[e]) {
                t = !1;
                const r = this.moveReadHead(e),
                  n = r.speed,
                  o = r.startChunk * this.chunkSize;
                let i = (r.startChunk + n) * this.chunkSize - 1;
                i = Math.min(i, this.length - 1);
                const s = this.doXHR(o, i);
                for (let e = 0; e < n; e++) {
                  const t = r.startChunk + e;
                  if (e * this.chunkSize >= s.byteLength) break;
                  const n =
                    (e + 1) * this.chunkSize > s.byteLength
                      ? s.byteLength - e * this.chunkSize
                      : this.chunkSize;
                  this.chunks[t] = new Uint8Array(s, e * this.chunkSize, n);
                }
              }
              if (void 0 === this.chunks[e])
                throw new Error("doXHR failed (bug)!");
              return (
                !this.logPageReads ||
                  this.lastGet == e ||
                  ((this.lastGet = e),
                  this.readPages.push({
                    pageno: e,
                    wasCached: t,
                    prefetch: t ? 0 : this.readHeads[0].speed - 1,
                  })),
                this.chunks[e]
              );
            }
            checkServer() {
              var e = new XMLHttpRequest();
              const t = this.rangeMapper(0, 0).url;
              if (
                (e.open("HEAD", t, !1),
                e.send(null),
                !((e.status >= 200 && e.status < 300) || 304 === e.status))
              )
                throw new Error("Couldn't load " + t + ". Status: " + e.status);
              var r = Number(e.getResponseHeader("Content-length")),
                n = "bytes" === e.getResponseHeader("Accept-Ranges");
              const o = e.getResponseHeader("Content-Encoding");
              var i = o && "identity" !== o;
              if (!n) {
                const t =
                  "Warning: The server did not respond with Accept-Ranges=bytes. It either does not support byte serving or does not advertise it (`Accept-Ranges: bytes` header missing), or your database is hosted on CORS and the server doesn't mark the accept-ranges header as exposed. This may lead to incorrect results.";
                console.warn(
                  t,
                  "(seen response headers:",
                  e.getAllResponseHeaders(),
                  ")"
                );
              }
              if (
                (i &&
                  console.warn(
                    `Warning: The server responded with ${o} encoding to a HEAD request. Ignoring since it may not do so for Range HTTP requests, but this will lead to incorrect results otherwise since the ranges will be based on the compressed data instead of the uncompressed data.`
                  ),
                i && (r = null),
                !this._length)
              ) {
                if (!r)
                  throw (
                    (console.error(
                      "response headers",
                      e.getAllResponseHeaders()
                    ),
                    Error(
                      "Length of the file not known. It must either be supplied in the config or given by the HTTP server."
                    ))
                  );
                this._length = r;
              }
              this.serverChecked = !0;
            }
            get length() {
              return this.serverChecked || this.checkServer(), this._length;
            }
            get chunkSize() {
              return this.serverChecked || this.checkServer(), this._chunkSize;
            }
            doXHR(e, t) {
              if (
                (console.log(
                  `[xhr of size ${(t + 1 - e) / 1024} KiB @ ${e / 1024} KiB]`
                ),
                (this.totalFetchedBytes += t - e),
                this.totalRequests++,
                e > t)
              )
                throw new Error(
                  "invalid range (" + e + ", " + t + ") or no bytes requested!"
                );
              if (t > this.length - 1)
                throw new Error(
                  "only " + this.length + " bytes available! programmer error!"
                );
              const { fromByte: r, toByte: n, url: o } = this.rangeMapper(e, t);
              var i = new XMLHttpRequest();
              if (
                (i.open("GET", o, !1),
                this.length !== this.chunkSize &&
                  i.setRequestHeader("Range", "bytes=" + r + "-" + n),
                (i.responseType = "arraybuffer"),
                i.overrideMimeType &&
                  i.overrideMimeType("text/plain; charset=x-user-defined"),
                i.send(null),
                !((i.status >= 200 && i.status < 300) || 304 === i.status))
              )
                throw new Error("Couldn't load " + o + ". Status: " + i.status);
              if (void 0 !== i.response) return i.response;
              throw Error("xhr did not return uint8array");
            }
          }
          (t.LazyUint8Array = r),
            (t.createLazyFile = function (e, t, n, o, i, s) {
              var a = new r(s),
                u = { isDevice: !1, contents: a },
                l = e.createFile(t, n, u, o, i);
              (l.contents = a),
                Object.defineProperties(l, {
                  usedBytes: {
                    get: function () {
                      return this.contents.length;
                    },
                  },
                });
              var c = {};
              return (
                Object.keys(l.stream_ops).forEach(function (t) {
                  var r = l.stream_ops[t];
                  c[t] = function () {
                    return e.forceLoadFile(l), r.apply(null, arguments);
                  };
                }),
                (c.read = function (t, r, n, o, i) {
                  return (
                    e.forceLoadFile(l), t.node.contents.copyInto(r, n, o, i)
                  );
                }),
                (l.stream_ops = c),
                l
              );
            });
        },
        630: function (__unused_webpack_module, exports, __webpack_require__) {
          "use strict";
          var __createBinding =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, r, n) {
                    void 0 === n && (n = r),
                      Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: function () {
                          return t[r];
                        },
                      });
                  }
                : function (e, t, r, n) {
                    void 0 === n && (n = r), (e[n] = t[r]);
                  }),
            __setModuleDefault =
              (this && this.__setModuleDefault) ||
              (Object.create
                ? function (e, t) {
                    Object.defineProperty(e, "default", {
                      enumerable: !0,
                      value: t,
                    });
                  }
                : function (e, t) {
                    e.default = t;
                  }),
            __importStar =
              (this && this.__importStar) ||
              function (e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                  for (var r in e)
                    "default" !== r &&
                      Object.prototype.hasOwnProperty.call(e, r) &&
                      __createBinding(t, e, r);
                return __setModuleDefault(t, e), t;
              },
            __importDefault =
              (this && this.__importDefault) ||
              function (e) {
                return e && e.__esModule ? e : { default: e };
              };
          Object.defineProperty(exports, "__esModule", { value: !0 }),
            (exports.toObjects = void 0);
          const Comlink = __importStar(__webpack_require__(870)),
            sql_wasm_js_1 = __importDefault(__webpack_require__(365)),
            sql_wasm_wasm_1 = __importDefault(__webpack_require__(720)),
            lazyFile_1 = __webpack_require__(794),
            vtab_1 = __webpack_require__(457);
          function initTransferHandlers(e) {
            Comlink.transferHandlers.set("WORKERSQLPROXIES", {
              canHandle: (t) => {
                let r = t instanceof e.Database,
                  n = t && t.db && t.db instanceof e.Database;
                return r || n;
              },
              serialize(e) {
                const { port1: t, port2: r } = new MessageChannel();
                return Comlink.expose(e, t), [r, [r]];
              },
              deserialize: (e) => {},
            });
          }
          async function init(e) {
            const t = await sql_wasm_js_1.default({ locateFile: (t) => e });
            return initTransferHandlers(t), t;
          }
          function toObjects(e) {
            return e.flatMap((e) =>
              e.values.map((t) => {
                const r = {};
                for (let n = 0; n < e.columns.length; n++)
                  r[e.columns[n]] = t[n];
                return r;
              })
            );
          }
          async function fetchConfigs(e) {
            const t = e.map(async (e) => {
              if ("jsonconfig" === e.from) {
                const t = new URL(e.configUrl, location.href),
                  r = await fetch(t.toString());
                if (!r.ok)
                  throw (
                    (console.error("httpvfs config error", await r.text()),
                    Error(
                      `Could not load httpvfs config: ${r.status}: ${r.statusText}`
                    ))
                  );
                const n = await r.json();
                return {
                  from: "inline",
                  config:
                    "chunked" === n.serverMode
                      ? { ...n, urlPrefix: new URL(n.urlPrefix, t).toString() }
                      : { ...n, url: new URL(n.url, t).toString() },
                  virtualFilename: e.virtualFilename,
                };
              }
              return e;
            });
            return Promise.all(t);
          }
          sql_wasm_wasm_1.default, (exports.toObjects = toObjects);
          const mod = {
            db: null,
            inited: !1,
            sqljs: null,
            async SplitFileHttpDatabase(e, t, r) {
              if (this.inited)
                throw Error("sorry, only one db is supported right now");
              (this.inited = !0), this.sqljs || (this.sqljs = init(e));
              const n = await this.sqljs,
                o = new Map(),
                i = await fetchConfigs(t);
              let s;
              for (const { config: e, virtualFilename: t } of i) {
                const i = "chunked" === e.serverMode ? e.urlPrefix : e.url;
                let a;
                console.log("constructing url database", i),
                  (a =
                    "chunked" == e.serverMode
                      ? (t, r) => {
                          const n = (t / e.serverChunkSize) | 0,
                            o = t % e.serverChunkSize,
                            i = o + (r - t);
                          return {
                            url: e.urlPrefix + String(n).padStart(3, "0"),
                            fromByte: o,
                            toByte: i,
                          };
                        }
                      : (t, r) => ({ url: e.url, fromByte: t, toByte: r }));
                const u = t || i.replace(/\//g, "_");
                r || ((r = u), (s = e)),
                  console.log("filename", u),
                  console.log("constructing url database", i, "filename", u);
                const l = lazyFile_1.createLazyFile(n.FS, "/", u, !0, !0, {
                  rangeMapper: a,
                  requestChunkSize: e.requestChunkSize,
                  fileLength:
                    "chunked" === e.serverMode ? e.databaseLengthBytes : void 0,
                  logPageReads: !0,
                  maxReadHeads: 3,
                });
                o.set(u, l);
              }
              if (((this.db = new n.CustomDatabase(r)), s)) {
                const e = (
                  await this.db.exec("pragma page_size; pragma cache_size=0")
                )[0].values[0][0];
                e !== s.requestChunkSize &&
                  console.warn(
                    `Chunk size does not match page size: pragma page_size = ${e} but chunkSize = ${s.requestChunkSize}`
                  );
              }
              return (
                (this.db.lazyFiles = o),
                this.db.create_vtab(vtab_1.SeriesVtab),
                (this.db.query = (...e) => toObjects(this.db.exec(...e))),
                this.db
              );
            },
            getResetAccessedPages(e) {
              if (!this.db) return [];
              const t = this.db.lazyFiles.get(e || this.db.filename);
              if (!t) throw Error("unknown lazy file");
              const r = [...t.contents.readPages];
              return (t.contents.readPages = []), r;
            },
            getStats(e) {
              const t = this.db;
              if (!t) return null;
              const r = t.lazyFiles.get(e || t.filename);
              if (!r) throw Error("unknown lazy file");
              return {
                filename: t.filename,
                totalBytes: r.contents.length,
                totalFetchedBytes: r.contents.totalFetchedBytes,
                totalRequests: r.contents.totalRequests,
              };
            },
            async evalCode(code) {
              return await eval(
                `(async function (db) {\n      ${code}\n    })`
              )(this.db);
            },
          };
          Comlink.expose(mod);
        },
        457: (e, t) => {
          "use strict";
          var r;
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.SeriesVtab = void 0),
            (function (e) {
              (e[(e.idx = 0)] = "idx"),
                (e[(e.id = 1)] = "id"),
                (e[(e.tagName = 2)] = "tagName"),
                (e[(e.textContent = 3)] = "textContent"),
                (e[(e.innerHTML = 4)] = "innerHTML"),
                (e[(e.outerHTML = 5)] = "outerHTML"),
                (e[(e.className = 6)] = "className"),
                (e[(e.parent = 7)] = "parent"),
                (e[(e.selector = 8)] = "selector"),
                (e[(e.querySelector = 9)] = "querySelector");
            })(r || (r = {}));
          const n = Object.keys(r)
            .map((e) => r[e])
            .filter((e) => "string" == typeof e);
          function o(e) {
            const t = {};
            for (let n = 0; n < e.length; n++) t[r[n]] = e[n];
            return t;
          }
          function i(e) {
            const t = new SharedArrayBuffer(1048576),
              r = new Int32Array(t, 0, 2);
            (r[0] = 1),
              self.postMessage({ action: "eval", notify: t, request: e }),
              Atomics.wait(r, 0, 1);
            const n = r[1],
              o = new Uint8Array(t, 8, n).slice(),
              i = new TextDecoder().decode(o),
              s = JSON.parse(i);
            if ("err" in s) throw new Error(s.err);
            return s.ok;
          }
          t.SeriesVtab = class {
            constructor(e, t) {
              (this.module = e),
                (this.db = t),
                (this.name = "dom"),
                (this.iVersion = 2),
                (this.cursors = new Map()),
                console.log("constructed vfs");
            }
            getCursor(e) {
              const t = this.cursors.get(e);
              if (!t) throw Error("impl error");
              return t;
            }
            xConnect(e, t, r, o, i, s) {
              console.log("xconnect!!"),
                this.db.handleError(
                  this.module.ccall(
                    "sqlite3_declare_vtab",
                    "number",
                    ["number", "string"],
                    [
                      e,
                      `create table x(\n              ${n
                        .slice(0, -1)
                        .join(", ")} PRIMARY KEY\n          ) WITHOUT ROWID`,
                    ]
                  )
                );
              const a = this.module._malloc(12);
              return this.module.setValue(i, a, "*"), 0;
            }
            xDisconnect(e) {
              return this.module._free(e), 0;
            }
            xOpen(e, t) {
              const r = this.module._malloc(4);
              return (
                this.cursors.set(r, {
                  elements: [],
                  index: 0,
                  querySelector: "",
                }),
                this.module.setValue(t, r, "*"),
                0
              );
            }
            xClose(e) {
              return this.module._free(e), 0;
            }
            xBestIndex(e, t) {
              try {
                const e = this.module.getValue(t + 0, "i32"),
                  n = this.module.getValue(t + 4, "i32"),
                  o = 64;
                let i = !1;
                for (let s = 0; s < e; s++) {
                  const e = n + 12 * s,
                    a = this.module.getValue(e, "i32"),
                    u = this.module.getValue(e + 4, "i8");
                  if (this.module.getValue(e + 5, "i8")) {
                    if (u === o) {
                      if (a !== r.selector)
                        throw Error(
                          "The match operator can only be applied to the selector column!"
                        );
                      {
                        i = !0;
                        const e = this.module.getValue(t + 16, "i32"),
                          r = 8;
                        this.module.setValue(e + s * r, 1, "i32");
                      }
                    }
                    console.log(`constraint ${s}: ${r[a]} (op=${u})`);
                  }
                }
                if (!i)
                  throw Error(
                    "You must query the dom using `select ... from dom where selector MATCH <css-selector>`"
                  );
                const s = this.module.getValue(t + 64, "i32");
                return this.module.setValue(t + 20, s, "i32"), 0;
              } catch (t) {
                return (
                  console.error("xbestindex", t),
                  this.setVtabError(e, String(t)),
                  21
                );
              }
            }
            xFilter(e, t, o, s, a) {
              if ((console.log("xfilter", s), 1 !== s))
                return (
                  console.error("did not get a single argument to xFilter"), 21
                );
              const u = this.module.extract_value(a + 0),
                l = this.getCursor(e);
              l.querySelector = u;
              const c = t,
                f = n.filter((e) => c & (1 << r[e]));
              return (
                console.log("used columns", f),
                (l.elements = i({ type: "select", selector: u, columns: f })),
                0
              );
            }
            xNext(e) {
              return this.getCursor(e).index++, 0;
            }
            xEof(e) {
              const t = this.getCursor(e);
              return +(t.index >= t.elements.length);
            }
            xColumn(e, t, n) {
              const o = this.getCursor(e),
                i = o.elements[o.index];
              if (r[n] in i) this.module.set_return_value(t, i[r[n]]);
              else
                switch (n) {
                  case r.idx:
                    this.module.set_return_value(t, o.index);
                    break;
                  case r.querySelector:
                    this.module.set_return_value(t, o.querySelector);
                    break;
                  default:
                    throw Error(`unknown column ${r[n]}`);
                }
              return 0;
            }
            setVtabError(e, t) {
              const r = this.module.lengthBytesUTF8(t) + 1,
                n = this.module.sqlite3_malloc(r);
              console.log("writing error", t, r),
                this.module.stringToUTF8(t, n, r),
                this.module.setValue(e + 8, n, "i32");
            }
            xUpdate(e, t, r, n) {
              try {
                const [e, n, ...s] = Array.from({ length: t }, (e, t) =>
                  this.module.extract_value(r + 4 * t)
                );
                if (e)
                  if (e && !n)
                    console.log("DELETE", e),
                      i({ type: "delete", selector: e });
                  else {
                    if (e !== n) throw "The selector row can't be set";
                    i({ type: "update", value: o(s) });
                  }
                else
                  console.assert(null === n),
                    i({ type: "insert", value: o(s) });
                return 0;
              } catch (t) {
                return this.setVtabError(e, String(t)), 21;
              }
            }
            xRowid(e, t) {
              throw Error("xRowid not implemented");
            }
            xFindFunction(e, t, r, n, o) {
              return "match" !== this.module.UTF8ToString(r)
                ? 0
                : (this.module.setValue(
                    n,
                    this.module.addFunction((e, t, r) => {
                      this.module.set_return_value(e, !0);
                    }, "viii"),
                    "i32"
                  ),
                  150);
            }
          };
        },
        365: (e, t, r) => {
          e = r.nmd(e);
          var n = void 0,
            o = function (t) {
              return (
                n ||
                (n = new Promise(function (n, o) {
                  var i,
                    s = (i = void 0 !== t ? t : {}).onAbort;
                  (i.onAbort = function (e) {
                    o(new Error(e)), s && s(e);
                  }),
                    (i.postRun = i.postRun || []),
                    i.postRun.push(function () {
                      n(i);
                    }),
                    (e = void 0),
                    ((i = void 0 !== i ? i : {}).onRuntimeInitialized =
                      function () {
                        var e = Ne(4),
                          t = i.cwrap,
                          r = t("sqlite3_open", "number", ["string", "number"]),
                          n =
                            (t("sqlite3_open_v2", "number", [
                              "string",
                              "number",
                              "number",
                              "string",
                            ]),
                            t("sqlite3_close_v2", "number", ["number"])),
                          o = t("sqlite3_exec", "number", [
                            "number",
                            "string",
                            "number",
                            "number",
                            "number",
                          ]),
                          s = t("sqlite3_changes", "number", ["number"]),
                          a = t("sqlite3_prepare_v2", "number", [
                            "number",
                            "string",
                            "number",
                            "number",
                            "number",
                          ]),
                          u = t("sqlite3_sql", "string", ["number"]),
                          l = t("sqlite3_normalized_sql", "string", ["number"]),
                          c = t("sqlite3_prepare_v2", "number", [
                            "number",
                            "number",
                            "number",
                            "number",
                            "number",
                          ]),
                          f = t("sqlite3_bind_text", "number", [
                            "number",
                            "number",
                            "number",
                            "number",
                            "number",
                          ]),
                          d = t("sqlite3_bind_blob", "number", [
                            "number",
                            "number",
                            "number",
                            "number",
                            "number",
                          ]),
                          h = t("sqlite3_bind_double", "number", [
                            "number",
                            "number",
                            "number",
                          ]),
                          p = t("sqlite3_bind_int", "number", [
                            "number",
                            "number",
                            "number",
                          ]),
                          m = t("sqlite3_bind_parameter_index", "number", [
                            "number",
                            "string",
                          ]),
                          _ = t("sqlite3_step", "number", ["number"]),
                          g = t("sqlite3_errmsg", "string", ["number"]),
                          v = t("sqlite3_column_count", "number", ["number"]),
                          y = t("sqlite3_data_count", "number", ["number"]),
                          b = t("sqlite3_column_double", "number", [
                            "number",
                            "number",
                          ]),
                          w = t("sqlite3_column_text", "string", [
                            "number",
                            "number",
                          ]),
                          E = t("sqlite3_column_blob", "number", [
                            "number",
                            "number",
                          ]),
                          k = t("sqlite3_column_bytes", "number", [
                            "number",
                            "number",
                          ]),
                          S = t("sqlite3_column_type", "number", [
                            "number",
                            "number",
                          ]),
                          D = t("sqlite3_column_name", "string", [
                            "number",
                            "number",
                          ]),
                          M = t("sqlite3_reset", "number", ["number"]),
                          A = t("sqlite3_clear_bindings", "number", ["number"]),
                          R = t("sqlite3_finalize", "number", ["number"]),
                          z = t("sqlite3_create_module_v2", "number", [
                            "number",
                            "string",
                            "number",
                            "number",
                            "number",
                          ]),
                          j = t("sqlite3_create_function_v2", "number", [
                            "number",
                            "string",
                            "number",
                            "number",
                            "number",
                            "number",
                            "number",
                            "number",
                            "number",
                          ]),
                          B = t("sqlite3_value_type", "number", ["number"]),
                          L = t("sqlite3_value_bytes", "number", ["number"]),
                          N = t("sqlite3_value_text", "string", ["number"]),
                          H = t("sqlite3_value_blob", "number", ["number"]),
                          I = t("sqlite3_value_double", "number", ["number"]),
                          U = t("sqlite3_result_double", "", [
                            "number",
                            "number",
                          ]),
                          W = t("sqlite3_result_null", "", ["number"]),
                          K = t("sqlite3_result_text", "", [
                            "number",
                            "string",
                            "number",
                            "number",
                          ]),
                          Y = t("sqlite3_result_blob", "", [
                            "number",
                            "number",
                            "number",
                            "number",
                          ]),
                          Q = t("sqlite3_result_int", "", ["number", "number"]),
                          J = t("sqlite3_result_error", "", [
                            "number",
                            "string",
                            "number",
                          ]),
                          Z = t("sqlite3_malloc", "number", ["number"]);
                        i.sqlite3_malloc = Z;
                        var ee = t("RegisterExtensionFunctions", "number", [
                          "number",
                        ]);
                        function te(e, t) {
                          (this.stmt = e),
                            (this.db = t),
                            (this.pos = 1),
                            (this.allocatedmem = []);
                        }
                        function re(e, t) {
                          this.db = t;
                          var r = $(e) + 1;
                          if (((this.sqlPtr = ze(r)), null === this.sqlPtr))
                            throw new Error(
                              "Unable to allocate memory for the SQL string"
                            );
                          G(e, this.sqlPtr, r),
                            (this.nextSqlPtr = this.sqlPtr),
                            (this.nextSqlString = null),
                            (this.activeStatement = null);
                        }
                        function ne(t) {
                          (this.filename =
                            "dbfile_" + ((4294967295 * Math.random()) >>> 0)),
                            null != t &&
                              Ee.createDataFile("/", this.filename, t, !0, !0);
                          const n = r(this.filename, e);
                          (this.db = P(e, "i32")),
                            this.handleError(n),
                            ee(this.db),
                            (this.statements = {}),
                            (this.functions = {});
                        }
                        function oe(t) {
                          this.filename = t;
                          const n = r(this.filename, e);
                          (this.db = P(e, "i32")),
                            this.handleError(n),
                            ee(this.db),
                            (this.statements = {}),
                            (this.functions = {});
                        }
                        (te.prototype.bind = function (e) {
                          if (!this.stmt) throw "Statement closed";
                          return (
                            this.reset(),
                            Array.isArray(e)
                              ? this.bindFromArray(e)
                              : null == e ||
                                "object" != typeof e ||
                                this.bindFromObject(e)
                          );
                        }),
                          (te.prototype.bind_ = te.prototype.bind),
                          (te.prototype.step = function () {
                            if (!this.stmt) throw "Statement closed";
                            this.pos = 1;
                            var e = _(this.stmt);
                            switch (e) {
                              case 100:
                                return !0;
                              case 101:
                                return !1;
                              default:
                                throw this.db.handleError(e);
                            }
                          }),
                          (te.prototype.getNumber = function (e) {
                            return (
                              null == e && ((e = this.pos), (this.pos += 1)),
                              b(this.stmt, e)
                            );
                          }),
                          (te.prototype.getString = function (e) {
                            return (
                              null == e && ((e = this.pos), (this.pos += 1)),
                              w(this.stmt, e)
                            );
                          }),
                          (te.prototype.getBlob = function (e) {
                            null == e && ((e = this.pos), (this.pos += 1));
                            for (
                              var t = k(this.stmt, e),
                                r = E(this.stmt, e),
                                n = new Uint8Array(t),
                                o = 0;
                              o < t;
                              o += 1
                            )
                              n[o] = O[r + o];
                            return n;
                          }),
                          (te.prototype.get = function (e) {
                            null != e && this.bind(e) && this.step();
                            for (
                              var t = [], r = y(this.stmt), n = 0;
                              n < r;
                              n += 1
                            )
                              switch (S(this.stmt, n)) {
                                case 1:
                                case 2:
                                  t.push(this.getNumber(n));
                                  break;
                                case 3:
                                  t.push(this.getString(n));
                                  break;
                                case 4:
                                  t.push(this.getBlob(n));
                                  break;
                                default:
                                  t.push(null);
                              }
                            return t;
                          }),
                          (te.prototype.getColumnNames = function () {
                            for (
                              var e = [], t = v(this.stmt), r = 0;
                              r < t;
                              r += 1
                            )
                              e.push(D(this.stmt, r));
                            return e;
                          }),
                          (te.prototype.getAsObject = function (e) {
                            for (
                              var t = this.get(e),
                                r = this.getColumnNames(),
                                n = {},
                                o = 0;
                              o < r.length;
                              o += 1
                            )
                              n[r[o]] = t[o];
                            return n;
                          }),
                          (te.prototype.getSQL = function () {
                            return u(this.stmt);
                          }),
                          (te.prototype.getNormalizedSQL = function () {
                            return l(this.stmt);
                          }),
                          (te.prototype.run = function (e) {
                            return (
                              null != e && this.bind(e),
                              this.step(),
                              this.reset()
                            );
                          }),
                          (te.prototype.bindString = function (e, t) {
                            null == t && ((t = this.pos), (this.pos += 1));
                            var r = Pe(e),
                              n = C(r, T);
                            return (
                              this.allocatedmem.push(n),
                              this.db.handleError(
                                f(this.stmt, t, n, r.length - 1, 0)
                              ),
                              !0
                            );
                          }),
                          (te.prototype.bindBlob = function (e, t) {
                            null == t && ((t = this.pos), (this.pos += 1));
                            var r = C(e, T);
                            return (
                              this.allocatedmem.push(r),
                              this.db.handleError(
                                d(this.stmt, t, r, e.length, 0)
                              ),
                              !0
                            );
                          }),
                          (te.prototype.bindNumber = function (e, t) {
                            null == t && ((t = this.pos), (this.pos += 1));
                            var r = e === (0 | e) ? p : h;
                            return this.db.handleError(r(this.stmt, t, e)), !0;
                          }),
                          (te.prototype.bindNull = function (e) {
                            return (
                              null == e && ((e = this.pos), (this.pos += 1)),
                              0 === d(this.stmt, e, 0, 0, 0)
                            );
                          }),
                          (te.prototype.bindValue = function (e, t) {
                            switch (
                              (null == t && ((t = this.pos), (this.pos += 1)),
                              typeof e)
                            ) {
                              case "string":
                                return this.bindString(e, t);
                              case "number":
                              case "boolean":
                                return this.bindNumber(e + 0, t);
                              case "object":
                                if (null === e) return this.bindNull(t);
                                if (null != e.length)
                                  return this.bindBlob(e, t);
                            }
                            throw (
                              "Wrong API use : tried to bind a value of an unknown type (" +
                              e +
                              ")."
                            );
                          }),
                          (te.prototype.bindFromObject = function (e) {
                            var t = this;
                            return (
                              Object.keys(e).forEach(function (r) {
                                var n = m(t.stmt, r);
                                0 !== n && t.bindValue(e[r], n);
                              }),
                              !0
                            );
                          }),
                          (te.prototype.bindFromArray = function (e) {
                            for (var t = 0; t < e.length; t += 1)
                              this.bindValue(e[t], t + 1);
                            return !0;
                          }),
                          (te.prototype.reset = function () {
                            return (
                              this.freemem(),
                              0 === A(this.stmt) && 0 === M(this.stmt)
                            );
                          }),
                          (te.prototype.freemem = function () {
                            for (
                              var e;
                              void 0 !== (e = this.allocatedmem.pop());

                            )
                              Te(e);
                          }),
                          (te.prototype.free = function () {
                            var e;
                            return (
                              this.freemem(),
                              (e = 0 === R(this.stmt)),
                              delete this.db.statements[this.stmt],
                              (this.stmt = 0),
                              e
                            );
                          }),
                          (re.prototype.next = function () {
                            if (null === this.sqlPtr) return { done: !0 };
                            if (
                              (null !== this.activeStatement &&
                                (this.activeStatement.free(),
                                (this.activeStatement = null)),
                              !this.db.db)
                            )
                              throw (
                                (this.finalize(), new Error("Database closed"))
                              );
                            var t = Be(),
                              r = Ne(4);
                            F(e, 0, "i32"), F(r, 0, "i32");
                            try {
                              this.db.handleError(
                                c(this.db.db, this.nextSqlPtr, -1, e, r)
                              ),
                                (this.nextSqlPtr = P(r, "i32"));
                              var n = P(e, "i32");
                              return 0 === n
                                ? (this.finalize(), { done: !0 })
                                : ((this.activeStatement = new te(n, this.db)),
                                  (this.db.statements[n] =
                                    this.activeStatement),
                                  { value: this.activeStatement, done: !1 });
                            } catch (e) {
                              throw (
                                ((this.nextSqlString = V(this.nextSqlPtr)),
                                this.finalize(),
                                e)
                              );
                            } finally {
                              Le(t);
                            }
                          }),
                          (re.prototype.finalize = function () {
                            Te(this.sqlPtr), (this.sqlPtr = null);
                          }),
                          (re.prototype.getRemainingSQL = function () {
                            return null !== this.nextSqlString
                              ? this.nextSqlString
                              : V(this.nextSqlPtr);
                          }),
                          "function" == typeof Symbol &&
                            "symbol" == typeof Symbol.iterator &&
                            (re.prototype[Symbol.iterator] = function () {
                              return this;
                            }),
                          (ne.prototype.run = function (t, r) {
                            if (!this.db) throw "Database closed";
                            if (r) {
                              var n = this.prepare(t, r);
                              try {
                                n.step();
                              } finally {
                                n.free();
                              }
                            } else this.handleError(o(this.db, t, 0, 0, e));
                            return this;
                          }),
                          (ne.prototype.exec = function (t, r) {
                            if (!this.db) throw "Database closed";
                            var n,
                              o,
                              i,
                              s = Be(),
                              a = null;
                            try {
                              for (
                                var u =
                                    ((o = $((n = t)) + 1),
                                    (i = Ne(o)),
                                    X(n, O, i, o),
                                    i),
                                  l = Ne(4),
                                  f = [];
                                0 !== P(u, "i8");

                              ) {
                                F(e, 0, "i32"),
                                  F(l, 0, "i32"),
                                  this.handleError(c(this.db, u, -1, e, l));
                                var d = P(e, "i32");
                                if (((u = P(l, "i32")), 0 !== d)) {
                                  var h = null;
                                  for (
                                    a = new te(d, this), null != r && a.bind(r);
                                    a.step();

                                  )
                                    null === h &&
                                      ((h = {
                                        columns: a.getColumnNames(),
                                        values: [],
                                      }),
                                      f.push(h)),
                                      h.values.push(a.get());
                                  a.free();
                                }
                              }
                              return f;
                            } catch (e) {
                              throw (a && a.free(), e);
                            } finally {
                              Le(s);
                            }
                          }),
                          (ne.prototype.each = function (e, t, r, n) {
                            var o;
                            "function" == typeof t &&
                              ((n = r), (r = t), (t = void 0)),
                              (o = this.prepare(e, t));
                            try {
                              for (; o.step(); ) r(o.getAsObject());
                            } finally {
                              o.free();
                            }
                            if ("function" == typeof n) return n();
                          }),
                          (ne.prototype.prepare = function (t, r) {
                            F(e, 0, "i32"),
                              this.handleError(a(this.db, t, -1, e, 0));
                            var n = P(e, "i32");
                            if (0 === n) throw "Nothing to prepare";
                            var o = new te(n, this);
                            return (
                              null != r && o.bind(r),
                              (this.statements[n] = o),
                              o
                            );
                          }),
                          (ne.prototype.iterateStatements = function (e) {
                            return new re(e, this);
                          }),
                          (ne.prototype.export = function () {
                            Object.values(this.statements).forEach(function (
                              e
                            ) {
                              e.free();
                            }),
                              Object.values(this.functions).forEach(q),
                              (this.functions = {}),
                              this.handleError(n(this.db));
                            var t = Ee.readFile(this.filename, {
                              encoding: "binary",
                            });
                            return (
                              this.handleError(r(this.filename, e)),
                              (this.db = P(e, "i32")),
                              t
                            );
                          }),
                          (ne.prototype.close = function () {
                            null !== this.db &&
                              (Object.values(this.statements).forEach(function (
                                e
                              ) {
                                e.free();
                              }),
                              Object.values(this.functions).forEach(q),
                              (this.functions = {}),
                              this.handleError(n(this.db)),
                              Ee.unlink("/" + this.filename),
                              (this.db = null));
                          }),
                          (ne.prototype.handleError = function (e) {
                            var t;
                            if (0 === e) return null;
                            throw (
                              ((t = g(this.db)),
                              new Error("SQLite: " + (t || "Code " + e)))
                            );
                          }),
                          (ne.prototype.getRowsModified = function () {
                            return s(this.db);
                          }),
                          (ne.prototype.create_function = function (e, t) {
                            Object.prototype.hasOwnProperty.call(
                              this.functions,
                              e
                            ) &&
                              (q(this.functions[e]), delete this.functions[e]);
                            var r = x(function (e, r, n) {
                              for (var o, s = [], a = 0; a < r; a += 1)
                                s.push(i.extract_value(n + 4 * a));
                              try {
                                o = t.apply(null, s);
                              } catch (t) {
                                return void J(e, "JS threw: " + t, -1);
                              }
                              i.set_return_value(e, o);
                            }, "viii");
                            return (
                              (this.functions[e] = r),
                              this.handleError(
                                j(this.db, e, t.length, 1, 0, r, 0, 0, 0)
                              ),
                              this
                            );
                          }),
                          (i.extract_value = function (e) {
                            var t = P(e, "i32"),
                              r = B(t);
                            return 1 === r || 2 === r
                              ? I(t)
                              : 3 === r
                              ? N(t)
                              : 4 === r
                              ? (function (e) {
                                  for (
                                    var t = L(e),
                                      r = H(e),
                                      n = new Uint8Array(t),
                                      o = 0;
                                    o < t;
                                    o += 1
                                  )
                                    n[o] = O[r + o];
                                  return n;
                                })(t)
                              : null;
                          }),
                          (i.set_return_value = function (e, t) {
                            switch (typeof t) {
                              case "boolean":
                                Q(e, t ? 1 : 0);
                                break;
                              case "number":
                                U(e, t);
                                break;
                              case "string":
                                K(e, t, -1, -1);
                                break;
                              case "object":
                                if (null === t) W(e);
                                else if (null != t.length) {
                                  var r = C(t, T);
                                  Y(e, r, t.length, -1), Te(r);
                                } else
                                  J(
                                    e,
                                    "Wrong API use : tried to return a value of an unknown type (" +
                                      t +
                                      ").",
                                    -1
                                  );
                                break;
                              default:
                                console.warn(
                                  "unknown sqlite result type: ",
                                  typeof t,
                                  t
                                ),
                                  W(e);
                            }
                          }),
                          (ne.prototype.create_vtab = function (e) {
                            const t = new e(i, this),
                              r = {
                                iVersion: null,
                                xCreate: "ptr",
                                xConnect: "ptr",
                                xBestIndex: "ptr",
                                xDisconnect: "ptr",
                                xDestroy: "ptr",
                                xOpen: "ptr",
                                xClose: "ptr",
                                xFilter: "ptr",
                                xNext: "ptr",
                                xEof: "ptr",
                                xColumn: "ptr",
                                xRowid: "ptr",
                                xUpdate: "ptr",
                                xBegin: "ptr",
                                xSync: "ptr",
                                xCommit: "ptr",
                                xRollback: "ptr",
                                xFindFunction: "ptr",
                                xRename: "ptr",
                                xSavepoint: "ptr",
                                xRelease: "ptr",
                                xRollbackTo: "ptr",
                                xShadowName: "ptr",
                              },
                              n = ze(4 * Object.keys(r).length);
                            let o = 0;
                            for (const e in r) {
                              let i = t[e] || 0,
                                s = "i32";
                              if (r[e] && t[e]) {
                                const r = t[e].bind(t);
                                (i = x(
                                  r,
                                  Array(1 + r.length)
                                    .fill("i")
                                    .join("")
                                )),
                                  (s = "*");
                              }
                              F(n + 4 * o, i, s), o++;
                            }
                            this.handleError(z(this.db, t.name, n, 0, 0));
                          }),
                          (i.Database = ne),
                          (i.CustomDatabase = oe),
                          (i.FS = Ee),
                          (oe.prototype = Object.create(ne.prototype));
                      });
                  var a,
                    u = {};
                  for (a in i) i.hasOwnProperty(a) && (u[a] = i[a]);
                  var l,
                    c,
                    f,
                    d,
                    h,
                    p = [],
                    m = "./this.program",
                    _ = "object" == typeof window,
                    g = "function" == typeof importScripts,
                    v =
                      "object" == typeof process &&
                      "object" == typeof process.versions &&
                      "string" == typeof process.versions.node,
                    y = "";
                  v
                    ? ((y = g ? r(101).dirname(y) + "/" : "//"),
                      (l = function (e, t) {
                        return (
                          d || (d = r(905)),
                          h || (h = r(101)),
                          (e = h.normalize(e)),
                          d.readFileSync(e, t ? null : "utf8")
                        );
                      }),
                      (f = function (e) {
                        var t = l(e, !0);
                        return (
                          t.buffer || (t = new Uint8Array(t)), A(t.buffer), t
                        );
                      }),
                      (c = function (e, t, n) {
                        d || (d = r(905)),
                          h || (h = r(101)),
                          (e = h.normalize(e)),
                          d.readFile(e, function (e, r) {
                            e ? n(e) : t(r.buffer);
                          });
                      }),
                      process.argv.length > 1 &&
                        (m = process.argv[1].replace(/\\/g, "/")),
                      (p = process.argv.slice(2)),
                      (e.exports = i),
                      (i.inspect = function () {
                        return "[Emscripten Module object]";
                      }))
                    : (_ || g) &&
                      (g
                        ? (y = self.location.href)
                        : "undefined" != typeof document &&
                          document.currentScript &&
                          (y = document.currentScript.src),
                      (y =
                        0 !== y.indexOf("blob:")
                          ? y.substr(0, y.lastIndexOf("/") + 1)
                          : ""),
                      (l = function (e) {
                        var t = new XMLHttpRequest();
                        return (
                          t.open("GET", e, !1), t.send(null), t.responseText
                        );
                      }),
                      g &&
                        (f = function (e) {
                          var t = new XMLHttpRequest();
                          return (
                            t.open("GET", e, !1),
                            (t.responseType = "arraybuffer"),
                            t.send(null),
                            new Uint8Array(t.response)
                          );
                        }),
                      (c = function (e, t, r) {
                        var n = new XMLHttpRequest();
                        n.open("GET", e, !0),
                          (n.responseType = "arraybuffer"),
                          (n.onload = function () {
                            200 == n.status || (0 == n.status && n.response)
                              ? t(n.response)
                              : r();
                          }),
                          (n.onerror = r),
                          n.send(null);
                      }));
                  var b = i.print || console.log.bind(console),
                    w = i.printErr || console.warn.bind(console);
                  for (a in u) u.hasOwnProperty(a) && (i[a] = u[a]);
                  (u = null),
                    i.arguments && (p = i.arguments),
                    i.thisProgram && (m = i.thisProgram),
                    i.quit && i.quit;
                  var E,
                    k,
                    S = [];
                  function q(e) {
                    E.delete(Q.get(e)), S.push(e);
                  }
                  function x(e, t) {
                    return (function (e, t) {
                      if (!E) {
                        E = new WeakMap();
                        for (var r = 0; r < Q.length; r++) {
                          var n = Q.get(r);
                          n && E.set(n, r);
                        }
                      }
                      if (E.has(e)) return E.get(e);
                      var o = (function () {
                        if (S.length) return S.pop();
                        try {
                          Q.grow(1);
                        } catch (e) {
                          if (!(e instanceof RangeError)) throw e;
                          throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
                        }
                        return Q.length - 1;
                      })();
                      try {
                        Q.set(o, e);
                      } catch (r) {
                        if (!(r instanceof TypeError)) throw r;
                        var i = (function (e, t) {
                          if ("function" == typeof WebAssembly.Function) {
                            for (
                              var r = {
                                  i: "i32",
                                  j: "i64",
                                  f: "f32",
                                  d: "f64",
                                },
                                n = {
                                  parameters: [],
                                  results: "v" == t[0] ? [] : [r[t[0]]],
                                },
                                o = 1;
                              o < t.length;
                              ++o
                            )
                              n.parameters.push(r[t[o]]);
                            return new WebAssembly.Function(n, e);
                          }
                          var i = [1, 0, 1, 96],
                            s = t.slice(0, 1),
                            a = t.slice(1),
                            u = { i: 127, j: 126, f: 125, d: 124 };
                          for (i.push(a.length), o = 0; o < a.length; ++o)
                            i.push(u[a[o]]);
                          "v" == s ? i.push(0) : (i = i.concat([1, u[s]])),
                            (i[1] = i.length - 2);
                          var l = new Uint8Array(
                              [0, 97, 115, 109, 1, 0, 0, 0].concat(
                                i,
                                [
                                  2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1,
                                  102, 0, 0,
                                ]
                              )
                            ),
                            c = new WebAssembly.Module(l);
                          return new WebAssembly.Instance(c, { e: { f: e } })
                            .exports.f;
                        })(e, t);
                        Q.set(o, i);
                      }
                      return E.set(e, o), o;
                    })(e, t);
                  }
                  i.wasmBinary && (k = i.wasmBinary);
                  var D;
                  i.noExitRuntime;
                  function F(e, t, r, n) {
                    switch (
                      ("*" === (r = r || "i8").charAt(r.length - 1) &&
                        (r = "i32"),
                      r)
                    ) {
                      case "i1":
                      case "i8":
                        O[e >> 0] = t;
                        break;
                      case "i16":
                        L[e >> 1] = t;
                        break;
                      case "i32":
                        N[e >> 2] = t;
                        break;
                      case "i64":
                        (te = [
                          t >>> 0,
                          ((ee = t),
                          +Math.abs(ee) >= 1
                            ? ee > 0
                              ? (0 |
                                  Math.min(
                                    +Math.floor(ee / 4294967296),
                                    4294967295
                                  )) >>>
                                0
                              : ~~+Math.ceil(
                                  (ee - +(~~ee >>> 0)) / 4294967296
                                ) >>> 0
                            : 0),
                        ]),
                          (N[e >> 2] = te[0]),
                          (N[(e + 4) >> 2] = te[1]);
                        break;
                      case "float":
                        H[e >> 2] = t;
                        break;
                      case "double":
                        I[e >> 3] = t;
                        break;
                      default:
                        ce("invalid type for setValue: " + r);
                    }
                  }
                  function P(e, t, r) {
                    switch (
                      ("*" === (t = t || "i8").charAt(t.length - 1) &&
                        (t = "i32"),
                      t)
                    ) {
                      case "i1":
                      case "i8":
                        return O[e >> 0];
                      case "i16":
                        return L[e >> 1];
                      case "i32":
                      case "i64":
                        return N[e >> 2];
                      case "float":
                        return H[e >> 2];
                      case "double":
                        return I[e >> 3];
                      default:
                        ce("invalid type for getValue: " + t);
                    }
                    return null;
                  }
                  "object" != typeof WebAssembly &&
                    ce("no native wasm support detected");
                  var M = !1;
                  function A(e, t) {
                    e || ce("Assertion failed: " + t);
                  }
                  function R(e) {
                    var t = i["_" + e];
                    return (
                      A(
                        t,
                        "Cannot call unknown function " +
                          e +
                          ", make sure it is exported"
                      ),
                      t
                    );
                  }
                  function z(e, t, r, n, o) {
                    var i = {
                        string: function (e) {
                          var t = 0;
                          if (null != e && 0 !== e) {
                            var r = 1 + (e.length << 2);
                            G(e, (t = Ne(r)), r);
                          }
                          return t;
                        },
                        array: function (e) {
                          var t = Ne(e.length);
                          return (
                            (function (e, t) {
                              O.set(e, t);
                            })(e, t),
                            t
                          );
                        },
                      },
                      s = R(e),
                      a = [],
                      u = 0;
                    if (n)
                      for (var l = 0; l < n.length; l++) {
                        var c = i[r[l]];
                        c
                          ? (0 === u && (u = Be()), (a[l] = c(n[l])))
                          : (a[l] = n[l]);
                      }
                    var f = s.apply(null, a);
                    return (function (e) {
                      return (
                        0 !== u && Le(u),
                        (function (e) {
                          return "string" === t
                            ? V(e)
                            : "boolean" === t
                            ? Boolean(e)
                            : e;
                        })(e)
                      );
                    })(f);
                  }
                  var T = 0;
                  function C(e, t) {
                    var r;
                    return (
                      (r = 1 == t ? Ne(e.length) : ze(e.length)),
                      e.subarray || e.slice
                        ? B.set(e, r)
                        : B.set(new Uint8Array(e), r),
                      r
                    );
                  }
                  var j,
                    O,
                    B,
                    L,
                    N,
                    H,
                    I,
                    U =
                      "undefined" != typeof TextDecoder
                        ? new TextDecoder("utf8")
                        : void 0;
                  function W(e, t, r) {
                    for (var n = t + r, o = t; e[o] && !(o >= n); ) ++o;
                    if (o - t > 16 && e.subarray && U)
                      return U.decode(e.subarray(t, o));
                    for (var i = ""; t < o; ) {
                      var s = e[t++];
                      if (128 & s) {
                        var a = 63 & e[t++];
                        if (192 != (224 & s)) {
                          var u = 63 & e[t++];
                          if (
                            (s =
                              224 == (240 & s)
                                ? ((15 & s) << 12) | (a << 6) | u
                                : ((7 & s) << 18) |
                                  (a << 12) |
                                  (u << 6) |
                                  (63 & e[t++])) < 65536
                          )
                            i += String.fromCharCode(s);
                          else {
                            var l = s - 65536;
                            i += String.fromCharCode(
                              55296 | (l >> 10),
                              56320 | (1023 & l)
                            );
                          }
                        } else i += String.fromCharCode(((31 & s) << 6) | a);
                      } else i += String.fromCharCode(s);
                    }
                    return i;
                  }
                  function V(e, t) {
                    return e ? W(B, e, t) : "";
                  }
                  function X(e, t, r, n) {
                    if (!(n > 0)) return 0;
                    for (var o = r, i = r + n - 1, s = 0; s < e.length; ++s) {
                      var a = e.charCodeAt(s);
                      if (
                        (a >= 55296 &&
                          a <= 57343 &&
                          (a =
                            (65536 + ((1023 & a) << 10)) |
                            (1023 & e.charCodeAt(++s))),
                        a <= 127)
                      ) {
                        if (r >= i) break;
                        t[r++] = a;
                      } else if (a <= 2047) {
                        if (r + 1 >= i) break;
                        (t[r++] = 192 | (a >> 6)), (t[r++] = 128 | (63 & a));
                      } else if (a <= 65535) {
                        if (r + 2 >= i) break;
                        (t[r++] = 224 | (a >> 12)),
                          (t[r++] = 128 | ((a >> 6) & 63)),
                          (t[r++] = 128 | (63 & a));
                      } else {
                        if (r + 3 >= i) break;
                        (t[r++] = 240 | (a >> 18)),
                          (t[r++] = 128 | ((a >> 12) & 63)),
                          (t[r++] = 128 | ((a >> 6) & 63)),
                          (t[r++] = 128 | (63 & a));
                      }
                    }
                    return (t[r] = 0), r - o;
                  }
                  function G(e, t, r) {
                    return X(e, B, t, r);
                  }
                  function $(e) {
                    for (var t = 0, r = 0; r < e.length; ++r) {
                      var n = e.charCodeAt(r);
                      n >= 55296 &&
                        n <= 57343 &&
                        (n =
                          (65536 + ((1023 & n) << 10)) |
                          (1023 & e.charCodeAt(++r))),
                        n <= 127
                          ? ++t
                          : (t += n <= 2047 ? 2 : n <= 65535 ? 3 : 4);
                    }
                    return t;
                  }
                  function K(e) {
                    var t = $(e) + 1,
                      r = ze(t);
                    return r && X(e, O, r, t), r;
                  }
                  function Y(e) {
                    (j = e),
                      (i.HEAP8 = O = new Int8Array(e)),
                      (i.HEAP16 = L = new Int16Array(e)),
                      (i.HEAP32 = N = new Int32Array(e)),
                      (i.HEAPU8 = B = new Uint8Array(e)),
                      (i.HEAPU16 = new Uint16Array(e)),
                      (i.HEAPU32 = new Uint32Array(e)),
                      (i.HEAPF32 = H = new Float32Array(e)),
                      (i.HEAPF64 = I = new Float64Array(e));
                  }
                  i.INITIAL_MEMORY;
                  var Q,
                    J,
                    Z,
                    ee,
                    te,
                    re = [],
                    ne = [],
                    oe = [],
                    ie = 0,
                    se = null,
                    ae = null;
                  function ue(e) {
                    ie++,
                      i.monitorRunDependencies && i.monitorRunDependencies(ie);
                  }
                  function le(e) {
                    if (
                      (ie--,
                      i.monitorRunDependencies && i.monitorRunDependencies(ie),
                      0 == ie &&
                        (null !== se && (clearInterval(se), (se = null)), ae))
                    ) {
                      var t = ae;
                      (ae = null), t();
                    }
                  }
                  function ce(e) {
                    throw (
                      (i.onAbort && i.onAbort(e),
                      w((e += "")),
                      (M = !0),
                      (e =
                        "abort(" +
                        e +
                        "). Build with -s ASSERTIONS=1 for more info."),
                      new WebAssembly.RuntimeError(e))
                    );
                  }
                  function fe(e) {
                    return e.startsWith(
                      "data:application/octet-stream;base64,"
                    );
                  }
                  function de(e) {
                    return e.startsWith("file://");
                  }
                  function he(e) {
                    try {
                      if (e == J && k) return new Uint8Array(k);
                      if (f) return f(e);
                      throw "both async and sync fetching of the wasm failed";
                    } catch (e) {
                      ce(e);
                    }
                  }
                  function pe(e) {
                    for (; e.length > 0; ) {
                      var t = e.shift();
                      if ("function" != typeof t) {
                        var r = t.func;
                        "number" == typeof r
                          ? void 0 === t.arg
                            ? Q.get(r)()
                            : Q.get(r)(t.arg)
                          : r(void 0 === t.arg ? null : t.arg);
                      } else t(i);
                    }
                  }
                  function me() {
                    me.called ||
                      ((me.called = !0),
                      (function () {
                        var e = new Date().getFullYear(),
                          t = new Date(e, 0, 1),
                          r = new Date(e, 6, 1),
                          n = t.getTimezoneOffset(),
                          o = r.getTimezoneOffset(),
                          i = Math.max(n, o);
                        function s(e) {
                          var t = e.toTimeString().match(/\(([A-Za-z ]+)\)$/);
                          return t ? t[1] : "GMT";
                        }
                        (N[Oe() >> 2] = 60 * i),
                          (N[je() >> 2] = Number(n != o));
                        var a = s(t),
                          u = s(r),
                          l = K(a),
                          c = K(u);
                        o < n
                          ? ((N[Ce() >> 2] = l), (N[(Ce() + 4) >> 2] = c))
                          : ((N[Ce() >> 2] = c), (N[(Ce() + 4) >> 2] = l));
                      })());
                  }
                  (i.preloadedImages = {}),
                    (i.preloadedAudios = {}),
                    fe((J = "sql-wasm.wasm")) ||
                      ((Z = J),
                      (J = i.locateFile ? i.locateFile(Z, y) : y + Z));
                  var _e = {
                      splitPath: function (e) {
                        return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
                          .exec(e)
                          .slice(1);
                      },
                      normalizeArray: function (e, t) {
                        for (var r = 0, n = e.length - 1; n >= 0; n--) {
                          var o = e[n];
                          "." === o
                            ? e.splice(n, 1)
                            : ".." === o
                            ? (e.splice(n, 1), r++)
                            : r && (e.splice(n, 1), r--);
                        }
                        if (t) for (; r; r--) e.unshift("..");
                        return e;
                      },
                      normalize: function (e) {
                        var t = "/" === e.charAt(0),
                          r = "/" === e.substr(-1);
                        return (
                          (e = _e
                            .normalizeArray(
                              e.split("/").filter(function (e) {
                                return !!e;
                              }),
                              !t
                            )
                            .join("/")) ||
                            t ||
                            (e = "."),
                          e && r && (e += "/"),
                          (t ? "/" : "") + e
                        );
                      },
                      dirname: function (e) {
                        var t = _e.splitPath(e),
                          r = t[0],
                          n = t[1];
                        return r || n
                          ? (n && (n = n.substr(0, n.length - 1)), r + n)
                          : ".";
                      },
                      basename: function (e) {
                        if ("/" === e) return "/";
                        var t = (e = (e = _e.normalize(e)).replace(
                          /\/$/,
                          ""
                        )).lastIndexOf("/");
                        return -1 === t ? e : e.substr(t + 1);
                      },
                      extname: function (e) {
                        return _e.splitPath(e)[3];
                      },
                      join: function () {
                        var e = Array.prototype.slice.call(arguments, 0);
                        return _e.normalize(e.join("/"));
                      },
                      join2: function (e, t) {
                        return _e.normalize(e + "/" + t);
                      },
                    },
                    ge = {
                      resolve: function () {
                        for (
                          var e = "", t = !1, r = arguments.length - 1;
                          r >= -1 && !t;
                          r--
                        ) {
                          var n = r >= 0 ? arguments[r] : Ee.cwd();
                          if ("string" != typeof n)
                            throw new TypeError(
                              "Arguments to path.resolve must be strings"
                            );
                          if (!n) return "";
                          (e = n + "/" + e), (t = "/" === n.charAt(0));
                        }
                        return (
                          (t ? "/" : "") +
                            (e = _e
                              .normalizeArray(
                                e.split("/").filter(function (e) {
                                  return !!e;
                                }),
                                !t
                              )
                              .join("/")) || "."
                        );
                      },
                      relative: function (e, t) {
                        function r(e) {
                          for (var t = 0; t < e.length && "" === e[t]; t++);
                          for (
                            var r = e.length - 1;
                            r >= 0 && "" === e[r];
                            r--
                          );
                          return t > r ? [] : e.slice(t, r - t + 1);
                        }
                        (e = ge.resolve(e).substr(1)),
                          (t = ge.resolve(t).substr(1));
                        for (
                          var n = r(e.split("/")),
                            o = r(t.split("/")),
                            i = Math.min(n.length, o.length),
                            s = i,
                            a = 0;
                          a < i;
                          a++
                        )
                          if (n[a] !== o[a]) {
                            s = a;
                            break;
                          }
                        var u = [];
                        for (a = s; a < n.length; a++) u.push("..");
                        return (u = u.concat(o.slice(s))).join("/");
                      },
                    },
                    ve = {
                      ttys: [],
                      init: function () {},
                      shutdown: function () {},
                      register: function (e, t) {
                        (ve.ttys[e] = { input: [], output: [], ops: t }),
                          Ee.registerDevice(e, ve.stream_ops);
                      },
                      stream_ops: {
                        open: function (e) {
                          var t = ve.ttys[e.node.rdev];
                          if (!t) throw new Ee.ErrnoError(43);
                          (e.tty = t), (e.seekable = !1);
                        },
                        close: function (e) {
                          e.tty.ops.flush(e.tty);
                        },
                        flush: function (e) {
                          e.tty.ops.flush(e.tty);
                        },
                        read: function (e, t, r, n, o) {
                          if (!e.tty || !e.tty.ops.get_char)
                            throw new Ee.ErrnoError(60);
                          for (var i = 0, s = 0; s < n; s++) {
                            var a;
                            try {
                              a = e.tty.ops.get_char(e.tty);
                            } catch (e) {
                              throw new Ee.ErrnoError(29);
                            }
                            if (void 0 === a && 0 === i)
                              throw new Ee.ErrnoError(6);
                            if (null == a) break;
                            i++, (t[r + s] = a);
                          }
                          return i && (e.node.timestamp = Date.now()), i;
                        },
                        write: function (e, t, r, n, o) {
                          if (!e.tty || !e.tty.ops.put_char)
                            throw new Ee.ErrnoError(60);
                          try {
                            for (var i = 0; i < n; i++)
                              e.tty.ops.put_char(e.tty, t[r + i]);
                          } catch (e) {
                            throw new Ee.ErrnoError(29);
                          }
                          return n && (e.node.timestamp = Date.now()), i;
                        },
                      },
                      default_tty_ops: {
                        get_char: function (e) {
                          if (!e.input.length) {
                            var t = null;
                            if (v) {
                              var r = Buffer.alloc(256),
                                n = 0;
                              try {
                                n = d.readSync(
                                  process.stdin.fd,
                                  r,
                                  0,
                                  256,
                                  null
                                );
                              } catch (e) {
                                if (!e.toString().includes("EOF")) throw e;
                                n = 0;
                              }
                              t =
                                n > 0 ? r.slice(0, n).toString("utf-8") : null;
                            } else
                              "undefined" != typeof window &&
                              "function" == typeof window.prompt
                                ? null !== (t = window.prompt("Input: ")) &&
                                  (t += "\n")
                                : "function" == typeof readline &&
                                  null !== (t = readline()) &&
                                  (t += "\n");
                            if (!t) return null;
                            e.input = Pe(t, !0);
                          }
                          return e.input.shift();
                        },
                        put_char: function (e, t) {
                          null === t || 10 === t
                            ? (b(W(e.output, 0)), (e.output = []))
                            : 0 != t && e.output.push(t);
                        },
                        flush: function (e) {
                          e.output &&
                            e.output.length > 0 &&
                            (b(W(e.output, 0)), (e.output = []));
                        },
                      },
                      default_tty1_ops: {
                        put_char: function (e, t) {
                          null === t || 10 === t
                            ? (w(W(e.output, 0)), (e.output = []))
                            : 0 != t && e.output.push(t);
                        },
                        flush: function (e) {
                          e.output &&
                            e.output.length > 0 &&
                            (w(W(e.output, 0)), (e.output = []));
                        },
                      },
                    };
                  function ye(e) {
                    e = (function (e, t) {
                      return 65536 * Math.ceil(e / 65536);
                    })(e);
                    var t = He(65536, e);
                    return t
                      ? ((function (e, t) {
                          B.fill(0, e, e + t);
                        })(t, e),
                        t)
                      : 0;
                  }
                  var be,
                    we = {
                      ops_table: null,
                      mount: function (e) {
                        return we.createNode(null, "/", 16895, 0);
                      },
                      createNode: function (e, t, r, n) {
                        if (Ee.isBlkdev(r) || Ee.isFIFO(r))
                          throw new Ee.ErrnoError(63);
                        we.ops_table ||
                          (we.ops_table = {
                            dir: {
                              node: {
                                getattr: we.node_ops.getattr,
                                setattr: we.node_ops.setattr,
                                lookup: we.node_ops.lookup,
                                mknod: we.node_ops.mknod,
                                rename: we.node_ops.rename,
                                unlink: we.node_ops.unlink,
                                rmdir: we.node_ops.rmdir,
                                readdir: we.node_ops.readdir,
                                symlink: we.node_ops.symlink,
                              },
                              stream: { llseek: we.stream_ops.llseek },
                            },
                            file: {
                              node: {
                                getattr: we.node_ops.getattr,
                                setattr: we.node_ops.setattr,
                              },
                              stream: {
                                llseek: we.stream_ops.llseek,
                                read: we.stream_ops.read,
                                write: we.stream_ops.write,
                                allocate: we.stream_ops.allocate,
                                mmap: we.stream_ops.mmap,
                                msync: we.stream_ops.msync,
                              },
                            },
                            link: {
                              node: {
                                getattr: we.node_ops.getattr,
                                setattr: we.node_ops.setattr,
                                readlink: we.node_ops.readlink,
                              },
                              stream: {},
                            },
                            chrdev: {
                              node: {
                                getattr: we.node_ops.getattr,
                                setattr: we.node_ops.setattr,
                              },
                              stream: Ee.chrdev_stream_ops,
                            },
                          });
                        var o = Ee.createNode(e, t, r, n);
                        return (
                          Ee.isDir(o.mode)
                            ? ((o.node_ops = we.ops_table.dir.node),
                              (o.stream_ops = we.ops_table.dir.stream),
                              (o.contents = {}))
                            : Ee.isFile(o.mode)
                            ? ((o.node_ops = we.ops_table.file.node),
                              (o.stream_ops = we.ops_table.file.stream),
                              (o.usedBytes = 0),
                              (o.contents = null))
                            : Ee.isLink(o.mode)
                            ? ((o.node_ops = we.ops_table.link.node),
                              (o.stream_ops = we.ops_table.link.stream))
                            : Ee.isChrdev(o.mode) &&
                              ((o.node_ops = we.ops_table.chrdev.node),
                              (o.stream_ops = we.ops_table.chrdev.stream)),
                          (o.timestamp = Date.now()),
                          e &&
                            ((e.contents[t] = o), (e.timestamp = o.timestamp)),
                          o
                        );
                      },
                      getFileDataAsTypedArray: function (e) {
                        return e.contents
                          ? e.contents.subarray
                            ? e.contents.subarray(0, e.usedBytes)
                            : new Uint8Array(e.contents)
                          : new Uint8Array(0);
                      },
                      expandFileStorage: function (e, t) {
                        var r = e.contents ? e.contents.length : 0;
                        if (!(r >= t)) {
                          (t = Math.max(
                            t,
                            (r * (r < 1048576 ? 2 : 1.125)) >>> 0
                          )),
                            0 != r && (t = Math.max(t, 256));
                          var n = e.contents;
                          (e.contents = new Uint8Array(t)),
                            e.usedBytes > 0 &&
                              e.contents.set(n.subarray(0, e.usedBytes), 0);
                        }
                      },
                      resizeFileStorage: function (e, t) {
                        if (e.usedBytes != t)
                          if (0 == t) (e.contents = null), (e.usedBytes = 0);
                          else {
                            var r = e.contents;
                            (e.contents = new Uint8Array(t)),
                              r &&
                                e.contents.set(
                                  r.subarray(0, Math.min(t, e.usedBytes))
                                ),
                              (e.usedBytes = t);
                          }
                      },
                      node_ops: {
                        getattr: function (e) {
                          var t = {};
                          return (
                            (t.dev = Ee.isChrdev(e.mode) ? e.id : 1),
                            (t.ino = e.id),
                            (t.mode = e.mode),
                            (t.nlink = 1),
                            (t.uid = 0),
                            (t.gid = 0),
                            (t.rdev = e.rdev),
                            Ee.isDir(e.mode)
                              ? (t.size = 4096)
                              : Ee.isFile(e.mode)
                              ? (t.size = e.usedBytes)
                              : Ee.isLink(e.mode)
                              ? (t.size = e.link.length)
                              : (t.size = 0),
                            (t.atime = new Date(e.timestamp)),
                            (t.mtime = new Date(e.timestamp)),
                            (t.ctime = new Date(e.timestamp)),
                            (t.blksize = 4096),
                            (t.blocks = Math.ceil(t.size / t.blksize)),
                            t
                          );
                        },
                        setattr: function (e, t) {
                          void 0 !== t.mode && (e.mode = t.mode),
                            void 0 !== t.timestamp &&
                              (e.timestamp = t.timestamp),
                            void 0 !== t.size &&
                              we.resizeFileStorage(e, t.size);
                        },
                        lookup: function (e, t) {
                          throw Ee.genericErrors[44];
                        },
                        mknod: function (e, t, r, n) {
                          return we.createNode(e, t, r, n);
                        },
                        rename: function (e, t, r) {
                          if (Ee.isDir(e.mode)) {
                            var n;
                            try {
                              n = Ee.lookupNode(t, r);
                            } catch (e) {}
                            if (n)
                              for (var o in n.contents)
                                throw new Ee.ErrnoError(55);
                          }
                          delete e.parent.contents[e.name],
                            (e.parent.timestamp = Date.now()),
                            (e.name = r),
                            (t.contents[r] = e),
                            (t.timestamp = e.parent.timestamp),
                            (e.parent = t);
                        },
                        unlink: function (e, t) {
                          delete e.contents[t], (e.timestamp = Date.now());
                        },
                        rmdir: function (e, t) {
                          var r = Ee.lookupNode(e, t);
                          for (var n in r.contents) throw new Ee.ErrnoError(55);
                          delete e.contents[t], (e.timestamp = Date.now());
                        },
                        readdir: function (e) {
                          var t = [".", ".."];
                          for (var r in e.contents)
                            e.contents.hasOwnProperty(r) && t.push(r);
                          return t;
                        },
                        symlink: function (e, t, r) {
                          var n = we.createNode(e, t, 41471, 0);
                          return (n.link = r), n;
                        },
                        readlink: function (e) {
                          if (!Ee.isLink(e.mode)) throw new Ee.ErrnoError(28);
                          return e.link;
                        },
                      },
                      stream_ops: {
                        read: function (e, t, r, n, o) {
                          var i = e.node.contents;
                          if (o >= e.node.usedBytes) return 0;
                          var s = Math.min(e.node.usedBytes - o, n);
                          if (s > 8 && i.subarray)
                            t.set(i.subarray(o, o + s), r);
                          else for (var a = 0; a < s; a++) t[r + a] = i[o + a];
                          return s;
                        },
                        write: function (e, t, r, n, o, i) {
                          if ((t.buffer === O.buffer && (i = !1), !n)) return 0;
                          var s = e.node;
                          if (
                            ((s.timestamp = Date.now()),
                            t.subarray && (!s.contents || s.contents.subarray))
                          ) {
                            if (i)
                              return (
                                (s.contents = t.subarray(r, r + n)),
                                (s.usedBytes = n),
                                n
                              );
                            if (0 === s.usedBytes && 0 === o)
                              return (
                                (s.contents = t.slice(r, r + n)),
                                (s.usedBytes = n),
                                n
                              );
                            if (o + n <= s.usedBytes)
                              return s.contents.set(t.subarray(r, r + n), o), n;
                          }
                          if (
                            (we.expandFileStorage(s, o + n),
                            s.contents.subarray && t.subarray)
                          )
                            s.contents.set(t.subarray(r, r + n), o);
                          else
                            for (var a = 0; a < n; a++)
                              s.contents[o + a] = t[r + a];
                          return (
                            (s.usedBytes = Math.max(s.usedBytes, o + n)), n
                          );
                        },
                        llseek: function (e, t, r) {
                          var n = t;
                          if (
                            (1 === r
                              ? (n += e.position)
                              : 2 === r &&
                                Ee.isFile(e.node.mode) &&
                                (n += e.node.usedBytes),
                            n < 0)
                          )
                            throw new Ee.ErrnoError(28);
                          return n;
                        },
                        allocate: function (e, t, r) {
                          we.expandFileStorage(e.node, t + r),
                            (e.node.usedBytes = Math.max(
                              e.node.usedBytes,
                              t + r
                            ));
                        },
                        mmap: function (e, t, r, n, o, i) {
                          if (0 !== t) throw new Ee.ErrnoError(28);
                          if (!Ee.isFile(e.node.mode))
                            throw new Ee.ErrnoError(43);
                          var s,
                            a,
                            u = e.node.contents;
                          if (2 & i || u.buffer !== j) {
                            if (
                              ((n > 0 || n + r < u.length) &&
                                (u = u.subarray
                                  ? u.subarray(n, n + r)
                                  : Array.prototype.slice.call(u, n, n + r)),
                              (a = !0),
                              !(s = ye(r)))
                            )
                              throw new Ee.ErrnoError(48);
                            O.set(u, s);
                          } else (a = !1), (s = u.byteOffset);
                          return { ptr: s, allocated: a };
                        },
                        msync: function (e, t, r, n, o) {
                          if (!Ee.isFile(e.node.mode))
                            throw new Ee.ErrnoError(43);
                          return (
                            2 & o || we.stream_ops.write(e, t, 0, n, r, !1), 0
                          );
                        },
                      },
                    },
                    Ee = {
                      root: null,
                      mounts: [],
                      devices: {},
                      streams: [],
                      nextInode: 1,
                      nameTable: null,
                      currentPath: "/",
                      initialized: !1,
                      ignorePermissions: !0,
                      trackingDelegate: {},
                      tracking: { openFlags: { READ: 1, WRITE: 2 } },
                      ErrnoError: null,
                      genericErrors: {},
                      filesystems: null,
                      syncFSRequests: 0,
                      lookupPath: function (e, t) {
                        if (((t = t || {}), !(e = ge.resolve(Ee.cwd(), e))))
                          return { path: "", node: null };
                        var r = { follow_mount: !0, recurse_count: 0 };
                        for (var n in r) void 0 === t[n] && (t[n] = r[n]);
                        if (t.recurse_count > 8) throw new Ee.ErrnoError(32);
                        for (
                          var o = _e.normalizeArray(
                              e.split("/").filter(function (e) {
                                return !!e;
                              }),
                              !1
                            ),
                            i = Ee.root,
                            s = "/",
                            a = 0;
                          a < o.length;
                          a++
                        ) {
                          var u = a === o.length - 1;
                          if (u && t.parent) break;
                          if (
                            ((i = Ee.lookupNode(i, o[a])),
                            (s = _e.join2(s, o[a])),
                            Ee.isMountpoint(i) &&
                              (!u || (u && t.follow_mount)) &&
                              (i = i.mounted.root),
                            !u || t.follow)
                          )
                            for (var l = 0; Ee.isLink(i.mode); ) {
                              var c = Ee.readlink(s);
                              if (
                                ((s = ge.resolve(_e.dirname(s), c)),
                                (i = Ee.lookupPath(s, {
                                  recurse_count: t.recurse_count,
                                }).node),
                                l++ > 40)
                              )
                                throw new Ee.ErrnoError(32);
                            }
                        }
                        return { path: s, node: i };
                      },
                      getPath: function (e) {
                        for (var t; ; ) {
                          if (Ee.isRoot(e)) {
                            var r = e.mount.mountpoint;
                            return t
                              ? "/" !== r[r.length - 1]
                                ? r + "/" + t
                                : r + t
                              : r;
                          }
                          (t = t ? e.name + "/" + t : e.name), (e = e.parent);
                        }
                      },
                      hashName: function (e, t) {
                        for (var r = 0, n = 0; n < t.length; n++)
                          r = ((r << 5) - r + t.charCodeAt(n)) | 0;
                        return ((e + r) >>> 0) % Ee.nameTable.length;
                      },
                      hashAddNode: function (e) {
                        var t = Ee.hashName(e.parent.id, e.name);
                        (e.name_next = Ee.nameTable[t]), (Ee.nameTable[t] = e);
                      },
                      hashRemoveNode: function (e) {
                        var t = Ee.hashName(e.parent.id, e.name);
                        if (Ee.nameTable[t] === e)
                          Ee.nameTable[t] = e.name_next;
                        else
                          for (var r = Ee.nameTable[t]; r; ) {
                            if (r.name_next === e) {
                              r.name_next = e.name_next;
                              break;
                            }
                            r = r.name_next;
                          }
                      },
                      lookupNode: function (e, t) {
                        var r = Ee.mayLookup(e);
                        if (r) throw new Ee.ErrnoError(r, e);
                        for (
                          var n = Ee.hashName(e.id, t), o = Ee.nameTable[n];
                          o;
                          o = o.name_next
                        ) {
                          var i = o.name;
                          if (o.parent.id === e.id && i === t) return o;
                        }
                        return Ee.lookup(e, t);
                      },
                      createNode: function (e, t, r, n) {
                        var o = new Ee.FSNode(e, t, r, n);
                        return Ee.hashAddNode(o), o;
                      },
                      destroyNode: function (e) {
                        Ee.hashRemoveNode(e);
                      },
                      isRoot: function (e) {
                        return e === e.parent;
                      },
                      isMountpoint: function (e) {
                        return !!e.mounted;
                      },
                      isFile: function (e) {
                        return 32768 == (61440 & e);
                      },
                      isDir: function (e) {
                        return 16384 == (61440 & e);
                      },
                      isLink: function (e) {
                        return 40960 == (61440 & e);
                      },
                      isChrdev: function (e) {
                        return 8192 == (61440 & e);
                      },
                      isBlkdev: function (e) {
                        return 24576 == (61440 & e);
                      },
                      isFIFO: function (e) {
                        return 4096 == (61440 & e);
                      },
                      isSocket: function (e) {
                        return 49152 == (49152 & e);
                      },
                      flagModes: {
                        r: 0,
                        "r+": 2,
                        w: 577,
                        "w+": 578,
                        a: 1089,
                        "a+": 1090,
                      },
                      modeStringToFlags: function (e) {
                        var t = Ee.flagModes[e];
                        if (void 0 === t)
                          throw new Error("Unknown file open mode: " + e);
                        return t;
                      },
                      flagsToPermissionString: function (e) {
                        var t = ["r", "w", "rw"][3 & e];
                        return 512 & e && (t += "w"), t;
                      },
                      nodePermissions: function (e, t) {
                        return Ee.ignorePermissions ||
                          ((!t.includes("r") || 292 & e.mode) &&
                            (!t.includes("w") || 146 & e.mode) &&
                            (!t.includes("x") || 73 & e.mode))
                          ? 0
                          : 2;
                      },
                      mayLookup: function (e) {
                        return (
                          Ee.nodePermissions(e, "x") ||
                          (e.node_ops.lookup ? 0 : 2)
                        );
                      },
                      mayCreate: function (e, t) {
                        try {
                          return Ee.lookupNode(e, t), 20;
                        } catch (e) {}
                        return Ee.nodePermissions(e, "wx");
                      },
                      mayDelete: function (e, t, r) {
                        var n;
                        try {
                          n = Ee.lookupNode(e, t);
                        } catch (e) {
                          return e.errno;
                        }
                        var o = Ee.nodePermissions(e, "wx");
                        if (o) return o;
                        if (r) {
                          if (!Ee.isDir(n.mode)) return 54;
                          if (Ee.isRoot(n) || Ee.getPath(n) === Ee.cwd())
                            return 10;
                        } else if (Ee.isDir(n.mode)) return 31;
                        return 0;
                      },
                      mayOpen: function (e, t) {
                        return e
                          ? Ee.isLink(e.mode)
                            ? 32
                            : Ee.isDir(e.mode) &&
                              ("r" !== Ee.flagsToPermissionString(t) || 512 & t)
                            ? 31
                            : Ee.nodePermissions(
                                e,
                                Ee.flagsToPermissionString(t)
                              )
                          : 44;
                      },
                      MAX_OPEN_FDS: 4096,
                      nextfd: function (e, t) {
                        (e = e || 0), (t = t || Ee.MAX_OPEN_FDS);
                        for (var r = e; r <= t; r++)
                          if (!Ee.streams[r]) return r;
                        throw new Ee.ErrnoError(33);
                      },
                      getStream: function (e) {
                        return Ee.streams[e];
                      },
                      createStream: function (e, t, r) {
                        Ee.FSStream ||
                          ((Ee.FSStream = function () {}),
                          (Ee.FSStream.prototype = {
                            object: {
                              get: function () {
                                return this.node;
                              },
                              set: function (e) {
                                this.node = e;
                              },
                            },
                            isRead: {
                              get: function () {
                                return 1 != (2097155 & this.flags);
                              },
                            },
                            isWrite: {
                              get: function () {
                                return 0 != (2097155 & this.flags);
                              },
                            },
                            isAppend: {
                              get: function () {
                                return 1024 & this.flags;
                              },
                            },
                          }));
                        var n = new Ee.FSStream();
                        for (var o in e) n[o] = e[o];
                        e = n;
                        var i = Ee.nextfd(t, r);
                        return (e.fd = i), (Ee.streams[i] = e), e;
                      },
                      closeStream: function (e) {
                        Ee.streams[e] = null;
                      },
                      chrdev_stream_ops: {
                        open: function (e) {
                          var t = Ee.getDevice(e.node.rdev);
                          (e.stream_ops = t.stream_ops),
                            e.stream_ops.open && e.stream_ops.open(e);
                        },
                        llseek: function () {
                          throw new Ee.ErrnoError(70);
                        },
                      },
                      major: function (e) {
                        return e >> 8;
                      },
                      minor: function (e) {
                        return 255 & e;
                      },
                      makedev: function (e, t) {
                        return (e << 8) | t;
                      },
                      registerDevice: function (e, t) {
                        Ee.devices[e] = { stream_ops: t };
                      },
                      getDevice: function (e) {
                        return Ee.devices[e];
                      },
                      getMounts: function (e) {
                        for (var t = [], r = [e]; r.length; ) {
                          var n = r.pop();
                          t.push(n), r.push.apply(r, n.mounts);
                        }
                        return t;
                      },
                      syncfs: function (e, t) {
                        "function" == typeof e && ((t = e), (e = !1)),
                          Ee.syncFSRequests++,
                          Ee.syncFSRequests > 1 &&
                            w(
                              "warning: " +
                                Ee.syncFSRequests +
                                " FS.syncfs operations in flight at once, probably just doing extra work"
                            );
                        var r = Ee.getMounts(Ee.root.mount),
                          n = 0;
                        function o(e) {
                          return Ee.syncFSRequests--, t(e);
                        }
                        function i(e) {
                          if (e)
                            return i.errored
                              ? void 0
                              : ((i.errored = !0), o(e));
                          ++n >= r.length && o(null);
                        }
                        r.forEach(function (t) {
                          if (!t.type.syncfs) return i(null);
                          t.type.syncfs(t, e, i);
                        });
                      },
                      mount: function (e, t, r) {
                        var n,
                          o = "/" === r,
                          i = !r;
                        if (o && Ee.root) throw new Ee.ErrnoError(10);
                        if (!o && !i) {
                          var s = Ee.lookupPath(r, { follow_mount: !1 });
                          if (((r = s.path), (n = s.node), Ee.isMountpoint(n)))
                            throw new Ee.ErrnoError(10);
                          if (!Ee.isDir(n.mode)) throw new Ee.ErrnoError(54);
                        }
                        var a = { type: e, opts: t, mountpoint: r, mounts: [] },
                          u = e.mount(a);
                        return (
                          (u.mount = a),
                          (a.root = u),
                          o
                            ? (Ee.root = u)
                            : n &&
                              ((n.mounted = a),
                              n.mount && n.mount.mounts.push(a)),
                          u
                        );
                      },
                      unmount: function (e) {
                        var t = Ee.lookupPath(e, { follow_mount: !1 });
                        if (!Ee.isMountpoint(t.node))
                          throw new Ee.ErrnoError(28);
                        var r = t.node,
                          n = r.mounted,
                          o = Ee.getMounts(n);
                        Object.keys(Ee.nameTable).forEach(function (e) {
                          for (var t = Ee.nameTable[e]; t; ) {
                            var r = t.name_next;
                            o.includes(t.mount) && Ee.destroyNode(t), (t = r);
                          }
                        }),
                          (r.mounted = null);
                        var i = r.mount.mounts.indexOf(n);
                        r.mount.mounts.splice(i, 1);
                      },
                      lookup: function (e, t) {
                        return e.node_ops.lookup(e, t);
                      },
                      mknod: function (e, t, r) {
                        var n = Ee.lookupPath(e, { parent: !0 }).node,
                          o = _e.basename(e);
                        if (!o || "." === o || ".." === o)
                          throw new Ee.ErrnoError(28);
                        var i = Ee.mayCreate(n, o);
                        if (i) throw new Ee.ErrnoError(i);
                        if (!n.node_ops.mknod) throw new Ee.ErrnoError(63);
                        return n.node_ops.mknod(n, o, t, r);
                      },
                      create: function (e, t) {
                        return (
                          (t = void 0 !== t ? t : 438),
                          (t &= 4095),
                          (t |= 32768),
                          Ee.mknod(e, t, 0)
                        );
                      },
                      mkdir: function (e, t) {
                        return (
                          (t = void 0 !== t ? t : 511),
                          (t &= 1023),
                          (t |= 16384),
                          Ee.mknod(e, t, 0)
                        );
                      },
                      mkdirTree: function (e, t) {
                        for (
                          var r = e.split("/"), n = "", o = 0;
                          o < r.length;
                          ++o
                        )
                          if (r[o]) {
                            n += "/" + r[o];
                            try {
                              Ee.mkdir(n, t);
                            } catch (e) {
                              if (20 != e.errno) throw e;
                            }
                          }
                      },
                      mkdev: function (e, t, r) {
                        return (
                          void 0 === r && ((r = t), (t = 438)),
                          (t |= 8192),
                          Ee.mknod(e, t, r)
                        );
                      },
                      symlink: function (e, t) {
                        if (!ge.resolve(e)) throw new Ee.ErrnoError(44);
                        var r = Ee.lookupPath(t, { parent: !0 }).node;
                        if (!r) throw new Ee.ErrnoError(44);
                        var n = _e.basename(t),
                          o = Ee.mayCreate(r, n);
                        if (o) throw new Ee.ErrnoError(o);
                        if (!r.node_ops.symlink) throw new Ee.ErrnoError(63);
                        return r.node_ops.symlink(r, n, e);
                      },
                      rename: function (e, t) {
                        var r,
                          n,
                          o = _e.dirname(e),
                          i = _e.dirname(t),
                          s = _e.basename(e),
                          a = _e.basename(t);
                        if (
                          ((r = Ee.lookupPath(e, { parent: !0 }).node),
                          (n = Ee.lookupPath(t, { parent: !0 }).node),
                          !r || !n)
                        )
                          throw new Ee.ErrnoError(44);
                        if (r.mount !== n.mount) throw new Ee.ErrnoError(75);
                        var u,
                          l = Ee.lookupNode(r, s),
                          c = ge.relative(e, i);
                        if ("." !== c.charAt(0)) throw new Ee.ErrnoError(28);
                        if ("." !== (c = ge.relative(t, o)).charAt(0))
                          throw new Ee.ErrnoError(55);
                        try {
                          u = Ee.lookupNode(n, a);
                        } catch (e) {}
                        if (l !== u) {
                          var f = Ee.isDir(l.mode),
                            d = Ee.mayDelete(r, s, f);
                          if (d) throw new Ee.ErrnoError(d);
                          if (
                            (d = u ? Ee.mayDelete(n, a, f) : Ee.mayCreate(n, a))
                          )
                            throw new Ee.ErrnoError(d);
                          if (!r.node_ops.rename) throw new Ee.ErrnoError(63);
                          if (Ee.isMountpoint(l) || (u && Ee.isMountpoint(u)))
                            throw new Ee.ErrnoError(10);
                          if (n !== r && (d = Ee.nodePermissions(r, "w")))
                            throw new Ee.ErrnoError(d);
                          try {
                            Ee.trackingDelegate.willMovePath &&
                              Ee.trackingDelegate.willMovePath(e, t);
                          } catch (r) {
                            w(
                              "FS.trackingDelegate['willMovePath']('" +
                                e +
                                "', '" +
                                t +
                                "') threw an exception: " +
                                r.message
                            );
                          }
                          Ee.hashRemoveNode(l);
                          try {
                            r.node_ops.rename(l, n, a);
                          } catch (e) {
                            throw e;
                          } finally {
                            Ee.hashAddNode(l);
                          }
                          try {
                            Ee.trackingDelegate.onMovePath &&
                              Ee.trackingDelegate.onMovePath(e, t);
                          } catch (r) {
                            w(
                              "FS.trackingDelegate['onMovePath']('" +
                                e +
                                "', '" +
                                t +
                                "') threw an exception: " +
                                r.message
                            );
                          }
                        }
                      },
                      rmdir: function (e) {
                        var t = Ee.lookupPath(e, { parent: !0 }).node,
                          r = _e.basename(e),
                          n = Ee.lookupNode(t, r),
                          o = Ee.mayDelete(t, r, !0);
                        if (o) throw new Ee.ErrnoError(o);
                        if (!t.node_ops.rmdir) throw new Ee.ErrnoError(63);
                        if (Ee.isMountpoint(n)) throw new Ee.ErrnoError(10);
                        try {
                          Ee.trackingDelegate.willDeletePath &&
                            Ee.trackingDelegate.willDeletePath(e);
                        } catch (t) {
                          w(
                            "FS.trackingDelegate['willDeletePath']('" +
                              e +
                              "') threw an exception: " +
                              t.message
                          );
                        }
                        t.node_ops.rmdir(t, r), Ee.destroyNode(n);
                        try {
                          Ee.trackingDelegate.onDeletePath &&
                            Ee.trackingDelegate.onDeletePath(e);
                        } catch (t) {
                          w(
                            "FS.trackingDelegate['onDeletePath']('" +
                              e +
                              "') threw an exception: " +
                              t.message
                          );
                        }
                      },
                      readdir: function (e) {
                        var t = Ee.lookupPath(e, { follow: !0 }).node;
                        if (!t.node_ops.readdir) throw new Ee.ErrnoError(54);
                        return t.node_ops.readdir(t);
                      },
                      unlink: function (e) {
                        var t = Ee.lookupPath(e, { parent: !0 }).node,
                          r = _e.basename(e),
                          n = Ee.lookupNode(t, r),
                          o = Ee.mayDelete(t, r, !1);
                        if (o) throw new Ee.ErrnoError(o);
                        if (!t.node_ops.unlink) throw new Ee.ErrnoError(63);
                        if (Ee.isMountpoint(n)) throw new Ee.ErrnoError(10);
                        try {
                          Ee.trackingDelegate.willDeletePath &&
                            Ee.trackingDelegate.willDeletePath(e);
                        } catch (t) {
                          w(
                            "FS.trackingDelegate['willDeletePath']('" +
                              e +
                              "') threw an exception: " +
                              t.message
                          );
                        }
                        t.node_ops.unlink(t, r), Ee.destroyNode(n);
                        try {
                          Ee.trackingDelegate.onDeletePath &&
                            Ee.trackingDelegate.onDeletePath(e);
                        } catch (t) {
                          w(
                            "FS.trackingDelegate['onDeletePath']('" +
                              e +
                              "') threw an exception: " +
                              t.message
                          );
                        }
                      },
                      readlink: function (e) {
                        var t = Ee.lookupPath(e).node;
                        if (!t) throw new Ee.ErrnoError(44);
                        if (!t.node_ops.readlink) throw new Ee.ErrnoError(28);
                        return ge.resolve(
                          Ee.getPath(t.parent),
                          t.node_ops.readlink(t)
                        );
                      },
                      stat: function (e, t) {
                        var r = Ee.lookupPath(e, { follow: !t }).node;
                        if (!r) throw new Ee.ErrnoError(44);
                        if (!r.node_ops.getattr) throw new Ee.ErrnoError(63);
                        return r.node_ops.getattr(r);
                      },
                      lstat: function (e) {
                        return Ee.stat(e, !0);
                      },
                      chmod: function (e, t, r) {
                        var n;
                        if (
                          !(n =
                            "string" == typeof e
                              ? Ee.lookupPath(e, { follow: !r }).node
                              : e).node_ops.setattr
                        )
                          throw new Ee.ErrnoError(63);
                        n.node_ops.setattr(n, {
                          mode: (4095 & t) | (-4096 & n.mode),
                          timestamp: Date.now(),
                        });
                      },
                      lchmod: function (e, t) {
                        Ee.chmod(e, t, !0);
                      },
                      fchmod: function (e, t) {
                        var r = Ee.getStream(e);
                        if (!r) throw new Ee.ErrnoError(8);
                        Ee.chmod(r.node, t);
                      },
                      chown: function (e, t, r, n) {
                        var o;
                        if (
                          !(o =
                            "string" == typeof e
                              ? Ee.lookupPath(e, { follow: !n }).node
                              : e).node_ops.setattr
                        )
                          throw new Ee.ErrnoError(63);
                        o.node_ops.setattr(o, { timestamp: Date.now() });
                      },
                      lchown: function (e, t, r) {
                        Ee.chown(e, t, r, !0);
                      },
                      fchown: function (e, t, r) {
                        var n = Ee.getStream(e);
                        if (!n) throw new Ee.ErrnoError(8);
                        Ee.chown(n.node, t, r);
                      },
                      truncate: function (e, t) {
                        if (t < 0) throw new Ee.ErrnoError(28);
                        var r;
                        if (
                          !(r =
                            "string" == typeof e
                              ? Ee.lookupPath(e, { follow: !0 }).node
                              : e).node_ops.setattr
                        )
                          throw new Ee.ErrnoError(63);
                        if (Ee.isDir(r.mode)) throw new Ee.ErrnoError(31);
                        if (!Ee.isFile(r.mode)) throw new Ee.ErrnoError(28);
                        var n = Ee.nodePermissions(r, "w");
                        if (n) throw new Ee.ErrnoError(n);
                        r.node_ops.setattr(r, {
                          size: t,
                          timestamp: Date.now(),
                        });
                      },
                      ftruncate: function (e, t) {
                        var r = Ee.getStream(e);
                        if (!r) throw new Ee.ErrnoError(8);
                        if (0 == (2097155 & r.flags))
                          throw new Ee.ErrnoError(28);
                        Ee.truncate(r.node, t);
                      },
                      utime: function (e, t, r) {
                        var n = Ee.lookupPath(e, { follow: !0 }).node;
                        n.node_ops.setattr(n, { timestamp: Math.max(t, r) });
                      },
                      open: function (e, t, r, n, o) {
                        if ("" === e) throw new Ee.ErrnoError(44);
                        var s;
                        if (
                          ((r = void 0 === r ? 438 : r),
                          (r =
                            64 &
                            (t =
                              "string" == typeof t
                                ? Ee.modeStringToFlags(t)
                                : t)
                              ? (4095 & r) | 32768
                              : 0),
                          "object" == typeof e)
                        )
                          s = e;
                        else {
                          e = _e.normalize(e);
                          try {
                            s = Ee.lookupPath(e, {
                              follow: !(131072 & t),
                            }).node;
                          } catch (e) {}
                        }
                        var a = !1;
                        if (64 & t)
                          if (s) {
                            if (128 & t) throw new Ee.ErrnoError(20);
                          } else (s = Ee.mknod(e, r, 0)), (a = !0);
                        if (!s) throw new Ee.ErrnoError(44);
                        if (
                          (Ee.isChrdev(s.mode) && (t &= -513),
                          65536 & t && !Ee.isDir(s.mode))
                        )
                          throw new Ee.ErrnoError(54);
                        if (!a) {
                          var u = Ee.mayOpen(s, t);
                          if (u) throw new Ee.ErrnoError(u);
                        }
                        512 & t && Ee.truncate(s, 0), (t &= -131713);
                        var l = Ee.createStream(
                          {
                            node: s,
                            path: Ee.getPath(s),
                            flags: t,
                            seekable: !0,
                            position: 0,
                            stream_ops: s.stream_ops,
                            ungotten: [],
                            error: !1,
                          },
                          n,
                          o
                        );
                        l.stream_ops.open && l.stream_ops.open(l),
                          !i.logReadFiles ||
                            1 & t ||
                            (Ee.readFiles || (Ee.readFiles = {}),
                            e in Ee.readFiles ||
                              ((Ee.readFiles[e] = 1),
                              w(
                                "FS.trackingDelegate error on read file: " + e
                              )));
                        try {
                          if (Ee.trackingDelegate.onOpenFile) {
                            var c = 0;
                            1 != (2097155 & t) &&
                              (c |= Ee.tracking.openFlags.READ),
                              0 != (2097155 & t) &&
                                (c |= Ee.tracking.openFlags.WRITE),
                              Ee.trackingDelegate.onOpenFile(e, c);
                          }
                        } catch (t) {
                          w(
                            "FS.trackingDelegate['onOpenFile']('" +
                              e +
                              "', flags) threw an exception: " +
                              t.message
                          );
                        }
                        return l;
                      },
                      close: function (e) {
                        if (Ee.isClosed(e)) throw new Ee.ErrnoError(8);
                        e.getdents && (e.getdents = null);
                        try {
                          e.stream_ops.close && e.stream_ops.close(e);
                        } catch (e) {
                          throw e;
                        } finally {
                          Ee.closeStream(e.fd);
                        }
                        e.fd = null;
                      },
                      isClosed: function (e) {
                        return null === e.fd;
                      },
                      llseek: function (e, t, r) {
                        if (Ee.isClosed(e)) throw new Ee.ErrnoError(8);
                        if (!e.seekable || !e.stream_ops.llseek)
                          throw new Ee.ErrnoError(70);
                        if (0 != r && 1 != r && 2 != r)
                          throw new Ee.ErrnoError(28);
                        return (
                          (e.position = e.stream_ops.llseek(e, t, r)),
                          (e.ungotten = []),
                          e.position
                        );
                      },
                      read: function (e, t, r, n, o) {
                        if (n < 0 || o < 0) throw new Ee.ErrnoError(28);
                        if (Ee.isClosed(e)) throw new Ee.ErrnoError(8);
                        if (1 == (2097155 & e.flags))
                          throw new Ee.ErrnoError(8);
                        if (Ee.isDir(e.node.mode)) throw new Ee.ErrnoError(31);
                        if (!e.stream_ops.read) throw new Ee.ErrnoError(28);
                        var i = void 0 !== o;
                        if (i) {
                          if (!e.seekable) throw new Ee.ErrnoError(70);
                        } else o = e.position;
                        var s = e.stream_ops.read(e, t, r, n, o);
                        return i || (e.position += s), s;
                      },
                      write: function (e, t, r, n, o, i) {
                        if (n < 0 || o < 0) throw new Ee.ErrnoError(28);
                        if (Ee.isClosed(e)) throw new Ee.ErrnoError(8);
                        if (0 == (2097155 & e.flags))
                          throw new Ee.ErrnoError(8);
                        if (Ee.isDir(e.node.mode)) throw new Ee.ErrnoError(31);
                        if (!e.stream_ops.write) throw new Ee.ErrnoError(28);
                        e.seekable && 1024 & e.flags && Ee.llseek(e, 0, 2);
                        var s = void 0 !== o;
                        if (s) {
                          if (!e.seekable) throw new Ee.ErrnoError(70);
                        } else o = e.position;
                        var a = e.stream_ops.write(e, t, r, n, o, i);
                        s || (e.position += a);
                        try {
                          e.path &&
                            Ee.trackingDelegate.onWriteToFile &&
                            Ee.trackingDelegate.onWriteToFile(e.path);
                        } catch (t) {
                          w(
                            "FS.trackingDelegate['onWriteToFile']('" +
                              e.path +
                              "') threw an exception: " +
                              t.message
                          );
                        }
                        return a;
                      },
                      allocate: function (e, t, r) {
                        if (Ee.isClosed(e)) throw new Ee.ErrnoError(8);
                        if (t < 0 || r <= 0) throw new Ee.ErrnoError(28);
                        if (0 == (2097155 & e.flags))
                          throw new Ee.ErrnoError(8);
                        if (!Ee.isFile(e.node.mode) && !Ee.isDir(e.node.mode))
                          throw new Ee.ErrnoError(43);
                        if (!e.stream_ops.allocate)
                          throw new Ee.ErrnoError(138);
                        e.stream_ops.allocate(e, t, r);
                      },
                      mmap: function (e, t, r, n, o, i) {
                        if (
                          0 != (2 & o) &&
                          0 == (2 & i) &&
                          2 != (2097155 & e.flags)
                        )
                          throw new Ee.ErrnoError(2);
                        if (1 == (2097155 & e.flags))
                          throw new Ee.ErrnoError(2);
                        if (!e.stream_ops.mmap) throw new Ee.ErrnoError(43);
                        return e.stream_ops.mmap(e, t, r, n, o, i);
                      },
                      msync: function (e, t, r, n, o) {
                        return e && e.stream_ops.msync
                          ? e.stream_ops.msync(e, t, r, n, o)
                          : 0;
                      },
                      munmap: function (e) {
                        return 0;
                      },
                      ioctl: function (e, t, r) {
                        if (!e.stream_ops.ioctl) throw new Ee.ErrnoError(59);
                        return e.stream_ops.ioctl(e, t, r);
                      },
                      readFile: function (e, t) {
                        if (
                          (((t = t || {}).flags = t.flags || 0),
                          (t.encoding = t.encoding || "binary"),
                          "utf8" !== t.encoding && "binary" !== t.encoding)
                        )
                          throw new Error(
                            'Invalid encoding type "' + t.encoding + '"'
                          );
                        var r,
                          n = Ee.open(e, t.flags),
                          o = Ee.stat(e).size,
                          i = new Uint8Array(o);
                        return (
                          Ee.read(n, i, 0, o, 0),
                          "utf8" === t.encoding
                            ? (r = W(i, 0))
                            : "binary" === t.encoding && (r = i),
                          Ee.close(n),
                          r
                        );
                      },
                      writeFile: function (e, t, r) {
                        (r = r || {}).flags = r.flags || 577;
                        var n = Ee.open(e, r.flags, r.mode);
                        if ("string" == typeof t) {
                          var o = new Uint8Array($(t) + 1),
                            i = X(t, o, 0, o.length);
                          Ee.write(n, o, 0, i, void 0, r.canOwn);
                        } else {
                          if (!ArrayBuffer.isView(t))
                            throw new Error("Unsupported data type");
                          Ee.write(n, t, 0, t.byteLength, void 0, r.canOwn);
                        }
                        Ee.close(n);
                      },
                      cwd: function () {
                        return Ee.currentPath;
                      },
                      chdir: function (e) {
                        var t = Ee.lookupPath(e, { follow: !0 });
                        if (null === t.node) throw new Ee.ErrnoError(44);
                        if (!Ee.isDir(t.node.mode)) throw new Ee.ErrnoError(54);
                        var r = Ee.nodePermissions(t.node, "x");
                        if (r) throw new Ee.ErrnoError(r);
                        Ee.currentPath = t.path;
                      },
                      createDefaultDirectories: function () {
                        Ee.mkdir("/tmp"),
                          Ee.mkdir("/home"),
                          Ee.mkdir("/home/web_user");
                      },
                      createDefaultDevices: function () {
                        Ee.mkdir("/dev"),
                          Ee.registerDevice(Ee.makedev(1, 3), {
                            read: function () {
                              return 0;
                            },
                            write: function (e, t, r, n, o) {
                              return n;
                            },
                          }),
                          Ee.mkdev("/dev/null", Ee.makedev(1, 3)),
                          ve.register(Ee.makedev(5, 0), ve.default_tty_ops),
                          ve.register(Ee.makedev(6, 0), ve.default_tty1_ops),
                          Ee.mkdev("/dev/tty", Ee.makedev(5, 0)),
                          Ee.mkdev("/dev/tty1", Ee.makedev(6, 0));
                        var e = (function () {
                          if (
                            "object" == typeof crypto &&
                            "function" == typeof crypto.getRandomValues
                          ) {
                            var e = new Uint8Array(1);
                            return function () {
                              return crypto.getRandomValues(e), e[0];
                            };
                          }
                          if (v)
                            try {
                              var t = r(821);
                              return function () {
                                return t.randomBytes(1)[0];
                              };
                            } catch (e) {}
                          return function () {
                            ce("randomDevice");
                          };
                        })();
                        Ee.createDevice("/dev", "random", e),
                          Ee.createDevice("/dev", "urandom", e),
                          Ee.mkdir("/dev/shm"),
                          Ee.mkdir("/dev/shm/tmp");
                      },
                      createSpecialDirectories: function () {
                        Ee.mkdir("/proc");
                        var e = Ee.mkdir("/proc/self");
                        Ee.mkdir("/proc/self/fd"),
                          Ee.mount(
                            {
                              mount: function () {
                                var t = Ee.createNode(e, "fd", 16895, 73);
                                return (
                                  (t.node_ops = {
                                    lookup: function (e, t) {
                                      var r = +t,
                                        n = Ee.getStream(r);
                                      if (!n) throw new Ee.ErrnoError(8);
                                      var o = {
                                        parent: null,
                                        mount: { mountpoint: "fake" },
                                        node_ops: {
                                          readlink: function () {
                                            return n.path;
                                          },
                                        },
                                      };
                                      return (o.parent = o), o;
                                    },
                                  }),
                                  t
                                );
                              },
                            },
                            {},
                            "/proc/self/fd"
                          );
                      },
                      createStandardStreams: function () {
                        i.stdin
                          ? Ee.createDevice("/dev", "stdin", i.stdin)
                          : Ee.symlink("/dev/tty", "/dev/stdin"),
                          i.stdout
                            ? Ee.createDevice("/dev", "stdout", null, i.stdout)
                            : Ee.symlink("/dev/tty", "/dev/stdout"),
                          i.stderr
                            ? Ee.createDevice("/dev", "stderr", null, i.stderr)
                            : Ee.symlink("/dev/tty1", "/dev/stderr"),
                          Ee.open("/dev/stdin", 0),
                          Ee.open("/dev/stdout", 1),
                          Ee.open("/dev/stderr", 1);
                      },
                      ensureErrnoError: function () {
                        Ee.ErrnoError ||
                          ((Ee.ErrnoError = function (e, t) {
                            (this.node = t),
                              (this.setErrno = function (e) {
                                this.errno = e;
                              }),
                              this.setErrno(e),
                              (this.message = "FS error");
                          }),
                          (Ee.ErrnoError.prototype = new Error()),
                          (Ee.ErrnoError.prototype.constructor = Ee.ErrnoError),
                          [44].forEach(function (e) {
                            (Ee.genericErrors[e] = new Ee.ErrnoError(e)),
                              (Ee.genericErrors[e].stack =
                                "<generic error, no stack>");
                          }));
                      },
                      staticInit: function () {
                        Ee.ensureErrnoError(),
                          (Ee.nameTable = new Array(4096)),
                          Ee.mount(we, {}, "/"),
                          Ee.createDefaultDirectories(),
                          Ee.createDefaultDevices(),
                          Ee.createSpecialDirectories(),
                          (Ee.filesystems = { MEMFS: we });
                      },
                      init: function (e, t, r) {
                        (Ee.init.initialized = !0),
                          Ee.ensureErrnoError(),
                          (i.stdin = e || i.stdin),
                          (i.stdout = t || i.stdout),
                          (i.stderr = r || i.stderr),
                          Ee.createStandardStreams();
                      },
                      quit: function () {
                        Ee.init.initialized = !1;
                        var e = i._fflush;
                        e && e(0);
                        for (var t = 0; t < Ee.streams.length; t++) {
                          var r = Ee.streams[t];
                          r && Ee.close(r);
                        }
                      },
                      getMode: function (e, t) {
                        var r = 0;
                        return e && (r |= 365), t && (r |= 146), r;
                      },
                      findObject: function (e, t) {
                        var r = Ee.analyzePath(e, t);
                        return r.exists ? r.object : null;
                      },
                      analyzePath: function (e, t) {
                        try {
                          e = (n = Ee.lookupPath(e, { follow: !t })).path;
                        } catch (e) {}
                        var r = {
                          isRoot: !1,
                          exists: !1,
                          error: 0,
                          name: null,
                          path: null,
                          object: null,
                          parentExists: !1,
                          parentPath: null,
                          parentObject: null,
                        };
                        try {
                          var n = Ee.lookupPath(e, { parent: !0 });
                          (r.parentExists = !0),
                            (r.parentPath = n.path),
                            (r.parentObject = n.node),
                            (r.name = _e.basename(e)),
                            (n = Ee.lookupPath(e, { follow: !t })),
                            (r.exists = !0),
                            (r.path = n.path),
                            (r.object = n.node),
                            (r.name = n.node.name),
                            (r.isRoot = "/" === n.path);
                        } catch (e) {
                          r.error = e.errno;
                        }
                        return r;
                      },
                      createPath: function (e, t, r, n) {
                        e = "string" == typeof e ? e : Ee.getPath(e);
                        for (var o = t.split("/").reverse(); o.length; ) {
                          var i = o.pop();
                          if (i) {
                            var s = _e.join2(e, i);
                            try {
                              Ee.mkdir(s);
                            } catch (e) {}
                            e = s;
                          }
                        }
                        return s;
                      },
                      createFile: function (e, t, r, n, o) {
                        var i = _e.join2(
                            "string" == typeof e ? e : Ee.getPath(e),
                            t
                          ),
                          s = Ee.getMode(n, o);
                        return Ee.create(i, s);
                      },
                      createDataFile: function (e, t, r, n, o, i) {
                        var s = t
                            ? _e.join2(
                                "string" == typeof e ? e : Ee.getPath(e),
                                t
                              )
                            : e,
                          a = Ee.getMode(n, o),
                          u = Ee.create(s, a);
                        if (r) {
                          if ("string" == typeof r) {
                            for (
                              var l = new Array(r.length), c = 0, f = r.length;
                              c < f;
                              ++c
                            )
                              l[c] = r.charCodeAt(c);
                            r = l;
                          }
                          Ee.chmod(u, 146 | a);
                          var d = Ee.open(u, 577);
                          Ee.write(d, r, 0, r.length, 0, i),
                            Ee.close(d),
                            Ee.chmod(u, a);
                        }
                        return u;
                      },
                      createDevice: function (e, t, r, n) {
                        var o = _e.join2(
                            "string" == typeof e ? e : Ee.getPath(e),
                            t
                          ),
                          i = Ee.getMode(!!r, !!n);
                        Ee.createDevice.major || (Ee.createDevice.major = 64);
                        var s = Ee.makedev(Ee.createDevice.major++, 0);
                        return (
                          Ee.registerDevice(s, {
                            open: function (e) {
                              e.seekable = !1;
                            },
                            close: function (e) {
                              n && n.buffer && n.buffer.length && n(10);
                            },
                            read: function (e, t, n, o, i) {
                              for (var s = 0, a = 0; a < o; a++) {
                                var u;
                                try {
                                  u = r();
                                } catch (e) {
                                  throw new Ee.ErrnoError(29);
                                }
                                if (void 0 === u && 0 === s)
                                  throw new Ee.ErrnoError(6);
                                if (null == u) break;
                                s++, (t[n + a] = u);
                              }
                              return s && (e.node.timestamp = Date.now()), s;
                            },
                            write: function (e, t, r, o, i) {
                              for (var s = 0; s < o; s++)
                                try {
                                  n(t[r + s]);
                                } catch (e) {
                                  throw new Ee.ErrnoError(29);
                                }
                              return o && (e.node.timestamp = Date.now()), s;
                            },
                          }),
                          Ee.mkdev(o, i, s)
                        );
                      },
                      forceLoadFile: function (e) {
                        if (e.isDevice || e.isFolder || e.link || e.contents)
                          return !0;
                        if ("undefined" != typeof XMLHttpRequest)
                          throw new Error(
                            "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
                          );
                        if (!l)
                          throw new Error(
                            "Cannot load without read() or XMLHttpRequest."
                          );
                        try {
                          (e.contents = Pe(l(e.url), !0)),
                            (e.usedBytes = e.contents.length);
                        } catch (e) {
                          throw new Ee.ErrnoError(29);
                        }
                      },
                      createLazyFile: function (e, t, r, n, o) {
                        function i() {
                          (this.lengthKnown = !1), (this.chunks = []);
                        }
                        if (
                          ((i.prototype.get = function (e) {
                            if (!(e > this.length - 1 || e < 0)) {
                              var t = e % this.chunkSize,
                                r = (e / this.chunkSize) | 0;
                              return this.getter(r)[t];
                            }
                          }),
                          (i.prototype.setDataGetter = function (e) {
                            this.getter = e;
                          }),
                          (i.prototype.cacheLength = function () {
                            var e = new XMLHttpRequest();
                            if (
                              (e.open("HEAD", r, !1),
                              e.send(null),
                              !(
                                (e.status >= 200 && e.status < 300) ||
                                304 === e.status
                              ))
                            )
                              throw new Error(
                                "Couldn't load " + r + ". Status: " + e.status
                              );
                            var t,
                              n = Number(e.getResponseHeader("Content-length")),
                              o =
                                (t = e.getResponseHeader("Accept-Ranges")) &&
                                "bytes" === t,
                              i =
                                (t = e.getResponseHeader("Content-Encoding")) &&
                                "gzip" === t,
                              s = 1048576;
                            o || (s = n);
                            var a = this;
                            a.setDataGetter(function (e) {
                              var t = e * s,
                                o = (e + 1) * s - 1;
                              if (
                                ((o = Math.min(o, n - 1)),
                                void 0 === a.chunks[e] &&
                                  (a.chunks[e] = (function (e, t) {
                                    if (e > t)
                                      throw new Error(
                                        "invalid range (" +
                                          e +
                                          ", " +
                                          t +
                                          ") or no bytes requested!"
                                      );
                                    if (t > n - 1)
                                      throw new Error(
                                        "only " +
                                          n +
                                          " bytes available! programmer error!"
                                      );
                                    var o = new XMLHttpRequest();
                                    if (
                                      (o.open("GET", r, !1),
                                      n !== s &&
                                        o.setRequestHeader(
                                          "Range",
                                          "bytes=" + e + "-" + t
                                        ),
                                      "undefined" != typeof Uint8Array &&
                                        (o.responseType = "arraybuffer"),
                                      o.overrideMimeType &&
                                        o.overrideMimeType(
                                          "text/plain; charset=x-user-defined"
                                        ),
                                      o.send(null),
                                      !(
                                        (o.status >= 200 && o.status < 300) ||
                                        304 === o.status
                                      ))
                                    )
                                      throw new Error(
                                        "Couldn't load " +
                                          r +
                                          ". Status: " +
                                          o.status
                                      );
                                    return void 0 !== o.response
                                      ? new Uint8Array(o.response || [])
                                      : Pe(o.responseText || "", !0);
                                  })(t, o)),
                                void 0 === a.chunks[e])
                              )
                                throw new Error("doXHR failed!");
                              return a.chunks[e];
                            }),
                              (!i && n) ||
                                ((s = n = 1),
                                (n = this.getter(0).length),
                                (s = n),
                                b(
                                  "LazyFiles on gzip forces download of the whole file when length is accessed"
                                )),
                              (this._length = n),
                              (this._chunkSize = s),
                              (this.lengthKnown = !0);
                          }),
                          "undefined" != typeof XMLHttpRequest)
                        ) {
                          if (!g)
                            throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                          var s = new i();
                          Object.defineProperties(s, {
                            length: {
                              get: function () {
                                return (
                                  this.lengthKnown || this.cacheLength(),
                                  this._length
                                );
                              },
                            },
                            chunkSize: {
                              get: function () {
                                return (
                                  this.lengthKnown || this.cacheLength(),
                                  this._chunkSize
                                );
                              },
                            },
                          });
                          var a = { isDevice: !1, contents: s };
                        } else a = { isDevice: !1, url: r };
                        var u = Ee.createFile(e, t, a, n, o);
                        a.contents
                          ? (u.contents = a.contents)
                          : a.url && ((u.contents = null), (u.url = a.url)),
                          Object.defineProperties(u, {
                            usedBytes: {
                              get: function () {
                                return this.contents.length;
                              },
                            },
                          });
                        var l = {};
                        return (
                          Object.keys(u.stream_ops).forEach(function (e) {
                            var t = u.stream_ops[e];
                            l[e] = function () {
                              return (
                                Ee.forceLoadFile(u), t.apply(null, arguments)
                              );
                            };
                          }),
                          (l.read = function (e, t, r, n, o) {
                            Ee.forceLoadFile(u);
                            var i = e.node.contents;
                            if (o >= i.length) return 0;
                            var s = Math.min(i.length - o, n);
                            if (i.slice)
                              for (var a = 0; a < s; a++) t[r + a] = i[o + a];
                            else
                              for (a = 0; a < s; a++) t[r + a] = i.get(o + a);
                            return s;
                          }),
                          (u.stream_ops = l),
                          u
                        );
                      },
                      createPreloadedFile: function (
                        e,
                        t,
                        r,
                        n,
                        o,
                        s,
                        a,
                        u,
                        l,
                        f
                      ) {
                        Browser.init();
                        var d = t ? ge.resolve(_e.join2(e, t)) : e;
                        function h(r) {
                          function c(r) {
                            f && f(),
                              u || Ee.createDataFile(e, t, r, n, o, l),
                              s && s(),
                              le();
                          }
                          var h = !1;
                          i.preloadPlugins.forEach(function (e) {
                            h ||
                              (e.canHandle(d) &&
                                (e.handle(r, d, c, function () {
                                  a && a(), le();
                                }),
                                (h = !0)));
                          }),
                            h || c(r);
                        }
                        ue(),
                          "string" == typeof r
                            ? (function (e, t, r, n) {
                                var o = "al " + e;
                                c(
                                  e,
                                  function (t) {
                                    A(
                                      t,
                                      'Loading data file "' +
                                        e +
                                        '" failed (no arrayBuffer).'
                                    ),
                                      h(new Uint8Array(t)),
                                      o && le();
                                  },
                                  function (t) {
                                    if (!r)
                                      throw (
                                        'Loading data file "' + e + '" failed.'
                                      );
                                    r();
                                  }
                                ),
                                  o && ue();
                              })(r, 0, a)
                            : h(r);
                      },
                      indexedDB: function () {
                        return (
                          window.indexedDB ||
                          window.mozIndexedDB ||
                          window.webkitIndexedDB ||
                          window.msIndexedDB
                        );
                      },
                      DB_NAME: function () {
                        return "EM_FS_" + window.location.pathname;
                      },
                      DB_VERSION: 20,
                      DB_STORE_NAME: "FILE_DATA",
                      saveFilesToDB: function (e, t, r) {
                        (t = t || function () {}), (r = r || function () {});
                        var n = Ee.indexedDB();
                        try {
                          var o = n.open(Ee.DB_NAME(), Ee.DB_VERSION);
                        } catch (e) {
                          return r(e);
                        }
                        (o.onupgradeneeded = function () {
                          b("creating db"),
                            o.result.createObjectStore(Ee.DB_STORE_NAME);
                        }),
                          (o.onsuccess = function () {
                            var n = o.result.transaction(
                                [Ee.DB_STORE_NAME],
                                "readwrite"
                              ),
                              i = n.objectStore(Ee.DB_STORE_NAME),
                              s = 0,
                              a = 0,
                              u = e.length;
                            function l() {
                              0 == a ? t() : r();
                            }
                            e.forEach(function (e) {
                              var t = i.put(
                                Ee.analyzePath(e).object.contents,
                                e
                              );
                              (t.onsuccess = function () {
                                ++s + a == u && l();
                              }),
                                (t.onerror = function () {
                                  a++, s + a == u && l();
                                });
                            }),
                              (n.onerror = r);
                          }),
                          (o.onerror = r);
                      },
                      loadFilesFromDB: function (e, t, r) {
                        (t = t || function () {}), (r = r || function () {});
                        var n = Ee.indexedDB();
                        try {
                          var o = n.open(Ee.DB_NAME(), Ee.DB_VERSION);
                        } catch (e) {
                          return r(e);
                        }
                        (o.onupgradeneeded = r),
                          (o.onsuccess = function () {
                            var n = o.result;
                            try {
                              var i = n.transaction(
                                [Ee.DB_STORE_NAME],
                                "readonly"
                              );
                            } catch (e) {
                              return void r(e);
                            }
                            var s = i.objectStore(Ee.DB_STORE_NAME),
                              a = 0,
                              u = 0,
                              l = e.length;
                            function c() {
                              0 == u ? t() : r();
                            }
                            e.forEach(function (e) {
                              var t = s.get(e);
                              (t.onsuccess = function () {
                                Ee.analyzePath(e).exists && Ee.unlink(e),
                                  Ee.createDataFile(
                                    _e.dirname(e),
                                    _e.basename(e),
                                    t.result,
                                    !0,
                                    !0,
                                    !0
                                  ),
                                  ++a + u == l && c();
                              }),
                                (t.onerror = function () {
                                  u++, a + u == l && c();
                                });
                            }),
                              (i.onerror = r);
                          }),
                          (o.onerror = r);
                      },
                    },
                    ke = {
                      mappings: {},
                      DEFAULT_POLLMASK: 5,
                      umask: 511,
                      calculateAt: function (e, t, r) {
                        if ("/" === t[0]) return t;
                        var n;
                        if (-100 === e) n = Ee.cwd();
                        else {
                          var o = Ee.getStream(e);
                          if (!o) throw new Ee.ErrnoError(8);
                          n = o.path;
                        }
                        if (0 == t.length) {
                          if (!r) throw new Ee.ErrnoError(44);
                          return n;
                        }
                        return _e.join2(n, t);
                      },
                      doStat: function (e, t, r) {
                        try {
                          var n = e(t);
                        } catch (e) {
                          if (
                            e &&
                            e.node &&
                            _e.normalize(t) !== _e.normalize(Ee.getPath(e.node))
                          )
                            return -54;
                          throw e;
                        }
                        return (
                          (N[r >> 2] = n.dev),
                          (N[(r + 4) >> 2] = 0),
                          (N[(r + 8) >> 2] = n.ino),
                          (N[(r + 12) >> 2] = n.mode),
                          (N[(r + 16) >> 2] = n.nlink),
                          (N[(r + 20) >> 2] = n.uid),
                          (N[(r + 24) >> 2] = n.gid),
                          (N[(r + 28) >> 2] = n.rdev),
                          (N[(r + 32) >> 2] = 0),
                          (te = [
                            n.size >>> 0,
                            ((ee = n.size),
                            +Math.abs(ee) >= 1
                              ? ee > 0
                                ? (0 |
                                    Math.min(
                                      +Math.floor(ee / 4294967296),
                                      4294967295
                                    )) >>>
                                  0
                                : ~~+Math.ceil(
                                    (ee - +(~~ee >>> 0)) / 4294967296
                                  ) >>> 0
                              : 0),
                          ]),
                          (N[(r + 40) >> 2] = te[0]),
                          (N[(r + 44) >> 2] = te[1]),
                          (N[(r + 48) >> 2] = 4096),
                          (N[(r + 52) >> 2] = n.blocks),
                          (N[(r + 56) >> 2] = (n.atime.getTime() / 1e3) | 0),
                          (N[(r + 60) >> 2] = 0),
                          (N[(r + 64) >> 2] = (n.mtime.getTime() / 1e3) | 0),
                          (N[(r + 68) >> 2] = 0),
                          (N[(r + 72) >> 2] = (n.ctime.getTime() / 1e3) | 0),
                          (N[(r + 76) >> 2] = 0),
                          (te = [
                            n.ino >>> 0,
                            ((ee = n.ino),
                            +Math.abs(ee) >= 1
                              ? ee > 0
                                ? (0 |
                                    Math.min(
                                      +Math.floor(ee / 4294967296),
                                      4294967295
                                    )) >>>
                                  0
                                : ~~+Math.ceil(
                                    (ee - +(~~ee >>> 0)) / 4294967296
                                  ) >>> 0
                              : 0),
                          ]),
                          (N[(r + 80) >> 2] = te[0]),
                          (N[(r + 84) >> 2] = te[1]),
                          0
                        );
                      },
                      doMsync: function (e, t, r, n, o) {
                        var i = B.slice(e, e + r);
                        Ee.msync(t, i, o, r, n);
                      },
                      doMkdir: function (e, t) {
                        return (
                          "/" === (e = _e.normalize(e))[e.length - 1] &&
                            (e = e.substr(0, e.length - 1)),
                          Ee.mkdir(e, t, 0),
                          0
                        );
                      },
                      doMknod: function (e, t, r) {
                        switch (61440 & t) {
                          case 32768:
                          case 8192:
                          case 24576:
                          case 4096:
                          case 49152:
                            break;
                          default:
                            return -28;
                        }
                        return Ee.mknod(e, t, r), 0;
                      },
                      doReadlink: function (e, t, r) {
                        if (r <= 0) return -28;
                        var n = Ee.readlink(e),
                          o = Math.min(r, $(n)),
                          i = O[t + o];
                        return G(n, t, r + 1), (O[t + o] = i), o;
                      },
                      doAccess: function (e, t) {
                        if (-8 & t) return -28;
                        var r;
                        if (!(r = Ee.lookupPath(e, { follow: !0 }).node))
                          return -44;
                        var n = "";
                        return (
                          4 & t && (n += "r"),
                          2 & t && (n += "w"),
                          1 & t && (n += "x"),
                          n && Ee.nodePermissions(r, n) ? -2 : 0
                        );
                      },
                      doDup: function (e, t, r) {
                        var n = Ee.getStream(r);
                        return n && Ee.close(n), Ee.open(e, t, 0, r, r).fd;
                      },
                      doReadv: function (e, t, r, n) {
                        for (var o = 0, i = 0; i < r; i++) {
                          var s = N[(t + 8 * i) >> 2],
                            a = N[(t + (8 * i + 4)) >> 2],
                            u = Ee.read(e, O, s, a, n);
                          if (u < 0) return -1;
                          if (((o += u), u < a)) break;
                        }
                        return o;
                      },
                      doWritev: function (e, t, r, n) {
                        for (var o = 0, i = 0; i < r; i++) {
                          var s = N[(t + 8 * i) >> 2],
                            a = N[(t + (8 * i + 4)) >> 2],
                            u = Ee.write(e, O, s, a, n);
                          if (u < 0) return -1;
                          o += u;
                        }
                        return o;
                      },
                      varargs: void 0,
                      get: function () {
                        return (ke.varargs += 4), N[(ke.varargs - 4) >> 2];
                      },
                      getStr: function (e) {
                        return V(e);
                      },
                      getStreamFromFD: function (e) {
                        var t = Ee.getStream(e);
                        if (!t) throw new Ee.ErrnoError(8);
                        return t;
                      },
                      get64: function (e, t) {
                        return e;
                      },
                    };
                  function Se(e) {
                    return (N[Re() >> 2] = e), e;
                  }
                  function qe(e) {
                    try {
                      return (
                        D.grow((e - j.byteLength + 65535) >>> 16),
                        Y(D.buffer),
                        1
                      );
                    } catch (e) {}
                  }
                  be = v
                    ? function () {
                        var e = process.hrtime();
                        return 1e3 * e[0] + e[1] / 1e6;
                      }
                    : function () {
                        return performance.now();
                      };
                  var xe = {};
                  function De() {
                    if (!De.strings) {
                      var e = {
                        USER: "web_user",
                        LOGNAME: "web_user",
                        PATH: "/",
                        PWD: "/",
                        HOME: "/home/web_user",
                        LANG:
                          (
                            ("object" == typeof navigator &&
                              navigator.languages &&
                              navigator.languages[0]) ||
                            "C"
                          ).replace("-", "_") + ".UTF-8",
                        _: m || "./this.program",
                      };
                      for (var t in xe)
                        void 0 === xe[t] ? delete e[t] : (e[t] = xe[t]);
                      var r = [];
                      for (var t in e) r.push(t + "=" + e[t]);
                      De.strings = r;
                    }
                    return De.strings;
                  }
                  var Fe = function (e, t, r, n) {
                    e || (e = this),
                      (this.parent = e),
                      (this.mount = e.mount),
                      (this.mounted = null),
                      (this.id = Ee.nextInode++),
                      (this.name = t),
                      (this.mode = r),
                      (this.node_ops = {}),
                      (this.stream_ops = {}),
                      (this.rdev = n);
                  };
                  function Pe(e, t, r) {
                    var n = r > 0 ? r : $(e) + 1,
                      o = new Array(n),
                      i = X(e, o, 0, o.length);
                    return t && (o.length = i), o;
                  }
                  Object.defineProperties(Fe.prototype, {
                    read: {
                      get: function () {
                        return 365 == (365 & this.mode);
                      },
                      set: function (e) {
                        e ? (this.mode |= 365) : (this.mode &= -366);
                      },
                    },
                    write: {
                      get: function () {
                        return 146 == (146 & this.mode);
                      },
                      set: function (e) {
                        e ? (this.mode |= 146) : (this.mode &= -147);
                      },
                    },
                    isFolder: {
                      get: function () {
                        return Ee.isDir(this.mode);
                      },
                    },
                    isDevice: {
                      get: function () {
                        return Ee.isChrdev(this.mode);
                      },
                    },
                  }),
                    (Ee.FSNode = Fe),
                    Ee.staticInit();
                  var Me,
                    Ae = {
                      a: function (e, t, r, n) {
                        ce(
                          "Assertion failed: " +
                            V(e) +
                            ", at: " +
                            [
                              t ? V(t) : "unknown filename",
                              r,
                              n ? V(n) : "unknown function",
                            ]
                        );
                      },
                      t: function (e, t) {
                        return (function (e, t) {
                          me();
                          var r = new Date(1e3 * N[e >> 2]);
                          (N[t >> 2] = r.getSeconds()),
                            (N[(t + 4) >> 2] = r.getMinutes()),
                            (N[(t + 8) >> 2] = r.getHours()),
                            (N[(t + 12) >> 2] = r.getDate()),
                            (N[(t + 16) >> 2] = r.getMonth()),
                            (N[(t + 20) >> 2] = r.getFullYear() - 1900),
                            (N[(t + 24) >> 2] = r.getDay());
                          var n = new Date(r.getFullYear(), 0, 1),
                            o = ((r.getTime() - n.getTime()) / 864e5) | 0;
                          (N[(t + 28) >> 2] = o),
                            (N[(t + 36) >> 2] = -60 * r.getTimezoneOffset());
                          var i = new Date(
                              r.getFullYear(),
                              6,
                              1
                            ).getTimezoneOffset(),
                            s = n.getTimezoneOffset(),
                            a =
                              0 |
                              (i != s &&
                                r.getTimezoneOffset() == Math.min(s, i));
                          N[(t + 32) >> 2] = a;
                          var u = N[(Ce() + (a ? 4 : 0)) >> 2];
                          return (N[(t + 40) >> 2] = u), t;
                        })(e, t);
                      },
                      G: function (e, t) {
                        try {
                          return (e = ke.getStr(e)), ke.doAccess(e, t);
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      v: function (e, t) {
                        try {
                          return (e = ke.getStr(e)), Ee.chmod(e, t), 0;
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      h: function (e, t, r) {
                        try {
                          return (e = ke.getStr(e)), Ee.chown(e, t, r), 0;
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      w: function (e, t) {
                        try {
                          return Ee.fchmod(e, t), 0;
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      i: function (e, t, r) {
                        try {
                          return Ee.fchown(e, t, r), 0;
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      b: function (e, t, r) {
                        ke.varargs = r;
                        try {
                          var n = ke.getStreamFromFD(e);
                          switch (t) {
                            case 0:
                              return (o = ke.get()) < 0
                                ? -28
                                : Ee.open(n.path, n.flags, 0, o).fd;
                            case 1:
                            case 2:
                              return 0;
                            case 3:
                              return n.flags;
                            case 4:
                              var o = ke.get();
                              return (n.flags |= o), 0;
                            case 12:
                              return (o = ke.get()), (L[(o + 0) >> 1] = 2), 0;
                            case 13:
                            case 14:
                              return 0;
                            case 16:
                            case 8:
                              return -28;
                            case 9:
                              return Se(28), -1;
                            default:
                              return -28;
                          }
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      y: function (e, t) {
                        try {
                          var r = ke.getStreamFromFD(e);
                          return ke.doStat(Ee.stat, r.path, t);
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      J: function (e, t, r, n) {
                        try {
                          var o = ke.get64(r, n);
                          return Ee.ftruncate(e, o), 0;
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      j: function (e, t) {
                        try {
                          if (0 === t) return -28;
                          var r = Ee.cwd();
                          return t < $(r) + 1 ? -68 : (G(r, e, t), e);
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      H: function () {
                        return 0;
                      },
                      d: function () {
                        return 42;
                      },
                      x: function (e, t) {
                        try {
                          return (e = ke.getStr(e)), ke.doStat(Ee.lstat, e, t);
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      z: function (e, t) {
                        try {
                          return (e = ke.getStr(e)), ke.doMkdir(e, t);
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      A: function (e, t, r, n, o, i) {
                        try {
                          return (function (e, t, r, n, o, i) {
                            var s;
                            i <<= 12;
                            var a = !1;
                            if (0 != (16 & n) && e % 65536 != 0) return -28;
                            if (0 != (32 & n)) {
                              if (!(s = ye(t))) return -48;
                              a = !0;
                            } else {
                              var u = Ee.getStream(o);
                              if (!u) return -8;
                              var l = Ee.mmap(u, e, t, i, r, n);
                              (s = l.ptr), (a = l.allocated);
                            }
                            return (
                              (ke.mappings[s] = {
                                malloc: s,
                                len: t,
                                allocated: a,
                                fd: o,
                                prot: r,
                                flags: n,
                                offset: i,
                              }),
                              s
                            );
                          })(e, t, r, n, o, i);
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      B: function (e, t) {
                        try {
                          return (function (e, t) {
                            var r = ke.mappings[e];
                            if (0 === t || !r) return -28;
                            if (t === r.len) {
                              var n = Ee.getStream(r.fd);
                              n &&
                                (2 & r.prot &&
                                  ke.doMsync(e, n, t, r.flags, r.offset),
                                Ee.munmap(n)),
                                (ke.mappings[e] = null),
                                r.allocated && Te(r.malloc);
                            }
                            return 0;
                          })(e, t);
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      D: function (e, t, r) {
                        ke.varargs = r;
                        try {
                          var n = ke.getStr(e),
                            o = r ? ke.get() : 0;
                          return Ee.open(n, t, o).fd;
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      I: function (e, t, r) {
                        try {
                          return (e = ke.getStr(e)), ke.doReadlink(e, t, r);
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      F: function (e) {
                        try {
                          return (e = ke.getStr(e)), Ee.rmdir(e), 0;
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      e: function (e, t) {
                        try {
                          return (e = ke.getStr(e)), ke.doStat(Ee.stat, e, t);
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      k: function (e) {
                        try {
                          return (e = ke.getStr(e)), Ee.unlink(e), 0;
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            -e.errno
                          );
                        }
                      },
                      u: function () {
                        return 2147483648;
                      },
                      o: function (e, t, r) {
                        B.copyWithin(e, t, t + r);
                      },
                      c: function (e) {
                        var t,
                          r = B.length,
                          n = 2147483648;
                        if ((e >>>= 0) > n) return !1;
                        for (var o = 1; o <= 4; o *= 2) {
                          var i = r * (1 + 0.2 / o);
                          if (
                            ((i = Math.min(i, e + 100663296)),
                            qe(
                              Math.min(
                                n,
                                ((t = Math.max(e, i)) % 65536 > 0 &&
                                  (t += 65536 - (t % 65536)),
                                t)
                              )
                            ))
                          )
                            return !0;
                        }
                        return !1;
                      },
                      s: function (e) {
                        for (var t = be(); be() - t < e; );
                      },
                      q: function (e, t) {
                        var r = 0;
                        return (
                          De().forEach(function (n, o) {
                            var i = t + r;
                            (N[(e + 4 * o) >> 2] = i),
                              (function (e, t, r) {
                                for (var n = 0; n < e.length; ++n)
                                  O[t++ >> 0] = e.charCodeAt(n);
                                O[t >> 0] = 0;
                              })(n, i),
                              (r += n.length + 1);
                          }),
                          0
                        );
                      },
                      r: function (e, t) {
                        var r = De();
                        N[e >> 2] = r.length;
                        var n = 0;
                        return (
                          r.forEach(function (e) {
                            n += e.length + 1;
                          }),
                          (N[t >> 2] = n),
                          0
                        );
                      },
                      f: function (e) {
                        try {
                          var t = ke.getStreamFromFD(e);
                          return Ee.close(t), 0;
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            e.errno
                          );
                        }
                      },
                      p: function (e, t) {
                        try {
                          var r = ke.getStreamFromFD(e),
                            n = r.tty
                              ? 2
                              : Ee.isDir(r.mode)
                              ? 3
                              : Ee.isLink(r.mode)
                              ? 7
                              : 4;
                          return (O[t >> 0] = n), 0;
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            e.errno
                          );
                        }
                      },
                      l: function (e, t, r, n) {
                        try {
                          var o = ke.getStreamFromFD(e),
                            i = ke.doReadv(o, t, r);
                          return (N[n >> 2] = i), 0;
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            e.errno
                          );
                        }
                      },
                      n: function (e, t, r, n, o) {
                        try {
                          var i = ke.getStreamFromFD(e),
                            s = 4294967296 * r + (t >>> 0),
                            a = 9007199254740992;
                          return s <= -a || s >= a
                            ? -61
                            : (Ee.llseek(i, s, n),
                              (te = [
                                i.position >>> 0,
                                ((ee = i.position),
                                +Math.abs(ee) >= 1
                                  ? ee > 0
                                    ? (0 |
                                        Math.min(
                                          +Math.floor(ee / 4294967296),
                                          4294967295
                                        )) >>>
                                      0
                                    : ~~+Math.ceil(
                                        (ee - +(~~ee >>> 0)) / 4294967296
                                      ) >>> 0
                                  : 0),
                              ]),
                              (N[o >> 2] = te[0]),
                              (N[(o + 4) >> 2] = te[1]),
                              i.getdents &&
                                0 === s &&
                                0 === n &&
                                (i.getdents = null),
                              0);
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            e.errno
                          );
                        }
                      },
                      m: function (e) {
                        try {
                          var t = ke.getStreamFromFD(e);
                          return t.stream_ops && t.stream_ops.fsync
                            ? -t.stream_ops.fsync(t)
                            : 0;
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            e.errno
                          );
                        }
                      },
                      E: function (e, t, r, n) {
                        try {
                          var o = ke.getStreamFromFD(e),
                            i = ke.doWritev(o, t, r);
                          return (N[n >> 2] = i), 0;
                        } catch (e) {
                          return (
                            (void 0 !== Ee && e instanceof Ee.ErrnoError) ||
                              ce(e),
                            e.errno
                          );
                        }
                      },
                      g: function (e) {
                        var t = Date.now();
                        return (
                          (N[e >> 2] = (t / 1e3) | 0),
                          (N[(e + 4) >> 2] = ((t % 1e3) * 1e3) | 0),
                          0
                        );
                      },
                      K: function (e) {
                        var t = (Date.now() / 1e3) | 0;
                        return e && (N[e >> 2] = t), t;
                      },
                      C: function (e, t) {
                        var r;
                        if (t) {
                          var n = t + 8;
                          (r = 1e3 * N[n >> 2]), (r += N[(n + 4) >> 2] / 1e3);
                        } else r = Date.now();
                        return (function (e, t) {
                          e = V(e);
                          try {
                            return Ee.utime(e, t, t), 0;
                          } catch (e) {
                            if (!(e instanceof Ee.ErrnoError))
                              throw (
                                e +
                                " : " +
                                ((r = (function () {
                                  var e = new Error();
                                  if (!e.stack) {
                                    try {
                                      throw new Error();
                                    } catch (t) {
                                      e = t;
                                    }
                                    if (!e.stack)
                                      return "(no stack trace available)";
                                  }
                                  return e.stack.toString();
                                })()),
                                i.extraStackTrace &&
                                  (r += "\n" + i.extraStackTrace()),
                                r.replace(/\b_Z[\w\d_]+/g, function (e) {
                                  return e == e ? e : e + " [" + e + "]";
                                }))
                              );
                            return Se(e.errno), -1;
                          }
                          var r;
                        })(e, r);
                      },
                    },
                    Re =
                      ((function () {
                        var e = { a: Ae };
                        function t(e, t) {
                          var r,
                            n = e.exports;
                          (i.asm = n),
                            Y((D = i.asm.L).buffer),
                            (Q = i.asm.Fa),
                            (r = i.asm.M),
                            ne.unshift(r),
                            le();
                        }
                        function r(e) {
                          t(e.instance);
                        }
                        function n(t) {
                          return (function () {
                            if (!k && (_ || g)) {
                              if ("function" == typeof fetch && !de(J))
                                return fetch(J, { credentials: "same-origin" })
                                  .then(function (e) {
                                    if (!e.ok)
                                      throw (
                                        "failed to load wasm binary file at '" +
                                        J +
                                        "'"
                                      );
                                    return e.arrayBuffer();
                                  })
                                  .catch(function () {
                                    return he(J);
                                  });
                              if (c)
                                return new Promise(function (e, t) {
                                  c(
                                    J,
                                    function (t) {
                                      e(new Uint8Array(t));
                                    },
                                    t
                                  );
                                });
                            }
                            return Promise.resolve().then(function () {
                              return he(J);
                            });
                          })()
                            .then(function (t) {
                              return WebAssembly.instantiate(t, e);
                            })
                            .then(function (e) {
                              return e;
                            })
                            .then(t, function (e) {
                              w("failed to asynchronously prepare wasm: " + e),
                                ce(e);
                            });
                        }
                        if ((ue(), i.instantiateWasm))
                          try {
                            return i.instantiateWasm(e, t);
                          } catch (e) {
                            return (
                              w(
                                "Module.instantiateWasm callback failed with error: " +
                                  e
                              ),
                              !1
                            );
                          }
                        k ||
                        "function" != typeof WebAssembly.instantiateStreaming ||
                        fe(J) ||
                        de(J) ||
                        "function" != typeof fetch
                          ? n(r)
                          : fetch(J, { credentials: "same-origin" }).then(
                              function (t) {
                                return WebAssembly.instantiateStreaming(
                                  t,
                                  e
                                ).then(r, function (e) {
                                  return (
                                    w("wasm streaming compile failed: " + e),
                                    w(
                                      "falling back to ArrayBuffer instantiation"
                                    ),
                                    n(r)
                                  );
                                });
                              }
                            );
                      })(),
                      (i.___wasm_call_ctors = function () {
                        return (i.___wasm_call_ctors = i.asm.M).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_malloc = function () {
                        return (i._sqlite3_malloc = i.asm.N).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_free = function () {
                        return (i._sqlite3_free = i.asm.O).apply(
                          null,
                          arguments
                        );
                      }),
                      (i.___errno_location = function () {
                        return (Re = i.___errno_location = i.asm.P).apply(
                          null,
                          arguments
                        );
                      })),
                    ze =
                      ((i._sqlite3_finalize = function () {
                        return (i._sqlite3_finalize = i.asm.Q).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_reset = function () {
                        return (i._sqlite3_reset = i.asm.R).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_clear_bindings = function () {
                        return (i._sqlite3_clear_bindings = i.asm.S).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_value_blob = function () {
                        return (i._sqlite3_value_blob = i.asm.T).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_value_text = function () {
                        return (i._sqlite3_value_text = i.asm.U).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_value_bytes = function () {
                        return (i._sqlite3_value_bytes = i.asm.V).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_value_double = function () {
                        return (i._sqlite3_value_double = i.asm.W).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_value_int = function () {
                        return (i._sqlite3_value_int = i.asm.X).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_value_type = function () {
                        return (i._sqlite3_value_type = i.asm.Y).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_result_blob = function () {
                        return (i._sqlite3_result_blob = i.asm.Z).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_result_double = function () {
                        return (i._sqlite3_result_double = i.asm._).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_result_error = function () {
                        return (i._sqlite3_result_error = i.asm.$).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_result_int = function () {
                        return (i._sqlite3_result_int = i.asm.aa).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_result_int64 = function () {
                        return (i._sqlite3_result_int64 = i.asm.ba).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_result_null = function () {
                        return (i._sqlite3_result_null = i.asm.ca).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_result_text = function () {
                        return (i._sqlite3_result_text = i.asm.da).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_step = function () {
                        return (i._sqlite3_step = i.asm.ea).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_column_count = function () {
                        return (i._sqlite3_column_count = i.asm.fa).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_data_count = function () {
                        return (i._sqlite3_data_count = i.asm.ga).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_column_blob = function () {
                        return (i._sqlite3_column_blob = i.asm.ha).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_column_bytes = function () {
                        return (i._sqlite3_column_bytes = i.asm.ia).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_column_double = function () {
                        return (i._sqlite3_column_double = i.asm.ja).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_column_text = function () {
                        return (i._sqlite3_column_text = i.asm.ka).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_column_type = function () {
                        return (i._sqlite3_column_type = i.asm.la).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_column_name = function () {
                        return (i._sqlite3_column_name = i.asm.ma).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_bind_blob = function () {
                        return (i._sqlite3_bind_blob = i.asm.na).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_bind_double = function () {
                        return (i._sqlite3_bind_double = i.asm.oa).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_bind_int = function () {
                        return (i._sqlite3_bind_int = i.asm.pa).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_bind_text = function () {
                        return (i._sqlite3_bind_text = i.asm.qa).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_bind_parameter_index = function () {
                        return (i._sqlite3_bind_parameter_index =
                          i.asm.ra).apply(null, arguments);
                      }),
                      (i._sqlite3_sql = function () {
                        return (i._sqlite3_sql = i.asm.sa).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_normalized_sql = function () {
                        return (i._sqlite3_normalized_sql = i.asm.ta).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_errmsg = function () {
                        return (i._sqlite3_errmsg = i.asm.ua).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_exec = function () {
                        return (i._sqlite3_exec = i.asm.va).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_prepare_v2 = function () {
                        return (i._sqlite3_prepare_v2 = i.asm.wa).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_create_module_v2 = function () {
                        return (i._sqlite3_create_module_v2 = i.asm.xa).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_declare_vtab = function () {
                        return (i._sqlite3_declare_vtab = i.asm.ya).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_changes = function () {
                        return (i._sqlite3_changes = i.asm.za).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_close_v2 = function () {
                        return (i._sqlite3_close_v2 = i.asm.Aa).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_create_function_v2 = function () {
                        return (i._sqlite3_create_function_v2 = i.asm.Ba).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._sqlite3_open = function () {
                        return (i._sqlite3_open = i.asm.Ca).apply(
                          null,
                          arguments
                        );
                      }),
                      (i._malloc = function () {
                        return (ze = i._malloc = i.asm.Da).apply(
                          null,
                          arguments
                        );
                      })),
                    Te = (i._free = function () {
                      return (Te = i._free = i.asm.Ea).apply(null, arguments);
                    }),
                    Ce =
                      ((i._RegisterExtensionFunctions = function () {
                        return (i._RegisterExtensionFunctions = i.asm.Ga).apply(
                          null,
                          arguments
                        );
                      }),
                      (i.__get_tzname = function () {
                        return (Ce = i.__get_tzname = i.asm.Ha).apply(
                          null,
                          arguments
                        );
                      })),
                    je = (i.__get_daylight = function () {
                      return (je = i.__get_daylight = i.asm.Ia).apply(
                        null,
                        arguments
                      );
                    }),
                    Oe = (i.__get_timezone = function () {
                      return (Oe = i.__get_timezone = i.asm.Ja).apply(
                        null,
                        arguments
                      );
                    }),
                    Be = (i.stackSave = function () {
                      return (Be = i.stackSave = i.asm.Ka).apply(
                        null,
                        arguments
                      );
                    }),
                    Le = (i.stackRestore = function () {
                      return (Le = i.stackRestore = i.asm.La).apply(
                        null,
                        arguments
                      );
                    }),
                    Ne = (i.stackAlloc = function () {
                      return (Ne = i.stackAlloc = i.asm.Ma).apply(
                        null,
                        arguments
                      );
                    }),
                    He = (i._memalign = function () {
                      return (He = i._memalign = i.asm.Na).apply(
                        null,
                        arguments
                      );
                    });
                  function Ie(e) {
                    function t() {
                      Me ||
                        ((Me = !0),
                        (i.calledRun = !0),
                        M ||
                          (i.noFSInit || Ee.init.initialized || Ee.init(),
                          (Ee.ignorePermissions = !1),
                          ve.init(),
                          pe(ne),
                          i.onRuntimeInitialized && i.onRuntimeInitialized(),
                          (function () {
                            if (i.postRun)
                              for (
                                "function" == typeof i.postRun &&
                                (i.postRun = [i.postRun]);
                                i.postRun.length;

                              )
                                (e = i.postRun.shift()), oe.unshift(e);
                            var e;
                            pe(oe);
                          })()));
                    }
                    (e = e || p),
                      ie > 0 ||
                        ((function () {
                          if (i.preRun)
                            for (
                              "function" == typeof i.preRun &&
                              (i.preRun = [i.preRun]);
                              i.preRun.length;

                            )
                              (e = i.preRun.shift()), re.unshift(e);
                          var e;
                          pe(re);
                        })(),
                        ie > 0 ||
                          (i.setStatus
                            ? (i.setStatus("Running..."),
                              setTimeout(function () {
                                setTimeout(function () {
                                  i.setStatus("");
                                }, 1),
                                  t();
                              }, 1))
                            : t()));
                  }
                  if (
                    ((i.ccall = z),
                    (i.cwrap = function (e, t, r, n) {
                      var o = (r = r || []).every(function (e) {
                        return "number" === e;
                      });
                      return "string" !== t && o && !n
                        ? R(e)
                        : function () {
                            return z(e, t, r, arguments);
                          };
                    }),
                    (i.setValue = F),
                    (i.getValue = P),
                    (i.UTF8ToString = V),
                    (i.stringToUTF8 = G),
                    (i.lengthBytesUTF8 = $),
                    (i.addFunction = x),
                    (i.stackSave = Be),
                    (i.stackRestore = Le),
                    (i.stackAlloc = Ne),
                    (ae = function e() {
                      Me || Ie(), Me || (ae = e);
                    }),
                    (i.run = Ie),
                    i.preInit)
                  )
                    for (
                      "function" == typeof i.preInit &&
                      (i.preInit = [i.preInit]);
                      i.preInit.length > 0;

                    )
                      i.preInit.pop()();
                  return Ie(), i;
                }))
              );
            };
          (e.exports = o), (e.exports.default = o);
        },
        720: (e, t, r) => {
          "use strict";
          e.exports = r.p + "sql-wasm.wasm";
        },
        821: () => {},
        905: () => {},
        101: () => {},
      },
      __webpack_module_cache__ = {};
    function __webpack_require__(e) {
      var t = __webpack_module_cache__[e];
      if (void 0 !== t) return t.exports;
      var r = (__webpack_module_cache__[e] = {
        id: e,
        loaded: !1,
        exports: {},
      });
      return (
        __webpack_modules__[e].call(
          r.exports,
          r,
          r.exports,
          __webpack_require__
        ),
        (r.loaded = !0),
        r.exports
      );
    }
    (__webpack_require__.d = (e, t) => {
      for (var r in t)
        __webpack_require__.o(t, r) &&
          !__webpack_require__.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
      (__webpack_require__.o = (e, t) =>
        Object.prototype.hasOwnProperty.call(e, t)),
      (__webpack_require__.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (__webpack_require__.nmd = (e) => (
        (e.paths = []), e.children || (e.children = []), e
      )),
      (__webpack_require__.p = "");
    var __webpack_exports__ = __webpack_require__(630);
    return __webpack_exports__;
  })();
});
//# sourceMappingURL=sqlite.worker.js.map
