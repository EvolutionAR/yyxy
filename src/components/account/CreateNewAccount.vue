<template>
  <div>
    <div class="breadcrumbContainer">
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="tableContainer tableQuickSearchContainer">
      <el-form :model="createNewAccountParam" class="searchForm">
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="学员名称">
              <el-input v-model="createNewAccountParam.institutionName" placeholder="请输入机构名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="学员名称">
              <el-input v-model="createNewAccountParam.institutionName" placeholder="请输入机构名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="学员名称">
              <el-input v-model="createNewAccountParam.institutionName" placeholder="请输入机构名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="学员名称">
              <el-input v-model="createNewAccountParam.institutionName" placeholder="请输入机构名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="学员名称">
              <el-input v-model="createNewAccountParam.institutionName" placeholder="请输入机构名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="机构类型">
              <el-select
                class="select-type"
                v-model="createNewAccountParam.institutionType"
                placeholder="请选择机构类型"
              >
                <el-option
                  v-for="(item,index) in institutionTypeList"
                  :key="index"
                  :label="item.institutionTypeName"
                  :value="item.institutionTypeCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-form-item>
            <el-button type="primary" class="create-btn" @click="createAccount">创建</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <el-dialog
        title="温馨提示"
        :visible="dialogVisible"
        width="30%"
        :append-to-body="true"
        :before-close="handleClose"
      >
        <div>
          <p class="account-mes">{{createNewAccountParam.institutionName}}的账号密码如下</p>
          <p id="share-content">账号：{{shareContent.accountNum}} 密码：{{shareContent.password}}</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <button
            id="copy-btn"
            class="copy-btn"
            :data-clipboard-text="copyText"
            @click="copy"
          >复制到粘贴板</button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import {
  createInstitutionUser,
  getAllInstitutionType,
  usercreate
} from "@/api/api";
import { Message } from "element-ui";
import { SUCCESS_CODE, FAIL_CODE, ERR_CODE } from "@/utils/Constant";
import BreadCrumb from "@/components/public/breadCrumb";
export default {
  name: "CreateNewAccount",
  components: {
    BreadCrumb
  },
  data() {
    return {
      createNewAccountParam: {
        institutionName: "",
        institutionType: ""
      },
      institutionTypeList: [],
      dialogVisible: false,
      shareContent: {
        accountNum: "",
        password: ""
      },
      copyText:'',
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    async usercreate () {
      const a = await usercreate()
      console.log(a,'dsadasd')
    },
    createAccount() {
      if (!this.createNewAccountParam.institutionName) {
        Message.error("请输入机构名称");
        return;
      }
      if (!this.createNewAccountParam.institutionType) {
        Message.error("请选择机构类型");
        return;
      }
      this.$loading.show();
      createInstitutionUser(this.createNewAccountParam).then(res => {
        this.$loading.hide();
        if (res && res.code === FAIL_CODE) {
          Message.error({ message: res.message });
          return;
        }
        if (res && res.code === SUCCESS_CODE) {
          this.shareContent.accountNum = res.data.institutionId;
          this.shareContent.password = res.data.passWord;
          this.copyText = '账号：'+this.shareContent.accountNum+' '+'密码：'+this.shareContent.password
          this.dialogVisible = true;
        }
      });
    },
    getAllInstitutionType() {
      getAllInstitutionType().then(res => {
        if (res && res.code === FAIL_CODE) {
          Message.error({ message: res.message });
          return;
        }
        if (res && res.code === SUCCESS_CODE) {
          this.institutionTypeList = res.data;
        }
      });
    },
    //复制到粘贴板
    copy() {
      let clipboard = new Clipboard("#copy-btn")
      clipboard.on("success", e => {
        this.$message({
          message: "复制成功",
          type: "success"
        });
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // this.dialogVisible = false
        this.$message({
          message: "您的浏览器不支持自动复制",
          type: "error"
        });
        clipboard.destroy();
      });
    }
  },
  mounted() {
    this.usercreate();
  }
};
</script>
<style scoped>
.select-type {
  width: 100%;
}
.create-btn {
  margin-left: 68px;
}
.copy-btn {
  border-radius: 2px;
  padding: 7px 17px;
  border: none;
  outline: none;
  color: #fff;
  background: #377dff;
  box-sizing: border-box;
}
.account-mes {
  height: 40px;
  line-height: 30px;
}
.copy-btn:hover{
  cursor: pointer;
}
#share-content{
  -webkit-user-select: all;
  -khtml-user-select: all;
  -moz-user-select: all;
  -ms-user-select: all;
  user-select: all;
}
</style>

