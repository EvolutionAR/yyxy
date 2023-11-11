<template>
  <div>
    <div class="breadcrumbContainer">
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="tableContainer tableQuickSearchContainer">
      <el-form
        :model="createNewAccountParam"
        class="searchForm"
        ref="createNewAccountParam"
      >
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item
              label="学员id"
              label-width="100px"
              prop="studentId"
              :rules="[
                { required: true, message: '请输入手机号', trigger: 'blur' }
              ]"
            >
              <el-input
                v-model="createNewAccountParam.studentId"
                placeholder="请输入学员id"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="姓名" label-width="100px">
              <el-input
                v-model="createNewAccountParam.name"
                placeholder="请输入姓名"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="性别" label-width="100px">
              <el-select
                class="select-type"
                v-model="createNewAccountParam.sex"
                placeholder="请选择性别"
              >
                <el-option
                  v-for="(item, index) in sexList"
                  :key="index"
                  :label="item.sexName"
                  :value="item.sexCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="年级" label-width="100px">
              <el-select
                class="select-type"
                v-model="createNewAccountParam.grade"
                placeholder="请选择年级"
              >
                <el-option
                  v-for="(item, index) in gradeList"
                  :key="index"
                  :label="item.gradeTypeName"
                  :value="item.gradeCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="年龄段" label-width="100px">
              <el-select
                class="select-type"
                v-model="createNewAccountParam.ageGroup"
                placeholder="请选择年龄段"
              >
                <el-option
                  v-for="(item, index) in ageGroupList"
                  :key="index"
                  :label="item.ageGroupListTypeName"
                  :value="item.ageGroupListCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="地址" label-width="100px">
              <el-input
                v-model="createNewAccountParam.address"
                placeholder="请输入地址"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item
              label="电话号码"
              prop="phone"
              label-width="100px"
              :rules="[
                { required: true, message: '请输入手机号', trigger: 'blur' },
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: '手机号码格式错误！',
                  trigger: ['blur', 'change']
                }
              ]"
            >
              <el-input
                v-model="createNewAccountParam.phone"
                placeholder="请输入电话号码"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item
              label="邮箱"
              label-width="100px"
              prop="email"
              :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                {
                  type: 'email',
                  message: '请输入正确的邮箱地址',
                  trigger: ['blur', 'change']
                }
              ]"
            >
              <el-input
                v-model="createNewAccountParam.email"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="护照" label-width="100px">
              <el-input
                v-model="createNewAccountParam.passport"
                placeholder="请输入护照"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="国籍" label-width="100px">
              <el-input
                v-model="createNewAccountParam.nationality"
                placeholder="请输入国籍"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="中文水平" label-width="100px">
              <el-input
                v-model="createNewAccountParam.chineseLevel"
                placeholder="请输入中文水平"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-form-item>
            <el-button type="primary" class="create-btn" @click="createAccount"
              >创建</el-button
            >
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
          <p class="account-mes">
            {{ createNewAccountParam.institutionName }}的账号密码如下
          </p>
          <p id="share-content">
            账号：{{ shareContent.accountNum }} 密码：{{
              shareContent.password
            }}
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
          <button
            id="copy-btn"
            class="copy-btn"
            :data-clipboard-text="copyText"
            @click="copy"
          >
            复制到粘贴板
          </button>
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
        studentId: "",
        name: "", // 名字
        grade: "", // 年龄段
        ageGroup: "", // 年龄段
        sex: "", // 性别
        address: "", // 地址
        phone: "", // 电话号码
        email: "", // 邮编
        passport: "", // 护照
        nationality: "", // 国籍
        chineseLevel: "" // 中文水平
      },
      sexList: [
        {
          sexName: "男",
          sexCode: "男"
        },
        {
          sexName: "女",
          sexCode: "女"
        }
      ],
      gradeList: [
        {
          gradeTypeName: "初中",
          gradeCode: "middleschool"
        },
        {
          gradeTypeName: "高中",
          gradeCode: "highschool"
        },
        {
          gradeTypeName: "大学",
          gradeCode: "university"
        },
        {
          gradeTypeName: "研究生",
          gradeCode: "postgraduate"
        }
      ],
      ageGroupList: [
        {
          ageGroupListTypeName: "13-15",
          ageGroupListCode: "13-15"
        },
        {
          ageGroupListTypeName: "16-20",
          ageGroupListCode: "16-20"
        },
        {
          ageGroupListTypeName: "21-25",
          ageGroupListCode: "21-25"
        },
        {
          ageGroupListTypeName: "25以上",
          ageGroupListCode: "25以上"
        }
      ],
      institutionTypeList: [],
      dialogVisible: false,
      shareContent: {
        accountNum: "",
        password: ""
      },
      copyText: ""
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    createAccount() {
      this.$refs["createNewAccountParam"].validate(valid => {
        if (valid) {
          usercreate(this.createNewAccountParam).then(res => {
            console.log(res);
          });
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
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
      let clipboard = new Clipboard("#copy-btn");
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
    // this.usercreate();
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
.copy-btn:hover {
  cursor: pointer;
}
#share-content {
  -webkit-user-select: all;
  -khtml-user-select: all;
  -moz-user-select: all;
  -ms-user-select: all;
  user-select: all;
}
</style>
