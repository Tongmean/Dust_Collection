import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { ModuleRegistry } from 'ag-grid-community';
// import { ClientSideRowModelModule } from 'ag-grid-community';
// import { provideGlobalGridOptions } from 'ag-grid-community';

// // Mark all grids as using legacy themes
// provideGlobalGridOptions({ theme: "legacy" });
// ModuleRegistry.registerModules([ClientSideRowModelModule]);

const Tablecomponent = ({
    columnDefs,
    rowData,
    rowSelection = 'multiple',
    defaultColDef = {
        resizable: true,
        sortable: true,
        filter: 'agTextColumnFilter', // Add text filter to all columns
        filter: true, // Enable filtering

        editable: true,
        flex: 1,
        minWidth: 100,
    },
    onGridReady,
    onSelectionChanged,
}) => {
    return (
        <div className="ag-theme-alpine" style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
        <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                rowSelection={rowSelection}
                defaultColDef={defaultColDef}
                onSelectionChanged={onSelectionChanged}
                onGridReady={onGridReady}
                enableFilter={true}
                enableSorting={true}
                floatingFilter={true} // Add this
            />

        </div>
    );
};

export default Tablecomponent;
