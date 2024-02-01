const fs = require('fs');
const convert = require('xml-js');

const data = fs.readFileSync('Sun/Sun.irt');

const converted = JSON.parse(convert.xml2json(data, {compact: true, spaces: 2}));

const connections = [];

for (let indexConnection = 1; indexConnection <= converted.IRMG.Connections._attributes.Number; indexConnection++) {
    const currentConnection = converted.IRMG.Connections['Connection' + indexConnection];

    connections.push({
        number: currentConnection._attributes.Zone,
        connect_to: currentConnection._attributes.Connects_To,
        guard_type: currentConnection.Guards._attributes.Type,
        guard_value: currentConnection.Guards._attributes.Value,
    });
}

const zones = [];

for (let indexZone = 1; indexZone <= converted.IRMG.Zones._attributes.Number; indexZone++) {
    const currentZone = converted.IRMG.Zones['Zone' + indexZone];

    const mines = {
        Sawmill: {
            exist: currentZone.Mines._attributes.Sawmill,
            guard_value: currentZone.MinesData._attributes.SawmillValue,
        },
        Ore_Pit: {
            exist: currentZone.Mines._attributes.Ore_Pit,
            guard_value: currentZone.MinesData._attributes.Ore_PitValue,
        },
        Gold_Mine: {
            exist: currentZone.Mines._attributes.Gold_Mine,
            guard_value: currentZone.MinesData._attributes.Gold_MineValue,
        },
        Sulfur_Dune: {
            exist: currentZone.Mines._attributes.Sulfur_Dune,
            guard_value: currentZone.MinesData._attributes.Sulfur_DuneValue,
        },
        Crystal_Cavern: {
            exist: currentZone.Mines._attributes.Crystal_Cavern,
            guard_value: currentZone.MinesData._attributes.Crystal_CavernValue,
        },
        Gem_Pond: {
            exist: currentZone.Mines._attributes.Gem_Pond,
            guard_value: currentZone.MinesData._attributes.Gem_PondValue,
        },
        Alchemist_Lab: {
            exist: currentZone.Mines._attributes.Alchemist_Lab,
            guard_value: currentZone.MinesData._attributes.Alchemist_LabValue,
        },
        Abandoned_Mine: {
            exist: currentZone.Mines._attributes.Abandoned_Mine,
            guard_value: currentZone.MinesData._attributes.Abandoned_MineValue,
        },
    };

    const towns = [];

    for (let i = 1; i <= Object.keys(currentZone.Towns).length; i++) {
        const currentTownAttr = currentZone.Towns['Town' + i]._attributes;

        towns.push({
            Type: currentTownAttr.Type,
        })
    }

}

// fs.writeFileSync('Sun/SunDesc.txt', converted);
