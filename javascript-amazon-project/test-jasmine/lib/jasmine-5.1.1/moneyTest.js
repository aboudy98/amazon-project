import {formatCurrency} from '../../../Tests/money.js'

describe('tes suite: format currency',()=>{ // the text inside the discribe is used to describe what we test in this block

    it('convert centes into dollars', // the name of the test
 
        ()=>{ // this is our test
            expect(formatCurrency(2095)).toEqual('20.95');

        }
    );// is a function that create a test

    it('Works with 0',()=>{
        expect(formatCurrency(0)).toEqual('0.00')
    })
})