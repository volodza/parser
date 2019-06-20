<template>
  <v-container fluid grid-list-xl>
    <v-layout flex-child wrap>
      <v-flex xs12 md6 d-flex>
        <v-flex class="white">

          <v-textarea
            solo
            name="input-7-1"
            label="Пользователи Вконтакте"
            value
            hint="По одной ссылке или id пользователя в строке"
            v-model="key_phrases"
          ></v-textarea>
             
            <v-divider class="mb-4"></v-divider>

          <v-select
            v-model="value" 
            :items="['Друзей','Подписчиков','Интересные страницы']" 
            box
            chips 
            label="Каких друзей собирать" 
            multiple
          >
          </v-select>

          <v-layout row wrap>

            <v-flex xs12 sm6 ma-0>
              <v-text-field
                box
                label="Общие друзья от"
                v-model="min"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
                box
                v-model="max"
                label="Общие друзья до"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>


          <v-text-field
            box
            label="Название задачи"
          ></v-text-field>


          <v-btn color='primary'
            block
            @click="getGroups"
          >
            <v-icon>mdi-play</v-icon>
          </v-btn>

        </v-flex>
      </v-flex>

      <v-flex xs12 md6 d-flex>
        <v-flex class="white">
          <v-textarea
            name="input-7-1"
            label="Ключевые фразы"
            value
            hint="По одной ключевой фразе в строку"
            v-model="key_phrases"
          ></v-textarea>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      user_ids: "",
      answer: "Тут должен быть ответ"
    };
  },
  methods: {
    getFriends() {
      this.answer = "";
      this.$http
        .post(`http://${this.$store.getters.ip}getFriends`, {
          user_ids: this.user_ids.split`\n`
        })
        .then(res => {
          this.answer = res.body;
        });
    }
  }
};
</script>
