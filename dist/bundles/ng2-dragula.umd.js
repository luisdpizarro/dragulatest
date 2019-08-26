(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('dragula')) :
    typeof define === 'function' && define.amd ? define('ng2-dragula', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', 'dragula'], factory) :
    (global = global || self, factory(global['ng2-dragula'] = {}, global.ng.core, global.rxjs, global.rxjs.operators, global.dragula));
}(this, function (exports, core, rxjs, operators, dragulaExpt__default) { 'use strict';

    var dragulaExpt__default__default = 'default' in dragulaExpt__default ? dragulaExpt__default['default'] : dragulaExpt__default;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

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

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
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

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var Group = /** @class */ (function () {
        function Group(name, drake, options) {
            this.name = name;
            this.drake = drake;
            this.options = options;
            this.initEvents = false;
        }
        return Group;
    }());


    (function (EventTypes) {
        EventTypes["Cancel"] = "cancel";
        EventTypes["Cloned"] = "cloned";
        EventTypes["Drag"] = "drag";
        EventTypes["DragEnd"] = "dragend";
        EventTypes["Drop"] = "drop";
        EventTypes["Out"] = "out";
        EventTypes["Over"] = "over";
        EventTypes["Remove"] = "remove";
        EventTypes["Shadow"] = "shadow";
        EventTypes["DropModel"] = "dropModel";
        EventTypes["RemoveModel"] = "removeModel";
    })(exports.EventTypes || (exports.EventTypes = {}));
    var ɵ0 = function (k) { return exports.EventTypes[k]; };
    var AllEvents = Object.keys(exports.EventTypes).map(ɵ0);

    var dragula = dragulaExpt__default__default || dragulaExpt__default;
    var DrakeFactory = /** @class */ (function () {
        function DrakeFactory(build) {
            if (build === void 0) { build = dragula; }
            this.build = build;
        }
        return DrakeFactory;
    }());

    var filterEvent = function (eventType, filterDragType, projector) { return function (input) {
        return input.pipe(operators.filter(function (_a) {
            var event = _a.event, name = _a.name;
            return event === eventType
                && (filterDragType === undefined || name === filterDragType);
        }), operators.map(function (_a) {
            var name = _a.name, args = _a.args;
            return projector(name, args);
        }));
    }; };
    var ɵ0$1 = filterEvent;
    var elContainerSourceProjector = function (name, _a) {
        var _b = __read(_a, 3), el = _b[0], container = _b[1], source = _b[2];
        return ({ name: name, el: el, container: container, source: source });
    };
    var ɵ1 = elContainerSourceProjector;
    var DragulaService = /** @class */ (function () {
        function DragulaService(drakeFactory) {
            var _this = this;
            if (drakeFactory === void 0) { drakeFactory = null; }
            this.drakeFactory = drakeFactory;
            /* https://github.com/bevacqua/dragula#drakeon-events */
            this.dispatch$ = new rxjs.Subject();
            this.drag = function (groupName) { return _this.dispatch$.pipe(filterEvent(exports.EventTypes.Drag, groupName, function (name, _a) {
                var _b = __read(_a, 2), el = _b[0], source = _b[1];
                return ({ name: name, el: el, source: source });
            })); };
            this.dragend = function (groupName) { return _this.dispatch$.pipe(filterEvent(exports.EventTypes.DragEnd, groupName, function (name, _a) {
                var _b = __read(_a, 1), el = _b[0];
                return ({ name: name, el: el });
            })); };
            this.drop = function (groupName) { return _this.dispatch$.pipe(filterEvent(exports.EventTypes.Drop, groupName, function (name, _a) {
                var _b = __read(_a, 4), el = _b[0], target = _b[1], source = _b[2], sibling = _b[3];
                return { name: name, el: el, target: target, source: source, sibling: sibling };
            })); };
            this.elContainerSource = function (eventType) {
                return function (groupName) {
                    return _this.dispatch$.pipe(filterEvent(eventType, groupName, elContainerSourceProjector));
                };
            };
            this.cancel = this.elContainerSource(exports.EventTypes.Cancel);
            this.remove = this.elContainerSource(exports.EventTypes.Remove);
            this.shadow = this.elContainerSource(exports.EventTypes.Shadow);
            this.over = this.elContainerSource(exports.EventTypes.Over);
            this.out = this.elContainerSource(exports.EventTypes.Out);
            this.cloned = function (groupName) { return _this.dispatch$.pipe(filterEvent(exports.EventTypes.Cloned, groupName, function (name, _a) {
                var _b = __read(_a, 3), clone = _b[0], original = _b[1], cloneType = _b[2];
                return { name: name, clone: clone, original: original, cloneType: cloneType };
            })); };
            this.dropModel = function (groupName) { return _this.dispatch$.pipe(filterEvent(exports.EventTypes.DropModel, groupName, function (name, _a) {
                var _b = __read(_a, 9), el = _b[0], target = _b[1], source = _b[2], sibling = _b[3], item = _b[4], sourceModel = _b[5], targetModel = _b[6], sourceIndex = _b[7], targetIndex = _b[8];
                return { name: name, el: el, target: target, source: source, sibling: sibling, item: item, sourceModel: sourceModel, targetModel: targetModel, sourceIndex: sourceIndex, targetIndex: targetIndex };
            })); };
            this.removeModel = function (groupName) { return _this.dispatch$.pipe(filterEvent(exports.EventTypes.RemoveModel, groupName, function (name, _a) {
                var _b = __read(_a, 6), el = _b[0], container = _b[1], source = _b[2], item = _b[3], sourceModel = _b[4], sourceIndex = _b[5];
                return { name: name, el: el, container: container, source: source, item: item, sourceModel: sourceModel, sourceIndex: sourceIndex };
            })); };
            this.groups = {};
            if (this.drakeFactory === null) {
                this.drakeFactory = new DrakeFactory();
            }
        }
        /** Public mainly for testing purposes. Prefer `createGroup()`. */
        DragulaService.prototype.add = function (group) {
            var existingGroup = this.find(group.name);
            if (existingGroup) {
                throw new Error('Group named: "' + group.name + '" already exists.');
            }
            this.groups[group.name] = group;
            this.handleModels(group);
            this.setupEvents(group);
            return group;
        };
        DragulaService.prototype.find = function (name) {
            return this.groups[name];
        };
        DragulaService.prototype.destroy = function (name) {
            var group = this.find(name);
            if (!group) {
                return;
            }
            group.drake && group.drake.destroy();
            delete this.groups[name];
        };
        /**
         * Creates a group with the specified name and options.
         *
         * Note: formerly known as `setOptions`
         */
        DragulaService.prototype.createGroup = function (name, options) {
            return this.add(new Group(name, this.drakeFactory.build([], options), options));
        };
        DragulaService.prototype.handleModels = function (_a) {
            var _this = this;
            var name = _a.name, drake = _a.drake, options = _a.options;
            var dragElm;
            var dragIndex;
            var dropIndex;
            drake.on('remove', function (el, container, source) {
                if (!drake.models) {
                    return;
                }
                var sourceModel = drake.models[drake.containers.indexOf(source)];
                sourceModel = sourceModel.slice(0); // clone it
                var item = sourceModel.splice(dragIndex, 1)[0];
                // console.log('REMOVE');
                // console.log(sourceModel);
                _this.dispatch$.next({
                    event: exports.EventTypes.RemoveModel,
                    name: name,
                    args: [el, container, source, item, sourceModel, dragIndex]
                });
            });
            drake.on('drag', function (el, source) {
                if (!drake.models) {
                    return;
                }
                dragElm = el;
                dragIndex = _this.domIndexOf(el, source);
            });
            drake.on('drop', function (dropElm, target, source, sibling) {
                if (!drake.models || !target) {
                    return;
                }
                dropIndex = _this.domIndexOf(dropElm, target);
                var sourceModel = drake.models[drake.containers.indexOf(source)];
                var targetModel = drake.models[drake.containers.indexOf(target)];
                // console.log('DROP');
                // console.log(sourceModel);
                var item;
                if (target === source) {
                    sourceModel = sourceModel.slice(0);
                    item = sourceModel.splice(dragIndex, 1)[0];
                    sourceModel.splice(dropIndex, 0, item);
                    // this was true before we cloned and updated sourceModel,
                    // but targetModel still has the old value
                    targetModel = sourceModel;
                }
                else {
                    var isCopying = dragElm !== dropElm;
                    item = sourceModel[dragIndex];
                    if (isCopying) {
                        if (!options.copyItem) {
                            throw new Error("If you have enabled `copy` on a group, you must provide a `copyItem` function.");
                        }
                        item = options.copyItem(item);
                    }
                    if (!isCopying) {
                        sourceModel = sourceModel.slice(0);
                        sourceModel.splice(dragIndex, 1);
                    }
                    targetModel = targetModel.slice(0);
                    targetModel.splice(dropIndex, 0, item);
                    if (isCopying) {
                        try {
                            target.removeChild(dropElm);
                        }
                        catch (e) { }
                    }
                }
                _this.dispatch$.next({
                    event: exports.EventTypes.DropModel,
                    name: name,
                    args: [dropElm, target, source, sibling, item, sourceModel, targetModel, dragIndex, dropIndex]
                });
            });
        };
        DragulaService.prototype.setupEvents = function (group) {
            var _this = this;
            if (group.initEvents) {
                return;
            }
            group.initEvents = true;
            var name = group.name;
            var that = this;
            var emitter = function (event) {
                group.drake.on(event, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    _this.dispatch$.next({ event: event, name: name, args: args });
                });
            };
            AllEvents.forEach(emitter);
        };
        DragulaService.prototype.domIndexOf = function (child, parent) {
            return Array.prototype.indexOf.call(parent.children, child);
        };
        DragulaService = __decorate([
            core.Injectable(),
            __param(0, core.Optional()),
            __metadata("design:paramtypes", [DrakeFactory])
        ], DragulaService);
        return DragulaService;
    }());

    var DragulaDirective = /** @class */ (function () {
        function DragulaDirective(el, dragulaService) {
            this.el = el;
            this.dragulaService = dragulaService;
            this.dragulaModelChange = new core.EventEmitter();
        }
        Object.defineProperty(DragulaDirective.prototype, "container", {
            get: function () {
                return this.el && this.el.nativeElement;
            },
            enumerable: true,
            configurable: true
        });
        DragulaDirective.prototype.ngOnChanges = function (changes) {
            if (changes && changes.dragula) {
                var _a = changes.dragula, prev = _a.previousValue, current = _a.currentValue, firstChange = _a.firstChange;
                var hadPreviousValue = !!prev;
                var hasNewValue = !!current;
                // something -> null       =>  teardown only
                // something -> something  =>  teardown, then setup
                //      null -> something  =>  setup only
                //
                //      null -> null (precluded by fact of change being present)
                if (hadPreviousValue) {
                    this.teardown(prev);
                }
                if (hasNewValue) {
                    this.setup();
                }
            }
            else if (changes && changes.dragulaModel) {
                // this code only runs when you're not changing the group name
                // because if you're changing the group name, you'll be doing setup or teardown
                // it also only runs if there is a group name to attach to.
                var _b = changes.dragulaModel, prev = _b.previousValue, current = _b.currentValue, firstChange = _b.firstChange;
                var drake = this.group.drake;
                if (this.dragula && drake) {
                    drake.models = drake.models || [];
                    var prevIndex = drake.models.indexOf(prev);
                    if (prevIndex !== -1) {
                        // delete the previous
                        drake.models.splice(prevIndex, 1);
                        // maybe insert a new one at the same spot
                        if (!!current) {
                            drake.models.splice(prevIndex, 0, current);
                        }
                    }
                    else if (!!current) {
                        // no previous one to remove; just push this one.
                        drake.models.push(current);
                    }
                }
            }
        };
        // call ngOnInit 'setup' because we want to call it in ngOnChanges
        // and it would otherwise run twice
        DragulaDirective.prototype.setup = function () {
            var _this = this;
            var checkModel = function (group) {
                if (_this.dragulaModel) {
                    if (group.drake.models) {
                        group.drake.models.push(_this.dragulaModel);
                    }
                    else {
                        group.drake.models = [_this.dragulaModel];
                    }
                }
            };
            // find or create a group
            var group = this.dragulaService.find(this.dragula);
            if (!group) {
                var options = {};
                group = this.dragulaService.createGroup(this.dragula, options);
            }
            // ensure model and container element are pushed
            checkModel(group);
            group.drake.containers.push(this.container);
            this.subscribe(this.dragula);
            this.group = group;
        };
        DragulaDirective.prototype.subscribe = function (name) {
            var _this = this;
            this.subs = new rxjs.Subscription();
            this.subs.add(this.dragulaService
                .dropModel(name)
                .subscribe(function (_a) {
                var source = _a.source, target = _a.target, sourceModel = _a.sourceModel, targetModel = _a.targetModel;
                if (source === _this.el.nativeElement) {
                    _this.dragulaModelChange.emit(sourceModel);
                }
                else if (target === _this.el.nativeElement) {
                    _this.dragulaModelChange.emit(targetModel);
                }
            }));
            this.subs.add(this.dragulaService
                .removeModel(name)
                .subscribe(function (_a) {
                var source = _a.source, sourceModel = _a.sourceModel;
                if (source === _this.el.nativeElement) {
                    _this.dragulaModelChange.emit(sourceModel);
                }
            }));
        };
        DragulaDirective.prototype.teardown = function (groupName) {
            if (this.subs) {
                this.subs.unsubscribe();
            }
            var group = this.dragulaService.find(groupName);
            if (group) {
                var itemToRemove = group.drake.containers.indexOf(this.el.nativeElement);
                if (itemToRemove !== -1) {
                    group.drake.containers.splice(itemToRemove, 1);
                }
                if (this.dragulaModel && group.drake && group.drake.models) {
                    var modelIndex = group.drake.models.indexOf(this.dragulaModel);
                    if (modelIndex !== -1) {
                        group.drake.models.splice(modelIndex, 1);
                    }
                }
            }
        };
        DragulaDirective.prototype.ngOnDestroy = function () {
            this.teardown(this.dragula);
        };
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], DragulaDirective.prototype, "dragula", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], DragulaDirective.prototype, "dragulaModel", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], DragulaDirective.prototype, "dragulaModelChange", void 0);
        DragulaDirective = __decorate([
            core.Directive({ selector: '[dragula]' }),
            __metadata("design:paramtypes", [core.ElementRef, DragulaService])
        ], DragulaDirective);
        return DragulaDirective;
    }());

    var DragulaModule = /** @class */ (function () {
        function DragulaModule() {
        }
        DragulaModule_1 = DragulaModule;
        DragulaModule.forRoot = function () {
            return {
                ngModule: DragulaModule_1,
                providers: [DragulaService]
            };
        };
        var DragulaModule_1;
        DragulaModule = DragulaModule_1 = __decorate([
            core.NgModule({
                exports: [DragulaDirective],
                declarations: [DragulaDirective],
            })
        ], DragulaModule);
        return DragulaModule;
    }());

    var MockDrakeFactory = new DrakeFactory(function (containers, options) {
        return new MockDrake(containers, options);
    });
    /** You can use MockDrake to simulate Drake events.
     *
     * The three methods that actually do anything are `on(event, listener)`,
     * `destroy()`, and a new method, `emit()`. Use `emit()` to manually emit Drake
     * events, and if you injected MockDrake properly with MockDrakeFactory or
     * mocked the DragulaService.find() method, then you can make ng2-dragula think
     * drags and drops are happening.
     *
     * Caveats:
     *
     * 1. YOU MUST MAKE THE DOM CHANGES YOURSELF.
     * 2. REPEAT: YOU MUST MAKE THE DOM CHANGES YOURSELF.
     *    That means `source.removeChild(el)`, and `target.insertBefore(el)`.
     * 3. None of the other methods do anything.
     *    That's ok, because ng2-dragula doesn't use them.
     */
    var MockDrake = /** @class */ (function () {
        /**
         * @param containers A list of container elements.
         * @param options These will NOT be used. At all.
         * @param models Nonstandard, but useful for testing using `new MockDrake()` directly.
         *               Note, default value is undefined, like a real Drake. Don't change that.
         */
        function MockDrake(containers, options, models) {
            if (containers === void 0) { containers = []; }
            if (options === void 0) { options = {}; }
            this.containers = containers;
            this.options = options;
            this.models = models;
            /* Doesn't represent anything meaningful. */
            this.dragging = false;
            // Basic but fully functional event emitter shim
            this.emitter$ = new rxjs.Subject();
            this.subs = new rxjs.Subscription();
        }
        /* Does nothing useful. */
        MockDrake.prototype.start = function (item) {
            this.dragging = true;
        };
        /* Does nothing useful. */
        MockDrake.prototype.end = function () {
            this.dragging = false;
        };
        MockDrake.prototype.cancel = function (revert) {
            this.dragging = false;
        };
        /* Does nothing useful. */
        MockDrake.prototype.remove = function () {
            this.dragging = false;
        };
        MockDrake.prototype.on = function (event, callback) {
            this.subs.add(this.emitter$
                .pipe(operators.filter(function (_a) {
                var eventType = _a.eventType;
                return eventType === event;
            }))
                .subscribe(function (_a) {
                var args = _a.args;
                callback.apply(void 0, __spread(args));
            }));
        };
        MockDrake.prototype.destroy = function () {
            this.subs.unsubscribe();
        };
        /**
         * This is the most useful method. You can use it to manually fire events that would normally
         * be fired by a real drake.
         *
         * You're likely most interested in firing `drag`, `remove` and `drop`, the three events
         * DragulaService uses to implement [dragulaModel].
         *
         * See https://github.com/bevacqua/dragula#drakeon-events for what you should emit (and in what order).
         *
         * (Note also, firing dropModel and removeModel won't work. You would have to mock DragulaService for that.)
         */
        MockDrake.prototype.emit = function (eventType) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this.emitter$.next({ eventType: eventType, args: args });
        };
        return MockDrake;
    }());

    exports.DragulaDirective = DragulaDirective;
    exports.DragulaModule = DragulaModule;
    exports.DragulaService = DragulaService;
    exports.DrakeFactory = DrakeFactory;
    exports.Group = Group;
    exports.MockDrake = MockDrake;
    exports.MockDrakeFactory = MockDrakeFactory;
    exports.dragula = dragula;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ng2-dragula.umd.js.map
