<template>
  <Bar
      id="classifications-chart"
      :options="chartOptions"
      :data="chartData"
  />
</template>

<script>
import { LABELS } from "@/helpers/Feature";
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'FeedbackChart',
  components: { Bar },
  props: {
    classifications: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
      }
    }
  },
  computed: {
    chartData() {
      const labels = [];
      const data = [];
      this.classifications.forEach((classification) => {
        labels.push(LABELS[classification.feature]);
        data.push(classification.points);
      })

      return {
        labels: labels,
        datasets: [
          {
            label: 'Feedbacks',
            backgroundColor: '#47667b',
            data: data
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.feedback-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px; /* Ajuste conforme necessário */
  border: 2px dashed #3498db; /* Cor da borda conforme desejado */
  border-radius: 8px;
  background-color: #f0f0f0; /* Cor de fundo conforme desejado */
}

.placeholder-content {
  text-align: center;
  color: #555; /* Cor do texto conforme desejado */
}

.icon {
  font-size: 36px;
  margin-bottom: 10px;
  color: #3498db; /* Cor do ícone conforme desejado */
}
</style>
