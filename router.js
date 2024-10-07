// router.js
import { Router } from '@vaadin/router';

export function initRouter(outlet) {
  const router = new Router(outlet);
  router.setRoutes([
    { path: '/', component: 'employee-list' },
    { path: '/add-employee', component: 'add-employee' },
    // Other routes if needed
  ]);
}
