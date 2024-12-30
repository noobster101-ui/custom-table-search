// index.d.ts

declare module 'custom-table-search' {
  import { FC } from 'react';

  export interface TableCustomProps {
    data: any[]; // Replace with a more specific type for your data
    columns: string[]; // Replace with the actual column type structure
    searchEnabled?: boolean;
    paginationEnabled?: boolean;
    // Add more props as necessary
  }

  // Define your component
  export const TableCustom: FC<TableCustomProps>;

  // If there's a default export, declare that as well
  const _default: FC<TableCustomProps>;
  export default _default;
}
