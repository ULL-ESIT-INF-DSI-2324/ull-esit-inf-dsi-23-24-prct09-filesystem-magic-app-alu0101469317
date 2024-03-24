import yargs from 'yargs';
import chalk, { ChalkInstance } from 'chalk';
import fs from 'fs';
import { hideBin } from 'yargs/helpers';
import { Color } from './color.js';
import { Card } from './card.js';

// Directorio donde se almacenarán los datos de los usuarios
const dataDir = './data/';

// Función para cargar la colección de un usuario desde un archivo JSON
export const loadCollection = (username: string): Record<number, Card> => {
    try {
        const data = fs.readFileSync(`${dataDir}${username}.json`, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Si hay un error o el archivo no existe, retornamos un objeto vacío
        return {};
    }
};

// Función para guardar la colección de un usuario en un archivo JSON
export const saveCollection = (username: string, collection: Record<number, Card>): void => {
    fs.writeFileSync(`${dataDir}${username}.json`, JSON.stringify(collection, null, 2));
};

// Comando para añadir una carta a la colección
yargs(hideBin(process.argv))
    .command('add', 'Adds a card to the collection', {
        user: {
            describe: 'Username',
            demandOption: true,
            type: 'string'
        },
        id: {
            describe: 'Card ID',
            demandOption: true,
            type: 'number'
        },
        name: {
            describe: 'Card Name',
            demandOption: true,
            type: 'string'
        },
        manaCost: {
            describe: 'Mana Cost',
            demandOption: true,
            type: 'number'
        },
        color: {
            describe: 'Color',
            demandOption: true,
            choices: Object.values(Color), // Opciones del enum Color
            type: 'string'
        },
        type: {
            describe: 'Card Type',
            demandOption: true,
            type: 'string'
        },
        rarity: {
            describe: 'Rarity',
            demandOption: true,
            type: 'string'
        },
        rulesText: {
            describe: 'Rules Text',
            demandOption: true,
            type: 'string'
        },
        strength: {
            describe: 'Strength',
            type: 'number'
        },
        toughness: {
            describe: 'Toughness',
            type: 'number'
        },
        loyalty: {
            describe: 'Loyalty',
            type: 'number'
        },
        marketValue: {
            describe: 'Market Value',
            type: 'number'
        }
    }, (argv) => {
        const { user, id, name, manaCost, color, type, rarity, rulesText, strength, toughness, loyalty, marketValue } = argv;
        const collection = loadCollection(user);

        if (collection[id]) {
            console.log(chalk.red('Card already exists in collection!'));
        } else {
            collection[id] = { id, name, manaCost, color, type, rarity, rulesText, strength, toughness, loyalty, marketValue };
            saveCollection(user, collection);
            console.log(chalk.green('New card added to collection!'));
        }
    })
    .command({
        command: 'list',
        describe: 'List all cards in the collection',
        builder: {
            user: {
                describe: 'Username',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            const { user } = argv;
            const collection = loadCollection(user);

            if (Object.keys(collection).length === 0) {
                console.log(chalk.red('Collection is empty!'));
            } else {
                console.log(chalk.green(`${user}'s collection:`));
                Object.values(collection).forEach(card => {
                    console.log('--------------------------------');
                    console.log(chalk.green(`ID: ${card.id}`));
                    console.log(chalk.green(`Name: ${card.name}`));
                    console.log(chalk.green(`Mana Cost: ${card.manaCost}`));
                    if (card.color === Color.Multicolor) {
                        // Imprimir cada letra en un color diferente
                        const colorString: string[] = [];
                        card.color.split('').forEach((letter) => {
                            // Cada letra en un color diferente
                            const colors: ChalkInstance[] = [chalk.white, chalk.blue, chalk.black, chalk.red, chalk.green, chalk.gray];
                            const index = Math.floor(Math.random() * colors.length);
                            colorString.push(colors[index](letter));
                        });
                        const s = colorString.join('');
                        console.log(chalk.green(`Color: ${s}`));
                    } else {
                        console.log(chalk.green(`Color: ${getColoredText(card.color)}`));
                    }
                    console.log(chalk.green(`Type: ${card.type}`));
                    console.log(chalk.green(`Rarity: ${card.rarity}`));
                    console.log(chalk.green(`Rules Text: ${card.rulesText}`));
                    if (card.type === 'Creature') {
                        console.log(chalk.green(`Strength: ${card.strength}`));
                        console.log(chalk.green(`Toughness: ${card.toughness}`));
                    } else if (card.type === 'Planeswalker') {
                        console.log(chalk.green(`Loyalty: ${card.loyalty}`));
                    }
                    if (card.marketValue) {
                        console.log(chalk.green(`Market Value: ${card.marketValue}`));
                    }
                });
            }
        }
    }).command('update', 'Modify a card in the collection', {
        user: {
            describe: 'Username',
            demandOption: true,
            type: 'string'
        },
        id: {
            describe: 'Card ID',
            demandOption: true,
            type: 'number'
        },
        name: {
            describe: 'New Card Name',
            type: 'string'
        },
        manaCost: {
            describe: 'New Mana Cost',
            type: 'number'
        },
        color: {
            describe: 'New Color',
            choices: Object.values(Color), // Opciones del enum Color
            type: 'string'
        },
        type: {
            describe: 'New Card Type',
            type: 'string'
        },
        rarity: {
            describe: 'New Rarity',
            type: 'string'
        },
        rulesText: {
            describe: 'New Rules Text',
            type: 'string'
        },
        strength: {
            describe: 'New Strength',
            type: 'number'
        },
        toughness: {
            describe: 'New Toughness',
            type: 'number'
        },
        loyalty: {
            describe: 'New Loyalty',
            type: 'number'
        },
        marketValue: {
            describe: 'New Market Value',
            type: 'number'
        }
    }, (argv) => {
        const { user, id, name, manaCost, color, type, rarity, rulesText, strength, toughness, loyalty, marketValue } = argv;
        const collection = loadCollection(user);
    
        if (collection[id]) {
            // Si la carta existe, se modifica con los nuevos valores proporcionados
            const updatedCard: Card = {
                ...collection[id],
                name: name || collection[id].name, // Si no se proporciona un nuevo nombre, se mantiene el nombre actual
                manaCost: manaCost || collection[id].manaCost,
                color: color || collection[id].color,
                type: type || collection[id].type,
                rarity: rarity || collection[id].rarity,
                rulesText: rulesText || collection[id].rulesText,
                strength: strength || collection[id].strength,
                toughness: toughness || collection[id].toughness,
                loyalty: loyalty || collection[id].loyalty,
                marketValue: marketValue || collection[id].marketValue
            };
    
            collection[id] = updatedCard;
            saveCollection(user, collection);
            console.log(chalk.green('Card successfully modified!'));
        } else {
            // Si la carta no existe, se emite un mensaje de error
            console.log(chalk.red('Card not found in collection!'));
        }
    })
    .command('remove', 'Removes a card from the collection', {
        user: {
            describe: 'Username',
            demandOption: true,
            type: 'string'
        },
        id: {
            describe: 'Card ID',
            demandOption: true,
            type: 'number'
        }
    }, (argv) => {
        const { user, id } = argv;
        const collection = loadCollection(user);

        if (collection[id]) {
            delete collection[id];
            saveCollection(user, collection);
            console.log(chalk.green('Card removed from collection!'));
        } else {
            console.log(chalk.red('Card does not exist in collection!'));
        }
    })
    .command('read', 'Show information of a specific card in the collection', {
        user: {
            describe: 'Username',
            demandOption: true,
            type: 'string'
        },
        id: {
            describe: 'Card ID',
            demandOption: true,
            type: 'number'
        }
    }, (argv) => {
        const { user, id } = argv;
        const collection = loadCollection(user);

        if (collection[id]) {
            const card = collection[id];
            console.log(chalk.green('Card information:'));
            console.log('--------------------------------');
            console.log(chalk.green(`ID: ${card.id}`));
            console.log(chalk.green(`Name: ${card.name}`));
            console.log(chalk.green(`Mana Cost: ${card.manaCost}`));
            if (card.color === Color.Multicolor) {
                // Imprimir cada letra en un color diferente
                const colorString: string[] = [];
                card.color.split('').forEach((letter) => {
                    // Cada letra en un color diferente
                    const colors: ChalkInstance[] = [chalk.white, chalk.blue, chalk.black, chalk.red, chalk.green, chalk.gray];
                    const index = Math.floor(Math.random() * colors.length);
                    colorString.push(colors[index](letter));
                });
                const s = colorString.join('');
                console.log(chalk.green(`Color: ${s}`));
            } else {
                console.log(chalk.green(`Color: ${getColoredText(card.color)}`));
            }
            console.log(chalk.green(`Type: ${card.type}`));
            console.log(chalk.green(`Rarity: ${card.rarity}`));
            console.log(chalk.green(`Rules Text: ${card.rulesText}`));
            if (card.type === 'Creature') {
                console.log(chalk.green(`Strength: ${card.strength}`));
                console.log(chalk.green(`Toughness: ${card.toughness}`));
            } else if (card.type === 'Planeswalker') {
                console.log(chalk.green(`Loyalty: ${card.loyalty}`));
            }
            if (card.marketValue) {
                console.log(chalk.green(`Market Value: ${card.marketValue}`));
            }
        } else {
            console.log(chalk.red('Card not found in collection!'));
        }
    })
    
    .parse();

// Función para obtener el texto coloreado según el color de la carta
function getColoredText(color: string): string {
    switch (color) {
        case Color.Blanco:
            return chalk.white(color);
        case Color.Azul:
            return chalk.blue(color);
        case Color.Negro:
            return chalk.black(color);
        case Color.Rojo:
            return chalk.red(color);
        case Color.Verde:
            return chalk.green(color);
        case Color.Incoloro:
            return chalk.gray(color);
        default:
            return color;
    }
}

