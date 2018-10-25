import { StrengthPipe } from "./strength.pipe";

describe('Strength Pipe', ()=>{
    beforeEach(()=>{
        
    })
    
    it('should display weak if the strength is 5', ()=>{
        //Arrange
        let pipe = new StrengthPipe()
        //Act + Assert
        expect(pipe.transform(5)).toEqual('5 (weak)')  
    })

    it('should display strong if the strength is 10', ()=>{
        //Arrange
        let pipe = new StrengthPipe()
        //Act + Assert
        expect(pipe.transform(10)).toEqual('10 (strong)')  
    })

    it('should display unbelievable if the strength is 20', ()=>{
        //Arrange
        let pipe = new StrengthPipe()
        //Act + Assert
        expect(pipe.transform(20)).toEqual('20 (unbelievable)')  
    })
})