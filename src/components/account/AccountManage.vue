<template>
  <div class="account-manage">
    <div class="breadcrumbContainer">
      <BreadCrumb></BreadCrumb>
      <!-- <h1>机构账号管理</h1> -->
    </div>
    <div class="tableContainer tableQuickSearchContainer">
      <el-form :model="getInstitutionParam" class="searchForm">
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="学员账号">
              <el-input
                prefix-icon="el-icon-search"
                v-model="getInstitutionParam.studentId"
                :clearable="clearable"
                placeholder="请输入学员账号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="insAccountList" style="width: 100%">
        <el-table-column
          prop="insID"
          type="index"
          width="60"
          label="编号"
        ></el-table-column>
        <el-table-column prop="studentId" label="学员id"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="grade" label="年级"></el-table-column>
        <el-table-column prop="ageGroup" label="年龄段"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="phone" label="电话号码"></el-table-column>
        <el-table-column prop="email" label="邮编"></el-table-column>
        <el-table-column
          prop="passport"
          label="学籍"
          style="user-select:all;"
        ></el-table-column>
        <el-table-column prop="nationality" label="国籍"></el-table-column>
        <el-table-column prop="chineseLevel" label="中文水平"></el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          style="user-select:all;"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="resetAccount(scope.row)"
              >查看分数</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="total > 10"
        class="pagination"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <el-dialog
        title="温馨提示"
        :visible="dialogVisible"
        width="30%"
        :append-to-body="true"
        :before-close="handleClose"
      >
        <div>
          <p class="account-mes">
            {{ resetAccountInfo.institutionName }} 重置之后的账号密码如下
          </p>
          <p id="share-content">
            账号：{{ resetAccountInfo.accountNum }} 密码：{{
              resetAccountInfo.password
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
import {
  createInstitutionUser,
  getAllInstitutionList,
  resetPassword,
  userlist
} from "@/api/api";
import { Message } from "element-ui";
import { SUCCESS_CODE, FAIL_CODE, ERR_CODE } from "@/utils/Constant";
import BreadCrumb from "@/components/public/breadCrumb";
import { getUserId } from "@/utils/LocalStoragePerform.js";
import Clipboard from "clipboard";
export default {
  name: "AccountManage",
  components: {
    BreadCrumb
  },
  data: function() {
    return {
      getInstitutionParam: {
        studentId: ""
      },
      query: {},
      clearable: true,
      insAccountList: [],
      total: 0,
      currentPage: 0,
      dialogVisible: false,
      copyText: "",
      resetAccountInfo: {
        institutionName: "",
        accountNum: "",
        password: ""
      },
      resetPasswordParam: {
        operatorUserId: getUserId(),
        passiveUserId: ""
      }
    };
  },
  methods: {
    getAllInstitutionList() {
      this.$loading.show();
      getAllInstitutionList(this.getInstitutionParam).then(res => {
        this.$loading.hide();
        if (res && res.code === FAIL_CODE) {
          Message.error({ message: res.message });
          return;
        }
        if (res && res.code === SUCCESS_CODE) {
          this.insAccountList = res.data.list;
          this.total = res.data.total;
        }
      });
    },

    async onSubmit() {
      let res = [];
      if (!this.getInstitutionParam.studentId) {
        res = await userlist();
      } else {
        res = await userlist(this.getInstitutionParam);
      }
      this.insAccountList = res.data;
    },
    handleCurrentChange(value) {
      this.currentPage = value;
      this.getInstitutionParam.pageNum = value;
      this.getAllInstitutionList();
    },
    resetAccount(row) {
      console.log(row, "asdasdasda");
      this.$confirm(
        "您确定要重置" + " " + row.institutionName + " " + "的登录密码吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          //todo 调用接口
          //this.$message("此功能暂未开放");
          this.resetAccountInfo.institutionName = row.institutionName;
          this.resetPasswordParam.passiveUserId = row.institutionId;
          this.resetPassword();
        })
        .catch(() => {});
    },
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
    },
    async userlist() {
      const res = await userlist();
      this.insAccountList = res.data;
    },
    resetPassword() {
      this.$loading.show();
      resetPassword(this.resetPasswordParam).then(res => {
        this.$loading.hide();
        if (res && res.code === FAIL_CODE) {
          Message.error({ message: res.message });
          return;
        }
        if (res && res.code === SUCCESS_CODE) {
          this.resetAccountInfo.accountNum = res.data.userId;
          this.resetAccountInfo.password = res.data.password;
          this.copyText =
            "账号：" +
            this.resetAccountInfo.accountNum +
            " " +
            "密码：" +
            this.resetAccountInfo.password;
          this.dialogVisible = true;
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
    }
  },
  mounted() {
    this.userlist();
    // this.getAllInstitutionList()
  }
};
</script>
<style scoped>
.infoContainer {
  margin: 30px 32px;
  margin-top: 0px;
  padding-bottom: 15px;
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
.copy-btn:hover {
  cursor: pointer;
}
.account-mes {
  height: 40px;
  line-height: 30px;
}
#share-content {
  -webkit-user-select: all;
  -khtml-user-select: all;
  -moz-user-select: all;
  -ms-user-select: all;
  user-select: all;
}
</style>
