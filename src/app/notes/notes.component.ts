import { Component } from '@angular/core';
import { Injectable }     from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Notes` component loaded asynchronously');

@Component({
  selector: 'notes-list',
  styleUrls: ['notes.component.css'],
  templateUrl: './notes.html'

})
export class Notes {
  localState;
  processObserver;
  flownotes = [{id: 1,title: "note"},
  {id: 12,title: "note"}];

  headers = new Headers();

  constructor(public route: ActivatedRoute,
              private http: Http) {
    
    this.headers = new Headers();
  }




  private heroesUrl = 'app/heroes';  // URL to web API
  getHeroes (): Observable<any[]> {
    this.processObserver = this.http.get('/bprocesses',
      {headers: this.headers})
      .map(res => res.json())

      this.processObserver.subscribe(obj => {
          //this.processes = obj;
          console.log(obj)
        }
      )

    return this.http.get(this.heroesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    console.log(res.json() );

    return body.data || { };
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }


  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });
    var observerableHeroes = this.getHeroes();
    console.log(observerableHeroes);
    //observerableHeroes.subscribe(obj => console.log("hero", obj));


    console.log('hello `About` component');
    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    // this.asyncDataWithWebpack();
  }
  asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    // var asyncMockDataPromiseFactory = require('es6-promise!assets/mock-data/mock-data.json');
    // setTimeout(() => {
    //
    //   let asyncDataPromise = asyncMockDataPromiseFactory();
    //   asyncDataPromise.then(json => {
    //     console.log('async mockData', json);
    //   });
    //
    // });
  }

}
