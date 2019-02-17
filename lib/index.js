"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEffect;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function createEffect(effectCreator) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var ref = useRef({});
    ref.current.args = args;
    var dependencies = args.filter(function (arg) {
      return typeof arg !== "function";
    });
    useEffect(function () {
      var referencedArgs = args.map(function (arg, index) {
        if (typeof arg === "function") {
          return function () {
            var _ref$current$args;

            (_ref$current$args = ref.current.args)[index].apply(_ref$current$args, arguments);
          };
        }

        return arg;
      });
      return effectCreator.apply(void 0, _toConsumableArray(referencedArgs));
    }, dependencies);
  };
}
