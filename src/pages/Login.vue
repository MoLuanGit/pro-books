<template>
  <el-col :span="12" :offset="5" class="form-reg">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="login('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>
<script>
export default {
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.username !== "") {
          if (value.length < 3) {
            callback(new Error("用户名长度不能小于3位"));
          } else {
            callback();
          }
        }
      }
    };
    let validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password !== "") {
        }
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { username, password } = this.ruleForm;

          this.$axios
            .get("/login", {
              params: {
                username,
                password
              }
            })
            .then(({ data }) => {
              if (data.code == 250) {
                alert("用户名或密码错误");
              } else if (data.code == 1000) {
                localStorage.setItem("Authorization", data.data);

                let des = this.$route.query.des;

                this.$router.replace({ path: des ? des : "/home" });
                
                this.$store.commit("changeLog", true);
              }
            });
        } else {
          console.log("error login!!");
          return false;
        }
      });
    }
  },
  created() {
    if (this.$route.query.des) {
      console.log('this.$route.query.des',this.$route.query.des)
      this.$store.commit("changeAppActive", this.$route.query.des);
    }
  }
};
</script>