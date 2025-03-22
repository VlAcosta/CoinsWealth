<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'


export default {
  name: 'ProfileView',
  components: {
    Header,
    Footer
  },
  data: function () {
    return {
      pagedefault: true,
      walletError: false,
      amountError: false,
      confirmedAddress: false,

      deposit_email: '',
      deposit_count: 1,

      fixed_window: 'null',
      withdraw_select: 0,

      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      requests_list: [],
      admins_list: [],

      packages_edit: false,
      packages_list: [],
      package_list_loading: false,
      report_list: [],
      report_packets: 0,
      select_admin_role: 0,
      user_role_email: '',
      user_role_email_error: false,

      approvals: []
    }},
  computed: {
    packageFilter: function () {
      return this.packages_list.filter(i => (i.delete == false))
    },
    packageSaveDisabled: function () {
      let counter = 0;
      for (const item of this.packages_list) {
        if (item.name.length < 1 || item.name.length > 25) item.errorlist.name = true
        else item.errorlist.name = false

        if (!Number(item.duration) || Number(item.duration) < 1 ||  Number(item.duration) > 100000) item.errorlist.duration = true
        else item.errorlist.duration = false

        if (!Number(item.min_amount) || Number(item.min_amount) < 1 ||  Number(item.min_amount) > 100000000 || Number(item.min_amount) > Number(item.max_amount)) item.errorlist.min_amount = true
        else item.errorlist.min_amount = false

        if (!Number(item.max_amount) || Number(item.max_amount) < 1 ||  Number(item.max_amount) > 100000000 || Number(item.min_amount) > Number(item.max_amount)) item.errorlist.max_amount = true
        else item.errorlist.max_amount = false

        if (!Number(item.min_apr) || Number(item.min_apr) < 0 ||  Number(item.min_apr) > 1000 || Number(item.min_apr) > Number(item.max_apr)) item.errorlist.min_apr = true
        else item.errorlist.min_apr = false

        if (!Number(item.max_apr) || Number(item.max_apr) < 1 ||  Number(item.max_apr) > 1000 || Number(item.min_apr) > Number(item.max_apr)) item.errorlist.max_apr = true
        else item.errorlist.max_apr = false

        if (!Number(item.max_slots) || Number(item.max_slots) < 1 ||  Number(item.max_slots) > 1000000 || Number(item.slots) > Number(item.max_slots)) item.errorlist.max_slots = true
        else item.errorlist.max_slots = false
        
        if (JSON.stringify(item.errorlist).includes(true)) counter++;
      }
      
      return counter > 0
    },
    giveUserRole: function() {
      if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.user_role_email) || this.user_role_email.length < 1) {
        this.user_role_email_error = false;
      } else this.user_role_email_error = true;

      
      return this.user_role_email.length < 1 || this.user_role_email_error || this.select_admin_role == 0
    }
    
  },
  methods: {
    async openAnotherPage(page) {
      if (page == '' || page == undefined) this.pageselected = 'deposit';
      else this.pageselected = page;

      if (this.$store.state.user.admin >= 3) {
        this.load_withdraw()
        this.load_approval()
      }

      switch (this.pageselected) {
        case "deposit":
        {
          if (this.$store.state.user.admin < 3) {
            this.pageselected = 'report';
            this.$router.replace('/admin/report').catch(()=>{});
          }
          break;
        }
        case "approval":
          {
            if (this.$store.state.user.admin < 3){
              this.pageselected = 'approval';
              this.$router.repalce('/admin/approval').catch(()=>{})
            }
          }
        case "withdraw":
        {
          if (this.$store.state.user.admin < 3) {
            this.pageselected = 'report';
            this.$router.replace('/admin/report').catch(()=>{});
          }
          break;
        }
        case "packages":
        {
          if (this.$store.state.user.admin >= 2) this.loadPackages();
          else {
            this.pageselected = 'report';
            this.$router.replace('/admin/report').catch(()=>{});
          }
          break;
        }
        case "report":
        {
          if (this.$store.state.user.admin >= 1) this.loadReportList();
          else {
            this.$router.push('/').catch(()=>{});
          }
          break;
        }
        case "users":
        {
          if (this.$store.state.user.admin >= 3) this.loadAdminList();
          else {
            this.pageselected = 'report';
            this.$router.replace('/admin/report').catch(()=>{});
          }
          break;
        }
      }
      
    },
    getSize() {
      this.width = document.documentElement.clientWidth;
      this.height = document.documentElement.clientHeight;
    },
    copy(element_id) {
      const testingCodeToCopy = document.querySelector(`#${element_id}`)
      testingCodeToCopy.select()

      document.execCommand('copy')
    },
    createDeposit() {
      let data = {
        count: this.deposit_count,
        token: this.$store.state.token,
        userid: this.$store.state.user.id,
        usermail: this.deposit_email
      }
      this.$store.dispatch('manual_deposit', data)
      .then(async resp => {
        
        switch (resp.data.status) {
          case "success":
          {
            alert('Balance is updated')
            break;
          }
          case "user_not_defined":
          {
            alert('The user was not found')
            break;
          }
          case "users_too_much":
          {
            alert('Several users have been found, fix the database')
            break;
          }
          case "token_expired":
          {
            //await this.$router.go()
            alert('Sign in to continue')
            break;
          }
          case "not_admin":
          {
            //await this.$router.go()
            alert('Get Admin to continue')
            break;
          }
        }
      })
    },
    load_withdraw() {
      let data = {
        token: this.$store.state.token,
        userid: this.$store.state.user.id
      }

      this.$store.dispatch('load_admin_withdraw', data)
      .then(async (resp) => {
        
        switch (resp.data.status) {
          case "success":
          {
            this.requests_list = resp.data.requests_list
            break;
          }
          case "token_expired":
          {
            this.$router.go()
            alert('Sign in to continue')
            break;
          }
          case "no_admin":
          {
            this.$router.go()
            alert('Sign in to continue')
            break;
          }
        }
      })
    },
    load_approval() {
      let data = {
        token: this.$store.state.token,
        userid: this.$store.state.user.id
      };

      this.$store.dispatch("load_admin_approval", data)
        .then((resp) => {
          switch (resp.data.status) {
            case "success":
              this.approvals = resp.data.requests_list;
              break;
            case "token_expired":
            case "no_admin":
              this.$router.go();
              alert("Sign in to continue");
              break;
          }
        });
    },
    approve_deposit(id) {
      console.log("approve_deposit вызван с ID:", id);
      let data = {
        token: this.$store.state.token,
        request_id: id
      };

      console.log("Данные для запроса approve_deposit:", data);

      this.$store.dispatch("approve_deposit", data)
        .then((resp) => {
          console.log("Ответ от сервера:", resp);  // Логируем ответ от сервера
          if (resp.data.status === "success") {
            console.log(`Баланс пользователя пополнен.`);

            this.approvals = this.approvals.filter(item => item.id !== id);
          } else {
            alert("Ошибка при пополнении.");
          }
        })
        .catch((error) => {
          console.error("Ошибка при обработке запроса approve_deposit:", error);  // Логирование ошибок
        });
    },

    reject_deposit(id) {
      console.log("reject_deposit вызван с ID:", id);
      let data = {
        token: this.$store.state.token,
        request_id: id
      };

      console.log("Данные для запроса reject_deposit:", data);  // Логирование данных перед запросом

      this.$store.dispatch('reject_deposit', data)
        .then((resp) => {
          console.log("Ответ от сервера:", resp);  // Логируем ответ от сервера
          if (resp.data.status === "success") {
            console.log(`Запрос на пополнение ${id} отклонён.`);

            this.approvals = this.approvals.filter(item => item.id !== id);
          } else {
            alert("Ошибка при отклонении.");
          }
        })
        .catch((error) => {
          console.error("Ошибка при отклонении:", error);  // Логирование ошибок
        });
    },


    loadAdminList() {
      let data = {
        token: this.$store.state.token,
        userid: this.$store.state.user.id
      }

      this.$store.dispatch('load_admins_list', data)
      .then(async (resp) => {
        
        switch (resp.data.status) {
          case "success":
          {
            this.admins_list = resp.data.requests_list
            break;
          }
          case "token_expired":
          {
            this.$router.go()
            alert('Sign in to continue')
            break;
          }
          case "no_admin":
          {
            this.$router.go()
            alert('Sign in to continue')
            break;
          }
        }
      })
    },
    openWithdraw(id) {
      var index = this.requests_list.map(x => {
        return x.id;
      }).indexOf(id);

      this.withdraw_select = index;
      this.fixed_window = 'confirm_withdraw'
    },
    closeFixed() {
      this.fixed_window = 'null'
    },
    edit_withdraw(state, num) {
      let data = {
        token: this.$store.state.token,
        userid: this.$store.state.user.id,
        state: state,
        with_id: this.requests_list[num].id
      }

      var index = this.requests_list.map(x => {
        return x.id;
      }).indexOf(num);

      

      this.$store.dispatch('edit_admin_withdraw', data)
      .then(async (resp) => {
        
        switch (resp.data.status) {
          case "success":
          {
            this.requests_list.splice(num, 1);
            //this.$router.go()
            break;
          }
          case "binance_error":
          {
            alert(`Binance error (${resp.data.code}): ${resp.data.errorMessage}`)
            break;
          }
          case "token_expired":
          {
            this.$router.go()
            alert('Sign in to continue')
            break;
          }
          case "no_admin":
          {
            this.$router.go()
            alert('Sign in to continue')
            break;
          }
        }
      })
    },
    loadPackages() {
      let data = {
        token: this.$store.state.token,
        userid: this.$store.state.user.id
      }
      this.package_list_loading = true
      this.$store.dispatch('load_admin_packages', data)
      .then(async (resp) => {
        
        switch (resp.data.status) {
          case "success":
          {
            this.package_list_loading = false
            this.packages_list = resp.data.requests_list
            for (const item of this.packages_list) {
              item.errorlist = {
                name: false,
                duration: false,
                min_amount: false,
                max_amount: false,
                min_apr: false,
                max_apr: false,
                max_slots: false,
              }
              item.delete = false
              item.slots_current = item.slots
            }
            break;
          }
          case "token_expired":
          {
            this.$router.go()
            alert('Sign in to continue')
            break;
          }
          case "no_admin":
          {
            this.$router.go()
            alert('Sign in to continue')
            break;
          }
        }
      })
    },
    editPackages() {
      
      if (this.packages_edit) {
        this.packages_list = []
        this.loadPackages();
      }

      this.packages_edit = !this.packages_edit
    },
    addPackage() {
      this.packages_list.push({
        name: "New Package",
        duration: 100,
        min_apr: 5,
        max_apr: 7,
        slots: 0,
        max_slots: 50,
        min_amount: 1000,
        max_amount: 2000,
        errorlist: {
          name: false,
          duration: false,
          min_amount: false,
          max_amount: false,
          min_apr: false,
          max_apr: false,
          max_slots: false,
        },
        delete: false,
        new: true
      })
    },
    savePackages() {
      let data = {
        token: this.$store.state.token,
        userid: this.$store.state.user.id,
        packages_list: this.packages_list
      }

      this.packages_edit = false
      this.$store.dispatch('save_admin_packages', data)
      .then(async (resp) => {
        
        switch (resp.data.status) {
          case "success":
          {
            this.packages_list = []
            this.loadPackages()
            break;
          }
          case "token_expired":
          {
            this.$router.go()
            alert('Sign in to continue')
            break;
          }
          case "no_admin":
          {
            this.$router.go()
            alert('Sign in to continue')
            break;
          }
        }
      })
    },
    deletePackage(i) {
      this.packages_list[i].delete = true

      this.packages_list.push('remove_field')
      this.packages_list.splice(this.packages_list.indexOf('remove_field'), 1);
    },
    loadReportList() {
      let data = {
        token: this.$store.state.token,
        userid: this.$store.state.user.id
      }
      this.$store.dispatch('load_admin_report', data)
      .then(async (resp) => {
        
        switch (resp.data.status) {
          case "success":
          {
            this.report_list = resp.data.report_list
            break;
          }
          case "token_expired":
          {
            this.$router.push('/')
            alert('Sign in to continue')
            break;
          }
          case "no_admin":
          {
            this.$router.push('/')
            alert('Sign in to continue')
            break;
          }
        }
      })
    },
    openUserPackets(id) {
      var index = this.report_list.map(x => {
        return x.id;
      }).indexOf(id);

      this.report_packets = index
      this.fixed_window = 'report_packets'
    },
    editAdminRole(email, level) {
      let data = {
        token: this.$store.state.token,
        userid: this.$store.state.user.id,
        email: email,
        level: level
      }
      this.$store.dispatch('edit_admin_role', data)
      .then(async (resp) => {
        
        this.admins_list = []
        switch (resp.data.status) {
          case "success":
          {
            if (level == 0) {
              alert('The user role has been deleted')
              this.loadAdminList()
            }
            else alert('The invitation has been sent')
            break;
          }
          case "token_expired":
          {
            this.$router.push('/sign-in')
            alert('Sign in to continue')
            break;
          }
          case "no_admin":
          {
            this.$router.push('/')
            break;
          }
          case "user_not_defined":
          {
            alert('User not find')
            break;
          }
          case "users_too_much":
          {
            alert('Users too much')
            break;
          }
          case "level_error":
          {
            alert('Level Error')
            break;
          }
          case "permission_denied":
          {
            alert('Permission Denied')
            break;
          }
        }
      })
    }
  },
  created() {
    
    window.addEventListener('resize', this.getSize);
  },
  mounted() {
    window.addEventListener('resize', this.getSize);
  },
  unmounted() {
    window.removeEventListener('resize', this.getSize);
  },
  beforeMount() {
    const page = this.$route.path.split('/')[2]
    this.openAnotherPage(page)
  },
  beforeRouteEnter(to, from, next) {
    // Используем функцию next с колбэком, который будет вызван после загрузки компонента
    next((vm) => {
      // Используем метод scrollTo для установки координат прокрутки страницы
      vm.$nextTick(() => {
        window.scrollTo(0, 0);
      });
    });
  },
}
</script>

<template>
  <div class="main_str">
    <Header/>
    <div class="fixed_container" v-if="this.fixed_window != 'null'">
      <div class="confirm_withdraw" v-if="this.fixed_window == 'confirm_withdraw'">
        <div class="withdraw_header">Confirm</div>
        <div class="withdraw_text">Confirm the withdrawal of funds for {{ requests_list[this.withdraw_select].name }}?</div>
        <div class="withdraw_info_cont">
          <div class="withdraw_binance_email">{{ requests_list[this.withdraw_select].email_binance }}</div>
          <div class="withdraw_count">{{ requests_list[this.withdraw_select].count }} USDT</div>
        </div>
        <div class="withdraw_btn_cont">
          <button class="withdraw_btn withdraw_yes" @click="edit_withdraw(2, withdraw_select)">Confirm</button>
          <button class="withdraw_btn withdraw_no" v-on:click="closeFixed()">Close</button>
        </div>
      </div>
      <div class="report_packets" v-if="this.fixed_window == 'report_packets'">
        <div class="withdraw_header">Buyed Packages</div>
        <div class="withdraw_text">{{ this.report_list[this.report_packets].packages }}</div>
        <div class="withdraw_header" style="margin-top: 20px;">History Packages</div>
        <div class="withdraw_text">{{ this.report_list[this.report_packets].packages_history }}</div>
        <div class="withdraw_btn_cont" style="justify-content: flex-end;">
          <button class="withdraw_btn withdraw_no" v-on:click="closeFixed()">Close</button>
        </div>
      </div>
    </div>
    <div id="block_1">
      <div class="page_name_container">
        <div class="page_name_text">
          ADMINS PANEL
        </div>
        <div class="page_name_info">
        </div>
      </div>
      <div class="page_container">
        <div class="page_selector_container">
          <router-link to="/admin/deposit" v-if="this.$store.state.user.admin >= 3" class="page_selector_item" :class="this.pageselected == 'deposit' ? 'active' : ''" @click.native="openAnotherPage('deposit');">Deposit</router-link>
          <router-link to="/admin/approval" v-if="this.$store.state.user.admin >= 2" class="page_selector_item" :class="this.pageselected == 'approval' ? 'active' : ''" @click.native="openAnotherPage('approval');">Approval {{ approvals.length > 0 ? `( ${approvals.length} )` : `` }}</router-link>
          <router-link to="/admin/withdraw" v-if="this.$store.state.user.admin >= 3" class="page_selector_item" :class="this.pageselected == 'withdraw' ? 'active' : ''" @click.native="openAnotherPage('withdraw');">Withdraw {{ requests_list.length > 0 ? `(${requests_list.length})` : `` }}</router-link>
          <router-link to="/admin/packages" v-if="this.$store.state.user.admin >= 2" class="page_selector_item" :class="this.pageselected == 'packages' ? 'active' : ''" @click.native="openAnotherPage('packages');">Packages</router-link>
          <router-link to="/admin/report" v-if="this.$store.state.user.admin >= 1" class="page_selector_item" :class="this.pageselected == 'report' ? 'active' : ''" @click.native="openAnotherPage('report');">Report</router-link>
          <router-link to="/admin/users" v-if="this.$store.state.user.admin >= 3" class="page_selector_item" :class="this.pageselected == 'users' ? 'active' : ''" @click.native="openAnotherPage('users');">Users</router-link>
        </div>
        <div class="page_block" v-show="this.pageselected == 'deposit'">
          <div class="total_balance_block">
            <div class="total_balance_text">Replenishment of USDT email</div>
          </div>
          <div class="deposit_adress_block">
            <div class="deposit_count_container">
                <span id='sp_in'>Email</span>
              <input type="text" name="deposit_count" id="deposit_count" placeholder="test@gmail.com" v-model="deposit_email">
              <span id='sp_in'>Value USDT </span>
              <input type="text" name="deposit_count" id="deposit_count" value="1" v-model="deposit_count">
            </div>
          </div>
          <button class="default-btn" v-on:click="createDeposit()">Deposit</button>
        </div>
        <div class="page_block" v-show="this.pageselected == 'withdraw'">
          <div class="container">
                <div class="block_outdrow">
                  <div class="outhdraw" v-for="item in requests_list" v-bind:key="item.id1">
                    <span id="name_user">{{ item.name }}</span>
                    <span id="value">{{ item.count }} USDT </span>
                    <div class="btn_yes" @click="openWithdraw(item.id)"><span>Accept</span></div>
                    <div class="btn_no" @click="edit_withdraw(1, withdraw_select)"><span>Deny</span></div>
                  </div>
                </div>
            </div>
        </div>
        <div class="page_block" v-show="this.pageselected == 'packages'">
          <div v-if="!packages_edit" class="packages_edit" v-on:click="editPackages">
            <img src="../assets/pencil-icon.svg" alt="" srcset="">
            <span>Edit</span>
          </div>
          <div v-else class="packages_edit_btns">
            <div class="package_edit_btn" v-on:click="addPackage">Add Package</div>
            <button class="package_edit_btn green_btn" :disabled="packageSaveDisabled" v-on:click="savePackages()">Save</button>
            <div class="package_edit_btn" v-on:click="editPackages">Cancel</div>
          </div>
          <div class="packages_list" :class="{'loading': package_list_loading}">
            <svg v-if="package_list_loading" version="1.1" id="package_loading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                <path fill="#b9f700" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                  <animateTransform 
                    attributeName="transform" 
                    attributeType="XML" 
                    type="rotate"
                    dur="1s" 
                    from="0 50 50"
                    to="360 50 50" 
                    repeatCount="indefinite" />
              </path>
            </svg>
            <div class="package_item" :class="{'package_error' : JSON.stringify(item.errorlist).includes(true)}" v-for="item in packageFilter" v-bind:key="item.id1">
              <div class="package_header">
                <span>Name: </span>
                <span v-if="packages_edit" class="package_parameter">
                  <input type="text" class="package_input_parameter" :class="{'package_error' : item.errorlist.name}" v-model="item.name" style="width: 150px; text-align: start;">
                </span>
                <span v-else class="package_parameter">{{ item.name }}</span>
              </div>
              <div class="package_header">
                <span>Duration: </span>
                <span v-if="packages_edit" class="package_parameter">
                  <input type="text" class="package_input_parameter" :class="{'package_error' : item.errorlist.duration}" v-model="item.duration">
                  days
                </span>
                <span v-else class="package_parameter">{{ item.duration }} days</span>
              </div>
              <div class="package_header">
                <span>Min. Amount: </span>
                <span v-if="packages_edit" class="package_parameter">
                  <input type="text" class="package_input_parameter" :class="{'package_error' : item.errorlist.min_amount}" v-model="item.min_amount" style="width: 70px;">
                  USDT
                </span>
                <span v-else class="package_parameter">{{ item.min_amount }} USDT</span>
              </div>
              <div class="package_header">
                <span>Max. Amount: </span>
                <span v-if="packages_edit" class="package_parameter">
                  <input type="text" class="package_input_parameter" :class="{'package_error' : item.errorlist.max_amount}" v-model="item.max_amount" style="width: 70px;">
                  USDT
                </span>
                <span v-else class="package_parameter">{{ item.max_amount }} USDT</span>
              </div>
              <div class="package_header">
                <span>APR: </span>
                <span v-if="packages_edit" class="package_parameter">
                  <input type="text" class="package_input_parameter" :class="{'package_error' : item.errorlist.min_apr}" v-model="item.min_apr">
                  -
                  <input type="text" class="package_input_parameter" :class="{'package_error' : item.errorlist.max_apr}" v-model="item.max_apr">
                  %
                </span>
                <span v-else class="package_parameter">{{ item.min_apr }} - {{ item.max_apr }} %</span>
              </div>
              <div class="package_header">
                <span>Slots: </span>
                <span v-if="packages_edit" class="package_parameter">
                  {{ item.max_slots - item.slots }} / 
                  <input type="text" class="package_input_parameter" :class="{'package_error' : item.errorlist.max_slots}" v-model="item.max_slots" style="width: 100px; text-align: start;">
                </span>
                <span v-else class="package_parameter">{{ item.max_slots - item.slots }} / {{item.max_slots}}</span>
              </div>
              <div class="package_delete" v-if="packages_edit" v-on:click="deletePackage(packages_list.indexOf(item))">Delete</div>
            </div>
          </div>
        </div>
        <div class="page_block" v-show="this.pageselected == 'report'">
            <div class="admins_block_report">
              <div class="report_list_item header" style="background: none; color: rgb(112, 115, 139);">
                <div class="report_list_text report_id">ID</div>
                <div class="report_list_text report_name">Name</div>
                <div class="report_list_text report_email">Email</div>
                <div class="report_list_text report_regdate">Date Reg.</div>
                <div class="report_list_text report_role">User Role</div>
                <div class="report_list_text report_deposit">Total Deposit Amount (TDA).</div>
                <div class="report_list_text report_withdraw">Total Withdraw Amount(TWA) </div>
                <div class="report_list_text report_packageinfo">Packages Info</div>
              </div>
              <div class="report_list_item" v-for="item in report_list" v-bind:key="item.id1">
                    <span class="report_list_text report_id">{{ item.id }}</span>
                    <span class="report_list_text report_name">{{ item.name }}</span>
                    <span class="report_list_text report_email">{{ item.email }}</span>
                    <span class="report_list_text report_regdate">{{ item.reg_time }}</span>
                    <span class="report_list_text report_role">{{ ['User', 'Viewer', 'Editor', 'Admin', 'Admin'][item.is_admin] }}</span>
                    <span class="report_list_text report_deposit">{{ item.deposit }} USDT</span>
                    <span class="report_list_text report_withdraw">{{ item.withdraw }} USDT</span>
                    <button class="btn btn-light report_packageinfo" @click="openUserPackets(item.id)">info</button>
              </div>
            </div>
        </div>
        <div class="page_block" v-show="this.pageselected == 'users'">
          <div class="users-block">
            <div class="admins_block">
              <div class="admins_block_title">Admins List</div>
              <div class="admins_list_item" style="background: none; font-size: 13px; color: rgb(112, 115, 139);">
                <div class="admins_list_text header" style="width: 20%;">Name</div>
                <div class="admins_list_text header" style="width: 60%;">Email</div>
                <div class="admins_list_text header" style="width: 20%;">Permission</div>
                <div class="admins_list_text header remove">Remove</div>
                
              </div>
              <div class="admins_list_item" v-for="item in admins_list" v-bind:key="item.id1">
                <span class="admins_list_text" style="width: 20%;">{{ item.name }}</span>
                <span class="admins_list_text" style="width: 60%;">{{ item.email }}</span>
                <span class="admins_list_text" style="width: 20%;">{{ ['Viewer', 'Editor', 'Admin', 'Admin'][Number(item.is_admin)-1] }}</span>
                <span class="admins_list_text remove" v-if="Number(item.is_admin) < 4"><img src="../assets/circle_slash.svg" alt="" srcset="" v-on:click="editAdminRole(`${item.email}`, Number(0))"></span>
                <span class="admins_list_text remove" v-else></span>
              </div>
            </div>
            <div class="user_add">
              <div class="in_block">
                <label id="lab_ad" for="">Email</label>
                <input id="em_ad" type="email" placeholder="Enter User Email" :class="{'red_outline': user_role_email_error}" v-model="user_role_email">
                <button class="add-btn" :disabled="giveUserRole" v-on:click="editAdminRole(`${user_role_email}`, Number(select_admin_role))">Add</button> 
              </div>
              <div class="block_permision">
                <label>Select user role:</label>
                <div class="radio_block">
                  <input type="radio" id="admin" name="userRole" :value="1" v-model="select_admin_role">
                  <label id='lab' for="admin">Viewer</label>
                </div>
                <div class="radio_block">
                <input type="radio" id="editor" name="userRole" :value="2" v-model="select_admin_role">
                <label  id='lab' for="editor">Editor</label>
                </div>
                <div class="radio_block">
                <input type="radio" id="viewer" name="userRole" :value="3" v-model="select_admin_role">
                <label id='lab' for="viewer">Admin</label>
                </div>
             </div>
            </div>
            </div>
        </div>
        <div class="page_block" v-show="pageselected == 'approval'">
          <div class="container">
            <div class="block_approval">
              <div class="approval" v-for="item in approvals" :key="item.id">
                <span id="name_user">{{ item.name }}</span>
                <span id="value">{{ item.count }} USDT </span>
                <div class="btn_yes" @click="approve_deposit(item.id)"><span>Accept</span></div>
                <div class="btn_no" @click="reject_deposit(item.id)"><span>Deny</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700&display=swap');


*{
  max-width: 100vw;
}

body{
  height: 10000px;
}

.fixed_container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm_withdraw {
  width: 100%;
  max-width: 400px;
  min-height: 200px;

  background: #1a1c27;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
}

.report_packets {
  width: 100%;
  max-width: 400px;
  min-height: 200px;

  background: #1a1c27;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
}

.withdraw_header {
  font-family: 'Poppins';
  font-weight: 500;
  color: #fff;
  font-size: 17px;
}

.withdraw_text {
  font-family: 'Poppins';
  font-weight: 400;
  color: #fff;
  font-size: 14px;
}

.withdraw_info_cont{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  
  font-family: 'Poppins';
  font-weight: 500;
  color: #ffffff;
  font-size: 14px;
}

.withdraw_binance_email {
  margin-right: 30px;
}

.withdraw_btn_cont {
  align-self: flex-end;
  display: flex;
  justify-content: space-between;

  width: 150px;
}

.withdraw_btn {
  font-family: 'Poppins';
  font-weight: 500;
  color: rgb(255, 255, 255);
  font-size: 14px;
  background: #222432;
  border: none;
  padding: 7px 10px;
  border-radius: 3px;

  display: flex;
  justify-content: center;

  cursor: pointer;
}

.withdraw_yes {
  background-color: #b9f700;
  color: black;
}

#sp_in{
    max-width: 150px;
    font-size: 16px;
    padding-left: 10px ;
    margin-top: 20px;
    font-family: 'IBM Plex Mono', monospace;
    color: #fff;
}

.container{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        max-width: 100%;
        margin: 10px -30px;
    }
    .block_outdrow, .block_approval{
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    #title_analytc, #title_outdraw{
        font-size: 28px;
        line-height: 32px;
        font-family: 'IBM Plex Mono', monospace;
        font-weight: 400;
        color: white;
        text-align: center;
        padding: 15px 0;
    }
    .outhdraw, .approval{
        border-radius: 5px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        flex-direction: row;
        background: hsla(0,0%,100%,.03);
        padding: 7px;
        color: white;
        text-align: center;
        justify-content: space-between;
        margin: 1% 10%;
    }

    .btn_yes, .btn_no{
        height: 27px;
        padding: 2px 5px 0px 5px;
        border-radius: 5px;
        cursor: pointer;
    }

    .btn_yes span, .btn_no span{
        margin-left: 0;
    }

    .btn_yes{
        background: #008000;
    }
    .btn_no{
        background: #E52E2E;
        
    }

.main_str{
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}



#block_1{
  width: 1140px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-self: flex-start;
  margin-left: 50%;
  margin-right: -50%;
  transform: translateX(-50%);
  flex-grow: 3;
  padding-bottom: 50px;
}





.page_name_container{
  width: 100%;
  margin-top: 8px;
  padding: 16px 20px;
  background: hsla(0,0%,100%,.03);
  margin-bottom: 33px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.page_name_text{
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  color: white;
  font-size: 16px;
  line-height: 24px;
  width: 120px;
}

.page_container{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  align-items: stretch;
  padding-right: 8px;
  padding-left: 8px;
}

.page_selector_container{
  min-width: 100%;
  border-bottom: 1px solid #222432;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 27px;
}

.page_selector_item{
  margin-left: 20px;
  margin-right: 20px;

  font-family: 'Poppins';
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
  margin-top: 1px;
  text-decoration: none;
}

.page_selector_item.active {
  border-bottom: 3px solid #b9f700;
  color: #b9f700;
  padding-bottom: 2px;
  margin-top: 0;
}

.total_balance_block{
  width: 400px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 16px;

  background: hsla(0,0%,100%,.03);
  border-radius: 2px;

  color: white;
  font-family: 'Poppins';
  white-space: nowrap;
  margin-top: 25px;
}

.total_balance_text{
  font-size: 14px;
  margin-right: 15px;
}

.total_balance_block > img {
  height: 18px;
  margin-right: 9px;
}

.total_balance_number {
  font-size: 12px;
  height: 18px;
  padding: 0;
}

.btc-small-numbers{
  font-size: 80%;
  font-weight: 400;
}

.send_only_btc_block{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 24px;
}

.send_only_btc_block > img {
  height: 18px;
  margin-right: 8px;
}

.send_only_btc_text{
  font-family: 'Poppins';
  font-size: 12px;
  line-height: 18px;
  color: #aeb1c5;
}

.send_only_btc_text > .bold{
  font-weight: 600;
}

.deposit_adress_block{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  font-family: 'Poppins';
  margin-bottom: 24px;
  width: 500px;
}

.deposit_adress_block > label {
  margin-bottom: 4px;
  font-size: 12px;
  color: #aeb1c5;
}
.deposit_adress_container{
  border: 1px solid #4f5364;
  border-radius: 2px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: baseline;
}

.deposit_count_container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 350px;
}

.deposit_count_container > div {
  font-family: 'Poppins';
  color: white;
  font-size: 14px;
}

#deposit_count{
  border: 1px solid #4f5364;
  border-radius: 2px;
  background: hsla(0,0%,100%,.03);

  padding: 8px 20px;

  width: 150px;
  font-size: 13px;
  color: #f8f8f8;
  outline: 0;
  margin-right: 10px;
}

.deposit_input_buttons{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.input_btn{
  height: 16px;
  width: 16px;
  margin-right: 8px;
}

.default-btn{
  background: #b9f700 !important;
  border: none;
  border-radius: 2px;
  padding: 8px 20px;
  height: 40px;
  font-family: 'Poppins';
  font-size: 14px;
  font-weight: 600;
  letter-spacing: .01em;
  color: #0c0e1b !important;
}

.btn_center{
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.text_input_block{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  font-family: 'Poppins';
  margin-bottom: 22px;
  width: 500px;
}

.text_input_block > label {
  margin-bottom: 4px;
  font-size: 12px;
  color: #aeb1c5;
}
.text_input_container{


  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
}

.text_input_container.input_error{
  border: 1px solid #db2626 !important;
}

.text_input_container > img{
  margin-left: 13px;
  height: 18px;
}

.text_input_container:hover{
  border: 1px solid #b9f700;
}

.text_input_container:active{
  border: 1px solid white;
}

#withdraw_adress{
  font-size: 13px;
  color: #f8f8f8;
  height: 48px;
  padding: 14px 8px;
  background: none;
  border: none;
  width: 100%;
  outline: 0;
}

#withdraw_amount{
  font-size: 16px;
  color: #f8f8f8;
  height: 48px;
  padding: 14px 8px;
  background: none;
  border: none;
  width: 100%;
  outline: 0;

}

.withdraw_amount_btn_max{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  height: 26px;
  margin-right: 12px;
  font-weight: 400;
  font-size: 12px;
}

input[type=checkbox] {
  background: none;
  border-radius: 1px;
  border: solid 1px #4f5364;
  margin-top: 6px;
}
*:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}

input[type=checkbox]:checked{
  background-image: url("../assets/checkbox_filled.be68eed66a791a4daba7c0366c25802e.svg");
  background-position: center center; 
}

.confirm_address{
  margin-bottom: 25px;
}

.confirm_address > input {
  margin-left: 13px;
}

.confirm_address > label {
  margin-left: 10px;
  font-family: 'Poppins' !important;
  font-size: 12px !important;
  color: #646882 !important;
}

.info_line {
  font-family: 'Poppins';
  font-size: 12px;
  line-height: 18px;
  color: #646882;
  margin-bottom: 4px;
}

.info_line > img {
  height: 16px;
  margin-right: 6px;
}

.whiteText{
  color: white;
}

.withdraw_btn_container{
  margin-top: 24px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

#withdraw_btn{
  padding: 8px 60px;
}

.history_container{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}

.history_null{
  padding: 24px 16px;
  background: hsla(0,0%,100%,.03);
  width: 500px;

  border-radius: 4px;
  font-family: 'Poppins';
  font-size: 14px;
  color: #aeb1c5;
}

.users-block{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.admins_block{
  width: 50%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
}

.admins_block_report{
  width: 100%;
  min-width: 523px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
}

.report_list_item.header {
  font-size: 12px;
}

.report_list_text{
  text-align: center;
}

.report_id {
  width: 3%;
}

.report_name{
  width: 16%;
}

.report_email{
  width: 25%;
}

.report_regdate {
  width: 10%;
}

.report_role {
  width: 8%;
}

.report_deposit, .report_withdraw {
  width: 10%;
}

.report_packageinfo {
  width: 4%;
  display: flex;
  justify-content: center;
}

button.report_packageinfo {
  background: #222432 !important;
  border: none;
  color: white;
  font-size: 12px;
  text-align: center;
}

.admins_block_title {
  font-family: 'Poppins';
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 10px;
}

.user_add{
  width: 50%;
  display: flex;
  flex-direction: row;
}

#lab_ad{
    font-size: 14px;
    margin-right: 15px;
    color: #ffffff;
}

label {
  font-size: 14px;
  color: white;
  display: block;
  margin-bottom: 8px;
}

 select {
  font-size: 14px;
  color: white;
  width: 150px;
  height: 37.5px;
  background: hsla(0, 0%, 100%, 0.03);
  padding: 5px;
  border: none;
  outline: none;
  border-radius: 5px;
  box-sizing: border-box;
  appearance: none; 
}

.in_block{
  display: flex;
  flex-direction: column;
  margin: 30px 20px;
}

.block_permision{
  margin-top: 35px;
}

select option {
  margin: 40px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.9);
  padding: 0;
  outline: 15px solid red;
  color: #fff;
  
}

select option:focus {
  border: 15px solid red;
}



#em_ad{
  border: 1px solid #4f5364;
  border-radius: 2px;
  background: hsla(0, 0%, 100%, 0.03);
  padding: 8px 20px;
  min-width: 250px;
  font-size: 13px;
  color: #f8f8f8;   
  border: none;
    outline: none;
    scroll-behavior: smooth;
  margin-top: 5px;
}

#confirm_address{
  background: none;
    border-radius: 1px;
    border: solid 1px #4f5364;
    margin-top: 6px;
}

.add-btn{
  background: #b9f700;
  border: none;
  border-radius: 2px;
  padding: 8px 20px;
  height: 40px;
  font-family: 'Poppins';
  font-size: 14px;
  font-weight: 600;
  letter-spacing: .01em;
  margin: 20px 0px;
  color: #0c0e1b !important;
}

.add-btn:disabled{
  background: #a8a9b1 !important;
  color: #5b5f7b !important;
}

.admins_list_item {
  width: 100%;
  margin-bottom: 5px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  background: hsla(0,0%,100%,.03);
  border-radius: 3px;
  padding: 7px 0;

  font-family: 'Poppins';
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
}

.report_list_item {
  min-width: 100%;
  margin-bottom: 4px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  background: hsla(0,0%,100%,.03);
  border-radius: 3px;
  padding: 5px 0;

  font-family: 'Poppins';
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
}

.admins_list_text {
  width: 20%;
  text-align: center;
}

.admins_list_text.remove {
  width: 10%;
}

.admins_list_text.remove > img {
  color: red;
  cursor: pointer;
}

.radio_block{
  display: flex;
  flex-direction: row;
  accent-color: #b9f700;
}

#lab{
  margin: 10px 10px ;
}

.packages_edit {
  height: 30px;
  width: 70px;
  background: #222432;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  color: white;

  margin-top: 20px;

  font-family: 'Poppins';
  font-size: 15px;
  font-weight: 400;

  cursor: pointer;
  align-self: flex-end;
  margin-right: 10px;
}

.packages_edit > img {
  height: 17px;
}

.packages_edit_btns {
  height: 30px;
  width: 270px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  color: white;

  margin-top: 20px;

  font-family: 'Poppins';
  font-size: 15px;
  font-weight: 500;

  align-self: flex-end;
}

.package_edit_btn {
  padding: 5px 10px;

  background: #222432;
  border-radius: 2px;
  cursor: pointer;
}

.green_btn {
  background: #b9f700;
  color: black;
  border: none;
}

.green_btn:disabled {
  opacity: .4;
  cursor: default;
}

.page_block{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  min-width: 100%;
}

.packages_list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-top: 15px;
}

.package_item {
  width: 49.5%;
  background: #222432;
  border-radius: 5px;
  margin-bottom: 8px;
  padding: 8px 14px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.package_header {
  font-family: 'Poppins';
  font-size: 16px;
  font-weight: 600;
  color: white;
  width: 50%;
  margin-bottom: 5px;
}

.package_error {
  box-shadow: inset 0px 0px 10px rgba(255, 0, 0, 0.5);
  outline: 1px solid red !important;
  border: none !important;
}

.package_parameter {
  font-weight: 400;
  color: white;
}

.package_input_parameter {
  width: 50px;
  
  background: #1a1c27;
  color: white;
  border: 1px solid #646882;
  border-radius: 3px;
  font-size: 15px;
  padding: 3px 5px;
  text-align: center;
}

.package_input_parameter:focus {
  outline: 1px solid #ffffff;
}

.package_delete {
  font-family: 'Poppins';
  font-size: 13px;
  font-weight: 400;
  color: rgb(255, 0, 0);
  cursor: pointer;
  margin-top: 10px;
}

#package_loading {
  height: 100px;

}

.red_outline {
  outline: 1px solid red !important;
}

.packages_list.loading {
  justify-content: center;
}

@media screen and (max-width: 1200px) {
  #block_1{
    width: 960px;
  }
}

@media screen and (max-width: 990px) {
    #block_1{
      width: 720px;
    }

    .page_container{
      flex-direction: column;
    }

    .page_name_container{
      justify-content: center;
      padding: 8px;
    }
    .page_name_text{
      white-space: nowrap;
      width: auto;
      margin: 0;
    }

    .deposit_adress_block, .text_input_block{
      width: 100%;
    }

    .withdraw_btn_container{
      justify-content: center;
    }

    #withdraw_btn{
      padding: 8px 20px;
    }
    .total_balance_block{
      width: 100%;
    }
    
    .history_null{
      width: 100%;
    }
    .users-block {
      flex-direction: column;
    }
    .admins_block {
      width: 100%;
    }

    .packages_list {
      flex-direction: column;
      flex-wrap: nowrap;
    }
    .package_item {
      width: 100%;
    }
    .package_header {
      margin-bottom: 20px;
    }

    .report_list_item {
      font-size: 10px;
    }

    .admins_block, .users-block{
      width: 100%;
    }
}

@media screen and (max-width: 768px) {
  #block_1{
    width: 540px;
  }

  .report_list_item.header {
    font-size: 9px;
  }

  .report_list_text, button.report_packageinfo {
    font-size: 8px;
  }

  .admins_list_text.header {
    font-size: 9px;
  }
  
}

@media screen and (max-width: 500px) {
  .deposit_adress_block{
    padding-left: 8px;
  }
  button{
    margin-left: 8px;
  }
  .outhdraw > span {
    font-size: 14px;
    line-height: 30px;
  }

  .admins_list_item {
    font-size: 12px;
  }
  .page_block{
    margin-top: 30px;
    overflow-x: scroll;
  }
  .package_header {
    width: 100%;
  }
}

</style>