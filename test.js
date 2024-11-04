import {createGrid} from 'ag-grid-community';
console.log('can we crate',createGrid);


// console.log(typeof global === "undefined" ? {} : global);
 console.log(typeof window === "undefined" ? {} : window);
// globalObj.HTMLElement = typeof HTMLElement === "undefined" ? {} : HTMLElement;
// globalObj.HTMLButtonElement = typeof HTMLButtonElement === "undefined" ? {} : HTMLButtonElement;
// globalObj.HTMLSelectElement = typeof HTMLSelectElement === "undefined" ? {} : HTMLSelectElement;
// globalObj.HTMLInputElement = typeof HTMLInputElement === "undefined" ? {} : HTMLInputElement;
// globalObj.Node = typeof Node === "undefined" ? {} : Node;
// globalObj.MouseEvent = typeof MouseEvent === "undefined" ? {} : MouseEvent;

console.log('mouse',typeof MouseEvent === "undefined" ? {} : MouseEvent)


const gridApi = createGrid({});

console.log(gridApi);