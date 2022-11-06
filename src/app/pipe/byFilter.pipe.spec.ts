import { ByFilterPipe } from './byFilter.pipe';

describe('ByFilterPipe', () => {
    it('create an instance', () => {
        const pipe = new ByFilterPipe();
        
        expect(pipe).toBeTruthy();
    });
});
