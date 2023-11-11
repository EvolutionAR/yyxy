<template>
  <div>
    <van-nav-bar title="学员注册" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="studentId"
        name="studentId"
        required
        label="学员id"
        placeholder="学员id"
        :rules="[{ required: false, message: '请填写学员id' }]"
      />

      <van-field
        v-model="name"
        name="name"
        required
        label="姓名"
        placeholder="姓名"
        :rules="[{ required: false, message: '请填写姓名' }]"
      />
      <van-field
        v-model="sex"
        name="sex"
        label="性别"
        required
        @click="show2 = true"
        placeholder="性别"
        :rules="[{ required: false, message: '请填写性别' }]"
      />
      <van-action-sheet
        v-model="show2"
        :actions="sexList"
        @select="onSelect2"
      />

      <van-field
        v-model="grade"
        name="grade"
        label="年级"
        required
        @click="show1 = true"
        placeholder="年级"
        :rules="[{ required: false, message: '请填写年级' }]"
      />
      <van-action-sheet
        v-model="show1"
        :actions="gradeList"
        @select="onSelect1"
      />

      <van-field
        v-model="ageGroup"
        name="ageGroup"
        required
        @click="show = true"
        label="年龄段"
        placeholder="年龄段"
        :rules="[{ required: false, message: '请填写年龄段' }]"
      />
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
      <van-field
        v-model="phone"
        name="phone"
        type="tel"
        required
        label="电话号码"
        placeholder="电话号码"
        :rules="[
          { required: true, message: '请输入电话号码' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' }
        ]"
      />

      <van-field
        v-model="email"
        name="email"
        label="邮编"
        required
        placeholder="邮编"
        :rules="[
          { required: true, message: '请输入邮编' },
          {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '邮编格式错误！'
          }
        ]"
      />
      <van-field
        v-model="passport"
        name="passport"
        label="学籍"
        required
        placeholder="学籍"
        :rules="[{ required: false, message: '请填写学籍' }]"
      />
      <van-field
        v-model="nationality"
        name="nationality"
        required
        label="国籍"
        placeholder="国籍"
        :rules="[{ required: false, message: '请填写国籍' }]"
      />
      <van-field
        v-model="chineseLevel"
        name="chineseLevel"
        required
        label="中文水平"
        placeholder="中文水平"
        :rules="[{ required: false, message: '请填写中文水平' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { usercreate } from "@/api/api";
export default {
  data() {
    return {
      studentId: "", //学号
      name: "", // 名字
      grade: "", // 年龄段
      ageGroup: "", // 年龄段
      sex: "", // 性别
      address: "", // 地址
      phone: "", // 电话号码
      email: "", // 邮编
      passport: "", // 护照
      nationality: "", // 国籍
      chineseLevel: "", // 中文水平
      show: false,
      show1: false,
      show2: false,
      actions: [
        {
          name: "13-15",
          value: "13-15"
        },
        {
          name: "16-20",
          value: "16-20"
        },
        {
          name: "21-25",
          value: "21-25"
        },
        {
          name: "25+",
          value: "25+"
        }
      ],
      gradeList: [
        {
          name: "初中(middleschool)",
          value: "middleschool"
        },
        {
          name: "高中(highschool)",
          value: "highschool"
        },
        {
          name: "大学(university)",
          value: "university"
        },
        {
          name: "postgraduate",
          value: "postgraduate"
        }
      ],
      sexList: [
        {
          name: "男",
          value: "男"
        },
        {
          name: "女",
          value: "女"
        }
      ]
    };
  },
  methods: {
    async onSubmit(values) {
      const a = await usercreate(values);
    },
    onSelect(item) {
      this.ageGroup = item.value;
      this.show = false;
    },
    onSelect1(item) {
      this.grade = item.value;
      this.show1 = false;
    },
    onSelect2(item) {
      this.sex = item.value;
      this.show2 = false;
    }
  }
};
</script>

<style scoped></style>
