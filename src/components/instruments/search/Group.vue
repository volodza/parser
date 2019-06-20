<template>
  <v-container grid-list-xl fluid >
    <v-layout flex-child wrap>

      <v-flex xs12 md6 d-flex>
        <v-flex class="white" text-xs-center>

          <v-textarea
            solo
            name="input-7-1"
            label="Ключевые фразы"
            value=""
            hint="По одной ключевой фразе в строку"
            v-model="textarea.value"
          ></v-textarea>

          <v-divider class="mb-4"></v-divider>

          <v-checkbox
            class="my-0 py-0"
            :label="`Точное вхождение поисковой фразы`"
            v-model="checkboxes.exact_phrase"
          ></v-checkbox>
          <v-checkbox
            class="my-0 py-0"
            :label="`Только официальные сообщества`"
            v-model="checkboxes.only_official"
          ></v-checkbox>
          <v-checkbox
            class="my-0 py-0"
            v-model="checkboxes.with_goods"
            :label="`Только сообщество с товарами`"
          ></v-checkbox>

          <v-divider></v-divider>

          <div class="font-weight-medium mt-3">Участников</div>

          <v-layout wrap>
            <v-flex xs6 sm6>
              <v-text-field
                solo
                label="От"
                v-model="inputs.members.from"
                hide-details
              ></v-text-field>
            </v-flex>

            <v-flex xs6 sm6>
              <v-text-field
                solo
                v-model="inputs.members.to"
                label="До"
                hide-details
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
              <v-select
                hide-details
                solo
                v-model="selects.type.selected"
                label="Типы сообществ"
                item-text="title"
                item-value="value"
                :items="selects.type.items"
              ></v-select>
            </v-flex>

            <v-flex xs12 sm6>
              <v-select
                v-model="selects.sort.selected"
                hide-details
                solo
                item-text="title"
                item-value="value"
                :items="selects.sort.items"
                label="Сортировка"
              ></v-select>
            </v-flex>

            <v-flex xs6 sm6>
              <v-autocomplete
                v-model="selects.country.selected"
                :loading="selects.country.loading"
                :items="selects.country.items"
                :search-input.sync="selects.country.search"
                hide-no-data
                hide-details
                item-text="title"
                item-value="id"
                label="Страна"
                solo
              ></v-autocomplete>
            </v-flex>

            <v-flex xs6 sm6>
              <v-autocomplete
                :disabled="!selects.country.selected"
                v-model="selects.city.selected"                
                :loading="selects.city.loading"
                :items="selects.city.items"
                :search-input.sync="selects.city.search"
                hide-no-data
                hide-details
                item-text="title"
                item-value="id"
                label="Город"
                solo
              >
                <template v-slot:item="{ item }">
                  <v-list-tile-avatar
                    color="indigo"
                    class="headline font-weight-light white--text"
                  >{{ item.title.charAt(0) }}</v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    <v-list-tile-sub-title v-text="item.region"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </v-autocomplete>
            </v-flex>

          </v-layout>

          <v-divider class="my-4"></v-divider>

          <v-text-field
            solo
            label="Название задачи"
          ></v-text-field>

          <v-btn color='primary'
            block
            @click="getGroups"
            :loading="!answer"
          >
            <v-icon>mdi-play</v-icon>
          </v-btn>

        </v-flex>
      </v-flex>

      <v-flex xs12 md6 d-flex>
        <v-flex class="white" >

          <tasks></tasks>
            <!-- <v-list two-line subheader>

          <v-list-tile
            v-for="item in list.tasks.items"
            :key="item.title"
            avatar
          >
            <v-list-tile-avatar>
            <v-progress-circular
              color="primary"
            ></v-progress-circular>
              
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>
                <v-icon size='17'>mdi-calendar</v-icon>
                {{ item.subtitle }}
                </v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-layout>
               <v-btn icon ripple>
                <v-icon size="20" color="grey lighten-1">mdi-clock-outline</v-icon>
              </v-btn>
              <v-btn icon ripple>
                <v-icon size="20" color="grey lighten-1">mdi-star-outline</v-icon>
              </v-btn>  
              <v-btn icon ripple>
                <v-icon size="20" color="grey lighten-1">mdi-reload</v-icon>
              </v-btn>                             
              <v-btn icon ripple>
                <v-icon size="20" color="grey lighten-1">mdi-delete-outline</v-icon>
              </v-btn>                             

              </v-layout>
            
            </v-list-tile-action>
          </v-list-tile>


        </v-list> -->


          <!-- <v-flex d-flex row>
            <v-flex xs1>
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            </v-flex>
            <v-flex xs7>
              <div >Поиск > Сообщества</div>
            </v-flex>
            <v-flex xs4> 
              <v-icon>mdi-clock</v-icon> 
              <v-icon>mdi-star</v-icon> 
              <v-icon>mdi-repeat</v-icon>
              <v-icon>mdi-delete</v-icon>
            </v-flex>
          </v-flex> -->

          <v-divider></v-divider>

          <div class="title text-xs-center my-2">Как работает этот скрипт?</div>
          <div>
            Вы вводите слово, которое должно присутствовать в названии группы,
            при необходимости указываете расширенные параметры поиска,
            скрипт находит подходящие группы и выдаёт их список в нужном вам формате.
          </div>
          <div>
            При поиске сообществ лучше не выставлять гео в ТХ.
            Даже указание страны сокращает поиск только до групп. 
            Дело в том, что при таком поиске сервис ищет только группы и мероприятия.
            Это обусловлено техническими требованиям ВК. 
            Без гео вы найдете и паблики тоже.
          </div>

          <v-divider></v-divider>
        </v-flex>
      </v-flex>
      

    </v-layout>
  </v-container>
</template>

<script>
import Tasks from './Tasks'
//сделать глобальным


export default {
  components:{Tasks:Tasks},
  data () {
    return {
      textarea:{
        value:''
      },
      checkboxes:{
        exact_phrase: false,
        only_official:false,
        with_goods:false
      },
      inputs:{
        members:{
          from:null,
          to:null
        },
        taskName:null
      },
      selects:{
        country: {
          loading: false,
          items: [],
          selected: null,
          search: null
        },
        city: {
          loading: false,
          items: [],
          selected: null,
          search: null
        },
        type:{
          items:[
            {title:'Группа',value:'group'},
            {title:'Паблик',value:'page'},
            {title:'Мероприятие',value:'event'},
            {title:'Предстоящее мероприятие',value:'future'}
          ],
          selected:null
        },
        sort:{
          items:[
            {title:'По умолчанию(аналогично результатам поиска в ВК)',value:0},
            {title:'По скорости роста',value:1},
            {title:'По дневной посещаемости',value:2},
            {title:'По количеству лайков',value:3},
            {title:'По количеству комментариев',value:4},
            {title:'По количеству записей в обсуждениях',value:5}
          ],
          selected:null
        }
      },
      answer:'тут',
      list:{
        tasks:{
          items: [
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Поиск > Сообщества', subtitle: '03.02.2019' },
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Поиск > Родители', subtitle: 'Jan 17, 2014' },
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Сбор > Друзья', subtitle: 'Jan 28, 2014' }
        ]
        }
      }
    }
  },
  methods:{
    getGroups() {
      
      if (!this.textarea.value) {
        this.$store.commit('setError','Введите хотя бы одну ключевую фразу')
        return
      }
      let obj = {
        q:this.key_phrases,
        type:this.selects.type.selected,
        city_id:this.selects.city.selected,
        // country_id:this.selects.country.selected,
        sort:this.selects.sort.selected,
        members_from:+this.inputs.members.from,
        members_to:+this.inputs.members.to,
        exact_phrase: this.checkboxes.exact_phrase,
        verified:this.checkboxes.only_official,
        market:+this.checkboxes.with_goods,
        user_id:this.$store.getters.user.id,
        title:'Поиск > Сообщества'
      }
      this.answer = '';
      this.$http.post(`http://${this.$store.getters.ip}getGroups`,obj)
       .then(res =>{
          this.$store.commit('setSuccess',res.body)
          this.answer = res.body
       })
    },
    getCities(v) {
      if (!this.selects.country.selected) return;
      this.selects.city.loading = true;
      this.$http.post(`http://${this.$store.getters.ip}getCities`, {
          q: v
        })
        .then(res => {
          this.selects.city.items = res.body.items;
          this.selects.city.loading = false;
          getTasks()
        });
    },
    getCountries(v) {
      this.selects.country.loading = true;
      this.$http
        .post(`http://${this.$store.getters.ip}getCountries`, {
          q: v
        })
        .then(res => {
          this.selects.country.items = res.body.items;
          this.selects.country.loading = false;
        });
    }
  },
  watch: {
    "selects.city.search": function(val) {
      val && val !== this.selects.city.selected && this.getCities(val);
    },
    "selects.country.search": function(val) {
      val && val !== this.selects.country.selected && this.getCountries(val);
    }
  },
  computed:{
    key_phrases() {
      return this.textarea.value.split`\n`
    }
  }
}

</script>
