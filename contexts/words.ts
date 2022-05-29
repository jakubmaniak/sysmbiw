import React from 'react';


export type WordSet = {
    id: string,
    name: string,
    words: string[]
};

const initialValue: { sets: WordSet[] } = {
    sets: [
        {
            id: 'u1',
            name: 'Wyrazy z literą U i Ó',
            words: [
                'w(ó)jt', 'k(u)chnia', 'ch(ó)r', 'skr(ó)t', 'n(ó)w', 'p(ó)ł', '(ó)smy', 'kr(ó)l', 'oł(ó)wek', '(u)l',
                '(u)cho', '(u)sta', 'kap(u)sta', 'w(u)j', 'g(u)ma', 'dr(u)t', 'kał(u)ża', 'ż(u)raw', 'ż(ó)łty',
                '(u)lica', 'p(u)szczyk', 'tł(u)macz', 'h(u)mor', 'l(u)stro', 'k(u)ra', 'g(ó)ra', 'm(u)cha', 'k(u)lka'
            ]
        },
        {
            id: 'h1',
            name: 'Wyrazy z literą H i CH',
            words: [
                '(h)erbata', 'ku(ch)nia', '(h)erb', '(h)ełm', '(ch)ętny', '(ch)łopiec', '(h)amak', '(ch)rząszcz',
                'bo(h)ater', 'mu(ch)a', '(h)onor', '(h)uk', '(ch)uligan', '(ch)arakter', '(h)elikopter'
            ]
        },
        {
            id: 'z1',
            name: 'Wyrazy z literą Ż i RZ',
            words: ['(ż)ycie', '(ż)uraw', '(rz)eka', '(ż)ółty', 'wą(ż)', '(ż)yrafa', '(ż)ubr', '(rz)odkiewka', 'ch(rz)ąszcz']
        }
    ]
};
const context = React.createContext(initialValue);


export default { initialValue, context };