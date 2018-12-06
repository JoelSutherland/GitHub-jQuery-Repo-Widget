//
//  Generated by https://www.npmjs.com/package/amd-bundle
//
(function (factory) {

    if ((typeof define === 'function')  &&  define.amd)
        define('mark-down', ["web-cell","marked"], factory);
    else if (typeof module === 'object')
        return  module.exports = factory.call(global,require('web-cell'),require('marked'));
    else
        return  this['mark-down'] = factory.call(self,this['web-cell'],this['marked']);

})(function (web_cell,marked) {

function merge(base, path) {
  return (base + '/' + path).replace(/\/\//g, '/').replace(/[^/.]+\/\.\.\//g, '').replace(/\.\//g, function (match, index, input) {
    return input[index - 1] === '.' ? match : '';
  });
}

function outPackage(name) {
  return /^[^./]/.test(name);
}

    var require = (typeof module === 'object') ?
        function () {

            return  module.require.apply(module, arguments);
        } : (
            this.require  ||  function (name) {

                if (self[name] != null)  return self[name];

                throw ReferenceError('Can\'t find "' + name + '" module');
            }
        );

    var _include_ = include.bind(null, './');

    function include(base, path) {

        path = outPackage( path )  ?  path  :  ('./' + merge(base, path));

        var module = _module_[path], exports;

        if (! module)  return require(path);

        if (! module.exports) {

            module.exports = { };

            var dependency = module.dependency;

            for (var i = 0;  dependency[i];  i++)
                module.dependency[i] = _include_( dependency[i] );

            exports = module.factory.apply(
                null,  module.dependency.concat(
                    include.bind(null, module.base),  module.exports,  module
                )
            );

            if (exports != null)  module.exports = exports;

            delete module.dependency;  delete module.factory;
        }

        return module.exports;
    }

function _typeof(obj) {
    if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj &&
                typeof Symbol === 'function' &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj;
        };
    }
    return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError(
            'Super expression must either be null or a function'
        );
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, writable: true, configurable: true }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf =
        Object.setPrototypeOf ||
        function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
    return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
        );
    }
    return self;
}

function _decorate(decorators, factory, superClass) {
    var r = factory(function initialize(O) {
        _initializeInstanceElements(O, decorated.elements);
    }, superClass);
    var decorated = _decorateClass(
        _coalesceClassElements(r.d.map(_createElementDescriptor)),
        decorators
    );
    _initializeClassElements(r.F, decorated.elements);
    return _runClassFinishers(r.F, decorated.finishers);
}

function _createElementDescriptor(def) {
    var key = _toPropertyKey(def.key);
    var descriptor;
    if (def.kind === 'method') {
        descriptor = {
            value: def.value,
            writable: true,
            configurable: true,
            enumerable: false
        };
        Object.defineProperty(def.value, 'name', {
            value: _typeof(key) === 'symbol' ? '' : key,
            configurable: true
        });
    } else if (def.kind === 'get') {
        descriptor = { get: def.value, configurable: true, enumerable: false };
    } else if (def.kind === 'set') {
        descriptor = { set: def.value, configurable: true, enumerable: false };
    } else if (def.kind === 'field') {
        descriptor = { configurable: true, writable: true, enumerable: true };
    }
    var element = {
        kind: def.kind === 'field' ? 'field' : 'method',
        key: key,
        placement: def.static
            ? 'static'
            : def.kind === 'field'
            ? 'own'
            : 'prototype',
        descriptor: descriptor
    };
    if (def.decorators) element.decorators = def.decorators;
    if (def.kind === 'field') element.initializer = def.value;
    return element;
}

function _coalesceGetterSetter(element, other) {
    if (element.descriptor.get !== undefined) {
        other.descriptor.get = element.descriptor.get;
    } else {
        other.descriptor.set = element.descriptor.set;
    }
}

function _coalesceClassElements(elements) {
    var newElements = [];
    var isSameElement = function isSameElement(other) {
        return (
            other.kind === 'method' &&
            other.key === element.key &&
            other.placement === element.placement
        );
    };
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var other;
        if (
            element.kind === 'method' &&
            (other = newElements.find(isSameElement))
        ) {
            if (
                _isDataDescriptor(element.descriptor) ||
                _isDataDescriptor(other.descriptor)
            ) {
                if (_hasDecorators(element) || _hasDecorators(other)) {
                    throw new ReferenceError(
                        'Duplicated methods (' +
                            element.key +
                            ") can't be decorated."
                    );
                }
                other.descriptor = element.descriptor;
            } else {
                if (_hasDecorators(element)) {
                    if (_hasDecorators(other)) {
                        throw new ReferenceError(
                            "Decorators can't be placed on different accessors with for " +
                                'the same property (' +
                                element.key +
                                ').'
                        );
                    }
                    other.decorators = element.decorators;
                }
                _coalesceGetterSetter(element, other);
            }
        } else {
            newElements.push(element);
        }
    }
    return newElements;
}

function _hasDecorators(element) {
    return element.decorators && element.decorators.length;
}

function _isDataDescriptor(desc) {
    return (
        desc !== undefined &&
        !(desc.value === undefined && desc.writable === undefined)
    );
}

function _initializeClassElements(F, elements) {
    var proto = F.prototype;
    ['method', 'field'].forEach(function(kind) {
        elements.forEach(function(element) {
            var placement = element.placement;
            if (
                element.kind === kind &&
                (placement === 'static' || placement === 'prototype')
            ) {
                var receiver = placement === 'static' ? F : proto;
                _defineClassElement(receiver, element);
            }
        });
    });
}

function _initializeInstanceElements(O, elements) {
    ['method', 'field'].forEach(function(kind) {
        elements.forEach(function(element) {
            if (element.kind === kind && element.placement === 'own') {
                _defineClassElement(O, element);
            }
        });
    });
}

function _defineClassElement(receiver, element) {
    var descriptor = element.descriptor;
    if (element.kind === 'field') {
        var initializer = element.initializer;
        descriptor = {
            enumerable: descriptor.enumerable,
            writable: descriptor.writable,
            configurable: descriptor.configurable,
            value: initializer === void 0 ? void 0 : initializer.call(receiver)
        };
    }
    Object.defineProperty(receiver, element.key, descriptor);
}

function _decorateClass(elements, decorators) {
    var newElements = [];
    var finishers = [];
    var placements = { static: [], prototype: [], own: [] };
    elements.forEach(function(element) {
        _addElementPlacement(element, placements);
    });
    elements.forEach(function(element) {
        if (!_hasDecorators(element)) return newElements.push(element);
        var elementFinishersExtras = _decorateElement(element, placements);
        newElements.push(elementFinishersExtras.element);
        newElements.push.apply(newElements, elementFinishersExtras.extras);
        finishers.push.apply(finishers, elementFinishersExtras.finishers);
    });
    if (!decorators) {
        return { elements: newElements, finishers: finishers };
    }
    var result = _decorateConstructor(newElements, decorators);
    finishers.push.apply(finishers, result.finishers);
    result.finishers = finishers;
    return result;
}

function _addElementPlacement(element, placements, silent) {
    var keys = placements[element.placement];
    if (!silent && keys.indexOf(element.key) !== -1) {
        throw new TypeError('Duplicated element (' + element.key + ')');
    }
    keys.push(element.key);
}

function _decorateElement(element, placements) {
    var extras = [];
    var finishers = [];
    for (
        var decorators = element.decorators, i = decorators.length - 1;
        i >= 0;
        i--
    ) {
        var keys = placements[element.placement];
        keys.splice(keys.indexOf(element.key), 1);
        var elementObject = _fromElementDescriptor(element);
        var elementFinisherExtras = _toElementFinisherExtras(
            (0, decorators[i])(elementObject) || elementObject
        );
        element = elementFinisherExtras.element;
        _addElementPlacement(element, placements);
        if (elementFinisherExtras.finisher) {
            finishers.push(elementFinisherExtras.finisher);
        }
        var newExtras = elementFinisherExtras.extras;
        if (newExtras) {
            for (var j = 0; j < newExtras.length; j++) {
                _addElementPlacement(newExtras[j], placements);
            }
            extras.push.apply(extras, newExtras);
        }
    }
    return { element: element, finishers: finishers, extras: extras };
}

function _decorateConstructor(elements, decorators) {
    var finishers = [];
    for (var i = decorators.length - 1; i >= 0; i--) {
        var obj = _fromClassDescriptor(elements);
        var elementsAndFinisher = _toClassDescriptor(
            (0, decorators[i])(obj) || obj
        );
        if (elementsAndFinisher.finisher !== undefined) {
            finishers.push(elementsAndFinisher.finisher);
        }
        if (elementsAndFinisher.elements !== undefined) {
            elements = elementsAndFinisher.elements;
            for (var j = 0; j < elements.length - 1; j++) {
                for (var k = j + 1; k < elements.length; k++) {
                    if (
                        elements[j].key === elements[k].key &&
                        elements[j].placement === elements[k].placement
                    ) {
                        throw new TypeError(
                            'Duplicated element (' + elements[j].key + ')'
                        );
                    }
                }
            }
        }
    }
    return { elements: elements, finishers: finishers };
}

function _fromElementDescriptor(element) {
    var obj = {
        kind: element.kind,
        key: element.key,
        placement: element.placement,
        descriptor: element.descriptor
    };
    var desc = { value: 'Descriptor', configurable: true };
    Object.defineProperty(obj, Symbol.toStringTag, desc);
    if (element.kind === 'field') obj.initializer = element.initializer;
    return obj;
}

function _toElementDescriptors(elementObjects) {
    if (elementObjects === undefined) return;
    return _toArray(elementObjects).map(function(elementObject) {
        var element = _toElementDescriptor(elementObject);
        _disallowProperty(elementObject, 'finisher', 'An element descriptor');
        _disallowProperty(elementObject, 'extras', 'An element descriptor');
        return element;
    });
}

function _toElementDescriptor(elementObject) {
    var kind = String(elementObject.kind);
    if (kind !== 'method' && kind !== 'field') {
        throw new TypeError(
            'An element descriptor\'s .kind property must be either "method" or' +
                ' "field", but a decorator created an element descriptor with' +
                ' .kind "' +
                kind +
                '"'
        );
    }
    var key = _toPropertyKey(elementObject.key);
    var placement = String(elementObject.placement);
    if (
        placement !== 'static' &&
        placement !== 'prototype' &&
        placement !== 'own'
    ) {
        throw new TypeError(
            'An element descriptor\'s .placement property must be one of "static",' +
                ' "prototype" or "own", but a decorator created an element descriptor' +
                ' with .placement "' +
                placement +
                '"'
        );
    }
    var descriptor = elementObject.descriptor;
    _disallowProperty(elementObject, 'elements', 'An element descriptor');
    var element = {
        kind: kind,
        key: key,
        placement: placement,
        descriptor: Object.assign({}, descriptor)
    };
    if (kind !== 'field') {
        _disallowProperty(elementObject, 'initializer', 'A method descriptor');
    } else {
        _disallowProperty(
            descriptor,
            'get',
            'The property descriptor of a field descriptor'
        );
        _disallowProperty(
            descriptor,
            'set',
            'The property descriptor of a field descriptor'
        );
        _disallowProperty(
            descriptor,
            'value',
            'The property descriptor of a field descriptor'
        );
        element.initializer = elementObject.initializer;
    }
    return element;
}

function _toElementFinisherExtras(elementObject) {
    var element = _toElementDescriptor(elementObject);
    var finisher = _optionalCallableProperty(elementObject, 'finisher');
    var extras = _toElementDescriptors(elementObject.extras);
    return { element: element, finisher: finisher, extras: extras };
}

function _fromClassDescriptor(elements) {
    var obj = { kind: 'class', elements: elements.map(_fromElementDescriptor) };
    var desc = { value: 'Descriptor', configurable: true };
    Object.defineProperty(obj, Symbol.toStringTag, desc);
    return obj;
}

function _toClassDescriptor(obj) {
    var kind = String(obj.kind);
    if (kind !== 'class') {
        throw new TypeError(
            'A class descriptor\'s .kind property must be "class", but a decorator' +
                ' created a class descriptor with .kind "' +
                kind +
                '"'
        );
    }
    _disallowProperty(obj, 'key', 'A class descriptor');
    _disallowProperty(obj, 'placement', 'A class descriptor');
    _disallowProperty(obj, 'descriptor', 'A class descriptor');
    _disallowProperty(obj, 'initializer', 'A class descriptor');
    _disallowProperty(obj, 'extras', 'A class descriptor');
    var finisher = _optionalCallableProperty(obj, 'finisher');
    var elements = _toElementDescriptors(obj.elements);
    return { elements: elements, finisher: finisher };
}

function _disallowProperty(obj, name, objectType) {
    if (obj[name] !== undefined) {
        throw new TypeError(
            objectType + " can't have a ." + name + ' property.'
        );
    }
}

function _optionalCallableProperty(obj, name) {
    var value = obj[name];
    if (value !== undefined && typeof value !== 'function') {
        throw new TypeError("Expected '" + name + "' to be a function");
    }
    return value;
}

function _runClassFinishers(constructor, finishers) {
    for (var i = 0; i < finishers.length; i++) {
        var newConstructor = (0, finishers[i])(constructor);
        if (newConstructor !== undefined) {
            if (typeof newConstructor !== 'function') {
                throw new TypeError('Finishers must return a constructor.');
            }
            constructor = newConstructor;
        }
    }
    return constructor;
}

function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, 'string');
    return _typeof(key) === 'symbol' ? key : String(key);
}

function _toPrimitive(input, hint) {
    if (_typeof(input) !== 'object' || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || 'default');
        if (_typeof(res) !== 'object') return res;
        throw new TypeError('@@toPrimitive must return a primitive value.');
    }
    return (hint === 'string' ? String : Number)(input);
}

function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
}

function _nonIterableRest() {
    throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArray(iter) {
    if (
        Symbol.iterator in Object(iter) ||
        Object.prototype.toString.call(iter) === '[object Arguments]'
    )
        return Array.from(iter);
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

function _get(target, property, receiver) {
    if (typeof Reflect !== 'undefined' && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}

function set(target, property, value, receiver) {
    if (typeof Reflect !== 'undefined' && Reflect.set) {
        set = Reflect.set;
    } else {
        set = function set(target, property, value, receiver) {
            var base = _superPropBase(target, property);
            var desc;
            if (base) {
                desc = Object.getOwnPropertyDescriptor(base, property);
                if (desc.set) {
                    desc.set.call(receiver, value);
                    return true;
                } else if (!desc.writable) {
                    return false;
                }
            }
            desc = Object.getOwnPropertyDescriptor(receiver, property);
            if (desc) {
                if (!desc.writable) {
                    return false;
                }
                desc.value = value;
                Object.defineProperty(receiver, property, desc);
            } else {
                _defineProperty(receiver, property, value);
            }
            return true;
        };
    }
    return set(target, property, value, receiver);
}

function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) {
        throw new Error('failed to set property');
    }
    return value;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function _getPrototypeOf(o) {
              return o.__proto__ || Object.getPrototypeOf(o);
          };
    return _getPrototypeOf(o);
}

var _module_ = {
    './index': {
        base: '.',
        dependency: [],
        factory: function factory(require, exports, module) {
            Object.defineProperty(exports, '__esModule', {
                value: true
            });
            exports.default = void 0;

            var _webCell = require('web-cell');

            var _marked = _interopRequireDefault(require('marked'));

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule
                    ? obj
                    : {
                          default: obj
                      };
            }

            var MD_raw = new WeakMap();

            var MarkDown = _decorate(
                [
                    (0, _webCell.component)({
                        template: '<slot></slot>',
                        style:
                            '\n        :host {\n            display: block;\n            outline: none;\n        }'
                    })
                ],
                function(_initialize, _HTMLElement) {
                    var MarkDown =
                        /*#__PURE__*/
                        (function(_HTMLElement2) {
                            _inherits(MarkDown, _HTMLElement2);

                            function MarkDown() {
                                var _temp, _this;

                                _classCallCheck(this, MarkDown);

                                ((_temp = _this = _possibleConstructorReturn(
                                    this,
                                    _getPrototypeOf(MarkDown).call(this)
                                )),
                                _initialize(
                                    _assertThisInitialized(
                                        _assertThisInitialized(_this)
                                    )
                                ),
                                _temp).buildDOM();
                                return _this;
                            }

                            return MarkDown;
                        })(_HTMLElement);

                    return {
                        F: MarkDown,
                        d: [
                            {
                                kind: 'set',
                                key: 'innerHTML',
                                value: function value(raw) {
                                    raw = (raw + '').trim();
                                    MD_raw.set(this, raw);

                                    _set(
                                        _getPrototypeOf(MarkDown.prototype),
                                        'innerHTML',
                                        (0, _marked.default)(raw),
                                        this,
                                        true
                                    );
                                }
                            },
                            {
                                kind: 'get',
                                key: 'innerHTML',
                                value: function value() {
                                    return _get(
                                        _getPrototypeOf(MarkDown.prototype),
                                        'innerHTML',
                                        this
                                    );
                                }
                            },
                            {
                                kind: 'get',
                                key: 'textContent',
                                value: function value() {
                                    return MD_raw.get(this);
                                }
                            },
                            {
                                kind: 'set',
                                key: 'textContent',
                                value: function value(raw) {
                                    MD_raw.set(
                                        this,
                                        _set(
                                            _getPrototypeOf(MarkDown.prototype),
                                            'textContent',
                                            raw,
                                            this,
                                            true
                                        )
                                    );
                                }
                            }
                        ]
                    };
                },
                HTMLElement
            );

            exports.default = MarkDown;
        }
    },
    'web-cell': {
        exports: web_cell
    },
    marked: {
        exports: marked
    }
};

    return _include_('./index');
});