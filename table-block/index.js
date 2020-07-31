editor.block("table", {
  // will appear as title in the blocks dropdown
  label: "Table",

  // icon for the blocks dropdown
  icon: "menu",

  // get the content and attrs of the block as props
  props: {
    content: String,
    attrs: [Array, Object],
  },

  data() {
    return {
      columns: this.attrs.columns || [
        {
          id: this.uuid(),
          label: ""
        },
        {
          id: this.uuid(),
          label: ""
        }
      ],
      rows: this.attrs.rows || [
        ["", ""],
        ["", ""]
      ]
    };
  },

  watch: {
    columns: {
      handler() {
        if (this.columns.length === 0) {
          this.columns = [{
            id: this.uuid(),
            label: ""
          }];
        }
      },
      immediate: true
    }
  },

  // block methods
  methods: {
    appendColumn(after) {
      this.insertColumn(after + 1);
    },
    // appendRow(after, column) {
    //   this.rows.push([]);

    //   this.$nextTick(() => {
    //     this.focusOnCell(after + 1, column);
    //   });
    // },
    pushRow(rowIndex, rowLength, columnIndex) {
      if( rowIndex == rowLength ) {
        this.rows.push([]);
        this.$nextTick(() => {
          this.focusOnCell(rowIndex + 1, columnIndex);
        });
      }else{
        this.$nextTick(() => {
          this.focusOnCell(rowIndex + 1, columnIndex);
        });
      }
    },
    popRow(rowIndex, rowLength, columnIndex) {
      if( rowIndex == rowLength && columnIndex == 0 ) {
        this.rows.pop();
        this.focusOnCell(rowIndex - 1, columnIndex);
      }else{
        this.focusOnCell(rowIndex - 1, columnIndex);
      }
    },
    deleteColumn(index) {
      this.columns.splice(index, 1);
      this.rows.forEach(row => {
        this.$delete(row, index);
      });
    },
    insertColumn(index) {
      this.columns.splice(index, 0, {
        id: this.uuid(),
        label: ""
      });

      this.rows.forEach(row => {
        row.splice(index, 0, "");
      });
    },
    findCell(row, column) {
      const id = "cell-" + row + "-" + column;

      if (this.$refs[id]) {
        return this.$refs[id][0];
      }
    },
    focus() {
      // this.focusOnCell(0, 0);
    },
    focusOnCell(row, column) {
      const cell = this.findCell(row, column);

      if (cell) {
        cell.focus();
      }
    },
    focusOnPrevCell(row, column) {
      this.focusOnCell(row, column - 1);
    },
    focusOnNextCell(row, column) {
      this.focusOnCell(row, column + 1);
    },
    prependColumn(before) {
      this.insertColumn(before);
    },
    update() {
      this.$emit("input", {
        attrs: {
          columns: this.columns,
          rows: this.rows
        }
      });
    },
    updateColumn(html, column) {
      this.$set(this.columns[column], "label", html);
      this.update();
    },
    updateCell(html, row, cell) {
      this.$set(this.rows[row], cell, html);
      this.update();
    },
    uuid() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  },
  template: `
    <div>
      <table>
        <tr>
          <th v-for="(column, columnKey) in columns" :key="column.id">
            <div>
              <k-editable
                :content="column.label"
                :marks="[]"
                placeholder="New column …"
                @input="updateColumn($event, columnKey)"
                @next="focusOnCell(0, columnKey)"
              />
              <k-dropdown>
                <k-button class="k-editor-table-block-column-settings" icon="angle-down" @click="$refs['columnSettings-' + column.id][0].toggle()" />
                <k-dropdown-content :ref="'columnSettings-' + column.id" align="right">
                  <k-dropdown-item icon="angle-left" @click="prependColumn(columnKey)">Insert left</k-dropdown-item>
                  <k-dropdown-item icon="angle-right" @click="appendColumn(columnKey)">Insert right</k-dropdown-item>
                  <hr>
                  <k-dropdown-item icon="trash" @click="deleteColumn(columnKey)">Delete column</k-dropdown-item>
                </k-dropdown-content>
              </k-dropdown>
            </div>
          </th>
        </tr>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td v-for="(column, columnIndex) in columns" :key="column.id + '-' + rowIndex">
            <k-editable
              :ref="'cell-' + rowIndex + '-' + columnIndex"
              :breaks="true"
              :content="row[columnIndex]"
              @input="updateCell($event, rowIndex, columnIndex)"
              @enter="pushRow(rowIndex, rows.length-1, columnIndex)"
              @back="popRow(rowIndex, rows.length-1, columnIndex)"
              @prev="focusOnCell(rowIndex - 1, columnIndex)"
              @next="focusOnCell(rowIndex + 1, columnIndex)"
              @tab="focusOnNextCell(rowIndex, columnIndex)"
              @shiftTab="focusOnPrevCell(rowIndex, columnIndex)"
            />
          </td>
        </tr>
      </table>
    </div>
  `,
});

// @enter="appendRow(rowIndex, columnIndex)"

////////////// SMT BLOCK ///////////////////////
editor.block("table-smt", {
  extends: "table",
  label: "Table for SMT",
  icon: "menu",

  data() {
    return {
      columns: this.attrs.columns || [
        {
          id: this.uuid(),
          label: ""
        },
        {
          id: this.uuid(),
          label: ""
        },
        {
          id: this.uuid(),
          label: ""
        },
        {
          id: this.uuid(),
          label: ""
        }
      ],
      rows: this.attrs.rows || [
        ["<strong>Stencil</strong>", "", "", ""],
        ["<strong>Solder</strong>", "Alpha OM-5100", "Alpha CVP-390", "Alpha WS-820"],
        ["<strong>Ekra</strong>", "", "", ""],
        ["<strong>Hitachi</strong>", "", "", ""],
        ["<strong>Genesis</strong>", "", "", ""],
        ["<strong>GSM</strong>", "", "", ""],
        ["<strong>Advantis</strong>", "", "", ""],
        ["<strong>Oven</strong>", "_Regular-Lead", "_Lead-Free", "WS-820_Ramp-Profile2"],
      ]
    };
  },
});

// ////////////// AOI BLOCK ///////////////////////
// editor.block("table-aoi", {
//   extends: "table",
//   label: "Table for AOI",
//   icon: "menu",

//   data() {
//     return {
//       columns: this.attrs.columns || [
//         {
//           id: this.uuid(),
//           label: ""
//         },
//         {
//           id: this.uuid(),
//           label: ""
//         }
//       ],
//       rows: this.attrs.rows || [
//         ["<strong>AOI</strong>", ""],
//         ["<strong>Mantis</strong>", ""],
//         ["", ""],
//       ]
//     };
//   },
// });

// ////////////// Select BLOCK ///////////////////////
// editor.block("table-select", {
//   extends: "table",
//   label: "Table for Selective Solder",
//   icon: "menu",

//   data() {
//     return {
//       columns: this.attrs.columns || [
//         {
//           id: this.uuid(),
//           label: ""
//         },
//         {
//           id: this.uuid(),
//           label: ""
//         }
//       ],
//       rows: this.attrs.rows || [
//         ["<strong>Program</strong>", ""],
//         ["<strong>Nozzle Size</strong>", ""],
//         ["<strong>Flux Type</strong>", ""],
//       ]
//     };
//   },
// });

////////////// Kit BLOCK ///////////////////////
editor.block("table-kit", {
  extends: "table",
  label: "Table for Kitting",
  icon: "menu",

  data() {
    return {
      columns: this.attrs.columns || [
        {
          id: this.uuid(),
          label: ""
        },
        {
          id: this.uuid(),
          label: ""
        }
      ],
      rows: this.attrs.rows || [
        ["<strong>SMT Parts</strong>", "✔"],
        ["<strong>Thru-hole Parts</strong>", "✔"],
        ["<strong>Mechanical Parts</strong>", "✔"],
        ["<strong>PCB</strong>", ""],
        ["<strong>Barcodes</strong>", "  -digits"],
      ]
    };
  },
});

////////////// Pack BLOCK ///////////////////////
editor.block("table-pack", {
  extends: "table",
  label: "Table for Packing",
  icon: "menu",

  data() {
    return {
      columns: this.attrs.columns || [
        {
          id: this.uuid(),
          label: ""
        },
        {
          id: this.uuid(),
          label: ""
        }
      ],
      rows: this.attrs.rows || [
        ["<strong>ESD Bag</strong>", ""],
        ["<strong>Dividers</strong>", ""],
        ["<strong>Box Size</strong>", "18x18x12"],
      ]
    };
  },
});

////////////// CF8 BLOCK ///////////////////////
editor.block("table-cf8", {
  extends: "table",
  label: "Table for CF8 Prep",
  icon: "menu",

  data() {
    return {
      columns: this.attrs.columns || [
        {
          id: this.uuid(),
          label: "CF8"
        },
        {
          id: this.uuid(),
          label: "2"
        },
        {
          id: this.uuid(),
          label: "3"
        },
        {
          id: this.uuid(),
          label: "4"
        },
        {
          id: this.uuid(),
          label: "5"
        },
        {
          id: this.uuid(),
          label: "6"
        },
        {
          id: this.uuid(),
          label: "7"
        },
      ],
      rows: this.attrs.rows || [
        ["", "", "", "", "", "", ""],
      ]
    };
  },
});