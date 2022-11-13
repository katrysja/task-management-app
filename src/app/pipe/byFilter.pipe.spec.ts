import { ByFilterPipe } from './byFilter.pipe';
import tasks from './../mocks/tasks.mock.json';
import { ITask } from 'src/app/interfaces/iTask';
import { EStatusType } from 'src/app/enum/eStatusType';

describe('ByFilterPipe', () => {
    const filter: ByFilterPipe = new ByFilterPipe();
    const tasksArray = tasks.map(task => {
        return {
            ...task,
            createdAt: new Date(task.createdAt),
            status: <EStatusType>task.status
        };
    });
    
    it('create an instance', () => {
        const pipe = new ByFilterPipe();
        
        expect(pipe).toBeTruthy();
    });
    
    it('should return empty array', () => {
        const inCaseArrayEmpty = filter.transform([], 'anything', 'name');
        expect(inCaseArrayEmpty.length).toBe(0);
    });
    
    it('should return array of 5 tasks', () => {
        
        const tasksWithNameTest: ITask[] = filter.transform(tasksArray, 'name', 'test');
        
        expect(tasksWithNameTest.length).toBe(5);
    });
});
