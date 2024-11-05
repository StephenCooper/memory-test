const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const moduleCombinations = [
  [], // Always do this first to get a base size to enable selfSize calculation
  ['AlignedGridsModule'],
  // ['AllCommunityEditorsModule'],
  ['AnimateShowChangeCellRendererModule'],
  ['AnimateSlideCellRendererModule'],
  ['AnimationFrameModule'],
  // ['AutoWidthModule'],
  ['CellApiModule'],
  ['CellFlashModule'],
  ['CellRendererFunctionModule'],
  ['CellStyleModule'],
  ['ChangeDetectionModule'],
  ['CheckboxCellRendererModule'],
  ['ClientSideRowModelApiModule'],
  ['ClientSideRowModelCoreModule'],
  ['ClientSideRowModelFilterModule'],
  ['ClientSideRowModelModule'],
  ['ClientSideRowModelSortModule'],
  ['ColumnAnimationModule'],
  ['ColumnApiModule'],
  ['ColumnAutosizeApiModule'],
  ['ColumnAutosizeCoreModule'],
  ['ColumnAutosizeModule'],
  ['ColumnFilterApiModule'],
  ['ColumnFilterMenuModule'],
  ['ColumnFilterModule'],
  ['ColumnFlexModule'],
  ['ColumnGroupApiModule'],
  ['ColumnGroupCoreModule'],
  ['ColumnGroupHeaderCompModule'],
  ['ColumnGroupModule'],
  ['ColumnHeaderCompModule'],
  ['ColumnHoverModule'],
  ['ColumnMoveApiModule'],
  ['ColumnMoveCoreModule'],
  ['ColumnMoveModule'],
  ['ColumnResizeApiModule'],
  ['ColumnResizeCoreModule'],
  ['ColumnResizeModule'],
  //['CommunityCoreModule'],
  ['CommunityFeaturesModule'],
  ['CommunityMenuApiModule'],
  //['CoreApiModule'],
  ['_CsrmSsrmSharedApiModule'],
  ['CsvExportApiModule'],
  ['CsvExportCoreModule'],
  ['CsvExportModule'],
  ['DataTypeEditorsModule'],
  ['DataTypeModule'],
  ['DefaultEditorModule'],
  ['DragAndDropModule'],
  ['DragModule'],
  ['EditApiModule'],
  ['EditCoreModule'],
  ['EditModule'],
  ['EventApiModule'],
  ['ExpressionModule'],
  ['FilterApiModule'],
  ['FilterCoreModule'],
  ['FilterModule'],
  ['FilterValueModule'],
  ['FloatingFilterCoreModule'],
  ['FloatingFilterModule'],
  ['FullRowEditModule'],
  ['GetColumnDefsApiModule'],
  ['HorizontalResizeModule'],
  ['InfiniteRowModelApiModule'],
  ['InfiniteRowModelCoreModule'],
  ['InfiniteRowModelModule'],
  ['KeyboardNavigationApiModule'],
  ['KeyboardNavigationCoreModule'],
  ['KeyboardNavigationModule'],
  ['LargeTextEditorModule'],
  ['LoadingOverlayModule'],
  ['LocaleModule'],
  ['NativeDragModule'],
  ['NoRowsOverlayModule'],
  ['OverlayApiModule'],
  ['OverlayCoreModule'],
  ['OverlayModule'],
  ['PaginationApiModule'],
  ['PaginationCoreModule'],
  ['PaginationModule'],
  ['PinnedColumnModule'],
  ['PinnedRowApiModule'],
  ['PinnedRowCoreModule'],
  ['PinnedRowModule'],
  ['PopupModule'],
  ['QuickFilterApiModule'],
  ['QuickFilterCoreModule'],
  ['QuickFilterModule'],
  ['ReadOnlyFloatingFilterModule'],
  ['RenderApiModule'],
  ['RowApiModule'],
  ['RowAutoHeightModule'],
  ['RowDragApiModule'],
  ['RowDragCoreModule'],
  ['RowDragModule'],
  //['RowNodeBlockModule'],
  ['RowSelectionApiModule'],
  ['RowSelectionCoreModule'],
  ['RowSelectionModule'],
  ['RowStyleModule'],
  ['ScrollApiModule'],
  ['SelectEditorModule'],
  ['SelectionColumnModule'],
  ['SharedMenuModule'],
  ['SimpleFilterModule'],
  ['SimpleFloatingFilterModule'],
  ['SortApiModule'],
  ['SortCoreModule'],
  ['SortIndicatorCompModule'],
  ['SortModule'],
  ['_SsrmInfiniteSharedApiModule'],
  ['StateApiModule'],
  ['StateCoreModule'],
  ['StateModule'],
  ['StickyRowModule'],
  ['TooltipCoreModule'],
  ['TooltipCompModule'],
  ['TooltipModule'],
  ['UndoRedoEditModule'],
  ['ValidationModule'],
  ['ValueCacheModule'],
  // Add more combinations as needed
  // Enterprise
     ['AdvancedFilterApiModule'],
     ['AdvancedFilterCoreModule'],
     ['AdvancedFilterModule'],
     ['AggregationModule'],
     ['ClientSideRowModelExpansionModule'],
     ['ClipboardApiModule'],
     ['ClipboardCoreModule'],
     ['ClipboardModule'],
     ['ColumnChooserModule'],
     ['ColumnMenuModule'],
     ['ColumnsToolPanelCoreModule'],
     ['ColumnsToolPanelModule'],
     ['ColumnsToolPanelRowGroupingModule'],
     ['ContextMenuModule'],
     ['EnterpriseCoreModule'],
     ['ExcelExportApiModule'],
     ['ExcelExportCoreModule'],
     ['ExcelExportModule'],
     ['FiltersToolPanelModule'],
     ['GridChartsApiModule'],
     ['GridChartsCoreModule'],
     ['GridChartsEnterpriseFeaturesModule'],
     ['GridChartsModule'],
     ['GroupCellRendererModule'],
     ['GroupColumnModule'],
     ['GroupFilterModule'],
     ['GroupFloatingFilterModule'],
     ['LoadingCellRendererModule'],
     ['MasterDetailApiModule'],
     ['MasterDetailCoreModule'],
     ['MasterDetailModule'],
     ['MenuApiModule'],
     ['MenuCoreModule'],
     ['MenuItemModule'],
     ['MenuModule'],
     ['MultiFilterCoreModule'],
     ['MultiFilterModule'],
     ['MultiFloatingFilterModule'],
     ['PivotApiModule'],
     ['PivotCoreModule'],
     ['PivotModule'],
     ['RangeSelectionApiModule'],
     ['RangeSelectionCoreModule'],
     ['RangeSelectionFillHandleModule'],
     ['RangeSelectionModule'],
     ['RangeSelectionRangeHandleModule'],
     ['RichSelectModule'],
     ['RowGroupingApiModule'],
     ['RowGroupingCoreModule'],
     ['RowGroupingModule'],
     ['RowGroupingNoPivotModule'],
     ['RowGroupingPanelModule'],
     ['ServerSideRowModelApiModule'],
     ['ServerSideRowModelCoreModule'],
     ['ServerSideRowModelModule'],
     ['ServerSideRowModelRowGroupingModule'],
     ['ServerSideRowModelRowSelectionModule'],
     ['ServerSideRowModelSortModule'],
     ['SetFilterCoreModule'],
     ['SetFilterModule'],
     ['SetFloatingFilterModule'],
     ['SideBarApiModule'],
     ['SideBarCoreModule'],
     ['SideBarModule'],
     ['SideBarSharedModule'],
     ['SkeletonCellRendererModule'],
     ['SparklinesModule'],
     ['StatusBarApiModule'],
     ['StatusBarCoreModule'],
     ['StatusBarModule'],
     ['StatusBarSelectionModule'],
     ['TreeDataCoreModule'],
     ['TreeDataModule'],
     ['ViewportRowModelCoreModule'],
     ['ViewportRowModelModule'],
];



const results = [];
const updateModulesScript = path.join(__dirname, 'updateModules.cjs');
let baseSize = 0;

function runCombination(index) {
  if (index >= moduleCombinations.length) {
    // Save results to a JSON file
    fs.writeFileSync('results.json', JSON.stringify(results, null, 2));
    console.log('Results saved to results.json');
    return;
  }

  const modules = moduleCombinations[index];
  const command = `node ${updateModulesScript} ${modules.join(' ')}`;

  

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error running combination ${modules.join(', ')}:`, err);
      return;
    }

    console.log(stdout);
    console.error(stderr);

    // Extract file size and gzip size from the output
    const fileSizeMatch = stdout.match(/File size: (\d+\.\d+) kB/);
    const gzipSizeMatch = stdout.match(/gzip size: (\d+\.\d+) kB/);
    
    if (fileSizeMatch && gzipSizeMatch) {
      const fileSize = parseFloat(fileSizeMatch[1]);
      const gzipSize = parseFloat(gzipSizeMatch[1]);

      let selfSize = 0;
      if(modules.length === 0) {
        baseSize = fileSize;
        selfSize = fileSize;
      }else{
        selfSize = parseFloat((fileSize - baseSize).toFixed(2));
      }

      results.push({
        modules,
        selfSize,
        fileSize,
        gzipSize,
      });
    }

    // Run the next combination
    runCombination(index + 1);
  });
}

// Start running combinations
runCombination(0);