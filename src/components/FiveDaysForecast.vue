<script setup>

import Chart from "@/components/Chart.vue"
import {formatDate} from "@/utils"
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'

const props = defineProps({
  activeCity: {
    type: Object,
    required: true
  },
  isChartVisible: {
    type: Boolean,
    required: true
  },
  dayTime: {
    type: Boolean,
    required: true
  }
})
const {t} = useI18n()

const filteredWeather = computed(() => {
  if (props.dayTime) {
    return props.activeCity?.forecast.list.filter(item => item.dt_txt.includes('15:00'))
  } else {
    return props.activeCity?.forecast.list.filter(item => item.dt_txt.includes('03:00'))
  }
});

const labels = computed(() => {
  return filteredWeather.value.map(item => {
    let date = new Date(item.dt * 1000)
    return date.toLocaleString('en-US', {month: 'short', day: '2-digit'})
  });
});

const data = computed(() => {
  return filteredWeather.value?.map(item => item.main.temp)
});

</script>

<template>
  <section v-if="filteredWeather" class="highlights-container">

    <div
        v-for="(item, index) in filteredWeather"
        :key="index"
        class="highlight">

      <div class="card">
        <div class="card-date">{{ formatDate(item.dt) }}</div>
        <div class="card-temp">
          <div class="title">{{ Math.round(item.main.temp) }} °C</div>
          <div
              :style="`background-image: url('weather-main/${item.weather[0].description}.png')`"
              class="pic-card"
          />
        </div>
        <div class="card-info">
          <div>
            <div class="card-pic humidity"></div>
            <div>{{ item.main.humidity }}%</div>
          </div>
          <div>
            <div class="card-pic pressure"></div>
            <div> {{ item.main.pressure }} hPa</div>
          </div>
          <div>
            <div class="card-pic wind"></div>
            <div> {{ Math.round(item.wind.speed) }} {{ t('meters') }}</div>
          </div>
          <div>
            <div class="card-pic feels"></div>
            <div> {{ Math.round(item.main.feels_like) }} °C</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Chart :labels="labels" :data="data" :isShow="isChartVisible"/>
</template>

<style scoped lang="sass">
@import '../assets/styles/main'
.highlights

  &-container
    display: grid
    gap: 10px
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))

    @media (max-width: 575px)
      flex-direction: column

.highlight

  @media (max-width: 575px)
    width: 100%
    margin-bottom: 16px

.title
  font-size: 18px
  width: 80%

.card
  height: 220px
  width: 100%
  padding: 16px
  background: url('/src/assets/img/gradient-2.jpg') no-repeat 50% 50%
  background-size: cover
  border-radius: 8px

  @media (max-width: 1199px)
    padding: 12px

  @media (max-width: 767px)
    height: 250px

  &-date
    font-size: 22px
    text-align: center
    margin-bottom: 10px


  &-temp
    display: flex
    align-items: center
    justify-content: space-around
    margin-bottom: 10px


  &-info
    display: flex
    align-items: center
    font-size: 16px
    justify-content: space-around
    flex-wrap: wrap
    margin-bottom: 15px

    & > div
      display: flex
      align-items: center
      width: 50%

      & > div
        font-size: 12px
        padding: 5px 10px

        @media (max-width: 767px)
          font-size: 16px

  &-pic
    width: 20px
    height: 20px

.feels
  background: url('/src/assets/img/feels-like.svg') no-repeat 50% 50%

.humidity
  background: url('/src/assets/img/humidity.svg') no-repeat 50% 50%

.pressure
  background: url('/src/assets/img/pressure.svg') no-repeat 50% 50%

.wind
  background: url('/src/assets/img/wind.svg') no-repeat 50% 50%

.pic-card
  width: 32px
  height: 32px
  background-repeat: no-repeat
  background-size: contain

.states
  display: flex
  justify-content: space-between


  &--margin
    margin-top: 40px


</style>