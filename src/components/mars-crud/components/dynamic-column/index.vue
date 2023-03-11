<template>
    <!-- 封装穿梭框组件 -->
    <el-dialog
        class="mars-transfer--dialog"
        :fullscreen="fullscreen"
        :title="title"
        :append-to-body="true"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeDialog"
        >
        <div style="height: 100%;" flex="dir:top">
            <mars-transfer
                ref="mtr"
                flex-box="1"
                :config="config"
                :data="data"
                :default-check="defaultCheck"
                :originData="originData"
                :originDefaultCheckData="originDefaultCheckData"
            ></mars-transfer>
        </div>
        <div slot="footer" style="text-align: center">
            <el-button type="primary" @click="confirm">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </div>
    </el-dialog>

</template>
<script>
    export default {
        name: "mars-transfer-dialog",
        props: {
            data: Array,
            defaultCheck: Array,
            originData: Array,   // 2022.3.7+
            originDefaultCheckData: Array,  // 2022.3.7+
            config: Object,
            title: String,
            fullscreen: Boolean,
            profileKey: String,
            savePromise: Function,
            preSaveValidateMethod: {  // 2022.2.18+ 传入一个保存前的校验方法，默认是返回true
                type: Function,
                default: ()=>{
                    return true
                }
            }
        },
        data(){
            return {
                dialogVisible: true,
                value: [],
            }
        },
        methods: {
            confirm(){
                let items = this.$refs.mtr.rightSide.items
                if(!items.length) {
                    this.$message.warning("至少选择一列")
                    return
                }
                if( this.savePromise ){
                    const params = {profileKey: this.profileKey, columns: items}
                    console.log('items --->', items)
                    console.log('params ---->>>>', params)
                    if( this.preSaveValidateMethod() ){   // 如果保存的前置条件为true，则执行保存
                        this.savePromise(params).then(rsp=>{
                            this.$emit('dynamic-column-confirm', items)
                            this.$emit('close')
                        })
                    }else{ // 否则不保存，把最后结果丢出去给调用者
                        this.$emit('dynamic-column-confirm', items)
                        this.$emit('close')
                    }
                }else{
                    this.$emit('dynamic-column-confirm', items)
                    this.$emit('close')
                }
            },
            cancel(){
                this.$emit('close')
            },
            closeDialog(){
                this.$emit('close')
            },
        }
    }
</script>
<style lang="scss">
.mars-transfer--dialog {
    .el-dialog {
        width: 50vw;
        height: 60vh;
        margin-top: 20vh;
        .el-dialog--footer {

        }
    }
}
</style>
