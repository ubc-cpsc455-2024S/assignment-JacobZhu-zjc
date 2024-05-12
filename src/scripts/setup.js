// Initial team initialization JSON - pictures taken from https://en.wikipedia.org/wiki/Wikipedia:Featured_pictures/Animals/Mammals
const initialTeam = `{
    "team members": [
        {
            "name": "Iberian Lynx",
            "description": "A member of one of the four extant species within the wild cat genus Lynx, endemic to the Iberian Peninsula in southwestern Europe.",
            "age": 20,
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Lince_ib%C3%A9rico_%28Lynx_pardinus%29%2C_Almuradiel%2C_Ciudad_Real%2C_Espa%C3%B1a%2C_2021-12-19%2C_DD_07.jpg/1024px-Lince_ib%C3%A9rico_%28Lynx_pardinus%29%2C_Almuradiel%2C_Ciudad_Real%2C_Espa%C3%B1a%2C_2021-12-19%2C_DD_07.jpg"
        },
        {
            "name": "Black-tailed Prairie Dog",
            "description": "A rodent of the family Sciuridae found in the Great Plains of North America. Prior to habitat destruction, its species may have been the most abundant prairie dog in central North America.",
            "age": 5,
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Cynomys_ludovicianus_GNP_21.jpg/1024px-Cynomys_ludovicianus_GNP_21.jpg"
        },
        {
            "name": "Red Panda",
            "description": "A small mammal native to the eastern Himalayas and southwestern China, well adapted to climbing due to its flexible joints and curved semi-retractile claws.",
            "age": 8,
            "image": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Red_Panda_%2824986761703%29.jpg"
        },
        {
            "name": "Geoffroy's Tamarin",
            "description": "A type of small monkey, found in Panama and Colombia, which eats a variety of foods, including insects, plant exudates, fruits, and other plant parts.",
            "age": 14,
            "image": "https://upload.wikimedia.org/wikipedia/commons/d/df/Geoffroy%27s_tamarin_%28Saguinus_geoffroyi%29_2.jpg"
        },
        {
            "name": "European Hedgehog",
            "description": "A member of a hedgehog species native to Europe, and a favourite in European gardens, both for its endearing appearance and its preference for eating a range of garden pests.",
            "age": 3,
            "image": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Erinaceus_europaeus_%28Linnaeus%2C_1758%29.jpg"
        }
    ]
}`;

function initializeTeam() {
    if (sessionStorage.getItem("team") === null) {
        sessionStorage.setItem("team", initialTeam);
        // const team = JSON.parse(initialTeam)["team members"];
        // for (let member of team) {
        //     member["avgColour"] = 
        // }
    }
}