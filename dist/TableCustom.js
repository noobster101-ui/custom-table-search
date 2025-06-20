"use strict";
"use client";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.setRootThemeColors = setRootThemeColors;
var _react = require("react");
var _reactBootstrap = require("react-bootstrap");
require("./TableCustom.css");
var _jsxRuntime = require("react/jsx-runtime");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function setRootThemeColors(bgColor, txtColor, borderColor) {
  document.documentElement.style.setProperty("--back-color", bgColor);
  document.documentElement.style.setProperty("--txt-color", txtColor);
  document.documentElement.style.setProperty("--border-color", borderColor);
}
var CustomCell = function CustomCell(_ref) {
  var children = _ref.children,
    _ref$tdProps = _ref.tdProps,
    tdProps = _ref$tdProps === void 0 ? {} : _ref$tdProps,
    column = _ref.column;
  var dynamicStyle = column !== null && column !== void 0 && column.customStyle ? column.customStyle(children) : {
    textAlign: (column === null || column === void 0 ? void 0 : column.textAlign) || "center"
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", _objectSpread(_objectSpread({}, tdProps), {}, {
    style: _objectSpread(_objectSpread({}, dynamicStyle), tdProps.style),
    children: children
  }));
};
var TableCustom = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var data = _ref2.data,
    columns = _ref2.columns,
    _ref2$groupedColumns = _ref2.groupedColumns,
    groupedColumns = _ref2$groupedColumns === void 0 ? [] : _ref2$groupedColumns,
    _ref2$gridViewEnabled = _ref2.gridViewEnabled,
    gridViewEnabled = _ref2$gridViewEnabled === void 0 ? true : _ref2$gridViewEnabled,
    _ref2$entriesEnabled = _ref2.entriesEnabled,
    entriesEnabled = _ref2$entriesEnabled === void 0 ? true : _ref2$entriesEnabled,
    _ref2$paginationEnabl = _ref2.paginationEnabled,
    paginationEnabled = _ref2$paginationEnabl === void 0 ? true : _ref2$paginationEnabl,
    _ref2$currentPage = _ref2.currentPage,
    currentPage = _ref2$currentPage === void 0 ? 1 : _ref2$currentPage,
    setCurrentPage = _ref2.setCurrentPage,
    fetchPage = _ref2.fetchPage,
    _ref2$pageSize = _ref2.pageSize,
    pageSize = _ref2$pageSize === void 0 ? 12 : _ref2$pageSize,
    setPageSize = _ref2.setPageSize,
    totalRecords = _ref2.totalRecords,
    _ref2$entriesOptions = _ref2.entriesOptions,
    entriesOptions = _ref2$entriesOptions === void 0 ? [12, 24, 48, 108] : _ref2$entriesOptions,
    _ref2$defaultPageSize = _ref2.defaultPageSize,
    defaultPageSize = _ref2$defaultPageSize === void 0 ? 12 : _ref2$defaultPageSize,
    _ref2$bgColor = _ref2.bgColor,
    bgColor = _ref2$bgColor === void 0 ? "#0d6efd" : _ref2$bgColor,
    _ref2$txtColor = _ref2.txtColor,
    txtColor = _ref2$txtColor === void 0 ? "#fff" : _ref2$txtColor,
    _ref2$borderColor = _ref2.borderColor,
    borderColor = _ref2$borderColor === void 0 ? "#ddd" : _ref2$borderColor;
  (0, _react.useEffect)(function () {
    // Set theme colors based on props
    setRootThemeColors(bgColor, txtColor, borderColor);
  }, [bgColor, txtColor, borderColor]);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    gridView = _useState2[0],
    setGridView = _useState2[1];
  var _useState3 = (0, _react.useState)({}),
    _useState4 = _slicedToArray(_useState3, 2),
    searchValues = _useState4[0],
    setSearchValues = _useState4[1]; // Object to store search values per column
  var _useState5 = (0, _react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    sortConfig = _useState6[0],
    setSortConfig = _useState6[1]; // Array to store sort columns and directions
  var _useState7 = (0, _react.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    selectedSearchColumns = _useState8[0],
    setSelectedSearchColumns = _useState8[1];
  var _useState9 = (0, _react.useState)({}),
    _useState10 = _slicedToArray(_useState9, 2),
    sqlOptions = _useState10[0],
    setSqlOptions = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    isConditionRemoved = _useState12[0],
    setIsConditionRemoved = _useState12[1];
  var searchCriteria = _getSearchCriteria();
  var searchValuesRef = useRef(searchValues);
  var sqlOptionsRef = useRef(sqlOptions);
  var selectedSearchColumnsRef = useRef(selectedSearchColumns);
  setSearchValues(function (prev) {
    var updated = _objectSpread(_objectSpread({}, prev), yourChanges);
    searchValuesRef.current = updated;
    return updated;
  });
  setSqlOptions(function (prev) {
    var updated = _objectSpread(_objectSpread({}, prev), yourChanges);
    sqlOptionsRef.current = updated;
    return updated;
  });
  setSelectedSearchColumns(function (prev) {
    var updated = _toConsumableArray(yourUpdatedArray);
    selectedSearchColumnsRef.current = updated;
    return updated;
  });
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getSearchValues: function getSearchValues() {
        return searchValues;
      },
      getSortConfig: function getSortConfig() {
        return sortConfig;
      },
      getSelectedSearchColumns: function getSelectedSearchColumns() {
        return selectedSearchColumns;
      },
      getSearchCriteria: function getSearchCriteria() {
        return _getSearchCriteria();
      }
    };
  });
  (0, _react.useEffect)(function () {
    if (isConditionRemoved) {
      handleSearchAndSortSubmit();
      setIsConditionRemoved(false);
    }
  }, [searchValues, isConditionRemoved]);
  var sqlOperations = ["AND", "OR"];
  var sqlOperations2 = ["LIKE", "EQUAL", "CONTAINS", "STARTWITH", "ENDWITH", "ISNULL", "ISNOTNULL"];

  // Set default page size if specified
  (0, _react.useEffect)(function () {
    setPageSize(defaultPageSize);
  }, [defaultPageSize, setPageSize]);
  var handlePageSizeChange = function handlePageSizeChange(e) {
    var newSize = Number(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1); // Reset to page 1
    searchCriteria = _getSearchCriteria();
    fetchPage(1, newSize, searchCriteria, sortConfig);
  };

  // Calculate total pages based on totalRecords and pageSize
  var totalPages = Math.ceil(totalRecords / pageSize);

  // Calculate starting serial number for the current page
  var srno = (currentPage - 1) * pageSize + 1;

  // Add a new condition within the same column
  var handleAddCondition = function handleAddCondition(key) {
    setSearchValues(function (prevValues) {
      var updatedValues = _objectSpread({}, prevValues);
      updatedValues[key] = updatedValues[key] ? [].concat(_toConsumableArray(updatedValues[key]), [{
        value: "",
        operator: "LIKE",
        localConnector: "OR"
      }]) : [{
        value: "",
        operator: "LIKE",
        localConnector: "OR"
      }];
      return updatedValues;
    });
  };

  // Handle value change for a specific condition within a column
  var handleSearchValueChange = function handleSearchValueChange(key, index, field, value) {
    setSearchValues(function (prevValues) {
      var updatedValues = _objectSpread({}, prevValues);
      if (!updatedValues[key]) updatedValues[key] = [];
      if (!updatedValues[key][index]) updatedValues[key][index] = {
        value: "",
        operator: "LIKE",
        localConnector: "OR"
      };
      updatedValues[key][index][field] = value;
      return updatedValues;
    });
  };

  // Remove a specific condition for a column
  // const handleRemoveCondition = (key, index) => {
  //   setSearchValues((prevValues) => {
  //     const updatedValues = { ...prevValues };
  //     updatedValues[key] = updatedValues[key].filter((_, i) => i !== index);

  //     if (updatedValues[key].length === 0) {
  //       delete updatedValues[key];
  //       setSelectedSearchColumns((prev) => prev.filter((col) => col !== key));
  //     }

  //     return updatedValues;
  //   });

  //   setIsConditionRemoved(true);
  // };
  var handleRemoveCondition = function handleRemoveCondition(key, index) {
    var updatedSearchValues;
    var updatedSearchColumns;
    setSearchValues(function (prevValues) {
      var updated = _objectSpread({}, prevValues);
      if (!updated[key]) return updated;
      updated[key] = updated[key].filter(function (_, i) {
        return i !== index;
      });
      if (updated[key].length === 0) {
        delete updated[key];
        updatedSearchColumns = selectedSearchColumns.filter(function (col) {
          return col !== key;
        });
        setSelectedSearchColumns(updatedSearchColumns);
        selectedSearchColumnsRef.current = updatedSearchColumns;
      } else {
        updatedSearchColumns = selectedSearchColumns;
      }
      updatedSearchValues = updated;
      searchValuesRef.current = updated;
      return updated;
    });

    // 🟡 DEFER fetchPage to ensure setState is applied:
    setTimeout(function () {
      var keys = Object.keys(updatedSearchValues || {});
      var updatedCriteria = keys.map(function (key, index) {
        var conditions = (updatedSearchValues[key] || []).map(function (condition, i, arr) {
          return _objectSpread({
            value: condition.value,
            operator: condition.operator || "LIKE"
          }, i < arr.length - 1 ? {
            localConnector: condition.localConnector || "OR"
          } : {});
        });
        return {
          column: key,
          conditions: conditions,
          columnConnector: index < keys.length - 1 ? sqlOptionsRef.current[key] || "AND" : null
        };
      });
      fetchPage(1, pageSize, updatedCriteria, sortConfig);
    }, 0);
  };

  // Handle inter-column SQL operator change (AND/OR) between columns
  var handleSqlOptionChange = function handleSqlOptionChange(key, value) {
    setSqlOptions(function (prevOptions) {
      return _objectSpread(_objectSpread({}, prevOptions), {}, _defineProperty({}, key, value));
    });
  };
  var _getSearchCriteria = function _getSearchCriteria() {
    var keys = Object.keys(searchValuesRef.current);
    var searchCriteria = keys.map(function (key, index) {
      var _searchValuesRef$curr;
      var conditions = ((_searchValuesRef$curr = searchValuesRef.current[key]) === null || _searchValuesRef$curr === void 0 ? void 0 : _searchValuesRef$curr.map(function (condition, i, arr) {
        return _objectSpread({
          value: condition.value,
          operator: condition.operator || "LIKE"
        }, i < arr.length - 1 && {
          localConnector: condition.localConnector || "OR"
        });
      })) || [];
      return {
        column: key,
        conditions: conditions,
        columnConnector: index < keys.length - 1 ? sqlOptionsRef.current[key] || "AND" : null
      };
    });
    return searchCriteria;
  };

  // Submit search criteria
  var handleSearchAndSortSubmit = function handleSearchAndSortSubmit() {
    setCurrentPage(1);
    var updatedCriteria = _getSearchCriteria();
    console.log("Updated API Payload:", updatedCriteria);
    fetchPage(1, pageSize, updatedCriteria, sortConfig);
  };

  // Clear values for a column if removed from search
  var clearSearchForColumn = function clearSearchForColumn(key) {
    setCurrentPage(1);
    setSearchValues(function (prevValues) {
      var updatedValues = _objectSpread({}, prevValues);
      delete updatedValues[key];
      return updatedValues;
    });

    // ✅ Defer until state is updated
    setTimeout(function () {
      var updatedCriteria = _getSearchCriteria();
      fetchPage(1, pageSize, updatedCriteria, sortConfig);
    }, 0);
  };

  // Toggle column selection for search and clear if no search columns are active
  var handleSearchColumnToggle = function handleSearchColumnToggle(key) {
    setSelectedSearchColumns(function (prevColumns) {
      var updatedColumns = prevColumns.includes(key) ? prevColumns.filter(function (col) {
        return col !== key;
      }) : [].concat(_toConsumableArray(prevColumns), [key]);
      if (!updatedColumns.includes(key)) {
        // This column was removed from selectedSearchColumns
        clearSearchForColumn(key);
      }

      // if (updatedColumns.length === 0) {
      //   setSearchValues({});
      //   setCurrentPage(1);
      //   // No columns selected → no filters
      //   fetchPage(1, pageSize, [], sortConfig);
      // } else if (!updatedColumns.includes(key)) {
      //   // This column was removed from selectedSearchColumns
      //   clearSearchForColumn(key);
      // } else {
      //   // This column was just added to selectedSearchColumns
      //   // (Criteria may be empty until user types, but we rebuild anyway)
      //   searchCriteria = getSearchCriteria();
      //   fetchPage(1, pageSize, searchCriteria, sortConfig);
      // }
      return updatedColumns;
    });
  };

  // Toggle column selection for sort
  var handleSortColumnToggle = function handleSortColumnToggle(key) {
    setSortConfig(function (prevConfig) {
      var existingConfig = prevConfig.find(function (config) {
        return config.key === key;
      });
      if (existingConfig) {
        // Toggle the direction if the column is already in sortConfig
        var updatedConfig = prevConfig.map(function (config) {
          return config.key === key ? _objectSpread(_objectSpread({}, config), {}, {
            direction: config.direction === "asc" ? "desc" : "asc"
          }) : config;
        });
        return updatedConfig;
      } else {
        // Add the column to sortConfig with ascending order
        var newConfig = [].concat(_toConsumableArray(prevConfig), [{
          key: key,
          direction: "asc"
        }]);
        return newConfig;
      }
    });
  };

  // Toggle sort direction (clear that column’s sort)
  var handleClearSort = function handleClearSort(key) {
    var newSortConfig = sortConfig.filter(function (config) {
      return config.key !== key;
    });
    setSortConfig(newSortConfig);
    setCurrentPage(1);
    searchCriteria = _getSearchCriteria();
    fetchPage(1, pageSize, searchCriteria, newSortConfig);
  };

  // useEffect to log updated sortConfig or call API (optional)
  (0, _react.useEffect)(function () {
    if (process.env.NODE_ENV === "development") {
      console.log("Updated Sort Config:", sortConfig);
    }
  }, [sortConfig]);

  // Create Pagination numberings
  var generatePaginationItems = function generatePaginationItems() {
    var pages = [];
    var totalPages = Math.ceil(totalRecords / pageSize);
    if (totalPages <= 6) {
      var _loop = function _loop(i) {
        pages.push(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactBootstrap.Pagination.Item, {
          active: i === currentPage,
          onClick: function onClick() {
            setCurrentPage(i);
            searchCriteria = _getSearchCriteria();
            fetchPage(i, pageSize, searchCriteria, sortConfig);
          },
          children: i
        }, i));
      };
      for (var i = 1; i <= totalPages; i++) {
        _loop(i);
      }
    } else {
      // Always show “1”
      pages.push(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactBootstrap.Pagination.Item, {
        active: 1 === currentPage,
        onClick: function onClick() {
          setCurrentPage(1);
          searchCriteria = _getSearchCriteria();
          fetchPage(1, pageSize, searchCriteria, sortConfig);
        },
        children: "1"
      }, 1));
      if (currentPage > 3) {
        pages.push(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactBootstrap.Pagination.Ellipsis, {
          disabled: true
        }, "start-ellipsis"));
      }
      var start = Math.max(2, currentPage - 1);
      var end = Math.min(totalPages - 1, currentPage + 1);
      var _loop2 = function _loop2(_i) {
        pages.push(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactBootstrap.Pagination.Item, {
          active: _i === currentPage,
          onClick: function onClick() {
            setCurrentPage(_i);
            searchCriteria = _getSearchCriteria();
            fetchPage(_i, pageSize, searchCriteria, sortConfig);
          },
          children: _i
        }, _i));
      };
      for (var _i = start; _i <= end; _i++) {
        _loop2(_i);
      }
      if (currentPage < totalPages - 2) {
        pages.push(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactBootstrap.Pagination.Ellipsis, {
          disabled: true
        }, "end-ellipsis"));
      }
      pages.push(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactBootstrap.Pagination.Item, {
        active: totalPages === currentPage,
        onClick: function onClick() {
          setCurrentPage(totalPages);
          searchCriteria = _getSearchCriteria();
          fetchPage(totalPages, pageSize, searchCriteria, sortConfig);
        },
        children: totalPages
      }, totalPages));
    }
    return pages;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [selectedSearchColumns.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "card p-3 mb-1 customSearch",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "row px-2 align-items-center",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "col-xl-11 col-md-11 col-sm-10 col-12 card p-2 mb-1",
          children: selectedSearchColumns.map(function (key, index) {
            var _searchValues$key, _columns$find, _columns$find2, _searchValues$key2, _columns$find3, _searchValues$key3;
            return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: "col-12",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                className: "row justify-content-center",
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                  className: "col-xl-6 col-sm-12 mb-1",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                    className: "row align-items-center",
                    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                      className: "col-md-5 col-sm-5 col-5 pe-1",
                      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
                        className: "form-select me-1",
                        value: ((_searchValues$key = searchValues[key]) === null || _searchValues$key === void 0 || (_searchValues$key = _searchValues$key[0]) === null || _searchValues$key === void 0 ? void 0 : _searchValues$key.operator) || "LIKE",
                        onChange: function onChange(e) {
                          return handleSearchValueChange(key, 0, "operator", e.target.value);
                        },
                        style: {
                          height: "40px",
                          fontSize: "11px"
                        },
                        children: sqlOperations2.map(function (operation) {
                          return /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
                            value: operation,
                            children: operation
                          }, operation);
                        })
                      })
                    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                      className: "col-md-7 col-sm-7 col-7 ps-1",
                      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                        className: "input-group",
                        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
                          type: ((_columns$find = columns.find(function (col) {
                            return col.key === key;
                          })) === null || _columns$find === void 0 ? void 0 : _columns$find.type) || "text",
                          className: "form-control",
                          style: {
                            height: "40px"
                          },
                          placeholder: "".concat((_columns$find2 = columns.find(function (col) {
                            return col.key === key;
                          })) === null || _columns$find2 === void 0 ? void 0 : _columns$find2.label),
                          value: ((_searchValues$key2 = searchValues[key]) === null || _searchValues$key2 === void 0 || (_searchValues$key2 = _searchValues$key2[0]) === null || _searchValues$key2 === void 0 ? void 0 : _searchValues$key2.value) || "",
                          onChange: function onChange(e) {
                            return handleSearchValueChange(key, 0, "value", e.target.value);
                          }
                        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
                          className: "btn bgColor txtColor",
                          onClick: function onClick() {
                            return handleAddCondition(key);
                          },
                          title: "Add More ".concat((_columns$find3 = columns.find(function (col) {
                            return col.key === key;
                          })) === null || _columns$find3 === void 0 ? void 0 : _columns$find3.label),
                          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                            children: "+"
                          })
                        })]
                      })
                    })]
                  })
                }), (_searchValues$key3 = searchValues[key]) === null || _searchValues$key3 === void 0 ? void 0 : _searchValues$key3.slice(1).map(function (condition, condIndex) {
                  var _columns$find4, _columns$find5;
                  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                    className: "col-xl-6 col-sm-12 mb-1",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                      className: "row align-items-center",
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                        className: "col-md-2 col-sm-2 col-2 pe-1",
                        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
                          className: "form-select me-1",
                          value: condition.localConnector || "OR",
                          onChange: function onChange(e) {
                            return handleSearchValueChange(key, condIndex + 1, "localConnector", e.target.value);
                          },
                          style: {
                            height: "40px",
                            fontSize: "11px"
                          },
                          children: sqlOperations.map(function (operation) {
                            return /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
                              value: operation,
                              children: operation
                            }, operation);
                          })
                        })
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                        className: "col-md-3 col-sm-3 col-3 px-1",
                        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
                          className: "form-select me-1",
                          value: condition.operator || "LIKE",
                          onChange: function onChange(e) {
                            return handleSearchValueChange(key, condIndex + 1, "operator", e.target.value);
                          },
                          style: {
                            height: "40px",
                            fontSize: "11px"
                          },
                          children: sqlOperations2.map(function (operation) {
                            return /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
                              value: operation,
                              children: operation
                            }, operation);
                          })
                        })
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                        className: "col-md-7 col-sm-7 col-7 ps-1",
                        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                          className: "input-group",
                          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
                            type: ((_columns$find4 = columns.find(function (col) {
                              return col.key === key;
                            })) === null || _columns$find4 === void 0 ? void 0 : _columns$find4.type) || "text",
                            className: "form-control",
                            placeholder: "".concat((_columns$find5 = columns.find(function (col) {
                              return col.key === key;
                            })) === null || _columns$find5 === void 0 ? void 0 : _columns$find5.label),
                            value: condition.value,
                            onChange: function onChange(e) {
                              return handleSearchValueChange(key, condIndex + 1, "value", e.target.value);
                            }
                          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
                            className: "btn btn-dark",
                            onClick: function onClick() {
                              return handleRemoveCondition(key, condIndex + 1);
                            },
                            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                              children: "\u2715"
                            })
                          })]
                        })
                      })]
                    })
                  }, condIndex + 1);
                })]
              }), index < selectedSearchColumns.length - 1 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                className: "col-12",
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("hr", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
                  className: "form-select mx-auto",
                  value: sqlOptions[key] || "AND",
                  onChange: function onChange(e) {
                    return handleSqlOptionChange(key, e.target.value);
                  },
                  style: {
                    fontSize: "11px",
                    maxWidth: "300px"
                  },
                  children: sqlOperations.map(function (operation) {
                    return /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
                      value: operation,
                      children: operation
                    }, operation);
                  })
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("hr", {})]
              })]
            }, key);
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "col-xl-1 col-md-1 col-sm-2 col-12 mb-1 justify-content-center px-0",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "card p-2",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              className: "btn bgColor txtColor w-100",
              onClick: handleSearchAndSortSubmit,
              style: {
                top: "0",
                height: "40px"
              },
              children: "Go"
            })
          })
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "responsive-table-component card p-3",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "toolbar d-flex justify-content-between mb-3 align-items-center",
        children: [entriesEnabled && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "entries-dropdown d-flex align-items-center",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
            htmlFor: "pageSize",
            className: "me-1",
            children: "Show:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
            id: "pageSize",
            className: "form-select d-inline-block w-auto",
            value: pageSize,
            onChange: handlePageSizeChange,
            children: entriesOptions.map(function (option) {
              return /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
                value: option,
                children: option
              }, option);
            })
          })]
        }), gridViewEnabled && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          className: "btn bgColor txtColor toggle-button",
          onClick: function onClick() {
            return setGridView(!gridView);
          },
          style: {
            height: "40px"
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: gridView ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              children: "\u2B1C"
            }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              children: "\u2261"
            })
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "responsiveTable table-responsive",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("table", {
          className: "table mb-1",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("thead", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
              children: columns.map(function (column, index) {
                var _sortConfig$find, _sortConfig$find2;
                return /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
                  style: {
                    textAlign: column.textAlign || "left"
                  },
                  className: "bgColor txtColor",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                    className: "d-flex justify-content-between align-items-center",
                    children: [column.sortable ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                      className: "d-flex align-items-center",
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                        className: "font-10 ".concat(sortConfig.find(function (config) {
                          return config.key === column.key;
                        }) ? "bg-dark text-white" : "bg-white text-dark"),
                        style: {
                          cursor: "pointer",
                          padding: "1px 5px",
                          borderRadius: "4px"
                        },
                        onClick: function onClick(e) {
                          e.stopPropagation();
                          // 1) Build newSortConfig based on current sortConfig:
                          var alreadySorted = sortConfig.find(function (c) {
                            return c.key === column.key;
                          });
                          var newSortConfig = alreadySorted ? sortConfig.map(function (c) {
                            return c.key === column.key ? {
                              key: column.key,
                              direction: c.direction === "asc" ? "desc" : "asc"
                            } : c;
                          }) : [].concat(_toConsumableArray(sortConfig), [{
                            key: column.key,
                            direction: "asc"
                          }]);

                          // 2) Update state (this toggles sortConfig to newSortConfig internally)
                          handleSortColumnToggle(column.key);

                          // 3) Rebuild current filters:
                          searchCriteria = _getSearchCriteria();

                          // 4) Fetch page 1 with both new sort and current filters
                          fetchPage(1, pageSize, searchCriteria, newSortConfig);
                        },
                        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                          children: ((_sortConfig$find = sortConfig.find(function (config) {
                            return config.key === column.key;
                          })) === null || _sortConfig$find === void 0 ? void 0 : _sortConfig$find.direction) === "asc" ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                            children: "\u25B2"
                          }) : ((_sortConfig$find2 = sortConfig.find(function (config) {
                            return config.key === column.key;
                          })) === null || _sortConfig$find2 === void 0 ? void 0 : _sortConfig$find2.direction) === "desc" ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                            children: "\u25BC"
                          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                            children: "\u25B3\u25BD"
                          })
                        })
                      }), sortConfig.find(function (config) {
                        return config.key === column.key;
                      }) && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                        className: "font-10 mx-1 bg-dark text-white",
                        style: {
                          cursor: "pointer",
                          padding: "1px 5px",
                          borderRadius: "4px"
                        },
                        onClick: function onClick(e) {
                          e.stopPropagation();
                          // Clear sort for this one column:
                          handleClearSort(column.key);
                        },
                        children: "\u2715"
                      })]
                    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                      className: "px-2",
                      children: column.label
                    }), column.searchable ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                      className: "font-10 ".concat(selectedSearchColumns.includes(column.key) ? "bg-dark text-white" : "bg-white text-dark"),
                      style: {
                        cursor: "pointer",
                        padding: "1px 5px",
                        borderRadius: "4px"
                      },
                      onClick: function onClick(e) {
                        e.stopPropagation();
                        handleSearchColumnToggle(column.key);
                      },
                      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                        children: selectedSearchColumns.includes(column.key) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                          children: "\u2715"
                        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                          children: "\uD83D\uDD0D"
                        })
                      })
                    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {})]
                  })
                }, index);
              })
            }), groupedColumns.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
              children: groupedColumns.map(function (column, index) {
                return /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
                  style: {
                    textAlign: column.textAlign || "left"
                  },
                  children: column.label
                }, index);
              })
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
            className: "".concat(gridView ? "dHide" : ""),
            children: data.map(function (row, rowIndex) {
              return /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
                className: "text-center",
                children: columns.map(function (column, colIndex) {
                  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(CustomCell, {
                    tdProps: {
                      style: {
                        textAlign: column.textAlign || "left"
                      }
                    },
                    column: column,
                    children: [column.customRenderer ? column.customRenderer(row) : row[column.key], " "]
                  }, colIndex);
                })
              }, rowIndex);
            })
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "cardView ".concat(!gridView ? "dHide" : ""),
        children: data.map(function (row, rowIndex) {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "card cardItem",
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: "card-body",
              children: [groupedColumns.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "grouped-columns",
                children: groupedColumns.map(function (groupColumn, groupColIndex) {
                  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                    className: "card-text align-items-center",
                    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("strong", {
                      children: [groupColumn.label, ":"]
                    }), " ", row[groupColumn.key]]
                  }, groupColIndex);
                })
              }), columns.map(function (column, colIndex) {
                if (groupedColumns.includes(column.key)) return null;
                return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                  className: "card-text align-items-center",
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("strong", {
                    children: [column.label, ":"]
                  }), column.customRenderer ? column.customRenderer(row) : row[column.key]]
                }, colIndex);
              })]
            })
          }, rowIndex);
        })
      }), paginationEnabled && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "d-flex justify-content-between align-items-center mt-3 pagination-container bgColor txtColor",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          className: "pagination-info",
          children: ["Showing ", srno, " to ", Math.min(srno - 1 + pageSize, totalRecords), " of ", totalRecords, " entries"]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactBootstrap.Pagination, {
          className: "mb-0",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactBootstrap.Pagination.First, {
            onClick: function onClick() {
              setCurrentPage(1);
              searchCriteria = _getSearchCriteria();
              fetchPage(1, pageSize, searchCriteria, sortConfig);
            },
            disabled: currentPage === 1
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactBootstrap.Pagination.Prev, {
            onClick: function onClick() {
              setCurrentPage(currentPage - 1);
              searchCriteria = _getSearchCriteria();
              fetchPage(currentPage - 1, pageSize, searchCriteria, sortConfig);
            },
            disabled: currentPage === 1
          }), generatePaginationItems(), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactBootstrap.Pagination.Next, {
            onClick: function onClick() {
              setCurrentPage(currentPage + 1);
              searchCriteria = _getSearchCriteria();
              fetchPage(currentPage + 1, pageSize, searchCriteria, sortConfig);
            },
            disabled: currentPage === totalPages
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactBootstrap.Pagination.Last, {
            onClick: function onClick() {
              setCurrentPage(totalPages);
              searchCriteria = _getSearchCriteria();
              fetchPage(totalPages, pageSize, searchCriteria, sortConfig);
            },
            disabled: currentPage === totalPages
          })]
        })]
      })]
    })]
  });
});
var _default = exports["default"] = TableCustom;