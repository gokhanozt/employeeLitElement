import { LitElement, html, css } from 'lit';
import './EmployeeList.js';
import './AddEmployee.js';

export class NavigationMenu extends LitElement {
  static get styles() {
    return css`
      nav {
        display: flex;
        gap: 10px;
        background: var(--menu-background, #333);
        padding: 10px;
      }
      a {
        color: white;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    `;
  }

  render() {
    return html`
      <nav>
        <a href="/">Employee List</a>
        <a href="/add">Add Employee</a>
        
      </nav>
    `;
  }
}

window.customElements.define('navigation-menu', NavigationMenu);
