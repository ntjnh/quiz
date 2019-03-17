"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Questions =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Questions, _React$Component);

  function Questions(props) {
    var _this;

    _classCallCheck(this, Questions);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Questions).call(this, props));
    _this.state = {
      error: null,
      isLoaded: false,
      questions: []
    };
    return _this;
  }

  _createClass(Questions, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch("https://opentdb.com/api.php?amount=20&type=multiple").then(function (res) {
        return res.json();
      }).then(function (result) {
        _this2.setState({
          isLoaded: true,
          questions: result.results
        });
      }, function (error) {
        _this2.setState({
          isLoaded: true,
          error: error
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          error = _this$state.error,
          isLoaded = _this$state.isLoaded,
          questions = _this$state.questions;

      if (error) {
        return _react.default.createElement("div", null, "Error: ", error.message);
      } else if (!isLoaded) {
        return _react.default.createElement("div", null, "Loading...");
      } else {
        return _react.default.createElement("div", null, questions.map(function (question, i) {
          return _react.default.createElement("div", {
            className: "question",
            key: "q-" + (i + 1)
          }, _react.default.createElement("h3", {
            className: "question-text"
          }, question.question), _react.default.createElement("div", {
            className: "choices-wrapper"
          }, question.incorrect_answers.map(function (choice, k) {
            return _react.default.createElement("div", {
              className: "choice",
              key: 'choices-' + k
            }, _react.default.createElement("label", {
              className: "choice-text"
            }, choice, _react.default.createElement("input", {
              type: "radio",
              name: 'q-' + (i + 1),
              value: choice,
              className: "choice-radio"
            }), _react.default.createElement("span", {
              className: "choice-selected"
            })));
          })));
        }));
      }
    }
  }]);

  return Questions;
}(_react.default.Component);

var _default = Questions;
exports.default = _default;