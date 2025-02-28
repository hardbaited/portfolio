import { c as create_ssr_component, v as validate_component, a as subscribe, e as escape, b as each, d as add_attribute, n as null_to_empty, m as missing_component, f as compute_rest_props, h as spread, i as escape_attribute_value, j as escape_object, g as getContext, k as get_store_value, o as onDestroy, s as setContext, l as set_current_component, r as run_all, p as current_component } from './ssr-f-OIMpPX.js';
import { d as derived, w as writable, r as readable } from './index-ByVaiTI8.js';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/******************************************************************************
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
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __rest$1(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const defaultTimestep = (1 / 60) * 1000;
const getCurrentTime = typeof performance !== "undefined"
    ? () => performance.now()
    : () => Date.now();
const onNextFrame = typeof window !== "undefined"
    ? (callback) => window.requestAnimationFrame(callback)
    : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);

function createRenderStep(runNextFrame) {
    let toRun = [];
    let toRunNextFrame = [];
    let numToRun = 0;
    let isProcessing = false;
    let flushNextFrame = false;
    const toKeepAlive = new WeakSet();
    const step = {
        schedule: (callback, keepAlive = false, immediate = false) => {
            const addToCurrentFrame = immediate && isProcessing;
            const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
            if (keepAlive)
                toKeepAlive.add(callback);
            if (buffer.indexOf(callback) === -1) {
                buffer.push(callback);
                if (addToCurrentFrame && isProcessing)
                    numToRun = toRun.length;
            }
            return callback;
        },
        cancel: (callback) => {
            const index = toRunNextFrame.indexOf(callback);
            if (index !== -1)
                toRunNextFrame.splice(index, 1);
            toKeepAlive.delete(callback);
        },
        process: (frameData) => {
            if (isProcessing) {
                flushNextFrame = true;
                return;
            }
            isProcessing = true;
            [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
            toRunNextFrame.length = 0;
            numToRun = toRun.length;
            if (numToRun) {
                for (let i = 0; i < numToRun; i++) {
                    const callback = toRun[i];
                    callback(frameData);
                    if (toKeepAlive.has(callback)) {
                        step.schedule(callback);
                        runNextFrame();
                    }
                }
            }
            isProcessing = false;
            if (flushNextFrame) {
                flushNextFrame = false;
                step.process(frameData);
            }
        },
    };
    return step;
}

const maxElapsed = 40;
let useDefaultElapsed = true;
let runNextFrame = false;
let isProcessing = false;
const frame = {
    delta: 0,
    timestamp: 0,
};
const stepsOrder = [
    "read",
    "update",
    "preRender",
    "render",
    "postRender",
];
const steps = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(() => (runNextFrame = true));
    return acc;
}, {});
const sync = stepsOrder.reduce((acc, key) => {
    const step = steps[key];
    acc[key] = (process, keepAlive = false, immediate = false) => {
        if (!runNextFrame)
            startLoop();
        return step.schedule(process, keepAlive, immediate);
    };
    return acc;
}, {});
const cancelSync = stepsOrder.reduce((acc, key) => {
    acc[key] = steps[key].cancel;
    return acc;
}, {});
const flushSync = stepsOrder.reduce((acc, key) => {
    acc[key] = () => steps[key].process(frame);
    return acc;
}, {});
const processStep = (stepId) => steps[stepId].process(frame);
const processFrame = (timestamp) => {
    runNextFrame = false;
    frame.delta = useDefaultElapsed
        ? defaultTimestep
        : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
    frame.timestamp = timestamp;
    isProcessing = true;
    stepsOrder.forEach(processStep);
    isProcessing = false;
    if (runNextFrame) {
        useDefaultElapsed = false;
        onNextFrame(processFrame);
    }
};
const startLoop = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!isProcessing)
        onNextFrame(processFrame);
};
const getFrameData = () => frame;

/******************************************************************************
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
/* global Reflect, Promise */


function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var warning = function () { };
var invariant = function () { };
if (process.env.NODE_ENV !== 'production') {
    warning = function (check, message) {
        if (!check && typeof console !== 'undefined') {
            console.warn(message);
        }
    };
    invariant = function (check, message) {
        if (!check) {
            throw new Error(message);
        }
    };
}

const clamp$1 = (min, max, v) => Math.min(Math.max(v, min), max);

const safeMin = 0.001;
const minDuration = 0.01;
const maxDuration = 10.0;
const minDamping = 0.05;
const maxDamping = 1;
function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1, }) {
    let envelope;
    let derivative;
    warning(duration <= maxDuration * 1000, "Spring duration must be 10 seconds or less");
    let dampingRatio = 1 - bounce;
    dampingRatio = clamp$1(minDamping, maxDamping, dampingRatio);
    duration = clamp$1(minDuration, maxDuration, duration / 1000);
    if (dampingRatio < 1) {
        envelope = (undampedFreq) => {
            const exponentialDecay = undampedFreq * dampingRatio;
            const delta = exponentialDecay * duration;
            const a = exponentialDecay - velocity;
            const b = calcAngularFreq(undampedFreq, dampingRatio);
            const c = Math.exp(-delta);
            return safeMin - (a / b) * c;
        };
        derivative = (undampedFreq) => {
            const exponentialDecay = undampedFreq * dampingRatio;
            const delta = exponentialDecay * duration;
            const d = delta * velocity + velocity;
            const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq, 2) * duration;
            const f = Math.exp(-delta);
            const g = calcAngularFreq(Math.pow(undampedFreq, 2), dampingRatio);
            const factor = -envelope(undampedFreq) + safeMin > 0 ? -1 : 1;
            return (factor * ((d - e) * f)) / g;
        };
    }
    else {
        envelope = (undampedFreq) => {
            const a = Math.exp(-undampedFreq * duration);
            const b = (undampedFreq - velocity) * duration + 1;
            return -safeMin + a * b;
        };
        derivative = (undampedFreq) => {
            const a = Math.exp(-undampedFreq * duration);
            const b = (velocity - undampedFreq) * (duration * duration);
            return a * b;
        };
    }
    const initialGuess = 5 / duration;
    const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
    duration = duration * 1000;
    if (isNaN(undampedFreq)) {
        return {
            stiffness: 100,
            damping: 10,
            duration,
        };
    }
    else {
        const stiffness = Math.pow(undampedFreq, 2) * mass;
        return {
            stiffness,
            damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
            duration,
        };
    }
}
const rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
    let result = initialGuess;
    for (let i = 1; i < rootIterations; i++) {
        result = result - envelope(result) / derivative(result);
    }
    return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
    return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}

const durationKeys = ["duration", "bounce"];
const physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
    return keys.some((key) => options[key] !== undefined);
}
function getSpringOptions(options) {
    let springOptions = Object.assign({ velocity: 0.0, stiffness: 100, damping: 10, mass: 1.0, isResolvedFromDuration: false }, options);
    if (!isSpringType(options, physicsKeys) &&
        isSpringType(options, durationKeys)) {
        const derived = findSpring(options);
        springOptions = Object.assign(Object.assign(Object.assign({}, springOptions), derived), { velocity: 0.0, mass: 1.0 });
        springOptions.isResolvedFromDuration = true;
    }
    return springOptions;
}
function spring(_a) {
    var { from = 0.0, to = 1.0, restSpeed = 2, restDelta } = _a, options = __rest(_a, ["from", "to", "restSpeed", "restDelta"]);
    const state = { done: false, value: from };
    let { stiffness, damping, mass, velocity, duration, isResolvedFromDuration, } = getSpringOptions(options);
    let resolveSpring = zero;
    let resolveVelocity = zero;
    function createSpring() {
        const initialVelocity = velocity ? -(velocity / 1000) : 0.0;
        const initialDelta = to - from;
        const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
        const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1000;
        if (restDelta === undefined) {
            restDelta = Math.min(Math.abs(to - from) / 100, 0.4);
        }
        if (dampingRatio < 1) {
            const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
            resolveSpring = (t) => {
                const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                return (to -
                    envelope *
                        (((initialVelocity +
                            dampingRatio * undampedAngularFreq * initialDelta) /
                            angularFreq) *
                            Math.sin(angularFreq * t) +
                            initialDelta * Math.cos(angularFreq * t)));
            };
            resolveVelocity = (t) => {
                const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                return (dampingRatio *
                    undampedAngularFreq *
                    envelope *
                    ((Math.sin(angularFreq * t) *
                        (initialVelocity +
                            dampingRatio *
                                undampedAngularFreq *
                                initialDelta)) /
                        angularFreq +
                        initialDelta * Math.cos(angularFreq * t)) -
                    envelope *
                        (Math.cos(angularFreq * t) *
                            (initialVelocity +
                                dampingRatio *
                                    undampedAngularFreq *
                                    initialDelta) -
                            angularFreq *
                                initialDelta *
                                Math.sin(angularFreq * t)));
            };
        }
        else if (dampingRatio === 1) {
            resolveSpring = (t) => to -
                Math.exp(-undampedAngularFreq * t) *
                    (initialDelta +
                        (initialVelocity + undampedAngularFreq * initialDelta) *
                            t);
        }
        else {
            const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
            resolveSpring = (t) => {
                const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                const freqForT = Math.min(dampedAngularFreq * t, 300);
                return (to -
                    (envelope *
                        ((initialVelocity +
                            dampingRatio * undampedAngularFreq * initialDelta) *
                            Math.sinh(freqForT) +
                            dampedAngularFreq *
                                initialDelta *
                                Math.cosh(freqForT))) /
                        dampedAngularFreq);
            };
        }
    }
    createSpring();
    return {
        next: (t) => {
            const current = resolveSpring(t);
            if (!isResolvedFromDuration) {
                const currentVelocity = resolveVelocity(t) * 1000;
                const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
                const isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
                state.done =
                    isBelowVelocityThreshold && isBelowDisplacementThreshold;
            }
            else {
                state.done = t >= duration;
            }
            state.value = state.done ? to : current;
            return state;
        },
        flipTarget: () => {
            velocity = -velocity;
            [from, to] = [to, from];
            createSpring();
        },
    };
}
spring.needsInterpolation = (a, b) => typeof a === "string" || typeof b === "string";
const zero = (_t) => 0;

const progress = (from, to, value) => {
    const toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

const mix = (from, to, progress) => -progress * from + progress * to + from;

const clamp = (min, max) => (v) => Math.max(Math.min(v, max), min);
const sanitize = (v) => (v % 1 ? Number(v.toFixed(5)) : v);
const floatRegex = /(-)?([\d]*\.?[\d])+/g;
const colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi;
const singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function isString(v) {
    return typeof v === 'string';
}

const number = {
    test: (v) => typeof v === 'number',
    parse: parseFloat,
    transform: (v) => v,
};
const alpha = Object.assign(Object.assign({}, number), { transform: clamp(0, 1) });
const scale = Object.assign(Object.assign({}, number), { default: 1 });

const createUnitType = (unit) => ({
    test: (v) => isString(v) && v.endsWith(unit) && v.split(' ').length === 1,
    parse: parseFloat,
    transform: (v) => `${v}${unit}`,
});
const degrees = createUnitType('deg');
const percent = createUnitType('%');
const px = createUnitType('px');
const vh = createUnitType('vh');
const vw = createUnitType('vw');
const progressPercentage = Object.assign(Object.assign({}, percent), { parse: (v) => percent.parse(v) / 100, transform: (v) => percent.transform(v * 100) });

const isColorString = (type, testProp) => (v) => {
    return Boolean((isString(v) && singleColorRegex.test(v) && v.startsWith(type)) ||
        (testProp && Object.prototype.hasOwnProperty.call(v, testProp)));
};
const splitColor = (aName, bName, cName) => (v) => {
    if (!isString(v))
        return v;
    const [a, b, c, alpha] = v.match(floatRegex);
    return {
        [aName]: parseFloat(a),
        [bName]: parseFloat(b),
        [cName]: parseFloat(c),
        alpha: alpha !== undefined ? parseFloat(alpha) : 1,
    };
};

const hsla = {
    test: isColorString('hsl', 'hue'),
    parse: splitColor('hue', 'saturation', 'lightness'),
    transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
        return ('hsla(' +
            Math.round(hue) +
            ', ' +
            percent.transform(sanitize(saturation)) +
            ', ' +
            percent.transform(sanitize(lightness)) +
            ', ' +
            sanitize(alpha.transform(alpha$1)) +
            ')');
    },
};

const clampRgbUnit = clamp(0, 255);
const rgbUnit = Object.assign(Object.assign({}, number), { transform: (v) => Math.round(clampRgbUnit(v)) });
const rgba = {
    test: isColorString('rgb', 'red'),
    parse: splitColor('red', 'green', 'blue'),
    transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => 'rgba(' +
        rgbUnit.transform(red) +
        ', ' +
        rgbUnit.transform(green) +
        ', ' +
        rgbUnit.transform(blue) +
        ', ' +
        sanitize(alpha.transform(alpha$1)) +
        ')',
};

function parseHex(v) {
    let r = '';
    let g = '';
    let b = '';
    let a = '';
    if (v.length > 5) {
        r = v.substr(1, 2);
        g = v.substr(3, 2);
        b = v.substr(5, 2);
        a = v.substr(7, 2);
    }
    else {
        r = v.substr(1, 1);
        g = v.substr(2, 1);
        b = v.substr(3, 1);
        a = v.substr(4, 1);
        r += r;
        g += g;
        b += b;
        a += a;
    }
    return {
        red: parseInt(r, 16),
        green: parseInt(g, 16),
        blue: parseInt(b, 16),
        alpha: a ? parseInt(a, 16) / 255 : 1,
    };
}
const hex = {
    test: isColorString('#'),
    parse: parseHex,
    transform: rgba.transform,
};

const color = {
    test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
    parse: (v) => {
        if (rgba.test(v)) {
            return rgba.parse(v);
        }
        else if (hsla.test(v)) {
            return hsla.parse(v);
        }
        else {
            return hex.parse(v);
        }
    },
    transform: (v) => {
        return isString(v)
            ? v
            : v.hasOwnProperty('red')
                ? rgba.transform(v)
                : hsla.transform(v);
    },
};

const colorToken = '${c}';
const numberToken = '${n}';
function test(v) {
    var _a, _b, _c, _d;
    return (isNaN(v) &&
        isString(v) &&
        ((_b = (_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0);
}
function analyse$1(v) {
    if (typeof v === 'number')
        v = `${v}`;
    const values = [];
    let numColors = 0;
    const colors = v.match(colorRegex);
    if (colors) {
        numColors = colors.length;
        v = v.replace(colorRegex, colorToken);
        values.push(...colors.map(color.parse));
    }
    const numbers = v.match(floatRegex);
    if (numbers) {
        v = v.replace(floatRegex, numberToken);
        values.push(...numbers.map(number.parse));
    }
    return { values, numColors, tokenised: v };
}
function parse(v) {
    return analyse$1(v).values;
}
function createTransformer(v) {
    const { values, numColors, tokenised } = analyse$1(v);
    const numValues = values.length;
    return (v) => {
        let output = tokenised;
        for (let i = 0; i < numValues; i++) {
            output = output.replace(i < numColors ? colorToken : numberToken, i < numColors ? color.transform(v[i]) : sanitize(v[i]));
        }
        return output;
    };
}
const convertNumbersToZero = (v) => typeof v === 'number' ? 0 : v;
function getAnimatableNone$1(v) {
    const parsed = parse(v);
    const transformer = createTransformer(v);
    return transformer(parsed.map(convertNumbersToZero));
}
const complex = { test, parse, createTransformer, getAnimatableNone: getAnimatableNone$1 };

const maxDefaults = new Set(['brightness', 'contrast', 'saturate', 'opacity']);
function applyDefaultFilter(v) {
    let [name, value] = v.slice(0, -1).split('(');
    if (name === 'drop-shadow')
        return v;
    const [number] = value.match(floatRegex) || [];
    if (!number)
        return v;
    const unit = value.replace(number, '');
    let defaultValue = maxDefaults.has(name) ? 1 : 0;
    if (number !== value)
        defaultValue *= 100;
    return name + '(' + defaultValue + unit + ')';
}
const functionRegex = /([a-z-]*)\(.*?\)/g;
const filter = Object.assign(Object.assign({}, complex), { getAnimatableNone: (v) => {
        const functions = v.match(functionRegex);
        return functions ? functions.map(applyDefaultFilter).join(' ') : v;
    } });

function hueToRgb(p, q, t) {
    if (t < 0)
        t += 1;
    if (t > 1)
        t -= 1;
    if (t < 1 / 6)
        return p + (q - p) * 6 * t;
    if (t < 1 / 2)
        return q;
    if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha }) {
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    let red = 0;
    let green = 0;
    let blue = 0;
    if (!saturation) {
        red = green = blue = lightness;
    }
    else {
        const q = lightness < 0.5
            ? lightness * (1 + saturation)
            : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;
        red = hueToRgb(p, q, hue + 1 / 3);
        green = hueToRgb(p, q, hue);
        blue = hueToRgb(p, q, hue - 1 / 3);
    }
    return {
        red: Math.round(red * 255),
        green: Math.round(green * 255),
        blue: Math.round(blue * 255),
        alpha,
    };
}

const mixLinearColor = (from, to, v) => {
    const fromExpo = from * from;
    const toExpo = to * to;
    return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
};
const colorTypes = [hex, rgba, hsla];
const getColorType = (v) => colorTypes.find((type) => type.test(v));
const notAnimatable = (color) => `'${color}' is not an animatable color. Use the equivalent color code instead.`;
const mixColor = (from, to) => {
    let fromColorType = getColorType(from);
    let toColorType = getColorType(to);
    invariant(!!fromColorType, notAnimatable(from));
    invariant(!!toColorType, notAnimatable(to));
    let fromColor = fromColorType.parse(from);
    let toColor = toColorType.parse(to);
    if (fromColorType === hsla) {
        fromColor = hslaToRgba(fromColor);
        fromColorType = rgba;
    }
    if (toColorType === hsla) {
        toColor = hslaToRgba(toColor);
        toColorType = rgba;
    }
    const blended = Object.assign({}, fromColor);
    return (v) => {
        for (const key in blended) {
            if (key !== "alpha") {
                blended[key] = mixLinearColor(fromColor[key], toColor[key], v);
            }
        }
        blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
        return fromColorType.transform(blended);
    };
};

const isNum = (v) => typeof v === 'number';

const combineFunctions = (a, b) => (v) => b(a(v));
const pipe = (...transformers) => transformers.reduce(combineFunctions);

function getMixer(origin, target) {
    if (isNum(origin)) {
        return (v) => mix(origin, target, v);
    }
    else if (color.test(origin)) {
        return mixColor(origin, target);
    }
    else {
        return mixComplex(origin, target);
    }
}
const mixArray = (from, to) => {
    const output = [...from];
    const numValues = output.length;
    const blendValue = from.map((fromThis, i) => getMixer(fromThis, to[i]));
    return (v) => {
        for (let i = 0; i < numValues; i++) {
            output[i] = blendValue[i](v);
        }
        return output;
    };
};
const mixObject = (origin, target) => {
    const output = Object.assign(Object.assign({}, origin), target);
    const blendValue = {};
    for (const key in output) {
        if (origin[key] !== undefined && target[key] !== undefined) {
            blendValue[key] = getMixer(origin[key], target[key]);
        }
    }
    return (v) => {
        for (const key in blendValue) {
            output[key] = blendValue[key](v);
        }
        return output;
    };
};
function analyse(value) {
    const parsed = complex.parse(value);
    const numValues = parsed.length;
    let numNumbers = 0;
    let numRGB = 0;
    let numHSL = 0;
    for (let i = 0; i < numValues; i++) {
        if (numNumbers || typeof parsed[i] === "number") {
            numNumbers++;
        }
        else {
            if (parsed[i].hue !== undefined) {
                numHSL++;
            }
            else {
                numRGB++;
            }
        }
    }
    return { parsed, numNumbers, numRGB, numHSL };
}
const mixComplex = (origin, target) => {
    const template = complex.createTransformer(target);
    const originStats = analyse(origin);
    const targetStats = analyse(target);
    const canInterpolate = originStats.numHSL === targetStats.numHSL &&
        originStats.numRGB === targetStats.numRGB &&
        originStats.numNumbers >= targetStats.numNumbers;
    if (canInterpolate) {
        return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
    }
    else {
        warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
        return (p) => `${p > 0 ? target : origin}`;
    }
};

const mixNumber = (from, to) => (p) => mix(from, to, p);
function detectMixerFactory(v) {
    if (typeof v === 'number') {
        return mixNumber;
    }
    else if (typeof v === 'string') {
        if (color.test(v)) {
            return mixColor;
        }
        else {
            return mixComplex;
        }
    }
    else if (Array.isArray(v)) {
        return mixArray;
    }
    else if (typeof v === 'object') {
        return mixObject;
    }
}
function createMixers(output, ease, customMixer) {
    const mixers = [];
    const mixerFactory = customMixer || detectMixerFactory(output[0]);
    const numMixers = output.length - 1;
    for (let i = 0; i < numMixers; i++) {
        let mixer = mixerFactory(output[i], output[i + 1]);
        if (ease) {
            const easingFunction = Array.isArray(ease) ? ease[i] : ease;
            mixer = pipe(easingFunction, mixer);
        }
        mixers.push(mixer);
    }
    return mixers;
}
function fastInterpolate([from, to], [mixer]) {
    return (v) => mixer(progress(from, to, v));
}
function slowInterpolate(input, mixers) {
    const inputLength = input.length;
    const lastInputIndex = inputLength - 1;
    return (v) => {
        let mixerIndex = 0;
        let foundMixerIndex = false;
        if (v <= input[0]) {
            foundMixerIndex = true;
        }
        else if (v >= input[lastInputIndex]) {
            mixerIndex = lastInputIndex - 1;
            foundMixerIndex = true;
        }
        if (!foundMixerIndex) {
            let i = 1;
            for (; i < inputLength; i++) {
                if (input[i] > v || i === lastInputIndex) {
                    break;
                }
            }
            mixerIndex = i - 1;
        }
        const progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
        return mixers[mixerIndex](progressInRange);
    };
}
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
    const inputLength = input.length;
    invariant(inputLength === output.length, 'Both input and output ranges must be the same length');
    invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, 'Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.');
    if (input[0] > input[inputLength - 1]) {
        input = [].concat(input);
        output = [].concat(output);
        input.reverse();
        output.reverse();
    }
    const mixers = createMixers(output, ease, mixer);
    const interpolator = inputLength === 2
        ? fastInterpolate(input, mixers)
        : slowInterpolate(input, mixers);
    return isClamp
        ? (v) => interpolator(clamp$1(input[0], input[inputLength - 1], v))
        : interpolator;
}

const reverseEasing = easing => p => 1 - easing(1 - p);
const mirrorEasing = easing => p => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
const createExpoIn = (power) => p => Math.pow(p, power);
const createBackIn = (power) => p => p * p * ((power + 1) * p - power);
const createAnticipate = (power) => {
    const backEasing = createBackIn(power);
    return p => (p *= 2) < 1
        ? 0.5 * backEasing(p)
        : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
};

const DEFAULT_OVERSHOOT_STRENGTH = 1.525;
const BOUNCE_FIRST_THRESHOLD = 4.0 / 11.0;
const BOUNCE_SECOND_THRESHOLD = 8.0 / 11.0;
const BOUNCE_THIRD_THRESHOLD = 9.0 / 10.0;
const linear = p => p;
const easeIn = createExpoIn(2);
const easeOut = reverseEasing(easeIn);
const easeInOut = mirrorEasing(easeIn);
const circIn = p => 1 - Math.sin(Math.acos(p));
const circOut = reverseEasing(circIn);
const circInOut = mirrorEasing(circOut);
const backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
const backOut = reverseEasing(backIn);
const backInOut = mirrorEasing(backIn);
const anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
const ca = 4356.0 / 361.0;
const cb = 35442.0 / 1805.0;
const cc = 16061.0 / 1805.0;
const bounceOut = (p) => {
    if (p === 1 || p === 0)
        return p;
    const p2 = p * p;
    return p < BOUNCE_FIRST_THRESHOLD
        ? 7.5625 * p2
        : p < BOUNCE_SECOND_THRESHOLD
            ? 9.075 * p2 - 9.9 * p + 3.4
            : p < BOUNCE_THIRD_THRESHOLD
                ? ca * p2 - cb * p + cc
                : 10.8 * p * p - 20.52 * p + 10.72;
};
const bounceIn = reverseEasing(bounceOut);
const bounceInOut = (p) => p < 0.5
    ? 0.5 * (1.0 - bounceOut(1.0 - p * 2.0))
    : 0.5 * bounceOut(p * 2.0 - 1.0) + 0.5;

function defaultEasing(values, easing) {
    return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function defaultOffset(values) {
    const numValues = values.length;
    return values.map((_value, i) => i !== 0 ? i / (numValues - 1) : 0);
}
function convertOffsetToTimes(offset, duration) {
    return offset.map((o) => o * duration);
}
function keyframes$1({ from = 0, to = 1, ease, offset, duration = 300, }) {
    const state = { done: false, value: from };
    const values = Array.isArray(to) ? to : [from, to];
    const times = convertOffsetToTimes(offset && offset.length === values.length
        ? offset
        : defaultOffset(values), duration);
    function createInterpolator() {
        return interpolate(times, values, {
            ease: Array.isArray(ease) ? ease : defaultEasing(values, ease),
        });
    }
    let interpolator = createInterpolator();
    return {
        next: (t) => {
            state.value = interpolator(t);
            state.done = t >= duration;
            return state;
        },
        flipTarget: () => {
            values.reverse();
            interpolator = createInterpolator();
        },
    };
}

function decay({ velocity = 0, from = 0, power = 0.8, timeConstant = 350, restDelta = 0.5, modifyTarget, }) {
    const state = { done: false, value: from };
    let amplitude = power * velocity;
    const ideal = from + amplitude;
    const target = modifyTarget === undefined ? ideal : modifyTarget(ideal);
    if (target !== ideal)
        amplitude = target - from;
    return {
        next: (t) => {
            const delta = -amplitude * Math.exp(-t / timeConstant);
            state.done = !(delta > restDelta || delta < -restDelta);
            state.value = state.done ? target : target + delta;
            return state;
        },
        flipTarget: () => { },
    };
}

const types = { keyframes: keyframes$1, spring, decay };
function detectAnimationFromOptions(config) {
    if (Array.isArray(config.to)) {
        return keyframes$1;
    }
    else if (types[config.type]) {
        return types[config.type];
    }
    const keys = new Set(Object.keys(config));
    if (keys.has("ease") ||
        (keys.has("duration") && !keys.has("dampingRatio"))) {
        return keyframes$1;
    }
    else if (keys.has("dampingRatio") ||
        keys.has("stiffness") ||
        keys.has("mass") ||
        keys.has("damping") ||
        keys.has("restSpeed") ||
        keys.has("restDelta")) {
        return spring;
    }
    return keyframes$1;
}

function loopElapsed(elapsed, duration, delay = 0) {
    return elapsed - duration - delay;
}
function reverseElapsed(elapsed, duration, delay = 0, isForwardPlayback = true) {
    return isForwardPlayback
        ? loopElapsed(duration + -elapsed, duration, delay)
        : duration - (elapsed - duration) + delay;
}
function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
    return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}

const framesync = (update) => {
    const passTimestamp = ({ delta }) => update(delta);
    return {
        start: () => sync.update(passTimestamp, true),
        stop: () => cancelSync.update(passTimestamp),
    };
};
function animate(_a) {
    var _b, _c;
    var { from, autoplay = true, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, onPlay, onStop, onComplete, onRepeat, onUpdate } = _a, options = __rest(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
    let { to } = options;
    let driverControls;
    let repeatCount = 0;
    let computedDuration = options.duration;
    let latest;
    let isComplete = false;
    let isForwardPlayback = true;
    let interpolateFromNumber;
    const animator = detectAnimationFromOptions(options);
    if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
        interpolateFromNumber = interpolate([0, 100], [from, to], {
            clamp: false,
        });
        from = 0;
        to = 100;
    }
    const animation = animator(Object.assign(Object.assign({}, options), { from, to }));
    function repeat() {
        repeatCount++;
        if (repeatType === "reverse") {
            isForwardPlayback = repeatCount % 2 === 0;
            elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
        }
        else {
            elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
            if (repeatType === "mirror")
                animation.flipTarget();
        }
        isComplete = false;
        onRepeat && onRepeat();
    }
    function complete() {
        driverControls.stop();
        onComplete && onComplete();
    }
    function update(delta) {
        if (!isForwardPlayback)
            delta = -delta;
        elapsed += delta;
        if (!isComplete) {
            const state = animation.next(Math.max(0, elapsed));
            latest = state.value;
            if (interpolateFromNumber)
                latest = interpolateFromNumber(latest);
            isComplete = isForwardPlayback ? state.done : elapsed <= 0;
        }
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);
        if (isComplete) {
            if (repeatCount === 0)
                computedDuration !== null && computedDuration !== void 0 ? computedDuration : (computedDuration = elapsed);
            if (repeatCount < repeatMax) {
                hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
            }
            else {
                complete();
            }
        }
    }
    function play() {
        onPlay === null || onPlay === void 0 ? void 0 : onPlay();
        driverControls = driver(update);
        driverControls.start();
    }
    autoplay && play();
    return {
        stop: () => {
            onStop === null || onStop === void 0 ? void 0 : onStop();
            driverControls.stop();
        },
    };
}

function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1000 / frameDuration) : 0;
}

function inertia({ from = 0, velocity = 0, min, max, power = 0.8, timeConstant = 750, bounceStiffness = 500, bounceDamping = 10, restDelta = 1, modifyTarget, driver, onUpdate, onComplete, onStop, }) {
    let currentAnimation;
    function isOutOfBounds(v) {
        return (min !== undefined && v < min) || (max !== undefined && v > max);
    }
    function boundaryNearest(v) {
        if (min === undefined)
            return max;
        if (max === undefined)
            return min;
        return Math.abs(min - v) < Math.abs(max - v) ? min : max;
    }
    function startAnimation(options) {
        currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
        currentAnimation = animate(Object.assign(Object.assign({}, options), { driver, onUpdate: (v) => {
                var _a;
                onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v);
                (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, v);
            }, onComplete,
            onStop }));
    }
    function startSpring(options) {
        startAnimation(Object.assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options));
    }
    if (isOutOfBounds(from)) {
        startSpring({ from, velocity, to: boundaryNearest(from) });
    }
    else {
        let target = power * velocity + from;
        if (typeof modifyTarget !== "undefined")
            target = modifyTarget(target);
        const boundary = boundaryNearest(target);
        const heading = boundary === min ? -1 : 1;
        let prev;
        let current;
        const checkBoundary = (v) => {
            prev = current;
            current = v;
            velocity = velocityPerSecond(v - prev, getFrameData().delta);
            if ((heading === 1 && v > boundary) ||
                (heading === -1 && v < boundary)) {
                startSpring({ from: v, to: boundary, velocity });
            }
        };
        startAnimation({
            type: "decay",
            from,
            velocity,
            timeConstant,
            power,
            restDelta,
            modifyTarget,
            onUpdate: isOutOfBounds(target) ? checkBoundary : undefined,
        });
    }
    return {
        stop: () => currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop(),
    };
}

const isPoint = (point) => point.hasOwnProperty('x') && point.hasOwnProperty('y');

const isPoint3D = (point) => isPoint(point) && point.hasOwnProperty('z');

const distance1D = (a, b) => Math.abs(a - b);
function distance(a, b) {
    if (isNum(a) && isNum(b)) {
        return distance1D(a, b);
    }
    else if (isPoint(a) && isPoint(b)) {
        const xDelta = distance1D(a.x, b.x);
        const yDelta = distance1D(a.y, b.y);
        const zDelta = isPoint3D(a) && isPoint3D(b) ? distance1D(a.z, b.z) : 0;
        return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
    }
}

const a = (a1, a2) => 1.0 - 3.0 * a2 + 3.0 * a1;
const b = (a1, a2) => 3.0 * a2 - 6.0 * a1;
const c = (a1) => 3.0 * a1;
const calcBezier = (t, a1, a2) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
const getSlope = (t, a1, a2) => 3.0 * a(a1, a2) * t * t + 2.0 * b(a1, a2) * t + c(a1);
const subdivisionPrecision = 0.0000001;
const subdivisionMaxIterations = 10;
function binarySubdivide(aX, aA, aB, mX1, mX2) {
    let currentX;
    let currentT;
    let i = 0;
    do {
        currentT = aA + (aB - aA) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0.0) {
            aB = currentT;
        }
        else {
            aA = currentT;
        }
    } while (Math.abs(currentX) > subdivisionPrecision &&
        ++i < subdivisionMaxIterations);
    return currentT;
}
const newtonIterations = 8;
const newtonMinSlope = 0.001;
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (let i = 0; i < newtonIterations; ++i) {
        const currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0.0) {
            return aGuessT;
        }
        const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
}
const kSplineTableSize = 11;
const kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
function cubicBezier(mX1, mY1, mX2, mY2) {
    if (mX1 === mY1 && mX2 === mY2)
        return linear;
    const sampleValues = new Float32Array(kSplineTableSize);
    for (let i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }
    function getTForX(aX) {
        let intervalStart = 0.0;
        let currentSample = 1;
        const lastSample = kSplineTableSize - 1;
        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
            intervalStart += kSampleStepSize;
        }
        --currentSample;
        const dist = (aX - sampleValues[currentSample]) /
            (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        const guessForT = intervalStart + dist * kSampleStepSize;
        const initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= newtonMinSlope) {
            return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        }
        else if (initialSlope === 0.0) {
            return guessForT;
        }
        else {
            return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
    }
    return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}

const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
const translations = {
  en: {
    "homepage.hello": "Hello, I'm Pantelis",
    "homepage.welcome": "Welcome to my website",
    "homepage.intro": "Full Stack web developer",
    "homepage.builtinfo": "I have built this website with the latest technologies in mind",
    "homepage.introduction": "Let me introduce myself.",
    "homepage.introductionPartOne": "Let me introduce myself.",
    "homepage.introductionOne": "My full name is Panteleimon Xanthos, and I was born in April of 2001 in Greece.",
    "homepage.introductionTwo": "From a young age, I’ve always been drawn to technology, especially computers. This early interest led me to discover the world of programming, where I quickly found joy in solving problems and coming up with innovative solutions. As I continued to learn and grow, I specialized in web development, combining technical skills with creativity to build dynamic, engaging websites. Whether it’s front-end or back-end logic, I’m passionate about every aspect of web development and always eager to learn new technologies and improve my skills.",
    "homepage.introductionThree": "Beyond programming, I have a deep love for gaming. Gaming has been a long-time hobby that not only provides entertainment but also sparks inspiration. It’s the perfect way to unwind and often serves as a great source of ideas for my work in technology and design. Whether I’m diving into an immersive RPG or competing in a fast-paced shooter, gaming plays a significant role in my life, complementing my passion for tech and creativity.",
    "homepage.introductionFour": "I’m also passionate about traveling, as it gives me the opportunity to experience different cultures and broaden my horizons. So far, I’ve visited the UK, Italy, Bulgaria, North Macedonia, Austria, and Hungary. Of all the places I’ve been, Hungary stands out as my favorite destination. Looking ahead, my goal is to travel to the USA, where I’m excited to explore new places and experiences.",
    "homepage.viewMyCV": "Take a look at my CV",
    "homepage.experience": "My experience so far",
    "homepage.skill": "My Skill Set",
    "homepage.like": "Like what you saw?",
    "homepage.contactme": "Feel free to contact me",
    "homepage.findmysocials": "Below you are going to find my social links and my contact info",
    "homepage.mycontactinfo": "My Contact Info",
    "experience.eshop_maintainer.description": "I worked on maintaining a local website by adding products and managing the company's WordPress site.",
    "experience.military_duty.description": "I have fulfilled my military service obligations to my country.",
    "experience.web_developer.description": "I have collaborated with private clients to transform their web application concepts into reality, utilizing raw HTML, CSS, and JavaScript for the front-end, and Node.js for the back-end. Due to non-disclosure agreements, I am unable to share specific code or client names.",
    "experience.full_stack_developer.description": "I am currently employed as a software engineer at Infomax, where I've had the opportunity to work with cutting-edge technologies like SvelteKit, TailwindCSS, and PHP Laravel. This role has allowed me to deepen my expertise in Svelte and experience firsthand what it’s like to be part of a dynamic team that prioritizes innovation and continuous improvement in application development.",
    "experience.gaming_servers_operator.description": "I began my journey into server development at the age of 16, quickly honing my skills in various programming languages and frameworks. Over the years, I have worked extensively with Lua, HTML, CSS, JavaScript, Svelte, MySQL/MariaDB, and TailwindCSS to create high-quality scripts and custom features for FiveM and RedM servers. My work has consistently focused on enhancing the gaming experience through innovative and efficient server-side development, ensuring smooth performance and engaging content for players.",
    "skill.lua.description": "Advanced in Lua programming, specializing in developing robust and efficient scripts for games.",
    "skill.sveltekit.description": "Advanced experience in building modern, reactive web applications using SvelteKit.",
    "skill.tailwindcss.description": "Proficient in crafting responsive and visually appealing UI using TailwindCSS.",
    "skill.javascript.description": "Extensive experience in building interactive front-end/back-end applications with JavaScript.",
    "skill.nodejs.description": "Strong proficiency in server-side development using Node.js.",
    "skill.html_css.description": "Expert in building and styling web pages using HTML5 and CSS3.",
    "skill.unix_systems.description": "Extensive experience in managing and maintaining Ubuntu-based Linux systems.",
    "skill.mariadb_mysql.description": "Extensive experience in managing and maintaining MariaDB & MySQL instances.",
    "skill.php_laravel.description": "Intermediate in developing back-end systems with Laravel and PHP.",
    "skill.email_system.description": "Intermediate in creating mailcow docker instances for email management.",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.contact": "Contact"
  },
  gr: {
    "homepage.hello": "Γεια σας, είμαι ο Παντελής",
    "homepage.welcome": "Καλώς ήλθατε στον ιστότοπό μου",
    "homepage.intro": "Full Stack Web Developer",
    "homepage.builtinfo": "Δημιούργησα αυτόν τον ιστότοπο χρησιμοποιώντας τις πιο σύγχρονες τεχνολογίες",
    "homepage.introduction": "Επιτρέψτε μου να συστηθώ",
    "homepage.introductionPartOne": "Επιτρέψτε μου να συστηθώ",
    "homepage.introductionOne": "Το όνομά μου είναι Παντελεήμων Ξάνθος και γεννήθηκα τον Απρίλιο του 2001 στην Ελλάδα.",
    "homepage.introductionTwo": "Από μικρή ηλικία, με γοήτευε η τεχνολογία, ιδιαίτερα οι υπολογιστές. Αυτό το πρώιμο ενδιαφέρον με οδήγησε να εξερευνήσω τον κόσμο του προγραμματισμού, όπου σύντομα ανακάλυψα τη χαρά της επίλυσης προβλημάτων και της ανάπτυξης καινοτόμων λύσεων. Καθώς συνέχισα να μαθαίνω και να εξελίσσομαι, εξειδικεύτηκα στην ανάπτυξη ιστοσελίδων, συνδυάζοντας τεχνικές δεξιότητες με δημιουργικότητα για να σχεδιάζω δυναμικούς και ελκυστικούς ιστότοπους. Είτε πρόκειται για τη λογική του front-end είτε του back-end, είμαι παθιασμένος με κάθε πτυχή της ανάπτυξης ιστοσελίδων και πάντα πρόθυμος να ενημερώνομαι για νέες τεχνολογίες και να βελτιώνω τις δεξιότητές μου.",
    "homepage.introductionThree": "Πέρα από τον προγραμματισμό, έχω μια βαθιά αγάπη για τα βιντεοπαιχνίδια. Η ενασχόληση με το gaming αποτελεί μακροχρόνιο χόμπι που δεν προσφέρει μόνο ψυχαγωγία, αλλά και πηγή έμπνευσης. Είναι ο ιδανικός τρόπος για να χαλαρώσω, ενώ συχνά μου δίνει ιδέες για τη δουλειά μου στην τεχνολογία και το design. Είτε βυθίζομαι σε ένα RPG με πλούσια αφήγηση είτε συμμετέχω σε έναν γρήγορο αγώνα shooter, τα βιντεοπαιχνίδια κατέχουν σημαντική θέση στη ζωή μου, συμπληρώνοντας το πάθος μου για την τεχνολογία και τη δημιουργικότητα.",
    "homepage.introductionFour": "Είμαι επίσης παθιασμένος με τα ταξίδια, καθώς μου προσφέρουν τη δυνατότητα να γνωρίσω διαφορετικούς πολιτισμούς και να διευρύνω τους ορίζοντές μου. Έως τώρα, έχω επισκεφθεί το Ηνωμένο Βασίλειο, την Ιταλία, τη Βουλγαρία, τη Βόρεια Μακεδονία, την Αυστρία και την Ουγγαρία. Από όλους τους προορισμούς που έχω εξερευνήσει, η Ουγγαρία ξεχωρίζει ως ο αγαπημένος μου. Στο μέλλον, φιλοδοξώ να επισκεφθώ τις Ηνωμένες Πολιτείες, όπου ανυπομονώ να ανακαλύψω νέους τόπους και εμπειρίες.",
    "homepage.viewMyCV": "Δές το βιογραφικό μου",
    "homepage.experience": "Η επαγγελματική μου εμπειρία έως τώρα",
    "homepage.skill": "Οι δεξιότητές μου",
    "homepage.like": "Σας εντυπωσίασαν όσα είδατε;",
    "homepage.contactme": "Επικοινωνήσετε μαζί μου",
    "homepage.findmysocials": "Παρακάτω θα βρείτε τους συνδέσμους των μέσων κοινωνικής δικτύωσης και τα στοιχεία επικοινωνίας μου",
    "homepage.mycontactinfo": "Στοιχεία Επικοινωνίας",
    "experience.eshop_maintainer.description": "Ασχολήθηκα με τη συντήρηση ενός τοπικού ιστότοπου, προσθέτοντας προϊόντα και διαχειριζόμενος τον ιστότοπο WordPress της εταιρείας.",
    "experience.military_duty.description": "Έχω ολοκληρώσει τις στρατιωτικές μου υποχρεώσεις προς την πατρίδα μου.",
    "experience.web_developer.description": "Συνεργάστηκα με ιδιώτες πελάτες για να υλοποιήσω τις ιδέες τους για web εφαρμογές, χρησιμοποιώντας HTML, CSS και JavaScript για το front-end, και Node.js για το back-end. Λόγω συμφωνιών εμπιστευτικότητας, δεν μπορώ να αποκαλύψω συγκεκριμένες λεπτομέρειες κώδικα ή ονόματα πελατών.",
    "experience.full_stack_developer.description": "Αυτή τη στιγμή εργάζομαι ως μηχανικός λογισμικού στην Infomax, όπου έχω την ευκαιρία να αξιοποιώ πρωτοποριακές τεχνολογίες όπως το SvelteKit, το TailwindCSS και το PHP Laravel. Ο ρόλος αυτός μου έχει επιτρέψει να εμβαθύνω τις γνώσεις μου στο Svelte και να βιώσω τη δυναμική μιας ομάδας που δίνει έμφαση στην καινοτομία και τη συνεχή βελτίωση στην ανάπτυξη εφαρμογών.",
    "experience.gaming_servers_operator.description": "Ξεκίνησα να ασχολούμαι με την ανάπτυξη διακομιστών σε ηλικία 16 ετών, τελειοποιώντας γρήγορα τις δεξιότητές μου σε διάφορες γλώσσες προγραμματισμού και πλαίσια. Με τα χρόνια, έχω εργαστεί εκτενώς με Lua, HTML, CSS, JavaScript, Svelte, MySQL/MariaDB και TailwindCSS για να αναπτύξω υψηλής ποιότητας scripts και προσαρμοσμένες λειτουργίες για διακομιστές FiveM και RedM. Η δουλειά μου επικεντρώνεται στη βελτίωση της εμπειρίας παιχνιδιού μέσω καινοτόμου και αποδοτικής ανάπτυξης από την πλευρά του διακομιστή, εξασφαλίζοντας ομαλή λειτουργία και ελκυστικό περιεχόμενο για τους παίκτες.",
    "skill.lua.description": "Προηγμένη γνώση προγραμματισμού Lua, με εξειδίκευση στην ανάπτυξη αξιόπιστων και αποδοτικών scripts για παιχνίδια.",
    "skill.sveltekit.description": "Προηγμένη εμπειρία στη δημιουργία σύγχρονων, διαδραστικών web εφαρμογών με το SvelteKit.",
    "skill.tailwindcss.description": "Ικανότητα στη σχεδίαση responsive και αισθητικά ελκυστικών διεπαφών χρήστη με το TailwindCSS.",
    "skill.javascript.description": "Εκτενής εμπειρία στην ανάπτυξη διαδραστικών front-end/back-end εφαρμογών με JavaScript.",
    "skill.nodejs.description": "Ισχυρή τεχνογνωσία στην ανάπτυξη server-side με το Node.js.",
    "skill.html_css.description": "Εξειδίκευση στη δημιουργία και μορφοποίηση ιστοσελίδων με HTML5 και CSS3.",
    "skill.unix_systems.description": "Εκτενής εμπειρία στη διαχείριση και συντήρηση συστημάτων Linux βασισμένων στο Ubuntu.",
    "skill.mariadb_mysql.description": "Εκτενής εμπειρία στη διαχείριση και συντήρηση βάσεων δεδομένων MariaDB και MySQL.",
    "skill.php_laravel.description": "Μέτρια εμπειρία στην ανάπτυξη back-end συστημάτων με PHP και Laravel.",
    "skill.email_system.description": "Μέτρια εμπειρία στη δημιουργία instances mailcow με Docker για τη διαχείριση email.",
    "nav.home": "Αρχική",
    "nav.about": "Σχετικά με Εμένα",
    "nav.experience": "Εμπειρία",
    "nav.skills": "Δεξιότητες",
    "nav.contact": "Επικοινωνία"
  }
};
const locale = writable("en");
const locales = Object.keys(translations);
function translate(locale2, key, vars) {
  if (!key) throw new Error("no key provided to $t()");
  if (!locale2) throw new Error(`no translation for key "${key}"`);
  let text = translations[locale2][key];
  if (!text) throw new Error(`no translation found for ${locale2}.${key}`);
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]);
  });
  return text;
}
const t = derived(
  locale,
  ($locale) => (key, vars = {}) => translate($locale, key, vars)
);
const Tailwindcss = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { fill: "#19376D" },
      { viewBox: "0 0 24.00 24.00" },
      { xmlns: "http://www.w3.org/2000/svg" },
      { "xml:space": "preserve" },
      { stroke: "#19376D" },
      { "stroke-width": "0.00024000000000000003" },
      { transform: "matrix(1, 0, 0, 1, 0, 0)" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.906 1.345C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.325 5-3.976-1 1.325-2.166 1.822-3.5 1.491-.761-.189-1.305-.738-1.907-1.345-.98-.99-2.114-2.134-4.593-2.134zM7 12c-2.667 0-4.333 1.325-5 3.976 1-1.326 2.167-1.822 3.5-1.491.761.189 1.305.738 1.907 1.345.98.989 2.115 2.134 4.594 2.134 2.667 0 4.333-1.325 5-3.976-1 1.325-2.167 1.822-3.5 1.491-.761-.189-1.305-.738-1.906-1.345C10.613 13.145 9.478 12 7 12z"></path></g></svg>`;
});
const Svelte = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.438 2.94656C13.0222 3.84625 13.0826 4.82176 12.784 5.56064C12.2332 5.04017 11.5732 4.66735 10.8806 4.48388C10.8888 4.33095 10.8504 4.17412 10.7606 4.03584C10.535 3.68845 10.0705 3.58972 9.72314 3.81532L8.0472 4.90369C8.04673 4.90399 8.04627 4.90429 8.0458 4.9046L5.52979 6.53851C5.1824 6.76411 5.08367 7.22861 5.30926 7.57599C5.53486 7.92338 5.99936 8.02212 6.34675 7.79652L8.86347 6.16214C8.86323 6.16229 8.86371 6.16198 8.86347 6.16214C9.81822 5.54278 11.3592 5.87563 12.2475 7.24351C13.1361 8.61173 12.813 10.1553 11.8583 10.7753L6.82625 14.0431C5.87156 14.6631 4.33001 14.3304 3.44148 12.9622C2.85722 12.0625 2.79684 11.087 3.09545 10.3481C3.64623 10.8686 4.30624 11.2414 4.99882 11.4249C4.99062 11.5778 5.02903 11.7347 5.11882 11.8729C5.34442 12.2203 5.80892 12.3191 6.15631 12.0935L10.3497 9.37027C10.697 9.14467 10.7958 8.68017 10.5702 8.33279C10.3446 7.9854 9.88009 7.88666 9.5327 8.11226L7.01644 9.74634C7.01652 9.74629 7.01635 9.7464 7.01644 9.74634C6.06172 10.3661 4.52038 10.0334 3.63192 8.66527C2.74339 7.29705 3.06648 5.75348 4.02117 5.13349L9.0532 1.86566C10.0079 1.24567 11.5494 1.57834 12.438 2.94656ZM13.7667 6.88194C14.7218 5.56301 14.6705 3.63028 13.696 2.1296C12.4789 0.255528 10.0607 -0.577139 8.23624 0.607651L3.20422 3.87549C1.52381 4.96675 1.20205 7.21441 2.11271 9.02685C1.15769 10.3458 1.20893 12.2785 2.18348 13.7792C3.40052 15.6533 5.81879 16.4859 7.64321 15.3011L12.6752 12.0333C14.3556 10.942 14.6774 8.69437 13.7667 6.88194Z" fill="#19376D"></path></g></svg>`;
});
const Javascript = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { version: "1.1" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        "xmlns:xlink": "http://www.w3.org/1999/xlink"
      },
      { fill: "#19376D" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#19376D" d="M9.633 7.968h3.751v10.514c0 4.738-2.271 6.392-5.899 6.392-0.888 0-2.024-0.148-2.764-0.395l0.42-3.036c0.518 0.173 1.185 0.296 1.925 0.296 1.58 0 2.567-0.716 2.567-3.282v-10.489zM16.641 20.753c0.987 0.518 2.567 1.037 4.171 1.037 1.728 0 2.641-0.716 2.641-1.826 0-1.012-0.79-1.629-2.789-2.32-2.764-0.987-4.59-2.517-4.59-4.961 0-2.838 2.394-4.985 6.293-4.985 1.9 0 3.258 0.37 4.245 0.839l-0.839 3.011c-0.642-0.321-1.851-0.79-3.455-0.79-1.629 0-2.419 0.765-2.419 1.604 0 1.061 0.913 1.53 3.085 2.369 2.937 1.086 4.294 2.616 4.294 4.985 0 2.789-2.122 5.158-6.688 5.158-1.9 0-3.776-0.518-4.714-1.037l0.765-3.085z"></path></g></svg>`;
});
const Laravel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { fill: "#19376D" },
      { viewBox: "0 0 32 32" },
      { version: "1.1" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>laravel</title><path d="M13.143 23.585l10.46-5.97-4.752-2.736-10.453 6.019zM24.084 11.374l-4.757-2.736v5.417l4.758 2.737zM24.559 5.078l-4.756 2.736 4.756 2.736 4.755-2.737zM9.911 18.928l2.76-1.589v-11.934l-4.758 2.738v11.934zM7.437 1.846l-4.756 2.737 4.756 2.737 4.753-2.737zM2.204 5.406v18.452l10.464 6.022v-5.471l-5.472-3.096c-0.018-0.013-0.032-0.027-0.051-0.039-0.014-0.013-0.030-0.023-0.044-0.034l-0.001-0.003c-0.015-0.015-0.028-0.031-0.039-0.049l-0.001-0.001c-0.014-0.013-0.025-0.028-0.035-0.045l-0.001-0.001h-0.003c-0.008-0.015-0.016-0.035-0.024-0.055l-0.001-0.004c-0.007-0.015-0.015-0.032-0.022-0.051l-0.001-0.003c-0.004-0.020-0.008-0.045-0.010-0.070l-0-0.002c-0.003-0.015-0.006-0.033-0.008-0.051l-0-0.001v-12.759l-2.757-1.59zM24.085 23.857v-5.422l-10.464 5.974v5.47zM29.789 14.055v-5.417l-4.756 2.737v5.417zM30.725 7.69c0.011 0.038 0.018 0.081 0.018 0.126v0 6.513c-0 0.176-0.095 0.329-0.237 0.411l-0.002 0.001-5.468 3.149v6.241c-0 0.175-0.095 0.328-0.236 0.411l-0.002 0.001-11.416 6.57c-0.024 0.013-0.052 0.025-0.081 0.033l-0.003 0.001-0.030 0.013c-0.036 0.011-0.078 0.017-0.121 0.017s-0.085-0.006-0.125-0.018l0.003 0.001c-0.015-0.004-0.027-0.009-0.039-0.016l0.001 0.001c-0.031-0.011-0.057-0.021-0.082-0.033l0.004 0.002-11.413-6.57c-0.144-0.084-0.239-0.237-0.239-0.412v0-19.548c0-0.044 0.007-0.087 0.019-0.127l-0.001 0.003c0.004-0.015 0.013-0.025 0.018-0.040 0.009-0.029 0.019-0.053 0.030-0.076l-0.001 0.003c0.008-0.016 0.018-0.030 0.029-0.042l-0 0 0.042-0.057 0.047-0.034c0.018-0.015 0.034-0.030 0.052-0.043h0.001l5.708-3.285c0.068-0.040 0.15-0.064 0.237-0.064s0.169 0.024 0.239 0.065l-0.002-0.001 5.71 3.285c0.019 0.013 0.035 0.027 0.051 0.042l-0-0 0.048 0.034c0.016 0.018 0.025 0.038 0.042 0.057 0.012 0.012 0.022 0.026 0.031 0.041l0.001 0.001c0.010 0.020 0.020 0.044 0.029 0.069l0.001 0.004 0.016 0.040c0.011 0.035 0.018 0.076 0.018 0.118 0 0.002 0 0.004-0 0.006v-0 12.208l4.756-2.737v-6.241c0-0.001 0-0.002 0-0.002 0-0.043 0.006-0.085 0.017-0.125l-0.001 0.003c0.004-0.013 0.013-0.025 0.016-0.040 0.010-0.030 0.020-0.054 0.032-0.078l-0.002 0.004c0.009-0.015 0.023-0.025 0.032-0.042 0.015-0.019 0.027-0.038 0.042-0.054 0.014-0.013 0.029-0.025 0.045-0.035l0.001-0.001c0.018-0.013 0.033-0.029 0.052-0.040h0.001l5.708-3.286c0.068-0.040 0.15-0.064 0.237-0.064s0.169 0.024 0.239 0.065l-0.002-0.001 5.708 3.286c0.020 0.013 0.034 0.027 0.053 0.039 0.015 0.013 0.032 0.023 0.046 0.035 0.016 0.018 0.028 0.038 0.043 0.056 0.011 0.012 0.021 0.026 0.030 0.040l0.001 0.001c0.012 0.022 0.022 0.047 0.030 0.073l0.001 0.003c0.008 0.012 0.014 0.025 0.019 0.039l0 0.001z"></path></g></svg>`;
});
const Nodejs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { fill: "#19376D" },
      { version: "1.1" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        "xmlns:xlink": "http://www.w3.org/1999/xlink"
      },
      { viewBox: "0 0 512 512" },
      { "enable-background": "new 0 0 512 512" },
      { "xml:space": "preserve" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="5151e0c8492e5103c096af88a51f17e3"><path display="inline" d="M482.585,147.869v216.113c0,14.025-7.546,27.084-19.672,34.143L275.665,506.241 c-5.989,3.474-12.782,5.259-19.719,5.259c-6.838,0-13.649-1.785-19.639-5.259l-62.521-36.99c-9.326-5.207-4.775-7.059-1.692-8.128 c12.454-4.322,14.973-5.318,28.268-12.863c1.387-0.793,3.216-0.483,4.647,0.343l48.031,28.519c1.741,0.981,4.2,0.981,5.801,0 l187.263-108.086c1.744-0.996,2.862-2.983,2.862-5.053V147.869c0-2.117-1.118-4.094-2.906-5.163L258.874,34.716 c-1.726-1.01-4.03-1.01-5.768,0L65.962,142.736c-1.818,1.04-2.965,3.079-2.965,5.133v216.113c0,2.069,1.146,4.009,2.954,4.99 l51.299,29.654c27.829,13.903,44.875-2.485,44.875-18.956V166.309c0-3.017,2.423-5.396,5.439-5.396h23.747 c2.969,0,5.429,2.378,5.429,5.396v213.362c0,37.146-20.236,58.454-55.452,58.454c-10.816,0-19.347,0-43.138-11.713l-49.098-28.287 c-12.133-6.995-19.638-20.117-19.638-34.143V147.869c0-14.043,7.505-27.15,19.638-34.135L236.308,5.526 c11.85-6.701,27.608-6.701,39.357,0l187.248,108.208C475.039,120.748,482.585,133.826,482.585,147.869z M321.171,343.367 c-55.88,0-68.175-14.048-72.294-41.836c-0.477-2.966-3.018-5.175-6.063-5.175h-27.306c-3.382,0-6.096,2.703-6.096,6.104 c0,35.56,19.354,77.971,111.759,77.971c66.906,0,105.269-26.339,105.269-72.343c0-45.623-30.827-57.76-95.709-66.35 c-65.579-8.678-72.243-13.147-72.243-28.508c0-12.661,5.643-29.581,54.216-29.581c43.374,0,59.365,9.349,65.94,38.576 c0.579,2.755,3.083,4.765,5.923,4.765h27.409c1.7,0,3.315-0.73,4.47-1.943c1.158-1.28,1.773-2.947,1.611-4.695 c-4.241-50.377-37.713-73.844-105.354-73.844c-60.209,0-96.118,25.414-96.118,68.002c0,46.217,35.729,59,93.5,64.702 c69.138,6.782,74.504,16.883,74.504,30.488C384.589,333.299,365.655,343.367,321.171,343.367z"></path></g></g></svg>`;
});
const Html = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { fill: "#19376D" },
      { viewBox: "0 0 32 32" },
      { version: "1.1" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>html5</title><path d="M11.677 13.196l-0.289-3.387 12.536 0.004 0.287-3.268-16.421-0.004 0.87 9.983h11.374l-0.406 4.27-3.627 1.002-3.683-1.009-0.234-2.63h-3.252l0.411 5.198 6.757 1.807 6.704-1.798 0.927-10.166h-11.954zM2.914 1.045h26.172l-2.38 26.874-10.734 3.037-10.673-3.038z"></path></g></svg>`;
});
const Css = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { fill: "#19376D" },
      { version: "1.1" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        "xmlns:xlink": "http://www.w3.org/1999/xlink"
      },
      { viewBox: "0 0 512 512" },
      { "enable-background": "new 0 0 512 512" },
      { "xml:space": "preserve" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="c133de6af664cd4f011a55de6b001b19"><path display="inline" d="M483.111,0.501l-42.59,461.314l-184.524,49.684L71.47,461.815L28.889,0.501H483.111z M397.29,94.302 H255.831H111.866l6.885,55.708h137.08h7.7l-7.7,3.205l-132.07,55.006l4.38,54.453l127.69,0.414l68.438,0.217l-4.381,72.606 l-64.058,18.035v-0.057l-0.525,0.146l-61.864-15.617l-3.754-45.07h-0.205H132.1h-0.202l7.511,87.007l116.423,34.429v-0.062 l0.21,0.062l115.799-33.802l15.021-172.761h-131.03h-0.323l0.323-0.14l135.83-58.071L397.29,94.302z"></path></g></g></svg>`;
});
const Email = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M14.5 9.50012H9.5M3.02832 10.0001L10.2246 14.8167C10.8661 15.2444 11.1869 15.4582 11.5336 15.5413C11.8399 15.6147 12.1593 15.6147 12.4657 15.5413C12.8124 15.4582 13.1332 15.2444 13.7747 14.8167L20.971 10.0001M10.2981 4.06892L4.49814 7.71139C3.95121 8.05487 3.67775 8.2266 3.4794 8.45876C3.30385 8.66424 3.17176 8.90317 3.09111 9.16112C3 9.45256 3 9.77548 3 10.4213V16.8001C3 17.9202 3 18.4803 3.21799 18.9081C3.40973 19.2844 3.71569 19.5904 4.09202 19.7821C4.51984 20.0001 5.0799 20.0001 6.2 20.0001H17.8C18.9201 20.0001 19.4802 20.0001 19.908 19.7821C20.2843 19.5904 20.5903 19.2844 20.782 18.9081C21 18.4803 21 17.9202 21 16.8001V10.4213C21 9.77548 21 9.45256 20.9089 9.16112C20.8282 8.90317 20.6962 8.66424 20.5206 8.45876C20.3223 8.2266 20.0488 8.05487 19.5019 7.71139L13.7019 4.06891C13.0846 3.68129 12.776 3.48747 12.4449 3.41192C12.152 3.34512 11.848 3.34512 11.5551 3.41192C11.224 3.48747 10.9154 3.68129 10.2981 4.06892Z" stroke="#19376D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`;
});
const Linkedin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { viewBox: "0 0 20 20" },
      { version: "1.1" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        "xmlns:xlink": "http://www.w3.org/1999/xlink"
      },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps),
      { fill: "#19376D" }
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>linkedin [#19376D]</title><desc>Created with Sketch.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dribbble-Light-Preview" transform="translate(-180.000000, -7479.000000)" fill="#19376D"><g id="icons" transform="translate(56.000000, 160.000000)"><path d="M144,7339 L140,7339 L140,7332.001 C140,7330.081 139.153,7329.01 137.634,7329.01 C135.981,7329.01 135,7330.126 135,7332.001 L135,7339 L131,7339 L131,7326 L135,7326 L135,7327.462 C135,7327.462 136.255,7325.26 139.083,7325.26 C141.912,7325.26 144,7326.986 144,7330.558 L144,7339 L144,7339 Z M126.442,7323.921 C125.093,7323.921 124,7322.819 124,7321.46 C124,7320.102 125.093,7319 126.442,7319 C127.79,7319 128.883,7320.102 128.883,7321.46 C128.884,7322.819 127.79,7323.921 126.442,7323.921 L126.442,7323.921 Z M124,7339 L129,7339 L129,7326 L124,7326 L124,7339 Z" id="linkedin-[#19376D]"></path></g></g></g></g></svg>`;
});
const Github = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4.0744 2.9938C4.13263 1.96371 4.37869 1.51577 5.08432 1.15606C5.84357 0.768899 7.04106 0.949072 8.45014 1.66261C9.05706 1.97009 9.11886 1.97635 10.1825 1.83998C11.5963 1.65865 13.4164 1.65929 14.7213 1.84164C15.7081 1.97954 15.7729 1.97265 16.3813 1.66453C18.3814 0.651679 19.9605 0.71795 20.5323 1.8387C20.8177 2.39812 20.8707 3.84971 20.6494 5.04695C20.5267 5.71069 20.5397 5.79356 20.8353 6.22912C22.915 9.29385 21.4165 14.2616 17.8528 16.1155C17.5801 16.2574 17.3503 16.3452 17.163 16.4167C16.5879 16.6363 16.4133 16.703 16.6247 17.7138C16.7265 18.2 16.8491 19.4088 16.8973 20.4002C16.9844 22.1922 16.9831 22.2047 16.6688 22.5703C16.241 23.0676 15.6244 23.076 15.2066 22.5902C14.9341 22.2734 14.9075 22.1238 14.9075 20.9015C14.9075 19.0952 14.7095 17.8946 14.2417 16.8658C13.6854 15.6415 14.0978 15.185 15.37 14.9114C17.1383 14.531 18.5194 13.4397 19.2892 11.8146C20.0211 10.2698 20.1314 8.13501 18.8082 6.83668C18.4319 6.3895 18.4057 5.98446 18.6744 4.76309C18.7748 4.3066 18.859 3.71768 18.8615 3.45425C18.8653 3.03823 18.8274 2.97541 18.5719 2.97541C18.4102 2.97541 17.7924 3.21062 17.1992 3.49805L16.2524 3.95695C16.1663 3.99866 16.07 4.0147 15.975 4.0038C13.5675 3.72746 11.2799 3.72319 8.86062 4.00488C8.76526 4.01598 8.66853 3.99994 8.58215 3.95802L7.63585 3.49882C7.04259 3.21087 6.42482 2.97541 6.26317 2.97541C5.88941 2.97541 5.88379 3.25135 6.22447 4.89078C6.43258 5.89203 6.57262 6.11513 5.97101 6.91572C5.06925 8.11576 4.844 9.60592 5.32757 11.1716C5.93704 13.1446 7.4295 14.4775 9.52773 14.9222C10.7926 15.1903 11.1232 15.5401 10.6402 16.9905C10.26 18.1319 10.0196 18.4261 9.46707 18.4261C8.72365 18.4261 8.25796 17.7821 8.51424 17.1082C8.62712 16.8112 8.59354 16.7795 7.89711 16.5255C5.77117 15.7504 4.14514 14.0131 3.40172 11.7223C2.82711 9.95184 3.07994 7.64739 4.00175 6.25453C4.31561 5.78028 4.32047 5.74006 4.174 4.83217C4.09113 4.31822 4.04631 3.49103 4.0744 2.9938Z" fill="#19376D"></path><path d="M3.33203 15.9454C3.02568 15.4859 2.40481 15.3617 1.94528 15.6681C1.48576 15.9744 1.36158 16.5953 1.66793 17.0548C1.8941 17.3941 2.16467 17.6728 2.39444 17.9025C2.4368 17.9449 2.47796 17.9858 2.51815 18.0257C2.71062 18.2169 2.88056 18.3857 3.05124 18.5861C3.42875 19.0292 3.80536 19.626 4.0194 20.6962C4.11474 21.1729 4.45739 21.4297 4.64725 21.5419C4.85315 21.6635 5.07812 21.7352 5.26325 21.7819C5.64196 21.8774 6.10169 21.927 6.53799 21.9559C7.01695 21.9877 7.53592 21.998 7.99999 22.0008C8.00033 22.5527 8.44791 23.0001 8.99998 23.0001C9.55227 23.0001 9.99998 22.5524 9.99998 22.0001V21.0001C9.99998 20.4478 9.55227 20.0001 8.99998 20.0001C8.90571 20.0001 8.80372 20.0004 8.69569 20.0008C8.10883 20.0026 7.34388 20.0049 6.67018 19.9603C6.34531 19.9388 6.07825 19.9083 5.88241 19.871C5.58083 18.6871 5.09362 17.8994 4.57373 17.2891C4.34391 17.0194 4.10593 16.7834 3.91236 16.5914C3.87612 16.5555 3.84144 16.5211 3.80865 16.4883C3.5853 16.265 3.4392 16.1062 3.33203 15.9454Z" fill="#19376D"></path></g></svg>`;
});
const Location = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#19376D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#19376D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`;
});
const Linux = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { fill: "#19376D" },
      { viewBox: "0 0 32 32" },
      { version: "1.1" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>linux</title><path d="M14.923 8.080c-0.025 0.072-0.141 0.061-0.207 0.082-0.059 0.031-0.107 0.085-0.175 0.085-0.062 0-0.162-0.025-0.17-0.085-0.012-0.082 0.11-0.166 0.187-0.166 0.050-0.024 0.108-0.037 0.169-0.037 0.056 0 0.109 0.011 0.157 0.032l-0.003-0.001c0.022 0.009 0.038 0.030 0.038 0.055 0 0.003-0 0.005-0.001 0.008l0-0v0.025h0.004zM15.611 8.080v-0.027c-0.008-0.025 0.016-0.052 0.036-0.062 0.046-0.020 0.1-0.032 0.157-0.032 0.061 0 0.119 0.014 0.17 0.038l-0.002-0.001c0.079 0 0.2 0.084 0.187 0.169-0.007 0.061-0.106 0.082-0.169 0.082-0.069 0-0.115-0.054-0.176-0.085-0.065-0.023-0.182-0.010-0.204-0.081zM16.963 10.058c-0.532 0.337-1.161 0.574-1.835 0.666l-0.024 0.003c-0.606-0.035-1.157-0.248-1.607-0.588l0.007 0.005c-0.192-0.167-0.35-0.335-0.466-0.419-0.205-0.167-0.18-0.416-0.092-0.416 0.136 0.020 0.161 0.167 0.249 0.25 0.12 0.082 0.269 0.25 0.45 0.416 0.397 0.328 0.899 0.541 1.45 0.583l0.009 0.001c0.654-0.057 1.249-0.267 1.763-0.592l-0.016 0.010c0.244-0.169 0.556-0.417 0.81-0.584 0.195-0.17 0.186-0.334 0.349-0.334 0.16 0.020 0.043 0.167-0.184 0.415-0.246 0.188-0.527 0.381-0.818 0.56l-0.044 0.025zM8.017 21.397h0.012c0.069 0 0.137 0.007 0.203 0.019l-0.007-0.001c0.544 0.14 0.992 0.478 1.273 0.931l0.005 0.009 1.137 2.079 0.004 0.004c0.457 0.773 0.948 1.442 1.497 2.059l-0.011-0.013c0.49 0.52 0.82 1.196 0.909 1.946l0.002 0.016v0.008c-0.012 0.817-0.613 1.491-1.396 1.616l-0.009 0.001c-0.2 0.031-0.432 0.048-0.667 0.048-0.857 0-1.659-0.233-2.347-0.64l0.021 0.012c-1.053-0.441-2.275-0.714-3.555-0.752l-0.015-0c-0.372-0.025-0.696-0.215-0.901-0.496l-0.002-0.003c-0.054-0.174-0.085-0.374-0.085-0.582 0-0.35 0.088-0.679 0.244-0.966l-0.005 0.011v-0.005l0.003-0.004c0.041-0.188 0.065-0.405 0.065-0.627 0-0.274-0.036-0.539-0.104-0.791l0.005 0.021c-0.041-0.15-0.065-0.323-0.065-0.502 0-0.242 0.043-0.473 0.123-0.687l-0.004 0.014c0.2-0.417 0.495-0.5 0.862-0.666 0.438-0.133 0.819-0.334 1.151-0.593l-0.008 0.006h0.002v-0.003c0.32-0.335 0.556-0.751 0.835-1.047 0.195-0.249 0.492-0.41 0.827-0.42l0.002-0zM21.531 21.336c-0.001 0.017-0.001 0.038-0.001 0.059 0 0.743 0.449 1.381 1.091 1.658l0.012 0.005c0.048 0.003 0.104 0.005 0.16 0.005 0.831 0 1.575-0.371 2.075-0.957l0.003-0.004 0.264-0.012c0.053-0.008 0.114-0.012 0.176-0.012 0.341 0 0.652 0.132 0.883 0.348l-0.001-0.001 0.004 0.004c0.249 0.301 0.422 0.673 0.487 1.082l0.002 0.013c0.055 0.505 0.238 0.96 0.517 1.34l-0.005-0.008c0.416 0.356 0.705 0.85 0.793 1.411l0.002 0.013 0.004-0.009v0.022l-0.004-0.015c-0.019 0.327-0.231 0.495-0.622 0.744-1.184 0.497-2.201 1.158-3.077 1.968l0.007-0.006c-0.608 0.792-1.501 1.339-2.523 1.486l-0.021 0.002c-0.074 0.010-0.16 0.016-0.247 0.016-0.768 0-1.428-0.464-1.716-1.126l-0.005-0.012-0.006-0.004c-0.093-0.286-0.146-0.615-0.146-0.956 0-0.416 0.079-0.813 0.224-1.178l-0.008 0.022c0.234-0.668 0.435-1.466 0.568-2.288l0.011-0.083c0.016-0.812 0.104-1.593 0.258-2.35l-0.014 0.083c0.085-0.518 0.381-0.954 0.794-1.225l0.007-0.004 0.056-0.027zM18.8 10.142c0.6 2.147 1.339 4.002 2.247 5.757l-0.079-0.167c0.613 1.090 1.090 2.355 1.363 3.695l0.014 0.084c0.009-0 0.020-0 0.031-0 0.217 0 0.427 0.029 0.627 0.084l-0.017-0.004c0.11-0.395 0.173-0.848 0.173-1.316 0-1.426-0.587-2.716-1.533-3.639l-0.001-0.001c-0.275-0.25-0.29-0.419-0.154-0.419 0.971 0.91 1.689 2.078 2.045 3.394l0.012 0.051c0.089 0.329 0.14 0.707 0.14 1.097 0 0.351-0.041 0.693-0.119 1.020l0.006-0.030c0.074 0.038 0.16 0.067 0.251 0.083l0.006 0.001c1.29 0.667 1.766 1.172 1.537 1.921v-0.054c-0.075-0.004-0.15 0-0.225 0h-0.020c0.189-0.584-0.227-1.031-1.331-1.53-1.143-0.5-2.057-0.42-2.212 0.581-0.011 0.049-0.019 0.106-0.022 0.165l-0 0.003c-0.073 0.030-0.16 0.058-0.25 0.078l-0.011 0.002c-0.508 0.336-0.87 0.859-0.989 1.469l-0.002 0.014c-0.148 0.695-0.241 1.5-0.256 2.323l-0 0.012v0.004c-0.091 0.637-0.23 1.207-0.418 1.753l0.020-0.066c-0.983 0.804-2.251 1.29-3.634 1.29-1.13 0-2.184-0.325-3.073-0.887l0.024 0.014c-0.146-0.253-0.313-0.472-0.503-0.667l0.001 0.001c-0.097-0.16-0.211-0.297-0.342-0.415l-0.002-0.001c0.207-0 0.407-0.031 0.596-0.088l-0.015 0.004c0.18-0.085 0.318-0.232 0.391-0.412l0.002-0.005c0.018-0.093 0.029-0.199 0.029-0.308 0-0.445-0.175-0.848-0.461-1.146l0.001 0.001c-0.619-0.761-1.359-1.395-2.196-1.88l-0.038-0.020c-0.671-0.388-1.179-0.995-1.43-1.722l-0.007-0.022c-0.093-0.318-0.147-0.684-0.147-1.062 0-0.353 0.047-0.695 0.134-1.021l-0.006 0.027c0.377-1.314 0.921-2.461 1.62-3.496l-0.028 0.043c0.134-0.081 0.046 0.169-0.51 1.217-0.474 0.713-0.757 1.59-0.757 2.533 0 0.84 0.224 1.627 0.616 2.306l-0.012-0.022c0.052-1.309 0.345-2.537 0.834-3.659l-0.025 0.065c1.055-1.902 1.854-4.111 2.275-6.452l0.020-0.131c0.060 0.045 0.271 0.169 0.361 0.252 0.272 0.166 0.475 0.416 0.737 0.581 0.267 0.26 0.633 0.42 1.035 0.42 0.021 0 0.042-0 0.063-0.001l-0.003 0c0.049 0.004 0.094 0.008 0.137 0.008 0.459-0.009 0.887-0.132 1.259-0.342l-0.013 0.007c0.362-0.167 0.65-0.417 0.925-0.5h0.006c0.535-0.145 0.983-0.454 1.3-0.869l0.004-0.006zM15.301 7.465c0.003 0 0.006-0 0.009-0 0.569 0 1.094 0.187 1.517 0.503l-0.007-0.005c0.378 0.234 0.814 0.433 1.275 0.574l0.040 0.010h0.004c0.246 0.11 0.449 0.281 0.594 0.494l0.003 0.005v-0.164c0.046 0.092 0.074 0.201 0.074 0.316 0 0.098-0.020 0.191-0.055 0.276l0.002-0.005c-0.288 0.507-0.755 0.884-1.313 1.048l-0.016 0.004v0.002c-0.335 0.169-0.626 0.416-0.968 0.581-0.35 0.21-0.771 0.334-1.222 0.334-0.015 0-0.030-0-0.045-0l0.002 0c-0.022 0.001-0.048 0.002-0.074 0.002-0.174 0-0.342-0.031-0.496-0.089l0.010 0.003c-0.159-0.087-0.29-0.169-0.417-0.257l0.014 0.010c-0.227-0.199-0.477-0.39-0.739-0.565l-0.026-0.016v-0.006h-0.006c-0.375-0.199-0.67-0.504-0.852-0.876l-0.005-0.012c-0.027-0.067-0.042-0.145-0.042-0.226 0-0.218 0.112-0.41 0.281-0.522l0.002-0.001c0.28-0.169 0.475-0.339 0.604-0.42 0.13-0.092 0.179-0.127 0.22-0.164h0.002v-0.004c0.268-0.339 0.623-0.599 1.032-0.746l0.016-0.005c0.174-0.050 0.374-0.079 0.581-0.081h0.001zM13.589 5.333h0.045c0.188 0.004 0.361 0.067 0.501 0.17l-0.002-0.002c0.179 0.159 0.325 0.352 0.425 0.57l0.004 0.011c0.113 0.245 0.183 0.53 0.191 0.83l0 0.003v0.005c0.004 0.046 0.006 0.099 0.006 0.152 0 0.063-0.003 0.126-0.009 0.188l0.001-0.008v0.1c-0.037 0.009-0.070 0.022-0.104 0.030-0.191 0.079-0.352 0.163-0.505 0.258l0.014-0.008c0.008-0.055 0.012-0.118 0.012-0.182 0-0.053-0.003-0.106-0.009-0.158l0.001 0.006v-0.019c-0.018-0.154-0.054-0.295-0.107-0.428l0.004 0.011c-0.041-0.132-0.113-0.244-0.207-0.333l-0-0c-0.055-0.050-0.128-0.081-0.209-0.081-0.007 0-0.014 0-0.021 0.001l0.001-0h-0.026c-0.103 0.011-0.189 0.075-0.232 0.163l-0.001 0.002c-0.077 0.093-0.13 0.208-0.15 0.334l-0 0.004c-0.023 0.086-0.035 0.185-0.035 0.287 0 0.044 0.002 0.088 0.007 0.131l-0-0.005v0.019c0.016 0.154 0.052 0.296 0.104 0.428l-0.004-0.011c0.042 0.132 0.113 0.245 0.207 0.335l0 0c0.012 0.012 0.026 0.022 0.042 0.030l0.001 0c-0.083 0.053-0.155 0.109-0.221 0.171l0.001-0.001c-0.045 0.040-0.1 0.070-0.161 0.084l-0.003 0.001c-0.123-0.147-0.237-0.312-0.335-0.486l-0.008-0.016c-0.113-0.245-0.183-0.529-0.194-0.83l-0-0.004c-0.004-0.048-0.006-0.104-0.006-0.161 0-0.241 0.039-0.473 0.11-0.69l-0.004 0.016c0.074-0.258 0.195-0.481 0.356-0.671l-0.002 0.003c0.127-0.15 0.313-0.245 0.522-0.25h0.001zM17.291 5.259h0.016c0.001 0 0.002 0 0.004 0 0.275 0 0.527 0.093 0.729 0.249l-0.003-0.002c0.229 0.177 0.413 0.4 0.542 0.655l0.005 0.011c0.121 0.266 0.196 0.575 0.207 0.901l0 0.004c0-0.025 0.007-0.050 0.007-0.075v0.131l-0.005-0.026-0.005-0.030c-0.003 0.32-0.071 0.622-0.193 0.897l0.006-0.014c-0.062 0.163-0.152 0.303-0.266 0.419l0-0c-0.030-0.018-0.067-0.035-0.104-0.050l-0.006-0.002c-0.135-0.042-0.253-0.099-0.36-0.169l0.005 0.003c-0.077-0.032-0.169-0.060-0.264-0.081l-0.011-0.002c0.081-0.076 0.156-0.157 0.225-0.243l0.004-0.005c0.063-0.148 0.102-0.319 0.11-0.499l0-0.003v-0.025c0-0.008 0-0.016 0-0.025 0-0.17-0.028-0.333-0.080-0.485l0.003 0.011c-0.063-0.159-0.14-0.296-0.232-0.421l0.004 0.005c-0.087-0.088-0.202-0.148-0.331-0.165l-0.003-0h-0.020c-0.001 0-0.003-0-0.004-0-0.132 0-0.25 0.065-0.322 0.164l-0.001 0.001c-0.116 0.113-0.204 0.253-0.254 0.41l-0.002 0.007c-0.063 0.147-0.104 0.318-0.112 0.496l-0 0.003v0.024c0.002 0.12 0.011 0.236 0.027 0.349l-0.002-0.015c-0.241-0.084-0.547-0.169-0.759-0.252-0.012-0.073-0.020-0.159-0.022-0.247l-0-0.003v-0.025c-0.001-0.020-0.001-0.043-0.001-0.066 0-0.324 0.069-0.631 0.194-0.908l-0.006 0.014c0.106-0.279 0.293-0.508 0.532-0.663l0.005-0.003c0.204-0.156 0.462-0.25 0.742-0.25h0zM16.63 1.004c-0.194 0-0.394 0.010-0.6 0.026-5.281 0.416-3.88 6.007-3.961 7.87-0.050 1.426-0.534 2.729-1.325 3.792l0.013-0.018c-1.407 1.602-2.555 3.474-3.351 5.523l-0.043 0.127c-0.258 0.685-0.408 1.476-0.408 2.302 0 0.285 0.018 0.566 0.052 0.841l-0.003-0.033c-0.056 0.046-0.103 0.102-0.136 0.166l-0.001 0.003c-0.325 0.335-0.562 0.75-0.829 1.048-0.283 0.217-0.615 0.388-0.975 0.494l-0.021 0.005c-0.464 0.139-0.842 0.442-1.075 0.841l-0.005 0.009c-0.104 0.212-0.165 0.461-0.165 0.725 0 0.010 0 0.019 0 0.029l-0-0.001c0.002 0.238 0.026 0.469 0.073 0.693l-0.004-0.023c0.056 0.219 0.088 0.471 0.088 0.73 0 0.17-0.014 0.337-0.041 0.5l0.002-0.018c-0.167 0.313-0.264 0.685-0.264 1.080 0 0.278 0.048 0.544 0.137 0.791l-0.005-0.016c0.273 0.388 0.686 0.662 1.164 0.749l0.011 0.002c1.274 0.107 2.451 0.373 3.561 0.78l-0.094-0.030c0.698 0.415 1.539 0.66 2.436 0.66 0.294 0 0.582-0.026 0.862-0.077l-0.029 0.004c0.667-0.151 1.211-0.586 1.504-1.169l0.006-0.013c0.734-0.004 1.537-0.336 2.824-0.417 0.873-0.072 1.967 0.334 3.22 0.25 0.037 0.159 0.086 0.298 0.148 0.429l-0.006-0.013 0.004 0.004c0.384 0.804 1.19 1.35 2.124 1.35 0.081 0 0.161-0.004 0.24-0.012l-0.010 0.001c1.151-0.17 2.139-0.768 2.813-1.623l0.007-0.009c0.843-0.768 1.827-1.401 2.905-1.853l0.067-0.025c0.432-0.191 0.742-0.585 0.81-1.059l0.001-0.007c-0.059-0.694-0.392-1.299-0.888-1.716l-0.004-0.003v-0.121l-0.004-0.004c-0.214-0.33-0.364-0.722-0.421-1.142l-0.002-0.015c-0.053-0.513-0.278-0.966-0.615-1.307l0 0h-0.004c-0.074-0.067-0.154-0.084-0.235-0.169-0.066-0.047-0.148-0.076-0.237-0.080l-0.001-0c0.195-0.602 0.308-1.294 0.308-2.013 0-0.94-0.193-1.835-0.541-2.647l0.017 0.044c-0.704-1.672-1.619-3.111-2.732-4.369l0.014 0.017c-1.105-1.082-1.828-2.551-1.948-4.187l-0.001-0.021c0.033-2.689 0.295-7.664-4.429-7.671z"></path></g></svg>`;
});
const Mysql = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { fill: "#19376D" },
      { viewBox: "0 0 24 24" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m24.129 23.412-.508-.484c-.251-.331-.518-.624-.809-.891l-.005-.004q-.448-.407-.931-.774-.387-.266-1.064-.641c-.371-.167-.661-.46-.818-.824l-.004-.01-.048-.024c.212-.021.406-.06.592-.115l-.023.006.57-.157c.236-.074.509-.122.792-.133h.006c.298-.012.579-.06.847-.139l-.025.006q.194-.048.399-.109t.351-.109v-.169q-.145-.217-.351-.496c-.131-.178-.278-.333-.443-.468l-.005-.004q-.629-.556-1.303-1.076c-.396-.309-.845-.624-1.311-.916l-.068-.04c-.246-.162-.528-.312-.825-.435l-.034-.012q-.448-.182-.883-.399c-.097-.048-.21-.09-.327-.119l-.011-.002c-.117-.024-.217-.084-.29-.169l-.001-.001c-.138-.182-.259-.389-.355-.609l-.008-.02q-.145-.339-.314-.651-.363-.702-.702-1.427t-.651-1.452q-.217-.484-.399-.967c-.134-.354-.285-.657-.461-.942l.013.023c-.432-.736-.863-1.364-1.331-1.961l.028.038c-.463-.584-.943-1.106-1.459-1.59l-.008-.007c-.509-.478-1.057-.934-1.632-1.356l-.049-.035q-.896-.651-1.96-1.282c-.285-.168-.616-.305-.965-.393l-.026-.006-1.113-.278-.629-.048q-.314-.024-.629-.024c-.148-.078-.275-.171-.387-.279-.11-.105-.229-.204-.353-.295l-.01-.007c-.605-.353-1.308-.676-2.043-.93l-.085-.026c-.193-.113-.425-.179-.672-.179-.176 0-.345.034-.499.095l.009-.003c-.38.151-.67.458-.795.84l-.003.01c-.073.172-.115.371-.115.581 0 .368.13.705.347.968l-.002-.003q.544.725.834 1.14.217.291.448.605c.141.188.266.403.367.63l.008.021c.056.119.105.261.141.407l.003.016q.048.206.121.448.217.556.411 1.14c.141.425.297.785.478 1.128l-.019-.04q.145.266.291.52t.314.496c.065.098.147.179.241.242l.003.002c.099.072.164.185.169.313v.001c-.114.168-.191.369-.217.586l-.001.006c-.035.253-.085.478-.153.695l.008-.03c-.223.666-.351 1.434-.351 2.231 0 .258.013.512.04.763l-.003-.031c.06.958.349 1.838.812 2.6l-.014-.025c.197.295.408.552.641.787.168.188.412.306.684.306.152 0 .296-.037.422-.103l-.005.002c.35-.126.599-.446.617-.827v-.002c.048-.474.12-.898.219-1.312l-.013.067c.024-.063.038-.135.038-.211 0-.015-.001-.03-.002-.045v.002q-.012-.109.133-.206v.048q.145.339.302.677t.326.677c.295.449.608.841.952 1.202l-.003-.003c.345.372.721.706 1.127 1.001l.022.015c.212.162.398.337.566.528l.004.004c.158.186.347.339.56.454l.01.005v-.024h.048c-.039-.087-.102-.157-.18-.205l-.002-.001c-.079-.044-.147-.088-.211-.136l.005.003q-.217-.217-.448-.484t-.423-.508q-.508-.702-.969-1.467t-.871-1.555q-.194-.387-.375-.798t-.351-.798c-.049-.099-.083-.213-.096-.334v-.005c-.006-.115-.072-.214-.168-.265l-.002-.001c-.121.206-.255.384-.408.545l.001-.001c-.159.167-.289.364-.382.58l-.005.013c-.141.342-.244.739-.289 1.154l-.002.019q-.072.641-.145 1.318l-.048.024-.024.024c-.26-.053-.474-.219-.59-.443l-.002-.005q-.182-.351-.326-.69c-.248-.637-.402-1.374-.423-2.144v-.009c-.009-.122-.013-.265-.013-.408 0-.666.105-1.308.299-1.91l-.012.044q.072-.266.314-.896t.097-.871c-.05-.165-.143-.304-.265-.41l-.001-.001c-.122-.106-.233-.217-.335-.335l-.003-.004q-.169-.244-.326-.52t-.278-.544c-.165-.382-.334-.861-.474-1.353l-.022-.089c-.159-.565-.336-1.043-.546-1.503l.026.064c-.111-.252-.24-.47-.39-.669l.006.008q-.244-.326-.436-.617-.244-.314-.484-.605c-.163-.197-.308-.419-.426-.657l-.009-.02c-.048-.097-.09-.21-.119-.327l-.002-.011c-.011-.035-.017-.076-.017-.117 0-.082.024-.159.066-.223l-.001.002c.011-.056.037-.105.073-.145.039-.035.089-.061.143-.072h.002c.085-.055.188-.088.3-.088.084 0 .165.019.236.053l-.003-.001c.219.062.396.124.569.195l-.036-.013q.459.194.847.375c.298.142.552.292.792.459l-.018-.012q.194.121.387.266t.411.291h.339q.387 0 .822.037c.293.023.564.078.822.164l-.024-.007c.481.143.894.312 1.286.515l-.041-.019q.593.302 1.125.641c.589.367 1.098.743 1.577 1.154l-.017-.014c.5.428.954.867 1.38 1.331l.01.012c.416.454.813.947 1.176 1.464l.031.047c.334.472.671 1.018.974 1.584l.042.085c.081.154.163.343.234.536l.011.033q.097.278.217.57.266.605.57 1.221t.57 1.198l.532 1.161c.187.406.396.756.639 1.079l-.011-.015c.203.217.474.369.778.422l.008.001c.368.092.678.196.978.319l-.047-.017c.143.065.327.134.516.195l.04.011c.212.065.396.151.565.259l-.009-.005c.327.183.604.363.868.559l-.021-.015q.411.302.822.57.194.145.651.423t.484.52c-.114-.004-.249-.007-.384-.007-.492 0-.976.032-1.45.094l.056-.006c-.536.072-1.022.203-1.479.39l.04-.014c-.113.049-.248.094-.388.129l-.019.004c-.142.021-.252.135-.266.277v.001c.061.076.11.164.143.26l.002.006c.034.102.075.19.125.272l-.003-.006c.119.211.247.393.391.561l-.004-.005c.141.174.3.325.476.454l.007.005q.244.194.508.399c.161.126.343.25.532.362l.024.013c.284.174.614.34.958.479l.046.016c.374.15.695.324.993.531l-.016-.011q.291.169.58.375t.556.399c.073.072.137.152.191.239l.003.005c.091.104.217.175.36.193h.003v-.048c-.088-.067-.153-.16-.184-.267l-.001-.004c-.025-.102-.062-.191-.112-.273l.002.004zm-18.576-19.205q-.194 0-.363.012c-.115.008-.222.029-.323.063l.009-.003v.024h.048q.097.145.244.326t.266.351l.387.798.048-.024c.113-.082.2-.192.252-.321l.002-.005c.052-.139.082-.301.082-.469 0-.018 0-.036-.001-.054v.003c-.045-.044-.082-.096-.108-.154l-.001-.003-.081-.182c-.053-.084-.127-.15-.214-.192l-.003-.001c-.094-.045-.174-.102-.244-.169z"></path></g></svg>`;
});
const Mariadb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { fill: "#19376D" },
      { viewBox: "0 0 32 32" },
      { version: "1.1" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>mariadb</title><path d="M29.942 6.518c-0.597 0.293-1.3 0.465-2.042 0.465-0.017 0-0.034-0-0.051-0l0.003 0c-0.543 0-1.064 0.096-1.546 0.271l0.032-0.010c-1.052 0.391-1.916 1.082-2.513 1.969l-0.012 0.018c-0.495 0.693-1.011 1.505-1.487 2.343l-0.074 0.142c-0.382 0.63-0.759 1.169-1.168 1.681l0.024-0.031c-0.701 0.866-1.6 1.545-2.63 1.971l-0.044 0.016c-1.369 0.617-3.070 1.245-4.818 1.767l-0.308 0.079c-1.341 0.441-2.665 0.922-2.958 1.080-1.109 0.603-2.030 1.418-2.737 2.398l-0.016 0.024c-1.253 1.65-1.215 1.641-3.801 1.183q-0.421-0.051-0.844-0.079c-0.12-0.026-0.258-0.041-0.399-0.041-0.483 0-0.925 0.173-1.268 0.461l0.003-0.003-0.284 0.269 0.221 0.11c0.268 0.167 0.496 0.331 0.714 0.508l-0.013-0.010c0.202 0.167 0.426 0.328 0.661 0.473l0.026 0.015c0.089 0.041 0.164 0.084 0.236 0.131l-0.007-0.004c-0.078 0.169-0.173 0.314-0.287 0.443l0.002-0.002c-0.544 0.726-0.741 1.088-0.717 1.31 0.024 0.205 0.040 0.212 0.537 0.212 0.027 0.001 0.059 0.001 0.091 0.001 0.533 0 1.043-0.096 1.515-0.271l-0.030 0.010c1.352-0.551 2.496-1.138 3.582-1.809l-0.103 0.059c0.704-0.485 1.508-0.922 2.358-1.271l0.086-0.031c0.102-0.025 0.442-0.087 0.742-0.142 0.42-0.055 0.906-0.087 1.4-0.087 0.647 0 1.282 0.054 1.899 0.159l-0.067-0.009c0.135 0.016 0.466 0.056 0.75 0.080 0.208 0.014 0.402 0.048 0.587 0.1l-0.020-0.005c0.033 0.015 0.592 0.046 1.247 0.070 1.167 0.032 1.38 0.009 1.625-0.236 0.256-0.353 0.467-0.761 0.613-1.199l0.009-0.032c0.261-0.804 0.521-1.151 0.457-0.615-0.1 1.117-0.418 2.14-0.912 3.055l0.021-0.042c-0.351 0.662-0.738 1.234-1.179 1.758l0.012-0.015c-0.402 0.434-0.394 0.45 0.11 0.394 0.991-0.155 1.876-0.516 2.641-1.039l-0.022 0.014c1.225-0.975 2.167-2.255 2.717-3.727l0.019-0.059c0.134-0.337 0.275-0.275 0.229 0.104-0.016 0.117-0.047 0.394-0.071 0.622l-0.039 0.41 0.441-0.252c1.245-0.867 2.178-2.107 2.644-3.555l0.014-0.049c0.473-1.33 0.936-2.995 1.294-4.699l0.047-0.269c0.106-0.524 0.223-0.961 0.363-1.387l-0.024 0.085c0.092-0.425 0.305-0.791 0.599-1.071l0.001-0.001c0.37-0.353 0.768-0.684 1.189-0.987l0.033-0.023c0.63-0.358 1.134-0.87 1.473-1.486l0.010-0.020c0.16-0.307 0.254-0.671 0.254-1.057 0-0.227-0.033-0.447-0.093-0.655l0.004 0.016c-0.165-0.252-0.355-0.245-0.954 0.008z"></path></g></svg>`;
});
const Lua = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3.259 12.714a5.727 5.727 0 008.147 0 5.845 5.845 0 000-8.217 5.727 5.727 0 00-8.147 0 5.845 5.845 0 000 8.217zm-1.111 1.12c-2.864-2.887-2.864-7.57 0-10.457a7.289 7.289 0 0110.369 0c2.863 2.888 2.863 7.57 0 10.457a7.289 7.289 0 01-10.37 0zM15.54 2.705a1.562 1.562 0 01-2.222 0 1.594 1.594 0 010-2.24 1.562 1.562 0 012.222 0 1.594 1.594 0 010 2.24z" fill="#19376D"></path><path d="M11.844 8.673a3.124 3.124 0 01-4.444 0 3.188 3.188 0 010-4.481 3.124 3.124 0 014.444 0 3.188 3.188 0 010 4.481zM8.51 7.553a1.562 1.562 0 002.222 0 1.594 1.594 0 000-2.24 1.562 1.562 0 00-2.222 0 1.594 1.594 0 000 2.24z" fill="#19376D"></path></g></svg>`;
});
const LanguageSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_locale;
  $$unsubscribe_locale = subscribe(locale, (value) => value);
  $$unsubscribe_locale();
  return `<div class="fixed top-0 right-0 m-4 z-50"><select class="p-2 bg-transparent text-[#A5D7E8] uppercase">${each(locales, (l) => {
    return `<option class="uppercase text-[#0B2447]"${add_attribute("value", l, 0)}>${escape(l)}</option>`;
  })}</select></div>`;
});
Promise.resolve();
var Presence;
(function(Presence2) {
  Presence2[Presence2["Entering"] = 0] = "Entering";
  Presence2[Presence2["Present"] = 1] = "Present";
  Presence2[Presence2["Exiting"] = 2] = "Exiting";
})(Presence || (Presence = {}));
var VisibilityAction;
(function(VisibilityAction2) {
  VisibilityAction2[VisibilityAction2["Hide"] = 0] = "Hide";
  VisibilityAction2[VisibilityAction2["Show"] = 1] = "Show";
})(VisibilityAction || (VisibilityAction = {}));
function addUniqueItem(arr, item) {
  arr.indexOf(item) === -1 && arr.push(item);
}
function removeItem(arr, item) {
  var index = arr.indexOf(item);
  index > -1 && arr.splice(index, 1);
}
var SubscriptionManager = (
  /** @class */
  function() {
    function SubscriptionManager2() {
      this.subscriptions = [];
    }
    SubscriptionManager2.prototype.add = function(handler) {
      var _this = this;
      addUniqueItem(this.subscriptions, handler);
      return function() {
        return removeItem(_this.subscriptions, handler);
      };
    };
    SubscriptionManager2.prototype.notify = function(a, b, c) {
      var numSubscriptions = this.subscriptions.length;
      if (!numSubscriptions)
        return;
      if (numSubscriptions === 1) {
        this.subscriptions[0](a, b, c);
      } else {
        for (var i = 0; i < numSubscriptions; i++) {
          var handler = this.subscriptions[i];
          handler && handler(a, b, c);
        }
      }
    };
    SubscriptionManager2.prototype.getSize = function() {
      return this.subscriptions.length;
    };
    SubscriptionManager2.prototype.clear = function() {
      this.subscriptions.length = 0;
    };
    return SubscriptionManager2;
  }()
);
var isFloat = function(value) {
  return !isNaN(parseFloat(value));
};
var MotionValue = (
  /** @class */
  function() {
    function MotionValue2(init, startStopNotifier) {
      var _this = this;
      this.timeDelta = 0;
      this.lastUpdated = 0;
      this.updateSubscribers = new SubscriptionManager();
      this.velocityUpdateSubscribers = new SubscriptionManager();
      this.renderSubscribers = new SubscriptionManager();
      this.canTrackVelocity = false;
      this.updateAndNotify = function(v, render) {
        if (render === void 0) {
          render = true;
        }
        _this.prev = _this.current;
        _this.current = v;
        var _a = getFrameData(), delta2 = _a.delta, timestamp = _a.timestamp;
        if (_this.lastUpdated !== timestamp) {
          _this.timeDelta = delta2;
          _this.lastUpdated = timestamp;
          sync.postRender(_this.scheduleVelocityCheck);
        }
        if (_this.prev !== _this.current) {
          _this.updateSubscribers.notify(_this.current);
        }
        if (_this.velocityUpdateSubscribers.getSize()) {
          _this.velocityUpdateSubscribers.notify(_this.getVelocity());
        }
        if (render) {
          _this.renderSubscribers.notify(_this.current);
        }
      };
      this.scheduleVelocityCheck = function() {
        return sync.postRender(_this.velocityCheck);
      };
      this.velocityCheck = function(_a) {
        var timestamp = _a.timestamp;
        if (timestamp !== _this.lastUpdated) {
          _this.prev = _this.current;
          _this.velocityUpdateSubscribers.notify(_this.getVelocity());
        }
      };
      this.hasAnimated = false;
      this.prev = this.current = init;
      this.canTrackVelocity = isFloat(this.current);
      this.onSubscription = () => {
      };
      this.onUnsubscription = () => {
      };
      if (startStopNotifier) {
        this.onSubscription = () => {
          if (this.updateSubscribers.getSize() + this.velocityUpdateSubscribers.getSize() + this.renderSubscribers.getSize() === 0) {
            const unsub = startStopNotifier();
            this.onUnsubscription = () => {
            };
            if (unsub) {
              this.onUnsubscription = () => {
                if (this.updateSubscribers.getSize() + this.velocityUpdateSubscribers.getSize() + this.renderSubscribers.getSize() === 0) {
                  unsub();
                }
              };
            }
          }
        };
      }
    }
    MotionValue2.prototype.onChange = function(subscription) {
      this.onSubscription();
      const unsub = this.updateSubscribers.add(subscription);
      return () => {
        unsub();
        this.onUnsubscription();
      };
    };
    MotionValue2.prototype.subscribe = function(subscription) {
      return this.onChange(subscription);
    };
    MotionValue2.prototype.clearListeners = function() {
      this.updateSubscribers.clear();
      this.onUnsubscription();
    };
    MotionValue2.prototype.onRenderRequest = function(subscription) {
      this.onSubscription();
      subscription(this.get());
      const unsub = this.renderSubscribers.add(subscription);
      return () => {
        unsub();
        this.onUnsubscription();
      };
    };
    MotionValue2.prototype.attach = function(passiveEffect) {
      this.passiveEffect = passiveEffect;
    };
    MotionValue2.prototype.set = function(v, render) {
      if (render === void 0) {
        render = true;
      }
      if (!render || !this.passiveEffect) {
        this.updateAndNotify(v, render);
      } else {
        this.passiveEffect(v, this.updateAndNotify);
      }
    };
    MotionValue2.prototype.update = function(v) {
      this.set(v(this.get()));
    };
    MotionValue2.prototype.get = function() {
      this.onSubscription();
      const curr = this.current;
      this.onUnsubscription();
      return curr;
    };
    MotionValue2.prototype.getPrevious = function() {
      return this.prev;
    };
    MotionValue2.prototype.getVelocity = function() {
      this.onSubscription();
      const vel = this.canTrackVelocity ? (
        // These casts could be avoided if parseFloat would be typed better
        velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta)
      ) : 0;
      this.onUnsubscription();
      return vel;
    };
    MotionValue2.prototype.start = function(animation) {
      var _this = this;
      this.stop();
      return new Promise(function(resolve) {
        _this.hasAnimated = true;
        _this.stopAnimation = animation(resolve);
      }).then(function() {
        return _this.clearAnimation();
      });
    };
    MotionValue2.prototype.stop = function() {
      if (this.stopAnimation)
        this.stopAnimation();
      this.clearAnimation();
    };
    MotionValue2.prototype.isAnimating = function() {
      return !!this.stopAnimation;
    };
    MotionValue2.prototype.clearAnimation = function() {
      this.stopAnimation = null;
    };
    MotionValue2.prototype.destroy = function() {
      this.updateSubscribers.clear();
      this.renderSubscribers.clear();
      this.stop();
      this.onUnsubscription();
    };
    return MotionValue2;
  }()
);
function motionValue(init, startStopNotifier) {
  return new MotionValue(init, startStopNotifier);
}
const getDomContext = (name, el) => {
  if (!el || !window) {
    return void 0;
  }
  let par = el;
  while (par = par.parentNode) {
    if (par.motionDomContext && par.motionDomContext.has(name)) {
      return par.motionDomContext.get(name);
    }
  }
  return void 0;
};
const setDomContext = (name, el, value) => {
  if (el && window) {
    if (!el.motionDomContext) {
      el.motionDomContext = /* @__PURE__ */ new Map();
    }
    el.motionDomContext.set(name, value);
  }
};
var MotionConfigContext = (c) => getDomContext("MotionConfig", c) || writable({
  transformPagePoint: function(p) {
    return p;
  },
  isStatic: false
});
const ScaleCorrectionContext = (isCustom) => getDomContext("ScaleCorrection", isCustom) || writable([]);
const ScaleCorrectionParentContext = () => writable([]);
const provideScaleCorrection = (isCustom) => {
  const fromParent = getContext(ScaleCorrectionContext) || ScaleCorrectionContext(isCustom);
  const ctx = ScaleCorrectionContext();
  setContext(ScaleCorrectionContext, ctx);
  setDomContext("ScaleCorrection", isCustom, ctx);
  setContext(ScaleCorrectionParentContext, fromParent);
};
const ScaleCorrectionProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isCustom } = $$props;
  provideScaleCorrection(isCustom);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
  return `${slots.default ? slots.default({}) : ``}`;
});
var secondsToMilliseconds = function(seconds) {
  return seconds * 1e3;
};
var easingLookup = {
  linear,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate,
  bounceIn,
  bounceInOut,
  bounceOut
};
var easingDefinitionToFunction = function(definition) {
  if (Array.isArray(definition)) {
    var _a = __read(definition, 4), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    return easingLookup[definition];
  }
  return definition;
};
var isEasingArray = function(ease) {
  return Array.isArray(ease) && typeof ease[0] !== "number";
};
var isAnimatable = function(key, value) {
  if (key === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && // It's animatable if we have a string
  complex.test(value) && // And it contains numbers and/or colors
  !value.startsWith("url(")) {
    return true;
  }
  return false;
};
var isKeyframesTarget = function(v) {
  return Array.isArray(v);
};
var underDampedSpring = function() {
  return {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restDelta: 0.5,
    restSpeed: 10
  };
};
var criticallyDampedSpring = function(to) {
  return {
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 2 * Math.sqrt(550) : 30,
    restDelta: 0.01,
    restSpeed: 10
  };
};
var linearTween = function() {
  return {
    type: "keyframes",
    ease: "linear",
    duration: 0.3
  };
};
var keyframes = function(values) {
  return {
    type: "keyframes",
    duration: 0.8,
    values
  };
};
var defaultTransitions = {
  x: underDampedSpring,
  y: underDampedSpring,
  z: underDampedSpring,
  rotate: underDampedSpring,
  rotateX: underDampedSpring,
  rotateY: underDampedSpring,
  rotateZ: underDampedSpring,
  scaleX: criticallyDampedSpring,
  scaleY: criticallyDampedSpring,
  scale: criticallyDampedSpring,
  opacity: linearTween,
  backgroundColor: linearTween,
  color: linearTween,
  default: criticallyDampedSpring
};
var getDefaultTransition = function(valueKey, to) {
  var transitionFactory;
  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes;
  } else {
    transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
  }
  return Object.assign({ to }, transitionFactory(to));
};
var int = Object.assign(Object.assign({}, number), { transform: Math.round });
var numberValueTypes = {
  // Border props
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  // Positioning props
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  size: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  // Spacing props
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  // Transform props
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,
  // Misc
  zIndex: int,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};
var defaultValueTypes = Object.assign(Object.assign({}, numberValueTypes), {
  // Color props
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  // Border props
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  filter,
  WebkitFilter: filter
});
var getDefaultValueType = function(key) {
  return defaultValueTypes[key];
};
function getAnimatableNone(key, value) {
  var _a;
  var defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
}
function isTransitionDefined(_a) {
  _a.when;
  _a.delay;
  _a.delayChildren;
  _a.staggerChildren;
  _a.staggerDirection;
  _a.repeat;
  _a.repeatType;
  _a.repeatDelay;
  _a.from;
  var transition = __rest$1(_a, ["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from"]);
  return !!Object.keys(transition).length;
}
var legacyRepeatWarning = false;
function convertTransitionToAnimationOptions(_a) {
  var ease = _a.ease, times = _a.times, yoyo = _a.yoyo, flip = _a.flip, loop = _a.loop, transition = __rest$1(_a, ["ease", "times", "yoyo", "flip", "loop"]);
  var options = Object.assign({}, transition);
  if (times)
    options["offset"] = times;
  if (transition.duration)
    options["duration"] = secondsToMilliseconds(transition.duration);
  if (transition.repeatDelay)
    options.repeatDelay = secondsToMilliseconds(transition.repeatDelay);
  if (ease) {
    options["ease"] = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
  }
  if (transition.type === "tween")
    options.type = "keyframes";
  if (yoyo || loop || flip) {
    warning(!legacyRepeatWarning, "yoyo, loop and flip have been removed from the API. Replace with repeat and repeatType options.");
    legacyRepeatWarning = true;
    if (yoyo) {
      options.repeatType = "reverse";
    } else if (loop) {
      options.repeatType = "loop";
    } else if (flip) {
      options.repeatType = "mirror";
    }
    options.repeat = loop || yoyo || flip || transition.repeat;
  }
  if (transition.type !== "spring")
    options.type = "keyframes";
  return options;
}
function getDelayFromTransition(transition, key) {
  var _a;
  var valueTransition = getValueTransition(transition, key) || {};
  return (_a = valueTransition.delay) !== null && _a !== void 0 ? _a : 0;
}
function hydrateKeyframes(options) {
  if (Array.isArray(options.to) && options.to[0] === null) {
    options.to = __spreadArray([], __read(options.to));
    options.to[0] = options.from;
  }
  return options;
}
function getPopmotionAnimationOptions(transition, options, key) {
  var _a;
  if (Array.isArray(options.to)) {
    (_a = transition.duration) !== null && _a !== void 0 ? _a : transition.duration = 0.8;
  }
  hydrateKeyframes(options);
  if (!isTransitionDefined(transition)) {
    transition = Object.assign(Object.assign({}, transition), getDefaultTransition(key, options.to));
  }
  return Object.assign(Object.assign({}, options), convertTransitionToAnimationOptions(transition));
}
function getAnimation(key, value, target, transition, onComplete) {
  var _a;
  var valueTransition = getValueTransition(transition, key);
  var origin = (_a = valueTransition.from) !== null && _a !== void 0 ? _a : value.get();
  var isTargetAnimatable = isAnimatable(key, target);
  if (origin === "none" && isTargetAnimatable && typeof target === "string") {
    origin = getAnimatableNone(key, target);
  } else if (isZero(origin) && typeof target === "string") {
    origin = getZeroUnit(target);
  } else if (!Array.isArray(target) && isZero(target) && typeof origin === "string") {
    target = getZeroUnit(origin);
  }
  var isOriginAnimatable = isAnimatable(key, origin);
  warning(isOriginAnimatable === isTargetAnimatable, "You are trying to animate " + key + ' from "' + origin + '" to "' + target + '". ' + origin + " is not an animatable value - to enable this animation set " + origin + " to a value animatable to " + target + " via the `style` property.");
  function start() {
    var options = {
      from: origin,
      to: target,
      velocity: value.getVelocity(),
      onComplete,
      onUpdate: function(v) {
        return value.set(v);
      }
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia(Object.assign(Object.assign({}, options), valueTransition)) : animate(Object.assign(Object.assign({}, getPopmotionAnimationOptions(valueTransition, options, key)), { onUpdate: function(v) {
      var _a2;
      options.onUpdate(v);
      (_a2 = valueTransition.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition, v);
    }, onComplete: function() {
      var _a2;
      options.onComplete();
      (_a2 = valueTransition.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition);
    } }));
  }
  function set() {
    var _a2;
    value.set(target);
    onComplete();
    (_a2 = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition);
    return { stop: function() {
    } };
  }
  return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set : start;
}
function isZero(value) {
  return value === 0 || typeof value === "string" && parseFloat(value) === 0 && value.indexOf(" ") === -1;
}
function getZeroUnit(potentialUnitType) {
  return typeof potentialUnitType === "number" ? 0 : getAnimatableNone("", potentialUnitType);
}
function getValueTransition(transition, key) {
  return transition[key] || transition["default"] || transition;
}
function startAnimation(key, value, target, transition) {
  if (transition === void 0) {
    transition = {};
  }
  return value.start(function(onComplete) {
    var delayTimer;
    var controls;
    var animation = getAnimation(key, value, target, transition, onComplete);
    var delay = getDelayFromTransition(transition, key);
    var start = function() {
      return controls = animation();
    };
    if (delay) {
      delayTimer = setTimeout(start, secondsToMilliseconds(delay));
    } else {
      start();
    }
    return function() {
      clearTimeout(delayTimer);
      controls === null || controls === void 0 ? void 0 : controls.stop();
    };
  });
}
var isNumericalString = function(v) {
  return /^\-?\d*\.?\d+$/.test(v);
};
var isCustomValue = function(v) {
  return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};
var resolveFinalValueInKeyframes = function(v) {
  return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
};
var testValueType = function(v) {
  return function(type) {
    return type.test(v);
  };
};
var auto = {
  test: function(v) {
    return v === "auto";
  },
  parse: function(v) {
    return v;
  }
};
var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
var findDimensionValueType = function(v) {
  return dimensionValueTypes.find(testValueType(v));
};
var valueTypes = __spreadArray(__spreadArray([], __read(dimensionValueTypes)), [color, complex]);
var findValueType = function(v) {
  return valueTypes.find(testValueType(v));
};
function isVariantLabels(v) {
  return Array.isArray(v);
}
function isVariantLabel(v) {
  return typeof v === "string" || isVariantLabels(v);
}
function getCurrent(visualElement2) {
  var current = {};
  visualElement2.forEachValue(function(value, key) {
    return current[key] = value.get();
  });
  return current;
}
function getVelocity$1(visualElement2) {
  var velocity = {};
  visualElement2.forEachValue(function(value, key) {
    return velocity[key] = value.getVelocity();
  });
  return velocity;
}
function resolveVariantFromProps(props, definition, custom, currentValues, currentVelocity) {
  var _a;
  if (currentValues === void 0) {
    currentValues = {};
  }
  if (currentVelocity === void 0) {
    currentVelocity = {};
  }
  if (typeof definition === "string") {
    definition = (_a = props.variants) === null || _a === void 0 ? void 0 : _a[definition];
  }
  return typeof definition === "function" ? definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity) : definition;
}
function resolveVariant(visualElement2, definition, custom) {
  var props = visualElement2.getProps();
  return resolveVariantFromProps(props, definition, custom !== null && custom !== void 0 ? custom : props.custom, getCurrent(visualElement2), getVelocity$1(visualElement2));
}
function checkIfControllingVariants(props) {
  var _a;
  return typeof ((_a = props.animate) === null || _a === void 0 ? void 0 : _a.start) === "function" || isVariantLabel(props.initial) || isVariantLabel(props.animate) || isVariantLabel(props.whileHover) || isVariantLabel(props.whileDrag) || isVariantLabel(props.whileTap) || isVariantLabel(props.whileFocus) || isVariantLabel(props.exit);
}
function checkIfVariantNode(props) {
  return Boolean(checkIfControllingVariants(props) || props.variants);
}
function setMotionValue(visualElement2, key, value) {
  if (visualElement2.hasValue(key)) {
    visualElement2.getValue(key).set(value);
  } else {
    visualElement2.addValue(key, motionValue(value));
  }
}
function setTarget(visualElement2, definition) {
  var resolved = resolveVariant(visualElement2, definition);
  var _a = resolved ? visualElement2.makeTargetAnimatable(resolved, false) : {}, _b = _a.transitionEnd, transitionEnd = _b === void 0 ? {} : _b;
  _a.transition;
  var target = __rest$1(_a, ["transitionEnd", "transition"]);
  target = Object.assign(Object.assign({}, target), transitionEnd);
  for (var key in target) {
    var value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement2, key, value);
  }
}
function setVariants(visualElement2, variantLabels) {
  var reversedLabels = __spreadArray([], __read(variantLabels)).reverse();
  reversedLabels.forEach(function(key) {
    var _a;
    var variant = visualElement2.getVariant(key);
    variant && setTarget(visualElement2, variant);
    (_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach(function(child) {
      setVariants(child, variantLabels);
    });
  });
}
function setValues(visualElement2, definition) {
  if (Array.isArray(definition)) {
    return setVariants(visualElement2, definition);
  } else if (typeof definition === "string") {
    return setVariants(visualElement2, [definition]);
  } else {
    setTarget(visualElement2, definition);
  }
}
function checkTargetForNewValues(visualElement2, target, origin) {
  var _a, _b, _c;
  var _d;
  var newValueKeys = Object.keys(target).filter(function(key2) {
    return !visualElement2.hasValue(key2);
  });
  var numNewValues = newValueKeys.length;
  if (!numNewValues)
    return;
  for (var i = 0; i < numNewValues; i++) {
    var key = newValueKeys[i];
    var targetValue = target[key];
    var value = null;
    if (Array.isArray(targetValue)) {
      value = targetValue[0];
    }
    if (value === null) {
      value = (_b = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement2.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
    }
    if (value === void 0 || value === null)
      continue;
    if (typeof value === "string" && isNumericalString(value)) {
      value = parseFloat(value);
    } else if (!findValueType(value) && complex.test(targetValue)) {
      value = getAnimatableNone(key, targetValue);
    }
    visualElement2.addValue(key, motionValue(value));
    (_c = (_d = origin)[key]) !== null && _c !== void 0 ? _c : _d[key] = value;
    visualElement2.setBaseTarget(key, value);
  }
}
function getOriginFromTransition(key, transition) {
  if (!transition)
    return;
  var valueTransition = transition[key] || transition["default"] || transition;
  return valueTransition.from;
}
function getOrigin(target, transition, visualElement2) {
  var _a, _b;
  var origin = {};
  for (var key in target) {
    origin[key] = (_a = getOriginFromTransition(key, transition)) !== null && _a !== void 0 ? _a : (_b = visualElement2.getValue(key)) === null || _b === void 0 ? void 0 : _b.get();
  }
  return origin;
}
function animateVisualElement(visualElement2, definition, options) {
  if (options === void 0) {
    options = {};
  }
  visualElement2.notifyAnimationStart();
  var animation;
  if (Array.isArray(definition)) {
    var animations2 = definition.map(function(variant) {
      return animateVariant(visualElement2, variant, options);
    });
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement2, definition, options);
  } else {
    var resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement2, definition, options.custom) : definition;
    animation = animateTarget(visualElement2, resolvedDefinition, options);
  }
  return animation.then(function() {
    return visualElement2.notifyAnimationComplete(definition);
  });
}
function animateVariant(visualElement2, variant, options) {
  var _a;
  if (options === void 0) {
    options = {};
  }
  var resolved = resolveVariant(visualElement2, variant, options.custom);
  var _b = (resolved || {}).transition, transition = _b === void 0 ? visualElement2.getDefaultTransition() || {} : _b;
  if (options.transitionOverride) {
    transition = options.transitionOverride;
  }
  var getAnimation2 = resolved ? function() {
    return animateTarget(visualElement2, resolved, options);
  } : function() {
    return Promise.resolve();
  };
  var getChildAnimations = ((_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.size) ? function(forwardDelay) {
    if (forwardDelay === void 0) {
      forwardDelay = 0;
    }
    var _a2 = transition.delayChildren, delayChildren = _a2 === void 0 ? 0 : _a2, staggerChildren = transition.staggerChildren, staggerDirection = transition.staggerDirection;
    return animateChildren(visualElement2, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
  } : function() {
    return Promise.resolve();
  };
  var when = transition.when;
  if (when) {
    var _c = __read(when === "beforeChildren" ? [getAnimation2, getChildAnimations] : [getChildAnimations, getAnimation2], 2), first = _c[0], last = _c[1];
    return first().then(last);
  } else {
    return Promise.all([getAnimation2(), getChildAnimations(options.delay)]);
  }
}
function animateTarget(visualElement2, definition, _a) {
  var _b;
  var _c = _a === void 0 ? {} : _a, _d = _c.delay, delay = _d === void 0 ? 0 : _d, transitionOverride = _c.transitionOverride, type = _c.type;
  var _e = visualElement2.makeTargetAnimatable(definition), _f = _e.transition, transition = _f === void 0 ? visualElement2.getDefaultTransition() : _f, transitionEnd = _e.transitionEnd, target = __rest$1(_e, ["transition", "transitionEnd"]);
  if (transitionOverride)
    transition = transitionOverride;
  var animations2 = [];
  var animationTypeState = type && ((_b = visualElement2.animationState) === null || _b === void 0 ? void 0 : _b.getState()[type]);
  for (var key in target) {
    var value = visualElement2.getValue(key);
    var valueTarget = target[key];
    if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    var animation = startAnimation(key, value, valueTarget, Object.assign({ delay }, transition));
    animations2.push(animation);
  }
  return Promise.all(animations2).then(function() {
    transitionEnd && setTarget(visualElement2, transitionEnd);
  });
}
function animateChildren(visualElement2, variant, delayChildren, staggerChildren, staggerDirection, options) {
  if (delayChildren === void 0) {
    delayChildren = 0;
  }
  if (staggerChildren === void 0) {
    staggerChildren = 0;
  }
  if (staggerDirection === void 0) {
    staggerDirection = 1;
  }
  var animations2 = [];
  var maxStaggerDuration = (visualElement2.variantChildren.size - 1) * staggerChildren;
  var generateStaggerDuration = staggerDirection === 1 ? function(i) {
    if (i === void 0) {
      i = 0;
    }
    return i * staggerChildren;
  } : function(i) {
    if (i === void 0) {
      i = 0;
    }
    return maxStaggerDuration - i * staggerChildren;
  };
  Array.from(visualElement2.variantChildren).sort(sortByTreeOrder).forEach(function(child, i) {
    animations2.push(animateVariant(child, variant, Object.assign(Object.assign({}, options), { delay: delayChildren + generateStaggerDuration(i) })).then(function() {
      return child.notifyAnimationComplete(variant);
    }));
  });
  return Promise.all(animations2);
}
function stopAnimation(visualElement2) {
  visualElement2.forEachValue(function(value) {
    return value.stop();
  });
}
function sortByTreeOrder(a, b) {
  return a.sortNodePosition(b);
}
function shouldBlockAnimation(_a, key) {
  var protectedKeys = _a.protectedKeys, needsAnimating = _a.needsAnimating;
  var shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
function animationControls(startStopNotifier) {
  var hasMounted = false;
  var pendingAnimations = [];
  var subscribers = /* @__PURE__ */ new Set();
  var stopNotification;
  var controls = {
    subscribe: function(visualElement2) {
      if (subscribers.size === 0) {
        stopNotification = startStopNotifier?.();
      }
      subscribers.add(visualElement2);
      return function() {
        subscribers.delete(visualElement2);
        if (subscribers.size === 0) {
          stopNotification?.();
        }
      };
    },
    start: function(definition, transitionOverride) {
      if (hasMounted) {
        var animations_1 = [];
        subscribers.forEach(function(visualElement2) {
          animations_1.push(animateVisualElement(visualElement2, definition, {
            transitionOverride
          }));
        });
        return Promise.all(animations_1);
      } else {
        return new Promise(function(resolve) {
          pendingAnimations.push({
            animation: [definition, transitionOverride],
            resolve
          });
        });
      }
    },
    set: function(definition) {
      return subscribers.forEach(function(visualElement2) {
        setValues(visualElement2, definition);
      });
    },
    stop: function() {
      subscribers.forEach(function(visualElement2) {
        stopAnimation(visualElement2);
      });
    },
    mount: function() {
      hasMounted = true;
      pendingAnimations.forEach(function(_a) {
        var animation = _a.animation, resolve = _a.resolve;
        controls.start.apply(controls, __spreadArray([], __read(animation))).then(resolve);
      });
      return function() {
        hasMounted = false;
        controls.stop();
      };
    }
  };
  return controls;
}
var valueScaleCorrection = {};
function eachAxis(handler) {
  return [handler("x"), handler("y")];
}
function noop(any) {
  return any;
}
function convertBoundingBoxToAxisBox(_a) {
  var top = _a.top, left = _a.left, right = _a.right, bottom = _a.bottom;
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function convertAxisBoxToBoundingBox(_a) {
  var x = _a.x, y = _a.y;
  return {
    top: y.min,
    bottom: y.max,
    left: x.min,
    right: x.max
  };
}
function transformBoundingBox(_a, transformPoint2) {
  var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
  if (transformPoint2 === void 0) {
    transformPoint2 = noop;
  }
  var topLeft = transformPoint2({ x: left, y: top });
  var bottomRight = transformPoint2({ x: right, y: bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}
function axisBox() {
  return { x: { min: 0, max: 1 }, y: { min: 0, max: 1 } };
}
function copyAxisBox(box) {
  return {
    x: Object.assign({}, box.x),
    y: Object.assign({}, box.y)
  };
}
var zeroDelta = {
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
};
function delta() {
  return {
    x: Object.assign({}, zeroDelta),
    y: Object.assign({}, zeroDelta)
  };
}
function isDraggable(visualElement2) {
  var _a = visualElement2.getProps(), drag2 = _a.drag, _dragX = _a._dragX;
  return drag2 && !_dragX;
}
function resetAxis(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function resetBox(box, originBox) {
  resetAxis(box.x, originBox.x);
  resetAxis(box.y, originBox.y);
}
function scalePoint(point, scale2, originPoint) {
  var distanceFromOrigin = point - originPoint;
  var scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point, translate2, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point = scalePoint(point, boxScale, originPoint);
  }
  return scalePoint(point, scale2, originPoint) + translate2;
}
function applyAxisDelta(axis, translate2, scale2, originPoint, boxScale) {
  if (translate2 === void 0) {
    translate2 = 0;
  }
  if (scale2 === void 0) {
    scale2 = 1;
  }
  axis.min = applyPointDelta(axis.min, translate2, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate2, scale2, originPoint, boxScale);
}
function applyBoxDelta(box, _a) {
  var x = _a.x, y = _a.y;
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
function applyAxisTransforms(final, axis, transforms, _a) {
  var _b = __read(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
  final.min = axis.min;
  final.max = axis.max;
  var axisOrigin = transforms[originKey] !== void 0 ? transforms[originKey] : 0.5;
  var originPoint = mix(axis.min, axis.max, axisOrigin);
  applyAxisDelta(final, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
}
var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
function applyBoxTransforms(finalBox, box, transforms) {
  applyAxisTransforms(finalBox.x, box.x, transforms, xKeys);
  applyAxisTransforms(finalBox.y, box.y, transforms, yKeys);
}
function removePointDelta(point, translate2, scale2, originPoint, boxScale) {
  point -= translate2;
  point = scalePoint(point, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }
  return point;
}
function removeAxisDelta(axis, translate2, scale2, origin, boxScale) {
  if (translate2 === void 0) {
    translate2 = 0;
  }
  if (scale2 === void 0) {
    scale2 = 1;
  }
  if (origin === void 0) {
    origin = 0.5;
  }
  var originPoint = mix(axis.min, axis.max, origin) - translate2;
  axis.min = removePointDelta(axis.min, translate2, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate2, scale2, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms, _a) {
  var _b = __read(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
  removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale);
}
function removeBoxTransforms(box, transforms) {
  removeAxisTransforms(box.x, transforms, xKeys);
  removeAxisTransforms(box.y, transforms, yKeys);
}
function applyTreeDeltas(box, treeScale, treePath) {
  var treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  var node;
  var delta2;
  for (var i = 0; i < treeLength; i++) {
    node = treePath[i];
    delta2 = node.getLayoutState().delta;
    treeScale.x *= delta2.x.scale;
    treeScale.y *= delta2.y.scale;
    applyBoxDelta(box, delta2);
    if (isDraggable(node)) {
      applyBoxTransforms(box, box, node.getLatestValues());
    }
  }
}
var clampProgress = function(v) {
  return clamp$1(0, 1, v);
};
function isNear(value, target, maxDistance) {
  if (target === void 0) {
    target = 0;
  }
  if (maxDistance === void 0) {
    maxDistance = 0.01;
  }
  return distance(value, target) < maxDistance;
}
function calcLength(axis) {
  return axis.max - axis.min;
}
function calcOrigin$1(source, target) {
  var origin = 0.5;
  var sourceLength = calcLength(source);
  var targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clampProgress(origin);
}
function updateAxisDelta(delta2, source, target, origin) {
  if (origin === void 0) {
    origin = 0.5;
  }
  delta2.origin = origin;
  delta2.originPoint = mix(source.min, source.max, delta2.origin);
  delta2.scale = calcLength(target) / calcLength(source);
  if (isNear(delta2.scale, 1, 1e-4))
    delta2.scale = 1;
  delta2.translate = mix(target.min, target.max, delta2.origin) - delta2.originPoint;
  if (isNear(delta2.translate))
    delta2.translate = 0;
}
function updateBoxDelta(delta2, source, target, origin) {
  updateAxisDelta(delta2.x, source.x, target.x, defaultOrigin(origin.originX));
  updateAxisDelta(delta2.y, source.y, target.y, defaultOrigin(origin.originY));
}
function defaultOrigin(origin) {
  return typeof origin === "number" ? origin : 0.5;
}
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(projection, parentProjection) {
  calcRelativeAxis(projection.target.x, projection.relativeTarget.x, parentProjection.target.x);
  calcRelativeAxis(projection.target.y, projection.relativeTarget.y, parentProjection.target.y);
}
var isMotionValue = function(value) {
  return value !== null && typeof value === "object" && value.getVelocity;
};
var createProjectionState = function() {
  return {
    isEnabled: false,
    isTargetLocked: false,
    target: axisBox(),
    targetFinal: axisBox()
  };
};
function createLayoutState() {
  return {
    isHydrated: false,
    layout: axisBox(),
    layoutCorrected: axisBox(),
    treeScale: { x: 1, y: 1 },
    delta: delta(),
    deltaFinal: delta(),
    deltaTransform: ""
  };
}
var zeroLayout = createLayoutState();
function buildLayoutProjectionTransform(_a, treeScale, latestTransform) {
  var x = _a.x, y = _a.y;
  var xTranslate = x.translate / treeScale.x;
  var yTranslate = y.translate / treeScale.y;
  var transform = "translate3d(" + xTranslate + "px, " + yTranslate + "px, 0) ";
  if (latestTransform) {
    var rotate = latestTransform.rotate, rotateX = latestTransform.rotateX, rotateY = latestTransform.rotateY;
    if (rotate)
      transform += "rotate(" + rotate + ") ";
    if (rotateX)
      transform += "rotateX(" + rotateX + ") ";
    if (rotateY)
      transform += "rotateY(" + rotateY + ") ";
  }
  transform += "scale(" + x.scale + ", " + y.scale + ")";
  return !latestTransform && transform === identityProjection ? "" : transform;
}
function buildLayoutProjectionTransformOrigin(_a) {
  var deltaFinal = _a.deltaFinal;
  return deltaFinal.x.origin * 100 + "% " + deltaFinal.y.origin * 100 + "% 0";
}
var identityProjection = buildLayoutProjectionTransform(zeroLayout.delta, zeroLayout.treeScale, { x: 1, y: 1 });
var isAnimationControls = function(v) {
  return typeof v === "object" && typeof v.start === "function";
};
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  var prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (var i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i])
      return false;
  }
  return true;
}
var AnimationType;
(function(AnimationType2) {
  AnimationType2["Animate"] = "animate";
  AnimationType2["Hover"] = "whileHover";
  AnimationType2["Tap"] = "whileTap";
  AnimationType2["Drag"] = "whileDrag";
  AnimationType2["Focus"] = "whileFocus";
  AnimationType2["Exit"] = "exit";
})(AnimationType || (AnimationType = {}));
var variantPriorityOrder = [
  AnimationType.Animate,
  AnimationType.Hover,
  AnimationType.Tap,
  AnimationType.Drag,
  AnimationType.Focus,
  AnimationType.Exit
];
var reversePriorityOrder = __spreadArray([], __read(variantPriorityOrder)).reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement2) {
  return function(animations2) {
    return Promise.all(animations2.map(function(_a) {
      var animation = _a.animation, options = _a.options;
      return animateVisualElement(visualElement2, animation, options);
    }));
  };
}
function createAnimationState(visualElement2) {
  var animate2 = animateList(visualElement2);
  var state = createState();
  var allAnimatedKeys = {};
  var isInitialRender = true;
  var buildResolvedTypeValues = function(acc, definition) {
    var resolved = resolveVariant(visualElement2, definition);
    if (resolved) {
      resolved.transition;
      var transitionEnd = resolved.transitionEnd, target = __rest$1(resolved, ["transition", "transitionEnd"]);
      acc = Object.assign(Object.assign(Object.assign({}, acc), target), transitionEnd);
    }
    return acc;
  };
  function isAnimated(key) {
    return allAnimatedKeys[key] !== void 0;
  }
  function setAnimateFunction(makeAnimator) {
    animate2 = makeAnimator(visualElement2);
  }
  function animateChanges(options, changedActiveType) {
    var _a;
    var props = visualElement2.getProps();
    var context = visualElement2.getVariantContext(true) || {};
    var animations2 = [];
    var removedKeys = /* @__PURE__ */ new Set();
    var encounteredKeys = {};
    var removedVariantIndex = Infinity;
    var _loop_1 = function(i2) {
      var type = reversePriorityOrder[i2];
      var typeState = state[type];
      var prop = (_a = props[type]) !== null && _a !== void 0 ? _a : context[type];
      var propIsVariant = isVariantLabel(prop);
      var activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i2;
      var isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement2.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = Object.assign({}, encounteredKeys);
      if (
        // If it isn't active and hasn't *just* been set as inactive
        !typeState.isActive && activeDelta === null || // If we didn't and don't have any defined prop for this animation type
        !prop && !typeState.prevProp || // Or if the prop doesn't define an animation
        isAnimationControls(prop) || typeof prop === "boolean"
      ) {
        return "continue";
      }
      var shouldAnimateType = variantsHaveChanged(typeState.prevProp, prop) || // If we're making this variant active, we want to always make it active
      type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || // If we removed a higher-priority variant (i is in reverse order)
      i2 > removedVariantIndex && propIsVariant;
      var definitionList = Array.isArray(prop) ? prop : [prop];
      var resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
      if (activeDelta === false)
        resolvedValues = {};
      var _b = typeState.prevResolvedValues, prevResolvedValues = _b === void 0 ? {} : _b;
      var allKeys = Object.assign(Object.assign({}, prevResolvedValues), resolvedValues);
      var markToAnimate = function(key2) {
        shouldAnimateType = true;
        removedKeys.delete(key2);
        typeState.needsAnimating[key2] = true;
      };
      for (var key in allKeys) {
        var next = resolvedValues[key];
        var prev = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        if (next !== prev) {
          if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
            if (!shallowCompare(next, prev)) {
              markToAnimate(key);
            } else {
              typeState.protectedKeys[key] = true;
            }
          } else if (next !== void 0) {
            markToAnimate(key);
          } else {
            removedKeys.add(key);
          }
        } else if (next !== void 0 && removedKeys.has(key)) {
          markToAnimate(key);
        } else {
          typeState.protectedKeys[key] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = Object.assign(Object.assign({}, encounteredKeys), resolvedValues);
      }
      if (isInitialRender && visualElement2.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      if (shouldAnimateType && !isInherited) {
        animations2.push.apply(animations2, __spreadArray([], __read(definitionList.map(function(animation) {
          return {
            animation,
            options: Object.assign({ type }, options)
          };
        }))));
      }
    };
    for (var i = 0; i < numAnimationTypes; i++) {
      _loop_1(i);
    }
    allAnimatedKeys = Object.assign({}, encounteredKeys);
    if (removedKeys.size) {
      var fallbackAnimation_1 = {};
      removedKeys.forEach(function(key) {
        var fallbackTarget = visualElement2.getBaseTarget(key);
        if (fallbackTarget !== void 0) {
          fallbackAnimation_1[key] = fallbackTarget;
        }
      });
      animations2.push({ animation: fallbackAnimation_1 });
    }
    var shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && props.initial === false && !visualElement2.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate2(animations2) : Promise.resolve();
  }
  function setActive(type, isActive, options) {
    var _a;
    if (state[type].isActive === isActive)
      return Promise.resolve();
    (_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach(function(child) {
      var _a2;
      return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
    });
    state[type].isActive = isActive;
    return animateChanges(options, type);
  }
  return {
    isAnimated,
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: function() {
      return state;
    }
  };
}
function variantsHaveChanged(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (isVariantLabels(next)) {
    return !shallowCompare(next, prev);
  }
  return false;
}
function createTypeState(isActive) {
  if (isActive === void 0) {
    isActive = false;
  }
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  var _a;
  return _a = {}, _a[AnimationType.Animate] = createTypeState(true), _a[AnimationType.Hover] = createTypeState(), _a[AnimationType.Tap] = createTypeState(), _a[AnimationType.Drag] = createTypeState(), _a[AnimationType.Focus] = createTypeState(), _a[AnimationType.Exit] = createTypeState(), _a;
}
var names = [
  "LayoutMeasure",
  "BeforeLayoutMeasure",
  "LayoutUpdate",
  "ViewportBoxUpdate",
  "Update",
  "Render",
  "AnimationComplete",
  "LayoutAnimationComplete",
  "AnimationStart",
  "SetAxisTarget",
  "Unmount"
];
function createLifecycles() {
  var managers = names.map(function() {
    return new SubscriptionManager();
  });
  var propSubscriptions = {};
  var lifecycles = {
    clearAllListeners: function() {
      return managers.forEach(function(manager) {
        return manager.clear();
      });
    },
    updatePropListeners: function(props) {
      return names.forEach(function(name) {
        var _a;
        (_a = propSubscriptions[name]) === null || _a === void 0 ? void 0 : _a.call(propSubscriptions);
        var on = "on" + name;
        var propListener = props[on];
        if (propListener) {
          propSubscriptions[name] = lifecycles[on](propListener);
        }
      });
    }
  };
  managers.forEach(function(manager, i) {
    lifecycles["on" + names[i]] = function(handler) {
      return manager.add(handler);
    };
    lifecycles["notify" + names[i]] = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return manager.notify.apply(manager, __spreadArray([], __read(args)));
    };
  });
  return lifecycles;
}
function updateMotionValuesFromProps(element, next, prev) {
  var _a;
  for (var key in next) {
    var nextValue = next[key];
    var prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue));
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        var existingValue = element.getValue(key);
        !existingValue.hasAnimated && existingValue.set(nextValue);
      } else {
        element.addValue(key, motionValue((_a = element.getStaticValue(key)) !== null && _a !== void 0 ? _a : nextValue));
      }
    }
  }
  for (var key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}
function updateLayoutDeltas(_a, _b, treePath, transformOrigin) {
  var delta2 = _a.delta, layout = _a.layout, layoutCorrected = _a.layoutCorrected, treeScale = _a.treeScale;
  var target = _b.target;
  resetBox(layoutCorrected, layout);
  applyTreeDeltas(layoutCorrected, treeScale, treePath);
  updateBoxDelta(delta2, layoutCorrected, target, transformOrigin);
}
var compareByDepth = function(a, b) {
  return a.depth - b.depth;
};
var FlatTree = (
  /** @class */
  function() {
    function FlatTree2() {
      this.children = [];
      this.isDirty = false;
    }
    FlatTree2.prototype.add = function(child) {
      addUniqueItem(this.children, child);
      this.isDirty = true;
    };
    FlatTree2.prototype.remove = function(child) {
      removeItem(this.children, child);
      this.isDirty = true;
    };
    FlatTree2.prototype.forEach = function(callback) {
      this.isDirty && this.children.sort(compareByDepth);
      var numChildren = this.children.length;
      for (var i = 0; i < numChildren; i++) {
        callback(this.children[i]);
      }
    };
    return FlatTree2;
  }()
);
function calcRelativeOffsetAxis(parent, child) {
  return {
    min: child.min - parent.min,
    max: child.max - parent.min
  };
}
function calcRelativeOffset(parent, child) {
  return {
    x: calcRelativeOffsetAxis(parent.x, child.x),
    y: calcRelativeOffsetAxis(parent.y, child.y)
  };
}
function setCurrentViewportBox(visualElement2) {
  var projectionParent = visualElement2.getProjectionParent();
  if (!projectionParent) {
    visualElement2.rebaseProjectionTarget();
    return;
  }
  var relativeOffset = calcRelativeOffset(projectionParent.getLayoutState().layout, visualElement2.getLayoutState().layout);
  eachAxis(function(axis) {
    visualElement2.setProjectionTargetAxis(axis, relativeOffset[axis].min, relativeOffset[axis].max, true);
  });
}
var visualElement = function(_a) {
  var _b = _a.treeType, treeType = _b === void 0 ? "" : _b, build = _a.build, getBaseTarget = _a.getBaseTarget, makeTargetAnimatable = _a.makeTargetAnimatable, measureViewportBox = _a.measureViewportBox, renderInstance = _a.render, readValueFromInstance = _a.readValueFromInstance, resetTransform = _a.resetTransform, restoreTransform = _a.restoreTransform, removeValueFromRenderState = _a.removeValueFromRenderState, sortNodePosition = _a.sortNodePosition, scrapeMotionValuesFromProps2 = _a.scrapeMotionValuesFromProps;
  return function(_a2, options) {
    var parent = _a2.parent, props = _a2.props, presenceId = _a2.presenceId, blockInitialAnimation = _a2.blockInitialAnimation, visualState = _a2.visualState;
    if (options === void 0) {
      options = {};
    }
    var latestValues = visualState.latestValues, renderState = visualState.renderState;
    var instance;
    var lifecycles = createLifecycles();
    var projection = createProjectionState();
    var projectionParent;
    var leadProjection = projection;
    var leadLatestValues = latestValues;
    var unsubscribeFromLeadVisualElement;
    var layoutState = createLayoutState();
    var crossfader;
    var hasViewportBoxUpdated = false;
    var values = /* @__PURE__ */ new Map();
    var valueSubscriptions = /* @__PURE__ */ new Map();
    var prevMotionValues = {};
    var projectionTargetProgress;
    var baseTarget = Object.assign({}, latestValues);
    var removeFromVariantTree;
    function render() {
      if (!instance)
        return;
      if (element.isProjectionReady()) {
        applyBoxTransforms(leadProjection.targetFinal, leadProjection.target, leadLatestValues);
        updateBoxDelta(layoutState.deltaFinal, layoutState.layoutCorrected, leadProjection.targetFinal, latestValues);
      }
      triggerBuild();
      renderInstance(instance, renderState);
    }
    function triggerBuild() {
      var valuesToRender = latestValues;
      if (crossfader && crossfader.isActive()) {
        var crossfadedValues = crossfader.getCrossfadeState(element);
        if (crossfadedValues)
          valuesToRender = crossfadedValues;
      }
      build(element, renderState, valuesToRender, leadProjection, layoutState, options, props);
    }
    function update2() {
      lifecycles.notifyUpdate(latestValues);
    }
    function updateLayoutProjection() {
      if (!element.isProjectionReady())
        return;
      var delta2 = layoutState.delta, treeScale = layoutState.treeScale;
      var prevTreeScaleX = treeScale.x;
      var prevTreeScaleY = treeScale.y;
      var prevDeltaTransform = layoutState.deltaTransform;
      updateLayoutDeltas(layoutState, leadProjection, element.path, latestValues);
      hasViewportBoxUpdated && element.notifyViewportBoxUpdate(leadProjection.target, delta2);
      hasViewportBoxUpdated = false;
      var deltaTransform = buildLayoutProjectionTransform(delta2, treeScale);
      if (deltaTransform !== prevDeltaTransform || // Also compare calculated treeScale, for values that rely on this only for scale correction
      prevTreeScaleX !== treeScale.x || prevTreeScaleY !== treeScale.y) {
        element.scheduleRender();
      }
      layoutState.deltaTransform = deltaTransform;
    }
    function updateTreeLayoutProjection() {
      element.layoutTree.forEach(fireUpdateLayoutProjection);
    }
    function bindToMotionValue(key2, value2) {
      var removeOnChange = value2.onChange(function(latestValue) {
        latestValues[key2] = latestValue;
        props.onUpdate && sync.update(update2, false, true);
      });
      var removeOnRenderRequest = value2.onRenderRequest(element.scheduleRender);
      valueSubscriptions.set(key2, function() {
        removeOnChange();
        removeOnRenderRequest();
      });
    }
    var initialMotionValues = scrapeMotionValuesFromProps2(props);
    for (var key in initialMotionValues) {
      var value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key], false);
      }
    }
    var isControllingVariants = checkIfControllingVariants(props);
    var isVariantNode = checkIfVariantNode(props);
    var element = Object.assign(Object.assign({
      treeType,
      /**
       * This is a mirror of the internal instance prop, which keeps
       * VisualElement type-compatible with React's RefObject.
       */
      current: null,
      /**
       * The depth of this visual element within the visual element tree.
       */
      depth: parent ? parent.depth + 1 : 0,
      parent,
      children: /* @__PURE__ */ new Set(),
      /**
       * An ancestor path back to the root visual element. This is used
       * by layout projection to quickly recurse back up the tree.
       */
      path: parent ? __spreadArray(__spreadArray([], __read(parent.path)), [parent]) : [],
      layoutTree: parent ? parent.layoutTree : new FlatTree(),
      /**
       *
       */
      presenceId,
      projection,
      /**
       * If this component is part of the variant tree, it should track
       * any children that are also part of the tree. This is essentially
       * a shadow tree to simplify logic around how to stagger over children.
       */
      variantChildren: isVariantNode ? /* @__PURE__ */ new Set() : void 0,
      /**
       * Whether this instance is visible. This can be changed imperatively
       * by AnimateSharedLayout, is analogous to CSS's visibility in that
       * hidden elements should take up layout, and needs enacting by the configured
       * render function.
       */
      isVisible: void 0,
      /**
       * Normally, if a component is controlled by a parent's variants, it can
       * rely on that ancestor to trigger animations further down the tree.
       * However, if a component is created after its parent is mounted, the parent
       * won't trigger that mount animation so the child needs to.
       *
       * TODO: This might be better replaced with a method isParentMounted
       */
      manuallyAnimateOnMount: Boolean(parent === null || parent === void 0 ? void 0 : parent.isMounted()),
      /**
       * This can be set by AnimatePresence to force components that mount
       * at the same time as it to mount as if they have initial={false} set.
       */
      blockInitialAnimation,
      /**
       * Determine whether this component has mounted yet. This is mostly used
       * by variant children to determine whether they need to trigger their
       * own animations on mount.
       */
      isMounted: function() {
        return Boolean(instance);
      },
      mount: function(newInstance) {
        instance = element.current = newInstance;
        element.pointTo(element);
        if (isVariantNode && parent && !isControllingVariants) {
          removeFromVariantTree = parent === null || parent === void 0 ? void 0 : parent.addVariantChild(element);
        }
        parent === null || parent === void 0 ? void 0 : parent.children.add(element);
      },
      /**
       *
       */
      unmount: function() {
        cancelSync.update(update2);
        cancelSync.render(render);
        cancelSync.preRender(element.updateLayoutProjection);
        valueSubscriptions.forEach(function(remove) {
          return remove();
        });
        element.stopLayoutAnimation();
        element.layoutTree.remove(element);
        removeFromVariantTree === null || removeFromVariantTree === void 0 ? void 0 : removeFromVariantTree();
        parent === null || parent === void 0 ? void 0 : parent.children.delete(element);
        unsubscribeFromLeadVisualElement === null || unsubscribeFromLeadVisualElement === void 0 ? void 0 : unsubscribeFromLeadVisualElement();
        lifecycles.clearAllListeners();
      },
      /**
       * Add a child visual element to our set of children.
       */
      addVariantChild: function(child) {
        var _a3;
        var closestVariantNode = element.getClosestVariantNode();
        if (closestVariantNode) {
          (_a3 = closestVariantNode.variantChildren) === null || _a3 === void 0 ? void 0 : _a3.add(child);
          return function() {
            return closestVariantNode.variantChildren.delete(child);
          };
        }
      },
      sortNodePosition: function(other) {
        if (!sortNodePosition || treeType !== other.treeType)
          return 0;
        return sortNodePosition(element.getInstance(), other.getInstance());
      },
      /**
       * Returns the closest variant node in the tree starting from
       * this visual element.
       */
      getClosestVariantNode: function() {
        return isVariantNode ? element : parent === null || parent === void 0 ? void 0 : parent.getClosestVariantNode();
      },
      /**
       * A method that schedules an update to layout projections throughout
       * the tree. We inherit from the parent so there's only ever one
       * job scheduled on the next frame - that of the root visual element.
       */
      scheduleUpdateLayoutProjection: parent ? parent.scheduleUpdateLayoutProjection : function() {
        return sync.preRender(element.updateTreeLayoutProjection, false, true);
      },
      /**
       * Expose the latest layoutId prop.
       */
      getLayoutId: function() {
        return props.layoutId;
      },
      /**
       * Returns the current instance.
       */
      getInstance: function() {
        return instance;
      },
      /**
       * Get/set the latest static values.
       */
      getStaticValue: function(key2) {
        return latestValues[key2];
      },
      setStaticValue: function(key2, value2) {
        return latestValues[key2] = value2;
      },
      /**
       * Returns the latest motion value state. Currently only used to take
       * a snapshot of the visual element - perhaps this can return the whole
       * visual state
       */
      getLatestValues: function() {
        return latestValues;
      },
      /**
       * Set the visiblity of the visual element. If it's changed, schedule
       * a render to reflect these changes.
       */
      setVisibility: function(visibility) {
        if (element.isVisible === visibility)
          return;
        element.isVisible = visibility;
        element.scheduleRender();
      },
      /**
       * Make a target animatable by Popmotion. For instance, if we're
       * trying to animate width from 100px to 100vw we need to measure 100vw
       * in pixels to determine what we really need to animate to. This is also
       * pluggable to support Framer's custom value types like Color,
       * and CSS variables.
       */
      makeTargetAnimatable: function(target, canMutate) {
        if (canMutate === void 0) {
          canMutate = true;
        }
        return makeTargetAnimatable(element, target, props, canMutate);
      },
      // Motion values ========================
      /**
       * Add a motion value and bind it to this visual element.
       */
      addValue: function(key2, value2) {
        if (element.hasValue(key2))
          element.removeValue(key2);
        values.set(key2, value2);
        latestValues[key2] = value2.get();
        bindToMotionValue(key2, value2);
      },
      /**
       * Remove a motion value and unbind any active subscriptions.
       */
      removeValue: function(key2) {
        var _a3;
        values.delete(key2);
        (_a3 = valueSubscriptions.get(key2)) === null || _a3 === void 0 ? void 0 : _a3();
        valueSubscriptions.delete(key2);
        delete latestValues[key2];
        removeValueFromRenderState(key2, renderState);
      },
      /**
       * Check whether we have a motion value for this key
       */
      hasValue: function(key2) {
        return values.has(key2);
      },
      /**
       * Get a motion value for this key. If called with a default
       * value, we'll create one if none exists.
       */
      getValue: function(key2, defaultValue) {
        var value2 = values.get(key2);
        if (value2 === void 0 && defaultValue !== void 0) {
          value2 = motionValue(defaultValue);
          element.addValue(key2, value2);
        }
        return value2;
      },
      /**
       * Iterate over our motion values.
       */
      forEachValue: function(callback) {
        return values.forEach(callback);
      },
      /**
       * If we're trying to animate to a previously unencountered value,
       * we need to check for it in our state and as a last resort read it
       * directly from the instance (which might have performance implications).
       */
      readValue: function(key2) {
        var _a3;
        return (_a3 = latestValues[key2]) !== null && _a3 !== void 0 ? _a3 : readValueFromInstance(instance, key2, options);
      },
      /**
       * Set the base target to later animate back to. This is currently
       * only hydrated on creation and when we first read a value.
       */
      setBaseTarget: function(key2, value2) {
        baseTarget[key2] = value2;
      },
      /**
       * Find the base target for a value thats been removed from all animation
       * props.
       */
      getBaseTarget: function(key2) {
        if (getBaseTarget) {
          var target = getBaseTarget(props, key2);
          if (target !== void 0 && !isMotionValue(target))
            return target;
        }
        return baseTarget[key2];
      }
    }, lifecycles), {
      /**
       * Build the renderer state based on the latest visual state.
       */
      build: function() {
        triggerBuild();
        return renderState;
      },
      /**
       * Schedule a render on the next animation frame.
       */
      scheduleRender: function() {
        sync.render(render, false, true);
      },
      /**
       * Synchronously fire render. It's prefered that we batch renders but
       * in many circumstances, like layout measurement, we need to run this
       * synchronously. However in those instances other measures should be taken
       * to batch reads/writes.
       */
      syncRender: render,
      /**
       * Update the provided props. Ensure any newly-added motion values are
       * added to our map, old ones removed, and listeners updated.
       */
      setProps: function(newProps) {
        props = newProps;
        lifecycles.updatePropListeners(newProps);
        prevMotionValues = updateMotionValuesFromProps(element, scrapeMotionValuesFromProps2(props), prevMotionValues);
      },
      getProps: function() {
        return props;
      },
      // Variants ==============================
      /**
       * Returns the variant definition with a given name.
       */
      getVariant: function(name) {
        var _a3;
        return (_a3 = props.variants) === null || _a3 === void 0 ? void 0 : _a3[name];
      },
      /**
       * Returns the defined default transition on this component.
       */
      getDefaultTransition: function() {
        return props.transition;
      },
      /**
       * Used by child variant nodes to get the closest ancestor variant props.
       */
      getVariantContext: function(startAtParent) {
        if (startAtParent === void 0) {
          startAtParent = false;
        }
        if (startAtParent)
          return parent === null || parent === void 0 ? void 0 : parent.getVariantContext();
        if (!isControllingVariants) {
          var context_1 = (parent === null || parent === void 0 ? void 0 : parent.getVariantContext()) || {};
          if (props.initial !== void 0) {
            context_1.initial = props.initial;
          }
          return context_1;
        }
        var context = {};
        for (var i = 0; i < numVariantProps; i++) {
          var name_1 = variantProps[i];
          var prop = props[name_1];
          if (isVariantLabel(prop) || prop === false) {
            context[name_1] = prop;
          }
        }
        return context;
      },
      // Layout projection ==============================
      /**
       * Enable layout projection for this visual element. Won't actually
       * occur until we also have hydrated layout measurements.
       */
      enableLayoutProjection: function() {
        projection.isEnabled = true;
        element.layoutTree.add(element);
      },
      /**
       * Lock the projection target, for instance when dragging, so
       * nothing else can try and animate it.
       */
      lockProjectionTarget: function() {
        projection.isTargetLocked = true;
      },
      unlockProjectionTarget: function() {
        element.stopLayoutAnimation();
        projection.isTargetLocked = false;
      },
      getLayoutState: function() {
        return layoutState;
      },
      setCrossfader: function(newCrossfader) {
        crossfader = newCrossfader;
      },
      isProjectionReady: function() {
        return projection.isEnabled && projection.isHydrated && layoutState.isHydrated;
      },
      /**
       * Start a layout animation on a given axis.
       */
      startLayoutAnimation: function(axis, transition, isRelative) {
        if (isRelative === void 0) {
          isRelative = false;
        }
        var progress2 = element.getProjectionAnimationProgress()[axis];
        var _a3 = isRelative ? projection.relativeTarget[axis] : projection.target[axis], min = _a3.min, max = _a3.max;
        var length = max - min;
        progress2.clearListeners();
        progress2.set(min);
        progress2.set(min);
        progress2.onChange(function(v) {
          element.setProjectionTargetAxis(axis, v, v + length, isRelative);
        });
        return element.animateMotionValue(axis, progress2, 0, transition);
      },
      /**
       * Stop layout animations.
       */
      stopLayoutAnimation: function() {
        eachAxis(function(axis) {
          return element.getProjectionAnimationProgress()[axis].stop();
        });
      },
      /**
       * Measure the current viewport box with or without transforms.
       * Only measures axis-aligned boxes, rotate and skew must be manually
       * removed with a re-render to work.
       */
      measureViewportBox: function(withTransform) {
        if (withTransform === void 0) {
          withTransform = true;
        }
        var viewportBox = measureViewportBox(instance, options);
        if (!withTransform)
          removeBoxTransforms(viewportBox, latestValues);
        return viewportBox;
      },
      /**
       * Get the motion values tracking the layout animations on each
       * axis. Lazy init if not already created.
       */
      getProjectionAnimationProgress: function() {
        projectionTargetProgress || (projectionTargetProgress = {
          x: motionValue(0),
          y: motionValue(0)
        });
        return projectionTargetProgress;
      },
      /**
       * Update the projection of a single axis. Schedule an update to
       * the tree layout projection.
       */
      setProjectionTargetAxis: function(axis, min, max, isRelative) {
        if (isRelative === void 0) {
          isRelative = false;
        }
        var target;
        if (isRelative) {
          if (!projection.relativeTarget) {
            projection.relativeTarget = axisBox();
          }
          target = projection.relativeTarget[axis];
        } else {
          projection.relativeTarget = void 0;
          target = projection.target[axis];
        }
        projection.isHydrated = true;
        target.min = min;
        target.max = max;
        hasViewportBoxUpdated = true;
        lifecycles.notifySetAxisTarget();
      },
      /**
       * Rebase the projection target on top of the provided viewport box
       * or the measured layout. This ensures that non-animating elements
       * don't fall out of sync differences in measurements vs projections
       * after a page scroll or other relayout.
       */
      rebaseProjectionTarget: function(force, box) {
        if (box === void 0) {
          box = layoutState.layout;
        }
        var _a3 = element.getProjectionAnimationProgress(), x = _a3.x, y = _a3.y;
        var shouldRebase = !projection.relativeTarget && !projection.isTargetLocked && !x.isAnimating() && !y.isAnimating();
        if (force || shouldRebase) {
          eachAxis(function(axis) {
            var _a4 = box[axis], min = _a4.min, max = _a4.max;
            element.setProjectionTargetAxis(axis, min, max);
          });
        }
      },
      /**
       * Notify the visual element that its layout is up-to-date.
       * Currently Animate.tsx uses this to check whether a layout animation
       * needs to be performed.
       */
      notifyLayoutReady: function(config) {
        setCurrentViewportBox(element);
        element.notifyLayoutUpdate(layoutState.layout, element.prevViewportBox || layoutState.layout, config);
      },
      /**
       * Temporarily reset the transform of the instance.
       */
      resetTransform: function() {
        return resetTransform(element, instance, props);
      },
      restoreTransform: function() {
        return restoreTransform(instance, renderState);
      },
      updateLayoutProjection,
      updateTreeLayoutProjection: function() {
        element.layoutTree.forEach(fireResolveRelativeTargetBox);
        sync.preRender(updateTreeLayoutProjection, false, true);
      },
      getProjectionParent: function() {
        if (projectionParent === void 0) {
          var foundParent = false;
          for (var i = element.path.length - 1; i >= 0; i--) {
            var ancestor = element.path[i];
            if (ancestor.projection.isEnabled) {
              foundParent = ancestor;
              break;
            }
          }
          projectionParent = foundParent;
        }
        return projectionParent;
      },
      resolveRelativeTargetBox: function() {
        var relativeParent = element.getProjectionParent();
        if (!projection.relativeTarget || !relativeParent)
          return;
        calcRelativeBox(projection, relativeParent.projection);
        if (isDraggable(relativeParent)) {
          var target = projection.target;
          applyBoxTransforms(target, target, relativeParent.getLatestValues());
        }
      },
      shouldResetTransform: function() {
        return Boolean(props._layoutResetTransform);
      },
      /**
       *
       */
      pointTo: function(newLead) {
        leadProjection = newLead.projection;
        leadLatestValues = newLead.getLatestValues();
        unsubscribeFromLeadVisualElement === null || unsubscribeFromLeadVisualElement === void 0 ? void 0 : unsubscribeFromLeadVisualElement();
        unsubscribeFromLeadVisualElement = pipe(newLead.onSetAxisTarget(element.scheduleUpdateLayoutProjection), newLead.onLayoutAnimationComplete(function() {
          var _a3;
          if (element.isPresent) {
            element.presence = Presence.Present;
          } else {
            (_a3 = element.layoutSafeToRemove) === null || _a3 === void 0 ? void 0 : _a3.call(element);
          }
        }));
      },
      // TODO: Clean this up
      isPresent: true,
      presence: Presence.Entering
    });
    return element;
  };
};
function fireResolveRelativeTargetBox(child) {
  child.resolveRelativeTargetBox();
}
function fireUpdateLayoutProjection(child) {
  child.updateLayoutProjection();
}
var variantProps = __spreadArray(["initial"], __read(variantPriorityOrder));
var numVariantProps = variantProps.length;
var validMotionProps = /* @__PURE__ */ new Set([
  "initial",
  "animate",
  "exit",
  "style",
  "variants",
  "transition",
  "transformTemplate",
  "transformValues",
  "custom",
  "inherit",
  "layout",
  "layoutId",
  "onLayoutAnimationComplete",
  "onViewportBoxUpdate",
  "onLayoutMeasure",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "drag",
  "dragControls",
  "dragListener",
  "dragConstraints",
  "dragDirectionLock",
  "_dragX",
  "_dragY",
  "dragElastic",
  "dragMomentum",
  "dragPropagation",
  "dragTransition",
  "whileDrag",
  "onPan",
  "onPanStart",
  "onPanEnd",
  "onPanSessionStart",
  "onTap",
  "onTapStart",
  "onTapCancel",
  "onHoverStart",
  "onHoverEnd",
  "whileFocus",
  "whileTap",
  "whileHover"
]);
function isValidMotionProp(key) {
  return validMotionProps.has(key);
}
const PresenceContext = (c) => getDomContext("Presence", c) || writable(null);
let counter = 0;
const incrementId = () => counter++;
function isPresent(context) {
  return context === null ? true : context.isPresent;
}
const usePresence = (isCustom = false) => {
  const context = getContext(PresenceContext) || PresenceContext(isCustom);
  const id = get_store_value(context) === null ? void 0 : incrementId();
  if (get_store_value(context) === null) {
    return readable([true, null]);
  }
  return derived(
    context,
    ($v) => !$v.isPresent && $v.onExitComplete ? [false, () => $v.onExitComplete?.(id)] : [true]
  );
};
const LayoutGroupContext = (c) => getDomContext("LayoutGroup", c) || writable(null);
function isProjecting(visualElement2) {
  var isEnabled = visualElement2.projection.isEnabled;
  return isEnabled || visualElement2.shouldResetTransform();
}
function collectProjectingAncestors(visualElement2, ancestors) {
  if (ancestors === void 0) {
    ancestors = [];
  }
  var parent = visualElement2.parent;
  if (parent)
    collectProjectingAncestors(parent, ancestors);
  if (isProjecting(visualElement2))
    ancestors.push(visualElement2);
  return ancestors;
}
function collectProjectingChildren(visualElement2) {
  var children = [];
  var addChild = function(child) {
    if (isProjecting(child))
      children.push(child);
    child.children.forEach(addChild);
  };
  visualElement2.children.forEach(addChild);
  return children.sort(compareByDepth);
}
function updateLayoutMeasurement(visualElement2) {
  if (visualElement2.shouldResetTransform())
    return;
  var layoutState = visualElement2.getLayoutState();
  visualElement2.notifyBeforeLayoutMeasure(layoutState.layout);
  layoutState.isHydrated = true;
  layoutState.layout = visualElement2.measureViewportBox();
  layoutState.layoutCorrected = copyAxisBox(layoutState.layout);
  visualElement2.notifyLayoutMeasure(layoutState.layout, visualElement2.prevViewportBox || layoutState.layout);
  sync.update(function() {
    return visualElement2.rebaseProjectionTarget();
  });
}
function snapshotViewportBox(visualElement2, nc) {
  if (visualElement2.shouldResetTransform())
    return;
  if (!nc) visualElement2.prevViewportBox = visualElement2.measureViewportBox(false);
  visualElement2.rebaseProjectionTarget(false, visualElement2.prevViewportBox);
}
var unresolvedJobs = /* @__PURE__ */ new Set();
function pushJob(stack, job, pointer) {
  if (!stack[pointer])
    stack[pointer] = [];
  stack[pointer].push(job);
}
function batchLayout(callback) {
  unresolvedJobs.add(callback);
  return function() {
    return unresolvedJobs.delete(callback);
  };
}
function flushLayout() {
  if (!unresolvedJobs.size)
    return;
  var pointer = 0;
  var reads = [[]];
  var writes = [];
  var setRead = function(job) {
    return pushJob(reads, job, pointer);
  };
  var setWrite = function(job) {
    pushJob(writes, job, pointer);
    pointer++;
  };
  unresolvedJobs.forEach(function(callback) {
    callback(setRead, setWrite);
    pointer = 0;
  });
  unresolvedJobs.clear();
  sync.postRender(function() {
    setTimeout(function() {
      return false;
    }, 10);
  });
  var numStacks = writes.length;
  for (var i = 0; i <= numStacks; i++) {
    reads[i] && reads[i].forEach(executeJob);
    writes[i] && writes[i].forEach(executeJob);
  }
}
var executeJob = function(job) {
  return job();
};
var defaultHandler = {
  layoutReady: function(child) {
    return child.notifyLayoutReady();
  }
};
function createBatcher() {
  var queue = /* @__PURE__ */ new Set();
  return {
    add: function(child) {
      return queue.add(child);
    },
    flush: function(_a) {
      var _b = _a === void 0 ? defaultHandler : _a, layoutReady = _b.layoutReady, parent = _b.parent;
      batchLayout(function(read, write) {
        var order2 = Array.from(queue).sort(compareByDepth);
        var ancestors = parent ? collectProjectingAncestors(parent) : [];
        write(function() {
          var allElements = __spreadArray(__spreadArray([], __read(ancestors)), __read(order2));
          allElements.forEach(function(element) {
            return element.resetTransform();
          });
        });
        read(function() {
          order2.forEach(updateLayoutMeasurement);
        });
        write(function() {
          ancestors.forEach(function(element) {
            return element.restoreTransform();
          });
          order2.forEach(layoutReady);
        });
        read(function() {
          order2.forEach(function(child) {
            if (child.isPresent)
              child.presence = Presence.Present;
          });
        });
        write(function() {
          flushSync.preRender();
          flushSync.render();
        });
        read(function() {
          sync.postRender(function() {
            return order2.forEach(assignProjectionToSnapshot);
          });
          queue.clear();
        });
      });
      flushLayout();
    }
  };
}
function assignProjectionToSnapshot(child) {
  child.prevViewportBox = child.projection.target;
}
var SharedLayoutContext = (custom) => getDomContext("SharedLayout", custom) || writable(createBatcher());
var FramerTreeLayoutContext = () => writable(createBatcher());
function isSharedLayout(context) {
  return !!context.forceUpdate;
}
const LazyContext = (c) => getDomContext("Lazy", c) || writable({ strict: false });
const MotionContext = (c) => getDomContext("Motion", c) || writable({});
const UseVisualElement = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $presenceContext, $$unsubscribe_presenceContext;
  let $config, $$unsubscribe_config;
  let $lazyContext, $$unsubscribe_lazyContext;
  let $layoutGroupId, $$unsubscribe_layoutGroupId;
  let $mc, $$unsubscribe_mc;
  let { createVisualElement = void 0, props, Component, visualState, isCustom } = $$props;
  const config = getContext(MotionConfigContext) || MotionConfigContext(isCustom);
  $$unsubscribe_config = subscribe(config, (value) => $config = value);
  const presenceContext = getContext(PresenceContext) || PresenceContext(isCustom);
  $$unsubscribe_presenceContext = subscribe(presenceContext, (value) => $presenceContext = value);
  const lazyContext = getContext(LazyContext) || LazyContext(isCustom);
  $$unsubscribe_lazyContext = subscribe(lazyContext, (value) => $lazyContext = value);
  const mc = getContext(MotionContext) || MotionContext(isCustom);
  $$unsubscribe_mc = subscribe(mc, (value) => $mc = value);
  let parent = get_store_value(mc).visualElement;
  const layoutGroupId = getContext(LayoutGroupContext) || LayoutGroupContext(isCustom);
  $$unsubscribe_layoutGroupId = subscribe(layoutGroupId, (value) => $layoutGroupId = value);
  let layoutId = $layoutGroupId && props.layoutId !== void 0 ? $layoutGroupId + "-" + props.layoutId : props.layoutId;
  let visualElementRef = void 0;
  if (!createVisualElement) {
    createVisualElement = $lazyContext.renderer;
  }
  let visualElement2 = visualElementRef;
  onDestroy(() => {
    visualElement2?.notifyUnmount();
  });
  if ($$props.createVisualElement === void 0 && $$bindings.createVisualElement && createVisualElement !== void 0) $$bindings.createVisualElement(createVisualElement);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.Component === void 0 && $$bindings.Component && Component !== void 0) $$bindings.Component(Component);
  if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
  parent = $mc.visualElement;
  layoutId = $layoutGroupId && props.layoutId !== void 0 ? $layoutGroupId + "-" + props.layoutId : props.layoutId;
  {
    if (!visualElementRef && createVisualElement) {
      visualElementRef = createVisualElement(Component, {
        visualState,
        parent,
        props: { ...props, layoutId },
        presenceId: $presenceContext?.id,
        blockInitialAnimation: $presenceContext?.initial === false
      });
    }
  }
  visualElement2 = visualElementRef;
  {
    if (visualElement2) {
      visualElement2.setProps({ ...$config, ...props, layoutId });
      visualElement2.isPresent = isPresent($presenceContext);
      visualElement2.isPresenceRoot = !parent || parent.presenceId !== $presenceContext?.id;
      visualElement2.syncRender();
    }
  }
  $$unsubscribe_presenceContext();
  $$unsubscribe_config();
  $$unsubscribe_lazyContext();
  $$unsubscribe_layoutGroupId();
  $$unsubscribe_mc();
  return `${slots.default ? slots.default({ visualElement: visualElement2 }) : ``}`;
});
var createDefinition = function(propNames) {
  return {
    isEnabled: function(props) {
      return propNames.some(function(name) {
        return !!props[name];
      });
    }
  };
};
var featureDefinitions = {
  measureLayout: createDefinition(["layout", "layoutId", "drag"]),
  animation: createDefinition([
    "animate",
    "exit",
    "variants",
    "whileHover",
    "whileTap",
    "whileFocus",
    "whileDrag"
  ]),
  exit: createDefinition(["exit"]),
  drag: createDefinition(["drag", "dragControls"]),
  focus: createDefinition(["whileFocus"]),
  hover: createDefinition(["whileHover", "onHoverStart", "onHoverEnd"]),
  tap: createDefinition(["whileTap", "onTap", "onTapStart", "onTapCancel"]),
  pan: createDefinition([
    "onPan",
    "onPanStart",
    "onPanSessionStart",
    "onPanEnd"
  ]),
  layoutAnimation: createDefinition(["layout", "layoutId"])
};
function loadFeatures(features) {
  for (var key in features) {
    var Component = features[key];
    if (Component !== null) {
      featureDefinitions[key].Component = Component;
    }
  }
}
const UseFeatures = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const featureNames = Object.keys(featureDefinitions);
  const numFeatures = featureNames.length;
  let { visualElement: visualElement2, props } = $$props;
  let features = [];
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  {
    {
      features = [];
      for (let i = 0; i < numFeatures; i++) {
        const name = featureNames[i];
        const { isEnabled, Component } = featureDefinitions[name];
        if (isEnabled(props) && Component) {
          features.push({
            Component,
            key: name,
            props,
            visualElement: visualElement2
          });
        }
      }
    }
  }
  return `${visualElement2 ? `${slots.default ? slots.default({ features }) : ``}` : ``}`;
});
const MotionContextProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value, isCustom } = $$props;
  let store = writable(value);
  setContext(MotionContext, store);
  setDomContext("Motion", isCustom, store);
  onDestroy(() => {
    value?.visualElement?.unmount();
  });
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
  {
    store.set(value);
  }
  return `${slots.default ? slots.default({}) : ``}`;
});
var createHtmlRenderState = function() {
  return {
    style: {},
    transform: {},
    transformKeys: [],
    transformOrigin: {},
    vars: {}
  };
};
var createSvgRenderState = function() {
  return Object.assign(Object.assign({}, createHtmlRenderState()), { attrs: {} });
};
var transformAxes = ["", "X", "Y", "Z"];
var order = ["translate", "scale", "rotate", "skew"];
var transformProps = ["transformPerspective", "x", "y", "z"];
order.forEach(function(operationKey) {
  return transformAxes.forEach(function(axesKey) {
    return transformProps.push(operationKey + axesKey);
  });
});
function sortTransformProps(a, b) {
  return transformProps.indexOf(a) - transformProps.indexOf(b);
}
var transformPropSet = new Set(transformProps);
function isTransformProp(key) {
  return transformPropSet.has(key);
}
var transformOriginProps = /* @__PURE__ */ new Set(["originX", "originY", "originZ"]);
function isTransformOriginProp(key) {
  return transformOriginProps.has(key);
}
function isForcedMotionValue(key, _a) {
  var layout = _a.layout, layoutId = _a.layoutId;
  return isTransformProp(key) || isTransformOriginProp(key) || (layout || layoutId !== void 0) && !!valueScaleCorrection[key];
}
var translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
function buildTransform(_a, _b, transformIsDefault, transformTemplate) {
  var transform = _a.transform, transformKeys2 = _a.transformKeys;
  var _c = _b.enableHardwareAcceleration, enableHardwareAcceleration = _c === void 0 ? true : _c, _d = _b.allowTransformNone, allowTransformNone = _d === void 0 ? true : _d;
  var transformString = "";
  transformKeys2.sort(sortTransformProps);
  var transformHasZ = false;
  var numTransformKeys = transformKeys2.length;
  for (var i = 0; i < numTransformKeys; i++) {
    var key = transformKeys2[i];
    transformString += (translateAlias[key] || key) + "(" + transform[key] + ") ";
    if (key === "z")
      transformHasZ = true;
  }
  if (!transformHasZ && enableHardwareAcceleration) {
    transformString += "translateZ(0)";
  } else {
    transformString = transformString.trim();
  }
  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (allowTransformNone && transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}
function buildTransformOrigin(_a) {
  var _b = _a.originX, originX = _b === void 0 ? "50%" : _b, _c = _a.originY, originY = _c === void 0 ? "50%" : _c, _d = _a.originZ, originZ = _d === void 0 ? 0 : _d;
  return originX + " " + originY + " " + originZ;
}
function isCSSVariable$1(key) {
  return key.startsWith("--");
}
var getValueAsType = function(value, type) {
  return type && typeof value === "number" ? type.transform(value) : value;
};
function buildHTMLStyles(state, latestValues, projection, layoutState, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
  var _a;
  var style = state.style, vars = state.vars, transform = state.transform, transformKeys2 = state.transformKeys, transformOrigin = state.transformOrigin;
  transformKeys2.length = 0;
  var hasTransform = false;
  var hasTransformOrigin = false;
  var transformIsNone = true;
  for (var key in latestValues) {
    var value = latestValues[key];
    if (isCSSVariable$1(key)) {
      vars[key] = value;
      continue;
    }
    var valueType = numberValueTypes[key];
    var valueAsType = getValueAsType(value, valueType);
    if (isTransformProp(key)) {
      hasTransform = true;
      transform[key] = valueAsType;
      transformKeys2.push(key);
      if (!transformIsNone)
        continue;
      if (value !== ((_a = valueType.default) !== null && _a !== void 0 ? _a : 0))
        transformIsNone = false;
    } else if (isTransformOriginProp(key)) {
      transformOrigin[key] = valueAsType;
      hasTransformOrigin = true;
    } else {
      if (layoutState && projection && layoutState.isHydrated && valueScaleCorrection[key]) {
        var correctedValue = valueScaleCorrection[key].process(value, layoutState, projection);
        var applyTo = valueScaleCorrection[key].applyTo;
        if (applyTo) {
          var num = applyTo.length;
          for (var i = 0; i < num; i++) {
            style[applyTo[i]] = correctedValue;
          }
        } else {
          style[key] = correctedValue;
        }
      } else {
        style[key] = valueAsType;
      }
    }
  }
  if (layoutState && projection && buildProjectionTransform && buildProjectionTransformOrigin) {
    style.transform = buildProjectionTransform(layoutState.deltaFinal, layoutState.treeScale, hasTransform ? transform : void 0);
    if (transformTemplate) {
      style.transform = transformTemplate(transform, style.transform);
    }
    style.transformOrigin = buildProjectionTransformOrigin(layoutState);
  } else {
    if (hasTransform) {
      style.transform = buildTransform(state, options, transformIsNone, transformTemplate);
    }
    if (hasTransformOrigin) {
      style.transformOrigin = buildTransformOrigin(transformOrigin);
    }
  }
}
const UseInitialMotionValues = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let styles;
  let { visualState, isStatic, props } = $$props;
  const memo = () => {
    let state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, void 0, void 0, { enableHardwareAcceleration: !isStatic }, props.transformTemplate);
    const { vars, style } = state;
    return { ...vars, ...style };
  };
  if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
  if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  styles = memo();
  return `${slots.default ? slots.default({ styles }) : ``}`;
});
function copyRawValuesOnly(target, source, props) {
  for (const key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}
const UseStyle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let styleProp;
  let { visualState, props, isStatic } = $$props;
  let style = {};
  const cRVO = copyRawValuesOnly;
  const toStyle = (s1) => {
    Object.assign(style, s1);
    if (props.transformValues) {
      style = props.transformValues(style);
    }
    return style;
  };
  if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
  styleProp = props.style || {};
  {
    cRVO(style, styleProp, props);
  }
  return `${validate_component(UseInitialMotionValues, "UseInitialMotionValues").$$render($$result, { props, visualState, isStatic }, {}, {
    default: ({ styles: s1 }) => {
      return `${slots.default ? slots.default({ styles: toStyle(s1) }) : ``}`;
    }
  })}`;
});
const UseHTMLProps = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { props, visualState, isStatic } = $$props;
  const getHTMLProps = (style, props2) => {
    let htmlProps = {};
    if (Boolean(props2.drag)) {
      htmlProps.draggable = false;
      style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
      style.touchAction = props2.drag === true ? "none" : `pan-${props2.drag === "x" ? "y" : "x"}`;
    }
    htmlProps.style = style;
    return htmlProps;
  };
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
  if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
  return `${validate_component(UseStyle, "UseStyle").$$render($$result, { visualState, props, isStatic }, {}, {
    default: ({ styles }) => {
      return `${slots.default ? slots.default({ visualProps: getHTMLProps(styles, props) }) : ``}`;
    }
  })}`;
});
function calcOrigin(origin, offset, size) {
  return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
  var pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
  var pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
  return pxOriginX + " " + pxOriginY;
}
var progressToPixels = function(progress2, length) {
  return px.transform(progress2 * length);
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, totalLength, length, spacing, offset, useDashCase) {
  if (spacing === void 0) {
    spacing = 1;
  }
  if (offset === void 0) {
    offset = 0;
  }
  var keys = camelKeys;
  attrs[keys.offset] = progressToPixels(-offset, totalLength);
  var pathLength = progressToPixels(length, totalLength);
  var pathSpacing = progressToPixels(spacing, totalLength);
  attrs[keys.array] = pathLength + " " + pathSpacing;
}
function buildSVGAttrs(state, _a, projection, layoutState, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
  var attrX = _a.attrX, attrY = _a.attrY, originX = _a.originX, originY = _a.originY, pathLength = _a.pathLength, _b = _a.pathSpacing, pathSpacing = _b === void 0 ? 1 : _b, _c = _a.pathOffset, pathOffset = _c === void 0 ? 0 : _c, latest = __rest$1(_a, ["attrX", "attrY", "originX", "originY", "pathLength", "pathSpacing", "pathOffset"]);
  buildHTMLStyles(state, latest, projection, layoutState, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin);
  state.attrs = state.style;
  state.style = {};
  var attrs = state.attrs, style = state.style, dimensions = state.dimensions, totalPathLength = state.totalPathLength;
  if (attrs.transform) {
    if (dimensions)
      style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) {
    style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (totalPathLength !== void 0 && pathLength !== void 0) {
    buildSVGPath(attrs, totalPathLength, pathLength, pathSpacing, pathOffset);
  }
}
const UseSVGProps = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let visualProps;
  let { visualState, props } = $$props;
  let memo = () => {
    const state = createSvgRenderState();
    buildSVGAttrs(state, visualState, void 0, void 0, { enableHardwareAcceleration: false }, props.transformTemplate);
    return {
      ...state.attrs,
      style: { ...state.style }
    };
  };
  if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  visualProps = memo();
  {
    if (props.style) {
      const rawStyles = {};
      copyRawValuesOnly(rawStyles, props.style, props);
      visualProps.style = { ...rawStyles, ...visualProps.style };
    }
  }
  return `${slots.default ? slots.default({ visualProps }) : ``}`;
});
var shouldForward = function(key) {
  return !isValidMotionProp(key);
};
try {
  var emotionIsPropValid_1 = require("@emotion/is-prop-valid").default;
  shouldForward = function(key) {
    if (key.startsWith("on")) {
      return !isValidMotionProp(key);
    } else {
      return emotionIsPropValid_1(key);
    }
  };
} catch (_a) {
}
function filterProps(props, isDom, forwardMotionProps) {
  var filteredProps = {};
  for (var key in props) {
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key)) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}
const UseRender = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredProps;
  let { props, visualState, Component, forwardMotionProps = false, isStatic, ref, targetEl = void 0 } = $$props;
  const motion2 = (node) => {
    ref(node);
  };
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
  if ($$props.Component === void 0 && $$bindings.Component && Component !== void 0) $$bindings.Component(Component);
  if ($$props.forwardMotionProps === void 0 && $$bindings.forwardMotionProps && forwardMotionProps !== void 0) $$bindings.forwardMotionProps(forwardMotionProps);
  if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  if ($$props.targetEl === void 0 && $$bindings.targetEl && targetEl !== void 0) $$bindings.targetEl(targetEl);
  filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
  {
    if (targetEl) {
      motion2(targetEl);
    }
  }
  return `${validate_component((Component === "SVG" ? UseSVGProps : UseHTMLProps) || missing_component, "svelte:component").$$render($$result, { visualState, isStatic, props }, {}, {
    default: ({ visualProps }) => {
      return `${slots.default ? slots.default({
        motion: motion2,
        props: { ...filteredProps, ...visualProps }
      }) : ``}`;
    }
  })}`;
});
function getBoundingBox(element, transformPagePoint) {
  var box = element.getBoundingClientRect();
  return convertBoundingBoxToAxisBox(transformBoundingBox(box, transformPagePoint));
}
function isCSSVariable(value) {
  return typeof value === "string" && value.startsWith("var(--");
}
var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
  var match = cssVariableRegex.exec(current);
  if (!match)
    return [,];
  var _a = __read(match, 3), token = _a[1], fallback = _a[2];
  return [token, fallback];
}
function getVariableValue(current, element, depth) {
  var _a = __read(parseCSSVariable(current), 2), token = _a[0], fallback = _a[1];
  if (!token)
    return;
  var resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    return resolved.trim();
  } else if (isCSSVariable(fallback)) {
    return getVariableValue(fallback, element);
  } else {
    return fallback;
  }
}
function resolveCSSVariables(visualElement2, _a, transitionEnd) {
  var _b;
  var target = __rest$1(_a, []);
  var element = visualElement2.getInstance();
  if (!(element instanceof HTMLElement))
    return { target, transitionEnd };
  if (transitionEnd) {
    transitionEnd = Object.assign({}, transitionEnd);
  }
  visualElement2.forEachValue(function(value) {
    var current2 = value.get();
    if (!isCSSVariable(current2))
      return;
    var resolved2 = getVariableValue(current2, element);
    if (resolved2)
      value.set(resolved2);
  });
  for (var key in target) {
    var current = target[key];
    if (!isCSSVariable(current))
      continue;
    var resolved = getVariableValue(current, element);
    if (!resolved)
      continue;
    target[key] = resolved;
    if (transitionEnd)
      (_b = transitionEnd[key]) !== null && _b !== void 0 ? _b : transitionEnd[key] = current;
  }
  return { target, transitionEnd };
}
var positionalKeys = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "x",
  "y"
]);
var isPositionalKey = function(key) {
  return positionalKeys.has(key);
};
var hasPositionalKey = function(target) {
  return Object.keys(target).some(isPositionalKey);
};
var setAndResetVelocity = function(value, to) {
  value.set(to, false);
  value.set(to);
};
var isNumOrPxType = function(v) {
  return v === number || v === px;
};
var BoundingBoxDimension;
(function(BoundingBoxDimension2) {
  BoundingBoxDimension2["width"] = "width";
  BoundingBoxDimension2["height"] = "height";
  BoundingBoxDimension2["left"] = "left";
  BoundingBoxDimension2["right"] = "right";
  BoundingBoxDimension2["top"] = "top";
  BoundingBoxDimension2["bottom"] = "bottom";
})(BoundingBoxDimension || (BoundingBoxDimension = {}));
var getPosFromMatrix = function(matrix, pos) {
  return parseFloat(matrix.split(", ")[pos]);
};
var getTranslateFromMatrix = function(pos2, pos3) {
  return function(_bbox, _a) {
    var transform = _a.transform;
    if (transform === "none" || !transform)
      return 0;
    var matrix3d = transform.match(/^matrix3d\((.+)\)$/);
    if (matrix3d) {
      return getPosFromMatrix(matrix3d[1], pos3);
    } else {
      var matrix = transform.match(/^matrix\((.+)\)$/);
      if (matrix) {
        return getPosFromMatrix(matrix[1], pos2);
      } else {
        return 0;
      }
    }
  };
};
var transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformProps.filter(function(key) {
  return !transformKeys.has(key);
});
function removeNonTranslationalTransform(visualElement2) {
  var removedTransforms = [];
  nonTranslationalTransformKeys.forEach(function(key) {
    var value = visualElement2.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  if (removedTransforms.length)
    visualElement2.syncRender();
  return removedTransforms;
}
var positionalValues = {
  // Dimensions
  width: function(_a) {
    var x = _a.x;
    return x.max - x.min;
  },
  height: function(_a) {
    var y = _a.y;
    return y.max - y.min;
  },
  top: function(_bbox, _a) {
    var top = _a.top;
    return parseFloat(top);
  },
  left: function(_bbox, _a) {
    var left = _a.left;
    return parseFloat(left);
  },
  bottom: function(_a, _b) {
    var y = _a.y;
    var top = _b.top;
    return parseFloat(top) + (y.max - y.min);
  },
  right: function(_a, _b) {
    var x = _a.x;
    var left = _b.left;
    return parseFloat(left) + (x.max - x.min);
  },
  // Transform
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};
var convertChangedValueTypes = function(target, visualElement2, changedKeys) {
  var originBbox = visualElement2.measureViewportBox();
  var element = visualElement2.getInstance();
  var elementComputedStyle = getComputedStyle(element);
  var display = elementComputedStyle.display, top = elementComputedStyle.top, left = elementComputedStyle.left, bottom = elementComputedStyle.bottom, right = elementComputedStyle.right, transform = elementComputedStyle.transform;
  var originComputedStyle = { top, left, bottom, right, transform };
  if (display === "none") {
    visualElement2.setStaticValue("display", target.display || "block");
  }
  visualElement2.syncRender();
  var targetBbox = visualElement2.measureViewportBox();
  changedKeys.forEach(function(key) {
    var value = visualElement2.getValue(key);
    setAndResetVelocity(value, positionalValues[key](originBbox, originComputedStyle));
    target[key] = positionalValues[key](targetBbox, elementComputedStyle);
  });
  return target;
};
var checkAndConvertChangedValueTypes = function(visualElement2, target, origin, transitionEnd) {
  if (origin === void 0) {
    origin = {};
  }
  if (transitionEnd === void 0) {
    transitionEnd = {};
  }
  target = Object.assign({}, target);
  transitionEnd = Object.assign({}, transitionEnd);
  var targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
  var removedTransformValues = [];
  var hasAttemptedToRemoveTransformValues = false;
  var changedValueTypeKeys = [];
  targetPositionalKeys.forEach(function(key) {
    var value = visualElement2.getValue(key);
    if (!visualElement2.hasValue(key))
      return;
    var from = origin[key];
    var to = target[key];
    var fromType = findDimensionValueType(from);
    var toType;
    if (isKeyframesTarget(to)) {
      var numKeyframes = to.length;
      for (var i = to[0] === null ? 1 : 0; i < numKeyframes; i++) {
        if (!toType) {
          toType = findDimensionValueType(to[i]);
        }
      }
    } else {
      toType = findDimensionValueType(to);
    }
    if (fromType !== toType) {
      if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
        var current = value.get();
        if (typeof current === "string") {
          value.set(parseFloat(current));
        }
        if (typeof to === "string") {
          target[key] = parseFloat(to);
        } else if (Array.isArray(to) && toType === px) {
          target[key] = to.map(parseFloat);
        }
      } else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from === 0 || to === 0)) {
        if (from === 0) {
          value.set(toType.transform(from));
        } else {
          target[key] = fromType.transform(to);
        }
      } else {
        if (!hasAttemptedToRemoveTransformValues) {
          removedTransformValues = removeNonTranslationalTransform(visualElement2);
          hasAttemptedToRemoveTransformValues = true;
        }
        changedValueTypeKeys.push(key);
        transitionEnd[key] = transitionEnd[key] !== void 0 ? transitionEnd[key] : target[key];
        setAndResetVelocity(value, to);
      }
    }
  });
  if (changedValueTypeKeys.length) {
    var convertedTarget = convertChangedValueTypes(target, visualElement2, changedValueTypeKeys);
    if (removedTransformValues.length) {
      removedTransformValues.forEach(function(_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        visualElement2.getValue(key).set(value);
      });
    }
    visualElement2.syncRender();
    return { target: convertedTarget, transitionEnd };
  } else {
    return { target, transitionEnd };
  }
};
function unitConversion(visualElement2, target, origin, transitionEnd) {
  return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement2, target, origin, transitionEnd) : { target, transitionEnd };
}
var parseDomVariant = function(visualElement2, target, origin, transitionEnd) {
  var resolved = resolveCSSVariables(visualElement2, target, transitionEnd);
  target = resolved.target;
  transitionEnd = resolved.transitionEnd;
  return unitConversion(visualElement2, target, origin, transitionEnd);
};
function scrapeMotionValuesFromProps$1(props) {
  var style = props.style;
  var newValues = {};
  for (var key in style) {
    if (isMotionValue(style[key]) || isForcedMotionValue(key, props)) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}
function renderHTML(element, _a) {
  var style = _a.style, vars = _a.vars;
  Object.assign(element.style, style);
  for (var key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}
function getComputedStyle$1(element) {
  return window.getComputedStyle(element);
}
var htmlConfig = {
  treeType: "dom",
  readValueFromInstance: function(domElement, key) {
    if (isTransformProp(key)) {
      var defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    } else {
      var computedStyle = getComputedStyle$1(domElement);
      return (isCSSVariable$1(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
    }
  },
  sortNodePosition: function(a, b) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  },
  getBaseTarget: function(props, key) {
    var _a;
    return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
  },
  measureViewportBox: function(element, _a) {
    var transformPagePoint = _a.transformPagePoint;
    return getBoundingBox(element, transformPagePoint);
  },
  /**
   * Reset the transform on the current Element. This is called as part
   * of a batched process across the entire layout tree. To remove this write
   * cycle it'd be interesting to see if it's possible to "undo" all the current
   * layout transforms up the tree in the same way this.getBoundingBoxWithoutTransforms
   * works
   */
  resetTransform: function(element, domElement, props) {
    var transformTemplate = props.transformTemplate;
    domElement.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    element.scheduleRender();
  },
  restoreTransform: function(instance, mutableState) {
    instance.style.transform = mutableState.style.transform;
  },
  removeValueFromRenderState: function(key, _a) {
    var vars = _a.vars, style = _a.style;
    delete vars[key];
    delete style[key];
  },
  /**
   * Ensure that HTML and Framer-specific value types like `px`->`%` and `Color`
   * can be animated by Motion.
   */
  makeTargetAnimatable: function(element, _a, _b, isMounted) {
    var transformValues = _b.transformValues;
    if (isMounted === void 0) {
      isMounted = true;
    }
    var transition = _a.transition, transitionEnd = _a.transitionEnd, target = __rest$1(_a, ["transition", "transitionEnd"]);
    var origin = getOrigin(target, transition || {}, element);
    if (transformValues) {
      if (transitionEnd)
        transitionEnd = transformValues(transitionEnd);
      if (target)
        target = transformValues(target);
      if (origin)
        origin = transformValues(origin);
    }
    if (isMounted) {
      checkTargetForNewValues(element, target, origin);
      var parsed = parseDomVariant(element, target, origin, transitionEnd);
      transitionEnd = parsed.transitionEnd;
      target = parsed.target;
    }
    return Object.assign({
      transition,
      transitionEnd
    }, target);
  },
  scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
  build: function(element, renderState, latestValues, projection, layoutState, options, props) {
    if (element.isVisible !== void 0) {
      renderState.style.visibility = element.isVisible ? "visible" : "hidden";
    }
    var isProjectionTranform = projection.isEnabled && layoutState.isHydrated;
    buildHTMLStyles(renderState, latestValues, projection, layoutState, options, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : void 0, isProjectionTranform ? buildLayoutProjectionTransformOrigin : void 0);
  },
  render: renderHTML
};
var htmlVisualElement = visualElement(htmlConfig);
function scrapeMotionValuesFromProps(props) {
  var newValues = scrapeMotionValuesFromProps$1(props);
  for (var key in props) {
    if (isMotionValue(props[key])) {
      var targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}
var CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
var REPLACE_TEMPLATE = "$1-$2";
var camelToDash = function(str) {
  return str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
};
var camelCaseAttributes = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox"
]);
function renderSVG(element, renderState) {
  renderHTML(element, renderState);
  for (var key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}
var svgVisualElement = visualElement(Object.assign(Object.assign({}, htmlConfig), {
  getBaseTarget: function(props, key) {
    return props[key];
  },
  readValueFromInstance: function(domElement, key) {
    var _a;
    if (isTransformProp(key)) {
      return ((_a = getDefaultValueType(key)) === null || _a === void 0 ? void 0 : _a.default) || 0;
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return domElement.getAttribute(key);
  },
  scrapeMotionValuesFromProps,
  build: function(_element, renderState, latestValues, projection, layoutState, options, props) {
    var isProjectionTranform = projection.isEnabled && layoutState.isHydrated;
    buildSVGAttrs(renderState, latestValues, projection, layoutState, options, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : void 0, isProjectionTranform ? buildLayoutProjectionTransformOrigin : void 0);
  },
  render: renderSVG
}));
var createDomVisualElement = function(Component, options) {
  return Component === "SVG" ? svgVisualElement(options, { enableHardwareAcceleration: false }) : htmlVisualElement(options, { enableHardwareAcceleration: true });
};
var svgMotionConfig = {
  scrapeMotionValuesFromProps,
  createRenderState: createSvgRenderState,
  onMount: function(props, instance, _a) {
    var renderState = _a.renderState, latestValues = _a.latestValues;
    try {
      renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
    } catch (e) {
      renderState.dimensions = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    }
    if (isPath(instance)) {
      renderState.totalPathLength = instance.getTotalLength();
    }
    buildSVGAttrs(renderState, latestValues, void 0, void 0, { enableHardwareAcceleration: false }, props.transformTemplate);
    renderSVG(instance, renderState);
  }
};
function isPath(element) {
  return element.tagName === "path";
}
var htmlMotionConfig = {
  scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
  createRenderState: createHtmlRenderState
};
function getCurrentTreeVariants(props, context) {
  if (checkIfControllingVariants(props)) {
    var initial = props.initial, animate2 = props.animate;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate2) ? animate2 : void 0
    };
  }
  return props.inherit !== false ? context || {} : {};
}
const UseCreateMotionContext = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mc, $$unsubscribe_mc;
  let { props, isStatic, isCustom } = $$props;
  let mc = getContext(MotionContext) || MotionContext(isCustom);
  $$unsubscribe_mc = subscribe(mc, (value2) => $mc = value2);
  let { initial, animate: animate2 } = getCurrentTreeVariants(props, get_store_value(mc));
  const variantLabelsAsDependency = (prop) => {
    return Array.isArray(prop) ? prop.join(" ") : prop;
  };
  const memo = () => {
    return { initial, animate: animate2 };
  };
  let value = memo();
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
  ({ initial, animate: animate2 } = getCurrentTreeVariants(props, $mc));
  {
    if (isStatic) {
      value = memo(variantLabelsAsDependency(initial), variantLabelsAsDependency(animate2));
    }
  }
  $$unsubscribe_mc();
  return `${slots.default ? slots.default({ value }) : ``}`;
});
function resolveMotionValue(value) {
  var unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}
const makeState = ({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2, createRenderState, onMount }, props, context, presenceContext) => {
  const state = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps2),
    renderState: createRenderState()
  };
  if (onMount) {
    state.mount = (instance) => onMount(props, instance, state);
  }
  return state;
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  const values = {};
  const blockInitialAnimation = presenceContext?.initial === false;
  const motionValues = scrapeMotionValues(props);
  for (const key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }
  let { initial, animate: animate2 } = props;
  const isControllingVariants = checkIfControllingVariants(props);
  const isVariantNode = checkIfVariantNode(props);
  if (context && isVariantNode && !isControllingVariants && props.inherit !== false) {
    initial !== null && initial !== void 0 ? initial : initial = context.initial;
    animate2 !== null && animate2 !== void 0 ? animate2 : animate2 = context.animate;
  }
  const variantToSet = blockInitialAnimation || initial === false ? animate2 : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    list.forEach((definition) => {
      const resolved = resolveVariantFromProps(props, definition);
      if (!resolved) return;
      const { transitionEnd, transition, ...target } = resolved;
      for (const key in target) values[key] = target[key];
      for (const key in transitionEnd) values[key] = transitionEnd[key];
    });
  }
  return values;
}
const UseVisualState = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $presenceContext, $$unsubscribe_presenceContext;
  let $context, $$unsubscribe_context;
  let { config, props, isStatic, isCustom } = $$props;
  const context = getContext(MotionContext) || MotionContext(isCustom);
  $$unsubscribe_context = subscribe(context, (value) => $context = value);
  const presenceContext = getContext(PresenceContext) || PresenceContext(isCustom);
  $$unsubscribe_presenceContext = subscribe(presenceContext, (value) => $presenceContext = value);
  let state = makeState(config, props, get_store_value(context), get_store_value(presenceContext));
  const ms = makeState;
  if ($$props.config === void 0 && $$bindings.config && config !== void 0) $$bindings.config(config);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
  {
    if (isStatic) {
      state = ms(config, props, $context, $presenceContext);
    }
  }
  $$unsubscribe_presenceContext();
  $$unsubscribe_context();
  return `${slots.default ? slots.default({ state }) : ``}`;
});
function isRefObject(ref) {
  return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
function useMotionRef(visualState, visualElement2, externalRef) {
  return function(instance) {
    var _a;
    instance && ((_a = visualState.mount) === null || _a === void 0 ? void 0 : _a.call(visualState, instance));
    if (visualElement2) {
      instance ? visualElement2.mount(instance) : visualElement2.unmount();
    }
    if (externalRef) {
      if (typeof externalRef === "function") {
        externalRef(instance);
      } else if (isRefObject(externalRef)) {
        externalRef.current = instance;
      }
    }
  };
}
const Motion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let motionProps;
  let isStatic;
  let $$restProps = compute_rest_props($$props, ["isSVG", "forwardMotionProps", "externalRef", "targetEl"]);
  let $a, $$unsubscribe_a;
  let { isSVG = false, forwardMotionProps = false, externalRef = void 0, targetEl = void 0 } = $$props;
  const isCustom = targetEl;
  let Component = isSVG ? "SVG" : "DOM";
  let createVisualElement = createDomVisualElement;
  let visualStateConfig = isSVG ? svgMotionConfig : htmlMotionConfig;
  const a = getContext(MotionConfigContext) || MotionConfigContext(isCustom);
  $$unsubscribe_a = subscribe(a, (value) => $a = value);
  const setContext2 = (c, v) => {
    c.visualElement = v;
    return v;
  };
  if ($$props.isSVG === void 0 && $$bindings.isSVG && isSVG !== void 0) $$bindings.isSVG(isSVG);
  if ($$props.forwardMotionProps === void 0 && $$bindings.forwardMotionProps && forwardMotionProps !== void 0) $$bindings.forwardMotionProps(forwardMotionProps);
  if ($$props.externalRef === void 0 && $$bindings.externalRef && externalRef !== void 0) $$bindings.externalRef(externalRef);
  if ($$props.targetEl === void 0 && $$bindings.targetEl && targetEl !== void 0) $$bindings.targetEl(targetEl);
  motionProps = $$restProps;
  ({ isStatic } = $a || {});
  $$unsubscribe_a();
  return `${validate_component(ScaleCorrectionProvider, "ScaleCorrectionProvider").$$render($$result, { isCustom }, {}, {
    default: () => {
      return `${validate_component(UseCreateMotionContext, "UseCreateMotionContext").$$render($$result, { props: motionProps, isStatic, isCustom }, {}, {
        default: ({ value: context }) => {
          return `${validate_component(UseVisualState, "UseVisualState").$$render(
            $$result,
            {
              config: visualStateConfig,
              props: motionProps,
              isStatic,
              isCustom
            },
            {},
            {
              default: ({ state: visualState }) => {
                return `${validate_component(UseVisualElement, "UseVisualElement").$$render(
                  $$result,
                  {
                    Component,
                    visualState,
                    createVisualElement,
                    props: motionProps,
                    isCustom
                  },
                  {},
                  {
                    default: ({ visualElement: visualElement2 }) => {
                      return `${validate_component(UseFeatures, "UseFeatures").$$render(
                        $$result,
                        {
                          visualElement: setContext2(context, visualElement2),
                          props: motionProps
                        },
                        {},
                        {
                          default: ({ features: _features }) => {
                            return `${validate_component(MotionContextProvider, "MotionContextProvider").$$render($$result, { value: context, isCustom }, {}, {
                              default: () => {
                                return `${validate_component(UseRender, "UseRender").$$render(
                                  $$result,
                                  {
                                    Component,
                                    props: motionProps,
                                    ref: useMotionRef(visualState, context.visualElement, externalRef),
                                    visualState,
                                    isStatic,
                                    forwardMotionProps
                                  },
                                  {},
                                  {
                                    default: ({ motion: motion2, props: renderProps }) => {
                                      return `${slots.default ? slots.default({ motion: motion2, props: renderProps }) : ``}`;
                                    }
                                  }
                                )}`;
                              }
                            })} ${``}`;
                          }
                        }
                      )}`;
                    }
                  }
                )}`;
              }
            }
          )}`;
        }
      })}`;
    }
  })}`;
});
function addDomEvent(target, eventName, handler, options) {
  target.addEventListener(eventName, handler, options);
  return function() {
    return target.removeEventListener(eventName, handler, options);
  };
}
const UseDomEvent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { ref, eventName, handler = void 0, options = void 0 } = $$props;
  let cleanup = () => {
  };
  const effect = () => {
    cleanup();
    if (!ref) {
      return () => {
      };
    }
    const element = ref.current;
    if (handler && element) {
      return addDomEvent(element, eventName, handler, options);
    }
    return () => {
    };
  };
  onDestroy(cleanup);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  if ($$props.eventName === void 0 && $$bindings.eventName && eventName !== void 0) $$bindings.eventName(eventName);
  if ($$props.handler === void 0 && $$bindings.handler && handler !== void 0) $$bindings.handler(handler);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  cleanup = effect();
  return `${slots.default ? slots.default({}) : ``}`;
});
function isMouseEvent(event) {
  if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
    return !!(event.pointerType === "mouse");
  }
  return event instanceof MouseEvent;
}
function isTouchEvent(event) {
  var hasTouches = !!event.touches;
  return hasTouches;
}
function filterPrimaryPointer(eventHandler) {
  return function(event) {
    var isMouseEvent2 = event instanceof MouseEvent;
    var isPrimaryPointer = !isMouseEvent2 || isMouseEvent2 && event.button === 0;
    if (isPrimaryPointer) {
      eventHandler(event);
    }
  };
}
var defaultPagePoint = { pageX: 0, pageY: 0 };
function pointFromTouch(e, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  var primaryTouch = e.touches[0] || e.changedTouches[0];
  var point = primaryTouch || defaultPagePoint;
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}
function pointFromMouse(point, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}
function extractEventInfo(event, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  return {
    point: isTouchEvent(event) ? pointFromTouch(event, pointType) : pointFromMouse(event, pointType)
  };
}
function getViewportPointFromEvent(event) {
  return extractEventInfo(event, "client");
}
var wrapHandler = function(handler, shouldFilterPrimaryPointer) {
  if (shouldFilterPrimaryPointer === void 0) {
    shouldFilterPrimaryPointer = false;
  }
  var listener = function(event) {
    return handler(event, extractEventInfo(event));
  };
  return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
};
var isBrowser = typeof window !== "undefined";
var supportsPointerEvents = function() {
  return isBrowser && window.onpointerdown === null;
};
var supportsTouchEvents = function() {
  return isBrowser && window.ontouchstart === null;
};
var supportsMouseEvents = function() {
  return isBrowser && window.onmousedown === null;
};
const mouseEventNames = {
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointercancel: "mousecancel",
  pointerover: "mouseover",
  pointerout: "mouseout",
  pointerenter: "mouseenter",
  pointerleave: "mouseleave"
};
const touchEventNames = {
  pointerdown: "touchstart",
  pointermove: "touchmove",
  pointerup: "touchend",
  pointercancel: "touchcancel"
};
function getPointerEventName(name) {
  if (supportsPointerEvents()) {
    return name;
  } else if (supportsTouchEvents()) {
    return touchEventNames[name];
  } else if (supportsMouseEvents()) {
    return mouseEventNames[name];
  }
  return name;
}
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, getPointerEventName(eventName), wrapHandler(handler, eventName === "pointerdown"), options);
}
const UsePointerEvent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { ref, eventName, handler = void 0, options = void 0 } = $$props;
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  if ($$props.eventName === void 0 && $$bindings.eventName && eventName !== void 0) $$bindings.eventName(eventName);
  if ($$props.handler === void 0 && $$bindings.handler && handler !== void 0) $$bindings.handler(handler);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  return `${validate_component(UseDomEvent, "UseDomEvent").$$render(
    $$result,
    {
      ref,
      eventName: getPointerEventName(eventName),
      handler: handler && wrapHandler(handler, eventName === "pointerdown"),
      options
    },
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
var PanSession = (
  /** @class */
  function() {
    function PanSession2(event, handlers, _a) {
      var _this = this;
      var _b = _a === void 0 ? {} : _a, transformPagePoint = _b.transformPagePoint;
      this.startEvent = null;
      this.lastMoveEvent = null;
      this.lastMoveEventInfo = null;
      this.handlers = {};
      this.updatePoint = function() {
        if (!(_this.lastMoveEvent && _this.lastMoveEventInfo))
          return;
        var info2 = getPanInfo(_this.lastMoveEventInfo, _this.history);
        var isPanStarted = _this.startEvent !== null;
        var isDistancePastThreshold = distance(info2.offset, { x: 0, y: 0 }) >= 3;
        if (!isPanStarted && !isDistancePastThreshold)
          return;
        var point2 = info2.point;
        var timestamp2 = getFrameData().timestamp;
        _this.history.push(Object.assign(Object.assign({}, point2), { timestamp: timestamp2 }));
        var _a2 = _this.handlers, onStart = _a2.onStart, onMove = _a2.onMove;
        if (!isPanStarted) {
          onStart && onStart(_this.lastMoveEvent, info2);
          _this.startEvent = _this.lastMoveEvent;
        }
        onMove && onMove(_this.lastMoveEvent, info2);
      };
      this.handlePointerMove = function(event2, info2) {
        _this.lastMoveEvent = event2;
        _this.lastMoveEventInfo = transformPoint(info2, _this.transformPagePoint);
        if (isMouseEvent(event2) && event2.buttons === 0) {
          _this.handlePointerUp(event2, info2);
          return;
        }
        sync.update(_this.updatePoint, true);
      };
      this.handlePointerUp = function(event2, info2) {
        _this.end();
        var _a2 = _this.handlers, onEnd = _a2.onEnd, onSessionEnd = _a2.onSessionEnd;
        var panInfo = getPanInfo(transformPoint(info2, _this.transformPagePoint), _this.history);
        if (_this.startEvent && onEnd) {
          onEnd(event2, panInfo);
        }
        onSessionEnd && onSessionEnd(event2, panInfo);
      };
      if (isTouchEvent(event) && event.touches.length > 1)
        return;
      this.handlers = handlers;
      this.transformPagePoint = transformPagePoint;
      var info = extractEventInfo(event);
      var initialInfo = transformPoint(info, this.transformPagePoint);
      var point = initialInfo.point;
      var timestamp = getFrameData().timestamp;
      this.history = [Object.assign(Object.assign({}, point), { timestamp })];
      var onSessionStart = handlers.onSessionStart;
      onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
      this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
    }
    PanSession2.prototype.updateHandlers = function(handlers) {
      this.handlers = handlers;
    };
    PanSession2.prototype.end = function() {
      this.removeListeners && this.removeListeners();
      cancelSync.update(this.updatePoint);
    };
    return PanSession2;
  }()
);
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}
function getPanInfo(_a, history) {
  var point = _a.point;
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  var i = history.length - 1;
  var timestampedPoint = null;
  var lastPoint = lastDevicePoint(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  var time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1e3;
  if (time === 0) {
    return { x: 0, y: 0 };
  }
  var currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}
const UsePanGesture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasPanEvents;
  let $mcc, $$unsubscribe_mcc;
  let { props, visualElement: visualElement2, isCustom } = $$props;
  let { onPan, onPanStart, onPanEnd, onPanSessionStart } = props;
  let panSession = null;
  const mcc = getContext(MotionConfigContext) || MotionConfigContext(isCustom);
  $$unsubscribe_mcc = subscribe(mcc, (value) => $mcc = value);
  let { transformPagePoint } = get_store_value(mcc);
  let handlers = {
    onSessionStart: onPanSessionStart,
    onStart: onPanStart,
    onMove: onPan,
    onEnd: (event, info) => {
      panSession = null;
      onPanEnd && onPanEnd(event, info);
    }
  };
  function onPointerDown(event) {
    panSession = new PanSession(event, handlers, { transformPagePoint });
  }
  onDestroy(() => panSession && panSession.end());
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
  ({ onPan, onPanStart, onPanEnd, onPanSessionStart } = props);
  hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
  ({ transformPagePoint } = $mcc);
  handlers = {
    onSessionStart: onPanSessionStart,
    onStart: onPanStart,
    onMove: onPan,
    onEnd: (event, info) => {
      panSession = null;
      onPanEnd && onPanEnd(event, info);
    }
  };
  $$unsubscribe_mcc();
  return `${validate_component(UsePointerEvent, "UsePointerEvent").$$render(
    $$result,
    {
      ref: visualElement2,
      eventName: "pointerdown",
      handler: hasPanEvents && onPointerDown
    },
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
var isNodeOrChild = function(parent, child) {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};
function createLock(name) {
  var lock = null;
  return function() {
    var openLock = function() {
      lock = null;
    };
    if (lock === null) {
      lock = name;
      return openLock;
    }
    return false;
  };
}
var globalHorizontalLock = createLock("dragHorizontal");
var globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag2) {
  var lock = false;
  if (drag2 === "y") {
    lock = globalVerticalLock();
  } else if (drag2 === "x") {
    lock = globalHorizontalLock();
  } else {
    var openHorizontal_1 = globalHorizontalLock();
    var openVertical_1 = globalVerticalLock();
    if (openHorizontal_1 && openVertical_1) {
      lock = function() {
        openHorizontal_1();
        openVertical_1();
      };
    } else {
      if (openHorizontal_1)
        openHorizontal_1();
      if (openVertical_1)
        openVertical_1();
    }
  }
  return lock;
}
function isDragActive() {
  var openGestureLock = getGlobalLock(true);
  if (!openGestureLock)
    return true;
  openGestureLock();
  return false;
}
const UseTapGesture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let onTap;
  let onTapStart;
  let onTapCancel;
  let whileTap;
  let hasPressListeners;
  let { props, visualElement: visualElement2 } = $$props;
  let isPressing = false;
  let cancelPointerEndListeners = null;
  function removePointerEndListener() {
    cancelPointerEndListeners?.();
    cancelPointerEndListeners = null;
  }
  function checkPointerEnd() {
    removePointerEndListener();
    isPressing = false;
    visualElement2.animationState?.setActive(AnimationType.Tap, false);
    return !isDragActive();
  }
  function onPointerUp(event, info) {
    if (!checkPointerEnd()) return;
    !isNodeOrChild(visualElement2.getInstance(), event.target) ? onTapCancel?.(event, info) : onTap?.(event, info);
  }
  function onPointerCancel(event, info) {
    if (!checkPointerEnd()) return;
    onTapCancel?.(event, info);
  }
  function onPointerDown(event, info) {
    if (isPressing) return;
    removePointerEndListener();
    isPressing = true;
    cancelPointerEndListeners = pipe(addPointerEvent(window, "pointerup", onPointerUp), addPointerEvent(window, "pointercancel", onPointerCancel));
    onTapStart?.(event, info);
    visualElement2.animationState?.setActive(AnimationType.Tap, true);
  }
  onDestroy(removePointerEndListener);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
  ({ onTap, onTapStart, onTapCancel, whileTap } = props);
  hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
  return `${validate_component(UsePointerEvent, "UsePointerEvent").$$render(
    $$result,
    {
      ref: visualElement2,
      eventName: "pointerdown",
      handler: hasPressListeners ? onPointerDown : void 0
    },
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
function createHoverEvent(visualElement2, isActive, callback) {
  return (event, info) => {
    if (!isMouseEvent(event) || isDragActive()) return;
    callback?.(event, info);
    visualElement2.animationState?.setActive(AnimationType.Hover, isActive);
  };
}
const UseHoverGesture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { props, visualElement: visualElement2 } = $$props;
  let { onHoverStart, onHoverEnd, whileHover } = props;
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
  ({ onHoverStart, onHoverEnd, whileHover } = props);
  return `${validate_component(UsePointerEvent, "UsePointerEvent").$$render(
    $$result,
    {
      ref: visualElement2,
      eventName: "pointerenter",
      handler: onHoverStart || whileHover ? createHoverEvent(visualElement2, true, onHoverStart) : void 0
    },
    {},
    {}
  )} ${validate_component(UsePointerEvent, "UsePointerEvent").$$render(
    $$result,
    {
      ref: visualElement2,
      eventName: "pointerleave",
      handler: onHoverEnd || whileHover ? createHoverEvent(visualElement2, false, onHoverEnd) : void 0
    },
    {},
    {}
  )} ${slots.default ? slots.default({}) : ``}`;
});
const UseFocusGesture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let whileFocus;
  let { props, visualElement: visualElement2 } = $$props;
  const onFocus = () => {
    visualElement2.animationState?.setActive(AnimationType.Focus, true);
  };
  const onBlur = () => {
    visualElement2.animationState?.setActive(AnimationType.Focus, false);
  };
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
  ({ whileFocus } = props);
  return `${validate_component(UseDomEvent, "UseDomEvent").$$render(
    $$result,
    {
      ref: visualElement2,
      eventName: "focus",
      handler: whileFocus ? onFocus : void 0
    },
    {},
    {
      default: () => {
        return `${validate_component(UseDomEvent, "UseDomEvent").$$render(
          $$result,
          {
            ref: visualElement2,
            eventName: "blur",
            handler: whileFocus ? onBlur : void 0
          },
          {},
          {
            default: () => {
              return `${slots.default ? slots.default({}) : ``}`;
            }
          }
        )}`;
      }
    }
  )}`;
});
const createMotionClass = (features) => {
  features && loadFeatures(features);
  return Motion;
};
const gestureAnimations = {
  tap: UseTapGesture,
  focus: UseFocusGesture,
  hover: UseHoverGesture
};
function applyConstraints(point, _a, elastic) {
  var min = _a.min, max = _a.max;
  if (min !== void 0 && point < min) {
    point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== void 0 && point > max) {
    point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
  }
  return point;
}
function calcConstrainedMinPoint(point, length, progress2, constraints, elastic) {
  var min = point - length * progress2;
  return constraints ? applyConstraints(min, constraints, elastic) : min;
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, _a) {
  var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  var _a;
  var min = constraintsAxis.min - layoutAxis.min;
  var max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    _a = __read([max, min], 2), min = _a[0], max = _a[1];
  }
  return {
    min: layoutAxis.min + min,
    max: layoutAxis.min + max
  };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcPositionFromProgress(axis, constraints, progress2) {
  var axisLength = axis.max - axis.min;
  var min = mix(constraints.min, constraints.max - axisLength, progress2);
  return { min, max: min + axisLength };
}
function rebaseAxisConstraints(layout, constraints) {
  var relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout.min;
  }
  return relativeConstraints;
}
var defaultElastic = 0.35;
function resolveDragElastic(dragElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  var _a;
  return typeof dragElastic === "number" ? dragElastic : (_a = dragElastic[label]) !== null && _a !== void 0 ? _a : 0;
}
function convertToRelativeProjection(visualElement2, isLayoutDrag) {
  if (isLayoutDrag === void 0) {
    isLayoutDrag = true;
  }
  var projectionParent = visualElement2.getProjectionParent();
  if (!projectionParent)
    return false;
  var offset;
  if (isLayoutDrag) {
    offset = calcRelativeOffset(projectionParent.projection.target, visualElement2.projection.target);
    removeBoxTransforms(offset, projectionParent.getLatestValues());
  } else {
    offset = calcRelativeOffset(projectionParent.getLayoutState().layout, visualElement2.getLayoutState().layout);
  }
  eachAxis(function(axis) {
    return visualElement2.setProjectionTargetAxis(axis, offset[axis].min, offset[axis].max, true);
  });
  return true;
}
var elementDragControls = /* @__PURE__ */ new WeakMap();
var lastPointerEvent;
var VisualElementDragControls = (
  /** @class */
  function() {
    function VisualElementDragControls2(_a) {
      var visualElement2 = _a.visualElement;
      this.isDragging = false;
      this.currentDirection = null;
      this.constraints = false;
      this.elastic = axisBox();
      this.props = {};
      this.hasMutatedConstraints = false;
      this.cursorProgress = {
        x: 0.5,
        y: 0.5
      };
      this.originPoint = {};
      this.openGlobalLock = null;
      this.panSession = null;
      this.visualElement = visualElement2;
      this.visualElement.enableLayoutProjection();
      elementDragControls.set(visualElement2, this);
    }
    VisualElementDragControls2.prototype.start = function(originEvent, _a) {
      var _this = this;
      var _b = _a === void 0 ? {} : _a, _c = _b.snapToCursor, snapToCursor = _c === void 0 ? false : _c, cursorProgress = _b.cursorProgress;
      var onSessionStart = function(event) {
        var _a2;
        _this.stopMotion();
        var initialPoint = getViewportPointFromEvent(event).point;
        (_a2 = _this.cancelLayout) === null || _a2 === void 0 ? void 0 : _a2.call(_this);
        _this.cancelLayout = batchLayout(function(read, write) {
          var ancestors = collectProjectingAncestors(_this.visualElement);
          var children = collectProjectingChildren(_this.visualElement);
          var tree = __spreadArray(__spreadArray([], __read(ancestors)), __read(children));
          var hasManuallySetCursorOrigin = false;
          _this.isLayoutDrag() && _this.visualElement.lockProjectionTarget();
          write(function() {
            tree.forEach(function(element) {
              return element.resetTransform();
            });
          });
          read(function() {
            updateLayoutMeasurement(_this.visualElement);
            children.forEach(updateLayoutMeasurement);
          });
          write(function() {
            tree.forEach(function(element) {
              return element.restoreTransform();
            });
            if (snapToCursor) {
              hasManuallySetCursorOrigin = _this.snapToCursor(initialPoint);
            }
          });
          read(function() {
            var isRelativeDrag = Boolean(_this.getAxisMotionValue("x") && !_this.isExternalDrag());
            if (!isRelativeDrag) {
              _this.visualElement.rebaseProjectionTarget(true, _this.visualElement.measureViewportBox(false));
            }
            _this.visualElement.scheduleUpdateLayoutProjection();
            var projection = _this.visualElement.projection;
            eachAxis(function(axis) {
              if (!hasManuallySetCursorOrigin) {
                var _a3 = projection.target[axis], min = _a3.min, max = _a3.max;
                _this.cursorProgress[axis] = cursorProgress ? cursorProgress[axis] : progress(min, max, initialPoint[axis]);
              }
              var axisValue = _this.getAxisMotionValue(axis);
              if (axisValue) {
                _this.originPoint[axis] = axisValue.get();
              }
            });
          });
          write(function() {
            flushSync.update();
            flushSync.preRender();
            flushSync.render();
            flushSync.postRender();
          });
          read(function() {
            return _this.resolveDragConstraints();
          });
        });
      };
      var onStart = function(event, info) {
        var _a2, _b2, _c2;
        var _d = _this.props, drag2 = _d.drag, dragPropagation = _d.dragPropagation;
        if (drag2 && !dragPropagation) {
          if (_this.openGlobalLock)
            _this.openGlobalLock();
          _this.openGlobalLock = getGlobalLock(drag2);
          if (!_this.openGlobalLock)
            return;
        }
        flushLayout();
        _this.isDragging = true;
        _this.currentDirection = null;
        (_b2 = (_a2 = _this.props).onDragStart) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, event, info);
        (_c2 = _this.visualElement.animationState) === null || _c2 === void 0 ? void 0 : _c2.setActive(AnimationType.Drag, true);
      };
      var onMove = function(event, info) {
        var _a2, _b2, _c2, _d;
        var _e = _this.props, dragPropagation = _e.dragPropagation, dragDirectionLock = _e.dragDirectionLock;
        if (!dragPropagation && !_this.openGlobalLock)
          return;
        var offset = info.offset;
        if (dragDirectionLock && _this.currentDirection === null) {
          _this.currentDirection = getCurrentDirection(offset);
          if (_this.currentDirection !== null) {
            (_b2 = (_a2 = _this.props).onDirectionLock) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, _this.currentDirection);
          }
          return;
        }
        _this.updateAxis("x", info.point, offset);
        _this.updateAxis("y", info.point, offset);
        (_d = (_c2 = _this.props).onDrag) === null || _d === void 0 ? void 0 : _d.call(_c2, event, info);
        lastPointerEvent = event;
      };
      var onSessionEnd = function(event, info) {
        return _this.stop(event, info);
      };
      var transformPagePoint = this.props.transformPagePoint;
      this.panSession = new PanSession(originEvent, {
        onSessionStart,
        onStart,
        onMove,
        onSessionEnd
      }, { transformPagePoint });
    };
    VisualElementDragControls2.prototype.resolveDragConstraints = function() {
      var _this = this;
      var _a = this.props, dragConstraints = _a.dragConstraints, dragElastic = _a.dragElastic;
      var layout = this.visualElement.getLayoutState().layoutCorrected;
      if (dragConstraints) {
        this.constraints = isRefObject(dragConstraints) ? this.resolveRefConstraints(layout, dragConstraints) : calcRelativeConstraints(layout, dragConstraints);
      } else {
        this.constraints = false;
      }
      this.elastic = resolveDragElastic(dragElastic);
      if (this.constraints && !this.hasMutatedConstraints) {
        eachAxis(function(axis) {
          if (_this.getAxisMotionValue(axis)) {
            _this.constraints[axis] = rebaseAxisConstraints(layout[axis], _this.constraints[axis]);
          }
        });
      }
    };
    VisualElementDragControls2.prototype.resolveRefConstraints = function(layoutBox, constraints) {
      var _a = this.props, onMeasureDragConstraints = _a.onMeasureDragConstraints, transformPagePoint = _a.transformPagePoint;
      var constraintsElement = constraints.current;
      invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
      this.constraintsBox = getBoundingBox(constraintsElement, transformPagePoint);
      var measuredConstraints = calcViewportConstraints(layoutBox, this.constraintsBox);
      if (onMeasureDragConstraints) {
        var userConstraints = onMeasureDragConstraints(convertAxisBoxToBoundingBox(measuredConstraints));
        this.hasMutatedConstraints = !!userConstraints;
        if (userConstraints) {
          measuredConstraints = convertBoundingBoxToAxisBox(userConstraints);
        }
      }
      return measuredConstraints;
    };
    VisualElementDragControls2.prototype.cancelDrag = function() {
      var _a, _b;
      this.visualElement.unlockProjectionTarget();
      (_a = this.cancelLayout) === null || _a === void 0 ? void 0 : _a.call(this);
      this.isDragging = false;
      this.panSession && this.panSession.end();
      this.panSession = null;
      if (!this.props.dragPropagation && this.openGlobalLock) {
        this.openGlobalLock();
        this.openGlobalLock = null;
      }
      (_b = this.visualElement.animationState) === null || _b === void 0 ? void 0 : _b.setActive(AnimationType.Drag, false);
    };
    VisualElementDragControls2.prototype.stop = function(event, info) {
      var _a, _b, _c;
      (_a = this.panSession) === null || _a === void 0 ? void 0 : _a.end();
      this.panSession = null;
      var isDragging = this.isDragging;
      this.cancelDrag();
      if (!isDragging)
        return;
      var velocity = info.velocity;
      this.animateDragEnd(velocity);
      (_c = (_b = this.props).onDragEnd) === null || _c === void 0 ? void 0 : _c.call(_b, event, info);
    };
    VisualElementDragControls2.prototype.snapToCursor = function(point) {
      var _this = this;
      return eachAxis(function(axis) {
        var drag2 = _this.props.drag;
        if (!shouldDrag(axis, drag2, _this.currentDirection))
          return;
        var axisValue = _this.getAxisMotionValue(axis);
        if (axisValue) {
          var box = _this.visualElement.getLayoutState().layout;
          var length_1 = box[axis].max - box[axis].min;
          var center = box[axis].min + length_1 / 2;
          var offset = point[axis] - center;
          _this.originPoint[axis] = point[axis];
          axisValue.set(offset);
        } else {
          _this.cursorProgress[axis] = 0.5;
          return true;
        }
      }).includes(true);
    };
    VisualElementDragControls2.prototype.updateAxis = function(axis, point, offset) {
      var drag2 = this.props.drag;
      if (!shouldDrag(axis, drag2, this.currentDirection))
        return;
      return this.getAxisMotionValue(axis) ? this.updateAxisMotionValue(axis, offset) : this.updateVisualElementAxis(axis, point);
    };
    VisualElementDragControls2.prototype.updateAxisMotionValue = function(axis, offset) {
      var axisValue = this.getAxisMotionValue(axis);
      if (!offset || !axisValue)
        return;
      var nextValue = this.originPoint[axis] + offset[axis];
      var update2 = this.constraints ? applyConstraints(nextValue, this.constraints[axis], this.elastic[axis]) : nextValue;
      axisValue.set(update2);
    };
    VisualElementDragControls2.prototype.updateVisualElementAxis = function(axis, point) {
      var _a;
      var axisLayout = this.visualElement.getLayoutState().layout[axis];
      var axisLength = axisLayout.max - axisLayout.min;
      var axisProgress = this.cursorProgress[axis];
      var min = calcConstrainedMinPoint(point[axis], axisLength, axisProgress, (_a = this.constraints) === null || _a === void 0 ? void 0 : _a[axis], this.elastic[axis]);
      this.visualElement.setProjectionTargetAxis(axis, min, min + axisLength);
    };
    VisualElementDragControls2.prototype.setProps = function(_a) {
      var _b = _a.drag, drag2 = _b === void 0 ? false : _b, _c = _a.dragDirectionLock, dragDirectionLock = _c === void 0 ? false : _c, _d = _a.dragPropagation, dragPropagation = _d === void 0 ? false : _d, _e = _a.dragConstraints, dragConstraints = _e === void 0 ? false : _e, _f = _a.dragElastic, dragElastic = _f === void 0 ? defaultElastic : _f, _g = _a.dragMomentum, dragMomentum = _g === void 0 ? true : _g, remainingProps = __rest$1(_a, ["drag", "dragDirectionLock", "dragPropagation", "dragConstraints", "dragElastic", "dragMomentum"]);
      this.props = Object.assign({
        drag: drag2,
        dragDirectionLock,
        dragPropagation,
        dragConstraints,
        dragElastic,
        dragMomentum
      }, remainingProps);
    };
    VisualElementDragControls2.prototype.getAxisMotionValue = function(axis) {
      var _a = this.props, layout = _a.layout, layoutId = _a.layoutId;
      var dragKey = "_drag" + axis.toUpperCase();
      if (this.props[dragKey]) {
        return this.props[dragKey];
      } else if (!layout && layoutId === void 0) {
        return this.visualElement.getValue(axis, 0);
      }
    };
    VisualElementDragControls2.prototype.isLayoutDrag = function() {
      return !this.getAxisMotionValue("x");
    };
    VisualElementDragControls2.prototype.isExternalDrag = function() {
      var _a = this.props, _dragX = _a._dragX, _dragY = _a._dragY;
      return _dragX || _dragY;
    };
    VisualElementDragControls2.prototype.animateDragEnd = function(velocity) {
      var _this = this;
      var _a = this.props, drag2 = _a.drag, dragMomentum = _a.dragMomentum, dragElastic = _a.dragElastic, dragTransition = _a.dragTransition;
      var isRelative = convertToRelativeProjection(this.visualElement, this.isLayoutDrag() && !this.isExternalDrag());
      var constraints = this.constraints || {};
      if (isRelative && Object.keys(constraints).length && this.isLayoutDrag()) {
        var projectionParent = this.visualElement.getProjectionParent();
        if (projectionParent) {
          var relativeConstraints_1 = calcRelativeOffset(projectionParent.projection.targetFinal, constraints);
          eachAxis(function(axis) {
            var _a2 = relativeConstraints_1[axis], min = _a2.min, max = _a2.max;
            constraints[axis] = {
              min: isNaN(min) ? void 0 : min,
              max: isNaN(max) ? void 0 : max
            };
          });
        }
      }
      var momentumAnimations = eachAxis(function(axis) {
        var _a2;
        if (!shouldDrag(axis, drag2, _this.currentDirection)) {
          return;
        }
        var transition = (_a2 = constraints === null || constraints === void 0 ? void 0 : constraints[axis]) !== null && _a2 !== void 0 ? _a2 : {};
        var bounceStiffness = dragElastic ? 200 : 1e6;
        var bounceDamping = dragElastic ? 40 : 1e7;
        var inertia2 = Object.assign(Object.assign({
          type: "inertia",
          velocity: dragMomentum ? velocity[axis] : 0,
          bounceStiffness,
          bounceDamping,
          timeConstant: 750,
          restDelta: 1,
          restSpeed: 10
        }, dragTransition), transition);
        return _this.getAxisMotionValue(axis) ? _this.startAxisValueAnimation(axis, inertia2) : _this.visualElement.startLayoutAnimation(axis, inertia2, isRelative);
      });
      return Promise.all(momentumAnimations).then(function() {
        var _a2, _b;
        (_b = (_a2 = _this.props).onDragTransitionEnd) === null || _b === void 0 ? void 0 : _b.call(_a2);
      });
    };
    VisualElementDragControls2.prototype.stopMotion = function() {
      var _this = this;
      eachAxis(function(axis) {
        var axisValue = _this.getAxisMotionValue(axis);
        axisValue ? axisValue.stop() : _this.visualElement.stopLayoutAnimation();
      });
    };
    VisualElementDragControls2.prototype.startAxisValueAnimation = function(axis, transition) {
      var axisValue = this.getAxisMotionValue(axis);
      if (!axisValue)
        return;
      var currentValue = axisValue.get();
      axisValue.set(currentValue);
      axisValue.set(currentValue);
      return startAnimation(axis, axisValue, 0, transition);
    };
    VisualElementDragControls2.prototype.scalePoint = function() {
      var _this = this;
      var _a = this.props, drag2 = _a.drag, dragConstraints = _a.dragConstraints;
      if (!isRefObject(dragConstraints) || !this.constraintsBox)
        return;
      this.stopMotion();
      var boxProgress = { x: 0, y: 0 };
      eachAxis(function(axis) {
        boxProgress[axis] = calcOrigin$1(_this.visualElement.projection.target[axis], _this.constraintsBox[axis]);
      });
      this.updateConstraints(function() {
        eachAxis(function(axis) {
          if (!shouldDrag(axis, drag2, null))
            return;
          var _a2 = calcPositionFromProgress(_this.visualElement.projection.target[axis], _this.constraintsBox[axis], boxProgress[axis]), min = _a2.min, max = _a2.max;
          _this.visualElement.setProjectionTargetAxis(axis, min, max);
        });
      });
      setTimeout(flushLayout, 1);
    };
    VisualElementDragControls2.prototype.updateConstraints = function(onReady) {
      var _this = this;
      this.cancelLayout = batchLayout(function(read, write) {
        var ancestors = collectProjectingAncestors(_this.visualElement);
        write(function() {
          return ancestors.forEach(function(element) {
            return element.resetTransform();
          });
        });
        read(function() {
          return updateLayoutMeasurement(_this.visualElement);
        });
        write(function() {
          return ancestors.forEach(function(element) {
            return element.restoreTransform();
          });
        });
        read(function() {
          _this.resolveDragConstraints();
        });
        if (onReady)
          write(onReady);
      });
    };
    VisualElementDragControls2.prototype.mount = function(visualElement2) {
      var _this = this;
      var element = visualElement2.getInstance();
      var stopPointerListener = addPointerEvent(element, "pointerdown", function(event) {
        var _a = _this.props, drag2 = _a.drag, _b = _a.dragListener, dragListener = _b === void 0 ? true : _b;
        drag2 && dragListener && _this.start(event);
      });
      var stopResizeListener = addDomEvent(window, "resize", function() {
        _this.scalePoint();
      });
      var stopLayoutUpdateListener = visualElement2.onLayoutUpdate(function() {
        if (_this.isDragging) {
          _this.resolveDragConstraints();
        }
      });
      var prevDragCursor = visualElement2.prevDragCursor;
      if (prevDragCursor) {
        this.start(lastPointerEvent, { cursorProgress: prevDragCursor });
      }
      return function() {
        stopPointerListener === null || stopPointerListener === void 0 ? void 0 : stopPointerListener();
        stopResizeListener === null || stopResizeListener === void 0 ? void 0 : stopResizeListener();
        stopLayoutUpdateListener === null || stopLayoutUpdateListener === void 0 ? void 0 : stopLayoutUpdateListener();
        _this.cancelDrag();
      };
    };
    return VisualElementDragControls2;
  }()
);
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold) {
  if (lockThreshold === void 0) {
    lockThreshold = 10;
  }
  var direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}
const UseDrag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mcc, $$unsubscribe_mcc;
  let { visualElement: visualElement2, props, isCustom } = $$props;
  const mcc = getContext(MotionConfigContext) || MotionConfigContext(isCustom);
  $$unsubscribe_mcc = subscribe(mcc, (value) => $mcc = value);
  let dragControls = new VisualElementDragControls({ visualElement: visualElement2 });
  let cleanup;
  const dragEffect = () => {
    if (cleanup) {
      cleanup();
    }
    if (groupDragControls) {
      cleanup = groupDragControls.subscribe(dragControls);
    }
  };
  let { dragControls: groupDragControls } = props;
  let { transformPagePoint } = get_store_value(mcc);
  dragControls.setProps({ ...props, transformPagePoint });
  onDestroy(() => {
    if (cleanup) {
      cleanup();
    }
  });
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
  ({ dragControls: groupDragControls } = props);
  ({ transformPagePoint } = $mcc);
  {
    dragControls.setProps({ ...props, transformPagePoint });
  }
  {
    dragEffect();
  }
  $$unsubscribe_mcc();
  return `${slots.default ? slots.default({}) : ``}`;
});
const drag = {
  pan: UsePanGesture,
  drag: UseDrag
};
const Animate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { visualElement: visualElement2, layout = void 0, safeToRemove } = $$props;
  let stopAxisAnimation = { x: void 0, y: void 0 };
  let unsubLayoutReady;
  onDestroy(() => {
    unsubLayoutReady();
    eachAxis((axis) => stopAxisAnimation[axis]?.());
  });
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0) $$bindings.layout(layout);
  if ($$props.safeToRemove === void 0 && $$bindings.safeToRemove && safeToRemove !== void 0) $$bindings.safeToRemove(safeToRemove);
  return ``;
});
const AnimateLayoutContextProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $presence, $$unsubscribe_presence;
  let { visualElement: visualElement2, props, isCustom } = $$props;
  let { layout } = props;
  const presence = usePresence(isCustom);
  $$unsubscribe_presence = subscribe(presence, (value) => $presence = value);
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
  ({ layout } = props);
  $$unsubscribe_presence();
  return `${validate_component(Animate, "Animate").$$render(
    $$result,
    {
      visualElement: visualElement2,
      layout,
      safeToRemove: $presence[1]
    },
    {},
    {}
  )}`;
});
const Measure = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { visualElement: visualElement2, syncLayout, framerSyncLayout, update: update2 } = $$props;
  const scaleCorrectionContext = getContext(ScaleCorrectionContext);
  const scaleCorrectionParentContext = getContext(ScaleCorrectionParentContext);
  let updated = false;
  const updater = (nc = false) => {
    if (updated) {
      return null;
    }
    updated = true;
    get_store_value(scaleCorrectionContext).forEach((v) => {
      v.updater?.(true);
    });
    if (isSharedLayout(syncLayout)) {
      syncLayout.syncUpdate();
    } else {
      snapshotViewportBox(visualElement2, nc);
      syncLayout.add(visualElement2);
    }
    return null;
  };
  const afterU = (nc = false) => {
    updated = false;
    const scc = get_store_value(scaleCorrectionContext);
    scc.forEach((v, i) => {
      v.afterU?.(true);
    });
    if (!isSharedLayout(syncLayout)) {
      syncLayout.flush();
    }
  };
  scaleCorrectionParentContext.update((v) => v.concat([{ updater, afterU }]));
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
  if ($$props.syncLayout === void 0 && $$bindings.syncLayout && syncLayout !== void 0) $$bindings.syncLayout(syncLayout);
  if ($$props.framerSyncLayout === void 0 && $$bindings.framerSyncLayout && framerSyncLayout !== void 0) $$bindings.framerSyncLayout(framerSyncLayout);
  if ($$props.update === void 0 && $$bindings.update && update2 !== void 0) $$bindings.update(update2);
  update2 !== void 0 && updater(update2);
  return ``;
});
const MeasureContextProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let update2;
  let $syncLayout, $$unsubscribe_syncLayout;
  let $framerSyncLayout, $$unsubscribe_framerSyncLayout;
  let { visualElement: visualElement2, props, isCustom } = $$props;
  const syncLayout = getContext(SharedLayoutContext) || SharedLayoutContext(isCustom);
  $$unsubscribe_syncLayout = subscribe(syncLayout, (value) => $syncLayout = value);
  const framerSyncLayout = getContext(FramerTreeLayoutContext) || FramerTreeLayoutContext();
  $$unsubscribe_framerSyncLayout = subscribe(framerSyncLayout, (value) => $framerSyncLayout = value);
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
  ({ update: update2 } = props);
  $$unsubscribe_syncLayout();
  $$unsubscribe_framerSyncLayout();
  return `${validate_component(Measure, "Measure").$$render(
    $$result,
    {
      syncLayout: $syncLayout,
      framerSyncLayout: $framerSyncLayout,
      visualElement: visualElement2,
      update: update2
    },
    {},
    {}
  )}`;
});
var layoutAnimations = {
  measureLayout: MeasureContextProvider,
  layoutAnimation: AnimateLayoutContextProvider
};
const AnimationState = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { visualElement: visualElement2, props } = $$props;
  let { animate: animate2 } = props;
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  ({ animate: animate2 } = props);
  {
    {
      visualElement2.animationState = visualElement2.animationState || createAnimationState(visualElement2);
    }
  }
  {
    if (isAnimationControls(animate2)) {
      tick().then(() => animate2.subscribe(visualElement2));
    }
  }
  return ``;
});
const Exit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let custom;
  let $presence, $$unsubscribe_presence;
  let $presenceContext, $$unsubscribe_presenceContext;
  let { props, visualElement: visualElement2, isCustom } = $$props;
  const presenceContext = getContext(PresenceContext) || PresenceContext(isCustom);
  $$unsubscribe_presenceContext = subscribe(presenceContext, (value) => $presenceContext = value);
  const presence = usePresence(isCustom);
  $$unsubscribe_presence = subscribe(presence, (value) => $presence = value);
  const effect = (pres) => {
    const [isPresent2, onExitComplete] = pres;
    const animation = visualElement2.animationState?.setActive(AnimationType.Exit, !isPresent2, {
      custom: $presenceContext?.custom ?? custom
    });
    !isPresent2 && animation?.then(onExitComplete);
    return "";
  };
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
  ({ custom } = props);
  {
    effect($presence);
  }
  $$unsubscribe_presence();
  $$unsubscribe_presenceContext();
  return `${slots.default ? slots.default({}) : ``}`;
});
const animations = {
  animation: AnimationState,
  exit: Exit
};
const featureBundle = {
  ...animations,
  ...gestureAnimations,
  ...drag,
  ...layoutAnimations
};
var motion = (
  //createMotionProxy(allMotionFeatures);
  /* @__PURE__ */ createMotionClass(featureBundle)
);
const useAnimation = () => {
  const controls = animationControls(() => {
    const cleanup = {};
    tick().then((v) => cleanup.clean = controls.mount());
    return () => {
      cleanup.clean?.();
    };
  });
  return controls;
};
const BoxReveal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width = "fit-content" } = $$props;
  let { boxColor = "#5046e6" } = $$props;
  let { duration = 0.5 } = $$props;
  let mainControls = useAnimation();
  let sideControls = useAnimation();
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.boxColor === void 0 && $$bindings.boxColor && boxColor !== void 0) $$bindings.boxColor(boxColor);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
  return `<div class="relative overflow-hidden" style="${"width:" + escape(width, true)}">${validate_component(motion, "Motion").$$render(
    $$result,
    {
      variants: {
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 }
      },
      initial: "hidden",
      animate: mainControls,
      transition: {
        duration: duration ? duration : 0.5,
        delay: 0.25
      }
    },
    {},
    {
      default: ({ motion: motion2 }) => {
        return `<div>${slots.default ? slots.default({}) : `Default`}</div>`;
      }
    }
  )} ${validate_component(motion, "Motion").$$render(
    $$result,
    {
      variants: {
        hidden: { left: 0 },
        visible: { left: "100%" }
      },
      initial: "hidden",
      animate: sideControls,
      transition: {
        duration: duration ? duration : 0.5,
        ease: "easeIn"
      }
    },
    {},
    {
      default: ({ motion: motion2 }) => {
        return `<div style="${"background:" + escape(boxColor, true)}" class="absolute top-[4px] bottom-[4px] left-0 right-0 z-40"></div>`;
      }
    }
  )}</div>`;
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const BlurIn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { word = "Blur In" } = $$props;
  let { variant = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 }
  } } = $$props;
  let { duration = 1 } = $$props;
  let { class: className = "" } = $$props;
  let defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 }
  };
  let combinedVariants = variant || defaultVariants;
  if ($$props.word === void 0 && $$bindings.word && word !== void 0) $$bindings.word(word);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(motion, "Motion").$$render(
    $$result,
    {
      initial: "hidden",
      animate: "visible",
      transition: { duration },
      variants: combinedVariants
    },
    {},
    {
      default: ({ motion: motion2 }) => {
        return `<h1${add_attribute("class", cn(className), 0)}>${escape(word)}</h1>`;
      }
    }
  )}`;
});
const WordsFadeIn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: className = "" } = $$props;
  let { words = "Fade In" } = $$props;
  let { delay = 0.19 } = $$props;
  let { variants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * delay }
    })
  } } = $$props;
  let wordsspilit = words.split(" ");
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.words === void 0 && $$bindings.words && words !== void 0) $$bindings.words(words);
  if ($$props.delay === void 0 && $$bindings.delay && delay !== void 0) $$bindings.delay(delay);
  if ($$props.variants === void 0 && $$bindings.variants && variants !== void 0) $$bindings.variants(variants);
  return `${validate_component(motion, "Motion").$$render(
    $$result,
    {
      variants,
      initial: "hidden",
      animate: "visible"
    },
    {},
    {
      default: ({ motion: motion$1 }) => {
        return `<h1${add_attribute("class", cn(className), 0)}>${each(wordsspilit, (word, i) => {
          return `${validate_component(motion, "Motion").$$render($$result, { variants, custom: i }, {}, {
            default: ({ motion: motion2 }) => {
              return `<span>${escape(word)}</span> `;
            }
          })}`;
        })}</h1>`;
      }
    }
  )}`;
});
const css$2 = {
  code: "ul.svelte-go9ksg{transition:all 0.3s ease}li.svelte-go9ksg:hover{text-shadow:0 0 10px #14b8a6,\r\n      0 0 20px #14b8a6}",
  map: '{"version":3,"file":"SlideTab.svelte","sources":["SlideTab.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { Motion } from \\"svelte-motion\\";\\nimport { t } from \\"$lib/i18n\\";\\nimport { onMount, afterUpdate } from \\"svelte\\";\\nexport let activeSection = \\"home\\";\\nlet left = 0;\\nlet width = 0;\\nlet opacity = 1;\\nconst navs = [\\n  { name: \\"home\\", link: \\"#home\\" },\\n  { name: \\"about\\", link: \\"#about\\" },\\n  { name: \\"experience\\", link: \\"#experience\\" },\\n  { name: \\"skills\\", link: \\"#skills\\" },\\n  { name: \\"contact\\", link: \\"#contact\\" }\\n];\\nconst updatePosition = (section) => {\\n  if (typeof document === \\"undefined\\") return;\\n  const activeNode = document.querySelector(\\n    `a[href=\\"#${section}\\"]`\\n  )?.parentElement;\\n  if (activeNode) {\\n    const rect = activeNode.getBoundingClientRect();\\n    left = activeNode.offsetLeft;\\n    width = rect.width;\\n    opacity = 1;\\n  } else {\\n    opacity = 0;\\n  }\\n};\\nconst positionMotion = (node) => {\\n  const setPosition = () => {\\n    const rect = node.getBoundingClientRect();\\n    left = node.offsetLeft;\\n    width = rect.width;\\n    opacity = 1;\\n  };\\n  const handleClick = () => {\\n    const clickedSection = node.querySelector(\\"a\\")?.getAttribute(\\"href\\")?.substring(1);\\n    if (clickedSection && navs.some((nav) => nav.name === clickedSection)) {\\n      activeSection = clickedSection;\\n      setPosition();\\n    }\\n  };\\n  node.addEventListener(\\"mouseenter\\", setPosition);\\n  node.addEventListener(\\"click\\", handleClick);\\n  return {\\n    destroy() {\\n      node.removeEventListener(\\"mouseenter\\", setPosition);\\n      node.removeEventListener(\\"click\\", handleClick);\\n    }\\n  };\\n};\\nconst updateTabPositionOnScroll = () => {\\n  if (typeof document === \\"undefined\\") return;\\n  const scrollY = window.scrollY;\\n  const windowHeight = window.innerHeight;\\n  const documentHeight = document.documentElement.scrollHeight;\\n  const sections = navs.map((nav) => ({\\n    id: nav.name,\\n    offset: document.getElementById(nav.name)?.offsetTop || 0,\\n    height: document.getElementById(nav.name)?.offsetHeight || 0\\n  }));\\n  let currentSection;\\n  if (scrollY + windowHeight >= documentHeight - 100) {\\n    currentSection = \\"contact\\";\\n  } else {\\n    currentSection = sections.find(\\n      (sec) => scrollY >= sec.offset - 100 && scrollY < sec.offset + sec.height - 100\\n    )?.id || \\"home\\";\\n  }\\n  if (currentSection !== activeSection) {\\n    activeSection = currentSection;\\n    updatePosition(currentSection);\\n  }\\n};\\nconst handleHashChange = () => {\\n  if (typeof document === \\"undefined\\") return;\\n  const hash = window.location.hash.substring(1);\\n  if (hash && navs.some((nav) => nav.name === hash)) {\\n    activeSection = hash;\\n    updatePosition(hash);\\n  }\\n};\\nonMount(() => {\\n  updatePosition(activeSection);\\n  window.addEventListener(\\"scroll\\", updateTabPositionOnScroll);\\n  window.addEventListener(\\"hashchange\\", handleHashChange);\\n  return () => {\\n    window.removeEventListener(\\"scroll\\", updateTabPositionOnScroll);\\n    window.removeEventListener(\\"hashchange\\", handleHashChange);\\n  };\\n});\\n$: if (typeof document !== \\"undefined\\") {\\n  updatePosition(activeSection);\\n}\\n<\/script>\\r\\n\\r\\n<div class=\\"hidden sm:flex w-full justify-center\\">\\r\\n  <ul\\r\\n    class=\\"relative mx-auto flex w-fit rounded-full bg-gradient-to-r from-blue-900 to-teal-700 dark:from-gray-900 dark:to-gray-800 border-2 border-teal-400/50 p-1 sm:p-2 shadow-lg backdrop-blur-md\\"\\r\\n  >\\r\\n    {#each navs as item}\\r\\n      <li\\r\\n        use:positionMotion\\r\\n        class=\\"relative z-10 block cursor-pointer px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base font-semibold text-white hover:text-teal-300 transition-all duration-300 {activeSection ===\\r\\n        item.name\\r\\n          ? \'text-teal-300\'\\r\\n          : \'\'}\\"\\r\\n      >\\r\\n        <a href={item.link}>{$t(`nav.${item.name}`)}</a>\\r\\n      </li>\\r\\n    {/each}\\r\\n    <Motion\\r\\n      animate={{ left, width, opacity }}\\r\\n      transition={{ type: \\"spring\\", stiffness: 400, damping: 25 }}\\r\\n      let:motion\\r\\n    >\\r\\n      <li\\r\\n        use:motion\\r\\n        class=\\"absolute z-0 h-6 sm:h-8 md:h-10 rounded-full bg-teal-400 shadow-[0_0_15px_#14B8A6,0_0_25px_#14B8A6] opacity-90\\"\\r\\n      ></li>\\r\\n    </Motion>\\r\\n  </ul>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  ul {\\r\\n    transition: all 0.3s ease;\\r\\n  }\\r\\n  li:hover {\\r\\n    text-shadow:\\r\\n      0 0 10px #14b8a6,\\r\\n      0 0 20px #14b8a6;\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA6HE,gBAAG,CACD,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IACvB,CACA,gBAAE,MAAO,CACP,WAAW,CACT,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,OAAO,CAAC;AACvB,MAAM,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,OACb"}'
};
const SlideTab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let { activeSection = "home" } = $$props;
  let left = 0;
  let width = 0;
  let opacity = 1;
  const navs = [
    { name: "home", link: "#home" },
    { name: "about", link: "#about" },
    { name: "experience", link: "#experience" },
    { name: "skills", link: "#skills" },
    { name: "contact", link: "#contact" }
  ];
  const updatePosition = (section) => {
    if (typeof document === "undefined") return;
    const activeNode = document.querySelector(`a[href="#${section}"]`)?.parentElement;
    if (activeNode) {
      const rect = activeNode.getBoundingClientRect();
      left = activeNode.offsetLeft;
      width = rect.width;
      opacity = 1;
    } else {
      opacity = 0;
    }
  };
  if ($$props.activeSection === void 0 && $$bindings.activeSection && activeSection !== void 0) $$bindings.activeSection(activeSection);
  $$result.css.add(css$2);
  {
    if (typeof document !== "undefined") {
      updatePosition(activeSection);
    }
  }
  $$unsubscribe_t();
  return `<div class="hidden sm:flex w-full justify-center"><ul class="relative mx-auto flex w-fit rounded-full bg-gradient-to-r from-blue-900 to-teal-700 dark:from-gray-900 dark:to-gray-800 border-2 border-teal-400/50 p-1 sm:p-2 shadow-lg backdrop-blur-md svelte-go9ksg">${each(navs, (item) => {
    return `<li class="${"relative z-10 block cursor-pointer px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base font-semibold text-white hover:text-teal-300 transition-all duration-300 " + escape(activeSection === item.name ? "text-teal-300" : "", true) + " svelte-go9ksg"}"><a${add_attribute("href", item.link, 0)}>${escape($t(`nav.${item.name}`))}</a> </li>`;
  })} ${validate_component(motion, "Motion").$$render(
    $$result,
    {
      animate: { left, width, opacity },
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    {},
    {
      default: ({ motion: motion2 }) => {
        return `<li class="absolute z-0 h-6 sm:h-8 md:h-10 rounded-full bg-teal-400 shadow-[0_0_15px_#14B8A6,0_0_25px_#14B8A6] opacity-90 svelte-go9ksg"></li>`;
      }
    }
  )}</ul> </div>`;
});
/**
 * @license lucide-svelte v0.476.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["name", "color", "size", "strokeWidth", "absoluteStrokeWidth", "iconNode"]);
  let { name = void 0 } = $$props;
  let { color: color2 = "currentColor" } = $$props;
  let { size = 24 } = $$props;
  let { strokeWidth = 2 } = $$props;
  let { absoluteStrokeWidth = false } = $$props;
  let { iconNode = [] } = $$props;
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.color === void 0 && $$bindings.color && color2 !== void 0) $$bindings.color(color2);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  if ($$props.absoluteStrokeWidth === void 0 && $$bindings.absoluteStrokeWidth && absoluteStrokeWidth !== void 0) $$bindings.absoluteStrokeWidth(absoluteStrokeWidth);
  if ($$props.iconNode === void 0 && $$bindings.iconNode && iconNode !== void 0) $$bindings.iconNode(iconNode);
  return `<svg${spread(
    [
      escape_object(defaultAttributes),
      escape_object($$restProps),
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      { stroke: escape_attribute_value(color2) },
      {
        "stroke-width": escape_attribute_value(absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth)
      },
      {
        class: escape_attribute_value(mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$props.class))
      }
    ],
    {}
  )}>${each(iconNode, ([tag, attrs]) => {
    return `${((tag$1) => {
      return tag$1 ? `<${tag}${spread([escape_object(attrs)], {})}>${is_void(tag$1) ? "" : ``}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
    })(tag)}`;
  })}${slots.default ? slots.default({}) : ``}</svg>`;
});
const Chevrons_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m7 6 5 5 5-5" }], ["path", { "d": "m7 13 5 5 5-5" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevrons-down" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "6",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "18",
        "y2": "18"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "menu" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const css$1 = {
  code: ".size-full.svelte-977r95{width:100%;height:100%}",
  map: '{"version":3,"file":"Particles.svelte","sources":["Particles.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nexport let className = \\"\\";\\nexport let quantity = 100;\\nexport let staticity = 50;\\nexport let ease = 50;\\nexport let size = 0.4;\\nexport let refresh = true;\\nexport let color = \\"#ffffff\\";\\nexport let vx = 0;\\nexport let vy = 0;\\nlet canvasRef;\\nlet canvasContainerRef;\\nlet context = null;\\nlet circles = [];\\nlet mouse = { x: 0, y: 0 };\\nlet canvasSize = { w: 0, h: 0 };\\nconst dpr = typeof window !== \\"undefined\\" ? window.devicePixelRatio : 1;\\nfunction hexToRgb(hex) {\\n  hex = hex.replace(\\"#\\", \\"\\");\\n  if (hex.length === 3) {\\n    hex = hex.split(\\"\\").map((char) => char + char).join(\\"\\");\\n  }\\n  const hexInt = parseInt(hex, 16);\\n  const red = hexInt >> 16 & 255;\\n  const green = hexInt >> 8 & 255;\\n  const blue = hexInt & 255;\\n  return [red, green, blue];\\n}\\nconst rgb = hexToRgb(color);\\nfunction circleParams() {\\n  const x = Math.floor(Math.random() * canvasSize.w);\\n  const y = Math.floor(Math.random() * canvasSize.h);\\n  const translateX = 0;\\n  const translateY = 0;\\n  const pSize = Math.floor(Math.random() * 2) + size;\\n  const alpha = 0;\\n  const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));\\n  const dx = (Math.random() - 0.5) * 0.1;\\n  const dy = (Math.random() - 0.5) * 0.1;\\n  const magnetism = 0.1 + Math.random() * 4;\\n  return {\\n    x,\\n    y,\\n    translateX,\\n    translateY,\\n    size: pSize,\\n    alpha,\\n    targetAlpha,\\n    dx,\\n    dy,\\n    magnetism\\n  };\\n}\\nfunction resizeCanvas() {\\n  if (canvasContainerRef && canvasRef && context) {\\n    circles.length = 0;\\n    canvasSize.w = canvasContainerRef.offsetWidth;\\n    canvasSize.h = canvasContainerRef.offsetHeight;\\n    canvasRef.width = canvasSize.w * dpr;\\n    canvasRef.height = canvasSize.h * dpr;\\n    canvasRef.style.width = `${canvasSize.w}px`;\\n    canvasRef.style.height = `${canvasSize.h}px`;\\n    context.scale(dpr, dpr);\\n  }\\n}\\nfunction clearContext() {\\n  if (context) {\\n    context.clearRect(0, 0, canvasSize.w, canvasSize.h);\\n  }\\n}\\nfunction drawCircle(circle, update = false) {\\n  if (context) {\\n    const { x, y, translateX, translateY, size: size2, alpha } = circle;\\n    context.translate(translateX, translateY);\\n    context.beginPath();\\n    context.arc(x, y, size2, 0, 2 * Math.PI);\\n    context.fillStyle = `rgba(${rgb.join(\\", \\")}, ${alpha})`;\\n    context.fill();\\n    context.setTransform(dpr, 0, 0, dpr, 0, 0);\\n    if (!update) {\\n      circles.push(circle);\\n    }\\n  }\\n}\\nfunction drawParticles() {\\n  clearContext();\\n  for (let i = 0; i < quantity; i++) {\\n    const circle = circleParams();\\n    drawCircle(circle);\\n  }\\n}\\nfunction remapValue(value, start1, end1, start2, end2) {\\n  let remapped = (value - start1) * (end2 - start2) / (end1 - start1) + start2;\\n  return remapped > 0 ? remapped : 0;\\n}\\nfunction animate() {\\n  clearContext();\\n  circles.forEach((circle, i) => {\\n    const edge = [\\n      circle.x + circle.translateX - circle.size,\\n      canvasSize.w - circle.x - circle.translateX - circle.size,\\n      circle.y + circle.translateY - circle.size,\\n      canvasSize.h - circle.y - circle.translateY - circle.size\\n    ];\\n    const closestEdge = edge.reduce((a, b) => Math.min(a, b));\\n    const remapClosestEdge = parseFloat(\\n      remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)\\n    );\\n    if (remapClosestEdge > 1) {\\n      circle.alpha += 0.02;\\n      if (circle.alpha > circle.targetAlpha) {\\n        circle.alpha = circle.targetAlpha;\\n      }\\n    } else {\\n      circle.alpha = circle.targetAlpha * remapClosestEdge;\\n    }\\n    circle.x += circle.dx + vx;\\n    circle.y += circle.dy + vy;\\n    circle.translateX += (mouse.x / (staticity / circle.magnetism) - circle.translateX) / ease;\\n    circle.translateY += (mouse.y / (staticity / circle.magnetism) - circle.translateY) / ease;\\n    drawCircle(circle, true);\\n    if (circle.x < -circle.size || circle.x > canvasSize.w + circle.size || circle.y < -circle.size || circle.y > canvasSize.h + circle.size) {\\n      circles.splice(i, 1);\\n      const newCircle = circleParams();\\n      drawCircle(newCircle);\\n    }\\n  });\\n  window.requestAnimationFrame(animate);\\n}\\nfunction onMouseMove(event) {\\n  if (canvasRef) {\\n    let rect = canvasRef.getBoundingClientRect();\\n    let { w, h } = canvasSize;\\n    let x = event.clientX - rect.left - w / 2;\\n    let y = event.clientY - rect.top - h / 2;\\n    let inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;\\n    if (inside) {\\n      mouse.x = x;\\n      mouse.y = y;\\n    }\\n  }\\n}\\nonMount(() => {\\n  if (canvasRef) {\\n    context = canvasRef.getContext(\\"2d\\");\\n    resizeCanvas();\\n    animate();\\n    window.addEventListener(\\"resize\\", resizeCanvas);\\n    window.addEventListener(\\"mousemove\\", onMouseMove);\\n  }\\n  return () => {\\n    window.removeEventListener(\\"resize\\", resizeCanvas);\\n    window.removeEventListener(\\"mousemove\\", onMouseMove);\\n  };\\n});\\n$: {\\n  if (canvasRef) {\\n    drawParticles();\\n  }\\n}\\n<\/script>\\r\\n\\r\\n<div class={className} bind:this={canvasContainerRef} aria-hidden=\\"true\\">\\r\\n  <canvas bind:this={canvasRef} class=\\"size-full\\"></canvas>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .size-full {\\r\\n    width: 100%;\\r\\n    height: 100%;\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAuKE,wBAAW,CACT,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV"}'
};
function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((char) => char + char).join("");
  }
  const hexInt = parseInt(hex, 16);
  const red = hexInt >> 16 & 255;
  const green = hexInt >> 8 & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}
const Particles = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  let { quantity = 100 } = $$props;
  let { staticity = 50 } = $$props;
  let { ease = 50 } = $$props;
  let { size = 0.4 } = $$props;
  let { refresh = true } = $$props;
  let { color: color2 = "#ffffff" } = $$props;
  let { vx = 0 } = $$props;
  let { vy = 0 } = $$props;
  let canvasRef;
  let canvasContainerRef;
  hexToRgb(color2);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.quantity === void 0 && $$bindings.quantity && quantity !== void 0) $$bindings.quantity(quantity);
  if ($$props.staticity === void 0 && $$bindings.staticity && staticity !== void 0) $$bindings.staticity(staticity);
  if ($$props.ease === void 0 && $$bindings.ease && ease !== void 0) $$bindings.ease(ease);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.refresh === void 0 && $$bindings.refresh && refresh !== void 0) $$bindings.refresh(refresh);
  if ($$props.color === void 0 && $$bindings.color && color2 !== void 0) $$bindings.color(color2);
  if ($$props.vx === void 0 && $$bindings.vx && vx !== void 0) $$bindings.vx(vx);
  if ($$props.vy === void 0 && $$bindings.vy && vy !== void 0) $$bindings.vy(vy);
  $$result.css.add(css$1);
  return `<div class="${escape(null_to_empty(className), true) + " svelte-977r95"}" aria-hidden="true"${add_attribute("this", canvasContainerRef, 0)}><canvas class="size-full svelte-977r95"${add_attribute("this", canvasRef, 0)}></canvas> </div>`;
});
const css = {
  code: 'body{font-family:"Poppins", sans-serif;scroll-behavior:smooth}.bg-pattern{background-size:150px 150px;background-image:radial-gradient(\r\n      circle,\r\n      rgba(255, 255, 255, 0.1) 1px,\r\n      transparent 1px\r\n    )}@media(max-width: 640px){.bg-pattern{background-size:100px 100px}}',
  map: '{"version":3,"file":"Home.svelte","sources":["Home.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { fade, slide } from \\"svelte/transition\\";\\nimport { t, locale, locales } from \\"$lib/i18n\\";\\nimport Tailwindcss from \\"./svgs/tailwindcss.svelte\\";\\nimport SvelteIcon from \\"./svgs/svelte.svelte\\";\\nimport JavaScript from \\"./svgs/javascript.svelte\\";\\nimport Laravel from \\"./svgs/laravel.svelte\\";\\nimport Nodejs from \\"./svgs/nodejs.svelte\\";\\nimport Html from \\"./svgs/html.svelte\\";\\nimport Css from \\"./svgs/css.svelte\\";\\nimport Email from \\"./svgs/email.svelte\\";\\nimport Linkedin from \\"./svgs/linkedin.svelte\\";\\nimport Github from \\"./svgs/github.svelte\\";\\nimport Location from \\"./svgs/location.svelte\\";\\nimport Linux from \\"./svgs/linux.svelte\\";\\nimport Mysql from \\"./svgs/mysql.svelte\\";\\nimport Mariadb from \\"./svgs/mariadb.svelte\\";\\nimport Lua from \\"./svgs/lua.svelte\\";\\nimport LanguageSelector from \\"./LanguageSelector.svelte\\";\\nimport { onMount } from \\"svelte\\";\\nimport BoxReveal from \\"./BoxReveal.svelte\\";\\nimport BlurIn from \\"./BlurIn.svelte\\";\\nimport WordsFadeIn from \\"./WordsFadeIn.svelte\\";\\nimport SlideTab from \\"./SlideTab.svelte\\";\\nimport { Menu, MoveUp, ChevronsDown } from \\"lucide-svelte\\";\\nimport Particles from \\"./Particles.svelte\\";\\nlet scrollY = 0;\\nlet activeSection = \\"home\\";\\nlet showBackToTop = false;\\nlet menuOpen = false;\\nconst toggleMenu = () => {\\n  menuOpen = !menuOpen;\\n};\\nconst handleScroll = () => {\\n  scrollY = window.scrollY;\\n  showBackToTop = scrollY > 300;\\n  const sections = [\\"home\\", \\"about\\", \\"experience\\", \\"skills\\", \\"contact\\"];\\n  const sectionOffsets = sections.map((id) => ({\\n    id,\\n    offset: document.getElementById(id)?.offsetTop || 0\\n  }));\\n  const current = sectionOffsets.find(\\n    (sec) => scrollY >= sec.offset - 100 && scrollY < sec.offset + 600\\n  );\\n  activeSection = current?.id || \\"home\\";\\n};\\nconst scrollToTop = () => {\\n  window.scrollTo({ top: 0, behavior: \\"smooth\\" });\\n};\\nonMount(() => {\\n  window.addEventListener(\\"scroll\\", handleScroll);\\n  return () => window.removeEventListener(\\"scroll\\", handleScroll);\\n});\\nconst experiencesBase = [\\n  {\\n    title: \\"E-shop maintainer\\",\\n    company: \\"Daffys E-Shop\\",\\n    location: \\"Thessaloniki, Greece\\",\\n    date: \\"August 2021 - January 2022\\",\\n    descriptionKey: \\"experience.eshop_maintainer.description\\"\\n  },\\n  {\\n    title: \\"Greek Military Duty\\",\\n    company: \\"Greek Government\\",\\n    location: \\"Limnos, Greece\\",\\n    date: \\"May 2022 - January 2023\\",\\n    descriptionKey: \\"experience.military_duty.description\\"\\n  },\\n  {\\n    title: \\"Web Developer\\",\\n    company: \\"Freelancing\\",\\n    location: \\"Thessaloniki, Greece\\",\\n    date: \\"March 2023 - October 2023\\",\\n    descriptionKey: \\"experience.web_developer.description\\"\\n  },\\n  {\\n    title: \\"Full Stack Web Developer\\",\\n    company: \\"Infomax Insurance Brokers\\",\\n    location: \\"Thessaloniki, Greece\\",\\n    date: \\"October 2023 - Today\\",\\n    descriptionKey: \\"experience.full_stack_developer.description\\"\\n  },\\n  {\\n    title: \\"Gaming Servers Operator\\",\\n    company: \\"Gaming Multiverse\\",\\n    location: \\"\\",\\n    date: \\"February 2017 - Today\\",\\n    descriptionKey: \\"experience.gaming_servers_operator.description\\"\\n  }\\n];\\nconst skillsBase = [\\n  { icon: Lua, title: \\"Lua\\", descriptionKey: \\"skill.lua.description\\" },\\n  {\\n    icon: SvelteIcon,\\n    title: \\"SvelteKit\\",\\n    descriptionKey: \\"skill.sveltekit.description\\"\\n  },\\n  {\\n    icon: Tailwindcss,\\n    title: \\"TailwindCSS\\",\\n    descriptionKey: \\"skill.tailwindcss.description\\"\\n  },\\n  {\\n    icon: JavaScript,\\n    title: \\"JavaScript\\",\\n    descriptionKey: \\"skill.javascript.description\\"\\n  },\\n  {\\n    icon: Nodejs,\\n    title: \\"Node.js\\",\\n    descriptionKey: \\"skill.nodejs.description\\"\\n  },\\n  {\\n    icon: { component: Html, secondaryComponent: Css },\\n    title: \\"HTML & CSS\\",\\n    descriptionKey: \\"skill.html_css.description\\"\\n  },\\n  {\\n    icon: Linux,\\n    title: \\"Unix Systems\\",\\n    descriptionKey: \\"skill.unix_systems.description\\"\\n  },\\n  {\\n    icon: { component: Mariadb, secondaryComponent: Mysql },\\n    title: \\"MariaDB & MySQL\\",\\n    descriptionKey: \\"skill.mariadb_mysql.description\\"\\n  },\\n  {\\n    icon: Laravel,\\n    title: \\"PHP Laravel\\",\\n    descriptionKey: \\"skill.php_laravel.description\\"\\n  },\\n  {\\n    icon: Email,\\n    title: \\"Email System\\",\\n    descriptionKey: \\"skill.email_system.description\\"\\n  }\\n];\\nconst contactInfo = [\\n  {\\n    icon: Email,\\n    title: \\"Email\\",\\n    detail: \\"contact@pantelisxanthos.gr\\",\\n    link: null\\n  },\\n  {\\n    icon: Linkedin,\\n    title: \\"LinkedIn\\",\\n    detail: \\"linkedin.com/in/PantelisXanthos\\",\\n    link: \\"https://www.linkedin.com/in/pantelis-xanthos-46a21150/\\"\\n  },\\n  {\\n    icon: Github,\\n    title: \\"GitHub\\",\\n    detail: \\"github.com/hardbaited\\",\\n    link: \\"https://github.com/hardbaited\\"\\n  },\\n  { icon: Location, title: \\"Location\\", detail: \\"Greece\\", link: null }\\n];\\n$: experiences = experiencesBase.map((exp) => ({\\n  ...exp,\\n  description: $t(exp.descriptionKey)\\n}));\\n$: skills = skillsBase.map((skill) => ({\\n  ...skill,\\n  description: $t(skill.descriptionKey)\\n}));\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n  <link\\r\\n    href=\\"https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap\\"\\r\\n    rel=\\"stylesheet\\"\\r\\n  />\\r\\n</svelte:head>\\r\\n\\r\\n<div\\r\\n  class=\\"font-poppins min-h-screen bg-gradient-to-br from-blue-900 via-teal-700 to-blue-600 text-white transition-colors duration-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700\\"\\r\\n>\\r\\n  <!-- Navigation -->\\r\\n  <nav\\r\\n    class=\\"fixed top-0 w-full bg-blue-800 dark:bg-gray-800/80 shadow-lg z-20 backdrop-blur-md\\"\\r\\n  >\\r\\n    <div\\r\\n      class=\\"max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-center items-center\\"\\r\\n    >\\r\\n      <button\\r\\n        class=\\"sm:hidden text-teal-300 focus:outline-none\\"\\r\\n        on:click={toggleMenu}\\r\\n      >\\r\\n        {#if menuOpen}✕{:else}<Menu />{/if}\\r\\n      </button>\\r\\n      <SlideTab />\\r\\n      <LanguageSelector />\\r\\n      {#if menuOpen}\\r\\n        <div\\r\\n          class=\\"absolute top-full left-0 w-full bg-blue-800 dark:bg-gray-800/90 flex flex-col items-center space-y-4 py-4 sm:hidden\\"\\r\\n          in:slide\\r\\n        >\\r\\n          {#each [\\"home\\", \\"about\\", \\"experience\\", \\"skills\\", \\"contact\\"] as section}\\r\\n            <a\\r\\n              href={`#${section}`}\\r\\n              class=\\"text-teal-100 hover:text-teal-300 transition-all duration-300 {activeSection ===\\r\\n              section\\r\\n                ? \'font-bold text-teal-300\'\\r\\n                : \'\'}\\"\\r\\n              on:click={toggleMenu}\\r\\n            >\\r\\n              {$t(`nav.${section}`)}\\r\\n            </a>\\r\\n          {/each}\\r\\n        </div>\\r\\n      {/if}\\r\\n    </div>\\r\\n  </nav>\\r\\n\\r\\n  <!-- Hero Section -->\\r\\n  <section\\r\\n    id=\\"home\\"\\r\\n    class=\\"min-h-screen relative overflow-hidden flex flex-col justify-center items-center py-16 sm:py-24\\"\\r\\n  >\\r\\n    <Particles className=\\"absolute inset-0\\" refresh={true} />\\r\\n    <div class=\\"text-center z-10 px-4 sm:px-6 flex flex-col items-center\\">\\r\\n      <BoxReveal boxColor={\\"#14B8A6\\"} duration={0.6}>\\r\\n        <h1\\r\\n          class=\\"text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-teal-300 drop-shadow-lg\\"\\r\\n        >\\r\\n          {$t(\\"homepage.hello\\")}\\r\\n        </h1>\\r\\n      </BoxReveal>\\r\\n      <BoxReveal boxColor={\\"#14B8A6\\"} duration={0.8}>\\r\\n        <span\\r\\n          class=\\"mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-white opacity-90\\"\\r\\n          >Full-Stack Web Developer</span\\r\\n        >\\r\\n      </BoxReveal>\\r\\n      <BoxReveal boxColor={\\"#14B8A6\\"} duration={1.2}>\\r\\n        <a\\r\\n          href=\\"#contact\\"\\r\\n          class=\\"mt-6 sm:mt-8 inline-block bg-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:bg-teal-600 transition-transform duration-300 text-sm sm:text-base\\"\\r\\n        >\\r\\n          {$t(\\"homepage.contactme\\")}\\r\\n        </a>\\r\\n      </BoxReveal>\\r\\n    </div>\\r\\n\\r\\n    <!-- ChevronDown with Scroll Down Text -->\\r\\n    <div\\r\\n      class=\\"absolute bottom-6 transform -translate-x-1/2 text-teal-300 z-10 flex flex-col items-center animate-bounce\\"\\r\\n    >\\r\\n      <span class=\\"text-sm sm:text-base mb-2\\">Scroll Down</span>\\r\\n      <ChevronsDown class=\\"w-8 h-8 sm:w-10 sm:h-10\\" />\\r\\n    </div>\\r\\n  </section>\\r\\n\\r\\n  <!-- About Section -->\\r\\n  <section\\r\\n    id=\\"about\\"\\r\\n    class=\\"py-16 sm:py-24 bg-opacity-90 bg-blue-800 dark:bg-gray-800 relative\\"\\r\\n  >\\r\\n    <div class=\\"max-w-6xl mx-auto px-4 sm:px-6 text-center\\">\\r\\n      <BlurIn\\r\\n        word={$t(\\"homepage.introduction\\")}\\r\\n        class=\\"text-3xl sm:text-4xl font-bold text-teal-300 drop-shadow-md\\"\\r\\n      />\\r\\n      <div\\r\\n        class=\\"mt-8 sm:mt-12 space-y-6 text-base sm:text-lg leading-relaxed text-white opacity-90\\"\\r\\n      >\\r\\n        <p in:slide>{$t(\\"homepage.introductionOne\\")}</p>\\r\\n        <p in:slide={{ delay: 200 }}>{$t(\\"homepage.introductionTwo\\")}</p>\\r\\n        <p in:slide={{ delay: 400 }}>{$t(\\"homepage.introductionThree\\")}</p>\\r\\n      </div>\\r\\n      <a\\r\\n        href=\\"/cv.pdf\\"\\r\\n        download\\r\\n        class=\\"mt-8 sm:mt-10 inline-block bg-white text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:bg-teal-100 hover:scale-105 transition-transform duration-300 text-sm sm:text-base\\"\\r\\n      >\\r\\n        {$t(\\"homepage.viewMyCV\\")}\\r\\n      </a>\\r\\n    </div>\\r\\n  </section>\\r\\n\\r\\n  <!-- Experience Section -->\\r\\n  <section\\r\\n    id=\\"experience\\"\\r\\n    class=\\"relative py-16 sm:py-24 bg-gradient-to-br from-teal-700 to-blue-900 dark:from-gray-800 dark:to-gray-900\\"\\r\\n  >\\r\\n    <Particles className=\\"absolute inset-0 z-0\\" refresh={true} />\\r\\n    <div class=\\"max-w-6xl mx-auto px-4 sm:px-6\\">\\r\\n      <WordsFadeIn\\r\\n        words={$t(\\"homepage.experience\\")}\\r\\n        class=\\"text-3xl sm:text-4xl font-bold text-center text-teal-300 drop-shadow-md\\"\\r\\n      />\\r\\n      <div class=\\"mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8\\">\\r\\n        {#each experiences as exp, i}\\r\\n          <div\\r\\n            class=\\"bg-blue-800 dark:bg-gray-700 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 z-10\\"\\r\\n            in:slide={{ delay: i * 150 }}\\r\\n          >\\r\\n            <h3 class=\\"text-xl sm:text-2xl font-semibold text-teal-300\\">\\r\\n              {exp.title}\\r\\n            </h3>\\r\\n            <p class=\\"text-white opacity-80 text-sm sm:text-base\\">\\r\\n              {exp.company}, {exp.location}\\r\\n            </p>\\r\\n            <p class=\\"text-teal-100 mt-2 text-sm sm:text-base\\">{exp.date}</p>\\r\\n            <p class=\\"mt-4 text-white opacity-90 text-sm sm:text-base\\">\\r\\n              {exp.description}\\r\\n            </p>\\r\\n          </div>\\r\\n        {/each}\\r\\n      </div>\\r\\n    </div>\\r\\n  </section>\\r\\n\\r\\n  <!-- Skills Section -->\\r\\n  <section id=\\"skills\\" class=\\"py-16 sm:py-24 bg-blue-800 dark:bg-gray-800\\">\\r\\n    <div class=\\"max-w-6xl mx-auto px-4 sm:px-6\\">\\r\\n      <BlurIn\\r\\n        word={$t(\\"homepage.skill\\")}\\r\\n        class=\\"text-3xl sm:text-4xl font-bold text-center text-teal-300 drop-shadow-md\\"\\r\\n      />\\r\\n      <div\\r\\n        class=\\"mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8\\"\\r\\n      >\\r\\n        {#each skills as skill}\\r\\n          <div\\r\\n            class=\\"bg-teal-900 dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center\\"\\r\\n            in:fade={{ delay: skills.indexOf(skill) * 100 }}\\r\\n          >\\r\\n            {#if skill.icon.secondaryComponent}\\r\\n              <div class=\\"flex space-x-2 sm:space-x-4\\">\\r\\n                <svelte:component\\r\\n                  this={skill.icon.component}\\r\\n                  class=\\"w-10 h-10 sm:w-12 sm:h-12 text-teal-300\\"\\r\\n                />\\r\\n                <svelte:component\\r\\n                  this={skill.icon.secondaryComponent}\\r\\n                  class=\\"w-10 h-10 sm:w-12 sm:h-12 text-teal-300\\"\\r\\n                />\\r\\n              </div>\\r\\n            {:else}\\r\\n              <svelte:component\\r\\n                this={skill.icon}\\r\\n                class=\\"w-10 h-10 sm:w-12 sm:h-12 text-teal-300\\"\\r\\n              />\\r\\n            {/if}\\r\\n            <h3 class=\\"mt-4 text-lg sm:text-xl font-semibold text-teal-300\\">\\r\\n              {skill.title}\\r\\n            </h3>\\r\\n            <p class=\\"mt-2 text-white opacity-90 text-sm sm:text-base\\">\\r\\n              {skill.description}\\r\\n            </p>\\r\\n          </div>\\r\\n        {/each}\\r\\n      </div>\\r\\n    </div>\\r\\n  </section>\\r\\n\\r\\n  <!-- Contact Section -->\\r\\n  <section\\r\\n    id=\\"contact\\"\\r\\n    class=\\"relative py-16 sm:py-24 bg-gradient-to-br from-blue-900 to-teal-700 dark:from-gray-900 dark:to-gray-800\\"\\r\\n  >\\r\\n    <Particles\\r\\n      className=\\"absolute inset-0 pointer-events-none z-0\\"\\r\\n      refresh={true}\\r\\n    />\\r\\n    <div class=\\"max-w-4xl mx-auto px-4 sm:px-6 text-center\\">\\r\\n      <div class=\\"text-3xl sm:text-4xl font-bold text-teal-300 drop-shadow-md\\">\\r\\n        {$t(\\"homepage.mycontactinfo\\")}\\r\\n      </div>\\r\\n      <div class=\\"mt-8 sm:mt-12 space-y-6 sm:space-y-8\\">\\r\\n        {#each contactInfo as info}\\r\\n          <div\\r\\n            class=\\"bg-blue-800 dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-4 sm:gap-6 z-10 relative\\"\\r\\n            in:fade={{ delay: contactInfo.indexOf(info) * 100 }}\\r\\n          >\\r\\n            <svelte:component\\r\\n              this={info.icon}\\r\\n              class=\\"w-10 h-10 sm:w-12 sm:h-12 text-teal-300\\"\\r\\n            />\\r\\n            <div class=\\"text-left\\">\\r\\n              <h3 class=\\"text-base sm:text-lg font-semibold text-teal-300\\">\\r\\n                {info.title}\\r\\n              </h3>\\r\\n              {#if info.link}\\r\\n                <a\\r\\n                  href={info.link}\\r\\n                  target=\\"_blank\\"\\r\\n                  class=\\"text-white hover:text-teal-300 transition text-sm sm:text-base\\"\\r\\n                >\\r\\n                  {info.detail}\\r\\n                </a>\\r\\n              {:else}\\r\\n                <p\\r\\n                  class=\\"text-white opacity-90 text-sm sm:text-base select-text\\"\\r\\n                >\\r\\n                  {info.detail}\\r\\n                </p>\\r\\n              {/if}\\r\\n            </div>\\r\\n          </div>\\r\\n        {/each}\\r\\n      </div>\\r\\n    </div>\\r\\n  </section>\\r\\n\\r\\n  <!-- Back to Top Button -->\\r\\n  {#if showBackToTop}\\r\\n    <button\\r\\n      on:click={scrollToTop}\\r\\n      class=\\"fixed bottom-6 right-4 sm:bottom-8 sm:right-8 bg-teal-500 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-teal-600 transition-all duration-300 text-sm sm:text-base\\"\\r\\n      in:fade\\r\\n    >\\r\\n      <MoveUp />\\r\\n    </button>\\r\\n  {/if}\\r\\n\\r\\n  <!-- Footer -->\\r\\n  <footer class=\\"py-6 sm:py-8 bg-blue-900 dark:bg-gray-900 text-center\\">\\r\\n    <p class=\\"text-teal-300 opacity-80 text-sm sm:text-base\\">\\r\\n      Make web developing great again.\\r\\n    </p>\\r\\n  </footer>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  :global(body) {\\r\\n    font-family: \\"Poppins\\", sans-serif;\\r\\n    scroll-behavior: smooth;\\r\\n  }\\r\\n  :global(.bg-pattern) {\\r\\n    background-size: 150px 150px;\\r\\n    background-image: radial-gradient(\\r\\n      circle,\\r\\n      rgba(255, 255, 255, 0.1) 1px,\\r\\n      transparent 1px\\r\\n    );\\r\\n  }\\r\\n  @media (max-width: 640px) {\\r\\n    :global(.bg-pattern) {\\r\\n      background-size: 100px 100px;\\r\\n    }\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA2aU,IAAM,CACZ,WAAW,CAAE,SAAS,CAAC,CAAC,UAAU,CAClC,eAAe,CAAE,MACnB,CACQ,WAAa,CACnB,eAAe,CAAE,KAAK,CAAC,KAAK,CAC5B,gBAAgB,CAAE;AACtB,MAAM,MAAM,CAAC;AACb,MAAM,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC;AACnC,MAAM,WAAW,CAAC,GAAG;AACrB,KACE,CACA,MAAO,YAAY,KAAK,CAAE,CAChB,WAAa,CACnB,eAAe,CAAE,KAAK,CAAC,KACzB,CACF"}'
};
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let experiences;
  let skills;
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  const experiencesBase = [
    {
      title: "E-shop maintainer",
      company: "Daffys E-Shop",
      location: "Thessaloniki, Greece",
      date: "August 2021 - January 2022",
      descriptionKey: "experience.eshop_maintainer.description"
    },
    {
      title: "Greek Military Duty",
      company: "Greek Government",
      location: "Limnos, Greece",
      date: "May 2022 - January 2023",
      descriptionKey: "experience.military_duty.description"
    },
    {
      title: "Web Developer",
      company: "Freelancing",
      location: "Thessaloniki, Greece",
      date: "March 2023 - October 2023",
      descriptionKey: "experience.web_developer.description"
    },
    {
      title: "Full Stack Web Developer",
      company: "Infomax Insurance Brokers",
      location: "Thessaloniki, Greece",
      date: "October 2023 - Today",
      descriptionKey: "experience.full_stack_developer.description"
    },
    {
      title: "Gaming Servers Operator",
      company: "Gaming Multiverse",
      location: "",
      date: "February 2017 - Today",
      descriptionKey: "experience.gaming_servers_operator.description"
    }
  ];
  const skillsBase = [
    {
      icon: Lua,
      title: "Lua",
      descriptionKey: "skill.lua.description"
    },
    {
      icon: Svelte,
      title: "SvelteKit",
      descriptionKey: "skill.sveltekit.description"
    },
    {
      icon: Tailwindcss,
      title: "TailwindCSS",
      descriptionKey: "skill.tailwindcss.description"
    },
    {
      icon: Javascript,
      title: "JavaScript",
      descriptionKey: "skill.javascript.description"
    },
    {
      icon: Nodejs,
      title: "Node.js",
      descriptionKey: "skill.nodejs.description"
    },
    {
      icon: { component: Html, secondaryComponent: Css },
      title: "HTML & CSS",
      descriptionKey: "skill.html_css.description"
    },
    {
      icon: Linux,
      title: "Unix Systems",
      descriptionKey: "skill.unix_systems.description"
    },
    {
      icon: {
        component: Mariadb,
        secondaryComponent: Mysql
      },
      title: "MariaDB & MySQL",
      descriptionKey: "skill.mariadb_mysql.description"
    },
    {
      icon: Laravel,
      title: "PHP Laravel",
      descriptionKey: "skill.php_laravel.description"
    },
    {
      icon: Email,
      title: "Email System",
      descriptionKey: "skill.email_system.description"
    }
  ];
  const contactInfo = [
    {
      icon: Email,
      title: "Email",
      detail: "contact@pantelisxanthos.gr",
      link: null
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      detail: "linkedin.com/in/PantelisXanthos",
      link: "https://www.linkedin.com/in/pantelis-xanthos-46a21150/"
    },
    {
      icon: Github,
      title: "GitHub",
      detail: "github.com/hardbaited",
      link: "https://github.com/hardbaited"
    },
    {
      icon: Location,
      title: "Location",
      detail: "Greece",
      link: null
    }
  ];
  $$result.css.add(css);
  experiences = experiencesBase.map((exp) => ({
    ...exp,
    description: $t(exp.descriptionKey)
  }));
  skills = skillsBase.map((skill) => ({
    ...skill,
    description: $t(skill.descriptionKey)
  }));
  $$unsubscribe_t();
  return `${$$result.head += `<!-- HEAD_svelte-16l8fto_START --><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap" rel="stylesheet"><!-- HEAD_svelte-16l8fto_END -->`, ""} <div class="font-poppins min-h-screen bg-gradient-to-br from-blue-900 via-teal-700 to-blue-600 text-white transition-colors duration-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"> <nav class="fixed top-0 w-full bg-blue-800 dark:bg-gray-800/80 shadow-lg z-20 backdrop-blur-md"><div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-center items-center"><button class="sm:hidden text-teal-300 focus:outline-none">${`${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}`}</button> ${validate_component(SlideTab, "SlideTab").$$render($$result, {}, {}, {})} ${validate_component(LanguageSelector, "LanguageSelector").$$render($$result, {}, {}, {})} ${``}</div></nav>  <section id="home" class="min-h-screen relative overflow-hidden flex flex-col justify-center items-center py-16 sm:py-24">${validate_component(Particles, "Particles").$$render(
    $$result,
    {
      className: "absolute inset-0",
      refresh: true
    },
    {},
    {}
  )} <div class="text-center z-10 px-4 sm:px-6 flex flex-col items-center">${validate_component(BoxReveal, "BoxReveal").$$render($$result, { boxColor: "#14B8A6", duration: 0.6 }, {}, {
    default: () => {
      return `<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-teal-300 drop-shadow-lg">${escape($t("homepage.hello"))}</h1>`;
    }
  })} ${validate_component(BoxReveal, "BoxReveal").$$render($$result, { boxColor: "#14B8A6", duration: 0.8 }, {}, {
    default: () => {
      return `<span class="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-white opacity-90" data-svelte-h="svelte-1gdc14h">Full-Stack Web Developer</span>`;
    }
  })} ${validate_component(BoxReveal, "BoxReveal").$$render($$result, { boxColor: "#14B8A6", duration: 1.2 }, {}, {
    default: () => {
      return `<a href="#contact" class="mt-6 sm:mt-8 inline-block bg-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:bg-teal-600 transition-transform duration-300 text-sm sm:text-base">${escape($t("homepage.contactme"))}</a>`;
    }
  })}</div>  <div class="absolute bottom-6 transform -translate-x-1/2 text-teal-300 z-10 flex flex-col items-center animate-bounce"><span class="text-sm sm:text-base mb-2" data-svelte-h="svelte-119wca9">Scroll Down</span> ${validate_component(Chevrons_down, "ChevronsDown").$$render($$result, { class: "w-8 h-8 sm:w-10 sm:h-10" }, {}, {})}</div></section>  <section id="about" class="py-16 sm:py-24 bg-opacity-90 bg-blue-800 dark:bg-gray-800 relative"><div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">${validate_component(BlurIn, "BlurIn").$$render(
    $$result,
    {
      word: $t("homepage.introduction"),
      class: "text-3xl sm:text-4xl font-bold text-teal-300 drop-shadow-md"
    },
    {},
    {}
  )} <div class="mt-8 sm:mt-12 space-y-6 text-base sm:text-lg leading-relaxed text-white opacity-90"><p>${escape($t("homepage.introductionOne"))}</p> <p>${escape($t("homepage.introductionTwo"))}</p> <p>${escape($t("homepage.introductionThree"))}</p></div> <a href="/cv.pdf" download class="mt-8 sm:mt-10 inline-block bg-white text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:bg-teal-100 hover:scale-105 transition-transform duration-300 text-sm sm:text-base">${escape($t("homepage.viewMyCV"))}</a></div></section>  <section id="experience" class="relative py-16 sm:py-24 bg-gradient-to-br from-teal-700 to-blue-900 dark:from-gray-800 dark:to-gray-900">${validate_component(Particles, "Particles").$$render(
    $$result,
    {
      className: "absolute inset-0 z-0",
      refresh: true
    },
    {},
    {}
  )} <div class="max-w-6xl mx-auto px-4 sm:px-6">${validate_component(WordsFadeIn, "WordsFadeIn").$$render(
    $$result,
    {
      words: $t("homepage.experience"),
      class: "text-3xl sm:text-4xl font-bold text-center text-teal-300 drop-shadow-md"
    },
    {},
    {}
  )} <div class="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">${each(experiences, (exp, i) => {
    return `<div class="bg-blue-800 dark:bg-gray-700 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 z-10"><h3 class="text-xl sm:text-2xl font-semibold text-teal-300">${escape(exp.title)}</h3> <p class="text-white opacity-80 text-sm sm:text-base">${escape(exp.company)}, ${escape(exp.location)}</p> <p class="text-teal-100 mt-2 text-sm sm:text-base">${escape(exp.date)}</p> <p class="mt-4 text-white opacity-90 text-sm sm:text-base">${escape(exp.description)}</p> </div>`;
  })}</div></div></section>  <section id="skills" class="py-16 sm:py-24 bg-blue-800 dark:bg-gray-800"><div class="max-w-6xl mx-auto px-4 sm:px-6">${validate_component(BlurIn, "BlurIn").$$render(
    $$result,
    {
      word: $t("homepage.skill"),
      class: "text-3xl sm:text-4xl font-bold text-center text-teal-300 drop-shadow-md"
    },
    {},
    {}
  )} <div class="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">${each(skills, (skill) => {
    return `<div class="bg-teal-900 dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center">${skill.icon.secondaryComponent ? `<div class="flex space-x-2 sm:space-x-4">${validate_component(skill.icon.component || missing_component, "svelte:component").$$render(
      $$result,
      {
        class: "w-10 h-10 sm:w-12 sm:h-12 text-teal-300"
      },
      {},
      {}
    )} ${validate_component(skill.icon.secondaryComponent || missing_component, "svelte:component").$$render(
      $$result,
      {
        class: "w-10 h-10 sm:w-12 sm:h-12 text-teal-300"
      },
      {},
      {}
    )} </div>` : `${validate_component(skill.icon || missing_component, "svelte:component").$$render(
      $$result,
      {
        class: "w-10 h-10 sm:w-12 sm:h-12 text-teal-300"
      },
      {},
      {}
    )}`} <h3 class="mt-4 text-lg sm:text-xl font-semibold text-teal-300">${escape(skill.title)}</h3> <p class="mt-2 text-white opacity-90 text-sm sm:text-base">${escape(skill.description)}</p> </div>`;
  })}</div></div></section>  <section id="contact" class="relative py-16 sm:py-24 bg-gradient-to-br from-blue-900 to-teal-700 dark:from-gray-900 dark:to-gray-800">${validate_component(Particles, "Particles").$$render(
    $$result,
    {
      className: "absolute inset-0 pointer-events-none z-0",
      refresh: true
    },
    {},
    {}
  )} <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center"><div class="text-3xl sm:text-4xl font-bold text-teal-300 drop-shadow-md">${escape($t("homepage.mycontactinfo"))}</div> <div class="mt-8 sm:mt-12 space-y-6 sm:space-y-8">${each(contactInfo, (info) => {
    return `<div class="bg-blue-800 dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-4 sm:gap-6 z-10 relative">${validate_component(info.icon || missing_component, "svelte:component").$$render(
      $$result,
      {
        class: "w-10 h-10 sm:w-12 sm:h-12 text-teal-300"
      },
      {},
      {}
    )} <div class="text-left"><h3 class="text-base sm:text-lg font-semibold text-teal-300">${escape(info.title)}</h3> ${info.link ? `<a${add_attribute("href", info.link, 0)} target="_blank" class="text-white hover:text-teal-300 transition text-sm sm:text-base">${escape(info.detail)} </a>` : `<p class="text-white opacity-90 text-sm sm:text-base select-text">${escape(info.detail)} </p>`}</div> </div>`;
  })}</div></div></section>  ${``}  <footer class="py-6 sm:py-8 bg-blue-900 dark:bg-gray-900 text-center" data-svelte-h="svelte-1u039su"><p class="text-teal-300 opacity-80 text-sm sm:text-base">Make web developing great again.</p></footer> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1127h6y_START --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/base.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/types/spin.css"><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet"><!-- HEAD_svelte-1127h6y_END -->`, ""} <body class="w-screen h-screen bg-[#0B2447] select-none">${validate_component(Home, "Home").$$render($$result, {}, {}, {})}</body>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-B7kRu6Ew.js.map
