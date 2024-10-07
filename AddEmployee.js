import { LitElement, html } from 'lit';
import { employeeStyles } from './styles.js';
import { localization, getCurrentLang } from './dev/localization.js';

export class AddEmployee extends LitElement {
  static get properties() {
    return {
      errorMessage: { type: String },
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
      department: { type: String },
      position: { type: String },
      language: { type: String },
    };
  }

  static get styles() {
    return [employeeStyles];
  }

  constructor() {
    super();
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.department = '';
    this.position = '';
    this.errorMessage = '';
    this.language = getCurrentLang();
  }

  connectedCallback() {
    super.connectedCallback();
    this.language = getCurrentLang();
  }

  getText(key) {
    return localization[this.language][key];
  }


  addOrEditEmployee() {
    if (!this.firstName || !this.lastName || !this.email || !this.department || !this.position) {
      this.errorMessage = 'All fields are required.';
      return;
    }
    this.errorMessage = 'Employee added/updated successfully!';
  }

  render() {
    return html`
      <div class="add-record">
            <h3>${this.getText('addEmployee')}</h3>
            <div class="input-container">
              <input type="text" id="firstName" placeholder="${this.getText('firstName')}" />
              <input type="text" id="lastName" placeholder="${this.getText('lastName')}" />
              <input type="date" id="dateEmployment" placeholder="${this.getText('dateEmployment')}" />
              <input type="date" id="dateBirth" placeholder="${this.getText('dateBirth')}" />
              <input type="text" id="phone" placeholder="${this.getText('phone')}" />
              <input type="email" id="email" placeholder="${this.getText('email')}" />
              <select id="department">
                <option value="Analytics">Analytics</option>
                <option value="Tech">Tech</option>
              </select>
              <select id="position">
                <option value="Junior">Junior</option>
                <option value="Medior">Medior</option>
              </select>
              <button @click=${this.addOrEditEmployee}>${this.getText('addEmployee')}</button>
              ${this.errorMessage ? html`<div class="error-message">${this.errorMessage}</div>` : ''}
            </div>
         </div>
    `;
  }
}

customElements.define('add-employee', AddEmployee);
