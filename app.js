import { Router } from '@vaadin/router';
import './EmployeeList.js';
import './AddEmployee.js';

window.addEventListener('load', () => {
  initRouter();
});

function initRouter() {
  const router = new Router(document.querySelector('#outlet'));
  router.setRoutes([
    { path: '/', component: 'employee-list' },
    { path: '/add', component: 'add-employee' },
  ]);
}
