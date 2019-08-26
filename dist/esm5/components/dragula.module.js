import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { DragulaDirective } from './dragula.directive';
import { DragulaService } from './dragula.service';
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
    DragulaModule = DragulaModule_1 = tslib_1.__decorate([
        NgModule({
            exports: [DragulaDirective],
            declarations: [DragulaDirective],
        })
    ], DragulaModule);
    return DragulaModule;
}());
export { DragulaModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ3VsYS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZHJhZ3VsYS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZHJhZ3VsYS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU1uRDtJQUFBO0lBT0EsQ0FBQztzQkFQWSxhQUFhO0lBQ2pCLHFCQUFPLEdBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGVBQWE7WUFDdkIsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO1NBQzVCLENBQUE7SUFDSCxDQUFDOztJQU5VLGFBQWE7UUFKekIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7WUFDM0IsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7U0FDakMsQ0FBQztPQUNXLGFBQWEsQ0FPekI7SUFBRCxvQkFBQztDQUFBLEFBUEQsSUFPQztTQVBZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHJhZ3VsYURpcmVjdGl2ZSB9IGZyb20gJy4vZHJhZ3VsYS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJhZ3VsYVNlcnZpY2UgfSBmcm9tICcuL2RyYWd1bGEuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtEcmFndWxhRGlyZWN0aXZlXSxcbiAgZGVjbGFyYXRpb25zOiBbRHJhZ3VsYURpcmVjdGl2ZV0sXG59KVxuZXhwb3J0IGNsYXNzIERyYWd1bGFNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IERyYWd1bGFNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtEcmFndWxhU2VydmljZV1cbiAgICB9XG4gIH1cbn1cbiJdfQ==