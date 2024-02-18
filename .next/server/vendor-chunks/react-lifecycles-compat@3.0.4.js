"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-lifecycles-compat@3.0.4";
exports.ids = ["vendor-chunks/react-lifecycles-compat@3.0.4"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/react-lifecycles-compat@3.0.4/node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/react-lifecycles-compat@3.0.4/node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   polyfill: () => (/* binding */ polyfill)\n/* harmony export */ });\n/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */ function componentWillMount() {\n    // Call this.constructor.gDSFP to support sub-classes.\n    var state = this.constructor.getDerivedStateFromProps(this.props, this.state);\n    if (state !== null && state !== undefined) {\n        this.setState(state);\n    }\n}\nfunction componentWillReceiveProps(nextProps) {\n    // Call this.constructor.gDSFP to support sub-classes.\n    // Use the setState() updater to ensure state isn't stale in certain edge cases.\n    function updater(prevState) {\n        var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);\n        return state !== null && state !== undefined ? state : null;\n    }\n    // Binding \"this\" is important for shallow renderer support.\n    this.setState(updater.bind(this));\n}\nfunction componentWillUpdate(nextProps, nextState) {\n    try {\n        var prevProps = this.props;\n        var prevState = this.state;\n        this.props = nextProps;\n        this.state = nextState;\n        this.__reactInternalSnapshotFlag = true;\n        this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(prevProps, prevState);\n    } finally{\n        this.props = prevProps;\n        this.state = prevState;\n    }\n}\n// React may warn about cWM/cWRP/cWU methods being deprecated.\n// Add a flag to suppress these warnings for this special case.\ncomponentWillMount.__suppressDeprecationWarning = true;\ncomponentWillReceiveProps.__suppressDeprecationWarning = true;\ncomponentWillUpdate.__suppressDeprecationWarning = true;\nfunction polyfill(Component) {\n    var prototype = Component.prototype;\n    if (!prototype || !prototype.isReactComponent) {\n        throw new Error(\"Can only polyfill class components\");\n    }\n    if (typeof Component.getDerivedStateFromProps !== \"function\" && typeof prototype.getSnapshotBeforeUpdate !== \"function\") {\n        return Component;\n    }\n    // If new component APIs are defined, \"unsafe\" lifecycles won't be called.\n    // Error if any of these lifecycles are present,\n    // Because they would work differently between older and newer (16.3+) versions of React.\n    var foundWillMountName = null;\n    var foundWillReceivePropsName = null;\n    var foundWillUpdateName = null;\n    if (typeof prototype.componentWillMount === \"function\") {\n        foundWillMountName = \"componentWillMount\";\n    } else if (typeof prototype.UNSAFE_componentWillMount === \"function\") {\n        foundWillMountName = \"UNSAFE_componentWillMount\";\n    }\n    if (typeof prototype.componentWillReceiveProps === \"function\") {\n        foundWillReceivePropsName = \"componentWillReceiveProps\";\n    } else if (typeof prototype.UNSAFE_componentWillReceiveProps === \"function\") {\n        foundWillReceivePropsName = \"UNSAFE_componentWillReceiveProps\";\n    }\n    if (typeof prototype.componentWillUpdate === \"function\") {\n        foundWillUpdateName = \"componentWillUpdate\";\n    } else if (typeof prototype.UNSAFE_componentWillUpdate === \"function\") {\n        foundWillUpdateName = \"UNSAFE_componentWillUpdate\";\n    }\n    if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {\n        var componentName = Component.displayName || Component.name;\n        var newApiName = typeof Component.getDerivedStateFromProps === \"function\" ? \"getDerivedStateFromProps()\" : \"getSnapshotBeforeUpdate()\";\n        throw Error(\"Unsafe legacy lifecycles will not be called for components using new component APIs.\\n\\n\" + componentName + \" uses \" + newApiName + \" but also contains the following legacy lifecycles:\" + (foundWillMountName !== null ? \"\\n  \" + foundWillMountName : \"\") + (foundWillReceivePropsName !== null ? \"\\n  \" + foundWillReceivePropsName : \"\") + (foundWillUpdateName !== null ? \"\\n  \" + foundWillUpdateName : \"\") + \"\\n\\nThe above lifecycles should be removed. Learn more about this warning here:\\n\" + \"https://fb.me/react-async-component-lifecycle-hooks\");\n    }\n    // React <= 16.2 does not support static getDerivedStateFromProps.\n    // As a workaround, use cWM and cWRP to invoke the new static lifecycle.\n    // Newer versions of React will ignore these lifecycles if gDSFP exists.\n    if (typeof Component.getDerivedStateFromProps === \"function\") {\n        prototype.componentWillMount = componentWillMount;\n        prototype.componentWillReceiveProps = componentWillReceiveProps;\n    }\n    // React <= 16.2 does not support getSnapshotBeforeUpdate.\n    // As a workaround, use cWU to invoke the new lifecycle.\n    // Newer versions of React will ignore that lifecycle if gSBU exists.\n    if (typeof prototype.getSnapshotBeforeUpdate === \"function\") {\n        if (typeof prototype.componentDidUpdate !== \"function\") {\n            throw new Error(\"Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype\");\n        }\n        prototype.componentWillUpdate = componentWillUpdate;\n        var componentDidUpdate = prototype.componentDidUpdate;\n        prototype.componentDidUpdate = function componentDidUpdatePolyfill(prevProps, prevState, maybeSnapshot) {\n            // 16.3+ will not execute our will-update method;\n            // It will pass a snapshot value to did-update though.\n            // Older versions will require our polyfilled will-update value.\n            // We need to handle both cases, but can't just check for the presence of \"maybeSnapshot\",\n            // Because for <= 15.x versions this might be a \"prevContext\" object.\n            // We also can't just check \"__reactInternalSnapshot\",\n            // Because get-snapshot might return a falsy value.\n            // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.\n            var snapshot = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : maybeSnapshot;\n            componentDidUpdate.call(this, prevProps, prevState, snapshot);\n        };\n    }\n    return Component;\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vcmVhY3QtbGlmZWN5Y2xlcy1jb21wYXRAMy4wLjQvbm9kZV9tb2R1bGVzL3JlYWN0LWxpZmVjeWNsZXMtY29tcGF0L3JlYWN0LWxpZmVjeWNsZXMtY29tcGF0LmVzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7Q0FLQyxHQUVELFNBQVNBO0lBQ1Asc0RBQXNEO0lBQ3RELElBQUlDLFFBQVEsSUFBSSxDQUFDQyxXQUFXLENBQUNDLHdCQUF3QixDQUFDLElBQUksQ0FBQ0MsS0FBSyxFQUFFLElBQUksQ0FBQ0gsS0FBSztJQUM1RSxJQUFJQSxVQUFVLFFBQVFBLFVBQVVJLFdBQVc7UUFDekMsSUFBSSxDQUFDQyxRQUFRLENBQUNMO0lBQ2hCO0FBQ0Y7QUFFQSxTQUFTTSwwQkFBMEJDLFNBQVM7SUFDMUMsc0RBQXNEO0lBQ3RELGdGQUFnRjtJQUNoRixTQUFTQyxRQUFRQyxTQUFTO1FBQ3hCLElBQUlULFFBQVEsSUFBSSxDQUFDQyxXQUFXLENBQUNDLHdCQUF3QixDQUFDSyxXQUFXRTtRQUNqRSxPQUFPVCxVQUFVLFFBQVFBLFVBQVVJLFlBQVlKLFFBQVE7SUFDekQ7SUFDQSw0REFBNEQ7SUFDNUQsSUFBSSxDQUFDSyxRQUFRLENBQUNHLFFBQVFFLElBQUksQ0FBQyxJQUFJO0FBQ2pDO0FBRUEsU0FBU0Msb0JBQW9CSixTQUFTLEVBQUVLLFNBQVM7SUFDL0MsSUFBSTtRQUNGLElBQUlDLFlBQVksSUFBSSxDQUFDVixLQUFLO1FBQzFCLElBQUlNLFlBQVksSUFBSSxDQUFDVCxLQUFLO1FBQzFCLElBQUksQ0FBQ0csS0FBSyxHQUFHSTtRQUNiLElBQUksQ0FBQ1AsS0FBSyxHQUFHWTtRQUNiLElBQUksQ0FBQ0UsMkJBQTJCLEdBQUc7UUFDbkMsSUFBSSxDQUFDQyx1QkFBdUIsR0FBRyxJQUFJLENBQUNDLHVCQUF1QixDQUN6REgsV0FDQUo7SUFFSixTQUFVO1FBQ1IsSUFBSSxDQUFDTixLQUFLLEdBQUdVO1FBQ2Is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QUFDVDtBQUVvQiIsInNvdXJjZXMiOlsid2VicGFjazovL29tMzY1Ly4vbm9kZV9tb2R1bGVzLy5wbnBtL3JlYWN0LWxpZmVjeWNsZXMtY29tcGF0QDMuMC40L25vZGVfbW9kdWxlcy9yZWFjdC1saWZlY3ljbGVzLWNvbXBhdC9yZWFjdC1saWZlY3ljbGVzLWNvbXBhdC5lcy5qcz9kODcxIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAvLyBDYWxsIHRoaXMuY29uc3RydWN0b3IuZ0RTRlAgdG8gc3VwcG9ydCBzdWItY2xhc3Nlcy5cbiAgdmFyIHN0YXRlID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHModGhpcy5wcm9wcywgdGhpcy5zdGF0ZSk7XG4gIGlmIChzdGF0ZSAhPT0gbnVsbCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgLy8gQ2FsbCB0aGlzLmNvbnN0cnVjdG9yLmdEU0ZQIHRvIHN1cHBvcnQgc3ViLWNsYXNzZXMuXG4gIC8vIFVzZSB0aGUgc2V0U3RhdGUoKSB1cGRhdGVyIHRvIGVuc3VyZSBzdGF0ZSBpc24ndCBzdGFsZSBpbiBjZXJ0YWluIGVkZ2UgY2FzZXMuXG4gIGZ1bmN0aW9uIHVwZGF0ZXIocHJldlN0YXRlKSB7XG4gICAgdmFyIHN0YXRlID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMobmV4dFByb3BzLCBwcmV2U3RhdGUpO1xuICAgIHJldHVybiBzdGF0ZSAhPT0gbnVsbCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkID8gc3RhdGUgOiBudWxsO1xuICB9XG4gIC8vIEJpbmRpbmcgXCJ0aGlzXCIgaXMgaW1wb3J0YW50IGZvciBzaGFsbG93IHJlbmRlcmVyIHN1cHBvcnQuXG4gIHRoaXMuc2V0U3RhdGUodXBkYXRlci5iaW5kKHRoaXMpKTtcbn1cblxuZnVuY3Rpb24gY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICB0cnkge1xuICAgIHZhciBwcmV2UHJvcHMgPSB0aGlzLnByb3BzO1xuICAgIHZhciBwcmV2U3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMucHJvcHMgPSBuZXh0UHJvcHM7XG4gICAgdGhpcy5zdGF0ZSA9IG5leHRTdGF0ZTtcbiAgICB0aGlzLl9fcmVhY3RJbnRlcm5hbFNuYXBzaG90RmxhZyA9IHRydWU7XG4gICAgdGhpcy5fX3JlYWN0SW50ZXJuYWxTbmFwc2hvdCA9IHRoaXMuZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUoXG4gICAgICBwcmV2UHJvcHMsXG4gICAgICBwcmV2U3RhdGVcbiAgICApO1xuICB9IGZpbmFsbHkge1xuICAgIHRoaXMucHJvcHMgPSBwcmV2UHJvcHM7XG4gICAgdGhpcy5zdGF0ZSA9IHByZXZTdGF0ZTtcbiAgfVxufVxuXG4vLyBSZWFjdCBtYXkgd2FybiBhYm91dCBjV00vY1dSUC9jV1UgbWV0aG9kcyBiZWluZyBkZXByZWNhdGVkLlxuLy8gQWRkIGEgZmxhZyB0byBzdXBwcmVzcyB0aGVzZSB3YXJuaW5ncyBmb3IgdGhpcyBzcGVjaWFsIGNhc2UuXG5jb21wb25lbnRXaWxsTW91bnQuX19zdXBwcmVzc0RlcHJlY2F0aW9uV2FybmluZyA9IHRydWU7XG5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzLl9fc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmcgPSB0cnVlO1xuY29tcG9uZW50V2lsbFVwZGF0ZS5fX3N1cHByZXNzRGVwcmVjYXRpb25XYXJuaW5nID0gdHJ1ZTtcblxuZnVuY3Rpb24gcG9seWZpbGwoQ29tcG9uZW50KSB7XG4gIHZhciBwcm90b3R5cGUgPSBDb21wb25lbnQucHJvdG90eXBlO1xuXG4gIGlmICghcHJvdG90eXBlIHx8ICFwcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG9ubHkgcG9seWZpbGwgY2xhc3MgY29tcG9uZW50cycpO1xuICB9XG5cbiAgaWYgKFxuICAgIHR5cGVvZiBDb21wb25lbnQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzICE9PSAnZnVuY3Rpb24nICYmXG4gICAgdHlwZW9mIHByb3RvdHlwZS5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSAhPT0gJ2Z1bmN0aW9uJ1xuICApIHtcbiAgICByZXR1cm4gQ29tcG9uZW50O1xuICB9XG5cbiAgLy8gSWYgbmV3IGNvbXBvbmVudCBBUElzIGFyZSBkZWZpbmVkLCBcInVuc2FmZVwiIGxpZmVjeWNsZXMgd29uJ3QgYmUgY2FsbGVkLlxuICAvLyBFcnJvciBpZiBhbnkgb2YgdGhlc2UgbGlmZWN5Y2xlcyBhcmUgcHJlc2VudCxcbiAgLy8gQmVjYXVzZSB0aGV5IHdvdWxkIHdvcmsgZGlmZmVyZW50bHkgYmV0d2VlbiBvbGRlciBhbmQgbmV3ZXIgKDE2LjMrKSB2ZXJzaW9ucyBvZiBSZWFjdC5cbiAgdmFyIGZvdW5kV2lsbE1vdW50TmFtZSA9IG51bGw7XG4gIHZhciBmb3VuZFdpbGxSZWNlaXZlUHJvcHNOYW1lID0gbnVsbDtcbiAgdmFyIGZvdW5kV2lsbFVwZGF0ZU5hbWUgPSBudWxsO1xuICBpZiAodHlwZW9mIHByb3RvdHlwZS5jb21wb25lbnRXaWxsTW91bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBmb3VuZFdpbGxNb3VudE5hbWUgPSAnY29tcG9uZW50V2lsbE1vdW50JztcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvdG90eXBlLlVOU0FGRV9jb21wb25lbnRXaWxsTW91bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBmb3VuZFdpbGxNb3VudE5hbWUgPSAnVU5TQUZFX2NvbXBvbmVudFdpbGxNb3VudCc7XG4gIH1cbiAgaWYgKHR5cGVvZiBwcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZvdW5kV2lsbFJlY2VpdmVQcm9wc05hbWUgPSAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyc7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb3RvdHlwZS5VTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZvdW5kV2lsbFJlY2VpdmVQcm9wc05hbWUgPSAnVU5TQUZFX2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnO1xuICB9XG4gIGlmICh0eXBlb2YgcHJvdG90eXBlLmNvbXBvbmVudFdpbGxVcGRhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBmb3VuZFdpbGxVcGRhdGVOYW1lID0gJ2NvbXBvbmVudFdpbGxVcGRhdGUnO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm90b3R5cGUuVU5TQUZFX2NvbXBvbmVudFdpbGxVcGRhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBmb3VuZFdpbGxVcGRhdGVOYW1lID0gJ1VOU0FGRV9jb21wb25lbnRXaWxsVXBkYXRlJztcbiAgfVxuICBpZiAoXG4gICAgZm91bmRXaWxsTW91bnROYW1lICE9PSBudWxsIHx8XG4gICAgZm91bmRXaWxsUmVjZWl2ZVByb3BzTmFtZSAhPT0gbnVsbCB8fFxuICAgIGZvdW5kV2lsbFVwZGF0ZU5hbWUgIT09IG51bGxcbiAgKSB7XG4gICAgdmFyIGNvbXBvbmVudE5hbWUgPSBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWU7XG4gICAgdmFyIG5ld0FwaU5hbWUgPVxuICAgICAgdHlwZW9mIENvbXBvbmVudC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyAnZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKCknXG4gICAgICAgIDogJ2dldFNuYXBzaG90QmVmb3JlVXBkYXRlKCknO1xuXG4gICAgdGhyb3cgRXJyb3IoXG4gICAgICAnVW5zYWZlIGxlZ2FjeSBsaWZlY3ljbGVzIHdpbGwgbm90IGJlIGNhbGxlZCBmb3IgY29tcG9uZW50cyB1c2luZyBuZXcgY29tcG9uZW50IEFQSXMuXFxuXFxuJyArXG4gICAgICAgIGNvbXBvbmVudE5hbWUgK1xuICAgICAgICAnIHVzZXMgJyArXG4gICAgICAgIG5ld0FwaU5hbWUgK1xuICAgICAgICAnIGJ1dCBhbHNvIGNvbnRhaW5zIHRoZSBmb2xsb3dpbmcgbGVnYWN5IGxpZmVjeWNsZXM6JyArXG4gICAgICAgIChmb3VuZFdpbGxNb3VudE5hbWUgIT09IG51bGwgPyAnXFxuICAnICsgZm91bmRXaWxsTW91bnROYW1lIDogJycpICtcbiAgICAgICAgKGZvdW5kV2lsbFJlY2VpdmVQcm9wc05hbWUgIT09IG51bGxcbiAgICAgICAgICA/ICdcXG4gICcgKyBmb3VuZFdpbGxSZWNlaXZlUHJvcHNOYW1lXG4gICAgICAgICAgOiAnJykgK1xuICAgICAgICAoZm91bmRXaWxsVXBkYXRlTmFtZSAhPT0gbnVsbCA/ICdcXG4gICcgKyBmb3VuZFdpbGxVcGRhdGVOYW1lIDogJycpICtcbiAgICAgICAgJ1xcblxcblRoZSBhYm92ZSBsaWZlY3ljbGVzIHNob3VsZCBiZSByZW1vdmVkLiBMZWFybiBtb3JlIGFib3V0IHRoaXMgd2FybmluZyBoZXJlOlxcbicgK1xuICAgICAgICAnaHR0cHM6Ly9mYi5tZS9yZWFjdC1hc3luYy1jb21wb25lbnQtbGlmZWN5Y2xlLWhvb2tzJ1xuICAgICk7XG4gIH1cblxuICAvLyBSZWFjdCA8PSAxNi4yIGRvZXMgbm90IHN1cHBvcnQgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcy5cbiAgLy8gQXMgYSB3b3JrYXJvdW5kLCB1c2UgY1dNIGFuZCBjV1JQIHRvIGludm9rZSB0aGUgbmV3IHN0YXRpYyBsaWZlY3ljbGUuXG4gIC8vIE5ld2VyIHZlcnNpb25zIG9mIFJlYWN0IHdpbGwgaWdub3JlIHRoZXNlIGxpZmVjeWNsZXMgaWYgZ0RTRlAgZXhpc3RzLlxuICBpZiAodHlwZW9mIENvbXBvbmVudC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBwcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gY29tcG9uZW50V2lsbE1vdW50O1xuICAgIHByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcztcbiAgfVxuXG4gIC8vIFJlYWN0IDw9IDE2LjIgZG9lcyBub3Qgc3VwcG9ydCBnZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZS5cbiAgLy8gQXMgYSB3b3JrYXJvdW5kLCB1c2UgY1dVIHRvIGludm9rZSB0aGUgbmV3IGxpZmVjeWNsZS5cbiAgLy8gTmV3ZXIgdmVyc2lvbnMgb2YgUmVhY3Qgd2lsbCBpZ25vcmUgdGhhdCBsaWZlY3ljbGUgaWYgZ1NCVSBleGlzdHMuXG4gIGlmICh0eXBlb2YgcHJvdG90eXBlLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKHR5cGVvZiBwcm90b3R5cGUuY29tcG9uZW50RGlkVXBkYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdDYW5ub3QgcG9seWZpbGwgZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUoKSBmb3IgY29tcG9uZW50cyB0aGF0IGRvIG5vdCBkZWZpbmUgY29tcG9uZW50RGlkVXBkYXRlKCkgb24gdGhlIHByb3RvdHlwZSdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdG90eXBlLmNvbXBvbmVudFdpbGxVcGRhdGUgPSBjb21wb25lbnRXaWxsVXBkYXRlO1xuXG4gICAgdmFyIGNvbXBvbmVudERpZFVwZGF0ZSA9IHByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGU7XG5cbiAgICBwcm90b3R5cGUuY29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlUG9seWZpbGwoXG4gICAgICBwcmV2UHJvcHMsXG4gICAgICBwcmV2U3RhdGUsXG4gICAgICBtYXliZVNuYXBzaG90XG4gICAgKSB7XG4gICAgICAvLyAxNi4zKyB3aWxsIG5vdCBleGVjdXRlIG91ciB3aWxsLXVwZGF0ZSBtZXRob2Q7XG4gICAgICAvLyBJdCB3aWxsIHBhc3MgYSBzbmFwc2hvdCB2YWx1ZSB0byBkaWQtdXBkYXRlIHRob3VnaC5cbiAgICAgIC8vIE9sZGVyIHZlcnNpb25zIHdpbGwgcmVxdWlyZSBvdXIgcG9seWZpbGxlZCB3aWxsLXVwZGF0ZSB2YWx1ZS5cbiAgICAgIC8vIFdlIG5lZWQgdG8gaGFuZGxlIGJvdGggY2FzZXMsIGJ1dCBjYW4ndCBqdXN0IGNoZWNrIGZvciB0aGUgcHJlc2VuY2Ugb2YgXCJtYXliZVNuYXBzaG90XCIsXG4gICAgICAvLyBCZWNhdXNlIGZvciA8PSAxNS54IHZlcnNpb25zIHRoaXMgbWlnaHQgYmUgYSBcInByZXZDb250ZXh0XCIgb2JqZWN0LlxuICAgICAgLy8gV2UgYWxzbyBjYW4ndCBqdXN0IGNoZWNrIFwiX19yZWFjdEludGVybmFsU25hcHNob3RcIixcbiAgICAgIC8vIEJlY2F1c2UgZ2V0LXNuYXBzaG90IG1pZ2h0IHJldHVybiBhIGZhbHN5IHZhbHVlLlxuICAgICAgLy8gU28gY2hlY2sgZm9yIHRoZSBleHBsaWNpdCBfX3JlYWN0SW50ZXJuYWxTbmFwc2hvdEZsYWcgZmxhZyB0byBkZXRlcm1pbmUgYmVoYXZpb3IuXG4gICAgICB2YXIgc25hcHNob3QgPSB0aGlzLl9fcmVhY3RJbnRlcm5hbFNuYXBzaG90RmxhZ1xuICAgICAgICA/IHRoaXMuX19yZWFjdEludGVybmFsU25hcHNob3RcbiAgICAgICAgOiBtYXliZVNuYXBzaG90O1xuXG4gICAgICBjb21wb25lbnREaWRVcGRhdGUuY2FsbCh0aGlzLCBwcmV2UHJvcHMsIHByZXZTdGF0ZSwgc25hcHNob3QpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gQ29tcG9uZW50O1xufVxuXG5leHBvcnQgeyBwb2x5ZmlsbCB9O1xuIl0sIm5hbWVzIjpbImNvbXBvbmVudFdpbGxNb3VudCIsInN0YXRlIiwiY29uc3RydWN0b3IiLCJnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMiLCJwcm9wcyIsInVuZGVmaW5lZCIsInNldFN0YXRlIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsInVwZGF0ZXIiLCJwcmV2U3RhdGUiLCJiaW5kIiwiY29tcG9uZW50V2lsbFVwZGF0ZSIsIm5leHRTdGF0ZSIsInByZXZQcm9wcyIsIl9fcmVhY3RJbnRlcm5hbFNuYXBzaG90RmxhZyIsIl9fcmVhY3RJbnRlcm5hbFNuYXBzaG90IiwiZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUiLCJfX3N1cHByZXNzRGVwcmVjYXRpb25XYXJuaW5nIiwicG9seWZpbGwiLCJDb21wb25lbnQiLCJwcm90b3R5cGUiLCJpc1JlYWN0Q29tcG9uZW50IiwiRXJyb3IiLCJmb3VuZFdpbGxNb3VudE5hbWUiLCJmb3VuZFdpbGxSZWNlaXZlUHJvcHNOYW1lIiwiZm91bmRXaWxsVXBkYXRlTmFtZSIsIlVOU0FGRV9jb21wb25lbnRXaWxsTW91bnQiLCJVTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIlVOU0FGRV9jb21wb25lbnRXaWxsVXBkYXRlIiwiY29tcG9uZW50TmFtZSIsImRpc3BsYXlOYW1lIiwibmFtZSIsIm5ld0FwaU5hbWUiLCJjb21wb25lbnREaWRVcGRhdGUiLCJjb21wb25lbnREaWRVcGRhdGVQb2x5ZmlsbCIsIm1heWJlU25hcHNob3QiLCJzbmFwc2hvdCIsImNhbGwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/react-lifecycles-compat@3.0.4/node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js\n");

/***/ })

};
;