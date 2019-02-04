export interface Key {
    key: string;
    index: number;
    keys: Array<string>;
}

/**
 * @classdesc classe de templating de string
 */
export class Template {

    protected template: string;
    protected stringKey: Array<Key>;

    /**
     * @class
     */
    constructor(template) {
        this.template = template;
        this.stringKey = [];

        const regex = /(\$\{[^\{\}\s;]+\})/g;
        let corresp = regex.exec(this.template);

        while (corresp) {
            this.stringKey.push({
                key: corresp[ 0 ],
                index: corresp.index,
                keys: corresp[ 0 ].substring(2, corresp[ 0 ].length - 1).split(/[\.\[\]]/),
            });
            corresp = regex.exec(this.template);
        }
    }

    /**
     * lance le templating avec un objet
     * @param {Object} obj objet servant au templating
     * @param {string} remplaceUndef remplacement si undefined
     * @return la chaine avec les valeurs remplacées
     */
    process(obj: any, remplaceUndef?: string): any {
        let returnValue = this.template;
        for (const part in this.stringKey) {
            const partKey: Key = this.stringKey[ part ];
            let value = obj;
            let attr;

            for (let index = 0; index < partKey.keys.length; index++) {
                attr = partKey.keys[ index ];
                if (attr) {
                    value = value[ attr ];
                    if (typeof value === "boolean") {
                        return value;
                    } else if (typeof value === "object" && 1 === this.stringKey.length && index === (partKey.keys.length - 1)) {
                        return value;
                    } else if (!value) {
                        return remplaceUndef;
                    }
                }
            }
            returnValue = returnValue.replace(partKey.key, value);
        }
        return returnValue;
    }
}