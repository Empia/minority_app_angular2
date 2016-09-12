import { Component } from '@angular/core';
import { Injectable }     from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
import { FlowCardService }       from './flowcards.service';
import { FlowCard }         from './flowcard';
import * as _ from 'lodash';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Cards` component loaded asynchronously');

@Component({
  selector: 'cards-list',
  styleUrls: ['cards.component.css'],
  templateUrl: './cards.html',
  providers: [ FlowCardService ]


})
export class Cards {
  errorMessage: string;
  localState;
  processObserver;
  objects = [
  {id: 1,title: "object1", 
   fields:[{title:"fieldTitle", fieldType: "type", fieldValue: "" }] },
  {id: 12,title: "headers", 
   fields:[{title:"fieldTitle", fieldType: "type", fieldValue: "" }] }];

   flowCards: FlowCard[] = [
     new FlowCard(1, "obj1"),
     new FlowCard(2, "obj2")
   ];


   flowCards2: FlowCard[] = [
     new FlowCard(3, "obj1"),
     new FlowCard(4, "obj2")
   ];


   flowCards3: FlowCard[] = [
     new FlowCard(5, "obj1"),
     new FlowCard(6, "obj2")
   ];   

  headers = new Headers();

  constructor(public route: ActivatedRoute,
              private flowCardService: FlowCardService,
              private http: Http) {
    
    this.headers = new Headers();
  }


  removeObject (obj: FlowCard) {
    this.flowCards = _.filter(this.flowCards, function(n) { return n.id !== obj.id});
    this.flowCards2 = _.filter(this.flowCards2, function(n) { return n.id !== obj.id});
    this.flowCards3 = _.filter(this.flowCards3, function(n) { return n.id !== obj.id});


  }

  addObject (name: string) {
    if (!name) { return; }
    this.flowCards.push(new FlowCard(1, name) )
    /*
    this.objectService.addObject(name)
                     .subscribe(
                       obj  => this.objectsArr.push(obj),
                       error =>  this.errorMessage = <any>error);
    */
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

    _.forEach([1,2,3], function(e) {
      console.log(e);
    });

    console.log('hello `About` component');
  }
  asyncDataWithWebpack() {
  }

}
