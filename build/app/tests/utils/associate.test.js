import { describe, test, expect } from 'vitest';
import associate from '../../utils/associate.js';
describe('associate', () => {
    test('should return an number', () => {
        expect(associate('test')).toEqual(5);
        expect(typeof associate('test')).toBe('number');
    });
    test('should return 2 if the string is "Beginner"', () => {
        expect(typeof associate('Beginner')).toBe('number');
        expect(associate('Beginner')).toEqual(2);
        expect(associate('Beginner')).not.toEqual(5);
        expect(associate('Beginner')).not.toEqual(8);
        expect(associate('beginner')).toEqual(2);
    });
    test('should return 5 if the string is "Intermediate"', () => {
        expect(typeof associate('Intermediate')).toBe('number');
        expect(associate('Intermediate')).toEqual(5);
        expect(associate('Intermediate')).not.toEqual(2);
        expect(associate('Intermediate')).not.toEqual(8);
        expect(associate('intermediate')).toEqual(5);
    });
    test('should return 8 if the string is "Advanced"', () => {
        expect(typeof associate('Advanced')).toBe('number');
        expect(associate('Advanced')).toEqual(8);
        expect(associate('Advanced')).not.toEqual(2);
        expect(associate('Advanced')).not.toEqual(5);
        expect(associate('advanced')).toEqual(8);
    });
});
