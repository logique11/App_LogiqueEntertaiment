/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(
        exports,
        require("@tensorflow/tfjs-core"),
        require("@tensorflow/tfjs-converter")
      )
    : "function" == typeof define && define.amd
    ? define(
        ["exports", "@tensorflow/tfjs-core", "@tensorflow/tfjs-converter"],
        e
      )
    : e((t.bodyPix = {}), t.tf, t.tf);
})(this, function (t, e, n) {
  "use strict";
  var r = function (t, e) {
    return (r =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (t, e) {
          t.__proto__ = e;
        }) ||
      function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
  };
  function o(t, e) {
    function n() {
      this.constructor = t;
    }
    r(t, e),
      (t.prototype =
        null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
  }
  var i = function () {
    return (i =
      Object.assign ||
      function (t) {
        for (var e, n = 1, r = arguments.length; n < r; n++)
          for (var o in (e = arguments[n]))
            Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        return t;
      }).apply(this, arguments);
  };
  function a(t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function a(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }
      function s(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }
      function u(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(a, s);
      }
      u((r = r.apply(t, e || [])).next());
    });
  }
  function s(t, e) {
    var n,
      r,
      o,
      i,
      a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: s(0), throw: s(1), return: s(2) }),
      "function" == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function s(i) {
      return function (s) {
        return (function (i) {
          if (n) throw new TypeError("Generator is already executing.");
          for (; a; )
            try {
              if (
                ((n = 1),
                r &&
                  (o =
                    2 & i[0]
                      ? r.return
                      : i[0]
                      ? r.throw || ((o = r.return) && o.call(r), 0)
                      : r.next) &&
                  !(o = o.call(r, i[1])).done)
              )
                return o;
              switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, { value: i[1], done: !1 };
                case 5:
                  a.label++, (r = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !(o = (o = a.trys).length > 0 && o[o.length - 1]) &&
                    (6 === i[0] || 2 === i[0])
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                    a.label = i[1];
                    break;
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    (a.label = o[1]), (o = i);
                    break;
                  }
                  if (o && a.label < o[2]) {
                    (a.label = o[2]), a.ops.push(i);
                    break;
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              i = e.call(t, a);
            } catch (t) {
              (i = [6, t]), (r = 0);
            } finally {
              n = o = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, s]);
      };
    }
  }
  function u(t) {
    var n = t.shape[2],
      r = e.argMax(t, 2),
      o = e.reshape(r, [-1]);
    return e.oneHot(o, n);
  }
  function f(t, n) {
    return e.tidy(function () {
      return e.cast(e.greater(t, e.scalar(n)), "int32");
    });
  }
  function d(t, n) {
    var r = n.shape,
      o = r[0],
      i = r[1],
      a = r[2];
    return e.tidy(function () {
      var r,
        s,
        f = u(n),
        d = e.expandDims(e.range(0, a, 1, "int32"), 1),
        l = e.cast(e.matMul(f, d), "int32"),
        c = e.reshape(l, [o, i]),
        h = e.add(c, e.scalar(1, "int32"));
      return e.sub(((r = h), (s = t), e.mul(r, s)), e.scalar(1, "int32"));
    });
  }
  var l = (function () {
      function t(t, n) {
        (this.model = t), (this.outputStride = n);
        var r = this.model.inputs[0].shape;
        e.util.assert(-1 === r[1] && -1 === r[2], function () {
          return (
            "Input shape [" +
            r[1] +
            ", " +
            r[2] +
            "] must both be equal to or -1"
          );
        });
      }
      return (
        (t.prototype.predict = function (t) {
          var n = this;
          return e.tidy(function () {
            var r = n.preprocessInput(e.cast(t, "float32")),
              o = e.expandDims(r, 0),
              i = n.model.predict(o).map(function (t) {
                return e.squeeze(t, [0]);
              }),
              a = n.nameOutputResults(i);
            return {
              heatmapScores: e.sigmoid(a.heatmap),
              offsets: a.offsets,
              displacementFwd: a.displacementFwd,
              displacementBwd: a.displacementBwd,
              segmentation: a.segmentation,
              partHeatmaps: a.partHeatmaps,
              longOffsets: a.longOffsets,
              partOffsets: a.partOffsets,
            };
          });
        }),
        (t.prototype.dispose = function () {
          this.model.dispose();
        }),
        t
      );
    })(),
    c = (function (t) {
      function n() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        o(n, t),
        (n.prototype.preprocessInput = function (t) {
          return e.tidy(function () {
            return e.sub(e.div(t, 127.5), 1);
          });
        }),
        (n.prototype.nameOutputResults = function (t) {
          return {
            offsets: t[0],
            segmentation: t[1],
            partHeatmaps: t[2],
            longOffsets: t[3],
            heatmap: t[4],
            displacementFwd: t[5],
            displacementBwd: t[6],
            partOffsets: t[7],
          };
        }),
        n
      );
    })(l),
    h = [
      "nose",
      "leftEye",
      "rightEye",
      "leftEar",
      "rightEar",
      "leftShoulder",
      "rightShoulder",
      "leftElbow",
      "rightElbow",
      "leftWrist",
      "rightWrist",
      "leftHip",
      "rightHip",
      "leftKnee",
      "rightKnee",
      "leftAnkle",
      "rightAnkle",
    ],
    p = h.length,
    m = h.reduce(function (t, e, n) {
      return (t[e] = n), t;
    }, {});
  [
    ["leftHip", "leftShoulder"],
    ["leftElbow", "leftShoulder"],
    ["leftElbow", "leftWrist"],
    ["leftHip", "leftKnee"],
    ["leftKnee", "leftAnkle"],
    ["rightHip", "rightShoulder"],
    ["rightElbow", "rightShoulder"],
    ["rightElbow", "rightWrist"],
    ["rightHip", "rightKnee"],
    ["rightKnee", "rightAnkle"],
    ["leftShoulder", "rightShoulder"],
    ["leftHip", "rightHip"],
  ].map(function (t) {
    var e = t[0],
      n = t[1];
    return [m[e], m[n]];
  });
  function g(t, e, n) {
    var r = t[0],
      o = t[1],
      i = e[0],
      a = e[1],
      s = n.top,
      u = n.bottom;
    return [a / (n.left + n.right + o), i / (s + u + r)];
  }
  function v(t, e, n, r) {
    return { y: r.get(t, e, n), x: r.get(t, e, n + p) };
  }
  function w(t, e, n) {
    var r = v(t.heatmapY, t.heatmapX, t.id, n),
      o = r.y,
      i = r.x;
    return { x: t.heatmapX * e + i, y: t.heatmapY * e + o };
  }
  function y(t, e, n) {
    return t < e ? e : t > n ? n : t;
  }
  function b(t, e) {
    return { x: t.x + e.x, y: t.y + e.y };
  }
  function x(t, e, n) {
    void 0 === n && (n = 0.3);
    for (var r = 0, o = 0, i = 0; i < t.length; i++)
      e.keypoints[i].score > n &&
        ((o += 1),
        (r +=
          Math.pow(t[i].x - e.keypoints[i].position.x, 2) +
          Math.pow(t[i].y - e.keypoints[i].position.y, 2)));
    return 0 === o ? (r = 1 / 0) : (r /= o), r;
  }
  function S(t, e, n, r, o, i, a) {
    for (
      var s = a[0],
        u = a[1],
        f = n(t),
        d = f.y * r + f.x,
        l = o[p * (2 * d) + e],
        c = o[p * (2 * d + 1) + e],
        h = t.y + l,
        m = t.x + c,
        g = 0;
      g < i;
      g++
    ) {
      h = Math.min(h, s - 1);
      var v = n({ x: (m = Math.min(m, u - 1)), y: h }),
        w = v.y * r + v.x;
      (h += l = o[p * (2 * w) + e]), (m += c = o[p * (2 * w + 1) + e]);
    }
    return { x: m, y: h };
  }
  function k(t, e, n, r, o, i, a, s, u, f) {
    for (
      var d = o[0],
        l = o[1],
        c = i[0],
        h = i[1],
        p = s[0],
        m = s[1],
        g = [],
        v = function (t) {
          return (function (t, e, n, r) {
            var o = e[0],
              i = e[1],
              a = n[0],
              s = n[1],
              u = Math.round(((o + t.y + 1) * s - 1) / r);
            return { x: Math.round(((i + t.x + 1) * a - 1) / r), y: u };
          })(t, [d, l], [c, h], u);
        },
        w = 0;
      w < r;
      w++
    ) {
      var y = S(t, w, v, a, e, f, [p, m]);
      g.push(y);
    }
    for (var b = -1, k = 1 / 0, M = 0; M < n.length; M++) {
      var E = x(g, n[M]);
      E < k && ((b = M), (k = E));
    }
    return b;
  }
  function M(t, e) {
    var n = t[0],
      r = t[1];
    return [Math.round((r - 1) / e + 1), Math.round((n - 1) / e + 1)];
  }
  function E(t, n, r, o, i, a, s, u, f, d, l) {
    for (
      var c = s[0],
        h = s[1],
        m = t.shape,
        v = m[0],
        w = m[1],
        y = n.shape.slice(0, 2),
        b = y[0],
        x = y[1],
        S = e.reshape(n, [b, x, 2, p]),
        k = new Float32Array(l * p * 3).fill(0),
        M = 0;
      M < r.length;
      M++
    )
      for (var E = M * p * 3, _ = r[M], O = 0; O < p; O++) {
        var P = _.keypoints[O],
          A = E + 3 * O;
        (k[A] = P.score), (k[A + 1] = P.position.y), (k[A + 2] = P.position.x);
      }
    var I = g([o, i], [c, h], u),
      R = I[0],
      H = I[1],
      T = e.tensor(k, [l, p, 3]),
      B = u.top,
      F = u.left,
      D = {
        variableNames: ["segmentation", "longOffsets", "poses"],
        outputShape: [v, w],
        userCode:
          "\n    int convertToPositionInOutput(int pos, int pad, float scale, int stride) {\n      return round(((float(pos + pad) + 1.0) * scale - 1.0) / float(stride));\n    }\n\n    float convertToPositionInOutputFloat(\n        int pos, int pad, float scale, int stride) {\n      return ((float(pos + pad) + 1.0) * scale - 1.0) / float(stride);\n    }\n\n    float dist(float x1, float y1, float x2, float y2) {\n      return pow(x1 - x2, 2.0) + pow(y1 - y2, 2.0);\n    }\n\n    float sampleLongOffsets(float h, float w, int d, int k) {\n      float fh = fract(h);\n      float fw = fract(w);\n      int clH = int(ceil(h));\n      int clW = int(ceil(w));\n      int flH = int(floor(h));\n      int flW = int(floor(w));\n      float o11 = getLongOffsets(flH, flW, d, k);\n      float o12 = getLongOffsets(flH, clW, d, k);\n      float o21 = getLongOffsets(clH, flW, d, k);\n      float o22 = getLongOffsets(clH, clW, d, k);\n      float o1 = mix(o11, o12, fw);\n      float o2 = mix(o21, o22, fw);\n      return mix(o1, o2, fh);\n    }\n\n    int findNearestPose(int h, int w) {\n      float prob = getSegmentation(h, w);\n      if (prob < 1.0) {\n        return -1;\n      }\n\n      // Done(Tyler): convert from output space h/w to strided space.\n      float stridedH = convertToPositionInOutputFloat(\n        h, " +
          B +
          ", " +
          H +
          ", " +
          a +
          ");\n      float stridedW = convertToPositionInOutputFloat(\n        w, " +
          F +
          ", " +
          R +
          ", " +
          a +
          ");\n\n      float minDist = 1000000.0;\n      int iMin = -1;\n      for (int i = 0; i < " +
          l +
          "; i++) {\n        float curDistSum = 0.0;\n        int numKpt = 0;\n        for (int k = 0; k < " +
          p +
          "; k++) {\n          float dy = sampleLongOffsets(stridedH, stridedW, 0, k);\n          float dx = sampleLongOffsets(stridedH, stridedW, 1, k);\n\n          float y = float(h) + dy;\n          float x = float(w) + dx;\n\n          for (int s = 0; s < " +
          f +
          "; s++) {\n            int yRounded = round(min(y, float(" +
          (o - 1) +
          ")));\n            int xRounded = round(min(x, float(" +
          (i - 1) +
          ")));\n\n            float yStrided = convertToPositionInOutputFloat(\n              yRounded, " +
          B +
          ", " +
          H +
          ", " +
          a +
          ");\n            float xStrided = convertToPositionInOutputFloat(\n              xRounded, " +
          F +
          ", " +
          R +
          ", " +
          a +
          ");\n\n            float dy = sampleLongOffsets(yStrided, xStrided, 0, k);\n            float dx = sampleLongOffsets(yStrided, xStrided, 1, k);\n\n            y = y + dy;\n            x = x + dx;\n          }\n\n          float poseScore = getPoses(i, k, 0);\n          float poseY = getPoses(i, k, 1);\n          float poseX = getPoses(i, k, 2);\n          if (poseScore > " +
          d +
          ") {\n            numKpt = numKpt + 1;\n            curDistSum = curDistSum + dist(x, y, poseX, poseY);\n          }\n        }\n        if (numKpt > 0 && curDistSum / float(numKpt) < minDist) {\n          minDist = curDistSum / float(numKpt);\n          iMin = i;\n        }\n      }\n      return iMin;\n    }\n\n    void main() {\n        ivec2 coords = getOutputCoords();\n        int nearestPose = findNearestPose(coords[0], coords[1]);\n        setOutput(float(nearestPose));\n      }\n  ",
      };
    return e.backend().compileAndRun(D, [t, S, T]);
  }
  function _() {
    return "webgl" === e.getBackend();
  }
  function O(t, n, r, o, i, u, f, d, l, c, h, p) {
    var m = f[0],
      v = f[1];
    return (
      void 0 === l && (l = 0.2),
      void 0 === c && (c = 8),
      void 0 === h && (h = 0.3),
      void 0 === p && (p = 10),
      a(this, void 0, void 0, function () {
        var a, f, w, y, b;
        return s(this, function (s) {
          switch (s.label) {
            case 0:
              return (
                (a = r.filter(function (t) {
                  return t.score >= l;
                })),
                _()
                  ? ((w = e.tidy(function () {
                      var r = E(t, n, a, o, i, u, [m, v], d, c, h, p),
                        s = e
                          .engine()
                          .makeTensorFromDataId(r.dataId, r.shape, r.dtype);
                      return a.map(function (t, n) {
                        return (function (t, n) {
                          return e.tidy(function () {
                            return e.cast(e.equal(t, e.scalar(n)), "int32");
                          });
                        })(s, n);
                      });
                    })),
                    [
                      4,
                      Promise.all(
                        w.map(function (t) {
                          return t.data();
                        })
                      ),
                    ])
                  : [3, 2]
              );
            case 1:
              return (
                (f = s.sent()),
                w.forEach(function (t) {
                  return t.dispose();
                }),
                [3, 5]
              );
            case 2:
              return [4, t.data()];
            case 3:
              return (y = s.sent()), [4, n.data()];
            case 4:
              (b = s.sent()),
                (f = (function (t, e, n, r, o, i, a, s, u, f) {
                  var d = a[0],
                    l = a[1];
                  void 0 === f && (f = 5);
                  for (
                    var c = n.map(function (t) {
                        return new Uint8Array(r * o).fill(0);
                      }),
                      h = s.top,
                      p = s.left,
                      m = g([r, o], [d, l], s),
                      v = m[0],
                      w = m[1],
                      y = M([d, l], i)[0],
                      b = 0;
                    b < r;
                    b += 1
                  )
                    for (var x = 0; x < o; x += 1) {
                      var S = b * o + x;
                      if (1 === t[S]) {
                        var E = k(
                          { x: x, y: b },
                          e,
                          n,
                          f,
                          [h, p],
                          [v, w],
                          y,
                          [r, o],
                          i,
                          u
                        );
                        E >= 0 && (c[E][S] = 1);
                      }
                    }
                  return c;
                })(y, b, a, o, i, u, [m, v], d, c)),
                (s.label = 5);
            case 5:
              return [
                2,
                f.map(function (t, e) {
                  return { data: t, pose: a[e], width: i, height: o };
                }),
              ];
          }
        });
      })
    );
  }
  function P(t, n, r, o, i, u, f, d, l, c, h, p, m) {
    var v = d[0],
      w = d[1];
    return (
      void 0 === c && (c = 0.2),
      void 0 === h && (h = 8),
      void 0 === p && (p = 0.3),
      void 0 === m && (m = 10),
      a(this, void 0, void 0, function () {
        var a, d, y, b, x, S;
        return s(this, function (s) {
          switch (s.label) {
            case 0:
              return (
                (a = o.filter(function (t) {
                  return t.score >= c;
                })),
                _()
                  ? ((y = e.tidy(function () {
                      var o = E(t, n, a, i, u, f, [v, w], l, h, p, m),
                        s = e
                          .engine()
                          .makeTensorFromDataId(o.dataId, o.shape, o.dtype);
                      return a.map(function (t, n) {
                        return (function (t, n, r) {
                          return e.tidy(function () {
                            return e.sub(
                              e.mul(
                                e.cast(e.equal(t, e.scalar(r)), "int32"),
                                e.add(n, 1)
                              ),
                              1
                            );
                          });
                        })(s, r, n);
                      });
                    })),
                    [
                      4,
                      Promise.all(
                        y.map(function (t) {
                          return t.data();
                        })
                      ),
                    ])
                  : [3, 2]
              );
            case 1:
              return (
                (d = s.sent()),
                y.forEach(function (t) {
                  return t.dispose();
                }),
                [3, 6]
              );
            case 2:
              return [4, t.data()];
            case 3:
              return (b = s.sent()), [4, n.data()];
            case 4:
              return (x = s.sent()), [4, r.data()];
            case 5:
              (S = s.sent()),
                (d = (function (t, e, n, r, o, i, a, s, u, f, d) {
                  var l = s[0],
                    c = s[1];
                  void 0 === d && (d = 5);
                  for (
                    var h = r.map(function (t) {
                        return new Int32Array(o * i).fill(-1);
                      }),
                      p = u.top,
                      m = u.left,
                      v = g([o, i], [l, c], u),
                      w = v[0],
                      y = v[1],
                      b = M([l, c], a)[0],
                      x = 0;
                    x < o;
                    x += 1
                  )
                    for (var S = 0; S < i; S += 1) {
                      var E = x * i + S;
                      if (1 === t[E]) {
                        var _ = k(
                          { x: S, y: x },
                          e,
                          r,
                          d,
                          [p, m],
                          [w, y],
                          b,
                          [o, i],
                          a,
                          f
                        );
                        _ >= 0 && (h[_][E] = n[E]);
                      }
                    }
                  return h;
                })(b, x, S, a, i, u, f, [v, w], l, h)),
                (s.label = 6);
            case 6:
              return [
                2,
                d.map(function (t, e) {
                  return { pose: a[e], data: t, height: i, width: u };
                }),
              ];
          }
        });
      })
    );
  }
  function A(t) {
    return Math.floor(t / 2);
  }
  var I = (function () {
    function t(t, e) {
      (this.priorityQueue = new Array(t)),
        (this.numberOfElements = -1),
        (this.getElementValue = e);
    }
    return (
      (t.prototype.enqueue = function (t) {
        (this.priorityQueue[++this.numberOfElements] = t),
          this.swim(this.numberOfElements);
      }),
      (t.prototype.dequeue = function () {
        var t = this.priorityQueue[0];
        return (
          this.exchange(0, this.numberOfElements--),
          this.sink(0),
          (this.priorityQueue[this.numberOfElements + 1] = null),
          t
        );
      }),
      (t.prototype.empty = function () {
        return -1 === this.numberOfElements;
      }),
      (t.prototype.size = function () {
        return this.numberOfElements + 1;
      }),
      (t.prototype.all = function () {
        return this.priorityQueue.slice(0, this.numberOfElements + 1);
      }),
      (t.prototype.max = function () {
        return this.priorityQueue[0];
      }),
      (t.prototype.swim = function (t) {
        for (; t > 0 && this.less(A(t), t); )
          this.exchange(t, A(t)), (t = A(t));
      }),
      (t.prototype.sink = function (t) {
        for (; 2 * t <= this.numberOfElements; ) {
          var e = 2 * t;
          if (
            (e < this.numberOfElements && this.less(e, e + 1) && e++,
            !this.less(t, e))
          )
            break;
          this.exchange(t, e), (t = e);
        }
      }),
      (t.prototype.getValueAt = function (t) {
        return this.getElementValue(this.priorityQueue[t]);
      }),
      (t.prototype.less = function (t, e) {
        return this.getValueAt(t) < this.getValueAt(e);
      }),
      (t.prototype.exchange = function (t, e) {
        var n = this.priorityQueue[t];
        (this.priorityQueue[t] = this.priorityQueue[e]),
          (this.priorityQueue[e] = n);
      }),
      t
    );
  })();
  function R(t, e, n, r, o, i) {
    for (
      var a = i.shape,
        s = a[0],
        u = a[1],
        f = !0,
        d = Math.max(n - o, 0),
        l = Math.min(n + o + 1, s),
        c = d;
      c < l;
      ++c
    ) {
      for (
        var h = Math.max(r - o, 0), p = Math.min(r + o + 1, u), m = h;
        m < p;
        ++m
      )
        if (i.get(c, m, t) > e) {
          f = !1;
          break;
        }
      if (!f) break;
    }
    return f;
  }
  var H = [
      ["nose", "leftEye"],
      ["leftEye", "leftEar"],
      ["nose", "rightEye"],
      ["rightEye", "rightEar"],
      ["nose", "leftShoulder"],
      ["leftShoulder", "leftElbow"],
      ["leftElbow", "leftWrist"],
      ["leftShoulder", "leftHip"],
      ["leftHip", "leftKnee"],
      ["leftKnee", "leftAnkle"],
      ["nose", "rightShoulder"],
      ["rightShoulder", "rightElbow"],
      ["rightElbow", "rightWrist"],
      ["rightShoulder", "rightHip"],
      ["rightHip", "rightKnee"],
      ["rightKnee", "rightAnkle"],
    ].map(function (t) {
      var e = t[0],
        n = t[1];
      return [m[e], m[n]];
    }),
    T = H.map(function (t) {
      return t[1];
    }),
    B = H.map(function (t) {
      return t[0];
    });
  function F(t, e, n, r) {
    return {
      y: y(Math.round(t.y / e), 0, n - 1),
      x: y(Math.round(t.x / e), 0, r - 1),
    };
  }
  function D(t, e, n, r, o, i, a, s) {
    void 0 === s && (s = 2);
    for (
      var u = r.shape,
        f = u[0],
        d = u[1],
        l = (function (t, e, n) {
          var r = n.shape[2] / 2;
          return { y: n.get(e.y, e.x, t), x: n.get(e.y, e.x, r + t) };
        })(t, F(e.position, i, f, d), a),
        c = b(e.position, l),
        p = 0;
      p < s;
      p++
    ) {
      var m = F(c, i, f, d),
        g = v(m.y, m.x, n, o);
      c = b({ x: m.x * i, y: m.y * i }, { x: g.x, y: g.y });
    }
    var w = F(c, i, f, d),
      y = r.get(w.y, w.x, n);
    return { position: c, part: h[n], score: y };
  }
  function C(t, e, n, r, o, i) {
    var a = e.shape[2],
      s = T.length,
      u = new Array(a),
      f = t.part,
      d = t.score,
      l = w(f, r, n);
    u[f.id] = { score: d, part: h[f.id], position: l };
    for (var c = s - 1; c >= 0; --c) {
      var p = T[c],
        m = B[c];
      u[p] && !u[m] && (u[m] = D(c, u[p], m, e, n, r, i));
    }
    for (c = 0; c < s; ++c) {
      (p = B[c]), (m = T[c]);
      u[p] && !u[m] && (u[m] = D(c, u[p], m, e, n, r, o));
    }
    return u;
  }
  function L(t, e, n, r) {
    var o = n.x,
      i = n.y;
    return t.some(function (t) {
      var n,
        a,
        s,
        u,
        f,
        d,
        l = t.keypoints[r].position;
      return (
        (n = i),
        (a = o),
        (s = l.y),
        (u = l.x),
        (f = s - n) * f + (d = u - a) * d <= e
      );
    });
  }
  function q(t, e, n) {
    return (
      n.reduce(function (n, r, o) {
        var i = r.position,
          a = r.score;
        return L(t, e, i, o) || (n += a), n;
      }, 0) / n.length
    );
  }
  var W = 1;
  function z(t, e, n, r, o, i, a, s) {
    void 0 === a && (a = 0.5), void 0 === s && (s = 20);
    for (
      var u = [],
        f = (function (t, e, n) {
          for (
            var r = n.shape,
              o = r[0],
              i = r[1],
              a = r[2],
              s = new I(o * i * a, function (t) {
                return t.score;
              }),
              u = 0;
            u < o;
            ++u
          )
            for (var f = 0; f < i; ++f)
              for (var d = 0; d < a; ++d) {
                var l = n.get(u, f, d);
                l < t ||
                  (R(d, l, u, f, e, n) &&
                    s.enqueue({
                      score: l,
                      part: { heatmapY: u, heatmapX: f, id: d },
                    }));
              }
          return s;
        })(a, W, t),
        d = s * s;
      u.length < i && !f.empty();

    ) {
      var l = f.dequeue();
      if (!L(u, d, w(l.part, o, e), l.part.id)) {
        var c = C(l, t, e, o, n, r),
          h = q(u, d, c);
        u.push({ keypoints: c, score: h });
      }
    }
    return u;
  }
  var K,
    j = [-123.15, -115.9, -103.06],
    N = (function (t) {
      function n() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        o(n, t),
        (n.prototype.preprocessInput = function (t) {
          return e.add(t, j);
        }),
        (n.prototype.nameOutputResults = function (t) {
          var e = t[0],
            n = t[1],
            r = t[2],
            o = t[3],
            i = t[4],
            a = t[5];
          return {
            offsets: i,
            segmentation: t[6],
            partHeatmaps: a,
            longOffsets: o,
            heatmap: r,
            displacementFwd: n,
            displacementBwd: e,
            partOffsets: t[7],
          };
        }),
        n
      );
    })(l),
    V =
      "https://storage.googleapis.com/tfjs-models/savedmodel/bodypix/resnet50/",
    Q =
      "https://storage.googleapis.com/tfjs-models/savedmodel/bodypix/mobilenet/";
  function U(t) {
    if (
      ("undefined" != typeof HTMLCanvasElement &&
        t instanceof HTMLCanvasElement) ||
      ("undefined" != typeof OffscreenCanvas && t instanceof OffscreenCanvas) ||
      ("undefined" != typeof HTMLImageElement && t instanceof HTMLImageElement)
    )
      return (function (t) {
        if (
          "offsetHeight" in t &&
          0 !== t.offsetHeight &&
          "offsetWidth" in t &&
          0 !== t.offsetWidth
        )
          return [t.offsetHeight, t.offsetWidth];
        if (null != t.height && null != t.width) return [t.height, t.width];
        throw new Error(
          "HTMLImageElement must have height and width attributes set."
        );
      })(t);
    if ("undefined" != typeof ImageData && t instanceof ImageData)
      return [t.height, t.width];
    if ("undefined" != typeof HTMLVideoElement && t instanceof HTMLVideoElement)
      return (function (t) {
        return t.hasAttribute("height") && t.hasAttribute("width")
          ? [t.height, t.width]
          : [t.videoHeight, t.videoWidth];
      })(t);
    if (t instanceof e.Tensor) return [t.shape[0], t.shape[1]];
    throw new Error("error: Unknown input type: " + t + ".");
  }
  function X(t, e) {
    return (function (t, e) {
      return (t - 1) % e == 0;
    })(t, e)
      ? t
      : Math.floor(t / e) * e + 1;
  }
  var Y = { low: "low", medium: "medium", high: "high", full: "full" },
    G =
      (((K = {})[Y.low] = 0.25),
      (K[Y.medium] = 0.5),
      (K[Y.high] = 0.75),
      (K[Y.full] = 1),
      K),
    J = 0.1,
    Z = 2;
  function $(t, n, r) {
    var o = r[0],
      i = r[1],
      a = (function (t) {
        if ("string" == typeof t) {
          var n = G[t];
          return (
            e.util.assert("number" == typeof n, function () {
              return (
                "string value of inputResolution must be one of " +
                Object.values(Y).join(",") +
                " but was " +
                t +
                "."
              );
            }),
            n
          );
        }
        return (
          e.util.assert("number" == typeof t && t <= Z && t >= J, function () {
            return (
              "inputResolution must be a string or number between " +
              J +
              " and " +
              Z +
              ", but was " +
              t
            );
          }),
          t
        );
      })(t);
    return [X(o * a, n), X(i * a, n)];
  }
  function tt(t, n, r, o, i) {
    var a = n[0],
      s = n[1],
      u = r[0],
      f = r[1],
      d = o[0],
      l = d[0],
      c = d[1],
      h = o[1],
      p = h[0],
      m = h[1];
    return (
      void 0 === i && (i = !1),
      e.tidy(function () {
        var n = e.image.resizeBilinear(t, [u, f], !0);
        return (
          i && (n = e.sigmoid(n)),
          (function (t, n, r) {
            var o = n[0],
              i = n[1],
              a = r[0],
              s = a[0],
              u = a[1],
              f = r[1],
              d = f[0],
              l = f[1];
            return e.tidy(function () {
              var n = e.expandDims(t);
              return e.squeeze(
                e.image.cropAndResize(
                  n,
                  [
                    [
                      s / (o + s + u - 1),
                      d / (i + d + l - 1),
                      (s + o - 1) / (o + s + u - 1),
                      (d + i - 1) / (i + d + l - 1),
                    ],
                  ],
                  [0],
                  [o, i]
                ),
                [0]
              );
            });
          })(
            n,
            [a, s],
            [
              [l, c],
              [p, m],
            ]
          )
        );
      })
    );
  }
  function et(t, n) {
    var r = n[0],
      o = n[1],
      i = U(t),
      a = i[0],
      s = i[1],
      u = o / r,
      f = [0, 0, 0, 0],
      d = f[0],
      l = f[1],
      c = f[2],
      h = f[3];
    return (
      s / a < u
        ? ((d = 0),
          (l = 0),
          (c = Math.round(0.5 * (u * a - s))),
          (h = Math.round(0.5 * (u * a - s))))
        : ((d = Math.round(0.5 * ((1 / u) * s - a))),
          (l = Math.round(0.5 * ((1 / u) * s - a))),
          (c = 0),
          (h = 0)),
      {
        resized: e.tidy(function () {
          var n = (function (t) {
            return t instanceof e.Tensor ? t : e.browser.fromPixels(t);
          })(t);
          return (
            (n = e.pad3d(n, [
              [d, l],
              [c, h],
              [0, 0],
            ])),
            e.image.resizeBilinear(n, [r, o])
          );
        }),
        padding: { top: d, left: c, right: h, bottom: l },
      }
    );
  }
  function nt(t) {
    return a(this, void 0, void 0, function () {
      return s(this, function (e) {
        return [
          2,
          Promise.all(
            t.map(function (t) {
              return t.buffer();
            })
          ),
        ];
      });
    });
  }
  function rt(t, e) {
    return {
      score: t.score,
      keypoints: t.keypoints.map(function (t) {
        var n = t.score,
          r = t.part,
          o = t.position;
        return { score: n, part: r, position: { x: e - 1 - o.x, y: o.y } };
      }),
    };
  }
  function ot(t, e, n, r, o) {
    var i = e[0],
      a = e[1],
      s = n[0],
      u = n[1],
      f = (function (t, e, n, r, o) {
        return (
          void 0 === r && (r = 0),
          void 0 === o && (o = 0),
          1 === n && 1 === e && 0 === r && 0 === o
            ? t
            : t.map(function (t) {
                return (function (t, e, n, r, o) {
                  return (
                    void 0 === r && (r = 0),
                    void 0 === o && (o = 0),
                    {
                      score: t.score,
                      keypoints: t.keypoints.map(function (t) {
                        var i = t.score,
                          a = t.part,
                          s = t.position;
                        return {
                          score: i,
                          part: a,
                          position: { x: s.x * n + o, y: s.y * e + r },
                        };
                      }),
                    }
                  );
                })(t, e, n, r, o);
              })
        );
      })(
        t,
        (i + r.top + r.bottom) / s,
        (a + r.left + r.right) / u,
        -r.top,
        -r.left
      );
    return o
      ? (function (t, e) {
          return e <= 0
            ? t
            : t.map(function (t) {
                return rt(t, e);
              });
        })(f, a)
      : f;
  }
  var it = {
      architecture: "MobileNetV1",
      outputStride: 16,
      quantBytes: 4,
      multiplier: 0.75,
    },
    at = ["MobileNetV1", "ResNet50"],
    st = { MobileNetV1: [8, 16, 32], ResNet50: [32, 16] },
    ut = { MobileNetV1: [0.5, 0.75, 1], ResNet50: [1] },
    ft = [1, 2, 4];
  var dt = {
      flipHorizontal: !1,
      internalResolution: "medium",
      segmentationThreshold: 0.7,
      maxDetections: 10,
      scoreThreshold: 0.4,
      nmsRadius: 20,
    },
    lt = {
      flipHorizontal: !1,
      internalResolution: "medium",
      segmentationThreshold: 0.7,
      maxDetections: 10,
      scoreThreshold: 0.4,
      nmsRadius: 20,
      minKeypointScore: 0.3,
      refineSteps: 10,
    };
  function ct(t) {
    var e = t.segmentationThreshold,
      n = t.maxDetections,
      r = t.scoreThreshold,
      o = t.nmsRadius;
    if (e < 0 || e > 1)
      throw new Error(
        "segmentationThreshold " + e + ". Should be in range [0.0, 1.0]"
      );
    if (n <= 0)
      throw new Error("Invalid maxDetections " + n + ". Should be > 0");
    if (r < 0 || r > 1)
      throw new Error(
        "Invalid scoreThreshold " + r + ". Should be in range [0.0, 1.0]"
      );
    if (o <= 0) throw new Error("Invalid nmsRadius " + o + ".");
  }
  function ht(t) {
    var e = t.segmentationThreshold,
      n = t.maxDetections,
      r = t.scoreThreshold,
      o = t.nmsRadius,
      i = t.minKeypointScore,
      a = t.refineSteps;
    if (e < 0 || e > 1)
      throw new Error(
        "segmentationThreshold " + e + ". Should be in range [0.0, 1.0]"
      );
    if (n <= 0)
      throw new Error("Invalid maxDetections " + n + ". Should be > 0");
    if (r < 0 || r > 1)
      throw new Error(
        "Invalid scoreThreshold " + r + ". Should be in range [0.0, 1.0]"
      );
    if (o <= 0) throw new Error("Invalid nmsRadius " + o + ".");
    if (i < 0 || i > 1)
      throw new Error(
        "Invalid minKeypointScore " + i + ".Should be in range [0.0, 1.0]"
      );
    if (a <= 0 || a > 20)
      throw new Error(
        "Invalid refineSteps " + a + ".Should be in range [1, 20]"
      );
  }
  var pt = (function () {
    function t(t) {
      this.baseModel = t;
    }
    return (
      (t.prototype.predictForPersonSegmentation = function (t) {
        var e = this.baseModel.predict(t);
        return {
          segmentLogits: e.segmentation,
          heatmapScores: e.heatmapScores,
          offsets: e.offsets,
          displacementFwd: e.displacementFwd,
          displacementBwd: e.displacementBwd,
        };
      }),
      (t.prototype.predictForPersonSegmentationAndPart = function (t) {
        var e = this.baseModel.predict(t);
        return {
          segmentLogits: e.segmentation,
          partHeatmapLogits: e.partHeatmaps,
          heatmapScores: e.heatmapScores,
          offsets: e.offsets,
          displacementFwd: e.displacementFwd,
          displacementBwd: e.displacementBwd,
        };
      }),
      (t.prototype.predictForMultiPersonInstanceSegmentationAndPart = function (
        t
      ) {
        var e = this.baseModel.predict(t);
        return {
          segmentLogits: e.segmentation,
          longOffsets: e.longOffsets,
          heatmapScores: e.heatmapScores,
          offsets: e.offsets,
          displacementFwd: e.displacementFwd,
          displacementBwd: e.displacementBwd,
          partHeatmaps: e.partHeatmaps,
        };
      }),
      (t.prototype.segmentPersonActivation = function (t, n, r) {
        var o = this;
        void 0 === r && (r = 0.5);
        var i = U(t),
          a = i[0],
          s = i[1],
          u = $(n, this.baseModel.outputStride, [a, s]),
          d = et(t, u),
          l = d.resized,
          c = d.padding,
          h = e.tidy(function () {
            var t = o.predictForPersonSegmentation(l),
              n = t.segmentLogits,
              i = t.heatmapScores,
              u = t.offsets,
              d = t.displacementFwd,
              h = t.displacementBwd,
              p = l.shape,
              m = p[0],
              g = p[1],
              v = tt(
                n,
                [a, s],
                [m, g],
                [
                  [c.top, c.bottom],
                  [c.left, c.right],
                ],
                !0
              );
            return {
              segmentation: f(e.squeeze(v), r),
              heatmapScores: i,
              offsets: u,
              displacementFwd: d,
              displacementBwd: h,
            };
          }),
          p = h.segmentation,
          m = h.heatmapScores,
          g = h.offsets,
          v = h.displacementFwd,
          w = h.displacementBwd;
        return (
          l.dispose(),
          {
            segmentation: p,
            heatmapScores: m,
            offsets: g,
            displacementFwd: v,
            displacementBwd: w,
            padding: c,
            internalResolutionHeightAndWidth: u,
          }
        );
      }),
      (t.prototype.segmentPerson = function (t, e) {
        return (
          void 0 === e && (e = dt),
          a(this, void 0, void 0, function () {
            var n, r, o, a, u, f, d, l, c, h, p, m, g, v, w, y, b, x;
            return s(this, function (s) {
              switch (s.label) {
                case 0:
                  return (
                    ct((e = i(i({}, dt), e))),
                    (n = this.segmentPersonActivation(
                      t,
                      e.internalResolution,
                      e.segmentationThreshold
                    )),
                    (r = n.segmentation),
                    (o = n.heatmapScores),
                    (a = n.offsets),
                    (u = n.displacementFwd),
                    (f = n.displacementBwd),
                    (d = n.padding),
                    (l = n.internalResolutionHeightAndWidth),
                    (c = r.shape),
                    (h = c[0]),
                    (p = c[1]),
                    [4, r.data()]
                  );
                case 1:
                  return (m = s.sent()), r.dispose(), [4, nt([o, a, u, f])];
                case 2:
                  return (
                    (g = s.sent()),
                    (v = g[0]),
                    (w = g[1]),
                    (y = g[2]),
                    (b = g[3]),
                    (x = ot(
                      (x = z(
                        v,
                        w,
                        y,
                        b,
                        this.baseModel.outputStride,
                        e.maxDetections,
                        e.scoreThreshold,
                        e.nmsRadius
                      )),
                      [h, p],
                      l,
                      d,
                      !1
                    )),
                    o.dispose(),
                    a.dispose(),
                    u.dispose(),
                    f.dispose(),
                    [2, { height: h, width: p, data: m, allPoses: x }]
                  );
              }
            });
          })
        );
      }),
      (t.prototype.segmentMultiPerson = function (t, n) {
        return (
          void 0 === n && (n = lt),
          a(this, void 0, void 0, function () {
            var r,
              o,
              a,
              u,
              d,
              l,
              c,
              h,
              p,
              m,
              g,
              v,
              w,
              y,
              b,
              x,
              S,
              k,
              M,
              E,
              _,
              P = this;
            return s(this, function (s) {
              switch (s.label) {
                case 0:
                  return (
                    ht((n = i(i({}, lt), n))),
                    (r = U(t)),
                    (o = r[0]),
                    (a = r[1]),
                    (u = $(n.internalResolution, this.baseModel.outputStride, [
                      o,
                      a,
                    ])),
                    (d = et(t, u)),
                    (l = d.resized),
                    (c = d.padding),
                    (h = e.tidy(function () {
                      var t,
                        r =
                          P.predictForMultiPersonInstanceSegmentationAndPart(l),
                        i = r.segmentLogits,
                        s = r.longOffsets,
                        d = r.heatmapScores,
                        h = r.offsets,
                        p = r.displacementFwd,
                        m = r.displacementBwd,
                        g = tt(
                          i,
                          [o, a],
                          u,
                          [
                            [c.top, c.bottom],
                            [c.left, c.right],
                          ],
                          !0
                        );
                      return (
                        (t = s),
                        {
                          segmentation: f(
                            e.squeeze(g),
                            n.segmentationThreshold
                          ),
                          longOffsets: t,
                          heatmapScoresRaw: d,
                          offsetsRaw: h,
                          displacementFwdRaw: p,
                          displacementBwdRaw: m,
                        }
                      );
                    })),
                    (p = h.segmentation),
                    (m = h.longOffsets),
                    (g = h.heatmapScoresRaw),
                    (v = h.offsetsRaw),
                    (w = h.displacementFwdRaw),
                    (y = h.displacementBwdRaw),
                    [4, nt([g, v, w, y])]
                  );
                case 1:
                  return (
                    (b = s.sent()),
                    (x = b[0]),
                    (S = b[1]),
                    (k = b[2]),
                    (M = b[3]),
                    (E = ot(
                      (E = z(
                        x,
                        S,
                        k,
                        M,
                        this.baseModel.outputStride,
                        n.maxDetections,
                        n.scoreThreshold,
                        n.nmsRadius
                      )),
                      [o, a],
                      u,
                      c,
                      !1
                    )),
                    [
                      4,
                      O(
                        p,
                        m,
                        E,
                        o,
                        a,
                        this.baseModel.outputStride,
                        u,
                        c,
                        n.scoreThreshold,
                        n.refineSteps,
                        n.minKeypointScore,
                        n.maxDetections
                      ),
                    ]
                  );
                case 2:
                  return (
                    (_ = s.sent()),
                    l.dispose(),
                    p.dispose(),
                    m.dispose(),
                    g.dispose(),
                    v.dispose(),
                    w.dispose(),
                    y.dispose(),
                    [2, _]
                  );
              }
            });
          })
        );
      }),
      (t.prototype.segmentPersonPartsActivation = function (t, n, r) {
        var o = this;
        void 0 === r && (r = 0.5);
        var i = U(t),
          a = i[0],
          s = i[1],
          u = $(n, this.baseModel.outputStride, [a, s]),
          l = et(t, u),
          c = l.resized,
          h = l.padding,
          p = e.tidy(function () {
            var t = o.predictForPersonSegmentationAndPart(c),
              n = t.segmentLogits,
              i = t.partHeatmapLogits,
              u = t.heatmapScores,
              l = t.offsets,
              p = t.displacementFwd,
              m = t.displacementBwd,
              g = c.shape,
              v = g[0],
              w = g[1],
              y = tt(
                n,
                [a, s],
                [v, w],
                [
                  [h.top, h.bottom],
                  [h.left, h.right],
                ],
                !0
              ),
              b = tt(
                i,
                [a, s],
                [v, w],
                [
                  [h.top, h.bottom],
                  [h.left, h.right],
                ],
                !0
              );
            return {
              partSegmentation: d(f(e.squeeze(y), r), b),
              heatmapScores: u,
              offsets: l,
              displacementFwd: p,
              displacementBwd: m,
            };
          }),
          m = p.partSegmentation,
          g = p.heatmapScores,
          v = p.offsets,
          w = p.displacementFwd,
          y = p.displacementBwd;
        return (
          c.dispose(),
          {
            partSegmentation: m,
            heatmapScores: g,
            offsets: v,
            displacementFwd: w,
            displacementBwd: y,
            padding: h,
            internalResolutionHeightAndWidth: u,
          }
        );
      }),
      (t.prototype.segmentPersonParts = function (t, e) {
        return (
          void 0 === e && (e = dt),
          a(this, void 0, void 0, function () {
            var n, r, o, a, u, f, d, l, c, h, p, m, g, v, w, y, b, x;
            return s(this, function (s) {
              switch (s.label) {
                case 0:
                  return (
                    ct((e = i(i({}, dt), e))),
                    (n = this.segmentPersonPartsActivation(
                      t,
                      e.internalResolution,
                      e.segmentationThreshold
                    )),
                    (r = n.partSegmentation),
                    (o = n.heatmapScores),
                    (a = n.offsets),
                    (u = n.displacementFwd),
                    (f = n.displacementBwd),
                    (d = n.padding),
                    (l = n.internalResolutionHeightAndWidth),
                    (c = r.shape),
                    (h = c[0]),
                    (p = c[1]),
                    [4, r.data()]
                  );
                case 1:
                  return (m = s.sent()), r.dispose(), [4, nt([o, a, u, f])];
                case 2:
                  return (
                    (g = s.sent()),
                    (v = g[0]),
                    (w = g[1]),
                    (y = g[2]),
                    (b = g[3]),
                    (x = ot(
                      (x = z(
                        v,
                        w,
                        y,
                        b,
                        this.baseModel.outputStride,
                        e.maxDetections,
                        e.scoreThreshold,
                        e.nmsRadius
                      )),
                      [h, p],
                      l,
                      d,
                      !1
                    )),
                    o.dispose(),
                    a.dispose(),
                    u.dispose(),
                    f.dispose(),
                    [2, { height: h, width: p, data: m, allPoses: x }]
                  );
              }
            });
          })
        );
      }),
      (t.prototype.segmentMultiPersonParts = function (t, n) {
        return (
          void 0 === n && (n = lt),
          a(this, void 0, void 0, function () {
            var r,
              o,
              a,
              d,
              l,
              c,
              h,
              p,
              m,
              g,
              v,
              w,
              y,
              b,
              x,
              S,
              k,
              M,
              E,
              _,
              O,
              A,
              I = this;
            return s(this, function (s) {
              switch (s.label) {
                case 0:
                  return (
                    ht((n = i(i({}, lt), n))),
                    (r = U(t)),
                    (o = r[0]),
                    (a = r[1]),
                    (d = $(n.internalResolution, this.baseModel.outputStride, [
                      o,
                      a,
                    ])),
                    (l = et(t, d)),
                    (c = l.resized),
                    (h = l.padding),
                    (p = e.tidy(function () {
                      var t =
                          I.predictForMultiPersonInstanceSegmentationAndPart(c),
                        r = t.segmentLogits,
                        i = t.longOffsets,
                        s = t.heatmapScores,
                        l = t.offsets,
                        p = t.displacementFwd,
                        m = t.displacementBwd,
                        g = t.partHeatmaps,
                        v = tt(
                          r,
                          [o, a],
                          d,
                          [
                            [h.top, h.bottom],
                            [h.left, h.right],
                          ],
                          !0
                        ),
                        w = tt(
                          g,
                          [o, a],
                          d,
                          [
                            [h.top, h.bottom],
                            [h.left, h.right],
                          ],
                          !0
                        ),
                        y = i;
                      return {
                        segmentation: f(e.squeeze(v), n.segmentationThreshold),
                        longOffsets: y,
                        heatmapScoresRaw: s,
                        offsetsRaw: l,
                        displacementFwdRaw: p,
                        displacementBwdRaw: m,
                        partSegmentation: (function (t) {
                          var n = t.shape,
                            r = n[0],
                            o = n[1],
                            i = n[2];
                          return e.tidy(function () {
                            var n = u(t),
                              a = e.expandDims(e.range(0, i, 1, "int32"), 1),
                              s = e.cast(e.matMul(n, a), "int32");
                            return e.reshape(s, [r, o]);
                          });
                        })(w),
                      };
                    })),
                    (m = p.segmentation),
                    (g = p.longOffsets),
                    (v = p.heatmapScoresRaw),
                    (w = p.offsetsRaw),
                    (y = p.displacementFwdRaw),
                    (b = p.displacementBwdRaw),
                    (x = p.partSegmentation),
                    [4, nt([v, w, y, b])]
                  );
                case 1:
                  return (
                    (S = s.sent()),
                    (k = S[0]),
                    (M = S[1]),
                    (E = S[2]),
                    (_ = S[3]),
                    (O = ot(
                      (O = z(
                        k,
                        M,
                        E,
                        _,
                        this.baseModel.outputStride,
                        n.maxDetections,
                        n.scoreThreshold,
                        n.nmsRadius
                      )),
                      [o, a],
                      d,
                      h,
                      !1
                    )),
                    [
                      4,
                      P(
                        m,
                        g,
                        x,
                        O,
                        o,
                        a,
                        this.baseModel.outputStride,
                        d,
                        h,
                        n.scoreThreshold,
                        n.refineSteps,
                        n.minKeypointScore,
                        n.maxDetections
                      ),
                    ]
                  );
                case 2:
                  return (
                    (A = s.sent()),
                    c.dispose(),
                    m.dispose(),
                    g.dispose(),
                    v.dispose(),
                    w.dispose(),
                    y.dispose(),
                    b.dispose(),
                    x.dispose(),
                    [2, A]
                  );
              }
            });
          })
        );
      }),
      (t.prototype.dispose = function () {
        this.baseModel.dispose();
      }),
      t
    );
  })();
  function mt(t) {
    return a(this, void 0, void 0, function () {
      var r, o, i, a, u, f;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            if (
              ((r = t.outputStride),
              (o = t.quantBytes),
              (i = t.multiplier),
              null == e)
            )
              throw new Error(
                "Cannot find TensorFlow.js. If you are using a <script> tag, please also include @tensorflow/tfjs on the page before using this\n        model."
              );
            return (
              (a = (function (t, e, n) {
                var r = { 1: "100", 0.75: "075", 0.5: "050" },
                  o = "model-stride" + t + ".json";
                return 4 === n
                  ? Q + "float/" + r[e] + "/" + o
                  : Q + "quant" + n + "/" + r[e] + "/" + o;
              })(r, i, o)),
              [4, n.loadGraphModel(t.modelUrl || a)]
            );
          case 1:
            return (u = s.sent()), (f = new c(u, r)), [2, new pt(f)];
        }
      });
    });
  }
  function gt(t) {
    return a(this, void 0, void 0, function () {
      var r, o, i, a, u;
      return s(this, function (s) {
        switch (s.label) {
          case 0:
            if (((r = t.outputStride), (o = t.quantBytes), null == e))
              throw new Error(
                "Cannot find TensorFlow.js. If you are using a <script> tag, please also include @tensorflow/tfjs on the page before using this\n        model."
              );
            return (
              (i = (function (t, e) {
                var n = "model-stride" + t + ".json";
                return 4 === e ? V + "float/" + n : V + "quant" + e + "/" + n;
              })(r, o)),
              [4, n.loadGraphModel(t.modelUrl || i)]
            );
          case 1:
            return (a = s.sent()), (u = new N(a, r)), [2, new pt(u)];
        }
      });
    });
  }
  var vt = {};
  function wt(t, e, n, r) {
    var o = t.width,
      i = t.height,
      a = e.width,
      s = e.height;
    if (o !== a || i !== s)
      throw new Error(
        "error: dimensions must match. " +
          n +
          " has dimensions " +
          o +
          "x" +
          i +
          ", " +
          r +
          " has dimensions " +
          a +
          "x" +
          s
      );
  }
  function yt(t) {
    var e = t.getContext("2d");
    e.scale(-1, 1), e.translate(-t.width, 0);
  }
  function bt(t, e, n) {
    (t.globalCompositeOperation = n), t.drawImage(e, 0, 0);
  }
  function xt(t) {
    return (
      vt[t] ||
        (vt[t] = (function () {
          if ("undefined" != typeof document)
            return document.createElement("canvas");
          if ("undefined" != typeof OffscreenCanvas)
            return new OffscreenCanvas(0, 0);
          throw new Error("Cannot create a canvas in this context");
        })()),
      vt[t]
    );
  }
  function St(t, e, n) {
    var r = t.height,
      o = t.width,
      i = n.getContext("2d");
    (n.width = o),
      (n.height = r),
      i.clearRect(0, 0, o, r),
      i.save(),
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        ? (function (t, e, n) {
            for (
              var r = t.getContext("2d"),
                o = 0,
                i = 1 / (2 * Math.PI * 5 * 5),
                a = n < 3 ? 1 : 2,
                s = -n;
              s <= n;
              s += a
            )
              for (var u = -n; u <= n; u += a)
                o += i * Math.exp(-(u * u + s * s) / 50);
            for (s = -n; s <= n; s += a)
              for (u = -n; u <= n; u += a)
                (r.globalAlpha =
                  ((i * Math.exp(-(u * u + s * s) / 50)) / o) * n),
                  r.drawImage(e, u, s);
            r.globalAlpha = 1;
          })(n, t, e)
        : ((i.filter = "blur(" + e + "px)"), i.drawImage(t, 0, 0, o, r)),
      i.restore();
  }
  function kt(t, e, n) {
    var r = xt(n);
    return (
      0 === e
        ? (function (t, e) {
            var n = t.width,
              r = t.height;
            (e.width = n),
              (e.height = r),
              e.getContext("2d").drawImage(t, 0, 0, n, r);
          })(t, r)
        : St(t, e, r),
      r
    );
  }
  function Mt(t, e) {
    var n = xt(e);
    return (
      (function (t, e) {
        (e.width = t.width),
          (e.height = t.height),
          e.getContext("2d").putImageData(t, 0, 0);
      })(t, n),
      n
    );
  }
  function Et(t, e, n, r, o) {
    if (
      (void 0 === e && (e = { r: 0, g: 0, b: 0, a: 0 }),
      void 0 === n && (n = { r: 0, g: 0, b: 0, a: 255 }),
      void 0 === r && (r = !1),
      void 0 === o && (o = [1]),
      Array.isArray(t) && 0 === t.length)
    )
      return null;
    var i,
      a = (i = Array.isArray(t) ? t : [t])[0],
      s = a.width,
      u = a.height,
      f = new Uint8ClampedArray(s * u * 4);
    function d(t, e, n, r, o, i) {
      void 0 === i && (i = { r: 0, g: 255, b: 255, a: 255 });
      for (var a = -o; a <= o; a++)
        for (var s = -o; s <= o; s++)
          if (0 !== a && 0 !== s) {
            var u = (e + a) * r + (n + s);
            (t[4 * u + 0] = i.r),
              (t[4 * u + 1] = i.g),
              (t[4 * u + 2] = i.b),
              (t[4 * u + 3] = i.a);
          }
    }
    function l(t, e, n, r, o, i) {
      void 0 === o && (o = [1]), void 0 === i && (i = 1);
      for (var a = 0, s = -i; s <= i; s++)
        for (
          var u = function (i) {
              if (0 !== s && 0 !== i) {
                var u = (e + s) * r + (n + i);
                o.some(function (e) {
                  return e === t[u];
                }) || (a += 1);
              }
            },
            f = -i;
          f <= i;
          f++
        )
          u(f);
      return a > 0;
    }
    for (var c = 0; c < u; c += 1)
      for (
        var h = function (t) {
            var a = c * s + t;
            (f[4 * a + 0] = n.r),
              (f[4 * a + 1] = n.g),
              (f[4 * a + 2] = n.b),
              (f[4 * a + 3] = n.a);
            for (
              var h = function (n) {
                  if (
                    o.some(function (t) {
                      return t === i[n].data[a];
                    })
                  ) {
                    (f[4 * a] = e.r),
                      (f[4 * a + 1] = e.g),
                      (f[4 * a + 2] = e.b),
                      (f[4 * a + 3] = e.a);
                    var h = l(i[n].data, c, t, s, o);
                    r &&
                      c - 1 >= 0 &&
                      c + 1 < u &&
                      t - 1 >= 0 &&
                      t + 1 < s &&
                      h &&
                      d(f, c, t, s, 1);
                  }
                },
                p = 0;
              p < i.length;
              p++
            )
              h(p);
          },
          p = 0;
        p < s;
        p += 1
      )
        h(p);
    return new ImageData(f, s, u);
  }
  var _t = [
    [110, 64, 170],
    [143, 61, 178],
    [178, 60, 178],
    [210, 62, 167],
    [238, 67, 149],
    [255, 78, 125],
    [255, 94, 99],
    [255, 115, 75],
    [255, 140, 56],
    [239, 167, 47],
    [217, 194, 49],
    [194, 219, 64],
    [175, 240, 91],
    [135, 245, 87],
    [96, 247, 96],
    [64, 243, 115],
    [40, 234, 141],
    [28, 219, 169],
    [26, 199, 194],
    [33, 176, 213],
    [47, 150, 224],
    [65, 125, 224],
    [84, 101, 214],
    [99, 81, 195],
  ];
  var Ot = {
    blurred: "blurred",
    blurredMask: "blurred-mask",
    mask: "mask",
    lowresPartMask: "lowres-part-mask",
  };
  (t.BodyPix = pt),
    (t.load = function (t) {
      return (
        void 0 === t && (t = it),
        a(this, void 0, void 0, function () {
          return s(this, function (e) {
            return "ResNet50" ===
              (t = (function (t) {
                if (
                  (null == (t = t || it).architecture &&
                    (t.architecture = "MobileNetV1"),
                  at.indexOf(t.architecture) < 0)
                )
                  throw new Error(
                    "Invalid architecture " +
                      t.architecture +
                      ". Should be one of " +
                      at
                  );
                if (
                  (null == t.outputStride && (t.outputStride = 16),
                  st[t.architecture].indexOf(t.outputStride) < 0)
                )
                  throw new Error(
                    "Invalid outputStride " +
                      t.outputStride +
                      ". Should be one of " +
                      st[t.architecture] +
                      " for architecture " +
                      t.architecture +
                      "."
                  );
                if (
                  (null == t.multiplier && (t.multiplier = 1),
                  ut[t.architecture].indexOf(t.multiplier) < 0)
                )
                  throw new Error(
                    "Invalid multiplier " +
                      t.multiplier +
                      ". Should be one of " +
                      ut[t.architecture] +
                      " for architecture " +
                      t.architecture +
                      "."
                  );
                if (
                  (null == t.quantBytes && (t.quantBytes = 4),
                  ft.indexOf(t.quantBytes) < 0)
                )
                  throw new Error(
                    "Invalid quantBytes " +
                      t.quantBytes +
                      ". Should be one of " +
                      ft +
                      " for architecture " +
                      t.architecture +
                      "."
                  );
                return t;
              })(t)).architecture
              ? [2, gt(t)]
              : "MobileNetV1" === t.architecture
              ? [2, mt(t)]
              : [2, null];
          });
        })
      );
    }),
    (t.blurBodyPart = function (t, e, n, r, o, i, a) {
      void 0 === r && (r = [0, 1]),
        void 0 === o && (o = 3),
        void 0 === i && (i = 3),
        void 0 === a && (a = !1);
      var s = kt(e, o, Ot.blurred);
      (t.width = s.width), (t.height = s.height);
      var u = t.getContext("2d");
      if (Array.isArray(n) && 0 === n.length) u.drawImage(s, 0, 0);
      else {
        var f = (function (t, e, n) {
          var r = Mt(
            Et(
              t,
              { r: 0, g: 0, b: 0, a: 0 },
              { r: 0, g: 0, b: 0, a: 255 },
              !0,
              e
            ),
            Ot.mask
          );
          return 0 === n ? r : kt(r, n, Ot.blurredMask);
        })(n, r, i);
        u.save(), a && yt(t);
        var d = U(e),
          l = d[0],
          c = d[1];
        u.drawImage(e, 0, 0, c, l),
          bt(u, f, "destination-in"),
          bt(u, s, "destination-over"),
          u.restore();
      }
    }),
    (t.drawBokehEffect = function (t, e, n, r, o, i) {
      void 0 === r && (r = 3),
        void 0 === o && (o = 3),
        void 0 === i && (i = !1);
      var a = kt(e, r, Ot.blurred);
      (t.width = a.width), (t.height = a.height);
      var s = t.getContext("2d");
      if (Array.isArray(n) && 0 === n.length) s.drawImage(a, 0, 0);
      else {
        var u = (function (t, e) {
          var n = Mt(
            Et(t, { r: 0, g: 0, b: 0, a: 255 }, { r: 0, g: 0, b: 0, a: 0 }),
            Ot.mask
          );
          return 0 === e ? n : kt(n, e, Ot.blurredMask);
        })(n, o);
        s.save(), i && yt(t);
        var f = U(e),
          d = f[0],
          l = f[1];
        s.drawImage(e, 0, 0, l, d),
          bt(s, u, "destination-in"),
          bt(s, a, "destination-over"),
          s.restore();
      }
    }),
    (t.drawMask = function (t, e, n, r, o, i) {
      void 0 === r && (r = 0.7),
        void 0 === o && (o = 0),
        void 0 === i && (i = !1);
      var a = U(e),
        s = a[0],
        u = a[1];
      (t.width = u), (t.height = s);
      var f = t.getContext("2d");
      if (
        (f.save(), i && yt(t), f.drawImage(e, 0, 0), (f.globalAlpha = r), n)
      ) {
        wt({ width: u, height: s }, n, "image", "mask");
        var d = kt(Mt(n, Ot.mask), o, Ot.blurredMask);
        f.drawImage(d, 0, 0, u, s);
      }
      f.restore();
    }),
    (t.drawPixelatedMask = function (t, e, n, r, o, i, a) {
      void 0 === r && (r = 0.7),
        void 0 === o && (o = 0),
        void 0 === i && (i = !1),
        void 0 === a && (a = 10);
      var s = U(e),
        u = s[0];
      wt({ width: s[1], height: u }, n, "image", "mask");
      var f = kt(Mt(n, Ot.mask), o, Ot.blurredMask);
      (t.width = f.width), (t.height = f.height);
      var d = t.getContext("2d");
      d.save(), i && yt(t);
      var l = xt(Ot.lowresPartMask),
        c = l.getContext("2d");
      (l.width = f.width * (1 / a)),
        (l.height = f.height * (1 / a)),
        c.drawImage(f, 0, 0, f.width, f.height, 0, 0, l.width, l.height),
        (d.imageSmoothingEnabled = !1),
        d.drawImage(l, 0, 0, l.width, l.height, 0, 0, t.width, t.height);
      for (var h = 0; h < l.width; h++)
        d.beginPath(),
          (d.strokeStyle = "#ffffff"),
          d.moveTo(a * h, 0),
          d.lineTo(a * h, t.height),
          d.stroke();
      for (h = 0; h < l.height; h++)
        d.beginPath(),
          (d.strokeStyle = "#ffffff"),
          d.moveTo(0, a * h),
          d.lineTo(t.width, a * h),
          d.stroke();
      (d.globalAlpha = 1 - r),
        d.drawImage(e, 0, 0, f.width, f.height),
        d.restore();
    }),
    (t.toColoredPartMask = function (t, e) {
      if ((void 0 === e && (e = _t), Array.isArray(t) && 0 === t.length))
        return null;
      for (
        var n,
          r = (n = Array.isArray(t) ? t : [t])[0],
          o = r.width,
          i = r.height,
          a = new Uint8ClampedArray(o * i * 4),
          s = 0;
        s < i * o;
        ++s
      ) {
        var u = 4 * s;
        (a[u + 0] = 255), (a[u + 1] = 255), (a[u + 2] = 255), (a[u + 3] = 255);
        for (var f = 0; f < n.length; f++) {
          var d = n[f].data[s];
          if (-1 !== d) {
            var l = e[d];
            if (!l) throw new Error("No color could be found for part id " + d);
            (a[u + 0] = l[0]),
              (a[u + 1] = l[1]),
              (a[u + 2] = l[2]),
              (a[u + 3] = 255);
          }
        }
      }
      return new ImageData(a, o, i);
    }),
    (t.toMask = Et),
    (t.PART_CHANNELS = [
      "left_face",
      "right_face",
      "left_upper_arm_front",
      "left_upper_arm_back",
      "right_upper_arm_front",
      "right_upper_arm_back",
      "left_lower_arm_front",
      "left_lower_arm_back",
      "right_lower_arm_front",
      "right_lower_arm_back",
      "left_hand",
      "right_hand",
      "torso_front",
      "torso_back",
      "left_upper_leg_front",
      "left_upper_leg_back",
      "right_upper_leg_front",
      "right_upper_leg_back",
      "left_lower_leg_front",
      "left_lower_leg_back",
      "right_lower_leg_front",
      "right_lower_leg_back",
      "left_feet",
      "right_feet",
    ]),
    (t.flipPoseHorizontal = rt),
    (t.resizeAndPadTo = function (t, n, r) {
      var o = n[0],
        i = n[1];
      void 0 === r && (r = !1);
      var a,
        s,
        u,
        f,
        d,
        l,
        c = t.shape,
        h = c[0],
        p = c[1] / h;
      if (p > i / o) {
        a = i;
        var m = o - (s = Math.ceil(a / p));
        (u = 0), (f = 0), (d = Math.floor(m / 2)), (l = o - (s + d));
      } else {
        s = o;
        var g = i - (a = Math.ceil(o * p));
        (u = Math.floor(g / 2)), (f = i - (a + u)), (d = 0), (l = 0);
      }
      return {
        resizedAndPadded: e.tidy(function () {
          var n;
          return (
            (n = r
              ? e.image.resizeBilinear(e.reverse(t, 1), [s, a])
              : e.image.resizeBilinear(t, [s, a])),
            e.pad3d(n, [
              [d, l],
              [u, f],
              [0, 0],
            ])
          );
        }),
        paddedBy: [
          [d, l],
          [u, f],
        ],
      };
    }),
    (t.scaleAndCropToInputTensorShape = tt),
    (t.version = "2.2.0"),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
//# sourceMappingURL=body-pix.min.js.map
