<template>
  <div class="ship">
    <div v-if="!loading">
      <h1>{{ data.name }}</h1>
      <div>
        <strong>model:</strong>
        <p>{{ data.model }}</p>
      </div>
      <div>
        <strong>class:</strong>
        <p>{{ data.starship_class }}</p>
      </div>
      <div>
        <strong>manufacturer:</strong>
        <p>{{ data.manufacturer }}</p>
      </div>
      <div>
        <strong>passengers:</strong>
        <p>{{ data.passengers }}</p>
      </div>
      <div>
        <strong>max atmosphering speed:</strong>
        <p>{{ data.max_atmosphering_speed }}</p>
      </div>
      <div>
        <strong>MGLT:</strong>
        <p>{{ data.MGLT }}</p>
      </div>

      <div>
        <strong>cargo:</strong>
        <p>{{ data.cargo_capacity }}</p>
      </div>

      <div>
        <strong>consumables:</strong>
        <p>{{ data.consumables }}</p>
      </div>

      <div>
        <strong>hyperdrive rating:</strong>
        <p>{{ data.hyperdrive_rating }}</p>
      </div>
      <div>
        <strong>length:</strong>
        <p>{{ data.length }}</p>
      </div>
      <div>
        <strong>cost:</strong>
        <p>{{ data.cost_in_credits }}</p>
      </div>
    </div>
    <div v-else>Loading ship info...</div>
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
      next: null,
      data: {}
    }
  },
    computed: {
        shipId () {
            return parseInt(this.$route.params.id)
        }
    },
    methods: {
        getShipInfo () {
            this.loading = true;
            let url = 'https://swapi.co/api/starships/' + this.shipId + '/'
            axios.get(url).then((response) => {
                this.data = response.data
                this.loading = false
            }).catch(() => {
                this.$router.push('/1')
            });
        }
    },
  created () {
    this.getShipInfo()
  }
}
</script>