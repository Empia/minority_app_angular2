/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  templateUrl: './app.html'
})
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = '';
  url = '';

  constructor(
    public appState: AppState,
    private router: Router,
    private activatedRoute:ActivatedRoute) {

  }

  /**
   * Active route link helper
   */
  isRootActive(instruction: any): any {
    console.log("class", instruction, this.router.url === "/" && instruction === "acts")
    return {
      active: (this.router.url === "/" && instruction === "/acts") || (this.router.url === "/acts")
    }

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
