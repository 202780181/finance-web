export const formProps = {
    // 尺寸
    size: {
        type: String,
        validator: sizeValidator
    },
    inline: {
        type: Boolean,
        default: true
    },
    fuzzy: {
        type: Boolean,
        default: false
    },
    labelWidth: {
        type: Number,
        default: 130
    },
    itemWidth: Number,
    forms: {
        type: Array,
    },
    fns: {
        type: Array,
    },
    autoSearch: {
        type: Boolean,
    },
    fnsColSpan: {
        type: Number
    }
}

function sizeValidator(value) {
    const methodTypes = ['large', 'small', 'mini']
    const valid = methodTypes.indexOf(value.toLowerCase()) !== -1 || value === ''
    if (!valid) {
        throw new Error(`Size must be one of ['large', 'small', 'mini']`)
    }
    return valid
}
