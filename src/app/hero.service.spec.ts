import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { from } from "rxjs";

describe("HeroService",()=>{
    let mockMessageService = jasmine.createSpyObj(['add']);
    let httpTestingController: HttpTestingController
    let service: HeroService;
    
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[
                HeroService,
                {provide: MessageService, useValue: mockMessageService}
            ]
        });
    //This gets us a handle to the service
    //get is a special method on test bed that accesses dependency injection registry
    httpTestingController = TestBed.get(HttpTestingController)
    service = TestBed.get(HeroService)
    });

    describe('getHero', ()=>{
        it('should call get with the correct URL', ()=>{
            //make the http request
            service.getHero(4).subscribe();

            const req = httpTestingController.expectOne('api/heroes/4');
            //tells mock HTTP client what data to send back when it sees the above request.
            req.flush({id:4, name:'Super Dude', strength: '100'});
            //verifies we only got exactly what was expected
            httpTestingController.verify();
        });
    })

})



//Code example using the inject method as opposed to the TestBed.get method
// describe('getHero', ()=>{
//     it('should call get with the correct URL', 
//         inject([HeroService, httpTestingController], 
//             (service: HeroService, controller: HttpTestingController)=>{
//             service.getHero(4).subscribe();
//     }));
// })