import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { About } from './about';
import { NoContent } from './no-content';


import {Objects} from './objects';
import {Notes} from './notes';
import {Cards} from './cards';


import {Indicators} from './data_page/indicators';
import {Acts} from './data_page/acts';


import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: Acts },
  { path: 'home',  component: Acts },
  // make sure you match the component type string to the require in asyncRoutes
  //{ path: 'about', component: 'About' },
  { path: 'cards', component: Cards },
  { path: 'objects', component: Objects },
  { path: 'notes', component: Notes },
  { path: 'indicators', component: Indicators },
  { path: 'acts', component: Acts },
  { path: '**',    component: NoContent },
];
