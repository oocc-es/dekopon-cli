var __read = (this && this.__read) || function (o, n) {
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
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState } from 'react';
import { Space, Select, DatePicker, Empty, Tag } from '@arco-design/web-react';
import './style/index.less';
var RangePicker = DatePicker.RangePicker;
var compareVersion = function (v1, v2) {
    var _a, _b;
    var mainArray1 = v1.split('-');
    var mainArray2 = v2.split('-');
    var array1 = mainArray1[0].split('.');
    var array2 = mainArray2[0].split('.');
    for (var i = 0; i < 3; i++) {
        if (array1[i] !== array2[i]) {
            return parseInt((_a = array1[i]) !== null && _a !== void 0 ? _a : '0') > parseInt((_b = array2[i]) !== null && _b !== void 0 ? _b : '0') ? 1 : -1;
        }
    }
    return 0;
};
var getTypeIcon = function (type) {
    switch (type) {
        case 'attention':
            return '⚠️';
        case 'optimization':
            return '💎';
        case 'feature':
            return '🆕';
        case 'bugfix':
            return '🐛';
        case 'style':
            return '💅';
        case 'typescript':
            return '🆎';
        case 'chore':
            return '🛠';
        default:
            return '';
    }
};
var locales = {
    'zh-CN': {
        version: '按版本',
        date: '按日期',
        attention: '重点注意',
        optimization: '功能优化',
        feature: '功能升级',
        bugfix: '问题修复',
        style: '样式更新',
        typescript: '类型修正',
        chore: '架构改动',
    },
    'en-US': {
        version: 'By version',
        date: 'By Date',
        attention: 'Attention',
        optimization: 'Enhancement',
        feature: 'Feature',
        bugfix: 'Bugfix',
        style: 'Style',
        typescript: 'Typescript',
        chore: 'Chore',
    },
};
export default function Changelog(_a) {
    var changelog = _a.changelog;
    // @ts-ignore
    var _b = __read(useState('version'), 2), rangeType = _b[0], setRangeType = _b[1];
    // @ts-ignore
    var _c = __read(useState(''), 2), start = _c[0], setStart = _c[1];
    // @ts-ignore
    var _d = __read(useState(''), 2), end = _d[0], setEnd = _d[1];
    // @ts-ignore
    var _e = __read(useState([
        'feature',
        'bugfix',
        'style',
        'typescript',
        'optimization',
        'attention',
        'chore',
    ]), 2), types = _e[0], setTypes = _e[1];
    var lang = localStorage.getItem('arco-lang') || 'zh-CN';
    var t = locales[lang];
    var versions = changelog.map(function (item) { return item.version; });
    var displayChangelog = changelog.reduce(function (pre, value) {
        var e_1, _a;
        if (rangeType === 'version') {
            if ((start && compareVersion(start, value.version) === 1) ||
                (end && compareVersion(value.version, end) === 1)) {
                return pre;
            }
        }
        else if ((start && value.date < start) || (end && value.date > end)) {
            return pre;
        }
        var data = {
            version: value.version,
            date: value.date,
            changelog: [],
        };
        try {
            for (var types_1 = __values(types), types_1_1 = types_1.next(); !types_1_1.done; types_1_1 = types_1.next()) {
                var type = types_1_1.value;
                if (value[type]) {
                    data.changelog.push({
                        type: type,
                        content: value[type],
                    });
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (types_1_1 && !types_1_1.done && (_a = types_1.return)) _a.call(types_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (data.changelog.length > 0) {
            pre.push(data);
        }
        return pre;
    }, []);
    return (React.createElement("div", { className: "changelog-wrapper" },
        React.createElement("div", { className: "changelog-header" },
            React.createElement(Space, { size: "large" },
                React.createElement(Select, { value: rangeType, style: { width: 100 }, options: [
                        { value: 'version', label: t.version },
                        { value: 'time', label: t.date },
                    ], onChange: function (value) {
                        setRangeType(value);
                        setStart('');
                        setEnd('');
                    } }),
                rangeType === 'version' ? (React.createElement(Space, null,
                    React.createElement(Select, { value: start, style: { width: 100 }, options: __spreadArray([], __read(versions), false).reverse(), onChange: function (value) {
                            setStart(value);
                        } }),
                    lang === 'en-US' ? 'To' : '至',
                    React.createElement(Select, { value: end, style: { width: 100 }, options: versions, onChange: function (value) {
                            setEnd(value);
                        } }))) : (React.createElement(RangePicker, { value: [start, end], style: { width: 230 }, onChange: function (date) {
                        setStart(date[0]);
                        setEnd(date[1]);
                    }, getPopupContainer: function () { return document.body; } })),
                React.createElement(Select, { mode: "multiple", style: { width: 320 }, options: [
                        { label: t.feature, value: 'feature' },
                        { label: t.bugfix, value: 'bugfix' },
                        { label: t.style, value: 'style' },
                        { label: t.typescript, value: 'typescript' },
                        { label: t.optimization, value: 'optimization' },
                        { label: t.attention, value: 'attention' },
                        { label: t.chore, value: 'chore' },
                    ], maxTagCount: 2, value: types, onChange: function (value) {
                        setTypes(value);
                    }, renderTag: function (props) {
                        var color;
                        switch (props.value) {
                            case 'feature':
                                color = 'orangered';
                                break;
                            case 'bugfix':
                                color = 'magenta';
                                break;
                            case 'style':
                                color = 'purple';
                                break;
                            case 'typescript':
                                color = 'arcoblue';
                                break;
                            case 'optimization':
                                color = 'green';
                                break;
                            case 'attention':
                                color = 'red';
                                break;
                            case 'chore':
                                color = 'cyan';
                                break;
                            default:
                                color = 'gray';
                        }
                        return (React.createElement(Tag, { color: color, style: { margin: '2px 6px 2px 0' } }, props.label));
                    } }))),
        React.createElement("div", { className: "changelog-content" },
            displayChangelog.map(function (item) { return (React.createElement("div", { className: "changelog-item", key: item.version },
                React.createElement("h2", { className: "changelog-version" }, item.version),
                React.createElement("p", null, item.date),
                item.changelog.map(function (cl) { return (React.createElement(React.Fragment, { key: cl.type },
                    React.createElement("div", { className: "changelog-type" },
                        React.createElement("span", { className: "changelog-type-icon" }, getTypeIcon(cl.type)),
                        cl.type.slice(0, 1).toUpperCase() + cl.type.slice(1)),
                    React.createElement("ul", { className: "changelog-list" }, cl.content.map(function (text, index) { return (React.createElement("li", { key: index, className: "changelog-text", dangerouslySetInnerHTML: { __html: text } })); })))); }))); }),
            displayChangelog.length === 0 && React.createElement(Empty, null))));
}
