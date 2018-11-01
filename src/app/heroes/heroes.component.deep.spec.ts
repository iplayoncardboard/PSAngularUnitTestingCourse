import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroComponent } from "../hero/hero.component";
import { NO_ERRORS_SCHEMA, Component, Input, Directive } from "@angular/core";
import { HeroService } from "../hero.service";
import {of} from 'rxjs';
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";


//Mocking the RouterLink
//Lets us create a stub for a built in derective
//Create new derective 
@Directive({
    selector: '[routerLink]',
    //Host Listener listens for click event and runs onClick method
    host:{'(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
    //RouterLink takes in the parametare that is stet.. value of router link attribute
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;
    onClick() {
        this.navigatedTo = this.linkParams;
    }
}
describe('HeroesComponent (deep tests)', ()=>{
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;


    beforeEach(()=>{
        HEROES = [
            {id:1, name: 'Spider Dude', strength: 8},
            {id:2, name: 'Wonderful Woman', strength: 24},
            {id:3, name: 'Super Dude', strength: 55}
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);
        TestBed.configureTestingModule({
            declarations:[
                HeroesComponent,
                HeroComponent,
                RouterLinkDirectiveStub],
            //create mock hero service
            providers:[
                {provide: HeroService, useValue: mockHeroService}
            ],
            // schemas:[NO_ERRORS_SCHEMA]
        })

        fixture = TestBed.createComponent(HeroesComponent)
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        
    })

    it('should render each hero as a hero component',()=>{
        //arrange 
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        //act run ngOnInit
        fixture.detectChanges();
        //assert
       const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent))
       expect(heroComponentsDEs.length).toEqual(3);
       for(let i=0; i < heroComponentsDEs.length; i++){
        expect(heroComponentsDEs[i].componentInstance.hero).toEqual(HEROES[i]);
       }
    });

    it(`should call HeroService.deleteHero 
    when the hero components delete button is clicked`,()=>{
        spyOn(fixture.componentInstance, 'delete')
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        //ngOnenit
        fixture.detectChanges();

        //We are calling HeroComponent by directive because a component is a specialized subclass of a directive
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponents[0].query(By.css('button'))
        //triggerEventHandler takes event name and object for event as paramaters
        .triggerEventHandler('click', {stopPropagation:()=>{}});
        // .triggerEventHandler('delete', null);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it('shpould add a new hero to the hero list wehn the add button is clicked', ()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const name= 'Mr. Ice';
    mockHeroService.addHero.and.returnValue(of({
        id:5,
        name: name,
        strength: 4
    }));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    //handle to add button
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0]
    //action
    //simulates typing the name into the input box.
    inputElement.value = name;
    //simulate a click event of the add button.
    addButton.triggerEventHandler('click',null);
    fixture.detectChanges();
    //See if Mr Ice is in restulting HTML .nativeElement grabs from the DOM. 
    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent
    expect(heroText).toContain(name);
    })
    it('should have the correct route for the first hero', ()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        //get reouterLink directive for first hero
        let routerLink = heroComponents[0]
        //get debug element for anchor tag that has router link
        .query(By.directive(RouterLinkDirectiveStub))
        //returns instance of RouterLinkDirectiveStub for this hero component
        .injector.get(RouterLinkDirectiveStub)
        //click the anchor tag by getitng the tag and triggering click event handler. null is becasue we do not need to pass event object
        heroComponents[0].query(By.css('a')).triggerEventHandler('click',null)

        expect(routerLink.navigatedTo).toBe('/detail/1');
    })
});