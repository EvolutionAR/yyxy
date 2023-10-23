<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item  :class="{'active':item.path}" v-for="(item,index) in currentPath" :key="index" :to="{ path: item.path||'' }" >{{item.name}}</el-breadcrumb-item>
        <!-- -->
    </el-breadcrumb>
</template>
<script>
    export default{
        name:"BreadCrumb",
        data(){
            return {
                currentPath:[]
            }
        },
        created(){
            
        },
        mounted(){
           console.log('$route',this.$route.meta)
           this.changeRouteMeta()
            this.currentPath=this.$route.meta || []
        },
        methods:{
        //        if(path == '/apply/all' || path == '/apply/agreementSigning' || path == '/apply/firstTrial' || 
        //   path == '/apply/review' || path == '/apply/physicianExamination' || path == '/apply/infoPublicity'){
           changeRouteMeta(){
               let routerPath = sessionStorage.getItem('routerPath')
               let metaItem = {
                   name:'',
                   path:routerPath
               } 
               if(routerPath){
                   if(routerPath == '/apply/all'){
                       metaItem.name = '全部'
                       this.$route.meta.splice(2,1,metaItem)
                       return
                   }
                   if(routerPath == '/apply/agreementSigning'){
                       metaItem.name = '协议签订'
                       this.$route.meta.splice(2,1,metaItem)
                       return
                   }
                   if(routerPath == '/apply/firstTrial'){
                       metaItem.name = '材料初审'
                       this.$route.meta.splice(2,1,metaItem)
                       return
                   }
                   if(routerPath == '/apply/review'){
                       metaItem.name = '复审（现场评估）'
                       this.$route.meta.splice(2,1,metaItem)
                       return
                   }
                   if(routerPath == '/apply/physicianExamination'){
                       metaItem.name = '医师考试'
                       this.$route.meta.splice(2,1,metaItem)
                       return
                   }
                   if(routerPath == '/apply/infoPublicity'){
                       metaItem.name = '信息公示'
                       this.$route.meta.splice(2,1,metaItem)
                       return
                   }
               }
           }
        },
        watch:{
            '$route' (to, from){
                this.currentPath=this.$route.meta || []
            }
        }
    }
</script>  
<style>
.el-breadcrumb__item .el-breadcrumb__inner,
.el-breadcrumb__item .el-breadcrumb__inner a, 
.el-breadcrumb__item .el-breadcrumb__inner a:hover,
.el-breadcrumb__item .el-breadcrumb__inner:hover{
    font-weight: 400;
    color: #606266;
    cursor: text;
}
.el-breadcrumb__item.active .el-breadcrumb__inner a:hover,
.el-breadcrumb__item.active .el-breadcrumb__inner:hover{
    color: #409EFF;
    cursor: pointer;
}
.el-breadcrumb .el-breadcrumb__item:last-child .el-breadcrumb__inner{
    font-weight:600;
}
</style>