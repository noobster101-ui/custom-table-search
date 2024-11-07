"use client";
import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import "./TableCustom.css";

export function setRootThemeColors(bgColor, txtColor, borderColor) {
  document.documentElement.style.setProperty("--back-color", bgColor);
  document.documentElement.style.setProperty("--txt-color", txtColor);
  document.documentElement.style.setProperty("--border-color", borderColor);
}

const TableCustom = ({
  data,
  columns,
  groupedColumns = [],
  gridViewEnabled = true,
  entriesEnabled = true,
  paginationEnabled = true,
  currentPage = 1,
  setCurrentPage,
  fetchPage,
  pageSize = 12,
  setPageSize,
  totalRecords,
  entriesOptions = [12, 24, 48, 108],
  defaultPageSize = 12,
  bgColor = "#0d6efd",
  txtColor = "#fff",
  borderColor = "#ddd",
}) => {
  useEffect(() => {
    // Set theme colors based on props
    setRootThemeColors(bgColor, txtColor, borderColor);
  }, [bgColor, txtColor, borderColor]);

  const [gridView, setGridView] = useState(false);
  const [searchValues, setSearchValues] = useState({}); // Object to store search values per column
  const [sortConfig, setSortConfig] = useState([]); // Array to store sort columns and directions
  const [selectedSearchColumns, setSelectedSearchColumns] = useState([]);
  const [sqlOptions, setSqlOptions] = useState({});
  const [isConditionRemoved, setIsConditionRemoved] = useState(false);
  var searchCriteria = null;

  useEffect(() => {
    if (isConditionRemoved) {
      handleSearchAndSortSubmit();
      setIsConditionRemoved(false);
    }
  }, [searchValues, isConditionRemoved]);

  const sqlOperations = ["AND", "OR"];
  const sqlOperations2 = [
    "LIKE",
    "EQUAL",
    "CONTAINS",
    "STARTWITH",
    "ENDWITH",
    "ISNULL",
    "ISNOTNULL",
  ];

  // Set default page size if specified
  useEffect(() => {
    setPageSize(defaultPageSize);
  }, [defaultPageSize, setPageSize]);

  const handlePageSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1); // Reset to page 1
    const searchCriteria = getSearchCriteria(); // Customize search criteria if needed
    fetchPage(1, newSize, searchCriteria, sortConfig);
  };

  // Calculate total pages based on totalRecords and pageSize
  const totalPages = Math.ceil(totalRecords / pageSize);

  // Calculate starting serial number for the current page
  const srno = (currentPage - 1) * pageSize + 1;

  // Add a new condition within the same column
  const handleAddCondition = (key) => {
    setSearchValues((prevValues) => {
      const updatedValues = { ...prevValues };
      updatedValues[key] = updatedValues[key]
        ? [
            ...updatedValues[key],
            { value: "", operator: "LIKE", localConnector: "OR" },
          ]
        : [{ value: "", operator: "LIKE", localConnector: "OR" }];
      return updatedValues;
    });
  };

  // Handle value change for a specific condition within a column
  const handleSearchValueChange = (key, index, field, value) => {
    setSearchValues((prevValues) => {
      const updatedValues = { ...prevValues };
      if (!updatedValues[key]) updatedValues[key] = [];
      if (!updatedValues[key][index])
        updatedValues[key][index] = {
          value: "",
          operator: "LIKE",
          localConnector: "OR",
        };
      updatedValues[key][index][field] = value;
      return updatedValues;
    });
  };

  // Remove a specific condition for a column
  const handleRemoveCondition = (key, index) => {
    setSearchValues((prevValues) => {
      const updatedValues = { ...prevValues };
      updatedValues[key] = updatedValues[key].filter((_, i) => i !== index);

      if (updatedValues[key].length === 0) {
        delete updatedValues[key];
        setSelectedSearchColumns((prev) => prev.filter((col) => col !== key));
      }

      return updatedValues;
    });

    setIsConditionRemoved(true);
  };

  // Handle inter-column SQL operator change (AND/OR) between columns
  const handleSqlOptionChange = (key, value) => {
    setSqlOptions((prevOptions) => ({
      ...prevOptions,
      [key]: value,
    }));
  };

  const getSearchCriteria = () => {
    searchCriteria = selectedSearchColumns.map((key, index) => {
      const conditions = searchValues[key]
        ? searchValues[key].map((condition, i, arr) => ({
            value: condition.value,
            operator: condition.operator || "LIKE", // Ensuring operator exists
            ...(i < arr.length - 1 && {
              localConnector: condition.localConnector || "OR",
            }), // Only add localConnector if not the last condition
          }))
        : [];

      return {
        column: key,
        conditions: conditions,
        columnConnector:
          index < selectedSearchColumns.length - 1
            ? sqlOptions[key] || "AND"
            : null, // Global connector
      };
    });
    return searchCriteria;
  };

  // Submit search criteria
  const handleSearchAndSortSubmit = () => {
    setCurrentPage(1);
    const updatedCriteria = getSearchCriteria();
    console.log("Updated API Payload:", updatedCriteria);

    fetchPage(1, pageSize, updatedCriteria, sortConfig);
  };

  // Clear values for a column if removed from search
  const clearSearchForColumn = (key) => {
    setCurrentPage(1);
    setSearchValues((prevValues) => {
      const updatedValues = { ...prevValues };
      delete updatedValues[key];
      return updatedValues;
    });
    fetchPage(1, pageSize, [], sortConfig);
  };

  // Toggle column selection for search and clear if no search columns are active
  const handleSearchColumnToggle = (key) => {
    setSelectedSearchColumns((prevColumns) => {
      const updatedColumns = prevColumns.includes(key)
        ? prevColumns.filter((col) => col !== key)
        : [...prevColumns, key];

      if (updatedColumns.length === 0) {
        setSearchValues({});
        setCurrentPage(1);
        fetchPage(1, pageSize, searchCriteria, sortConfig);
      } else if (!updatedColumns.includes(key)) {
        clearSearchForColumn(key);
      }
      return updatedColumns;
    });
  };

  // Toggle column selection for sort
  const handleSortColumnToggle = (key) => {
    setSortConfig((prevConfig) => {
      const existingConfig = prevConfig.find((config) => config.key === key);

      if (existingConfig) {
        // Toggle the direction if the column is already in sortConfig
        const updatedConfig = prevConfig.map((config) =>
          config.key === key
            ? {
                ...config,
                direction: config.direction === "asc" ? "desc" : "asc",
              }
            : config
        );
        return updatedConfig;
      } else {
        // Add the column to sortConfig with ascending order
        const newConfig = [...prevConfig, { key, direction: "asc" }];
        return newConfig;
      }
    });
  };

  // Toggle sort direction
  const handleClearSort = (key) => {
    setSortConfig((prevConfig) =>
      prevConfig.filter((config) => config.key !== key)
    );
    setCurrentPage(1);
    fetchPage(1, pageSize, [], sortConfig);
  };

  // useEffect to log updated sortConfig or call API
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Updated Sort Config:", sortConfig);
    }
  }, [sortConfig]);

  //Create Paggination numberings
  const generatePaginationItems = () => {
    const pages = [];
    const totalPages = Math.ceil(totalRecords / pageSize);

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => {
              setCurrentPage(i);
              searchCriteria = getSearchCriteria();
              fetchPage(i, pageSize, searchCriteria, sortConfig);
            }}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      pages.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => {
            setCurrentPage(1);
            searchCriteria = getSearchCriteria();
            fetchPage(1, pageSize, searchCriteria, sortConfig);
          }}
        >
          1
        </Pagination.Item>
      );

      if (currentPage > 3) {
        pages.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
      }

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => {
              setCurrentPage(i);
              searchCriteria = getSearchCriteria();
              fetchPage(i, pageSize, searchCriteria, sortConfig);
            }}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
      }

      pages.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => {
            setCurrentPage(totalPages);
            searchCriteria = getSearchCriteria();
            fetchPage(totalPages, pageSize, searchCriteria, sortConfig);
          }}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return pages;
  };

  return (
    <>
      {/* Search Inputs with Add Condition Button */}
      {selectedSearchColumns.length > 0 && (
        <div className="card p-3 mb-1 customSearch">
          <div className="row px-2 align-items-center">
            <div className="col-xl-11 col-md-11 col-sm-10 col-12 card p-2 mb-1">
              {selectedSearchColumns.map((key, index) => (
                <div key={key} className="col-12">
                  <div className="row justify-content-center">
                    {/* Primary Input Field and Add Condition Button */}
                    <div className="col-xl-6 col-sm-12 mb-1">
                      <div className="row align-items-center">
                        <div className="col-md-5 col-sm-5 col-5 pe-1">
                          <select
                            className="form-select me-1"
                            value={searchValues[key]?.[0]?.operator || "LIKE"}
                            onChange={(e) =>
                              handleSearchValueChange(
                                key,
                                0,
                                "operator",
                                e.target.value
                              )
                            }
                            style={{
                              height: "40px",
                              fontSize: "11px",
                            }}
                          >
                            {sqlOperations2.map((operation) => (
                              <option key={operation} value={operation}>
                                {operation}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-7 col-sm-7 col-7 ps-1">
                          <div className="input-group">
                            <input
                              type={
                                columns.find((col) => col.key === key)?.type ||
                                "text"
                              }
                              className="form-control"
                              style={{ height: "40px" }}
                              placeholder={`${
                                columns.find((col) => col.key === key)?.label
                              }`}
                              value={searchValues[key]?.[0]?.value || ""}
                              onChange={(e) =>
                                handleSearchValueChange(
                                  key,
                                  0,
                                  "value",
                                  e.target.value
                                )
                              }
                            />
                            <button
                              className="btn bgColor txtColor"
                              onClick={() => handleAddCondition(key)}
                              title={`Add More ${
                                columns.find((col) => col.key === key)?.label
                              }`}
                            >
                              <span>&#43;</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Conditions within the Column */}
                    {searchValues[key]?.slice(1).map((condition, condIndex) => (
                      <div
                        key={condIndex + 1}
                        className="col-xl-6 col-sm-12 mb-1"
                      >
                        <div className="row align-items-center">
                          {/* Local Connector Selector */}
                          <div className="col-md-2 col-sm-2 col-2 pe-1">
                            <select
                              className="form-select me-1"
                              value={condition.localConnector || "OR"}
                              onChange={(e) =>
                                handleSearchValueChange(
                                  key,
                                  condIndex + 1,
                                  "localConnector",
                                  e.target.value
                                )
                              }
                              style={{
                                height: "40px",
                                fontSize: "11px",
                              }}
                            >
                              {sqlOperations.map((operation) => (
                                <option key={operation} value={operation}>
                                  {operation}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Operator Dropdown for Additional Condition */}
                          <div className="col-md-3 col-sm-3 col-3 px-1">
                            <select
                              className="form-select me-1"
                              value={condition.operator || "LIKE"}
                              onChange={(e) =>
                                handleSearchValueChange(
                                  key,
                                  condIndex + 1,
                                  "operator",
                                  e.target.value
                                )
                              }
                              style={{
                                height: "40px",
                                fontSize: "11px",
                              }}
                            >
                              {sqlOperations2.map((operation) => (
                                <option key={operation} value={operation}>
                                  {operation}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Additional Condition Input */}
                          <div className="col-md-7 col-sm-7 col-7 ps-1">
                            <div className="input-group">
                              <input
                                type={
                                  columns.find((col) => col.key === key)
                                    ?.type || "text"
                                }
                                className="form-control"
                                placeholder={`${
                                  columns.find((col) => col.key === key)?.label
                                }`}
                                value={condition.value}
                                onChange={(e) =>
                                  handleSearchValueChange(
                                    key,
                                    condIndex + 1,
                                    "value",
                                    e.target.value
                                  )
                                }
                              />

                              {/* Remove Condition Button */}
                              <button
                                className="btn btn-dark"
                                onClick={() =>
                                  handleRemoveCondition(key, condIndex + 1)
                                }
                              >
                                <span>&#10005;</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Global Connector Selector for Inter-Column Logic */}
                  {index < selectedSearchColumns.length - 1 && (
                    <div className="col-12">
                      <hr />
                      <select
                        className="form-select mx-auto"
                        value={sqlOptions[key] || "AND"}
                        onChange={(e) =>
                          handleSqlOptionChange(key, e.target.value)
                        }
                        style={{ fontSize: "11px", maxWidth: "300px" }}
                      >
                        {sqlOperations.map((operation) => (
                          <option key={operation} value={operation}>
                            {operation}
                          </option>
                        ))}
                      </select>
                      <hr />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="col-xl-1 col-md-1 col-sm-2 col-12 mb-1 justify-content-center px-0">
              {/* Search Button */}
              <div className="card p-2">
                <button
                  className="btn bgColor txtColor w-100"
                  onClick={handleSearchAndSortSubmit}
                  style={{ top: "0", height: "40px" }}
                >
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="responsive-table-component card p-3">
        {/* Toolbar */}
        <div className="toolbar d-flex justify-content-between mb-3 align-items-center">
          {/* Entries Dropdown */}
          {entriesEnabled && (
            <div className="entries-dropdown d-flex align-items-center">
              <label htmlFor="pageSize" className="me-1">
                Show:
              </label>
              <select
                id="pageSize"
                className="form-select d-inline-block w-auto"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                {entriesOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          {gridViewEnabled && (
            <button
              className="btn bgColor txtColor toggle-button"
              onClick={() => setGridView(!gridView)}
              style={{ height: "40px" }}
            >
              <span>
                {gridView ? (
                  <span>&#11036;</span> // Symbol for grid view (⬛)
                ) : (
                  <span>&#8801;</span> // Symbol for table view (≡)
                )}
              </span>
            </button>
          )}
        </div>

        {/* Table View */}
        <div className={`responsiveTable table-responsive`}>
          <table className="table mb-1">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    style={{ textAlign: column.textAlign || "left" }}
                    className="bgColor txtColor"
                  >
                    <div className="d-flex justify-content-between align-items-center ">
                      {/* Sort Icon */}

                      {column.sortable ? (
                        <div className="d-flex align-items-center">
                          {/* Sort Toggle Button */}
                          <span
                            className={`font-10 ${
                              sortConfig.find(
                                (config) => config.key === column.key
                              )
                                ? "bg-dark text-white"
                                : "bg-white text-dark"
                            }`}
                            style={{
                              cursor: "pointer",
                              padding: "1px 5px",
                              borderRadius: "4px",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSortColumnToggle(column.key);
                            }}
                          >
                            <span>
                              {sortConfig.find(
                                (config) => config.key === column.key
                              )?.direction === "asc" ? (
                                <span>&#9650;</span> // Unicode for ▲ (up arrow for ascending sort)
                              ) : sortConfig.find(
                                  (config) => config.key === column.key
                                )?.direction === "desc" ? (
                                <span>&#9660;</span> // Unicode for ▼ (down arrow for descending sort)
                              ) : (
                                <span>&#9651;&#9661;</span> // Unicode for △ and ▽ (neutral sort icons)
                              )}
                            </span>
                          </span>

                          {/* Conditionally Render Clear Sort Button */}
                          {sortConfig.find(
                            (config) => config.key === column.key
                          ) && (
                            <span
                              className="font-10 mx-1 bg-dark text-white"
                              style={{
                                cursor: "pointer",
                                padding: "1px 5px",
                                borderRadius: "4px",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClearSort(column.key);
                              }}
                            >
                              &#10005;
                            </span>
                          )}
                        </div>
                      ) : (
                        <span></span>
                      )}

                      {/* Column Label */}

                      <span className="px-2">{column.label}</span>

                      {/* Column-specific Search Icon */}
                      {column.searchable ? (
                        <span
                          className={`font-10 ${
                            selectedSearchColumns.includes(column.key)
                              ? "bg-dark text-white"
                              : "bg-white text-dark"
                          }`}
                          style={{
                            cursor: "pointer",
                            padding: "1px 5px",
                            borderRadius: "4px",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSearchColumnToggle(column.key);
                          }}
                        >
                          <span>
                            {selectedSearchColumns.includes(column.key) ? (
                              <span>&#10005;</span> // Cross icon
                            ) : (
                              <span>&#128269;</span> // Search icon
                            )}
                          </span>
                        </span>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>

              {groupedColumns.length > 0 && (
                <tr>
                  {groupedColumns.map((column, index) => (
                    <th
                      key={index}
                      style={{ textAlign: column.textAlign || "left" }}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody className={` ${gridView ? "dHide" : ""}`}>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="text-center">
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      style={{ textAlign: column.textAlign || "left" }}
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Card View */}
        <div className={`cardView ${!gridView ? "dHide" : ""}`}>
          {data.map((row, rowIndex) => (
            <div className="card cardItem" key={rowIndex}>
              <div className="card-body">
                {/* Render grouped columns if they exist */}
                {groupedColumns.length > 0 && (
                  <div className="grouped-columns">
                    {groupedColumns.map((groupColumn, groupColIndex) => (
                      <div
                        key={groupColIndex}
                        className="card-text align-items-center"
                      >
                        <strong>{groupColumn.label}:</strong>{" "}
                        {row[groupColumn.key]}
                      </div>
                    ))}
                  </div>
                )}

                {/* Render non-grouped columns */}
                {columns.map(
                  (column, colIndex) =>
                    !groupedColumns.includes(column.key) && (
                      <div
                        key={colIndex}
                        className="card-text align-items-center"
                      >
                        <strong>{column.label}:</strong> {row[column.key]}
                      </div>
                    )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {paginationEnabled && (
          <div
            className={`d-flex justify-content-between align-items-center mt-3 pagination-container bgColor txtColor`}
          >
            <span className="pagination-info">
              Showing {srno} to {Math.min(srno - 1 + pageSize, totalRecords)} of{" "}
              {totalRecords} entries
            </span>

            <Pagination className="mb-0">
              <Pagination.First
                onClick={() => {
                  setCurrentPage(1);
                  fetchPage(1, pageSize, getSearchCriteria(), sortConfig);
                }}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                  fetchPage(
                    currentPage - 1,
                    pageSize,
                    getSearchCriteria(),
                    sortConfig
                  );
                }}
                disabled={currentPage === 1}
              />

              {generatePaginationItems()}

              <Pagination.Next
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  fetchPage(
                    currentPage + 1,
                    pageSize,
                    getSearchCriteria(),
                    sortConfig
                  );
                }}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => {
                  setCurrentPage(totalPages);
                  fetchPage(
                    totalPages,
                    pageSize,
                    getSearchCriteria(),
                    sortConfig
                  );
                }}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
};

export default TableCustom;
