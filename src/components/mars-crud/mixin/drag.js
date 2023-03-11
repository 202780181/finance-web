import Sortable from "sortablejs"
import _clonedeep from 'lodash.clonedeep'


export default {
    props: {
        canDrag: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            selectRowIds: [],
        }
    },
    methods: {
        setSort() {
            let t = this.$refs.elTable
            let e = t.$el
            let el = e.querySelector("tbody")
            this.sortable = Sortable.create(el, {
                ghostClass: "sortable-ghost2",
                animation: 120,
                setData: function (dataTransfer) {
                    dataTransfer.setData("Text", "")
                },
                onEnd: evt => {
                    const targetRow = this.ibpsData.splice(evt.oldIndex, 1)[0]
                    this.ibpsData.splice(evt.newIndex, 0, targetRow)
                },
            })
        },
        getDragData() {
            return this.ibpsData
        },
        toFirst() {
            //顺序查找 规则 部分可移动 但是相对顺序大致不变
            if (this.$selections) {
                let count = 0
                let len = this.$selections.length
                let lenIbps = this.ibpsData.length - 1
                let oldIbpsData = this.ibpsData
                if (len > 0) {
                    for (let i = 0; i <= lenIbps; i++) {
                        if (len === count) {
                            break
                        }
                        let indexOfNow = -1
                        for (let j = 0; j < len; j++) {
                            if (oldIbpsData[i][this.pkKey] === this.$selections[j][this.pkKey]) {
                                indexOfNow = i
                                break
                            }
                        }
                        if (indexOfNow !== -1) {
                            if (indexOfNow !== 0) {
                                this.ibpsData.splice(count, 0, this.ibpsData.splice(indexOfNow, 1)[0]);
                            }
                            count++
                        }
                    }
                }
            }
        },
        toPrevious() {
            //何时可以向上移动 1.上面有元素 2.上一个元素可以移动 ==》交换
            if (this.$selections) {
                let oldIbpsData = this.ibpsData
                let count = 0
                let len = this.$selections.length
                let lenIbps = this.ibpsData.length - 1
                let nextCanDrag = false
                if (len > 0) {
                    for (let i = 0; i <= lenIbps; i++) {
                        if (len === count) {
                            break
                        }
                        let indexOfNow = -1
                        for (let j = 0; j < len; j++) {
                            if (oldIbpsData[i][this.pkKey] === this.$selections[j][this.pkKey]) {
                                indexOfNow = i
                                break
                            }
                        }
                        if (indexOfNow === -1) {
                            nextCanDrag = true
                        } else {
                            if (indexOfNow === 0) {
                                nextCanDrag = false
                            } else {
                                if (nextCanDrag) {
                                    let tmpVal = this.ibpsData.splice(indexOfNow, 1)
                                    this.ibpsData.splice(indexOfNow - 1, 0, tmpVal[0])
                                    nextCanDrag = true
                                }
                            }
                        }
                    }
                }
            }
        },
        toNext() {
            //何时可以向下移动 1.下面有元素 2.下一个元素可以移动 ==》交换
            if (this.$selections) {
                let oldIbpsData = this.ibpsData
                let count = 0
                let len = this.$selections.length
                let lenIbps = this.ibpsData.length - 1
                let nextCanDrag = false
                if (len > 0) {
                    for (let i = lenIbps; i >= 0; i--) {
                        if (len === count) {
                            break
                        }
                        let indexOfNow = -1
                        for (let j = 0; j < len; j++) {
                            if (oldIbpsData[i][this.pkKey] === this.$selections[j][this.pkKey]) {
                                indexOfNow = i
                                break
                            }
                        }
                        if (indexOfNow === -1) {
                            nextCanDrag = true
                        } else {
                            if (indexOfNow === lenIbps) {
                                nextCanDrag = false
                            } else {
                                if (nextCanDrag) {
                                    let tmpVal = this.ibpsData.splice(indexOfNow, 1)
                                    this.ibpsData.splice(indexOfNow + 1, 0, tmpVal[0])
                                    nextCanDrag = true
                                }
                            }
                        }
                    }
                }
            }
        },
        toLast() {
            //逆向查找 规则 部分可移动 但是相对顺序大致不变
            if (this.$selections) {
                let count = 0
                let len = this.$selections.length
                let lenIbps = this.ibpsData.length - 1
                let oldIbpsData = this.ibpsData
                if (len > 0) {
                    for (let i = lenIbps; i >= 0; i--) {
                        if (len === count) {
                            break
                        }
                        let indexOfNow = -1
                        for (let j = 0; j < len; j++) {
                            if (oldIbpsData[i][this.pkKey] === this.$selections[j][this.pkKey]) {
                                indexOfNow = i
                                break
                            }
                        }
                        if (indexOfNow !== -1) {
                            if (indexOfNow !== lenIbps) {
                                this.ibpsData.splice(lenIbps - count, 0, this.ibpsData.splice(indexOfNow, 1)[0]);
                            }
                            count++
                        }
                    }
                }
            }
        }
    },
    
    mounted() {
        if (this.canDrag) {
            this.$nextTick(() => {
                this.setSort()
            })
        }
    }
}