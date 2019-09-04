<template>
  <div class="login">
    <h1>欢迎登陆sfa xxx系统</h1>
    <div class="top_hat"></div>
    <!-- 登录框 -->
    <div class="login-box">
      <!-- logo -->
      <div class="logo-wrap">
        <div class="logo-box"></div>
      </div>
      <!-- 表单 -->
      <div class="input-group" :class="{active: act_index ===1, error: errors.has('cno')}">
        <label for="cm_code">公司编号:</label>
        <input name="cno" v-validate="{required: true,max: 6,min:4}" @focus="act_index=1" type="number" id="cm_code"
          v-model="cm_code" />
      </div>
      <div class="input-group" :class="{active: act_index ===2, error: errors.has('pno')}">
        <label for="PNO">员工编号:</label>
        <input name="pno" v-validate="{required: true,max: 6,min:4}" @focus="act_index=2" type="number" id="PNO"
          v-model="PNO" />
      </div>
      <div class="input-group" :class="{active: act_index ===3, error: errors.has('pwd')}">
        <label for="Passwd">用户密码:</label>
        <input name="pwd" v-validate="{required: true,max: 21,min:6}" @focus="act_index=3" type="password" id="Passwd"
          v-model="passwd" />
      </div>
      <!-- 记住密码, 自动登录 -->
      <div class="ck-row">
        <div class="ckbox_wrap" @click="remembSet" :class="{active: rememb}">
          <i class="iconfont" :class="{'icon-check-square': rememb, 'icon-border': !rememb}"></i>
          <span>记住密码</span>
        </div>
        <div class="ckbox_wrap" @click="autoLoginSet" :class="{active: autologin}">
          <i class="iconfont" :class="{'icon-check-square': autologin, 'icon-border': !autologin}"></i>
          <span>自动登录</span>
        </div>
      </div>
    </div>
    <!-- 登录按钮 -->
    <div class="btn-wrap">
      <p @click="loginBtnClick">登录</p>
    </div>
  </div>
</template>
<script>
  import "../assets/font/iconfont.css";
  import {
    Indicator,
    Toast
  } from 'mint-ui';
  import axios from 'axios';
  import {
    mapMutations
  } from 'vuex';

  import service from '../service/index'
  export default {
    name: "login",
    data() {
      return {
        act_index: 1,
        cm_code: "",
        passwd: "",
        PNO: "",
        rememb: false,
        autologin: false
      };
    },
    mounted() {
      let data = JSON.parse(localStorage.getItem("Login_data"));
      console.log("localStorage中的值是：", data)
      if (data) {
        this.cm_code = data.cm_code;
        this.PNO = data.PNO;
        this.passwd = data.Passwd;
        this.autologin = data.autologin;
        this.rememb = data.rememb;
      }

      //VeeValidate在页面挂载完毕后强制进行校验,避免没校验还能点登录
      //已经将$validator注入到vue实例中
      this.$validator.validate();

      //自动登录
      if (this.autologin) {
        this.loginBtnClick();
      }

    },
    methods: {
      ...mapMutations(['initUser']),
      autoLoginSet() {
        //设置当前的autoLogin为true或者false
        this.autologin = !this.autologin;
        //另外设置rememb的值
        this.autologin && (this.rememb = true);
      },
      remembSet() {
        this.rememb = !this.rememb;
        this.rememb || (this.autologin = false);
      },
      loginBtnClick() {
        //判断当前是否校验全部通过
        if (this.errors.any()) {
          return;
        }
        //弹出等待遮罩层,防止二次提交
        Indicator.open('正在登录...');
        //发送ajax请求 axios一个小的ajax请求库
        // 模拟登录
        // setTimeout(() => {
        //   Indicator.close();
        // }, 3000);
        service.login({
          cm_code: this.cm_code,
          PNO: this.PNO,
          Passwd: this.passwd
        }, {}).then(res => {

          if (res.data.code == 1) {
            //登录成功
            //记住用户名密码使用localstorage移动端支持localstorage
            // localStorage.setItem("Login_data", JSON.stringify({
            //   rememb: this.rememb,
            //   autologin: this.autologin,
            //   PNO: this.rememb ? this.PNO : "",
            //   cm_code: this.rememb ? this.cm_code : "",
            //   Passwd: this.rememb ? this.passwd : "",
            // }));


            //把当前登录的用户信息放到sessionStorage中
            sessionStorage.setItem("LoginUser", JSON.stringify(res.data.user));
            //把token放在sessionStorage中
            sessionStorage.setItem("LoginToken", JSON.stringify(res.data.token));

            //把当前登录的用户信息放到 Vuex
            // this.$store.commit('initUser', res.data.user);
            this.initUser(res.data.user);

            //跳转到Home页面
            this.$router.push("/home");
          } else {
            Toast({
              message: '用户名密码不正确,登录失败',
              duration: 2000
            });
          }
          Indicator.close();
        }).catch(e => {
          console.log('登录失败' + e);
          Indicator.close();
        });
      }
    }
  };
</script>


<style lang="scss" scoped>
  //  @import '../lib/hotcss/px2rem.scss';
  h1 {
    text-align: center;
    font-size: px2rem(36);
    height: px2rem(36);
    padding: px2rem(148-36-44) 0 px2rem(80) 0;
    line-height: px2rem(36);
    color: #fff;
  }

  @mixin login_wrap {
    width: px2rem(600);
    background-color: #fff;
    margin: 0 auto;
    border-radius: px2rem(20);
  }

  .login {
    background-color: #2ade69;
    height: 100%;

    .top_hat {
      width: px2rem(537);
      height: px2rem(18);
      background-color: #eee;
      margin: 0 auto;
      border-radius: px2rem(18) px2rem(18) 0 0;
    }

    .login-box {
      @include login_wrap;
      height: px2rem(836);

      .logo-wrap {
        padding: px2rem(80) 0;

        .logo-box {
          width: px2rem(190);
          height: px2rem(190);
          margin: 0 auto;
          background-repeat: no-repeat;
          background: url(../assets/logo.png);
          background-position: px2rem(-45) px2rem(-35);
          background-size: px2rem(280) px2rem(280);
        }
      }

      @mixin rowStyle() {
        padding: 0 px2rem(36);
        color: $text-color;
        width: px2rem(401);
        margin: 0 auto px2rem(30);
      }

      .input-group {
        border: 2px solid #e2e2e2;
        border-radius: px2rem(45);
        font-size: $text-size-mid;
        line-height: px2rem(90);
        @include rowStyle();

        input {
          border: 0 none;
          line-height: px2rem(90);
          width: px2rem(200);
          padding-left: 1em;
          outline: none;
        }
      }

      .input-group.active {
        color: $act-color;
        border: 2px solid $act-color;
      }

      .input-group.error {
        color: red;
        border: 2px solid red;
      }

      .ck-row {
        font-size: $text-size;
        @include rowStyle();
        display: flex;
        justify-content: space-between;

        .ckbox_wrap {
          padding-top: px2rem(8);

          i::before {
            display: inline-block;
            height: px2rem(30);
            width: px2rem(30);
            font-size: px2rem(30);
          }
        }

        .ckbox_wrap.active {
          color: $act-color;
        }
      }
    }

    .btn-wrap {
      @include login_wrap;
      font-weight: 700;
      letter-spacing: px2rem(10); //设置字的间距
      height: px2rem(100);
      text-align: center;
      line-height: px2rem(100);
      font-size: $text-size-imp;
      color: $act-color;
      margin-top: px2rem(30);
    }
  }
</style>

<style lang="scss">
  html,
  body,
  #app {
    height: 100%;
  }
</style>