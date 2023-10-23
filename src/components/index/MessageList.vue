<template>
    <el-row class="notice">
        <h3>近期通知公告（此功能暂未开放）</h3>
        <!-- <ul>
            <li v-for="(noticeItem, noticeIndex) in noticeItems" :key="noticeIndex">
                <span>{{noticeItem.text}}
                    <el-badge is-dot v-if="!noticeItem.isSeen"></el-badge>
                </span>
                <div class="noticeRight">
                    <span>{{noticeItem.date}}</span>
                    <el-button :class="{'visited':!noticeItem.isSeen}" type="text" @click="readMessageById(noticeItem.messageId)">{{noticeItem.isSeen?"已查看":"待查看"}}</el-button>
                </div>
            </li>
        </ul> -->
    </el-row>
</template>
<script>

export default {
    name:'messagelist',
    data() {
        return {
            noticeItems: [
                {
                    text: '收到一条来自管理员的系统通知',
                    date: '2019-09-07',
                    isSeen: false,
                    link: '',
                    messageId:'01'
                },
                {
                    text: '收到一条来自管理员的系统通知',
                    date: '2019-09-07',
                    isSeen: true,
                    link: '',
                    messageId:'02'
                }
            ],
        }
    },
    mounted() {
    },
    methods:{
        
    }
}
</script>
<style scoped>
  .notice{
      padding-bottom: 10px
  }
</style>


