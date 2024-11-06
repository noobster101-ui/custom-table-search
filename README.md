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

## Usage

### Here’s an example of how to integrate custom-table-search in your React project:

    import React, { useState, useEffect } from 'react';

    import TableCustom from 'custom-table-search';
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

    const MyTableComponent = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    // Define columns with properties like searchability and sortability
    const columns = [
    { key: "id", label: "ID", sortable: true, type: "number" },
    { key: "name", label: "Name", searchable: true, sortable: true, type: "text" },
    { key: "email", label: "Email", searchable: true, sortable: true, type: "email" },
    { key: "status", label: "Status", searchable: true, sortable: true, type: "text" },
    { key: "actions", label: "Actions", type: "none" },
    ];

    // Define action buttons for each row
    const dataWithActions = data.map((row) => ({
    ...row,
    actions: (
        <div className="d-flex justify-content-center">
            <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(row)}>
                <FontAwesomeIcon icon={["fas", "edit"]} />
            </button>
            <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(row)}>
                <FontAwesomeIcon icon={["fas", "trash"]} />
            </button>
            <button className="btn btn-info btn-sm" onClick={() => handleView(row)}>
                <FontAwesomeIcon icon={["fas", "eye"]} />
            </button>
        </div>
        ),
    }));

    useEffect(() => {
    fetchData(currentPage, pageSize);
    }, [currentPage, pageSize]);

    // Fetch data function (to be replaced with actual data fetching logic)
    const fetchData = (page, size, searchCriteria, sortConfig) => {
    // Example: Fetch or filter data, then update states
    console.log("Fetching data with:", { page, size, searchCriteria, sortConfig });
    setData(sampleData); // Replace with real data fetching
    setTotalRecords(sampleData.length); // Update based on real data
    };

    const handleEdit = (row) => console.log("Edit:", row);
    const handleDelete = (row) => console.log("Delete:", row);
    const handleView = (row) => console.log("View:", row);

    return (
            <TableCustom
                data={dataWithActions}
                columns={columns}
                gridViewEnabled={true}
                entriesEnabled={true}
                paginationEnabled={true}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                fetchPage={fetchData}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalRecords={totalRecords}
            />
        );
    };

    export default MyTableComponent;

## Props

### Core Props

| Prop              | Type     | Description                                                                            |
| ----------------- | -------- | -------------------------------------------------------------------------------------- |
| data              | Array    | Array of data objects for each row.                                                    |
| columns           | Array    | Column configuration with options like label, searchability, and sortability.          |
| gridViewEnabled   | Boolean  | Enables toggle between grid and table view.                                            |
| entriesEnabled    | Boolean  | Enables page size dropdown to control entries per page.                                |
| paginationEnabled | Boolean  | Enables pagination controls for navigating pages.                                      |
| currentPage       | Number   | Current page number for pagination.                                                    |
| setCurrentPage    | Function | Function to update the current page.                                                   |
| fetchPage         | Function | Function to fetch data for the specified page and size, taking search/sort parameters. |
| pageSize          | Number   | Number of records per page.                                                            |
| setPageSize       | Function | Function to set the number of records per page.                                        |
| totalRecords      | Number   | Total number of records for accurate pagination.                                       |

### Column Configuration

Each column object in the columns array can have the following properties:

| Column Property | Type    | Description                                           |
| --------------- | ------- | ----------------------------------------------------- |
| key             | String  | Unique identifier for the column.                     |
| label           | String  | Display name for the column header.                   |
| sortable        | Boolean | Allows sorting when true.                             |
| searchable      | Boolean | Enables search/filtering for this column.             |
| textAlign       | String  | Aligns text within the column (e.g., "center").       |
| type            | String  | Input type for search fields (e.g., "text", "email"). |

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
