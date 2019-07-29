<template>
  <div class="layout">
    <headtop title="SFA" backurl="">
      <router-link to="/user" slot="r" class="icon iconfont icon-user"></router-link>
    </headtop>
    <div class="main-bd">
      <div class="date-wrap">{{getYearMonth}}</div>
      <div class="mp-wrap">
        <mprogress title="当前月进度" :val="getDayOfMonth" :percent="true"></mprogress>
        <mprogress title="月销售完成度" :val="monthSalePercent" :percent="true"></mprogress>
        <mprogress title="有效商店数" :val="shops" :percent="false"></mprogress>
      </div>
    </div>

  </div>
</template>


<script>
  import headtop from '../components/TopHead';
  import mprogress from '../components/Progress';
  import service from '../service';

  export default {
    name: "home",
    data() {
      return {
        monthSalePercent: 0,
        shops: 0
      }
    },
    components: {
      headtop,
      mprogress
    },
    computed: {
      getYearMonth() {
        let t = new Date();
        return `${t.getFullYear()}年${t.getMonth() + 1 }月`
      },
      getDayOfMonth() {
        let t = new Date();
        return parseInt((t.getDate() / 30) * 100);
      }
    },
    mounted() {},
    created() {
      service.getUserProgress()
        .then(res => {
          this.monthSalePercent = parseInt(res.data.monthPercent * 100);
          this.shops = res.data.totalShops;
        })
    }
  };
</script>


<style lang="scss" scoped>
  #pie {
    width: px2rem(500);
    height: px2rem(400);
  }

  .main-bd {
    background-color: #fff;

    .date-wrap {
      padding: px2rem(40) 0 px2rem(22);
      color: #000;
      font-size: $text-size-mid;
      text-align: center;
    }

    .mp-wrap {
      display: flex;
      justify-content: space-around;
    }
  }
</style>