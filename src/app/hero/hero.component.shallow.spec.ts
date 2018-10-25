import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('Hero Component (Shallow Test', ()=>{
    let fixture: ComponentFixture<HeroComponent>;
    
    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas:[NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
    });

    it('should have the correct hero', ()=>{
        fixture.componentInstance.hero = {id:1, name:'Super Dude', strength:3};

        expect(fixture.componentInstance.hero.name = 'Super Dude');
    });

    it('should render the hero name in an anchor tag', ()=>{
        //setting hero property
        fixture.componentInstance.hero = {id:1, name:'Super Dude', strength:3};
//proc change dectection and update bindings. 
        fixture.detectChanges();
        //using debug element
        let deA = fixture.debugElement.query(By.css('a'));
        expect(deA.nativeElement.textContent).toContain('Super Dude');
        //using native element
        // expect(fixture.nativeElement.querySelector('a').textContent).toContain('Super Dude'); 

    });

});