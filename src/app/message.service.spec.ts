import { MessageService } from "./message.service";
import { exec } from "child_process";

describe('MessageService', ()=>{
    let service: MessageService

    beforeEach(()=>{
        //may want to make 2 copies and move them down into each it() to more strictly follow AAA
        service = new MessageService();
    })

    it('should have no messages to start',()=>{
        expect(service.messages.length).toBe(0);
    })

    it('should add a message when add is called',()=>{
        service.add('message1');

        expect(service.messages.length).toBe(1)
    })

    it('should remove all messages when clear is called',()=>{
        //arrange
        service.add('message1');
        //act
        service.clear();
        //assert
        expect(service.messages.length).toBe(0)
    })
})