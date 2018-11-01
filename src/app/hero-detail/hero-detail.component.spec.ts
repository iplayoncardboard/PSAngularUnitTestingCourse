import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import {Location} from '@angular/common';
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe('HeroComponent',()=>{
    let fixture: ComponentFixture<HeroDetailComponent>
    let mockActivatedRoute, mockHeroService, mockLocation
    beforeEach(()=>{
        mockActivatedRoute = {
            snapshot: {paramMap: {get: ()=>{ return '3' }}}
        }
        mockHeroService = jasmine.createSpyObj(['getHero','updateHero'])
        mockLocation = jasmine.createSpyObj(['back']);
        TestBed.configureTestingModule({
            imports:[FormsModule],
            declarations:[HeroDetailComponent],
            providers:[
                {provide: ActivatedRoute, useValue: mockActivatedRoute},
                {provide: HeroService, useValue: mockHeroService},
                {provide: Location, useValue: mockLocation}
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({
            id: 3, 
            name: 'Super Dude',
            strength: 100
        }))

        
    })
    it('should render hero name in a h2 tag',()=>{
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPER DUDE')
    });
//asynch test
    // it('should call updateHero when save is called', (done)=>{
    //            mockHeroService.updateHero.and.returnValue(of({}));

    //     fixture.detectChanges();

    //     fixture.componentInstance.save();
        
    //     setTimeout(()=>{
    //         expect(mockHeroService.updateHero).toHaveBeenCalled();
    //         done();
    //     }, 300);
        
    // });

    //Same test as above but using fakeAsynch function. fakeAsynch works with pormises and setTimeout
    // it('should call updateHero when save is called', fakeAsync(()=>{
    //             mockHeroService.updateHero.and.returnValue(of({}));

    //     fixture.detectChanges();

    //     fixture.componentInstance.save();
        
    //     //call any code that should be called in that time frame.
    //     // tick(250)

    //     //use flush() to look at zone for waiting tasks. If there are waiting tasks fastworward zone until they are completed.
    //     flush();

    //     expect(mockHeroService.updateHero).toHaveBeenCalled();
      
    
    // }));

    //same test as 2 above but uses asynch with deals with promises but not setTimeouts. 
    it('should call updateHero when save is called', async(()=>{
    
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        fixture.whenStable().then(()=>{
            expect(mockHeroService.updateHero).toHaveBeenCalled();

        })
        
    }))
})