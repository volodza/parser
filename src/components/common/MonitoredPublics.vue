<template>
    
    <div style="height:150px;overflow-y:scroll;border:1px solid #e0e0e0;">
        
            <v-progress-circular
              v-if="!this.$store.getters.monitored"
              indeterminate
              color="primary"
            ></v-progress-circular>

        <v-list two-line subheader v-else style="padding-bottom:20px">

          <v-list-tile
            v-for="task in monitored"
            :key="task.begin"
            avatar
            style="height:50px;padding:0 0 0 0"
          >
            <v-list-tile-avatar style="min-width:0px;" >
            <v-progress-circular
              v-if="task.status === 'loading' || task.status === 'update'"
              indeterminate
              color="primary"
              size="28"
            ></v-progress-circular>
            <v-icon
              v-else-if="task.status === 'complete'"
              size='35'
              color="green"
            >
            mdi-eye-check-outline
            </v-icon>

            <v-icon
              v-else-if="task.status === 'error'"
              size='35'
              color="red"
            >
            mdi-close-circle-outline
            </v-icon>
              
            </v-list-tile-avatar>

            <v-list-tile-content style="font-size:14px;height:40px">
              <!-- <v-list-tile-title>{{ task.title }}</v-list-tile-title> -->

 <v-dialog

      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-list-tile-title v-on="on" >{{ task.title }}</v-list-tile-title>
      </template>

      <v-card>
        <v-list two-line>
          <template v-for="group in task.groups">
            <!-- <v-subheader
              v-if="item.name"
              :key="item.name"
            >
              {{ item.name }}
            </v-subheader> -->

            <!-- <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider> -->

            <v-list-tile
              :key="group.title"
              avatar
              @click="1"
              style="height:auto"
            >
              <v-list-tile-avatar style="height:auto">
                <img :src="group.photo_50">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="group.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="'vk.com/'+group.screen_name"></v-list-tile-sub-title>
              </v-list-tile-content>

            <v-list-tile-action>
              <p style="color:green" >{{group.newCount}}</p>
            </v-list-tile-action>
              
             
            </v-list-tile>
          </template>
        </v-list>
       <v-btn 
        @click="updateMembersCount(task)"
        :disabled="task.status === 'loading' || task.status === 'update'"
        flat
        small
        outline
       >
         <v-icon >mdi-reload</v-icon>
         Обновить данные
       </v-btn>
       <v-btn 
        @click="1"
        flat
        small
        outline
       >
         <v-icon >mdi-reload</v-icon>
         Посмотреть
       </v-btn>  
       <v-btn 
        @click="1"
        flat
        small
        outline
       >
         <v-icon >mdi-reload</v-icon>
         скачать
       </v-btn>             
      </v-card>
    </v-dialog>            

              <v-list-tile-sub-title>
                <v-icon size='17'>mdi-calendar</v-icon>
                {{ task.begin.slice(0,10) }}
                <v-icon 
                  size='17'
                  v-if="task.count"
                  @click="downloadAnswer(task)"
                >
                  mdi-account-search-outline
                </v-icon>
                {{task.count}}
                
                <!-- <v-icon size='17'>mdi-timer-sand-empty</v-icon> -->

                </v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action >
              <v-layout >
               <v-btn icon ripple>
                <v-icon size="20" color="black">mdi-file-document-box-outline</v-icon>
              </v-btn>
              <v-btn icon ripple>
                <v-icon size="20" color="black">mdi-star-outline</v-icon>
              </v-btn>  
               <!-- <v-btn icon ripple>
                <v-icon size="20" color="black">mdi-reload</v-icon>
              </v-btn>  -->
              <v-btn 
                icon 
                ripple
                @click="deleteTask(task)"
              >
                <v-icon size="20" color="black">mdi-delete-outline</v-icon>
              </v-btn>                             

              </v-layout>
            
            </v-list-tile-action>
            
          </v-list-tile>
    

        </v-list>

    </div>
</template>

<script>
export default {
  data () {
      return {
        dialog: false
      }
    },
  computed:{
    monitored (){
      return this.$store.getters.monitored
    }
  },
  methods:{
    downloadAnswer(task){
      const obj = {
        user_id:this.$store.getters.user.id,
        begin:task.begin
      }
      // this.$http.post('http://localhost:3000/downloadAnswer',obj,{
      //   responseType: 'arraybuffer',
      //   headers:{
      //     'content-type': 'application/json'
      //     }
      // })
      // .then(res => console.log(res))
      // .then(base64String => {
      //     const anchorTag = document.createElement('a');
      //     console.log(base64String)
      //     anchorTag.href = base64String;
      //     anchorTag.download = obj.user_id + ".txt"; 
      //     anchorTag.click();
      // });
      fetch(`http://${this.$store.getters.ip}downloadAnswer`, {
        method: 'POST',
        responseType: 'arraybuffer',
        body:JSON.stringify(obj),
        headers:{
          'content-type': 'application/json'
          }
      })
      .then(res => res.text())
      .then(base64String => {
          const anchorTag = document.createElement('a');
          // console.log(base64String)
          anchorTag.href = encodeURI(base64String);
          anchorTag.download = obj.user_id + ".txt"; 
          anchorTag.click();
      });
    },
    getMonitored (){
      this.$http.post(`http://${this.$store.getters.ip}getMonitored`,{
        user_id:this.$store.getters.user.id
      })
       .then(res =>{
         if(!res)return
          this.$store.commit('setMonitored',res.body)
       })
      
    },
    updateMembersCount (task) {
      const obj = {
        user_id:this.$store.getters.user.id,
        begin:task.begin
      };
      this.$http.post(`http://${this.$store.getters.ip}updateMembersCount`,obj)
       .then(res =>{
         console.log(res.body)
         this.getMonitored()
       })
    }
  },
  created (){
    this.interval = setInterval(() => this.getMonitored(), 5000);
  }
}
</script>

