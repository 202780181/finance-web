export default {
    name: 'dialogInterface',
    data() {
        return {
            isActived: false,
            modal: false,
            fullscreen: true,
            closeOnClickModal: false,
            closeModalParam: '',
            title: '',
        }
    },
    methods: {
        showDialog(data) {
            this.preShowDialog(data)
            this.isActived = true
            this.afterShowDialog(data)
        },
        closeDialog() {
            this.preCloseDialog()
            this.isActived = false
            this.$emit('close-modal', this.closeModalParam)
            this.afterCloseDialog()
        },
        preCloseDialog() { },
        preShowDialog(data) { },
        afterCloseDialog(data) { },
        afterShowDialog() { },
        handleClose() { },
    },
}
