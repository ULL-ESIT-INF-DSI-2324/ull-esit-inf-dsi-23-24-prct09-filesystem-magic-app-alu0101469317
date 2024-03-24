import 'mocha';
import { expect } from 'chai';
import {Card} from '../src/card.js'; // Ajusta la ruta según la estructura de tu proyecto
import { Color } from '../src/color.js';
import { loadCollection, saveCollection} from '../src/magic-app.js'; // Ajusta la ruta según la estructura de tu proyecto
import fs from 'fs';

describe('Magic App', () => {
    describe('loadCollection', () => {
        it('should return an empty  when the file does not exist', () => {
            const collection = loadCollection('no');
            expect(collection).to.deep.equal({});
        });

        it('should return an array with the cards stored in the file', () => {
            const collection: Card[] = [
                {
                    id: 1,
                    name: 'Serra Angel',
                    manaCost: 5,
                    color: Color.Blanco,
                    type: 'Creature',
                    rarity: 'Uncommon',
                    rulesText: 'Flying, vigilance'
                },
                {
                    id: 2,
                    name: 'Shivan Dragon',
                    manaCost: 6,
                    color: Color.Rojo,
                    type: 'Creature',
                    rarity: 'Rare',
                    rulesText: 'Flying'
                }
            ];
            saveCollection('test1', collection);
            const loadedCollection = loadCollection('test1');
            expect(loadedCollection).to.be.an('array').with.lengthOf(2);
            expect(loadedCollection).to.deep.equal(collection);
        });
    });

    describe('saveCollection', () => {
        it('should save the collection to a file', () => {
            const collection: Card[] = [
                {
                    id: 1,
                    name: 'Serra Angel',
                    manaCost: 5,
                    color: Color.Blanco,
                    type: 'Creature',
                    rarity: 'Uncommon',
                    rulesText: 'Flying, vigilance'
                },
                {
                    id: 2,
                    name: 'Shivan Dragon',
                    manaCost: 6,
                    color: Color.Rojo,
                    type: 'Creature',
                    rarity: 'Rare',
                    rulesText: 'Flying'
                }
            ];
            saveCollection('test2', collection);
            const fileContent = fs.readFileSync('data/test2.json', 'utf-8');
            expect(fileContent).to.equal(JSON.stringify(collection, null, 2));
        });
    });
});