import { Component, Pipe } from '@angular/core';
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

console.log('`Indicators` component loaded asynchronously');

class Indicator {
  constructor(
    public title: string,
  ) {  }

}



@Component({
  selector: 'indicators-list',
  styleUrls: ['indicators.component.css'],
  templateUrl: './indicators.html',
})
export class Indicators {
  localState;
  processObserver;
  observerableHeroes;

  processes = [{id: 1,title: "ff"},{id: 12,title: "ff"}];

  headers = new Headers();

  $data = [];
  $columns = [];
  indicators = [];


  constructor(public route: ActivatedRoute,
              private http: Http) {
    this.headers = new Headers();
  }



  model = new Indicator('');
  get diagnostic() { return JSON.stringify(this.model); }


  createIndicator() {
    console.log('<this class="model"></this>', this.model);
    //   POST   /api/data/:boardId/entity/create
    this.observerableHeroes = this.getHeroes();
    return true;
  }
  editIndicator() {
    //   POST   /api/data/entity/:id/update
    this.observerableHeroes = this.getHeroes();
    return true;
  }
  deleteIndicator() {
    //   POST     /data/entity/:id/delete
    this.observerableHeroes = this.getHeroes();    
    return true;
  }




  private heroesUrl = 'api/data';  // URL to web API
  getHeroes (): Observable<any[]> {
    this.processObserver = this.http.get('api/data',
      {headers: this.headers})
      .map(res => res.json())

      this.processObserver.subscribe(objarr => {
          this.indicators = objarr.map(obj => { 
            let resourceId = obj.resource.id
            if (obj.board_cn.length > 0) {
              let boards = obj.board_cn[0].boards.filter(board => { return board.meta.filter(meta => { 
                return meta.key == "resource_id" && meta.value == resourceId+"" }).length > 0 });
              let boardWithEntities = boards.map(board => {
                return { 
                  board: board,
                  entities: obj.board_cn[0].entities.filter(entity => { return entity.boardId == board.id })
                }
              });
              return { resource: obj.resource, board_cn: boardWithEntities }
            } else { 
              let boardWithEntities = [] 
              return { resource: obj.resource, board_cn: boardWithEntities }
            } 
          });
          console.log(this.indicators);
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
    this.observerableHeroes = this.getHeroes();
    console.log(this.observerableHeroes);
    this.observerableHeroes.subscribe(obj => console.log("indicator", obj));


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
