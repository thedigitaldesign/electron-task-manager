/*
Multiple string replaces by a passed object
The object must contains its attributes with the same name as replaced-words
Example:
    string: 'I have a cat, a dog, and a goat.'
    obj: {cat: 'kitty', dog: 'pluto'}

    return: 'I have a kitty, a pluto, and a goat'
*/
module.exports.fmt = function (string, hash) {
    let key;
    for (key in hash) {
        string = string.replace(new RegExp('\\{' + key + '\\}', 'gm'), hash[key]);
    }

    return string;
};