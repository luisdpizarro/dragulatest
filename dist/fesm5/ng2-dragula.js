import { __read, __decorate, __param, __metadata, __spread } from 'tslib';
import { Injectable, Optional, EventEmitter, Input, Output, Directive, ElementRef, NgModule } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as dragulaExpt from 'dragula';
import dragulaExpt__default, {  } from 'dragula';

var Group = /** @class */ (function () {
    function Group(name, drake, options) {
        this.name = name;
        this.drake = drake;
        this.options = options;
        this.initEvents = false;
    }
    return Group;
}());

var EventTypes;
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
})(EventTypes || (EventTypes = {}));
var ɵ0 = function (k) { return EventTypes[k]; };
var AllEvents = Object.keys(EventTypes).map(ɵ0);

var dragula = dragulaExpt__default || dragulaExpt;
var DrakeFactory = /** @class */ (function () {
    function DrakeFactory(build) {
        if (build === void 0) { build = dragula; }
        this.build = build;
    }
    return DrakeFactory;
}());

var filterEvent = function (eventType, filterDragType, projector) { return function (input) {
    return input.pipe(filter(function (_a) {
        var event = _a.event, name = _a.name;
        return event === eventType
            && (filterDragType === undefined || name === filterDragType);
    }), map(function (_a) {
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
        this.dispatch$ = new Subject();
        this.drag = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.Drag, groupName, function (name, _a) {
            var _b = __read(_a, 2), el = _b[0], source = _b[1];
            return ({ name: name, el: el, source: source });
        })); };
        this.dragend = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.DragEnd, groupName, function (name, _a) {
            var _b = __read(_a, 1), el = _b[0];
            return ({ name: name, el: el });
        })); };
        this.drop = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.Drop, groupName, function (name, _a) {
            var _b = __read(_a, 4), el = _b[0], target = _b[1], source = _b[2], sibling = _b[3];
            return { name: name, el: el, target: target, source: source, sibling: sibling };
        })); };
        this.elContainerSource = function (eventType) {
            return function (groupName) {
                return _this.dispatch$.pipe(filterEvent(eventType, groupName, elContainerSourceProjector));
            };
        };
        this.cancel = this.elContainerSource(EventTypes.Cancel);
        this.remove = this.elContainerSource(EventTypes.Remove);
        this.shadow = this.elContainerSource(EventTypes.Shadow);
        this.over = this.elContainerSource(EventTypes.Over);
        this.out = this.elContainerSource(EventTypes.Out);
        this.cloned = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.Cloned, groupName, function (name, _a) {
            var _b = __read(_a, 3), clone = _b[0], original = _b[1], cloneType = _b[2];
            return { name: name, clone: clone, original: original, cloneType: cloneType };
        })); };
        this.dropModel = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.DropModel, groupName, function (name, _a) {
            var _b = __read(_a, 9), el = _b[0], target = _b[1], source = _b[2], sibling = _b[3], item = _b[4], sourceModel = _b[5], targetModel = _b[6], sourceIndex = _b[7], targetIndex = _b[8];
            return { name: name, el: el, target: target, source: source, sibling: sibling, item: item, sourceModel: sourceModel, targetModel: targetModel, sourceIndex: sourceIndex, targetIndex: targetIndex };
        })); };
        this.removeModel = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.RemoveModel, groupName, function (name, _a) {
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
                event: EventTypes.RemoveModel,
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
                event: EventTypes.DropModel,
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
        Injectable(),
        __param(0, Optional()),
        __metadata("design:paramtypes", [DrakeFactory])
    ], DragulaService);
    return DragulaService;
}());

var DragulaDirective = /** @class */ (function () {
    function DragulaDirective(el, dragulaService) {
        this.el = el;
        this.dragulaService = dragulaService;
        this.dragulaModelChange = new EventEmitter();
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
        this.subs = new Subscription();
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
        Input(),
        __metadata("design:type", String)
    ], DragulaDirective.prototype, "dragula", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DragulaDirective.prototype, "dragulaModel", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DragulaDirective.prototype, "dragulaModelChange", void 0);
    DragulaDirective = __decorate([
        Directive({ selector: '[dragula]' }),
        __metadata("design:paramtypes", [ElementRef, DragulaService])
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
        NgModule({
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
        this.emitter$ = new Subject();
        this.subs = new Subscription();
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
            .pipe(filter(function (_a) {
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

/**
 * Generated bundle index. Do not edit.
 */

export { DragulaDirective, DragulaModule, DragulaService, DrakeFactory, EventTypes, Group, MockDrake, MockDrakeFactory, dragula };
//# sourceMappingURL=ng2-dragula.js.map
