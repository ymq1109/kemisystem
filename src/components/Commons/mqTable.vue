<template>
    <div id="mqTable" :style="{width:width}">
        <div class="mqtable-head">
            <span>{{title}}</span>
            <slot name="mqtable-head"></slot>
        </div>
        <div class="mqtable-content">
            <slot name="mqtable-content"></slot>
        </div>
        <div class="mqtable-foot">
            <slot name="mqtable-foot"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        width:{
            default:'100%'
        },
        title:{
            default:'提示'
        }
    }
    
}
</script>
<style lang="scss" scoped>
    #mqTable{
        position: relative;
        min-height: 200px;
        box-shadow: 0 0 5px 5px rgba(204, 200, 200, 0.616);
        border-radius: 2px;
        padding: 10px;
        box-sizing: border-box;
    }
    .mqtable-head{
        width: 100%;
        height: 50px;
    }
    .mqtable-content{
        margin-bottom: 50px;
    }
    .mqtable-foot{
        position:absolute;
        bottom: 0;
        width: 100%;
        height: 50px;

        }
    table{
        width: 100%;
        }
    tr{
        height: 40px;
        text-align: center;
        line-height: 40px;
        &:nth-child(2n-1){
        background: linear-gradient(270deg,rgb(238, 243, 237),#DFE4DE);
        }
    }
    tr:hover{
            background: #A6B1A8;
        }
    
</style>
