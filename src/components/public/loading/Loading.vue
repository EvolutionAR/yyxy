<template>
        <div class="loading-wrap" v-show="showLoading">
            <img src="../../../assets/img/loading.gif" alt="" id="loading-img" width="92" height="92">
        </div>
</template>
<script>
export default {
    name:'Loading',
    data() {
        return {

        }
    },
    props:{
        showLoading:false,
    }
}
</script>

<style scoped>
    .loading-wrap{
        position: fixed;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        background: rgba(255,255,255,0.5)
    }
    #loading-img{
        position: absolute;
        top:50%;
        left: 50%;
        margin-top: -46px;
        margin-left: -46px;
        width: 92px;
        height: 92px;
    }
</style>
