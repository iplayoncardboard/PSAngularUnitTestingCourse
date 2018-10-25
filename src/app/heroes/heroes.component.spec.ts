import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe('HeroComponent',()=>{
    let component: HeroesComponent
    let HEROES;
    let mockHeroService

    beforeEach(()=>{
        HEROES = [
            {id:1, name: 'Spider Dude', strength: 8},
            {id:2, name: 'Wonderful Woman', strength: 24},
            {id:3, name: 'Super Dude', strength: 55}
        ]

        //2. create a mock service class by using createSpyObj and passing it an
        //array of methods contained in real heroService
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

        // 1.) component is expecting a heroService. We'll need to mock this
        component = new HeroesComponent(mockHeroService)
    })
it('should remove the indicated hero from the heros list', ()=>{
    //arrange
    //delete hero is using a subscibe and expecting an observable to return.
    // .and.retrunValue allows us to specify a retrun.
    mockHeroService.deleteHero.and.returnValue(of(true))
    component.heroes = HEROES;
    //act
    component.delete(HEROES[2])
    //assert
    expect(component.heroes.length).toBe(2);
    //BONUS wright an expectation that heroes at index 0 and 1 are present and 2 are removed.
})

it('should call deleteHero with correct hero' , ()=>{
    mockHeroService.deleteHero.and.returnValue(of(true))
    component.heroes = HEROES;

    component.delete(HEROES[2])
    
    // expect(mockHeroService.deleteHero).toHaveBeenCalled();
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
})

//BONUS 2 write a test to see if it is subscribing to the result of the deleteHero Call


})

