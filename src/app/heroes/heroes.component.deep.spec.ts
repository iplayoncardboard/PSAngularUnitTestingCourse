import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroComponent } from "../hero/hero.component";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { HeroService } from "../hero.service";
import {of} from 'rxjs';
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

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
                HeroComponent],
            //create mock hero service
            providers:[
                {provide: HeroService, useValue: mockHeroService}
            ],
            schemas:[NO_ERRORS_SCHEMA]
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

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

});