export default function(value: number | string, singularNominativ: string, pluralNominativ: string, pluralGenitive = pluralNominativ) {
    value = Math.abs(parseInt(value as string, 10));

    if (value === 1) {
        return singularNominativ;
    }
    else if (/([^1]|^)[2-4]$/.test(value.toString().substr(-2))) {
        return pluralNominativ;
    }
    
    return pluralGenitive;
};