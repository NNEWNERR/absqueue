import { Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';
import { SidemenuPage } from './pages/sidemenu/sidemenu.page';

export const routes: Routes = [
  {
    path: 'silde',
    loadComponent: () =>
      import('./pages/silde/silde.page').then((m) => m.SildePage),
  },
  {
    path: 'sidemenu',
    component: SidemenuPage,
    children: [
      {
        path: 'tabs',
        component: TabsPage,
        children: [
          {
            path: 'home',
            loadComponent: () =>
              import('./pages/tabs/home/home.page').then((m) => m.HomePage),
          },
          {
            path: 'booking',
            loadComponent: () =>
              import('./pages/tabs/booking/booking.page').then(
                (m) => m.BookingPage
              ),
          },
          {
            path: 'scan',
            loadComponent: () =>
              import('./pages/tabs/scan/scan.page').then((m) => m.ScanPage),
          },
          {
            path: 'settings',
            loadComponent: () =>
              import('./pages/tabs/settings/settings.page').then(
                (m) => m.SettingsPage
              ),
          },
          {
            path: '',
            redirectTo: 'tabs/home',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: '',
        redirectTo: '/sidemenu/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'silde',
    pathMatch: 'full',
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./pages/terms/terms.page').then((m) => m.TermsPage),
  },
  {
    path: 'person',
    loadComponent: () =>
      import('./pages/person/person.page').then((m) => m.PersonPage),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/edit/edit.page').then((m) => m.EditPage),
  },
];
