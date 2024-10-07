import { LitElement, html } from 'lit';
import { employeeStyles } from './styles.js';
import { localization, getCurrentLang } from './dev/localization.js';
import './AddEmployee.js';


export class EmployeeList extends LitElement {
  static get styles() {
    return [employeeStyles];
  }

  static get properties() {
    return {
      employees: { type: Array },
      filteredEmployees: { type: Array },
      searchQuery: { type: String },
      currentPage: { type: Number },
      itemsPerPage: { type: Number },
      editingIndex: { type: Number },
      inlineEditIndex: { type: Number },
      viewMode: { type: String },
      showModal: { type: Boolean },
      employeeToDelete: { type: Number },
      language: { type: String },
    };
  }

  constructor() {
    super();
    this.language = getCurrentLang();
    const employeesFromStorage = this.loadEmployees();
    if (employeesFromStorage.length === 0) {
      this.loadDummyData();
    } else {
      this.employees = employeesFromStorage;
      this.filteredEmployees = [...this.employees];
    }
    this.searchQuery = '';
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.editingIndex = null;
    this.inlineEditIndex = null;
    this.errorMessage = '';
    this.viewMode = 'table';
    this.showModal = false;
    this.employeeToDelete = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.language = getCurrentLang();
  }

  getText(key) {
    return localization[this.language][key];
  }

  loadEmployees() {
    return JSON.parse(localStorage.getItem('employees')) || [];
  }

  saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  loadDummyData() {
    const dummyEmployees = [
      { firstName: 'Volkan', lastName: 'Sutcuoglu', dateEmployment: '2024-02-01', dateBirth: '1992-01-01', phone: '05371234567', email: 'volkan.sutcu@gmail.com', department: 'Analytics', position: 'Junior' },
      { firstName: 'Asli', lastName: 'Sutcuoglu', dateEmployment: '2023-01-01', dateBirth: '1993-02-01', phone: '05371234569', email: 'asli.sutcu@gmail.com', department: 'Tech', position: 'Medior' },
      { firstName: 'Burhan', lastName: 'Altintop', dateEmployment: '2024-06-01', dateBirth: '1988-01-01', phone: '05371234527', email: 'burhan.altintop@gmail.com', department: 'Tech', position: 'Senior' },
      { firstName: 'Sertac', lastName: 'Dj', dateEmployment: '2023-11-01', dateBirth: '1993-07-01', phone: '05371234369', email: 'sertac.123@gmail.com', department: 'Tech', position: 'Medior' },
      { firstName: 'Makbule', lastName: 'Sutcuoglu', dateEmployment: '2024-02-07', dateBirth: '1986-01-01', phone: '05371234567', email: 'makbulee.sutcu@gmail.com', department: 'Analytics', position: 'Junior' },
      { firstName: 'Tahsin', lastName: 'Sutcuoglu', dateEmployment: '2022-01-01', dateBirth: '1953-02-01', phone: '05371234561', email: 'tahsin.sutcu@gmail.com', department: 'Tech', position: 'Senior' },
    ];
    this.employees = dummyEmployees;
    this.filteredEmployees = [...this.employees];
    this.saveEmployees();
  }

  isEmailUnique(email) {
    return !this.employees.some(employee => employee.email === email);
  }

  addOrEditEmployee() {
    const firstName = this.shadowRoot.getElementById('firstName').value.trim();
    const lastName = this.shadowRoot.getElementById('lastName').value.trim();
    const dateEmployment = this.shadowRoot.getElementById('dateEmployment').value.trim();
    const dateBirth = this.shadowRoot.getElementById('dateBirth').value.trim();
    const phone = this.shadowRoot.getElementById('phone').value.trim();
    const email = this.shadowRoot.getElementById('email').value.trim();
    const department = this.shadowRoot.getElementById('department').value;
    const position = this.shadowRoot.getElementById('position').value;

    if (!firstName || !lastName || !email || !department || !position) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (this.editingIndex === null && !this.isEmailUnique(email)) {
      this.errorMessage = 'This email is already in use!';
      return;
    }

    if (this.editingIndex !== null) {
      this.employees[this.editingIndex] = { firstName, lastName, dateEmployment, dateBirth, phone, email, department, position };
      this.editingIndex = null;
    } else {
      this.employees = [...this.employees, { firstName, lastName, dateEmployment, dateBirth, phone, email, department, position }];
    }

    this.filteredEmployees = [...this.employees];
    this.saveEmployees();
    this.clearForm();
  }

  clearForm() {
    this.shadowRoot.getElementById('firstName').value = '';
    this.shadowRoot.getElementById('lastName').value = '';
    this.shadowRoot.getElementById('dateEmployment').value = '';
    this.shadowRoot.getElementById('dateBirth').value = '';
    this.shadowRoot.getElementById('phone').value = '';
    this.shadowRoot.getElementById('email').value = '';
    this.shadowRoot.getElementById('department').value = 'Analytics';
    this.errorMessage = '';
  }

  confirmDelete(index) {
    this.showModal = true;
    this.employeeToDelete = index;
  }

  deleteEmployee() {
    this.employees = this.employees.filter((_, i) => i !== this.employeeToDelete);
    this.filteredEmployees = [...this.employees];
    this.saveEmployees();
    this.showModal = false;
    this.employeeToDelete = null;
  }

  closeModal() {
    this.showModal = false;
    this.employeeToDelete = null;
  }

  removeEmployee(index) {
    this.confirmDelete(index);
  }

  editEmployeeInline(index) {
    this.inlineEditIndex = index;
  }

  saveInlineEmployee(index) {
    const firstName = this.shadowRoot.getElementById(`inlineFirstName${index}`).value.trim();
    const lastName = this.shadowRoot.getElementById(`inlineLastName${index}`).value.trim();
    const dateEmployment = this.shadowRoot.getElementById(`inlineEmployment${index}`).value.trim();
    const dateBirth = this.shadowRoot.getElementById(`inlineBirth${index}`).value.trim();
    const phone = this.shadowRoot.getElementById(`inlinePhone${index}`).value.trim();
    const email = this.shadowRoot.getElementById(`inlineEmail${index}`).value.trim();
    const department = this.shadowRoot.getElementById(`inlineDepartment${index}`).value;
    const position = this.shadowRoot.getElementById(`inlinePosition${index}`).value;

    if (!firstName || !lastName || !email || !department || !position) {
      alert('All fields are required');
      return;
    }

    this.employees[index] = { firstName, lastName, dateEmployment, dateBirth, phone, email, department, position };
    this.inlineEditIndex = null;
    this.filteredEmployees = [...this.employees];
    this.saveEmployees();
  }

  searchEmployees() {
    const query = this.searchQuery.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee => {
      return (
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query)
      );
    });
    this.currentPage = 1;
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'table' ? 'list' : 'table';
  }

  toggleLanguage() {
    this.language = this.language === 'en' ? 'tr' : 'en';
    document.documentElement.lang = this.language;
    this.requestUpdate(); 
  }

  render() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const visibleEmployees = this.filteredEmployees.slice(start, end);
    const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);

    return html`
      <div class="list-wrapper">
      <div class="language-switch" @click="${this.toggleLanguage}">
        Switch to ${this.language === 'en' ? 'Türkçe' : 'English'}
      </div>
      <h2>${this.getText('employeeList')}</h2>
        <div class="search-bar">
          <input
            type="text"
            class="search-input"
            placeholder="${this.getText('search')}"
            .value=${this.searchQuery}
            @input=${(e) => {
              this.searchQuery = e.target.value;
              this.searchEmployees();
            }}
          />
        </div>
        <button @click=${this.toggleViewMode}>Switch to ${this.viewMode === 'table' ? 'List' : 'Table'} View</button>
          
        <add-employee .language="${this.language}"></add-employee>

        ${this.viewMode === 'table' ? html`
          <table class="list-table">
            <thead>
              <tr>
                <th>${this.getText('firstName')}</th>
                <th>${this.getText('lastName')}</th>
                <th>${this.getText('dateEmployment')}</th>
                <th>${this.getText('dateBirth')}</th>
                <th>${this.getText('phone')}</th>
                <th>${this.getText('email')}</th>
                <th>${this.getText('department')}</th>
                <th>${this.getText('position')}</th>
                <th>${this.getText('actions')}</th>
              </tr>
            </thead>
            <tbody>
              ${visibleEmployees.map((emp, index) => html`
                <tr>
                  <td>${this.inlineEditIndex === index ? html`<input type="text" class="edit-input" id="inlineFirstName${index}" value=${emp.firstName} />` : emp.firstName}</td>
                  <td>${this.inlineEditIndex === index ? html`<input type="text" class="edit-input" id="inlineLastName${index}" value=${emp.lastName} />` : emp.lastName}</td>
                  <td>${this.inlineEditIndex === index ? html`<input type="date" class="edit-input" id="inlineEmployment${index}" value=${emp.dateEmployment} />` : emp.dateEmployment}</td>
                  <td>${this.inlineEditIndex === index ? html`<input type="date" class="edit-input" id="inlineBirth${index}" value=${emp.dateBirth} />` : emp.dateBirth}</td>
                  <td>${this.inlineEditIndex === index ? html`<input type="text" class="edit-input" id="inlinePhone${index}" value=${emp.phone} />` : emp.phone}</td>
                  <td>${this.inlineEditIndex === index ? html`<input type="email" class="edit-input" id="inlineEmail${index}" value=${emp.email} />` : emp.email}</td>
                  <td>${this.inlineEditIndex === index ? html`<select class="edit-input" id="inlineDepartment${index}">
                    <option value="Analytics" ?selected=${emp.department === 'Analytics'}>Analytics</option>
                    <option value="Tech" ?selected=${emp.department === 'Tech'}>Tech</option>
                  </select>` : emp.department}</td>
                  <td>${this.inlineEditIndex === index ? html`<select class="edit-input" id="inlinePosition${index}">
                    <option value="Junior" ?selected=${emp.position === 'Junior'}>Junior</option>
                    <option value="Medior" ?selected=${emp.position === 'Medior'}>Medior</option>
                  </select>` : emp.position}</td>
                  <td class="action-td">
                    ${this.inlineEditIndex === index ? html`
                      <button @click=${() => this.saveInlineEmployee(index)}>${this.getText('save')}</button>
                      <button @click=${() => this.inlineEditIndex = null}>${this.getText('cancel')}</button>
                    ` : html`
                      <button @click=${() => this.editEmployeeInline(index)}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
<path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
</svg></button>
                      <button @click=${() => this.removeEmployee(index)}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
<path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
</svg></button>
                    `}
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        ` : html`
          <div class="employee-list-view">
            ${visibleEmployees.map((emp, index) => html`

                <div class="list-view">
                  <strong>${emp.firstName} ${emp.lastName}</strong>
                                  <p>${this.getText('dateEmployment')}: ${emp.dateEmployment}</p>
                                  <p>${this.getText('dateBirth')}: ${emp.dateBirth}</p>
                                  <p>${this.getText('phone')}: ${emp.phone}</p>
                                  <p>${this.getText('email')}: ${emp.email}</p>
                                  <p>${this.getText('department')}: ${emp.department}</p>
                                  <p>${this.getText('position')}: ${emp.position}</p>
                                  <button @click=${() => this.editEmployeeInline(index)}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                  <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                  </svg></button>
                                  <button @click=${() => this.removeEmployee(index)}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
                  </svg></button>
                </div>
                
              </div>
            `)}
          </div>
        `}

        <div>
          ${Array.from({ length: totalPages }, (_, i) => html`
            <button
              @click=${() => {
                this.currentPage = i + 1;
              }}
              ?disabled=${this.currentPage === i + 1}
            >
              ${i + 1}
            </button>
          `)}
        </div>

        ${this.showModal ? html`
          <div class="modal">
            <div class="modal-content">
              <h3>${this.getText('areYouSure')}</h3>
              <button @click=${this.deleteEmployee}>${this.getText('yes')}</button>
              <button @click=${this.closeModal}>${this.getText('no')}</button>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
