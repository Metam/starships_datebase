<template>
  <div>
    <div class="inline pagination" justify="between">
      <div><strong v-show="prev" @click="prevPage()">prev</strong></div>
      <div><strong v-show="next" @click="nextPage()">next</strong></div>
    </div>
    <div class="inline header">
      <div class="logo" @click="toBeginning()" title="The gods made Angar.">ANGAR</div>
      <input class="search" type="text" v-model="search" @keyup="updateQuery(); getShips()" />
    </div>

    <div v-show="loading" class="loading">Loading ships...</div>
    <div v-show="!loading && !list.length" class="loading">No result.</div>

    <router-link :to="/ship/ + getShipId(item.url)" class="ship-preview" v-for="item in list" :key="item.name">
      <div class="inline title" valign="center">
        <strong>{{ item.name }}</strong><span>from {{ item.manufacturer }}</span>
      </div>
      <div class="inline" valign="center">
        <div class="grid" size="1/5">
          <strong>class</strong>
          <span>{{ item.starship_class}}</span>
        </div>
        <div class="grid" size="1/5">
          <strong>max atmo speed</strong>
          <span>{{ item.max_atmosphering_speed }}</span>
        </div>
        <div class="grid" size="1/5">
          <strong>crew</strong>
          <span>{{ item.crew }}</span>
        </div>
        <div class="grid" size="2/5" justify="end">
          <strong>{{ item.cost_in_credits }} <span v-if="item.cost_in_credits !== 'unknown'">cr.</span></strong>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      search: '',
      loading: false,
      list: [],
      prev: null,
      next: null
    }
  },
  computed: {
    currentPage () {
      return parseInt(this.$route.params.id)
    }
  },
  methods: {
    getShipId(url) {
      let split = url.split('/')
      let id = parseInt(split[split.length - 2])
      return id
    },
    getShips () {
      this.search = this.$route.query['search'] || ''
      let url = 'https://swapi.co/api/starships/?page=' + this.currentPage + '&search=' + this.search

      this.loading = true
      this.list = []
      this.next = false
      this.prev = false

      axios.get(url).then((response) => {
          this.list = response.data.results
          this.next = !!response.data.next
          this.prev = !!response.data.previous
          this.loading = false
      }).catch(() => {
          this.pushHelper(1)
          this.getShips()
          this.loading = false
      });
    },
    nextPage () {
      let index = this.currentPage + 1
      this.pushHelper(index)
      this.getShips()
    },
    prevPage () {
      let index = this.currentPage - 1
      this.pushHelper(index)
      this.getShips()
    },
    toBeginning() {
      if (this.currentPage === 1) return false;
      this.pushHelper(1)
      this.getShips()
    },
    updateQuery() {
      if (this.search == '') {
        this.$router.replace({ name: 'main' })
      } else {
        this.$router.replace({ name: 'main', query: {search: this.search} })
      }
    },
    pushHelper (page_id) {
      if (this.search == '') {
          this.$router.push({ name: 'main', params: {id: page_id} })
      } else {
          this.$router.push({ name: 'main', params: {id: page_id}, query: {search: this.search} })
      }
    }
  },
  created () {
    this.getShips()
  }
}
</script>

<style lang="scss">
.header {
  padding: 3.5rem 0 2rem;
}
.pagination {
  position:absolute;
  user-select:none;
  padding-top:0.5rem;
  strong {
    cursor:pointer;
    font-size:1.5rem;
    &:hover {
      color:black;
    }
  }
}
.logo {
  font-weight:bold;
  font-size:2rem;
  cursor:pointer;
  user-select:none;
}
.search {
  width:100%;
  padding:0 0.5rem;
  margin-left:1rem;
}
.grid {
  &[size="1/5"] {
    width:20%;
  }
  &[size="2/5"] {
    width:40%;
  }
  &[justify=end] {
    justify-content: flex-end;
    display:flex;
  }
}
.ship-preview {
  display:block;
  text-decoration:none;
  color:#4a4a4a;
  position:relative;
  cursor:pointer;

  &:before {
    content:'';
    position:absolute;
    top:-0.3rem;
    background:#4a4a4a;
    display:none;
    left:-0.5rem;
    width:calc(100% + 1rem);
    height:calc(100% + 0.6rem);
    z-index:-1;

  }
  &:hover {
    color:white;
    &:before {
      display: block;
    }
  }
  .inline + .inline {
    margin-top:0.5rem;
  }
  .title {
    strong {
      font-size:1.5rem;
    }
    span {
      margin-left:0.5rem;
    }
  }
  .grid {
    strong {
      display:block;
    }
  }
  & + .ship-preview {
    margin-top:2rem;
  }
}
</style>