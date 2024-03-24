import { Color } from './color.js';
// Interfaz para la estructura de una carta
export interface Card {
    id: number;
    name: string;
    manaCost: number;
    color: Color;
    type: string;
    rarity: string;
    rulesText: string;
    strength?: number;
    toughness?: number;
    loyalty?: number;
    marketValue?: number;
}