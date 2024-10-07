import { css } from 'lit';

export const employeeStyles = css`
  :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 1400px;
        min-width: 600px;
        color: var(--text-color, #333);
        border-radius:8px;
        margin-bottom: 20px;
      }
      .list-wrapper {
        position: relative;
      }
      .language-switch {
        cursor: pointer;
        display: inline-block;
        position: absolute;
        right: 0;
      }

      button, .language-switch {
        margin: 8px 0;
        padding: 4px 8px;
        height: 30px;
        border-radius: 8px;
        border: 1px solid var(--light-gray);
      }
      button:hover, .language-switch:hover {
        cursor: pointer;
        background-color: var(--button-hover);
      }
      .input-container{
        display: grid;
        grid-gap: 10px 12px;
        grid-template-columns: auto auto;
      }
      .search-input {
        width: 100%;
      }
      input, select {
        height: 30px;
        text-indent: 5px;
        border: 1px solid var(--border);;
        border-radius: 8px;
        min-width: 100px;
      }
      input[type="date"]:before {
        color: lightgrey;
        content: attr(placeholder) !important;
        margin-right: 0.5em;
        font-size: 8px;
      }
      input[type="date"]:focus:before {
        content: '' !important;
      }
      .table-wrapper{
        margin: 10px 70px 70px;
        box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
      }
      .list-table {
          border-radius: 5px;
          font-size: 12px;
          font-weight: normal;
          border: none;
          border-collapse: collapse;
          width: 100%;
          max-width: 100%;
          white-space: nowrap;
          background-color: white;
      }

      .list-table td, .list-table th {
          text-align: center;
          padding: 8px;
      }

      .list-table td {
          border-right: 1px solid var(--light-gray);
          font-size: 12px;
      }

      .list-table thead th {
          color: var(--text-color);
          background: var(--light-gray, #333);
      }


      .list-table thead th:nth-child(odd) {
          color: var(--white);
          background: var(--dark-gray, #333);
      }

      .list-table tr:nth-child(even) {
          background: var(--table-bg);
      }

      @media (max-width: 767px) {
          :host {
            min-width: unset;
          }
          .list-table {
              display: block;
              width: 100%;
          }
          .table-wrapper:before{
              display: block;
              text-align: right;
              font-size: 11px;
              color: white;
              padding: 0 0 10px;
          }
          .list-table thead, .list-table tbody, .list-table thead th {
              display: block;
          }
          .list-table thead th:last-child{
              border-bottom: none;
          }
          .list-table thead {
              float: left;
          }
          .list-table tbody {
              width: auto;
              position: relative;
              overflow-x: auto;
          }
          .list-table td, .list-table th {
              padding: 20px .625em .625em .625em;
              height: 60px;
              vertical-align: middle;
              box-sizing: border-box;
              overflow-x: hidden;
              overflow-y: auto;
              width: 120px;
              font-size: 13px;
              text-overflow: ellipsis;
          }

          .list-table .action-td {
            padding: 0;
          }
          .list-table thead th {
              text-align: left;
              border-bottom: 1px solid var(--light-gray);
          }
          .list-table tbody tr {
              display: table-cell;
          }
          .list-table tbody tr:nth-child(odd) {
              background: none;
          }
          .list-table tr:nth-child(even) {
              background: transparent;
          }
          .list-table tr td:nth-child(odd) {
              background: var(--table-bg);
              border-right: 1px solid var(--border);
          }
          .list-table tr td:nth-child(even) {
              border-right: 1px solid var(--border);
          }
          .list-table tbody td {
              display: block;
              text-align: center;
          }
      }

      .search-bar {
        margin-bottom: 10px;
      }
      .error-message {
        color: var(--red);
        font-size: 12px;
        margin-top: 5px;
      }
      .edit-input {
        width: 100px;
        padding: 2px;
        margin: 0;
      }
      .employee-list-view {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
        max-height: 450px;
        overflow: scroll;
      }
      .employee-list-view .list-view:nth-child(odd) {
        background-color: var(--light-gray);
      }
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--modal-bg);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      .modal-content {
        background: white;
        padding: 20px;
        border-radius: 5px;
        text-align: center;
      }
      .modal button {
        margin: 0 5px;
      }

      button svg {
        width: 15px;
        height: 15px;
      }
`;
