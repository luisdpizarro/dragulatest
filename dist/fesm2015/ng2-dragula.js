import { __decorate, __param, __metadata } from 'tslib';
import { Injectable, Optional, EventEmitter, Input, Output, Directive, ElementRef, NgModule } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as dragulaExpt from 'dragula';
import dragulaExpt__default, {  } from 'dragula';

class Group {
    constructor(name, drake, options) {
        this.name = name;
        this.drake = drake;
        this.options = options;
        this.initEvents = false;
    }
}

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
const ɵ0 = k => EventTypes[k];
const AllEvents = Object.keys(EventTypes).map(ɵ0);

const dragula = dragulaExpt__default || dragulaExpt;
class DrakeFactory {
    constructor(build = dragula) {
        this.build = build;
    }
}

const filterEvent = (eventType, filterDragType, projector) => (input) => {
    return input.pipe(filter(({ event, name }) => {
        return event === eventType
            && (filterDragType === undefined || name === filterDragType);
    }), map(({ name, args }) => projector(name, args)));
};
const ɵ0$1 = filterEvent;
const elContainerSourceProjector = (name, [el, container, source]) => ({ name, el, container, source });
const ɵ1 = elContainerSourceProjector;
let DragulaService = class DragulaService {
    constructor(drakeFactory = null) {
        this.drakeFactory = drakeFactory;
        /* https://github.com/bevacqua/dragula#drakeon-events */
        this.dispatch$ = new Subject();
        this.drag = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.Drag, groupName, (name, [el, source]) => ({ name, el, source })));
        this.dragend = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.DragEnd, groupName, (name, [el]) => ({ name, el })));
        this.drop = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.Drop, groupName, (name, [el, target, source, sibling]) => {
            return { name, el, target, source, sibling };
        }));
        this.elContainerSource = (eventType) => (groupName) => this.dispatch$.pipe(filterEvent(eventType, groupName, elContainerSourceProjector));
        this.cancel = this.elContainerSource(EventTypes.Cancel);
        this.remove = this.elContainerSource(EventTypes.Remove);
        this.shadow = this.elContainerSource(EventTypes.Shadow);
        this.over = this.elContainerSource(EventTypes.Over);
        this.out = this.elContainerSource(EventTypes.Out);
        this.cloned = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.Cloned, groupName, (name, [clone, original, cloneType]) => {
            return { name, clone, original, cloneType };
        }));
        this.dropModel = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.DropModel, groupName, (name, [el, target, source, sibling, item, sourceModel, targetModel, sourceIndex, targetIndex]) => {
            return { name, el, target, source, sibling, item, sourceModel, targetModel, sourceIndex, targetIndex };
        }));
        this.removeModel = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.RemoveModel, groupName, (name, [el, container, source, item, sourceModel, sourceIndex]) => {
            return { name, el, container, source, item, sourceModel, sourceIndex };
        }));
        this.groups = {};
        if (this.drakeFactory === null) {
            this.drakeFactory = new DrakeFactory();
        }
    }
    /** Public mainly for testing purposes. Prefer `createGroup()`. */
    add(group) {
        let existingGroup = this.find(group.name);
        if (existingGroup) {
            throw new Error('Group named: "' + group.name + '" already exists.');
        }
        this.groups[group.name] = group;
        this.handleModels(group);
        this.setupEvents(group);
        return group;
    }
    find(name) {
        return this.groups[name];
    }
    destroy(name) {
        let group = this.find(name);
        if (!group) {
            return;
        }
        group.drake && group.drake.destroy();
        delete this.groups[name];
    }
    /**
     * Creates a group with the specified name and options.
     *
     * Note: formerly known as `setOptions`
     */
    createGroup(name, options) {
        return this.add(new Group(name, this.drakeFactory.build([], options), options));
    }
    handleModels({ name, drake, options }) {
        let dragElm;
        let dragIndex;
        let dropIndex;
        drake.on('remove', (el, container, source) => {
            if (!drake.models) {
                return;
            }
            let sourceModel = drake.models[drake.containers.indexOf(source)];
            sourceModel = sourceModel.slice(0); // clone it
            const item = sourceModel.splice(dragIndex, 1)[0];
            // console.log('REMOVE');
            // console.log(sourceModel);
            this.dispatch$.next({
                event: EventTypes.RemoveModel,
                name,
                args: [el, container, source, item, sourceModel, dragIndex]
            });
        });
        drake.on('drag', (el, source) => {
            if (!drake.models) {
                return;
            }
            dragElm = el;
            dragIndex = this.domIndexOf(el, source);
        });
        drake.on('drop', (dropElm, target, source, sibling) => {
            if (!drake.models || !target) {
                return;
            }
            dropIndex = this.domIndexOf(dropElm, target);
            let sourceModel = drake.models[drake.containers.indexOf(source)];
            let targetModel = drake.models[drake.containers.indexOf(target)];
            // console.log('DROP');
            // console.log(sourceModel);
            let item;
            if (target === source) {
                sourceModel = sourceModel.slice(0);
                item = sourceModel.splice(dragIndex, 1)[0];
                sourceModel.splice(dropIndex, 0, item);
                // this was true before we cloned and updated sourceModel,
                // but targetModel still has the old value
                targetModel = sourceModel;
            }
            else {
                let isCopying = dragElm !== dropElm;
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
            this.dispatch$.next({
                event: EventTypes.DropModel,
                name,
                args: [dropElm, target, source, sibling, item, sourceModel, targetModel, dragIndex, dropIndex]
            });
        });
    }
    setupEvents(group) {
        if (group.initEvents) {
            return;
        }
        group.initEvents = true;
        const name = group.name;
        let that = this;
        let emitter = (event) => {
            group.drake.on(event, (...args) => {
                this.dispatch$.next({ event, name, args });
            });
        };
        AllEvents.forEach(emitter);
    }
    domIndexOf(child, parent) {
        return Array.prototype.indexOf.call(parent.children, child);
    }
};
DragulaService = __decorate([
    Injectable(),
    __param(0, Optional()),
    __metadata("design:paramtypes", [DrakeFactory])
], DragulaService);

let DragulaDirective = class DragulaDirective {
    constructor(el, dragulaService) {
        this.el = el;
        this.dragulaService = dragulaService;
        this.dragulaModelChange = new EventEmitter();
    }
    get container() {
        return this.el && this.el.nativeElement;
    }
    ngOnChanges(changes) {
        if (changes && changes.dragula) {
            const { previousValue: prev, currentValue: current, firstChange } = changes.dragula;
            let hadPreviousValue = !!prev;
            let hasNewValue = !!current;
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
            const { previousValue: prev, currentValue: current, firstChange } = changes.dragulaModel;
            const { drake } = this.group;
            if (this.dragula && drake) {
                drake.models = drake.models || [];
                let prevIndex = drake.models.indexOf(prev);
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
    }
    // call ngOnInit 'setup' because we want to call it in ngOnChanges
    // and it would otherwise run twice
    setup() {
        let checkModel = (group) => {
            if (this.dragulaModel) {
                if (group.drake.models) {
                    group.drake.models.push(this.dragulaModel);
                }
                else {
                    group.drake.models = [this.dragulaModel];
                }
            }
        };
        // find or create a group
        let group = this.dragulaService.find(this.dragula);
        if (!group) {
            let options = {};
            group = this.dragulaService.createGroup(this.dragula, options);
        }
        // ensure model and container element are pushed
        checkModel(group);
        group.drake.containers.push(this.container);
        this.subscribe(this.dragula);
        this.group = group;
    }
    subscribe(name) {
        this.subs = new Subscription();
        this.subs.add(this.dragulaService
            .dropModel(name)
            .subscribe(({ source, target, sourceModel, targetModel }) => {
            if (source === this.el.nativeElement) {
                this.dragulaModelChange.emit(sourceModel);
            }
            else if (target === this.el.nativeElement) {
                this.dragulaModelChange.emit(targetModel);
            }
        }));
        this.subs.add(this.dragulaService
            .removeModel(name)
            .subscribe(({ source, sourceModel }) => {
            if (source === this.el.nativeElement) {
                this.dragulaModelChange.emit(sourceModel);
            }
        }));
    }
    teardown(groupName) {
        if (this.subs) {
            this.subs.unsubscribe();
        }
        const group = this.dragulaService.find(groupName);
        if (group) {
            const itemToRemove = group.drake.containers.indexOf(this.el.nativeElement);
            if (itemToRemove !== -1) {
                group.drake.containers.splice(itemToRemove, 1);
            }
            if (this.dragulaModel && group.drake && group.drake.models) {
                let modelIndex = group.drake.models.indexOf(this.dragulaModel);
                if (modelIndex !== -1) {
                    group.drake.models.splice(modelIndex, 1);
                }
            }
        }
    }
    ngOnDestroy() {
        this.teardown(this.dragula);
    }
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

var DragulaModule_1;
let DragulaModule = DragulaModule_1 = class DragulaModule {
    static forRoot() {
        return {
            ngModule: DragulaModule_1,
            providers: [DragulaService]
        };
    }
};
DragulaModule = DragulaModule_1 = __decorate([
    NgModule({
        exports: [DragulaDirective],
        declarations: [DragulaDirective],
    })
], DragulaModule);

const MockDrakeFactory = new DrakeFactory((containers, options) => {
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
class MockDrake {
    /**
     * @param containers A list of container elements.
     * @param options These will NOT be used. At all.
     * @param models Nonstandard, but useful for testing using `new MockDrake()` directly.
     *               Note, default value is undefined, like a real Drake. Don't change that.
     */
    constructor(containers = [], options = {}, models) {
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
    start(item) {
        this.dragging = true;
    }
    /* Does nothing useful. */
    end() {
        this.dragging = false;
    }
    cancel(revert) {
        this.dragging = false;
    }
    /* Does nothing useful. */
    remove() {
        this.dragging = false;
    }
    on(event, callback) {
        this.subs.add(this.emitter$
            .pipe(filter(({ eventType }) => eventType === event))
            .subscribe(({ args }) => {
            callback(...args);
        }));
    }
    destroy() {
        this.subs.unsubscribe();
    }
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
    emit(eventType, ...args) {
        this.emitter$.next({ eventType, args });
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { DragulaDirective, DragulaModule, DragulaService, DrakeFactory, EventTypes, Group, MockDrake, MockDrakeFactory, dragula };
//# sourceMappingURL=ng2-dragula.js.map
