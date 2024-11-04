import {
  // ClientSideRowModelModule,
  ColDef,
  GridPreDestroyedEvent,
  GridState,
  // ModuleRegistry,
  // SortModule,
  StateUpdatedEvent,
  themeQuartz
} from "ag-grid-community";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ColumnGroupHeaderCompModule
// import {
//   MenuModule,
//   // setupCommunityIntegratedCharts,
//   setupEnterpriseIntegratedCharts,
// } from "ag-grid-enterprise";

export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

// import {
//   AgCharts,
//   VERSION,
//   _ModuleSupport,
//   _Scale,
//   _Scene,
//   _Theme,
//   _Util,
//   time,
// } from "ag-charts-community";
// import { setupCommunityModules } from 'ag-charts-community/modules';
// import { setupEnterpriseModules } from "ag-charts-enterprise/modules";

// const chartCode = {
//   AgCharts,
//   VERSION,
//   _ModuleSupport,
//   _Scale,
//   _Scene,
//   _Theme,
//   _Util,
//   time,
// };
// setupCommunityIntegratedCharts({
//     ...chartCode,
//     setupModules: () => {
//         setupCommunityModules();
//     },
// });
// setupEnterpriseIntegratedCharts({
//   ...chartCode,
//   setupModules: () => {
//     setupEnterpriseModules();
//   },
// });


// import { ClientSideRowModelCoreModule } from 'ag-grid-community';
// import { themeQuartz } from 'ag-grid-community';

  // CommunityFeaturesModule, ColumnHeaderCompModule,ClientSideRowModelCoreModule
  // ModuleRegistry.registerModules([ClientSideRowModelCoreModule , SortModule]);
  // ModuleRegistry.registerModules([ClientSideRowModelModule ]);

export const App = () => {
  const gridRef = useRef<AgGridReact<IOlympicData>>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<IOlympicData[]>();
  const [columnDefs] = useState<ColDef[]>([
    {
      field: "athlete",
      minWidth: 150,
    },
    { field: "age", maxWidth: 90 },
    { field: "country", minWidth: 150 },
    { field: "year", maxWidth: 90 },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      filter: true,
    };
  }, []);
  const [initialState, setInitialState] = useState<GridState>();
  const [currentState, setCurrentState] = useState<GridState>();
  const [gridVisible, setGridVisible] = useState(true);

  const onGridReady = () => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => setRowData(data));
  };

  const reloadGrid = useCallback(() => {
    setGridVisible((p) => !p);
  }, []);

  useEffect(() => {
    if (gridVisible) {
      setRowData(undefined);
      setGridVisible(true);
    }
    // console.log(gridRef.current)
  }, [gridVisible]);

  const onGridPreDestroyed = useCallback(
    (params: GridPreDestroyedEvent<IOlympicData>) => {
      const { state } = params;
      // console.log('Grid state on destroy (can be persisted)', state);
      setInitialState(state);
    },
    []
  );

  const onStateUpdated = useCallback(
    (params: StateUpdatedEvent<IOlympicData>) => {
      // console.log('State updated', params.state);
      setCurrentState(params.state);
    },
    []
  );

  const printState = useCallback(() => {
    console.log("Grid state", currentState);
    gridRef.current?.api?.ensureIndexVisible(-1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setRowData("" as any);
  }, [currentState]);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div>
          <span className="button-group">
            <button onClick={reloadGrid}>
              Recreate Grid with Current State
            </button>
            <button onClick={printState}>Print State</button>
          </span>
        </div>
        <div style={gridStyle} className={"ag-theme-quartz-dark"}>
          {gridVisible && (
            <AgGridReact<IOlympicData>
              ref={gridRef}
              theme={themeQuartz}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              suppressColumnMoveAnimation={true}
              initialState={initialState}
              onGridReady={onGridReady}
              onGridPreDestroyed={onGridPreDestroyed}
              onStateUpdated={onStateUpdated}
              // cellSelection={true}
              // enableCharts={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};
