## Custom Table Search

custom-table-search is a React component that provides a dynamic, customizable table with features like advanced search, sorting, pagination, and a grid view toggle. It’s ideal for applications needing flexible data exploration and presentation.
Features

Customizable Columns: Define columns with options like labels, searchability, and sortability.
Advanced Search and Filtering: Apply multiple conditions with SQL-like connectors (AND, OR).
Sorting: Sort data by clicking column headers.
Pagination: Control page size and navigate through records.
Grid and Table Views: Toggle between grid and table views for versatile data display.

## Features

- Customizable Columns: Define table columns with labels, sortability, and search options.
- Advanced Search and Filtering: Apply multiple conditions with SQL-like connectors (AND, OR) for complex queries.
- Sorting: Sort data by clicking on column headers.
- Pagination: Control page size and navigate through data records.
- Grid and Table Views: Toggle between grid and table views.
- Action Buttons: Add custom action buttons (e.g., Edit, Delete, View) in rows to perform specific actions.

## Installation

### To install custom-table-search, run the following command:

    npm install custom-table-search

## Example 1: Static Data

### This example uses local static data and showcases pagination, sorting, and action buttons.

    import React, { useState, useEffect } from "react";
    import TableCustom from "custom-table-search";
    import "bootstrap/dist/css/bootstrap.min.css";

    const sampleData = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "Active" },
    // Add more data as needed
    ];

    const StaticDataPage = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Define setPageSize here
    const [totalRecords, setTotalRecords] = useState(sampleData.length);
    const customEntriesOptions = [5, 10, 20, 50];
    const customDefaultPageSize = 10;

    const columns = [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true, searchable: true },
        { key: "email", label: "Email", sortable: true, searchable: true },
        { key: "status", label: "Status", sortable: true, searchable: true },
    ];

    // Pagination function
    const fetchPage = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
        const startIdx = (page - 1) * size;
        setData(sampleData.slice(startIdx, startIdx + size));
    };

    useEffect(() => {
        fetchPage(currentPage, pageSize);
    }, [currentPage, pageSize]);

    return (
            <div className="container mt-5">
                <h2>Static Data Table</h2>
                <TableCustom
                    data={data}
                    columns={columns}
                    gridViewEnabled={true}
                    entriesEnabled={true}
                    paginationEnabled={true}
                    searchEnabled={true}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchPage={fetchPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize} // Pass setPageSize here
                    totalRecords={totalRecords}
                    entriesOptions={customEntriesOptions}
                    defaultPageSize={customDefaultPageSize}
                    bgColor="#111"
                    txtColor="#fff"
                    borderColor="#ddd"
                />
            </div>
        );
    };

    export default StaticDataPage;

## Example 1: Static Data

### This example uses local static data and showcases pagination, sorting, and action buttons.

    import React, { useState, useEffect } from "react";
    import TableCustom from "custom-table-search";
    import "bootstrap/dist/css/bootstrap.min.css";

    const sampleData = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "Active" },
    // Add more data as needed
    ];

    const ApiDataPage = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [totalRecords, setTotalRecords] = useState(sampleData.length);
    // const customEntriesOptions = [5, 10, 20, 50];
    // const customDefaultPageSize = 10;

    const columns = [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true, searchable: true },
        { key: "email", label: "Email", sortable: true, searchable: true },
        { key: "status", label: "Status", sortable: true, searchable: true },
    ];

    // Function to fetch page data (simulating an API call)
    const fetchPage = async (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
        const startIdx = (page - 1) * size;
        const pagedData = sampleData.slice(startIdx, startIdx + size); // Simulate API data slice
        setData(pagedData);
        setTotalRecords(sampleData.length); // Set the total record count based on data length
    };

    useEffect(() => {
        fetchPage(currentPage, pageSize);
    }, [currentPage, pageSize]);

    return (
            <div className="container mt-5">
                <h2>API Data Table</h2>
                <TableCustom
                    data={data}
                    columns={columns}
                    paginationEnabled={true}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchPage={fetchPage} // Pass fetchPage to handle pagination
                    pageSize={pageSize} // Current page size
                    setPageSize={setPageSize} // Function to change page size
                    totalRecords={totalRecords}
                    // entriesOptions={customEntriesOptions}
                    // defaultPageSize={customDefaultPageSize}
                />
            </div>
        );
    };

    export default ApiDataPage;

### Example Explanation

    - StaticDataTable:
        - Uses a local array (sampleData) and paginates by slicing the array based on currentPage and pageSize.
        - Action buttons for each row to demonstrate how custom buttons work within the table.
    - ApiDataTable:
        - Fetches data from a mock API with pagination and page size passed as parameters.
        - Action buttons are also included here, demonstrating row-specific interactions with API-based data.

## Props

### Core Props

| Prop                | Type       | Default   | Description                                                                            |
| ------------------- | ---------- | --------- | -------------------------------------------------------------------------------------- |
| `data`              | `Array`    | `[]`      | Array of data objects for each row.                                                    |
| `columns`           | `Array`    | `[]`      | Column configuration with options like label, searchability, and sortability.          |
| `gridViewEnabled`   | `Boolean`  | `true`    | Enables toggle between grid and table view.                                            |
| `entriesEnabled`    | `Boolean`  | `true`    | Enables page size dropdown to control entries per page.                                |
| `paginationEnabled` | `Boolean`  | `true`    | Enables pagination controls for navigating pages.                                      |
| `searchEnabled`     | `Boolean`  | `true`    | Enables column-specific search functionality.                                          |
| `currentPage`       | `Number`   | `1`       | Current page number for pagination.                                                    |
| `setCurrentPage`    | `Function` | Required  | Function to update the current page.                                                   |
| `fetchPage`         | `Function` | Required  | Function to fetch data for the specified page and size, taking search/sort parameters. |
| `pageSize`          | `Number`   | `12`      | Number of records per page.                                                            |
| `setPageSize`       | `Function` | Required  | Function to set the number of records per page.                                        |
| `totalRecords`      | `Number`   | `0`       | Total number of records for accurate pagination.                                       |
| `bgColor`           | `String`   | `#f8f9fa` | Background color for the table.                                                        |
| `txtColor`          | `String`   | `#333333` | Text color for the table.                                                              |

### Column Configuration

Each column object in the columns array can have the following properties:

| Column Property | Type      | Default  | Description                                               |
| --------------- | --------- | -------- | --------------------------------------------------------- |
| `key`           | `String`  | Required | Unique identifier for the column.                         |
| `label`         | `String`  | `""`     | Display name for the column header.                       |
| `sortable`      | `Boolean` | `false`  | Allows sorting when `true`.                               |
| `searchable`    | `Boolean` | `false`  | Enables search/filtering for this column.                 |
| `textAlign`     | `String`  | `"left"` | Aligns text within the column (e.g., `"center"`).         |
| `type`          | `String`  | `"text"` | Input type for search fields (e.g., `"text"`, `"email"`). |

## Object Creted on Search and Filter

#### Example : For a search where the user is filtering by name and email columns with multiple conditions, the searchCriteria payload might look like this:

    [
        {
            "column": "name",
            "conditions": [
            {
                "value": "John Doe",
                "operator": "LIKE",
                "localConnector": "OR"
            },
            {
                "value": "Alice Johnson",
                "operator": "LIKE"
            }
            ],
            "columnConnector": "AND"
        },
        {
            "column": "email",
            "conditions": [
            {
                "value": "john@example.com",
                "operator": "LIKE",
                "localConnector": "OR"
            },
            {
                "value": "alice@example.com",
                "operator": "LIKE"
            }
            ],
            "columnConnector": null
        }
    ]

This object can be included in the body of an API request for server-side filtering. The API can interpret this payload to construct a query like:

    WHERE (name LIKE 'John Doe' OR name LIKE 'Alice Johnson')
    AND (email LIKE 'john@example.com' OR email LIKE 'alice@example.com')

## Parsing searchCriteria in Your Backend

On the server side, you’ll need to parse searchCriteria to generate a SQL or database query. For example:

-Loop through each column in the searchCriteria.
-Apply each condition in the column, using localConnector to connect multiple conditions within a column.
-Combine columns using columnConnector to achieve the full logical structure.

Example (in pseudo-code):

    // Example pseudo-code for building a query string from searchCriteria
    let query = "SELECT * FROM table WHERE ";
    searchCriteria.forEach((columnObj, colIndex) => {
        const columnQuery = columnObj.conditions.map((cond, condIndex) => {
            return `${columnObj.column} ${cond.operator} '${cond.value}'` +
            (cond.localConnector ? ` ${cond.localConnector} ` : "");
        }).join("");

        query += columnQuery + (columnObj.columnConnector ? ` ${columnObj.columnConnector} ` : "");
    });

#### Tips for Using the searchCriteria Object

- SQL Injection Safety: If using SQL, ensure values are sanitized or parameterized to avoid SQL injection risks.
- Flexible Conditions: With operator, localConnector, and columnConnector, you can build highly customizable queries, ideal for advanced filtering.
- Testing: Test searchCriteria generation and API handling with various combinations to ensure robust handling of complex queries.

This searchCriteria object structure enables powerful and flexible search capabilities for your data, allowing precise filtering directly from the frontend component.

#### Example : Fetching data Search Inputs

    {
        "page": 1,
        "size": 10,
        "searchCriteria": [
            {
            "column": "name",
            "conditions": [
                {
                "value": "John Doe",
                "operator": "LIKE",
                "localConnector": "OR"
                },
                {
                "value": "Alice Johnson",
                "operator": "LIKE"
                }
            ],
            "columnConnector": "AND"
            },
            {
            "column": "email",
            "conditions": [
                {
                "value": "john@example.com",
                "operator": "LIKE",
                "localConnector": "OR"
                },
                {
                "value": "alice@example.com",
                "operator": "LIKE"
                }
            ],
            "columnConnector": null
            }
        ],
        "sortConfig": []
    }

## Example Usage in API Calls

Here’s how you might use the searchCriteria object as a payload for an API call to retrieve filtered data.

    const fetchData = async (page, size, searchCriteria, sortConfig) => {
        try {
            const response = await fetch('/api/your-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                page,
                size,
                searchCriteria,
                sortConfig
            })
            });
            const result = await response.json();
            // Handle the data from the response, e.g., update state
            setData(result.data);
            setTotalRecords(result.totalRecords);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

## Action Buttons

Action buttons (Edit, Delete, View) are added to each row by configuring the data prop with custom actions. Each button is attached to a function to handle its respective action:

    const dataWithActions = data.map((row) => ({
    ...row,
    actions: (
        <div className="d-flex justify-content-center">
            <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(row)}>Edit</button>
            <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(row)}>Delete</button>
            <button className="btn btn-info btn-sm" onClick={() => handleView(row)}>View</button>
        </div>
    ),
    }));

These buttons perform specific functions when clicked, allowing the user to interact with each row in the table. Customize the icons and actions as needed.## Advanced Usage

### Search Conditions and SQL-like Filters

- Multiple Conditions per Column: Apply multiple conditions per column (e.g., LIKE, EQUAL, CONTAINS).
- Logical Operators: Use AND or OR to connect conditions for complex queries.

## Custom Actions

Add action buttons (e.g., Edit, Delete) by including an actions key in your data. Customize these buttons to handle events such as editing, deleting, or viewing details of a row.

## Styling

The component uses standard Bootstrap styles. To customize further, apply your own CSS or Bootstrap overrides.
Troubleshooting

Dependency Conflicts: Ensure you have compatible versions of react, react-dom, and react-bootstrap.
Styling Issues: Ensure Bootstrap is included in your project or adjust styles as needed.
Pagination Limits: Ensure totalRecords accurately reflects the number of entries for pagination to work correctly.

## Troubleshooting

- Dependency Conflicts: Ensure you have compatible versions of react, react-dom, and react-bootstrap.
- Styling Issues: Ensure Bootstrap is included in your project or adjust styles as needed.
- Pagination Limits: Ensure totalRecords accurately reflects the number of entries for pagination to work correctly.

## Contributing

Feel free to submit issues or pull requests for bug fixes or enhancements. Contributions are welcome!

### License

This project is licensed under the MIT License.
