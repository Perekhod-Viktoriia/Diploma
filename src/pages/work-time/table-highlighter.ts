import { Injectable } from '@angular/core';

@Injectable()
export class TableHighlighter {

  private tableBody: any;
  private elementsToCheck: Array<any> = [];
  private currentCellIndex: number;
  private currentRowIndex: number;
  private config: Config;

  public setTableBody(tableBody: any): void {
    this.tableBody = tableBody;
  }

  public setConfig(config): void {
    this.config = config;
  }

  /**
   * Detects coordinates of current cell and adds highlight class for all cells above it
   *
   * @param {Event} event
   */
  public onMouseMove(event: Event): void {
    const currentCoordinates: any = this.getCurrentCoordinates(event);
    const cellIndex = currentCoordinates.cellIndex;
    const rowIndex = currentCoordinates.rowIndex;

    if (cellIndex === this.currentCellIndex && rowIndex === this.currentRowIndex) {
      return;
    }

    this.clearHighLight(cellIndex, rowIndex);
    this.saveCurrentCoordinates(cellIndex, rowIndex);

    for (const tr of this.tableBody.nativeElement.children) {
      if (tr.rowIndex >= rowIndex) {
        return;
      }

      const td = tr.children[cellIndex];

      if (!td.classList.contains(this.config.highlightClass)) {
        td.classList.add(this.config.highlightClass);
        this.elementsToCheck.push(td);
      }
    }
  }

  /**
   * Deletes highlight class from old cells
   *
   * @param {number} cellIndex
   * @param {number} rowIndex
   */
  public clearHighLight(cellIndex: number, rowIndex: number): void {
    for (const tdIndex in this.elementsToCheck) {
      if (!this.elementsToCheck.hasOwnProperty(tdIndex)) {
        continue;
      }

      const td = this.elementsToCheck[tdIndex];

      if (td.cellIndex !== cellIndex || td.parentNode.rowIndex > rowIndex) {
        td.classList.remove(this.config.highlightClass);
        delete this.elementsToCheck[tdIndex];
      }
    }
  }

  /**
   * @param {Event} event
   *
   * @return CellCoordinates
   */
  private getCurrentCoordinates(event: Event): CellCoordinates {
    let currentTd: HTMLTableDataCellElement = <HTMLTableDataCellElement>event.target;

    while (currentTd.nodeName !== 'TD') {
      currentTd = <HTMLTableDataCellElement>currentTd.parentNode;
    }

    const cellIndex: number = currentTd.cellIndex;
    const currentTr: HTMLTableRowElement = <HTMLTableRowElement>currentTd.parentElement;
    const rowIndex: number = currentTr.rowIndex;

    return {
      cellIndex: cellIndex,
      rowIndex: rowIndex
    };
  }

  /**
   * Saves current cell coordinates to avoid unnecessary check
   *
   * @param {number} cellIndex
   * @param {number} rowIndex
   */
  private saveCurrentCoordinates(cellIndex: number, rowIndex: number): void {
    this.currentCellIndex = cellIndex;
    this.currentRowIndex = rowIndex;
  }
}

interface CellCoordinates {
  cellIndex: number;
  rowIndex: number;
}

interface Config {
  highlightClass: string;
}
