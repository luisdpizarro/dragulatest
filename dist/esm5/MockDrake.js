import * as tslib_1 from "tslib";
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DrakeFactory } from './DrakeFactory';
export var MockDrakeFactory = new DrakeFactory(function (containers, options) {
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
            callback.apply(void 0, tslib_1.__spread(args));
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
export { MockDrake };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ja0RyYWtlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRyYWd1bGEvIiwic291cmNlcyI6WyJNb2NrRHJha2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxZQUFZLENBQUMsVUFBQyxVQUFVLEVBQUUsT0FBTztJQUNuRSxPQUFPLElBQUksU0FBUyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM1QyxDQUFDLENBQUMsQ0FBQztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNIO0lBQ0U7Ozs7O09BS0c7SUFDSCxtQkFDUyxVQUEwQixFQUMxQixPQUE0QixFQUM1QixNQUFnQjtRQUZoQiwyQkFBQSxFQUFBLGVBQTBCO1FBQzFCLHdCQUFBLEVBQUEsWUFBNEI7UUFENUIsZUFBVSxHQUFWLFVBQVUsQ0FBZ0I7UUFDMUIsWUFBTyxHQUFQLE9BQU8sQ0FBcUI7UUFDNUIsV0FBTSxHQUFOLE1BQU0sQ0FBVTtRQUd6Qiw0Q0FBNEM7UUFDNUMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQXFCMUIsZ0RBQWdEO1FBQ3hDLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBMEMsQ0FBQztRQUVqRSxTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQTNCL0IsQ0FBQztJQUtKLDBCQUEwQjtJQUMxQix5QkFBSyxHQUFMLFVBQU0sSUFBYTtRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBQ0QsMEJBQTBCO0lBQzFCLHVCQUFHLEdBQUg7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBSUQsMEJBQU0sR0FBTixVQUFPLE1BQVk7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUNELDBCQUEwQjtJQUMxQiwwQkFBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQU9ELHNCQUFFLEdBQUYsVUFBRyxLQUFhLEVBQUUsUUFBa0I7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVE7YUFDeEIsSUFBSSxDQUNILE1BQU0sQ0FBQyxVQUFDLEVBQWE7Z0JBQVgsd0JBQVM7WUFBTyxPQUFBLFNBQVMsS0FBSyxLQUFLO1FBQW5CLENBQW1CLENBQUMsQ0FDL0M7YUFDQSxTQUFTLENBQUMsVUFBQyxFQUFRO2dCQUFOLGNBQUk7WUFDaEIsUUFBUSxnQ0FBSSxJQUFJLEdBQUU7UUFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRCwyQkFBTyxHQUFQO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILHdCQUFJLEdBQUosVUFBSyxTQUFxQjtRQUFFLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQsNkJBQWM7O1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxXQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxDQUFBO0lBQ3pDLENBQUM7SUFFSCxnQkFBQztBQUFELENBQUMsQUFyRUQsSUFxRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERyYWtlV2l0aE1vZGVscyB9IGZyb20gJy4vRHJha2VXaXRoTW9kZWxzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEV2ZW50VHlwZXMgfSBmcm9tICcuL0V2ZW50VHlwZXMnO1xuaW1wb3J0IHsgRHJhZ3VsYU9wdGlvbnMgfSBmcm9tICcuL0RyYWd1bGFPcHRpb25zJztcbmltcG9ydCB7IERyYWtlRmFjdG9yeSB9IGZyb20gJy4vRHJha2VGYWN0b3J5JztcblxuZXhwb3J0IGNvbnN0IE1vY2tEcmFrZUZhY3RvcnkgPSBuZXcgRHJha2VGYWN0b3J5KChjb250YWluZXJzLCBvcHRpb25zKSA9PiB7XG4gIHJldHVybiBuZXcgTW9ja0RyYWtlKGNvbnRhaW5lcnMsIG9wdGlvbnMpO1xufSk7XG5cbi8qKiBZb3UgY2FuIHVzZSBNb2NrRHJha2UgdG8gc2ltdWxhdGUgRHJha2UgZXZlbnRzLlxuICpcbiAqIFRoZSB0aHJlZSBtZXRob2RzIHRoYXQgYWN0dWFsbHkgZG8gYW55dGhpbmcgYXJlIGBvbihldmVudCwgbGlzdGVuZXIpYCxcbiAqIGBkZXN0cm95KClgLCBhbmQgYSBuZXcgbWV0aG9kLCBgZW1pdCgpYC4gVXNlIGBlbWl0KClgIHRvIG1hbnVhbGx5IGVtaXQgRHJha2VcbiAqIGV2ZW50cywgYW5kIGlmIHlvdSBpbmplY3RlZCBNb2NrRHJha2UgcHJvcGVybHkgd2l0aCBNb2NrRHJha2VGYWN0b3J5IG9yXG4gKiBtb2NrZWQgdGhlIERyYWd1bGFTZXJ2aWNlLmZpbmQoKSBtZXRob2QsIHRoZW4geW91IGNhbiBtYWtlIG5nMi1kcmFndWxhIHRoaW5rXG4gKiBkcmFncyBhbmQgZHJvcHMgYXJlIGhhcHBlbmluZy5cbiAqXG4gKiBDYXZlYXRzOlxuICpcbiAqIDEuIFlPVSBNVVNUIE1BS0UgVEhFIERPTSBDSEFOR0VTIFlPVVJTRUxGLlxuICogMi4gUkVQRUFUOiBZT1UgTVVTVCBNQUtFIFRIRSBET00gQ0hBTkdFUyBZT1VSU0VMRi5cbiAqICAgIFRoYXQgbWVhbnMgYHNvdXJjZS5yZW1vdmVDaGlsZChlbClgLCBhbmQgYHRhcmdldC5pbnNlcnRCZWZvcmUoZWwpYC5cbiAqIDMuIE5vbmUgb2YgdGhlIG90aGVyIG1ldGhvZHMgZG8gYW55dGhpbmcuXG4gKiAgICBUaGF0J3Mgb2ssIGJlY2F1c2UgbmcyLWRyYWd1bGEgZG9lc24ndCB1c2UgdGhlbS5cbiAqL1xuZXhwb3J0IGNsYXNzIE1vY2tEcmFrZSBpbXBsZW1lbnRzIERyYWtlV2l0aE1vZGVscyB7XG4gIC8qKlxuICAgKiBAcGFyYW0gY29udGFpbmVycyBBIGxpc3Qgb2YgY29udGFpbmVyIGVsZW1lbnRzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGVzZSB3aWxsIE5PVCBiZSB1c2VkLiBBdCBhbGwuXG4gICAqIEBwYXJhbSBtb2RlbHMgTm9uc3RhbmRhcmQsIGJ1dCB1c2VmdWwgZm9yIHRlc3RpbmcgdXNpbmcgYG5ldyBNb2NrRHJha2UoKWAgZGlyZWN0bHkuXG4gICAqICAgICAgICAgICAgICAgTm90ZSwgZGVmYXVsdCB2YWx1ZSBpcyB1bmRlZmluZWQsIGxpa2UgYSByZWFsIERyYWtlLiBEb24ndCBjaGFuZ2UgdGhhdC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjb250YWluZXJzOiBFbGVtZW50W10gPSBbXSxcbiAgICBwdWJsaWMgb3B0aW9uczogRHJhZ3VsYU9wdGlvbnMgPSB7fSxcbiAgICBwdWJsaWMgbW9kZWxzPzogYW55W11bXVxuICApIHt9XG5cbiAgLyogRG9lc24ndCByZXByZXNlbnQgYW55dGhpbmcgbWVhbmluZ2Z1bC4gKi9cbiAgZHJhZ2dpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiBEb2VzIG5vdGhpbmcgdXNlZnVsLiAqL1xuICBzdGFydChpdGVtOiBFbGVtZW50KTogYW55IHtcbiAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgfVxuICAvKiBEb2VzIG5vdGhpbmcgdXNlZnVsLiAqL1xuICBlbmQoKTogYW55IHtcbiAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gIH1cbiAgLyogRG9lcyBub3RoaW5nIHVzZWZ1bC4gKi9cbiAgY2FuY2VsKHJldmVydDogYm9vbGVhbik6IGFueTtcbiAgY2FuY2VsKCk6IGFueTtcbiAgY2FuY2VsKHJldmVydD86IGFueSkge1xuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgfVxuICAvKiBEb2VzIG5vdGhpbmcgdXNlZnVsLiAqL1xuICByZW1vdmUoKTogYW55IHtcbiAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gIH1cblxuICAvLyBCYXNpYyBidXQgZnVsbHkgZnVuY3Rpb25hbCBldmVudCBlbWl0dGVyIHNoaW1cbiAgcHJpdmF0ZSBlbWl0dGVyJCA9IG5ldyBTdWJqZWN0PHsgZXZlbnRUeXBlOiBFdmVudFR5cGVzLCBhcmdzOiBhbnlbXSB9PigpO1xuXG4gIHByaXZhdGUgc3VicyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBvbihldmVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiBhbnkge1xuICAgIHRoaXMuc3Vicy5hZGQodGhpcy5lbWl0dGVyJFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoeyBldmVudFR5cGUgfSkgPT4gZXZlbnRUeXBlID09PSBldmVudClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKHsgYXJncyB9KSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKC4uLmFyZ3MpO1xuICAgICAgfSkpO1xuICB9XG5cbiAgZGVzdHJveSgpOiBhbnkge1xuICAgIHRoaXMuc3Vicy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIG1vc3QgdXNlZnVsIG1ldGhvZC4gWW91IGNhbiB1c2UgaXQgdG8gbWFudWFsbHkgZmlyZSBldmVudHMgdGhhdCB3b3VsZCBub3JtYWxseVxuICAgKiBiZSBmaXJlZCBieSBhIHJlYWwgZHJha2UuXG4gICAqXG4gICAqIFlvdSdyZSBsaWtlbHkgbW9zdCBpbnRlcmVzdGVkIGluIGZpcmluZyBgZHJhZ2AsIGByZW1vdmVgIGFuZCBgZHJvcGAsIHRoZSB0aHJlZSBldmVudHNcbiAgICogRHJhZ3VsYVNlcnZpY2UgdXNlcyB0byBpbXBsZW1lbnQgW2RyYWd1bGFNb2RlbF0uXG4gICAqXG4gICAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYmV2YWNxdWEvZHJhZ3VsYSNkcmFrZW9uLWV2ZW50cyBmb3Igd2hhdCB5b3Ugc2hvdWxkIGVtaXQgKGFuZCBpbiB3aGF0IG9yZGVyKS5cbiAgICpcbiAgICogKE5vdGUgYWxzbywgZmlyaW5nIGRyb3BNb2RlbCBhbmQgcmVtb3ZlTW9kZWwgd29uJ3Qgd29yay4gWW91IHdvdWxkIGhhdmUgdG8gbW9jayBEcmFndWxhU2VydmljZSBmb3IgdGhhdC4pXG4gICAqL1xuICBlbWl0KGV2ZW50VHlwZTogRXZlbnRUeXBlcywgLi4uYXJnczogYW55W10pIHtcbiAgICB0aGlzLmVtaXR0ZXIkLm5leHQoeyBldmVudFR5cGUsIGFyZ3MgfSlcbiAgfVxuXG59XG4iXX0=