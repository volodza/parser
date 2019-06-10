<template>
  <v-app>
   <v-navigation-drawer 
   app
   v-model="drawer"

   >
      <!--укоротить через v-for-->
     <v-list>
      <!-- <v-list-tile
        :href="'http://178.44.17.0:3000/auth/vkontakte'"
      >
        <v-list-tile-action>
          <v-icon>mdi-login-variant</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Войти</v-list-tile-title>
      </v-list-tile> -->
    
      <img style="height:50px;margin-left:30px" src="../src/assets/parserlogo2.png" alt="">

      <v-list-group
        prepend-icon="mdi-settings"
        value="true"
      >
        <template 
        v-slot:activator
        >
          <v-list-tile>
            <v-list-tile-title>Инструменты</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>ПОИСК</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="link in links.search"
            :key="link.title"
            @click="1"
            :to='link.url'
          >
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="link.icon"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-group
          sub-group
          no-action
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>СБОР</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="link in links.collect"
            :key="link.title"
            @click="1"
            :to='link.url'
          >
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon :color="link.iconColor" v-text="link.icon"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>АКТИВНОСТИ</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="link in links.activity"
            :key="link.title"
            @click="1"
          >
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="link.icon"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

      </v-list-group>



    </v-list>

   </v-navigation-drawer>
   <v-toolbar app >
     <v-toolbar-side-icon  @click.stop="drawer = !drawer" class="hidden-lg-and-up"></v-toolbar-side-icon>
     <!-- <v-toolbar-title>Title</v-toolbar-title> -->
      <v-spacer></v-spacer>

      <!-- меню с зада4ами -->
    <div v-if="this.$store.getters.user">
      <v-badge 
        overlap class="hidden-md-and-up" 
        v-if="$store.getters.user"
        v-model="$store.getters.tasks.length" 
      >

        <template v-slot:badge>
          <span>{{$store.getters.tasks.length}}</span>
        </template>

        <v-menu
          :close-on-content-click="false"
          :nudge-width="200"
        >

          <template v-slot:activator="{ on }">
            <v-btn
              class="hidden-md-and-up"
              color="black"
              dark
              v-on="on"
              outline
              style='height:30px'
            >
              Мои задачи
            </v-btn>
          </template>

          <v-card>
            <tasks></tasks>
          </v-card>

        </v-menu>
      </v-badge>
    </div>
     <!-- <v-menu
        v-if="this.$store.getters.user"
        :close-on-content-click="false"
        :nudge-width="200"
      >
      <template v-slot:activator="{ on }">
        <v-btn
          class="hidden-md-and-up"
          color="black"
          dark
          v-on="on"
          outline
        >
          Мои задачи
        </v-btn>
      </template>

      <v-card>
          <tasks></tasks>
      </v-card>
    </v-menu> -->
     <!-- <v-spacer></v-spacer>  -->
     
        <v-menu  offset-y v-if="this.$store.getters.user">
          <template v-slot:activator="{ on }">
            <v-btn
              left
              outline 
              v-on="on"
              style="height:50px;width:70px;border:none"
            >
              <v-avatar
                :tile="false"
                :size="40"
                
              >
                <img :src="$store.getters.user.photo_50">
              </v-avatar>
              
              <v-icon >mdi-chevron-down</v-icon>
        
            </v-btn>
          </template>
          <v-list>
            <v-list-tile
              v-for="(item, index) in menu"
              :key="index"
              @click="item.onClick"
            >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-icon right>{{item.icon}}</v-icon>
            </v-list-tile>
          </v-list>
        </v-menu>
          
        <!-- <v-avatar
          :tile="false"
          :size="40"
          color="grey lighten-4"
        >
          <img :src="this.$store.getters.user.photo_50">
        </v-avatar> -->


          <!-- <v-btn
          style="height:30px;font:"
          flat
          outline
          v-if="this.$store.getters.user"
       >Тариф "{{this.$store.getters.user.profile_status}}"</v-btn>
          <v-list-tile
              v-if="this.$store.getters.user"
              :key="'item.title'"
              avatar
              @click="1"
            >
              <v-list-tile-avatar>
                <img :src="this.$store.getters.user.photo_50">
                
              </v-list-tile-avatar>

              <v-list-tile-content>

                <v-list-tile-title v-html="this.$store.getters.user.first_name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="'item.subtitle'"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile> -->

     <!-- <v-toolbar-items class="hidden-sm-and-down"> -->
       
       <v-btn 
        @click="vkAuth"
        flat
        style="background:#4a76a8"
        dark
        
        v-if="!this.$store.getters.user"
       >
         <v-icon left>mdi-vk</v-icon>
         Войти
       </v-btn>
       <!-- <v-btn
       v-if="this.$store.getters.user"
        flat
        @click="userLogout"
       >Выйти</v-btn> -->

     <!-- </v-toolbar-items> -->
   </v-toolbar>

   <v-content class='grey lighten-1'>
       <router-view></router-view>
   </v-content>
   <!-- snackbar-error -->
    <template v-if="error">
      <v-snackbar
        @input="closeError"
        :multi-line="false"
        :timeout="5000"
        color="error"
        :value="true"
      >
        {{error}}
        <v-btn
          dark
          flat
          @click="closeError"
        >
          Закрыть
        </v-btn>
      </v-snackbar>
    </template>

    <!-- snackbar-access -->
    <template v-if="success">
      <v-snackbar
        @input="closeSuccess"
        :multi-line="false"
        :timeout="5000"
        color="success"
        :value="true"
      >
        {{success}}
        <v-btn
          dark
          flat
          @click="closeSuccess"
        >
          Закрыть
        </v-btn>
      </v-snackbar>
    </template>




 </v-app>
</template>

<script>
import Tasks from './components/instruments/search/Tasks'
export default {
  components:{Tasks:Tasks},
  data () {
    return {
      menu:[
        {title:'Настройки', onClick:1, icon:'mdi-settings'},
        {title:'Выйти', onClick:this.userLogout, icon:'mdi-exit-to-app'}
      ],
      drawer:null,
      links:{
        search:[
          {title:'Сообщества',icon:'mdi-account-multiple',url:'/group'},
          {title:'Пользователи',icon:'mdi-account',url:'/users'},
          {title:'Родители',icon:'mdi-human-male-boy',url:'/parents'},
          {title:'Дни рождения',icon:'mdi-gift-outline',url:'/birthdays'}
        ],
        collect:[
          {title:'Посты',icon:'mdi-account-multiple',url:'/posts'},
          {title:'Друзья',icon:'mdi-account',url:'/friends'},
          {title:'Обсуждения',icon:'mdi-human-male-boy',url:''},
          {title:'Родственники',icon:'mdi-gift-outline',url:''},
          {title:'Участники',icon:'mdi-new-box',url:'/subscribers',iconColor:'red'},
          {title:'Недавно вступившие',icon:'mdi-new-box',url:'/recentlyjoin',iconColor:'red'},
          {title:'Комментарии',icon:'mdi-human-male-boy',url:'/comments'},
        ],
        activity:[
          {title:'Вступления',icon:'mdi-account-multiple',url:''},
          {title:'Сообщества',icon:'mdi-account',url:''}
        ]
      }
    }
  },
  computed:{
    isUserLoggedIn(){
      return this.$store.getters.isUserLoggedIn
    },
    error(){
      return this.$store.getters.error
    },
    success(){
      return this.$store.getters.success
    }
  },
  methods:{
    
    vkAuth (){
      this.$http.get('http://89.254.230.243:3000/auth/vkontakte')
      .then(response => {
        localStorage.access_token = response.body.access_token
        window.location.href = response.body.vk_url
      },(response) => {});
    },
    userLogout (){
      localStorage.removeItem('access_token')
      this.$store.commit('logout');
      window.location.href = 'http://89.254.230.243:3000/'
    },
    checkUserLogin (){
      if(!localStorage.access_token) return;
      this.$http.post("http://89.254.230.243:3000/checkToken", {
          access_token: localStorage.access_token
        })
        .then(res => {
          // console.log(res.body)
          res.body ? this.$store.commit('setUser',res.body) : console.log('Ошибка')
          console.log(this.$store.getters.user) 
        });
    },
    closeError (){
      this.$store.dispatch('clearError')
    },
    closeSuccess (){
      this.$store.dispatch('clearSuccess')
    }
  },
  created: function (){
      this.checkUserLogin()
    }
}
</script>
