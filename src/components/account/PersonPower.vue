<template>
 <div>
  <div class="breadcrumbContainer">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>账号管理</el-breadcrumb-item>
          <el-breadcrumb-item>人员权限</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>人员权限</h1>
      <div class="breadcrumbBtn">
          <el-button type="primary">确认</el-button>
      </div>
  </div>
  <div class="applyDetailContainer">
      <h3 class="infoTitle">权限</h3>
      <el-row class="infoContainer">
            <el-table
              class="tableMargin"
                border
                :data="personList" 
                style="width: 100%">
                <el-table-column
                    prop="code"
                    label="编号">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="position"
                    label="职位">
                </el-table-column>
                <el-table-column
                    width="600"
                    prop="power"
                    label="权限">
                    <template slot-scope="scope">
                      <el-checkbox-group v-model="scope.row.power">
                        <el-checkbox v-for="power in powerList" :key="power.value" :label="power.label"></el-checkbox>
                      </el-checkbox-group>
                    </template>
                </el-table-column>
            </el-table>
      </el-row>
  </div>
</div>
</template>

<script>
export default {
  name:'PersonPower',
  data: function (){
    return {
     powerList:[
        {
          label:"全部",
          value:1
        },
        {
          label:"材料初审",
          value:2
        },
        {
          label:"复审（现场评估）",
          value:3
        },
        {
          label:"医师考试",
          value:4
        },
        {
          label:"信息公示",
          value:5
        },
        {
          label:"协议签订",
          value:6
        }
     ],
     personList:[
        {
            code:'01',
            name:'张胜男',
            position:'开发',
            power:['全部']
        },
        {
            code:'02',
            name:'赵思思',
            position:'网管',
            power:['全部','信息公示']
        }
     ],
    }
  },
  methods:{
      
  }
}
</script>